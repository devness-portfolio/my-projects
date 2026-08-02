import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getNextIndex, photographyImages } from "../portfolio/assets/js/carousel.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const readProjectFile = (path) => readFileSync(join(root, path), "utf8");

function assertLocalReferencesExist(htmlPath, source) {
  const references = [...source.matchAll(/\b(?:href|src)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter(
      (reference) =>
        reference &&
        !reference.startsWith("#") &&
        !/^(?:https?:|mailto:|tel:)/.test(reference),
    );

  references.forEach((reference) => {
    const assetPath = reference.split(/[?#]/, 1)[0];
    assert.ok(
      existsSync(join(root, dirname(htmlPath), assetPath)),
      `Missing local reference in ${htmlPath}: ${reference}`,
    );
  });
}

const html = readProjectFile("index.html");
const sadafCaseStudyHtml = readProjectFile("portfolio/case-study-sadaf-ijaz-md.html");
const css = readProjectFile("portfolio/assets/css/style.css");
const mainJs = readProjectFile("portfolio/assets/js/main.js");
const heroJs = readProjectFile("portfolio/assets/js/hero.js");
const workJs = readProjectFile("portfolio/assets/js/work.js");
const uiJs = readProjectFile("portfolio/assets/js/ui.js");
const themeJs = readProjectFile("portfolio/assets/js/theme.js");
const heroPrototypeHtml = readProjectFile("hero-prototype.html");
const heroPrototypeCss = readProjectFile("portfolio/assets/css/hero-prototype.css");
const logoV1Svg = readProjectFile("portfolio/assets/img/devness-logo-v1.svg");
const logoV2Svg = readProjectFile("portfolio/assets/img/devness-logo-v2.svg");
const heroPrototypeJs = readProjectFile("portfolio/assets/js/hero-prototype.js");

assert.match(html, /<section class="hero portfolio-hero"/);
assert.match(html, /<meta name="theme-color" content="#f5f8f6" \/>/);
assert.match(html, /I modernize complex software into/);
assert.match(html, /7\+ years of full-SDLC experience/);
assert.match(html, /requirements and system design through implementation/);
assert.match(html, /secure, scalable, production-grade systems/);
assert.match(html, /class="proof-strip"/);
assert.match(html, /data-console-tab="overview"/);
assert.match(html, /data-console-tab="impact"/);
assert.match(html, /data-console-tab="stack"/);
assert.match(html, /data-console-tab="qualifications"/);
assert.doesNotMatch(html, /data-console-tab="status"/);
assert.match(html, /04 \/ Qualifications/);
assert.doesNotMatch(html, /05 \/ Status/);
assert.match(
  html,
  /<li>U\.S\. Citizen<\/li>\s*<li>Public Trust Clearance<\/li>\s*<li>Bachelor of Science in Computer Science<\/li>\s*<li>7\+ years of experience<\/li>/,
);
assert.match(html, /<li>7\+ years of experience<\/li>/);
assert.match(html, /data-overview-transcript/);
assert.equal((html.match(/data-typing-line/g) || []).length, 8);
assert.match(html, /Anes Mehai — Software Engineer/);
assert.match(
  html,
  /data-console-panel="overview"[\s\S]*deploy --target public-sector[\s\S]*data-console-panel="impact"/,
);
assert.match(html, /deploy --target public-sector/);
assert.match(html, /✓ secure/);
assert.match(html, /✓ scalable/);
assert.match(html, /✓ production-grade/);
assert.match(html, /status --availability/);
assert.match(html, /ready to build systems that serve people/);
assert.match(html, /legacy modernization/);
assert.match(html, /Struts-to-Spring modernization/);
assert.match(html, /Implemented MFA with Spring Security/);
assert.match(html, /Full-SDLC experience, from requirements to production/);
assert.match(html, /Modernization and production delivery, demonstrated/);
assert.match(html, /src="portfolio\/assets\/img\/ppic\.jpg"/);
assert.match(html, /<li>U\.S\. Citizen<\/li>/);
assert.match(html, /<li>Public Trust Clearance<\/li>/);
assert.match(html, /src="portfolio\/assets\/img\/devness-logo-v2\.svg"/);
assert.match(logoV1Svg, /<title id="devness-logo-title">Devness<\/title>/);
assert.match(logoV1Svg, /<path d="M92 29 78 151" \/>/);
assert.match(logoV2Svg, /stroke="#5ee6a8"/);
assert.match(logoV2Svg, /M58 42 20 90l38 48M122 42l38 48-38 48/);
assert.equal((logoV2Svg.match(/<circle /g) || []).length, 3);
assert.match(css, /\.brand-logo-frame\s*\{[^}]*background-color: var\(--primary-color\)/);
assert.match(
  heroPrototypeCss,
  /\.brand-logo-frame\s*\{[^}]*background-color: var\(--green\)/,
);
assert.match(
  html,
  /rel="icon"[\s\S]*href="\.\/portfolio\/assets\/img\/devness-logo-v2\.svg"[\s\S]*type="image\/svg\+xml"/
);
assert.match(html, /class="brand-wordmark"[^>]*>devness</);
assert.match(html, /class="footer-logo" aria-hidden="true"/);
assert.match(html, /class="footer-socials" aria-label="Social media"/);
assert.match(html, /<span class="sr-only">GitHub<\/span>/);
assert.match(html, /<span class="sr-only">LinkedIn<\/span>/);
assert.match(
  html,
  /class="social-links"[\s\S]*class="social-icon"[\s\S]*LinkedIn[\s\S]*class="social-icon"[\s\S]*GitHub/,
);
assert.match(html, /download="Anes-Mehai-Resume\.pdf"/);
assert.match(html, /href="mailto:nessworkdc@gmail\.com"/);
assert.match(html, /href="tel:\+12406606158"/);
assert.match(html, /Dr\. Sadaf Ijaz MD Website/);
assert.match(html, /https:\/\/sadafijazmd\.com\//);
assert.match(html, /portfolio\/case-study-sadaf-ijaz-md\.html/);
assert.match(html, /Secure Request Path Explorer/);
assert.equal((html.match(/data-flow-step=/g) || []).length, 4);
assert.match(html, /class="experience-row" open/);
assert.match(html, /data-copy-email="nessworkdc@gmail\.com"/);
assert.ok(html.indexOf('id="projects"') < html.indexOf('id="experience"'));
assert.ok(html.indexOf('id="experience"') < html.indexOf('id="skills"'));
assert.ok(html.indexOf('id="skills"') < html.indexOf('id="about"'));
assert.match(html, /type="module" src="portfolio\/assets\/js\/main\.js"/);
assert.doesNotMatch(html, /fontawesome|class="(?:fas|fab|far)\b/);
assert.match(html, /class="inline-icon"/);
assert.doesNotMatch(html, /\[Brief description|\[Link to GitHub Repo/);
assertLocalReferencesExist("index.html", html);

assert.match(sadafCaseStudyHtml, /<title>Case Study \| Dr\. Sadaf Ijaz MD Website<\/title>/);
assert.match(sadafCaseStudyHtml, /View Live Site/);
assert.match(sadafCaseStudyHtml, /Client-ready static deliverable/);
assert.match(sadafCaseStudyHtml, /type="module" src="assets\/js\/main\.js"/);
assert.match(sadafCaseStudyHtml, /class="footer-logo" aria-hidden="true"/);
assert.match(sadafCaseStudyHtml, /class="footer-socials" aria-label="Social media"/);
assert.doesNotMatch(sadafCaseStudyHtml, /\[Brief description|\[Link to GitHub Repo/);
assertLocalReferencesExist(
  "portfolio/case-study-sadaf-ijaz-md.html",
  sadafCaseStudyHtml,
);

assert.match(css, /--primary-color:/);
assert.match(css, /\.work-card-featured/);
assert.match(css, /\.case-hero/);
assert.match(css, /\.carousel-slide-contained/);
assert.match(css, /\.portfolio-hero/);
assert.match(css, /\.terminal-glow/);
assert.match(css, /\.inline-icon/);
assert.match(css, /\.footer-socials/);
assert.match(css, /\.social-icon/);
assert.match(css, /\.proof-strip/);
assert.match(css, /\.about-grid/);
assert.match(
  css,
  /\.about-image-frame img\s*\{[^}]*height: auto;[^}]*width: 100%;/s,
);
assert.doesNotMatch(
  css,
  /\.about-image-frame img\s*\{[^}]*object-fit: cover;/s,
);
assert.match(css, /\.scroll-progress/);
assert.match(css, /prefers-reduced-motion: reduce/);
assert.doesNotMatch(css, /letter-spacing:\s*-/);
assert.doesNotMatch(css, /\.(?:brand-mark|btn-muted|headshot|hero-media|signal-list)\b/);

assert.match(mainJs, /setupTheme\(\)/);
assert.match(mainJs, /setupHero\(\)/);
assert.match(mainJs, /setupWorkDemo\(\)/);
assert.match(mainJs, /setupUi\(\)/);
assert.match(mainJs, /setupCarousel\(\)/);
assert.match(heroJs, /prefers-reduced-motion: reduce/);
assert.match(heroJs, /runOverviewTyping/);
assert.match(heroJs, /ArrowLeft/);
assert.match(workJs, /SecurityFilterChain → MFA/);
assert.match(uiJs, /IntersectionObserver/);
assert.match(uiJs, /navigator\.clipboard/);
assert.match(themeJs, /savedTheme === "dark"/);
assert.match(themeJs, /light: "#f5f8f6"/);
assert.doesNotMatch(themeJs, /matchMedia\("\(prefers-color-scheme: dark\)"\)/);

assert.match(heroPrototypeHtml, /Building dependable software for/);
assert.match(heroPrototypeHtml, /id="terminal-output"/);
assert.match(heroPrototypeHtml, /id="theme-toggle"/);
assert.match(heroPrototypeHtml, /src="portfolio\/assets\/img\/ppic\.jpg"/);
assert.match(heroPrototypeHtml, /src="portfolio\/assets\/img\/devness-logo-v2\.svg"/);
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
assertLocalReferencesExist("hero-prototype.html", heroPrototypeHtml);
assert.ok(
  existsSync(join(root, "portfolio/assets/files/Anes-Mehai-SWE-2025-Resume.pdf")),
  "Missing downloadable resume",
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
