import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { getNextIndex, photographyImages } from "../portfolio/assets/js/carousel.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const readProjectFile = (path) => readFileSync(join(root, path), "utf8");

const html = readProjectFile("index.html");
const sadafCaseStudyHtml = readProjectFile("portfolio/case-study-sadaf-ijaz-md.html");
const css = readProjectFile("portfolio/assets/css/style.css");
const heroLiveCss = readProjectFile("portfolio/assets/css/hero-live.css");
const mainJs = readProjectFile("portfolio/assets/js/main.js");
const heroJs = readProjectFile("portfolio/assets/js/hero.js");
const heroPrototypeHtml = readProjectFile("hero-prototype.html");
const heroPrototypeCss = readProjectFile("portfolio/assets/css/hero-prototype.css");
const heroPrototypeJs = readProjectFile("portfolio/assets/js/hero-prototype.js");

assert.match(html, /<section class="hero portfolio-hero"/);
assert.match(html, /Building dependable software for/);
assert.match(html, /id="terminal-output"/);
assert.match(html, /class="profile-credential">U\.S\. Citizen/);
assert.match(html, /class="profile-credential">Public Trust Clearance/);
assert.match(html, /Software Engineer<br \/>AI-Assisted Development/);
assert.match(html, /src="portfolio\/assets\/img\/devness-logo-transparent\.svg"/);
assert.match(html, /class="brand-wordmark"[^>]*>devness</);
assert.match(html, /download="Anes-Mehai-Resume\.pdf"/);
assert.match(html, /href="mailto:nessworkdc@gmail\.com"/);
assert.match(html, /href="tel:\+12406606158"/);
assert.match(html, /Dr\. Sadaf Ijaz MD Website/);
assert.match(html, /https:\/\/sadafijazmd\.com\//);
assert.match(html, /id="sadaf-case-study"/);
assert.match(html, /portfolio\/case-study-sadaf-ijaz-md\.html/);
assert.match(html, /type="module" src="portfolio\/assets\/js\/main\.js"/);
assert.doesNotMatch(html, /\[Brief description|\[Link to GitHub Repo/);

assert.match(sadafCaseStudyHtml, /<title>Case Study \| Dr\. Sadaf Ijaz MD Website<\/title>/);
assert.match(sadafCaseStudyHtml, /View Live Site/);
assert.match(sadafCaseStudyHtml, /Client-ready static deliverable/);
assert.match(sadafCaseStudyHtml, /type="module" src="assets\/js\/main\.js"/);
assert.doesNotMatch(sadafCaseStudyHtml, /\[Brief description|\[Link to GitHub Repo/);

assert.match(css, /--primary-color:/);
assert.match(css, /\.project-card-featured/);
assert.match(css, /\.case-hero/);
assert.match(css, /\.carousel-slide-contained/);
assert.doesNotMatch(css, /letter-spacing:\s*-/);

assert.match(mainJs, /setupTheme\(\)/);
assert.match(mainJs, /setupHero\(\)/);
assert.match(mainJs, /setupCarousel\(\)/);
assert.match(heroJs, /deploy --target public-sector/);
assert.match(heroJs, /prefers-reduced-motion: reduce/);
assert.match(heroLiveCss, /\.portfolio-hero/);
assert.match(heroLiveCss, /\.terminal-glow/);
assert.match(
  heroLiveCss,
  /@media \(max-width: 540px\)[\s\S]*?\.profile-image-wrap\s*\{[^}]*align-self: center;[^}]*aspect-ratio: 4 \/ 5;[^}]*height: auto;[^}]*width: clamp\(9\.37125rem, 41\.895vw, 11\.57625rem\);/,
);

assert.match(heroPrototypeHtml, /Building dependable software for/);
assert.match(heroPrototypeHtml, /id="terminal-output"/);
assert.match(heroPrototypeHtml, /id="theme-toggle"/);
assert.match(heroPrototypeHtml, /src="portfolio\/assets\/img\/ppic\.jpg"/);
assert.match(heroPrototypeHtml, /src="portfolio\/assets\/img\/devness-logo-transparent\.svg"/);
assert.match(heroPrototypeHtml, /class="brand-wordmark"[^>]*>devness</);
assert.match(heroPrototypeHtml, /alt="Portrait of Anes Mehai"/);
assert.match(heroPrototypeHtml, /Software Engineer<br \/>AI-Assisted Development/);
assert.match(heroPrototypeHtml, /class="profile-credential">U\.S\. Citizen/);
assert.match(
  heroPrototypeHtml,
  /class="profile-credential">Public Trust Clearance/,
);
assert.match(heroPrototypeCss, /\.profile-credentials\s*\{[^}]*display: grid/s);
assert.match(
  heroPrototypeCss,
  /\.profile-details\s*\{[^}]*grid-template-columns: minmax\(0, 1fr\) auto/s,
);
assert.match(heroPrototypeHtml, /Java, Spring, cloud infrastructure, and DevOps/);
assert.match(heroPrototypeHtml, /href="mailto:nessworkdc@gmail\.com"/);
assert.match(heroPrototypeHtml, />\s*nessworkdc@gmail\.com\s*<\/a>/);
assert.match(heroPrototypeHtml, /href="tel:\+12406606158"/);
assert.match(heroPrototypeHtml, />\s*\(240\) 660-6158\s*<\/a>/);
assert.match(
  heroPrototypeHtml,
  /href="portfolio\/assets\/files\/Anes-Mehai-SWE-2025-Resume\.pdf"/,
);
assert.match(heroPrototypeHtml, /download="Anes-Mehai-Resume\.pdf"/);
assert.ok(
  existsSync(join(root, "portfolio/assets/files/Anes-Mehai-SWE-2025-Resume.pdf")),
  "Missing downloadable résumé",
);
assert.match(heroPrototypeCss, /prefers-reduced-motion/);
assert.match(heroPrototypeCss, /\[data-theme="dark"\]/);
assert.match(heroPrototypeCss, /\.profile-card/);
assert.match(heroPrototypeCss, /\.terminal-glow/);
assert.match(heroPrototypeCss, /\.button:focus-visible/);
assert.match(
  heroPrototypeCss,
  /@media \(max-width: 540px\)[\s\S]*?\.profile-image-wrap\s*\{[^}]*align-self: center;[^}]*aspect-ratio: 4 \/ 5;[^}]*height: auto;[^}]*width: clamp\(9\.37125rem, 41\.895vw, 11\.57625rem\);/,
);
assert.match(heroPrototypeJs, /deploy --target public-sector/);
assert.match(heroPrototypeJs, /prefersReducedMotion/);
assert.match(heroPrototypeJs, /localStorage\.setItem\("hero-theme"/);

assert.equal(getNextIndex(0, "previous", 3), 2);
assert.equal(getNextIndex(2, "next", 3), 0);
assert.ok(photographyImages.length >= 1);
const photographyAssetPaths = readdirSync(join(root, "portfolio/assets/img/photography"))
  .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
  .map((file) => `portfolio/assets/img/photography/${file}`)
  .sort();
assert.deepEqual([...photographyImages].sort(), photographyAssetPaths);
photographyImages.forEach((imagePath) => {
  assert.ok(
    existsSync(join(root, imagePath)),
    `Missing carousel image: ${imagePath}`,
  );
});

console.log("Portfolio smoke test passed.");
