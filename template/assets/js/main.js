const amountNotes = {
  "$25": "$25 can help prepare one food parcel for a field route.",
  "$60": "$60 can support classroom supplies for a small kit route.",
  "$110": "$110 can help prepare water storage materials for partner review.",
  "$250": "$250 can support supplies for a volunteer packing shift."
};

const supportNotes = {
  Donate: "Donate routes organize support around food, water, classroom supplies, and clear field notes.",
  Volunteer: "Volunteer routes show specific shifts, materials, and useful next actions.",
  Share: "Share routes give campaign links and field-note summaries to send to supporters.",
  Partner: "Partner routes connect local teams, transport help, and practical supply access."
};

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

    const note = document.querySelector("#support-note");
    if (note) {
      note.textContent = supportNotes[button.dataset.support] || supportNotes.Donate;
    }
  });
});

function bindStaticForm(formSelector, savedText) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const status = form.querySelector(".form-status");
    if (!submitButton) return;

    const originalText = submitButton.textContent;
    submitButton.textContent = savedText;
    submitButton.disabled = true;

    if (status) {
      status.textContent = "Saved locally for this static demo.";
    }

    window.setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      if (status) {
        status.textContent = "";
      }
    }, 2200);
  });
}

bindStaticForm(".support-form", "Support route saved");
bindStaticForm(".footer-form", "Route saved");
