/**
 * form.js
 * Lightweight contact form fallback.
 *
 * The site does not currently include a backend form endpoint, so this turns
 * the form into a pre-filled email instead of allowing a dead submit.
 */
class ContactForm {
  /**
   * @param {{
   *   formSelector?: string,
   *   statusSelector?: string,
   *   recipient?: string
   * }} options
   */
  constructor(options = {}) {
    this.form = document.querySelector(options.formSelector || "#contactForm");
    this.status = document.querySelector(options.statusSelector || "#formStatus");
    this.recipient = options.recipient || "info@sadafijazmd.com";
  }

  getServiceLabel(interest) {
    return (
      this.form.querySelector(`#service-interest option[value="${interest}"]`)
        ?.textContent || "Not specified"
    );
  }

  getMailtoUrl(formData) {
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const interest = String(formData.get("service-interest") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const serviceLabel = this.getServiceLabel(interest);
    const subject = encodeURIComponent(`New inquiry from ${name || "website"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Interested in: ${serviceLabel}`,
        "",
        message,
      ].join("\n"),
    );

    return `mailto:${this.recipient}?subject=${subject}&body=${body}`;
  }

  handleSubmit(event) {
    event.preventDefault();

    window.location.href = this.getMailtoUrl(new FormData(this.form));

    if (this.status) {
      this.status.textContent = "Opening your email app to finish sending.";
    }
  }

  start() {
    if (!this.form) return;

    this.form.addEventListener("submit", (event) => {
      this.handleSubmit(event);
    });
  }
}

window.ContactForm = ContactForm;
