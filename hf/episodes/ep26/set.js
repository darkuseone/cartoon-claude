/* Эп. 26 «Зачем дырка в колпачке?» — декорация: ночное купе поезда, 3 часа ночи. Никита и Том едут на дачу (эп. 23):
   Никита на нижней полке разгадывает кроссворд и грызёт колпачок ручки; Том на столике у стакана чая в подстаканнике.
   Лор: на верхней полке — переноска «ВЕТКЛИНИКА» (эп. 22, 24), на двери — табличка «ДО СТ. ДАЧНАЯ». Поджог/выстрел: мелочь в часовом кармане джинсов,
   колпачок в финале летит в стакан с чаем. 2.5D: ночь за окном 2.4, стена купе 1.35, столик, полки и герои 1.0, передний план 0.6. */

const TABLE = 1150, BERTH = 1395, OAK = '#8a5a3a', PLUSH = '#7a2a3a';
function penP(x, y, s, rot, o = {}) { push(x, y, s, rot); rectP(-8, -90, 16, 170, 'rgba(220,235,245,0.7)', { seed: 26001, raw: true, lw: 1.8, tex: false }); stroke([[0, -80], [0, 70]], '#2a5ac8', 3);
  dot(0, 10, 2.4, '#1c1512'); piece([[-6, 80], [6, 80], [0, 100]], '#c8ccd4', { raw: true, lw: 1.2 }); rectP(-9, -96, 18, 10, '#2a5ac8', { seed: 26002, lw: 1.2 });
  if (o.cap) { rectP(-11, 50, 22, 56, '#2a5ac8', { seed: 26003, lw: 1.6 }); dot(0, 104, 3, '#0a0a0a'); } pop(); }
function capP(x, y, s, rot) { push(x, y, s, rot); rectP(-11, -28, 22, 56, '#2a5ac8', { seed: 26004, lw: 1.6 }); stroke([[8, -24], [14, 10]], '#2a5ac8', 4); ellP(0, -28, 6, 3, '#0a0a0a', { seed: 26005, line: false }); pop(); }
function teaGlass(x, y, s, t, o = {}) { push(x, y, s); piece([[-30, -100], [30, -100], [26, 0], [-26, 0]], 'rgba(200,120,40,0.75)', { raw: true, lw: 2, tex: false });
  piece([[-36, -80], [36, -80], [32, 4], [-32, 4]], '#c8a050', { seed: 26010, lw: 2, shade: () => { for (let i = -24; i <= 24; i += 12) stroke([[i, -76], [i * 0.9, 0]], '#a8803a', 3); } });   // подстаканник
  stroke([[36, -60], [56, -56], [56, -20], [34, -16]], '#c8a050', 6); const sw = (o.rattle ?? 1) * 6 * Math.sin(t * 25); stroke([[-6 + sw, -96], [10 + sw, -150]], '#d8dce0', 4);
  if (o.cap) capP(0, -110, 0.8, 0.4); pop(); }
