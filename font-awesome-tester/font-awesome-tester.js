const FONT_AWESOME_TESTER_SELECTOR = ".ticket-board .ticket-card:first-child .ticket-card-price > div:first-child";

(() => {
  const iconOptions = [
    "fa-solid fa-circle-radiation",
    "fa-solid fa-address-card",
    "fa-solid fa-cubes",
    "fa-solid fa-fire",
    "fa-solid fa-life-ring",
    "fa-solid fa-parachute-box",
    "fa-solid fa-piggy-bank",
    "fa-solid fa-universal-access",
    "fa-solid fa-user-graduate",
    "fa-solid fa-hand-holding-heart",
    "fa-solid fa-hand-holding-dollar",
    "fa-solid fa-heart-circle-bolt",
    "fa-solid fa-dove"
  ];

  const config = {
    selector: FONT_AWESOME_TESTER_SELECTOR,
    storageKey: "font-awesome-tester-saved-icons"
  };

  const testerId = "font-awesome-tester";
  let activeIconIndex = -1;

  const createStyles = () => {
    if (document.getElementById(`${testerId}-styles`)) return;

    const style = document.createElement("style");
    style.id = `${testerId}-styles`;
    style.textContent = `
      .${testerId} {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 2147483647;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        border: 2px solid #121127;
        border-radius: 4px;
        background: #ffffff;
        padding: 10px;
        box-shadow: 0 18px 42px rgba(18, 17, 39, 0.18);
        color: #121127;
        font-family: Arial, Helvetica, sans-serif;
      }

      .${testerId} button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 36px;
        border: 0;
        border-radius: 4px;
        background: #121127;
        color: #ffffff;
        padding: 10px 13px;
        font-size: 13px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: 0;
        cursor: pointer;
      }

      .${testerId} button:hover {
        filter: brightness(1.08);
      }

      .${testerId} button[data-fa-tester-add] {
        background: #0c9144;
      }

      .${testerId} button[data-fa-tester-copy] {
        background: #315cdb;
      }

      .${testerId} strong {
        min-width: 138px;
        max-width: 220px;
        overflow: hidden;
        color: #121127;
        font-size: 12px;
        font-weight: 900;
        line-height: 1.2;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .${testerId} textarea {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      }

      @media (max-width: 575.98px) {
        .${testerId} {
          right: 12px;
          bottom: 12px;
          left: 12px;
          justify-content: space-between;
        }

        .${testerId} strong {
          min-width: 92px;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const getTargets = () => Array.from(document.querySelectorAll(config.selector));


  const getCurrentIconClass = () => {
    if (activeIconIndex >= 0) return iconOptions[activeIconIndex];

    const firstTarget = getTargets()[0];
    return firstTarget?.className.trim() || "";
  };

  const applyIconClass = (iconClass) => {
    getTargets().forEach((target) => {
      target.className = iconClass;
      target.setAttribute("aria-hidden", "true");
    });
  };

  const createButton = (label, attribute) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.setAttribute(attribute, "");
    return button;
  };

  const createTester = () => {
    if (document.querySelector(`.${testerId}`)) return;

    createStyles();

    const tester = document.createElement("div");
    tester.className = testerId;
    tester.setAttribute("aria-label", "Font Awesome icon tester");

    const prevButton = createButton("Prev", "data-fa-tester-prev");
    const label = document.createElement("strong");
    label.textContent = "Icon test";
    label.setAttribute("data-fa-tester-label", "");
    const copyButton = createButton("Copy", "data-fa-tester-copy");
    const addButton = createButton("Add", "data-fa-tester-add");
    const nextButton = createButton("Next", "data-fa-tester-next");
    const storeField = document.createElement("textarea");
    storeField.setAttribute("data-fa-tester-store", "");
    storeField.setAttribute("aria-label", "Saved Font Awesome icon classes");
    storeField.tabIndex = -1;
    storeField.value = window.localStorage.getItem(config.storageKey) || "";

    const setLabel = (text) => {
      label.textContent = text;
    };

    const applyIcon = (direction) => {
      activeIconIndex = (activeIconIndex + direction + iconOptions.length) % iconOptions.length;
      const iconClass = iconOptions[activeIconIndex];

      applyIconClass(iconClass);
      setLabel(`${activeIconIndex + 1}/${iconOptions.length} ${iconClass.replace(/^fa-(solid|regular|brands)\s+/, "")}`);
    };

    const addCurrentIcon = () => {
      const iconClass = getCurrentIconClass();
      if (!iconClass) return;

      const savedIcons = storeField.value.split("\n").map((item) => item.trim()).filter(Boolean);
      if (!savedIcons.includes(iconClass)) {
        savedIcons.push(iconClass);
        storeField.value = savedIcons.join("\n");
        window.localStorage.setItem(config.storageKey, storeField.value);
      }

      setLabel(`Saved ${savedIcons.length}`);
    };

    const copySavedIcons = async () => {
      const text = storeField.value.trim() || getCurrentIconClass();
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        storeField.style.pointerEvents = "auto";
        storeField.focus();
        storeField.select();
        document.execCommand("copy");
        storeField.style.pointerEvents = "none";
      }

      setLabel("Copied");
    };

    prevButton.addEventListener("click", () => applyIcon(-1));
    nextButton.addEventListener("click", () => applyIcon(1));
    addButton.addEventListener("click", addCurrentIcon);
    copyButton.addEventListener("click", copySavedIcons);

    tester.append(prevButton, label, copyButton, addButton, nextButton, storeField);
    document.body.appendChild(tester);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createTester, { once: true });
  } else {
    createTester();
  }
})();
