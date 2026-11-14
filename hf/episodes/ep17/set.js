/* Эп. 17 «Завтрак — заговор?» — декорация: автобусная остановка на рассвете. Автобус «17» только что уехал,
   Никита с миской хлопьев (доедает на ходу), Том на лавке под навесом охотится взглядом на голубей, клюющих крошки.
   Над Никитой — билборд «ЗАВТРАК — САМЫЙ ВАЖНЫЙ ПРИЁМ ПИЩИ!». 2.5D: небо и дома 2.4, дорога и билборд 1.35, остановка 1.0, передний план 0.6. */

const SUN = '#ffb85a', MILK = '#fbfaf2', FLAKE = '#e8a83a', BACON = '#c8483a';
const SEAT = 1250;                                                      // сиденье лавки (Том сидит: y = 1250 − 239)

function cerealBowl(x, y, s, rot, o = {}) {
  push(x, y, s, rot);
  piece(spline([[-70, -10], [70, -10], [56, 40], [0, 56], [-56, 40]], true, 6), '#5ab8d8', { seed: 17001, lw: 2.4, shade: () => { stroke([[-60, 6], [60, 6]], '#3a98b8', 5); } });
  ellP(0, -10, 70, 16, MILK, { seed: 17002, lw: 2 }); const r = rng(17003); for (let i = 0; i < 10 * (o.full ?? 1); i++) ellP(-54 + r() * 108, -12 + (r() - 0.5) * 12, 11, 7, FLAKE, { seed: 17004 + i, lw: 1.2, rot: r() * 3 });
  if (o.spoon !== false) { stroke([[20, -14], [70, -80]], '#c8ccd4', 6); ellP(74, -86, 10, 14, '#d8dce0', { seed: 17020, lw: 1.6 }); }
  pop();
}
function baconSand(x, y, s, rot, o = {}) {                            // бутерброд: хлеб, яичница, бекон (o.bacon 0..1 — бекона ещё нет/уже утащили)
  push(x, y, s, rot);
  rectP(-60, -8, 120, 26, '#e8c890', { seed: 17030, lw: 2 }); ellP(0, -14, 50, 14, MILK, { seed: 17031, lw: 1.6, shade: () => ellP(6, -16, 16, 10, '#f2c02a', { seed: 17032, line: false }) });
  if ((o.bacon ?? 1) > 0.5) piece(spline([[-64, -26], [-30, -36], [0, -24], [30, -36], [64, -26], [64, -18], [30, -28], [0, -16], [-30, -28], [-64, -18]], true, 4), BACON, { raw: true, lw: 1.8 });
  rectP(-62, -44 - ((o.bacon ?? 1) > 0.5 ? 6 : 0), 124, 24, '#e8c890', { seed: 17033, lw: 2 }); pop();
}
function baconStrip(x, y, s, rot) { push(x, y, s, rot); piece(spline([[-64, -6], [-30, -16], [0, -4], [30, -16], [64, -6], [64, 4], [30, -6], [0, 6], [-30, -6], [-64, 4]], true, 4), BACON, { raw: true, lw: 1.8, shade: () => stroke([[-60, -2], [60, -4]], '#f2c0a8', 3) }); pop(); }
/* голубь: fly 0..1 — улетает, peck — клюёт */
function pigeon(x, y, s, t, o = {}) {
  const f = o.fly ?? 0; if (f >= 1) return; push(x + 600 * f * f, y - 900 * f, s, 0, o.flip ? -1 : 1);
  const pk = f > 0 ? 0 : Math.max(0, Math.sin(t * 5 + (o.ph ?? 0))) ; 
  blobP([[-40, -10], [-10, -36], [30, -30], [44, -10], [30, 10], [-30, 12]], '#8a90a0', { seed: 17040, lw: 2, shade: () => { stroke([[-10, -20], [26, -16]], '#6a7080', 6); } });
  push(34, -34 + 26 * pk, 1, 0.6 * pk); ellP(0, 0, 16, 16, '#7a80a0', { seed: 17041, lw: 1.8, shade: () => ellP(-4, 10, 10, 6, '#5ab89a', { seed: 17042, line: false, a: 0.7 }) }); dot(6, -4, 3, '#f2a83a'); piece([[14, -2], [26, 2], [14, 6]], '#c8a07a', { raw: true, lw: 1 }); pop();
  if (f > 0) { const w = Math.sin(t * 40) * 0.9; [-1, 1].forEach(d => piece([[-10, -26], [20, -26], [10 + 30 * d, -26 - 50 * w]], '#9aa0b0', { raw: true, lw: 1.8 })); }
  else { stroke([[-6, 10], [-8, 26]], '#c86a5a', 3); stroke([[8, 10], [10, 26]], '#c86a5a', 3); }
  pop();
}
/* ---------- небо и дома (d 2.4): рассвет */
function dawnCity(t) {
  rectP(-400, -100, 1600, 1600, '#5a7ac8', { seed: 17100, line: false, shade: () => {
    [['#7a8ad0', 220, 220], ['#c88ab8', 440, 200], ['#f2a88a', 640, 180], ['#ffd09a', 820, 160]].forEach(([c, y, h], i) => rectP(-400, y, 1600, h, c, { seed: 17101 + i, line: false }));
    ellP(-60, 860, 120, 120, '#fff0c0', { seed: 17105, line: false }); glowAdd(-60, 860, 420, 'rgba(255,210,140,1)', 0.6);
    [[120, 200, 0.6], [520, 300, 0.8], [900, 160, 0.5]].forEach(([x, y, k], i) => { const dx = (t * 6 + i * 200) % 1700 - 400; blobP([[x + dx - 120, y], [x + dx - 60, y - 40], [x + dx + 20, y - 54], [x + dx + 110, y - 20], [x + dx + 140, y + 10], [x + dx - 130, y + 14]], '#fbe8e8', { seed: 17110 + i, line: false, a: k }); });
    [[-380, 760, 200, '#4a3a5a'], [-160, 680, 220, '#3e3250'], [80, 800, 180, '#4a3a5a'], [280, 640, 240, '#3a2e4a'], [540, 740, 200, '#463858'], [760, 660, 230, '#3e3250'], [1000, 780, 220, '#4a3a5a']].forEach(([x, y, w, c], i) => {
      rectP(x, y, w, 1500 - y, c, { seed: 17120 + i, lw: 1.6 }); for (let k = 0; k < 4; k++) for (let j = 0; j < 8; j++) if ((k * 3 + j * 5 + i) % 7 === 0) rectP(x + 18 + k * 46, y + 30 + j * 60, 26, 34, '#ffd27a', { seed: 17130 + i * 40 + k * 8 + j, line: false, a: 0.8 }); });
    push(660, 1040); rectP(-130, -50, 260, 90, '#2a1e1a', { seed: 17160, lw: 2.2 }); glowAdd(0, -5, 200, 'rgba(255,150,80,1)', 0.4); txt('ЗАВТРАКИ 24', 0, 6, 34, { font: 'Inter Black', col: '#ffb07a' }); pop();
  } });
}
/* ---------- дорога, автобус, билборд (d 1.35) */
function road(t, o = {}) {
  rectP(-400, 1180, 1800, 340, '#3a3a44', { seed: 17200, line: false, shade: () => { for (let x = -380; x < 1400; x += 220) rectP(x, 1340, 120, 14, '#e8e0c8', { seed: 17201 + ((x + 400) & 63), line: false }); } });
  rectP(-400, 1160, 1800, 24, '#8a8a92', { seed: 17210, lw: 1.6 });
  [-200, 1240].forEach((x, i) => { stroke([[x, 400], [x, 1170]], '#2a2a30', 12); stroke([[x, 410], [x + 90, 400]], '#2a2a30', 8); ellP(x + 100, 404, 22, 10, '#fff0c0', { seed: 17215 + i, lw: 1.4 }); });   // фонари
  // уехавший автобус «17»
  const bx = o.busX ?? 2000; if (bx < 1700) { push(bx, 1200); rectP(-240, -340, 480, 330, '#e8b83a', { seed: 17220, lw: 3, shade: () => {
    rectP(-210, -310, 420, 120, '#2a3a4a', { seed: 17221, lw: 2 }); rectP(-60, -340, 120, 40, '#1c1a1c', { seed: 17222, lw: 1.6 }); txt('17', 0, -312, 30, { font: 'Inter Black', col: '#ffb03a' });
    [-180, 180].forEach((dx, i) => { rectP(dx - 26, -150, 52, 30, '#c8241c', { seed: 17223 + i, lw: 1.6 }); glowAdd(dx, -135, 60, 'rgba(255,60,40,1)', 0.5); }); rectP(-120, -100, 240, 40, '#d8d0c0', { seed: 17225, lw: 1.6 }); } });
    dot(-170, -4, 34, '#1c1a1c'); dot(170, -4, 34, '#1c1a1c'); ctx.save(); ctx.globalAlpha = 0.35; ellP(-280, -20, 70, 30, '#9a948a', { seed: 17226, line: false }); ctx.restore(); pop(); }
  // билборд с хлопьями
  push(400, 640, 0.8, 0); stroke([[-120, 170], [-120, 580]], '#2a2a30', 14); stroke([[120, 170], [120, 580]], '#2a2a30', 14);
  rectP(-240, -170, 480, 340, '#fbe8c0', { seed: 17230, lw: 3, shade: () => {
    rectP(-240, -170, 480, 70, '#c8241c', { seed: 17231, line: false }); txt('ЗАВТРАК —', -40, -124, 40, { font: 'Inter Black', col: '#fbfaf2' });
    txt('САМЫЙ ВАЖНЫЙ', -70, -40, 40, { font: 'Inter Black', col: '#1c1512', maxW: 320 }); txt('ПРИЁМ ПИЩИ!', -70, 10, 40, { font: 'Inter Black', col: '#1c1512', maxW: 320 });
    push(170, 50); rectP(-60, -90, 120, 170, '#f2c02a', { seed: 17232, lw: 2, shade: () => { ellP(0, -40, 34, 34, '#ff8a3a', { seed: 17233, lw: 1.6 }); txt('FLAKES', 0, 40, 20, { font: 'Inter Black', col: '#c8241c' }); } }); pop();
    cerealBowl(-80, 110, 1.1, 0, { spoon: false }); } });
  glowAdd(0, 0, 300, 'rgba(255,230,180,1)', 0.15); pop();
}
/* ---------- остановка (d 1.0) */
function stopMid(t, o = {}) {
  rectP(-400, 1440, 1800, 700, '#a8a4a0', { seed: 17300, step: 60, shade: () => { for (let y = 1460; y < 2200; y += 70) for (let x = -400 + ((y / 70) % 2) * 35; x < 1400; x += 70) rectP(x + 2, y + 2, 66, 66, ((x / 70 + y / 70) & 1) ? '#b4b0aa' : '#9c9892', { seed: 17301 + ((x + y) & 255), line: false }); } });
  rectP(-400, 1426, 1800, 22, '#6a6a70', { seed: 17302, lw: 1.6 });
  // навес остановки
  [560, 1100].forEach((x, i) => rectP(x - 10, 690, 20, 860, '#3a4a5a', { seed: 17310 + i, lw: 2 }));
  ctx.save(); ctx.globalAlpha = 0.28; rectP(570, 720, 520, 520, '#a8d8f0', { seed: 17312, raw: true, line: false }); ctx.restore(); stroke([[570, 720], [1090, 720]], '#3a4a5a', 6); stroke([[570, 1240], [1090, 1240]], '#3a4a5a', 6);
  stroke([[600, 760], [700, 860]], '#ffffff', 4, { a: 0.4 }); stroke([[640, 760], [800, 920]], '#ffffff', 3, { a: 0.3 });
  piece([[500, 650], [1160, 650], [1140, 700], [520, 700]], '#2a3a4a', { seed: 17313, lw: 2.4 });
  rectP(620, SEAT, 440, 26, '#c8783a', { seed: 17320, lw: 2 }); [660, 1020].forEach((x, i) => rectP(x - 8, SEAT + 26, 16, 180, '#3a4a5a', { seed: 17321 + i, lw: 1.6 }));   // лавка
  // табличка «А 17» и расписание на столбе слева
  push(1135, 760); stroke([[0, 0], [0, 790]], '#5a6a7a', 10); rectP(-60, -70, 120, 110, '#2a6ac8', { seed: 17330, lw: 2.2 }); ellP(0, -36, 30, 30, '#fbfaf2', { seed: 17331, lw: 1.6 }); txt('А', 0, -26, 34, { font: 'Inter Black', col: '#2a6ac8' }); txt('17', 0, 26, 30, { font: 'Inter Black', col: '#fbfaf2' }); pop();
  push(1180, 1490); rectP(-50, -120, 100, 130, '#3a6a4a', { seed: 17340, lw: 2.2 }); rectP(-56, -130, 112, 16, '#2a4a3a', { seed: 17341, lw: 1.6 }); pop();   // урна
  // крошки хлопьев у ног
  const r = rng(17350); for (let i = 0; i < 16; i++) ellP(560 + r() * 280, 1550 + r() * 40, 7, 5, FLAKE, { seed: 17351 + i, lw: 1, rot: r() * 3 });
  // голуби
  const fl = o.pigeonFly ?? 0; [[620, 1580, 0.9, 0, false], [740, 1600, 1.0, 1.7, true], [860, 1575, 0.85, 3.1, false]].forEach(([x, y, s, ph, fp], i) => pigeon(x, y, s, t, { ph, flip: fp, fly: clamp(fl * 1.2 - i * 0.1) }));
}
function stopFg(t) { push(-120, 1980, 1, -0.04); stroke([[0, -700], [0, 100]], '#2a2a30', 26); rectP(-70, -760, 140, 90, '#c8241c', { seed: 17500, lw: 2.4 }); pop(); }   // знак «стоянка запрещена» у края
function stopLight(t, fn) { lightmap('#b0a8c0', () => {
  radial(-60, 860, 900, 'rgba(255,200,130,1)', 0.85); cone(-60, 860, 900, 1500, 900, 'rgba(255,200,140,1)', 0.35);
  radial(820, 980, 520, 'rgba(255,240,220,1)', 0.35);
  if (fn) fn(); });
}
function windowLook(t, wx, wy, z, o = {}) { cam25(540 + (wx - 540) * 2.4, 960 + (wy - 960) * 2.4, z, { focus: 2.4, dof: 0, shake: o.shake ?? 0 }); plane(0, 2.4, () => dawnCity(t)); }

