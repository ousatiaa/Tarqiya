// ===== Data =====
const RANKS = [
  {from:1,to:2,minNote:10,fast:1.5,slow:2},
  {from:2,to:3,minNote:10,fast:1.5,slow:2},
  {from:3,to:4,minNote:10,fast:2,slow:2.5},
  {from:4,to:5,minNote:11,fast:2,slow:2.5},
  {from:5,to:6,minNote:12,fast:2,slow:3},
  {from:6,to:7,minNote:13,fast:2.5,slow:3.5},
  {from:7,to:8,minNote:14,fast:2.5,slow:3.5},
  {from:8,to:9,minNote:15,fast:3,slow:4},
  {from:9,to:10,minNote:16,fast:3,slow:4},
];

const RANKS10 = [
  {rank:1,indice:275,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:2,indice:300,fast:'سنة ونصف',medium:'سنة ونصف',slow:'سنة ونصف'},
  {rank:3,indice:326,fast:'سنتان',medium:'سنتان ونصف',slow:'سنتان ونصف'},
  {rank:4,indice:351,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:5,indice:377,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:6,indice:402,fast:'سنتان',medium:'ثلاث سنوات',slow:'ثلاث سنوات'},
  {rank:7,indice:428,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:8,indice:456,fast:'سنتان',medium:'ثلاث سنوات',slow:'ثلاث سنوات'},
  {rank:9,indice:484,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:10,indice:512,fast:'سنتان',medium:'ثلاث سنوات',slow:'ثلاث سنوات'},
  {rank:'10 (امتياز)',indice:564,fast:'سنتان',medium:'سنتان على الأقل',slow:'سنتان على الأقل'},
];
const RANKS11 = [
  {rank:1,indice:336,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:2,indice:369,fast:'سنة ونصف',medium:'سنة ونصف',slow:'سنة ونصف'},
  {rank:3,indice:403,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:4,indice:436,fast:'سنتان',medium:'سنتان ونصف',slow:'سنتان ونصف'},
  {rank:5,indice:472,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:6,indice:509,fast:'سنتان',medium:'ثلاث سنوات',slow:'ثلاث سنوات'},
  {rank:7,indice:542,fast:'سنتان',medium:'ثلاث سنوات',slow:'ثلاث سنوات'},
  {rank:8,indice:574,fast:'سنتان',medium:'ثلاث سنوات',slow:'ثلاث سنوات'},
  {rank:9,indice:606,fast:'سنتان',medium:'ثلاث سنوات',slow:'ثلاث سنوات'},
  {rank:10,indice:639,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:11,indice:672,fast:'سنتان',medium:'سنتان',slow:'سنتان'},
  {rank:12,indice:704,fast:'سنتان',medium:'ثلاث سنوات',slow:'ثلاث سنوات'},
];
const RANKSHC = [
  {rank:1,indice:1704,fast:'—',medium:'—',slow:'—'},
  {rank:2,indice:1128,fast:'—',medium:'—',slow:'—'},
  {rank:3,indice:7279,fast:'—',medium:'—',slow:'—'},
  {rank:4,indice:779,fast:'—',medium:'—',slow:'—'},
  {rank:5,indice:812,fast:'—',medium:'—',slow:'—'},
  {rank:6,indice:840,fast:'سنتان',medium:'ثلاث سنوات',slow:'ثلاث سنوات'},
  {rank:7,indice:870,fast:'—',medium:'—',slow:'—'},
  {rank:8,indice:900,fast:'—',medium:'—',slow:'—'},
  {rank:9,indice:930,fast:'—',medium:'—',slow:'—'},
];

const THRESHOLDS = {
  primary: { '2to1': 110, '1toHC': 116.5 },
  middle: { '2to1': 101, '1toHC': 116 },
  secondary: { '2to1': 95, '1toHC': 91 },
};
const CYCLE_LABELS = {primary:'التعليم الابتدائي',middle:'التعليم الإعدادي',secondary:'التعليم التأهيلي'};
const MONTHS = ['يناير','فبراير','مارس','أبريل','ماي','يونيو','يوليوز','غشت','شتنبر','أكتوبر','نونبر','دجنبر'];

