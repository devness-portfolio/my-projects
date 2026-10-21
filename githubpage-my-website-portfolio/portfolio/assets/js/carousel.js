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

const imageSizes = "(max-width: 768px) calc(100vw - 2 * clamp(1rem, 3vw, 2rem) - 2px), 734px";

function getResponsiveSource(source, size) {
  return source.replace("/photography/", "/photography/responsive/").replace(/\.jpg$/, `-${size}.webp`);
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
    const mobileSource = getResponsiveSource(image, 480);
    return {
      alt: `Photography showcase ${index + 1}`,
      fit: "cover",
      position: "center",
      src: mobileSource,
      srcset: [480, 800, 1200, 1600].map((width) => `${getResponsiveSource(image, width)} ${width}w`).join(", "),
      sizes: imageSizes,
      backdrop: getResponsiveSource(image, "backdrop"),
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
  let requestedIndex = 0;
  let requestVersion = 0;
  let isNearViewport = false;
  imageElement.draggable = false;

  // Cache loaded AND decoded images; failed requests are evicted so users can retry.
  function prepareImage(index, priority = "low") {
    const cached = preloaded.get(index);
    if (cached) {
      if (priority === "high") cached.image.fetchPriority = "high";
      return cached.ready;
    }
    const source = normalizeImage(images[index], index);
    const image = new view.Image();
    image.decoding = "async";
    image.fetchPriority = priority;
    const ready = new Promise((resolve, reject) => {
      image.onload = async () => {
        try {
          if (image.decode) await image.decode();
          resolve(image);
        } catch (error) { reject(error); }
      };
      image.onerror = () => reject(new Error(`Unable to load photo ${index + 1}`));
    }).catch((error) => {
      preloaded.delete(index);
      throw error;
    });
    preloaded.set(index, { image, ready });
    if (source.sizes) image.sizes = source.sizes;
    if (source.srcset) image.srcset = source.srcset;
    image.src = source.src;
    return ready;
  }

  function preloadNeighbors() {
    if (!isNearViewport || images.length < 2 || view.navigator?.connection?.saveData) return;
    for (const direction of ["previous", "next"]) {
      const index = getNextIndex(currentIndex, direction, images.length);
      prepareImage(index).catch(() => {});
    }
  }

  // Give both neighbors a head start without competing with the initial page load.
  if (slideElement && view.IntersectionObserver) {
    const observer = new view.IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      isNearViewport = true;
      imageElement.loading = "eager";
      preloadNeighbors();
      observer.disconnect();
    }, { rootMargin: "1000px" });
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
      selectPhoto(index);
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function updateCarousel() {
    const currentImage = normalizeImage(images[currentIndex], currentIndex);

    // Use the same responsive selection as the decoded preload, including after resize.
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
      if (currentImage.backdrop) {
        slideElement.style.setProperty("--carousel-background", `url("${currentImage.backdrop}")`);
      } else slideElement.style.removeProperty("--carousel-background");
    }

    preloadNeighbors();
    dotsContainer.setAttribute("aria-label", `Photo ${currentIndex + 1} of ${images.length}`);
    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  async function selectPhoto(index) {
    requestedIndex = index;
    const version = ++requestVersion;
    slideElement?.setAttribute("aria-busy", "true");
    try {
      await prepareImage(index, "high");
      // Rapid clicks/swipes must never let an older request overwrite the latest target.
      if (version !== requestVersion) return;
      currentIndex = index;
      updateCarousel();
    } catch {
      if (version !== requestVersion) return;
      requestedIndex = currentIndex;
      // Keep the last successfully displayed image when a request fails.
    } finally {
      if (version === requestVersion) slideElement?.setAttribute("aria-busy", "false");
    }
  }

  function navigate(direction) {
    selectPhoto(getNextIndex(requestedIndex, direction, images.length));
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
    navigate("previous");
  });

  nextButton.addEventListener("click", () => {
    navigate("next");
  });

  updateCarousel();
}
