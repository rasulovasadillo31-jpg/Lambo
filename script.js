
// NAVBAR SCROLL EFFECT

const navbar = document.querySelector(".main-navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// FULLSCREEN MENU

const menuToggle = document.getElementById("menuToggle");
const fullscreenMenu = document.getElementById("fullscreenMenu");
const closeMenu = document.getElementById("closeMenu");

menuToggle.addEventListener("click", () => {
  fullscreenMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  fullscreenMenu.classList.remove("active");
});

document.querySelectorAll(".menu-content a").forEach(link => {
  link.addEventListener("click", () => {
    fullscreenMenu.classList.remove("active");
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    fullscreenMenu.classList.remove("active");
  }
});


// MODEL SWITCHER

const models = {
  temerario: {
    name: "TEMERARIO",
    category: "UNFILTERED PERFORMANCE",
    description: "The next generation of Lamborghini super sports cars.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1800&q=90"
  },

  revuelto: {
    name: "REVUELTO",
    category: "THE QUANTUM OF DRIVING",
    description: "A new era of electrified performance and extraordinary design.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90"
  },

  urus: {
    name: "URUS SE",
    category: "DARE TO LIVE MORE",
    description: "The first Super SUV with hybrid technology.",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1800&q=90"
  }
};

const modelTabs = document.querySelectorAll(".model-tab");

modelTabs.forEach(tab => {
  tab.addEventListener("click", () => {

    const selected = models[tab.dataset.model];

    modelTabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");

    const image = document.getElementById("modelImage");
    const showcase = document.getElementById("modelShowcase");

    showcase.style.opacity = "0";

    setTimeout(() => {
      document.getElementById("modelName").textContent = selected.name;
      document.querySelector(".model-category").textContent = selected.category;
      document.getElementById("modelDescription").textContent = selected.description;

      image.src = selected.image;

      showcase.style.opacity = "1";
    }, 300);
  });
});


// CAROUSEL

const track = document.getElementById("carouselTrack");
const next = document.getElementById("nextSlide");
const prev = document.getElementById("prevSlide");

let currentSlide = 0;

function getVisibleCards() {
  if (window.innerWidth <= 576) return 1;
  if (window.innerWidth <= 991) return 2;
  return 3;
}

function updateCarousel() {
  const cards = track.querySelectorAll(".feature-card");
  const visible = getVisibleCards();

  const maxSlide = Math.max(0, cards.length - visible);

  currentSlide = Math.min(currentSlide, maxSlide);
  currentSlide = Math.max(currentSlide, 0);

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = 25;

  track.style.transform =
    `translateX(-${currentSlide * (cardWidth + gap)}px)`;

  prev.disabled = currentSlide === 0;
  next.disabled = currentSlide === maxSlide;
}

next.addEventListener("click", () => {
  currentSlide++;
  updateCarousel();
});

prev.addEventListener("click", () => {
  currentSlide--;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);

updateCarousel();


// SCROLL REVEAL

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(
  ".section-heading, .model-showcase, .feature-card, .news-card, .motorsport-content"
).forEach(element => {
  observer.observe(element);
});


// BACK TO TOP

document.querySelector(".back-top").addEventListener("click", event => {
  event.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
