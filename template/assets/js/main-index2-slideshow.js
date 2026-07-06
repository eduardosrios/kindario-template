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



const initQuickSearchModal = () => {
  const modal = document.querySelector("[data-search-modal]");
  const input = modal?.querySelector("[data-search-input]");
  const dialog = modal?.querySelector(".quick-search-dialog");
  const openButtons = Array.from(document.querySelectorAll("[data-search-open]"));
  const closeButtons = Array.from(modal?.querySelectorAll("[data-search-close]") || []);
  const keywordButtons = Array.from(modal?.querySelectorAll(".quick-search-chip-track button") || []);
  const quickLinks = Array.from(modal?.querySelectorAll("a[href^='#']") || []);
  const form = modal?.querySelector(".quick-search-form");
  const chipTrack = modal?.querySelector("[data-search-chip-track]");
  const chipPrev = modal?.querySelector("[data-search-chip-prev]");
  const chipNext = modal?.querySelector("[data-search-chip-next]");
  const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])";
  let lastFocusedElement = null;
  let lockedScrollY = 0;

  if (!modal || !input || !openButtons.length) return;

  const updateChipNavState = () => {
    if (!chipTrack || !chipPrev || !chipNext) return;
    const maxScroll = chipTrack.scrollWidth - chipTrack.clientWidth;
    chipPrev.disabled = chipTrack.scrollLeft <= 1;
    chipNext.disabled = chipTrack.scrollLeft >= maxScroll - 1;
  };

  const scrollChipTrack = (direction) => {
    if (!chipTrack) return;
    chipTrack.scrollBy({ left: direction * Math.max(180, chipTrack.clientWidth * 0.7), behavior: "smooth" });
    window.setTimeout(updateChipNavState, 260);
  };

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    modal.classList.remove("is-closing");
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    if (dialog) dialog.scrollTop = 0;
    lockedScrollY = window.scrollY || window.pageYOffset || 0;
    document.documentElement.classList.add("search-modal-open");
    document.body.classList.add("search-modal-open");
    document.body.style.top = `-${lockedScrollY}px`;
    window.setTimeout(() => {
      input.focus();
      updateChipNavState();
    }, 30);
  };

  const closeModal = () => {
    if (modal.hidden || modal.classList.contains("is-closing")) return;
    modal.classList.add("is-closing");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("search-modal-open");
    document.body.classList.remove("search-modal-open");
    document.body.style.top = "";
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, lockedScrollY);
    window.requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    });
    window.setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove("is-closing");
      lastFocusedElement?.focus?.();
    }, 190);
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  keywordButtons.forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.textContent.trim();
      input.focus();
    });
  });

  chipPrev?.addEventListener("click", () => scrollChipTrack(-1));
  chipNext?.addEventListener("click", () => scrollChipTrack(1));
  chipTrack?.addEventListener("scroll", updateChipNavState, { passive: true });
  window.addEventListener("resize", updateChipNavState);

  quickLinks.forEach((link) => {
    link.addEventListener("click", closeModal);
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    input.focus();
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = Array.from(modal.querySelectorAll(focusableSelector)).filter((element) => !element.hidden && element.offsetParent !== null);
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });
};

initQuickSearchModal();

document.querySelectorAll("[data-donation-show-more]").forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.closest(".donation-secondary-section");
    const grid = section?.querySelector("[data-donation-secondary-grid]");
    const hiddenCards = Array.from(grid?.querySelectorAll(".donation-secondary-extra-card[hidden]") || []);

    hiddenCards.slice(0, 8).forEach((card) => {
      card.hidden = false;
    });

    button.hidden = true;
  });
});

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

