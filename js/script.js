// Lightbox
function openLightbox(code, name, desc) {
  document.getElementById('lbCode').textContent = code;
  document.getElementById('lbCodeText').textContent = 'Product Code: ' + code;
  document.getElementById('lbName').textContent = name;
  document.getElementById('lbDesc').textContent = desc;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function closeLightboxOutside(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

// Category filter
function filterProducts(cat) {
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const cards = document.querySelectorAll('.product-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    if (show) {
      card.style.display = '';
      // Re-trigger reveal animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 30 + visibleCount * 40);
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update product count badge if present
  const badge = document.getElementById('productCount');
  if (badge) badge.textContent = visibleCount + ' Designs';
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.01, rootMargin: '0px 0px -20px 0px' });
reveals.forEach(r => observer.observe(r));

// Fallback: make all reveals visible after 2s (safety net)
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
}, 2000);

// Scroll top
window.addEventListener('scroll', () => {
  const btn = document.querySelector('.scroll-top');
  btn.classList.toggle('show', window.scrollY > 400);
});

// Form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  btn.textContent = 'Enquiry Sent ✓';
  btn.style.background = '#2a6e3a';
  setTimeout(() => {
    btn.textContent = 'Send Enquiry';
    btn.style.background = '';
  }, 3000);
}

// Inspiration Slider
var insCurrentSlide = 0;
var insTotalSlides = document.querySelectorAll('.ins-slide').length;
var insAutoTimer;

function goToSlide(n) {
  var slides = document.querySelectorAll('.ins-slide');
  var dots   = document.querySelectorAll('.ins-dot');
  slides[insCurrentSlide].classList.remove('active');
  dots[insCurrentSlide].classList.remove('active');
  insCurrentSlide = (n + insTotalSlides) % insTotalSlides;
  slides[insCurrentSlide].classList.add('active');
  dots[insCurrentSlide].classList.add('active');
  // Update counter
  var num = insCurrentSlide + 1;
  document.querySelector('.ins-cur').textContent = num < 10 ? '0' + num : '' + num;
  resetInsAuto();
}

function slideDir(dir) { goToSlide(insCurrentSlide + dir); }

function resetInsAuto() {
  clearInterval(insAutoTimer);
  insAutoTimer = setInterval(function(){ goToSlide(insCurrentSlide + 1); }, 4500);
}

// Init
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.ins-slide')) {
    insTotalSlides = document.querySelectorAll('.ins-slide').length;
    resetInsAuto();
  }
});

// ═══ CURSOR + SCROLL ANIMATIONS ════════════════════════════════════════

(function() {
  // ── Elements ─────────────────────────────────────────────────────────
  const outer = document.createElement('div'); outer.id = 'cur-outer';
  const inner = document.createElement('div'); inner.id = 'cur-inner';
  document.body.append(outer, inner);

  // Trail dots
  const TRAIL = 7;
  const trails = Array.from({length: TRAIL}, (_, i) => {
    const d = document.createElement('div');
    d.className = 'cur-trail';
    const s = 7 - i * 0.8;
    d.style.cssText = `width:${s}px;height:${s}px;opacity:${(1 - i/TRAIL) * 0.45}`;
    document.body.appendChild(d);
    return { el: d, x: 0, y: 0 };
  });

  // Scroll bar
  const bar = document.createElement('div'); bar.id = 'scroll-bar';
  document.body.appendChild(bar);

  // Scroll indicator
  const si = document.createElement('div'); si.id = 'scroll-indicator';
  si.innerHTML = '<div class="si-dot"></div><div class="si-dot"></div><div class="si-dot"></div>';
  document.body.appendChild(si);

  // ── Mouse state ───────────────────────────────────────────────────────
  let mx = 0, my = 0, ox = 0, oy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    inner.style.left = mx + 'px';
    inner.style.top  = my + 'px';
  });

  // Hover detection
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a,button,[role="button"],input,textarea,select,label')) {
      outer.classList.add('hov'); inner.classList.add('hov');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a,button,[role="button"],input,textarea,select,label')) {
      outer.classList.remove('hov'); inner.classList.remove('hov');
    }
  });

  // Click effects
  document.addEventListener('mousedown', e => {
    outer.classList.add('clk'); inner.classList.add('clk');
    spawnParticles(e.clientX, e.clientY);
  });
  document.addEventListener('mouseup', () => {
    outer.classList.remove('clk'); inner.classList.remove('clk');
  });

  // Particle burst
  function spawnParticles(x, y) {
    const count = 8;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'click-particle';
      const angle = (i / count) * Math.PI * 2;
      const dist  = 30 + Math.random() * 30;
      p.style.left = x + 'px';
      p.style.top  = y + 'px';
      p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  }

  // ── Animation loop ────────────────────────────────────────────────────
  function loop() {
    // Outer follows with lag
    ox += (mx - ox) * 0.11;
    oy += (my - oy) * 0.11;
    outer.style.left = ox + 'px';
    outer.style.top  = oy + 'px';

    // Trail
    let px = mx, py = my;
    trails.forEach((t, i) => {
      t.x += (px - t.x) * (0.2 - i * 0.018);
      t.y += (py - t.y) * (0.2 - i * 0.018);
      t.el.style.left = t.x + 'px';
      t.el.style.top  = t.y + 'px';
      px = t.x; py = t.y;
    });

    requestAnimationFrame(loop);
  }
  loop();

  // ── Scroll bar ────────────────────────────────────────────────────────
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - innerHeight) * 100;
    bar.style.width = pct + '%';
    // Hide scroll indicator after scrolling a bit
    si.style.opacity = window.scrollY > 80 ? '0' : '1';
  }, { passive: true });

  // ── Section reveal on scroll ──────────────────────────────────────────
  // Only target specific cards, not full sections (avoids blank page bug)
  const revealEls = document.querySelectorAll('.product-card, .why-card, .cat-row, .film-feat-card, .profile-card');
  
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObs.observe(el));

})();