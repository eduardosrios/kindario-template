const amountNotes = {
  "$25": "$25 can help move one food parcel into a verified delivery route.",
  "$60": "$60 can support classroom supplies for three children.",
  "$110": "$110 can fund water storage parts for one repair day.",
  "$250": "$250 can help cover a full volunteer packing shift."
};

if (window.GLightbox) {
  GLightbox({
    selector: ".kindario-video-lightbox",
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    moreLength: 0
  });
}

document.querySelectorAll("[data-color-accordion]").forEach((accordion) => {
  const items = Array.from(accordion.querySelectorAll(".color-accordion-item"));

  items.forEach((item) => {
    const trigger = item.querySelector(".color-accordion-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");

      items.forEach((currentItem) => {
        const currentTrigger = currentItem.querySelector(".color-accordion-trigger");
        const isActive = currentItem === item ? willOpen : false;
        currentItem.classList.toggle("is-open", isActive);
        currentTrigger?.setAttribute("aria-expanded", isActive ? "true" : "false");
      });

      if (!willOpen) {
        const firstItem = items[0];
        const firstTrigger = firstItem?.querySelector(".color-accordion-trigger");
        firstItem?.classList.add("is-open");
        firstTrigger?.setAttribute("aria-expanded", "true");
      }
    });
  });
});

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
  let heroBgTransitionTimeout;

  const animateHeroBackgroundSwap = () => {
    if (!heroShell || reduceMotion) return;

    const shellStyles = window.getComputedStyle(heroShell);
    const oldImage = shellStyles.getPropertyValue("--hero-shell-image").trim();
    const oldOverlay = shellStyles.getPropertyValue("--hero-shell-overlay").trim();
    const oldBackgroundColor = shellStyles.getPropertyValue("--hero-shell-bg").trim();

    if (!oldImage || oldImage === "none") return;

    const previousTransition = heroShell.querySelector(".hero-bg-transition");
    if (previousTransition) previousTransition.remove();

    const transitionLayer = document.createElement("span");
    transitionLayer.className = "hero-bg-transition";
    transitionLayer.setAttribute("aria-hidden", "true");
    transitionLayer.style.backgroundColor = oldBackgroundColor || "transparent";
    transitionLayer.style.backgroundImage = oldOverlay && oldOverlay !== "none" ? `${oldOverlay}, ${oldImage}` : oldImage;

    heroShell.prepend(transitionLayer);

    window.clearTimeout(heroBgTransitionTimeout);
    heroBgTransitionTimeout = window.setTimeout(() => {
      transitionLayer.remove();
    }, 760);
  };

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
      if (heroShell.dataset.heroSlide !== String(activeSlide)) {
        animateHeroBackgroundSwap();
      }
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

