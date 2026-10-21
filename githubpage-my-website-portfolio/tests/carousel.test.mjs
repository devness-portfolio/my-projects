import assert from 'node:assert/strict';
import test from 'node:test';
import setupCarousel from '../portfolio/assets/js/carousel.js';

class Element extends EventTarget {
  constructor() {
    super();
    this.attributes = new Map();
    this.style = { setProperty: (key, value) => this.attributes.set(key, value), removeProperty: (key) => this.attributes.delete(key) };
    this.classList = { toggle() {} };
  }
  setAttribute(key, value) { this.attributes.set(key, value); }
  removeAttribute(key) { this.attributes.delete(key); }
  setPointerCapture() {}
}
function fixture(saveData = false) {
  const image = new Element(), slide = new Element(), previous = new Element(), next = new Element(), dots = new Element();
  const preloads = [];
  let intersect;
  image.closest = () => slide;
  image.ownerDocument = { defaultView: {
    navigator: { connection: { saveData } },
    Image: class { constructor() { preloads.push(this); } },
    IntersectionObserver: class {
      constructor(callback) { intersect = callback; }
      observe() {}
      disconnect() {}
    },
  } };
  dots.children = [];
  dots.replaceChildren = () => { dots.children = []; };
  dots.appendChild = (dot) => dots.children.push(dot);
  const oldDocument = globalThis.document;
  globalThis.document = { createElement: () => new Element() };
  try {
    setupCarousel({ images: ['one', 'two', 'three'].map((src) => ({ src, srcset: `${src}-small 600w, ${src} 900w`, sizes: '90vw' })), imageElement: image, previousButton: previous, nextButton: next, dotsContainer: dots });
  } finally { globalThis.document = oldDocument; }
  return { image, slide, previous, next, dots, preloads, enter: () => intersect([{ isIntersecting: true }]) };
}
function dispatch(element, type, props = {}) {
  const event = new Event(type, { cancelable: true });
  Object.assign(event, props);
  element.dispatchEvent(event);
  return event;
}
function swipe(slide, dx, dy = 0, end = 'pointerup') {
  dispatch(slide, 'pointerdown', { pointerId: 1, isPrimary: true, button: 0, clientX: 200, clientY: 100 });
  dispatch(slide, end, { pointerId: 1, clientX: 200 + dx, clientY: 100 + dy });
}
test('horizontal swipes wrap; vertical, short and cancelled gestures preserve the photo', () => {
  const { image, slide } = fixture();
  swipe(slide, -100); assert.equal(image.src, 'two');
  swipe(slide, 100); assert.equal(image.src, 'one');
  swipe(slide, 100); assert.equal(image.src, 'three');
  swipe(slide, -100, 140); assert.equal(image.src, 'three');
  swipe(slide, -20); assert.equal(image.src, 'three');
  swipe(slide, -100, 0, 'pointercancel');
  dispatch(slide, 'pointerup', { pointerId: 1, clientX: 0, clientY: 100 });
  assert.equal(image.src, 'three');
});
test('arrows, dots and keyboard navigation synchronize the selected photo', () => {
  const { image, slide, next, previous, dots } = fixture();
  dispatch(next, 'click'); assert.equal(image.src, 'two');
  dispatch(previous, 'click'); assert.equal(image.src, 'one');
  assert.equal(dispatch(slide, 'keydown', { key: 'ArrowLeft' }).defaultPrevented, true);
  assert.equal(image.src, 'three');
  dispatch(dots.children[1], 'click'); assert.equal(image.src, 'two');
  assert.equal(dots.children[1].attributes.get('aria-current'), 'true');
});
test('preloading waits for proximity, uses responsive sources and respects data saver', () => {
  const f = fixture();
  assert.equal(f.preloads.length, 0);
  f.enter(); assert.equal(f.preloads.length, 1);
  assert.equal(f.preloads[0].src, 'two');
  assert.equal(f.preloads[0].srcset, 'two-small 600w, two 900w');
  f.image.currentSrc = 'https://example.test/one-small';
  dispatch(f.image, 'load');
  assert.equal(f.preloads.length, 1);
  assert.equal(f.slide.attributes.get('--carousel-background'), 'url("https://example.test/one-small")');
  dispatch(f.next, 'click'); assert.equal(f.preloads[1].src, 'three');
  const saver = fixture(true); saver.enter(); assert.equal(saver.preloads.length, 0);
});
