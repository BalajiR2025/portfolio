/* =========================
   FADE-IN ON SCROLL
========================= */

const fadeElements = document.querySelectorAll(".fade");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach((el) => fadeObserver.observe(el));

/* =========================
   SMOOTH SCROLL FOR NAV
========================= */

document.querySelectorAll('.icon-nav a').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* =========================
   ACTIVE NAV ICON ON SCROLL
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".icon-nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================
   OPTIONAL: HIDE NAV ON IDLE (MOBILE)
========================= */

let navTimeout;
const nav = document.querySelector(".icon-nav");

window.addEventListener("scroll", () => {
  nav.style.opacity = "1";

  clearTimeout(navTimeout);
  navTimeout = setTimeout(() => {
    if (window.innerWidth < 768) {
      nav.style.opacity = "0.6";
    }
  }, 1200);
});

/* =========================
   TYPING TEXT EFFECT
========================= */

const words = [
  "AI & Data Science Student",
  "Machine Learning Enthusiast",
  "Future Innovator"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => isDeleting = true, 1200);
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
