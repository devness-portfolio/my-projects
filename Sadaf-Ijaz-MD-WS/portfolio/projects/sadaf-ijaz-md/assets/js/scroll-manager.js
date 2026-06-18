/**
 * scroll-manager.js
 * Centralizes scroll event handling and calls `update()` on registered objects.
 */
class ScrollManager {
  /**
   * @param {Array<{update: Function}>} updatables
   */
  constructor(updatables = []) {
    this.updatables = (updatables || []).filter(Boolean);
    this.ticking = false;
    this.handler = null;
  }

  onScroll() {
    for (const updatable of this.updatables) {
      if (updatable && typeof updatable.update === "function") {
        try {
          updatable.update();
        } catch (error) {
          console.error("ScrollManager: update() error", error);
        }
      }
    }
  }

  requestUpdate() {
    if (this.ticking) return;

    window.requestAnimationFrame(() => {
      this.onScroll();
      this.ticking = false;
    });
    this.ticking = true;
  }

  start() {
    if (this.handler) return;

    this.handler = () => {
      this.requestUpdate();
    };
    window.addEventListener("scroll", this.handler, { passive: true });
    this.onScroll();
  }

  stop() {
    if (!this.handler) return;

    window.removeEventListener("scroll", this.handler);
    this.handler = null;
    this.ticking = false;
  }
}

window.ScrollManager = ScrollManager;
