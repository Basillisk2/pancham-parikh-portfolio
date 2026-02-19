// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll reveal animation with stagger
const observerOptions = {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const revealSelectors = [
  '.highlight-card',
  '.stat',
  '.career-card',
  '.expertise-card',
  '.education-card',
  '.contact-card',
  '.about-content',
  '.hero-image'
];

document.querySelectorAll(revealSelectors.join(', ')).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  // Stagger elements within the same parent
  const siblings = el.parentElement.querySelectorAll(`:scope > ${el.tagName.toLowerCase()}.${el.classList[0]}`);
  const index = Array.from(siblings).indexOf(el);
  const delay = index * 0.08;
  el.style.transition = `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`;
  observer.observe(el);
});

// Revealed styles
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--blue-600)';
      } else if (!link.classList.contains('nav-cta')) {
        link.style.color = '';
      }
    }
  });
}

window.addEventListener('scroll', highlightNav);
