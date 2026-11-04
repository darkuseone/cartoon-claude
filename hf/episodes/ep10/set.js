/* Эп. 10 «Цена 99 — развод?» — декорация (касса супермаркета днём, полки с ценниками …99) и вставки-коллажи. */

function priceTag(x, y, s, rot, main, cents, o = {}) {                // жёлтый ценник: «$2» крупно + «.99» мелко
  push(x, y, s, rot); piece([[-110, -70], [110, -70], [110, 70], [-110, 70]], o.col || '#f2d24a', { seed: o.seed ?? hsh(x, y), step: 14, lw: 2.4 });
  if (o.label) txt(o.label, 0, -44, 22, { font: 'Inter', weight: 800, col: '#3a3530' });
  const w = txt(main, cents ? -18 : 0, 10, o.big ?? 86, { font: 'Inter Black', col: o.ink || '#1c1512' });
  if (cents) txt(cents, w / 2 - 10, -8, 40, { font: 'Inter Black', col: o.ink || '#1c1512', align: 'left' });
  pop();
}
function supermarket(t, o = {}) {
  rectP(-300, -300, 1680, 1100, '#e3ead6', { seed: 10000, line: false, step: 60 });                          // стена: бледная мята
  rectP(-300, 120, 1680, 90, '#d8342c', { seed: 10001, lw: 2.4 }); txt('СУПЕРМАРКЕТ «ВЫГОДА»', 540, 166, 52, { font: 'Inter Black', col: '#fbfaf6' });
  for (let x = -200; x < 1380; x += 340) { rectP(x, 260, 260, 22, '#fbfaf6', { seed: 10002 + x, lw: 2 }); glowAdd(x + 130, 280, 140, 'rgba(255,255,240,1)', 0.25); }   // лампы дневного света
  // стеллаж с товаром и ценниками …99
  const C = ['#c8402c', '#3d7fc4', '#46b86a', '#f2a03a', '#8a5ac4', '#e2533a'];
  for (let row = 0; row < 3; row++) { const y = 560 + row * 210; rectP(-300, y, 1680, 22, '#8a6a4a', { seed: 10010 + row, lw: 2.2 });
    for (let i = 0; i < 9; i++) { const x = -260 + i * 170, h = 110 + ((i * 7 + row * 3) % 4) * 18, c = C[(i + row * 2) % 6];
      if (row === 0 || i % 2) rectP(x, y - h, 120, h, c, { seed: 10020 + row * 20 + i, lw: 2, shade: () => { rectP(x, y - h * 0.62, 120, h * 0.3, '#fbfaf6', { seed: 10080 + row * 20 + i, line: false }); } });
      else { ellP(x + 30, y - 52, 34, 52, c, { seed: 10120 + row * 20 + i, lw: 2 }); ellP(x + 90, y - 52, 34, 52, c, { seed: 10140 + row * 20 + i, lw: 2 }); }
      priceTag(x + 60, y + 44, 0.36, 0, '$' + (1 + (i * 3 + row) % 9), '.99', { seed: 10160 + row * 20 + i }); } }
  rectP(-300, 1240, 1680, 320, '#cfd6d2', { seed: 10200, line: false, step: 60 });
  // кассовый стол: лента и касса (на столе сидит Том)
  rectP(600, 1180, 600, 380, '#5a6470', { seed: 10210, lw: 2.8, shade: () => { rectP(600, 1240, 600, 40, '#4a535d', { seed: 10211, line: false }); } });
  rectP(600, 1160, 600, 30, '#2a2e34', { seed: 10212, lw: 2.4, shade: () => { for (let x = 600 - (step(t, 12) * 40) % 40; x < 1200; x += 40) stroke([[x, 1162], [x, 1188]], '#3a4048', 3); } });
  push(1000, 1160); rectP(-70, -170, 140, 170, '#e9e3d6', { seed: 10220, lw: 2.6 }); rectP(-56, -150, 112, 56, '#20302a', { seed: 10221, lw: 2, shade: () => { txt('99.99', 0, -122, 30, { font: "'Courier 10 Pitch'", weight: 700, col: '#7cff9a' }); } });
  for (let i = 0; i < 9; i++) rectP(-50 + (i % 3) * 36, -84 + Math.floor(i / 3) * 24, 28, 18, '#c9c4b8', { seed: 10222 + i, lw: 1.4 }); pop();
  // пол: линолеум «в крапинку», пакеты
  rectP(-300, 1550, 1680, 700, '#b8b2a4', { seed: 10230, step: 60, shade: () => { const r = rng(10231); for (let i = 0; i < 260; i++) dot(-300 + r() * 1680, 1560 + r() * 680, 2 + r() * 3, r() < 0.5 ? '#9a9488' : '#d3cdbf', 0.8); } });
  [[150, '#fbfaf6'], [70, '#f2d24a']].forEach(([x, c], i) => { piece([[x - 60, 1560], [x + 60, 1560], [x + 50, 1420], [x - 50, 1420]], c, { seed: 10240 + i, lw: 2.4, shade: () => { txt('$', x, 1500, 50, { font: 'Inter Black', col: '#d8342c' }); } });
    stroke([[x - 30, 1424], [x - 20, 1390], [x + 20, 1390], [x + 30, 1424]], c === '#fbfaf6' ? '#c9c4b8' : '#d9b83a', 5); });
}
function storeLight(fn) { lightmap('#d6d8cc', () => { radial(540, 300, 1400, 'rgba(255,255,240,1)', 0.7); if (fn) fn(); }); }

