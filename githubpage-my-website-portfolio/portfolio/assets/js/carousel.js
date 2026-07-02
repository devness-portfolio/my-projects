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

export function getNextIndex(currentIndex, direction, itemCount) {
  if (itemCount <= 0) return 0;
  if (direction === "previous") {
    return currentIndex === 0 ? itemCount - 1 : currentIndex - 1;
  }
  return currentIndex === itemCount - 1 ? 0 : currentIndex + 1;
}

function normalizeImage(image, index) {
  if (typeof image === "string") {
    return {
      alt: `Photography showcase ${index + 1}`,
      fit: "cover",
      position: "center",
      src: image,
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

    imageElement.src = currentImage.src;
    imageElement.alt = currentImage.alt;
    imageElement.style.objectFit = currentImage.fit;
    imageElement.style.objectPosition = currentImage.position;

    if (slideElement) {
      slideElement.classList.toggle(
        "carousel-slide-contained",
        currentImage.fit === "contain",
      );
      slideElement.style.setProperty(
        "--carousel-background",
        `url("${currentImage.src}")`,
      );
    }

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
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