// ------------------------------------------------------------------ вставки: стол с клетчатой скатертью
function clothBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#f2ead8', { seed, line: false, step: 80, shade: () => { ctx.save(); ctx.globalAlpha = 0.2; for (let i = -100; i < 2200; i += 120) { rectP(-100, i, 1280, 60, '#c8483a', { seed: seed + 3, line: false }); } for (let i = -100; i < 1280; i += 120) rectP(i, -100, 60, 2300, '#c8483a', { seed: seed + 4, line: false }); ctx.restore(); } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,220,160,0.2)'); g.addColorStop(1, 'rgba(40,10,10,0.55)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
  const r = rng(seed + 1); for (let i = 0; i < 14; i++) ellP(r() * 1080, r() * 1920, 9, 6, FLAKE, { seed: seed + 10 + i, lw: 1, rot: r() * 3 });
}
function plateBE(x, y, s) { push(x, y, s); ellP(0, 0, 150, 60, '#fbfaf2', { seed: 17700, lw: 2.4, shade: () => ellP(0, 0, 110, 40, '#f2ece0', { seed: 17701, line: false }) });
  [-50, 40].forEach((dx, i) => { blobP([[dx - 40, -4], [dx - 20, -26], [dx + 20, -24], [dx + 40, 0], [dx + 10, 18], [dx - 30, 14]], MILK, { seed: 17702 + i, lw: 1.6 }); ellP(dx, -4, 16, 12, '#f2b82a', { seed: 17704 + i, lw: 1.4 }); });
  baconStrip(0, 30, 1, 0.1); baconStrip(10, 10, 0.9, -0.1); pop(); }
