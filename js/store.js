/*
 * CGR — Basket storage and calculations
 *
 * Requires products.js to load first.
 *
 * All monetary values are in rupees, not paise.
 * Prices are read from the current catalogue, never trusted
 * from saved basket data.
 *
 * No payments, orders, or rental bookings are created here.
 */

(function () {
  "use strict";

  const CGR = window.CGR;

  if (!CGR) {
    console.error("CGR: Load products.js before store.js.");
    return;
  }

  const STORAGE_KEY = CGR.settings.basketStorageKey;
  const STORAGE_VERSION = 1;

  const MAX_QUANTITY = 9999;
  const MAX_RENTAL_PERIODS = 3650;

  let items = [];
  let storageAvailable = true;
  let storageWarning = "";

  function isPositiveInteger(value, maximum) {
    return (
      Number.isInteger(value) &&
      value >= 1 &&
      value <= maximum
    );
  }

  function roundMoney(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  function copyItem(item) {
    return {
      key: item.key,
      productId: item.productId,
      variantId: item.variantId,
      mode: item.mode,
      quantity: item.quantity,
      rentalPeriods: item.rentalPeriods
    };
  }

  function makeKey(productId, variantId, mode, rentalPeriods) {
    /*
     * Different rental durations remain separate basket lines.
     */
    return [
      productId,
      variantId,
      mode,
      mode === "rental" ? rentalPeriods : 0
    ].join("::");
  }

  function validateSelection(input) {
    if (!input || typeof input !== "object") {
      throw new Error("Please provide a product selection.");
    }

    const product = CGR.getProduct(input.productId);

    if (!product) {
      throw new Error("This product is not in the current catalogue.");
    }

    const variant = CGR.getVariant(
      product.id,
      input.variantId
    );

    if (!variant) {
      throw new Error("Please select a valid product variant.");
    }

    const mode = input.mode || "purchase";

    if (mode !== "purchase" && mode !== "rental") {
      throw new Error("Please choose purchase or rental.");
    }

    const quantity = Number(
      input.quantity === undefined ? 1 : input.quantity
    );

    if (!isPositiveInteger(quantity, MAX_QUANTITY)) {
      throw new Error(
        "Quantity must be a whole number from 1 to " +
        MAX_QUANTITY + "."
      );
    }

    let rentalPeriods = 0;

    if (mode === "purchase") {
      if (!product.purchaseEnabled) {
        throw new Error("Purchase is not listed for this product.");
      }

      if (
        !Number.isFinite(variant.purchasePrice) ||
        variant.purchasePrice < 0
      ) {
        throw new Error(
          "This variant needs a confirmed purchase amount before it can be added."
        );
      }
    }

    if (mode === "rental") {
      if (
        !product.rentalEnabled ||
        product.type === "custom" ||
        !variant.rental
      ) {
        throw new Error("Rental is not listed for this product.");
      }

      const rental = variant.rental;

      if (
        !Number.isFinite(rental.rate) ||
        rental.rate < 0 ||
        !["day", "week", "month"].includes(rental.period) ||
        !isPositiveInteger(
          rental.minimumPeriods,
          MAX_RENTAL_PERIODS
        )
      ) {
        throw new Error("Rental details need to be confirmed.");
      }

      rentalPeriods = Number(
        input.rentalPeriods === undefined
          ? rental.minimumPeriods
          : input.rentalPeriods
      );

      if (
        !isPositiveInteger(rentalPeriods, MAX_RENTAL_PERIODS) ||
        rentalPeriods < rental.minimumPeriods
      ) {
        throw new Error(
          "Rental duration must be a whole number between " +
          rental.minimumPeriods + " and " +
          MAX_RENTAL_PERIODS + " " +
          rental.period + "(s)."
        );
      }
    }

    return {
      key: makeKey(
        product.id,
        variant.id,
        mode,
        rentalPeriods
      ),
      productId: product.id,
      variantId: variant.id,
      mode: mode,
      quantity: quantity,
      rentalPeriods: rentalPeriods
    };
  }

  function mergeInto(list, selection) {
    const existing = list.find(function (item) {
      return item.key === selection.key;
    });

    if (!existing) {
      list.push(copyItem(selection));
      return;
    }

    const newQuantity = existing.quantity + selection.quantity;

    if (newQuantity > MAX_QUANTITY) {
      throw new Error(
        "The combined quantity cannot exceed " + MAX_QUANTITY + "."
      );
    }

    existing.quantity = newQuantity;
  }

  function restoreItems(rawItems) {
    const restored = [];

    rawItems.forEach(function (rawItem) {
      try {
        const selection = validateSelection(rawItem);
        mergeInto(restored, selection);
      } catch (error) {
        /*
         * Ignore obsolete or invalid saved selections.
         */
        console.warn(
          "CGR: A saved basket item could not be restored.",
          error.message
        );
      }
    });

    return restored;
  }

  function readStorage() {
    let saved;

    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      storageAvailable = false;
      storageWarning =
        "Browser storage is unavailable. Basket changes will last only for this page session.";
      return [];
    }

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved);

      if (
        !parsed ||
        parsed.version !== STORAGE_VERSION ||
        !Array.isArray(parsed.items)
      ) {
        storageWarning =
          "An older basket could not be restored. Please select your products again.";
        return [];
      }

      return restoreItems(parsed.items);
    } catch (error) {
      storageWarning =
        "The saved basket could not be read. Please select your products again.";
      return [];
    }
  }

  function saveStorage() {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: STORAGE_VERSION,
          items: items.map(copyItem)
        })
      );

      storageAvailable = true;
      storageWarning = "";
    } catch (error) {
      storageAvailable = false;
      storageWarning =
        "Basket changes could not be saved. They may be lost when you leave this page.";
    }
  }

  function getItems() {
    /*
     * Return copies so callers cannot accidentally mutate the basket.
     */
    return items.map(copyItem);
  }

  function getLineItems() {
    return items.map(function (item) {
      const product = CGR.getProduct(item.productId);
      const variant = CGR.getVariant(
        item.productId,
        item.variantId
      );

      const isRental = item.mode === "rental";

      const unitPrice = isRental
        ? variant.rental.rate
        : variant.purchasePrice;

      const multiplier = isRental
        ? item.rentalPeriods
        : 1;

      const lineTotal = roundMoney(
        unitPrice * item.quantity * multiplier
      );

      return {
        ...copyItem(item),

        product: product,
        variant: variant,

        productName: product.name,
        variantName: variant.name,
        image: product.images[0] || null,
        page: product.page,

        unitPrice: unitPrice,
        purchaseUnit: variant.purchaseUnit,

        rentalPeriod: isRental
          ? variant.rental.period
          : null,

        rentalDetails: isRental
          ? variant.rental
          : null,

        lineTotal: lineTotal,

        isDemo:
          CGR.settings.demoMode ||
          product.isDemo ||
          variant.isDemo
      };
    });
  }

  function getSummary() {
    const lines = getLineItems();

    const purchaseSubtotal = roundMoney(
      lines
        .filter(function (line) {
          return line.mode === "purchase";
        })
        .reduce(function (sum, line) {
          return sum + line.lineTotal;
        }, 0)
    );

    const rentalSubtotal = roundMoney(
      lines
        .filter(function (line) {
          return line.mode === "rental";
        })
        .reduce(function (sum, line) {
          return sum + line.lineTotal;
        }, 0)
    );

    return {
      lineCount: lines.length,

      /*
       * Basket badge counts selected units, not distinct products.
       */
      itemCount: lines.reduce(function (sum, line) {
        return sum + line.quantity;
      }, 0),

      purchaseSubtotal: purchaseSubtotal,
      rentalSubtotal: rentalSubtotal,
      subtotal: roundMoney(
        purchaseSubtotal + rentalSubtotal
      ),

      /*
       * Unknown charges remain null, not zero.
       * The subtotal is not a final payable amount.
       */
      taxAmount: null,
      deliveryAmount: null,
      installationAmount: null,
      depositAmount: null,
      payableTotal: null,

      currency: CGR.settings.currency,

      hasRentalItems: lines.some(function (line) {
        return line.mode === "rental";
      }),

      isDemo: CGR.settings.demoMode || lines.some(function (line) {
        return line.isDemo;
      }),

      checkoutEnabled: false,
      paymentsEnabled: false,

      storageAvailable: storageAvailable,
      storageWarning: storageWarning
    };
  }

