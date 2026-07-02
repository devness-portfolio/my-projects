import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { getNextIndex, photographyImages } from "../portfolio/assets/js/carousel.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const readProjectFile = (path) => readFileSync(join(root, path), "utf8");

const html = readProjectFile("index.html");
const sadafCaseStudyHtml = readProjectFile("portfolio/case-study-sadaf-ijaz-md.html");
const css = readProjectFile("portfolio/assets/css/style.css");
const mainJs = readProjectFile("portfolio/assets/js/main.js");

assert.match(html, /<h1 id="hero-title">Anes Mehai<\/h1>/);
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
assert.doesNotMatch(css, /letter-spacing:\s*-/);

assert.match(mainJs, /setupTheme\(\)/);
assert.match(mainJs, /setupCarousel\(\)/);

assert.equal(getNextIndex(0, "previous", 3), 2);
assert.equal(getNextIndex(2, "next", 3), 0);
assert.ok(photographyImages.length >= 1);

console.log("Portfolio smoke test passed.");
