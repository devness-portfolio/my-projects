/**
 * motion-preferences.js
 * Applies reduced-motion preferences to media that would otherwise autoplay.
 */
class MotionPreferences {
  /**
   * @param {{
   *   motionQuery?: string,
   *   videoSelector?: string
   * }} options
   */
  constructor(options = {}) {
    this.motionQuery = options.motionQuery || "(prefers-reduced-motion: reduce)";
    this.videoSelector = options.videoSelector || "video[autoplay]";
  }

  start() {
    if (!window.matchMedia(this.motionQuery).matches) return;

    document.querySelectorAll(this.videoSelector).forEach((video) => {
      video.pause();
      video.removeAttribute("autoplay");
    });
  }
}

window.MotionPreferences = MotionPreferences;