function updateBasketBadges() {
  /*
   * Count distinct products, not total quantities.
   */
  const count = new Set(
    items.map(function (item) {
      return item.productId;
    })
  ).size;

  document.querySelectorAll("[data-basket-count]")
    .forEach(function (badge) {
      badge.textContent = String(count);

      badge.setAttribute(
        "aria-label",
        count + (
          count === 1
            ? " product in basket"
            : " products in basket"
        )
      );
    });
}
  
  function notifyChange() {
    updateBasketBadges();

    window.dispatchEvent(
      new CustomEvent("cgr:basket-changed", {
        detail: {
          items: getItems(),
          summary: getSummary()
        }
      })
    );
  }

  function commit(nextItems) {
    items = nextItems;
    saveStorage();
    notifyChange();
  }

  function addItem(input) {
    const selection = validateSelection(input);
    const nextItems = getItems();

    mergeInto(nextItems, selection);
    commit(nextItems);

    return copyItem(
      items.find(function (item) {
        return item.key === selection.key;
      })
    );
  }

  function updateItem(key, changes) {
    const existing = items.find(function (item) {
      return item.key === key;
    });

    if (!existing) {
      throw new Error("This basket item could not be found.");
    }

    if (!changes || typeof changes !== "object") {
      throw new Error("Please provide the basket changes.");
    }

    /*
     * Product and variant cannot be changed through this method.
     * To choose a different product or variant, add a new selection.
     */
    const updated = validateSelection({
      productId: existing.productId,
      variantId: existing.variantId,
      mode: existing.mode,

      quantity:
        changes.quantity === undefined
          ? existing.quantity
          : changes.quantity,

      rentalPeriods:
        changes.rentalPeriods === undefined
          ? existing.rentalPeriods
          : changes.rentalPeriods
    });

    const nextItems = getItems().filter(function (item) {
      return item.key !== key;
    });

    mergeInto(nextItems, updated);
    commit(nextItems);

    return copyItem(
      items.find(function (item) {
        return item.key === updated.key;
      })
    );
  }

  function setQuantity(key, quantity) {
    return updateItem(key, {
      quantity: quantity
    });
  }

  function setRentalPeriods(key, rentalPeriods) {
    const existing = items.find(function (item) {
      return item.key === key;
    });

    if (!existing || existing.mode !== "rental") {
      throw new Error("Please select a rental basket item.");
    }

    return updateItem(key, {
      rentalPeriods: rentalPeriods
    });
  }

  function removeItem(key) {
    const nextItems = getItems().filter(function (item) {
      return item.key !== key;
    });

    if (nextItems.length === items.length) {
      return false;
    }

    commit(nextItems);
    return true;
  }

  function clearBasket() {
    commit([]);
  }

  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error("A basket listener must be a function.");
    }

    function handler(event) {
      listener(event.detail);
    }

    window.addEventListener("cgr:basket-changed", handler);

    return function unsubscribe() {
      window.removeEventListener("cgr:basket-changed", handler);
    };
  }

  /*
   * INITIAL LOAD
   */

  items = readStorage();

  CGR.store = {
    getItems: getItems,
    getLineItems: getLineItems,
    getSummary: getSummary,

    addItem: addItem,
    updateItem: updateItem,
    setQuantity: setQuantity,
    setRentalPeriods: setRentalPeriods,

    removeItem: removeItem,
    clearBasket: clearBasket,

    subscribe: subscribe,
    updateBasketBadges: updateBasketBadges
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      updateBasketBadges,
      { once: true }
    );
  } else {
    updateBasketBadges();
  }

  /*
   * Refresh this tab when another tab changes the saved basket.
   */
  window.addEventListener("storage", function (event) {
    if (event.key !== STORAGE_KEY && event.key !== null) {
      return;
    }

    items = readStorage();
    notifyChange();
  });
})();
