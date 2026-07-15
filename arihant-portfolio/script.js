// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// Nav border on scroll
const navWrap = document.getElementById('navWrap');
window.addEventListener('scroll', () => {
  navWrap.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Cursor glow (desktop only)
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    glow.style.opacity = '1';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// Typing effect
const roles = [
  'Full-Stack Developer',
  'Backend Engineer',
  'AI Automation Builder',
  'CS Undergrad @ VIT'
];
const typedEl = document.getElementById('typed');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  typedEl.textContent = current.slice(0, charIdx);

  let delay;
  if (!deleting) {
    charIdx++;
    delay = 70;
    if (charIdx > current.length) { deleting = true; delay = 1800; }
  } else {
    charIdx--;
    delay = 38;
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 350; }
  }
  setTimeout(typeLoop, delay);
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typedEl.textContent = roles[0];
} else {
  typeLoop();
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));
