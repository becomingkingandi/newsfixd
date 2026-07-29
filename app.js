const page = document.body.dataset.page || "latest";

const sections = {
  latest: {
    eyebrow: "VOLUME 24 // ISSUE 11",
    title: "Latest Perspectives",
    description: "A considered view of the stories shaping the world, selected for depth, relevance, and clarity.",
    chips: ["Global Affairs", "Science", "Culture", "Tech"],
    hero: {
      category: "Global Affairs",
      title: "The Rebirth of Diplomacy in an Era of Digital Sovereignty",
      summary: "As traditional borders dissolve into networks, nations are redefining what it means to lead. A close look at the new race for technological influence.",
      author: "Julian Vance",
      time: "12 min read",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=82"
    }
  },
  local: {
    eyebrow: "YOUR AREA // ATLANTA",
    title: "Local News",
    description: "The reporting, public decisions, openings, and community stories closest to home.",
    chips: ["Atlanta", "Public Safety", "Traffic", "Community"],
    hero: {
      category: "Atlanta",
      title: "A New Chapter for the Downtown Corridor",
      summary: "New housing, independent businesses, and transit investments are changing how the center of the city works after five.",
      author: "Maya Thompson",
      time: "6 min read",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=82"
    }
  },
  politics: {
    eyebrow: "POWER // POLICY // PEOPLE",
    title: "Politics",
    description: "Decisions, institutions, and the practical consequences of public policy—without the theater.",
    chips: ["White House", "Congress", "Elections", "Policy"],
    hero: {
      category: "Policy",
      title: "The Quiet Coalition Reshaping the Next Budget",
      summary: "A bipartisan group is testing whether local infrastructure can become the rare policy area where practical outcomes win.",
      author: "Nora Ellis",
      time: "9 min read",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=82"
    }
  },
  tech: {
    eyebrow: "SYSTEMS // PRODUCTS // PEOPLE",
    title: "Technology",
    description: "The ideas, infrastructure, and products changing how the world works.",
    chips: ["Artificial Intelligence", "Startups", "Security", "Products"],
    hero: {
      category: "Artificial Intelligence",
      title: "The AI Launch Cycle Moves From Spectacle to Utility",
      summary: "The most important products this year are less interested in looking magical and more focused on doing useful work.",
      author: "Eli Mercer",
      time: "8 min read",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=82"
    }
  },
  business: {
    eyebrow: "COMPANIES // CAPITAL // WORK",
    title: "Business",
    description: "Company strategy, the changing workplace, and the signals behind the numbers.",
    chips: ["Companies", "Economy", "Work", "Leadership"],
    hero: {
      category: "Companies",
      title: "Small Teams Are Rewriting the Operating Manual",
      summary: "A new generation of focused companies is choosing fewer tools, leaner organizations, and a sharper definition of growth.",
      author: "Simone Grant",
      time: "7 min read",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82"
    }
  },
  science: {
    eyebrow: "DISCOVERY // CLIMATE // HEALTH",
    title: "Science",
    description: "Evidence-led reporting on the discoveries changing what we know about life and the planet.",
    chips: ["Space", "Climate", "Health", "Research"],
    hero: {
      category: "Research",
      title: "Quantum Biology and Nature’s Hidden Efficiency",
      summary: "New experiments are bringing scientists closer to understanding how living systems exploit effects once thought confined to physics labs.",
      author: "Dr. Lena Park",
      time: "10 min read",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=82"
    }
  },
  global: {
    eyebrow: "THE WORLD // IN CONTEXT",
    title: "Global News",
    description: "International events understood through the people, history, and systems behind the headline.",
    chips: ["Europe", "Asia", "Africa", "Americas"],
    hero: {
      category: "Global Affairs",
      title: "The New Geography of Global Influence",
      summary: "Middle powers are building flexible alliances around trade, climate, and technology—and changing the old diplomatic map.",
      author: "Julian Vance",
      time: "11 min read",
      image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1600&q=82"
    }
  }
};

