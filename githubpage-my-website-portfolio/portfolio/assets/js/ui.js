function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  return Promise.resolve();
}

function setupCopyEmail(root) {
  root.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const label = button.querySelector("span");
      try {
        await copyText(button.dataset.copyEmail);
        if (label) label.textContent = "Email copied";
        button.classList.add("is-copied");
        window.setTimeout(() => {
          if (label) label.textContent = "Copy email";
          button.classList.remove("is-copied");
        }, 1800);
      } catch {
        window.location.href = `mailto:${button.dataset.copyEmail}`;
      }
    });
  });
}

function setupReveal(root, reducedMotion) {
  const targets = [...root.querySelectorAll("main > .content-section")];
  if (!targets.length || reducedMotion.matches || !("IntersectionObserver" in window)) return;

  document.body.classList.add("reveal-ready");
  targets.forEach((target) => target.classList.add("reveal-target"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10%", threshold: 0.08 },
  );

  targets.forEach((target) => observer.observe(target));
}

function setupNavigationState(root) {
  const links = [...root.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = links
    .map((link) => root.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!links.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      links.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-25% 0px -60%", threshold: [0, 0.2, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
}

function setupScrollProgress() {
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupCompactHeader(root) {
  const header = root.querySelector(".site-header");
  if (!header) return;

  let ticking = false;
  const update = () => {
    header.classList.toggle("is-compact", window.scrollY > 48);
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
}

function setupMobileNavigation(root) {
  const header = root.querySelector(".site-header");
  const toggle = header?.querySelector(".nav-toggle");
  const navigation = header?.querySelector(".main-nav");
  if (!header || !toggle || !navigation) return;

  const toggleLabel = toggle.querySelector(".sr-only");
  const mobileViewport = window.matchMedia("(max-width: 680px)");

  const setOpen = (open) => {
    const shouldOpen = Boolean(open && mobileViewport.matches);
    header.classList.toggle("nav-open", shouldOpen);
    toggle.setAttribute("aria-expanded", String(shouldOpen));
    if (toggleLabel) toggleLabel.textContent = shouldOpen ? "Close menu" : "Open menu";
  };

  document.body.classList.add("mobile-nav-ready");
  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !header.classList.contains("nav-open")) return;
    setOpen(false);
    toggle.focus();
  });

  document.addEventListener("click", (event) => {
    if (!header.classList.contains("nav-open") || header.contains(event.target)) return;
    setOpen(false);
  });

  const handleViewportChange = () => setOpen(false);
  if (mobileViewport.addEventListener) {
    mobileViewport.addEventListener("change", handleViewportChange);
  } else {
    mobileViewport.addListener?.(handleViewportChange);
  }
}

export default function setupUi({
  root = document,
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"),
} = {}) {
  setupCopyEmail(root);
  setupReveal(root, reducedMotion);
  setupNavigationState(root);
  setupScrollProgress();
  setupCompactHeader(root);
  setupMobileNavigation(root);
}
