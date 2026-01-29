(() => {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");

  const setExpanded = (expanded) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(expanded));
    nav.classList.toggle("is-open", expanded);
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      setExpanded(!expanded);
    });

    // Close menu on navigation
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLAnchorElement) setExpanded(false);
    });

    // Close menu on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setExpanded(false);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!(e.target instanceof Node)) return;
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      setExpanded(false);
    });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Friendly focus for hash navigation (accessibility)
  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  });
})();

