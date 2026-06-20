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

The homepage, About, Services, Resources, and Contact metadata, structured data, canonical links, `robots.txt`, and `sitemap.xml` use absolute production URLs. When the site moves to a custom domain, update those URLs together so search engines and social previews point to the correct canonical pages. For search crawlers to read `robots.txt`, deploy this project folder at the domain root.

If a page becomes thin or redirects back to a homepage section, mark it `noindex`, remove it from `sitemap.xml`, and point its canonical URL at the destination page. Indexable landing pages should have unique metadata, a self-canonical URL, structured data as appropriate, and enough standalone patient-facing content to be useful.
