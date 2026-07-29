const routeByLabel = {
  latest: "/",
  home: "/",
  local: "/local/",
  global: "/global/",
  politics: "/politics/",
  tech: "/tech/",
  technology: "/tech/",
  business: "/business/",
  science: "/science/",
  newsletter: "/newsletter/",
  newsletters: "/newsletter/",
  about: "/about.html",
  privacy: "/privacy.html",
  terms: "/terms.html",
  rss: "/feed.xml"
};

document.querySelectorAll('a[href="#"]').forEach((link) => {
  const label = link.textContent.trim().toLowerCase();
  if (routeByLabel[label]) link.href = routeByLabel[label];
});

document.addEventListener("click", (event) => {
  const control = event.target.closest("button, a");
  if (!control) return;

  const label = control.textContent.trim().toLowerCase();
  const symbol = control.querySelector(".material-symbols-outlined")?.textContent.trim();

  if (symbol === "search" || label === "search") {
    event.preventDefault();
    window.location.href = "/search/";
    return;
  }

  if (symbol === "bookmark" || symbol === "bookmark_border") {
    event.preventDefault();
    const active = control.getAttribute("aria-pressed") === "true";
    control.setAttribute("aria-pressed", String(!active));
    const icon = control.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = active ? "bookmark_border" : "bookmark";
    return;
  }

  if (
    control.matches('a[href="#"]') &&
    /read|story|perspective|briefing|analysis|roadmap|explore/.test(label)
  ) {
    event.preventDefault();
    window.location.href = "/article/";
  }
});

document.querySelectorAll("form").forEach((form) => {
  const email = form.querySelector('input[type="email"]');
  if (!email) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"], button:not([type])');
    const priorLabel = button?.textContent;
    if (button) {
      button.disabled = true;
      button.textContent = "Joining…";
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value.trim(), source: "newsfixd" })
      });
      if (!response.ok) throw new Error("Subscription unavailable");
      form.reset();
      if (button) button.textContent = "Subscribed";
    } catch {
      if (button) {
        button.disabled = false;
        button.textContent = priorLabel;
      }
      email.setCustomValidity("We couldn’t subscribe you. Please try again.");
      email.reportValidity();
      email.addEventListener("input", () => email.setCustomValidity(""), { once: true });
    }
  });
});
