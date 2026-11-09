/* Эп. 11 «Корм „с лососем“ — развод?» — декорация (комната-студия ранним утром: широкий подоконник, батарея, миска) и вставки-коллажи. */

function fishCut(x, y, s, rot, col, seed) {                          // лосось-вырезка сбоку
  push(x, y, s, rot);
  piece([[110, 0], [170, -60], [160, 0], [170, 60]], mix(col, '#000000', 0.12), { seed: seed + 1, lw: 2.2 });
  blobP([[-150, 0], [-90, -55], [20, -62], [115, -18], [115, 18], [20, 60], [-90, 52]], col, { seed, lw: 2.6, shade: () => {
    for (let i = 0; i < 4; i++) stroke([[-40 + i * 34, -40], [-30 + i * 34, 38]], mix(col, '#ffffff', 0.25), 5);
    piece([[-20, -60], [30, -95], [55, -55]], mix(col, '#000000', 0.12), { seed: seed + 2, line: false }); } });
  ellP(-108, -12, 12, 12, '#fbfaf6', { seed: seed + 3, lw: 1.6 }); dot(-106, -12, 6, '#1c1512'); pop();
}
function kibble(x, y, n, w, seed) { const r = rng(seed); for (let i = 0; i < n; i++) ellP(x + (r() - 0.5) * w, y - r() * 18, 9 + r() * 4, 7 + r() * 3, r() < 0.5 ? '#9a5a2e' : '#7a4424', { seed: seed + i, lw: 1.2 }); }
function bowlP(x, y, s, full) {                                      // миска на полу (полная — Том не ест)
  push(x, y, s); if (full) kibble(0, -36, 26, 150, 11900);
  piece([[-110, -40], [110, -40], [86, 20], [-86, 20]], '#3d7fc4', { seed: 11901, lw: 2.6, shade: () => { stroke([[-96, -24], [96, -24]], '#6aa6e0', 6); } });
  txt('ТОМ', 0, -4, 28, { font: 'Inter Black', col: '#fbfaf6' }); pop();
}
function foodPack(x, y, s, rot, o = {}) {                            // пакет корма: «С ЛОСОСЕМ» крупно, «со вкусом» мелко
  push(x, y, s, rot);
  piece([[-95, -150], [95, -150], [108, 150], [-108, 150]], '#5b3a8c', { seed: 11920, lw: 2.8, shade: () => { rectP(-95, -150, 190, 26, '#4a2e74', { seed: 11921, line: false }); } });
  if (o.back) {                                                       // оборот: состав
    rectP(-82, -110, 164, 240, '#fbfaf6', { seed: 11922, lw: 1.6 }); txt('СОСТАВ', 0, -86, 24, { font: 'Inter Black', col: '#1c1512' });
    ['кукуруза', 'мука курицы', 'пшеница', 'жир', '…', 'лосось 3%'].forEach((w, i) => txt(w, 0, -50 + i * 30, 20, { font: 'Inter', weight: 800, col: i ? '#3a3530' : '#c8241c' }));
    if (o.ring) { ctx.globalAlpha = 0.9; ellP(0, -50, 78, 22, 'rgba(0,0,0,0)', { raw: true, lc: '#c8241c', lw: 6, tex: false }); ctx.globalAlpha = 1; }
    pop(); return;
  }
  txt('со вкусом', 0, -124, o.small ?? 15, { font: 'Inter', weight: 800, col: '#e8dcf4' });
  txt('С ЛОСОСЕМ', 0, -84, 34, { font: 'Inter Black', col: '#f7c948' });
  fishCut(0, 4, 0.5, -0.12, '#f08a7a', 11930);
  rectP(-70, 74, 140, 34, '#f7c948', { seed: 11935, lw: 1.6 }); txt('PREMIUM', 0, 92, 22, { font: 'Inter Black', col: '#5b3a8c' });
  if (o.price !== false) { push(70, -40, 1, 0.3); ellP(0, 0, 34, 34, '#d8342c', { seed: 11936, lw: 2 }); txt('$40', 0, 3, 22, { font: 'Inter Black', col: '#fbfaf6' }); pop(); }
  pop();
}

