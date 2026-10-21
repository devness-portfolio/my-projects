import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const tags = [...html.matchAll(/<([a-z][\w-]*)\b([^<>]*)>/gi)].map((match) => {
  const attributes = Object.fromEntries(
    [...match[2].matchAll(/([\w-]+)="([^"]*)"/g)].map((attribute) => [attribute[1], attribute[2]]),
  );
  return { name: match[1], attributes, source: match[0], position: match.index };
});
const identified = tags.filter(({ attributes }) => attributes.id);
const byId = new Map(identified.map((tag) => [tag.attributes.id, tag]));

// These checks cover document relationships without tying the design to CSS values.
test("every ID is unique and local navigation and accessibility references resolve", () => {
  assert.equal(byId.size, identified.length, "Duplicate element IDs break navigation and labeling");
  for (const { attributes } of tags) {
    const targets = [
      ...(attributes.href?.startsWith("#") ? [attributes.href.slice(1)] : []),
      ...(attributes["aria-controls"]?.split(/\s+/) ?? []),
      ...(attributes["aria-labelledby"]?.split(/\s+/) ?? []),
      ...(attributes["aria-describedby"]?.split(/\s+/) ?? []),
      ...(attributes.for ? [attributes.for] : []),
    ];
    for (const target of targets) assert.ok(byId.has(target), `Unresolved reference: ${target}`);
  }
});

test("career leads projects, followed by the interactive engineering profile and personal sections", () => {
  const order = ["experience", "projects", "pipeline", "engineering", "skills", "about", "education", "photography", "contact"];
  for (const id of order) assert.ok(byId.has(id), `Missing preserved section: ${id}`);
  for (let index = 1; index < order.length; index++) {
    assert.ok(byId.get(order[index - 1]).position < byId.get(order[index]).position, `${order[index - 1]} must precede ${order[index]}`);
  }
  const patientLink = tags.find(({ attributes }) => attributes.href === "portfolio/case-study-sadaf-ijaz-md.html");
  assert.ok(patientLink.position > byId.get("projects").position);
  assert.ok(patientLink.position < byId.get("pipeline").position, "Patient project must precede the pipeline");
  const heroActions = html.slice(html.indexOf('class="hero-actions"'), byId.get("experience").position);
  assert.match(heroActions, /href="#experience"/);
  assert.match(heroActions, /download="Anes-Mehai-Resume\.pdf"/);
});

test("terminal profile tabs connect reciprocally to their panels", () => {
  const tabs = tags.filter(({ attributes }) => attributes.role === "tab");
  assert.equal(tabs.length, 4);
  assert.equal(tabs.filter(({ attributes }) => attributes["aria-selected"] === "true").length, 1);
  for (const { attributes } of tabs) {
    const panel = byId.get(attributes["aria-controls"]);
    assert.equal(panel.attributes.role, "tabpanel");
    assert.equal(panel.attributes["aria-labelledby"], attributes.id);
    assert.ok(panel.position > byId.get("engineering").position);
  }
});

test("command demo exposes a labeled input, native submit, and polite output", () => {
  const form = html.match(/<form\b[^>]*data-terminal-form[^>]*>([\s\S]*?)<\/form>/)?.[1];
  assert.ok(form, "Command demo form is present");
  assert.match(form, /<label\b[^>]*for="terminal-command"/);
  assert.match(form, /<input\b[^>]*id="terminal-command"[\s\S]*?data-terminal-input/);
  assert.match(form, /<button\b[^>]*type="submit"/);
  const output = tags.find(({ source }) => /\bdata-terminal-output\b/.test(source));
  assert.ok(output);
  assert.equal(output.attributes.role, "status");
  assert.equal(output.attributes["aria-live"], "polite");
});

test("patient project preserves a decorative heart and pulse illustration", () => {
  const illustration = html.match(/<span class="patient-icon" aria-hidden="true">([\s\S]*?)<\/span>/)?.[1];
  assert.ok(illustration, "Heart illustration is hidden from assistive technology");
  assert.match(illustration, /<svg\b/);
  assert.ok((illustration.match(/<path\b/g) ?? []).length >= 2, "Heart outline and pulse are present");
});
