'use strict';
const D=Daybook, I=DaybookI18n, X=DaybookExport, $=id=>document.getElementById(id);
const defaults=[100,200,300,365,500,1000,1500,2000,2500,3000,4000,5000,6000,7000,7500,8000,9000,10000,11111,12000,15000,20000,25000,30000,35000,40000,50000,75000,100000];
let custom=new Set(), filter='all', state, demo=true, next, errorState=null, customErrorState=null;
const fmt=n=>I.formatNumber(n);
const fullDate=n=>I.formatDate(new Date(n*D.DAY));
const weekday=n=>I.formatWeekday(new Date(n*D.DAY));
const milestoneLabel=(n,inclusive)=>I.milestoneLabel(n,inclusive);
const ageText=(b,t)=>{const a=D.age(b,t);return [I.unit(a.years,'year'),I.unit(a.months,'month'),I.unit(a.days,'day')].join(I.t('list.sep'));};
const announce=s=>{$('notice').textContent=s;};
const coded=(code,message)=>{const error=new Error(message);error.code=code;return error;};
const errorText=e=>e&&e.code&&I.DICT.en['err.'+e.code]?I.t('err.'+e.code):e.message;
function paintError(){if(!errorState){$('error').hidden=true;return;}$('error').textContent=errorText(errorState);$('error').hidden=false;}
function paintCustomError(){if(!customErrorState){$('custom-error').hidden=true;return;}$('custom-error').textContent=errorText(customErrorState);$('custom-error').hidden=false;}
function saveBirthday(){try{if($('remember').checked && !demo && state)localStorage.setItem('daybook-birthday',D.iso(state.b));else localStorage.removeItem('daybook-birthday');}catch{announce(I.t('announce.storage'));}}
function numbers(){return [...new Set([...defaults,...custom])].sort((a,b)=>a-b);}
function milestoneRows(){return numbers().map(n=>{try{return {n,date:D.milestone(state.b,n,state.inclusive)}}catch{return null}}).filter(Boolean);}

// Applies every static string, then re-renders the live numbers so a language
// change never touches the inputs, the calculation, or the chosen filters.
function applyLanguage(){
  if($('share-dialog').open)$('share-dialog').close();
  $('lang').value=I.lang();
  $('notice').textContent='';
  document.title=I.t('meta.title');
  $('meta-desc').setAttribute('content',I.t('meta.description'));
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=I.t(el.dataset.i18n);});
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{el.innerHTML=I.t(el.dataset.i18nHtml);});
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{el.setAttribute('aria-label',I.t(el.dataset.i18nAria));});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.setAttribute('placeholder',I.t(el.dataset.i18nPlaceholder));});
  paintError();paintCustomError();
  if(state&&!errorState)render();
}

function drawRows(){
  const rows=milestoneRows().filter(r=>filter==='all'||(filter==='upcoming'?r.date>state.t:r.date<=state.t));
  $('milestone-rows').replaceChildren();$('empty').hidden=rows.length>0;
  rows.forEach(({n,date})=>{
    const tr=document.createElement('tr');if(next && n===next.n)tr.className='nearest';
    const delta=date-state.t;
    const values=[milestoneLabel(n,state.inclusive),fullDate(date),ageText(state.b,date)];
    values.forEach((v,i)=>{const td=document.createElement('td');td.textContent=v;if(i===0 && custom.has(n)){const small=document.createElement('small');small.textContent=I.t('custom.tag');td.append(small);}tr.append(td);});
    const td=document.createElement('td'),badge=document.createElement('span');badge.className='status '+(delta<0?'passed':delta===0?'now':'');
    badge.textContent=delta===0?I.t('status.now'):I.t(delta<0?'status.ago':'status.in',{n:Math.abs(delta)});
    td.append(badge);tr.append(td);$('milestone-rows').append(tr);
  });
}

