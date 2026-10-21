# Portfolio Website

A responsive, framework-free portfolio for software engineer Anes Mehai. The site highlights professional experience, selected projects, technical skills, a production case study, and photography.

Live site: [devness.dev](https://www.devness.dev)

## Features

- Responsive layout for desktop and mobile
- Persistent dark and light themes
- Accessible navigation, controls, and reduced-motion support
- Career-first editorial layout with a concise introduction and visible actions
- Interactive engineering profile and local terminal command demo
- Secure request pipeline with accessible selected-state feedback
- Local photography carousel
- Downloadable resume
- Dedicated project case study

## Technology

The project uses semantic HTML, modern CSS, inline SVG icons, and native JavaScript modules. It has no runtime package dependencies or build step and is hosted with GitHub Pages.

## Run locally

Clone the repository, then serve its root directory with any static HTTP server. For example:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Serving over HTTP is recommended because the JavaScript entry point uses ES modules.

## Test

The dependency-free tests cover preserved content/assets, section ordering, accessible control relationships, terminal commands, pipeline state, navigation history/focus, and photography coverage:

```bash
npm test
```

## Structure

- `index.html` — main portfolio
- `portfolio/case-study-sadaf-ijaz-md.html` — project case study
- `portfolio/assets/css/style.css` — shared site styles
- `portfolio/assets/css/editorial.css` — homepage-only editorial layout and accessibility adaptations
- `portfolio/assets/js/terminal.js` — isolated command resolver and progressive form enhancement
- `portfolio/assets/js/scroll.js` — same-page history, focus, and motion preferences
- `portfolio/assets/js/main.js` — JavaScript entry point
- `portfolio/assets/img/` — portfolio and photography images
- `hero-prototype.html` — retained standalone hero design prototype
- `tests/site-smoke.test.mjs` — existing feature and asset regression coverage
- `tests/redesign-structure.test.mjs` — document order, IDs, links, and accessibility relationships
- `tests/redesign-interactions.test.mjs` — terminal, pipeline, and navigation behavior

## Deployment

GitHub Pages publishes the static files directly. Push updates to the configured Pages branch; no compilation step is required.

## Redesign verification

The `apple-design-skill-redesign` branch keeps the existing case study, intro,
photography carousel, credentials, and contact actions. Homepage presentation is
scoped with `body.editorial-design`; the case study continues using shared styles.
The terminal transcript is immediately readable in its new section. Typed commands
are handled locally with a fixed response map and text-only output; the form is
revealed only after its handler initializes.

For browser review after `npm test`:

1. At 320px, 390px, tablet, and desktop widths, check that primary actions are
   visible, navigation fits, and content has no horizontal overflow.
2. Expand each career role; follow career/work/terminal/photo links and use Back.
   Check that the hash and focus destination follow navigation.
3. Select all four pipeline stages; verify the explanation and selected state.
4. Use the terminal tabs with arrow keys, Home, and End. Submit `whoami`, `skills`,
   `help`, and an unknown command using Enter.
5. Switch light/dark themes; browse photos in both directions and follow the case
   study link. Verify resume and contact destinations.
6. With system accessibility preferences enabled, check reduced motion,
   reduced transparency, and increased contrast. At 200% text/zoom, verify reflow.
7. Disable JavaScript and reload: career/project/profile content remains readable,
   navigation uses native anchors, and the command form is hidden.

No new runtime dependencies or build step are required.


## Fieldnotes demo

`portfolio/fieldnotes/` contains the browser-only sample board with release progress. Task state is in a pure model module, presentation is scoped, and samples reset on reload. Run `node --test tests/fieldnotes-model.test.mjs` to check state transitions and reset isolation.

## Design and performance references

See the [portfolio reference library](docs/portfolio-references/README.md) for handoff notes, mockups, Lighthouse baselines, and archived v2/v3 screenshots.

## Photography assets

The gallery uses 480/800/1200/1600px WebP variants and tiny pre-blurred backdrops.
Original JPEGs remain the source assets. To regenerate after replacing a photo,
install Pillow in a Python environment and run `python scripts/optimize-photography.py`.
Pillow is an offline asset tool; the published site still has no runtime dependencies.
Adjacent photos are prefetched near the gallery unless Data Saver is enabled, and
navigation keeps the current photo visible until the requested photo has decoded.

### Seasonal Matrix intro

Every year from September 15 through November 1 (inclusive), the desktop intro uses a Halloween theme with code pumpkins, cobwebs, green fog, and amber accents. Dates follow the visitor’s local calendar; the standard Matrix theme returns November 2. The existing mobile bypass, once-per-session behavior, name entry, skip action, and reduced-motion preference remain in effect. No scheduled job or annual deployment is needed.
