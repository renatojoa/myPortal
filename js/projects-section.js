document.addEventListener('DOMContentLoaded', function() {
    const projectsData = [
        {
            id: 4,
            title: "Now Online",
            description: "Streaming de vídeos - App Mobile",
            technologies: ["Java", "Appium"],
            imageUrl: "assets/img/projects/now_logo.png",
            appleStoreUrl: "https://apps.apple.com/app/now-online/id123456",
            androidStoreUrl: "https://play.google.com/store/apps/details?id=com.nowonline",
            category: "Mobile",
            projectAvailable: true,
            company: "Accenture"
        },
        {
            id: 5,
            title: "Colher de Chá",
            description: "App de receitas - Mobile, Web, API",
            technologies: ["React Native", "Node.js"],
            imageUrl: "assets/img/projects/colher_de_cha_logo.png",
            appleStoreUrl: "",
            androidStoreUrl: "",
            category: "Mobile",
            projectAvailable: false,
            company: "Mesa"
        },
        {
            id: 6,
            title: "Voltz",
            description: "Controle de moto elétrica - App Híbrido",
            technologies: ["Ionic", "API"],
            imageUrl: "assets/img/projects/voltz_logo.jpg",
            appleStoreUrl: "https://apps.apple.com/br/app/minha-voltz-app/id1549611990",
            androidStoreUrl: "#",
            category: "Mobile",
            projectAvailable: true,
            company: "Mesa"
        },
        {
            id: 12,
            title: "Liferay",
            description: "Open-source company that develops enterprise portal technology.",
            technologies: ["Java", "Poshi", "API", "Web"],
            imageUrl: "assets/img/projects/liferay_logo.png",
            webUrl: "https://www.liferay.com",
            category: "Web",
            projectAvailable: true,
            company: "Dotz"
        },
        {
            id: 13,
            title: "Currently Working (under seizure)",
            description: "A subscription management application",
            technologies: ["Browserstack Automation", "API"],
            imageUrl: "assets/img/others/under_secret.png",
            webUrl: "#",
            category: "Web",
            projectAvailable: false,
            company: "CIANDT"
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

    loadMoreBtn.addEventListener('click', function() {
        isShowingAll = !isShowingAll;
        renderProjects(isShowingAll);
    });

    renderProjects();
});