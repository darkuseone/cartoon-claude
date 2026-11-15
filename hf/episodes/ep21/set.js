/* Эп. 21 «Жвачка — 7 лет в желудке?» — декорация: летнее озеро в полдень, деревянные мостки, пустая вышка спасателя на берегу.
   Никита в панике проглотил жвачку; Том сидит на сумке-холодильнике у края мостков и рыбачит лапой.
   2.5D: небо, дальний берег 2.4; вода, буйки, вышка 1.35; мостки и герои 1.0; передний план 0.6. */

const LTOP = 1220, WATER = '#2a8ac8';
function gumPack(x, y, s, rot) { push(x, y, s, rot); rectP(-60, -26, 120, 52, '#3ac87a', { seed: 21001, lw: 2, shade: () => { rectP(-60, -8, 120, 16, '#fbfaf2', { seed: 21002, line: false }); txt('ЖВАЧКА', 0, 5, 14, { font: 'Inter Black', col: '#2a8a4a' }); } }); pop(); }
function sandwich(x, y, s, rot, o = {}) { push(x, y, s, rot); const b = o.bite ?? 0; rectP(-60, -6, 120 - 40 * b, 22, '#e8c890', { seed: 21010, lw: 2 }); piece([[-64, -10], [60 - 40 * b, -10], [56 - 40 * b, -20], [-60, -20]], '#7ac85a', { raw: true, lw: 1.4 }); rectP(-62, -40, 124 - 40 * b, 24, '#e8c890', { seed: 21011, lw: 2 }); pop(); }
function fish(x, y, s, rot, o = {}) { const k = o.left ?? 1; if (k <= 0) return; push(x, y, s * k, rot); piece(spline([[-60, 0], [-20, -24], [30, -18], [50, 0], [30, 18], [-20, 24]], true, 5), '#a8c0d0', { raw: true, lw: 2, shade: () => { stroke([[-10, -16], [-10, 16]], '#88a0b0', 3); dot(34, -4, 4, '#1c1512'); } });
  piece([[-56, 0], [-90, -26], [-84, 0], [-90, 26]], '#88a0b0', { raw: true, lw: 2 }); pop(); }
