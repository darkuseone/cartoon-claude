/* Эп. 19 «Шринкфляция — развод?» — декорация: офисный коридор поздно вечером, снековый автомат. Никита только что купил чипсы,
   Том спит на крыше автомата рядом с «запасной» пачкой. В конце коридора — окно с ночным городом, мигает лампа дневного света.
   2.5D: город 2.4, коридор 1.35, автомат и герои 1.0, передний план 0.6. */

const MTOP = 860, CHIP = '#f2c02a';
function chipsBag(x, y, s, rot, o = {}) {                             // пухлая пачка; o.pop — проколота (сдулась), o.col
  const p = o.pop ?? 0, w = lerp(1, 0.86, p), h = lerp(1, 0.7, p); push(x, y, s, rot);
  piece(spline([[-60 * w, -90 * h], [60 * w, -90 * h], [74 * w, 0], [60 * w, 90 * h], [-60 * w, 90 * h], [-74 * w, 0]], true, 6), o.col ?? '#c8243c', { raw: true, lw: 2.4, shade: () => {
    stroke([[-62 * w, -78 * h], [62 * w, -78 * h]], '#fbfaf2', 4, { a: 0.6 }); stroke([[-62 * w, 78 * h], [62 * w, 78 * h]], '#fbfaf2', 4, { a: 0.6 });
    ellP(0, -10 * h, 40 * w, 30 * h, CHIP, { seed: 19001, lw: 1.6 }); txt('CHIPS', 0, 50 * h, 22, { font: 'Inter Black', col: '#fbfaf2' }); txt(o.g ?? '90 г', 0, 74 * h, 14, { font: 'Inter Black', col: '#fbfaf2' }); } });
  pop();
}
function puff(x, y, k) { if (k <= 0 || k >= 1) return; ctx.save(); ctx.globalAlpha = 0.7 * (1 - k); [[0, 0, 1], [-30, -20, 0.8], [30, -26, 0.7], [0, -50, 0.9]].forEach(([dx, dy, s], i) => ellP(x + dx * (1 + k * 2), y + dy * (1 + k * 3), 40 * s * (0.5 + k * 1.5), 30 * s * (0.5 + k * 1.5), '#e8f0f8', { seed: 19010 + i, line: false })); ctx.restore();
  if (k < 0.7) txt('N₂', x + 10, y - 40 - 80 * k, 44, { font: 'Inter Black', col: '#2a6ac8' }); }
