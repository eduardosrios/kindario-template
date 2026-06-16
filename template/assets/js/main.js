const amountNotes = {
  "$25": "$25 can help move one food parcel into a verified delivery route.",
  "$60": "$60 can support classroom supplies for three children.",
  "$110": "$110 can fund water storage parts for one repair day.",
  "$250": "$250 can help cover a full volunteer packing shift."
};

document.querySelectorAll(".amount-chip").forEach((button) => {
  button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");

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
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", button.classList.contains("is-active") ? "true" : "false");

  button.addEventListener("click", () => {
    document.querySelectorAll(".support-tab").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
  });
});

const supportForm = document.querySelector(".support-form");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (supportForm) {
  supportForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = supportForm.querySelector("button[type='submit']");
    const emailInput = supportForm.querySelector("input[type='email']");
    const note = supportForm.querySelector(".form-note");
    if (!submitButton) return;

    if (emailInput && emailInput.value && !emailPattern.test(emailInput.value)) {
      if (note) {
        note.textContent = "Enter a valid email address for field updates.";
        note.dataset.state = "error";
      }
      emailInput.focus();
      return;
    }

    const originalText = submitButton.textContent;
    submitButton.textContent = "Support route saved";
    submitButton.disabled = true;
    if (note) {
      note.textContent = "Support route saved. Field notes will use this contact.";
      note.dataset.state = "success";
    }

    window.setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2200);
  });
}

const footerDonateForm = document.querySelector(".footer-donate-form");

if (footerDonateForm) {
  const footerNote = document.createElement("p");
  footerNote.className = "footer-form-note";
  footerNote.textContent = "Choose an amount and email to receive field notes.";
  footerDonateForm.insertAdjacentElement("afterend", footerNote);

  footerDonateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = footerDonateForm.querySelector("button[type='submit']");
    const emailInput = footerDonateForm.querySelector("input[type='email']");
    if (!submitButton) return;

    if (emailInput && emailInput.value && !emailPattern.test(emailInput.value)) {
      footerNote.textContent = "Enter a valid email address for field notes.";
      footerNote.dataset.state = "error";
      emailInput.focus();
      return;
    }

    const originalText = submitButton.textContent;
    submitButton.textContent = "Route saved";
    submitButton.disabled = true;
    footerNote.textContent = "Route saved. Kindario will send field notes to this contact.";
    footerNote.dataset.state = "success";

    window.setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2200);
  });
}

const revealTargets = document.querySelectorAll(
  "main > section, .priority-card, .campaign-progress, .proof-card, .story-lead, .story-quote, .story-thumb, .help-image, .help-panel, .shift-card, .shift-photo, .faq-panel, .latest-notes, .footer-cta, .footer-main"
);

revealTargets.forEach((item) => item.setAttribute("data-reveal", ""));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((item) => revealObserver.observe(item));

  window.setTimeout(() => {
    revealTargets.forEach((item) => item.classList.add("is-visible"));
  }, 1200);
} else {
  revealTargets.forEach((item) => item.classList.add("is-visible"));
}