function ringFloat(x, y, s) { push(x, y, s); ellP(0, 0, 110, 46, '#ff6a3a', { seed: 21020, lw: 2.4, shade: () => { ellP(0, 0, 54, 18, '#2a8ac8', { seed: 21021, line: false }); [[-80, -20], [70, 24]].forEach(([a, b]) => rectP(a - 14, b - 10, 28, 20, '#fbfaf2', { seed: 21022 + a, line: false })); } }); pop(); }
/* ---------- небо и дальний берег (d 2.4) */
function summerSky(t) {
  rectP(-400, -100, 1600, 1600, '#5ab8f0', { seed: 21100, line: false, shade: () => {
    [['#7ac8f4', 300, 260], ['#a8dcf8', 560, 260]].forEach(([c, y, h], i) => rectP(-400, y, 1600, h, c, { seed: 21101 + i, line: false }));
    ellP(820, 220, 80, 80, '#fff6c8', { seed: 21105, line: false }); glowAdd(820, 220, 260, 'rgba(255,250,200,1)', 0.6);
    [[60, 200], [420, 320], [-200, 380]].forEach(([x, y], i) => { const dx = (t * 8 + i * 300) % 1700 - 400; blobP([[x + dx - 140, y], [x + dx - 60, y - 50], [x + dx + 30, y - 66], [x + dx + 130, y - 24], [x + dx + 160, y + 12], [x + dx - 150, y + 16]], '#fbfcff', { seed: 21110 + i, line: false }); });
    blobP([[-400, 820], [-200, 760], [0, 790], [200, 740], [400, 780], [600, 730], [800, 770], [1000, 740], [1200, 780], [1200, 880], [-400, 880]], '#2a6a3a', { seed: 21120, lw: 1.6 });   // лес на том берегу
    rectP(-400, 870, 1600, 700, '#3a9ad8', { seed: 21121, line: false }); const r = rng(21122); for (let i = 0; i < 30; i++) { const x = -380 + r() * 1560, y = 890 + r() * 400, k = 0.5 + 0.5 * Math.sin(t * 4 + i); stroke([[x, y], [x + 30, y]], '#e8f6ff', 3, { a: k * 0.8 }); }
    push(200 + 20 * Math.sin(t * 0.3), 880); piece([[-50, 0], [50, 0], [36, 20], [-36, 20]], '#fbfaf2', { seed: 21130, lw: 1.6 }); piece([[0, 0], [0, -90], [40, -10]], '#fbfaf2', { seed: 21131, lw: 1.6 }); pop();   // парусник
  } });
}
/* ---------- вода, буйки, вышка спасателя (d 1.35) */
function lake(t) {
  rectP(-400, 980, 1800, 700, WATER, { seed: 21200, line: false, shade: () => { const r = rng(21201); for (let i = 0; i < 40; i++) { const x = -380 + r() * 1760, y = 1000 + r() * 640, k = 0.5 + 0.5 * Math.sin(t * 3 + i * 1.3); stroke([[x, y], [x + 50, y + 2]], '#8ad0f8', 4, { a: k * 0.7 }); } } });
  for (let i = 0; i < 7; i++) { const x = -200 + i * 220, y = 1080 + 6 * Math.sin(t * 2 + i); ellP(x, y, 18, 14, i % 2 ? '#ff6a3a' : '#fbfaf2', { seed: 21210 + i, lw: 1.6 }); if (i) stroke([[x - 220, 1080 + 6 * Math.sin(t * 2 + i - 1)], [x, y]], '#fbfaf2', 2, { a: 0.6 }); }   // линия буйков
  push(-180, 960); [[-60, 0], [60, 0]].forEach(([a]) => stroke([[a, 0], [a * 0.6, -360]], '#fbfaf2', 10)); stroke([[-60, -120], [60, -240]], '#fbfaf2', 6); stroke([[60, -120], [-60, -240]], '#fbfaf2', 6);
  rectP(-80, -400, 160, 50, '#e84a3a', { seed: 21220, lw: 2 }); txt('СПАСАТЕЛЬ', 0, -368, 18, { font: 'Inter Black', col: '#fbfaf2' }); piece([[-90, -400], [90, -400], [70, -460], [-70, -460]], '#e84a3a', { seed: 21221, lw: 2 }); pop();   // вышка (пустая)
  [[1150, 1000], [1240, 990], [1310, 1010]].forEach(([x, y], i) => { stroke([[x, y], [x + 6 * Math.sin(t + i), y - 180]], '#5a8a3a', 7); ellP(x + 6 * Math.sin(t + i), y - 190, 10, 26, '#6a4a2a', { seed: 21230 + i, lw: 1.2 }); });   // камыш
}
/* ---------- мостки (d 1.0) */
function pier(t, o = {}) {
  rectP(-400, 1430, 1800, 800, '#b8885a', { seed: 21300, step: 60, shade: () => { for (let y = 1440; y < 2240; y += 64) stroke([[-400, y], [1400, y]], '#8a6038', 5); for (let x = -380; x < 1400; x += 300) stroke([[x, 1430], [x, 2240]], '#9a7048', 3); } });
  rectP(-400, 1420, 1800, 18, '#8a6038', { seed: 21301, lw: 2 });
  [1120, 1240].forEach((x, i) => { rectP(x - 18, 1150, 36, 290, '#8a6038', { seed: 21310 + i, lw: 2 }); ellP(x, 1150, 18, 8, '#a8784a', { seed: 21312 + i, lw: 1.4 }); });   // сваи
  push(860, LTOP); rectP(-110, 0, 220, 230, '#2a8ac8', { seed: 21320, lw: 2.4, shade: () => { rectP(-110, 0, 220, 40, '#fbfaf2', { seed: 21321, line: false }); stroke([[-70, 120], [70, 120]], '#1e6a9a', 6); } }); pop();   // сумка-холодильник
  push(260, 1500); piece([[-170, 0], [170, -10], [190, 70], [-190, 80]], '#e84a6a', { seed: 21330, lw: 2, shade: () => { for (let i = -150; i < 180; i += 60) stroke([[i, 0], [i + 20, 74]], '#fbfaf2', 10); } }); pop();   // полотенце
  push(150, 1460); rectP(-60, -70, 120, 70, '#c8a060', { seed: 21340, lw: 2, shade: () => { stroke([[-60, -40], [60, -40]], '#a8804a', 4); } }); stroke([[-50, -70], [0, -120], [50, -70]], '#a8804a', 6); pop();   // корзинка
  if (o.ring !== false) ringFloat(1040, 1470, 0.7);
}
function pierFg(t) { push(-140, 1990, 1, -0.04); rectP(-60, -600, 120, 640, '#8a6038', { seed: 21500, lw: 3 }); stroke([[-60, -560], [60, -540]], '#e8e0c8', 14); pop(); }   // столбик мостков с канатом
function pierLight(t, fn) { lightmap('#d8d8e8', () => { radial(820, 200, 1200, 'rgba(255,250,220,1)', 0.9); radial(600, 1300, 700, 'rgba(200,240,255,1)', 0.3); if (fn) fn(); }); }
function windowLook(t, wx, wy, z) { cam25(540 + (wx - 540) * 1.35, 960 + (wy - 960) * 1.35, z, { focus: 1.35, dof: 0 }); plane(0, 2.4, () => summerSky(t)); plane(1, 1.35, () => lake(t)); onPlane(1.0, () => pierLight(t)); }