document.querySelectorAll("[data-card-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".card-carousel-track");
  const cards = Array.from(track?.querySelectorAll(".route-card") || []);
  const controls = carousel.querySelector("[data-carousel-controls]");

  if (!track || !cards.length || !controls) return;

  let activePage = 0;
  let pagePositions = [];
  let carouselScrollTimer;
  let carouselProgrammaticTimer;
  let isProgrammaticScroll = false;

  const setActiveDot = (index) => {
    const dots = Array.from(controls.querySelectorAll("[data-carousel-dot]"));
    activePage = Math.max(0, Math.min(index, dots.length - 1));

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activePage;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const getPagePositions = () => {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (maxScroll <= 24) return [0];

    const pageCount = Math.max(2, Math.ceil(track.scrollWidth / track.clientWidth));
    const positions = [];

    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      const target = pageIndex === pageCount - 1 ? maxScroll : Math.min(pageIndex * track.clientWidth, maxScroll);
      const previous = positions[positions.length - 1];

      if (previous === undefined || Math.abs(target - previous) > 24) {
        positions.push(target);
      }
    }

    return positions;
  };

  const renderDots = () => {
    pagePositions = getPagePositions();
    controls.innerHTML = "";

    pagePositions.forEach((position, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.dataset.carouselDot = String(index);
      dot.setAttribute("aria-label", `Show carousel position ${index + 1}`);
      dot.setAttribute("aria-current", index === activePage ? "true" : "false");
      dot.classList.toggle("is-active", index === activePage);
      dot.addEventListener("click", () => scrollToPage(index));
      controls.appendChild(dot);
    });

    setActiveDot(Math.min(activePage, pagePositions.length - 1));
  };

  const scrollToPage = (index) => {
    const nextIndex = Math.max(0, Math.min(index, pagePositions.length - 1));
    const left = pagePositions[nextIndex];

    isProgrammaticScroll = true;
    window.clearTimeout(carouselProgrammaticTimer);

    track.scrollTo({
      left,
      behavior: "smooth"
    });

    setActiveDot(nextIndex);

    carouselProgrammaticTimer = window.setTimeout(() => {
      isProgrammaticScroll = false;
    }, 700);
  };

  const updateActiveFromScroll = () => {
    const nearestIndex = pagePositions.reduce((nearest, position, index) => {
      return Math.abs(position - track.scrollLeft) < Math.abs(pagePositions[nearest] - track.scrollLeft) ? index : nearest;
    }, 0);

    setActiveDot(nearestIndex);
  };

  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToPage(activePage - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToPage(activePage + 1);
    }
  });

  track.addEventListener("scroll", () => {
    if (isProgrammaticScroll) return;

    window.clearTimeout(carouselScrollTimer);
    carouselScrollTimer = window.setTimeout(updateActiveFromScroll, 80);
  });

  window.addEventListener("resize", () => {
    window.clearTimeout(carouselScrollTimer);
    carouselScrollTimer = window.setTimeout(renderDots, 120);
  });

  renderDots();
});

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

const impactSteps = document.querySelector(".impact-steps");

if (impactSteps) {
  const svg = impactSteps.querySelector(".impact-connectors");
  const lines = Array.from(svg?.querySelectorAll("line") || []);
  const arrows = Array.from(impactSteps.querySelectorAll(".impact-arrow"));
  const nodes = Array.from(impactSteps.querySelectorAll(".impact-step-node"));
  let impactResizeFrame;

  const syncImpactConnectors = () => {
    if (!svg || lines.length < nodes.length - 1 || nodes.length < 2 || window.innerWidth < 992) return;

    const wrapRect = impactSteps.getBoundingClientRect();
    const centers = nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left - wrapRect.left + rect.width / 2,
        y: rect.top - wrapRect.top + rect.height / 2
      };
    });

    svg.setAttribute("viewBox", `0 0 ${wrapRect.width} ${wrapRect.height}`);

    for (let index = 0; index < nodes.length - 1; index += 1) {
      const start = centers[index];
      const end = centers[index + 1];
      const line = lines[index];
      const arrow = arrows[index];
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      const inset = 78;
      const arrowX = (start.x + end.x) / 2;
      const arrowY = (start.y + end.y) / 2;
      const lineStart = {
        x: start.x + Math.cos(angle) * inset,
        y: start.y + Math.sin(angle) * inset
      };
      const lineEnd = {
        x: end.x - Math.cos(angle) * inset,
        y: end.y - Math.sin(angle) * inset
      };

      line.setAttribute("x1", lineStart.x.toFixed(2));
      line.setAttribute("y1", lineStart.y.toFixed(2));
      line.setAttribute("x2", lineEnd.x.toFixed(2));
      line.setAttribute("y2", lineEnd.y.toFixed(2));

      if (arrow) {
        arrow.style.left = `${arrowX}px`;
        arrow.style.top = `${arrowY}px`;
        arrow.style.setProperty("--impact-arrow-angle", `${angle}rad`);
      }
    }
  };

  const queueImpactConnectorSync = () => {
    window.cancelAnimationFrame(impactResizeFrame);
    impactResizeFrame = window.requestAnimationFrame(syncImpactConnectors);
  };

  window.addEventListener("load", syncImpactConnectors);
  window.addEventListener("resize", queueImpactConnectorSync);
  document.fonts?.ready.then(syncImpactConnectors);
  syncImpactConnectors();
}

