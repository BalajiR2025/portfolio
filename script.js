/* =========================
   FADE-IN ON SCROLL
========================= */

const fadeElements = document.querySelectorAll(".fade");

const fadeObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach(el => fadeObserver.observe(el));


/* =========================
   SMOOTH SCROLL FOR ICON NAV
========================= */

const navLinks = document.querySelectorAll(".icon-nav a");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");

    if (targetId.startsWith("#")) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});


/* =========================
   ACTIVE NAV ICON ON SCROLL
========================= */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


/* =========================
   OPTIONAL: HIDE NAV ON IDLE (MOBILE)
========================= */

const nav = document.querySelector(".icon-nav");
let navTimeout;

if (nav) {
  window.addEventListener("scroll", () => {
    nav.style.opacity = "1";

    clearTimeout(navTimeout);
    navTimeout = setTimeout(() => {
      if (window.innerWidth < 768) {
        nav.style.opacity = "0.5";
      }
    }, 1200);
  });
}


/* =========================
   TYPING TEXT EFFECT
========================= */

const typingElement = document.getElementById("typing");

if (typingElement) {
  const words = [
    "AI & Data Science Student",
    "Machine Learning Enthusiast",
    "Future Innovator"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex--);
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), 1200);
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
}

const cards = document.querySelectorAll(".skill-card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform = `
      translate(${x * 0.05}px, ${y * 0.05}px)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translate(0,0) scale(1)";
  });
});

/* Azure logo hover swap */
document.querySelectorAll(".azure-logo").forEach(logo => {
  const original = logo.dataset.original;
  const hover = logo.dataset.hover;

  logo.addEventListener("mouseenter", () => {
    logo.src = hover;
  });

  logo.addEventListener("mouseleave", () => {
    logo.src = original;
  });
});
