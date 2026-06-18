/**
 * hero-video-control.js
 * Handles the hero background video play/pause button.
 */
class HeroVideoControl {
  /**
   * @param {{
   *   videoSelector?: string,
   *   toggleSelector?: string
   * }} options
   */
  constructor(options = {}) {
    this.video = document.querySelector(options.videoSelector || ".hero-video");
    this.toggle = document.querySelector(
      options.toggleSelector || "[data-video-toggle]",
    );
  }

  setPlayingState(isPlaying) {
    if (!this.toggle) return;

    this.toggle.classList.toggle("is-paused", !isPlaying);
    this.toggle.setAttribute(
      "aria-label",
      isPlaying ? "Pause background video" : "Play background video",
    );
  }

  togglePlayback() {
    if (!this.video) return;

    if (this.video.paused) {
      const playPromise = this.video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          this.setPlayingState(false);
        });
      }
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
  }
}

window.HeroVideoControl = HeroVideoControl;
