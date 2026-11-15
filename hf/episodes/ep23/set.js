/* Эп. 23 «Кот пьёт неправильно?» — декорация: дачная веранда на закате. Уличный кран капает в тазик на лавке — Том пьёт оттуда,
   а его миска стоит на полу вплотную к еде. Никита с шваброй вытирает лужи. За верандой — сад, яблони, забор, соседский дом.
   2.5D: сад 2.4, стена веранды 1.35, пол и герои 1.0, передний план 0.6. */

const BENCH = 1300, WOOD = '#a8743a';
function basin(x, y, s, t, o = {}) { push(x, y, s); piece([[-90, -40], [90, -40], [70, 10], [-70, 10]], '#c8ccd4', { seed: 23001, lw: 2.4 }); ellP(0, -40, 90, 16, '#7ac8e8', { seed: 23002, lw: 2 });
  if (o.splash) { const r = rng(hsh(FRAME, 9)); for (let i = 0; i < 7; i++) dot((r() - 0.5) * 160, -60 - r() * 80, 3 + r() * 4, '#bfe8ff'); } pop(); }
function bowlP(x, y, s, o = {}) { push(x, y, s); piece([[-60, -30], [60, -30], [46, 10], [-46, 10]], o.col ?? '#5ab8a8', { seed: 23010 + (o.seed ?? 0), lw: 2.2 });
  ellP(0, -30, 60, 12, o.food ? '#a8643a' : '#9ad8f0', { seed: 23012 + (o.seed ?? 0), lw: 1.6, shade: () => { if (o.food) for (let i = 0; i < 6; i++) dot(-36 + i * 14, -32 + (i % 2) * 4, 5, '#7a4a2a'); } }); pop(); }
