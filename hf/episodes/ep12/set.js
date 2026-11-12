/* Эп. 12 «Радиевые часы — заговор?» — декорация (ночная комната с находками с барахолки: окно с луной, комод с лампой, коробка старья) и вставки-коллажи. */

const GLOW = '#b8ff8a';
function watchP(x, y, s, rot, o = {}) {                              // старые часы на ремешке, цифры светятся
  push(x, y, s, rot);
  rectP(-26, -120, 52, 240, '#6a3e22', { seed: 12001, lw: 2, shade: () => { for (let i = 0; i < 4; i++) dot(0, 70 + i * 12, 3, '#3a2212'); } });
  ellP(0, 0, 62, 62, '#d6a84a', { seed: 12002, lw: 2.6 }); ellP(0, 0, 50, 50, '#1e2a22', { seed: 12003, lw: 1.6 });
  if (o.glow !== false) glowAdd(0, 0, 90, 'rgba(160,255,120,1)', 0.55 + 0.1 * Math.sin((o.t || 0) * 5));
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; dot(Math.sin(a) * 40, -Math.cos(a) * 40, i % 3 ? 3.5 : 6, GLOW); }
  stroke([[0, 0], [0, -30]], GLOW, 6); stroke([[0, 0], [20, 10]], GLOW, 6); dot(0, 0, 5, '#d6a84a');
  rectP(58, -8, 12, 16, '#d6a84a', { seed: 12004, lw: 1.4 });
  pop();
}
function mothPos(t) { return [990 + Math.cos(t * 2.3) * 110 + Math.sin(t * 5.1) * 25, 690 + Math.sin(t * 3.1) * 60 + Math.cos(t * 7.3) * 14]; }   // мотылёк кружит у лампы и у головы Тома
function moth(t) { const [mx, my] = mothPos(t), w = Math.abs(Math.sin(t * 30)) * 14 + 4;
  piece([[mx, my], [mx - 16, my - w], [mx - 20, my + 4]], '#e8dcc0', { seed: 12010, lw: 1.2 }); piece([[mx, my], [mx + 16, my - w], [mx + 20, my + 4]], '#e8dcc0', { seed: 12011, lw: 1.2 }); dot(mx, my, 3, '#6b5a3a'); }
function mugP(k, t) {                                                // кружка на краю комода: k 0..0.5 — Том толкает к краю, 0.5..1 — падает и бьётся
  let x = 940 + 50 * sm(k / 0.5), y = 984, r = 0;                    // стоит справа от Тома, падает с переднего края комода
  if (k > 0.5) { const f = clamp((k - 0.5) / 0.35); x += 30 * f; y = 984 + 556 * f * f; r = 2.4 * f; }
  if (k >= 0.86) { [[-50, -8, -0.6], [-10, -20, 0.3], [34, -6, 1.1], [60, -2, -0.2]].forEach(([dx, dy, rr], i) => { push(x + dx, 1530 + dy, 1, rr); piece([[-16, -10], [18, -14], [12, 10], [-14, 8]], i % 2 ? '#e2533a' : '#fbfaf6', { seed: 12030 + i, lw: 1.8 }); pop(); }); return; }
  push(x, y, 1, r); rectP(-30, -64, 60, 64, '#e2533a', { seed: 12031, lw: 2.2, shade: () => { txt('№1', 0, -30, 20, { font: 'Inter Black', col: '#fbfaf6' }); } }); ellP(38, -32, 14, 18, 'rgba(0,0,0,0)', { raw: true, lc: '#1c1512', lw: 6, tex: false }); pop();
}
function plateP(x, y) {                                              // тарелка с рыбкой перед Томом (ест)
  push(x, y); ellP(0, 0, 120, 26, '#fbfaf6', { seed: 12040, lw: 2.4, shade: () => { ellP(0, -4, 90, 16, '#e9e4d8', { seed: 12041, line: false }); } });
  piece([[-60, -14], [-20, -30], [40, -24], [64, -14], [40, -6], [-20, -4]], '#f08a7a', { seed: 12042, lw: 1.8 }); piece([[-60, -14], [-86, -30], [-82, 0]], '#e0705e', { seed: 12043, lw: 1.6 }); pop();
}

