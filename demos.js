(function(){
  var root=document.documentElement;
  var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var L=function(){return root.lang==='en'?'en':'tr'};
  var sleep=function(ms){return new Promise(function(r){setTimeout(r,RM?Math.min(ms,25):ms)})};
  var $=function(s,r){return (r||document).querySelector(s)};
  var DEMO_KEY='DEMO-4F7A2C-9B31E0-C58D17-02A6BE';

  var D={
  tr:{
    shopName:'Demo Mağaza',shopSub:'Satın aldığın anahtarı yaz, ürün anında hesabına tanımlansın.',
    keyTitle:'Teslimat anahtarını gir',keySub:'Siparişinde verilen anahtarı buraya yapıştır.',ph:'Anahtarı buraya yapıştırın',
    verify:'Doğrula',verifying:'Doğrulanıyor…',useDemo:'Demo anahtarını kullan',
    errEmpty:'Anahtar boş olamaz.',errBad:'Geçersiz anahtar. Demo anahtarını kullanabilirsin.',
    prod:'Örnek Ürün 1',badge:'Demo',user:'Kullanıcı adı',pass:'Şifre',copy:'Kopyala',copied:'Kopyalandı',
    codeTitle:'Doğrulama kodu',avail:function(n){return 'Kullanılabilir ('+n+' / 3)'},cool:'24 saatlik bekleme süresi kuralı geçerlidir.',
    getCode:'Kodu al',st1:'Kuyruğa alındı',st2:'Posta kutusuna bağlanıldı',st3:'Kod aranıyor',st4:'Kod bulundu',
    next:'Sonraki kod için bekleme: 23 sa 59 dk',again:'Baştan dene',
    traceEmpty:'Bir anahtarı doğruladığında sunucunun yaptıkları burada akacak.',
    rl:'IP sınırı tamam · farklı key 1/5',keyFound:'Key.findUnique → bulundu, is_used=false',keyMissing:'Key.findUnique → bulunamadı',
    ok200:'200 OK · 22 ms',nf404:'404 Not Found · 9 ms',
    jobStart:'iş #1042 başladı',decrypt:'parola bellekte çözüldü (AES-256-GCM)',ssrf:'assertSafeImapTarget → port 993, hedef IP herkese açık',
    imapOn:'bağlandı, INBOX kilitlendi',imapScan:'son 10 dakika taranıyor',imapHit:'1 e-posta eşleşti, kod ayrıştırıldı',
    cAtt:'Farklı anahtar',cSame:'Aynı anahtar',bRand:'Rastgele anahtar dene',bSame:'Aynı anahtarı dene',bReset:'Pencere doldu (10 dk geçti)',
    a404:'404 Geçersiz anahtar',a429d:'429 Çok fazla farklı key denemesi yapıldı.',a429s:'429 Bu anahtar için çok fazla deneme.',
    aHint:'Dene: 6 farklı anahtar gönder.',
    laneA:'İş A',laneB:'İş B',ms:'Microsoft',swCo:'Yenilemeleri birleştir',bTwo:'İki iş gönder',
    rA1:'Yenileme başlıyor (token v1)',rB1:'Yenileme başlıyor (token v1)',rMs1:'A: v1 → v2 üretildi, v1 geçersiz',rMs2:'B: v1 ile istek → invalid_grant',rB2:'Hesap bağlantısı geçersiz kılındı',
    cA1:'Yenileme başlıyor, promise haritaya yazıldı',cB1:'Haritada süren yenileme var, bekliyor',cMs:'Tek istek: v1 → v2',cA2:'v2 ile devam ediyor',cB2:'Aynı v2 ile devam ediyor',
    resBad:'Sonuç: 1 iş başarısız, hesap yeniden bağlanmalı.',resOk:'Sonuç: Microsoft\'a 1 istek, 2 iş başarılı.',
    store:'Mağaza',swExt:'store_id uzantısı',cmW:'// Controller\'da yazdığın',cmR:'// Veritabanına giden',cmNo:'// (uzantı kapalı: sorgu aynen gider)',
    leak:'başka mağazaya ait',prodN:'Örnek Ürün'
  },
  en:{
    shopName:'Demo Store',shopSub:'Enter the key you bought and the product is added to your account instantly.',
    keyTitle:'Enter your delivery key',keySub:'Paste the key from your order here.',ph:'Paste the key here',
    verify:'Verify',verifying:'Verifying…',useDemo:'Use the demo key',
    errEmpty:'The key can\u2019t be empty.',errBad:'Invalid key. You can use the demo key.',
    prod:'Sample Product 1',badge:'Demo',user:'Username',pass:'Password',copy:'Copy',copied:'Copied',
    codeTitle:'Verification code',avail:function(n){return 'Available ('+n+' / 3)'},cool:'A 24-hour cooldown applies.',
    getCode:'Get code',st1:'Queued',st2:'Connected to the mailbox',st3:'Looking for the code',st4:'Code found',
    next:'Next code available in: 23 h 59 min',again:'Start over',
    traceEmpty:'When you verify a key, what the server does will stream here.',
    rl:'IP limit ok · distinct keys 1/5',keyFound:'Key.findUnique → found, is_used=false',keyMissing:'Key.findUnique → not found',
    ok200:'200 OK · 22 ms',nf404:'404 Not Found · 9 ms',
    jobStart:'job #1042 started',decrypt:'password decrypted in memory (AES-256-GCM)',ssrf:'assertSafeImapTarget → port 993, target IP is public',
    imapOn:'connected, INBOX locked',imapScan:'scanning the last 10 minutes',imapHit:'1 email matched, code parsed',
    cAtt:'Different keys',cSame:'Same key',bRand:'Try a random key',bSame:'Try the same key',bReset:'Window expired (10 min passed)',
    a404:'404 Invalid key',a429d:'429 Too many different keys tried.',a429s:'429 Too many attempts for this key.',
    aHint:'Try sending 6 different keys.',
    laneA:'Job A',laneB:'Job B',ms:'Microsoft',swCo:'Coalesce refreshes',bTwo:'Send two jobs',
    rA1:'Starts refresh (token v1)',rB1:'Starts refresh (token v1)',rMs1:'A: v1 → v2 issued, v1 revoked',rMs2:'B: request with v1 → invalid_grant',rB2:'Account connection invalidated',
    cA1:'Starts refresh, promise stored in the map',cB1:'Refresh already in flight, waits',cMs:'One request: v1 → v2',cA2:'Continues with v2',cB2:'Continues with the same v2',
    resBad:'Result: 1 job failed, the account must be reconnected.',resOk:'Result: 1 request to Microsoft, 2 jobs succeeded.',
    store:'Store',swExt:'store_id extension',cmW:'// What the controller writes',cmR:'// What reaches the database',cmNo:'// (extension off: the query goes as written)',
    leak:'belongs to another store',prodN:'Sample Product'
  }};
  var t=function(k){return D[L()][k]};

  /* ---------- 1. delivery ---------- */
  function delivery(){
    var host=$('#demo-delivery'); if(!host) return;
    var cust=$('.cust-body',host), trace=$('.trace-body',host);
    var run=0,keyVal='',uses=3;
    function fmt(ms){ if(ms<1000) return ('00.'+('000'+ms).slice(-3)); var s=(ms/1000).toFixed(3); return (s.length<6?'0':'')+s; }
    function log(tag,msg,ms,cls){
      var e=trace.querySelector('.trace-empty'); if(e) e.remove();
      var d=document.createElement('div'); d.className='ln';
      d.innerHTML='<span class="ts">'+fmt(ms)+'</span><span class="tg '+tag+'">'+(cls==='sec'?'sec':tag)+'</span><span class="ms">'+msg+'</span>';
      trace.appendChild(d); requestAnimationFrame(function(){d.classList.add('in')}); trace.scrollTop=trace.scrollHeight;
    }
    function clearTrace(){trace.innerHTML='<p class="trace-empty">'+t('traceEmpty')+'</p>'}
    function mask(k){return k.length>16?k.slice(0,9)+'…'+k.slice(-4):k}
    function renderIdle(err){
      cust.innerHTML='<div class="shop"><p class="shop-name">'+t('shopName')+'</p><p class="shop-sub">'+t('shopSub')+'</p>'+
        '<div class="keybox"><div class="keybox-h">'+t('keyTitle')+'<small>'+t('keySub')+'</small></div>'+
        '<div class="krow"><input id="dk" class="inp" placeholder="'+t('ph')+'" autocomplete="off" spellcheck="false" aria-label="'+t('keyTitle')+'"><button class="pbtn" id="dv" type="button">'+t('verify')+'</button></div>'+
        '<p class="err" id="derr" '+(err?'':'hidden')+'>'+(err||'')+'</p></div>'+
        '<button class="lnk" id="dfill" type="button">'+t('useDemo')+'</button></div>';
      var inp=$('#dk',cust); inp.value=keyVal;
      inp.addEventListener('input',function(){keyVal=inp.value});
      inp.addEventListener('keydown',function(e){if(e.key==='Enter')verify()});
      $('#dv',cust).addEventListener('click',verify);
      $('#dfill',cust).addEventListener('click',function(){
        var my=++run,i=0; inp.value=''; keyVal='';
        (function type(){ if(my!==run) return; if(i<DEMO_KEY.length){inp.value+=DEMO_KEY[i++];keyVal=inp.value;setTimeout(type,RM?1:14)} else inp.focus(); })();
      });
    }
    async function verify(){
      var raw=(keyVal||'').trim().toUpperCase(), my=++run, btn=$('#dv',cust), er=$('#derr',cust);
      if(!raw){er.hidden=false;er.textContent=t('errEmpty');return}
      btn.disabled=true; btn.textContent=t('verifying'); er.hidden=true; clearTrace();
      log('http','POST /api/redeem/'+mask(raw),0); await sleep(220); if(my!==run)return;
      log('rate',t('rl'),4); await sleep(200); if(my!==run)return;
      if(raw!==DEMO_KEY){
        log('db',t('keyMissing'),9); await sleep(200); if(my!==run)return;
        log('http','<span class="bad">'+t('nf404')+'</span>',10); await sleep(120); if(my!==run)return;
        renderIdle(t('errBad')); return;
      }
      log('db',t('keyFound'),11); await sleep(220); if(my!==run)return;
      log('db','CustomerAccess.upsert',19); await sleep(200); if(my!==run)return;
      log('http','<span class="good">'+t('ok200')+'</span>',22); await sleep(250); if(my!==run)return;
      uses=3; renderProduct();
    }
    function field(label,val,id){return '<div class="field"><div><span>'+label+'</span><code>'+val+'</code></div><button class="cbtn" type="button" data-copy="'+id+'">'+t('copy')+'</button></div>'}
    function renderProduct(){
      cust.innerHTML='<div class="prod"><div class="prod-h"><span class="cover" aria-hidden="true">DEMO</span><div><b>'+t('prod')+'</b><span class="badge">'+t('badge')+'</span></div></div>'+
        field(t('user'),'demo_kullanici','demo_kullanici')+field(t('pass'),'DemoSifre123','DemoSifre123')+
        '<div class="codebox"><div class="cb-h"><b>'+t('codeTitle')+'</b><span class="okc">'+t('avail')(uses)+'</span></div><p class="mut">'+t('cool')+'</p><div id="cslot"><button class="gbtn" id="dget" type="button">'+t('getCode')+'</button></div></div>'+
        '<div style="text-align:center"><button class="lnk" id="dreset" type="button">'+t('again')+'</button></div></div>';
      bindCopy(); $('#dget',cust).addEventListener('click',fetchCode); $('#dreset',cust).addEventListener('click',reset);
    }
    function bindCopy(){
      [].forEach.call(cust.querySelectorAll('[data-copy]'),function(b){
        b.addEventListener('click',function(){
          try{navigator.clipboard.writeText(b.getAttribute('data-copy'))}catch(e){}
          var o=b.textContent; b.textContent=t('copied'); setTimeout(function(){b.textContent=o},1200);
        });
      });
    }
    async function fetchCode(){
      var my=++run, slot=$('#cslot',cust);
      var names=['st1','st2','st3','st4'];
      slot.innerHTML='<ol class="fsteps">'+names.map(function(n){return '<li data-s="'+n+'">'+t(n)+'</li>'}).join('')+'</ol>';
      function step(i,state){var li=slot.querySelectorAll('li')[i]; if(li){li.className=state}}
      clearTrace(); step(0,'now');
      log('http','POST /api/deliver-code/'+mask(DEMO_KEY),0); await sleep(220); if(my!==run)return;
      log('db','CodeFetchLog.create status=PENDING',4); await sleep(200); if(my!==run)return;
      log('queue',"queue.add('deliver-code') → #1042",9); await sleep(200); if(my!==run)return;
      log('http','<span class="good">202 Accepted</span>',12); step(0,'done'); step(1,'now'); await sleep(350); if(my!==run)return;
      log('worker',t('jobStart'),340); await sleep(260); if(my!==run)return;
      log('worker',t('decrypt'),352); await sleep(260); if(my!==run)return;
      log('sec',t('ssrf'),371,'sec'); await sleep(420); if(my!==run)return;
      log('imap',t('imapOn'),1180); step(1,'done'); step(2,'now'); await sleep(320); if(my!==run)return;
      log('imap',t('imapScan'),1195); await sleep(700); if(my!==run)return;
      log('imap','<span class="good">'+t('imapHit')+'</span>',3720); step(2,'done'); step(3,'done'); await sleep(260); if(my!==run)return;
      log('db','CodeFetchLog is_success=true',3731); await sleep(240); if(my!==run)return;
      log('http','GET /api/code-delivery-status/1042 → <span class="good">COMPLETED</span>',5012); await sleep(300); if(my!==run)return;
      uses=2; var code=String(Math.floor(100000+Math.random()*900000)); code=code.slice(0,3)+' '+code.slice(3);
      slot.innerHTML='<div class="code-out" aria-label="'+t('codeTitle')+'">'+code+'</div><div class="cool">'+t('next')+'</div>';
      var ok=$('.okc',cust); if(ok) ok.textContent=t('avail')(uses);
    }
    function reset(){run++;keyVal='';uses=3;clearTrace();renderIdle()}
    reset();
    document.addEventListener('langchange',reset);
  }

  /* ---------- 2. rate limiter ---------- */
  function limiter(){
    var host=$('#w-limit .w-body'); if(!host) return;
    var seen,same,n,rows;
    function hex(){var s='';for(var i=0;i<6;i++)s+='0123456789ABCDEF'[Math.floor(Math.random()*16)];return s}
    function reset(){seen=[];same=0;n=0;rows=[];draw()}
    var fixed='DEMO-'+hex()+'-…';
    function attempt(kind){
      n++; var key,blocked=null;
      if(kind==='same'){ key=fixed; same++; if(seen.indexOf(fixed)<0) seen.push(fixed); }
      else { key='DEMO-'+hex()+'-…'; seen.push(key); }
      if(seen.length>5) blocked='d'; else if(same>10) blocked='s';
      rows.push({n:n,key:key,res:blocked?(blocked==='d'?t('a429d'):t('a429s')):t('a404'),bad:!!blocked});
      draw();
    }
    function segs(count,max,warnAt){var h='';for(var i=0;i<max;i++){var c=i<count?(count>max?'over':(i>=warnAt-1&&count>=warnAt?'hot':'on')):'';h+='<span class="seg '+c+'"></span>'}return h}
    function draw(){
      var d=Math.min(seen.length,6), s=Math.min(same,11);
      host.innerHTML='<div class="ctrl"><button class="wbtn primary" id="lr" type="button">'+t('bRand')+'</button><button class="wbtn" id="ls" type="button">'+t('bSame')+'</button><button class="wbtn" id="lx" type="button">'+t('bReset')+'</button></div>'+
        '<div class="meters"><div><div class="meter-h"><span>'+t('cAtt')+'</span><span>'+Math.min(seen.length,5)+' / 5</span></div><div class="segs">'+(function(){var h='';for(var i=0;i<5;i++){h+='<span class="seg '+(seen.length>5?'over':(i<seen.length?(seen.length===5?'hot':'on'):''))+'"></span>'}return h})()+'</div></div>'+
        '<div><div class="meter-h"><span>'+t('cSame')+'</span><span>'+Math.min(same,10)+' / 10</span></div><div class="segs">'+(function(){var h='';for(var i=0;i<10;i++){h+='<span class="seg '+(same>10?'over':(i<same?(same===10?'hot':'on'):''))+'"></span>'}return h})()+'</div></div></div>'+
        '<div class="attempts" id="la">'+(rows.length?rows.map(function(r){return '<div class="att"><span>#'+r.n+'</span><span>'+r.key+'</span><span class="st '+(r.bad?'b':'n')+'">'+r.res+'</span></div>'}).join(''):'<span>'+t('aHint')+'</span>')+'</div>';
      $('#lr',host).addEventListener('click',function(){attempt('rand')});
      $('#ls',host).addEventListener('click',function(){attempt('same')});
      $('#lx',host).addEventListener('click',reset);
      var a=$('#la',host); a.scrollTop=a.scrollHeight;
    }
    reset(); document.addEventListener('langchange',function(){fixed='DEMO-'+hex()+'-…';reset()});
  }

  /* ---------- 3. token race ---------- */
  function race(){
    var host=$('#w-race .w-body'); if(!host) return;
    var co=false,my=0;
    function shell(){
      host.innerHTML='<div class="ctrl"><button class="wbtn primary" id="rg" type="button">'+t('bTwo')+'</button><button class="sw" id="rs" role="switch" aria-checked="'+co+'" type="button"><i></i>'+t('swCo')+'</button></div>'+
        '<div class="lanes"><div class="lane-h">'+t('laneA')+'</div><div class="lane-h">'+t('ms')+'</div><div class="lane-h">'+t('laneB')+'</div></div><div class="evs" id="rev"></div><div class="result" id="rres"></div>';
      $('#rg',host).addEventListener('click',play);
      $('#rs',host).addEventListener('click',function(){co=!co;shell();play()});
    }
    async function play(){
      var id=++my, ev=$('#rev',host), res=$('#rres',host); ev.innerHTML=''; res.className='result'; res.textContent='';
      var seq=co?[[0,'cA1',''],[2,'cB1',''],[1,'cMs','ok'],[0,'cA2','ok'],[2,'cB2','ok']]:[[0,'rA1',''],[2,'rB1',''],[1,'rMs1','ok'],[1,'rMs2','bad'],[2,'rB2','bad']];
      for(var i=0;i<seq.length;i++){
        var s=seq[i], row=document.createElement('div'); row.className='ev';
        var cells=['','',''];
        for(var c=0;c<3;c++){ row.appendChild(document.createElement('span')); }
        var p=document.createElement('div'); p.className='pill '+s[2]; p.textContent=t(s[1]); row.children[s[0]].appendChild(p);
        ev.appendChild(row); requestAnimationFrame((function(r){return function(){r.classList.add('in')}})(row));
        await sleep(560); if(id!==my) return;
      }
      res.classList.add('in',co?'ok':'bad'); res.textContent=co?t('resOk'):t('resBad');
    }
    shell(); document.addEventListener('langchange',function(){my++;shell()});
    if('IntersectionObserver' in window){
      var seen=false, io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!seen){seen=true;io.disconnect();play()}})},{threshold:.6});
      io.observe(host);
    }
  }

  /* ---------- 4. tenant isolation ---------- */
  function tenant(){
    var host=$('#w-tenant .w-body'); if(!host) return;
    var ext=true,store='A';
    var data=[['A',1],['A',2],['B',3],['B',4],['B',5]];
    function draw(){
      var q1="prisma.account.findMany({ where: { platform: 'demo' } })";
      var q2=ext?"prisma.account.findMany({ where: { platform: 'demo', <mark>store_id: 'store_"+store+"'</mark> } })":q1;
      var list=data.filter(function(r){return ext?r[0]===store:true});
      host.innerHTML='<div class="ctrl"><label class="ctrl" style="gap:8px;font-size:13px;color:#c9cfd6">'+t('store')+' <select class="sel" id="ts"><option value="A"'+(store==='A'?' selected':'')+'>'+t('store')+' A</option><option value="B"'+(store==='B'?' selected':'')+'>'+t('store')+' B</option></select></label>'+
        '<button class="sw" id="te" role="switch" aria-checked="'+ext+'" type="button"><i></i>'+t('swExt')+'</button></div>'+
        '<div class="code"><span class="cm">'+t('cmW')+'</span>\n'+q1.replace(/&/g,'&amp;')+'\n\n<span class="cm">'+(ext?t('cmR'):t('cmNo'))+'</span>\n'+q2+'</div>'+
        '<div class="rows">'+list.map(function(r){var leak=ext?false:r[0]!==store;return '<div class="rw'+(leak?' leak':'')+'"><span>'+t('prodN')+' '+r[1]+'</span><small>'+(leak?t('leak'):t('store')+' '+r[0])+'</small></div>'}).join('')+'</div>';
      $('#ts',host).addEventListener('change',function(e){store=e.target.value;draw()});
      $('#te',host).addEventListener('click',function(){ext=!ext;draw()});
    }
    draw(); document.addEventListener('langchange',draw);
  }

  function boot(){delivery();limiter();race();tenant()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
