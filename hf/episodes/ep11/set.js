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
  // стена: персиковые обои в полоску с мелким узором «рыбка-косточка»
  rectP(-300, -300, 1680, 1900, '#f2dcc8', { seed: 11000, line: false, step: 70 });
  for (let x = -280; x < 1400; x += 120) stroke([[x, -300], [x, 1500]], '#ead0bb', 26);
  { const r = rng(11001); for (let y = -260; y < 1300; y += 90) for (let x = -250 + ((y / 90) % 2) * 60; x < 1380; x += 120) { if (x > 400 && x < 1260 && y > 190 && y < 1050) continue;
      push(x + (r() - 0.5) * 6, y, 1, -0.3); stroke([[-12, 0], [10, 0]], '#e2b9a0', 3); stroke([[10, 0], [16, -6]], '#e2b9a0', 3); stroke([[10, 0], [16, 6]], '#e2b9a0', 3); dot(-12, 0, 4, '#e2b9a0'); pop(); } }
  // панели снизу и молдинг
  rectP(-300, 1300, 1680, 240, '#c98a6a', { seed: 11002, lw: 2.2, shade: () => { for (let x = -260; x < 1380; x += 110) rectP(x, 1330, 80, 180, '#bd7e5e', { seed: 11003 + x, lw: 1.6 }); } });
  rectP(-300, 1288, 1680, 20, '#fbfaf6', { seed: 11004, lw: 2 });
  // окно: небо полосами, солнце, облака, птицы, два плана крыш
  rectP(500, 260, 640, 740, '#ffd9a8', { seed: 11005, line: false, shade: () => {
    [['#b9a2d8', 260, 110], ['#d6a8d6', 370, 100], ['#f2a7b8', 470, 110], ['#f8b9a0', 580, 120], ['#ffd09a', 700, 120]].forEach(([c, y, h], i) => rectP(500, y, 640, h, c, { seed: 11006 + i, line: false }));
    glowAdd(930, 770, 260, 'rgba(255,230,160,1)', 0.6); ellP(930, 770, 92, 92, '#ffe08a', { seed: 11012, line: false });
    [[600, 360, 1], [980, 430, 0.8], [760, 520, 0.7]].forEach(([x, y, k], i) => { const dx = (t * 6 + i * 40) % 80; blobP([[x - 70 + dx, y + 16], [x - 40 + dx, y - 18], [x + dx, y - 26], [x + 50 + dx, y - 10], [x + 70 + dx, y + 16]].map(([px, py]) => [x + (px - x) * k, y + (py - y) * k]), '#fbe7ef', { seed: 11013 + i, lw: 1.6 }); });
    for (let i = 0; i < 3; i++) { const bx = 560 + ((t * 30 + i * 90) % 560), by = 420 + i * 30 + Math.sin(t * 3 + i) * 6, w = Math.sin(step(t, 12) * 9 + i) * 8; stroke([[bx - 14, by - w], [bx, by], [bx + 14, by - w]], '#5a3a6c', 3); }
    const F = [[500, 820, 180], [690, 790, 150], [850, 840, 200], [1040, 800, 110]]; F.forEach(([x, y, w], i) => rectP(x, y, w, 1000 - y, '#c6a6c8', { seed: 11020 + i, line: false }));   // дальний план
    const R = [[500, 760, 150, '#7a5a8c'], [640, 700, 130, '#8a6a9c'], [760, 800, 160, '#6a4a7c'], [930, 740, 120, '#7a5a8c'], [1040, 780, 140, '#5a3a6c']];
    R.forEach(([x, y, w, c], i) => { piece([[x - 6, y], [x + w / 2, y - 40], [x + w + 6, y]], mix(c, '#000000', 0.18), { seed: 11030 + i, lw: 2 }); rectP(x, y, w, 1000 - y, c, { seed: 11035 + i, lw: 2 });
      rectP(x + w - 40, y - 70, 22, 50, mix(c, '#000000', 0.25), { seed: 11040 + i, lw: 1.6 }); if (i % 2) stroke([[x + 30, y - 40], [x + 30, y - 110]], '#3a2a4a', 3), stroke([[x + 14, y - 96], [x + 46, y - 96]], '#3a2a4a', 3);
      for (let k = 0; k < 3; k++) for (let j = 0; j < 2; j++) { const lit = (k + i + j) % 3 === 0; rectP(x + 18 + k * 42, y + 36 + j * 60, 24, 32, lit ? '#ffe08a' : mix(c, '#000000', 0.2), { seed: 11050 + i * 6 + k * 2 + j, line: false }); if (lit) glowAdd(x + 30 + k * 42, y + 52 + j * 60, 30, 'rgba(255,220,140,1)', 0.35); } });
    piece([[1140, 300], [1040, 380], [990, 360], [1000, 420], [940, 470]], 'rgba(0,0,0,0)', { raw: true, lc: '#4a3a2a', lw: 9, tex: false });   // ветка дерева в окне
    [[1040, 372], [1000, 400], [960, 455], [1080, 340]].forEach(([x, y], i) => blobP([[x - 22, y], [x, y - 20], [x + 24, y - 4], [x, y + 14]], i % 2 ? '#7aa66a' : '#8fbf74', { seed: 11090 + i, lw: 1.4 }));
  } });
  // рама: толстая, с тенью и бликами на стекле
  [[490, 250, 660, 26], [490, 250, 26, 760], [1124, 250, 26, 760], [808, 250, 22, 760], [490, 600, 660, 22]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#fbfaf6', { seed: 11100 + i, lw: 2.4, shade: () => { rectP(x + w - 6, y, 6, h, '#e2ddd2', { seed: 11106 + i, line: false }); } }));
  ctx.save(); ctx.globalAlpha = 0.28; [[560, 330], [870, 330], [560, 680], [870, 690]].forEach(([x, y]) => { stroke([[x, y + 60], [x + 60, y]], '#ffffff', 14); stroke([[x + 30, y + 80], [x + 90, y + 20]], '#ffffff', 6); }); ctx.restore();
  rectP(822, 640, 10, 40, '#c9c4b8', { seed: 11110, lw: 1.4 });                                                     // ручка
  // шторы со складками и подхватами
  piece([[420, 220], [530, 220], [512, 760], [470, 830], [500, 1010], [392, 1010], [430, 830], [400, 760]], '#7aa66a', { seed: 11120, lw: 2.4, shade: () => { [430, 462, 494].forEach(x => stroke([[x, 240], [x - 8, 990]], '#5f8a52', 6)); } });
  piece([[1110, 220], [1230, 220], [1250, 760], [1220, 830], [1250, 1010], [1146, 1010], [1170, 830], [1130, 760]], '#7aa66a', { seed: 11121, lw: 2.4, shade: () => { [1150, 1185, 1220].forEach(x => stroke([[x, 240], [x + 6, 990]], '#5f8a52', 6)); } });
  [[452, 800], [1196, 800]].forEach(([x, y], i) => ellP(x, y, 46, 14, '#e2b04a', { seed: 11122 + i, lw: 2 }));
  rectP(380, 204, 900, 16, '#8a6a4a', { seed: 11124, lw: 2 }); [380, 1280].forEach((x, i) => ellP(x, 212, 18, 18, '#a8742e', { seed: 11125 + i, lw: 2 }));
  // широкий подоконник (на нём сидит Том): кружка с паром, суккулент, стопка книг, кактус
  rectP(470, 1000, 720, 44, '#fbfaf6', { seed: 11130, lw: 2.6, shade: () => { rectP(470, 1030, 720, 14, '#e2ddd2', { seed: 11131, line: false }); } });
  rectP(470, 1044, 720, 18, 'rgba(90,60,50,0.18)', { seed: 11132, line: false, tex: false });
  push(560, 1000); rectP(-34, -70, 68, 70, '#f6f1e4', { seed: 11133, lw: 2.2, shade: () => { stroke([[-34, -40], [34, -40]], '#d8342c', 8); } }); ellP(44, -36, 16, 20, 'rgba(0,0,0,0)', { raw: true, lc: '#1c1512', lw: 6, tex: false });
  for (let i = 0; i < 2; i++) { const k = (t * 0.4 + i * 0.5) % 1; ctx.globalAlpha = 0.5 * (1 - k); stroke([[-8 + i * 16, -80 - k * 60], [4 + i * 16 + Math.sin(t * 3 + i) * 10, -110 - k * 60]], '#ffffff', 6); ctx.globalAlpha = 1; } pop();
  push(650, 1000); rectP(-60, -26, 120, 26, '#3d7fc4', { seed: 11134, lw: 1.8 }); rectP(-54, -48, 108, 22, '#e2533a', { seed: 11135, lw: 1.8 }); rectP(-48, -66, 96, 18, '#f2d24a', { seed: 11136, lw: 1.8 }); pop();
  rectP(1080, 940, 70, 60, '#c8603a', { seed: 11137, lw: 2.2 }); blobP([[1100, 945], [1092, 860], [1115, 820], [1138, 860], [1130, 945]], '#5f9a4a', { seed: 11138, lw: 2.2 });
  ellP(1115, 820, 10, 8, '#f08ab0', { seed: 11139, lw: 1.4 });
  // батарея с краном и трубой, на ней сушится носок
  rectP(560, 1110, 540, 230, '#e9e6de', { seed: 11140, lw: 2.4, shade: () => { for (let x = 580; x < 1090; x += 44) stroke([[x, 1120], [x, 1330]], '#cfcac0', 8); } });
  stroke([[1100, 1300], [1150, 1300], [1150, 1540]], '#d6d2c8', 14); ellP(1150, 1290, 16, 12, '#c8402c', { seed: 11141, lw: 1.6 });
  piece([[700, 1100], [740, 1100], [744, 1190], [770, 1210], [764, 1236], [716, 1226], [700, 1190]], '#46b86a', { seed: 11142, lw: 1.8, shade: () => { stroke([[702, 1120], [740, 1120]], '#fbfaf6', 6); } });
  // слева: полка с кормом и книгами, клише-рамка, часы, вьющийся цветок
  rectP(-40, 560, 380, 20, '#8a6a4a', { seed: 11150, lw: 2 }); [[0, 580], [300, 580]].forEach(([x, y], i) => piece([[x, y], [x + 30, y], [x, y + 40]], '#7a5a3a', { seed: 11151 + i, lw: 1.6 }));
  [[20, '#5b3a8c'], [110, '#e25c2c'], [200, '#3d7fc4']].forEach(([x, c], i) => piece([[x - 34, 560], [x + 34, 560], [x + 30, 440], [x - 30, 440]], c, { seed: 11153 + i, lw: 2, shade: () => { ellP(x, 500, 18, 10, '#f08a7a', { seed: 11157 + i, line: false }); } }));
  [['#c8402c', 0], ['#3d7fc4', 1], ['#f2a03a', 2], ['#46b86a', 3]].forEach(([c, i]) => rectP(250 + i * 22, 480 - (i % 2) * 16, 20, 80 + (i % 2) * 16, c, { seed: 11161 + i, lw: 1.6 }));
  clicheFrame(150, 300, 0.75, t);
  clockP(110, 790, 62, 6, 40, t);
  stroke([[330, 220], [330, 260]], '#6b655c', 3); push(330, 290); piece([[-40, -30], [40, -30], [30, 30], [-30, 30]], '#c8603a', { seed: 11170, lw: 2 }); pop();
  [[-30, 0.9], [10, 1.3], [40, 1.0]].forEach(([dx, k], j) => { let x = 330 + dx, y = 320; for (let i = 0; i < 6; i++) { const nx = x + Math.sin(i * 1.3 + j + t * 1.2) * 14, ny = y + 34 * k; stroke([[x, y], [nx, ny]], '#4a7a3a', 4); blobP([[nx - 16, ny], [nx, ny - 12], [nx + 16, ny], [nx, ny + 12]], i % 2 ? '#7aa66a' : '#5f9a4a', { seed: 11180 + j * 10 + i, lw: 1.2 }); x = nx; y = ny; } });
  rectP(420, 1160, 40, 60, '#fbfaf6', { seed: 11195, lw: 1.6 }); rectP(432, 1176, 16, 26, '#e2ddd2', { seed: 11196, lw: 1.2 });            // выключатель
  // пол: паркет ёлочкой, тень батареи, коврик, когтеточка, игрушечная мышь
  rectP(-300, 1550, 1680, 700, '#c99a6a', { seed: 11200, step: 60, shade: () => { for (let y = 1580; y < 2250; y += 60) for (let x = -300 + ((y / 60) % 2) * 60; x < 1380; x += 120) stroke([[x, y], [x + 60, y + 30]], '#b0845a', 4); } });
  rectP(-300, 1530, 1680, 26, '#fbfaf6', { seed: 11201, lw: 2 });
  ellP(330, 1660, 380, 70, '#5a86b6', { seed: 11202, lw: 2.4, shade: () => { ellP(330, 1660, 320, 52, '#f2d24a', { seed: 11203, line: false }); ellP(330, 1660, 250, 36, '#5a86b6', { seed: 11204, line: false }); } });
  rectP(-40, 1240, 60, 320, '#d9c08a', { seed: 11205, lw: 2.2, shade: () => { for (let y = 1250; y < 1550; y += 18) stroke([[-40, y], [20, y + 8]], '#bfa06a', 4); } }); rectP(-90, 1210, 170, 34, '#8a6a9c', { seed: 11206, lw: 2 });
  push(860, 1620, 1, 0.2); ellP(0, 0, 30, 18, '#9a9488', { seed: 11207, lw: 1.8 }); ellP(-24, -12, 9, 9, '#f08ab0', { seed: 11208, lw: 1.2 }); stroke([[28, 4], [60, 14], [80, 2]], '#6b655c', 3); pop();
  bowlP(o.bowlX ?? 640, 1600, 0.9, o.full !== false);
}
function morningLight(t, fn) { lightmap('#cfc0bc', () => {
  radial(860, 620, 900, 'rgba(255,214,190,1)', 0.8); radial(820, 1100, 520, 'rgba(255,240,220,1)', 0.4);
  cone(820, 600, 560, 1800, 360, 'rgba(255,226,180,1)', 0.45);                                          // солнечный луч из окна на пол
  ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = 'rgba(255,236,200,1)'; [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([i, j]) => { const x0 = 380 + i * 210 - j * 70, y0 = 1600 + j * 110; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + 190, y0); ctx.lineTo(x0 + 120, y0 + 100); ctx.lineTo(x0 - 70, y0 + 100); ctx.fill(); }); ctx.restore();   // пятна света от рамы на полу
  radial(120, 400, 500, 'rgba(255,200,170,1)', 0.15); if (fn) fn(); });
  { const r = rng(11300); for (let i = 0; i < 26; i++) { const k = (r() + t * 0.02 * (0.5 + r())) % 1; dot(lerp(700, 560, k) + Math.sin(k * 20 + i) * 60 + (r() - 0.5) * 200, 700 + k * 900, 2 + r() * 3, 'rgba(255,240,200,1)', 0.5 * Math.sin(k * 3.14)); } }   // пылинки в луче
}

