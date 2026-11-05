'use strict';
const D=Daybook, $=id=>document.getElementById(id), fmt=n=>n.toLocaleString('en-US');
const defaults=[100,200,300,365,500,1000,1500,2000,2500,3000,4000,5000,6000,7000,7500,8000,9000,10000,11111,12000,15000,20000,25000,30000,35000,40000,50000,75000,100000];
let custom=new Set(), filter='all', state, demo=true, next;
const fullDate=n=>new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(n*D.DAY));
const weekday=n=>new Intl.DateTimeFormat('en-US',{weekday:'long',timeZone:'UTC'}).format(new Date(n*D.DAY));
const unit=(n,label)=>`${fmt(n)} ${label}${n===1?'':'s'}`;
const ordinal=n=>`${fmt(n)}${n%100>=11&&n%100<=13?'th':({1:'st',2:'nd',3:'rd'}[n%10]||'th')}`;
const ageText=(b,t)=>{const a=D.age(b,t);return `${unit(a.years,'year')}, ${unit(a.months,'month')}, ${unit(a.days,'day')}`;};
function announce(s){$('notice').textContent=s;}
function saveBirthday(){try{if($('remember').checked && !demo && state)localStorage.setItem('daybook-birthday',D.iso(state.b));else localStorage.removeItem('daybook-birthday');}catch{announce('Browser storage is unavailable. Your dates still work for this visit.');}}
function numbers(){return [...new Set([...defaults,...custom])].sort((a,b)=>a-b);}
function milestoneRows(){return numbers().map(n=>{try{return {n,date:D.milestone(state.b,n,state.inclusive)}}catch{return null}}).filter(Boolean);}
function drawRows(){
  const rows=milestoneRows().filter(r=>filter==='all'||(filter==='upcoming'?r.date>state.t:r.date<=state.t));
  $('milestone-rows').replaceChildren();$('empty').hidden=rows.length>0;
  rows.forEach(({n,date})=>{
    const tr=document.createElement('tr');if(next && n===next.n)tr.className='nearest';
    const delta=date-state.t;
    const values=[state.inclusive?`${ordinal(n)} day`:`${fmt(n)} days`,fullDate(date),ageText(state.b,date)];
    values.forEach((v,i)=>{const td=document.createElement('td');td.textContent=v;if(i===0 && custom.has(n)){const small=document.createElement('small');small.textContent='custom';td.append(small);}tr.append(td);});
    const td=document.createElement('td'),badge=document.createElement('span');badge.className='status '+(delta<0?'passed':delta===0?'now':'');badge.textContent=delta===0?'On selected date':delta<0?`${fmt(-delta)} days ago`:`In ${fmt(delta)} days`;td.append(badge);tr.append(td);$('milestone-rows').append(tr);
  });
}
function render(){
  const {b,t,inclusive}=state, days=t-b, age=D.age(b,t);
  $('results').hidden=false;
  $('days').textContent=fmt(days);$('age').textContent=`That’s ${ageText(b,t)}.`;
  $('asof-label').textContent=`As of ${fullDate(t)}`;
  $('weeks').textContent=fmt(Math.floor(days/7));$('months').textContent=fmt(age.totalMonths);$('hours').textContent=fmt(days*24);$('minutes').textContent=fmt(days*1440);$('seconds').textContent=`${fmt(days*86400)} seconds equivalent*`;
  $('weekday').textContent=weekday(b);$('birth-label').textContent=fullDate(b);
  const year=D.parts(t)[0];let birthday=D.anniversary(b,year);if(birthday<t)birthday=D.anniversary(b,year+1);
  const turning=D.parts(birthday)[0]-D.parts(b)[0];
  $('birthday-count').textContent=birthday===t?'Today!':`${fmt(birthday-t)} days away`;
  $('birthday-detail').textContent=`${fullDate(birthday)} · Turning ${turning}`;
  let leapDays=0;for(let y=D.parts(b)[0];y<=year;y++){if(D.leap(y)){const l=D.date(y,2,29);if(l>=b&&l<=t)leapDays++;}}
  $('leap-count').textContent=fmt(leapDays);
  let start=D.anniversary(b,year);if(start>t)start=D.anniversary(b,year-1);const end=D.anniversary(b,D.parts(start)[0]+1), elapsed=t-start, total=end-start;
  $('year-description').textContent=`${fmt(elapsed)} days completed since your last birthday. ${fmt(total-elapsed)} days until your next chapter.`;
  $('year-dots').replaceChildren();for(let i=0;i<total;i++){const dot=document.createElement('i');dot.className='dot'+(i<elapsed?' filled':'');$('year-dots').append(dot);}
  $('year-caption').textContent=`Each dot is a day. ${Math.floor(elapsed/total*100)}% of this birthday year completed.`;
  let candidates=milestoneRows().filter(r=>r.date>t);
  if(!candidates.length){const n=Math.ceil((days+(inclusive?1:0)+1)/1000)*1000;try{candidates=[{n,date:D.milestone(b,n,inclusive)}];}catch{}}
  next=candidates[0];
  if(next){$('next-title').textContent=inclusive?`${ordinal(next.n)} day`:`${fmt(next.n)} days`;$('next-date').textContent=`${weekday(next.date)}, ${fullDate(next.date)}`;$('next-count').textContent=fmt(next.date-t);const target=next.date-b;$('next-progress').value=days/target*100;$('next-detail').textContent=`${(days/target*100).toFixed(1)}% of the way from your birthday`;$('calendar').disabled=false;}
  else{$('next-title').textContent='A very long story';$('next-date').textContent='No more milestones in the supported range.';$('next-count').textContent='—';$('next-progress').value=100;$('next-detail').textContent='Try an earlier calculation date.';$('calendar').disabled=true;}
  $('counting-note').textContent=inclusive?'Birth is day 1. Your 100th day is 99 days after birth. The days-lived total above still shows elapsed days.':'Birth is day 0. Your 100-day milestone is exactly 100 calendar days after birth.';
  drawRows();
}
function calculate(){
  try{const b=D.parse($('birth').value),t=D.parse($('asof').value);if(D.parts(b)[0]>9998||D.parts(t)[0]>9998)throw Error('Choose dates through year 9998.');if(t<b)throw Error('The calculation date must be on or after your birthday.');state={b,t,inclusive:$('counting').value==='inclusive'};$('error').hidden=true;render();saveBirthday();announce(`Calculated ${fmt(t-b)} days lived.`);}
  catch(e){$('error').textContent=e.message;$('error').hidden=false;$('results').hidden=true;}
}
$('date-form').addEventListener('submit',e=>{e.preventDefault();demo=false;$('example').hidden=true;calculate();});
$('today').addEventListener('click',()=>{$('asof').value=D.today();if($('birth').value)calculate();});
$('remember').addEventListener('change',saveBirthday);
$('counting').addEventListener('change',()=>{if(state){state.inclusive=$('counting').value==='inclusive';render();}});
$('clear').addEventListener('click',()=>{try{localStorage.removeItem('daybook-birthday')}catch{}$('birth').value='';$('asof').value=D.today();$('remember').checked=false;$('results').hidden=true;$('example').hidden=true;$('error').hidden=true;$('custom-error').hidden=true;custom.clear();state=undefined;demo=false;announce('Your saved birthday has been removed.');$('birth').focus();});
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{filter=btn.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});drawRows();}));
$('custom-form').addEventListener('submit',e=>{e.preventDefault();try{const n=Number($('custom-day').value);D.milestone(state.b,n,state.inclusive);custom.add(n);$('custom-error').hidden=true;filter='all';document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter==='all');b.setAttribute('aria-pressed',String(b.dataset.filter==='all'));});render();announce(`Added milestone ${fmt(n)}.`);$('custom-day').value='';}catch(e){$('custom-error').textContent=e.message;$('custom-error').hidden=false;}});
function download(content,name,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('csv').addEventListener('click',()=>{const rows=[['Milestone','Counting convention','Date','Age','Days from calculation date','Calculation date'],...milestoneRows().map(r=>[r.n,state.inclusive?'Birth = day 1':'Birth = day 0',D.iso(r.date),ageText(state.b,r.date),r.date-state.t,D.iso(state.t)])];download('\uFEFF'+rows.map(r=>r.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(',')).join('\r\n'),'daybook-milestones.csv','text/csv;charset=utf-8');announce('Milestone CSV downloaded.');});
$('calendar').addEventListener('click',()=>{if(!next)return;const compact=n=>D.iso(n).replaceAll('-','');const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');const content=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Daybook//Milestones//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:daybook-${compact(state.b)}-${next.n}-${state.inclusive?1:0}@daybook.local`,`DTSTAMP:${stamp}`,`DTSTART;VALUE=DATE:${compact(next.date)}`,`DTEND;VALUE=DATE:${compact(next.date+1)}`,`SUMMARY:My ${state.inclusive?ordinal(next.n).replaceAll(',','')+' day':next.n+' days'} milestone`,`DESCRIPTION:Birthday milestone. Birth is day ${state.inclusive?1:0}.`,'END:VEVENT','END:VCALENDAR',''].join('\r\n');download(content,`daybook-${next.n}-days.ics`,'text/calendar;charset=utf-8');announce('Calendar event downloaded. Open the file in your calendar app.');});
$('asof').value=D.today();$('birth').value='2000-01-01';
try{const saved=localStorage.getItem('daybook-birthday');if(saved){D.parse(saved);$('birth').value=saved;$('remember').checked=true;demo=false;$('example').hidden=true;}}catch{}
calculate();
let lastToday=D.today();setInterval(()=>{const now=D.today();if(now!==lastToday){if($('asof').value===lastToday){$('asof').value=now;if(state)calculate();}lastToday=now;}},60000);
