(function(){
  var root=document.documentElement;
  // ---- first load: hero reveal
  requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.add('is-ready')})});

  // ---- i18n (TR is in the markup, EN lives here)
  var EN={
    skip:'Skip to content',nav_project:'Project',nav_exp:'Experience',nav_edu:'Education',nav_contact:'Contact',
    lead:'I build software that automates repetitive work. I currently keep a delivery platform running in production, and I interned on a SaaS team.',
    f1_t:'Studying',f1_d:'Istanbul University-Cerrahpaşa, Computer Programming. GPA 3.86 / 4.00',
    f2_t:'Latest internship',f2_d:'IWWOMI, Software Intern, July 2026',f3_t:'Live',
    cta_project:'See OtoGuard',cta_cv:'Download CV (PDF)',
    p_lead:'Delivery automation for stores that sell digital accounts. The buyer pastes the key that came with the order; login details and the verification code show up within seconds, with no seller in the loop.',
    p_open:'Open otoguard.tr',p_private:'The source is in a private repository; happy to walk through it on request.',
    s1_t:'Paste the key',s1_d:'The buyer enters the key on the store page. The system validates it and limits the number of attempts.',s1_a:'Store page with the delivery key field',
    s2_t:'The account lands in the library',s2_d:'A valid key is attached to the buyer\u2019s account. Purchases are listed in a library grouped by platform.',s2_a:'My accounts page, grouped by platform',
    s3_t:'Credentials and code arrive',s3_d:'Username, password and the Steam Guard code on one screen. The code request is queued, and a separate worker fetches the code from email.',s3_a:'Delivery details: username, password and the get-code button',
    o_t:'The seller side',o_d:'Every store gets its own panel: subscription time, account limit, key and customer counts at a glance. Platforms, packages, keys, customers and logs are managed on separate pages.',o_a:'Store admin panel with subscription time, account limit, key and customer counts',
    t_t:'Under the hood',fl1:'Request',fl2:'Express API',fl3:'Redis queue',fl4:'Worker',fl5:'Email (IMAP) and Microsoft OAuth',
    sp1_t:'Stack',sp2_t:'Multi-tenant',sp2_d:'Invite-code signup, access tied to subscription status, one admin panel per store',
    sp3_t:'Security',sp3_d:'bcrypt password hashing, JWT sessions, rate limiting, admin 2FA',
    sp4_t:'Testing',sp4_d:'End-to-end tests with Playwright',sp5_t:'Interface',sp5_d:'Turkish and English, public status page',
    h_exp:'Experience',e1_w:'July 2026 (1 month)',e1_r:'Software Intern (University Internship)',
    e1_g:'I worked on the authorization and role-based access layer of a multi-tenant SaaS platform.',
    e1_2:'Fixed open issues and implemented incoming PRs, contributing to the platform\u2019s API integration and stability.',
    e1_3:'Followed the phases and task plans set by the team lead, working in a Git-based flow (issue tracking, PR review).',
    e2_w:'September 2024 \u2013 June 2025',e2_r:'Software Intern (High School Internship)',
    e2_g:'I automated certificate delivery and set up barcode and sensor tracking on a textile line.',
    e2_1:'Instead of sending certificates one by one to hundreds of training attendees, I built a program that generates personalised certificates and emails them automatically, cutting the manual workload significantly.',
    e2_2:'Built a barcode-based production tracking system with Node-RED, so the warehouse and production status of products could be followed in real time.',
    e2_3:'Designed and implemented a prototype data-collection system with an ESP32 and sensors that counts products on the production line automatically.',
    e2_4:'Took an active part in refactoring, debugging and extending existing code.',
    h_edu:'Education',d1_w:'2025 \u2013 ongoing',d1_t:'Istanbul University-Cerrahpaşa',d1_r:'Computer Programming (Associate degree)',d1_g:'My GPA is 3.86 / 4.00.',
    d2_t:'Arnavutköy Vocational and Technical Anatolian High School',d2_r:'Information Technologies, Software Development',d2_g:'I graduated first in my school. Diploma grade 92.43.',
    d2_e:'As a volunteer systems and hardware lead, I led the team that set up and maintained the school\u2019s computer lab.',
    h_skills:'Skills',k1_t:'Backend',k2_t:'Databases',k4_t:'Other',k4b:'Git and GitHub',k4c:'Image processing (basic)',k4d:'English (B1)',
    h_contact:'Contact',c_note:'Istanbul, Arnavutköy. References available on request.',
    foot:'Built with plain HTML, CSS and JavaScript.'
  };
  var TR={},nodes=[].slice.call(document.querySelectorAll('[data-i18n]')),alts=[].slice.call(document.querySelectorAll('[data-i18n-alt]'));
  nodes.forEach(function(n){TR[n.getAttribute('data-i18n')]=n.innerHTML});
  alts.forEach(function(n){TR[n.getAttribute('data-i18n-alt')]=n.getAttribute('alt')});
  var TITLE={tr:'Mehmed Emin Kurt \u2013 Yazılım geliştirme',en:'Mehmed Emin Kurt \u2013 Software development'};
  var lang=document.querySelector('.lang'),btns=[].slice.call(lang.querySelectorAll('button'));
  function apply(l){
    var d=l==='en'?EN:TR;
    nodes.forEach(function(n){var k=n.getAttribute('data-i18n');if(d[k]!=null)n.innerHTML=d[k]});
    alts.forEach(function(n){var k=n.getAttribute('data-i18n-alt');if(d[k]!=null)n.setAttribute('alt',d[k])});
    root.lang=l;document.title=TITLE[l];lang.setAttribute('data-active',l);
    btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-lang')===l))});
    try{localStorage.setItem('lang',l)}catch(e){}
  }
  btns.forEach(function(b){b.addEventListener('click',function(){apply(b.getAttribute('data-lang'))})});
  var saved=null;try{saved=localStorage.getItem('lang')}catch(e){}
  if(!saved&&/^en/i.test(navigator.language||'')&&!/^tr/i.test(navigator.language))saved='en';
  if(saved==='en')apply('en');

  // ---- project story: the stage follows the step in view
  var steps=[].slice.call(document.querySelectorAll('.step')),shots=[].slice.call(document.querySelectorAll('.shot'));
  function show(i){
    steps.forEach(function(s,k){s.classList.toggle('is-active',k===i)});
    shots.forEach(function(s,k){s.classList.toggle('is-active',k===i);s.classList.toggle('is-past',k<i)});
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting)show(+e.target.getAttribute('data-i'))});
    },{rootMargin:'-45% 0px -45% 0px'});
    steps.forEach(function(s){io.observe(s)});
  }
})();