// ------------------------------------------------------------------ вставки
function tableBg(seed) {                                              // фон вставок: деревянный стол, рассыпанный корм, обрывки бумаги
  rectP(-100, -100, 1280, 2200, '#c08a5a', { seed, line: false, step: 80 });
  for (let y = -60; y < 2100; y += 150) { rectP(-100, y, 1280, 8, '#9a6a42', { seed: seed + 1 + y, line: false }); const r = rng(seed + y); for (let i = 0; i < 6; i++) { const x = r() * 1080, w = 80 + r() * 200; stroke([[x, y + 40 + r() * 70], [x + w, y + 44 + r() * 70]], '#ad7a4c', 4); } }
  kibble(140, 1500, 14, 200, seed + 50); kibble(930, 360, 10, 160, seed + 70); kibble(980, 1560, 8, 120, seed + 90);
  [[90, 180, -0.3, '#f4e6a8'], [990, 1080, 0.25, '#d9f0d2'], [120, 1180, 0.15, '#f4c6b8']].forEach(([x, y, r, c], i) => { push(x, y, 1, r); piece([[-90, -60], [90, -70], [80, 60], [-84, 66]], c, { seed: seed + 110 + i, step: 10, lw: 1.8 }); pop(); tape(x, y - 60, 90, r, seed + 120 + i); });
  ctx.save(); const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(40,20,10,0.45)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function bar(x, y, w, h, k, col, seed) { rectP(x, y, w, h, '#efe7d8', { seed, lw: 2.2 }); if (k > 0.001) rectP(x, y, Math.max(8, w * k), h, col, { seed: seed + 1, lw: 2 }); }
function threeIns(t, c) {                                             // «с лососем» = минимум 3 %
  tableBg(11100); foodPack(330, 760, 2.1, -0.06, { price: false }); tape(330, 430, 160, -0.06, 11109);
  const k = popK(t, c.word - 0.2, 0.3);
  if (k > 0) { push(780, 700, k, 0.05); card(0, 0, 400, 300, 0, 11101, '#fbfaf6'); txt('слово', 0, -90, 40, { font: 'Inter', weight: 800, col: '#6b655c' }); txt('«С»', 0, 20, 130, { font: 'Inter Black', col: '#5b3a8c', maxW: 340 }); pop(); }
  if (t > c.min3) { push(540, 1010, 1, -0.04); ransom('МИНИМУМ 3%', 0, 0, 92, 11102, { reveal: pr(t, c.min3, c.min3 + 0.3), pop: true }); pop(); }
  const kb = sm(pr(t, c.min3, c.min3 + 0.6)); if (kb > 0) { card(540, 1170, 880, 180, 0, 11104, '#fbfaf6'); bar(140, 1110, 800, 70, 0.03 * kb, '#f08a7a', 11103); txt('лосось', 164, 1210, 32, { font: 'Inter Black', col: '#c8402c', align: 'left' }); txt('всё остальное', 920, 1210, 32, { font: 'Inter Black', col: '#6b655c', align: 'right' }); }
  label(540, 1320, 'правила маркировки кормов в США (AAFCO / FDA)', 0, '#fbfaf6', -0.01, 28);
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
  bg('#cfe6ee', 11300); rectP(-100, -100, 1280, 500, '#b8dcea', { seed: 11330, line: false });
  glowAdd(880, 260, 200, 'rgba(255,240,180,1)', 0.6); ellP(880, 260, 80, 80, '#ffe08a', { seed: 11331, line: false });
  [[200, 520, 1], [760, 600, 0.8], [420, 380, 0.6]].forEach(([x, y, k], i) => { const dx = (t * 10 + i * 50) % 120; blobP([[-90, 20], [-50, -24], [0, -36], [60, -16], [90, 20]].map(([px, py]) => [x + dx + px * k, y + py * k]), '#fbfaf6', { seed: 11332 + i, lw: 1.6 }); });
  blobP([[-100, 1010], [120, 820], [380, 900], [640, 780], [900, 880], [1180, 800], [1180, 1010]], '#8fbf74', { seed: 11336, lw: 2.2 });
  [[90, 900], [230, 880], [960, 860], [1060, 900]].forEach(([x, y], i) => { rectP(x - 8, y - 10, 16, 60, '#7a5a3a', { seed: 11340 + i, lw: 1.4 }); blobP([[x - 46, y], [x - 30, y - 70], [x, y - 100], [x + 30, y - 70], [x + 46, y]], i % 2 ? '#5f9a4a' : '#4a7a3a', { seed: 11345 + i, lw: 1.8 }); });
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
  tableBg(11500); foodPack(540, 760, 2.6, 0.03, { back: true, ring: t > c.first });
  if (t > c.desc) { push(540, 230, 1, -0.03); ransom('ПО УБЫВАНИЮ', 0, 0, 100, 11501, { reveal: pr(t, c.desc, c.desc + 0.3), pop: true }); pop(); }
  if (t > c.corn) { push(860, 1170, popK(t, c.corn, 0.3), 0.08); stampX(0, 0, 1.4, 1); pop(); label(400, 1200, 'кукуруза первая — не бери', 0, '#f4c6b8', -0.03, 36); }
}
