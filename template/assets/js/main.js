const amountNotes = {
  "$25": "$25 can help move one food parcel into a verified delivery route.",
  "$60": "$60 can support classroom supplies for three children.",
  "$110": "$110 can fund water storage parts for one repair day.",
  "$250": "$250 can help cover a full volunteer packing shift."
};

const heroSlider = document.querySelector("[data-hero-slider]");

if (heroSlider) {
  const heroShell = document.querySelector("[data-hero-slider-shell]");
  const slides = Array.from(heroSlider.querySelectorAll("[data-hero-slide]"));
  const dots = Array.from(heroSlider.querySelectorAll("[data-hero-dot]"));
  const prevButton = heroSlider.querySelector("[data-hero-prev]");
  const nextButton = heroSlider.querySelector("[data-hero-next]");
  const timerIndicator = heroSlider.querySelector("[data-hero-timer]");
  const timerIcon = heroSlider.querySelector("[data-hero-timer-icon]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroSlideDuration = 6500;
  const heroTimerFlipDuration = 520;
  const heroTimerIcons = [
    "https://cdn-icons-png.flaticon.com/512/3162/3162269.png",
    "https://cdn-icons-png.flaticon.com/512/733/733638.png",
    "https://cdn-icons-png.flaticon.com/512/17123/17123553.png",
    "https://cdn-icons-png.flaticon.com/512/11618/11618743.png"
  ];
  let activeSlide = 0;
  let slideTimer;
  let timerFlipSwapTimeout;
  let timerFlipCleanupTimeout;

  const showHeroSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeSlide);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });

    if (heroShell) {
      heroShell.dataset.heroSlide = String(activeSlide);
    }

    if (timerIndicator) {
      timerIndicator.dataset.timerSlide = String(activeSlide);
    }

    if (timerIcon && heroTimerIcons[activeSlide]) {
      timerIcon.src = heroTimerIcons[activeSlide];
    }
  };

  const resetHeroTimer = () => {
    if (!timerIndicator) return;

    window.clearTimeout(timerFlipSwapTimeout);
    window.clearTimeout(timerFlipCleanupTimeout);
    timerIndicator.classList.remove("is-flipping");

    if (reduceMotion || slides.length < 2) {
      timerIndicator.classList.remove("is-running");
      return;
    }

    timerIndicator.classList.remove("is-running");
    void timerIndicator.offsetWidth;
    timerIndicator.classList.add("is-running");
  };

  const showHeroSlideWithFlip = (index) => {
    const nextSlideIndex = (index + slides.length) % slides.length;

    if (!timerIndicator || reduceMotion || slides.length < 2) {
      showHeroSlide(index);
      resetHeroTimer();
      return;
    }

    timerIndicator.classList.remove("is-running");
    timerIndicator.classList.remove("is-flipping");
    timerIndicator.dataset.timerSlide = String(nextSlideIndex);

    if (timerIcon && heroTimerIcons[nextSlideIndex]) {
      timerIcon.src = heroTimerIcons[nextSlideIndex];
    }

    void timerIndicator.offsetWidth;
    timerIndicator.classList.add("is-flipping");

    timerFlipSwapTimeout = window.setTimeout(() => {
      showHeroSlide(index);
      resetHeroTimer();
    }, heroTimerFlipDuration / 2);

    timerFlipCleanupTimeout = window.setTimeout(() => {
      timerIndicator.classList.remove("is-flipping");
    }, heroTimerFlipDuration);
  };

  const advanceHeroSlideWithFlip = () => {
    showHeroSlideWithFlip(activeSlide + 1);
  };

  const startHeroSlider = () => {
    resetHeroTimer();

    if (reduceMotion || slides.length < 2) return;

    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(() => {
      advanceHeroSlideWithFlip();
    }, heroSlideDuration);
  };

  const restartHeroSliderAfterClick = () => {
    window.clearInterval(slideTimer);

    if (reduceMotion || slides.length < 2) return;

    window.setTimeout(() => {
      window.clearInterval(slideTimer);
      slideTimer = window.setInterval(() => {
        advanceHeroSlideWithFlip();
      }, heroSlideDuration);
    }, heroTimerFlipDuration);
  };

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      showHeroSlideWithFlip(dotIndex);
      restartHeroSliderAfterClick();
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showHeroSlideWithFlip(activeSlide - 1);
      restartHeroSliderAfterClick();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showHeroSlideWithFlip(activeSlide + 1);
      restartHeroSliderAfterClick();
    });
  }

  showHeroSlide(0);
  startHeroSlider();
}

