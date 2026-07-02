# Los Latinos Barbershop Website

Static, dependency-free website for Los Latinos Barbershop in Kenner, Louisiana.

## Files

- `index.html` contains the semantic page structure, CTAs, booking placeholder, social handles, directions links, and embedded map.
- `styles.css` contains the responsive white, blue, and gold design system.
- `script.js` creates the smooth blurred hero video placeholder from a canvas stream and respects reduced-motion settings.
- `assets/hero-shop.png` is the generated hero poster/fallback image.
- `tests/smoke.test.mjs` verifies the required page elements and asset wiring.

## Local Use

Open `index.html` directly in a browser, or run:

```bash
npm run serve
```

Then visit `http://localhost:4173`.

## Before Launch

- Replace the placeholder phone number in `index.html`.
- Replace placeholder social handles if the client has different accounts.
- Replace the map query with the final street address once confirmed.
- Swap the booking placeholder with the final Square, Booksy, Fresha, Calendly, or custom embed.
- If the client provides real video, add it to `assets/`, remove `data-generated-backdrop` from the hero video element, and add a normal `<source>` tag.

## Verification

```bash
npm test
```
