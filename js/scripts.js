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
  function calcDuration(start, end) {
    if (!start) return '';
    try {
      var s = new Date(start);
      var e = (end && end.toLowerCase() !== 'present') ? new Date(end) : new Date();
      var months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
      if (months < 1) months = 1;
      if (months < 12) return months + ' mo';
      var yrs = Math.round((months / 12) * 10) / 10;
      return yrs + ' yr' + (yrs >= 2 ? 's' : '');
    } catch (_) { return ''; }
  }

  async function fetchWikiSummary(name) {
    var encoded = encodeURIComponent(name);
    try {
      var r = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encoded);
      if (r.ok) {
        var d = await r.json();
        if (d.type !== 'disambiguation' && d.extract) return d;
      }
    } catch (_) {}
    try {
      var s = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' +
        encodeURIComponent(name + ' company') + '&format=json&origin=*&srlimit=1&srprop=snippet');
      var sd = await s.json();
      if (sd.query.search.length) {
        var r2 = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' +
          encodeURIComponent(sd.query.search[0].title));
        if (r2.ok) { var d2 = await r2.json(); if (d2.extract) return d2; }
      }
    } catch (_) {}
    return null;
  }

  async function openCompanyModal(c) {
    var modalEl = document.getElementById('companyModal');
    var body = document.getElementById('companyModalBody');
    if (!modalEl || !body) return;

    var dur = calcDuration(c.period_start, c.period_end);
    var durSpan = dur ? ' <span class="company-duration">' + dur + '</span>' : '';
    var currentBadge = c.current
      ? '<span class="badge-current ms-1">' + (window.t ? window.t('badge_current') : 'Current') + '</span>'
      : '';

    body.innerHTML =
      '<div class="company-modal-header">' +
        '<img class="company-modal-logo" src="' + esc(c.logo_url) + '" alt="' + esc(c.name) + '"' +
          ' onerror="this.src=\'assets/img/others/unavailable.png\'">' +
        '<div>' +
          '<h4 class="company-modal-name">' + esc(c.name) + currentBadge + durSpan + '</h4>' +
          '<p class="company-modal-role">' + esc(c.position) + '</p>' +
          '<p class="company-modal-period">' + esc(c.period_start) + ' – ' + esc(c.period_end) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="company-modal-wiki" id="wikiSection">' +
        '<div class="wiki-loading">' +
          '<div class="skeleton-block" style="height:11px;margin-bottom:8px"></div>' +
          '<div class="skeleton-block" style="height:11px;margin-bottom:8px;width:88%"></div>' +
          '<div class="skeleton-block" style="height:11px;width:72%"></div>' +
        '</div>' +
      '</div>';

    bootstrap.Modal.getOrCreateInstance(modalEl).show();

    var wiki = await fetchWikiSummary(c.name);
    var wikiEl = document.getElementById('wikiSection');
    if (!wikiEl) return;

    if (wiki) {
      var thumb = (wiki.thumbnail && wiki.thumbnail.source)
        ? '<img class="wiki-thumbnail" src="' + wiki.thumbnail.source + '" alt="' + esc(wiki.title) + '" loading="lazy">'
        : '';
      var link = wiki.content_urls
        ? '<a class="wiki-link" href="' + wiki.content_urls.desktop.page + '" target="_blank" rel="noopener">Read more on Wikipedia →</a>'
        : '';
      wikiEl.innerHTML =
        thumb +
        '<p class="wiki-extract">' + esc(wiki.extract) + '</p>' +
        link;
    } else if (c.description) {
      wikiEl.innerHTML = '<p class="wiki-extract">' + esc(c.description) + '</p>';
    } else {
      wikiEl.innerHTML = '<p class="wiki-no-data">No additional information available.</p>';
    }
  }

  async function initCompaniesFromDB() {
    const list = document.getElementById('timeline-list');
    if (!list || typeof fetchCompanies === 'undefined') return;
    try {
      const companies = await fetchCompanies();
      const visible = companies.filter(function (c) { return !c.hidden; });
      const hidden = companies.filter(function (c) { return c.hidden; });
      const allCompanies = visible.concat(hidden);

      function buildItem(c, isHidden, idx) {
        const currentBadge = c.current
          ? '<span class="badge-current" data-i18n="badge_current">' + (window.t ? window.t('badge_current') : 'Current') + '</span>'
          : '';
        const currentClass = c.current ? ' current' : '';
        const dur = calcDuration(c.period_start, c.period_end);
        const durSpan = dur ? ' <span class="company-duration">' + dur + '</span>' : '';
        return '<div class="timeline-item' + currentClass + '" data-company-idx="' + idx + '"' +
          (isHidden ? ' style="display:none"' : '') + '>' +
          '<div class="timeline-dot"></div>' +
          '<div class="timeline-card">' +
            '<img src="' + esc(c.logo_url) + '" alt="' + esc(c.name) + '" class="timeline-logo"' +
              ' onerror="this.src=\'assets/img/others/unavailable.png\'">' +
            '<div>' +
              '<h5 class="company-name">' + esc(c.name) + currentBadge + durSpan + '</h5>' +
              '<p class="company-role">' + esc(c.position) + '</p>' +
              '<p class="company-period">' + esc(c.period_start) + ' – ' + esc(c.period_end) + '</p>' +
            '</div>' +
          '</div>' +
          '</div>';
      }

      list.innerHTML =
        visible.map(function (c, i) { return buildItem(c, false, i); }).join('') +
        hidden.map(function (c, i) { return buildItem(c, true, visible.length + i); }).join('');

      // Stagger visible items entrance
      var visibleItems = list.querySelectorAll('.timeline-item:not([style*="display:none"])');
      visibleItems.forEach(function (el, i) {
        setTimeout(function () { el.classList.add('visible'); }, 80 + 110 * i);
      });

      // Animate timeline line when section enters viewport
      var tlEl = list.closest('.timeline');
      if (tlEl) {
        var lineObs = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            setTimeout(function () { tlEl.classList.add('line-visible'); }, 120);
            lineObs.disconnect();
          }
        }, { threshold: 0.05 });
        lineObs.observe(tlEl);
      }

      // Click → company modal
      list.addEventListener('click', function (e) {
        var item = e.target.closest('.timeline-item[data-company-idx]');
        if (!item) return;
        var c = allCompanies[parseInt(item.dataset.companyIdx)];
        if (c) openCompanyModal(c);
      });

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
        var key = open ? 'companies_toggle_less' : 'companies_toggle_see';
        btn.setAttribute('data-i18n', key);
        btn.textContent = window.t ? window.t(key) : (open ? 'Show Less' : 'See Full Experience');
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
