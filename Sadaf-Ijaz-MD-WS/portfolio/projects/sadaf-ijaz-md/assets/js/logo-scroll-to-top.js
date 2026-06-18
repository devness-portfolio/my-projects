/**
 * logo-scroll-to-top.js
 * Smoothly scrolls to the top when the home-page logo is clicked.
 */
class LogoScrollToTop {
  /**
   * @param {{
   *   logoSelector?: string,
   *   motionQuery?: string,
   *   minDuration?: number,
   *   maxDuration?: number,
   *   distanceFactor?: number
   * }} options
   */
  constructor(options = {}) {
    this.logo = document.querySelector(options.logoSelector || ".logo");
    this.motionQuery = options.motionQuery || "(prefers-reduced-motion: reduce)";
    this.minDuration = options.minDuration || 360;
    this.maxDuration = options.maxDuration || 700;
    this.distanceFactor = options.distanceFactor || 0.45;
    this.animationFrame = null;
    this.savedScrollBehavior = null;
  }

  normalizeHomePath(pathname) {
    return pathname.replace(/\/index\.html$/i, "/");
  }

  isPlainLeftClick(event) {
    return (
      !event.defaultPrevented &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    );
  }

  isSameHomePage(targetUrl, currentUrl) {
    return (
      targetUrl.origin === currentUrl.origin &&
      this.normalizeHomePath(targetUrl.pathname) ===
        this.normalizeHomePath(currentUrl.pathname)
    );
  }

  easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  }

  restoreScrollBehavior() {
    if (this.savedScrollBehavior === null) return;

    document.documentElement.style.scrollBehavior = this.savedScrollBehavior;
    this.savedScrollBehavior = null;
  }

  cancelScrollAnimation() {
    if (!this.animationFrame) return;

    window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
    this.restoreScrollBehavior();
  }

  finishScroll() {
    window.scrollTo(0, 0);
    this.animationFrame = null;
    this.restoreScrollBehavior();
  }

  updateHistory(targetUrl, currentUrl) {
    if (targetUrl.href === currentUrl.href) return;

    try {
      window.history.pushState(null, "", targetUrl.pathname + targetUrl.search);
    } catch {
      // Local file previews can reject History API updates.
    }
  }

  scrollToTop() {
    const startY = window.scrollY;

    this.cancelScrollAnimation();

    if (startY <= 0 || window.matchMedia(this.motionQuery).matches) {
      window.scrollTo(0, 0);
      return;
    }

    const duration = Math.min(
      this.maxDuration,
      Math.max(this.minDuration, startY * this.distanceFactor),
    );
    const startTime = window.performance.now();

    this.savedScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    const step = (currentTime) => {
      const elapsed = Math.min((currentTime - startTime) / duration, 1);
      const eased = this.easeOutCubic(elapsed);

      window.scrollTo(0, Math.round(startY * (1 - eased)));

      if (elapsed < 1) {
        this.animationFrame = window.requestAnimationFrame(step);
        return;
      }

      this.finishScroll();
    };

    this.animationFrame = window.requestAnimationFrame(step);
  }

  handleClick(event) {
    if (!this.isPlainLeftClick(event)) return;

    const targetUrl = new URL(this.logo.href, window.location.href);
    const currentUrl = new URL(window.location.href);

    if (!this.isSameHomePage(targetUrl, currentUrl)) return;

    event.preventDefault();
    this.updateHistory(targetUrl, currentUrl);
    this.scrollToTop();
  }

  start() {
    if (!this.logo) return;

    this.logo.addEventListener("click", (event) => {
      this.handleClick(event);
    });
  }
}

window.LogoScrollToTop = LogoScrollToTop;
