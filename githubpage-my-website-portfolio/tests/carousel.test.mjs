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
function fixture(saveData = false, automatic = true) {
  const image = new Element(), slide = new Element(), previous = new Element(), next = new Element(), dots = new Element();
  const preloads = [];
  let intersect;
  image.closest = () => slide;
  image.ownerDocument = { defaultView: {
    navigator: { connection: { saveData } },
    Image: class {
      constructor() { preloads.push(this); }
      set src(value) {
        this.url = value;
        if (automatic) queueMicrotask(() => this.onload());
      }
      get src() { return this.url; }
      decode() { this.decoded = true; return Promise.resolve(); }
    },
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
const settle = () => new Promise((resolve) => setImmediate(resolve));

test('horizontal swipes wrap; vertical, short and cancelled gestures preserve the photo', async () => {
  const { image, slide } = fixture();
  swipe(slide, -100); await settle(); assert.equal(image.src, 'two');
  swipe(slide, 100); await settle(); assert.equal(image.src, 'one');
  swipe(slide, 100); await settle(); assert.equal(image.src, 'three');
  swipe(slide, -100, 140); assert.equal(image.src, 'three');
  swipe(slide, -20); assert.equal(image.src, 'three');
  swipe(slide, -100, 0, 'pointercancel');
  dispatch(slide, 'pointerup', { pointerId: 1, clientX: 0, clientY: 100 });
  assert.equal(image.src, 'three');
});
test('arrows, dots and keyboard navigation synchronize the selected photo', async () => {
  const { image, slide, next, previous, dots } = fixture();
  dispatch(next, 'click'); await settle(); assert.equal(image.src, 'two');
  dispatch(previous, 'click'); await settle(); assert.equal(image.src, 'one');
  assert.equal(dispatch(slide, 'keydown', { key: 'ArrowLeft' }).defaultPrevented, true);
  await settle();
  assert.equal(image.src, 'three');
  dispatch(dots.children[1], 'click'); await settle(); assert.equal(image.src, 'two');
  assert.equal(dots.children[1].attributes.get('aria-current'), 'true');
});
test('both neighbors preload near the viewport, decode, and respect data saver', async () => {
  const f = fixture();
  assert.equal(f.preloads.length, 0);
  f.enter();
  assert.deepEqual(f.preloads.map((image) => image.src).sort(), ['three', 'two']);
  assert.equal(f.preloads[1].srcset, 'two-small 600w, two 900w');
  await settle();
  assert.ok(f.preloads.every((image) => image.decoded));
  dispatch(f.next, 'click');
  await settle();
  assert.equal(f.image.src, 'two');
  assert.equal(f.preloads.length, 3);
  const saver = fixture(true);
  saver.enter();
  assert.equal(saver.preloads.length, 0);
  dispatch(saver.next, 'click');
  await settle();
  assert.equal(saver.image.src, 'two');
  assert.equal(saver.preloads.length, 1);
});

test('the visible image and pagination wait for decode; stale rapid requests cannot replace it', async () => {
  const f = fixture(false, false);
  dispatch(f.next, 'click');
  dispatch(f.next, 'click');
  assert.equal(f.image.src, 'one');
  assert.equal(f.dots.children[0].attributes.get('aria-current'), 'true');
  assert.equal(f.slide.attributes.get('aria-busy'), 'true');
  let decode;
  f.preloads[1].decode = () => new Promise((resolve) => { decode = resolve; });
  f.preloads[1].onload();
  await settle();
  assert.equal(f.image.src, 'one');
  decode();
  await settle();
  assert.equal(f.image.src, 'three');
  f.preloads[0].onload();
  await settle();
  assert.equal(f.image.src, 'three');
  assert.equal(f.dots.children[2].attributes.get('aria-current'), 'true');
  assert.equal(f.slide.attributes.get('aria-busy'), 'false');
});

test('failed downloads and decodes retain the photo and permit retry', async () => {
  for (const failDecode of [false, true]) {
    const f = fixture(false, false);
    dispatch(f.previous, 'click');
    if (failDecode) {
      f.preloads[0].decode = () => Promise.reject(new Error('decode failed'));
      f.preloads[0].onload();
    } else f.preloads[0].onerror();
    await settle();
    assert.equal(f.image.src, 'one');
    assert.equal(f.slide.attributes.get('aria-busy'), 'false');
    dispatch(f.previous, 'click');
    assert.equal(f.preloads.length, 2);
    f.preloads[1].onload();
    await settle();
    assert.equal(f.image.src, 'three');
  }
});
