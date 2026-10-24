/* Эп. 2 «Телефоны нас слушают?» — декорация (гостиная ночью) и вставки-коллажи. */

function livingRoom(t, o = {}) {
  const lit = o.lit;
  rectP(-300, -300, 1680, 1820, '#56597e', { seed: 1200, line: false, step: 60 });                         // стена
  { const r = rng(1201); for (let y = -260; y < 1460; y += 84) for (let x = -280; x < 1380; x += 84) { const xx = x + ((y / 84) % 2 ? 42 : 0); ellP(xx, y, 9, 9, '#61648b', { line: false, tex: false, a: 0.8 }); } }
  // окно с ночным городом
  rectP(640, 220, 360, 430, '#16203d', { seed: 1202, lw: 3, shade: () => {
    ellP(900, 300, 38, 38, '#f3edc8', { seed: 1203, line: false });
    [[650, 520, 70, 140], [730, 470, 60, 190], [800, 540, 80, 120], [890, 500, 60, 160], [960, 560, 50, 100]].forEach(([x, y, w, h], i) => { rectP(x, y, w, h, '#0c1124', { seed: 1204 + i, line: false });
      const r = rng(1210 + i); for (let k = 0; k < 8; k++) rectP(x + 8 + r() * (w - 20), y + 10 + r() * (h - 20), 8, 10, '#f2c96a', { seed: 1220 + i * 10 + k, line: false, tex: false, a: 0.85 }); });
  } });
  stroke([[820, 220], [820, 650]], '#d8cdb6', 10); stroke([[640, 430], [1000, 430]], '#d8cdb6', 10);
  rectP(624, 204, 392, 26, '#d8cdb6', { seed: 1230, lw: 2.4 }); rectP(616, 646, 408, 26, '#d8cdb6', { seed: 1231, lw: 2.4 });
  // постер на стене и торшер
  push(250, 470, 1, -0.03); rectP(-120, -150, 240, 300, '#e9e0c8', { seed: 1232, lw: 2.6 }); txt('НЕ ВЕРЬ', 0, -90, 40, { font: 'Inter Black', col: '#b8322a' }); txt('НИКОМУ', 0, -46, 40, { font: 'Inter Black', col: '#1c1512' });
    ellP(0, 50, 60, 60, '#1c1512', { seed: 1233 }); ellP(0, 50, 26, 26, '#e9e0c8', { seed: 1234 }); dot(6, 44, 10, '#1c1512'); pop();
  stroke([[90, 700], [96, 1440]], '#2a2420', 10);
  piece([[30, 700], [160, 700], [130, 600], [58, 600]], lit ? '#ffe7a8' : '#cdbf9a', { seed: 1235, lw: 2.6 }); ellP(96, 1446, 60, 14, '#2a2420', { seed: 1236 });
  stroke([[120, 700], [126, lit ? 790 : 770]], '#2a2420', 3); dot(126, lit ? 792 : 772, 6, '#c9a24a');
  // пол и коврик
  rectP(-300, 1440, 1680, 800, '#6f4a33', { seed: 1237, step: 60, shade: () => { for (let y = 1470; y < 2200; y += 70) stroke([[-300, y], [1380, y + 6]], '#5a3a27', 3, { smooth: false }); } });
  piece([[120, 1500], [960, 1500], [1010, 1660], [70, 1660]], '#a8443a', { seed: 1238, lw: 2.4, shade: () => { stroke([[100, 1540], [990, 1540]], '#e9d6b8', 8); stroke([[86, 1620], [1000, 1620]], '#e9d6b8', 8); } });
}
function sofaBack() {
  piece([[60, 960], [1020, 960], [1040, 1060], [1040, 1280], [40, 1280], [40, 1060]], '#3f7f86', { seed: 1240, step: 20, shade: () => { stroke([[540, 980], [540, 1270]], '#336a70', 5); } });
}
function sofaFront() {
  piece([[40, 1260], [1040, 1260], [1050, 1400], [30, 1400]], '#4a8d94', { seed: 1241, step: 20, shade: () => { stroke([[540, 1270], [540, 1395]], '#336a70', 5); } });
  piece([[30, 1390], [1050, 1390], [1040, 1450], [40, 1450]], '#336a70', { seed: 1242, step: 20 });
  [[0, 1], [1, -1]].forEach(([i, sd]) => { const x = i ? 1060 : 20; piece([[x - 50, 1080], [x + 50, 1080], [x + 56, 1440], [x - 56, 1440]], '#3a767c', { seed: 1243 + i, step: 16 }); ellP(x, 1084, 56, 30, '#4a8d94', { seed: 1245 + i }); });
  [[110, 0], [970, 1]].forEach(([x, i]) => rectP(x - 10, 1450, 20, 30, '#2a2420', { seed: 1247 + i }));
}

