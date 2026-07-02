export const photographyImages = [
  "https://devness-portfolio.s3.us-east-1.amazonaws.com/images/IMG_8788.JPG",
  "https://devness-portfolio.s3.us-east-1.amazonaws.com/images/IMG_8790.JPG",
  "https://devness-portfolio.s3.us-east-1.amazonaws.com/images/IMG_8791.JPG",
  "https://devness-portfolio.s3.us-east-1.amazonaws.com/images/IMG_8792.JPG",
  "https://devness-portfolio.s3.us-east-1.amazonaws.com/images/IMG_8793.JPG",
  "https://devness-portfolio.s3.us-east-1.amazonaws.com/images/IMG_8794.JPG",
  "https://devness-portfolio.s3.us-east-1.amazonaws.com/images/IMG_8795.JPG",
];

export function getNextIndex(currentIndex, direction, itemCount) {
  if (itemCount <= 0) return 0;
  if (direction === "previous") {
    return currentIndex === 0 ? itemCount - 1 : currentIndex - 1;
  }
  return currentIndex === itemCount - 1 ? 0 : currentIndex + 1;
}

export default function setupCarousel({
  images = photographyImages,
  imageElement = document.getElementById("carousel-image"),
  previousButton = document.getElementById("prevBtn"),
  nextButton = document.getElementById("nextBtn"),
  dotsContainer = document.querySelector(".carousel-dots"),
} = {}) {
  if (!imageElement || !previousButton || !nextButton || !dotsContainer) return;

  if (images.length === 0) {
    imageElement.alt = "No photography images available";
    previousButton.hidden = true;
    nextButton.hidden = true;
    dotsContainer.hidden = true;
    return;
  }

  let currentIndex = 0;

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
    imageElement.src = images[currentIndex];
    imageElement.alt = `Photography showcase ${currentIndex + 1}`;

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
