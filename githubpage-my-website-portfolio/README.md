# Portfolio Website

A responsive, framework-free portfolio for software engineer Anes Mehai. The site highlights professional experience, selected projects, technical skills, a production case study, and photography.

Live site: [devness.dev](https://www.devness.dev)

## Features

- Responsive layout for desktop and mobile
- Persistent dark and light themes
- Accessible navigation, controls, and reduced-motion support
- Animated engineering profile with a static reduced-motion fallback
- Local photography carousel
- Downloadable résumé
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

The smoke test checks important content, assets, JavaScript behavior, responsive hero rules, and carousel coverage:

```bash
npm test
```

## Structure

- `index.html` — main portfolio
- `portfolio/case-study-sadaf-ijaz-md.html` — project case study
- `portfolio/assets/css/style.css` — shared site styles
- `portfolio/assets/js/main.js` — JavaScript entry point
- `portfolio/assets/img/` — portfolio and photography images
- `hero-prototype.html` — retained standalone hero design prototype
- `tests/site-smoke.test.mjs` — dependency-free smoke test

## Deployment

GitHub Pages publishes the static files directly. Push updates to the configured Pages branch; no compilation step is required.

