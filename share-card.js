(function (root) {
  'use strict';
  const WIDTH = 1200, HEIGHT = 1500;
  const fonts = {
    en: 'Georgia, serif',
    'zh-TW': '"PingFang TC", "Noto Sans CJK TC", "Microsoft JhengHei", sans-serif',
    ja: '"Hiragino Sans", "Noto Sans CJK JP", "Yu Gothic", sans-serif',
    ko: '"Apple SD Gothic Neo", "Noto Sans CJK KR", "Malgun Gothic", sans-serif'
  };

  function draw(canvas, data) {
    canvas.width = WIDTH; canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw Error('Canvas unavailable');
    const font = fonts[data.lang] || fonts.en;
    ctx.textBaseline = 'top';
    function text(value, x, y, size, color, width = 1008, family = font) {
      ctx.fillStyle = color;
      ctx.font = `${size}px ${family}`;
      while (ctx.measureText(value).width > width && size > 16) {
        size -= 1; ctx.font = `${size}px ${family}`;
      }
      ctx.fillText(value, x, y);
    }
    ctx.fillStyle = '#f7f5ee'; ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#26322e'; ctx.fillRect(0, 0, 18, HEIGHT);
    text('daybook', 96, 86, 48, '#26322e', 600, 'Georgia, serif');
    ctx.fillStyle = '#dcded1'; ctx.fillRect(96, 176, 1008, 2);
    text(data.livedLabel, 96, 244, 38, '#435947');
    text(data.days, 86, 310, 190, '#26322e', 1020, 'Georgia, serif');
    text(data.asOf, 96, 536, 32, '#62685e');

    ctx.fillStyle = '#26322e'; ctx.beginPath(); ctx.roundRect(72, 646, 1056, 564, 30); ctx.fill();
    text(data.nextLabel, 120, 700, 32, '#edbe76', 960);
    text(data.milestone, 120, 778, 78, '#f7f5ee', 960);
    text(data.date, 120, 892, 38, '#e1e7dc', 960);
    text(data.countdown, 120, 992, 56, '#edbe76', 960);
    text(data.convention, 120, 1120, 25, '#d4dccd', 960);

    text(data.footer, 96, 1280, 30, '#435947');
    text('wici-kt.github.io/daybook', 96, 1382, 25, '#62685e', 1008, 'Arial, sans-serif');
    return canvas;
  }

  async function create(data) {
    if (document.fonts) await document.fonts.ready;
    const canvas = draw(document.createElement('canvas'), data);
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => blob ? resolve(blob) : reject(Error('Image unavailable')), 'image/png');
    });
  }
  root.DaybookShare = { create, draw };
})(typeof window !== 'undefined' ? window : globalThis);
