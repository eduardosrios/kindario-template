const amountNotes = {
  "$25": "$25 can help move one food parcel into a verified delivery route.",
  "$60": "$60 can support classroom supplies for three children.",
  "$110": "$110 can fund water storage parts for one repair day.",
  "$250": "$250 can help cover a full volunteer packing shift."
};

document.querySelectorAll(".amount-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".amount-chip").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    const note = document.querySelector("#amount-note");
    if (note) {
      note.textContent = amountNotes[button.dataset.amount] || amountNotes["$25"];
    }
  });
});

document.querySelectorAll(".support-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".support-tab").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
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
  footerDonateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = footerDonateForm.querySelector("button[type='submit']");
    if (!submitButton) return;

    const originalText = submitButton.textContent;
    submitButton.textContent = "Route saved";
    submitButton.disabled = true;

    window.setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2200);
  });
}