function coins(x, y, n, seed) { const r = rng(seed); for (let i = 0; i < n; i++) ellP(x + (r() - 0.5) * 60, y + (r() - 0.5) * 20, 12, 8, i % 2 ? '#d8b84a' : '#c8c8d0', { seed: seed + i, lw: 1.2 }); }
/* ---------- ночь за окном (d 2.4): летящие огни, столбы, лес, луна */
function nightRail(t) {
  rectP(-400, -100, 1600, 1600, '#0e1430', { seed: 26100, line: false, shade: () => {
    rectP(-400, 500, 1600, 400, '#141c3e', { seed: 26101, line: false }); ellP(820, 260, 50, 50, '#f2ead0', { seed: 26102, lw: 1.4 }); glowAdd(820, 260, 200, 'rgba(240,230,200,1)', 0.3);
    const r = rng(26103); for (let i = 0; i < 40; i++) dot(-380 + r() * 1560, 20 + r() * 420, 1.6, '#e8eaf8', 0.6);
    for (let i = 0; i < 10; i++) { const x = ((i * 260 - t * 220) % 2600 + 2600) % 2600 - 500; blobP([[x - 120, 900], [x - 60, 760], [x, 700], [x + 70, 770], [x + 130, 900]], '#0a1a14', { seed: 26110 + i, line: false }); }   // лес
    for (let i = 0; i < 6; i++) { const x = ((i * 520 - t * 420) % 3100 + 3100) % 3100 - 600; for (let k = 0; k < 3; k++) { dot(x + k * 40, 860 - k * 6, 5, '#ffd27a'); glowAdd(x + k * 40, 860, 30, 'rgba(255,200,120,1)', 0.3); } }   // огни деревни
    for (let i = 0; i < 5; i++) { const x = ((i * 700 - t * 1800) % 3500 + 3500) % 3500 - 600; stroke([[x, 400], [x, 1200]], '#1c1c24', 18); stroke([[x - 40, 430], [x + 40, 430]], '#1c1c24', 8); }   // столбы
    stroke([[-400, 440], [1200, 430]], '#1c1c24', 2);
  } });
}
/* ---------- стена купе (d 1.35): окно, занавески, верхняя полка с чемоданом и переноской, табличка на двери, крючки */
function compartment(t) {
  rectP(-400, -300, 1800, 2000, '#c8b490', { seed: 26200, line: false, step: 70, shade: () => { for (let y = -300; y < 1700; y += 40) stroke([[-400, y], [1400, y]], '#b8a480', 2, { a: 0.6 }); } });
  ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; ctx.fillRect(220, 420, 640, 520); ctx.restore();
  [[210, 410, 660, 20], [210, 410, 20, 540], [850, 410, 20, 540], [200, 930, 680, 28]].forEach(([a, b, c, d], i) => rectP(a, b, c, d, '#8a8a92', { seed: 26210 + i, lw: 1.6 }));
  [[150, 260], [790, 900]].forEach(([x0, x1], i) => piece([[x0, 380], [x1 - x0 > 0 ? x0 + 110 : x0, 380], [x0 + 90, 700], [x0 + 120, 980], [x0 - 10, 980]], '#e8d8a8', { seed: 26220 + i, lw: 1.8, shade: () => { for (let k = 0; k < 3; k++) stroke([[x0 + 20 + k * 30, 390], [x0 + 16 + k * 30, 970]], '#c8b888', 4); } }));
  rectP(-400, 240, 1800, 22, '#6a4a2a', { seed: 26230, lw: 1.6 });                                                                    // верхняя полка
  push(30, 240); rectP(-140, -120, 280, 120, '#3a5a3a', { seed: 26231, lw: 2.2, shade: () => { stroke([[-140, -60], [140, -60]], '#2a4a2a', 4); rectP(-30, -136, 60, 18, '#2a2a30', { seed: 26232, lw: 1.4 }); } }); pop();   // чемодан
  push(1080, 240, 0.6); rectP(-130, -250, 260, 250, '#3a6ac8', { seed: 26233, lw: 2.6 }); rectP(30, -200, 76, 40, '#fbfaf2', { seed: 26234, lw: 1.4 }); txt('ВЕТКЛИНИКА', 68, -174, 10, { font: 'Inter Black', col: '#c8243c' }); pop();   // переноска (лор)
  push(1180, 760, 1, 0.02); rectP(-90, -50, 180, 100, '#fbfaf2', { seed: 26240, lw: 1.6 }); txt('ВАГОН 7', 0, -16, 22, { font: 'Inter Black', col: '#1c1512' }); txt('до ст. ДАЧНАЯ', 0, 20, 20, { font: 'Inter Black', col: '#2a5aa8' }); pop();
  [100, 980].forEach((x, i) => { push(x, 340); stroke([[0, 0], [0, 50]], '#a8a8b0', 6); ellP(0, 60, 14, 10, '#a8a8b0', { seed: 26245 + i, lw: 1.4 }); pop(); });
  push(980, 360); stroke([[0, 0], [0, 260]], '#3a3a40', 4); piece([[-40, 260], [40, 260], [30, 310], [-30, 310]], '#e8d8a0', { seed: 26250, lw: 1.6 }); glowAdd(0, 300, 120, 'rgba(255,220,150,1)', 0.6); pop();   // ночник
}
/* ---------- столик и полки (d 1.0) */
function compMid(t, o = {}) {
  rectP(-400, 1540, 1800, 700, '#5a4a3a', { seed: 26300, step: 60, shade: () => { for (let y = 1560; y < 2240; y += 60) stroke([[-400, y], [1400, y]], '#4e4032', 3); } });
  rectP(-400, BERTH, 700, 150, PLUSH, { seed: 26310, lw: 2.4, shade: () => stroke([[-400, BERTH + 20], [300, BERTH + 20]], '#6a2232', 4) });   // нижняя полка слева
  rectP(-400, BERTH - 360, 640, 340, '#8a3a4a', { seed: 26311, lw: 2 });                                                                 // спинка
  rectP(-200, BERTH - 60, 260, 60, '#f2ead8', { seed: 26312, lw: 1.6 });                                                                // подушка
  rectP(980, BERTH, 500, 150, PLUSH, { seed: 26315, lw: 2.4 });                                                                        // полка напротив
  rectP(500, TABLE, 460, 26, OAK, { seed: 26320, lw: 2.2 }); stroke([[880, TABLE + 26], [920, 1540]], '#6a4a2a', 10);                     // столик
  rectP(560, TABLE - 8, 200, 8, '#f2ead8', { seed: 26321, lw: 1.2, shade: () => { for (let i = 0; i < 5; i++) stroke([[570, TABLE - 6], [570 + i * 40, TABLE - 6]], '#9a9488', 1); } });   // газета с кроссвордом
  teaGlass(610, TABLE, 0.9, t, { cap: o.capInGlass, rattle: o.rattle ?? 1 });
  if (o.coins) coins(o.coins[0], o.coins[1], 6, 26330);
}
function compFg(t) { push(1290, 1990, 1, 0.04); rectP(-110, -1400, 220, 1440, '#9aa0a8', { seed: 26500, lw: 3, shade: () => { rectP(-80, -900, 160, 400, '#c8d0d8', { seed: 26501, line: false }); } }); pop(); }   // дверь купе у края
function compLight(t, fn) { lightmap('#7a7898', () => { radial(980, 660, 600, 'rgba(255,220,150,1)', 0.85); const k = Math.max(0, Math.sin(t * 2.7)) * 0.4; radial(540, 680, 500, 'rgba(255,210,140,1)', 0.15 + k); radial(400, 500, 600, 'rgba(140,160,255,1)', 0.25); if (fn) fn(); }); }

