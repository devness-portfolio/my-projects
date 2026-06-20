/**
 * hero-video-control.js
 * Handles the hero background video play/pause button.
 */
class HeroVideoControl {
  /**
   * @param {{
   *   videoSelector?: string,
   *   toggleSelector?: string,
   *   motionQuery?: string,
   *   autoplayQuery?: string,
   *   loadDelay?: number
   * }} options
   */
  constructor(options = {}) {
    this.video = document.querySelector(options.videoSelector || ".hero-video");
    this.toggle = document.querySelector(
      options.toggleSelector || "[data-video-toggle]",
    );
    this.sources = this.video
      ? Array.from(this.video.querySelectorAll("source"))
      : [];
    this.motionQuery = options.motionQuery || "(prefers-reduced-motion: reduce)";
    this.autoplayQuery = options.autoplayQuery || "(min-width: 769px)";
    this.loadDelay = options.loadDelay ?? 350;
  }

  setPlayingState(isPlaying) {
    if (!this.toggle) return;

    this.toggle.classList.toggle("is-paused", !isPlaying);
    this.toggle.setAttribute(
      "aria-label",
      isPlaying ? "Pause background video" : "Play background video",
    );
  }

  hasSource() {
    return (
      Boolean(this.video.currentSrc || this.video.getAttribute("src")) ||
      this.sources.some((source) => source.getAttribute("src"))
    );
  }

  prefersReducedMotion() {
    return window.matchMedia(this.motionQuery).matches;
  }

  canAutoload() {
    return (
      this.video &&
      this.video.hasAttribute("autoplay") &&
      !this.prefersReducedMotion() &&
      window.matchMedia(this.autoplayQuery).matches
    );
  }

  loadVideo() {
    if (!this.video || this.hasSource()) return;

    this.sources.forEach((source) => {
      const src = source.dataset.src;
      if (src) source.setAttribute("src", src);
    });

    this.video.load();
  }

  playVideo() {
    if (!this.video) return;

    const playPromise = this.video.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        this.setPlayingState(false);
      });
    }
  }

  scheduleAutoload() {
    if (!this.canAutoload()) return;

    const autoload = () => {
      window.setTimeout(() => {
        if (!this.canAutoload()) return;

        this.loadVideo();
        this.playVideo();
      }, this.loadDelay);
    };

    if (document.readyState === "complete") {
      autoload();
      return;
    }

    window.addEventListener("load", autoload, { once: true });
  }

  togglePlayback() {
    if (!this.video) return;

    if (this.video.paused) {
      this.loadVideo();
      this.playVideo();
      return;
    }

    this.video.pause();
    this.video.removeAttribute("autoplay");
  }

  start() {
    if (!this.video || !this.toggle) return;

    this.toggle.addEventListener("click", () => {
      this.togglePlayback();
    });

    this.video.addEventListener("play", () => this.setPlayingState(true));
    this.video.addEventListener("pause", () => this.setPlayingState(false));
    this.setPlayingState(!this.video.paused);
    this.scheduleAutoload();
  }
}

window.HeroVideoControl = HeroVideoControl;
