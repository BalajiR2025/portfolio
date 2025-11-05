const elements = document.querySelectorAll('.fade-in');
function showOnScroll() {
  elements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', showOnScroll);
showOnScroll();
