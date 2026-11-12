/* Эп. 13 «Тефлоновый заговор?» — декорация (кухня на закате: плита, сковородка, в окне река, коровы и завод с трубой) и вставки-коллажи. */

function panP(x, y, s, rot, o = {}) {                                // сковородка с котлетой; ручка влево-вниз к кулаку
  push(x, y, s, rot);
  rectP(-250, -14, 160, 28, '#2a2420', { seed: 13001, lw: 2.2 }); dot(-232, 0, 6, '#6b655c');
  ellP(0, 0, 120, 60, '#3a3632', { seed: 13002, lw: 2.8 }); ellP(0, -4, 100, 46, '#24221f', { seed: 13003, lw: 1.6 });
  stroke([[-50, -20], [10, -26]], '#4e4a44', 3); stroke([[20, 10], [60, 2]], '#4e4a44', 3); stroke([[-30, 16], [-4, 22]], '#4e4a44', 3);   // царапины
  if (o.cutlet !== false) { blobP([[-46, -6], [-30, -26], [20, -28], [50, -10], [40, 14], [-20, 18]], '#8a5030', { seed: 13004, lw: 2, shade: () => { stroke([[-26, -10], [26, -16]], '#a8683e', 5); } }); }
  pop();
}
function cowP(x, y, s, seed, dead) {                                  // корова-вырезка сбоку
  push(x, y, s, dead ? Math.PI : 0);
  rectP(-60, -40, 120, 64, '#fbfaf6', { seed, lw: 2.2, shade: () => { blobP([[-40, -30], [-10, -36], [-14, -6], [-44, -4]], '#2a2420', { seed: seed + 1, line: false }); blobP([[16, -10], [40, -20], [44, 10], [20, 14]], '#2a2420', { seed: seed + 2, line: false }); } });
  [[-50, 24], [-30, 24], [30, 24], [50, 24]].forEach(([lx, ly], i) => rectP(lx - 6, ly, 12, 34, '#fbfaf6', { seed: seed + 3 + i, lw: 1.6 }));
  push(70, -40); ellP(0, 0, 26, 22, '#fbfaf6', { seed: seed + 8, lw: 2 }); ellP(14, 8, 14, 10, '#f0a8a0', { seed: seed + 9, lw: 1.4 }); dot(-2, -6, 4, '#1c1512'); stroke([[-14, -20], [-22, -32]], '#c8b48a', 5); pop();
  stroke([[-60, -30], [-78, 0]], '#2a2420', 4); pop();
}
function factoryP(x, y, s, t) {                                       // завод с трубой и дымом
  push(x, y, s);
  rectP(-120, -120, 240, 120, '#8a8478', { seed: 13010, lw: 2, shade: () => { for (let i = 0; i < 4; i++) rectP(-100 + i * 56, -90, 30, 30, '#ffd27a', { seed: 13011 + i, line: false }); } });
  piece([[-120, -120], [-80, -160], [-40, -120], [0, -160], [40, -120]], '#7a7468', { seed: 13016, lw: 2 });
  rectP(70, -260, 34, 140, '#6a645a', { seed: 13017, lw: 2, shade: () => { stroke([[70, -230], [104, -230]], '#d8342c', 8); } });
  for (let i = 0; i < 4; i++) { const k = (t * 0.15 + i * 0.25) % 1; dot(87 + k * 90 + Math.sin(t + i) * 10, -270 - k * 140, 18 + k * 34, '#cfcac8', 0.75 * (1 - k)); }
  pop();
}

