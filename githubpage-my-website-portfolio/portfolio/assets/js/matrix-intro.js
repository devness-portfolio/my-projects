const MATRIX_GLYPHS =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}/*+=-アイウエオカキクケコサシスセソタチツテト";
const INTRO_SEEN_KEY = "portfolio-intro-seen";

function hasSeenIntro(storage) {
  try {
    return storage.getItem(INTRO_SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

function markIntroSeen(storage) {
  try {
    storage.setItem(INTRO_SEEN_KEY, "true");
  } catch {
    // Storage can be unavailable in private or locked-down browsing contexts.
  }
}

function createRain(canvas, reducedMotion) {
  const context = canvas.getContext("2d");
  if (!context) return { warp() {}, stop() {} };

  let frameId;
  let columns = [];
  let fontSize = 16;
  let lastFrame = 0;
  let isWarping = false;
  let stopped = false;

  const resize = () => {
    const density = window.innerWidth < 600
      ? 1
      : Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(window.innerWidth * density);
    canvas.height = Math.floor(window.innerHeight * density);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(density, 0, 0, density, 0, 0);
    fontSize = window.innerWidth < 600 ? 13 : 16;
    const count = Math.ceil(window.innerWidth / fontSize);
    columns = Array.from({ length: count }, (_, index) => ({
      x: index * fontSize,
      y: Math.random() * -window.innerHeight,
      speed: 0.65 + Math.random() * 1.35,
      length: 8 + Math.floor(Math.random() * 18),
    }));
    context.fillStyle = "#020604";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  };

  const draw = (time = 0) => {
    if (stopped) return;
    if (time - lastFrame < (isWarping ? 20 : 42)) {
      frameId = window.requestAnimationFrame(draw);
      return;
    }
    lastFrame = time;

    context.fillStyle = isWarping ? "rgba(2, 6, 4, 0.12)" : "rgba(2, 6, 4, 0.11)";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.font = `${fontSize}px "DM Mono", monospace`;
    context.textAlign = "center";

    columns.forEach((column) => {
      const speedBoost = isWarping ? 15 : 1;
      const head = Math.floor(column.y / fontSize);

      for (let trail = 0; trail < column.length; trail += 1) {
        const y = (head - trail) * fontSize;
        if (y < -fontSize || y > window.innerHeight + fontSize) continue;
        const glyph = MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
        const opacity = Math.max(0.06, 1 - trail / column.length);
        context.fillStyle = trail === 0
          ? `rgba(225, 255, 238, ${opacity})`
          : `rgba(65, 255, 145, ${opacity * 0.78})`;
        context.fillText(glyph, column.x, y);
      }

      column.y += fontSize * column.speed * speedBoost;
      if (column.y - column.length * fontSize > window.innerHeight) {
        column.y = Math.random() * -240;
        column.speed = 0.65 + Math.random() * 1.35;
      }
    });

    frameId = window.requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);
  if (!reducedMotion.matches) frameId = window.requestAnimationFrame(draw);

  return {
    warp() {
      isWarping = true;
    },
    stop() {
      stopped = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    },
  };
}

export default function setupMatrixIntro({
  intro = document.querySelector("[data-matrix-intro]"),
  canvas = document.querySelector("[data-matrix-canvas]"),
  form = document.querySelector("[data-matrix-form]"),
  input = document.querySelector("#visitor-name"),
  message = document.querySelector("[data-matrix-message]"),
  skip = document.querySelector("[data-matrix-skip]"),
  welcome = document.querySelector("[data-matrix-welcome]"),
  heroGreeting = document.querySelector("[data-visitor-greeting]"),
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"),
  storage = window.sessionStorage,
  onReveal = () => {},
} = {}) {
  if (!intro || !canvas || !form || !input || !skip) {
    document.body.classList.remove("intro-active");
    onReveal();
    return false;
  }

  if (window.matchMedia("(max-width: 680px)").matches) {
    intro.classList.add("is-complete");
    intro.setAttribute("aria-hidden", "true");
    document.body.classList.remove("intro-active");
    onReveal();
    return false;
  }

  if (hasSeenIntro(storage)) {
    intro.classList.add("is-complete");
    intro.setAttribute("aria-hidden", "true");
    document.body.classList.remove("intro-active");
    onReveal();
    return false;
  }

  const rain = createRain(canvas, reducedMotion);
  let exiting = false;
  const pageRegions = [
    document.querySelector(".site-header"),
    document.querySelector("main"),
    document.querySelector(".site-footer"),
  ].filter(Boolean);
  pageRegions.forEach((region) => { region.inert = true; });

  const finishReveal = () => {
    intro.classList.add("is-complete");
    intro.setAttribute("aria-hidden", "true");
    document.body.classList.remove("intro-active");
    pageRegions.forEach((region) => { region.inert = false; });
    rain.stop();
    document.querySelector("#hero-title")?.focus({ preventScroll: true });
    onReveal();
  };

  const revealPortfolio = (name = "") => {
    if (exiting) return;
    exiting = true;

    const safeName = name.trim().replace(/\s+/g, " ").slice(0, 40);
    if (safeName && welcome) welcome.textContent = `Welcome, ${safeName}.`;
    if (safeName && heroGreeting) {
      heroGreeting.textContent = `Welcome, ${safeName} /`;
      heroGreeting.hidden = false;
    }
    markIntroSeen(storage);

    if (reducedMotion.matches) {
      finishReveal();
      return;
    }

    rain.warp();
    intro.classList.add("is-warping");
    window.setTimeout(finishReveal, 800);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (!name) {
      if (message) message.textContent = "Enter your name to continue.";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    input.removeAttribute("aria-invalid");
    if (message) message.textContent = "Access granted.";
    revealPortfolio(name);
  });

  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    if (message) message.textContent = "";
  });
  skip.addEventListener("click", () => revealPortfolio());
  window.setTimeout(() => input.focus(), 350);
  return true;
}
