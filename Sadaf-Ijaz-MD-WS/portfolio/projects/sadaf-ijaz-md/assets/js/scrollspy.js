/**
 * scrollspy.js
 * Updates active nav link state based on the section nearest the viewport top.
 */
class ScrollSpy {
  /**
   * @param {string|Element[]} navSelectorOrLinks - selector for nav links or array of link elements
   * @param {{offset?: number}} options
   */
  constructor(navSelectorOrLinks, options = {}) {
    this.navLinks = this.getNavLinks(navSelectorOrLinks);
    this.offset = options.offset ?? 120;
    this.sections = this.getSections();
  }

  getNavLinks(navSelectorOrLinks) {
    if (typeof navSelectorOrLinks === "string") {
      return Array.from(document.querySelectorAll(navSelectorOrLinks));
    }

    if (Array.isArray(navSelectorOrLinks)) {
      return navSelectorOrLinks;
    }

    return [];
  }

  getSections() {
    return this.navLinks
      .map((link) => {
        const href = link.getAttribute("href");
        return href && href.startsWith("#") ? document.querySelector(href) : null;
      })
      .filter(Boolean);
  }

  getCurrentId() {
    const offsetPos = window.scrollY + this.offset;
    let currentId = null;

    for (const section of this.sections) {
      if (offsetPos >= section.offsetTop) {
        currentId = section.id;
      }
    }

    return currentId;
  }

  updateLink(link, currentId) {
    const href = link.getAttribute("href").replace("#", "");
    const isCurrent = href === currentId;

    link.classList.toggle("active", isCurrent);

    if (isCurrent) {
      link.setAttribute("aria-current", "location");
      return;
    }

    link.removeAttribute("aria-current");
  }

  update() {
    const currentId = this.getCurrentId();

    this.navLinks.forEach((link) => {
      this.updateLink(link, currentId);
    });
  }
}

window.ScrollSpy = ScrollSpy;
