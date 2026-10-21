import assert from "node:assert/strict";
import test from "node:test";
import setupScrolling, { resolveHashTarget } from "../portfolio/assets/js/scroll.js";
import setupWorkDemo from "../portfolio/assets/js/work.js";
import setupTerminal, { resolveTerminalCommand } from "../portfolio/assets/js/terminal.js";

class Element extends EventTarget {
  constructor(dataset = {}, active = false) {
    super(); this.dataset = dataset; this.attributes = new Map(); this.value = "";
    this.classes = new Set(active ? ["is-active"] : []);
    this.classList = { contains: (name) => this.classes.has(name), toggle: (name, enabled) => enabled ? this.classes.add(name) : this.classes.delete(name) };
  }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  hasAttribute(name) { return this.attributes.has(name); }
  setAttribute(name, value) { this.attributes.set(name, value); }
  focus(options) { this.focusOptions = options; }
  scrollIntoView(options) { this.scrollOptions = options; }
}
const click = (element, props = {}) => {
  const event = new Event("click", { cancelable: true });
  Object.entries(props).forEach(([key, value]) => Object.defineProperty(event, key, { value }));
  element.dispatchEvent(event); return event;
};

test("terminal resolves known commands, rejects markup and inherited property names", () => {
  assert.match(resolveTerminalCommand("  WHOAMI "), /Anes Mehai/);
  for (const command of ["impact", "approach", "skills", "help"]) assert.doesNotMatch(resolveTerminalCommand(command), /not found/);
  for (const command of ["<script>alert(1)</script>", "constructor", "__proto__"]) assert.match(resolveTerminalCommand(command), /Command not found/);
  assert.match(resolveTerminalCommand("  "), /Type a command/);
});

test("terminal keyboard submission and suggestions reveal accessible output", () => {
  const form = new Element(), input = new Element(), output = new Element();
  const button = new Element({ terminalCommand: "skills" }); output.hidden = true; form.hidden = true;
  setupTerminal({ root: {}, form, input, output, buttons: [button] });
  assert.equal(form.hidden, false);
  input.value = "whoami";
  const submit = new Event("submit", { cancelable: true }); form.dispatchEvent(submit);
  assert.equal(submit.defaultPrevented, true); assert.equal(output.hidden, false);
  assert.match(output.textContent, /Anes Mehai/);
  click(button); assert.equal(input.value, "skills"); assert.match(output.textContent, /Spring Boot/);
  assert.deepEqual(input.focusOptions, { preventScroll: true });
});

test("pipeline synchronizes visual and pressed states", () => {
  const buttons = [new Element({ flowStep: "request" }, true), new Element({ flowStep: "auth" }), new Element({ flowStep: "invalid" })];
  const description = {}, code = {}, state = {};
  setupWorkDemo({ buttons, description, code, state });
  assert.equal(buttons[0].getAttribute("aria-pressed"), "true");
  assert.equal(buttons[1].getAttribute("aria-pressed"), "false");
  click(buttons[1]); assert.equal(state.textContent, "Identity verified");
  assert.match(code.textContent, /MFA/); assert.match(description.textContent, /authenticated/);
  assert.equal(buttons[0].getAttribute("aria-pressed"), "false");
  assert.equal(buttons[1].classList.contains("is-active"), true);
  click(buttons[2]); assert.equal(state.textContent, "Identity verified");
});

test("cross-page contact navigation restores the destination after page load", () => {
  const contact = new Element(), view = new EventTarget();
  view.location = { hash: "#contact" };
  const root = { readyState: "interactive", querySelectorAll: () => [], getElementById: (id) => id === "contact" ? contact : null };
  setupScrolling({ root, view, reducedMotion: { matches: false } });
  assert.equal(contact.scrollOptions, undefined);
  view.dispatchEvent(new Event("load"));
  assert.deepEqual(contact.scrollOptions, { behavior: "instant", block: "start" });
  assert.deepEqual(contact.focusOptions, { preventScroll: true });
  assert.equal(contact.getAttribute("tabindex"), "-1");
  delete contact.scrollOptions;
  root.readyState = "complete";
  setupScrolling({ root, view, reducedMotion: { matches: true } });
  assert.equal(contact.scrollOptions.behavior, "instant");
});

test("section navigation preserves history, reduced motion, focus, and modifier clicks", () => {
  const anchor = new Element(), target = new Element(), top = new Element(), view = new EventTarget();
  anchor.setAttribute("href", "#career%20work");
  const root = { querySelectorAll: () => [anchor], getElementById: (id) => ({ "career work": target, top })[id] ?? null };
  const pushes = []; view.location = { hash: "" }; view.history = { pushState: (...args) => { pushes.push(args); view.location.hash = args[2]; } };
  const reducedMotion = { matches: true };
  setupScrolling({ root, view, reducedMotion });
  assert.equal(click(anchor, { ctrlKey: true }).defaultPrevented, false); assert.equal(pushes.length, 0);
  assert.equal(click(anchor).defaultPrevented, true); assert.equal(pushes[0][2], "#career%20work");
  assert.equal(target.getAttribute("tabindex"), "-1"); assert.equal(target.scrollOptions.behavior, "instant");
  assert.deepEqual(target.focusOptions, { preventScroll: true });
  reducedMotion.matches = false; click(anchor); assert.equal(target.scrollOptions.behavior, "smooth"); assert.equal(pushes.length, 1);
  view.location.hash = ""; view.dispatchEvent(new Event("popstate")); assert.equal(top.scrollOptions.behavior, "instant");
  assert.equal(resolveHashTarget("#%zz", root), null); assert.equal(resolveHashTarget("#missing", root), null);
});
