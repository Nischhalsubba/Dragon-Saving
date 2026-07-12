(() => {
  "use strict";

  const STORAGE_KEY = "dragon-saving-goal-v2";
  const DEFAULT_GOAL = Object.freeze({
    name: "Emergency fund",
    currency: "NPR",
    target: 100000,
    current: 25000
  });

  const stageConfig = [
    { id: "egg", name: "Dragon Egg", min: 0, next: 25 },
    { id: "hatchling", name: "Hatchling", min: 25, next: 50 },
    { id: "young", name: "Young Dragon", min: 50, next: 75 },
    { id: "guardian", name: "Guardian", min: 75, next: 100 },
    { id: "legendary", name: "Legendary", min: 100, next: null }
  ];

  const elements = {
    header: document.querySelector("[data-header]"),
    menuButton: document.querySelector("[data-menu-button]"),
    mobileMenu: document.querySelector("[data-mobile-menu]"),
    goalDialog: document.querySelector("[data-goal-dialog]"),
    goalForm: document.querySelector("[data-goal-form]"),
    goalError: document.querySelector("[data-goal-error]"),
    depositDialog: document.querySelector("[data-deposit-dialog]"),
    depositForm: document.querySelector("[data-deposit-form]"),
    depositError: document.querySelector("[data-deposit-error]"),
    depositCurrency: document.querySelector("[data-deposit-currency]"),
    goalName: document.querySelector("[data-goal-name]"),
    currentAmount: document.querySelector("[data-current-amount]"),
    targetAmount: document.querySelector("[data-target-amount]"),
    progressBar: document.querySelector("[data-progressbar]"),
    progressFill: document.querySelector("[data-progress-fill]"),
    progressPercent: document.querySelector("[data-progress-percent]"),
    nextMilestone: document.querySelector("[data-next-milestone]"),
    miniMilestone: document.querySelector("[data-mini-milestone]"),
    dragonStage: document.querySelector(".dragon-stage"),
    stageName: document.querySelector("[data-stage-name]"),
    toast: document.querySelector("[data-toast]"),
    toastMessage: document.querySelector("[data-toast-message]")
  };

  let goal = loadGoal();
  let toastTimer;

  function loadGoal() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return { ...DEFAULT_GOAL };

      const parsed = JSON.parse(saved);
      const valid = parsed
        && typeof parsed.name === "string"
        && typeof parsed.currency === "string"
        && Number.isFinite(Number(parsed.target))
        && Number.isFinite(Number(parsed.current));

      if (!valid) return { ...DEFAULT_GOAL };

      const target = Math.max(1, Number(parsed.target));
      const current = Math.min(target, Math.max(0, Number(parsed.current)));

      return {
        name: parsed.name.trim().slice(0, 42) || DEFAULT_GOAL.name,
        currency: parsed.currency,
        target,
        current
      };
    } catch (error) {
      console.warn("Dragon Saving could not read saved data.", error);
      return { ...DEFAULT_GOAL };
    }
  }

  function saveGoal() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goal));
    } catch (error) {
      console.warn("Dragon Saving could not save data.", error);
      showToast("Progress updated for this session only");
    }
  }

  function formatMoney(value, currency = goal.currency) {
    try {
      return new Intl.NumberFormat("en-NP", {
        style: "currency",
        currency,
        currencyDisplay: "code",
        maximumFractionDigits: 0
      }).format(value).replace(/\u00a0/g, " ");
    } catch {
      return `${currency} ${Math.round(value).toLocaleString("en-US")}`;
    }
  }

  function getProgress() {
    return Math.min(100, Math.max(0, (goal.current / goal.target) * 100));
  }

  function getStage(progress = getProgress()) {
    if (progress >= 100) return stageConfig[4];
    if (progress >= 75) return stageConfig[3];
    if (progress >= 50) return stageConfig[2];
    if (progress >= 25) return stageConfig[1];
    return stageConfig[0];
  }

  function getNextStage(stage) {
    const index = stageConfig.findIndex((item) => item.id === stage.id);
    return stageConfig[index + 1] || null;
  }

  function renderGoal({ announce = false } = {}) {
    const progress = getProgress();
    const roundedProgress = Math.round(progress);
    const stage = getStage(progress);
    const nextStage = getNextStage(stage);

    elements.goalName.textContent = goal.name;
    elements.currentAmount.textContent = formatMoney(goal.current);
    elements.targetAmount.textContent = formatMoney(goal.target);
    elements.progressFill.style.width = `${progress}%`;
    elements.progressPercent.textContent = `${roundedProgress}%`;
    elements.progressBar.setAttribute("aria-valuenow", String(roundedProgress));
    elements.progressBar.setAttribute(
      "aria-valuetext",
      `${formatMoney(goal.current)} saved out of ${formatMoney(goal.target)}`
    );
    elements.dragonStage.dataset.stage = stage.id;
    elements.stageName.textContent = stage.name;
    elements.depositCurrency.textContent = goal.currency;

    if (nextStage) {
      const nextAmount = (nextStage.min / 100) * goal.target;
      const remaining = Math.max(0, nextAmount - goal.current);
      elements.nextMilestone.textContent = `${formatMoney(remaining)} to ${nextStage.name}`;
      elements.miniMilestone.textContent = `${formatMoney(remaining)} away`;
    } else {
      elements.nextMilestone.textContent = "Goal complete - legendary unlocked";
      elements.miniMilestone.textContent = "Goal complete";
    }

    document.querySelectorAll("[data-stage-card]").forEach((card) => {
      card.classList.toggle("active", card.dataset.stageCard === stage.id);
    });

    if (announce) {
      const message = progress >= 100
        ? `${goal.name} completed. Legendary dragon unlocked.`
        : `${goal.name} is now ${roundedProgress}% complete.`;
      showToast(message);
    }
  }

  function openGoalDialog() {
    const form = elements.goalForm;
    form.elements.goalName.value = goal.name;
    form.elements.currency.value = goal.currency;
    form.elements.target.value = String(goal.target);
    form.elements.current.value = String(goal.current);
    elements.goalError.textContent = "";
    openDialog(elements.goalDialog);
    requestAnimationFrame(() => form.elements.goalName.focus());
  }

  function openDepositDialog() {
    if (goal.current >= goal.target) {
      showToast("This goal is already complete");
      return;
    }

    elements.depositForm.reset();
    elements.depositError.textContent = "";
    elements.depositCurrency.textContent = goal.currency;
    openDialog(elements.depositDialog);
    requestAnimationFrame(() => elements.depositForm.elements.deposit.focus());
  }

  function openDialog(dialog) {
    closeMobileMenu();
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.classList.add("modal-open");
  }

  function closeDialog(dialog) {
    if (dialog.open && typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    document.body.classList.remove("modal-open");
  }

  function handleGoalSubmit(event) {
    const submitter = event.submitter;
    if (submitter?.value === "cancel") {
      document.body.classList.remove("modal-open");
      return;
    }

    event.preventDefault();
    const data = new FormData(elements.goalForm);
    const name = String(data.get("goalName") || "").trim();
    const currency = String(data.get("currency") || "NPR");
    const target = Number(data.get("target"));
    const current = Number(data.get("current"));

    if (!name) {
      elements.goalError.textContent = "Give the goal a name before saving.";
      elements.goalForm.elements.goalName.focus();
      return;
    }

    if (!Number.isFinite(target) || target <= 0) {
      elements.goalError.textContent = "The target amount must be greater than zero.";
      elements.goalForm.elements.target.focus();
      return;
    }

    if (!Number.isFinite(current) || current < 0) {
      elements.goalError.textContent = "The saved amount cannot be negative.";
      elements.goalForm.elements.current.focus();
      return;
    }

    if (current > target) {
      elements.goalError.textContent = "The saved amount cannot be higher than the target.";
      elements.goalForm.elements.current.focus();
      return;
    }

    goal = { name, currency, target, current };
    saveGoal();
    renderGoal({ announce: true });
    closeDialog(elements.goalDialog);
  }

  function handleDepositSubmit(event) {
    const submitter = event.submitter;
    if (submitter?.value === "cancel") {
      document.body.classList.remove("modal-open");
      return;
    }

    event.preventDefault();
    const amount = Number(new FormData(elements.depositForm).get("deposit"));
    const remaining = goal.target - goal.current;

    if (!Number.isFinite(amount) || amount <= 0) {
      elements.depositError.textContent = "Enter an amount greater than zero.";
      elements.depositForm.elements.deposit.focus();
      return;
    }

    if (amount > remaining) {
      elements.depositError.textContent = `Only ${formatMoney(remaining)} remains to complete this goal.`;
      elements.depositForm.elements.deposit.focus();
      return;
    }

    const previousStage = getStage();
    goal.current += amount;
    saveGoal();
    renderGoal();
    closeDialog(elements.depositDialog);

    const newStage = getStage();
    if (newStage.id !== previousStage.id) {
      showToast(`${newStage.name} unlocked`);
    } else if (goal.current >= goal.target) {
      showToast("Goal complete - legendary dragon unlocked");
    } else {
      showToast(`${formatMoney(amount)} added to ${goal.name}`);
    }
  }

  function resetGoal() {
    const confirmed = window.confirm(
      "Reset this browser demo to the original Emergency fund goal? This cannot be undone."
    );
    if (!confirmed) return;

    goal = { ...DEFAULT_GOAL };
    saveGoal();
    renderGoal();
    showToast("Demo goal reset");
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    elements.toastMessage.textContent = message;
    elements.toast.hidden = false;
    elements.toast.classList.remove("is-visible");
    requestAnimationFrame(() => elements.toast.classList.add("is-visible"));
    toastTimer = window.setTimeout(() => {
      elements.toast.hidden = true;
      elements.toast.classList.remove("is-visible");
    }, 3600);
  }

  function toggleMobileMenu() {
    const isOpen = elements.menuButton.getAttribute("aria-expanded") === "true";
    elements.menuButton.setAttribute("aria-expanded", String(!isOpen));
    elements.menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    elements.mobileMenu.hidden = isOpen;
  }

  function closeMobileMenu() {
    elements.menuButton.setAttribute("aria-expanded", "false");
    elements.menuButton.setAttribute("aria-label", "Open menu");
    elements.mobileMenu.hidden = true;
  }

  function setupRevealAnimations() {
    const items = document.querySelectorAll(".reveal");
    items.forEach((item) => {
      const delay = Number(item.dataset.revealDelay || 0);
      item.style.setProperty("--reveal-delay", `${delay}ms`);
    });

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

  function setupFaqBehavior() {
    const details = [...document.querySelectorAll(".faq-list details")];
    details.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        details.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  function setupDialogBackdropClose(dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside = event.clientX >= rect.left
        && event.clientX <= rect.right
        && event.clientY >= rect.top
        && event.clientY <= rect.bottom;
      if (!isInside) closeDialog(dialog);
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
    });
  }

  document.querySelectorAll("[data-open-goal]").forEach((button) => {
    button.addEventListener("click", openGoalDialog);
  });

  document.querySelectorAll("[data-open-deposit]").forEach((button) => {
    button.addEventListener("click", openDepositDialog);
  });

  document.querySelectorAll("[data-quick-amount]").forEach((button) => {
    button.addEventListener("click", () => {
      elements.depositForm.elements.deposit.value = button.dataset.quickAmount;
      elements.depositForm.elements.deposit.focus();
    });
  });

  document.querySelector("[data-reset]").addEventListener("click", resetGoal);
  elements.goalForm.addEventListener("submit", handleGoalSubmit);
  elements.depositForm.addEventListener("submit", handleDepositSubmit);
  elements.menuButton.addEventListener("click", toggleMobileMenu);
  elements.mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));

  window.addEventListener("scroll", () => {
    elements.header.classList.toggle("is-scrolled", window.scrollY > 18);
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });

  setupDialogBackdropClose(elements.goalDialog);
  setupDialogBackdropClose(elements.depositDialog);
  setupRevealAnimations();
  setupFaqBehavior();
  renderGoal();

  document.querySelector("[data-year]").textContent = String(new Date().getFullYear());
})();