// ===== Tabs =====
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-'+btn.dataset.tab).classList.add('active');
  });
});

// ===== Date helpers =====
function yearsBetween(d1, m1, y1, d2, m2, y2){
  let years = y2 - y1;
  if(m1 > m2 || (m1 === m2 && d1 > d2)){ years -= 1; }
  return Math.max(0, years);
}

// ===== Calculator =====
function calcPoints(){
  const cycle = document.getElementById('c-cycle').value;
  const sana = parseInt(document.getElementById('c-sana').value)||2026;
  const adminD = parseInt(document.getElementById('c-admin-d').value)||1;
  const adminM = parseInt(document.getElementById('c-admin-m').value)||1;
  const adminY = parseInt(document.getElementById('c-admin-y').value)||0;
  const scaleD = parseInt(document.getElementById('c-scale-d').value)||1;
  const scaleM = parseInt(document.getElementById('c-scale-m').value)||1;
  const scaleY = parseInt(document.getElementById('c-scale-y').value)||0;
  if(!adminY||!scaleY){ alert('المرجو إدخال تواريخ الأقدمية.'); return; }

  const am = yearsBetween(adminD, adminM, adminY, 31, 12, sana);
  const salm = yearsBetween(scaleD, scaleM, scaleY, 31, 12, sana);
  const ptsAm = am*1;
  const ptsSalm = salm*2;
  const modir = parseFloat(document.getElementById('c-modir').value)||0;
  const mouf = parseFloat(document.getElementById('c-moufattish').value)||0;
  const naib = parseFloat(document.getElementById('c-naib').value)||0;
  const ptsPro = modir+mouf+naib;
  const total = ptsAm + ptsSalm + ptsPro;

  document.getElementById('r-am').textContent = ptsAm;
  document.getElementById('r-salm').textContent = ptsSalm;
  document.getElementById('r-pro').textContent = ptsPro.toFixed(2);
  document.getElementById('r-total').textContent = total.toFixed(2);
  document.getElementById('r-total2').textContent = total.toFixed(2);

  const promoType = document.getElementById('c-promotype').value;
  const stored = JSON.parse(localStorage.getItem('tarqiya_thresholds')||'null');
  const thrMap = stored || THRESHOLDS;
  const thr = (thrMap[cycle] && thrMap[cycle][promoType]) || 100;
  const promoLabel = promoType === '2to1' ? 'من الدرجة 2 إلى 1' : 'من الدرجة 1 إلى خارج السلم';
  const v = document.getElementById('calc-verdict');
  let msg='',cls='';
  if(total >= thr+5){ msg='✅ نقاط ممتازة — تفوق عتبة '+CYCLE_LABELS[cycle]+' ('+promoLabel+') (~'+thr+')'; cls='good'; }
  else if(total >= thr){ msg='🟡 نقاط جيدة — بلغت عتبة '+CYCLE_LABELS[cycle]+' ('+promoLabel+') (~'+thr+')'; cls='good'; }
  else if(total >= thr-5){ msg='🟠 نقاط قريبة من العتبة ('+thr+') — تعتمد على الحصة والترتيب'; cls='warn'; }
  else { msg='🔴 نقاط دون العتبة التقريبية ('+thr+') — راجع الأقدمية/النقط'; cls='bad'; }
  v.textContent = msg; v.className='verdict '+cls;

  document.getElementById('calc-result').hidden = false;
  saveInputs();
}

function resetCalc(){
  document.getElementById('calc-result').hidden = true;
}

function saveInputs(){
  const data = {
    cycle: document.getElementById('c-cycle').value,
    promotype: document.getElementById('c-promotype').value,
    sana: document.getElementById('c-sana').value,
    adminD: document.getElementById('c-admin-d').value,
    adminM: document.getElementById('c-admin-m').value,
    adminY: document.getElementById('c-admin-y').value,
    scaleD: document.getElementById('c-scale-d').value,
    scaleM: document.getElementById('c-scale-m').value,
    scaleY: document.getElementById('c-scale-y').value,
    modir: document.getElementById('c-modir').value,
    mouf: document.getElementById('c-moufattish').value,
    naib: document.getElementById('c-naib').value,
  };
  localStorage.setItem('tarqiya_calc_inputs', JSON.stringify(data));
}

