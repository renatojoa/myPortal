document.addEventListener('DOMContentLoaded', async function () {
  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const container = document.getElementById('projects-container');
  const loadMoreBtn = document.getElementById('load-more');
  const filterBar = document.getElementById('project-filters');
  const INITIAL_COUNT = 4;
  let allProjects = [];
  let activeCategory = 'All';
  let showingAll = false;

  showSkeleton('projects-container', 4);
  if (loadMoreBtn) loadMoreBtn.style.display = 'none';

  try {
    allProjects = await fetchProjects();
  } catch (e) {
    showError('projects-container', 'Could not load projects. Please try again later.');
    return;
  }

  // Build filter chips dynamically from real categories
  if (filterBar) {
    const categories = ['All', ...new Set(allProjects.map(p => p.category).filter(Boolean))];
    filterBar.innerHTML = categories.map(cat =>
      '<button class="filter-chip' + (cat === 'All' ? ' active' : '') + '" data-category="' + cat + '"' +
      (cat === 'All' ? ' data-i18n="filter_all"' : '') + '>' +
      (cat === 'All' ? (window.t ? window.t('filter_all') : 'All') : cat) +
      '</button>'
    ).join('');

    filterBar.addEventListener('click', function (e) {
      if (!e.target.matches('.filter-chip')) return;
      filterBar.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeCategory = e.target.dataset.category;
      showingAll = false;
      render();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function (e) {
      e.preventDefault();
      showingAll = !showingAll;
      render();
      if (!showingAll) document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
  }

  function getFiltered() {
    return activeCategory === 'All'
      ? allProjects
      : allProjects.filter(p => p.category === activeCategory);
  }

  function render() {
    const filtered = getFiltered();
    const visible = showingAll ? filtered : filtered.slice(0, INITIAL_COUNT);
    if (container) container.innerHTML = visible.map(buildCard).join('');
    if (loadMoreBtn) {
      loadMoreBtn.style.display = filtered.length <= INITIAL_COUNT ? 'none' : 'block';
      var moreKey = showingAll ? 'show_less' : 'view_more';
      loadMoreBtn.setAttribute('data-i18n', moreKey);
      loadMoreBtn.textContent = window.t ? window.t(moreKey) : (showingAll ? 'Show Less' : 'View More Projects');
    }
  }

  function buildCard(p) {
    const badges = buildBadges(p);
    const companySlug = (p.company || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const techTags = (p.technologies || []).map(t => '<span class="tech-tag">' + t + '</span>').join('');
    const currentBadge = p.currently_working
      ? '<div class="currently-working-badge">' + (window.t ? window.t('currently_working_badge') : 'Currently Working') + '</div>'
      : '';
    return '<div class="project-card fade-in" data-project-id="' + p.id + '">' +
      '<div class="card-img-container" style="position:relative">' +
        currentBadge +
        '<img src="' + (esc(p.image_url) || 'assets/img/others/unavailable.png') + '"' +
          ' alt="' + esc(p.title) + '" class="card-img-top"' +
          ' onerror="this.src=\'assets/img/others/unavailable.png\'">' +
      '</div>' +
      '<div class="card-body">' +
        '<h3 class="card-title">' + esc(p.title) + '</h3>' +
        '<p class="card-text">' + esc(p.description) + '</p>' +
        '<div class="tech-tags">' + techTags + '</div>' +
      '</div>' +
      '<div class="card-footer">' +
        badges +
        '<div class="company-logo">' +
          '<img src="assets/img/companies/thumbnails/' + companySlug + '_logo.png"' +
            ' alt="' + esc(p.company) + '"' +
            ' onerror="this.style.display=\'none\'">' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function buildBadges(p) {
    if (!p.available) {
      return '<div class="unavailable-badge"><img src="assets/img/others/unavailable.png" alt="Not available"></div>';
    }
    if (p.category === 'Web' || p.category === 'API' || p.category === 'Backend') {
      return p.web_url
        ? '<a href="' + esc(p.web_url) + '" target="_blank" rel="noopener" class="web-button">' +
            '<img src="assets/img/others/www.png" alt="Web"><span data-i18n="visit_website">' + (window.t ? window.t('visit_website') : 'Visit Website') + '</span></a>'
        : '';
    }
    const apple = p.apple_url
      ? '<a href="' + esc(p.apple_url) + '" target="_blank" rel="noopener" class="store-logo">' +
          '<img src="assets/img/others/apple_store.png" alt="App Store"></a>'
      : '';
    const android = p.android_url
      ? '<a href="' + esc(p.android_url) + '" target="_blank" rel="noopener" class="store-logo">' +
          '<img src="assets/img/others/play_store.png" alt="Play Store"></a>'
      : '';
    return (apple || android) ? '<div class="store-logos">' + apple + android + '</div>' : '';
  }

  // Click → modal
  if (container) {
    container.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return;
      var card = e.target.closest('.project-card[data-project-id]');
      if (!card) return;
      var pid = parseInt(card.dataset.projectId);
      var p = allProjects.find(function (x) { return x.id === pid; });
      if (p) openProjectModal(p);
    });
  }

  function openProjectModal(p) {
    var modalEl = document.getElementById('projectModal');
    var body = document.getElementById('projectModalBody');
    if (!modalEl || !body) return;

    var companySlug = (p.company || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    var techTags = (p.technologies || []).map(function (t) {
      return '<span class="tech-tag">' + esc(t) + '</span>';
    }).join('');

    var currentBadge = p.currently_working
      ? '<div class="currently-working-badge" style="position:absolute;top:.65rem;left:.65rem;z-index:2">' +
          (window.t ? window.t('currently_working_badge') : 'Currently Working') + '</div>'
      : '';

    var actions = '';
    if (p.available) {
      if (p.category === 'Web' || p.category === 'API' || p.category === 'Backend') {
        if (p.web_url) {
          actions = '<a href="' + esc(p.web_url) + '" target="_blank" rel="noopener" class="web-button">' +
            '<img src="assets/img/others/www.png" alt="Web">' +
            '<span>' + (window.t ? window.t('visit_website') : 'Visit Website') + '</span></a>';
        }
      } else {
        if (p.apple_url) {
          actions += '<a href="' + esc(p.apple_url) + '" target="_blank" rel="noopener" class="store-logo">' +
            '<img src="assets/img/others/apple_store.png" alt="App Store" style="height:32px"></a>';
        }
        if (p.android_url) {
          actions += '<a href="' + esc(p.android_url) + '" target="_blank" rel="noopener" class="store-logo">' +
            '<img src="assets/img/others/play_store.png" alt="Play Store" style="height:32px"></a>';
        }
      }
    }

    body.innerHTML =
      '<div class="project-modal-hero">' +
        currentBadge +
        '<div class="project-modal-hint"></div>' +
        '<img src="' + (esc(p.image_url) || 'assets/img/others/unavailable.png') + '"' +
          ' alt="' + esc(p.title) + '"' +
          ' onerror="this.src=\'assets/img/others/unavailable.png\'">' +
      '</div>' +
      '<div class="project-modal-body">' +
        '<div class="project-modal-meta">' +
          '<h3 class="project-modal-title">' + esc(p.title) + '</h3>' +
          '<span class="filter-chip active flex-shrink-0">' + esc(p.category) + '</span>' +
        '</div>' +
        '<p class="project-modal-description">' + esc(p.description) + '</p>' +
        '<div class="tech-tags mb-3">' + techTags + '</div>' +
        '<div class="project-modal-footer">' +
          '<div class="d-flex align-items-center gap-2 flex-wrap">' + (actions || '') + '</div>' +
          '<div class="project-modal-company">' +
            '<img src="assets/img/companies/thumbnails/' + companySlug + '_logo.png"' +
              ' alt="' + esc(p.company) + '"' +
              ' onerror="this.style.display=\'none\'">' +
          '</div>' +
        '</div>' +
      '</div>';

    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  render();
});