function kitchen(t, o = {}) {
  // стена: плитка в шахматку + бежевая покраска сверху
  rectP(-300, -300, 1680, 1900, '#efe2c4', { seed: 13100, line: false, step: 70 });
  for (let x = -280; x < 1400; x += 160) for (let y = -280; y < 560; y += 160) dot(x + ((y / 160) % 2) * 80, y, 6, '#e2cfa8');
  rectP(-300, 600, 1680, 700, '#f6f1e4', { seed: 13101, line: false, shade: () => { for (let y = 600; y < 1300; y += 70) for (let x = -300 + ((y - 600) / 70 % 2) * 70; x < 1380; x += 140) rectP(x, y, 70, 70, '#cfe2ee', { seed: 13102 + ((x + y) & 127), line: false }); } });
  for (let y = 600; y < 1300; y += 70) stroke([[-300, y], [1380, y]], '#d8d2c4', 2);
  rectP(-300, 588, 1680, 14, '#c8603a', { seed: 13103, lw: 1.6 });
  // окно: закат, река, поле с коровами, завод на том берегу
  rectP(500, 240, 640, 760, '#ffc89a', { seed: 13110, line: false, shade: () => {
    [['#f2a07a', 240, 120], ['#f6b48a', 360, 110], ['#fbc89a', 470, 100], ['#ffdcaa', 570, 90]].forEach(([c, y, h], i) => rectP(500, y, 640, h, c, { seed: 13111 + i, line: false }));
    glowAdd(700, 610, 240, 'rgba(255,220,150,1)', 0.6); ellP(700, 620, 76, 76, '#ffe08a', { seed: 13115, line: false });
    [[620, 330, 1], [980, 400, 0.8]].forEach(([x, y, k], i) => { const dx = (t * 7 + i * 50) % 100; blobP([[-80, 16], [-46, -20], [0, -30], [56, -12], [80, 16]].map(([px, py]) => [x + dx + px * k, y + py * k]), '#fbd8c8', { seed: 13116 + i, lw: 1.4 }); });
    for (let i = 0; i < 3; i++) { const bx = 540 + ((t * 26 + i * 120) % 560), by = 380 + i * 26 + Math.sin(t * 3 + i) * 6, w = Math.sin(t * 9 + i) * 8; stroke([[bx - 13, by - w], [bx, by], [bx + 13, by - w]], '#7a4a4a', 3); }
    blobP([[500, 700], [640, 660], [800, 690], [980, 650], [1140, 680], [1140, 760], [500, 760]], '#9a9a6a', { seed: 13120, lw: 1.6 });                 // дальний берег
    factoryP(940, 700, 0.9, t);
    rectP(500, 740, 640, 90, '#6a9ab8', { seed: 13121, lw: 1.6, shade: () => { for (let x = 520; x < 1140; x += 80) stroke([[x + Math.sin(t * 2 + x) * 8, 770], [x + 40, 770]], '#9ac0d8', 4); } });   // река
    piece([[1000, 700], [1010, 760], [1020, 770]], 'rgba(0,0,0,0)', { raw: true, lc: '#7a7468', lw: 8, tex: false }); dot(1020, 770, 10, '#a8c870', 0.8);   // труба в реку
    rectP(500, 830, 640, 170, '#8fbf74', { seed: 13122, line: false, shade: () => { for (let x = 520; x < 1140; x += 60) stroke([[x, 860 + (x % 3) * 20], [x + 6, 846 + (x % 3) * 20]], '#6a9a52', 4); } });
    cowP(600, 900, 0.45, 13130); cowP(1040, 930, 0.4, 13140);
  } });
  [[490, 230, 660, 24], [490, 230, 24, 780], [1126, 230, 24, 780], [808, 230, 20, 780], [490, 600, 660, 20]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#fbfaf6', { seed: 13150 + i, lw: 2.2 }));
  ctx.save(); ctx.globalAlpha = 0.25; [[560, 300], [870, 320]].forEach(([x, y]) => stroke([[x, y + 60], [x + 60, y]], '#ffffff', 12)); ctx.restore();
  rectP(470, 200, 700, 50, '#d8342c', { seed: 13155, lw: 2, shade: () => { for (let x = 480; x < 1160; x += 40) piece([[x, 250], [x + 20, 276], [x + 40, 250]], '#d8342c', { seed: 13156 + x, lw: 1.4 }); for (let x = 490; x < 1160; x += 60) dot(x, 222, 8, '#fbfaf6'); } });   // занавеска-ламбрекен
  // стол-столешница под окном (на ней сидит Том): доска, банка с половниками, солонка, чайник, цветок
  rectP(470, 1000, 720, 36, '#c8a06a', { seed: 13160, lw: 2.4 }); rectP(480, 1036, 700, 500, '#fbfaf6', { seed: 13161, lw: 2.4, shade: () => { [[490, 1050], [835, 1050]].forEach(([x, y], i) => { rectP(x, y, 330, 470, '#f2ead8', { seed: 13162 + i, lw: 1.8 }); rectP(x + (i ? 20 : 290), y + 200, 16, 70, '#c8a06a', { seed: 13164 + i, lw: 1.4 }); }); } });
  push(560, 1000); rectP(-50, -16, 140, 16, '#d8a86a', { seed: 13170, lw: 1.8 }); pop();
  push(680, 1000); rectP(-30, -80, 60, 80, '#6aa6c8', { seed: 13171, lw: 2 }); stroke([[-10, -80], [-24, -170]], '#8a6a4a', 7); ellP(-26, -176, 18, 10, '#8a6a4a', { seed: 13172, lw: 1.4 }); stroke([[12, -80], [24, -160]], '#9a9488', 6); pop();
  push(1060, 1000); ellP(0, -50, 60, 50, '#e2533a', { seed: 13173, lw: 2.2 }); rectP(-20, -110, 40, 14, '#2a2420', { seed: 13174, lw: 1.4 }); stroke([[56, -70], [96, -96]], '#e2533a', 12); pop();
  push(1150, 1000); rectP(-24, -50, 48, 50, '#c8603a', { seed: 13175, lw: 2 }); blobP([[-30, -50], [-20, -110], [0, -130], [20, -110], [30, -50]], '#5f9a4a', { seed: 13176, lw: 1.8 }); pop();
  // слева: плита с кастрюлей (пар), вытяжка, рейлинг с половниками, календарь
  rectP(20, 1010, 330, 520, '#e9e6de', { seed: 13180, lw: 2.4, shade: () => { rectP(50, 1120, 270, 300, '#2a2a2a', { seed: 13181, lw: 2 }); rectP(70, 1140, 230, 120, '#4a4038', { seed: 13182, line: false }); [80, 140, 200, 260].forEach((x, i) => ellP(x, 1060, 16, 12, '#2a2420', { seed: 13183 + i, lw: 1.4 })); } });
  rectP(10, 990, 350, 24, '#4a4a4a', { seed: 13188, lw: 2 });
  push(260, 990); rectP(-70, -110, 140, 110, '#9ab0c0', { seed: 13189, lw: 2.2 }); rectP(-80, -120, 160, 18, '#7a909e', { seed: 13190, lw: 1.6 }); pop();
  for (let i = 0; i < 3; i++) { const k = (t * 0.4 + i * 0.33) % 1; ctx.globalAlpha = 0.55 * (1 - k); stroke([[240 + i * 20, 860 - k * 140], [250 + i * 20 + Math.sin(t * 3 + i) * 14, 820 - k * 140]], '#ffffff', 10); ctx.globalAlpha = 1; }
  piece([[20, 420], [340, 420], [300, 560], [60, 560]], '#c8c4b8', { seed: 13191, lw: 2.2 });
  stroke([[40, 640], [340, 640]], '#9a9488', 8); [[80, '#8a6a4a'], [150, '#9a9488'], [220, '#c8603a'], [290, '#9a9488']].forEach(([x, c], i) => { stroke([[x, 640], [x, 740]], c, 7); ellP(x, 750, 18, 12, c, { seed: 13192 + i, lw: 1.4 }); });
  push(150, 250, 1, -0.03); rectP(-80, -90, 160, 180, '#fbfaf6', { seed: 13196, lw: 2 }); rectP(-80, -90, 160, 40, '#d8342c', { seed: 13197, lw: 1.6 }); txt('1999', 0, -68, 24, { font: 'Inter Black', col: '#fbfaf6' });
  for (let i = 0; i < 12; i++) rectP(-66 + (i % 4) * 34, -36 + Math.floor(i / 4) * 34, 26, 26, '#efe7d8', { seed: 13198 + i, line: false }); pop();
  clockP(1270, 330, 54, 7, 40, t);
  // пол: шахматный линолеум, коврик, миска Тома
  rectP(-300, 1530, 1680, 700, '#e2d8c4', { seed: 13200, step: 60, shade: () => { for (let y = 1530; y < 2250; y += 90) for (let x = -300 + ((y - 1530) / 90 % 2) * 90; x < 1380; x += 180) rectP(x, y, 90, 90, '#b8a888', { seed: 13201 + ((x + y) & 63), line: false }); } });
  ellP(560, 1680, 300, 60, '#5a86b6', { seed: 13230, lw: 2.2, shade: () => { ellP(560, 1680, 240, 44, '#f2d24a', { seed: 13231, line: false }); } });
  push(1000, 1620, 0.85); piece([[-100, -36], [100, -36], [78, 18], [-78, 18]], '#46b86a', { seed: 13232, lw: 2.4 }); txt('ТОМ', 0, -2, 26, { font: 'Inter Black', col: '#fbfaf6' }); pop();
}
function sunsetLight(t, fn) { lightmap('#cdbcb4', () => {
  radial(800, 620, 920, 'rgba(255,200,160,1)', 0.8); radial(820, 1150, 520, 'rgba(255,230,200,1)', 0.4);
  cone(780, 620, 520, 1800, 380, 'rgba(255,214,170,1)', 0.4); radial(240, 950, 360, 'rgba(255,220,180,1)', 0.25);
  if (fn) fn(); });
}

// ------------------------------------------------------------------ вставки
function tilesBg(seed) {                                              // фон вставок: кухонная клеёнка в клетку
  rectP(-100, -100, 1280, 2200, '#f6f1e4', { seed, line: false, step: 80 });
  for (let y = -100; y < 2100; y += 120) for (let x = -100 + ((y / 120) % 2) * 120; x < 1180; x += 240) rectP(x, y, 120, 120, '#f2c4b8', { seed: seed + ((x + y) & 255), line: false });
  ctx.save(); const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(60,30,20,0.35)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function barrelP(x, y, s, seed) { push(x, y, s); rectP(-50, -70, 100, 140, '#e2b04a', { seed, lw: 2.2, shade: () => { stroke([[-50, -30], [50, -30]], '#b8862a', 6); stroke([[-50, 30], [50, 30]], '#b8862a', 6); } }); txt('C8', 0, 6, 34, { font: 'Inter Black', col: '#1c1512' }); pop(); }
function c8Ins(t, c) {                                                // завод → река и свалка
  bg('#ffd8b0', 13300); rectP(-100, 1100, 1280, 1000, '#8fbf74', { seed: 13301, line: false });
  rectP(-100, 900, 1280, 220, '#6a9ab8', { seed: 13302, lw: 2.2, shade: () => { for (let x = -60; x < 1180; x += 90) stroke([[x + Math.sin(t * 2 + x) * 10, 960], [x + 50, 960]], '#9ac0d8', 5); } });
  factoryP(300, 880, 2.2, t); label(300, 330, 'DuPont · Западная Вирджиния', 0, '#fbfaf6', -0.02, 34);
  if (t > c.river) { const k = sm(pr(t, c.river, c.river + 0.6)); stroke([[420, 840], [560, 900], [560, 900 + 60 * k]], '#7a7468', 22); for (let i = 0; i < 6; i++) dot(560 + i * 70 * k, 960 + Math.sin(t * 3 + i) * 8, 26, '#a8d860', 0.6 * k); }
  if (t > c.dump) { const k = popK(t, c.dump, 0.3); push(800, 1360, k); ellP(0, 60, 260, 70, '#7a5a3a', { seed: 13303, lw: 2.2 }); barrelP(-110, 0, 1, 13304); barrelP(0, -20, 1, 13305); barrelP(110, 10, 1, 13306); pop(); label(800, 1520, 'свалка у фермы', 0, '#f4e6a8', 0.03, 34); }
  if (t > c.c8) { push(800, 620, 1, 0.05); ransom('C8', 0, 0, 160, 13310, { reveal: pr(t, c.c8, c.c8 + 0.25), pop: true }); pop(); label(800, 760, 'PFOA — для производства тефлона', 0, '#fbfaf6', 0.02, 30); }
}
function cowIns(t, c) {                                               // 153 коровы; «это фтор»
  bg('#cfe6c0', 13400); txt('ФЕРМА ТЕННАНТА', 540, 230, 56, { font: 'Inter Black', col: '#2a4a2a', maxW: 900 });
  const n = Math.round(153 * sm(pr(t, c.cows - 0.6, c.cows + 0.4)));
  for (let i = 0; i < 20; i++) { const x = 170 + (i % 5) * 185, y = 430 + Math.floor(i / 5) * 145; cowP(x, y, 0.72, 13410 + i * 13, i < Math.ceil(n / 7.65)); }
  if (n > 0) { push(540, 1060, 1, -0.03); ransom(n + ' КОРОВЫ', 0, 0, 100, 13420, { reveal: 1, pop: n === 153 }); pop(); }
  const k = popK(t, c.fluor - 0.3, 0.3);
  if (k > 0) { push(540, 1260, k, 0.03); card(0, 0, 860, 180, 0, 13430, '#fbfaf6'); txt('DuPont: «зубы чернеют от фтора»', 0, 6, 44, { font: 'Inter Black', col: '#1c1512', maxW: 800 }); pop(); }
}
function secretIns(t, c) {                                            // 1981: беременные работницы — властям не сообщили
  tilesBg(13500);
  push(540, 700, 1, -0.03); piece([[-380, -380], [-120, -380], [-90, -420], [380, -420], [380, 380], [-380, 380]], '#d8b46a', { seed: 13501, lw: 2.6 });
  card(0, 20, 640, 640, 0.02, 13502, '#fbfaf6'); txt('1981 · DUPONT', 0, -230, 50, { font: 'Inter Black', col: '#1c1512', maxW: 580 });
  txt('анализы работниц', 0, -150, 38, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 580 });
  if (t > c.preg) { personIcon(-140, 40, 1.1, '#c8603a', 13503); ellP(-140, 60, 40, 30, '#e88a6a', { seed: 13504, lw: 2 }); }
  if (t > c.fetus) { stroke([[-60, 40], [80, 40]], '#c8241c', 10); piece([[80, 20], [110, 40], [80, 60]], '#c8241c', { seed: 13505, lw: 1.4 }); txt('C8', 180, 50, 70, { font: 'Inter Black', col: '#c8241c' }); }
  pop();
  if (t > c.secret) { push(540, 300, 1, -0.06); ransom('СЕКРЕТНО', 0, 0, 110, 13510, { reveal: 1, pop: true }); pop(); }
  if (t > c.told) { push(540, 1140, 1, -0.03); ransom('ВЛАСТЯМ НЕ СООБЩИЛИ', 0, 0, 70, 13511, { reveal: pr(t, c.told, c.told + 0.4), pop: true }); pop(); label(540, 1260, 'обвинение EPA, 2004 — компания спор урегулировала', 0, '#f4e6a8', 0.01, 28); }
}
function fineIns(t, c) {                                              // $16,5 млн = штраф за парковку
  cork();
  push(540, 620, 1, -0.02); card(0, 0, 860, 360, 0, 13600, '#fbfaf6'); txt('РЕКОРДНЫЙ ШТРАФ EPA · 2005', 0, -110, 44, { font: 'Inter Black', col: '#1c1512', maxW: 800 }); pop(); pin(540, 460);
  if (t > c.mln) { push(540, 680, 1, 0.02); ransom('$16 500 000', 0, 0, 110, 13610, { reveal: pr(t, c.mln, c.mln + 0.4), pop: true }); pop(); }
  const k = popK(t, c.park - 0.4, 0.3);
  if (k > 0) { push(560, 1150, k, 0.06); card(0, 0, 560, 320, 0, 13620, '#f4e6a8'); txt('ШТРАФ', 0, -90, 54, { font: 'Inter Black', col: '#c8241c', maxW: 480 }); txt('за парковку', 0, -20, 40, { font: 'Inter', weight: 800, col: '#1c1512', maxW: 480 });
    rectP(-200, 40, 400, 16, '#1c1512', { seed: 13621, line: false }); rectP(-200, 80, 280, 16, '#1c1512', { seed: 13622, line: false }); pop(); tape(560, 990, 140, 0.06, 13623); }
}
function panelIns(t, c) {                                             // 69 000 человек → 6 болезней → $671 млн
  tilesBg(13700);
  push(540, 330, 1, -0.02); card(0, 0, 900, 260, 0, 13701, '#fbfaf6'); txt('ПРОВЕРИЛИ 69 000 ЖИТЕЛЕЙ', 0, -60, 46, { font: 'Inter Black', col: '#1c1512', maxW: 840 });
  for (let i = 0; i < 12; i++) { const k = popK(t, c.people + i * 0.04, 0.2); if (k > 0) personIcon(-360 + i * 66, 60, 0.42 * k, ['#c8603a', '#3d7fc4', '#7aa66a'][i % 3], 13702 + i * 3); } pop();
  const D = ['рак почки', 'рак яичка', 'щитовидная железа', 'язвенный колит', 'холестерин', 'давление при беременности'];
  if (t > c.six) { push(540, 880, 1, 0.01); card(0, 0, 820, 560, 0, 13740, '#fbfaf6'); txt('ВЕРОЯТНАЯ СВЯЗЬ:', 0, -220, 42, { font: 'Inter Black', col: '#c8241c', maxW: 760 });
    D.forEach((d, i) => { if (t < c.six + i * 0.18) return; txt((i + 1) + '/6  ' + d, -340, -140 + i * 70, 38, { font: 'Inter', weight: 800, col: i === 0 && t > c.kidney ? '#c8241c' : '#1c1512', align: 'left', maxW: 680 }); }); pop(); }
  if (t > c.paid) { push(540, 1300, 1, -0.03); ransom('$671 000 000', 0, 0, 100, 13750, { reveal: pr(t, c.paid, c.paid + 0.4), pop: true }); pop(); label(540, 1420, 'C8 Science Panel, 2012 · иски, 2017', 0, '#f4e6a8', 0.01, 28); }
}
function bloodIns(t, c) {                                             // сковородки без C8, но C8 в крови почти у всех
  tilesBg(13800);
  push(320, 560, 1, -0.04); card(0, 0, 480, 480, 0, 13801, '#fbfaf6'); panP(40, 20, 1.2, 0, { cutlet: false }); txt('с 2015 — без C8', 0, 190, 40, { font: 'Inter Black', col: '#1c1512', maxW: 440 }); pop();
  check(470, 420, 1.2, popK(t, c.free, 0.3));
  if (t > c.heat) { const k = popK(t, c.heat, 0.3); push(790, 470, k, 0.05); card(0, 0, 440, 420, 0, 13830, '#fff2c8'); txt('ПУСТУЮ', 0, -150, 44, { font: 'Inter Black', col: '#c8241c' }); txt('НЕ ПЕРЕГРЕВАЙ', 0, -95, 40, { font: 'Inter Black', col: '#c8241c', maxW: 400 });
    push(0, 60); blobP([[-60, 40], [-70, -20], [-30, -70], [30, -60], [50, 0], [30, 60]], '#46b86a', { seed: 13831, lw: 2.2 }); piece([[40, -40], [80, -30], [50, -10]], '#f2a03a', { seed: 13832, lw: 1.6 }); ellP(10, -40, 12, 12, '#fbfaf6', { seed: 13833, lw: 1.4 });
      if (t > c.parrot) { stroke([[2, -48], [18, -32]], '#1c1512', 4); stroke([[18, -48], [2, -32]], '#1c1512', 4); } else dot(12, -40, 5, '#1c1512'); piece([[-60, 40], [-90, 110], [-40, 60]], '#d8342c', { seed: 13834, lw: 1.6 }); pop();
    txt('дым убивает птиц', 0, 180, 30, { font: 'Inter', weight: 800, col: '#1c1512', maxW: 400 }); pop(); }
  if (t > c.blood) { push(760, 980, 1, 0.04); card(0, 0, 480, 560, 0, 13810, '#fbfaf6'); drop(0, -40, 4.2, 13811); txt('C8', 0, -20, 70, { font: 'Inter Black', col: '#c8241c' }); txt('в крови почти', 0, 170, 36, { font: 'Inter Black', col: '#1c1512', maxW: 440 }); txt('у всех американцев', 0, 220, 34, { font: 'Inter Black', col: '#1c1512', maxW: 440 }); pop(); }
  if (t > c.water) { push(300, 1160, 1, -0.03); ransom('ИЗ ВОДЫ', 0, 0, 80, 13820, { reveal: pr(t, c.water, c.water + 0.3), pop: true }); pop(); label(290, 1270, 'биомониторинг CDC', 0, '#f4e6a8', 0.01, 28); }
}
