/*
 * Localization regression checks.
 *
 * Run with `node tests-i18n.cjs` (or `node tests.cjs && node tests-i18n.cjs`).
 * These tests cover what the date tests cannot: locale parity, untranslated
 * strings, formatting rules, export formats and language resolution.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const I = require('./i18n.js');
const X = require('./exporters.js');
const D = require('./calc.js');

const LOCALES = ['en', 'zh-TW', 'ja', 'ko'];
const LATIN_ALLOWED = ['Daybook', 'CSV', 'JavaScript'];
const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const paramNames = value => [...value.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
// `{ord}` and `{n}` both carry the milestone number: English spells an ordinal
// suffix ("100th"), CJK formats the number directly ("第 100 天").
const normalizedParams = value => paramNames(value).map(name => (name === 'ord' ? 'n' : name)).sort();

// --- dictionary shape ------------------------------------------------------
// English uses explicit plural forms (`key.one` / `key.other`); Chinese,
// Japanese and Korean have a single form per message. Parity is therefore
// checked on the plural base (`key`), plus each locale must supply a usable
// form for every English message.
const base = key => key.replace(/\.(one|other)$/, '');
const enKeys = Object.keys(I.DICT.en).sort();
const enBases = [...new Set(enKeys.map(base))].sort();
assert.ok(enBases.length > 100, 'English dictionary looks incomplete');
for (const lang of LOCALES) {
  const keys = Object.keys(I.DICT[lang]).sort();
  const bases = [...new Set(keys.map(base))].sort();
  assert.deepEqual(bases, enBases, `${lang}: messages differ from en (parity)`);
  for (const key of keys) {
    assert.equal(typeof I.DICT[lang][key], 'string', `${lang}.${key}: must be a string`);
    if (!key.endsWith('.sep')) assert.ok(I.DICT[lang][key].trim().length > 0, `${lang}.${key}: empty translation`);
  }
  for (const name of enBases) {
    const family = candidate => [candidate, `${candidate}.one`, `${candidate}.other`].filter(key => key in I.DICT[lang]);
    const params = new Set();
    for (const key of family(name)) for (const param of normalizedParams(I.DICT[lang][key])) params.add(param);
    const enParams = new Set();
    for (const key of [name, `${name}.one`, `${name}.other`].filter(key => key in I.DICT.en)) {
      for (const param of normalizedParams(I.DICT.en[key])) enParams.add(param);
    }
    assert.deepEqual([...params].sort(), [...enParams].sort(), `${lang}.${name}: placeholder mismatch`);
  }
}

// Untranslated values: a non-English string must not simply reuse the English
// text. Brand names and file formats are allowed by the Latin-token check below.
for (const lang of ['zh-TW', 'ja', 'ko']) {
  for (const key of Object.keys(I.DICT[lang])) {
    const value = I.DICT[lang][key];
    const englishFamily = [base(key), `${base(key)}.one`, `${base(key)}.other`]
      .filter(candidate => candidate in I.DICT.en)
      .map(candidate => I.DICT.en[candidate]);
    assert.ok(!englishFamily.includes(value), `${lang}.${key}: still English`);
    const words = value.replace(/<[^>]+>/g, ' ').replace(/\{\w+\}/g, ' ').match(/[A-Za-z]{2,}/g) || [];
    for (const word of words) assert.ok(LATIN_ALLOWED.includes(word), `${lang}.${key}: English fragment "${word}"`);
  }
}

// Every localized key referenced by the markup must exist everywhere.
const markupKeys = new Set();
for (const attr of ['data-i18n', 'data-i18n-html', 'data-i18n-aria', 'data-i18n-placeholder']) {
  const pattern = new RegExp(`${attr}="([^"]+)"`, 'g');
  for (const match of HTML.matchAll(pattern)) markupKeys.add(match[1]);
}
assert.ok(markupKeys.size > 50, 'markup keys were not found');
for (const key of markupKeys) {
  for (const lang of LOCALES) assert.ok(key in I.DICT[lang], `${lang}: missing markup key ${key}`);
}

// Visible text that no data-i18n attribute covers would stay English forever.
function untaggedText(html) {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
  const leftovers = [];
  const stack = [];
  const voidTags = ['meta', 'link', 'input', 'br', 'img', 'hr', 'progress', 'source'];
  for (const token of body.split(/(<[^>]+>)/).filter(Boolean)) {
    if (token.startsWith('<')) {
      if (/^<\//.test(token)) { stack.pop(); continue; }
      if (/^<!/.test(token)) continue;
      const tag = /^<([a-zA-Z0-9-]+)/.exec(token)[1].toLowerCase();
      const tagged = /data-i18n(-html|-aria|-placeholder)?=/.test(token);
      if (!voidTags.includes(tag) && !/\/>$/.test(token)) stack.push({ tag, tagged });
      continue;
    }
    const text = token.trim();
    if (text) leftovers.push({ text, tagged: stack.some(entry => entry.tagged) });
  }
  return leftovers;
}
const TEXT_ALLOWED = ['daybook', 'd.', '↗', '↓', '↑', '+', 'English', '繁體中文', '日本語', '한국어', 'Daybook · Every day counts'];
for (const { text, tagged } of untaggedText(HTML)) {
  if (!tagged) assert.ok(TEXT_ALLOWED.includes(text), `untranslated text outside data-i18n: "${text}"`);
}

// --- language resolution ---------------------------------------------------
assert.equal(I.resolveLang('ja', ['en-US']), 'ja');
assert.equal(I.resolveLang(null, ['zh-HK', 'en']), 'zh-TW');
assert.equal(I.resolveLang(undefined, ['fr-FR', 'ko-KR']), 'ko');
assert.equal(I.resolveLang(null, ['fr-FR']), 'en', 'unknown browser languages fall back to English');
assert.equal(I.resolveLang('de', ['ja-JP']), 'ja', 'invalid saved preference is ignored');
assert.equal(I.resolveLang('zh-CN', []), 'zh-TW', 'all Chinese variants use the Traditional UI');
assert.equal(I.normalize('EN-gb'), 'en');
assert.equal(I.normalize(''), null);

// --- formatting and plurals ------------------------------------------------
const label = (lang, n, inclusive) => { I.setLang(lang, false); return I.milestoneLabel(n, inclusive); };
assert.equal(label('en', 1, false), '1 day');
assert.equal(label('en', 2, false), '2 days');
assert.equal(label('en', 1000, false), '1,000 days');
assert.equal(label('en', 1, true), '1st day');
assert.equal(label('en', 2, true), '2nd day');
assert.equal(label('en', 3, true), '3rd day');
assert.equal(label('en', 11, true), '11th day');
assert.equal(label('en', 100, true), '100th day');
assert.equal(label('zh-TW', 100, false), '100 天');
assert.equal(label('zh-TW', 100, true), '第 100 天');
assert.equal(label('ja', 1000, false), '1,000日');
assert.equal(label('ja', 1000, true), '1,000日目');
assert.equal(label('ko', 1000, false), '1,000일');
assert.equal(label('ko', 1000, true), '1,000일째');

assert.equal(label('en', 1, false).includes('days'), false, 'singular must not pluralize');
I.setLang('en', false);
assert.equal(I.t('status.in', { n: 1 }), 'In 1 day');
assert.equal(I.t('status.in', { n: 2 }), 'In 2 days');
assert.equal(I.t('status.ago', { n: 1 }), '1 day ago');
assert.equal(I.t('birthday.away', { n: 1 }), '1 day away');
assert.equal(I.unit(1, 'year'), '1 year');
assert.equal(I.unit(2, 'year'), '2 years');
I.setLang('ja', false);
assert.equal(I.unit(2, 'month'), '2か月');
assert.equal(I.unit(0, 'day'), '0日');

// Dates and numbers follow the locale, not the browser default.
const sample = new Date(Date.UTC(2000, 3, 10));
const weekdaySample = new Date(Date.UTC(2000, 0, 3));
const compact = value => value.replace(/\s+/g, '');
I.setLang('en', false);
assert.equal(I.formatDate(sample), 'April 10, 2000');
assert.equal(I.formatWeekday(weekdaySample), 'Monday');
I.setLang('zh-TW', false);
assert.equal(compact(I.formatDate(sample)), '2000年4月10日');
assert.equal(I.formatWeekday(weekdaySample), '星期一');
I.setLang('ja', false);
assert.equal(compact(I.formatDate(sample)), '2000年4月10日');
assert.equal(I.formatWeekday(weekdaySample), '月曜日');
I.setLang('ko', false);
assert.equal(compact(I.formatDate(sample)), '2000년4월10일');
assert.equal(I.formatWeekday(weekdaySample), '월요일');
assert.equal(I.formatNumber(1000000), '1,000,000');
assert.equal(I.formatDecimal(98.05, 1), '98.1');

// --- count conventions stay locale-independent -----------------------------
const birth = D.parse('2000-01-01');
assert.equal(D.iso(D.milestone(birth, 100, false)), '2000-04-10', 'day 0: birthday + 100');
assert.equal(D.iso(D.milestone(birth, 100, true)), '2000-04-09', 'day 1: birthday + 99');
assert.equal(D.iso(D.anniversary(D.parse('2024-02-29'), 2025)), '2025-02-28', 'leap-day anniversary');
assert.deepEqual(D.age(D.parse('2024-01-31'), D.parse('2024-02-29')), { years: 0, months: 1, days: 0, totalMonths: 1 }, 'month-end clamp');
assert.equal(D.parse('1900-03-01') - D.parse('1900-02-28'), 1, '1900 is not a leap year');
for (const bad of ['2023-02-29', '0000-01-01', '2024-13-01', 'garbage']) {
  assert.throws(() => D.parse(bad), error => typeof error.code === 'string', `error code for ${bad}`);
}
assert.throws(() => D.milestone(birth, 0), error => error.code === 'milestoneRange');
assert.throws(() => D.milestone(D.parse('9999-12-31'), 1), error => error.code === 'milestoneYear');

// --- CSV export ------------------------------------------------------------
I.setLang('zh-TW', false);
const headers = ['csv.milestone', 'csv.convention', 'csv.date', 'csv.age', 'csv.from', 'csv.calcDate'].map(key => I.t(key));
assert.deepEqual(headers, ['里程碑', '計算方式', '日期', '年齡', '距計算日期（天）', '計算日期']);
const csv = X.buildCsv(headers, [[I.milestoneLabel(1000, false), I.t('counting.elapsed'), '2002-09-27', '2 年 8 個月 26 天', I.formatNumber(-8800), '2026-11-06']]);
assert.ok(csv.startsWith('\uFEFF'), 'CSV keeps its BOM for spreadsheet apps');
assert.ok(csv.includes('"里程碑"'), 'localized header');
assert.ok(csv.includes('"1,000 天"'), 'localized milestone label');
assert.ok(csv.split('\r\n').length === 2, 'one header row plus one data row');
assert.equal(X.csvCell('a"b'), '"a""b"');

// --- calendar export -------------------------------------------------------
I.setLang('ja', false);
const ics = X.buildIcs({
  lang: I.lang(),
  uid: 'daybook-20000101-1000-0@daybook.local',
  start: '2027-05-19',
  end: '2027-05-20',
  summary: I.t('ics.summary', { label: I.milestoneLabel(1000, false) }),
  description: I.t('ics.description', { n: 0 }),
  now: new Date(Date.UTC(2026, 10, 6, 12, 0, 0))
});
assert.ok(ics.includes('PRODID:-//Daybook//Milestones//JA'), 'PRODID follows the locale');
assert.ok(ics.includes('DTSTART;VALUE=DATE:20270519'));
assert.ok(ics.includes('DTEND;VALUE=DATE:20270520'));
assert.ok(ics.includes('SUMMARY:わたしのマイルストーン：1\\,000日'), 'summary is localized and comma-escaped');
assert.ok(ics.includes('DESCRIPTION:誕生日のマイルストーン。誕生日は0日目です。'));
assert.ok(ics.endsWith('\r\n'), 'calendar file ends with CRLF');
assert.ok(ics.split('\r\n').every(line => line === '' || !line.includes('\n')), 'CRLF only');
I.setLang('en', false);
assert.ok(X.buildIcs({ lang: 'en', uid: 'x', start: '2027-05-19', end: '2027-05-20', summary: 'A; B', description: 'line' }).includes('SUMMARY:A\\; B'));

console.log('All localization checks passed.');
