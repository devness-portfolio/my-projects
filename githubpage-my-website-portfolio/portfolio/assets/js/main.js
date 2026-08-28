import setupTheme from "./theme.js";
import setupMatrixIntro from "./matrix-intro.js";

setupTheme();

let enhancementModules;
let enhancementsStarted = false;

function loadEnhancementModules() {
  enhancementModules ||= Promise.all([
    import("./hero.js"),
    import("./work.js"),
    import("./ui.js"),
    import("./scroll.js"),
    import("./footer.js"),
  ]);
  return enhancementModules;
}

function setupCarouselWhenVisible() {
  const section = document.getElementById("photography");
  if (!section) return;

  const start = async () => {
    const { default: setupCarousel } = await import("./carousel.js");
    setupCarousel();
  };

  if (!("IntersectionObserver" in window)) {
    start();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      start();
    },
    { rootMargin: "600px 0px" },
  );
  observer.observe(section);
}

async function setupEnhancements() {
  if (enhancementsStarted) return;
  enhancementsStarted = true;

  const [hero, work, ui, scroll, footer] = await loadEnhancementModules();
  const setupHero = hero.default;
  const setupWorkDemo = work.default;
  const setupUi = ui.default;
  const setupScrolling = scroll.default;
  const updateFooterYear = footer.default;

  setupHero();
  setupWorkDemo();
  setupUi();
  setupScrolling();
  updateFooterYear();
  setupCarouselWhenVisible();
}

const introActive = setupMatrixIntro({ onReveal: setupEnhancements });

if (introActive) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadEnhancementModules, { timeout: 1200 });
  } else {
    window.setTimeout(loadEnhancementModules, 250);
  }
}