if (!window.courseFeatureAccordionWheelReady) {
  window.courseFeatureAccordionWheelReady = true;
  document.addEventListener("wheel", (event) => {
    const panel = event.target.closest?.(".course-feature-accordion-panel");
    if (!panel) return;

    const wrapper = panel.querySelector(".simplebar-content-wrapper") || panel;
    const maxScrollTop = wrapper.scrollHeight - wrapper.clientHeight;
    const canScrollInside = maxScrollTop > 1;
    const atTop = wrapper.scrollTop <= 0;
    const atBottom = wrapper.scrollTop >= maxScrollTop - 1;
    const wheelUp = event.deltaY < 0;
    const wheelDown = event.deltaY > 0;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (canScrollInside && !((wheelUp && atTop) || (wheelDown && atBottom))) {
      const windowScrollX = window.scrollX;
      const windowScrollY = window.scrollY;
      wrapper.scrollTop += event.deltaY;
      requestAnimationFrame(() => window.scrollTo(windowScrollX, windowScrollY));
      return;
    }

    window.scrollBy({ top: event.deltaY, left: event.deltaX, behavior: "auto" });
  }, { passive: false, capture: true });
}
document.querySelectorAll(".course-feature-accordion").forEach((accordion) => {
  const items = Array.from(accordion.querySelectorAll(".course-feature-accordion-item"));

  const syncArrows = () => {
    items.forEach((currentItem) => {
      const icon = currentItem.querySelector(".course-feature-accordion-arrow i");
      icon?.classList.toggle("fa-chevron-up", currentItem.open);
      icon?.classList.toggle("fa-chevron-down", !currentItem.open);
    });
  };

  const refreshPanelScroll = (item) => {
    const panel = item?.querySelector(".course-feature-accordion-panel");
    const instance = panel && window.SimpleBar?.instances?.get(panel);
    instance?.recalculate();
  };

  const setOpenItem = (targetItem) => {
    items.forEach((currentItem) => {
      currentItem.open = currentItem === targetItem;
    });
    syncArrows();
    requestAnimationFrame(() => refreshPanelScroll(targetItem));
  };

  syncArrows();
  requestAnimationFrame(() => items.forEach(refreshPanelScroll));

  items.forEach((item, index) => {
    const summary = item.querySelector("summary");
    const arrow = item.querySelector(".course-feature-accordion-arrow");

    const toggleItem = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const targetIndex = item.open ? (index + 1) % items.length : index;
      setOpenItem(items[targetIndex]);
    };

    summary?.addEventListener("click", toggleItem);
    arrow?.addEventListener("click", toggleItem);
  });

  if (!items.some((item) => item.open) && items[0]) setOpenItem(items[0]);
});

const heroSlider = document.querySelector("[data-hero-slider]");