function bernaysIns(t, c) {                                           // 1920-е: бекон продаётся плохо → Beech-Nut → Эдвард Бернейс, «отец пиара»
  if (!c.fg) clothBg(17710, t); if (c.bg) return;
  push(540, 640, 1, -0.01); card(0, 0, 840, 420, 0, 17711, '#fbfaf2'); txt('ПРОДАЖИ БЕКОНА · 1920-е', 0, -160, 36, { font: 'Inter Black', col: '#1c1512', maxW: 780 });
  const k = sm(pr(t, c.bacon0 - 0.3, c.bad + 0.4)); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 12 / S; ctx.strokeStyle = BACON; ctx.beginPath();
  for (let i = 0; i <= 20 * k; i++) { const x = -340 + i * 34, y = -60 + i * 9 + 18 * Math.sin(i * 1.3); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
  stroke([[-360, 140], [360, 140]], '#4a4038', 4); if (k > 0.9) txt('↓', 330, 120, 70, { font: 'Inter Black', col: BACON }); pop();
  if (t > c.beech - 0.2) { push(540, 1000, popK(t, c.beech - 0.2, 0.3), 0.02); card(0, 0, 780, 270, 0, 17712, '#f2ead8'); rectP(-370, -110, 230, 220, '#6a3a2a', { seed: 17713, lw: 2.2 }); txt('BEECH-NUT', -255, 10, 30, { font: 'Inter Black', col: '#f2ead8', maxW: 210 });
    if (t > c.bern - 0.2) { personIcon(0, 40, 1.2, '#3a4a5a', 17714); txt('Эдвард Бернейс', 220, -40, 38, { font: 'Inter Black', col: '#1c1512', maxW: 300 }); txt('«отец пиара»', 220, 20, 32, { font: 'Inter', weight: 800, col: '#8a3a2a', maxW: 300 }); } pop(); }
  if (t > c.pr) { push(540, 1260, popK(t, c.pr, 0.3), -0.03); ransom('ОТЕЦ ПИАРА', 0, 0, 110, 17715, { reveal: 1, pop: true }); pop(); }
}
function surveyIns(t, c) {                                            // письмо 5000 врачей → 4500 «да» → газеты → бекон с яйцами
  if (!c.fg) clothBg(17720, t); if (c.bg) return;
  push(540, 700, 1, 0.01); card(0, 0, 880, 600, 0, 17721, '#fbfaf2'); txt('«ПОЛЕЗЕН ЛИ СЫТНЫЙ ЗАВТРАК?»', 0, -240, 36, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  const n = Math.round(50 * sm(pr(t, c.k5 - 0.4, c.k5 + 0.8))), yes = Math.round(45 * sm(pr(t, c.k45 - 0.2, c.yes + 0.2)));
  for (let i = 0; i < n; i++) { const x = -360 + (i % 10) * 80, y = -150 + Math.floor(i / 10) * 70; push(x, y, 0.32); ellP(0, -70, 34, 34, i < yes ? '#3a8a4a' : '#9a9488', { seed: 17722, lw: 2 }); piece(spline([[-54, 70], [-46, -16], [0, -34], [46, -16], [54, 70]], true, 6), i < yes ? '#3a8a4a' : '#9a9488', { seed: 17723, raw: true, lw: 2 }); pop(); }
  if (n > 0) txt('5 000 врачей', -200, 240, 36, { font: 'Inter Black', col: '#4a4038' }); if (yes > 0) txt(yes * 100 + ' — «да»', 200, 240, 40, { font: 'Inter Black', col: '#2a6a3a' }); pop();
  if (t > c.paper - 0.2) { push(540, 1130, popK(t, c.paper - 0.2, 0.3), -0.03); card(0, 0, 820, 200, 0, 17724, '#efe6d0'); txt('ВРАЧИ СОВЕТУЮТ', 0, -30, 52, { font: "'Courier 10 Pitch'", col: '#1c1512', maxW: 760 }); txt('СЫТНЫЙ ЗАВТРАК', 0, 40, 52, { font: "'Courier 10 Pitch'", col: '#1c1512', maxW: 760 }); pop(); }
}
function baconIns(t, c) {                                             // «А что сытнее всего? Бекон с яйцами»
  if (!c.fg) clothBg(17730, t); if (c.bg) return;
  plateBE(540, 820, 2.6 * popK(t, c.sytnee - 0.2, 0.4));
  if (t > c.bacon) { push(540, 1240, popK(t, c.bacon, 0.3), -0.03); ransom('БЕКОН С ЯЙЦАМИ', 0, 0, 96, 17731, { reveal: 1, pop: true }); pop(); }
  label(540, 1370, 'кампания для Beech-Nut, 1920-е', 0, '#f4e6a8', 0.01, 28);
}
function cerealIns(t, c) {                                            // 1894: Келлоги, санаторий, пресная диета → 1944: General Foods, радио
  if (!c.fg) clothBg(17740, t); if (c.bg) return;
  push(540, 620, 1, -0.01); card(0, 0, 860, 400, 0, 17741, '#fbfaf2'); txt('1894 · САНАТОРИЙ БАТТЛ-КРИК', 0, -150, 34, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
  personIcon(-280, 60, 1.1, '#3a4a5a', 17742); personIcon(-160, 60, 1.1, '#4a5a6a', 17743); txt('братья Келлоги', -220, 160, 28, { font: 'Inter', weight: 800, col: '#4a4038' });
  cerealBowl(150, 40, 1.8, 0, { spoon: false }); if (t > c.bland) txt('пресная диетическая еда', 150, 160, 30, { font: 'Inter Black', col: '#8a3a2a', maxW: 420 }); pop();
  if (t > c.y44 - 0.2) { push(540, 1060, popK(t, c.y44 - 0.2, 0.3), 0.02); card(0, 0, 860, 360, 0, 17744, '#2a2a30'); push(-300, 10); rectP(-90, -80, 180, 150, '#8a5a3a', { seed: 17745, lw: 2.4, shade: () => { ellP(-30, 0, 40, 40, '#3a2a1a', { seed: 17746, lw: 1.6 }); rectP(30, -40, 40, 80, '#d8c090', { seed: 17747, lw: 1.4 }); } }); stroke([[0, -80], [40, -140]], '#8a8a90', 5); pop();
    txt('1944 · General Foods', 100, -110, 36, { font: 'Inter Black', col: '#f2c02a', maxW: 520 });
    if (t > c.slogan) { txt('«Хорошо позавтракаешь —', 100, -20, 36, { font: "'Courier 10 Pitch'", col: '#fbfaf2', maxW: 540 }); txt('лучше поработаешь»', 100, 40, 36, { font: "'Courier 10 Pitch'", col: '#fbfaf2', maxW: 540 }); }
    if (t > c.sell) txt('→ продать хлопья', 100, 120, 34, { font: 'Inter Black', col: '#ff8a5a', maxW: 520 }); pop(); }
}
function bmjIns(t, c) {                                               // BMJ 2019: 13 испытаний, +260 ккал/день, худее не стали
  if (!c.fg) clothBg(17750, t); if (c.bg) return;
  push(540, 760, 1, 0.01); card(0, 0, 880, 760, 0, 17751, '#fbfaf2'); rectP(-440, -380, 880, 80, '#2a3a6a', { seed: 17752, line: false }); txt('BMJ · 2019', 0, -326, 40, { font: 'Inter Black', col: '#fbfaf2' });
  txt('13 испытаний: завтракать vs не завтракать', 0, -240, 30, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 820 });
  const k = sm(pr(t, c.kcal - 0.6, c.kcal + 0.6)); [['не завтракали', 0.72, '#9a9488'], ['завтракали', 0.72 + 0.28 * k, '#c8483a']].forEach(([s, v, col], i) => { const y = -140 + i * 150;
    txt(s, -380, y, 36, { font: 'Inter Black', col: '#1c1512', align: 'left' }); rectP(-380, y + 24, 640 * v, 70, col, { seed: 17753 + i, lw: 2.2 }); });
  if (k > 0.5) txt('+260 ккал в день', 160, 120, 48, { font: 'Inter Black', col: '#c8483a', maxW: 520 });
  if (t > c.notthin) { txt('вес — не меньше', 0, 230, 46, { font: 'Inter Black', col: '#1c1512' }); txt('(даже чуть больше, ≈ 0,4 кг)', 0, 290, 28, { font: 'Inter', weight: 800, col: '#6b5a48', maxW: 760 }); } pop();
  label(540, 1270, 'Sievert et al., BMJ 2019;364:l42', 0, '#f4e6a8', -0.01, 28);
}
function adviceIns(t, c) {                                            // что делать: голоден — ешь; считай за день; «самый важный» — слоган
  if (!c.fg) clothBg(17760, t); if (c.bg) return;
  push(540, 700, 1, -0.01); card(0, 0, 860, 640, 0, 17761, '#fbfaf2'); txt('ЗАВТРАК: ЧЕСТНО', 0, -260, 46, { font: 'Inter Black', col: '#1c1512' });
  const R = [['голоден утром — ешь', c.hungry, 1], ['не голоден — не впихивай', c.nothungry, 1], ['считается: сколько и что за день', c.day, 1]];
  R.forEach(([s, t0], i) => { if (t < t0 - 0.2) return; const y = -150 + i * 120; check(-350, y, 0.8, pr(t, t0 - 0.2, t0 + 0.2)); txt(s, -290, y + 14, 38, { font: 'Inter Black', col: '#2a6a3a', align: 'left', maxW: 640 }); });
  pop();
  if (t > c.slog2) { push(540, 1180, popK(t, c.slog2, 0.25), -0.06); rectP(-360, -60, 720, 120, 'rgba(0,0,0,0)', { raw: true, lc: '#c8241c', lw: 9, tex: false }); txt('«САМЫЙ ВАЖНЫЙ» = СЛОГАН', 0, 20, 52, { font: 'Inter Black', col: '#c8241c', maxW: 680 }); pop(); }
}
/* лента истории (цвета серии: рассвет и бекон) */
function timeline17(k, t, f = k) {
  const Y = [['1894', 'хлопья'], ['1920-е', 'бекон'], ['1944', 'слоган'], ['2019', 'BMJ']], x0 = 200, x1 = 880, y = 300, N = Y.length - 1;
  rectP(x0 - 110, y - 70, x1 - x0 + 220, 150, 'rgba(50,20,30,0.85)', { seed: 17990, line: false, tex: false });
  stroke([[x0, y], [x1, y]], '#7a5a5a', 8); if (f > 0) stroke([[x0, y], [lerp(x0, x1, f / N), y]], SUN, 10);
  Y.forEach(([yr, w], i) => { const x = lerp(x0, x1, i / N), on = i === k, past = i <= f && !on;
    ellP(x, y, on ? 26 : 16, on ? 26 : 16, on ? '#fbf0d8' : past ? SUN : '#4a3040', { seed: 17991 + i, lw: 2.2 });
    txt(yr, x, y - 40, on ? 32 : 24, { font: 'Inter Black', col: on ? '#fbf0d8' : '#e8c8b0' }); txt(w, x, y + 50, 22, { font: 'Inter', weight: 800, col: '#e8c8b0', maxW: 170 }); });
}
