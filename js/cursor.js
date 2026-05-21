(function () {
  /* Skip on touch/mobile devices */
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var dot  = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  dot.style.display  = 'block';
  ring.style.display = 'block';

  /* Mouse position */
  var mx = window.innerWidth  / 2;
  var my = window.innerHeight / 2;

  /* Ring position (lerped) */
  var rx = mx;
  var ry = my;

  /* Lerp speed: lower = smoother lag */
  var LERP = 0.10;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
  });

  /* ── RAF loop ─────────────────────────────── */
  function tick() {
    /* Smooth follow for ring */
    rx += (mx - rx) * LERP;
    ry += (my - ry) * LERP;

    dot.style.transform  = 'translate3d(' + (mx - 3)  + 'px, ' + (my - 3)  + 'px, 0)';
    ring.style.transform = 'translate3d(' + (rx - 17) + 'px, ' + (ry - 17) + 'px, 0)';

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* ── Hover detection ─────────────────────── */
  var hoverSelectors = 'a, button, [role="button"], label, select, .nav-cta, .btn-primary, .btn-outline, .hamburger, .ins-arrow, .ins-dot, .el, .tab-btn, .quick-btn';
  var textSelectors  = 'input, textarea';

  document.addEventListener('mouseover', function (e) {
    var t = e.target;
    if (t.matches && t.matches(textSelectors)) {
      document.body.classList.add('cursor-text');
      document.body.classList.remove('cursor-hover');
    } else if (t.closest && t.closest(hoverSelectors)) {
      document.body.classList.add('cursor-hover');
      document.body.classList.remove('cursor-text');
    }
  });

  document.addEventListener('mouseout', function (e) {
    var t = e.target;
    if (t.matches && (t.matches(hoverSelectors) || t.matches(textSelectors))) {
      document.body.classList.remove('cursor-hover', 'cursor-text');
    }
  });

  /* ── Click pulse ─────────────────────────── */
  document.addEventListener('mousedown', function () {
    document.body.classList.add('cursor-click');
  });
  document.addEventListener('mouseup', function () {
    document.body.classList.remove('cursor-click');
  });

  /* ── Hide when leaving window ────────────── */
  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();