function receiptP(hx, hy, t) {                                       // метровый чек: свисает из кулака до пола и стелется зигзагом
  const pts = [[hx, hy + 10], [hx + 10, 1300], [hx - 20, 1540], [hx - 140, 1570], [hx - 280, 1556]];
  for (let i = 0; i < pts.length - 1; i++) { const [a, b] = [pts[i], pts[i + 1]], nx = b[1] - a[1], ny = -(b[0] - a[0]), L = Math.hypot(nx, ny) || 1, w = 34;
    const Q = [[a[0] + nx / L * w, a[1] + ny / L * w], [b[0] + nx / L * w, b[1] + ny / L * w], [b[0] - nx / L * w, b[1] - ny / L * w], [a[0] - nx / L * w, a[1] - ny / L * w]];
    piece(Q, '#fbfaf6', { seed: 10300 + i, step: 12, lw: 2, edge: 1.2 }); }
  for (let k = 0; k < 9; k++) { const y = hy + 50 + k * 46; txt('…' + (k % 3 + 1) + '.99', hx + 6, y, 18, { font: "'Courier 10 Pitch'", weight: 700, col: '#3a3530' }); }
}
function walletP(x, y, s, t) {                                       // раскрытый пустой кошелёк
  push(x, y, s, -0.15); piece([[-70, -40], [70, -40], [74, 40], [-74, 40]], '#7a4a2e', { seed: 10320, lw: 2.6, shade: () => { stroke([[0, -40], [0, 40]], '#5a321c', 4); rectP(-60, -30, 50, 50, '#5a321c', { seed: 10321, line: false, a: 0.6 }); } }); pop();
}
function mothP(x, y, s, t) {                                         // моль из пустого кошелька
  const f = Math.abs(Math.sin(step(t, 12) * 14)); push(x, y, s);
  [-1, 1].forEach(sd => blobP([[0, 0], [sd * 40, -24 * (0.4 + f)], [sd * 50, 10], [sd * 16, 20]], '#cfc6b4', { seed: 10330 + sd, lw: 2 }));
  ellP(0, 6, 8, 20, '#8a8070', { seed: 10333, lw: 1.8 }); pop();
}
function carCut(x, y, s, col, seed) {                                // седан-вырезка сбоку
  push(x, y, s); piece([[-150, 0], [-140, -50], [-70, -60], [-40, -100], [60, -100], [100, -60], [150, -50], [156, 0]], col, { seed, lw: 2.6, shade: () => {
    piece([[-30, -92], [50, -92], [80, -60], [-50, -60]], '#bfe3ff', { seed: seed + 1, lw: 2 }); stroke([[10, -92], [10, -60]], col, 6); } });
  [-90, 95].forEach((wx, i) => { ellP(wx, 0, 30, 30, '#2a2420', { seed: seed + 2 + i, lw: 2 }); ellP(wx, 0, 12, 12, '#c9ccd2', { seed: seed + 4 + i, line: false }); }); pop();
}

