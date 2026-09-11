import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const pipelineDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.dirname(pipelineDir);
const queuePath = path.join(pipelineDir, "queue.json");
const sourcesPath = path.join(pipelineDir, "sources.json");
const revenuePath = path.join(pipelineDir, "monetization.json");

const readJson = async (file) => JSON.parse(await fs.readFile(file, "utf8"));
const writeJson = async (file, data) => fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
const decode = (value = "") => value
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/\s+/g, " ")
  .trim();
const tag = (xml, names) => {
  for (const name of names) {
    const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
    if (match) return decode(match[1]);
  }
  return "";
};
const attr = (xml, tagName, attribute) => {
  const match = xml.match(new RegExp(`<${tagName}[^>]*\\s${attribute}=["']([^"']+)["'][^>]*>`, "i"));
  return match?.[1] || "";
};
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);
const escapeHtml = (value = "") => value.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[character]));
const idFor = (source, link) => crypto.createHash("sha256").update(`${source}:${link}`).digest("hex").slice(0, 16);

async function ingest() {
  const sources = await readJson(sourcesPath);
  const queue = await readJson(queuePath);
  const known = new Set(queue.map(item => item.id));
  let added = 0;

  for (const source of sources.filter(item => item.enabled)) {
    if (!source.feedUrl) {
      console.warn(`Skipped ${source.name}: no feed URL`);
      continue;
    }
    if (!["owned", "licensed", "public-domain"].includes(source.rights)) {
      console.warn(`Skipped ${source.name}: rights status is not publishable`);
      continue;
    }

    const response = await fetch(source.feedUrl, { headers: { "user-agent": "NewsFixdFeedBot/1.0 (+https://newsfixd.com/about.html)" } });
    if (!response.ok) throw new Error(`${source.name} returned HTTP ${response.status}`);
    const xml = await response.text();
    const entries = [...xml.matchAll(/<(item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi)].map(match => match[2]);

    for (const entry of entries) {
      const link = tag(entry, ["link", "guid"]) || attr(entry, "link", "href");
      const title = tag(entry, ["title"]);
      if (!title || !link) continue;
      const id = idFor(source.id, link);
      if (known.has(id)) continue;

      const summary = tag(entry, ["description", "summary", "content:encoded", "content"]);
      const image = attr(entry, "media:content", "url") || attr(entry, "enclosure", "url");
      queue.push({
        id,
        sourceId: source.id,
        sourceName: source.name,
        sourceUrl: link,
        rights: source.rights,
        licenseReference: source.licenseReference,
        title,
        slug: slugify(title),
        summary: summary.slice(0, 420),
        body: source.allowFullText ? summary : "",
        image,
        imageCredit: "",
        author: "",
        category: source.defaultCategory,
        location: source.defaultLocation,
        status: "needs-review",
        qualityChecks: {
          rightsVerified: false,
          authorVerified: false,
          imageRightsVerified: false,
          factsReviewed: false,
          duplicateChecked: true
        },
        importedAt: new Date().toISOString(),
        publishedAt: null
      });
      known.add(id);
      added++;
    }
  }

  await writeJson(queuePath, queue);
  console.log(`Ingest complete: ${added} new item${added === 1 ? "" : "s"} added to review.`);
}

async function list() {
  const queue = await readJson(queuePath);
  if (!queue.length) {
    console.log("The editorial queue is empty.");
    return;
  }
  for (const item of queue) console.log(`${item.id}  ${item.status.padEnd(13)}  ${item.title}`);
}

async function review(id, decision) {
  const queue = await readJson(queuePath);
  const item = queue.find(candidate => candidate.id === id);
  if (!item) throw new Error(`No queue item found for ${id}`);
  if (!["approve", "reject"].includes(decision)) throw new Error("Decision must be approve or reject");
  if (decision === "approve") {
    const incomplete = Object.entries(item.qualityChecks).filter(([, passed]) => !passed).map(([name]) => name);
    if (incomplete.length) throw new Error(`Cannot approve until checks pass: ${incomplete.join(", ")}`);
    item.status = "approved";
    item.approvedAt = new Date().toISOString();
  } else {
    item.status = "rejected";
    item.rejectedAt = new Date().toISOString();
  }
  await writeJson(queuePath, queue);
  console.log(`${item.title}: ${item.status}`);
}

function articleHtml(item) {
  const body = (item.body || item.summary).split(/\n{2,}/).filter(Boolean).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${escapeHtml(item.title)} | NewsFixd</title><meta name="description" content="${escapeHtml(item.summary.slice(0, 155))}">
<link rel="canonical" href="https://newsfixd.com/stories/${item.slug}/"><link rel="stylesheet" href="/styles.css"></head>
<body><a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><nav class="nav-shell" aria-label="Main navigation"><a class="brand" href="/">NewsFixd<span></span></a><div class="desktop-nav"><a href="/">Latest</a><a href="/local/">Local</a><a href="/politics/">Politics</a><a href="/tech/">Tech</a><a href="/business/">Business</a><a href="/science/">Science</a><a href="/global/">Global</a></div></nav></header>
<main id="main-content"><article class="article-page"><header class="article-header"><p class="issue-label">${escapeHtml(item.category)}</p><h1>${escapeHtml(item.title)}</h1><p class="article-dek">${escapeHtml(item.summary)}</p><div class="article-byline"><div class="avatar">${escapeHtml((item.author || "NF").split(" ").map(part => part[0]).join("").slice(0,2))}</div><div><strong>${escapeHtml(item.author || item.sourceName)}</strong><span>${escapeHtml(item.location || "NewsFixd")} · ${new Date(item.publishedAt).toLocaleDateString("en-US", { dateStyle: "long" })}</span></div></div></header>
${item.image ? `<figure class="article-hero"><img src="${escapeHtml(item.image)}" alt=""><figcaption>${escapeHtml(item.imageCredit)}</figcaption></figure>` : ""}
<div class="article-layout"><aside class="share-rail"><span>SHARE</span><button type="button">X</button><button type="button">in</button></aside><div class="article-copy">${body}<aside class="revenue-unit" aria-label="Advertisement"><span>SPONSORED</span><strong>Your message, in the right context.</strong><a href="/advertise/">Advertise with NewsFixd →</a></aside><div class="article-tags"><a href="/${slugify(item.category)}/">${escapeHtml(item.category)}</a></div></div></div></article></main>
</body></html>`;
}

async function publish(id) {
  const queue = await readJson(queuePath);
  const item = queue.find(candidate => candidate.id === id);
  if (!item) throw new Error(`No queue item found for ${id}`);
  if (item.status !== "approved") throw new Error("Only approved items can be published");
  if (!["owned", "licensed", "public-domain"].includes(item.rights)) throw new Error("Publish blocked: content rights are not verified");
  item.publishedAt = new Date().toISOString();
  item.status = "published";
  const outputDir = path.join(rootDir, "stories", item.slug);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, "index.html"), articleHtml(item));
  await writeJson(queuePath, queue);
  console.log(`Published /stories/${item.slug}/`);
}

async function report() {
  const queue = await readJson(queuePath);
  const revenue = await readJson(revenuePath);
  const statuses = queue.reduce((result, item) => ({ ...result, [item.status]: (result[item.status] || 0) + 1 }), {});
  const availableInventory = revenue.inventory.filter(item => item.status === "available");
  const flatRatePotential = availableInventory.filter(item => item.pricingModel !== "cpm").reduce((sum, item) => sum + item.startingPrice, 0);
  console.log(JSON.stringify({
    editorialQueue: statuses,
    availableRevenueUnits: availableInventory.length,
    listedFlatRateInventoryValue: flatRatePotential,
    currency: revenue.currency
  }, null, 2));
}

const [command, ...args] = process.argv.slice(2);
try {
  if (command === "ingest") await ingest();
  else if (command === "list") await list();
  else if (command === "review") await review(args[0], args[1]);
  else if (command === "publish") await publish(args[0]);
  else if (command === "report") await report();
  else console.log("Usage: pipeline.mjs <ingest|list|review ID approve|reject|publish ID|report>");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
