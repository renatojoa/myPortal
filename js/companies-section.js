// companies-section.js
document.addEventListener('DOMContentLoaded', function() {
    // Animation for timeline items
    const animateTimelineItems = function() {
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
    };
  
    // Toggle full experience view
    const viewAllBtn = document.getElementById('view-all-btn');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', function() {
        const hiddenItems = document.querySelectorAll('.hidden-item');
        const viewText = this.querySelector('.view-text');
        const spinner = this.querySelector('.spinner-border');
        
        const isShowingAll = viewText.textContent === 'Show Less';
        
        if (isShowingAll) {
          // Hide extra items
          hiddenItems.forEach(item => {
            item.classList.remove('visible');
            item.style.display = 'none';
          });
          viewText.textContent = 'See Full Experience';
        } else {
          // Show loading
          this.disabled = true;
          viewText.textContent = 'Loading...';
          spinner.classList.remove('d-none');
          
          // Show hidden items with animation
          setTimeout(() => {
            hiddenItems.forEach((item, index) => {
              setTimeout(() => {
                item.style.display = 'block';
                void item.offsetWidth; // Force reflow
                item.classList.add('visible');
              }, 100 * index);
            });
            
            this.disabled = false;
            viewText.textContent = 'Show Less';
            spinner.classList.add('d-none');
            
            animateTimelineItems();
          }, 300);
        }
      });
    }
  
    // Company modal setup
    const companyModal = document.getElementById('companyModal');
    if (companyModal) {
      companyModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const company = button.getAttribute('data-company');
        
        // Example data - replace with your actual data
        const companyData = {
          'ciand': {
            name: 'CI&T',
            logo: 'ciand_logo.png',
            content: `
              <h5 class="mb-3">Quality Assurance Test Engineer</h5>
              <p><strong>Period:</strong> Apr 2024 - Present</p>
              <div class="mb-3">
                <h6>Key Responsibilities:</h6>
                <ul>
                  <li>Develop and execute automated tests</li>
                  <li>Ensure quality in large-scale projects</li>
                  <li>Collaborate with cross-functional teams</li>
                </ul>
              </div>
            `
          },
          // Add data for other companies...
        };
        
        if (companyData[company]) {
          document.getElementById('modal-company-name').textContent = companyData[company].name;
          document.getElementById('modal-company-content').innerHTML = companyData[company].content;
          const logoImg = document.getElementById('modal-company-logo');
          logoImg.src = `assets/img/companies/thumbnails/${companyData[company].logo}`;
          logoImg.alt = `${companyData[company].name} Logo`;
        }
      });
    }
    
    // Initialize animations
    animateTimelineItems();
    window.addEventListener('scroll', animateTimelineItems);
  });