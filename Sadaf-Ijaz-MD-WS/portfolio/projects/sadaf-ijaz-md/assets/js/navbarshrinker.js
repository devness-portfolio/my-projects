/**
 * navbarshrinker.js
 * Toggles the navbar `shrink` class based on the current scroll position.
 */
class NavbarShrinker {
  /**
   * @param {Element|string} navElement - DOM element or selector for the navbar
   * @param {{threshold?: number}} options
   */
  constructor(navElement, options = {}) {
    this.nav =
      typeof navElement === "string"
        ? document.querySelector(navElement)
        : navElement;
    this.threshold = options.threshold ?? 80;
  }

  update() {
    if (!this.nav) return;

    if (window.scrollY > this.threshold) {
      this.nav.classList.add("shrink");
      return;
    }

    this.nav.classList.remove("shrink");
  }
}

window.NavbarShrinker = NavbarShrinker;
