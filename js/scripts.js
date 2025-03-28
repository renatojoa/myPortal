/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/

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
    
                    // Scroll suave se necessário
                    if (isDetailedView) {
                        detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    // Companies Section
    // =============================================
    function setupCompaniesToggle() {
        const btn = document.getElementById('view-companies-btn');
        const companiesContainer = document.getElementById('companies-container');
        
        if (btn && companiesContainer) {
            btn.addEventListener('click', async function() {
                try {
                    btn.disabled = true;
                    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
                    
                    const response = await fetch('partials/companies-section.html');
                    if (!response.ok) throw new Error('Failed to load');
                    
                    companiesContainer.innerHTML = await response.text();
                    btn.style.display = 'none';
                } catch (error) {
                    console.error('Error:', error);
                    companiesContainer.innerHTML = '<p class="text-center text-danger">Error loading companies</p>';
                    btn.textContent = 'Try Again';
                } finally {
                    btn.disabled = false;
                }
            });
        }
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
        document.addEventListener('DOMContentLoaded', function() {
            // Carrega o conteúdo de companies.html
            fetch('companies.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('companies-placeholder').innerHTML = data;
                })
                .catch(error => console.error('Erro ao carregar o conteúdo:', error));
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
        setupCompaniesToggle();
    };

    // Start everything
    init();
});