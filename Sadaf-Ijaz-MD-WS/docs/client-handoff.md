# Client Handoff

This repository separates portfolio material from the client deliverable.

## Client Deliverable Folder

Send or deploy this folder for the client website:

```text
portfolio/projects/sadaf-ijaz-md/
```

That folder contains the complete static website:

- `index.html`
- supporting redirect pages
- `assets/css/`
- `assets/js/`
- `assets/images/`
- `assets/videos/`
- client-focused documentation in `docs/`

## Portfolio-Only Material

These files are for employer presentation and should not be treated as client site content:

- `portfolio/index.html`
- `portfolio/assets/css/portfolio.css`
- `portfolio/projects/sadaf-ijaz-md/case-study.html`
- root-level `docs/portfolio-case-study.md`

## Before Sending To Client

1. Confirm final contact details, booking URL, social links, and license links.
2. Confirm the preferred deployment target and final domain.
3. Review `portfolio/projects/sadaf-ijaz-md/docs/launch-checklist.md`.
4. Remove portfolio-only files if delivering a compressed client-only folder.
5. Add any required privacy policy or HIPAA/legal language approved by the client.

## Client Summary

The client website is a static HTML, CSS, and JavaScript site. It does not require a database, backend server, or JavaScript framework. The contact form currently uses `mailto:` behavior and should be replaced with a hosted form provider or backend endpoint if the client needs reliable form submissions.

