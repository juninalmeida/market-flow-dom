(() => {
  "use strict";

  console.log("JS CARREGOU");

  const selectors = {
    form: ".shopping-list__form",
    nameInput: ".shopping-list__input--name",
    qtyInput: ".shopping-list__input--qty",
    itemsList: ".shopping-list__items",
    subtitle: ".shopping-list__subtitle",
    progressBar: ".shopping-list__progress-bar",

    statTotal: '[data-stat="total"]',
    statBought: '[data-stat="bought"]',
    statRemaining: '[data-stat="remaining"]',
  };

  const elements = {
    form: document.querySelector(selectors.form),
    nameInput: document.querySelector(selectors.nameInput),
    qtyInput: document.querySelector(selectors.qtyInput),
    itemsList: document.querySelector(selectors.itemsList),
    subtitle: document.querySelector(selectors.subtitle),
    progressBar: document.querySelector(selectors.progressBar),
    statTotal: document.querySelector(selectors.statTotal),
    statBought: document.querySelector(selectors.statBought),
    statRemaining: document.querySelector(selectors.statRemaining),
  };

  console.table(
    Object.entries(elements).map(([key, el]) => ({
      element: key,
      found: Boolean(el),
    }))
  );

  function assertRequiredElements() {
    const missingKeys = Object.entries(elements)
      .filter(([, el]) => !el)
      .map(([key]) => key);

    if (missingKeys.length > 0) {
      console.error(" Elementos obrigatórios não encontrados:", missingKeys);
      return false;
    }

    return true;
  }

  function getItems() {
    return Array.from(elements.itemsList.querySelectorAll(".item"));
  }

  function getStats(items) {
    const total = items.length;

    const bought = items.filter((item) =>
      item.classList.contains("item--completed")
    ).length;

    const remaining = total - bought;

    return { total, bought, remaining };
  }

  function createItemElement(data) {
    const item = document.createElement("li");
    item.classList.add("item");

    const checkboxButton = document.createElement("button");
    checkboxButton.classList.add("item__checkbox");
    checkboxButton.type = "button";
    checkboxButton.setAttribute("aria-label", "Marcar como comprado");

    const info = document.createElement("div");
    info.classList.add("item__info");

    const nameEl = document.createElement("p");
    nameEl.classList.add("item__name");
    nameEl.textContent = data.name;

    info.appendChild(nameEl);

    if (data.qty.length > 0) {
      const qtyEl = document.createElement("p");
      qtyEl.classList.add("item__qty");
      qtyEl.textContent = data.qty;
      info.appendChild(qtyEl);
    }

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("item__delete");
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", "Remover item");

    const trashIcon = document.createElement("img");
    trashIcon.src = "./assets/icons/trashicon.svg";
    trashIcon.alt = "";
    trashIcon.setAttribute("aria-hidden", "true");

    deleteButton.appendChild(trashIcon);

    item.appendChild(checkboxButton);
    item.appendChild(info);
    item.appendChild(deleteButton);

    return item;
  }

  function sanitizeQtyValue(value) {
    const normalized = value.toLowerCase().replace(/\s+/g, "");
    const onlyAllowedChars = normalized.replace(/[^0-9kg]/g, "");

    const partialPattern = /^\d+(k|kg|g)?$/;
    const strictPattern = /^\d+(kg|g)?$/;

    if (partialPattern.test(onlyAllowedChars)) return onlyAllowedChars;

    const digitsOnlyMatch = onlyAllowedChars.match(/^\d+/);
    return digitsOnlyMatch ? digitsOnlyMatch[0] : "";
  }

  function handleQtyBlur(event) {
    const input = event.target;
    const value = input.value;

    const strictPattern = /^\d+(kg|g)?$/;

    if (!strictPattern.test(value)) {
      console.log("Ajuste final (blur):", value, "→", value.replace(/k$/, ""));
      input.value = value.replace(/k$/, "");
    }
  }

  function sanitizeNameValue(value) {
    return value.replace(/[^\p{L}\s]+/gu, "");
  }

  function handleNameInput(event) {
    const input = event.target;
    const sanitized = sanitizeNameValue(input.value);

    if (input.value !== sanitized) {
      console.log("Limpando nome:", input.value, "→", sanitized);
      input.value = sanitized;
    }
  }

  function handleQtyInput(event) {
    const input = event.target;
    const sanitized = sanitizeQtyValue(input.value);

    if (input.value !== sanitized) {
      console.log("Limpando quantidade:", input.value, "→", sanitized);
      input.value = sanitized;
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const name = sanitizeNameValue(elements.nameInput.value).trim();
    const qty = sanitizeQtyValue(elements.qtyInput.value);

    const qtyStrictPattern = /^\d+(kg|g)?$/;

    if (name.length === 0) {
      console.warn("Nome é obrigatório.");
      elements.nameInput.focus();
      return;
    }
    if (qty.length > 0 && !qtyStrictPattern.test(qty)) {
      console.warn("Quantidade inválida. Use 10, 10g ou 10kg");
      elements.qtyInput.focus();
      return;
    }

    const newItem = createItemElement({ name, qty });
    elements.itemsList.appendChild(newItem);

    elements.form.reset();
    elements.nameInput.focus();

    refreshUI();

    console.log("[submit] item inserido", { name, qty });
  }

  function handleItemsListClick(event) {
    const checkboxButton = event.target.closest(".item__checkbox");
    if (!checkboxButton) return;

    const item = checkboxButton.closest(".item");
    if (!item) return;

    const willBeCompleted = !item.classList.contains("item--completed");

    item.classList.toggle("item--completed", willBeCompleted);
    setCheckboxState(checkboxButton, willBeCompleted);

    refreshUI();

    console.log("[toggle]", { willBeCompleted });
  }

  function setCheckboxState(checkboxButton, isCompleted) {
    checkboxButton.classList.toggle("item__checkbox--checked", isCompleted);

    const label = isCompleted
      ? "Desmarcar como comprado"
      : "Marcar como comprado";
    checkboxButton.setAttribute("aria-label", label);

    const existingIcon = checkboxButton.querySelector("img");

    if (isCompleted && !existingIcon) {
      const icon = document.createElement("img");
      icon.src = "./assets/icons/itemcheck.svg";
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      checkboxButton.appendChild(icon);
    }

    if (!isCompleted && existingIcon) {
      existingIcon.remove();
    }
  }

  function updateStatsUI(stats) {
    elements.statTotal.textContent = stats.total;
    elements.statBought.textContent = stats.bought;
    elements.statRemaining.textContent = stats.remaining;
  }

  function refreshUI() {
    const items = getItems();
    const stats = getStats(items);
    updateStatsUI(stats);
    updateSubtitleUI(stats);
    updateProgressUI(stats);

    function updateProgressUI(stats) {
      let percent = 0;

      if (stats.total > 0) {
        percent = Math.round((stats.bought / stats.total) * 100);
      }

      elements.progressBar.style.setProperty("--progress", percent + "%");
    }

    function updateSubtitleUI(stats) {
      elements.subtitle.textContent =
        stats.bought + " de " + stats.total + " itens comprados";
    }

    console.group("[refreshUI]");
    console.log("items:", items);
    console.log("stats:", stats);
    console.groupEnd();
  }

  function init() {
    if (!assertRequiredElements()) return;

    elements.itemsList.addEventListener("click", handleItemsListClick);

    elements.form.addEventListener("submit", handleFormSubmit);

    elements.qtyInput.addEventListener("blur", handleQtyBlur);

    elements.nameInput.addEventListener("input", handleNameInput);

    elements.qtyInput.addEventListener("input", handleQtyInput);

    refreshUI();

    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "r") {
        refreshUI();
      }
    });
  }

  init();
})();