function vending(t, o = {}) {
  rectP(600, MTOP, 360, 1560 - MTOP, '#2a5a8a', { seed: 19100, lw: 3, shade: () => {
    rectP(620, MTOP + 30, 240, 520, '#c8e0f0', { seed: 19101, lw: 2.4, shade: () => {                  // витрина
      ctx.save(); ctx.globalAlpha = 0.25; rectP(620, MTOP + 30, 240, 520, '#ffffff', { seed: 19102, raw: true, line: false }); ctx.restore();
      for (let r = 0; r < 4; r++) { stroke([[620, MTOP + 150 + r * 125], [860, MTOP + 150 + r * 125]], '#5a6a7a', 6);
        for (let c = 0; c < 3; c++) { const col = ['#c8243c', '#2a8a4a', '#f2a83a', '#7a3ac8'][(r + c) % 4]; if (!(r === 1 && c === 2)) chipsBag(660 + c * 80, MTOP + 100 + r * 125, 0.5, 0, { col, g: '' }); } } } });
    rectP(880, MTOP + 60, 60, 200, '#1c2a3a', { seed: 19103, lw: 2, shade: () => { for (let i = 0; i < 12; i++) rectP(888 + (i % 3) * 16, MTOP + 70 + Math.floor(i / 3) * 26, 12, 18, '#d8dce0', { seed: 19104 + i, lw: 1 }); } });
    rectP(884, MTOP + 280, 52, 30, '#0a1a10', { seed: 19120, lw: 1.6 }); txt('$1.99', 910, MTOP + 302, 16, { font: "'Courier 10 Pitch'", col: '#7ae8a8' });
    rectP(640, MTOP + 600, 220, 80, '#1c2a3a', { seed: 19121, lw: 2 });                                   // лоток
    txt('SNACKS', 780, MTOP + 640 + 80, 40, { font: 'Inter Black', col: '#fbfaf2' }); } });
  glowAdd(740, MTOP + 290, 300, 'rgba(200,230,255,1)', 0.35);
  if (o.topBag !== false) chipsBag(915, MTOP - 52, 0.55, 0.15, { pop: o.pop ?? 0, col: '#f2a83a' });
}
/* ---------- за окном в конце коридора (d 2.4) */
function nightOffice(t) {
  rectP(-400, -100, 1600, 1600, '#0f1630', { seed: 19200, line: false, shade: () => {
    [['#16204a', 300, 300], ['#1c2a5a', 600, 300]].forEach(([c, y, h], i) => rectP(-400, y, 1600, h, c, { seed: 19201 + i, line: false }));
    [[-300, 500, 220], [-60, 420, 200], [180, 560, 240], [430, 380, 200], [660, 520, 220], [900, 460, 200]].forEach(([x, y, w], i) => { rectP(x, y, w, 1400 - y, '#0b1226', { seed: 19210 + i, lw: 1.6 });
      for (let k = 0; k < 4; k++) for (let j = 0; j < 10; j++) if ((k * 5 + j * 3 + i) % 4 === 0) rectP(x + 16 + k * 48, y + 24 + j * 56, 28, 30, j % 2 ? '#ffd27a' : '#bfe0ff', { seed: 19220 + i * 50 + k * 10 + j, line: false, a: 0.85 }); });
  } });
}
/* ---------- коридор (d 1.35): перспектива в окно, двери, доска объявлений, кулер */
function corridor(t) {
  rectP(-400, -300, 1800, 2000, '#d8d0b8', { seed: 19300, line: false, step: 70 });
  piece([[-400, -300], [1400, -300], [700, 520], [380, 520]], '#e8e2d0', { seed: 19301, line: false });          // потолок
  piece([[-400, 1700], [1400, 1700], [700, 1000], [380, 1000]], '#7a8a7a', { seed: 19302, line: false });        // пол-линолеум
  for (let i = 0; i < 4; i++) { const k = i / 4, y = lerp(-200, 470, Math.pow(k, 0.7)), w = lerp(300, 40, Math.pow(k, 0.7)); const on = !(i === 1 && Math.sin(t * 7) > 0.6);   // лампы
    rectP(540 - w, y, w * 2, 18 * (1 - k) + 6, on ? '#fbfcf0' : '#a8a89a', { seed: 19310 + i, lw: 1.4 }); if (on) glowAdd(540, y + 10, 200 * (1 - k) + 60, 'rgba(240,250,230,1)', 0.35); }
  ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; ctx.fillRect(400, 540, 280, 440); ctx.restore();   // окно в торце — дыра, сквозь неё план 2.4
  [[400, 540, 280, 14], [400, 966, 280, 14], [400, 540, 14, 440], [666, 540, 14, 440], [533, 540, 14, 440]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#e8e2d0', { seed: 19325 + i, lw: 1.4 }));
  [[-200, 300, 260, 900, '#8a5a3a', '201'], [180, 470, 120, 560, '#8a5a3a', '203'], [880, 470, 120, 560, '#8a5a3a', '204'], [1180, 300, 260, 900, '#8a5a3a', '202']].forEach(([x, y, w, h, c, n], i) => {
    rectP(x, y, w, h, c, { seed: 19330 + i, lw: 2.2, shade: () => { dot(x + w * 0.85, y + h * 0.55, 8, '#d8c890'); rectP(x + w * 0.3, y + h * 0.12, w * 0.4, h * 0.08, '#e8e2d0', { seed: 19335 + i, lw: 1 }); txt(n, x + w * 0.5, y + h * 0.18, 18 * w / 200, { font: 'Inter Black', col: '#3a2a1a' }); } }); });
  push(140, 620, 1, -0.02); rectP(-130, -110, 260, 220, '#a8784a', { seed: 19340, lw: 2.4, shade: () => {                                // доска объявлений
    [[-80, -50, '#fbfaf2'], [10, -60, '#f2e88a'], [80, 10, '#a8d8f0'], [-60, 40, '#fbfaf2']].forEach(([x, y, c], i) => { rectP(x - 40, y - 34, 80, 68, c, { seed: 19341 + i, lw: 1.2 }); dot(x, y - 28, 5, '#c8243c'); }); } }); pop();
  push(1080, 980); rectP(-40, -40, 80, 220, '#e8ecf0', { seed: 19350, lw: 2 }); piece([[-36, -40], [36, -40], [30, -160], [-30, -160]], 'rgba(150,200,240,0.6)', { raw: true, lw: 2, tex: false }); pop();   // кулер
}
/* ---------- пол у автомата (d 1.0) */
function hallMid(t, o = {}) {
  rectP(-400, 1530, 1800, 700, '#6a7a6a', { seed: 19400, step: 60, shade: () => { for (let x = -400; x < 1400; x += 120) stroke([[x, 1530], [x - 90, 2230]], '#5e6e5e', 3); } });
  rectP(-400, 1500, 1800, 34, '#4a4a40', { seed: 19401, lw: 1.6 });
  push(1080, 1560); rectP(-50, -110, 100, 110, '#3a3a40', { seed: 19410, lw: 2 }); blobP([[-40, -130], [40, -140], [30, -110], [-30, -108]], '#3a8a4a', { seed: 19411, lw: 1.4 }); pop();   // урна с бумажками
  push(440, 1560); ellP(0, -10, 90, 16, '#5a3a1a', { seed: 19420, line: false, a: 0.4 }); pop();
  vending(t, o);
  push(220, 1560); rectP(-44, -120, 88, 120, '#c8643a', { seed: 19430, lw: 2 }); [[-30, -200], [0, -240], [32, -196]].forEach(([a, b], i) => blobP([[0, -120], [a - 26, b], [a, b - 40], [a + 26, b]], '#3a8a4a', { seed: 19431 + i, lw: 1.6 })); pop();   // фикус
}
function hallFg(t) { push(1260, 1990, 1, 0.05); rectP(-80, -560, 160, 600, '#3a3a40', { seed: 19500, lw: 3 }); pop(); }
function hallLight(t, fn) { lightmap('#8a8ea8', () => {
  const fl = Math.sin(t * 7) > 0.6 ? 0.75 : 1; radial(540, 200, 900, 'rgba(240,250,230,1)', 0.6 * fl); radial(740, 1150, 600, 'rgba(180,220,255,1)', 0.75); cone(740, 1100, 400, 1600, 700, 'rgba(180,220,255,1)', 0.3);
  if (fn) fn(); });
}
function windowLook(t, z) { cam25(540 + (540 - 540) * 2.4, 960 + (760 - 960) * 2.4, z, { focus: 2.4, dof: 0 }); plane(0, 2.4, () => nightOffice(t)); }

// ------------------------------------------------------------------ вставки: полка магазина с жёлтыми ценниками
function shelfBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#e8ecf0', { seed, line: false, step: 80, shade: () => { for (let y = 120; y < 2100; y += 420) { rectP(-100, y, 1280, 40, '#b8c0c8', { seed: seed + y, line: false }); for (let x = 40; x < 1080; x += 260) rectP(x, y + 40, 120, 60, '#f2e04a', { seed: seed + x + y, lw: 1.4 }); } } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(20,30,50,0.45)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function n2Ins(t, c) {                                                // в пачке не воздух, а азот
  if (!c.fg) shelfBg(19710, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 860, 720, 0, 19711, '#fbfaf2'); txt('ЧТО В ПАЧКЕ?', 0, -300, 50, { font: 'Inter Black', col: '#1c1512' });
  chipsBag(-200, 20, 2.6, 0, { col: '#c8243c' }); ctx.save(); ctx.globalAlpha = 0.85; ellP(-200, -100, 120, 70, '#bfe0ff', { seed: 19712, line: false }); ctx.restore(); txt('N₂', -200, -86, 70, { font: 'Inter Black', col: '#2a6ac8' });
  txt('азот', 200, -140, 56, { font: 'Inter Black', col: '#2a6ac8' });
  if (t > c.rancid - 0.1) txt('чтобы не прогоркли', 200, -40, 34, { font: 'Inter', weight: 800, col: '#1c1512', maxW: 400 });
  if (t > c.crumble - 0.1) txt('и не раскрошились', 200, 20, 34, { font: 'Inter', weight: 800, col: '#1c1512', maxW: 400 }); pop();
}
function shrinkIns(t, c) {                                            // та же пачка, та же цена, внутри меньше
  if (!c.fg) shelfBg(19720, t); if (c.bg) return;
  push(540, 720, 1, 0.01); card(0, 0, 880, 680, 0, 19721, '#fbfaf2');
  const k = sm(pr(t, c.less - 0.4, c.less + 0.4));
  [[-210, 'БЫЛО', '200 г', 1], [210, 'СТАЛО', k > 0.5 ? '180 г' : '200 г', 1]].forEach(([x, a, g, s], i) => { txt(a, x, -270, 40, { font: 'Inter Black', col: i ? '#c8243c' : '#4a4038' });
    chipsBag(x, -40, 2.0, 0, { col: '#2a8a4a', g }); rectP(x - 90, 170, 180, 70, '#f2e04a', { seed: 19722 + i, lw: 2 }); txt('$2.49', x, 218, 40, { font: 'Inter Black', col: '#1c1512' }); });
  if (t > c.price) txt('=', 0, 210, 60, { font: 'Inter Black', col: '#1c1512' }); pop();
  if (t > c.shrink) { push(540, 1210, popK(t, c.shrink, 0.3), -0.03); ransom('ШРИНКФЛЯЦИЯ', 0, 0, 104, 19723, { reveal: 1, pop: true }); pop(); }
  label(540, 1340, 'пример: та же цена, на 10 % меньше', 0, '#f4e6a8', 0.01, 26);
}
function bar(x, y, n, s, gap) { push(x, y, s); for (let i = 0; i < n; i++) { piece([[i * 60, 0], [i * 60 + 30, -60], [i * 60 + 60, 0]], '#c89a5a', { seed: 19730 + i, lw: 2 }); if (gap && i % 2) piece([[i * 60 + 6, 0], [i * 60 + 30, -40], [i * 60 + 54, 0]], '#fbfaf2', { raw: true, line: false }); } rectP(0, 0, n * 60, 26, '#c89a5a', { seed: 19740, lw: 2 }); pop(); }
function onsIns(t, c) {                                               // ONS: 2012–2017 — 2 529 случаев уменьшения упаковки
  if (!c.fg) shelfBg(19730, t); if (c.bg) return;
  push(540, 700, 1, -0.01); card(0, 0, 880, 640, 0, 19731, '#fbfaf2'); txt('БРИТАНИЯ · 2012–2017', 0, -260, 44, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  const k = sm(pr(t, c.k25 - 0.8, c.smaller)); txt(String(Math.round(2529 * k)).replace(/(\d)(\d{3})$/, '$1 $2'), 0, -100, 140, { font: 'Inter Black', col: '#c8243c' });
  txt('раз упаковка в корзине стала меньше', 0, 0, 34, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 820 });
  if (t > c.choco - 0.3) { bar(-300, 200, 10, 1, false); bar(60, 200, 10, 1, true); txt('шоколад и сладости — чаще всего', 0, 290, 30, { font: 'Inter Black', col: '#8a5a1a', maxW: 820 }); } pop();
  label(540, 1290, 'ONS — статистическое ведомство Британии, 2017', 0, '#f4e6a8', 0.01, 26);
}
function carrefourIns(t, c) {                                         // Carrefour, 09.2023: чай 1,5 л → 1,25 л, литр +40 %
  if (!c.fg) shelfBg(19750, t); if (c.bg) return;
  push(540, 640, 1, 0.01); card(0, 0, 860, 420, 0, 19751, '#fbfaf2'); rectP(-430, -210, 860, 90, '#2a5aa8', { seed: 19752, line: false }); txt('CARREFOUR · ФРАНЦИЯ · 2023', 0, -150, 36, { font: 'Inter Black', col: '#fbfaf2', maxW: 800 });
  rectP(-360, -80, 720, 140, '#ffe27a', { seed: 19753, lw: 2.4 }); txt('ВНИМАНИЕ: ШРИНКФЛЯЦИЯ', 0, -24, 40, { font: 'Inter Black', col: '#c8243c', maxW: 680 }); txt('объём меньше — цена выше', 0, 30, 30, { font: 'Inter', weight: 800, col: '#1c1512', maxW: 680 }); pop();
  if (t > c.tea - 0.2) { push(540, 1060, 1, -0.01); card(0, 0, 860, 380, 0, 19754, '#f6f1e4');
    const k = sm(pr(t, c.l125 - 0.2, c.l125 + 0.4)); [[-220, 1, '1,5 л'], [60, lerp(1, 0.83, k), k > 0.5 ? '1,25 л' : '1,5 л']].forEach(([x, h, s], i) => { if (i && t < c.l125 - 0.3) return;
      piece([[x - 40, 120], [x + 40, 120], [x + 40, 120 - 220 * h], [x + 20, 100 - 240 * h], [x - 20, 100 - 240 * h], [x - 40, 120 - 220 * h]], 'rgba(240,170,60,0.85)', { raw: true, lw: 2.4 }); txt(s, x, 160, 34, { font: 'Inter Black', col: '#1c1512' }); });
    if (t > c.plus40) { txt('литр:', 280, -40, 40, { font: 'Inter Black', col: '#1c1512' }); txt('+40 %', 280, 40, 76, { font: 'Inter Black', col: '#c8243c' }); } pop(); }
}
function kgIns(t, c) {                                                // смотри цену за килограмм
  if (!c.fg) shelfBg(19760, t); if (c.bg) return;
  [[-1, '$2.49', '90 г', '$27.67 / кг', 1], [1, '$2.99', '150 г', '$19.93 / кг', 0]].forEach(([d, p, g, kg, bad], i) => { push(540 + d * 220, 720, 1, d * 0.02); card(0, 0, 400, 520, 0, 19761 + i, '#ffe27a');
    txt('CHIPS ' + g, 0, -190, 34, { font: 'Inter Black', col: '#1c1512', maxW: 340 }); txt(p, 0, -60, 96, { font: 'Inter Black', col: '#1c1512', maxW: 340 });
    const hot = t > c.small; if (hot) rectP(-170, 70, 340, 80, bad ? '#ffb0a8' : '#b8f0c0', { seed: 19765 + i, line: false }); txt(kg, 0, 124, hot ? 40 : 22, { font: 'Inter Black', col: hot ? (bad ? '#c8243c' : '#2a6a3a') : '#6b5a48', maxW: 340 }); pop(); });
  if (t > c.perkg - 0.1 && t < c.small + 0.6) { const k = pr(t, c.perkg - 0.1, c.small); push(lerp(900, 330, k), lerp(1300, 860, k), 1.2); ellP(0, 0, 70, 70, 'rgba(220,240,255,0.35)', { raw: true, lc: '#1c1512', lw: 8, tex: false }); stroke([[50, 50], [110, 110]], '#1c1512', 16); pop(); }
  if (t > c.compare) { push(540, 1220, popK(t, c.compare, 0.3), -0.03); ransom('СРАВНИВАЙ ЗА КГ', 0, 0, 90, 19766, { reveal: 1, pop: true }); pop(); }
  label(540, 1340, 'дешевле та, где меньше цена за кг', 0, '#f4e6a8', 0.01, 28);
}