// ------------------------------------------------------------------ вставки: газета с кроссвордом
function newsBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#e8e2d0', { seed, line: false, step: 80, shade: () => { const r = rng(seed + 1); for (let y = -80; y < 2100; y += 30) stroke([[-100 + r() * 40, y], [1180 - r() * 300, y]], '#b8b0a0', 3, { a: 0.6 });
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) if ((i * 3 + j) % 4) rectP(700 + i * 44, 1300 + j * 44, 40, 40, '#fbfaf2', { seed: seed + i * 8 + j, lw: 1.2 }); } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,230,180,0.1)'); g.addColorStop(1, 'rgba(20,10,0,0.55)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function arrows(x0, y0, x1, y1, k, col) { const n = 4; for (let i = 0; i < n; i++) { const u = ((k + i / n) % 1); const x = lerp(x0, x1, u), y = lerp(y0, y1, u); stroke([[x, y - 20], [x, y + 20]], col, 6, { a: Math.sin(Math.PI * u) }); piece([[x - 12, y - 14], [x + 12, y - 14], [x, y - 32]], col, { raw: true, line: false }); } }
function capIns(t, c) {                                               // дырка в колпачке: воздух проходит, BIC с 1991
  if (!c.fg) newsBg(26710, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 880, 780, 0, 26711, '#fbfaf2'); txt('ДЫРКА В КОЛПАЧКЕ', 0, -330, 50, { font: 'Inter Black', col: '#1c1512' });
  push(-160, 20, 4.2); rectP(-11, -28, 22, 56, '#2a5ac8', { seed: 26712, lw: 0.8 }); ellP(0, -28, 6, 3, '#fbfaf2', { seed: 26713, lw: 0.6 }); pop();
  if (t > c.air - 0.3) { arrows(-160, 220, -160, -220, t * 0.8, '#5ab8e8'); txt('воздух проходит', 200, -40, 40, { font: 'Inter Black', col: '#2a5a8a', maxW: 380 }); txt('даже если колпачок', 200, 10, 30, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 380 }); txt('застрял в горле', 200, 50, 30, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 380 }); }
  if (t > c.y91 - 0.2) { push(200, 200, popK(t, c.y91 - 0.2, 0.3)); rectP(-170, -50, 340, 100, '#2a5ac8', { seed: 26714, lw: 2 }); txt('BIC · с 1991', 0, 14, 40, { font: 'Inter Black', col: '#fbfaf2' }); pop(); } pop();
  if (t > c.risk) { push(540, 1250, popK(t, c.risk, 0.3), -0.03); ransom('МЕНЬШЕ РИСК УДУШЬЯ', 0, 0, 72, 26715, { reveal: 1, pop: true }); pop(); }
}
function barrelIns(t, c) {                                            // дырочка в корпусе: давление внутри = снаружи
  if (!c.fg) newsBg(26720, t); if (c.bg) return;
  push(540, 740, 1, 0.01); card(0, 0, 880, 640, 0, 26721, '#fbfaf2'); txt('ДЫРОЧКА В КОРПУСЕ', 0, -270, 46, { font: 'Inter Black', col: '#1c1512' });
  push(0, 0, 2.2, Math.PI / 2); rectP(-8, -150, 16, 300, 'rgba(220,235,245,0.9)', { seed: 26722, raw: true, lw: 1.4, tex: false }); stroke([[0, -140], [0, 140]], '#2a5ac8', 3); dot(0, 20, 3.4, '#1c1512'); pop();
  if (t > c.pressure - 0.2) { arrows(-44, -160, -44, -40, t * 0.8, '#c8243c'); arrows(-44, 160, -44, 40, t * 0.8, '#2a6ac8'); }
  if (t > c.outside - 0.2) txt('давление внутри = снаружи', 0, 230, 40, { font: 'Inter Black', col: '#1c1512', maxW: 820 }); pop();
  label(540, 1180, 'BIC Cristal · Wikipedia / BIC FAQ', 0, '#f4e6a8', 0.01, 26);
}
function pocketIns(t, c) {                                            // часовой карман: Levi's, конец 1870-х
  if (!c.fg) newsBg(26730, t); if (c.bg) return;
  push(540, 740, 1, -0.01); card(0, 0, 880, 760, 0, 26731, '#fbfaf2'); txt('«ЧАСОВОЙ КАРМАН»', 0, -320, 50, { font: 'Inter Black', col: '#1c1512' });
  piece([[-260, -220], [60, -220], [80, 240], [-280, 240]], '#2a4a7a', { seed: 26732, lw: 2.4, shade: () => { stroke([[-260, -150], [60, -150]], '#e8a83a', 3); piece([[-150, -150], [-20, -150], [-30, 0], [-140, 0]], '#24406c', { seed: 26733, lw: 2 }); [[-150, -150], [-20, -150]].forEach(([a, b]) => dot(a, b, 6, '#c88a3a')); } });
  if (t > c.watches - 0.2) { const k = popK(t, c.watches - 0.2, 0.3); push(-85, -60 - 40 * k, k); ellP(0, 0, 46, 46, '#d8b84a', { seed: 26734, lw: 2.4, shade: () => ellP(0, 0, 36, 36, '#fbfaf2', { seed: 26735, line: false }) }); stroke([[0, 0], [0, -24]], '#1c1512', 3); stroke([[0, 0], [16, 6]], '#1c1512', 3); stroke(spline([[0, -46], [20, -90], [60, -100]], false, 5), '#d8b84a', 3); pop(); }
  if (t > c.levis - 0.1) txt('Levi’s', 260, -100, 56, { font: 'Inter Black', col: '#c8243c' });
  if (t > c.y1870 - 0.2) txt('конец 1870-х', 260, -30, 40, { font: 'Inter Black', col: '#1c1512', maxW: 340 });
  if (t > c.pocketwatch - 0.1) txt('для карманных часов', 260, 30, 30, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 340 }); pop();
  label(540, 1250, 'не для презервативов. Извини.', 0, '#f4e6a8', 0.02, 30);
}
function adviceIns(t, c) {                                            // что делать
  if (!c.fg) newsBg(26740, t); if (c.bg) return;
  push(540, 740, 1, 0.01); card(0, 0, 880, 760, 0, 26741, '#fbfaf2'); txt('КОЛПАЧОК — НЕ ЖВАЧКА', 0, -320, 46, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  if (t > c.nochew - 0.2) { stampX(-360, -200, 0.6, pr(t, c.nochew - 0.2, c.nochew + 0.2)); txt('не грызть', -300, -186, 42, { font: 'Inter Black', col: '#1c1512', align: 'left' }); }
  if (t > c.time - 0.3) txt('дырка не спасает — даёт время', 0, -80, 36, { font: 'Inter Black', col: '#2a5a8a', maxW: 820 });
  if (t > c.call - 0.3) { txt('⚠', -360, 60, 60, { font: 'Inter Black', col: '#c8243c' }); txt('подавился и не дышит —', -300, 40, 36, { font: 'Inter Black', col: '#1c1512', align: 'left', maxW: 680 }); txt('сразу скорая', -300, 92, 40, { font: 'Inter Black', col: '#c8243c', align: 'left' }); }
  if (t > c.kids - 0.2) { check(-360, 230, 0.8, pr(t, c.kids - 0.2, c.kids + 0.2)); txt('детям ручки в рот не давать', -300, 244, 36, { font: 'Inter Black', col: '#2a6a3a', align: 'left', maxW: 680 }); } pop();
}
