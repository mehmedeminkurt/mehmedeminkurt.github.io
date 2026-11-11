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
    p_story:'Before OtoGuard, I ran simple webhook-based license and stock delivery scripts in production myself; as the need grew, this multi-tenant platform replaced them.',
    p_open:'Open otoguard.tr',p_private:'The source is in a private repository; happy to walk through it on request.',
    p2_lead:'A multi-tenant social media scheduling platform with role-based access control (RBAC) and an automated Brand Kit image engine. Features queued background publishing (Postgres SKIP LOCKED) for Instagram and LinkedIn, alongside Claude AI content generation.',
    p2_open:'View on GitHub',p2_public:'Open-source monorepo repository (Next.js, TypeScript, Prisma, PostgreSQL).',
    s1_t:'Paste the key',s1_d:'The buyer enters the key on the store page. The system validates it and limits the number of attempts.',s1_a:'Store page with the delivery key field',
    s2_t:'The product lands in the library',s2_d:'A valid key is attached to the buyer\u2019s account. Purchases are listed in a library grouped by platform.',s2_a:'My accounts page, grouped by platform',
    s3_t:'Details and code arrive',s3_d:'Delivery details and the verification code on one screen. The code request is queued, and a separate worker fetches the code from email.',s3_a:'Delivery details and the get-code button',
    o_t:'The seller side',o_d:'Every store gets its own panel: subscription time, product limit, key and customer counts at a glance. Platforms, packages, keys, customers and logs are managed on separate pages.',o_a:'Store admin panel with subscription time, product limit, key and customer counts',
    t_t:'Under the hood',fl1:'Request',fl2:'Express API',fl3:'Redis queue',fl4:'Worker',fl5:'Email (IMAP) and Microsoft OAuth',
    sp1_t:'Stack',sp2_t:'Multi-tenant',sp2_d:'Invite-code signup, access tied to subscription status, one admin panel per store',
    sp3_t:'Security',sp3_d:'bcrypt password hashing, JWT sessions, rate limiting, admin 2FA',
    sp4_t:'Testing',sp4_d:'End-to-end tests with Playwright',sp5_t:'Interface',sp5_d:'Turkish and English, public status page',
    h_exp:'Experience and education',e1_w:'July 2026 (1 month)',e1_r:'Software Intern (University Internship)',
    e1_g:'Developed the company/membership data model and OWNER/ADMIN/MEMBER role-based access control (RBAC) on a multi-tenant social media scheduling platform (Next.js, TypeScript, Prisma, PostgreSQL).',
    e1_2:'Built Instagram Graph API and LinkedIn API publishing adapters, CSRF-protected OAuth connection layer, and AES-256-GCM token encryption; ran the scheduler in a dedicated background worker process backed by a PostgreSQL FOR UPDATE SKIP LOCKED queue.',
    e1_3:'Worked through structured phases and issue tracking: resolved 22 issues, authored 38 commits, and reviewed and merged 4 PRs from the team lead.',
    e2_w:'September 2024 \u2013 June 2025',e2_r:'Software Intern (High School Internship)',
    e2_g:'I automated certificate delivery and set up barcode and sensor tracking on a textile line.',
    e2_1:'Instead of sending certificates one by one to hundreds of training attendees, I built a program that generates personalised certificates and emails them automatically, cutting the manual workload significantly.',
    e2_2:'Built a barcode-based production tracking system with Node-RED, so the warehouse and production status of products could be followed in real time.',
    e2_3:'Designed and implemented a prototype data-collection system with an ESP32 and sensors that counts products on the production line automatically.',
    e2_4:'Took an active part in refactoring, debugging and extending existing code.',
    h_edu:'Education',d1_w:'2025 \u2013 ongoing',d1_t:'Istanbul University-Cerrahpaşa',d1_r:'Computer Programming (Associate degree), GPA 3.86 / 4.00',
    d2_t:'Arnavutköy Vocational and Technical Anatolian High School',d2_r:'Information Technologies, Software Development. Graduated first in the school, diploma grade 92.43',
    d2_e:'As a volunteer systems and hardware lead, I led the team that set up and maintained the school\u2019s computer lab.',
    h_skills:'Skills',k1_t:'Web & Server',k2_t:'Databases',k4_t:'Other',k4c:'Image processing (basic)',k4d:'English (B1)',
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
    n_h:'By the numbers',n1_k:'TypeScript',n1_v:'40,520 lines, 202 files',n2_k:'UI templates',n2_v:'22,228 lines, 56 files (EJS)',n3_k:'API',n3_v:'205 endpoints, 17 route files',n4_k:'Data',n4_v:'17 models, 15 migrations',n5_k:'Tests',n5_v:'301 Playwright E2E scenarios, 49 files',n6_k:'History',n6_v:'169 commits, 108 days, solo developer',
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

  Object.assign(EN,{tb1:'Key limit',tb2:'Token race',tb3:'Store isolation',sp_h:'Stack and security'});
  var TR={},nodes=[].slice.call(document.querySelectorAll('[data-i18n]')),alts=[].slice.call(document.querySelectorAll('[data-i18n-alt]'));
  nodes.forEach(function(n){TR[n.getAttribute('data-i18n')]=n.innerHTML});
  alts.forEach(function(n){TR[n.getAttribute('data-i18n-alt')]=n.getAttribute('alt')});
  var TITLE={tr:'Mehmed Emin Kurt | Yazılım Geliştirici',en:'Mehmed Emin Kurt | Software Developer'};
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

  // ---- dynamic stats
  function formatNum(n, l){
    try{
      return Number(n).toLocaleString(l==='en'?'en-US':'tr-TR');
    }catch(e){
      return String(n);
    }
  }

  function updateStats(data){
    if(!data)return;
    if(data.tsLines!=null){
      var f=data.tsFiles!=null?data.tsFiles:202;
      TR['n1_v']=formatNum(data.tsLines,'tr')+' sat\u0131r, '+f+' dosya';
      EN['n1_v']=formatNum(data.tsLines,'en')+' lines, '+f+' files';
    }
    if(data.ejsLines!=null){
      var f=data.ejsFiles!=null?data.ejsFiles:56;
      TR['n2_v']=formatNum(data.ejsLines,'tr')+' sat\u0131r, '+f+' dosya (EJS)';
      EN['n2_v']=formatNum(data.ejsLines,'en')+' lines, '+f+' files (EJS)';
    }
    if(data.endpoints!=null){
      var rf=data.routeFiles!=null?data.routeFiles:17;
      TR['n3_v']=data.endpoints+' endpoint, '+rf+' rota dosyas\u0131';
      EN['n3_v']=data.endpoints+' endpoints, '+rf+' route files';
    }
    if(data.models!=null){
      var m=data.migrations!=null?data.migrations:15;
      TR['n4_v']=data.models+' model, '+m+' migration';
      EN['n4_v']=data.models+' models, '+m+' migrations';
    }
    if(data.e2eTests!=null){
      var ef=data.e2eFiles!=null?data.e2eFiles:49;
      TR['n5_v']=data.e2eTests+' Playwright E2E senaryosu, '+ef+' dosya';
      EN['n5_v']=data.e2eTests+' Playwright E2E scenarios, '+ef+' files';
    }
    if(data.commits!=null&&data.days!=null){
      TR['n6_v']=data.commits+' commit, '+data.days+' g\u00fcn, tek geli\u015ftirici';
      EN['n6_v']=data.commits+' commits, '+data.days+' days, solo developer';
    }
    var currentLang=root.lang||'tr';
    apply(currentLang);
  }

  fetch('assets/stats.json')
    .then(function(r){
      if(!r.ok)throw new Error('Failed to load stats');
      return r.json();
    })
    .then(function(d){
      updateStats(d);
    })
    .catch(function(){
      // Dosya okunamadığında mevcut HTML sabit değerleri korunur
    });


})();
