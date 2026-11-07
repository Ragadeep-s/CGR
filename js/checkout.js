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
                    ? " · Duration: " + item.rentalPeriods +
