/* Лист эмоций героев (design/emotions/*.png): t=0.5 — Никита (EN), t=1.5 — Том (ET). Пересобрать: tools/make.sh emo_sheet snap 0.5,1.5 */
const CUE = {}, SHAKES = [], EP = { title: ['', ''], cens: {}, hot: /^$/ };
const SHOTS = [[0, 'nik'], [1, 'tom']];
function grid(keys, draw) { bg('#2a3a3e', 1); keys.forEach((k, i) => { const x = 140 + (i % 4) * 267, y = 220 + Math.floor(i / 4) * 370;
  push(x, y); card(0, 30, 250, 340, 0, 900 + i, '#f2ead8'); ctx.save(); ctx.beginPath(); ctx.rect(-125, -140, 250, 270); ctx.clip(); draw(k); ctx.restore();
  txt(k, 0, 165, 32, { font: 'Inter Black', col: '#1c1512', maxW: 230 }); pop(); }); }
const SH = {
  nik(t) { grid(Object.keys(EN), k => { push(0, 0, 0.72); nikita({ x: 0, y: 0, s: 1, t: 0.4, legs: 'stand', ...EN[k] }); pop(); }); },
  tom(t) { grid(Object.keys(ET), k => { push(0, 20, 0.5); tom({ x: 0, y: 0, s: 1, t: 0.4, ...ET[k], body: false }); pop(); }); }
};