function windowRoom(t, o = {}) {
  rectP(-300, -300, 1680, 1900, '#f2dcc8', { seed: 11000, line: false, step: 70 });                         // стена: персик
  for (let x = -280; x < 1400; x += 120) stroke([[x, -300], [x, 1500]], '#ead0bb', 26);                        // полоски обоев
  // окно: рассветное небо, крыши напротив
  rectP(500, 260, 640, 740, '#f6b9a4', { seed: 11001, line: false, shade: () => {
    rectP(500, 260, 640, 260, '#c9a8d8', { seed: 11002, line: false }); rectP(500, 500, 640, 160, '#f2a7b0', { seed: 11003, line: false });
    ellP(930, 720, 90, 90, '#ffe08a', { seed: 11004, line: false });
    const R = [[500, 760, 150, '#7a5a8c'], [640, 700, 130, '#8a6a9c'], [760, 800, 160, '#6a4a7c'], [930, 740, 120, '#7a5a8c'], [1040, 780, 140, '#5a3a6c']];
    R.forEach(([x, y, w, c], i) => { rectP(x, y, w, 1000 - y, c, { seed: 11005 + i, lw: 2 }); for (let k = 0; k < 3; k++) rectP(x + 20 + k * 40, y + 40, 22, 30, (k + i) % 2 ? '#ffe08a' : mix(c, '#000000', 0.2), { seed: 11010 + i * 3 + k, line: false }); }); } });
  [[490, 250, 660, 24], [490, 250, 24, 760], [1126, 250, 24, 760], [810, 250, 20, 760], [490, 600, 660, 20]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#fbfaf6', { seed: 11020 + i, lw: 2.2 }));
  // шторы
  piece([[430, 220], [520, 220], [500, 1010], [400, 1010]], '#7aa66a', { seed: 11030, lw: 2.4, shade: () => { stroke([[460, 240], [450, 990]], '#5f8a52', 6); } });
  piece([[1120, 220], [1220, 220], [1240, 1010], [1140, 1010]], '#7aa66a', { seed: 11031, lw: 2.4 });
  rectP(400, 206, 860, 18, '#8a6a4a', { seed: 11032, lw: 2 });
  // широкий подоконник (на нём сидит Том) и батарея
  rectP(470, 1000, 720, 44, '#fbfaf6', { seed: 11040, lw: 2.6, shade: () => { rectP(470, 1030, 720, 14, '#e2ddd2', { seed: 11041, line: false }); } });
  rectP(560, 1110, 540, 230, '#e9e6de', { seed: 11042, lw: 2.4, shade: () => { for (let x = 580; x < 1090; x += 44) stroke([[x, 1120], [x, 1330]], '#cfcac0', 8); } });
  // кактус на подоконнике
  rectP(1080, 940, 70, 60, '#c8603a', { seed: 11050, lw: 2.2 }); blobP([[1100, 945], [1092, 860], [1115, 820], [1138, 860], [1130, 945]], '#5f9a4a', { seed: 11051, lw: 2.2 });
  // слева: полка с пачками корма и рамка-клише
  rectP(-40, 560, 360, 20, '#8a6a4a', { seed: 11060, lw: 2 });
  [[20, '#5b3a8c'], [110, '#e25c2c'], [200, '#3d7fc4']].forEach(([x, c], i) => piece([[x - 34, 560], [x + 34, 560], [x + 30, 440], [x - 30, 440]], c, { seed: 11061 + i, lw: 2, shade: () => { ellP(x, 500, 18, 10, '#f08a7a', { seed: 11065 + i, line: false }); } }));
  clicheFrame(150, 300, 0.75, t);
  // пол: паркет ёлочкой
  rectP(-300, 1550, 1680, 700, '#c99a6a', { seed: 11070, step: 60, shade: () => { for (let y = 1580; y < 2250; y += 60) for (let x = -300 + ((y / 60) % 2) * 60; x < 1380; x += 120) stroke([[x, y], [x + 60, y + 30]], '#b0845a', 4); } });
  rectP(-300, 1530, 1680, 26, '#fbfaf6', { seed: 11071, lw: 2 });                                              // плинтус
  bowlP(o.bowlX ?? 640, 1600, 0.9, o.full !== false);
}
function morningLight(fn) { lightmap('#d9cbc0', () => { radial(820, 640, 900, 'rgba(255,214,190,1)', 0.75); radial(820, 1100, 500, 'rgba(255,240,220,1)', 0.35); if (fn) fn(); }); }

// ------------------------------------------------------------------ вставки
function bar(x, y, w, h, k, col, seed) { rectP(x, y, w, h, '#efe7d8', { seed, lw: 2.2 }); if (k > 0.001) rectP(x, y, Math.max(8, w * k), h, col, { seed: seed + 1, lw: 2 }); }
function threeIns(t, c) {                                             // «с лососем» = минимум 3 %
  bg('#e9e1f2', 11100); foodPack(330, 760, 2.1, -0.06, { price: false });
  const k = popK(t, c.word - 0.2, 0.3);
  if (k > 0) { push(780, 700, k, 0.05); card(0, 0, 400, 300, 0, 11101, '#fbfaf6'); txt('слово', 0, -90, 40, { font: 'Inter', weight: 800, col: '#6b655c' }); txt('«С»', 0, 20, 130, { font: 'Inter Black', col: '#5b3a8c', maxW: 340 }); pop(); }
  if (t > c.min3) { push(540, 1010, 1, -0.04); ransom('МИНИМУМ 3%', 0, 0, 92, 11102, { reveal: pr(t, c.min3, c.min3 + 0.3), pop: true }); pop(); }
  const kb = sm(pr(t, c.min3, c.min3 + 0.6)); if (kb > 0) { bar(140, 1120, 800, 70, 0.03 * kb, '#f08a7a', 11103); txt('лосось', 140 + 24, 1220, 30, { font: 'Inter Black', col: '#c8402c', align: 'left' }); txt('всё остальное', 920, 1220, 30, { font: 'Inter Black', col: '#6b655c', align: 'right' }); }
  txt('правила маркировки кормов в США (AAFCO / FDA)', 540, 1290, 28, { font: 'Inter', weight: 800, col: '#3a3530' });
}
function dinnerIns(t, c) {                                            // «ужин», «блюдо», «формула» = 25 %
  cork(); const W = [['«УЖИН»', c.w1], ['«БЛЮДО»', c.w2], ['«ФОРМУЛА»', c.w3]];
  W.forEach(([s, t0], i) => { const k = popK(t, t0 - 0.15, 0.3); if (k <= 0) return; push(540 + (i - 1) * 40, 420 + i * 170, k, (i - 1) * 0.04); card(0, 0, 640, 130, 0, 11200 + i, '#fbfaf6');
    txt(s, 0, 4, 64, { font: 'Inter Black', col: '#1c1512', maxW: 580 }); pop(); pin(540 + (i - 1) * 40, 360 + i * 170); });
  if (t > c.p25) {                                                     // четверть рыбы цветная, остальное — серым
    push(540, 1020, 1.3); fishCut(0, 0, 1, 0, '#cfc6b4', 11210); pop();
    ctx.save(); ctx.beginPath(); ctx.rect(540 - 200, 900, 400 * 0.25 * sm(pr(t, c.p25, c.p25 + 0.4)) + 2, 260); ctx.clip(); push(540, 1020, 1.3); fishCut(0, 0, 1, 0, '#f08a7a', 11210); pop(); ctx.restore();
    push(820, 900, 1, 0.06); ransom('25%', 0, 0, 120, 11220, { reveal: pr(t, c.p25, c.p25 + 0.25), pop: true }); pop(); }
  txt('dinner · entrée · formula — правило 25 % (AAFCO)', 540, 1290, 28, { font: 'Inter', weight: 800, col: '#1c1512' });
}
function flavorIns(t, c) {                                            // «со вкусом» — без минимума; лосось проплыл мимо завода
  bg('#cfe6ee', 11300);
  rectP(-100, 1000, 1280, 400, '#6aa6c8', { seed: 11301, lw: 2.4, shade: () => { for (let x = -60; x < 1180; x += 90) stroke([[x, 1030 + Math.sin(x + t * 3) * 6], [x + 50, 1030]], '#9ccbe2', 5); } });   // река
  push(560, 1000); rectP(-200, -360, 400, 360, '#9a9488', { seed: 11302, lw: 2.6 }); rectP(110, -520, 60, 180, '#7a746a', { seed: 11303, lw: 2.2 });
  txt('ЗАВОД', 0, -300, 50, { font: 'Inter Black', col: '#fbfaf6' }); for (let i = 0; i < 3; i++) rectP(-160 + i * 120, -230, 80, 70, '#ffe08a', { seed: 11304 + i, lw: 1.6 }); pop();
  for (let i = 0; i < 3; i++) { const k = (t * 0.12 + i * 0.3) % 1; dot(700 + Math.sin(t + i) * 20, 470 - k * 200, 30 + k * 30, '#e9eef2', 0.7 * (1 - k)); }   // пар из трубы
  const fx = lerp(1260, -260, pr(t, c.noMin + 0.6, c.swim + 2.9)); fishCut(fx, 1150, 1.0, Math.sin(t * 8) * 0.06, '#f08a7a', 11310);
  if (t > c.noMin) { push(540, 300, 1, -0.03); ransom('БЕЗ МИНИМУМА', 0, 0, 96, 11320, { reveal: pr(t, c.noMin, c.noMin + 0.3), pop: true }); pop(); }
  if (t > c.taste) { label(540, 440, 'лишь бы вкус можно было уловить', 0, '#f4e6a8', 0.02, 38); }
  txt('«flavor» — процента нет, нужен только узнаваемый вкус (AAFCO)', 540, 1290, 27, { font: 'Inter', weight: 800, col: '#1c1512' });
}
function ladderIns(t, c) {                                            // лестница: 95 / 25 / 3 / 0
  cork(); push(540, 760, 1); card(0, 0, 940, 900, 0, 11400, '#fbfaf6'); txt('СКОЛЬКО ЛОСОСЯ НА САМОМ ДЕЛЕ', 0, -390, 40, { font: 'Inter Black', col: '#1c1512', maxW: 860 });
  const L = [['«ЛОСОСЬ»', 0.95, '95%', '#46b86a'], ['«УЖИН ИЗ ЛОСОСЯ»', 0.25, '25%', '#f2a03a'], ['«С ЛОСОСЕМ»', 0.03, '3%', '#e2533a'], ['«СО ВКУСОМ»', 0.004, '≈0', '#8a8070']];
  L.forEach(([s, v, p, col], i) => { const t0 = i === 0 ? c.p95 - 0.3 : c.ladder + i * 0.15; const k = sm(pr(t, t0, t0 + 0.5)); if (k <= 0) return; const y = -270 + i * 175;
    txt(s, -420, y, 38, { font: 'Inter Black', col: '#1c1512', align: 'left', maxW: 620 }); bar(-420, y + 30, 680, 60, v * k, col, 11410 + i * 3); txt(p, 360, y + 60, 50, { font: 'Inter Black', col, maxW: 140 }); });
  pop(); if (t > c.p95) { push(540, 1250, 1, -0.03); ransom('ТОЛЬКО ТАК — ЧЕСТНО', 0, 0, 64, 11430, { reveal: pr(t, c.p95, c.p95 + 0.3), pop: true }); pop(); }
}
function backIns(t, c) {                                              // перевернуть пачку: первое в составе — его больше всего
  bg('#efe4cf', 11500); foodPack(540, 760, 2.6, 0.03, { back: true, ring: t > c.first });
  if (t > c.desc) { push(540, 230, 1, -0.03); ransom('ПО УБЫВАНИЮ', 0, 0, 100, 11501, { reveal: pr(t, c.desc, c.desc + 0.3), pop: true }); pop(); }
  if (t > c.corn) { push(860, 1170, popK(t, c.corn, 0.3), 0.08); stampX(0, 0, 1.4, 1); pop(); label(400, 1200, 'кукуруза первая — не бери', 0, '#f4c6b8', -0.03, 36); }
}
