# Dr. Sadaf Ijaz MD Website

A responsive static website for Dr. Sadaf Ijaz MD, focused on comprehensive psychiatric care, diagnostic evaluations, medication management, supportive psychotherapy, and virtual care.

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

- `index.html` is the main experience.
- `about.html`, `services.html`, `resources.html`, and `contact.html` are lightweight redirect pages back to homepage sections.
- The contact form currently uses `mailto:` behavior.
- Appointment booking links point to the Headway profile.
- Update launch details in `docs/launch-checklist.md` before publishing.