function render(){
  const {b,t,inclusive}=state, days=t-b, age=D.age(b,t);
  $('results').hidden=false;
  $('days').textContent=fmt(days);$('age').textContent=I.t('age.that',{age:ageText(b,t)});
  $('asof-label').textContent=I.t('asof',{date:fullDate(t)});
  $('weeks').textContent=fmt(Math.floor(days/7));$('months').textContent=fmt(age.totalMonths);$('hours').textContent=fmt(days*24);$('minutes').textContent=fmt(days*1440);$('seconds').textContent=I.t('seconds.equivalent',{n:days*86400});
  $('weekday').textContent=weekday(b);$('birth-label').textContent=fullDate(b);
  const year=D.parts(t)[0];let birthday=D.anniversary(b,year);if(birthday<t)birthday=D.anniversary(b,year+1);
  const turning=D.parts(birthday)[0]-D.parts(b)[0];
  $('birthday-count').textContent=birthday===t?I.t('birthday.today'):I.t('birthday.away',{n:birthday-t});
  $('birthday-detail').textContent=I.t('birthday.detail',{date:fullDate(birthday),age:fmt(turning)});
  let leapDays=0;for(let y=D.parts(b)[0];y<=year;y++){if(D.leap(y)){const l=D.date(y,2,29);if(l>=b&&l<=t)leapDays++;}}
  $('leap-count').textContent=fmt(leapDays);
  let start=D.anniversary(b,year);if(start>t)start=D.anniversary(b,year-1);const end=D.anniversary(b,D.parts(start)[0]+1), elapsed=t-start, total=end-start;
  $('year-description').textContent=I.t('year.description',{done:fmt(elapsed),left:fmt(total-elapsed)});
  $('year-dots').replaceChildren();for(let i=0;i<total;i++){const dot=document.createElement('i');dot.className='dot'+(i<elapsed?' filled':'');$('year-dots').append(dot);}
  $('year-caption').textContent=I.t('year.caption',{pct:I.formatDecimal(elapsed/total*100,0)});
  let candidates=milestoneRows().filter(r=>r.date>t);
  if(!candidates.length){const n=Math.ceil((days+(inclusive?1:0)+1)/1000)*1000;try{candidates=[{n,date:D.milestone(b,n,inclusive)}];}catch{}}
  next=candidates[0];
  if(next){
    $('next-title').textContent=milestoneLabel(next.n,inclusive);
    $('next-date').textContent=I.t('date.weekday',{weekday:weekday(next.date),date:fullDate(next.date)});
    $('next-count').textContent=fmt(next.date-t);const target=next.date-b;
    $('next-progress').value=days/target*100;
    $('next-detail').textContent=I.t('next.progress',{pct:I.formatDecimal(days/target*100,1)});
    $('calendar').disabled=false;
  }
  else{$('next-title').textContent=I.t('next.fallbackTitle');$('next-date').textContent=I.t('next.fallbackDate');$('next-count').textContent='—';$('next-progress').value=100;$('next-detail').textContent=I.t('next.fallbackDetail');$('calendar').disabled=true;}
  $('counting-note').textContent=I.t(inclusive?'counting.note.inclusive':'counting.note.elapsed');
  drawRows();
}

function calculate(){
  try{
    const b=D.parse($('birth').value),t=D.parse($('asof').value);
    if(D.parts(b)[0]>9998||D.parts(t)[0]>9998)throw coded('throughYear',I.t('err.throughYear'));
    if(t<b)throw coded('beforeBirth',I.t('err.beforeBirth'));
    state={b,t,inclusive:$('counting').value==='inclusive'};
    errorState=null;paintError();render();saveBirthday();
    announce(I.t('announce.calculated',{n:t-b}));
  }catch(e){
    state=undefined;errorState={code:e.code,message:e.message};paintError();$('results').hidden=true;
  }
}

$('date-form').addEventListener('submit',e=>{e.preventDefault();demo=false;$('example').hidden=true;calculate();});
$('today').addEventListener('click',()=>{$('asof').value=D.today();if($('birth').value)calculate();});
$('remember').addEventListener('change',saveBirthday);
$('lang').addEventListener('change',e=>{I.setLang(e.target.value);});
$('counting').addEventListener('change',()=>{if(state){state.inclusive=$('counting').value==='inclusive';render();}});
$('clear').addEventListener('click',()=>{
  try{localStorage.removeItem('daybook-birthday')}catch{}
  $('birth').value='';$('asof').value=D.today();$('remember').checked=false;
  $('results').hidden=true;$('example').hidden=true;custom.clear();state=undefined;demo=false;
  errorState=null;customErrorState=null;paintError();paintCustomError();
  announce(I.t('announce.cleared'));$('birth').focus();
});
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  filter=btn.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});
  if(state)drawRows();
}));
$('custom-form').addEventListener('submit',e=>{
  e.preventDefault();if(!state)return;
  try{
    const n=Number($('custom-day').value);D.milestone(state.b,n,state.inclusive);
    custom.add(n);customErrorState=null;paintCustomError();
    filter='all';document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter==='all');b.setAttribute('aria-pressed',String(b.dataset.filter==='all'));});
    render();announce(I.t('announce.added',{n}));$('custom-day').value='';
  }catch(e){customErrorState={code:e.code,message:e.message};paintCustomError();}
});

