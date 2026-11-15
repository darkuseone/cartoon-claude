/* Эп. 20 «Паста во всю щётку — развод?» — декорация: ночная ванная гостиничного номера: зеркало с лампочками, тёмный мрамор,
   за стеклянной стенкой — огни города. Никита давит полоску пасты во всю щётку, Том сидит на столешнице и пьёт из-под крана.
   2.5D: город 2.4, стена с зеркалом 1.35, столешница и герои 1.0, передний план 0.6. */

const CTOP = 1150, MARBLE = '#2e3a40', PASTE = '#e8f4f8';
function brush(x, y, s, rot, o = {}) {                                // щётка: o.paste 'full' | 'pea' | null
  push(x, y, s, rot); rectP(-10, 0, 20, 180, '#2a8ac8', { seed: 20001, lw: 2, shade: () => stroke([[0, 20], [0, 160]], '#5ab8e8', 4) });
  rectP(-14, -70, 28, 72, '#2a8ac8', { seed: 20002, lw: 2 }); for (let i = 0; i < 5; i++) stroke([[14, -64 + i * 14], [34, -64 + i * 14]], '#fbfaf2', 5);
  if (o.paste === 'full') piece(spline([[34, -70], [52, -74], [56, 0], [36, 4]], true, 4), PASTE, { raw: true, lw: 1.8, shade: () => stroke([[44, -66], [46, -4]], '#5ab8e8', 4) });
  if (o.paste === 'pea') ellP(44, -36, 11, 11, PASTE, { seed: 20003, lw: 1.6 });
  pop();
}
function pasteTube(x, y, s, rot, o = {}) { push(x, y, s, rot); piece([[-34, -90], [34, -90], [40, 70], [-40, 70]], '#fbfaf2', { seed: 20010, lw: 2.2, shade: () => { rectP(-34, -40, 68, 50, '#c8243c', { seed: 20011, line: false }); txt('FLUOR', 0, -8, 14, { font: 'Inter Black', col: '#fbfaf2' }); txt('1450 ppm', 0, 40, 11, { font: 'Inter Black', col: '#2a5a8a' }); } });
  rectP(-16, 70, 32, 26, '#2a8ac8', { seed: 20012, lw: 1.6 }); stroke([[-40, -92], [40, -92]], '#d8dce0', 8); pop(); }
