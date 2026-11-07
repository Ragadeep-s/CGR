"use strict";
const catalogue = require("../js/products.js");
function fail(message) { const e = new Error(message); e.status = 400; throw e; }
function number(name, fallback, min, max) {
  const n = Number(process.env[name] ?? fallback);
  if (!Number.isFinite(n) || n < min || n > max) throw new Error("Invalid setting: " + name);
  return n;
}
function boolean(name, fallback) {
  const s = process.env[name];
  if (s === undefined) return fallback;
  if (!["true","false"].includes(s)) throw new Error("Invalid setting: " + name);
  return s === "true";
}
function paise(n) {
  if (!Number.isFinite(n) || n < 0 || !Number.isSafeInteger(Math.round(n * 100))) fail("Invalid price.");
  return Math.round(n * 100);
}
function calculateQuote(input) {
  if (!input || !Array.isArray(input.items) || !input.items.length || input.items.length > 100)
    fail("Provide between 1 and 100 basket lines.");
  const rate = number("GST_RATE_PERCENT",18,0,100);
  const included = boolean("GST_INCLUDED_IN_PRICES",false);
  const deliveryMode = process.env.DELIVERY_MODE || "fixed";
  const paymentMode = process.env.PAYMENT_MODE || "full";
  if (!["fixed","postcode"].includes(deliveryMode)) throw new Error("Invalid DELIVERY_MODE.");
  if (!["full","advance"].includes(paymentMode)) throw new Error("Invalid PAYMENT_MODE.");
  const advance = number("ADVANCE_PERCENT",25,1,100);
  const online = boolean("RENTAL_ONLINE_PAYMENT_ALLOWED",false);
  const approval = boolean("RENTAL_AVAILABILITY_CONFIRMATION_REQUIRED",true);
  const lines = input.items.map(function(item) {
    if (!item || typeof item !== "object") fail("Invalid basket line.");
    const p = catalogue.getProduct(item.productId);
    if (!p || p.type !== "main") fail("Only the three main products are available at checkout.");
    const v = catalogue.getVariant(p.id,item.variantId);
    if (!v) fail("Invalid variant.");
    if (!["purchase","rental"].includes(item.mode)) fail("Invalid purchase or rental mode.");
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 9999)
      fail("Quantity must be a whole number from 1 to 9999.");
    const rental = item.mode === "rental";
    let periods = 1;
    if (rental) {
      if (!p.rentalEnabled || !v.rental || !["day","week","month"].includes(v.rental.period))
        fail("Rental unavailable.");
      periods = item.rentalPeriods;
      if (!Number.isInteger(periods) || periods < v.rental.minimumPeriods || periods > 3650)
        fail("Invalid rental duration.");
    } else if (!p.purchaseEnabled) fail("Purchase unavailable.");
    const unit = paise(rental ? v.rental.rate : v.purchasePrice);
    const total = unit * item.quantity * periods;
    if (!Number.isSafeInteger(total)) fail("Amount exceeds supported limit.");
    return {productId:p.id,variantId:v.id,productName:p.name,variantName:v.name,
      mode:item.mode,quantity:item.quantity,rentalPeriods:rental ? periods : 0,
      rentalPeriod:rental ? v.rental.period : null,unitPaise:unit,lineTotalPaise:total};
  });
  const subtotal = lines.reduce((s,l) => s+l.lineTotalPaise,0);
  if (!Number.isSafeInteger(subtotal)) fail("Amount exceeds supported limit.");
  const gst = Math.round(included ? subtotal * rate / (100+rate) : subtotal * rate / 100);
  if (deliveryMode === "postcode" && !/^[1-9][0-9]{5}$/.test(String(input.pincode || "").trim()))
    fail("Enter a valid six-digit PIN code.");
  const delivery = paise(deliveryMode === "fixed"
    ? number("DELIVERY_FIXED_RUPEES",500,0,1000000)
    : number("DELIVERY_POSTCODE_DEMO_RUPEES",750,0,1000000));
  const total = subtotal + (included ? 0 : gst) + delivery;
  if (!Number.isSafeInteger(total) || total < 1) fail("Invalid total.");
  const payNow = paymentMode === "advance" ? Math.round(total * advance / 100) : total;
  const blocked = lines.some(l => l.mode === "rental") && (!online || approval);
  return {currency:"INR",demo:true,livePaymentEnabled:false,lines,
    subtotalPaise:subtotal,gstRate:rate,gstIncludedInPrices:included,gstPaise:gst,
    deliveryMode,deliveryPaise:delivery,totalPaise:total,paymentMode,
    advancePercent:advance,payNowPaise:payNow,remainingPaise:total-payNow,rentalBlocked:blocked,
    notice:blocked ? "Rental payment requires CGR confirmation." : "Demo quote only. Live payments disabled.",
    taxNotice:"Example GST on products only. Delivery tax treatment is not configured.",
    deliveryNotice:deliveryMode === "postcode" ? "Example charge only; postcode serviceability is not configured." : "Example fixed delivery charge."};
}
module.exports = {calculateQuote};
