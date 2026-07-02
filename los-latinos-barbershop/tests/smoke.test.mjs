import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("..", import.meta.url));

const readProjectFile = (fileName) => readFile(join(root, fileName), "utf8");

const [html, css, js, heroImage] = await Promise.all([
  readProjectFile("index.html"),
  readProjectFile("styles.css"),
  readProjectFile("script.js"),
  stat(join(root, "assets", "hero-shop.png"))
]);

assert.match(html, /<video[\s\S]+data-hero-video/, "Hero video element is missing.");
assert.match(html, /poster="assets\/hero-shop\.png"/, "Hero poster asset is not wired.");
assert.match(html, /id="book"/, "Booking section is missing.");
assert.match(html, /data-booking-slot/, "Booking provider placeholder is missing.");
assert.match(html, /https:\/\/www\.google\.com\/maps\/dir\/\?api=1&amp;destination=/, "Google Maps directions link is missing.");
assert.match(html, /https:\/\/maps\.apple\.com\/\?daddr=/, "Apple Maps directions link is missing.");
assert.match(html, /output=embed/, "Embedded map is missing.");
assert.match(html, /Instagram @loslatinosbarbershop/, "Instagram handle is missing.");
assert.match(html, /href="tel:\+15045550198"/, "Call CTA is missing.");

assert.match(css, /--blue-950/, "Color system is missing blue palette variables.");
assert.match(css, /--gold-400/, "Color system is missing gold palette variables.");
assert.doesNotMatch(css, /letter-spacing:\s*-/i, "Negative letter spacing is not allowed.");
assert.doesNotMatch(css, /font-size:[^;]*vw/i, "Font sizes should not scale with viewport width.");

assert.match(js, /prefers-reduced-motion/, "Hero motion should respect reduced-motion preferences.");
assert.match(js, /captureStream\(30\)/, "Hero video placeholder should stream smooth canvas video.");
assert.ok(heroImage.size > 100_000, "Hero image asset looks unexpectedly small.");

console.log("Smoke checks passed.");
