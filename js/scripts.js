/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/

  /// No scripts.js, substitua o fetch atual por:
fetch('partials/companies-section.html')
.then(response => response.text())
.then(html => {
  document.getElementById('companies-section-container').innerHTML = html;
  // Chama as funções de setup após o conteúdo ser carregado
  setupCompaniesToggle();
  animateTimelineItems();
})
.catch(error => {
  console.error('Error loading companies section:', error);
  document.getElementById('companies-section-container').innerHTML = `
    <p class="text-center text-muted">
      Could not load professional experience. Please try again later.
    </p>
  `;
});
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Navigation Functions
    // =============================================
    
    // Navbar shrink function
    const navbarShrink = function() {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

  

    // Initialize navbar shrink
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // Bootstrap scrollspy
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Mobile navbar collapse
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    if (navbarToggler) {
        const responsiveNavItems = [].slice.call(
            document.querySelectorAll('#navbarResponsive .nav-link')
        );
        responsiveNavItems.forEach(function(responsiveNavItem) {
            responsiveNavItem.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });
    }

    // =============================================
    // Portfolio Lightbox
    // =============================================
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });
    
    
// =============================================
// Companies Section Toggle (VERSÃO CORRETA - única)
// =============================================
function setupCompaniesToggle() {
    const btn = document.getElementById('view-all-btn');
    
    if (!btn) {
        console.warn('View All button not found');
        return;
    }
    
    const hiddenItems = document.querySelectorAll('.timeline-item.hidden-item');
    
    if (hiddenItems.length === 0) {
        console.warn('No hidden timeline items found');
        return;
    }
    
    let isShowingAll = false;
    
    btn.addEventListener('click', function() {
        const viewText = btn.querySelector('.view-text') || btn;
        const spinner = btn.querySelector('.spinner-border');
        
        // Mostra loading
        btn.disabled = true;
        if (viewText) viewText.textContent = 'Loading...';
        if (spinner) spinner.classList.remove('d-none');
        
        // Alterna entre mostrar/ocultar
        isShowingAll = !isShowingAll;
        
        setTimeout(() => {
            hiddenItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.display = isShowingAll ? 'block' : 'none';
                    void item.offsetWidth;
                    item.classList.toggle('visible', isShowingAll);
                }, 100 * index);
            });
            
            // Atualiza texto do botão
            btn.disabled = false;
            if (viewText) viewText.textContent = isShowingAll ? 'Show Less' : 'See Full Experience';
            if (spinner) spinner.classList.add('d-none');
            
            animateTimelineItems();
        }, 300);
    });
}
function setupSkillsToggle() {
    const btn = document.getElementById('view-all-skills-btn');
    const skillsSummary = document.getElementById('skills-summary');
    const detailsContainer = document.getElementById('skills-details-container');

    if (btn && skillsSummary && detailsContainer) {
        let isDetailedView = false;

        btn.addEventListener('click', async function() {
            try {
                // Carrega conteúdo apenas na primeira vez
                if (detailsContainer.innerHTML === '') {
                    btn.disabled = true;
                    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
                    
                    const response = await fetch('partials/skills-section.html');
                    if (!response.ok) throw new Error('Failed to load');
                    detailsContainer.innerHTML = await response.text();
                }

                // Alterna entre as views
                isDetailedView = !isDetailedView;
                
                skillsSummary.style.display = isDetailedView ? 'none' : 'block';
                detailsContainer.style.display = isDetailedView ? 'block' : 'none';
                btn.textContent = isDetailedView ? 'Show Less Skills' : 'View All Skills';

                // Scroll to the button position (now at bottom) if expanding
                if (isDetailedView) {
                    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } catch (error) {
                console.error('Error:', error);
                detailsContainer.innerHTML = '<p class="text-center text-danger">Error loading content</p>';
            } finally {
                btn.disabled = false;
                btn.innerHTML = isDetailedView ? 'Show Less Skills' : 'View All Skills';
            }
        });
    }
}
// =============================================
// Timeline Animation
// =============================================
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            setTimeout(() => {
                item.classList.add('visible');
            }, 150 * index);
        }
    });
}

// =============================================
// Load Companies Section
// =============================================
function loadCompaniesSection() {
    fetch('partials/companies-section.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('companies-section-container').innerHTML = html;
            // Configura os eventos após o conteúdo ser carregado
            setupCompaniesToggle();
            animateTimelineItems();
        })
        .catch(error => {
            console.error('Error loading companies section:', error);
            document.getElementById('companies-section-container').innerHTML = `
                <p class="text-center text-muted">
                    Could not load professional experience. Please try again later.
                </p>
            `;
        });
}

    // Função para animar os itens da timeline
    function animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, 150 * index);
            }
        });
    }

    // =============================================
    // Smooth Scrolling
    // =============================================
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // =============================================
    // Tooltips Initialization
    // =============================================
    const initTooltips = () => {
        const tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.map(tooltipTriggerEl => 
            new bootstrap.Tooltip(tooltipTriggerEl)
        );
    };

    // =============================================
    // Main Initialization
    // =============================================
    const init = () => {
        navbarShrink();
        initSmoothScrolling();
        initTooltips();
        setupSkillsToggle();
        loadCompaniesSection(); // Carrega a seção de empresas
        animateTimelineItems();
        
        window.addEventListener('scroll', animateTimelineItems);
    };
    
    init();
});