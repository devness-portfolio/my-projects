# Uptown Masjid al-Rahma Website

A simple HTML,CSS & JS project for showcasing the Uptown Masjid website.
A responsive website for Uptown Masjid al-Rahma featuring information about the mosque, events, and community resources.

## Pages

- **Home Page**: Main landing page with featured content
- **About Us**: Information about the mosque and its mission
- **Events & Announcements**: Latest community events and news
- **Contact Us**: Contact information and location details
- **Documents & Archive**: Resource repository for the community


# Project Structure:

mosque-website/
├── index.html             # Home page
├── events.html            # Events & Announcements page
├── contact.html           # Contact Us page
├── about.html             # About Us page
├── documents.html         # Documents & Archive page
├── css/
│   ├── input.css          # Tailwind input (optional but good practice)
│   └── style.css          # Compiled Tailwind output (or use CDN)
├── js/
│   ├── script.js          # General interactivity (like mobile menu)
│   └── prayer-times.js    # Fetches and displays prayer times
└── img/
    ├── logo-placeholder.png # Placeholder for the mosque logo
    └── mosque-photo-placeholder.jpg # Placeholder for the mosque photo

## Features

- Responsive design
- Clean and modern layout
- Easy to navigate

## Technologies Used

- HTML5: Semantic HTML5.
- CSS3 - Tailwind CSS: Tailwind CSS. We'll use the CDN link for quick setup, but I'll include instructions for a local build process which is recommended for production.
- JavaScript: Vanilla JS for DOM manipulation (mobile menu, API fetching).
- Prayer Times API: We'll use the Aladhan API (specifically timingsByCity) as it's free and easy to use for this purpose.

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser to view the website
3. Edit the HTML, CSS, and JavaScript files to make changes

## Contributing

If you'd like to contribute to this project, please:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## How to Use

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/uptown-masjid.git
    ```
2. Open `index.html` in your browser to view the website.

## License

This project is licensed under the [MIT License](LICENSE).


## Setup and Installation

There are two ways to handle Tailwind CSS:

**Option 1: Using CDN (Quick Start)**

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd mosque-website
    ```
2.  Ensure the `<script src="https://cdn.tailwindcss.com"></script>` tag is present in the `<head>` of each `.html` file.
3.  No further build steps are needed for Tailwind.

**Option 2: Using Local Build (Recommended for Production & Customization)**

1.  **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed.
2.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd mosque-website
    ```
3.  Install development dependencies (Tailwind CSS):
    ```bash
    npm install
    ```
    *(This assumes a `package.json` exists with `tailwindcss` as a dev dependency. If not, run `npm install -D tailwindcss` and `npx tailwindcss init` first)*.
4.  Ensure the `<link href="./css/style.css" rel="stylesheet">` tag is present in the `<head>` of each `.html` file (and the CDN script tag is *removed* or commented out).
5.  Run the build command (this compiles `css/input.css` into `css/style.css`):
    *   For development (watches for changes):
        ```bash
        npm run watch
        ```
        *(Add `"watch": "tailwindcss -i ./css/input.css -o ./css/style.css --watch"` to the `"scripts"` section of your `package.json`)*
    *   For a one-time production build:
        ```bash
        npm run build
        ```
        *(Add `"build": "tailwindcss -i ./css/input.css -o ./css/style.css --minify"` to `package.json`)*

## Running the Project

1.  **If using the CDN:** Simply open any of the `.html` files (e.g., `index.html`) directly in your web browser.
2.  **If using the Local Build:**
    *   Make sure the Tailwind CSS build process is running (`npm run watch`) or has been run (`npm run build`).
    *   Open any of the `.html` files (e.g., `index.html`) in your web browser.

## Important Notes

*   **Placeholders:** Replace all placeholder content (text like `[Mosque Name]`, `[Date]`, etc.) and images (`img/logo-placeholder.png`, `img/mosque-photo-placeholder.jpg`) with the actual assets and information for the mosque.
*   **Donate Button:** The "Donate Now" button currently shows an alert. Functionality needs to be added later (e.g., linking to a Zelle QR code page or integrating a payment processor).
*   **Contact Form:** The contact form is currently a static HTML structure. A backend service is required to process form submissions.
*   **Prayer Times:** Prayer times depend on the external Aladhan API. Ensure the API endpoint is correct and accessible. The calculation method (ISNA) can be adjusted in `js/prayer-times.js` if needed.

## Future Enhancements (Roadmap)

*   **Backend Integration:**
    *   Implement payment processing via Zelle or another provider.
    *   Create a backend endpoint (e.g., AWS Lambda + API Gateway) to handle contact form submissions and send email notifications (e.g., using AWS SES).
*   **Content Management:** Potentially integrate a headless CMS for easier updates of events, news, and other content.
*   **AWS Hosting:** Deploy the static website using AWS S3 for storage and AWS CloudFront for CDN delivery (optimizing for cost and performance).
*   **Database:** If needed for more complex features (e.g., user accounts, persistent event data), integrate a database (e.g., DynamoDB).
*   **Accessibility Audit:** Perform a thorough accessibility review (WCAG compliance).
*   **SEO Optimization:** Implement basic SEO best practices.

---

*This README provides a starting point. Feel free to update it as the project evolves.*