const supporting = [
  {
    category: "Science",
    title: "A Better Way to Understand Extreme Heat",
    summary: "Researchers are building neighborhood-scale models that make forecasts more useful.",
    author: "Lena Park",
    time: "4 min read",
    image: "https://images.unsplash.com/photo-1569511166187-97eb6e387e19?auto=format&fit=crop&w=900&q=80"
  },
  {
    category: "Culture",
    title: "The Architecture of Silence",
    summary: "Why the next luxury in high-density cities is not space, but acoustic calm.",
    author: "Elara Kost",
    time: "5 min read",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80"
  },
  {
    category: "Technology",
    title: "The Silicon Exodus",
    summary: "Hardware engineering is moving from centralized hubs to distributed global teams.",
    author: "Eli Mercer",
    time: "7 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80"
  },
  {
    category: "Business",
    title: "The Return of Patient Companies",
    summary: "Some founders are rejecting the growth-at-all-costs playbook in favor of durability.",
    author: "Simone Grant",
    time: "6 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
  },
  {
    category: "Local",
    title: "The Neighborhood Main Street Finds Its Second Act",
    summary: "Small commercial corridors are becoming the test bed for a more human city.",
    author: "Maya Thompson",
    time: "5 min read",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80"
  }
];

const nav = [
  ["Latest", "/"],
  ["Local", "/local/"],
  ["Politics", "/politics/"],
  ["Tech", "/tech/"],
  ["Business", "/business/"],
  ["Science", "/science/"],
  ["Global", "/global/"]
];

function icon(name) {
  const icons = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c.6-5 3.3-7 8-7s7.4 2 8 7"></path></svg>',
    bookmark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"></path></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"></path></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5"></path></svg>',
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8v10h-6v-6H9v6H3z"></path></svg>'
  };
  return icons[name];
}

function header(active = page) {
  return `
    <header class="site-header">
      <nav class="nav-shell" aria-label="Main navigation">
        <a class="brand" href="/">NewsFixd<span></span></a>
        <div class="desktop-nav">${nav.map(([label, href]) => `<a class="${active === label.toLowerCase() || (active === "latest" && label === "Latest") ? "active" : ""}" href="${href}">${label}</a>`).join("")}</div>
        <div class="nav-actions">
          <a class="icon-button" href="/search/" aria-label="Search">${icon("search")}</a>
          <button class="icon-button profile-button" type="button" aria-label="Open profile">${icon("user")}</button>
          <button class="icon-button menu-button" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
        </div>
      </nav>
      <nav class="mobile-menu" aria-label="Mobile navigation">${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}<a href="/newsletter/">Newsletter</a><a href="/welcome/">Personalize</a></nav>
    </header>`;
}

function bottomNav(active = page) {
  return `<nav class="bottom-nav" aria-label="Mobile tab navigation">
    <a class="${active === "latest" ? "active" : ""}" href="/">${icon("home")}<span>Home</span></a>
    <a class="${active === "local" ? "active" : ""}" href="/local/"><span class="pin">⌖</span><span>Local</span></a>
    <a class="${active === "search" ? "active" : ""}" href="/search/">${icon("search")}<span>Search</span></a>
    <button class="saved-tab" type="button">${icon("bookmark")}<span>Saved</span></button>
  </nav>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-shell"><a class="brand" href="/">NewsFixd<span></span></a><p>Perspectives for a world in motion.</p><nav><a href="/newsletter/">Newsletter</a><a href="/creators/">Creators</a><a href="/publishers/">Publishers</a><a href="/advertise/">Advertise</a><a href="/about.html">About</a><a href="/privacy.html">Privacy</a></nav><small>© 2026 NewsFixd. Built for clearer days.</small></div></footer>`;
}