// ------------------------------------------------------------------ вставки
function bigPhone(x, y, s, rot, fn) {                                // крупный телефон-вырезка, fn рисует экран (0..520 × 0..980)
  push(x, y, s, rot); piece([[-300, -560], [300, -560], [300, 560], [-300, 560]], '#1d2026', { seed: 1300, step: 30, lw: 3 });
  rectP(-264, -500, 528, 1000, '#f6f4ef', { seed: 1301, lw: 2, tex: false }); rectP(-60, -536, 120, 18, '#000', { seed: 1302, line: false, tex: false });
  ctx.save(); ctx.beginPath(); ctx.rect(-264, -500, 528, 1000); ctx.clip(); push(-264, -500, 1); fn(); pop(); ctx.restore(); pop();
}
function catFoodBag(x, y, s) { push(x, y, s); piece([[-90, -120], [90, -120], [100, 130], [-100, 130]], '#e25c2c', { seed: 1310, lw: 3 }); rectP(-70, -40, 140, 90, '#fbe9c8', { seed: 1311, lw: 2 }); txt('КОРМ', 0, -6, 36, { font: 'Inter Black', col: '#e25c2c' });
  [-1, 1].forEach(sd => piece([[sd * 10, 60], [sd * 30, 30], [sd * 44, 64]], '#fbe9c8', { seed: 1312 + sd, step: 6, lw: 1.6 })); ellP(0, 80, 34, 26, '#fbe9c8', { seed: 1315, lw: 1.6 }); pop(); }