// ------------------------------------------------------------------ вставки
function leftIns(t, c) {                                              // мозг читает слева: $2.99 — «два», $3.00 — «три»
  bg('#eef1e6', 10400); push(540, 300, 1, -0.03); ransom('ЧИТАЕТ СЛЕВА', 0, 0, 104, 10401, { reveal: pr(t, c.left - 0.2, c.left + 0.2) }); pop();
  [[-1, '$2', '.99', c.two, 'ДЁШЕВО', '#46b86a'], [1, '$3', '.00', c.three, 'ДОРОГО', '#d8342c']].forEach(([sd, m, ct, t0, w, col], i) => {
    const k = popK(t, i ? c.three - 0.3 : c.left - 0.1, 0.3); if (k <= 0) return; priceTag(540 + sd * 250, 760, 2.0 * k, sd * 0.04, m, ct, { seed: 10402 + i });
    if (t > t0) { push(540 + sd * 250, 1050, 1, sd * -0.04); ransom(w, 0, 0, 76, 10410 + i, { reveal: pr(t, t0, t0 + 0.25), pop: true, bgs: [[col, '#fbfaf6']] }); pop(); } });
  const lx = lerp(330, 580, sm(pr(t, c.three - 0.4, c.three))); push(lx - 20, 760); ellP(0, 0, 100, 100, 'rgba(220,240,255,0.25)', { lw: 8, lc: '#3a3530', tex: false }); stroke([[70, 70], [150, 150]], '#3a3530', 20); pop();   // лупа на первой цифре
  txt('Thomas & Morwitz, Journal of Consumer Research, 2005', 540, 1260, 28, { font: 'Inter', weight: 800, col: '#3a3530' });
}
function dressCut(x, y, s, col, seed) { push(x, y, s);
  piece([[-40, -150], [40, -150], [56, -100], [40, -60], [110, 150], [-110, 150], [-40, -60], [-56, -100]], col, { seed, lw: 2.4, shade: () => { stroke([[-60, 100], [60, 100]], mix(col, '#000000', 0.2), 6); } });
  [-1, 1].forEach(sd => stroke([[sd * 26, -150], [sd * 22, -180]], '#3a3530', 4)); pop(); }