function card(story, size = "standard") {
  return `<article class="story-card ${size}" data-search="${story.category} ${story.title} ${story.summary}">
    ${story.image ? `<a class="story-image" href="/article/"><img src="${story.image}" alt="" loading="lazy"><span>${story.category}</span></a>` : ""}
    <div class="story-body">
      ${!story.image ? `<p class="category-label">${story.category}</p>` : ""}
      <h2><a href="/article/">${story.title}</a></h2>
      <p>${story.summary}</p>
      <div class="story-meta"><span>BY ${story.author.toUpperCase()}</span><span>${story.time.toUpperCase()}</span><button class="bookmark-button" type="button" aria-label="Save ${story.title}">${icon("bookmark")}</button></div>
    </div>
  </article>`;
}

function feedPage(config) {
  const related = supporting.map((story, index) => card(story, index === 2 ? "wide" : "standard")).join("");
  return `${header(page)}
    <main id="main-content" class="page-shell">
      <section class="section-intro">
        <div><p class="issue-label">${config.eyebrow}</p><h1>${config.title}</h1></div>
        <p class="section-description">${config.description}</p>
        <div class="topic-chips">${config.chips.map((chip, index) => `<button class="${index === 0 ? "active" : ""}" type="button">${chip}</button>`).join("")}</div>
      </section>
      <section class="editorial-grid" aria-label="${config.title} stories">
        ${card(config.hero, "hero")}
        ${related}
      </section>
      <aside class="native-sponsor" aria-label="Sponsored placement"><div><span>SPONSORED · AVAILABLE</span><strong>Reach readers in the communities you serve.</strong><p>Native local campaigns across NewsFixd’s feed, articles, and daily briefing.</p></div><a href="/advertise/">View advertiser options ${icon("arrow")}</a></aside>
      <section class="newsletter-strip"><div><p class="issue-label">THE DAILY FIX</p><h2>Signal, delivered.</h2><p>A concise briefing of the stories worth your attention.</p></div><form class="subscribe-form"><label class="sr-only" for="stripEmail">Email address</label><input id="stripEmail" type="email" placeholder="Email address" required><button type="submit">Join free ${icon("arrow")}</button></form></section>
    </main>${footer()}${bottomNav(page)}`;
}

function searchPage() {
  return `${header("search")}<main id="main-content" class="page-shell search-page">
    <p class="issue-label">SEARCH THE ARCHIVE</p><h1>Find a perspective</h1>
    <form class="search-form" role="search"><label for="searchInput">Search NewsFixd</label><div><input id="searchInput" type="search" placeholder="Try “artificial intelligence”" autofocus><button type="submit">${icon("search")} Search</button></div></form>
    <section class="search-results"><div class="results-heading"><h2>Recent stories</h2><p id="resultCount">${supporting.length + 1} results</p></div><div id="resultList">${card(sections.tech.hero, "result")}${supporting.map(story => card(story, "result")).join("")}</div><p class="no-results" hidden>No perspectives match that search.</p></section>
  </main>${footer()}${bottomNav("search")}`;
}

