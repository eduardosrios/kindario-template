const amountButtons = document.querySelectorAll(".amount-row button");
const supportForm = document.querySelector(".donation-form");
const supportSubmit = document.querySelector(".submit-support");

amountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    amountButtons.forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
  });
});

if (supportForm && supportSubmit) {
  supportForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const originalLabel = supportSubmit.textContent;
    supportSubmit.textContent = "Route saved";
    supportSubmit.disabled = true;

    window.setTimeout(() => {
      supportSubmit.textContent = originalLabel;
      supportSubmit.disabled = false;
    }, 1800);
  });
}
