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

  const doc = imageElement.ownerDocument;
  const view = doc.defaultView;
  let currentIndex = 0;
  const reducedMotion = () => view.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const panels = [];
  const photos = [];
  dotsContainer.replaceChildren();
  const dots = images.map((_, index) => {
    const dot = doc.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.addEventListener("click", () => selectPhoto(index));
    dotsContainer.appendChild(dot);
    return dot;
  });

  // Keep each photo mounted: navigation never waits on a download or decode.
  images.forEach((entry, index) => {
    const source = normalizeImage(entry, index);
    const panel = doc.createElement("div");
    panel.className = "carousel-panel";
    panel.setAttribute("role", "group");
    panel.setAttribute("aria-label", `Photo ${index + 1} of ${images.length}`);
    if (source.backdrop) panel.style.setProperty("--carousel-background", `url("${source.backdrop}")`);
    const photo = index === 0 ? imageElement : doc.createElement("img");
    photo.loading = "lazy";
    photo.decoding = "async";
    photo.draggable = false;
    if (source.sizes) photo.sizes = source.sizes;
    if (source.srcset) photo.srcset = source.srcset;
    photo.src = source.src;
    photo.alt = source.alt;
    photo.style.objectFit = source.fit;
    photo.style.objectPosition = source.position;
    panel.appendChild(photo);
    slideElement.appendChild(panel);
    panels.push(panel);
    photos.push(photo);
  });

  function updatePagination(index) {
    currentIndex = index;
    dotsContainer.setAttribute("aria-label", `Photo ${index + 1} of ${images.length}`);
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-current", String(i === index));
    });
  }
  function selectPhoto(index) {
    updatePagination(index);
    photos[index].loading = "eager";
    photos[index].fetchPriority = "high";
    slideElement.scrollTo({ left: index * slideElement.clientWidth, behavior: reducedMotion() ? "instant" : "smooth" });
  }
  function navigate(direction) {
    selectPhoto(getNextIndex(currentIndex, direction, images.length));
  }
  // Native scrolling provides finger tracking, momentum, and interruptible snapping.
  slideElement.classList.add("carousel-track");
  slideElement.tabIndex = 0;
  slideElement.setAttribute("role", "region");
  slideElement.setAttribute("aria-roledescription", "carousel");
  slideElement.setAttribute("aria-label", "Photography. Swipe or use left and right arrow keys to browse.");
  let scrollTimer;
  function settleScroll() {
    if (!slideElement.clientWidth) return;
    updatePagination(Math.max(0, Math.min(images.length - 1, Math.round(slideElement.scrollLeft / slideElement.clientWidth))));
  }
  slideElement.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(settleScroll, 180);
    if (!slideElement.clientWidth) return;
    const index = Math.max(0, Math.min(images.length - 1, Math.round(slideElement.scrollLeft / slideElement.clientWidth)));
    // Do not let intermediate scroll frames overwrite rapid button targets.
    if (gesture) updatePagination(index);
  }, { passive: true });
  slideElement.addEventListener("scrollend", () => {
    clearTimeout(scrollTimer);
    settleScroll();
  });
  slideElement.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    navigate(event.key === "ArrowLeft" ? "previous" : "next");
  });
  let gesture = null;
  slideElement.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    gesture = { id: event.pointerId, x: event.clientX, left: slideElement.scrollLeft, mouse: event.pointerType === "mouse" };
    if (gesture.mouse) {
      slideElement.setPointerCapture(event.pointerId);
      slideElement.classList.add("is-dragging");
    }
  });
  slideElement.addEventListener("pointermove", (event) => {
    if (!gesture?.mouse || gesture.id !== event.pointerId) return;
    slideElement.scrollLeft = gesture.left + gesture.x - event.clientX;
  });
  function finishGesture(event) {
    if (!gesture || gesture.id !== event.pointerId) return;
    const mouse = gesture.mouse;
    gesture = null;
    slideElement.classList.remove("is-dragging");
    if (mouse) {
      const index = Math.max(0, Math.min(images.length - 1, Math.round(slideElement.scrollLeft / slideElement.clientWidth)));
      selectPhoto(index);
    }
  }
  slideElement.addEventListener("pointerup", finishGesture);
  // Touch pointercancel means the browser took over native scrolling.
  slideElement.addEventListener("pointercancel", finishGesture);
  slideElement.addEventListener("lostpointercapture", finishGesture);
  previousButton.addEventListener("click", () => navigate("previous"));
  nextButton.addEventListener("click", () => navigate("next"));

  // Warm the small five-photo set before it enters view; honor data saver.
  const warmPhotos = () => {
    photos.forEach((photo, index) => {
      if (index === 0 || !view.navigator?.connection?.saveData) photo.loading = "eager";
    });
  };
  if (view.IntersectionObserver) {
    const observer = new view.IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      warmPhotos();
      observer.disconnect();
    }, { rootMargin: "1000px" });
    observer.observe(slideElement);
  } else warmPhotos();
  view.addEventListener?.("resize", () => {
    slideElement.scrollTo({ left: currentIndex * slideElement.clientWidth, behavior: "instant" });
  });
  updatePagination(0);
}
