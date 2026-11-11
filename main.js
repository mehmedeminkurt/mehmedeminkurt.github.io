(function(){
  var root=document.documentElement;
  var statsFetchPromise=null;
  try{statsFetchPromise=fetch('assets/stats.json',{cache:'no-cache'})}catch(e){}
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
    n_h:'By the numbers',n1_k:'TypeScript (source & tests)',n1_v:'39,380 lines, 194 files',n2_k:'UI templates',n2_v:'22,658 lines, 57 files (EJS)',n3_k:'API',n3_v:'208 endpoints, 17 route files',n4_k:'Data',n4_v:'17 models, 18 migrations',n5_k:'Tests',n5_v:'395 Playwright E2E scenarios, 61 files',n6_k:'History',n6_v:'182 commits, 110 days, solo developer',
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

  // ---- dynamic stats & count-up animation
  var FALLBACK_STATS = {
    tsLines: 39380,
    tsFiles: 194,
    ejsLines: 22658,
    ejsFiles: 57,
    endpoints: 208,
    routeFiles: 17,
    models: 17,
    migrations: 18,
    e2eTests: 395,
    e2eFiles: 61,
    commits: 182,
    days: 110
  };

  var statKeys = ['n1_v','n2_v','n3_v','n4_v','n5_v','n6_v'];
  var statEls = {};
  statKeys.forEach(function(k){
    statEls[k] = document.querySelector('[data-i18n="' + k + '"]');
  });

  function formatNum(n, l){
    try{
      return Math.round(Number(n)).toLocaleString(l==='en'?'en-US':'tr-TR');
    }catch(e){
      return String(Math.round(n));
    }
  }

  function getRowText(rowId, vals, l){
    if(rowId === 'n1_v'){
      var f = formatNum(vals.tsFiles != null ? vals.tsFiles : 194, l);
      return l === 'en'
        ? formatNum(vals.tsLines, l) + ' lines, ' + f + ' files'
        : formatNum(vals.tsLines, l) + ' sat\u0131r, ' + f + ' dosya';
    }
    if(rowId === 'n2_v'){
      var f = formatNum(vals.ejsFiles != null ? vals.ejsFiles : 57, l);
      return l === 'en'
        ? formatNum(vals.ejsLines, l) + ' lines, ' + f + ' files (EJS)'
        : formatNum(vals.ejsLines, l) + ' sat\u0131r, ' + f + ' dosya (EJS)';
    }
    if(rowId === 'n3_v'){
      var rf = formatNum(vals.routeFiles != null ? vals.routeFiles : 17, l);
      return l === 'en'
        ? formatNum(vals.endpoints, l) + ' endpoints, ' + rf + ' route files'
        : formatNum(vals.endpoints, l) + ' endpoint, ' + rf + ' rota dosyas\u0131';
    }
    if(rowId === 'n4_v'){
      var m = formatNum(vals.migrations != null ? vals.migrations : 18, l);
      return l === 'en'
        ? formatNum(vals.models, l) + ' models, ' + m + ' migrations'
        : formatNum(vals.models, l) + ' model, ' + m + ' migration';
    }
    if(rowId === 'n5_v'){
      var ef = formatNum(vals.e2eFiles != null ? vals.e2eFiles : 61, l);
      return l === 'en'
        ? formatNum(vals.e2eTests, l) + ' Playwright E2E scenarios, ' + ef + ' files'
        : formatNum(vals.e2eTests, l) + ' Playwright E2E senaryosu, ' + ef + ' dosya';
    }
    if(rowId === 'n6_v'){
      var d = formatNum(vals.days != null ? vals.days : 110, l);
      return l === 'en'
        ? formatNum(vals.commits, l) + ' commits, ' + d + ' days, solo developer'
        : formatNum(vals.commits, l) + ' commit, ' + d + ' g\u00fcn, tek geli\u015ftirici';
    }
    return '';
  }

  function updateStatDictionaries(vals){
    statKeys.forEach(function(k){
      TR[k] = getRowText(k, vals, 'tr');
      EN[k] = getRowText(k, vals, 'en');
    });
  }

  var currentAnimationVals = null;

  function renderStatValues(vals){
    var l = root.lang || 'tr';
    updateStatDictionaries(vals);
    statKeys.forEach(function(k){
      if(statEls[k]){
        statEls[k].textContent = (l === 'en' ? EN[k] : TR[k]);
      }
    });
  }

  document.addEventListener('langchange', function(){
    if(currentAnimationVals){
      renderStatValues(currentAnimationVals);
    }
  });

  var statsData = null;
  var statsResolved = false;
  var onStatsReady = null;

  function resolveStats(data){
    if(statsResolved) return;
    statsResolved = true;
    statsData = Object.assign({}, FALLBACK_STATS, data || {});
    if(onStatsReady) onStatsReady(statsData);
  }

  var statsTimer = setTimeout(function(){
    resolveStats(FALLBACK_STATS);
  }, 2000);

  (statsFetchPromise || fetch('assets/stats.json', { cache: 'no-cache' }))
    .then(function(r){
      if(!r.ok) throw new Error('Failed to load stats');
      return r.json();
    })
    .then(function(d){
      clearTimeout(statsTimer);
      resolveStats(d);
    })
    .catch(function(){
      clearTimeout(statsTimer);
      resolveStats(FALLBACK_STATS);
    });

  var ledgerEl = document.querySelector('.ledger');
  var ledgerInView = false;
  var animationStarted = false;

  function triggerStatsAnimation(){
    if(!ledgerInView || !statsResolved || animationStarted) return;
    animationStarted = true;
    startCountUp(statsData);
  }

  onStatsReady = function(){
    triggerStatsAnimation();
  };

  if('IntersectionObserver' in window && ledgerEl){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          ledgerInView = true;
          observer.disconnect();
          triggerStatsAnimation();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(ledgerEl);
  } else {
    ledgerInView = true;
    triggerStatsAnimation();
  }

  function startCountUp(data){
    var reducedMotion = false;
    try {
      reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch(e){}

    if(reducedMotion){
      currentAnimationVals = data;
      renderStatValues(data);
      root.classList.add('stats-ready');
      return;
    }

    var startVals = {
      tsLines: 0, tsFiles: 0,
      ejsLines: 0, ejsFiles: 0,
      endpoints: 0, routeFiles: 0,
      models: 0, migrations: 0,
      e2eTests: 0, e2eFiles: 0,
      commits: 0, days: 0
    };

    var targetVals = data;
    currentAnimationVals = startVals;

    renderStatValues(startVals);
    root.classList.add('stats-ready');

    var startTime = null;
    var duration = 1200;

    function easeOutCubic(t){
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp){
      if(!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var t = Math.min(elapsed / duration, 1);
      var progress = easeOutCubic(t);

      var cur = {};
      for(var prop in targetVals){
        if(targetVals.hasOwnProperty(prop)){
          cur[prop] = Math.round(startVals[prop] + (targetVals[prop] - startVals[prop]) * progress);
        }
      }

      currentAnimationVals = (t >= 1) ? targetVals : cur;
      renderStatValues(currentAnimationVals);

      if(t < 1){
        requestAnimationFrame(step);
      } else {
        renderStatValues(targetVals);
      }
    }

    requestAnimationFrame(step);
  }


})();
