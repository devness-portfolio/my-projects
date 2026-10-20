import setupTheme from "./theme.js";
import setupMatrixIntro from "./matrix-intro.js";

setupTheme();

// Load each feature independently so one failure cannot disable other controls.
function initializeFeature(path) {
  return import(path)
    .then(({ default: setup }) => setup())
    .catch((error) => console.error(`Unable to initialize ${path}`, error));
}

function setupEnhancements() {
  initializeFeature("./hero.js");
}

// Bind controls immediately, including carousel controls before scrolling to them.
initializeFeature("./work.js");
initializeFeature("./terminal.js");
initializeFeature("./ui.js");
initializeFeature("./scroll.js");
initializeFeature("./footer.js");
initializeFeature("./carousel.js");

setupMatrixIntro({ onReveal: setupEnhancements });