// ------------------------------------------------------------------ вставки: пляжное полотенце в полоску
function towelBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#fbfaf2', { seed, line: false, step: 80, shade: () => { for (let x = -100; x < 1200; x += 240) { rectP(x, -100, 80, 2300, '#5ab8e8', { seed: seed + x, line: false, a: 0.55 }); rectP(x + 120, -100, 40, 2300, '#f2c84a', { seed: seed + x + 1, line: false, a: 0.55 }); } } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(20,40,60,0.4)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function gutIns(t, c) {                                               // жвачка не переваривается, но выходит за пару дней
  if (!c.fg) towelBg(21710, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 860, 760, 0, 21711, '#fbfaf2'); txt('ПУТЬ ЖВАЧКИ', 0, -320, 50, { font: 'Inter Black', col: '#1c1512' });
  blobP([[-200, -230], [-60, -250], [40, -180], [20, -60], [-120, -40], [-220, -120]], '#f2a8a8', { seed: 21712, lw: 2.4 }); txt('желудок', -110, -140, 30, { font: 'Inter Black', col: '#8a2a2a' });
  ctx.save(); ctx.lineWidth = 34 / S; ctx.strokeStyle = '#f2c8a8'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10, -60); for (let i = 0; i < 6; i++) ctx.lineTo(-200 + (i % 2) * 400, 20 + i * 45); ctx.lineTo(180, 300); ctx.stroke(); ctx.restore();
  const k = sm(pr(t, c.stuck - 0.2, c.out + 0.6)); const P = k < 0.3 ? [-110 + 120 * k / 0.3, -140 + 80 * k / 0.3] : k < 0.9 ? [lerp(-200, 200, ((k - 0.3) / 0.6 * 6) % 2 < 1 ? ((k - 0.3) / 0.6 * 6) % 1 : 1 - ((k - 0.3) / 0.6 * 6) % 1), 20 + (k - 0.3) / 0.6 * 270] : [180, 300];
  ellP(P[0], P[1], 20, 16, '#3ac87a', { seed: 21713, lw: 2 });
  if (t > c.days - 0.2) { txt('1–3 дня', 260, 220, 50, { font: 'Inter Black', col: '#2a6a3a' }); txt('и наружу', 260, 274, 32, { font: 'Inter', weight: 800, col: '#4a4038' }); } pop();
}
function mythIns(t, c) {                                              // «7 лет» — миф; опасно только постоянно и помногу
  if (!c.fg) towelBg(21720, t); if (c.bg) return;
  push(540, 640, 1, 0.01); card(0, 0, 820, 460, 0, 21721, '#fbfaf2'); txt('7 ЛЕТ В ЖЕЛУДКЕ', 0, -60, 70, { font: 'Inter Black', col: '#1c1512', maxW: 760 });
  if (t > c.myth - 0.1) { push(0, 80, popK(t, c.myth - 0.1, 0.25), -0.08); rectP(-170, -56, 340, 112, 'rgba(0,0,0,0)', { raw: true, lc: '#c8243c', lw: 10, tex: false }); txt('МИФ', 0, 26, 90, { font: 'Inter Black', col: '#c8243c' }); pop(); }
  txt('детские гастроэнтерологи', 0, -170, 32, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 760 }); pop();
  if (t > c.problem - 0.2) { push(540, 1060, popK(t, c.problem - 0.2, 0.3), -0.01); card(0, 0, 820, 260, 0, 21722, '#ffe8c8'); txt('опасно, только если глотать', 0, -40, 40, { font: 'Inter Black', col: '#1c1512', maxW: 760 }); txt('постоянно и помногу', 0, 40, 48, { font: 'Inter Black', col: '#c8243c', maxW: 760 }); pop(); }
}
function coin(x, y, s) { ellP(x, y, 22 * s, 22 * s, '#d8b84a', { seed: 21730 + x, lw: 2 }); }
function pedIns(t, c) {                                               // Pediatrics, 1998: трое детей, жвачка горстями, у девочки — с монетками
  if (!c.fg) towelBg(21730, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 860, 760, 0, 21731, '#f6f1e4'); rectP(-430, -380, 860, 100, '#2a5aa8', { seed: 21732, line: false }); txt('PEDIATRICS · 1998', 0, -316, 46, { font: 'Inter Black', col: '#fbfaf2' });
  for (let i = 0; i < 3; i++) if (t > c.three - 0.2 + i * 0.15) personIcon(-240 + i * 240, -120, 1.1, '#3a4a5a', 21733 + i);
  txt('трое детей', 0, 20, 40, { font: 'Inter Black', col: '#1c1512' });
  if (t > c.handfuls - 0.1) { for (let i = 0; i < 6; i++) gumPack(-260 + i * 104, 110, 0.6, (i % 2 ? 0.2 : -0.15)); txt('жвачку — горстями', 0, 190, 34, { font: 'Inter', weight: 800, col: '#4a4038' }); }
  if (t > c.plug) txt('→ пробка внутри', 0, 250, 40, { font: 'Inter Black', col: '#c8243c' });
  if (t > c.coins - 0.2) { [-80, 0, 80].forEach((x, i) => coin(x - 200, 320, 1)); ellP(-200, 320, 60, 30, 'rgba(58,200,122,0.6)', { raw: true, lw: 2 }); txt('+ монетки', 120, 334, 38, { font: 'Inter Black', col: '#8a6a1a' }); } pop();
}
function redIns(t, c) {                                               // Американский Красный Крест, 2011: 50 лет исследований → еда не причина утоплений
  if (!c.fg) towelBg(21740, t); if (c.bg) return;
  push(540, 720, 1, 0.01); card(0, 0, 860, 680, 0, 21741, '#fbfaf2'); txt('Американский Красный Крест', 0, -270, 40, { font: 'Inter Black', col: '#c8243c', maxW: 800 }); txt('обзор 2011 года', 0, -210, 32, { font: 'Inter', weight: 800, col: '#4a4038' });
  const k = sm(pr(t, c.y50 - 0.4, c.y50 + 0.8)); for (let i = 0; i < 50; i++) if (i < 50 * k) rectP(-360 + (i % 10) * 74, -150 + Math.floor(i / 10) * 44, 60, 34, '#a8c8dc', { seed: 21742 + i, lw: 1.2 });
  if (k > 0.3) txt('50 лет исследований', 0, 110, 36, { font: 'Inter Black', col: '#1c1512' });
  if (t > c.notCause - 0.2) { txt('еда перед купанием —', 0, 190, 40, { font: 'Inter Black', col: '#1c1512', maxW: 800 }); txt('НЕ причина утоплений', 0, 250, 46, { font: 'Inter Black', col: '#2a6a3a', maxW: 800 }); } pop();
}
function safeIns(t, c) {                                              // что реально опасно
  if (!c.fg) towelBg(21750, t); if (c.bg) return;
  push(540, 740, 1, -0.01); card(0, 0, 880, 760, 0, 21751, '#fbfaf2'); txt('РЕАЛЬНО ОПАСНО', 0, -320, 50, { font: 'Inter Black', col: '#c8243c' });
  const R = [['плавать одному', c.alone, 0], ['там, где нет спасателей', c.noguard, 0], ['нырять в незнакомом месте', c.dive, 0], ['бутерброд перед водой', c.sandw, 1]];
  R.forEach(([s, t0, ok], i) => { if (t < t0 - 0.2) return; const y = -200 + i * 140, k = pr(t, t0 - 0.2, t0 + 0.2); if (ok) { check(-360, y, 0.8, k); txt(s + ' — нет', -300, y + 14, 40, { font: 'Inter Black', col: '#2a6a3a', align: 'left', maxW: 680 }); } else { stampX(-360, y, 0.6, k); txt(s, -300, y + 14, 42, { font: 'Inter Black', col: '#1c1512', align: 'left', maxW: 680 }); } }); pop();
}
