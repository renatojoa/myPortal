document.addEventListener('DOMContentLoaded', async function () {
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
      '<button class="filter-chip' + (cat === 'All' ? ' active' : '') + '" data-category="' + cat + '">' + cat + '</button>'
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
      loadMoreBtn.textContent = showingAll ? 'Show Less' : 'View More Projects';
    }
  }

  function buildCard(p) {
    const badges = buildBadges(p);
    const companySlug = (p.company || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const techTags = (p.technologies || []).map(t => '<span class="tech-tag">' + t + '</span>').join('');
    const currentBadge = p.currently_working
      ? '<div class="currently-working-badge">Currently Working</div>'
      : '';
    return '<div class="project-card fade-in">' +
      '<div class="card-img-container" style="position:relative">' +
        currentBadge +
        '<img src="' + (p.image_url || 'assets/img/others/unavailable.png') + '"' +
          ' alt="' + p.title + '" class="card-img-top"' +
          ' onerror="this.src=\'assets/img/others/unavailable.png\'">' +
      '</div>' +
      '<div class="card-body">' +
        '<h3 class="card-title">' + p.title + '</h3>' +
        '<p class="card-text">' + (p.description || '') + '</p>' +
        '<div class="tech-tags">' + techTags + '</div>' +
      '</div>' +
      '<div class="card-footer">' +
        badges +
        '<div class="company-logo">' +
          '<img src="assets/img/companies/thumbnails/' + companySlug + '_logo.png"' +
            ' alt="' + (p.company || '') + '"' +
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
        ? '<a href="' + p.web_url + '" target="_blank" rel="noopener" class="web-button">' +
            '<img src="assets/img/others/www.png" alt="Web"><span>Visit Website</span></a>'
        : '';
    }
    const apple = p.apple_url
      ? '<a href="' + p.apple_url + '" target="_blank" rel="noopener" class="store-logo">' +
          '<img src="assets/img/others/apple_store.png" alt="App Store"></a>'
      : '';
    const android = p.android_url
      ? '<a href="' + p.android_url + '" target="_blank" rel="noopener" class="store-logo">' +
          '<img src="assets/img/others/play_store.png" alt="Play Store"></a>'
      : '';
    return (apple || android) ? '<div class="store-logos">' + apple + android + '</div>' : '';
  }

  render();
});
