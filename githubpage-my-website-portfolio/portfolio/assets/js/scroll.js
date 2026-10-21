// Resolve IDs without treating a URL fragment as a CSS selector.
export function resolveHashTarget(hash, root) {
  if (!hash || hash === "#") return null;
  try {
    return root.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

export default function setupScrolling({
  root = document,
  view = window,
  selector = 'a[href^="#"]',
  reducedMotion = view.matchMedia("(prefers-reduced-motion: reduce)"),
} = {}) {
  const navigate = (hash, behavior) => {
    const target = resolveHashTarget(hash, root);
    if (!target) return false;
    // Sections need a programmatic focus destination, outside the tab sequence.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior, block: "start" });
    return true;
  };
  root.querySelectorAll(selector).forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.hasAttribute("download") || anchor.getAttribute("target") === "_blank") return;
      const hash = anchor.getAttribute("href");
      if (!resolveHashTarget(hash, root)) return;
      event.preventDefault();
      if (view.location.hash !== hash) view.history.pushState(null, "", hash);
      navigate(hash, reducedMotion.matches ? "instant" : "smooth");
    });
  });
  // Native history remains authoritative; restore both position and focus.
  view.addEventListener("popstate", () => navigate(view.location.hash || "#top", "instant"));
  // Cross-page links arrive before images and layout have finished loading.
  // Restore their destination after load, including focus for keyboard users.
  const restoreDestination = () => navigate(view.location.hash, "instant");
  if (root.readyState === "complete") restoreDestination();
  else view.addEventListener("load", restoreDestination, { once: true });
}