function download(content,name,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('csv').addEventListener('click',()=>{
  if(!state)return;
  const rows=milestoneRows().map(r=>[
    milestoneLabel(r.n,state.inclusive),
    I.t(state.inclusive?'counting.inclusive':'counting.elapsed'),
    D.iso(r.date),
    ageText(state.b,r.date),
    fmt(r.date-state.t),
    D.iso(state.t)
  ]);
  download(X.buildCsv([I.t('csv.milestone'),I.t('csv.convention'),I.t('csv.date'),I.t('csv.age'),I.t('csv.from'),I.t('csv.calcDate')],rows),'daybook-milestones.csv','text/csv;charset=utf-8');
  announce(I.t('announce.csv'));
});
$('calendar').addEventListener('click',()=>{
  if(!next||!state)return;
  const content=X.buildIcs({
    lang:I.lang(),
    uid:`daybook-${D.iso(state.b).replaceAll('-','')}-${next.n}-${state.inclusive?1:0}@daybook.local`,
    start:D.iso(next.date),
    end:D.iso(next.date+1),
    summary:I.t('ics.summary',{label:milestoneLabel(next.n,state.inclusive)}),
    description:I.t('ics.description',{n:state.inclusive?1:0})
  });
  download(content,`daybook-${next.n}-days.ics`,'text/calendar;charset=utf-8');
  announce(I.t('announce.ics'));
});

let shareBlob, shareUrl, shareFilename, shareGeneration=0;
function clearShare(){
  shareGeneration++;
  if(shareUrl)URL.revokeObjectURL(shareUrl);
  shareUrl=undefined;shareBlob=undefined;
  $('share-preview').removeAttribute('src');$('share-preview').hidden=true;
  $('share-download').disabled=true;
}
$('share-close').addEventListener('click',()=>$('share-dialog').close());
$('share-dialog').addEventListener('close',clearShare);
$('share').addEventListener('click',async()=>{
  if(!state||errorState)return;
  clearShare();
  const generation=shareGeneration;
  const data={
    lang:I.lang(),days:fmt(state.t-state.b),livedLabel:I.t('share.lived'),
    asOf:I.t('asof',{date:fullDate(state.t)}),nextLabel:I.t('share.next'),
    milestone:next?milestoneLabel(next.n,state.inclusive):I.t('share.none'),
    date:next?fullDate(next.date):'',countdown:next?I.t('birthday.away',{n:next.date-state.t}):'',
    convention:I.t(state.inclusive?'counting.inclusive':'counting.elapsed'),
    footer:I.t('footer.tagline')
  };
  shareFilename=`daybook-${state.t-state.b}-days-${I.lang()}.png`;
  $('share-error').hidden=true;$('share-status').textContent=I.t('share.loading');
  $('share-dialog').showModal();
  try{
    const blob=await DaybookShare.create(data);
    if(generation!==shareGeneration||!$('share-dialog').open)return;
    shareBlob=blob;shareUrl=URL.createObjectURL(blob);
    $('share-preview').src=shareUrl;
    $('share-preview').alt=data.date?I.t('share.alt',data):[data.livedLabel,data.days,data.asOf,data.milestone].join(' · ');
    $('share-preview').hidden=false;$('share-status').textContent='';$('share-download').disabled=false;
  }catch{
    if(generation!==shareGeneration)return;
    $('share-status').textContent='';$('share-error').textContent=I.t('share.error');$('share-error').hidden=false;
  }
});
$('share-download').addEventListener('click',()=>{
  if(!shareBlob)return;
  download(shareBlob,shareFilename,'image/png');
  $('share-status').textContent=I.t('share.saved');
});

$('asof').value=D.today();$('birth').value='2000-01-01';
try{const saved=localStorage.getItem('daybook-birthday');if(saved){D.parse(saved);$('birth').value=saved;$('remember').checked=true;demo=false;$('example').hidden=true;}}catch{}
I.init({onChange:applyLanguage});
calculate();
let lastToday=D.today();setInterval(()=>{const now=D.today();if(now!==lastToday){if($('asof').value===lastToday){$('asof').value=now;if(state)calculate();}lastToday=now;}},60000);
