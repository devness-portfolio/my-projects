const HERO_CANVAS_WIDTH = 960;
const HERO_CANVAS_HEIGHT = 540;

function setCurrentYear() {
  const yearTarget = document.querySelector("[data-current-year]");

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }
}

function drawCoverImage(context, image, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;

  context.drawImage(image, x, y, drawWidth, drawHeight);
}

function drawLight(context, x, y, radius, color) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function startHeroBackdropVideo() {
  const video = document.querySelector("[data-hero-video]");
  const usesGeneratedBackdrop = video?.hasAttribute("data-generated-backdrop");
  const hasNativeVideoSource = Boolean(video?.getAttribute("src") || video?.querySelector("source"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canStreamCanvas = typeof HTMLCanvasElement !== "undefined"
    && "captureStream" in HTMLCanvasElement.prototype;

  if (!video || !usesGeneratedBackdrop || hasNativeVideoSource || prefersReducedMotion || !canStreamCanvas) {
    return;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });

  if (!context) {
    return;
  }

  canvas.width = HERO_CANVAS_WIDTH;
  canvas.height = HERO_CANVAS_HEIGHT;

  const poster = new Image();
  poster.decoding = "async";
  poster.src = video.getAttribute("poster") || "assets/hero-shop.png";

  const stream = canvas.captureStream(30);
  video.srcObject = stream;
  video.addEventListener("playing", () => video.classList.add("is-ready"), { once: true });

  let animationFrame = 0;
  let imageReady = false;

  poster.addEventListener("load", () => {
    imageReady = true;
  });

  function renderFrame(now) {
    const seconds = now / 1000;
    const width = canvas.width;
    const height = canvas.height;

    if (imageReady) {
      drawCoverImage(context, poster, width, height);
    } else {
      const base = context.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "#061d33");
      base.addColorStop(0.55, "#115c99");
      base.addColorStop(1, "#c8922c");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);
    }

    context.globalCompositeOperation = "source-over";
    context.fillStyle = "rgba(6, 29, 51, 0.32)";
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "screen";
    drawLight(
      context,
      width * (0.22 + Math.sin(seconds * 0.18) * 0.05),
      height * (0.28 + Math.cos(seconds * 0.24) * 0.07),
      230,
      "rgba(233, 198, 106, 0.26)"
    );
    drawLight(
      context,
      width * (0.78 + Math.cos(seconds * 0.16) * 0.06),
      height * (0.64 + Math.sin(seconds * 0.2) * 0.05),
      280,
      "rgba(17, 92, 153, 0.34)"
    );
    drawLight(
      context,
      width * (0.48 + Math.sin(seconds * 0.12) * 0.08),
      height * (0.42 + Math.cos(seconds * 0.15) * 0.06),
      210,
      "rgba(255, 253, 248, 0.13)"
    );
    context.globalCompositeOperation = "source-over";

    animationFrame = window.requestAnimationFrame(renderFrame);
  }

  video.play().catch(() => {
    stream.getTracks().forEach((track) => track.stop());
  });

  animationFrame = window.requestAnimationFrame(renderFrame);

  window.addEventListener(
    "pagehide",
    () => {
      window.cancelAnimationFrame(animationFrame);
      stream.getTracks().forEach((track) => track.stop());
    },
    { once: true }
  );
}

setCurrentYear();
startHeroBackdropVideo();