function articlePage() {
  const story = sections.latest.hero;
  return `${header()}<main id="main-content">
    <article class="article-page">
      <header class="article-header"><p class="issue-label">${story.category.toUpperCase()}</p><h1>${story.title}</h1><p class="article-dek">${story.summary}</p><div class="article-byline"><div class="avatar">JV</div><div><strong>${story.author}</strong><span>Senior correspondent · ${story.time}</span></div><button class="bookmark-button text-save" type="button">${icon("bookmark")} Save story</button></div></header>
      <figure class="article-hero"><img src="${story.image}" alt="A modern city skyline at dusk"><figcaption>A connected world is producing a more distributed model of influence. Photo: Unsplash.</figcaption></figure>
      <div class="article-layout"><aside class="share-rail"><span>SHARE</span><button type="button" data-share="x">X</button><button type="button" data-share="linkedin">in</button><button type="button" data-share="copy">↗</button></aside>
      <div class="article-copy"><p class="dropcap">The language of power is changing. For most of the last century, influence was measured through territory, military reach, and the institutions a nation could shape. Today, another layer sits across that old map: infrastructure, standards, data, and networks.</p>
      <p>Digital sovereignty has moved from a specialist concern to a central question of statecraft. Governments are deciding where information is stored, which systems carry it, and whose rules determine how it moves. These decisions look technical. Their consequences are deeply political.</p>
      <h2>Networks are becoming territory</h2><p>The most effective governments are not simply building walls around their technology. They are creating trusted corridors—agreements that let data, research, and commerce move while preserving meaningful public oversight.</p>
      <blockquote>“The new diplomatic advantage belongs to countries that can make trust operational.”</blockquote>
      <p>That favors coalitions with clear rules and reliable institutions. Smaller states can exert unusual influence when they set standards others want to adopt. Scale matters, but coherence now matters too.</p>
      <h2>A quieter kind of power</h2><p>The result is a diplomatic landscape that is more technical, more distributed, and often less visible. Its most important negotiations may produce no dramatic photograph. They produce protocols, procurement rules, research partnerships, and shared security practices.</p>
      <p>The challenge for citizens is to recognize these choices as public choices. The architecture of a connected society should not be left only to engineers or vendors. It belongs in the democratic conversation.</p>
      <div class="article-tags"><a href="/global/">Global Affairs</a><a href="/tech/">Technology</a><a href="/politics/">Policy</a></div></div></div>
    </article>
    <section class="more-stories page-shell"><p class="issue-label">CONTINUE READING</p><h2>More perspectives</h2><div class="more-grid">${supporting.slice(0,3).map(story => card(story)).join("")}</div></section>
  </main>${footer()}${bottomNav()}`;
}

function newsletterPage() {
  return `${header()}<main id="main-content" class="newsletter-page">
    <section class="newsletter-hero"><div class="newsletter-copy"><p class="issue-label">MONDAY THROUGH FRIDAY</p><h1>The world,<br><em>made legible.</em></h1><p>A concise morning briefing that connects the headline to the forces behind it. Written for curious people who value depth without the noise.</p>
    <form class="subscribe-form large"><label for="newsletterEmail">Your email address</label><div><input id="newsletterEmail" type="email" placeholder="you@example.com" required><button type="submit">Start reading ${icon("arrow")}</button></div><small>Free forever. Unsubscribe in one click.</small></form></div>
    <aside class="newsletter-preview"><div class="preview-top"><span>NEWSFIXD / 07:00</span><span>WEDNESDAY</span></div><p class="preview-kicker">GOOD MORNING</p><h2>Three forces shaping today</h2><ol><li><strong>A new diplomatic map</strong><span>Why middle powers are gaining ground.</span></li><li><strong>The practical AI turn</strong><span>Products move beyond the demo.</span></li><li><strong>Cities after five</strong><span>Downtown’s next chapter looks local.</span></li></ol><p class="preview-note">Plus: one remarkable chart, a useful read, and the idea we’re carrying into tomorrow.</p></aside></section>
    <section class="newsletter-benefits"><article><span>01</span><h2>Curated, not crowded</h2><p>Five essential stories selected by editors, not engagement algorithms.</p></article><article><span>02</span><h2>Context included</h2><p>We explain why a development matters and what deserves attention next.</p></article><article><span>03</span><h2>Finished in minutes</h2><p>Designed to give you clarity before the day starts asking for it.</p></article></section>
  </main>${footer()}${bottomNav()}`;
}