function mop(x, y, s, rot) { push(x, y, s, rot); stroke([[0, -260], [0, 120]], '#c8a060', 9); piece([[-50, 120], [50, 120], [60, 190], [-60, 190]], '#e8e4d8', { seed: 23020, lw: 2 }); for (let i = -40; i <= 40; i += 20) stroke([[i, 190], [i + 4, 220]], '#d8d4c8', 6); pop(); }
function puddle(x, y, s, seed) { ctx.save(); ctx.globalAlpha = 0.55; blobP([[x - 60 * s, y], [x - 20 * s, y - 14 * s], [x + 50 * s, y - 10 * s], [x + 70 * s, y + 4 * s], [x + 20 * s, y + 16 * s], [x - 50 * s, y + 12 * s]], '#9ad0e8', { seed, line: false }); ctx.restore(); }
/* ---------- сад (d 2.4) */
function garden(t) {
  rectP(-400, -100, 1600, 1600, '#f2a85a', { seed: 23100, line: false, shade: () => {
    [['#e8885a', 0, 300], ['#f2b86a', 300, 300], ['#f8d08a', 600, 260]].forEach(([c, y, h], i) => rectP(-400, y, 1600, h, c, { seed: 23101 + i, line: false }));
    ellP(-80, 780, 100, 100, '#fff0c0', { seed: 23105, line: false }); glowAdd(-80, 780, 380, 'rgba(255,220,150,1)', 0.6);
    for (let i = 0; i < 4; i++) { const x = ((t * 40 + i * 300) % 1800) - 400, y = 300 + i * 60 + 20 * Math.sin(t * 2 + i); stroke([[x - 14, y], [x, y + 8], [x + 14, y]], '#5a3a3a', 3); }   // птицы
    push(820, 820); rectP(-160, 0, 320, 260, '#c8a87a', { seed: 23110, lw: 2 }); piece([[-190, 0], [0, -130], [190, 0]], '#8a3a2a', { seed: 23111, lw: 2 }); rectP(-50, 70, 100, 90, '#ffd27a', { seed: 23112, lw: 1.6 }); glowAdd(0, 115, 80, 'rgba(255,210,120,1)', 0.4); pop();   // соседский домик
    [[-300, 860, 1.0], [100, 840, 1.2], [480, 870, 0.9], [1080, 860, 1.1]].forEach(([x, y, s], i) => { push(x, y, s); stroke([[0, 0], [0, 200]], '#5a3a2a', 22); blobP([[-140, 0], [-80, -130], [40, -150], [150, -40], [100, 40], [-120, 40]], '#4a8a3a', { seed: 23120 + i, lw: 2, shade: () => { for (let k = 0; k < 6; k++) dot(-90 + k * 36, -60 + (k % 2) * 40, 10, '#d8483a'); } }); pop(); });   // яблони
    rectP(-400, 1060, 1600, 500, '#6aa84a', { seed: 23130, line: false }); for (let x = -380; x < 1400; x += 40) rectP(x, 990, 26, 110, '#d8c8a0', { seed: 23131 + x, lw: 1.2 });   // трава и забор
  } });
}
/* ---------- стена веранды (d 1.35): вагонка, два больших окна в сад, полка с банками, лампа, календарь */
function veranda(t) {
  rectP(-400, -300, 1800, 2000, '#c8925a', { seed: 23200, line: false, step: 70, shade: () => { for (let y = -300; y < 1700; y += 46) stroke([[-400, y], [1400, y]], '#b07c48', 4); } });
  [[-300, 300, 520, 620], [380, 300, 520, 620]].forEach(([x, y, w, h], i) => { ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; ctx.fillRect(x, y, w, h); ctx.restore();
    [[x, y, w, 18], [x, y, 18, h], [x + w - 18, y, 18, h], [x + w / 2 - 8, y, 16, h], [x, y + h - 22, w, 22], [x, y + h * 0.45, w, 14]].forEach(([a, b, c, d], k) => rectP(a, b, c, d, '#f2ead8', { seed: 23210 + i * 10 + k, lw: 1.6 }));
    piece([[x - 30, y - 20], [x + 90, y - 20], [x + 60, y + h * 0.6], [x + 80, y + h], [x - 30, y + h]], '#e8f0d8', { seed: 23230 + i, lw: 1.8, a: 0.9 }); });   // занавески
  rectP(920, 520, 360, 18, '#7a4a2a', { seed: 23240, lw: 1.6 }); [[960, '#e8a83a'], [1030, '#c8243c'], [1100, '#7ac85a'], [1170, '#e8a83a']].forEach(([x, c], i) => { piece([[x - 26, 520], [x + 26, 520], [x + 26, 440], [x - 26, 440]], c, { seed: 23241 + i, lw: 1.6 }); rectP(x - 28, 430, 56, 14, '#d8dce0', { seed: 23245 + i, lw: 1 }); });   // банки с вареньем
  push(540, 120); stroke([[0, -300], [0, 60]], '#3a2a1a', 4); piece([[-70, 60], [70, 60], [40, 110], [-40, 110]], '#e8c84a', { seed: 23250, lw: 2 }); glowAdd(0, 120, 200, 'rgba(255,220,140,1)', 0.5); pop();   // абажур
  push(1100, 760, 1, 0.03); rectP(-70, -90, 140, 180, '#fbfaf2', { seed: 23255, lw: 1.6 }); txt('ИЮЛЬ', 0, -60, 22, { font: 'Inter Black', col: '#c8243c' }); for (let i = 0; i < 15; i++) rectP(-56 + (i % 5) * 24, -36 + Math.floor(i / 5) * 30, 18, 20, '#e2d8c4', { seed: 23256 + i, line: false }); pop();
}
/* ---------- пол веранды (d 1.0): доски, лавка с тазиком, кран, миски, лужи, швабра */
function deck(t, o = {}) {
  rectP(-400, 1520, 1800, 700, '#b07c48', { seed: 23300, step: 60, shade: () => { for (let x = -400; x < 1400; x += 80) stroke([[x, 1520], [x - 60, 2220]], '#94663a', 4); } });
  rectP(-400, 1505, 1800, 20, '#7a4a2a', { seed: 23301, lw: 1.6 });
  puddle(320, 1600, 1.4, 23310); puddle(620, 1660, 1, 23311); puddle(980, 1580, 1.2, 23312);
  rectP(700, BENCH, 380, 30, WOOD, { seed: 23320, lw: 2.2 }); [740, 1040].forEach((x, i) => rectP(x - 14, BENCH + 30, 28, 220, '#8a5a2a', { seed: 23321 + i, lw: 1.6 }));   // лавка
  push(800, 980); rectP(-14, 0, 28, 330, '#6a6e74', { seed: 23330, lw: 1.6 }); stroke([[0, 10], [40, 10], [50, 40]], '#c8ccd4', 12); rectP(-20, -10, 40, 18, '#c8243c', { seed: 23331, lw: 1.4 }); pop();   // уличный кран на трубе
  if (o.drip !== false) { ctx.save(); ctx.globalAlpha = 0.8; const k = (t * 3) % 1; dot(850, 1030 + 230 * k * k, 5, '#9ad8f0'); stroke([[850, 1030], [850, 1050]], '#9ad8f0', 4); ctx.restore(); }
  if (o.basin !== false) basin(880, BENCH, 0.9, t, { splash: o.splash });
  const wx = o.waterX ?? 640; bowlP(560, 1570, 0.9, { food: true, col: '#e8a83a', seed: 0 }); bowlP(wx, 1572, 0.9, { seed: 5 });                                          // еда и вода (вплотную или разнесены)
  push(90, 1560); piece([[-60, 0], [60, 0], [40, -100], [-40, -100]], '#5a8ac8', { seed: 23340, lw: 2 }); pop();   // ведро
}
function deckFg(t) { push(-140, 1990, 1, -0.04); rectP(-60, -900, 120, 940, '#8a5a2a', { seed: 23500, lw: 3 }); blobP([[-80, -900], [80, -880], [120, -760], [-100, -780]], '#4a8a3a', { seed: 23501, lw: 2 }); pop(); }   // столб веранды с вьюном
function deckLight(t, fn) { lightmap('#b0a0a0', () => { radial(-80, 780, 1100, 'rgba(255,200,130,1)', 0.95); cone(-80, 780, 900, 1500, 900, 'rgba(255,190,120,1)', 0.35); radial(540, 230, 500, 'rgba(255,220,140,1)', 0.4); if (fn) fn(); }); }

