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
  function initSmoothScroll(lenis) {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target);
        else target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // ── Lenis smooth scroll ────────────────────────────────
  function initLenis() {
    if (typeof Lenis === 'undefined') return null;
    const lenis = new Lenis();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return lenis;
  }

  // ── Hero terminal: typed "hire_renato.py" demo ─────────
  function initHeroTerminal() {
    const wrap = document.getElementById('hero-terminal');
    const log = document.getElementById('terminal-log');
    const browser = document.getElementById('mini-browser');
    if (!wrap || !log) return;

    function setScreen(name) {
      if (!browser) return;
      browser.classList.add('visible');
      browser.querySelectorAll('.mb-screen').forEach(function (el) {
        el.classList.toggle('active', el.dataset.screen === name);
      });
    }

    function addLine(html, cls) {
      const p = document.createElement('p');
      p.className = 'ln' + (cls ? ' ' + cls : '');
      p.innerHTML = html;
      log.appendChild(p);
      log.scrollTop = log.scrollHeight;
      return p;
    }

    function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

    function typeLine(cmd) {
      return new Promise(function (resolve) {
        const p = addLine('<span class="prompt">renato@guardian:~$</span> <span class="cmd"></span>');
        const cmdEl = p.querySelector('.cmd');
        let i = 0;
        const iv = setInterval(function () {
          cmdEl.textContent += cmd[i];
          i++;
          log.scrollTop = log.scrollHeight;
          if (i >= cmd.length) { clearInterval(iv); setTimeout(resolve, 250); }
        }, 22);
      });
    }

    async function run() {
      while (true) {
        if (browser) browser.classList.remove('visible');

        await typeLine('whoami');
        addLine(esc(window.t ? window.t('term_whoami_out') : 'Renato Araújo — QA Engineer'), 'out');
        await wait(500);

        await typeLine('pytest tests/hero_stats.py -v');
        await wait(300);
        addLine('assert years_text == "10+"', 'out cf-assert');
        addLine('assert projects_text == "14"', 'out cf-assert');
        addLine('assert companies_text == "8"', 'out cf-assert');
        await wait(300);
        addLine('3 passed in 0.02s', 'out ok');
        await wait(500);

        await typeLine('python hire_renato.py --dry-run');
        await wait(300);

        setScreen('home');
        addLine('[1/5] GET https://renatojoa.com.br/ ... 200 OK', 'out');
        await wait(900);

        setScreen('projects');
        addLine('[2/5] click "View Projects" ... 14 shipped', 'out');
        await wait(900);

        setScreen('cv');
        addLine('[3/5] click "Download CV" ... resume.pdf ok', 'out');
        await wait(900);

        setScreen('contact');
        addLine('[4/5] submit contact form ... message sent', 'out');
        await wait(900);

        setScreen('hired');
        addLine('[5/5] assert candidate.hired == True', 'out cf-assert');
        await wait(500);
        addLine('PASSED &mdash; 5/5 steps &middot; recommend: hire immediately', 'out ok');

        await wait(1400);
        if (browser) browser.classList.remove('visible');
        await wait(500);

        await typeLine('/clean');
        addLine('wiping session &mdash; restarting demo in 3s', 'out');
        await wait(2000);

        log.style.transition = 'opacity 0.3s ease';
        log.style.opacity = '0';
        await wait(350);
        log.innerHTML = '';
        log.style.opacity = '1';
        await wait(300);
      }
    }

    let started = false;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !started) { started = true; run(); observer.disconnect(); }
      });
    }, { threshold: 0.2 });
    observer.observe(wrap);
  }

  // ── Cal.com booking widget (My Availability) ───────────
  function initCalEmbed() {
    const el = document.getElementById('cal-inline-widget');
    if (!el) return;

    const CAL_LINK = 'renatojoa';

    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    window.Cal('init', '30min', { origin: 'https://cal.com' });
    window.Cal.ns['30min']('inline', {
      elementOrSelector: '#cal-inline-widget',
      config: { layout: 'month_view' },
      calLink: CAL_LINK,
    });
    window.Cal.ns['30min']('ui', { hideEventTypeDetails: false, layout: 'month_view' });
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

  // ── Trust wall from Supabase ───────────────────────────
  async function initTrustWall() {
    const strip = document.getElementById('trust-wall-strip');
    if (!strip || typeof fetchCompanies === 'undefined') return;
    try {
      const companies = await fetchCompanies();
      strip.innerHTML = companies.map(function (c, i) {
        return '<div class="trust-logo fade-in" style="transition-delay:' + (i * 50) + 'ms">' +
          '<img src="' + esc(c.logo_url) + '" alt="' + esc(c.name) + '"' +
            ' onerror="this.parentElement.style.display=\'none\'">' +
          '</div>';
      }).join('');
      initScrollAnimations();
    } catch (e) {
      document.getElementById('trust-wall').style.display = 'none';
    }
  }

  // ── Case File from Supabase ───────────────────────────
  function initCaseFile() {
    const section = document.getElementById('case-file');
    const container = document.getElementById('case-file-container');
    if (!section || !container || typeof fetchProjects === 'undefined') return;
    fetchProjects().then(function (projects) {
      const p = projects.find(function (x) { return x.currently_working; });
      if (!p) { section.remove(); return; }

      const techTags = (p.technologies || []).map(function (t) {
        return '<span class="tech-tag">' + esc(t) + '</span>';
      }).join('');

      container.innerHTML =
        '<div class="case-file-card fade-in">' +
          '<img class="case-file-img" src="' + (esc(p.image_url) || 'assets/img/others/unavailable.png') + '"' +
            ' alt="' + esc(p.title) + '" onerror="this.src=\'assets/img/others/unavailable.png\'">' +
          '<div class="case-file-body">' +
            '<span class="case-file-status" data-i18n="casefile_status">' +
              (window.t ? window.t('casefile_status') : 'Status: still in service') +
            '</span>' +
            '<h3 class="case-file-title">' + esc(p.title) + '</h3>' +
            '<p class="case-file-desc">' + esc(p.description) + '</p>' +
            '<div class="tech-tags">' + techTags + '</div>' +
            '<p class="case-file-log-label" data-i18n="casefile_log_label">' +
              (window.t ? window.t('casefile_log_label') : 'From the test log') +
            '</p>' +
            '<pre class="case-file-log"><span class="cf-comment"># ' + esc(p.title) + ' — critical path, Appium</span>\n' +
'el = driver.find_element(AppiumBy.ACCESSIBILITY_ID, "checkout_button")\n' +
'el.click()\n' +
'<span class="cf-assert">assert driver.find_element(AppiumBy.ID, "order_status").text == "Confirmed"</span></pre>' +
          '</div>' +
        '</div>';
      initScrollAnimations();
    }).catch(function () { section.remove(); });
  }

  // ── Companies from Supabase ───────────────────────────
  function parseMonthYear(str) {
    if (!str) return null;
    var lower = str.trim().toLowerCase();
    if (lower === 'present') return new Date();
    var parts = str.trim().split(/\s+/);
    if (parts.length < 2) return null;
    var MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    var m = MONTHS.indexOf(parts[0].toLowerCase().slice(0, 3));
    var y = parseInt(parts[1], 10);
    if (m === -1 || isNaN(y)) return null;
    return new Date(y, m, 1);
  }

  function calcDuration(start, end) {
    if (!start) return '';
    try {
      var s = parseMonthYear(start);
      var e = (end && end.toLowerCase() !== 'present') ? parseMonthYear(end) : new Date();
      if (!s || !e) return '';
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

    var wiki = null;
    if (c.wiki_title) {
      wiki = await fetchWikiSummary(c.wiki_title);
    }
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
  const lenis = initLenis();
  initDarkMode();
  initNavbar();
  initCounters();
  initScrollAnimations();
  initProgressBars();
  initSmoothScroll(lenis);
  initFooterYear();
  initSkillsFromDB();
  initCompaniesFromDB();
  initTrustWall();
  initCaseFile();
  initHeroTerminal();
  initCalEmbed();
});