function advertisePage() {
  return `${header()}<main id="main-content" class="advertise-page">
    <section class="advertise-hero"><div><p class="issue-label">NEWSFIXD FOR BUSINESS</p><h1>Be useful<br>to your market.</h1><p>Reach attentive local readers through respectful, clearly labeled campaigns designed to fit the context around them.</p><a class="sales-button" href="mailto:advertising@newsfixd.com?subject=NewsFixd%20campaign">Plan a campaign ${icon("arrow")}</a></div><aside><span>AVAILABLE THIS MONTH</span><strong>4</strong><p>premium campaign placements</p></aside></section>
    <section class="inventory-section"><div class="inventory-heading"><p class="issue-label">CAMPAIGN INVENTORY</p><h2>Start focused. Expand with results.</h2></div><div class="inventory-grid">
      <article><span>01 / NATIVE</span><h3>In-feed story</h3><p>A labeled sponsored story placed naturally within a topic or local feed.</p><strong>From $750 / week</strong></article>
      <article><span>02 / ARTICLE</span><h3>Contextual placement</h3><p>A premium unit inside relevant reporting, selected by topic and geography.</p><strong>From $18 CPM</strong></article>
      <article><span>03 / EMAIL</span><h3>Daily briefing sponsor</h3><p>Primary visibility inside the weekday newsletter readers actively choose.</p><strong>From $500 / send</strong></article>
      <article><span>04 / LOCAL</span><h3>Business spotlight</h3><p>A multi-format package for openings, events, hiring, services, and community work.</p><strong>From $1,200 / package</strong></article>
    </div></section>
    <section class="standards-section"><div><p class="issue-label">AD STANDARDS</p><h2>Trust is the inventory.</h2></div><p>Every paid placement is labeled. Sponsors cannot buy editorial rankings or coverage. Claims must be accurate, creative must match the destination, and targeting must respect reader privacy.</p></section>
  </main>${footer()}${bottomNav()}`;
}

function partnerPage(kind) {
  const creator = kind === "creators";
  const content = creator ? {
    eyebrow: "NEWSFIXD CREATOR NETWORK",
    title: "Your community.<br>Your byline.<br>Your business.",
    dek: "Publish original local reporting, build a following, and earn through reader subscriptions and qualifying story performance.",
    cta: "Apply as a creator",
    subject: "NewsFixd creator application",
    steps: [["01", "Create", "Report original stories in text, photo, and—soon—video."], ["02", "Grow", "Reach readers by location and interest, with transparent performance data."], ["03", "Earn", "Offer paid subscriptions and receive payouts from qualifying work."]]
  } : {
    eyebrow: "NEWSFIXD PUBLISHER NETWORK",
    title: "More readers.<br>More reach.<br>More revenue.",
    dek: "Distribute approved original reporting through NewsFixd while retaining attribution, editorial control, audience insights, and revenue participation.",
    cta: "Apply as a publisher",
    subject: "NewsFixd publisher application",
    steps: [["01", "Connect", "Submit an approved full-text RSS or Atom feed with image rights."], ["02", "Control", "Choose what to distribute and preserve clear source attribution."], ["03", "Measure", "Track readership, geography, engagement, and eligible revenue."]]
  };
  return `${header()}<main id="main-content" class="partner-page">
    <section class="partner-hero"><p class="issue-label">${content.eyebrow}</p><h1>${content.title}</h1><p>${content.dek}</p><a class="sales-button" href="mailto:partners@newsfixd.com?subject=${encodeURIComponent(content.subject)}">${content.cta} ${icon("arrow")}</a></section>
    <section class="partner-steps">${content.steps.map(([number, title, description]) => `<article><span>${number}</span><h2>${title}</h2><p>${description}</p></article>`).join("")}</section>
    <section class="standards-section"><div><p class="issue-label">QUALITY FIRST</p><h2>Trust earns distribution.</h2></div><p>NewsFixd accepts original reporting from identifiable authors and approved publishers. Every submission must meet our standards for accuracy, sourcing, image rights, corrections, and transparent disclosure. Scraped, plagiarized, or mass-produced material is not eligible.</p></section>
  </main>${footer()}${bottomNav()}`;
}

function welcomePage() {
  const topics = ["Local News", "Politics", "Technology", "Business", "Science", "Global Affairs", "Culture", "Climate"];
  return `<main id="main-content" class="welcome-page"><a class="brand" href="/">NewsFixd<span></span></a><section class="welcome-panel"><p class="issue-label">WELCOME TO NEWSFIXD</p><h1>Make the news<br>yours.</h1><p>Choose the topics you want to follow. We’ll build a cleaner, more relevant front page around them.</p><div class="setup-progress"><span></span></div><fieldset><legend>Select at least three interests</legend><div class="interest-grid">${topics.map(topic => `<button type="button">${topic}<span>＋</span></button>`).join("")}</div></fieldset><div class="location-setup"><label for="locationInput">Your location</label><input id="locationInput" type="text" placeholder="City or ZIP code" value="Atlanta, GA"></div><button class="continue-button" type="button" disabled>Continue to NewsFixd ${icon("arrow")}</button><a class="skip-setup" href="/">Skip for now</a></section><aside class="welcome-art"><div class="art-card one"><span>LOCAL</span><strong>Your city is changing.</strong><small>Here’s what to know today.</small></div><div class="art-card two"><span>TECH</span><strong>Utility replaces spectacle.</strong><small>8 min read</small></div><div class="art-circle"></div></aside></main>`;
}

