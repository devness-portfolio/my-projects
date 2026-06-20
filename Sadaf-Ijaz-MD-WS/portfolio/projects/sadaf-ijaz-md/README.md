# Dr. Sadaf Ijaz MD Website

A responsive static website for Dr. Sadaf Ijaz MD, focused on comprehensive psychiatric care, psychiatric evaluations, medication management, supportive psychotherapy, and virtual care.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Static assets
- No build step

## Local Preview

Open `index.html` directly in a browser, or serve this folder with any static server.

From this folder:

```sh
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## File Structure

```text
sadaf-ijaz-md/
├── index.html
├── about.html
├── services.html
├── resources.html
├── contact.html
├── privacy.html
├── robots.txt
├── sitemap.xml
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

## Notes

- `index.html` is the main SPA-style patient experience.
- `about.html`, `services.html`, `resources.html`, and `contact.html` are standalone SEO landing pages for direct visits and search discovery.
- `privacy.html` provides the public website privacy policy and should be reviewed by the client or counsel before launch.
- The contact section uses direct phone, email, and Headway calls to action.
- Appointment booking links point to the Headway profile.
- SEO metadata, `robots.txt`, and `sitemap.xml` use the production domain `https://sadafijazmd.com/`.
- The sitemap includes the homepage, indexable About, Services, Resources, Contact landing pages, and the Privacy Policy page.
- Update launch details in `docs/launch-checklist.md` before publishing.
