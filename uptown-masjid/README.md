# Uptown Masjid al-Rahma Website

A static HTML, CSS, and vanilla JavaScript website for Uptown Masjid al-Rahma in New Orleans.

The current v1 direction is intentionally simple: make prayer information, announcements, events, donations, contact details, and community resources easy to find, especially for mobile visitors.

## Pages

- **Home**: Welcome content, mosque photo, and daily prayer times.
- **Events & News**: Upcoming events and announcements.
- **About Us**: Mission, history, and leadership content.
- **Documents & Archive**: Community resources and khutbah archive placeholders.
- **Contact Us**: Location, phone, email, and map placeholders.

## Project Structure

```text
uptown-masjid/
├── index.html
├── events.html
├── about.html
├── documents.html
├── contact.html
├── assets/
│   ├── css/
│   │   ├── site.css       # Runtime CSS used by the current site
│   │   └── input.css      # Tailwind source for a future local build
│   ├── img/
│   └── js/
│       ├── script.js      # Shared UI behavior
│       └── prayer-time.js # AlAdhan prayer-time integration
├── scripts/
│   └── check-site.mjs
└── package.json
```

## Current Setup

The site currently uses the Tailwind CDN in each HTML page, plus `assets/css/site.css` for small runtime styles that need to work without a build step.

There are no npm dependencies yet. The Tailwind source file at `assets/css/input.css` is kept for a future production build workflow, but it is not currently compiled or linked directly by the pages.

## Running Locally

Open `index.html` in a browser, or serve the folder with any static file server.

```bash
python3 -m http.server 8000
```

## Checks

Run the dependency-free site check:

```bash
npm run check
```

The check verifies the HTML pages are using the normalized asset paths, catches JSX-style comments in HTML, confirms referenced `assets/...` files exist, and syntax-checks the JavaScript files.

## Implementation Notes

- Prayer times are fetched from the AlAdhan API for New Orleans using ISNA calculation method.
- Donation behavior is still a placeholder alert.
- Contact details, event dates, document paths, and khutbah links still need real content.
- Future prayer-time work should add Jummah, iqamah/manual override support, and a graceful fallback when the API is unavailable.