function dressIns(t, c) {                                             // платье: $34 → $39 — берут на треть чаще; $44 — как $34
  cork(); push(540, 820, 1, 0.02); card(0, 0, 940, 940, 0, 10500, '#fbfaf6'); txt('КАТАЛОГ ОДЕЖДЫ · ТЕСТ ЦЕН', 0, -420, 40, { font: 'Inter Black', col: '#1c1512' });
  [[-300, '$34', 1, c.p34, '#3d7fc4'], [0, '$39', 1.33, c.p39, '#d8342c'], [300, '$44', 1, c.p39 + 0.5, '#3d7fc4']].forEach(([x, p, v, t0, col], i) => {
    const k = popK(t, t0 - 0.2, 0.3); if (k <= 0) return; push(x, -190, k); dressCut(0, 0, 0.8, i === 1 ? '#d8342c' : '#5a86b6', 10510 + i * 3); pop();
    priceTag(x, -10, 0.6 * k, 0.04 * (i - 1), p, '', { big: 90, seed: 10520 + i });
    const h = 260 * v * sm(pr(t, c.third - 0.6, c.third)); if (h > 2) rectP(x - 70, 380 - h, 140, h, col, { seed: 10530 + i, lw: 2.4 }); });
  stroke([[-420, 380], [420, 380]], '#3a3530', 4); txt('продажи', -380, 410, 26, { font: 'Inter', weight: 800, col: '#6b655c' }); pop();
  if (t > c.third) { push(540, 240, 1, -0.04); ransom('ДОРОЖЕ = ЧАЩЕ', 0, 0, 96, 10540, { reveal: pr(t, c.third, c.third + 0.25), pop: true }); pop(); }
  txt('Anderson & Simester, Harvard Business Review, 2003', 540, 1270, 28, { font: 'Inter', weight: 800, col: '#1c1512' });
}
function whisperIns(t, c) {                                           // девятка шепчет «скидка» — скидки нет
  bg('#2b2622', 10600); priceTag(470, 800, 2.4, -0.05, '$39', '', { big: 96, seed: 10601 });
  if (t > c.skid - 0.2) { push(760, 520, popK(t, c.skid - 0.2, 0.3), 0.06); blobP([[-200, -90], [200, -100], [220, 60], [-20, 80], [-80, 150], [-90, 80], [-210, 70]], '#fbfaf6', { seed: 10602, lw: 2.6 });
    txt('пс-с… скидка…', 0, -10, 66, { font: 'Hand', weight: 700, col: '#1c1512' }); pop(); }
  if (t > c.none) { push(560, 1080, 1.6 - 0.6 * popK(t, c.none, 0.3), -0.12); ctx.globalAlpha = 0.9; piece([[-250, -60], [250, -60], [250, 60], [-250, 60]], 'rgba(0,0,0,0)', { raw: true, lc: '#c8241c', lw: 10, tex: false });
    txt('СКИДКИ НЕТ', 0, 6, 76, { font: 'Inter Black', col: '#c8241c' }); ctx.globalAlpha = 1; pop(); }
  txt('цена на «9» кажется уценённой — Chicago Booth Review', 540, 1270, 28, { font: 'Inter', weight: 800, col: '#cfc6b4' });
}
function lotIns(t, c) {                                               // 22 млн продаж подержанных машин
  bg('#dfe7ee', 10700); for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) { const k = popK(t, c.cars - 0.4 + (r * 4 + i) * 0.05, 0.25); if (k > 0) carCut(170 + i * 250, 560 + r * 190, 0.62 * k, ['#c8402c', '#3d7fc4', '#46b86a', '#f2a03a'][(r + i) % 4], 10710 + r * 40 + i * 8); }
  if (t > c.m22) { push(540, 300, 1, -0.03); ransom('22 000 000', 0, 0, 120, 10790, { reveal: pr(t, c.m22, c.m22 + 0.3), pop: true }); pop(); }
  txt('продаж подержанных машин', 540, 410, 40, { font: 'Inter Black', col: '#1c1512', a: t > c.m22 + 0.2 ? 1 : 0 });
  txt('Lacetera, Pope, Sydnor, American Economic Review, 2012', 540, 1270, 28, { font: 'Inter', weight: 800, col: '#3a3530' });
}
function odoIns(t, c) {                                               // пробег 79 9xx → 80 0xx: минус ~$200
  cork(); carCut(540, 560, 1.7, '#3d7fc4', 10800);
  const v = Math.round(lerp(79970, 80030, sm(pr(t, c.km - 0.2, c.price - 0.2)))), s = String(v).padStart(6, '0');
  push(540, 860); rectP(-300, -70, 600, 140, '#1c1512', { seed: 10801, lw: 3 });
  [...s].forEach((d, i) => { rectP(-280 + i * 94, -54, 84, 108, i < 2 && v >= 80000 ? '#fbfaf6' : '#e9e3d6', { seed: 10802 + i, lw: 1.6 }); txt(d, -238 + i * 94, 4, 82, { font: "'Courier 10 Pitch'", weight: 700, col: i < 2 && v >= 80000 ? '#c8241c' : '#1c1512' }); });
  pop(); txt('миль', 540, 960, 34, { font: 'Inter Black', col: '#1c1512' });
  if (t > c.price) { const over = v >= 80000; push(540, 1110, 1, -0.03); ransom(over ? '−$200' : '+$200', 0, 0, 110, 10810, { reveal: pr(t, c.price, c.price + 0.25), pop: true, bgs: [[over ? '#d8342c' : '#46b86a', '#fbfaf6']] }); pop(); }
  label(540, 1250, 'разница в цене ≈ $200 · в пробеге — пара миль', 0, '#f4e6a8', 0.02, 34);
}
function tipsIns(t, c) {                                              // что делать: округлять вверх, сравнивать цену за кг
  cork(); const T = [[c.tip1, '$9.99 → ЧИТАЙ $10', '🔼', '#f4e6a8'], [c.tip2, 'СРАВНИВАЙ ЦЕНУ ЗА КГ', '⚖️', '#d9f0d2']];
  T.forEach(([t0, s, em, col], i) => { if (t < t0 - 0.1) return; push(540 + (i ? 20 : -20), 560 + i * 380, popK(t, t0 - 0.1, 0.3), i ? 0.04 : -0.04);
    card(0, 0, 900, 260, 0, 10900 + i, col); txt(String(i + 1), -380, 0, 100, { font: 'Inter Black', col: '#d8342c' }); txt(em, -270, 0, 84, { font: 'Noto Color Emoji' });
    txt(s, 70, 4, 50, { font: 'Inter Black', col: '#1c1512' }); pop(); pin(540 + (i ? 20 : -20), 440 + i * 380); });
  if (t > c.tip2 + 0.3) { priceTag(820, 1240, 0.8, 0.05, '$3', '.49', { seed: 10910, label: '$6.98 за кг' }); }
}
