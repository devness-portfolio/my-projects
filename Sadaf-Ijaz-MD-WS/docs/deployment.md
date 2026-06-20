# Deployment Guide

The client website can be hosted anywhere static files are supported.

## Recommended Targets

- Netlify
- GitHub Pages
- AWS S3 with CloudFront
- Cloudflare Pages

## Deploying The Client Site

Use this folder as the site root:

```text
portfolio/projects/sadaf-ijaz-md/
```

The homepage is:

```text
index.html
```

No build command is required.

## Deploying The Portfolio

Use the repository root as the site root if you want employers to land on the portfolio first. The root `index.html` redirects to:

```text
portfolio/
```

## Post-Deployment Checks

1. Confirm the homepage loads over HTTPS.
2. Confirm images and video load from `assets/`.
3. Confirm navigation anchors scroll to the correct page sections.
4. Confirm booking links open the Headway profile.
5. Confirm footer contact and social links.
6. Confirm mobile navigation opens and closes.
7. Confirm reduced-motion users do not receive unnecessary animation.
8. Confirm search metadata and page title are correct.

## Domain Notes

After connecting a domain, update canonical URLs and Open Graph URLs to absolute production URLs. The client site already uses `https://sadafijazmd.com/`; the portfolio layer currently keeps its canonicals relative until the final portfolio domain and path are confirmed.