const floatingCtaCard = document.querySelector(".floating-cta-card");

if (floatingCtaCard) {
  const floatingFaces = Array.from(floatingCtaCard.querySelectorAll(".floating-face"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canTrackHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!reduceMotion && floatingFaces.length) {
    const pointer = {
      active: false,
      x: 0,
      y: 0
    };

    let cardRect = floatingCtaCard.getBoundingClientRect();
    let animationFrame;

    const faceStates = floatingFaces.map((face, index) => ({
      face,
      anchorX: 0,
      anchorY: 0,
      radiusX: 5 + (index % 3) * 1.5,
      radiusY: 6 + (index % 4) * 1.25,
      phase: index * 0.85,
      speed: 0.9 + index * 0.06,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    }));

    const syncAnchors = () => {
      cardRect = floatingCtaCard.getBoundingClientRect();

      faceStates.forEach((state) => {
        state.anchorX = state.face.offsetLeft + state.face.offsetWidth / 2;
        state.anchorY = state.face.offsetTop + state.face.offsetHeight / 2;
      });
    };

    const updatePointer = (event) => {
      cardRect = floatingCtaCard.getBoundingClientRect();
      pointer.active = true;
      pointer.x = event.clientX - cardRect.left;
      pointer.y = event.clientY - cardRect.top;
    };

    const releasePointer = () => {
      pointer.active = false;
    };

    const tick = (time) => {
      const timeSeconds = time / 1000;

      faceStates.forEach((state) => {
        const idleX = Math.cos(timeSeconds * state.speed + state.phase) * state.radiusX;
        const idleY = Math.sin(timeSeconds * (state.speed + 0.18) + state.phase) * state.radiusY;
        let targetX = idleX;
        let targetY = idleY;

        if (pointer.active) {
          const dx = state.anchorX + state.x - pointer.x;
          const dy = state.anchorY + state.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 0.001;
          const influence = 130;

          if (distance < influence) {
            const force = ((influence - distance) / influence) ** 1.8;
            const push = 30 * force;
            targetX += (dx / distance) * push;
            targetY += (dy / distance) * push;
          }
        }

        state.vx += (targetX - state.x) * 0.12;
        state.vy += (targetY - state.y) * 0.12;
        state.vx *= 0.8;
        state.vy *= 0.8;
        state.x += state.vx;
        state.y += state.vy;

        state.face.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0)`;
      });

      animationFrame = window.requestAnimationFrame(tick);
    };

    syncAnchors();

    if (canTrackHover) {
      floatingCtaCard.addEventListener("mousemove", updatePointer);
      floatingCtaCard.addEventListener("mouseenter", updatePointer);
      floatingCtaCard.addEventListener("mouseleave", releasePointer);
    }

    window.addEventListener("resize", syncAnchors);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        releasePointer();
      }
    });

    animationFrame = window.requestAnimationFrame(tick);
  }
}

const courseFeatureWaveCard = document.querySelector(".course-feature-wide");

if (courseFeatureWaveCard) {
  const outerWave = courseFeatureWaveCard.querySelector(".course-feature-wave--outer");
  const innerWave = courseFeatureWaveCard.querySelector(".course-feature-wave--inner");
  const thirdWave = courseFeatureWaveCard.querySelector(".course-feature-wave--third");
  const canTrackHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const staticWaveState = {
    outer: { left: "-230px", bottom: "-280px", width: "720px", height: "720px" },
    inner: { left: "-130px", bottom: "-180px", width: "520px", height: "520px" },
    third: { left: "-30px", bottom: "-80px", width: "320px", height: "320px" }
  };
  const waveVarMap = {
    outer: {
      left: "--course-wave-outer-left",
      bottom: "--course-wave-outer-bottom",
      width: "--course-wave-outer-width",
      height: "--course-wave-outer-height"
    },
    inner: {
      left: "--course-wave-inner-left",
      bottom: "--course-wave-inner-bottom",
      width: "--course-wave-inner-width",
      height: "--course-wave-inner-height"
    },
    third: {
      left: "--course-wave-third-left",
      bottom: "--course-wave-third-bottom",
      width: "--course-wave-third-width",
      height: "--course-wave-third-height"
    }
  };
  let settleFrame;

  const readWaveState = () => {
    const outerStyles = outerWave ? window.getComputedStyle(outerWave) : null;
    const innerStyles = innerWave ? window.getComputedStyle(innerWave) : null;
    const thirdStyles = thirdWave ? window.getComputedStyle(thirdWave) : null;

    return {
      outer: outerStyles
        ? {
            left: outerStyles.left,
            bottom: outerStyles.bottom,
            width: outerStyles.width,
            height: outerStyles.height
          }
        : staticWaveState.outer,
      inner: innerStyles
        ? {
            left: innerStyles.left,
            bottom: innerStyles.bottom,
            width: innerStyles.width,
            height: innerStyles.height
          }
        : staticWaveState.inner,
      third: thirdStyles
        ? {
            left: thirdStyles.left,
            bottom: thirdStyles.bottom,
            width: thirdStyles.width,
            height: thirdStyles.height
          }
        : staticWaveState.third
    };
  };

  const applyWaveState = (state) => {
    Object.entries(waveVarMap).forEach(([waveName, vars]) => {
      const waveState = state[waveName];
      courseFeatureWaveCard.style.setProperty(vars.left, waveState.left);
      courseFeatureWaveCard.style.setProperty(vars.bottom, waveState.bottom);
      courseFeatureWaveCard.style.setProperty(vars.width, waveState.width);
      courseFeatureWaveCard.style.setProperty(vars.height, waveState.height);
    });
  };

  const clearWaveState = () => {
    Object.values(waveVarMap).forEach((vars) => {
      courseFeatureWaveCard.style.removeProperty(vars.left);
      courseFeatureWaveCard.style.removeProperty(vars.bottom);
      courseFeatureWaveCard.style.removeProperty(vars.width);
      courseFeatureWaveCard.style.removeProperty(vars.height);
    });
  };

  const settleWavesToStaticState = () => {
    window.cancelAnimationFrame(settleFrame);

    const currentState = readWaveState();
    applyWaveState(currentState);
    courseFeatureWaveCard.classList.add("is-wave-settling");
    void courseFeatureWaveCard.offsetWidth;

    settleFrame = window.requestAnimationFrame(() => {
      applyWaveState(staticWaveState);
    });
  };

  const resumeWaveAnimation = () => {
    window.cancelAnimationFrame(settleFrame);
    courseFeatureWaveCard.classList.remove("is-wave-settling");
    clearWaveState();
  };

  if (canTrackHover) {
    courseFeatureWaveCard.addEventListener("mouseenter", settleWavesToStaticState);
    courseFeatureWaveCard.addEventListener("mouseleave", resumeWaveAnimation);
  }
}

document.querySelectorAll("[data-countdown-target]").forEach((countdown) => {
  const targetValue = countdown.getAttribute("data-countdown-target");
  const targetTime = targetValue ? Date.parse(targetValue) : NaN;

  if (Number.isNaN(targetTime)) return;

  const fields = {
    days: countdown.querySelector('[data-countdown-value="days"]'),
    hours: countdown.querySelector('[data-countdown-value="hours"]'),
    minutes: countdown.querySelector('[data-countdown-value="minutes"]'),
    seconds: countdown.querySelector('[data-countdown-value="seconds"]')
  };

  const updateCountdown = () => {
    const now = Date.now();
    const remaining = Math.max(0, targetTime - now);
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (fields.days) fields.days.textContent = String(days);
    if (fields.hours) fields.hours.textContent = String(hours).padStart(2, "0");
    if (fields.minutes) fields.minutes.textContent = String(minutes).padStart(2, "0");
    if (fields.seconds) fields.seconds.textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});
