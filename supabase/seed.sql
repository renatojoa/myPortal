insert into companies (name, position, period_start, period_end, current, logo_url, hidden, sort_order) values
('CI&T',          'Quality Assurance Test Engineer',                 'Apr 2024', 'Present',  true,  'assets/img/companies/thumbnails/ciandt_logo.png',   false, 9),
('Liferay',       'Software QA Team Lead',                          'Feb 2023', 'Dec 2023', false, 'assets/img/companies/thumbnails/liferay_logo.png',   false, 8),
('Dotz',          'QA Team Lead / QA Test Engineer',                'Jan 2021', 'Dec 2022', false, 'assets/img/companies/thumbnails/dotz_logo.png',      true,  7),
('Concrete',      'Quality Assurance Test Engineer',                'Sep 2020', 'Jan 2021', false, 'assets/img/companies/thumbnails/concrete_logo.png',  true,  6),
('Mesa Mobile',   'Software QA Team Lead / QA Test Engineer',      'Dec 2018', 'Sep 2020', false, 'assets/img/companies/thumbnails/mesa_logo.png',      true,  5),
('Accenture',     'Quality Assurance Test Engineer',                'Oct 2017', 'Dec 2018', false, 'assets/img/companies/thumbnails/accenture_logo.png', true,  4),
('Shop da Saúde', 'Business Owner / iOS Developer',                 'Dec 2013', 'Dec 2016', false, 'assets/img/companies/thumbnails/shop_logo.png',      true,  3),
('Unicap',        'Intern / Web Developer / Java Programmer',       'Apr 2010', 'Oct 2010', false, 'assets/img/companies/thumbnails/unicap_logo.png',    true,  2);

insert into skills (category, name, icon_url, sort_order) values
('Languages',     'Python',       'assets/img/skills/pl/python.png',              1),
('Languages',     'Robot FW',     'assets/img/skills/pl/robot.png',               2),
('Languages',     'Java',         'assets/img/skills/pl/java.png',                3),
('Languages',     'Ruby',         'assets/img/skills/pl/ruby.jpg',                4),
('API Testing',   'Postman',      'assets/img/skills/testApi/postman.png',        1),
('API Testing',   'Insomnia',     'assets/img/skills/testApi/insomnia.png',       2),
('API Testing',   'Swagger',      'assets/img/skills/testApi/swagger.jpg',        3),
('API Testing',   'Blazemeter',   'assets/img/skills/testApi/blazemeter.png',     4),
('Test Platforms','Browserstack', 'assets/img/skills/testFront/browserstack.png', 1),
('Test Platforms','AWS Farm',     'assets/img/skills/testFront/aws.png',          2),
('Test Platforms','Android',      'assets/img/skills/testFront/androids.png',     3),
('Test Platforms','XCode',        'assets/img/skills/testFront/xcode.png',        4),
('IDEs',          'VSCode',       'assets/img/skills/ide/vscode.jpg',             1),
('IDEs',          'PyCharm',      'assets/img/skills/ide/pycharm.jpg',            2),
('IDEs',          'IntelliJ',     'assets/img/skills/ide/intelij.jpg',            3),
('IDEs',          'Eclipse',      'assets/img/skills/ide/eclipse.jpg',            4);

insert into projects (title, description, technologies, image_url, apple_url, android_url, web_url, category, available, company, currently_working, sort_order) values
('BT Group Subscriptions','A subscription management application',ARRAY['Browserstack Automation','API'],'assets/img/projects/btgroup_logo.png',null,null,'https://ee.co.uk/broadband','Backend',true,'CIANDT',true,14),
('Subscription Mgmt (Confidential)','A subscription management application',ARRAY['Browserstack Automation','API'],'assets/img/others/under_secret.png',null,null,null,'Web',false,'CIANDT',true,13),
('Liferay Portal','Open-source enterprise portal technology',ARRAY['Java','Poshi','API','Web'],'assets/img/projects/liferay_logo.png',null,null,'https://www.liferay.com','Web',true,'Liferay',false,12),
('Dotz App','Application for accumulating and exchanging points',ARRAY['Robot Framework','API','Mobile'],'assets/img/projects/dotz_logo.png','https://apps.apple.com/br/app/dotz-plataforma-de-benef%C3%ADcios/id1446442555','https://play.google.com/store/apps/details?id=br.com.dotz.dotzpay&hl=pt_BR',null,'Mobile',true,'Dotz',false,11),
('Via Varejo Portal','System manage marketplace and products',ARRAY['Ruby','API'],'assets/img/projects/via_varejo_logo.png',null,null,null,'API',false,'Concrete',false,10),
('Voltz App','Electric motorcycle control - Hybrid App',ARRAY['Ionic','API'],'assets/img/projects/voltz_logo.jpg','https://apps.apple.com/br/app/minha-voltz-app/id1549611990','https://play.google.com/store/apps/details?id=voltzmotors.app.com',null,'Mobile',true,'Mesa',false,9),
('Zero Bank','Digital Bank with Real and Cryptocurrency Accounts',ARRAY['Mobile'],'assets/img/projects/zero_bank_logo.jpg','https://apps.apple.com/br/app/zro-bank/id1528780452?l=en','https://play.google.com/store/apps/details?id=br.com.zrobank.app&hl=pt_BR',null,'Mobile',true,'Mesa',false,8),
('Grupo Parvi','Automative and residential assurance application',ARRAY['Mobile','Web','API'],'assets/img/projects/parvi_logo.png',null,null,null,'Mobile',false,'Mesa',false,7),
('TF Sports','Access and create classes and events with best coaches',ARRAY['Mobile','Web','API'],'assets/img/projects/tf_sports_logo.png','https://apps.apple.com/br/app/tfsports/id1251078517','https://play.google.com/store/apps/details?id=br.com.tfsports.customer&hl=pt_BR',null,'Mobile',true,'Mesa',false,6),
('Colher de Chá','Recipe application',ARRAY['Mobile','Web','API'],'assets/img/projects/colher_de_cha_logo.png',null,null,null,'Mobile',false,'Mesa',false,5),
('Now Online','Video streaming - Mobile App',ARRAY['Java','Appium'],'assets/img/projects/now_logo.png',null,null,null,'Mobile',true,'Accenture',false,4),
('Santander Exchange','Solution for foreign exchange and international investment',ARRAY['Java'],'assets/img/projects/santander_cambio.jpg',null,null,'https://www.santander.com.br/cambio','Web',true,'Accenture',false,3),
('Shop da Saúde','Application returning to catalog and sale of hospital products',ARRAY['Objective C','Swift'],'assets/img/projects/shop_app_logo.png',null,null,null,'Mobile',false,'Shop',false,2),
('PIBIC','Java application to manage sending and receiving reports from researchers',ARRAY['Java'],'assets/img/projects/pibic_unicap_logo.png',null,null,null,'Backend',false,'Unicap',false,1);
