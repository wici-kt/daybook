/*
 * CSV and iCalendar serialisation, kept separate from the DOM so the export
 * formats can be tested in Node. Callers pass already-localized labels.
 */
(function (root) {
  'use strict';

  const BOM = '\uFEFF';

  function csvCell(value) {
    return `"${String(value).replaceAll('"', '""')}"`;
  }

  function buildCsv(headers, rows) {
    return BOM + [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
  }

  function escapeIcs(value) {
    return String(value).replace(/([\\;,])/g, '\\$1').replace(/\r?\n/g, '\\n');
  }

  function icsDate(isoDate) {
    return isoDate.replaceAll('-', '');
  }

  function stamp(date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }

  function buildIcs(options) {
    const { lang, uid, start, end, summary, description } = options;
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//Daybook//Milestones//${String(lang).toUpperCase()}`,
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${stamp(options.now || new Date())}`,
      `DTSTART;VALUE=DATE:${icsDate(start)}`,
      `DTEND;VALUE=DATE:${icsDate(end)}`,
      `SUMMARY:${escapeIcs(summary)}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      'END:VEVENT',
      'END:VCALENDAR',
      ''
    ].join('\r\n');
  }

  const api = { BOM, csvCell, buildCsv, escapeIcs, icsDate, stamp, buildIcs };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DaybookExport = api;
})(typeof window !== 'undefined' ? window : globalThis);
