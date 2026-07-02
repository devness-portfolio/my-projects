export default function setupScrolling({
  root = document,
  selector = '.main-nav a[href^="#"], .brand[href^="#"]',
} = {}) {
  root.querySelectorAll(selector).forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      const targetElement = targetId ? root.querySelector(targetId) : null;

      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth" });
    });
  });
}