// ------------------------------------------------------------------ вставки: дачный стол из досок
function planksBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#c8925a', { seed, line: false, step: 80, shade: () => { for (let x = -100; x < 1200; x += 180) { stroke([[x, -100], [x, 2100]], '#a87440', 6); const r = rng(seed + x); for (let k = 0; k < 6; k++) ellP(x + 40 + r() * 100, r() * 2000, 10, 26, '#b88450', { seed: seed + x + k, line: false }); } } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,220,160,0.15)'); g.addColorStop(1, 'rgba(40,20,0,0.5)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function physicsIns(t, c) {                                           // скоростная камера: кончик языка касается воды → столбик → пасть закрывается
  if (!c.fg) planksBg(23710, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 880, 800, 0, 23711, '#fbfaf2'); txt('СКОРОСТНАЯ КАМЕРА', 0, -340, 46, { font: 'Inter Black', col: '#1c1512' });
  rectP(-400, 200, 800, 160, '#7ac8e8', { seed: 23712, lw: 2 });                                                     // вода
  const u = ((t - c.tip) * 0.6) % 1, ph = t < c.tip ? 0 : u, up = ph < 0.2 ? 0 : sm(clamp((ph - 0.2) / 0.4)), close = sm(clamp((ph - 0.6) / 0.2));
  const ty = lerp(196, -40, up);                                                                                   // кончик языка
  if (up > 0 && close < 1) { const h = 196 - ty; piece([[-18 + 6 * up, 200], [18 - 6 * up, 200], [10 - 4 * up, ty + 10], [-10 + 4 * up, ty + 10]], '#7ac8e8', { raw: true, lw: 1.8 }); }   // столбик
  piece(spline([[-120, ty - 140], [-30, ty - 40], [0, ty], [30, ty - 6], [60, ty - 80], [120, ty - 160]], false, 6), '#e8788a', { raw: true, lw: 3 });   // язык «ложкой»
  push(0, ty - 150); piece([[-160, -40], [160, -40], [140, -lerp(10, 80, 1 - close)], [-140, -lerp(10, 80, 1 - close)]], '#8a7a6a', { seed: 23713, lw: 2.4 }); piece([[-150, 0], [150, 0], [120, 30 + 50 * (1 - close)], [-120, 30 + 50 * (1 - close)]], '#8a7a6a', { seed: 23714, lw: 2.4 }); pop();   // челюсти
  if (t > c.column - 0.1) txt('за языком тянется столбик', 0, 290, 34, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
  if (t > c.close - 0.1) txt('пасть закрывается — пока не упал', 0, 340, 30, { font: 'Inter', weight: 800, col: '#2a5a8a', maxW: 800 }); pop();
  label(540, 1250, 'MIT · Science, 2010', 0, '#f4e6a8', 0.01, 30);
}
function rateIns(t, c) {                                              // 4 раза в секунду, 0,1 мл за раз
  if (!c.fg) planksBg(23720, t); if (c.bg) return;
  push(540, 720, 1, 0.01); card(0, 0, 860, 640, 0, 23721, '#fbfaf2');
  const b = Math.floor(t * 4) % 4; for (let i = 0; i < 4; i++) ellP(-270 + i * 180, -160, 50, 50, i === b ? '#c8243c' : '#e8d8c8', { seed: 23722 + i, lw: 2.4 });
  txt('×4 в секунду', 0, -20, 80, { font: 'Inter Black', col: '#1c1512' });
  if (t > c.tenth - 0.2) { txt('по 0,1 мл', 0, 120, 70, { font: 'Inter Black', col: '#2a5a8a' }); txt('за один «лак»', 0, 190, 32, { font: 'Inter', weight: 800, col: '#4a4038' }); } pop();
  if (t > c.repeat) { push(540, 1180, popK(t, c.repeat, 0.3), -0.03); ransom('ПОВТОРИ', 0, 0, 120, 23723, { reveal: 1, pop: true }); pop(); }
}
function desertIns(t, c) {                                            // предки — пустынные коты, вода из добычи, жажда слабая
  if (!c.fg) planksBg(23730, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 880, 760, 0, 23731, '#fbfaf2');
  rectP(-420, -340, 840, 380, '#f2c88a', { seed: 23732, line: false, shade: () => { ellP(260, -260, 50, 50, '#fff0a0', { seed: 23733, line: false }); blobP([[-420, -20], [-200, -110], [0, -60], [200, -130], [420, -40], [420, 40], [-420, 40]], '#e8a85a', { seed: 23734, line: false }); } });
  push(-150, -60); blobP([[-80, 0], [-60, -50], [40, -60], [80, -30], [70, 0]], '#c89a6a', { seed: 23735, lw: 2 }); piece([[50, -60], [60, -100], [80, -60]], '#c89a6a', { raw: true, lw: 2 }); piece([[70, -60], [80, -100], [96, -56]], '#c89a6a', { raw: true, lw: 2 }); stroke([[-80, -10], [-130, -40], [-150, -10]], '#c89a6a', 10); pop();   // пустынный кот
  push(120, -40); blobP([[-30, 0], [-20, -20], [20, -22], [34, -6], [20, 6]], '#9a8a7a', { seed: 23736, lw: 1.6 }); stroke([[-30, 0], [-60, 10]], '#9a8a7a', 3); pop();   // мышь
  txt('предки — из пустыни', 0, 110, 42, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  if (t > c.prey - 0.2) txt('вода — в основном из добычи', 0, 180, 36, { font: 'Inter', weight: 800, col: '#8a5a1a', maxW: 820 });
  if (t > c.weak - 0.2) txt('жажду чувствуют слабо', 0, 260, 44, { font: 'Inter Black', col: '#c8243c', maxW: 820 }); pop();
}
function bowlIns(t, c) {                                              // миска вплотную к еде ✗ → подальше ✓, проточную любят
  if (!c.fg) planksBg(23740, t); if (c.bg) return;
  push(540, 620, 1, 0.01); card(0, 0, 860, 400, 0, 23741, '#fbfaf2'); bowlP(-300, 40, 1.3, { food: true, col: '#e8a83a' }); bowlP(-150, 42, 1.3);
  stampX(-225, 0, 0.9, pr(t, c.close5 - 0.2, c.close5 + 0.2)); txt('вплотную к еде', 200, 20, 40, { font: 'Inter Black', col: '#c8243c', maxW: 420 }); pop();
  if (t > c.away - 0.3) { push(540, 1040, popK(t, c.away - 0.3, 0.3), -0.01); card(0, 0, 860, 360, 0, 23742, '#f6f1e4'); bowlP(-340, 40, 1.2, { food: true, col: '#e8a83a' }); bowlP(-60, 42, 1.2);
    check(-200, -20, 0.8, 1); txt('подальше', 220, 0, 44, { font: 'Inter Black', col: '#2a6a3a' });
    if (t > c.flow - 0.2) txt('и проточную — любят больше', 120, 90, 30, { font: 'Inter', weight: 800, col: '#2a5a8a', maxW: 560 }); pop(); }
  label(540, 1320, 'считается: у добычи вода бывает грязной', 0, '#f4e6a8', -0.01, 26);
}
function adviceIns(t, c) {                                            // как надо
  if (!c.fg) planksBg(23750, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 880, 820, 0, 23751, '#fbfaf2'); txt('ВОДА ДЛЯ КОШКИ', 0, -340, 48, { font: 'Inter Black', col: '#1c1512' });
  const R = [['широкая неглубокая миска', c.wide, 1], ['подальше от еды', c.away2, 1], ['можно фонтанчик', c.fountain, 1], ['влажный корм — до 80 % воды', c.wet, 1], ['пьёт намного больше — к ветеринару', c.vet, 0]];
  R.forEach(([s, t0, ok], i) => { if (t < t0 - 0.2) return; const y = -220 + i * 120, k = pr(t, t0 - 0.2, t0 + 0.2); if (ok) check(-360, y, 0.8, k); else txt('⚠', -360, y + 20, 60, { font: 'Inter Black', col: '#c8243c' });
    txt(s, -300, y + 14, 38, { font: 'Inter Black', col: ok ? '#1c1512' : '#c8243c', align: 'left', maxW: 680 }); }); pop();
}