function adScreen(t, k) {
  rectP(0, 0, 528, 90, '#e9e6df', { seed: 1320, line: false, tex: false }); txt('22:47', 60, 46, 30, { font: 'Inter', col: '#1c1512' }); txt('●●● 4G', 440, 46, 26, { font: 'Inter', col: '#1c1512' });
  rectP(24, 120, 480, 600, '#fff3e0', { seed: 1321, lw: 2 }); txt('РЕКЛАМА', 110, 160, 26, { font: 'Inter Black', col: '#9a8f83' });
  catFoodBag(264, 420, 1.3 * (0.9 + 0.1 * popK(t, k, 0.3)));
  ransom('−50%', 264, 650, 90, 1330, { maxW: 400 });
  rectP(24, 760, 480, 120, '#2f6db3', { seed: 1322, lw: 2 }); txt('КУПИТЬ', 264, 820, 52, { font: 'Inter Black', col: '#fff' });
}
function searchCard(x, y, s, t, t0) {                               // история поиска «три раза»
  push(x, y, s, -0.03); card(0, 0, 820, 520, 0, 1340, '#fbfaf6'); pin(-360, -230); pin(360, -230, '#2f6db3');
  txt('История поиска', -330, -180, 40, { font: 'Inter Black', col: '#1c1512', align: 'left' });
  ['купить корм для кота', 'корм для кота дёшево', 'корм с доставкой ночью'].forEach((q, i) => { const k = pr(t, t0 + i * 0.32, t0 + i * 0.32 + 0.2); if (k <= 0) return;
    rectP(-360, -110 + i * 110, 720, 84, '#eef1f6', { seed: 1341 + i, lw: 2 }); txt('🔍', -320, -68 + i * 110, 34, { font: 'Noto Color Emoji' }); txt(q, -280, -68 + i * 110, 38, { font: 'Inter', weight: 700, col: '#1c1512', align: 'left', reveal: k }); });
  pop();
}
function appGrid(t, t0, mic) {                                     // «17 000+ приложений» и микрофон с нулём
  const cols = ['#e2533a', '#3a8fe2', '#46b86a', '#f2b230', '#8a5ad8', '#e25ca8', '#31b5b5', '#555c66'];
  for (let i = 0; i < 42; i++) { const gx = 170 + (i % 6) * 148, gy = 520 + Math.floor(i / 6) * 128, k = pr(t, t0 + i * 0.025, t0 + i * 0.025 + 0.15); if (k <= 0) continue;
    push(gx, gy, k); piece([[-48, -48], [48, -48], [48, 48], [-48, 48]], cols[i % cols.length], { seed: 1350 + i, step: 12, lw: 2 }); ellP(0, 0, 18, 18, '#ffffff', { seed: 1400 + i, line: false, a: 0.85 }); pop(); }
  if (mic > 0) { push(540, 840, 1.6 - 0.6 * popK(t, mic, 0.3)); ellP(0, 0, 170, 170, '#fbfaf6', { seed: 1450, lw: 4 });
    piece(spline([[-36, -80], [36, -80], [40, 20], [0, 50], [-40, 20]], true, 6), '#1c1512', { raw: true, lw: 2 }); stroke([[-64, 0], [-60, 50], [0, 80], [60, 50], [64, 0]], '#1c1512', 9); stroke([[0, 80], [0, 120]], '#1c1512', 9); stroke([[-40, 120], [40, 120]], '#1c1512', 9);
    stroke([[-120, -120], [120, 120]], '#d8342c', 22); pop(); }
}
function recScreen(t) {                                              // телефон пишет экран: REC и «позорная» лента
  rectP(0, 0, 528, 1000, '#f6f4ef', { seed: 1460, line: false, tex: false });
  ['как похудеть ничего не делая', 'смешные котики 10 часов', 'гороскоп для рыб на завтра', 'что значит «это другое»'].forEach((q, i) => { rectP(24, 140 + i * 200, 480, 170, ['#fde1d6', '#e1f0ff', '#f6e7ff', '#e7ffe9'][i], { seed: 1461 + i, lw: 2 }); txt(q, 44, 225 + i * 200, 30, { font: 'Inter', weight: 800, col: '#1c1512', align: 'left' }); });
  if (Math.floor(t * 2) % 2 === 0) dot(60, 60, 18, '#e2332a'); txt('REC', 150, 62, 40, { font: 'Inter Black', col: '#e2332a' });
}
function threadBoard(t, cues) {                                     // «доска заговора» наоборот: красные нитки к Никите
  cork();
  push(540, 800, 1); card(0, 0, 300, 340, 0.02, 1500, '#fbfaf6'); push(0, -10, 0.8); nikHead({ t, mood: 'dumb', foil: 1 }); pop(); txt('НИКИТА', 0, 140, 36, { font: 'Inter Black', col: '#1c1512' }); pop();
  const nodes = [['ГЕОЛОКАЦИЯ', 220, 420, cues.geo, '📍'], ['ПОИСК', 860, 420, cues.search, '🔍'], ['ЛАЙКИ', 210, 1150, cues.likes, '❤️'], ['ВАЙФАЙ', 860, 1150, cues.wifi, '📶']];
  nodes.forEach(([lab, x, y, t0, em], i) => { if (t < t0) return; const k = pr(t, t0, t0 + 0.25);
    stroke([[540, 800], [lerp(540, x, k), lerp(800, y, k)]], '#c8241c', 6);
    push(x, y, popK(t, t0, 0.3), (i % 2 ? 0.05 : -0.05)); card(0, 0, 300, 200, 0, 1510 + i, '#fbfaf6'); txt(em, 0, -30, 70, { font: 'Noto Color Emoji' }); txt(lab, 0, 60, 34, { font: 'Inter Black', col: '#1c1512' }); pop(); pin(x, y - 90); });
  pin(540, 640);
  if (t > cues.lyoha) { const k = popK(t, cues.lyoha, 0.3); stroke([[860, 1150], [560, 1330]], '#c8241c', 6);
    push(540, 1330, k * 0.85, -0.06); card(0, 0, 300, 260, 0, 1520, '#fbfaf6'); personIcon(-40, 10, 0.9, '#9fb6c8', 1525); piece([[-90, -110], [10, -110], [30, -84], [-96, -84]], '#d8342c', { seed: 1528, lw: 2 }); catFoodBag(90, 20, 0.5); txt('ЛЁХА', 0, 100, 34, { font: 'Inter Black', col: '#1c1512' }); pop(); }
}
function brainInsert(t, c1, c2) {
  rectP(-100, -100, 1280, 2200, '#2b2622', { seed: 1530, line: false, step: 80 });
  push(540, 760, 1); blobP([[-260, 40], [-240, -120], [-120, -200], [40, -210], [200, -150], [270, -20], [230, 120], [80, 170], [-120, 160], [-230, 120]], '#f2a6b4', { seed: 1531, lw: 4, shade: () => {
    [[-180, -60, -60, -140, 40, -60], [-200, 40, -80, -20, 20, 60], [60, -150, 160, -80, 120, 40], [-40, 100, 60, 60, 180, 110]].forEach(v => stroke([[v[0], v[1]], [v[2], v[3]], [v[4], v[5]]], '#c97888', 8)); } }); pop();
  if (t > c1) { push(540, 1140, popK(t, c1, 0.3), -0.04); card(0, 0, 520, 150, 0, 1532, '#f2e85c'); txt('1 СОВПАДЕНИЕ', 0, 4, 56, { font: 'Inter Black', col: '#1c1512' }); pop(); }
  if (t > c2) for (let i = 0; i < 14; i++) { const r = rng(1540 + i), fall = clamp((t - c2 - i * 0.04) / 0.6); push(160 + r() * 760, 1300 + r() * 260 + fall * fall * 700, 0.55, (r() - 0.5) * 0.6 + fall * 2); card(0, 0, 300, 90, 0, 1550 + i, '#c9c4b8'); txt('промах', 0, 2, 44, { font: 'Inter', weight: 800, col: '#6b655c' }); pop(); }
}
function newspaper(x, y, s, rot, t, stampT) {
  push(x, y, s, rot); piece([[-420, -330], [420, -320], [410, 330], [-415, 320]], '#ece6d6', { seed: 1600, step: 14, edge: 2, lw: 2 });
  txt('ВЕСТИ МАРКЕТИНГА', 0, -260, 34, { font: 'DejaVu Serif', weight: 700, col: '#3a3530' }); stroke([[-380, -228], [380, -228]], '#3a3530', 3);
  txt('«МЫ СЛЫШИМ', 0, -150, 64, { font: 'DejaVu Serif', weight: 700, col: '#1c1512' }); txt('ВАШИ ТЕЛЕФОНЫ»', 0, -80, 64, { font: 'DejaVu Serif', weight: 700, col: '#1c1512' });
  txt('— хвастается рекламная контора', 0, -20, 32, { font: 'DejaVu Serif', weight: 400, col: '#3a3530' });
  for (let i = 0; i < 7; i++) stroke([[-380, 40 + i * 34], [i % 3 === 2 ? 120 : 380, 40 + i * 34]], '#9a9488', 6);
  if (t > stampT) { push(40, 120, 1.6 - 0.6 * popK(t, stampT, 0.3), -0.18); ctx.globalAlpha = 0.9; piece([[-300, -80], [300, -80], [300, 80], [-300, 80]], 'rgba(0,0,0,0)', { raw: true, lc: '#c8241c', lw: 10, tex: false });
    txt('НЕ СЛУШАЛИ', 0, 4, 84, { font: 'Inter Black', col: '#c8241c' }); ctx.globalAlpha = 1; pop(); }
  tape(-360, -320, 120, -0.5, 1601); tape(360, -310, 120, 0.5, 1602); pop();
}
function moneyStack(x, y, s, t, t0) {
  push(x, y, s); for (let i = 0; i < 6; i++) { const k = pr(t, t0 + i * 0.06, t0 + i * 0.06 + 0.15); if (k <= 0) continue; push(0, -i * 34 * k, 1, (i % 2 - 0.5) * 0.06);
    piece([[-200, -40], [200, -40], [200, 40], [-200, 40]], '#7fbf6a', { seed: 1620 + i, lw: 2.4 }); ellP(0, 0, 34, 28, '#5f9a4e', { seed: 1630 + i, lw: 1.6 }); txt('$', 0, 2, 40, { font: 'Inter Black', col: '#e9f6dc' }); pop(); }
  pop();
}