function render() {
  if (page === "search") return searchPage();
  if (page === "article") return articlePage();
  if (page === "newsletter") return newsletterPage();
  if (page === "advertise") return advertisePage();
  if (page === "creators" || page === "publishers") return partnerPage(page);
  if (page === "welcome") return welcomePage();
  return feedPage(sections[page] || sections.latest);
}

document.querySelector("#app").innerHTML = render();

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
menuButton?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.innerHTML = icon(open ? "close" : "menu");
});

document.querySelectorAll(".bookmark-button").forEach((button) => button.addEventListener("click", () => {
  button.classList.toggle("saved");
  button.setAttribute("aria-pressed", String(button.classList.contains("saved")));
  if (button.classList.contains("text-save")) button.innerHTML = `${icon("bookmark")} ${button.classList.contains("saved") ? "Saved" : "Save story"}`;
}));

document.querySelectorAll(".topic-chips button").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".topic-chips button").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
}));

document.querySelectorAll(".subscribe-form").forEach(form => form.addEventListener("submit", async event => {
  event.preventDefault();
  const button = form.querySelector("button");
  const input = form.querySelector("input");
  const originalLabel = button.innerHTML;
  button.textContent = "Joining…";
  button.disabled = true;
  try {
    const response = await fetch("https://api.knolyz.com/api/v1/public/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.value.trim(),
        source: "newsfixd",
        tags: ["newsletter", page]
      })
    });
    if (!response.ok) throw new Error("Signup unavailable");
    button.textContent = "You’re subscribed";
    input.value = "";
  } catch {
    button.innerHTML = originalLabel;
    button.disabled = false;
    input.setCustomValidity("We couldn’t save your email. Please try again.");
    input.reportValidity();
    input.addEventListener("input", () => input.setCustomValidity(""), { once: true });
  }
}));

const searchInput = document.querySelector("#searchInput");
document.querySelector(".search-form")?.addEventListener("submit", event => event.preventDefault());
searchInput?.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const cards = [...document.querySelectorAll("#resultList .story-card")];
  let count = 0;
  cards.forEach(card => {
    const visible = card.dataset.search.toLowerCase().includes(query);
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector("#resultCount").textContent = `${count} result${count === 1 ? "" : "s"}`;
  document.querySelector(".no-results").hidden = count !== 0;
});

document.querySelectorAll("[data-share]").forEach(button => button.addEventListener("click", async () => {
  if (button.dataset.share === "copy") {
    await navigator.clipboard?.writeText(location.href);
    button.textContent = "✓";
  }
}));

const interestButtons = document.querySelectorAll(".interest-grid button");
const continueButton = document.querySelector(".continue-button");
interestButtons.forEach(button => button.addEventListener("click", () => {
  button.classList.toggle("selected");
  button.querySelector("span").textContent = button.classList.contains("selected") ? "✓" : "＋";
  const selected = document.querySelectorAll(".interest-grid .selected").length;
  document.querySelector(".setup-progress span").style.width = `${Math.min(100, selected / 3 * 100)}%`;
  continueButton.disabled = selected < 3;
}));
continueButton?.addEventListener("click", () => location.href = "/");

document.querySelector(".profile-button")?.addEventListener("click", () => location.href = "/welcome/");
document.querySelector(".saved-tab")?.addEventListener("click", () => {
  document.querySelectorAll(".bookmark-button.saved")[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
});
