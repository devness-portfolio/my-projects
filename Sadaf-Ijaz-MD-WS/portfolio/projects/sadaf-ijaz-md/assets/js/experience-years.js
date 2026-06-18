/**
 * experience-years.js
 * Updates years-in-practice copy from a single start year.
 */
class ExperienceYears {
  /**
   * @param {{
   *   selector?: string,
   *   startYear?: number,
   *   date?: Date
   * }} options
   */
  constructor(options = {}) {
    this.selector = options.selector || "[data-experience-years]";
    this.startYear =
      options.startYear || Number(document.body.dataset.experienceStartYear);
    this.date = options.date || new Date();
  }

  start() {
    const currentYear = this.date.getFullYear();
    const years = currentYear - this.startYear;

    if (!Number.isFinite(years) || years < 0) {
      return;
    }

    document.querySelectorAll(this.selector).forEach((element) => {
      element.textContent = years;
    });
  }
}

window.ExperienceYears = ExperienceYears;
