/**
 * mobile-navigation.js
 * Controls the mobile navigation menu open/close state.
 */
class MobileNavigation {
  /**
   * @param {{
   *   toggleSelector?: string,
   *   navSelector?: string,
   *   desktopQuery?: string
   * }} options
   */
  constructor(options = {}) {
    this.toggle = document.querySelector(options.toggleSelector || "#mobileMenu");
    this.navLinks = document.querySelector(options.navSelector || "#navLinks");
    this.desktopQuery = options.desktopQuery || "(min-width: 1101px)";
  }

  setOpen(isOpen) {
    if (!this.toggle || !this.navLinks) return;

    this.toggle.setAttribute("aria-expanded", String(isOpen));
    this.toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
    this.navLinks.classList.toggle("is-open", isOpen);
  }

  start() {
    if (!this.toggle || !this.navLinks) return;

    this.toggle.addEventListener("click", () => {
      this.setOpen(this.toggle.getAttribute("aria-expanded") !== "true");
    });

    this.navLinks.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        this.setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.setOpen(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia(this.desktopQuery).matches) {
        this.setOpen(false);
      }
    });
  }
}

window.MobileNavigation = MobileNavigation;
