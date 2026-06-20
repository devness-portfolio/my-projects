# Maintenance Guide

## Editing Content

Most content lives in `index.html`.

Common updates:

- Bio copy
- Services
- Credentials
- Phone number
- Email address
- Booking link
- Social links
- Footer text

## Editing Styles

Main styling lives in:

```text
assets/css/style.css
```

The additional CSS files currently exist for future modular expansion:

```text
assets/css/layout.css
assets/css/components.css
```

## Editing JavaScript

Scripts live in:

```text
assets/js/
```

Each file controls a focused behavior, including mobile navigation, scroll state, footer year, experience years, video controls, and motion preferences.

## Updating Years In Practice

The site calculates experience years from:

```html
<body data-experience-start-year="2010">
```

Update that year if the source year changes.

## Contact CTA Note

The contact section intentionally avoids a form. It uses direct phone, email, and Headway links to keep the static site low-maintenance.

## SEO URL Updates

The homepage metadata, structured data, `robots.txt`, `sitemap.xml`, and redirect-page canonical links use absolute production URLs. When the site moves to a custom domain, update those URLs together so search engines and social previews point to the same canonical homepage. For search crawlers to read `robots.txt`, deploy this project folder at the domain root.
