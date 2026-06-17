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
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeSlide = 0;
  let slideTimer;

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
  };

  const startHeroSlider = () => {
    if (reduceMotion || slides.length < 2) return;

    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(() => {
      showHeroSlide(activeSlide + 1);
    }, 6500);
  };

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      showHeroSlide(dotIndex);
      startHeroSlider();
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showHeroSlide(activeSlide - 1);
      startHeroSlider();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showHeroSlide(activeSlide + 1);
      startHeroSlider();
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
