(() => {
  "use strict";
  const button = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-mobile-menu]");
  const year = document.querySelector("[data-year]");
  const closeMenu = (returnFocus = false) => {
    if (!button || !menu) {return;}
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open menu");
    menu.hidden = true;
    if (returnFocus) {button.focus();}
  };
  if (button && menu) {
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      button.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.hidden = open;
    });
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {closeMenu();}
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !menu.hidden) {closeMenu(true);}
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {closeMenu();}
    });
  }
  document.querySelectorAll(".service-list details").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {return;}
      document.querySelectorAll(".service-list details").forEach((other) => {
        if (other !== item) {other.open = false;}
      });
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target && target.tagName === "DETAILS") {target.open = true;}
    });
  });
  if (year) {year.textContent = String(new Date().getFullYear());}
})();