document.querySelectorAll(".amount-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".amount-chip").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");

    const note = document.querySelector("#amount-note");
    if (note) {
      note.textContent = amountNotes[button.dataset.amount] || amountNotes["$25"];
    }
  });
});

document.querySelectorAll(".support-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".support-tab").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
  });
});

document.querySelectorAll(".amount-chip").forEach((button) => {
  button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");
});

document.querySelectorAll(".support-tab").forEach((button) => {
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", button.classList.contains("is-active") ? "true" : "false");
});

const supportForm = document.querySelector(".support-form");

if (supportForm) {
  supportForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = supportForm.querySelector("button[type='submit']");
    if (!submitButton) return;

    const originalText = submitButton.textContent;
    submitButton.textContent = "Support route saved";
    submitButton.disabled = true;

    window.setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2200);
  });
}

const footerDonateForm = document.querySelector(".footer-donate-form");

if (footerDonateForm) {
  const footerInput = footerDonateForm.querySelector("input[type='email']");
  const footerNote = document.createElement("p");
  footerNote.className = "footer-form-note";
  footerNote.setAttribute("aria-live", "polite");
  footerDonateForm.appendChild(footerNote);

  footerDonateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (footerInput && !footerInput.validity.valid) {
      footerNote.textContent = "Enter a valid email to receive field updates.";
      footerNote.dataset.state = "error";
      footerInput.focus();
      return;
    }

    const submitButton = footerDonateForm.querySelector("button[type='submit']");
    if (!submitButton) return;

    const originalText = submitButton.textContent;
    submitButton.textContent = "Route saved";
    footerNote.textContent = "Your field update route was saved.";
    footerNote.dataset.state = "success";
    submitButton.disabled = true;

    window.setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      footerNote.textContent = "";
      delete footerNote.dataset.state;
    }, 2200);
  });
}

const languageSwitcher = document.querySelector(".language-switcher");

if (languageSwitcher) {
  const languagePanel = languageSwitcher.closest(".hero-top-panel");
  const languageMenu = languagePanel?.querySelector(".language-menu");
  const currentButton = languageSwitcher.querySelector(".language-current");
  const currentCode = currentButton?.querySelector(".language-code");
  const languageLinks = Array.from(languageMenu?.querySelectorAll("a[lang]") || []);
  const closeLanguageMenu = () => {
    languageSwitcher.classList.remove("is-open");
    currentButton?.setAttribute("aria-expanded", "false");
  };

  const toggleLanguageMenu = () => {
    const isOpen = languageSwitcher.classList.toggle("is-open");
    currentButton?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  const setCurrentLanguage = (lang) => {
    const selectedLink = languageLinks.find((link) => link.lang === lang);
    if (!selectedLink || !currentCode) return;

    const selectedLabel = selectedLink.dataset.languageLabel || selectedLink.textContent.trim();
    const selectedCode = selectedLink.dataset.languageCode || selectedLink.textContent.trim();

    languageSwitcher.dataset.currentLanguage = lang;
    currentCode.textContent = selectedCode;
    currentButton?.setAttribute("aria-label", `Current language: ${selectedLabel}`);

    languageLinks.forEach((link) => {
      link.hidden = link.lang === lang;
    });
  };

  languageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setCurrentLanguage(link.lang);
      closeLanguageMenu();
      currentButton?.focus();
    });
  });

  currentButton?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleLanguageMenu();
  });

  document.addEventListener("click", (event) => {
    if (languagePanel && !languagePanel.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  setCurrentLanguage(languageSwitcher.dataset.currentLanguage || "en");
  currentButton?.setAttribute("aria-expanded", "false");
}