function loadInputs(){
  try{
    const d = JSON.parse(localStorage.getItem('tarqiya_calc_inputs')||'{}');
    if(d.cycle) document.getElementById('c-cycle').value=d.cycle;
    if(d.promotype) document.getElementById('c-promotype').value=d.promotype;
    if(d.sana) document.getElementById('c-sana').value=d.sana;
    if(d.adminD) document.getElementById('c-admin-d').value=d.adminD;
    if(d.adminM) document.getElementById('c-admin-m').value=d.adminM;
    if(d.adminY) document.getElementById('c-admin-y').value=d.adminY;
    if(d.scaleD) document.getElementById('c-scale-d').value=d.scaleD;
    if(d.scaleM) document.getElementById('c-scale-m').value=d.scaleM;
    if(d.scaleY) document.getElementById('c-scale-y').value=d.scaleY;
    if(d.modir) document.getElementById('c-modir').value=d.modir;
    if(d.mouf) document.getElementById('c-moufattish').value=d.mouf;
    if(d.naib) document.getElementById('c-naib').value=d.naib;
  }catch(e){}
}

// ===== Eligibility =====
function checkElig(){
  const cycle = document.getElementById('e-cycle').value;
  const rank = parseInt(document.getElementById('e-rank').value);
  const yearsRank = parseFloat(document.getElementById('e-years-rank').value)||0;
  const yearsScale = parseFloat(document.getElementById('e-years-scale').value)||0;
  const yearsGen = parseFloat(document.getElementById('e-years-gen').value)||0;
  const insp = parseFloat(document.getElementById('e-insp').value)||0;
  const insc = parseInt(document.getElementById('e-insc').value)||0;

  const r = RANKS.find(x=>x.from===rank);
  let html = '<div class="big-num"><div class="num">'+rank+'</div><div class="lbl">الرتبة الحالية</div></div><div class="rows">';
  html += '<div class="row"><span>السلك</span><span>'+CYCLE_LABELS[cycle]+'</span></div>';

  const eligChoice = yearsScale >= 10;
  html += '<div class="row"><span>الترقية بالاختيار (في السلم)</span><span>'+(eligChoice?'✅ مستوفٍ (≥10 سنوات)':'❌ غير مستوفٍ (<10 سنوات)')+'</span></div>';

  const capping = insc>=4;
  html += '<div class="row"><span>التسقيف (4 تقييدات)</span><span>'+(capping?'✅ مؤهل للتسقيف':'—')+'</span></div>';

  if(r){
    const fastOk = yearsRank >= r.fast && insp >= r.minNote;
    const slowOk = yearsRank >= r.slow;
    html += '<div class="row"><span>الرتبة الموالية</span><span>الرتبة '+r.to+'</span></div>';
    html += '<div class="row"><span>نقطة التفتيش المطلوبة</span><span>'+r.minNote+' / 20</span></div>';
    html += '<div class="row"><span>نقطة التفتيش لديك</span><span>'+insp.toFixed(2)+'</span></div>';
    html += '<div class="row"><span>النسق السريع</span><span>'+r.fast+' سنوات'+(fastOk?' ✅':' ❌')+'</span></div>';
    html += '<div class="row"><span>النسق البطيء (أقدمية)</span><span>'+r.slow+' سنوات'+(slowOk?' ✅':' ❌')+'</span></div>';
    let verdict='';
    if(fastOk){ verdict='✅ مؤهل للترقية بالاختيار (نسق سريع) إلى الرتبة '+r.to; }
    else if(slowOk){ verdict='🟡 مؤهل للترقية بالأقدمية (نسق بطيء) إلى الرتبة '+r.to; }
    else if(insp < r.minNote){ verdict='🔴 نقطة التفتيش غير كافية (المطلوب '+r.minNote+')'; }
    else { verdict='🟠 لم تكتمل مدة الخدمة في الرتبة ('+yearsRank+'/'+r.fast+' أو '+r.slow+')'; }
    html += '</div><div class="verdict '+(fastOk?'good':(slowOk?'warn':'bad'))+'">'+verdict+'</div>';
  } else {
    html += '</div><div class="verdict warn">أنت في أعلى رتبة (10).</div>';
  }

  document.getElementById('elig-result').innerHTML = html;
  document.getElementById('elig-result').hidden = false;
}

