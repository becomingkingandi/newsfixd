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

window.toggleNav = () => {
  const nav = document.querySelector("#sideNav");
  nav?.classList.toggle("-translate-x-full");
};

document.addEventListener("click", (event) => {
  const control = event.target.closest("button, a");
  if (!control) return;

  const label = control.textContent.trim().toLowerCase();
  const symbol = control.querySelector(".material-symbols-outlined")?.textContent.trim();

  if (symbol === "menu") {
    event.preventDefault();
    window.toggleNav();
    return;
  }

  if (symbol === "account_circle") {
    event.preventDefault();
    window.location.href = "/welcome/";
    return;
  }

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

async function subscribe(email, button) {
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
    email.value = "";
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
}

document.querySelectorAll("form").forEach((form) => {
  const email = form.querySelector('input[type="email"]');
  if (!email) return;
  form.removeAttribute("onsubmit");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    subscribe(email, form.querySelector('button[type="submit"], button:not([type])'));
  });
});

document.querySelectorAll('input[type="email"]').forEach((email) => {
  if (email.closest("form")) return;
  const container = email.parentElement;
  const button = container?.querySelector("button") || container?.nextElementSibling?.closest("button");
  button?.addEventListener("click", (event) => {
    event.preventDefault();
    if (email.reportValidity()) subscribe(email, button);
  });
});

if (window.location.pathname.startsWith("/search")) {
  const input = document.querySelector('main input[type="text"], main input[type="search"]');
  const articles = [...document.querySelectorAll("main article")];
  const filter = () => {
    const query = input?.value.toLowerCase().trim() || "";
    articles.forEach((article) => {
      article.hidden = Boolean(query) && !article.textContent.toLowerCase().includes(query);
    });
  };
  input?.addEventListener("input", filter);
  input?.select();
}

document.querySelectorAll("main article.cursor-pointer").forEach((article) => {
  article.setAttribute("tabindex", "0");
  article.setAttribute("role", "link");
  const open = (event) => {
    if (event.target.closest("a, button, input")) return;
    window.location.href = "/article/";
  };
  article.addEventListener("click", open);
  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter") open(event);
  });
});
