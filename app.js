(() => {
  "use strict";

  const serviceData = {
    saving: {
      count: "06 options",
      heading: "Saving plans for different stages of life",
      description: "Choose by who you are saving for or how you prefer to save. Our team can explain the difference before you decide.",
      items: [
        { title: "Everyday saving", nepali: "दैनिक बचत", description: "For people who want to build a regular saving habit with frequent deposits.", label: "Build a habit", icon: "calendar" },
        { title: "Children's future", nepali: "बाल भविष्य बचत", description: "A starting point for families saving toward a child's future needs.", label: "For children", icon: "child" },
        { title: "Women's savings", nepali: "समृद्ध नारी बचत", description: "A saving plan created to support women members in managing financial goals.", label: "For women", icon: "flower" },
        { title: "Senior citizen savings", nepali: "ज्येष्ठ नागरिक बचत", description: "A saving option designed around the needs of senior members.", label: "For seniors", icon: "heart" },
        { title: "Fixed-period savings", nepali: "आवधिक बचत", description: "For money you can keep saved for an agreed period instead of using regularly.", label: "Longer-term", icon: "clock" },
        { title: "Travel savings", nepali: "भ्रमण बचत", description: "A goal-based option for gradually preparing for future travel expenses.", label: "Goal saving", icon: "plane" }
      ]
    },
    loan: {
      count: "06 purposes",
      heading: "Loans organised by what you need to do",
      description: "Loan approval, amount, security, interest and repayment depend on current cooperative rules and your eligibility.",
      items: [
        { title: "Business loan", nepali: "व्यवसाय ऋण", description: "For eligible members seeking funds to start, operate or expand a business.", label: "Business", icon: "store" },
        { title: "Education loan", nepali: "शैक्षिक ऋण", description: "For eligible education-related costs. Ask what institutions and expenses qualify.", label: "Education", icon: "book" },
        { title: "Home loan", nepali: "घर ऋण", description: "For eligible home-related needs, subject to valuation, security and repayment capacity.", label: "Housing", icon: "home" },
        { title: "Agriculture loan", nepali: "कृषि ऋण", description: "For eligible farming and agriculture-related activities or investment.", label: "Agriculture", icon: "leaf" },
        { title: "Women entrepreneurship", nepali: "महिला उद्यम ऋण", description: "A loan category intended to support eligible women-led enterprise activities.", label: "Enterprise", icon: "spark" },
        { title: "Vehicle or equipment", nepali: "हायर पर्चेज ऋण", description: "For eligible vehicle or equipment purchases under the cooperative's current terms.", label: "Purchase", icon: "vehicle" }
      ]
    },
    transfer: {
      count: "05 services",
      heading: "Ways to receive, send and manage everyday payments",
      description: "Availability can change. Contact the office before visiting to confirm the provider, identification and transaction requirements.",
      items: [
        { title: "eSewa Money Transfer", nepali: "ईसेवा मनी ट्रान्सफर", description: "A listed remittance option for sending or receiving eligible transactions.", label: "Remittance", icon: "transfer" },
        { title: "MoneyGram", nepali: "मनीग्राम", description: "A listed international money-transfer provider. Confirm current availability first.", label: "Remittance", icon: "globe" },
        { title: "Western Union", nepali: "वेस्टर्न युनियन", description: "A listed remittance provider for eligible international transfers.", label: "Remittance", icon: "transfer" },
        { title: "Mobile banking", nepali: "मोबाइल बैंकिङ", description: "Digital access for supported account services. Ask how to register and use it safely.", label: "Digital", icon: "phone" },
        { title: "Utility payment", nepali: "बिल भुक्तानी", description: "A listed service for supported everyday utility payments.", label: "Payments", icon: "bill" }
      ]
    }
  };

  const needData = {
    save: { label: "Best place to begin", title: "Choose a savings plan for your goal", copy: "We offer plans for daily saving, children, women, senior citizens, travel and fixed periods.", href: "#services", link: "See saving options", service: "saving" },
    borrow: { label: "Before choosing a loan", title: "Start with what the money is for", copy: "Explore loan categories for business, education, housing, agriculture, entrepreneurship and purchases.", href: "#services", link: "See loan purposes", service: "loan" },
    transfer: { label: "For money transfer and payments", title: "Check which provider is available", copy: "The cooperative lists remittance, mobile banking, SMS alerts and utility-payment services.", href: "#services", link: "See transfer services", service: "transfer" }
  };

  const icons = {
    calendar: '<path d="M5 5h14v14H5zM8 3v4m8-4v4M5 9h14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    child: '<circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M6 20c.7-4.2 2.7-6 6-6s5.3 1.8 6 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    flower: '<circle cx="12" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 9c-3-5-7-2-4 2-5-1-5 4-1 4-2 5 3 6 5 2 2 4 7 3 5-2 4 0 4-5-1-4 3-4 1-8-4-1-5 4-5 4Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    heart: '<path d="M12 20S4 15.3 4 9.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 3.5C20 15.3 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    clock: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    plane: '<path d="m4 13 16-8-6 15-2-6-8-1Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m12 14 8-9" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    store: '<path d="M4 9h16l-2-5H6L4 9Zm1 0v11h14V9M9 20v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23V5.5Zm16 0A3.5 3.5 0 0 0 16.5 2H12v18h4.5A3.5 3.5 0 0 1 20 23V5.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    home: '<path d="m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    leaf: '<path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M5 20c2-5 6-8 11-11" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    spark: '<path d="M12 2c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M19 16c.4 2 1.2 2.8 3 3-1.8.4-2.6 1.2-3 3-.4-1.8-1.2-2.6-3-3 1.8-.2 2.6-1 3-3Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    vehicle: '<path d="M4 14 6 8h12l2 6v5h-2v-2H6v2H4v-5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="8" cy="14" r="1.2" fill="currentColor"/><circle cx="16" cy="14" r="1.2" fill="currentColor"/>',
    transfer: '<path d="M4 8h15m0 0-4-4m4 4-4 4M20 16H5m0 0 4 4m-4-4 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9Z" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10 5h4m-3 14h2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    bill: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 8h6m-6 4h6m-6 4h3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
  };

  const elements = {
    header: document.querySelector("[data-header]"),
    menuButton: document.querySelector("[data-menu-button]"),
    mobileMenu: document.querySelector("[data-mobile-menu]"),
    serviceGrid: document.querySelector("[data-service-grid]"),
    serviceCount: document.querySelector("[data-service-count]"),
    serviceHeading: document.querySelector("[data-service-heading]"),
    serviceDescription: document.querySelector("[data-service-description]"),
    resultLabel: document.querySelector("[data-result-label]"),
    resultTitle: document.querySelector("[data-result-title]"),
    resultCopy: document.querySelector("[data-result-copy]"),
    resultLink: document.querySelector("[data-result-link]")
  };

  function renderServices(category) {
    const data = serviceData[category];
    if (!data) return;
    elements.serviceCount.textContent = data.count;
    elements.serviceHeading.textContent = data.heading;
    elements.serviceDescription.textContent = data.description;
    elements.serviceGrid.innerHTML = data.items.map((item, index) => `
      <article class="service-card reveal is-visible" style="--reveal-delay:${index * 45}ms">
        <div class="service-card-top">
          <span class="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[item.icon]}</svg></span>
          <span class="service-label">${item.label}</span>
        </div>
        <h4>${item.title}</h4>
        <span class="service-nepali">${item.nepali}</span>
        <p>${item.description}</p>
        <a href="tel:015314491" class="service-call">Ask about this <span aria-hidden="true">→</span></a>
      </article>
    `).join("");
    document.querySelectorAll("[data-service-tab]").forEach((tab) => {
      const selected = tab.dataset.serviceTab === category;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
  }

  function selectNeed(key) {
    const data = needData[key];
    if (!data) return;
    elements.resultLabel.textContent = data.label;
    elements.resultTitle.textContent = data.title;
    elements.resultCopy.textContent = data.copy;
    elements.resultLink.href = data.href;
    elements.resultLink.firstChild.textContent = `${data.link} `;
    document.querySelectorAll("[data-need]").forEach((button) => {
      const selected = button.dataset.need === key;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
    elements.resultLink.onclick = () => renderServices(data.service);
  }

  function toggleMobileMenu() {
    const open = elements.menuButton.getAttribute("aria-expanded") === "true";
    elements.menuButton.setAttribute("aria-expanded", String(!open));
    elements.menuButton.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    elements.mobileMenu.hidden = open;
  }

  function closeMobileMenu() {
    elements.menuButton.setAttribute("aria-expanded", "false");
    elements.menuButton.setAttribute("aria-label", "Open menu");
    elements.mobileMenu.hidden = true;
  }

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    items.forEach((item) => observer.observe(item));
  }

  function setupFaq() {
    const details = [...document.querySelectorAll(".faq-list details")];
    details.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        details.forEach((other) => { if (other !== item) other.open = false; });
      });
    });
  }

  document.querySelectorAll("[data-need]").forEach((button) => button.addEventListener("click", () => selectNeed(button.dataset.need)));
  document.querySelectorAll("[data-service-tab]").forEach((button) => button.addEventListener("click", () => renderServices(button.dataset.serviceTab)));
  elements.menuButton.addEventListener("click", toggleMobileMenu);
  elements.mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));
  window.addEventListener("scroll", () => elements.header.classList.toggle("is-scrolled", window.scrollY > 16), { passive: true });
  window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMobileMenu(); });
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
  renderServices("saving");
  setupReveal();
  setupFaq();
})();
