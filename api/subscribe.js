export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST only" });
  }

  const email = String(req.body?.email || "").trim().toLowerCase();
  const source = String(req.body?.source || "newsfixd").slice(0, 100);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email required" });
  }

  try {
    const response = await fetch("https://api.knolyz.com/api/v1/public/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source,
        tags: ["newsletter", "newsfixd"]
      })
    });

    if (!response.ok) {
      return res.status(502).json({ error: "Subscription service unavailable" });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: "Subscription service unavailable" });
  }
}
