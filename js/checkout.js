/*
 * CGR — Checkout page logic
 *
 * Renders the checkout form, order summary, and payment
 * controls. Uses CGR_CONFIG for GST, delivery, and payment
 * settings. Requires products.js and store.js.
 *
 * This file does not directly process payments. It sends
 * the order to the backend, which creates a Razorpay order
 * and returns the payment details.
 */

(function () {
  "use strict";

  const CONFIG = window.CGR_CONFIG || {};

  function formatMoney(amount) {
    if (!Number.isFinite(amount)) {
      return "Price on enquiry";
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: CONFIG.currency || "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  }

  function getBasketItems() {
    const store = window.CGR && window.CGR.store;

    if (!store) {
      return [];
    }

    return store.getItems();
  }

  function calculateOrderSummary(items) {
    const gstRate = CONFIG.gst ? CONFIG.gst.rate : 0;
    const gstIncluded = CONFIG.gst
      ? CONFIG.gst.includedInPrices
      : false;

    const deliveryAmount = CONFIG.delivery
      ? CONFIG.delivery.fixedAmount
      : 0;

    let subtotal = 0;

    items.forEach(function (item) {
      const product = window.CGR.getProduct(item.productId);
      const variant = window.CGR.getVariant(
        item.productId,
        item.variantId
      );

      if (!product || !variant) {
        return;
      }

      if (item.mode === "purchase") {
        subtotal +=
          variant.purchasePrice * item.quantity;
      } else if (variant.rental && variant.rental.rate) {
        subtotal +=
          variant.rental.rate *
          item.quantity *
          item.rentalPeriods;
      }
    });

    let gstAmount = 0;
    let orderTotal = subtotal;

    if (!gstIncluded && gstRate > 0) {
      gstAmount = (subtotal * gstRate) / 100;
      orderTotal = subtotal + gstAmount;
    }

    orderTotal += deliveryAmount;

    return {
      subtotal: subtotal,
      gstRate: gstRate,
      gstIncluded: gstIncluded,
      gstAmount: gstAmount,
      deliveryAmount: deliveryAmount,
      orderTotal: orderTotal
    };
  }

  function renderOrderSummary(items, summary) {
    const gstLabel = CONFIG.gst
      ? CONFIG.gst.label
      : "GST";

    const deliveryLabel = CONFIG.delivery
      ? CONFIG.delivery.label
      : "Delivery";

    const rows = items
      .map(function (item) {
        const product = window.CGR.getProduct(item.productId);
        const variant = window.CGR.getVariant(
          item.productId,
          item.variantId
        );

        if (!product || !variant) {
          return "";
        }

        const unitPrice =
          item.mode === "purchase"
            ? variant.purchasePrice
            : variant.rental.rate;

        const lineTotal =
          item.mode === "purchase"
            ? variant.purchasePrice * item.quantity
            : variant.rental.rate *
              item.quantity *
              item.rentalPeriods;

        const modeLabel =
          item.mode === "purchase" ? "Purchase" : "Rental";

        return `
          <div class="checkout-item">
            <div class="checkout-item-details">
              <h3>${escapeHtml(product.name)}</h3>
              <p>${escapeHtml(variant.name)}</p>
              <p class="checkout-item-mode">
                ${modeLabel} · Quantity: ${item.quantity}
                ${
                  item.mode === "rental"
                    ? " · Duration: " + item.rentalPeriods + " days"
                    : ""
                }
              </p>
            </div>

            <div class="checkout-item-price">
              <p>Unit: ${formatMoney(unitPrice)}</p>
              <p class="checkout-item-total">
                ${formatMoney(lineTotal)}
              </p>
            </div>
          </div>
        `;
      })
      .join("");

    const paymentMode = CONFIG.payment
      ? CONFIG.payment.mode
      : "full";

    const advancePercent = CONFIG.payment
      ? CONFIG.payment.advancePercent
      : 0;

    let payNowAmount = summary.orderTotal;
    let remainingAmount = 0;

    if (paymentMode === "advance" && advancePercent > 0) {
      payNowAmount = Math.round(
        (summary.orderTotal * advancePercent) / 100
      );

      remainingAmount = summary.orderTotal - payNowAmount;
    }

    return `
      <div class="order-summary">
        <h2>Order Summary</h2>

        ${rows}

        <div class="order-totals">
          <div class="order-total-row">
            <span>Subtotal</span>
            <span>${formatMoney(summary.subtotal)}</span>
          </div>

          <div class="order-total-row">
            <span>${escapeHtml(gstLabel)}</span>
            <span>${formatMoney(summary.gstAmount)}</span>
          </div>

          <div class="order-total-row">
            <span>${escapeHtml(deliveryLabel)}</span>
            <span>${formatMoney(summary.deliveryAmount)}</span>
          </div>

          <div class="order-total-row order-total-final">
            <span>Order Total</span>
            <span>${formatMoney(summary.orderTotal)}</span>
          </div>

          ${
            paymentMode === "advance"
              ? `
                <div class="order-total-row">
                  <span>Pay ${advancePercent}% now</span>
                  <span>${formatMoney(payNowAmount)}</span>
                </div>

                <div class="order-total-row">
                  <span>Remaining balance</span>
                  <span>${formatMoney(remainingAmount)}</span>
                </div>
              `
              : ""
          }
        </div>
      </div>
    `;
  }

  function renderCheckoutForm() {
    return `
      <form
        id="checkout-form"
        class="checkout-form"
        novalidate
      >
        <h2>Customer Details</h2>

        <div class="form-grid">
          <div class="form-field">
            <label for="checkout-name">
              Full Name <span aria-hidden="true">*</span>
            </label>

            <input
              type="text"
              id="checkout-name"
              name="name"
              required
              autocomplete="name"
              placeholder="Enter your full name"
            >
          </div>

          <div class="form-field">
            <label for="checkout-phone">
              Phone Number <span aria-hidden="true">*</span>
            </label>

            <input
              type="tel"
              id="checkout-phone"
              name="phone"
              required
              autocomplete="tel"
              pattern="[0-9+\\s\\-]{10,15}"
              placeholder="+91 98765 43210"
            >
          </div>

          <div class="form-field">
            <label for="checkout-email">
              Email Address <span aria-hidden="true">*</span>
            </label>

            <input
              type="email"
              id="checkout-email"
              name="email"
              required
              autocomplete="email"
              placeholder="you@example.com"
            >
          </div>

          <div class="form-field form-field-full">
            <label for="checkout-address">
              Delivery Address <span aria-hidden="true">*</span>
            </label>

            <textarea
              id="checkout-address"
              name="address"
              required
              rows="4"
              autocomplete="street-address"
              placeholder="Enter your complete delivery address"
            ></textarea>
          </div>

          <div class="form-field">
            <label for="checkout-city">
              City <span aria-hidden="true">*</span>
            </label>

            <input
              type="text"
              id="checkout-city"
              name="city"
              required
              autocomplete="address-level2"
              placeholder="Enter your city"
            >
          </div>

          <div class="form-field">
            <label for="checkout-pincode">
              PIN Code <span aria-hidden="true">*</span>
            </label>

            <input
              type="text"
              id="checkout-pincode"
              name="pincode"
              required
              autocomplete="postal-code"
              pattern="[0-9]{6}"
              placeholder="6-digit PIN code"
            >
          </div>
        </div>

        <div class="checkout-actions">
          <button
            type="submit"
            class="button button-primary button-full"
            id="pay-button"
          >
            Pay ${formatMoney(0)}
          </button>

          <p
            class="status-message"
            id="checkout-status"
            role="status"
          ></p>
        </div>
      </form>
    `;
  }

  function renderRentalNotice() {
    const rentalConfig = CONFIG.rental || {};

    if (!rentalConfig.availabilityConfirmationRequired) {
      return "";
    }

    return `
      <div class="notice rental-notice">
        <strong>Rental Orders</strong>

        <p>
          ${escapeHtml(
            rentalConfig.contactNote ||
              "Rentals require availability confirmation. Please contact CGR."
          )}
        </p>
      </div>
    `;
  }

  function hasRentalItems(items) {
    return items.some(function (item) {
      return item.mode === "rental";
    });
  }

  function updatePayButton(items, summary) {
    const payButton = document.getElementById("pay-button");

    if (!payButton) {
      return;
    }

    const paymentMode = CONFIG.payment
      ? CONFIG.payment.mode
      : "full";

    const advancePercent = CONFIG.payment
      ? CONFIG.payment.advancePercent
      : 0;

    let payNowAmount = summary.orderTotal;

    if (paymentMode === "advance" && advancePercent > 0) {
      payNowAmount = Math.round(
        (summary.orderTotal * advancePercent) / 100
      );
    }

    payButton.textContent = "Pay " + formatMoney(payNowAmount);
  }

  function initCheckout() {
    const container = document.getElementById("checkout-container");

    if (!container) {
      return;
    }

    const items = getBasketItems();

    if (!items.length) {
      container.innerHTML = `
        <div class="empty-basket">
          <h2>Your basket is empty</h2>

          <p>
            Add products to your basket before proceeding
            to checkout.
          </p>

          <a class="button button-primary" href="../index.html#products">
            Explore Products
          </a>
        </div>
      `;

      return;
    }

    const summary = calculateOrderSummary(items);
    const hasRentals = hasRentalItems(items);

    container.innerHTML = `
      ${hasRentals ? renderRentalNotice() : ""}

      ${renderOrderSummary(items, summary)}

      ${renderCheckoutForm()}
    `;

    updatePayButton(items, summary);

    const form = document.getElementById("checkout-form");
    const status = document.getElementById("checkout-status");

    if (!form || !status) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      if (hasRentals) {
        const rentalConfig = CONFIG.rental || {};

        if (rentalConfig.availabilityConfirmationRequired) {
          status.classList.add("error-message");
          status.textContent =
            "Rental orders require availability confirmation. " +
            "Please call CGR before completing payment.";

          return;
        }
      }

      const formData = new FormData(form);
      const customerDetails = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        address: formData.get("address"),
        city: formData.get("city"),
        pincode: formData.get("pincode")
      };

      const orderData = {
        customer: customerDetails,
        items: items,
        summary: summary
      };

      processPayment(orderData, status);
    });
  }

  function processPayment(orderData, status) {
    const apiUrl = CONFIG.apiUrl || "http://localhost:3000";

    status.classList.remove("error-message");
    status.textContent = "Processing payment…";

    fetch(apiUrl + "/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            "Failed to create order. Please try again."
          );
        }

        return response.json();
      })
      .then(function (data) {
        if (!data || !data.orderId) {
          throw new Error(
            "Invalid order response from server."
          );
        }

        openRazorpayCheckout(data, orderData);
      })
      .catch(function (error) {
        status.classList.add("error-message");
        status.textContent =
          error.message ||
          "Payment could not be started. Please try again.";
      });
  }

  function openRazorpayCheckout(orderData, customerData) {
    if (!window.Razorpay) {
      status.classList.add("error-message");
      status.textContent =
        "Razorpay could not be loaded. Please check your " +
        "internet connection and try again.";

      return;
    }

    const razorpayKey = orderData.keyId;

    if (!razorpayKey) {
      status.classList.add("error-message");
      status.textContent =
        "Payment key not received from server. " +
        "Please contact CGR for assistance.";

      return;
    }

    const options = {
      key: razorpayKey,
      amount: orderData.amount,
      currency: CONFIG.currency || "INR",
      name: "CGR Fabrication",
      description: "Order payment",
      order_id: orderData.orderId,
      handler: function (response) {
        verifyPayment(response, orderData, customerData);
      },
      prefill: {
        name: customerData.customer.name,
        email: customerData.customer.email,
        contact: customerData.customer.phone
      },
      notes: {
        address: customerData.customer.address
      },
      theme: {
        color: "#1a73e8"
      }
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      status.classList.add("error-message");
      status.textContent =
        "Payment failed. Please try again or contact CGR.";

      console.error(
        "Razorpay payment failed:",
        response.error
      );
    });

    razorpay.open();
  }

  function verifyPayment(
    razorpayResponse,
    orderData,
    customerData
  ) {
    const apiUrl = CONFIG.apiUrl || "http://localhost:3000";

    status.classList.remove("error-message");
    status.textContent = "Verifying payment…";

    fetch(apiUrl + "/api/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        razorpayResponse: razorpayResponse,
        orderData: orderData,
        customerData: customerData
      })
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            "Payment verification failed. Please contact CGR."
          );
        }

        return response.json();
      })
      .then(function (data) {
        if (data && data.success) {
          window.location.href =
            "payment-success.html?orderId=" +
            encodeURIComponent(data.orderId);
        } else {
          window.location.href =
            "payment-failed.html?orderId=" +
            encodeURIComponent(orderData.orderId);
        }
      })
      .catch(function (error) {
        status.classList.add("error-message");
        status.textContent =
          error.message ||
          "Payment verification failed. Please contact CGR.";

        window.location.href =
          "payment-failed.html?orderId=" +
          encodeURIComponent(orderData.orderId);
      });
  }

  function escapeHtml(value) {
    if (value === null || value === undefined) {
      return "";
    }

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initCheckout,
      { once: true }
    );
  } else {
    initCheckout();
  }
})();
