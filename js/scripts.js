document.addEventListener('DOMContentLoaded', function () {

  // ── HTML escape helper ────────────────────────────────
  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Dark mode ──────────────────────────────────────────
  function initDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;
    const html = document.documentElement;
    const saved = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', saved);
    toggle.textContent = saved === 'dark' ? '☀️' : '🌙';

    toggle.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      toggle.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  // ── Navbar shrink ─────────────────────────────────────
  function initNavbar() {
    const nav = document.getElementById('mainNav');
    const shrink = () => nav.classList.toggle('navbar-shrink', window.scrollY > 0);
    shrink();
    window.addEventListener('scroll', shrink, { passive: true });

    // Collapse on mobile link click
    document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler && window.getComputedStyle(toggler).display !== 'none') toggler.click();
      });
    });

    // Bootstrap ScrollSpy
    new bootstrap.ScrollSpy(document.body, { target: '#mainNav', rootMargin: '0px 0px -40%' });
  }

  // ── Counter animation ─────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const els = document.querySelectorAll('[data-counter]');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); observer.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    els.forEach(el => observer.observe(el));
  }

  // ── Scroll fade-in ────────────────────────────────────
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  // ── Progress bars ─────────────────────────────────────
  function initProgressBars() {
    const bars = document.querySelectorAll('.progress');
    if (!bars.length) return;
    bars.forEach(p => { const b = p.querySelector('.progress-bar'); if (b) b.style.width = '0%'; });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target.querySelector('.progress-bar');
          if (bar) bar.style.width = (bar.getAttribute('aria-valuenow') || '0') + '%';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(p => observer.observe(p));
  }

  // ── Smooth scroll ─────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  // ── Companies timeline toggle ──────────────────────────
  function initCompaniesToggle() {
    const btn = document.getElementById('companies-toggle-btn');
    if (!btn) return;
    const items = document.querySelectorAll('#timeline-list .timeline-item:not(:first-child)');
    let open = false;
    items.forEach(el => { el.style.display = 'none'; });
    btn.addEventListener('click', () => {
      open = !open;
      items.forEach((el, i) => {
        if (open) {
          el.style.display = 'block';
          setTimeout(() => el.classList.add('visible'), 60 * i);
        } else {
          el.classList.remove('visible');
          setTimeout(() => { el.style.display = 'none'; }, 400);
        }
      });
      btn.textContent = open ? 'Show Less' : 'See Full Experience';
    });
  }

  // ── Footer year ───────────────────────────────────────
  function initFooterYear() {
    const yr = document.getElementById('current-year');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  // ── Skills from Supabase ──────────────────────────────
  async function initSkillsFromDB() {
    const container = document.getElementById('skills-container');
    if (!container || typeof fetchSkills === 'undefined') return;
    showSkeleton('skills-container', 2);
    try {
      const skills = await fetchSkills();
      const grouped = skills.reduce(function (acc, s) {
        if (!acc[s.category]) acc[s.category] = [];
        acc[s.category].push(s);
        return acc;
      }, {});
      const cols = Object.entries(grouped).map(function (entry) {
        const cat = entry[0];
        const items = entry[1];
        const cards = items.map(function (s) {
          return '<div class="skill-card">' +
            '<img src="' + esc(s.icon_url) + '" alt="' + esc(s.name) + '"' +
            ' onerror="this.style.display=\'none\'">' +
            '<div class="skill-card-name">' + esc(s.name) + '</div>' +
            '</div>';
        }).join('');
        return '<div class="col-md-6 col-lg-3 fade-in">' +
          '<h6 class="fw-bold mb-3" style="color:var(--text-primary)">' + esc(cat) + '</h6>' +
          '<div class="skills-grid">' + cards + '</div>' +
          '</div>';
      }).join('');
      container.innerHTML = '<div class="row g-4">' + cols + '</div>';
      initScrollAnimations();
    } catch (e) {
      showError('skills-container', 'Could not load skills.');
    }
  }

  // ── Companies from Supabase ───────────────────────────
  async function initCompaniesFromDB() {
    const list = document.getElementById('timeline-list');
    if (!list || typeof fetchCompanies === 'undefined') return;
    try {
      const companies = await fetchCompanies();
      const visible = companies.filter(function (c) { return !c.hidden; });
      const hidden = companies.filter(function (c) { return c.hidden; });

      function buildItem(c, isHidden) {
        const currentBadge = c.current
          ? '<span class="badge-current">Current</span>'
          : '';
        return '<div class="timeline-item' + (isHidden ? '' : ' visible') + '"' +
          (isHidden ? ' style="display:none"' : '') + '>' +
          '<div class="timeline-dot"></div>' +
          '<div class="timeline-card">' +
            '<img src="' + esc(c.logo_url) + '" alt="' + esc(c.name) + '" class="timeline-logo"' +
              ' onerror="this.src=\'assets/img/others/unavailable.png\'">' +
            '<div>' +
              '<h5 class="company-name">' + esc(c.name) + currentBadge + '</h5>' +
              '<p class="company-role">' + esc(c.position) + '</p>' +
              '<p class="company-period">' + esc(c.period_start) + ' – ' + esc(c.period_end) + '</p>' +
            '</div>' +
          '</div>' +
          '</div>';
      }

      list.innerHTML =
        visible.map(function (c) { return buildItem(c, false); }).join('') +
        hidden.map(function (c) { return buildItem(c, true); }).join('');

      // Re-wire toggle button with new DOM
      var btn = document.getElementById('companies-toggle-btn');
      if (!btn) return;
      var hiddenItems = list.querySelectorAll('.timeline-item[style*="display:none"]');
      var open = false;
      btn.addEventListener('click', function () {
        open = !open;
        hiddenItems.forEach(function (el, i) {
          if (open) {
            el.style.display = 'block';
            setTimeout(function () { el.classList.add('visible'); }, 60 * i);
          } else {
            el.classList.remove('visible');
            setTimeout(function () { el.style.display = 'none'; }, 400);
          }
        });
        btn.textContent = open ? 'Show Less' : 'See Full Experience';
      });
    } catch (e) {
      showError('companies-container', 'Could not load companies.');
    }
  }

  // ── Init all ──────────────────────────────────────────
  initDarkMode();
  initNavbar();
  initCounters();
  initScrollAnimations();
  initProgressBars();
  initSmoothScroll();
  initFooterYear();
  initSkillsFromDB();
  initCompaniesFromDB();
});
