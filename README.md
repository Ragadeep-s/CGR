# CGR catalogue and quote-preview backend

This is the COMPLETE QUOTE-PREVIEW package, NOT a live Razorpay integration.
No Razorpay orders are created, no money is charged, and no email is sent.
Create-order and verify-payment endpoints intentionally return HTTP 503.

## Install
1. Back up your current js/products.js.
2. Replace js/products.js with the included file (plural products.js).
3. Copy server/ beside js/, not inside pages/ or js/.
4. In server/, run npm install.
5. Copy .env.example to .env and edit FRONTEND_ORIGIN to your actual frontend
   origin, including scheme and port, but no path or trailing slash.
6. Run npm test, then npm start.
7. Open http://localhost:3000/api/health.

Requires Node.js 22 or newer. Dependencies are not bundled and must be installed.
No Node.js runtime or npm installation was executed when this package was prepared.

## Quote request
POST /api/quote with Content-Type: application/json:
{"items":[{"productId":"main-aluminium-scaffolding","variantId":"aluminium-scaffolding-demo-compact","mode":"purchase","quantity":1,"rentalPeriods":0}]}
Default expected totalPaise: 5360000 (INR 53,600).
All API monetary values are integer paise. Never display these as rupees without
converting by 100. Browser-supplied totals and prices are ignored.

## Preview settings
.env is authoritative for this API. js/config.js is browser display configuration
only, and is not changed by this package. Keep the two aligned during testing.
Postcode mode uses an example amount only; it does NOT implement serviceability
or a postcode tariff. GST calculation is an example on products only, with
unconfirmed tax treatment for delivery. Rental approval is a blocking flag,
not a real availability approval workflow. Do not enable live payments.

## Catalogue notes
- Three main products, nine existing main variant IDs, and all 44 custom products.
- Corrected stage/ringlock image folders. Main arrays retain 1.jpg through 5.jpg.
- Public browser API and basket storage key retained; store.js stays unchanged.
- customProductsEnabled=false is a flag only. It does NOT remove HTML navigation,
  stop direct access to custom pages, or change existing catalogue rendering.
- API rejects custom products at checkout, including stale custom basket entries.
- Do not change demo flags to bypass missing payment infrastructure.

## Frontend work not included
The provided checkout.js currently calls /api/create-order, so pressing Pay will
show an error until payment integration exists. It is not yet wired to /api/quote.
The success page must NOT clear baskets or declare success based only on a URL.
Do not use real payment keys with this version.

## Next implementation layer
Persistent orders, Razorpay TEST orders, signature verification, capture/status
checks, raw-body signed webhooks, idempotency, payment status lookup, email queue
and authenticated order lookup. Then connect the frontend and test end to end.
A Hostinger plan supporting Node.js is required to run this Node backend.
Deploy the repository root including js/products.js; server/pricing.js imports it.
Start command: npm start from server/. Keep .env private and HTTPS enabled.
Review reverse-proxy/rate-limit configuration for the actual deployment topology.

## Security
Never commit .env or secret keys. CORS is not authentication. This quote-only API
has no customer data storage or order lookup. This package makes no claim of
live-payment readiness or completed deployment.
