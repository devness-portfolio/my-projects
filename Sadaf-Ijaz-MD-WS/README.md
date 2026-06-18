# Sadaf Ijaz MD Website Portfolio

This repository is organized as both a professional portfolio piece and a client-ready static website deliverable.

## Live Entry Points

- Portfolio homepage: `portfolio/index.html`
- Client website: `portfolio/projects/sadaf-ijaz-md/index.html`
- Project case study: `portfolio/projects/sadaf-ijaz-md/case-study.html`

## Project Structure

```text
Sadaf-Ijaz-MD-WS/
├── index.html
├── README.md
├── docs/
│   ├── client-handoff.md
│   ├── deployment.md
│   └── portfolio-case-study.md
└── portfolio/
    ├── index.html
    ├── assets/
    │   └── css/
    │       └── portfolio.css
    └── projects/
        └── sadaf-ijaz-md/
            ├── index.html
            ├── case-study.html
            ├── README.md
            ├── docs/
            │   ├── content-map.md
            │   ├── launch-checklist.md
            │   └── maintenance.md
            └── assets/
                ├── css/
                ├── images/
                ├── js/
                └── videos/
```

## Purpose

The portfolio layer helps prospective employers review the work, design decisions, accessibility considerations, and implementation approach.

The client project layer keeps the Dr. Sadaf Ijaz MD website self-contained so it can be handed off, hosted, or maintained independently.

## Running Locally

Open `index.html` in a browser, or open these files directly:

- `portfolio/index.html`
- `portfolio/projects/sadaf-ijaz-md/index.html`

For the most accurate local preview, use a simple static server from the repo root:

```sh
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## Handoff Notes

Before handing this to the client, review:

- `docs/client-handoff.md`
- `docs/deployment.md`
- `portfolio/projects/sadaf-ijaz-md/docs/launch-checklist.md`
- `portfolio/projects/sadaf-ijaz-md/docs/maintenance.md`

