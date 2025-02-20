function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}


window.onload = function () {
  const adminToken = localStorage.getItem("adminToken");
  if (window.location.hash === "#admin") {
    if (adminToken) {
      showAdminPanel();
      showSection();
    } else {
      showAdminLogin();
      showSection();
    }
  }

  loadMockData();
};

function loadMockData() {
  const roomsContainer = document.querySelector(".rooms-grid");
  roomsContainer.innerHTML = mockData.rooms
    .slice(0, 3) 
    .map(
      (room) => `
        <div class="room-card">
          <img src="${room.image}" alt="${room.name}" class="room-image">
          <div class="room-content">
            <h3>${room.name}</h3>
            <p>${room.description}</p>
            <a href="rooms/" class="btn btn-primary">Saiba mais</a>
          </div>
        </div>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(".carousel-container");

  
  carousselImages.forEach((imageUrl, index) => {
    const slide = document.createElement("div");
    slide.className = `carousel-slide ${index === 0 ? "active" : ""}`;
    slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`;

    slide.innerHTML = `
      <div class="slide-content">
        <h1>Castelo Real</h1>
        <p>Uma experiência medieval única em acomodações de luxo</p>
        <a href="/booking" class="btn btn-primary">Reserve Sua Estadia</a>
      </div>
    `;

    carouselContainer.appendChild(slide);
  });

  const slides = document.querySelectorAll(".carousel-slide");
  const dotsContainer = document.querySelector(".carousel-dots");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let currentSlide = 0;
  let slideInterval;

  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateSlides() {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlides();
    resetInterval();
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  
  slideInterval = setInterval(nextSlide, 5000);

 
  const carousel = document.querySelector(".hero-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(slideInterval));
  carousel.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
});
