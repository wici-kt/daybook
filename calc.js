(function(root) {
  'use strict';
  const DAY = 86400000;
  // Errors carry a stable code so the interface can show a localized message
  // while the English text stays useful for tests and console debugging.
  function fail(code, message) { const error = new Error(message); error.code = code; return error; }
  function parse(s) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) throw fail('incomplete', 'Enter a complete date.');
    const [y,m,d] = s.split('-').map(Number);
    if (y < 1 || y > 9999) throw fail('yearRange', 'Use a year from 0001 to 9999.');
    const date = new Date(0); date.setUTCFullYear(y,m-1,d); date.setUTCHours(0,0,0,0);
    if (date.getUTCFullYear()!==y || date.getUTCMonth()!==m-1 || date.getUTCDate()!==d) throw fail('invalidDate', 'Enter a valid calendar date.');
    return date.getTime()/DAY;
  }
  function iso(n) { return new Date(n*DAY).toISOString().slice(0,10); }
  function today() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function parts(n) { const d=new Date(n*DAY); return [d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate()]; }
  function leap(y) { return y%4===0 && (y%100!==0 || y%400===0); }
  function date(y,m,d) { return parse(`${String(y).padStart(4,'0')}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`); }
  function anniversary(b,y) { const [,m,d]=parts(b); return date(y,m,m===2 && d===29 && !leap(y)?28:d); }
  function addMonths(b,count) { const [y,m,d]=parts(b); const total=y*12+m-1+count, yy=Math.floor(total/12), mm=total%12+1; const length=[31,leap(yy)?29:28,31,30,31,30,31,31,30,31,30,31][mm-1]; return date(yy,mm,Math.min(d,length)); }
  function age(b,t) { let months=(parts(t)[0]-parts(b)[0])*12+parts(t)[1]-parts(b)[1]; if(addMonths(b,months)>t) months--; return {years:Math.floor(months/12),months:months%12,days:t-addMonths(b,months),totalMonths:months}; }
  function milestone(b,n,inclusive=false) { if(!Number.isInteger(n)||n<1||n>1000000) throw fail('milestoneRange', 'Choose a whole number from 1 to 1,000,000.'); const result=b+n-(inclusive?1:0); if(result>date(9999,12,31)) throw fail('milestoneYear', 'This milestone falls after year 9999.'); return result; }
  const api={DAY,parse,iso,today,parts,leap,date,anniversary,age,milestone};
  if(typeof module!=='undefined') module.exports=api; else root.Daybook=api;
})(typeof window!=='undefined'?window:globalThis);
