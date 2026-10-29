(function(){
  var root=document.documentElement;
  // ---- first load: hero reveal
  requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.add('is-ready')})});

  // ---- i18n (TR is in the markup, EN lives here)
  var EN={
    skip:'Skip to content',nav_project:'Project',nav_exp:'Experience',nav_edu:'Education',nav_contact:'Contact',
    lead:'I build software that automates repetitive work. A delivery platform I wrote in Node.js and TypeScript is running in production.',
    f1_t:'Studying',f1_d:'Istanbul University-Cerrahpaşa, Computer Programming. GPA 3.86 / 4.00',
    f2_t:'Technologies',f3_t:'Live',
    cta_project:'See OtoGuard',cta_cv:'Download CV (PDF)',
    p_lead:'Key-based delivery automation for stores that sell digital products. The buyer pastes the key that came with the order; the system validates it and delivers the details and a one-time verification code within seconds.',
    p_open:'Open otoguard.tr',p_private:'The source is in a private repository; happy to walk through it on request.',
    s1_t:'Paste the key',s1_d:'The buyer enters the key on the store page. The system validates it and limits the number of attempts.',s1_a:'Store page with the delivery key field',
    s2_t:'The product lands in the library',s2_d:'A valid key is attached to the buyer\u2019s account. Purchases are listed in a library grouped by platform.',s2_a:'My accounts page, grouped by platform',
    s3_t:'Details and code arrive',s3_d:'Delivery details and the verification code on one screen. The code request is queued, and a separate worker fetches the code from email.',s3_a:'Delivery details and the get-code button',
    o_t:'The seller side',o_d:'Every store gets its own panel: subscription time, product limit, key and customer counts at a glance. Platforms, packages, keys, customers and logs are managed on separate pages.',o_a:'Store admin panel with subscription time, product limit, key and customer counts',
    t_t:'Under the hood',fl1:'Request',fl2:'Express API',fl3:'Redis queue',fl4:'Worker',fl5:'Email (IMAP) and Microsoft OAuth',
    sp1_t:'Stack',sp2_t:'Multi-tenant',sp2_d:'Invite-code signup, access tied to subscription status, one admin panel per store',
    sp3_t:'Security',sp3_d:'bcrypt password hashing, JWT sessions, rate limiting, admin 2FA',
    sp4_t:'Testing',sp4_d:'End-to-end tests with Playwright',sp5_t:'Interface',sp5_d:'Turkish and English, public status page',
    h_exp:'Experience and education',e1_w:'July 2026 (1 month)',e1_r:'Software Intern (University Internship)',
    e1_g:'I helped the team build the authorization and role-based access modules of a multi-tenant SaaS platform that grew out of my own idea.',
    e1_2:'Fixed open issues and implemented incoming PRs, contributing to the platform\u2019s API integration and stability.',
    e1_3:'Learned and applied a Git-based workflow (issue tracking, PR review), following the phases and task plans set by the team lead.',
    e2_w:'September 2024 \u2013 June 2025',e2_r:'Software Intern (High School Internship)',
    e2_g:'I automated certificate delivery and set up barcode and sensor tracking on a textile line.',
    e2_1:'Instead of sending certificates one by one to hundreds of training attendees, I built a program that generates personalised certificates and emails them automatically, cutting the manual workload significantly.',
    e2_2:'Built a barcode-based production tracking system with Node-RED, so the warehouse and production status of products could be followed in real time.',
    e2_3:'Designed and implemented a prototype data-collection system with an ESP32 and sensors that counts products on the production line automatically.',
    e2_4:'Took an active part in refactoring, debugging and extending existing code.',
    h_edu:'Education',d1_w:'2025 \u2013 ongoing',d1_t:'Istanbul University-Cerrahpaşa',d1_r:'Computer Programming (Associate degree), GPA 3.86 / 4.00',
    d2_t:'Arnavutköy Vocational and Technical Anatolian High School',d2_r:'Information Technologies, Software Development. Graduated first in the school, diploma grade 92.43',
    d2_e:'As a volunteer systems and hardware lead, I led the team that set up and maintained the school\u2019s computer lab.',
    h_skills:'Skills',k1_t:'Backend',k2_t:'Databases',k4_t:'Other',k4c:'Image processing (basic)',k4d:'English (B1)',
    h_contact:'Contact',c_loc:'Istanbul',c_note:'References available on request.'
  };

  Object.assign(EN,{
    d_h:'Try it: paste the key, get the code',d_note:'This is a simulation: the steps match the real flow, the data is fake.',
    cust_label:'Customer screen',trace_label:'Server log',
    u_h:'What\u2019s underneath',u_p:'You can try the three parts that keep this flow safe right here.',
    sc1_t:'Keys must not be guessable',sc1_p:'Keys are generated with 96 bits of randomness, but bots can still try. One IP can try at most 5 different keys in 10 minutes, and the same key has its own separate limit.',
    sc2_t:'When two jobs arrive at once',sc2_p:'Microsoft rotates the refresh token on every refresh. If two jobs go out with the old token at the same time, the second one is rejected and the account connection breaks. The worker shares the refresh in flight for the same account as a single promise.',
    sc3_t:'Forgetting a filter must be impossible',sc3_p:'Instead of writing the store_id condition by hand in every query, a Prisma Client Extension adds it automatically. One store can\u2019t see another store\u2019s data.',
    w1_label:'Attacker simulator',w2_label:'Token refresh race',w3_label:'Store isolation',
    n_h:'By the numbers',n1_k:'TypeScript',n1_v:'40,520 lines, 202 files',n2_k:'UI templates',n2_v:'22,228 lines, 56 files (EJS)',n3_k:'API',n3_v:'205 endpoints, 17 route files',n4_k:'Data',n4_v:'17 models, 15 migrations',n5_k:'Tests',n5_v:'301 Playwright E2E scenarios, 49 files',n6_k:'History',n6_v:'161 commits, 96 days, solo developer',
    l_h:'What I haven\u2019t done yet',
    l1:'SQLite is fast and easy to back up on a single server; busy order periods will call for PostgreSQL.',
    l2:'Rate-limit counters live in memory; they should move to Redis if the server becomes a cluster.',
    l3:'Form requests have no CSRF token; they rely on SameSite=Lax cookies and Origin checks.',
    l4:'Code lookup polls every 5 seconds; IMAP IDLE could make it instant.',
    l5:'No CI/CD; deployment is a manual build on the server.',
    fl3:'BullMQ queue (Redis)',
    sp3_d:'AES-256-GCM encrypted fields, bcrypt, JWT sessions, rate limiting, admin 2FA, SSRF protection for IMAP',
    sp4_t:'Resilience',sp4_d:'Retries with backoff, a circuit breaker that rests a mailbox for 1 hour after 5 failures, worker heartbeat',
    sp5_d:'Turkish and English, dark and light themes, public status page'
  });
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
    document.dispatchEvent(new Event('langchange'));
  }
  btns.forEach(function(b){b.addEventListener('click',function(){apply(b.getAttribute('data-lang'))})});
  var saved=null;try{saved=localStorage.getItem('lang')}catch(e){}
  if(!saved&&/^en/i.test(navigator.language||'')&&!/^tr/i.test(navigator.language))saved='en';
  if(saved==='en')apply('en');

})();
