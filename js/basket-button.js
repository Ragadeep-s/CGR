/*
 * CGR — Show View Basket on product pages
 *
 * Requires products.js, store.js, and main.js.
 * Does not add products or change basket quantities.
 */

(function () {
  "use strict";

  const script = document.currentScript;

  const basketUrl = script
    ? new URL("../pages/basket.html", script.src).href
    : new URL("basket.html", document.baseURI).href;

  function updateViewBasketButton() {
    const root = document.getElementById("product-detail");
    const store = window.CGR && window.CGR.store;

    if (!root || !store) {
      return;
    }

    const form = root.querySelector("#product-form");

    if (!form) {
      return;
    }

    const productId =
      root.dataset.productId ||
      new URLSearchParams(window.location.search).get("id");

    const productIsInBasket = store.getItems().some(function (item) {
      return item.productId === productId;
    });

    let button = form.querySelector("#view-basket-button");

    /*
     * Create the link only when this product is in the basket.
     * Reuse the earlier link if it already exists.
     */
    if (!button && productIsInBasket) {
      const addButton = form.querySelector('button[type="submit"]');

      if (!addButton) {
        return;
      }

      button = document.createElement("a");
      button.id = "view-basket-button";
      button.className = "button button-secondary button-full";
      button.textContent = "View Basket →";

      addButton.insertAdjacentElement("afterend", button);
    }

    if (!button) {
      return;
    }

    button.href = basketUrl;
    button.hidden = !productIsInBasket;

    /*
     * Ensure the visible state is not blocked by an old
     * display:none style from a previous implementation.
     */
    if (productIsInBasket) {
      button.removeAttribute("hidden");
      button.style.setProperty("display", "inline-flex", "important");
    } else {
      button.style.removeProperty("display");
    }
  }

  window.addEventListener(
    "cgr:basket-changed",
    updateViewBasketButton
  );

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      updateViewBasketButton,
      { once: true }
    );
  } else {
    updateViewBasketButton();
  }
})();
