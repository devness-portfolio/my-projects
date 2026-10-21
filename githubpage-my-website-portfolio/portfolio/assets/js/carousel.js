export const photographyImages = [
  "portfolio/assets/img/photography/dsc00236.jpg",
  "portfolio/assets/img/photography/dsc02115-original.jpg",
  "portfolio/assets/img/photography/dsc02917.jpg",
  "portfolio/assets/img/photography/dsc05837.jpg",
  "portfolio/assets/img/photography/dsc06636.jpg",
];

const photographyImageDisplay = {
  "portfolio/assets/img/photography/dsc00236.jpg": {
    alt: "Night waterfront scene with glowing blue and orange lights",
    fit: "contain",
  },
  "portfolio/assets/img/photography/dsc02115-original.jpg": {
    alt: "Chinatown arch at night framed by a parked car",
    fit: "contain",
  },
  "portfolio/assets/img/photography/dsc02917.jpg": {
    alt: "Washington Monument behind cherry blossoms and water",
    fit: "contain",
  },
  "portfolio/assets/img/photography/dsc05837.jpg": {
    alt: "Lincoln Memorial statue lit in warm orange light",
    fit: "contain",
  },
  "portfolio/assets/img/photography/dsc06636.jpg": {
    alt: "Columns framed by soft white blossoms",
    fit: "contain",
  },
};

function getOptimizedSource(source) {
  return source.replace("/photography/", "/photography/optimized/");
}

function getMobileSource(source) {
  return source.replace("/photography/", "/photography/mobile/");
}

export function getNextIndex(currentIndex, direction, itemCount) {
  if (itemCount <= 0) return 0;
  if (direction === "previous") {
    return currentIndex === 0 ? itemCount - 1 : currentIndex - 1;
  }
  return currentIndex === itemCount - 1 ? 0 : currentIndex + 1;
}

function normalizeImage(image, index) {
  if (typeof image === "string") {
    const optimizedSource = getOptimizedSource(image);
    const mobileSource = getMobileSource(image);
    return {
      alt: `Photography showcase ${index + 1}`,
      fit: "cover",
      position: "center",
      src: optimizedSource,
      srcset: `${mobileSource} 600w, ${optimizedSource} 900w, ${image} 1800w`,
      sizes: "(max-width: 768px) calc(100vw - 2rem), 736px",
      ...photographyImageDisplay[image],
    };
  }

  return {
    alt: `Photography showcase ${index + 1}`,
    fit: "cover",
    position: "center",
    ...image,
  };
}

export default function setupCarousel({
  images = photographyImages,
  imageElement = document.getElementById("carousel-image"),
  previousButton = document.getElementById("prevBtn"),
  nextButton = document.getElementById("nextBtn"),
  dotsContainer = document.querySelector(".carousel-dots"),
} = {}) {
  if (!imageElement || !previousButton || !nextButton || !dotsContainer) return;

  const slideElement = imageElement.closest(".carousel-slide");

  if (images.length === 0) {
    imageElement.alt = "No photography images available";
    previousButton.hidden = true;
    nextButton.hidden = true;
    dotsContainer.hidden = true;
    return;
  }

  let currentIndex = 0;
  const view = imageElement.ownerDocument.defaultView;
  const preloaded = new Map();
  let isNearViewport = false;
  imageElement.draggable = false;

  // Reuse the browser-selected responsive image for the backdrop, avoiding a
  // second request for a differently sized copy of the same photograph.
  function updateBackground() {
    if (!slideElement) return;
    const source = imageElement.currentSrc || imageElement.src;
    slideElement.style.setProperty("--carousel-background", `url("${source}")`);
  }
  imageElement.addEventListener("load", () => {
    updateBackground();
    preloadNext();
  });

  function preloadNext() {
    if (!isNearViewport || images.length < 2 || view.navigator?.connection?.saveData) return;
    const index = getNextIndex(currentIndex, "next", images.length);
    if (preloaded.has(index)) return;
    const source = normalizeImage(images[index], index);
    const preload = new view.Image();
    preloaded.set(index, preload);
    preload.decoding = "async";
    preload.fetchPriority = "low";
    if (source.sizes) preload.sizes = source.sizes;
    if (source.srcset) preload.srcset = source.srcset;
    preload.src = source.src;
  }

  // Start just before the gallery is visible, rather than fetching the whole
  // collection during the initial page load.
  if (slideElement && view.IntersectionObserver) {
    const observer = new view.IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      isNearViewport = true;
      imageElement.loading = "eager";
      preloadNext();
      observer.disconnect();
    }, { rootMargin: "300px" });
    observer.observe(slideElement);
  } else {
    isNearViewport = true;
  }
  dotsContainer.replaceChildren();

  const dots = images.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function updateCarousel() {
    const currentImage = normalizeImage(images[currentIndex], currentIndex);

    if (currentImage.sizes) imageElement.sizes = currentImage.sizes;
    else imageElement.removeAttribute("sizes");
    if (currentImage.srcset) imageElement.srcset = currentImage.srcset;
    else imageElement.removeAttribute("srcset");
    imageElement.src = currentImage.src;
    imageElement.alt = currentImage.alt;
    imageElement.style.objectFit = currentImage.fit;
    imageElement.style.objectPosition = currentImage.position;

    if (slideElement) {
      slideElement.classList.toggle(
        "carousel-slide-contained",
        currentImage.fit === "contain",
      );
      slideElement.style.removeProperty("--carousel-background");
      if (imageElement.complete && imageElement.naturalWidth) updateBackground();
    }

    if (isNearViewport) preloadNext();
    dotsContainer.setAttribute("aria-label", `Photo ${currentIndex + 1} of ${images.length}`);
    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function navigate(direction) {
    currentIndex = getNextIndex(currentIndex, direction, images.length);
    updateCarousel();
  }

  if (slideElement) {
    slideElement.tabIndex = 0;
    slideElement.setAttribute("role", "group");
    slideElement.setAttribute("aria-roledescription", "carousel");
    slideElement.setAttribute("aria-label", "Photography. Swipe or use left and right arrow keys to browse.");
    slideElement.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      navigate(event.key === "ArrowLeft" ? "previous" : "next");
    });
    let gesture = null;
    slideElement.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
      slideElement.setPointerCapture(event.pointerId);
    });
    slideElement.addEventListener("pointerup", (event) => {
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      gesture = null;
      if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        navigate(dx < 0 ? "next" : "previous");
      }
    });
    const cancelGesture = () => { gesture = null; };
    slideElement.addEventListener("pointercancel", cancelGesture);
    slideElement.addEventListener("lostpointercapture", cancelGesture);
  }

  previousButton.addEventListener("click", () => {
    currentIndex = getNextIndex(currentIndex, "previous", images.length);
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = getNextIndex(currentIndex, "next", images.length);
    updateCarousel();
  });

  updateCarousel();
}
