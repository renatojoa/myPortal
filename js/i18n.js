(function () {
  var translations = {
    en: {
      nav_about: 'About',
      nav_companies: 'Companies',
      nav_projects: 'Projects',
      nav_skills: 'Skills',
      nav_experience: 'Experience',
      nav_contact: 'Contact',

      hero_label: 'Quality Assurance Engineer',
      hero_title: 'Test. Validate.<br><span class="accent">Ensure Safety.</span>',
      hero_subtitle: 'Driving excellence through precision and reliability — Recife, Brasil',
      hero_stat_years: 'Years',
      hero_stat_projects: 'Projects',
      hero_stat_companies: 'Companies',
      hero_btn_cv: 'Download CV',
      hero_btn_projects: 'View Projects',

      about_label: 'About',
      about_title: 'About Me',
      about_h4: 'QA Engineer & Test Automation Specialist',
      about_p1: 'Passionate Quality Assurance Engineer with 10+ years of experience ensuring software quality through meticulous testing and automation across mobile, web, and API platforms.',
      about_p2: 'Expertise in test automation frameworks, CI/CD pipelines, performance testing, and QA leadership. Currently at CI&T, driving quality for international clients.',
      about_location_label: 'Location',
      about_location_val: 'Recife, Brazil',
      about_exp_label: 'Experience',
      about_exp_val: '10+ Years',
      about_email_label: 'Email',
      about_edu_label: 'Education',
      about_edu_val: 'Computer Science, Unicap',

      companies_label: 'Companies',
      companies_title: 'Professional Journey',
      badge_current: 'Current',
      companies_toggle_see: 'See Full Experience',
      companies_toggle_less: 'Show Less',

      projects_label: 'Projects',
      projects_title: 'Projects',
      filter_all: 'All',
      view_more: 'View More Projects',
      show_less: 'Show Less',
      visit_website: 'Visit Website',
      currently_working_badge: 'Currently Working',

      skills_label: 'Skills',
      skills_title: 'Skills & Tools',
      skills_languages: 'Languages',
      skills_api: 'API Testing',
      skills_platforms: 'Test Platforms',
      skills_ides: 'IDEs',

      exp_label: 'Experience',
      exp_title: 'Experience',
      exp_general: 'General',
      exp_technical: 'Technical',
      exp_years: 'years',

      contact_label: 'Contact',
      contact_title: 'Get In Touch',
      contact_email_label: 'Email',
      contact_phone_label: 'Phone',
      contact_linkedin_label: 'LinkedIn',
      contact_location_label: 'Location',
      contact_location_val: 'Recife, Brazil',
      contact_name_ph: 'Your Name',
      contact_email_ph: 'Your Email',
      contact_subject_ph: 'Subject',
      contact_message_ph: 'Your Message',
      contact_send: 'Send Message',
      contact_availability: 'My Availability',
      contact_note: 'Feel free to reach out during available slots.',

      footer_rights: 'All rights reserved.',
    },
    pt: {
      nav_about: 'Sobre',
      nav_companies: 'Empresas',
      nav_projects: 'Projetos',
      nav_skills: 'Habilidades',
      nav_experience: 'Experiência',
      nav_contact: 'Contato',

      hero_label: 'Engenheiro de Qualidade de Software',
      hero_title: 'Teste. Valide.<br><span class="accent">Garanta Qualidade.</span>',
      hero_subtitle: 'Impulsionando a excelência com precisão e confiabilidade — Recife, Brasil',
      hero_stat_years: 'Anos',
      hero_stat_projects: 'Projetos',
      hero_stat_companies: 'Empresas',
      hero_btn_cv: 'Baixar CV',
      hero_btn_projects: 'Ver Projetos',

      about_label: 'Sobre',
      about_title: 'Sobre Mim',
      about_h4: 'Engenheiro QA & Especialista em Automação de Testes',
      about_p1: 'Engenheiro de Qualidade apaixonado com mais de 10 anos de experiência garantindo a qualidade de software por meio de testes minuciosos e automação em plataformas mobile, web e API.',
      about_p2: 'Especialidade em frameworks de automação de testes, pipelines de CI/CD, testes de performance e liderança de QA. Atualmente na CI&T, impulsionando qualidade para clientes internacionais.',
      about_location_label: 'Localização',
      about_location_val: 'Recife, Brasil',
      about_exp_label: 'Experiência',
      about_exp_val: '10+ Anos',
      about_email_label: 'Email',
      about_edu_label: 'Formação',
      about_edu_val: 'Ciência da Computação, Unicap',

      companies_label: 'Empresas',
      companies_title: 'Trajetória Profissional',
      badge_current: 'Atual',
      companies_toggle_see: 'Ver Experiência Completa',
      companies_toggle_less: 'Ver Menos',

      projects_label: 'Projetos',
      projects_title: 'Projetos',
      filter_all: 'Todos',
      view_more: 'Ver Mais Projetos',
      show_less: 'Ver Menos',
      visit_website: 'Visitar Site',
      currently_working_badge: 'Trabalhando Atualmente',

      skills_label: 'Habilidades',
      skills_title: 'Habilidades & Ferramentas',
      skills_languages: 'Linguagens',
      skills_api: 'Testes de API',
      skills_platforms: 'Plataformas de Teste',
      skills_ides: 'IDEs',

      exp_label: 'Experiência',
      exp_title: 'Experiência',
      exp_general: 'Geral',
      exp_technical: 'Técnico',
      exp_years: 'anos',

      contact_label: 'Contato',
      contact_title: 'Entre em Contato',
      contact_email_label: 'Email',
      contact_phone_label: 'Telefone',
      contact_linkedin_label: 'LinkedIn',
      contact_location_label: 'Localização',
      contact_location_val: 'Recife, Brasil',
      contact_name_ph: 'Seu Nome',
      contact_email_ph: 'Seu Email',
      contact_subject_ph: 'Assunto',
      contact_message_ph: 'Sua Mensagem',
      contact_send: 'Enviar Mensagem',
      contact_availability: 'Minha Disponibilidade',
      contact_note: 'Fique à vontade para entrar em contato durante os horários disponíveis.',

      footer_rights: 'Todos os direitos reservados.',
    }
  };

  var savedLang = localStorage.getItem('lang');
  var browserLang = ((navigator.language || navigator.userLanguage || 'en').toLowerCase().startsWith('pt') ? 'pt' : 'en');
  var currentLang = savedLang || browserLang;

  window.t = function (key) {
    return (translations[currentLang] && translations[currentLang][key]) ||
           translations['en'][key] || key;
  };

  window.applyLang = function (lang) {
    if (lang) currentLang = lang;
    localStorage.setItem('lang', currentLang);
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = window.t(el.getAttribute('data-i18n'));
      if (val) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = window.t(el.getAttribute('data-i18n-html'));
      if (val) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var val = window.t(el.getAttribute('data-i18n-placeholder'));
      if (val) el.placeholder = val;
    });

    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = currentLang === 'pt' ? 'EN' : 'PT';
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.applyLang(currentLang);

    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        window.applyLang(currentLang === 'en' ? 'pt' : 'en');
      });
    }
  });
})();