if (heroSlider) {
  const heroShell = document.querySelector("[data-hero-slider-shell]");
  const slides = Array.from(heroSlider.querySelectorAll("[data-hero-slide]"));
  const dots = Array.from(heroSlider.querySelectorAll("[data-hero-dot]"));
  const dotsWrap = heroSlider.querySelector(".hero-slider-dots");
  const sliderItems = heroSlider.querySelector(".hero-slider-items");
  const prevButton = heroSlider.querySelector("[data-hero-prev]");
  const nextButton = heroSlider.querySelector("[data-hero-next]");
  const timerIndicator = heroSlider.querySelector("[data-hero-timer]");
  const timerIcon = heroSlider.querySelector("[data-hero-timer-icon]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroSlideDuration = 60000000;
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

  const placeTimerOnActiveDot = () => {
    if (!timerIndicator) return;
    const activeDot = dots.find((dot) => Number.parseInt(dot.dataset.heroDot || "-1", 10) === activeSlide);
    if (!activeDot) return;

    if (timerIndicator.parentElement !== activeDot) {
      activeDot.appendChild(timerIndicator);
    }

  };

  let heroAlignmentFrame = 0;
  let heroDotsPositioned = false;

  const syncHeroSlideBounds = () => {
    if (!heroShell) return;

    const heroBodyRect = heroSlider.getBoundingClientRect();
    const brandRect = document.querySelector(".hero-nav-inner.container .brand-lockup")?.getBoundingClientRect();
    const donateRect = document.querySelector(".hero-nav-cta")?.getBoundingClientRect();
    const navInnerRect = document.querySelector(".hero-nav-inner.container")?.getBoundingClientRect();
    const shellStyles = window.getComputedStyle(heroShell);
    const fallbackLeft = Number.parseFloat(shellStyles.getPropertyValue("--active-slide-left")) || 0;
    const fallbackWidth = Number.parseFloat(shellStyles.getPropertyValue("--slide-width")) || heroBodyRect.width;

    let targetLeft = brandRect ? brandRect.left - heroBodyRect.left : fallbackLeft;
    let targetRight;

    if (donateRect && donateRect.width > 0) {
      targetRight = donateRect.right - heroBodyRect.left;
    } else if (navInnerRect) {
      targetRight = navInnerRect.right - heroBodyRect.left - 15;
    } else {
      targetRight = targetLeft + fallbackWidth;
    }

    targetLeft = Math.max(0, Math.round(targetLeft));
    targetRight = Math.min(Math.round(targetRight), Math.round(heroBodyRect.width));

    const targetWidth = Math.max(0, targetRight - targetLeft);

    if (targetWidth > 0) {
      heroShell.style.setProperty("--active-slide-left", `${targetLeft}px`);
      heroShell.style.setProperty("--slide-width", `${targetWidth}px`);
    }
    if (dotsWrap && !heroDotsPositioned) {
      const activeSlideElement = slides.find((slide) => slide.classList.contains("is-active")) || slides[activeSlide];
      if (!activeSlideElement) return;

      const heroBodyRectForDots = heroSlider.getBoundingClientRect();
      const activeSlideRect = activeSlideElement.getBoundingClientRect();
      const wrapRect = dotsWrap.getBoundingClientRect();
      const timerRingRect = dotsWrap.querySelector(".hero-slider-timer-ring")?.getBoundingClientRect();
      const markerRects = Array.from(dotsWrap.querySelectorAll(".hero-slider-dot-marker")).map((marker) => marker.getBoundingClientRect());
      const rightmostControlRight = [timerRingRect?.right || 0, ...markerRects.map((rect) => rect.right)].reduce((maxRight, value) => Math.max(maxRight, value), 0);
      const visualOffset = Math.max(0, wrapRect.right - rightmostControlRight);
      const slideRightInset = Math.max(0, Math.round(heroBodyRectForDots.right - activeSlideRect.right));
      const dotsRight = Math.max(0, slideRightInset + 25 - visualOffset);

      dotsWrap.style.setProperty("right", `${dotsRight}px`, "important");
      dotsWrap.style.setProperty("left", "auto", "important");
      heroDotsPositioned = true;
    }
  };

  const queueHeroSlideBoundsSync = () => {
    window.cancelAnimationFrame(heroAlignmentFrame);
    heroAlignmentFrame = window.requestAnimationFrame(syncHeroSlideBounds);
  };




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

    dots.forEach((dot) => {
      const dotIndex = Number.parseInt(dot.dataset.heroDot || "-1", 10);
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

    placeTimerOnActiveDot();
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
      const targetIndex = Number.parseInt(dot.dataset.heroDot || String(dotIndex), 10);
      showHeroSlideWithFlip(Number.isNaN(targetIndex) ? dotIndex : targetIndex);
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

  window.addEventListener("resize", queueHeroSlideBoundsSync);
  window.addEventListener("orientationchange", queueHeroSlideBoundsSync);

  if (window.ResizeObserver) {
    const heroAlignmentObserver = new window.ResizeObserver(() => {
      queueHeroSlideBoundsSync();
    });

    const navInner = document.querySelector(".hero-nav-inner.container");
    if (navInner) heroAlignmentObserver.observe(navInner);
    heroAlignmentObserver.observe(heroSlider);
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      queueHeroSlideBoundsSync();
    }).catch(() => {});
  }

  queueHeroSlideBoundsSync();

  const initialHeroSlide = Number.parseInt(heroShell?.dataset.heroSlide || "0", 10);
  showHeroSlide(Number.isNaN(initialHeroSlide) ? 0 : initialHeroSlide);
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
  let carouselSettleTimer;
  let carouselDragFrame;
  let isProgrammaticScroll = false;
  let isDraggingCarousel = false;
  let didDragCarousel = false;
  let dragStartX = 0;
  let dragCurrentX = 0;
  let dragStartScrollLeft = 0;
  let pendingDragScrollLeft = 0;
  let dragStartPage = 0;
  let activeDragPointerId = null;

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

  const settleCarouselScroll = () => {
    track.classList.add("is-settling");
    window.clearTimeout(carouselSettleTimer);
    carouselSettleTimer = window.setTimeout(() => {
      track.classList.remove("is-settling");
    }, 760);
  };

  const getNearestPageIndex = () => {
    if (!pagePositions.length) return 0;

    return pagePositions.reduce((nearest, position, index) => {
      return Math.abs(position - track.scrollLeft) < Math.abs(pagePositions[nearest] - track.scrollLeft) ? index : nearest;
    }, 0);
  };

  const scrollToPage = (index) => {
    const nextIndex = Math.max(0, Math.min(index, pagePositions.length - 1));
    const left = pagePositions[nextIndex];

    isProgrammaticScroll = true;
    settleCarouselScroll();
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
    setActiveDot(getNearestPageIndex());
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

  const stopCarouselDrag = () => {
    if (!isDraggingCarousel) return;

    const dragDistance = dragCurrentX - dragStartX;
    const dragThreshold = 18;

    isDraggingCarousel = false;
    activeDragPointerId = null;
    track.classList.remove("is-dragging");

    if (didDragCarousel && Math.abs(dragDistance) >= dragThreshold) {
      scrollToPage(dragStartPage + (dragDistance < 0 ? 1 : -1));
    } else if (didDragCarousel) {
      scrollToPage(dragStartPage);
    } else {
      updateActiveFromScroll();
    }

    window.setTimeout(() => {
      didDragCarousel = false;
    }, 0);
  };

  track.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;

    isDraggingCarousel = true;
    didDragCarousel = false;
    activeDragPointerId = event.pointerId;
    dragStartX = event.clientX;
    dragCurrentX = event.clientX;
    dragStartScrollLeft = track.scrollLeft;
    pendingDragScrollLeft = dragStartScrollLeft;
    dragStartPage = activePage;
    isProgrammaticScroll = false;
    window.clearTimeout(carouselProgrammaticTimer);
    window.clearTimeout(carouselSettleTimer);
    window.cancelAnimationFrame(carouselDragFrame);
    track.classList.remove("is-settling");
    track.classList.add("is-dragging");
    track.setPointerCapture?.(event.pointerId);
  });

  track.addEventListener("pointermove", (event) => {
    if (!isDraggingCarousel || activeDragPointerId !== event.pointerId) return;

    dragCurrentX = event.clientX;

    if (Math.abs(dragCurrentX - dragStartX) > 4) {
      didDragCarousel = true;
    }

    pendingDragScrollLeft = dragStartScrollLeft - (dragCurrentX - dragStartX);
    track.scrollLeft = pendingDragScrollLeft;

    if (didDragCarousel) {
      event.preventDefault();
    }
  });

  track.addEventListener("pointerup", stopCarouselDrag);
  track.addEventListener("pointercancel", stopCarouselDrag);
  track.addEventListener("lostpointercapture", stopCarouselDrag);

  track.addEventListener("click", (event) => {
    if (!didDragCarousel) return;

    event.preventDefault();
    event.stopPropagation();
  }, true);

  track.addEventListener("wheel", (event) => {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (maxScroll <= 0) return;

    const wheelDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(wheelDelta) < 4) return;

    const wantsNext = wheelDelta > 0;
    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft >= maxScroll - 1;

    if ((wantsNext && atEnd) || (!wantsNext && atStart)) return;

    event.preventDefault();

    if (isProgrammaticScroll) return;

    scrollToPage(activePage + (wantsNext ? 1 : -1));
  }, { passive: false });

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
    if (isProgrammaticScroll || isDraggingCarousel) return;

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
    if (!svg || lines.length < nodes.length - 1 || nodes.length < 2 || window.innerWidth < 768) return;

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

  const syncFloatingFaceArcs = () => {
    floatingFaces.forEach((face) => {
      const svg = face.querySelector(".floating-face-arc");
      const circle = svg?.querySelector("circle");
      if (!svg || !circle) return;

      const faceSize = Math.min(face.offsetWidth, face.offsetHeight);
      const arcSize = faceSize + 30;
      const arcRadius = faceSize / 2 + 12;
      const arcCenter = arcSize / 2;

      svg.style.width = `${arcSize}px`;
      svg.style.height = `${arcSize}px`;
      svg.setAttribute("viewBox", `0 0 ${arcSize} ${arcSize}`);
      circle.setAttribute("cx", arcCenter.toFixed(2));
      circle.setAttribute("cy", arcCenter.toFixed(2));
      circle.setAttribute("r", arcRadius.toFixed(2));
    });
  };

  syncFloatingFaceArcs();

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

    syncFloatingFaceArcs();
    syncAnchors();

    if (canTrackHover) {
      floatingCtaCard.addEventListener("mousemove", updatePointer);
      floatingCtaCard.addEventListener("mouseenter", updatePointer);
      floatingCtaCard.addEventListener("mouseleave", releasePointer);
    }

    window.addEventListener("resize", () => {
      syncFloatingFaceArcs();
      syncAnchors();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        releasePointer();
      }
    });

    animationFrame = window.requestAnimationFrame(tick);
  }
}

