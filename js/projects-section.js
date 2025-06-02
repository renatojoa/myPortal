document.addEventListener('DOMContentLoaded', function() {
    const projectsData = [
        {
            id: 1,
            title: "PIBIC",
            description: "Java application to manage sending and receiving reports from researchers",
            technologies: ["Java"],
            imageUrl: "assets/img/projects/pibic_unicap_logo.png",
            appleStoreUrl: "#",
            androidStoreUrl: "#",
            category: "Windows Application",
            projectAvailable: false,
            company: "Unicap",
            currentlyWorking: false
        },
        {
            id: 2,
            title: "Shop da Saúde",
            description: "Application returning to catalog and sale of hospital products",
            technologies: ["Objective C","Swift"],
            imageUrl: "assets/img/projects/shop_app_logo.png",
            webUrl: "https://www.santander.com.br/cambio",
            appleStoreUrl: "#",
            androidStoreUrl: "#",
            category: "Mobile",
            projectAvailable: false,
            company: "Shop",
            currentlyWorking: false
        },
        {
            id: 3,
            title: "Santander Exchange",
            description: "Solution for foreign exchange and international investment",
            technologies: ["Java"],
            imageUrl: "assets/img/projects/santander_cambio.jpg",
            webUrl: "https://www.santander.com.br/cambio",
            category: "Web",
            projectAvailable: true,
            company: "Accenture",
            currentlyWorking: false
        },
        {
            id: 4,
            title: "Now Online",
            description: "Video streaming - Mobile App",
            technologies: ["Java", "Appium"],
            imageUrl: "assets/img/projects/now_logo.png",
            appleStoreUrl: "https://apps.apple.com/app/now-online/id123456",
            androidStoreUrl: "https://play.google.com/store/apps/details?id=com.nowonline",
            category: "Mobile",
            projectAvailable: true,
            company: "Accenture",
            currentlyWorking: false
        },
        {
            id: 5,
            title: "Colher de Chá",
            description: "Recipe application",
            technologies: ["Mobile", "Web", "API"],
            imageUrl: "assets/img/projects/colher_de_cha_logo.png",
            appleStoreUrl: "",
            androidStoreUrl: "",
            category: "Mobile",
            projectAvailable: false,
            company: "Mesa",
            currentlyWorking: false
        },
        {
            id: 6,
            title: "Track & Field - TF Sports",
            description: "TFSports app. Access and create classes and events, with the best coaches, wherever and whenever.",
            technologies: ["Mobile", "Web", "API"],
            imageUrl: "assets/img/projects/tf_sports_logo.png",
            appleStoreUrl: "https://apps.apple.com/br/app/tfsports/id1251078517",
            androidStoreUrl: "https://play.google.com/store/apps/details?id=br.com.tfsports.customer&hl=pt_BR",
            category: "Mobile",
            projectAvailable: true,
            company: "Mesa",
            currentlyWorking: false
        },
        {
            id: 7,
            title: "Grupo Parvi",
            description: "An automative and residencial assurance application",
            technologies: ["Mobile", "Web", "API"],
            imageUrl: "assets/img/projects/parvi_logo.png",
            category: "Mobile",
            projectAvailable: false,
            company: "Mesa",
            currentlyWorking: false
        },
        {
            id: 8,
            title: "Zero Bank",
            description: "Zro Bank | Digital Bank with Real and Cryptocurrency Accounts With Cryptocurrency to Real conversions, and vice versa",
            technologies: ["Mobile"],
            imageUrl: "assets/img/projects/zero_bank_logo.jpg",
            appleStoreUrl: "https://apps.apple.com/br/app/zro-bank/id1528780452?l=en",
            androidStoreUrl: "https://play.google.com/store/apps/details?id=br.com.zrobank.app&hl=pt_BR",
            category: "Mobile",
            projectAvailable: true,
            company: "Mesa",
            currentlyWorking: false
        },
        {
            id: 9,
            title: "Voltz App",
            description: "Electric motorcycle control - Hybrid App",
            technologies: ["Ionic", "API"],
            imageUrl: "assets/img/projects/voltz_logo.jpg",
            appleStoreUrl: "https://apps.apple.com/br/app/minha-voltz-app/id1549611990",
            androidStoreUrl: "https://play.google.com/store/apps/details?id=voltzmotors.app.com",
            category: "Mobile",
            projectAvailable: true,
            company: "Mesa",
            currentlyWorking: false
        },
        {
            id: 10,
            title: "Via Varejo Portal",
            description: "System manage marketplace and products and storage amount",
            technologies: ["Ruby", "API"],
            imageUrl: "assets/img/projects/via_varejo_logo.png",
            appleStoreUrl: "#",
            androidStoreUrl: "#",
            category: "API",
            projectAvailable: false,
            company: "Concrete",
            currentlyWorking: false
        },
        {
            id: 11,
            title: "Dotz App",
            description: "Application for accumulating and exchanging points on online sites",
            technologies: ["Robot Framework", "API", "Mobile"],
            imageUrl: "assets/img/projects/dotz_logo.png",
            appleStoreUrl: "https://apps.apple.com/br/app/dotz-plataforma-de-benef%C3%ADcios/id1446442555",
            androidStoreUrl: "https://play.google.com/store/apps/details?id=br.com.dotz.dotzpay&hl=pt_BR",
            category: "Mobile",
            projectAvailable: true,
            company: "Dotz",
            currentlyWorking: false
        },
        {
            id: 12,
            title: "Liferay Portal",
            description: "Open-source company that develops enterprise portal technology",
            technologies: ["Java", "Poshi", "API", "Web"],
            imageUrl: "assets/img/projects/liferay_logo.png",
            webUrl: "https://www.liferay.com",
            category: "Web",
            projectAvailable: true,
            company: "Liferay",
            currentlyWorking: false
        },
        {
            id: 13,
            title: "BT Group Subscriptions Management",
            description: "A subscription management application",
            technologies: ["Browserstack Automation", "API"],
            imageUrl: "assets/img/projects/btgroup_logo.png",
            webUrl: "https://ee.co.uk/broadband",
            category: "Backend",
            projectAvailable: true,
            company: "CIANDT",
            currentlyWorking: true
        },
        {
            id: 14,
            title: "Subscription Management Service (Confidential)",
            description: "A subscription management application",
            technologies: ["Browserstack Automation", "API"],
            imageUrl: "assets/img/others/under_secret.png",
            webUrl: "#",
            category: "Web",
            projectAvailable: false,
            company: "CIANDT",
            currentlyWorking: true
        }
    ].reverse();

    
    const container = document.getElementById('projects-container');
    const loadMoreBtn = document.getElementById('load-more');
    const initialCount = 4;
    let isShowingAll = false;

    function createStoreButton(url, platform) {
        if (!url || url === '#') return '';
        const logoPath = `assets/img/others/${platform}_store.png`;
        return `
            <a href="${url}" target="_blank" class="store-logo" title="Available on ${platform}">
                <img src="${logoPath}" alt="${platform} logo" onerror="this.style.display='none'">
            </a>
        `;
    }

    function createWebButton(url) {
        if (!url || url === '#') return '';
        return `
            <a href="${url}" target="_blank" class="web-button" title="Visit website">
                <img src="assets/img/others/www.png" alt="Web icon">
                <span>Visit Website</span>
            </a>
        `;
    }

    function renderStoreButtons(project) {
        if (!project.projectAvailable) {
            return `<div class="unavailable-badge">
                      <img src="assets/img/others/unavailable.png" alt="Not available">
                    </div>`;
        }

        if (project.category === "Web") {
            return createWebButton(project.webUrl);
        } else {
            const appleBtn = createStoreButton(project.appleStoreUrl, 'apple');
            const androidBtn = createStoreButton(project.androidStoreUrl, 'play');

            if (appleBtn && androidBtn) {
                return `<div class="store-logos">${appleBtn}${androidBtn}</div>`;
            }
            return appleBtn || androidBtn || '';
        }
    }

    function renderProjects(showAll = false) {
        container.innerHTML = '';
        
        const projectsToShow = showAll ? projectsData : projectsData.slice(0, initialCount);
        
        projectsToShow.forEach((project, index) => {
            const projectEl = document.createElement('div');
            projectEl.className = 'project-card';
            projectEl.style.animationDelay = `${index * 0.1}s`;
            projectEl.innerHTML = `
                <div class="card-img-container">
                ${project.currentlyWorking ? 
                    '<div class="currently-working-badge">Currently Working</div>' : ''}
                <img src="${project.imageUrl}" alt="${project.title}" class="card-img-top" 
                     onerror="this.src='assets/img/projects/default.jpg'">
            </div>

                <div class="card-body">
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-text">${project.description}</p>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="card-footer">
                    ${renderStoreButtons(project)}
                    <div class="company-logo">
                        <img src="assets/img/companies/thumbnails/${project.company.toLowerCase().replace(' ', '-')}_logo.png" 
                             alt="${project.company} logo" 
                             onerror="this.src='assets/img/others/default-company.png'">
                    </div>
                </div>
            `;
            container.appendChild(projectEl);
        });

        loadMoreBtn.textContent = isShowingAll ? 'Show Less Projects' : 'View More Projects';
        loadMoreBtn.style.display = projectsData.length <= initialCount ? 'none' : 'block';
        
        if (isShowingAll) {
            container.classList.add('show-all');
        } else {
            container.classList.remove('show-all');
        }
    }
    loadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Previne o comportamento padrão do clique
        isShowingAll = !isShowingAll;
        renderProjects(isShowingAll);
        
        // Opcional: Rolar suavemente de volta para o topo dos projetos se necessário
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    renderProjects();
});