// ===== Tables =====
function buildRanks10Table(){
  const tb = document.getElementById('ranks10-tbody');
  if(!tb) return;
  tb.innerHTML = RANKS10.map(s=>`<tr><td>${s.rank}</td><td>${s.indice}</td><td>${s.fast}</td><td>${s.medium}</td><td>${s.slow}</td></tr>`).join('');
}
function buildRanks11Table(){
  const tb = document.getElementById('ranks11-tbody');
  if(!tb) return;
  tb.innerHTML = RANKS11.map(s=>`<tr><td>${s.rank}</td><td>${s.indice}</td><td>${s.fast}</td><td>${s.medium}</td><td>${s.slow}</td></tr>`).join('');
}
function buildRanksHCTable(){
  const tb = document.getElementById('ranksHC-tbody');
  if(!tb) return;
  tb.innerHTML = RANKSHC.map(s=>`<tr><td>${s.rank}</td><td>${s.indice}</td><td>${s.fast}</td><td>${s.medium}</td><td>${s.slow}</td></tr>`).join('');
}
function populateDateSelects(){
  const days = Array.from({length:31},(_,i)=>i+1);
  document.querySelectorAll('select.date-part').forEach(sel=>{
    const isMonth = sel.id.endsWith('-m');
    if(isMonth){
      sel.innerHTML = MONTHS.map((m,i)=>`<option value="${i+1}" ${i===8?'selected':''}>${m}</option>`).join('');
    } else {
      sel.innerHTML = days.map(d=>`<option value="${d}" ${d===1?'selected':''}>${d}</option>`).join('');
    }
  });
}

// ===== Saved results =====
function saveCalc(){
  const total = document.getElementById('r-total').textContent;
  const items = JSON.parse(localStorage.getItem('tarqiya_saved')||'[]');
  items.unshift({date:new Date().toLocaleString('ar'), total, ts:Date.now()});
  localStorage.setItem('tarqiya_saved', JSON.stringify(items.slice(0,20)));
  renderSaved();
}
function renderSaved(){
  const items = JSON.parse(localStorage.getItem('tarqiya_saved')||'[]');
  const el = document.getElementById('saved-list');
  if(!el) return;
  if(!items.length){ el.innerHTML='<p class="hint">لا توجد نتائج محفوظة.</p>'; return; }
  el.innerHTML = items.map(it=>`<div class="saved-item"><div class="title">${it.total} نقطة</div><div class="meta">${it.date}</div></div>`).join('');
}
function clearSaved(){
  if(confirm('مسح جميع النتائج المحفوظة؟')){ localStorage.removeItem('tarqiya_saved'); renderSaved(); }
}

// ===== PWA install =====
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e=>{
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').hidden = false;
});
document.getElementById('installBtn').addEventListener('click', async ()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('installBtn').hidden = true;
});

// ===== Service worker =====
let swRegistration = null;
if('serviceWorker' in navigator){
  window.addEventListener('load', async ()=>{
    try {
      swRegistration = await navigator.serviceWorker.register('sw.js');
      swRegistration.addEventListener('updatefound', ()=>{
        const newWorker = swRegistration.installing;
        if(!newWorker) return;
        newWorker.addEventListener('statechange', ()=>{
          if(newWorker.state === 'installed' && navigator.serviceWorker.controller){
            showUpdateBanner();
          }
        });
      });
    } catch(e){}
  });
}