document.querySelectorAll(".course-feature-wide").forEach((courseFeatureWaveCard) => {
  const outerWave = courseFeatureWaveCard.querySelector(".course-feature-wave--outer");
  const innerWave = courseFeatureWaveCard.querySelector(".course-feature-wave--inner");
  const thirdWave = courseFeatureWaveCard.querySelector(".course-feature-wave--third");
  const canTrackHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const syncFloatingFaceArcs = () => {
    floatingFaces.forEach((face) => {
      const svg = face.querySelector(".floating-face-arc");
      const circle = svg?.querySelector("circle");
      if (!svg || !circle) return;

      const faceSize = Math.min(face.offsetWidth, face.offsetHeight);
      const arcSize = faceSize + 30;
      const arcRadius = faceSize / 2 + 12;
      const arcCenter = arcSize / 2;

      svg.style.width = `${arcSize}px`;
      svg.style.height = `${arcSize}px`;
      svg.setAttribute("viewBox", `0 0 ${arcSize} ${arcSize}`);
      circle.setAttribute("cx", arcCenter.toFixed(2));
      circle.setAttribute("cy", arcCenter.toFixed(2));
      circle.setAttribute("r", arcRadius.toFixed(2));
    });
  };

  syncFloatingFaceArcs();
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
});
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

