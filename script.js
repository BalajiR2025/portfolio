// smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile nav if open
      if(window.innerWidth < 960){
        document.querySelector('.nav').style.display = '';
      }
    }
  });
});

// intersection observer for fade-in animation
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold: 0.12});

document.querySelectorAll('.fade-in').forEach(el=> io.observe(el));

// mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
navToggle && navToggle.addEventListener('click', ()=>{
  const nav = document.querySelector('.nav');
  if(nav.style.display === 'flex'){
    nav.style.display = '';
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '18px';
    nav.style.top = '58px';
    nav.style.background = 'white';
    nav.style.padding = '12px';
    nav.style.borderRadius = '8px';
    nav.style.boxShadow = '0 6px 20px rgba(10,20,40,0.08)';
  }
});

// highlight active nav link on scroll
const sections = document.querySelectorAll('main section, #home');
const navLinks = document.querySelectorAll('.nav-link');
const activateOnScroll = ()=>{
  let index = sections.length;
  while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
  navLinks.forEach(link => link.classList.remove('active'));
  const id = sections[index].id;
  document.querySelectorAll('.nav-link').forEach(a=>{
    if(a.getAttribute('href') === '#'+id) a.classList.add('active');
  });
};
window.addEventListener('scroll', activateOnScroll);
activateOnScroll();