function nightSky(t) {                                               // за окном: шире самого окна — при параллаксе видно разное
  rectP(-260, 100, 1100, 1000, '#1e2450', { seed: 12110, line: false, shade: () => {
    [['#262c60', 100, 280], ['#2e3470', 380, 160], ['#3a3c7a', 540, 170], ['#4a4486', 710, 400]].forEach(([c, y, h], i) => rectP(-260, y, 1100, h, c, { seed: 12111 + i, line: false }));
    { const r = rng(12115); for (let i = 0; i < 44; i++) { const sx = -200 + r() * 1000, sy = 150 + r() * 440, tw = 0.5 + 0.5 * Math.sin(t * (2 + r() * 3) + i); dot(sx, sy, 2 + r() * 2.5, '#fff6d0', 0.4 + 0.6 * tw); } }
    glowAdd(390, 380, 220, 'rgba(220,230,255,1)', 0.55); ellP(390, 380, 64, 64, '#f4f0d8', { seed: 12116, line: false }); ellP(410, 366, 14, 12, '#ddd8bc', { seed: 12117, line: false }); ellP(372, 400, 10, 9, '#ddd8bc', { seed: 12118, line: false });
    [[160, 330, 1], [420, 470, 0.8], [260, 560, 0.7], [-60, 420, 0.9], [700, 300, 0.8]].forEach(([x, y, k], i) => { const dx = (t * 8 + i * 60) % 160 - 40; blobP([[-90, 16], [-50, -20], [0, -30], [60, -12], [90, 16]].map(([px, py]) => [x + dx + px * k, y + py * k]), '#6a6aa0', { seed: 12119 + i, lw: 1.4 }); });
    [[-200, 690, 150, '#1a1c3a'], [-60, 720, 120, '#22244a'], [60, 700, 140, '#1a1c3a'], [190, 640, 120, '#22244a'], [300, 720, 130, '#1a1c3a'], [420, 660, 120, '#25284e'], [540, 700, 150, '#1a1c3a'], [690, 650, 130, '#22244a']].forEach(([x, y, w, c], i) => { rectP(x, y, w, 1100 - y, c, { seed: 12125 + i, lw: 1.6 });
      for (let k = 0; k < 3; k++) for (let j = 0; j < 4; j++) { const lit = (k * 2 + j + i) % 4 === 0, fl = lit && (i * 7 + k + j) % 9 === 0 ? (Math.sin(t * 1.3 + i) > 0.6 ? 0 : 1) : 1; rectP(x + 14 + k * 38, y + 22 + j * 52, 22, 30, lit && fl ? '#ffd27a' : '#2e3058', { seed: 12140 + i * 12 + k * 4 + j, line: false }); if (lit && fl) glowAdd(x + 25 + k * 38, y + 37 + j * 52, 26, 'rgba(255,210,120,1)', 0.4); } });
    for (let i = 0; i < 3; i++) { const bx = -100 + ((t * 18 + i * 260) % 800), by = 260 + i * 50 + Math.sin(t * 2 + i) * 6, w = Math.sin(t * 9 + i) * 7; stroke([[bx - 12, by - w], [bx, by], [bx + 12, by - w]], '#141634', 3); }   // летучие мыши
  } });
}
function nightWall(t) {                                              // стена с проёмом окна (60..540 × 220..900)
  [[-300, -300, 1680, 520], [-300, 900, 1680, 700], [-300, 220, 360, 680], [540, 220, 840, 680]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#3e6a6e', { seed: 12100 + i * 3, line: false, step: 70 }));
  { const r = rng(12101); for (let y = -240; y < 1300; y += 110) for (let x = -260 + ((y / 110) % 2) * 70; x < 1380; x += 140) { if (x > 40 && x < 560 && y > 200 && y < 900) continue;
      push(x + (r() - 0.5) * 4, y, 1, 0); piece([[0, -26], [16, 0], [0, 26], [-16, 0]], '#4a7a7c', { seed: 12102 + ((x + y) & 63), line: false }); dot(0, 0, 4, '#6a9a92'); pop(); } }
  rectP(-300, 1290, 1680, 250, '#2c4a4e', { seed: 12103, lw: 2.2, shade: () => { for (let x = -260; x < 1380; x += 120) rectP(x, 1320, 90, 190, '#26444a', { seed: 12104 + x, lw: 1.6 }); } });
  rectP(-300, 1278, 1680, 18, '#c8b48a', { seed: 12105, lw: 2 });
  [[50, 210, 500, 24], [50, 210, 24, 700], [526, 210, 24, 700], [290, 210, 20, 700], [50, 540, 500, 20], [50, 886, 500, 24]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#d8c8a0', { seed: 12140 + i, lw: 2.2 }));
  ctx.save(); ctx.globalAlpha = 0.18; [[110, 280], [340, 600]].forEach(([x, y]) => { stroke([[x, y + 60], [x + 60, y]], '#ffffff', 12); }); ctx.restore();
  piece([[20, 190], [100, 190], [90, 700], [60, 900], [0, 900], [30, 700]], '#8a3a4a', { seed: 12150, lw: 2.2, shade: () => { [40, 70].forEach(x => stroke([[x, 210], [x - 6, 880]], '#6e2a3a', 6)); } });
  piece([[500, 190], [590, 190], [600, 700], [580, 900], [520, 900], [540, 700]], '#8a3a4a', { seed: 12151, lw: 2.2, shade: () => { [530, 560].forEach(x => stroke([[x, 210], [x + 6, 880]], '#6e2a3a', 6)); } });
  rectP(0, 176, 620, 16, '#5a3a2a', { seed: 12152, lw: 2 });
  // справа на стене: часы-ходики, клише-рамка, полка с находками (фотоаппарат, ваза, глобус)
  clicheFrame(1050, 330, 0.7, t);
  clockP(760, 330, 70, 2, 14, t);
  rectP(640, 560, 520, 20, '#6a4a2e', { seed: 12160, lw: 2 });
  push(700, 560); rectP(-44, -60, 88, 60, '#2a2a2a', { seed: 12161, lw: 2 }); ellP(0, -30, 22, 22, '#5a6a7a', { seed: 12162, lw: 1.6 }); dot(-6, -36, 5, '#cfe0f0'); rectP(-34, -74, 26, 14, '#2a2a2a', { seed: 12163, lw: 1.4 }); pop();
  push(830, 560); blobP([[-30, 0], [-36, -50], [-14, -90], [-18, -120], [18, -120], [14, -90], [36, -50], [30, 0]], '#4a8ac0', { seed: 12164, lw: 2, shade: () => { stroke([[-30, -50], [30, -50]], '#f2d24a', 6); } }); pop();
  push(960, 560); stroke([[0, 0], [0, -30]], '#6a4a2e', 6); ellP(0, -80, 50, 50, '#4a9a6a', { seed: 12165, lw: 2, shade: () => { blobP([[-30, -90], [-6, -110], [10, -80], [-10, -60]], '#d8c070', { seed: 12166, line: false }); blobP([[14, -70], [36, -84], [40, -60], [20, -50]], '#d8c070', { seed: 12167, line: false }); } }); pop();
  [['#8a3a2a', 0], ['#3a5a8a', 1], ['#c8a03a', 2]].forEach(([c, i]) => rectP(1050 + i * 26, 470 - (i % 2) * 14, 24, 90 + (i % 2) * 14, c, { seed: 12170 + i, lw: 1.6 }));
}
function nightMid(t, o = {}) {                                     // комната: комод с лампой и радио, пол, коврик, коробка с барахолки, миска
  rectP(-300, 1540, 1680, 700, '#5a3a2a', { seed: 12200, step: 60, shade: () => { for (let y = 1570; y < 2250; y += 56) { stroke([[-300, y], [1380, y]], '#4a2e20', 4); for (let x = -260 + ((y / 56) % 3) * 90; x < 1380; x += 280) stroke([[x, y], [x, y + 56]], '#4a2e20', 3); } } });
  rectP(-300, 1522, 1680, 22, '#c8b48a', { seed: 12201, lw: 2 });
  ellP(470, 1680, 420, 80, '#8a3a4a', { seed: 12202, lw: 2.4, shade: () => { ellP(470, 1680, 350, 60, '#c89a4a', { seed: 12203, line: false }); ellP(470, 1680, 280, 44, '#8a3a4a', { seed: 12204, line: false }); } });
  // комод (на нём сидит Том): ящики с ручками, лампа с абажуром, старое радио, стопка книг
  rectP(640, 1000, 500, 300, '#7a4a2e', { seed: 12180, lw: 2.6, shade: () => { [1030, 1120, 1210].forEach((y, i) => { rectP(664, y, 452, 74, '#8a5a36', { seed: 12181 + i, lw: 1.8 }); [780, 1000].forEach(x => ellP(x, y + 37, 12, 9, '#d6a84a', { seed: 12185 + i + x, lw: 1.2 })); }); } });
  rectP(620, 984, 540, 24, '#6a3e22', { seed: 12188, lw: 2.2 });
  rectP(660, 1300, 30, 230, '#5a3420', { seed: 12189, lw: 1.8 }); rectP(1090, 1300, 30, 230, '#5a3420', { seed: 12190, lw: 1.8 });
  push(1040, 984); rectP(-14, -120, 28, 120, '#c8b48a', { seed: 12191, lw: 1.6 }); ellP(0, -4, 40, 10, '#6a3e22', { seed: 12192, lw: 1.6 });
  piece([[-60, -120], [60, -120], [40, -200], [-40, -200]], '#e8c870', { seed: 12193, lw: 2.2, shade: () => { stroke([[-54, -132], [54, -132]], '#c8a050', 5); } }); pop();
  moth(t);
  push(690, 984); rectP(-70, -90, 140, 90, '#9a6a3a', { seed: 12194, lw: 2.2, shade: () => { ellP(-30, -46, 26, 26, '#c8b48a', { seed: 12195, lw: 1.4 }); for (let i = 0; i < 4; i++) stroke([[-52, -66 + i * 12], [-8, -66 + i * 12]], '#7a5a3a', 3); rectP(14, -70, 44, 20, '#f2e2b0', { seed: 12196, lw: 1.2 }); dot(36, -30, 7, '#5a3a2a'); } }); pop();
  // на полу: коробка с барахолки, миска Тома, коврик, доски
  push(o.boxX ?? 190, 1660, 0.8, -0.04); piece([[-150, -170], [150, -170], [140, 40], [-140, 40]], '#c8a06a', { seed: 12210, lw: 2.4, shade: () => {
    piece([[-150, -170], [-210, -230], [-90, -200]], '#b8905a', { seed: 12211, lw: 1.8 }); piece([[150, -170], [210, -240], [100, -205]], '#b8905a', { seed: 12212, lw: 1.8 });
    txt('БАРАХОЛКА', 0, -96, 34, { font: 'Inter Black', col: '#5a3a2a' }); txt('всё по $5', 0, -50, 26, { font: 'Inter', weight: 800, col: '#5a3a2a' }); } });
  rectP(-110, -300, 16, 150, '#8a6a4a', { seed: 12213, lw: 1.6 }); ellP(-102, -330, 40, 54, 'rgba(0,0,0,0)', { raw: true, lc: '#3a5a8a', lw: 8, tex: false });   // ракетка
  push(70, -200, 1, 0.2); piece([[-40, 0], [40, 0], [26, -70], [-26, -70]], '#3a8a7a', { seed: 12214, lw: 1.8 }); pop(); pop();   // абажур
  if (o.bowl !== false) { push(1220, 1600, 0.85); piece([[-100, -36], [100, -36], [78, 18], [-78, 18]], '#d8342c', { seed: 12220, lw: 2.4, shade: () => { stroke([[-88, -22], [88, -22]], '#f06a5a', 6); } }); txt('ТОМ', 0, -2, 26, { font: 'Inter Black', col: '#fbfaf6' }); pop(); }
  if (o.mug !== undefined) mugP(o.mug, t);
  if (o.claw) { ctx.save(); ctx.globalAlpha = 0.8 * o.claw; [0, 1, 2].forEach(k => stroke([[700 + k * 18, 600], [706 + k * 18, 600 + 380 * o.claw]], '#2a1a12', 5)); ctx.restore(); }   // следы когтей после неудачного прыжка
}
function nightFg(t) {                                                // передний план у самого объектива (размыт): угол стопки книг снизу слева, спинка кресла у правого края
  push(-120, 2020); [['#8a3a2a', 0], ['#3a5a8a', 1], ['#c8a03a', 2]].forEach(([c, i]) => rectP(-60 + i * 10, -60 - i * 50, 300 - i * 30, 50, c, { seed: 12260 + i, lw: 3 })); pop();
  push(1260, 1760, 1, 0.08); piece([[-110, -520], [60, -560], [120, 400], [-130, 400]], '#7a2a3a', { seed: 12270, lw: 3, shade: () => { for (let k = 0; k < 3; k++) dot(-80 + k * 45, -460, 9, '#d6a84a'); } }); pop();
}
function nightLight(t, fn) { lightmap('#bab4cc', () => {
  const fl = 0.85 + 0.05 * Math.sin(t * 13) * Math.sin(t * 7);
  radial(1060, 860, 820, 'rgba(255,214,150,1)', fl); radial(900, 1300, 520, 'rgba(255,230,190,1)', 0.35);
  cone(1040, 790, 1000, 1700, 700, 'rgba(255,220,160,1)', 0.25);
  radial(300, 560, 520, 'rgba(170,190,255,1)', 0.45); cone(300, 560, 520, 1700, 360, 'rgba(180,200,255,1)', 0.18);   // лунный свет из окна
  if (fn) fn(); });
  glowAdd(1040, 830, 160, 'rgba(255,220,150,1)', 0.35);
}

// ------------------------------------------------------------------ вставки
function benchBg(seed) {                                              // фон вставок: старый верстак с циферблатами и кисточками
  rectP(-100, -100, 1280, 2200, '#8a6040', { seed, line: false, step: 80 });
  for (let y = -60; y < 2100; y += 140) { rectP(-100, y, 1280, 8, '#6a4428', { seed: seed + 1 + y, line: false }); const r = rng(seed + y); for (let i = 0; i < 5; i++) { const x = r() * 1080, w = 80 + r() * 200; stroke([[x, y + 40 + r() * 60], [x + w, y + 44 + r() * 60]], '#7a5232', 4); } }
  [[120, 220], [960, 420], [140, 1560], [960, 1600]].forEach(([x, y], i) => { push(x, y, 0.9, i); ellP(0, 0, 60, 60, '#f2ead0', { seed: seed + 20 + i, lw: 2 }); for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; dot(Math.sin(a) * 44, -Math.cos(a) * 44, 4, '#9acf6a'); } pop(); });
  [[200, 1380, 0.6], [880, 260, -0.5]].forEach(([x, y, r], i) => { push(x, y, 1, r); rectP(-6, -90, 12, 150, '#c8a06a', { seed: seed + 30 + i, lw: 1.4 }); piece([[-8, -90], [8, -90], [0, -130]], '#2a2a2a', { seed: seed + 32 + i, lw: 1.2 }); pop(); });
  ctx.save(); const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(30,15,5,0.5)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function girlIcon(x, y, s, col, seed) { push(x, y, s); personIcon(0, 0, 1, col, seed); piece([[-38, -88], [38, -88], [44, -40], [-44, -40]], '#3a2a1a', { seed: seed + 5, lw: 2 }); pop(); }   // работница: силуэт с каре
function paintIns(t, c) {                                             // 1917, Нью-Джерси: лизнуть, макнуть, покрасить
  if (!c.fg) { benchBg(12300); }  if (c.bg) return;
  push(540, 520, 1); card(0, 0, 760, 330, -0.02, 12301, '#fbfaf6'); txt('1917 · НЬЮ-ДЖЕРСИ', 0, -110, 46, { font: 'Inter Black', col: '#1c1512', maxW: 700 });
  for (let i = 0; i < 5; i++) girlIcon(-240 + i * 120, 70, 0.75, ['#c8603a', '#3d7fc4', '#7aa66a', '#e2b04a', '#8a6a9c'][i], 12310 + i * 7); pop(); tape(540, 360, 150, -0.02, 12302);
  label(540, 740, 'краска с радием для циферблатов', 0, '#d9f0d2', 0.02, 34);
  const S = [['1', 'ЛИЗНУТЬ', c.lick], ['2', 'МАКНУТЬ', c.dip], ['3', 'ПОКРАСИТЬ', c.paint]];
  S.forEach(([n, w, t0], i) => { const k = popK(t, t0 - 0.12, 0.3); if (k <= 0) return; push(220 + i * 320, 1020, k, (i - 1) * 0.05); card(0, 0, 290, 230, 0, 12320 + i, i === 0 ? '#f4c6b8' : '#f6f1e4');
    txt(n + '/3', 0, -70, 40, { font: 'Inter Black', col: '#c8241c' }); txt(w, 0, 20, 44, { font: 'Inter Black', col: '#1c1512', maxW: 240 }); pop(); });
  if (t > c.lips) { push(540, 1250, 1, -0.03); ransom('КИСТОЧКУ — ГУБАМИ', 0, 0, 70, 12330, { reveal: pr(t, c.lips, c.lips + 0.3), pop: true }); pop(); }
}
function chemIns(t, c) {                                              // химики — щипцы и свинец; девушкам — «безвредно»
  if (!c.fg) { cork(); }  if (c.bg) return;
  push(300, 640, 1, -0.03); card(0, 0, 440, 640, 0, 12400, '#e6eef4'); txt('ХИМИКИ', 0, -260, 52, { font: 'Inter Black', col: '#1c1512', maxW: 380 });
  rectP(-150, -180, 300, 220, '#7a8494', { seed: 12401, lw: 2.4, shade: () => { txt('СВИНЕЦ', 0, 120 - 230, 34, { font: 'Inter Black', col: '#e6eef4' }); } });
  stroke([[-120, 120], [60, 200]], '#5a5a5a', 10); stroke([[-120, 150], [60, 210]], '#5a5a5a', 10); dot(80, 210, 14, GLOW); glowAdd(80, 210, 60, 'rgba(160,255,120,1)', 0.5);
  txt('щипцы', 0, 270, 34, { font: 'Inter', weight: 800, col: '#1c1512' }); pop(); pin(300, 330);
  const k = popK(t, c.girls - 0.15, 0.3);
  if (k > 0) { push(790, 680, k, 0.04); card(0, 0, 440, 640, 0, 12410, '#f4e6d8'); txt('ДЕВУШКИ', 0, -260, 52, { font: 'Inter Black', col: '#1c1512', maxW: 380 });
    girlIcon(0, -40, 1.3, '#c8603a', 12411); push(70, 110, 1, 0.5); rectP(-5, -70, 10, 110, '#c8a06a', { seed: 12412, lw: 1.4 }); dot(0, -76, 9, GLOW); pop(); txt('голыми руками', 0, 270, 32, { font: 'Inter', weight: 800, col: '#1c1512', maxW: 380 }); pop(); pin(790, 370); }
  if (t > c.safe) { push(540, 1180, 1, -0.03); ransom('«БЕЗВРЕДНО»', 0, 0, 100, 12420, { reveal: pr(t, c.safe, c.safe + 0.3), pop: true }); pop(); }
  if (t > c.useful) { push(560, 1330, 1, 0.03); ransom('ДАЖЕ ПОЛЕЗНО', 0, 0, 70, 12421, { reveal: pr(t, c.useful, c.useful + 0.3), pop: true }); pop(); }
}
function adsIns(t, c) {                                               // 1920-е: радий в пасте, креме, воде
  if (!c.fg) { bg('#e8d8b0', 12500); for (let y = 0; y < 1920; y += 64) stroke([[-100, y], [1180, y]], '#dccb9e', 3); }  if (c.bg) return;
  txt('РЕКЛАМА 1920-х', 540, 450, 64, { font: 'Inter Black', col: '#5a3a2a', maxW: 900 });
  const A = [[c.paste, 260, 'ЗУБНАЯ ПАСТА', 'с радием', () => { piece([[-110, -30], [90, -40], [110, 0], [90, 40], [-110, 30]], '#f2f2ea', { seed: 12510, lw: 2.2 }); rectP(-150, -30, 40, 60, '#d8342c', { seed: 12511, lw: 1.8 }); txt('RADIUM', -10, 4, 28, { font: 'Inter Black', col: '#3a7a3a' }); }],
    [c.cream, 540, 'КРЕМ', 'для сияния', () => { ellP(0, 20, 90, 30, '#f2e2c0', { seed: 12512, lw: 2 }); rectP(-90, -40, 180, 60, '#f6c8d8', { seed: 12513, lw: 2.2 }); ellP(0, -40, 90, 24, '#f8d8e4', { seed: 12514, lw: 2 }); }],
    [c.water, 820, 'ВОДА', 'для бодрости', () => { rectP(-40, -110, 80, 190, '#9ad0e0', { seed: 12515, lw: 2.2 }); rectP(-18, -140, 36, 32, '#5a3a2a', { seed: 12516, lw: 1.6 }); rectP(-40, -40, 80, 60, '#f2e2b0', { seed: 12517, lw: 1.4 }); txt('Ra', 0, -6, 30, { font: 'Inter Black', col: '#c8241c' }); }]];
  A.forEach(([t0, x, h, s, draw], i) => { const k = popK(t, t0 - 0.15, 0.3); if (k <= 0) return; push(x, 820 + (i % 2) * 60, k, (i - 1) * 0.06); card(0, 0, 260, 520, 0, 12520 + i, '#fbfaf6');
    push(0, -60); draw(); pop(); glowAdd(0, -60, 110, 'rgba(160,255,120,1)', 0.35); txt(h, 0, 120, 30, { font: 'Inter Black', col: '#1c1512', maxW: 220 }); txt(s, 0, 170, 26, { font: 'Inter', weight: 800, col: '#6b655c', maxW: 220 }); pop(); pin(x, 580 + (i % 2) * 60); });
  if (t > c.nails) { label(540, 1120, 'а ещё им красили ногти — для танцев', 0, '#d9f0d2', -0.02, 34); for (let i = 0; i < 5; i++) { dot(300 + i * 120, 1040, 14, GLOW); glowAdd(300 + i * 120, 1040, 50, 'rgba(160,255,120,1)', 0.5); } }
  if (t > c.healthW) { push(540, 1260, 1, -0.03); ransom('РАДИЙ = ЗДОРОВЬЕ?', 0, 0, 76, 12530, { reveal: pr(t, c.healthW, c.healthW + 0.3), pop: true }); pop(); }
}
function mollyIns(t, c) {                                             // Молли Маджиа, 24 года; «сифилис»
  if (!c.fg) { bg('#2a2e3a', 12600); }  if (c.bg) return;
  push(540, 700, 1, -0.02); card(0, 0, 640, 760, 0, 12601, '#efe6d2');
  rectP(-200, -320, 400, 380, '#b8ae98', { seed: 12602, lw: 2.2, shade: () => { girlIcon(0, -90, 2.0, '#6a5a4a', 12603); } });
  txt('МОЛЛИ МАДЖИА', 0, 130, 54, { font: 'Inter Black', col: '#1c1512', maxW: 580 }); txt('1898 – 1922 · 24 года', 0, 200, 36, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 580 }); pop(); tape(540, 330, 180, -0.02, 12604);
  const k = popK(t, c.diag - 0.1, 0.3);
  if (k > 0) { push(560, 1240, k, 0.04); card(0, 0, 820, 200, 0, 12610, '#fbfaf6'); txt('ДИАГНОЗ:', -230, -40, 36, { font: 'Inter', weight: 800, col: '#6b655c' }); txt('СИФИЛИС', 60, 30, 84, { font: 'Inter Black', col: '#c8241c', maxW: 600 }); pop(); }
  if (t > c.diag + 0.6) { push(860, 1110, 1, 0.1); ransom('?!', 0, 0, 120, 12611, { reveal: 1, pop: true }); pop(); }
}
function reportIns(t, c) {                                            // Гарвард: виноват радий vs отчёт для штата: «все здоровы»
  if (!c.fg) { cork(); }  if (c.bg) return;
  const k1 = popK(t, c.prof - 0.15, 0.3);
  if (k1 > 0) { push(300, 640, k1, -0.04); card(0, 0, 450, 600, 0, 12700, '#fbfaf6'); txt('ГАРВАРД, 1924', 0, -230, 40, { font: 'Inter Black', col: '#8a1c1c', maxW: 400 });
    for (let i = 0; i < 6; i++) stroke([[-170, -150 + i * 44], [150 - (i % 3) * 40, -150 + i * 44]], '#b8b0a0', 6);
    if (t > c.proved) { txt('ВИНОВАТ', 0, 160, 54, { font: 'Inter Black', col: '#1c1512', maxW: 400 }); txt('РАДИЙ', 0, 230, 64, { font: 'Inter Black', col: '#3a8a2a', maxW: 400 }); } pop(); pin(300, 350); }
  const k2 = popK(t, c.other - 0.15, 0.3);
  if (k2 > 0) { push(790, 700, k2, 0.05); card(0, 0, 450, 600, 0, 12710, '#e8f0e0'); txt('ОТЧЁТ В МИНТРУДА', 0, -230, 34, { font: 'Inter Black', col: '#1c1512', maxW: 400 });
    for (let i = 0; i < 6; i++) stroke([[-170, -150 + i * 44], [150 - (i % 2) * 60, -150 + i * 44]], '#b8c0a8', 6);
    if (t > c.allOk) { txt('«ВСЕ', 0, 160, 54, { font: 'Inter Black', col: '#1c1512' }); txt('ЗДОРОВЫ»', 0, 230, 64, { font: 'Inter Black', col: '#1c1512', maxW: 400 }); } pop(); pin(790, 410); }
  if (t > c.allOk + 0.3) { push(790, 920, 1, 0); stampX(0, 0, 1.6, popK(t, c.allOk + 0.3, 0.3)); pop(); push(540, 1250, 1, -0.03); ransom('ПОДДЕЛКА', 0, 0, 110, 12720, { reveal: pr(t, c.allOk + 0.3, c.allOk + 0.6), pop: true }); pop(); }
  label(540, 1080, 'компания отправила штату другой отчёт', 0, '#f4e6a8', -0.02, 32);
}
function courtIns(t, c) {                                             // 5 работниц, суд, по $10 000
  if (!c.fg) { benchBg(12800); }  if (c.bg) return;
  push(540, 560, 1, 0.02); card(0, 0, 860, 420, 0, 12801, '#fbfaf6'); txt('СУД · 1927–1928', 0, -150, 50, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
  for (let i = 0; i < 5; i++) { const k = popK(t, c.five + i * 0.08, 0.25); if (k > 0) { push(-300 + i * 150, 60, k); girlIcon(0, 0, 0.9, ['#c8603a', '#3d7fc4', '#7aa66a', '#e2b04a', '#8a6a9c'][i], 12810 + i * 7); pop(); } } pop(); tape(540, 350, 160, 0.02, 12802);
  if (t > c.rights) label(540, 860, 'их дело → право судиться за профболезни', 0, '#d9f0d2', -0.02, 34); else if (t > c.months) label(540, 860, 'жить им оставались месяцы', 0, '#f4c6b8', -0.02, 40);
  if (t > c.ten) { moneyStack(540, 1180, 1.1, t, c.ten); push(540, 1060, 1, -0.03); ransom('$10 000', 0, 0, 120, 12820, { reveal: pr(t, c.ten, c.ten + 0.3), pop: true }); pop(); label(540, 1330, 'каждой + $600 в год (мировое соглашение)', 0, '#fbfaf6', 0.01, 28); }
}
function halfIns(t, c) {                                              // 100 лет — ерунда, полураспад 1600 лет
  if (!c.fg) { bg('#1e2a22', 12900); { const r = rng(12901); for (let i = 0; i < 40; i++) dot(r() * 1080, r() * 1920, 2 + r() * 3, GLOW, 0.15 + 0.2 * Math.abs(Math.sin(t * 2 + i))); } }  if (c.bg) return;
  push(540, 1000, 1, 0); card(0, 0, 960, 520, 0, 12902, '#f6f1e4'); txt('ПОЛУРАСПАД РАДИЯ-226', 0, -200, 48, { font: 'Inter Black', col: '#1c1512', maxW: 900 });
  const kb = sm(pr(t, c.hundred - 0.1, c.thousand + 0.4)); rectP(-420, -80, 840, 70, '#e2ddd2', { seed: 12903, lw: 2 });
  rectP(-420, -80, 840 * 100 / 1600, 70, '#3d7fc4', { seed: 12904, lw: 2 }); if (kb > 0) rectP(-420 + 52, -80, (840 - 52) * kb, 70, '#7acf5a', { seed: 12905, lw: 2 });
  txt('100 лет', -330, 50, 36, { font: 'Inter Black', col: '#3d7fc4' }); txt('часы', -330, 96, 28, { font: 'Inter', weight: 800, col: '#6b655c' });
  if (t > c.thousand) { txt('1600 лет', 330, 50, 40, { font: 'Inter Black', col: '#3a8a2a' }); txt('половина радия', 300, 96, 28, { font: 'Inter', weight: 800, col: '#6b655c' }); }
  pop();
  watchP(540, 470, 2.2, -0.1, { t });
  if (t > c.hundred + 0.6) { const k = popK(t, c.hundred + 0.6, 0.3); push(540, 1185, k, 0.01); label(0, 0, 'за 100 лет распалось лишь ≈ 4 % радия', 0, '#d9f0d2', 0, 32); pop(); }
  if (t > c.thousand) { push(540, 1400, 1, -0.03); ransom('1600 ЛЕТ', 0, 0, 130, 12920, { reveal: pr(t, c.thousand, c.thousand + 0.4), pop: true }); pop(); }
}
function safetyIns(t, c) {                                            // что делать с такими часами: 3 пункта (сохраняют)
  if (!c.fg) { benchBg(12950); watchP(540, 330, 1.7, 0.1, { t }); }  if (c.bg) return;
  push(540, 560, 1, -0.02); card(0, 0, 860, 110, 0, 12951, '#fbfaf6'); txt('НАШЁЛ СВЕТЯЩИЕСЯ ЧАСЫ?', 0, 4, 52, { font: 'Inter Black', col: '#1c1512', maxW: 800 }); pop();
  const P = [['1/3', 'НЕ ВСКРЫВАЙ КОРПУС', c.s1], ['2/3', 'КРАСКУ НЕ ТРОГАЙ', c.s2], ['3/3', 'СТРЕЛКИ ДО 1960-х = РАДИЙ', c.s3]];
  P.forEach(([n, w, t0], i) => { const k = popK(t, t0 - 0.12, 0.3); if (k <= 0) return; push(540 + (i % 2 ? 20 : -20), 730 + i * 160, k, (i - 1) * 0.02); card(0, 0, 900, 130, 0, 12952 + i, i === 1 ? '#f4c6b8' : '#f6f1e4');
    txt(n, -380, 8, 44, { font: 'Inter Black', col: '#c8241c' }); txt(w, 60, 8, 50, { font: 'Inter Black', col: '#1c1512', maxW: 700 }); pop(); });
  if (t > c.inside) label(540, 1230, 'опасно, если краска попадёт внутрь', 0, '#d9f0d2', 0.02, 34);
  label(540, 1330, 'Health Physics Society: просто держать в руке — риск минимальный', 0, '#fbfaf6', -0.01, 26);
}

/* лента времени истории (информативная инфографика): где мы сейчас в 1917–1928 */
function timeline12(k, t) {
  const Y = [['1917', 'краска'], ['1920-е', 'реклама'], ['1922', 'Молли'], ['1924', 'отчёт'], ['1928', 'суд']], x0 = 140, x1 = 940, y = 300;   // ниже «чёлки» и интерфейса площадок
  push(0, 0); rectP(x0 - 60, y - 70, x1 - x0 + 120, 150, 'rgba(20,14,10,0.55)', { seed: 12990, line: false, tex: false });
  stroke([[x0, y], [x1, y]], '#f6f1e4', 8); if (k > 0) stroke([[x0, y], [lerp(x0, x1, k / 4), y]], '#b8ff8a', 10);
  Y.forEach(([yr, w], i) => { const x = lerp(x0, x1, i / 4), on = i === k, past = i < k;
    ellP(x, y, on ? 26 : 16, on ? 26 : 16, on ? '#b8ff8a' : past ? '#d6a84a' : '#6b655c', { seed: 12991 + i, lw: 2.2 });
    txt(yr, x, y - 40, on ? 34 : 26, { font: 'Inter Black', col: on ? '#b8ff8a' : '#f6f1e4' }); txt(w, x, y + 50, 22, { font: 'Inter', weight: 800, col: '#f6f1e4' }); });
  pop();
}
function pillowP(x, y, s, rot) {                                     // подушка (финал: «положу под подушку»)
  push(x, y, s, rot); blobP([[-120, -60], [0, -74], [120, -60], [132, 0], [120, 60], [0, 72], [-120, 60], [-132, 0]], '#f2ead8', { seed: 12995, lw: 2.6, shade: () => {
    stroke([[-90, -30], [90, -36]], '#d8cbb0', 5); for (let i = 0; i < 4; i++) dot(-60 + i * 40, 20, 6, '#8ab8d8'); } }); pop();
}
