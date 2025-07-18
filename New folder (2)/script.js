const images = document.querySelectorAll(".gallery .image");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

// Lightbox Open
images.forEach((imgDiv, index) => {
  imgDiv.addEventListener("click", () => {
    currentIndex = index;
    showLightbox();
  });
});

function showLightbox() {
  lightbox.style.display = "flex";
  const src = images[currentIndex].querySelector("img").src;
  lightboxImg.src = src;
}

// Navigation
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showLightbox();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showLightbox();
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Filter Logic
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const category = btn.dataset.category;
    images.forEach((imgDiv) => {
      const imgCategory = imgDiv.dataset.category;
      if (category === "all" || imgCategory === category) {
        imgDiv.style.display = "block";
      } else {
        imgDiv.style.display = "none";
      }
    });
  });
});