const initDonationCampaignHoverSwap = () => {
  const section = document.querySelector(".donation-campaigns-section");
  if (!section) return;

  const targetCard = section.querySelector("[data-donation-hover-target]");
  const stackCards = Array.from(section.querySelectorAll(".donation-campaign-card-stack[aria-label='Urgent support campaign cards'] > .donation-campaign-card-horizontal"));
  if (!targetCard || !stackCards.length) return;

  const targetMedia = targetCard.querySelector(".donation-campaign-media");
  const targetImage = targetMedia?.querySelector("img");
  const targetBadge = targetMedia?.querySelector("span:not(.featured-corner-ribbon):not(.featured-title-percent)");
  const targetTitle = targetCard.querySelector(".donation-campaign-body h3");
  const targetDescription = targetCard.querySelector(".donation-campaign-body > p");
  const targetProgress = targetCard.querySelector(".donation-progress-card");
  const targetProgressCopy = targetProgress?.querySelector("p");
  const targetProgressStrong = targetProgressCopy?.querySelector("strong");
  const targetProgressBar = targetProgress?.querySelector(".donation-progress-bar");
  const targetProgressValue = targetProgressBar?.querySelector("span");
  const targetDonators = targetProgress?.querySelector(".donation-progress-donators");

  const readCardData = (card) => {
    const dataNode = card.querySelector(".donation-campaign-hover-data");
    if (!dataNode?.textContent) return null;

    try {
      return JSON.parse(dataNode.textContent);
    } catch (error) {
      return null;
    }
  };

  const setActiveStackCard = (targetStackCard) => {
    stackCards.forEach((card) => {
      card.classList.toggle("is-active-campaign", card === targetStackCard);
    });
  };

  const setFeaturedCard = (data, sourceCard) => {
    if (!data) return;
    setActiveStackCard(sourceCard);
    if (targetCard.dataset.activeDonationCampaign === data.title) return;

    targetCard.dataset.activeDonationCampaign = data.title;
    targetCard.style.setProperty("--featured-card-bg", data.background);

    if (targetMedia) {
      targetMedia.setAttribute("href", data.href);
      targetMedia.setAttribute("aria-label", data.ariaLabel);
    }

    if (targetImage) {
      targetImage.setAttribute("src", data.image);
      targetImage.setAttribute("alt", data.alt);
    }

    if (targetBadge) targetBadge.textContent = data.badge;
    if (targetTitle) targetTitle.textContent = data.title;
    if (targetDescription) targetDescription.textContent = data.description;

    if (targetProgress) targetProgress.setAttribute("aria-label", `${data.title} campaign progress`);
    if (targetProgressStrong) targetProgressStrong.textContent = data.amount;
    if (targetProgressCopy) {
      const suffixNode = Array.from(targetProgressCopy.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
      if (suffixNode) suffixNode.textContent = ` ${data.goal}`;
    }

    if (targetProgressBar) {
      targetProgressBar.setAttribute("aria-label", data.progressLabel);
      targetProgressBar.setAttribute("aria-valuemin", String(data.min));
      targetProgressBar.setAttribute("aria-valuemax", String(data.max));
      targetProgressBar.setAttribute("aria-valuenow", String(data.now));
    }

    if (targetProgressValue) targetProgressValue.style.width = data.width;

    if (targetDonators) {
      targetDonators.replaceChildren();
      data.donators.forEach((donator) => {
        const item = document.createElement("span");
        item.setAttribute("aria-hidden", "true");
        item.textContent = donator;
        targetDonators.appendChild(item);
      });
      const total = document.createElement("strong");
      const totalText = String(data.donatorText || "");
      const donorMatch = totalText.match(/^(.*)\s+(donators)$/i);
      if (donorMatch) {
        total.append(donorMatch[1], document.createElement("br"), donorMatch[2]);
      } else {
        total.textContent = totalText;
      }
      targetDonators.appendChild(total);
    }
  };

  const currentData = {
    title: targetTitle?.textContent?.trim()
  };
  targetCard.dataset.activeDonationCampaign = currentData.title || "";
  const initialActiveCard = stackCards.find((card) => readCardData(card)?.title === targetCard.dataset.activeDonationCampaign);
  if (initialActiveCard) setActiveStackCard(initialActiveCard);

  stackCards.forEach((card) => {
    const data = readCardData(card);
    if (!data) return;

    card.addEventListener("mouseenter", () => setFeaturedCard(data, card));
    card.addEventListener("focusin", () => setFeaturedCard(data, card));
  });
};

initDonationCampaignHoverSwap();















const logoCarousel = document.querySelector("[data-logo-carousel]");

if (logoCarousel) {
  const track = logoCarousel.querySelector("[data-logo-track]");
  const cards = Array.from(track?.children || []);
  const prevButton = logoCarousel.querySelector("[data-logo-prev]");
  const nextButton = logoCarousel.querySelector("[data-logo-next]");
  let index = 0;
  let autoAdvanceTimer;

  const cardsPerView = () => {
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1200) return 4;
    return 5;
  };

  const maxIndex = () => Math.max(0, cards.length - cardsPerView());

  const updateLogoCarousel = () => {
    const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
    const gap = parseFloat(window.getComputedStyle(track).gap || "0") || 0;
    const offset = index * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index >= maxIndex();
  };

  const restartAutoAdvance = () => {
    window.clearInterval(autoAdvanceTimer);

    if (maxIndex() <= 0) return;

    autoAdvanceTimer = window.setInterval(() => {
      index = index >= maxIndex() ? 0 : index + 1;
      updateLogoCarousel();
    }, 2000);
  };

  prevButton?.addEventListener("click", () => {
    index = Math.max(0, index - 1);
    updateLogoCarousel();
    restartAutoAdvance();
  });

  nextButton?.addEventListener("click", () => {
    index = Math.min(maxIndex(), index + 1);
    updateLogoCarousel();
    restartAutoAdvance();
  });

  logoCarousel.addEventListener("mouseenter", () => {
    window.clearInterval(autoAdvanceTimer);
  });

  logoCarousel.addEventListener("mouseleave", () => {
    restartAutoAdvance();
  });

  window.addEventListener("resize", () => {
    index = Math.min(index, maxIndex());
    updateLogoCarousel();
    restartAutoAdvance();
  });

  updateLogoCarousel();
  restartAutoAdvance();
}

