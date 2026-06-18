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

Each file controls a focused behavior, including mobile navigation, scroll state, footer year, form feedback, experience years, video controls, and motion preferences.

## Updating Years In Practice

The site calculates experience years from:

```html
<body data-experience-start-year="2010">
```

Update that year if the source year changes.

## Contact Form Note

The current form submits through `mailto:`, which depends on the visitor's local email client. For production-grade submissions, replace it with a hosted form service or backend endpoint.

