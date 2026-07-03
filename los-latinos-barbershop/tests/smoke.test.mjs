import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("..", import.meta.url));

const readProjectFile = (fileName) => readFile(join(root, fileName), "utf8");
const assetStat = (fileName) => stat(join(root, "assets", fileName));

const [html, css, js, heroImage, ...serviceImages] = await Promise.all([
  readProjectFile("index.html"),
  readProjectFile("styles.css"),
  readProjectFile("script.js"),
  assetStat("hero-shop.png"),
  assetStat("service-haircut.jpg"),
  assetStat("service-fade.jpg"),
  assetStat("service-beard.jpg"),
  assetStat("service-kids.jpg"),
  assetStat("service-hot-towel.jpg")
]);

assert.match(html, /<video[\s\S]+data-hero-video/, "Hero video element is missing.");
assert.match(html, /poster="assets\/hero-shop\.png"/, "Hero poster asset is not wired.");
assert.match(html, /<meta\s+name="description"/, "SEO description meta tag is missing.");
assert.match(html, /barbershop Kenner LA/, "Local SEO keywords are missing.");
assert.match(html, /application\/ld\+json/, "Local business JSON-LD is missing.");
assert.match(html, /"@type": "HairSalon"/, "HairSalon schema is missing.");
assert.match(html, /Kenner, LA[\s\S]+Metairie, LA[\s\S]+New Orleans, LA/, "Service-area SEO is missing.");

assert.match(html, /data-language-toggle/, "Language toggle is missing.");
assert.match(html, /data-lang-option="es"/, "Spanish language option is missing.");
assert.match(html, /Se habla español/, "Spanish bilingual signal is missing.");
assert.match(html, /id="primary-nav"/, "Primary nav needs an id for the mobile menu.");
assert.match(html, /data-menu-toggle[\s\S]+aria-controls="primary-nav"/, "Mobile menu toggle is missing.");

assert.match(html, /id="services"/, "Services section is missing.");
assert.match(html, /assets\/service-haircut\.jpg/, "Haircut service image is missing.");
assert.match(html, /assets\/service-fade\.jpg/, "Fade service image is missing.");
assert.match(html, /assets\/service-beard\.jpg/, "Beard service image is missing.");
assert.match(html, /assets\/service-kids\.jpg/, "Kids service image is missing.");
assert.match(html, /assets\/service-hot-towel\.jpg/, "Hot towel service image is missing.");
assert.match(html, /data-i18n="service.fade.title"/, "Service translation hooks are missing.");

assert.match(html, /id="hours"/, "Hours section is missing.");
assert.match(html, /id="book"/, "Booking section is missing.");
assert.match(html, /data-booking-slot/, "Booking provider placeholder is missing.");
assert.match(html, /https:\/\/www\.google\.com\/maps\/dir\/\?api=1&amp;destination=/, "Google Maps directions link is missing.");
assert.match(html, /https:\/\/maps\.apple\.com\/\?daddr=/, "Apple Maps directions link is missing.");
assert.match(html, /output=embed/, "Embedded map is missing.");
assert.match(html, /Instagram @loslatinosbarbershop/, "Instagram handle is missing.");
assert.match(html, /href="tel:\+15045550198"/, "Call CTA is missing.");
assert.match(html, /fonts\.googleapis\.com\/css2[\s\S]+family=Oswald[\s\S]+family=Rye/, "Western-inspired font pairing is missing.");

assert.match(css, /--navy-980/, "Color system is missing navy palette variables.");
assert.match(css, /--gold-450/, "Color system is missing gold palette variables.");
assert.match(css, /--carmine-700/, "Color system is missing warm accent variables.");
assert.match(css, /--jade-600/, "Color system is missing secondary accent variables.");
assert.match(css, /--font-display: Rye/, "Display font variable should use Rye.");
assert.match(css, /--font-accent: Oswald/, "Accent font variable should use Oswald.");
assert.match(css, /\.service-card img[\s\S]+aspect-ratio/, "Service images need stable dimensions.");
assert.match(css, /\.menu-toggle[\s\S]+display: none/, "Menu toggle should be hidden outside mobile.");
assert.match(css, /\.brand-mark[\s\S]+display: none/, "Mobile header should hide the logo mark.");
assert.match(css, /\.site-header\.is-menu-open \.primary-nav/, "Mobile nav open state is missing.");
assert.doesNotMatch(css, /letter-spacing:\s*-/i, "Negative letter spacing is not allowed.");
assert.doesNotMatch(css, /font-size:[^;]*vw/i, "Font sizes should not scale with viewport width.");

assert.match(js, /const translations = \{/, "Translation table is missing.");
assert.match(js, /Cortes modernos/, "Spanish hero translation is missing.");
assert.match(js, /"menu\.open": "Open menu"/, "Menu toggle translation is missing.");
assert.match(js, /data-i18n-alt/, "Translated image alt text is missing.");
assert.match(js, /localStorage\.setItem\(LANGUAGE_STORAGE_KEY/, "Language preference persistence is missing.");
assert.match(js, /function initMobileMenu/, "Mobile menu behavior is missing.");
assert.match(js, /prefers-reduced-motion/, "Hero motion should respect reduced-motion preferences.");
assert.match(js, /captureStream\(30\)/, "Hero video placeholder should stream smooth canvas video.");

assert.ok(heroImage.size > 100_000, "Hero image asset looks unexpectedly small.");
for (const image of serviceImages) {
  assert.ok(image.size > 100_000, "A service image asset looks unexpectedly small.");
}

console.log("Smoke checks passed.");
