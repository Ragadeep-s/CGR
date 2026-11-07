/*
 * CGR — Site configuration
 *
 * All adjustable amounts and settings live here.
 * Change any value and the site updates everywhere.
 *
 * This file is loaded before products.js, store.js,
 * and main.js on every page.
 */

(function () {
  "use strict";

  window.CGR_CONFIG = {
    currency: "INR",

    /*
     * GST settings
     *
     * rate: percentage applied to the order
     * includedInPrices: true if product prices already
     *   include GST; false if GST is added separately
     */
    gst: {
      rate: 18,
      includedInPrices: false,
      label: "GST (18%)"
    },

    /*
     * Delivery settings
     *
     * mode: "fixed" or "postcode"
     * fixedAmount: amount in rupees
     */
    delivery: {
      mode: "fixed",
      fixedAmount: 500,
      label: "Delivery charge"
    },

    /*
     * Payment settings
     *
     * mode: "full" or "advance"
     * advancePercent: percentage to pay now (only used
     *   when mode is "advance")
     */
    payment: {
      mode: "full",
      advancePercent: 25,
      label: "Pay in full"
    },

    /*
     * Rental settings
     *
     * onlinePaymentAllowed: whether rentals can be paid online
     * availabilityConfirmationRequired: whether rentals need
     *   a call before payment
     */
    rental: {
      onlinePaymentAllowed: false,
      availabilityConfirmationRequired: true,
      contactNote:
        "Rentals require availability confirmation. Call +91 97902 22381 to confirm."
    },

    /*
     * Backend API URL
     *
     * Change this when you deploy the backend.
     * Use http://localhost:3000 for local testing.
     */
    apiUrl: "http://localhost:3000",

    /*
     * Contact details
     */
    contact: {
      phone: "+919790222381",
      phoneDisplay: "+91 97902 22381",
      email: "sn@cgrfc.com"
    }
  };
})();
