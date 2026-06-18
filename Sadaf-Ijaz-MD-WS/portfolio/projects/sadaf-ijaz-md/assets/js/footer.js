/**
 * footer.js
 * Updates footer year elements.
 */
class FooterYear {
  /**
   * @param {{
   *   selector?: string,
   *   date?: Date
   * }} options
   */
  constructor(options = {}) {
    this.selector = options.selector || ".year";
    this.date = options.date || new Date();
  }

  start() {
    const currentYear = this.date.getFullYear();

    document.querySelectorAll(this.selector).forEach((element) => {
      element.textContent = currentYear;
    });
  }
}

window.FooterYear = FooterYear;
