(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const backToTop = document.querySelector("[data-back-to-top]");
  const serviceTabs = [...document.querySelectorAll("[data-service-tab]")];
  const servicePanels = [...document.querySelectorAll("[data-service-panel]")];

  function closeMenu() {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
  }

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobileMenu.hidden = isOpen;
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  function activateService(name) {
    serviceTabs.forEach((tab) => {
      const selected = tab.dataset.serviceTab === name;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    servicePanels.forEach((panel) => {
      panel.hidden = panel.dataset.servicePanel !== name;
    });
  }

  serviceTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateService(tab.dataset.serviceTab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % serviceTabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + serviceTabs.length) % serviceTabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = serviceTabs.length - 1;
      activateService(serviceTabs[next].dataset.serviceTab);
      serviceTabs[next].focus();
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  revealItems.forEach((item) => item.style.setProperty("--delay", `${item.dataset.revealDelay || 0}ms`));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 30);
    if (backToTop) backToTop.hidden = window.scrollY < 650;
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  document.querySelector("[data-year]").textContent = String(new Date().getFullYear());
})();
