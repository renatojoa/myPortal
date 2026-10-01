(function () {
  var translations = {
    en: {
      nav_about: 'About',
      nav_companies: 'Companies',
      nav_projects: 'Projects',
      nav_skills: 'Skills',
      nav_experience: 'Experience',
      nav_contact: 'Contact',

      hero_label: 'The Last Line Before Ship',
      hero_title: 'I hold the line.<br><span class="accent">Before bugs reach the people who trusted you.</span>',
      hero_subtitle: 'Driving excellence through precision and reliability — Recife, Brasil',
      hero_stat_years: 'Years',
      hero_stat_projects: 'Projects',
      hero_stat_companies: 'Companies',
      hero_btn_cv: 'Download CV',
      hero_btn_projects: 'View Projects',

      trust_label: "Lines I've Held",
      trust_lead: 'Teams that shipped with me watching the line.',

      term_whoami_out: 'QA engineer — mobile, web & API. Ten years finding what breaks before release does.',
      term_status_out: 'Still on duty. Open to remote QA roles.',

      about_label: 'Why I Hold The Line',
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

      companies_label: 'Where I Stood Guard',
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

      casefile_label: 'Case File — Open',
      casefile_title: 'Case File',
      casefile_lead: 'One release under watch, start to finish.',
      casefile_log_label: 'From the test log',
      casefile_status: 'Status: still in service',

      skills_label: 'What I Bring To The Line',
      skills_title: 'Skills & Tools',
      skills_languages: 'Languages',
      skills_api: 'API Testing',
      skills_platforms: 'Test Platforms',
      skills_ides: 'IDEs',

      exp_label: 'What I Bring To The Line',
      exp_title: 'Experience',
      exp_general: 'General',
      exp_technical: 'Technical',
      exp_years: 'years',

      cta_label: 'Still On Duty',
      cta_title: "Looking for teams that ship fast but still want someone watching the line.",
      cta_subtitle: 'Open to remote QA leadership / automation roles.',
      cta_btn: 'Get In Touch',

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

      hero_label: 'A Última Linha Antes do Deploy',
      hero_title: 'Eu seguro a linha.<br><span class="accent">Antes que o bug chegue em quem confiou.</span>',
      hero_subtitle: 'Impulsionando a excelência com precisão e confiabilidade — Recife, Brasil',
      hero_stat_years: 'Anos',
      hero_stat_projects: 'Projetos',
      hero_stat_companies: 'Empresas',
      hero_btn_cv: 'Baixar CV',
      hero_btn_projects: 'Ver Projetos',

      trust_label: 'Linhas Que Já Segurei',
      trust_lead: 'Times que lançaram comigo de olho na linha.',

      term_whoami_out: 'Engenheiro de QA — mobile, web e API. Dez anos achando o que quebra antes do release.',
      term_status_out: 'Ainda de plantão. Aberto a vagas remotas de QA.',

      about_label: 'Por Que Eu Seguro A Linha',
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

      companies_label: 'Onde Fiquei De Guarda',
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

      casefile_label: 'Ficha De Caso — Aberta',
      casefile_title: 'Ficha de Caso',
      casefile_lead: 'Um release sob vigilância, do início ao fim.',
      casefile_log_label: 'Do log de teste',
      casefile_status: 'Status: ainda em serviço',

      skills_label: 'O Que Eu Levo Pra Linha',
      skills_title: 'Habilidades & Ferramentas',
      skills_languages: 'Linguagens',
      skills_api: 'Testes de API',
      skills_platforms: 'Plataformas de Teste',
      skills_ides: 'IDEs',

      exp_label: 'O Que Eu Levo Pra Linha',
      exp_title: 'Experiência',
      exp_general: 'Geral',
      exp_technical: 'Técnico',
      exp_years: 'anos',

      cta_label: 'Ainda De Plantão',
      cta_title: 'Procurando times que lançam rápido mas ainda querem alguém de olho na linha.',
      cta_subtitle: 'Aberto a posições remotas de liderança QA / automação.',
      cta_btn: 'Entrar em Contato',

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
