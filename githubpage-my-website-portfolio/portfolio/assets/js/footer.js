export default function updateFooterYear({
  yearElement = document.getElementById("current-year"),
  now = new Date(),
} = {}) {
  if (!yearElement) return;

  yearElement.textContent = String(now.getFullYear());
}
