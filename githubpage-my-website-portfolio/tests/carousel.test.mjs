import assert from 'node:assert/strict';
import test from 'node:test';
import setupCarousel from '../portfolio/assets/js/carousel.js';
class Element extends EventTarget {
  constructor() {
    super(); this.attributes = new Map(); this.children = []; this.clientWidth = 600; this.scrollLeft = 0;
    this.style = { setProperty() {} };
    this.classList = { add() {}, remove() {}, toggle() {} };
  }
  setAttribute(k, v) { this.attributes.set(k, v); }
  appendChild(el) { this.children.push(el); }
  replaceChildren() { this.children = []; }
  setPointerCapture() {}
  scrollTo(options) { this.lastScroll = options; this.scrollLeft = options.left; }
}
function fixture(saveData = false, reduced = false) {
  const image = new Element(), slide = new Element(), previous = new Element(), next = new Element(), dots = new Element();
  let intersect;
  image.closest = () => slide;
  image.ownerDocument = { createElement: () => new Element(), defaultView: {
    navigator: { connection: { saveData } }, matchMedia: () => ({ matches: reduced }),
    IntersectionObserver: class { constructor(cb) { intersect = cb; } observe() {} disconnect() {} },
  } };
  setupCarousel({ images: ['one', 'two', 'three'].map(src => ({ src })), imageElement: image, previousButton: previous, nextButton: next, dotsContainer: dots });
  return { image, slide, previous, next, dots, photos: slide.children.map(p => p.children[0]), enter: () => intersect([{ isIntersecting: true }]) };
}
function dispatch(el, type, props = {}) {
  const event = new Event(type, { cancelable: true }); Object.assign(event, props); el.dispatchEvent(event); return event;
}
test('navigation moves immediately even when images have never loaded; rapid clicks and wrap remain responsive', () => {
  const f = fixture();
  assert.equal(f.photos.length, 3);
  assert.equal(f.photos[0], f.image);
  dispatch(f.next, 'click');
  assert.equal(f.slide.lastScroll.left, 600);
  assert.equal(f.dots.children[1].attributes.get('aria-current'), 'true');
  dispatch(f.next, 'click'); assert.equal(f.slide.lastScroll.left, 1200);
  dispatch(f.next, 'click'); assert.equal(f.slide.lastScroll.left, 0);
  dispatch(f.previous, 'click'); assert.equal(f.slide.lastScroll.left, 1200);
  dispatch(f.dots.children[1], 'click'); assert.equal(f.slide.lastScroll.left, 600);
});
test('keyboard and reduced motion use immediate accessible navigation', () => {
  const f = fixture(false, true);
  assert.equal(dispatch(f.slide, 'keydown', { key: 'ArrowRight' }).defaultPrevented, true);
  assert.equal(f.slide.lastScroll.behavior, 'instant');
  assert.equal(f.photos[1].fetchPriority, 'high');
});
test('photos warm before entering view and respect data saver', () => {
  const f = fixture(); f.enter(); assert.ok(f.photos.every(p => p.loading === 'eager'));
  const saver = fixture(true); saver.enter();
  assert.equal(saver.photos[0].loading, 'eager'); assert.equal(saver.photos[1].loading, 'lazy');
  dispatch(saver.next, 'click'); assert.equal(saver.photos[1].loading, 'eager');
});
test('mouse drag tracks continuously; native touch settling updates pagination', () => {
  const f = fixture();
  dispatch(f.slide, 'pointerdown', { pointerId: 1, isPrimary: true, button: 0, pointerType: 'mouse', clientX: 500 });
  dispatch(f.slide, 'pointermove', { pointerId: 1, clientX: 100 });
  assert.equal(f.slide.scrollLeft, 400);
  dispatch(f.slide, 'pointerup', { pointerId: 1 }); assert.equal(f.slide.lastScroll.left, 600);
  f.slide.scrollLeft = 1200; dispatch(f.slide, 'scrollend');
  assert.equal(f.dots.children[2].attributes.get('aria-current'), 'true');
});