/* ---------- город за стеклом (d 2.4) */
function hotelCity(t) {
  rectP(-400, -100, 1600, 1600, '#0c1430', { seed: 20100, line: false, shade: () => {
    [['#121c44', 300, 300], ['#1a2856', 600, 300]].forEach(([c, y, h], i) => rectP(-400, y, 1600, h, c, { seed: 20101 + i, line: false }));
    [[-360, 380, 160], [-180, 300, 200], [60, 440, 180], [280, 260, 220], [540, 360, 200], [780, 300, 200], [1000, 420, 180]].forEach(([x, y, w], i) => { rectP(x, y, w, 1400 - y, '#0a1024', { seed: 20110 + i, lw: 1.6 });
      for (let k = 0; k < 4; k++) for (let j = 0; j < 14; j++) if ((k * 3 + j * 7 + i) % 5 === 0) rectP(x + 14 + k * 44, y + 24 + j * 64, 24, 30, j % 2 ? '#ffd27a' : '#c8a8ff', { seed: 20120 + i * 60 + k * 14 + j, line: false, a: 0.8 }); });
    const b = Math.sin(t * 2) > 0 ? 1 : 0.2; dot(380, 250, 8, '#ff3a3a', b); glowAdd(380, 250, 40, 'rgba(255,60,60,1)', 0.5 * b);                  // огонёк на шпиле
  } });
}
/* ---------- стена (d 1.35): мрамор, зеркало с лампочками, стеклянная стенка с городом слева, полка с полотенцами */
function bathWall(t) {
  rectP(-400, -300, 1800, 2000, MARBLE, { seed: 20200, line: false, step: 70, shade: () => { for (let i = 0; i < 18; i++) { const r = rng(20201 + i); stroke([[-400 + r() * 1800, -300], [-400 + r() * 1800 + 300, 1700]], '#3e4c54', 3, { a: 0.6 }); } } });
  ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; ctx.fillRect(-400, 240, 620, 900); ctx.restore();   // стеклянная стенка — сквозь неё город
  ctx.save(); ctx.globalAlpha = 0.12; rectP(-400, 240, 620, 900, '#bfe0ff', { seed: 20210, raw: true, line: false }); ctx.restore(); [[-400, 230, 640, 20], [210, 230, 20, 920], [-400, 1130, 640, 20]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#1c2226', { seed: 20211 + i, lw: 2 }));
  // зеркало с лампочками
  rectP(420, 300, 640, 640, '#1c2226', { seed: 20220, lw: 3, shade: () => { rectP(450, 330, 580, 580, '#3a4a5a', { seed: 20221, line: false }); stroke([[480, 360], [620, 520]], '#7a8a9a', 8, { a: 0.5 }); stroke([[520, 360], [700, 560]], '#7a8a9a', 5, { a: 0.4 }); } });
  for (let i = 0; i < 6; i++) { [[440 + i * 120, 315], [440 + i * 120, 925]].forEach(([x, y]) => { ellP(x, y, 18, 18, '#fff4d8', { seed: 20230 + i, lw: 1.4 }); glowAdd(x, y, 60, 'rgba(255,230,180,1)', 0.5); }); }
  for (let i = 1; i < 5; i++) [[435, 300 + i * 125], [1045, 300 + i * 125]].forEach(([x, y]) => { ellP(x, y, 18, 18, '#fff4d8', { seed: 20240 + i, lw: 1.4 }); glowAdd(x, y, 60, 'rgba(255,230,180,1)', 0.5); });
  rectP(1120, 560, 260, 20, '#8a6a4a', { seed: 20250, lw: 1.6 }); [[1150, '#fbfaf2'], [1220, '#c8e0e8'], [1290, '#fbfaf2']].forEach(([x, c], i) => rectP(x - 30, 480, 64, 80, c, { seed: 20251 + i, lw: 1.6 }));   // полотенца
}
/* ---------- столешница (d 1.0): раковина, кран, стакан со щётками, косметика */
function counter(t, o = {}) {
  rectP(-400, 1530, 1800, 700, '#c8ccd0', { seed: 20300, step: 60, shade: () => { for (let x = -400; x < 1400; x += 110) for (let y = 1540; y < 2240; y += 110) rectP(x + 2, y + 2, 106, 106, ((x + y) / 110) & 1 ? '#d8dce0' : '#bcc0c4', { seed: 20301 + ((x * 3 + y) & 255), line: false }); } });
  rectP(500, CTOP, 760, 400, '#3a2a22', { seed: 20310, lw: 2.4, shade: () => { [[540, '#4a3428'], [880, '#4a3428']].forEach(([x, c], i) => { rectP(x, CTOP + 40, 300, 330, c, { seed: 20311 + i, lw: 1.6 }); rectP(x + 130, CTOP + 70, 40, 10, '#c8a060', { seed: 20313 + i, line: false }); }); } });
  rectP(490, CTOP - 26, 780, 30, '#e8e4dc', { seed: 20320, lw: 2.4 });                                         // мраморная столешница
  ellP(700, CTOP - 12, 110, 16, '#a8b0b8', { seed: 20321, lw: 2 });                                             // раковина
  push(700, CTOP - 26); rectP(-10, -90, 20, 90, '#d8dce0', { seed: 20322, lw: 1.6 }); stroke([[0, -86], [60, -100], [80, -80]], '#d8dce0', 12); rectP(-24, -110, 48, 16, '#d8dce0', { seed: 20323, lw: 1.4 }); pop();
  if (o.water) { ctx.save(); ctx.globalAlpha = 0.7; stroke([[780, CTOP - 104], [780 + Math.sin(t * 20) * 2 + (o.bat ? 14 * Math.sin(t * 30) : 0), CTOP - 14]], '#bfe8ff', 6); if (o.bat) { const r = rng(hsh(FRAME, 7)); for (let i = 0; i < 6; i++) dot(780 + (r() - 0.3) * 80, CTOP - 70 + (r() - 0.5) * 60, 3 + r() * 3, '#bfe8ff'); } ctx.restore(); }
  push(560, CTOP - 26); piece([[-24, 0], [24, 0], [28, -70], [-28, -70]], 'rgba(200,230,240,0.6)', { raw: true, lw: 2, tex: false }); stroke([[-6, -60], [-14, -130]], '#c8243c', 6); stroke([[8, -60], [16, -120]], '#7ac85a', 6); pop();   // стакан со щётками
  push(1180, CTOP - 26); rectP(-26, -90, 52, 90, '#e8c8d8', { seed: 20330, lw: 1.8 }); rectP(-10, -110, 20, 22, '#c8c8d0', { seed: 20331, lw: 1.4 }); pop();
  push(1110, CTOP - 26); ellP(0, -20, 30, 20, '#fbfaf2', { seed: 20332, lw: 1.6 }); pop();
  if (o.cap) { push(o.cap[0], CTOP - 34, 1, o.cap[1]); ellP(0, 0, 12, 10, '#2a8ac8', { seed: 20340, lw: 1.4 }); pop(); }
}
function bathFg(t) { push(-140, 1960, 1, -0.06); rectP(-90, -520, 180, 560, '#fbfaf2', { seed: 20500, lw: 3, shade: () => [[-80, -400], [-80, -200]].forEach(([x, y], i) => stroke([[x, y], [x + 160, y]], '#c8d4dc', 10)) }); pop(); }   // полотенце на вешалке у края
function bathLight(t, fn) { lightmap('#9a98b0', () => { radial(740, 620, 900, 'rgba(255,230,190,1)', 0.95); radial(-100, 700, 600, 'rgba(140,160,255,1)', 0.35); if (fn) fn(); }); }

// ------------------------------------------------------------------ вставки: белый кафель с синими швами
function tileBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#eef4f8', { seed, line: false, step: 80, shade: () => { for (let x = -100; x < 1200; x += 150) stroke([[x, -100], [x, 2100]], '#a8c8dc', 6); for (let y = -100; y < 2100; y += 150) stroke([[-100, y], [1200, y]], '#a8c8dc', 6); } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(20,40,60,0.45)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function peaIns(t, c) {                                               // реклама: во всю щётку → нужно: горошина
  if (!c.fg) tileBg(20710, t); if (c.bg) return;
  [[-1, 'В РЕКЛАМЕ', 'full', '#c8243c'], [1, 'НУЖНО', 'pea', '#2a8a4a']].forEach(([d, s, p, col], i) => { push(540 + d * 210, 720, 1, d * 0.02); card(0, 0, 380, 620, 0, 20711 + i, '#fbfaf2');
    txt(s, 0, -250, 40, { font: 'Inter Black', col, maxW: 320 }); brush(-20, -80, 2.2, 0, { paste: p }); if (!i && t > c.pea - 0.1) stampX(0, -10, 1.4, pr(t, c.pea - 0.1, c.pea + 0.2)); pop(); });
  if (t > c.pea) { push(540, 1180, popK(t, c.pea, 0.3), -0.03); ransom('ГОРОШИНА', 0, 0, 120, 20712, { reveal: 1, pop: true }); pop(); }
  if (t > c.fluor - 0.1) label(540, 1320, 'чистит щётка, от пасты нужен фтор', 0, '#f4e6a8', 0.01, 30);
}
function kidsIns(t, c) {                                              // <3 лет — с рисовое зерно, 3–6 — горошина; CDC 2019: ~38 % детей 3–6 больше нормы
  if (!c.fg) tileBg(20720, t); if (c.bg) return;
  push(540, 620, 1, -0.01); card(0, 0, 860, 440, 0, 20721, '#fbfaf2'); txt('ДЕТЯМ', 0, -170, 50, { font: 'Inter Black', col: '#1c1512' });
  [[-200, 'до 3 лет', 'рисовое зерно', 7, c.under3], [200, '3–6 лет', 'горошина', 16, c.three6]].forEach(([x, a, b, r, t0]) => { if (t < t0 - 0.2) return; ellP(x, -30, r * 3, r * 3, '#bfe0f0', { seed: 20722 + x, lw: 2.4 }); txt(a, x, 90, 40, { font: 'Inter Black', col: '#1c1512' }); txt(b, x, 140, 32, { font: 'Inter', weight: 800, col: '#2a5a8a' }); }); pop();
  if (t > c.usa - 0.2) { push(540, 1060, popK(t, c.usa - 0.2, 0.3), 0.02); card(0, 0, 860, 380, 0, 20723, '#f6f1e4'); txt('США: опрос родителей', 0, -130, 40, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
    const k = sm(pr(t, c.pct - 0.3, c.pct + 0.6)); ctx.save(); ctx.lineCap = 'butt'; ctx.lineWidth = 60 / S; ctx.strokeStyle = '#d8d0c0'; ctx.beginPath(); ctx.arc(-220, 50, 100, 0, 6.283); ctx.stroke(); ctx.strokeStyle = '#c8243c'; ctx.beginPath(); ctx.arc(-220, 50, 100, -1.571, -1.571 + 6.283 * 0.38 * k); ctx.stroke(); ctx.restore();
    txt(Math.round(38 * k) + ' %', -220, 66, 48, { font: 'Inter Black', col: '#c8243c' }); txt('детей 3–6 лет:', 160, 20, 34, { font: 'Inter Black', col: '#1c1512', maxW: 440 }); txt('пасты больше нормы', 160, 76, 34, { font: 'Inter Black', col: '#c8243c', maxW: 440 }); pop(); }
  label(540, 1320, 'CDC, MMWR, 2019 · данные 2013–2016', 0, '#f4e6a8', 0.01, 26);
}
function toothP(x, y, s, spots) { push(x, y, s); piece(spline([[-60, -80], [0, -96], [60, -80], [56, 10], [40, 90], [16, 40], [-16, 40], [-40, 90], [-56, 10]], true, 6), '#fbfaf2', { raw: true, lw: 2.6 });
  if (spots) { const r = rng(20730); for (let i = 0; i < 7; i++) ellP(-40 + r() * 80, -70 + r() * 70, 8 + r() * 8, 6 + r() * 6, '#ffffff', { seed: 20731 + i, lc: '#c8d0d8', lw: 1.4 }); } pop(); }
function fluorIns(t, c) {                                             // ребёнок глотает пасту → лишний фтор годами → флюороз
  if (!c.fg) tileBg(20740, t); if (c.bg) return;
  push(540, 760, 1, 0.01); card(0, 0, 860, 700, 0, 20741, '#fbfaf2'); txt('ЛИШНИЙ ФТОР ГОДАМИ', 0, -290, 46, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
  toothP(-180, -20, 2.4, false); txt('→', 0, -20, 90, { font: 'Inter Black', col: '#1c1512' }); toothP(200, -20, 2.4, t > c.spots - 0.2);
  if (t > c.spots) txt('белые пятна', 200, 230, 40, { font: 'Inter Black', col: '#2a5a8a' }); pop();
  if (t > c.fluorosis) { push(540, 1240, popK(t, c.fluorosis, 0.3), -0.03); ransom('ФЛЮОРОЗ', 0, 0, 120, 20742, { reveal: 1, pop: true }); pop(); }
}
function spitIns(t, c) {                                              // NHS: сплюнь, не полощи
  if (!c.fg) tileBg(20750, t); if (c.bg) return;
  push(540, 700, 1, -0.01); card(0, 0, 860, 600, 0, 20751, '#fbfaf2'); rectP(-430, -300, 860, 90, '#2a5aa8', { seed: 20752, line: false }); txt('NHS · Британия', 0, -240, 40, { font: 'Inter Black', col: '#fbfaf2' });
  check(-300, -100, 1, 1); txt('сплюнь', -220, -86, 56, { font: 'Inter Black', col: '#2a6a3a', align: 'left' });
  if (t > c.norinse - 0.1) { stampX(-300, 40, 0.8, pr(t, c.norinse - 0.1, c.norinse + 0.2)); txt('не полощи', -220, 56, 56, { font: 'Inter Black', col: '#c8243c', align: 'left' }); }
  if (t > c.longer - 0.2) txt('фтор дольше остаётся на зубах', 0, 200, 34, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 800 }); pop();
}
function ruleIns(t, c) {                                              // правило: горошина · 1350+ ppm · 2 мин × 2 · перед сном · сплюнул, не полощешь
  if (!c.fg) tileBg(20760, t); if (c.bg) return;
  push(540, 760, 1, 0.01); card(0, 0, 880, 860, 0, 20761, '#fbfaf2'); txt('ЧИСТИТЬ ЗУБЫ ПРАВИЛЬНО', 0, -360, 44, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  const R = [['горошина пасты', c.peaR], ['фтор от 1350 ppm — на тюбике', c.ppm], ['2 минуты, 2 раза в день', c.two], ['последний раз — перед сном', c.night], ['сплюнул — и не полощешь', c.spitR]];
  R.forEach(([s, t0], i) => { if (t < t0 - 0.2) return; const y = -240 + i * 130; check(-360, y, 0.8, pr(t, t0 - 0.2, t0 + 0.2)); txt(s, -300, y + 14, 40, { font: 'Inter Black', col: '#1c1512', align: 'left', maxW: 680 }); }); pop();
}
