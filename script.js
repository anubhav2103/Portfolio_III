// ===== TYPING ANIMATION =====
const phrases = ["Senior Backend Engineer", "AI & ML Systems Architect", "Distributed Systems Designer", "Kafka & Microservices Expert", "GenAI & LLM Engineer", "Cloud-Native Developer (GCP/AWS)", "Python + Java Full Stack", "MLOps & Data Pipeline Builder"];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  if (!typedEl) return;
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 70);
}
typeEffect();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(current);
  }, 16);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      // Trigger counters inside
      e.target.querySelectorAll('.counter').forEach(c => {
        if (!c.dataset.counted) { animateCounter(c); c.dataset.counted = '1'; }
      });
      // Trigger skill bars
      e.target.querySelectorAll('.gr-fill').forEach(bar => {
        const w = bar.dataset.w;
        if (w) bar.style.width = w + '%';
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .gr-exp-item, .gr-proj-card, .gr-edu-card, .gr-skill-group').forEach(el => {
  revealObserver.observe(el);
});

// ===== NAVBAR SCROLL =====
const nav = document.getElementById('gr-nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.gr-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

// ===== HAMBURGER MENU =====
const hbg = document.getElementById('gr-hbg');
const mobileMenu = document.getElementById('gr-mobile');
if (hbg && mobileMenu) {
  hbg.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== CONTACT FORM =====
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const origText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.opacity = '0.8';
  btn.disabled = true;
  setTimeout(() => { btn.innerHTML = origText; btn.style.opacity = ''; btn.disabled = false; e.target.reset(); }, 3000);
}

// ===== PARALLAX ON HERO =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.gr-hero');
  if (hero) hero.style.backgroundPositionY = window.scrollY * 0.3 + 'px';
});

// ===== SKILL BARS RESIZE ANIMATION =====
document.querySelectorAll('.gr-fill').forEach(bar => {
  bar.style.width = '0%';
  bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
});



// ===== TILT EFFECT ON PROJECT CARDS =====
document.querySelectorAll('.gr-proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = 'perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ===== BACK TO TOP =====
const topBtn = document.createElement('button');
topBtn.className = 'gr-back-top';
topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
topBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(topBtn);
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => { topBtn.classList.toggle('visible', window.scrollY > 400); });
