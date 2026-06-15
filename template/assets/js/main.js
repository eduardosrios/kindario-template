(() => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-primary-menu]");

  const closeMenu = () => {
    if (!navToggle || !menu) return;
    menu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    const icon = navToggle.querySelector("i");
    if (icon) {
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    }
  };

  if (navToggle && menu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("is-open", !isOpen);
      const icon = navToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars", isOpen);
        icon.classList.toggle("fa-xmark", !isOpen);
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  const supportMessages = {
    learn: "Receive a short field-informed overview before choosing a deeper action.",
    give: "Review practical giving options first. No financial details are requested here.",
    volunteer: "Share your interest in logistics, group mobilization, or partner conversations."
  };

  const supportNote = document.querySelector("[data-support-note]");
  const supportButtons = document.querySelectorAll("[data-support]");
  supportButtons.forEach((button) => {
    button.addEventListener("click", () => {
      supportButtons.forEach((candidate) => {
        candidate.classList.remove("active");
        candidate.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      const key = button.getAttribute("data-support");
      if (supportNote && key && supportMessages[key]) {
        supportNote.textContent = supportMessages[key];
      }
    });
  });

  const supportForm = document.querySelector("[data-support-form]");
  const formStatus = document.querySelector("[data-form-status]");
  if (supportForm && formStatus) {
    supportForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formStatus.textContent = "Use the contact paths below to continue with a verified Kindario representative.";
    });
  }

  const modal = document.querySelector("[data-video-modal]");
  const openVideo = document.querySelector("[data-open-video]");
  const closeVideoButtons = document.querySelectorAll("[data-close-video]");
  let lastFocused = null;

  const closeVideo = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  const openVideoModal = () => {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const panel = modal.querySelector(".modal-panel");
    if (panel) panel.focus();
  };

  if (openVideo) {
    openVideo.addEventListener("click", openVideoModal);
  }

  closeVideoButtons.forEach((button) => {
    button.addEventListener("click", closeVideo);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeVideo();
    }

    if (event.key === "Tab" && modal && !modal.hidden) {
      const focusable = modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