function showUpdateBanner(){
  let banner = document.getElementById('update-banner');
  if(!banner){
    banner = document.createElement('div');
    banner.id = 'update-banner';
    banner.style.cssText = 'position:fixed;bottom:10px;left:10px;right:10px;background:#1e5f3a;color:#fff;padding:12px 16px;border-radius:10px;z-index:100;display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:14px;';
    banner.innerHTML = '<span>تحديث متوفر</span><button id="applyUpdateBtn" style="background:#fff;color:#1e5f3a;border:none;padding:6px 12px;border-radius:6px;font-weight:700;cursor:pointer;">تطبيق</button>';
    document.body.appendChild(banner);
    document.getElementById('applyUpdateBtn').addEventListener('click', ()=>{
      if(swRegistration && swRegistration.waiting){
        swRegistration.waiting.postMessage({type:'SKIP_WAITING'});
      }
      window.location.reload();
    });
  }
}

// update button (manual check / remote update)
document.getElementById('updateBtn').addEventListener('click', async ()=>{
  const btn = document.getElementById('updateBtn');
  btn.textContent = '...';
  try {
    const remoteUrl = localStorage.getItem('tarqiya_remote_url');
    if(remoteUrl){
      // fetch latest from remote (no reinstall needed)
      window.location.href = remoteUrl;
      return;
    }
    // ask for remote URL
    const url = prompt('أدخل رابط التحديث (GitHub Pages / Netlify):', 'https://');
    if(url && url.startsWith('http')){
      localStorage.setItem('tarqiya_remote_url', url);
      window.location.href = url;
    } else {
      // fallback: SW check
      if(swRegistration){
        await swRegistration.update();
        if(swRegistration.waiting){
          showUpdateBanner();
        } else {
          btn.textContent = '✅ محدّث';
          setTimeout(()=>{ btn.textContent = '🔄 تحديث'; }, 2000);
        }
      } else {
        btn.textContent = '🔄 تحديث';
      }
    }
  } catch(e){
    btn.textContent = '🔄 تحديث';
  }
});

// auto-reload when new SW takes control
if('serviceWorker' in navigator){
  navigator.serviceWorker.addEventListener('controllerchange', ()=>{ window.location.reload(); });
}

// ===== Thresholds =====
function loadThresholds(){
  const stored = JSON.parse(localStorage.getItem('tarqiya_thresholds')||'null');
  const m = stored || THRESHOLDS;
  document.getElementById('t-primary-2to1').value = m.primary['2to1'];
  document.getElementById('t-primary-1toHC').value = m.primary['1toHC'];
  document.getElementById('t-middle-2to1').value = m.middle['2to1'];
  document.getElementById('t-middle-1toHC').value = m.middle['1toHC'];
  document.getElementById('t-secondary-2to1').value = m.secondary['2to1'];
  document.getElementById('t-secondary-1toHC').value = m.secondary['1toHC'];
}
function saveThresholds(){
  const m = {
    primary: { '2to1': parseFloat(document.getElementById('t-primary-2to1').value)||110, '1toHC': parseFloat(document.getElementById('t-primary-1toHC').value)||116.5 },
    middle: { '2to1': parseFloat(document.getElementById('t-middle-2to1').value)||101, '1toHC': parseFloat(document.getElementById('t-middle-1toHC').value)||116 },
    secondary: { '2to1': parseFloat(document.getElementById('t-secondary-2to1').value)||95, '1toHC': parseFloat(document.getElementById('t-secondary-1toHC').value)||91 },
  };
  localStorage.setItem('tarqiya_thresholds', JSON.stringify(m));
  alert('تم حفظ العتبات.');
}
function resetThresholds(){
  localStorage.removeItem('tarqiya_thresholds');
  loadThresholds();
  alert('تم إعادة تعيين العتبات.');
}

// ===== Auto-update from remote =====
(function(){
  const remoteUrl = localStorage.getItem('tarqiya_remote_url');
  if(remoteUrl && remoteUrl.startsWith('http') && !window.location.href.startsWith(remoteUrl)){
    window.location.replace(remoteUrl);
  }
})();

// ===== Init =====
buildRanks10Table();
buildRanks11Table();
buildRanksHCTable();
populateDateSelects();
loadInputs();
loadThresholds();
renderSaved();