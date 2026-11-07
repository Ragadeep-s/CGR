"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const catalogue = require("../js/products");
const {calculateQuote} = require("./pricing");
const item = {productId:"main-aluminium-scaffolding",variantId:"aluminium-scaffolding-demo-compact",mode:"purchase",quantity:1,rentalPeriods:0};
test("catalogue IDs and count",() => {
  assert.equal(catalogue.mainProducts.length,3);
  assert.equal(catalogue.customProducts.length,44);
  assert.deepEqual(catalogue.validateCatalogue(),[]);
});
test("default full-payment quote",() => {
  process.env.GST_RATE_PERCENT="18"; process.env.GST_INCLUDED_IN_PRICES="false";
  process.env.DELIVERY_MODE="fixed"; process.env.DELIVERY_FIXED_RUPEES="500";
  process.env.PAYMENT_MODE="full";
  const q=calculateQuote({items:[item],summary:{orderTotal:1}});
  assert.equal(q.totalPaise,5360000);
  assert.equal(q.livePaymentEnabled,false);
});
test("GST inclusive and advance",() => {
  process.env.GST_INCLUDED_IN_PRICES="true";process.env.PAYMENT_MODE="advance";
  process.env.ADVANCE_PERCENT="25";
  const q=calculateQuote({items:[item]});
  assert.equal(q.totalPaise,4550000);
  assert.equal(q.gstPaise,686441);
  assert.equal(q.payNowPaise,1137500);
});
test("reject invalid quantity and hidden catalogue",() => {
  assert.throws(() => calculateQuote({items:[{...item,quantity:0}]}));
  assert.throws(() => calculateQuote({items:[{...item,productId:"custom-01"}]}));
});
