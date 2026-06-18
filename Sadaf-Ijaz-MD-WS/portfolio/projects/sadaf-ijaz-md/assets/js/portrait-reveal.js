/**
 * portrait-reveal.js
 * Initializes fade-in blur-up reveal behavior for portrait elements.
 */
class PortraitReveal {
  /**
   * @param {{
   *   root?: ParentNode,
   *   window?: Window,
   *   selector?: string,
   *   readyClass?: string,
   *   visibleClass?: string,
   *   motionQuery?: string,
   *   observerOptions?: IntersectionObserverInit,
   *   IntersectionObserver?: typeof window.IntersectionObserver
   * }} options
   */
  constructor(options = {}) {
    this.root = options.root || document;
    this.window = options.window || window;
    this.selector = options.selector || ".portrait-reveal";
    this.readyClass = options.readyClass || "is-ready";
    this.visibleClass = options.visibleClass || "is-visible";
    this.motionQuery = options.motionQuery || "(prefers-reduced-motion: reduce)";
    this.observerOptions = options.observerOptions || {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.22,
    };
    this.Observer =
      options.IntersectionObserver || this.window.IntersectionObserver;
    this.elements = [];
    this.observer = null;
    this.active = false;
  }

  prefersReducedMotion() {
    return (
      typeof this.window.matchMedia === "function" &&
      this.window.matchMedia(this.motionQuery).matches
    );
  }

  collectElements() {
    this.elements =
      this.root && typeof this.root.querySelectorAll === "function"
        ? Array.from(this.root.querySelectorAll(this.selector))
        : [];
  }

  revealEntry(entry, observer) {
    if (!entry.isIntersecting) return;

    entry.target.classList.add(this.visibleClass);
    observer.unobserve(entry.target);
  }

  disconnect() {
    if (this.observer && typeof this.observer.disconnect === "function") {
      this.observer.disconnect();
    }
  }

  start() {
    this.collectElements();

    if (
      !this.elements.length ||
      this.prefersReducedMotion() ||
      typeof this.Observer !== "function"
    ) {
      return;
    }

    this.elements.forEach((element) => {
      element.classList.add(this.readyClass);
    });

    this.observer = new this.Observer((entries, observer) => {
      entries.forEach((entry) => {
        this.revealEntry(entry, observer);
      });
    }, this.observerOptions);

    this.elements.forEach((element) => {
      this.observer.observe(element);
    });

    this.active = true;
  }
}

window.PortraitReveal = PortraitReveal;

if (typeof module !== "undefined" && module.exports) {
  module.exports = PortraitReveal;
}
