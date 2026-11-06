/*
 * CGR — Shared website behaviour
 *
 * Load order:
 * 1. products.js
 * 2. store.js
 * 3. main.js
 */

(function () {
  "use strict";

  const CGR = window.CGR;

  if (!CGR || !CGR.store) {
    console.error(
      "CGR: Load products.js and store.js before main.js."
    );
    return;
  }

  /*
   * Resolve paths from this script's location.
   * This supports both the homepage and /pages/ files,
   * including a GitHub Pages repository subdirectory.
   */
  const scriptElement = document.currentScript;

  const siteRoot = new URL(
    "../",
    scriptElement
      ? scriptElement.src
      : new URL("js/main.js", document.baseURI).href
  );

  function siteUrl(path) {
    return new URL(path, siteRoot).href;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  const money = CGR.formatMoney;

  function showToast(message) {
    let toast = document.getElementById("cgr-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cgr-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    window.clearTimeout(showToast.timer);

    toast.textContent = message;
    toast.hidden = false;

    showToast.timer = window.setTimeout(function () {
      toast.hidden = true;
    }, 4500);
  }

  /*
   * Replace missing images with a readable placeholder.
   * Error events are captured because they do not bubble.
   */
  document.addEventListener("error", function (event) {
    const image = event.target;

    if (
      !(image instanceof HTMLImageElement) ||
      !image.hasAttribute("data-product-image")
    ) {
      return;
    }

    const placeholder = document.createElement("div");
    placeholder.className = "image-placeholder";
    placeholder.textContent = "Product image unavailable";

    image.replaceWith(placeholder);
  }, true);

  function imageMarkup(path, name, extraAttributes) {
    if (!path) {
      return '<div class="image-placeholder">Product image coming soon</div>';
    }

    return `
      <img
        src="${escapeHtml(siteUrl(path))}"
        alt="${escapeHtml(name)}"
        data-product-image
        ${extraAttributes || ""}
      >
    `;
  }

  /*
   * Dropdown behaviour.
   * Native <details> also works without JavaScript.
   */
  document.addEventListener("click", function (event) {
    document.querySelectorAll(".products-dropdown[open]")
      .forEach(function (dropdown) {
        if (!dropdown.contains(event.target)) {
          dropdown.open = false;
        }
      });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    document.querySelectorAll(".products-dropdown[open]")
      .forEach(function (dropdown) {
        dropdown.open = false;
        dropdown.querySelector("summary")?.focus();
      });
  });

  /*
   * CUSTOM PRODUCT CATALOGUE
   *
   * Required HTML container:
   * <div id="custom-catalogue"></div>
   */
  function initCatalogue() {
    const root = document.getElementById("custom-catalogue");

    if (!root) {
      return;
    }

    root.innerHTML = `
      <div class="catalogue-toolbar">
        <div class="field">
          <label for="catalogue-search">Search products</label>
          <input
            id="catalogue-search"
            type="search"
            placeholder="Search names or components"
          >
        </div>

        <div class="field">
          <label for="catalogue-group">Product group</label>
          <select id="catalogue-group">
            <option value="all">All groups</option>
            ${CGR.customGroups.map(function (group) {
              return `
                <option value="${escapeHtml(group.id)}">
                  ${escapeHtml(group.name)}
                </option>
              `;
            }).join("")}
          </select>
        </div>
      </div>

      <p class="results-count" id="catalogue-count" role="status"></p>
      <div class="product-grid" id="catalogue-grid"></div>
    `;

    const search = root.querySelector("#catalogue-search");
    const group = root.querySelector("#catalogue-group");
    const count = root.querySelector("#catalogue-count");
    const grid = root.querySelector("#catalogue-grid");

    function renderResults() {
      const products = CGR.searchCustomProducts(
        search.value,
        group.value
      );

      count.textContent =
        products.length + " of " +
        CGR.customProducts.length + " products shown";

      if (!products.length) {
        grid.innerHTML = `
          <div class="empty-state">
            <h2>No matching products</h2>
            <p>Try a different search or product group.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = products.map(function (product) {
        const price = CGR.getStartingPurchasePrice(product);
        const href = escapeHtml(siteUrl(product.page));
        const previewId = "preview-" + product.id;

        const suppliedSpecification = product.specifications.find(
          function (specification) {
            return specification.label === "Specification supplied";
          }
        );

        const specificationText = suppliedSpecification
          ? suppliedSpecification.value
          : "To be confirmed";

        const previewText = specificationText === "To be confirmed"
          ? product.groupLabel +
            ". Variant dimensions and specifications to be confirmed."
          : specificationText;

        return `
          <article class="product-card custom-product-card">

            <div class="product-preview-area">
              <a
                class="product-card-image"
                href="${href}"
                aria-describedby="${escapeHtml(previewId)}"
              >
                ${imageMarkup(
                  product.images[0],
                  product.name,
                  'loading="lazy"'
                )}
              </a>

              <div
                class="product-hover-preview"
                id="${escapeHtml(previewId)}"
              >
                <span class="preview-heading">
                  Quick Specification
                </span>

                <p>${escapeHtml(previewText)}</p>
              </div>
            </div>

            <div class="product-card-body">
              <div class="badge-group">
                <span class="badge">Purchase Only</span>
                <span class="badge badge-outline">Demo Data</span>
              </div>

              <h2>
                <a href="${href}">
                  ${escapeHtml(product.name)}
                </a>
              </h2>

              <p class="product-card-description">
                ${escapeHtml(product.groupLabel)}
              </p>

              <div class="product-card-price">
                ${price === null
                  ? "Price on enquiry"
                  : "From " + money(price)}

                <small>
                  Demo purchase amount.
                  Open the product to select a variant and price unit.
                </small>
              </div>

              <a class="button button-primary" href="${href}">
                View Details
                <span aria-hidden="true">→</span>
              </a>
            </div>

          </article>
        `;
      }).join("");
    }

    search.addEventListener("input", renderResults);
    group.addEventListener("change", renderResults);

    renderResults();
  }

  function specificationMarkup(specifications) {
    return specifications.map(function (specification) {
      return `
        <div class="specification-row">
          <dt>${escapeHtml(specification.label)}</dt>
          <dd>${escapeHtml(specification.value)}</dd>
        </div>
      `;
    }).join("");
  }

  /*
   * PRODUCT DETAIL
   *
   * Main product example:
   * <div id="product-detail"
   *      data-product-id="main-aluminium-scaffolding"></div>
   *
   * Custom product page:
   * <div id="product-detail"></div>
   * Product ID is read from ?id=custom-01.
   */
  function initProductDetail() {
    const root = document.getElementById("product-detail");

    if (!root) {
      return;
    }

    const productId = root.dataset.productId ||
      new URLSearchParams(window.location.search).get("id");

    const product = CGR.getProduct(productId);

    if (!product) {
      root.innerHTML = `
        <div class="empty-state">
          <h2>Product not found</h2>
          <p>Please select a product from the catalogue.</p>
          <a
            class="button button-primary"
            href="${escapeHtml(siteUrl("pages/custom-products.html"))}"
          >
            Browse Custom Products
          </a>
        </div>
      `;
      return;
    }

    document.title = product.name + " | CGR Fabrication";

    const heading = document.querySelector("[data-product-title]");
    const breadcrumb = document.querySelector("[data-product-breadcrumb]");

    if (heading) {
      heading.textContent = product.name;
    }

    if (breadcrumb) {
      breadcrumb.textContent = product.name;
    }

    root.innerHTML = `
      <div class="product-detail">
        <div class="product-gallery">
          <div class="gallery-main" id="gallery-main">
            ${imageMarkup(product.images[0], product.name)}
          </div>

          <div class="gallery-thumbnails" aria-label="Product images">
            ${product.images.map(function (path, index) {
              return `
                <button
                  type="button"
                  class="gallery-thumbnail"
                  data-gallery-index="${index}"
                  aria-label="Show product image ${index + 1}"
                  aria-pressed="${index === 0}"
                >
                  ${imageMarkup(
                    path,
                    product.name + " — image " + (index + 1),
                    'loading="lazy"'
                  )}
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <div class="product-info">
          <div class="badge-group">
            <span class="badge">Purchase</span>
            ${product.rentalEnabled
              ? '<span class="badge badge-outline">Rental</span>'
              : ""}
            <span class="badge badge-outline">Demo information</span>
          </div>

          <h2>${escapeHtml(product.name)}</h2>

          <p class="product-description">
            ${escapeHtml(product.description)}
          </p>

          <form id="product-form" class="product-purchase-panel">
            <div class="field">
              <label for="product-variant">Choose variant</label>

              <select id="product-variant" name="variantId">
                ${product.variants.map(function (variant) {
                  return `
                    <option value="${escapeHtml(variant.id)}">
                      ${escapeHtml(variant.name)}
                    </option>
                  `;
                }).join("")}
              </select>
            </div>

            <fieldset class="purchase-mode">
              <legend>Select purchase or rental</legend>

              <label class="mode-option">
                <input
                  type="radio"
                  name="mode"
                  value="purchase"
                  checked
                >
                Purchase
              </label>

              ${product.rentalEnabled ? `
                <label class="mode-option">
                  <input type="radio" name="mode" value="rental">
                  Rental
                </label>
              ` : ""}
            </fieldset>

            <div id="product-price" class="price-display"></div>

            <div class="purchase-fields">
              <div class="field">
                <label for="product-quantity">Quantity</label>
                <input
                  id="product-quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  max="9999"
                  step="1"
                  value="1"
                  required
                >
              </div>

              <div class="field" id="rental-duration-field" hidden>
                <label for="rental-duration" id="rental-duration-label">
                  Rental duration
                </label>
                <input
                  id="rental-duration"
                  name="rentalPeriods"
                  type="number"
                  min="1"
                  max="3650"
                  step="1"
                  value="1"
                >
              </div>
            </div>

            <div class="rental-details" id="rental-details" hidden></div>

            <p class="small-text" id="selection-total" role="status"></p>

            <button
              class="button button-primary button-full"
              type="submit"
            >
              Add to Basket
            </button>
            
            <a
              id="view-basket-button"
              class="button button-secondary button-full"
              href="${escapeHtml(siteUrl("pages/basket.html"))}"
              hidden
            >
              View Basket
              <span aria-hidden="true">→</span>
            </a>

            <p
            class="status-message"
            id="product-status"
            role="status"
            ></p>

            <p class="small-text">
              Demo amounts only. Taxes and additional charges are not
              calculated. Adding an item does not place an order,
              reserve stock, or confirm a rental.
            </p>
          </form>
        </div>
      </div>

      <section class="specification-panel">
        <h2>Product Specifications</h2>
        <dl class="specification-list">
          ${specificationMarkup(product.specifications)}
        </dl>

        <h3 style="margin-top: 24px;">Selected Variant</h3>
        <dl class="specification-list" id="variant-specifications"></dl>
      </section>
    `;

    const form = root.querySelector("#product-form");
    const variantSelect = root.querySelector("#product-variant");
    const quantityInput = root.querySelector("#product-quantity");
    const durationInput = root.querySelector("#rental-duration");
    const durationField = root.querySelector("#rental-duration-field");
    const durationLabel = root.querySelector("#rental-duration-label");
    const priceDisplay = root.querySelector("#product-price");
    const rentalDetails = root.querySelector("#rental-details");
    const selectionTotal = root.querySelector("#selection-total");
    const status = root.querySelector("#product-status");

    function selectedVariant() {
      return CGR.getVariant(product.id, variantSelect.value);
    }

    function selectedMode() {
      return form.querySelector('input[name="mode"]:checked').value;
    }

    function updateSelection() {
      const variant = selectedVariant();
      const isRental = selectedMode() === "rental";
      const rental = variant.rental;

      status.textContent = "";
      status.classList.remove("error-message");

      durationField.hidden = !isRental;
      durationInput.disabled = !isRental;
      durationInput.required = isRental;
      rentalDetails.hidden = !isRental;

      const unitPrice = isRental
        ? rental.rate
        : variant.purchasePrice;

      if (isRental) {
        durationInput.min = String(rental.minimumPeriods);

        if (
          durationInput.value !== "" &&
          Number(durationInput.value) < rental.minimumPeriods
        ) {
          durationInput.value = String(rental.minimumPeriods);
        }

        durationLabel.textContent =
          "Rental duration (" + rental.period + "s)";

        rentalDetails.innerHTML = `
          <p>
            Minimum rental:
            ${rental.minimumPeriods}
            ${escapeHtml(rental.period)}(s).
          </p>
          <p>
            Deposit:
            ${rental.deposit === null
              ? "To be confirmed"
              : money(rental.deposit)}.
          </p>
          <p>${escapeHtml(rental.deliveryNote)}</p>
          <p>${escapeHtml(rental.installationNote)}</p>
        `;
      }

      priceDisplay.innerHTML = `
        <span class="price-label">
          ${isRental ? "Demo rental rate" : "Demo purchase amount"}
        </span>

        <span class="price-amount">${money(unitPrice)}</span>

        <span class="price-unit">
          Per ${escapeHtml(variant.purchaseUnit)}
          ${isRental ? " per " + escapeHtml(rental.period) : ""}
        </span>

        <span class="tax-note">
          ${escapeHtml(CGR.settings.taxNotice)}
        </span>
      `;

      root.querySelector("#variant-specifications").innerHTML =
        specificationMarkup(variant.specifications);

      const quantity = Number(quantityInput.value);
      const periods = isRental ? Number(durationInput.value) : 1;

      const validQuantity =
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 9999;

      const validPeriods = !isRental || (
        Number.isInteger(periods) &&
        periods >= rental.minimumPeriods &&
        periods <= 3650
      );

      selectionTotal.textContent =
        validQuantity && validPeriods && Number.isFinite(unitPrice)
          ? "Demo selection subtotal: " +
            money(Math.round(unitPrice * quantity * periods * 100) / 100)
          : "Enter a valid quantity and rental duration.";
    }

    form.addEventListener("input", updateSelection);
    form.addEventListener("change", updateSelection);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
    
      if (!form.reportValidity()) {
        return;
      }
    
      try {
        CGR.store.addItem({
          productId: product.id,
          variantId: variantSelect.value,
          mode: selectedMode(),
          quantity: Number(quantityInput.value),
          rentalPeriods: Number(durationInput.value)
        });
    
        /*
         * Reveal the existing button.
         * If it was accidentally omitted from the form template,
         * create it directly below Add to Basket.
         */
        let viewBasketButton = form.querySelector(
          "#view-basket-button"
        );
    
        if (!viewBasketButton) {
          viewBasketButton = document.createElement("a");
    
          viewBasketButton.id = "view-basket-button";
    
          viewBasketButton.className =
            "button button-secondary button-full";
    
          viewBasketButton.href = siteUrl("pages/basket.html");
    
          viewBasketButton.textContent = "View Basket →";
    
          const addButton = form.querySelector(
            'button[type="submit"]'
          );
    
          addButton.insertAdjacentElement(
            "afterend",
            viewBasketButton
          );
        }
    
        viewBasketButton.hidden = false;
    
        status.classList.remove("error-message");
        status.textContent = "Added to your basket.";
    
        showToast(product.name + " added to basket.");
      } catch (error) {
        status.classList.add("error-message");
        status.textContent = error.message;
      }
    });
    root.addEventListener("click", function (event) {
      const thumbnail = event.target.closest("[data-gallery-index]");

      if (!thumbnail || !root.contains(thumbnail)) {
        return;
      }

      const index = Number(thumbnail.dataset.galleryIndex);

      root.querySelector("#gallery-main").innerHTML =
        imageMarkup(
          product.images[index],
          product.name + " — image " + (index + 1)
        );

      root.querySelectorAll("[data-gallery-index]")
        .forEach(function (button) {
          button.setAttribute(
            "aria-pressed",
            String(button === thumbnail)
          );
        });
    });

    updateSelection();
  }

  /*
   * BASKET PAGE
   *
   * Required HTML container:
   * <div id="basket-content"></div>
   */
  function initBasket() {
    const root = document.getElementById("basket-content");

    if (!root) {
      return;
    }

    function renderBasket() {
      const lines = CGR.store.getLineItems();
      const summary = CGR.store.getSummary();

      const storageNotice = summary.storageWarning
        ? `<p class="notice" role="status">
             ${escapeHtml(summary.storageWarning)}
           </p>`
        : "";

      if (!lines.length) {
        root.innerHTML = `
          <div class="empty-state">
            <h2>Your basket is empty</h2>
            <p>
              Choose a product and variant to start your selection.
            </p>
            <a
              class="button button-primary"
              href="${escapeHtml(siteUrl("index.html#products"))}"
            >
              Explore Products
            </a>
          </div>
          ${storageNotice}
        `;
        return;
      }

      root.innerHTML = `
        <div class="basket-layout">
          <div>
            <div class="basket-items">
              ${lines.map(function (line) {
                return `
                  <article class="basket-item">
                    <div>
                      ${line.image
                        ? imageMarkup(
                            line.image,
                            line.productName,
                            'class="basket-item-image" loading="lazy"'
                          )
                        : '<div class="image-placeholder">No image</div>'}
                    </div>

                    <div class="basket-item-content">
                      <h2>
                        <a href="${escapeHtml(siteUrl(line.page))}">
                          ${escapeHtml(line.productName)}
                        </a>
                      </h2>

                      <p class="basket-item-meta">
                        ${escapeHtml(line.variantName)}
                      </p>

                      <p class="basket-item-meta">
                        ${line.mode === "rental" ? "Rental" : "Purchase"}:
                        ${money(line.unitPrice)}
                        per ${escapeHtml(line.purchaseUnit)}
                        ${line.mode === "rental"
                          ? " per " + escapeHtml(line.rentalPeriod)
                          : ""}
                      </p>

                      ${line.mode === "rental" ? `
                        <div class="field">
                          <label for="duration-${escapeHtml(line.key)}">
                            Duration (${escapeHtml(line.rentalPeriod)}s)
                          </label>
                          <input
                            id="duration-${escapeHtml(line.key)}"
                            class="form-control"
                            type="number"
                            min="${line.rentalDetails.minimumPeriods}"
                            max="3650"
                            step="1"
                            value="${line.rentalPeriods}"
                            data-basket-duration="${escapeHtml(line.key)}"
                          >
                        </div>
                      ` : ""}

                      <div class="basket-item-bottom">
                        <div class="basket-item-controls">
                          <div class="quantity-control">
                            <button
                              type="button"
                              data-quantity-step="-1"
                              data-key="${escapeHtml(line.key)}"
                              aria-label="Decrease quantity for ${escapeHtml(line.productName)}"
                              ${line.quantity <= 1 ? "disabled" : ""}
                            >−</button>

                            <input
                              type="number"
                              min="1"
                              max="9999"
                              step="1"
                              value="${line.quantity}"
                              data-basket-quantity="${escapeHtml(line.key)}"
                              aria-label="Quantity for ${escapeHtml(line.productName)}"
                            >

                            <button
                              type="button"
                              data-quantity-step="1"
                              data-key="${escapeHtml(line.key)}"
                              aria-label="Increase quantity for ${escapeHtml(line.productName)}"
                              ${line.quantity >= 9999 ? "disabled" : ""}
                            >+</button>
                          </div>

                          <button
                            class="remove-button"
                            type="button"
                            data-remove-item="${escapeHtml(line.key)}"
                          >
                            Remove
                          </button>
                        </div>

                        <span class="basket-line-total">
                          ${money(line.lineTotal)}
                        </span>
                      </div>
                    </div>
                  </article>
                `;
              }).join("")}
            </div>

            <div class="basket-actions">
              <a
                class="button button-secondary"
                href="${escapeHtml(siteUrl("index.html#products"))}"
              >
                Continue Browsing
              </a>

              <button
                class="button button-secondary"
                type="button"
                data-clear-basket
              >
                Clear Basket
              </button>
            </div>
          </div>

          <aside class="basket-summary" aria-label="Basket summary">
            <h2>Basket Summary</h2>

            <div class="summary-row">
              <span>Selected units</span>
              <span>${summary.itemCount}</span>
            </div>

            <div class="summary-row">
              <span>Purchase subtotal</span>
              <span>${money(summary.purchaseSubtotal)}</span>
            </div>

            <div class="summary-row">
              <span>Rental subtotal</span>
              <span>${money(summary.rentalSubtotal)}</span>
            </div>

            <div class="summary-row summary-total">
              <span>Demo subtotal</span>
              <span>${money(summary.subtotal)}</span>
            </div>

            <p class="small-text">
              This is not a final payable amount. GST, delivery,
              installation, and rental deposits are not calculated.
            </p>

            <button
              class="button button-primary button-full"
              type="button"
              disabled
            >
              Checkout — Coming Later
            </button>

            <p class="small-text">
              No payment is collected. This basket does not place
              an order or confirm availability or rental dates.
            </p>
          </aside>
        </div>

        ${storageNotice}
      `;
    }

    /*
     * Preserve keyboard focus when basket changes replace the markup.
     */
    function restoreControlFocus(attribute, key, step) {
      const controls = root.querySelectorAll("[" + attribute + "]");

      const match = Array.from(controls).find(function (control) {
        if (control.getAttribute(attribute) !== key) {
          return false;
        }

        return step === undefined ||
          control.dataset.quantityStep === step;
      });

      if (match && !match.disabled) {
        match.focus();
      }
    }

    root.addEventListener("change", function (event) {
      const input = event.target;

      const quantityKey = input.getAttribute("data-basket-quantity");
      const durationKey = input.getAttribute("data-basket-duration");

      if (!quantityKey && !durationKey) {
        return;
      }

      try {
        if (quantityKey) {
          CGR.store.setQuantity(quantityKey, Number(input.value));

          restoreControlFocus(
            "data-basket-quantity",
            quantityKey
          );
        } else {
          const updated = CGR.store.setRentalPeriods(
            durationKey,
            Number(input.value)
          );

          restoreControlFocus(
            "data-basket-duration",
            updated.key
          );
        }
      } catch (error) {
        showToast(error.message);
        renderBasket();

        restoreControlFocus(
          quantityKey ? "data-basket-quantity" : "data-basket-duration",
          quantityKey || durationKey
        );
      }
    });

    root.addEventListener("click", function (event) {
      const stepButton = event.target.closest("[data-quantity-step]");
      const removeButton = event.target.closest("[data-remove-item]");
      const clearButton = event.target.closest("[data-clear-basket]");

      try {
        if (stepButton) {
          const key = stepButton.dataset.key;
          const step = stepButton.dataset.quantityStep;

          const item = CGR.store.getItems().find(function (entry) {
            return entry.key === key;
          });

          if (item) {
            CGR.store.setQuantity(
              key,
              item.quantity + Number(step)
            );

            restoreControlFocus("data-key", key, step);
          }
        }

        if (removeButton) {
          CGR.store.removeItem(removeButton.dataset.removeItem);
          showToast("Item removed from basket.");
        }

        if (
          clearButton &&
          window.confirm("Remove all items from your basket?")
        ) {
          CGR.store.clearBasket();
          showToast("Basket cleared.");
        }
      } catch (error) {
        showToast(error.message);
      }
    });

    CGR.store.subscribe(renderBasket);
    renderBasket();
  }

  function init() {
    CGR.store.updateBasketBadges();
    initCatalogue();
    initProductDetail();
    initBasket();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
