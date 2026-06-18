/**
 * hero-petals.js
 * Adds a desktop-only falling cherry blossom petal layer to the hero.
 */
class HeroPetals {
  /**
   * @param {{
   *   heroSelector?: string,
   *   desktopQuery?: string,
   *   motionQuery?: string,
   *   petalCount?: number
   * }} options
   */
  constructor(options = {}) {
    this.hero = document.querySelector(options.heroSelector || ".hero");
    this.desktopQuery = window.matchMedia(
      options.desktopQuery || "(min-width: 901px)",
    );
    this.motionQuery = window.matchMedia(
      options.motionQuery || "(prefers-reduced-motion: reduce)",
    );
    this.petalCount = options.petalCount || 34;
    this.layer = null;
    this.handlePreferenceChange = this.handlePreferenceChange.bind(this);
  }

  shouldRender() {
    return this.hero && this.desktopQuery.matches && !this.motionQuery.matches;
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  createPetal(index) {
    const petal = document.createElement("span");
    const startX = this.randomBetween(-8, 106);
    const drift = this.randomBetween(-22, 22);
    const midX = startX + drift * this.randomBetween(0.28, 0.72);
    const endX = startX + drift;
    const duration = this.randomBetween(10, 18);

    petal.className = "hero-petal";
    petal.style.setProperty("--start-x", `${startX.toFixed(2)}vw`);
    petal.style.setProperty("--mid-x", `${midX.toFixed(2)}vw`);
    petal.style.setProperty("--end-x", `${endX.toFixed(2)}vw`);
    petal.style.setProperty(
      "--petal-size",
      `${this.randomBetween(12, 28).toFixed(2)}px`,
    );
    petal.style.setProperty("--fall-duration", `${duration.toFixed(2)}s`);
    petal.style.setProperty(
      "--fall-delay",
      `${this.randomBetween(-duration, 0).toFixed(2)}s`,
    );
    petal.style.setProperty(
      "--petal-opacity",
      this.randomBetween(0.42, 0.86).toFixed(2),
    );
    petal.style.setProperty(
      "--petal-blur",
      `${this.randomBetween(0, 1.7).toFixed(2)}px`,
    );
    petal.style.setProperty(
      "--start-rotation",
      `${this.randomBetween(-80, 80).toFixed(2)}deg`,
    );
    petal.style.setProperty(
      "--mid-rotation",
      `${this.randomBetween(150, 420).toFixed(2)}deg`,
    );
    petal.style.setProperty(
      "--end-rotation",
      `${this.randomBetween(520, 880).toFixed(2)}deg`,
    );
    petal.style.setProperty(
      "--flutter-duration",
      `${this.randomBetween(2.4, 4.8).toFixed(2)}s`,
    );
    petal.style.setProperty(
      "--flutter-delay",
      `${this.randomBetween(-4, 0).toFixed(2)}s`,
    );
    petal.style.setProperty(
      "--petal-scale",
      this.randomBetween(0.72, 1.18).toFixed(2),
    );
    petal.style.setProperty("--petal-depth", index % 3 === 0 ? "0.72" : "1");

    return petal;
  }

  buildLayer() {
    const layer = document.createElement("div");
    layer.className = "hero-petals";
    layer.setAttribute("aria-hidden", "true");

    Array.from({ length: this.petalCount }).forEach((_, index) => {
      layer.appendChild(this.createPetal(index));
    });

    this.hero.appendChild(layer);
    this.layer = layer;
  }

  destroyLayer() {
    if (!this.layer) return;

    this.layer.remove();
    this.layer = null;
  }

  refresh() {
    if (this.shouldRender()) {
      if (!this.layer) this.buildLayer();
      return;
    }

    this.destroyLayer();
  }

  listenToQuery(query) {
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", this.handlePreferenceChange);
      return;
    }

    if (typeof query.addListener === "function") {
      query.addListener(this.handlePreferenceChange);
    }
  }

  handlePreferenceChange() {
    this.refresh();
  }

  start() {
    this.refresh();
    this.listenToQuery(this.desktopQuery);
    this.listenToQuery(this.motionQuery);
  }
}

window.HeroPetals = HeroPetals;

if (typeof module !== "undefined" && module.exports) {
  module.exports = HeroPetals;
}
