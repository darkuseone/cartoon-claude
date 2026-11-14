/* Эп. 14 «Бриллиант — это навсегда?» — декорация: ночная квартира в дождь, ужин-репетиция при свечах (Никита делает предложение «на Томе»),
   за окном через улицу — неон «ЛОМБАРД 24» и билборд «НАВСЕГДА». Тон серьёзнее: тёмная палитра, свечи, неон, дождь. 2.5D: небо 2.4, стена 1.35, комната 1.0, передний план 0.6. */

const GOLD = '#d6a84a', VELVET = '#7a1424';
/* футляр с кольцом: open 0..1 — крышка, glint — искра на камне */
function ringBox(x, y, s, rot, o = {}) {
  const op = clamp(o.open ?? 1), t = o.t ?? 0;
  push(x, y, s, rot);
  piece([[-62, -6], [62, -6], [58, 46], [-58, 46]], VELVET, { seed: 14001, lw: 2.6, shade: () => { stroke([[-58, 8], [58, 8]], '#5a0e1a', 4); } });
  rectP(-50, -14, 100, 16, '#4a0c16', { seed: 14002, lw: 1.8 });                                   // бархатная подушечка
  if (op > 0.05) {
    ellP(0, -14, 26, 30, 'rgba(0,0,0,0)', { raw: true, lc: GOLD, lw: 7, tex: false });             // кольцо
    piece([[-16, -46], [16, -46], [24, -36], [0, -18], [-24, -36]], '#eaf6ff', { seed: 14003, lw: 2, shade: () => { stroke([[-16, -46], [0, -18]], '#b8d8ec', 2); stroke([[16, -46], [0, -18]], '#b8d8ec', 2); stroke([[-24, -36], [24, -36]], '#b8d8ec', 2); } });
    const tw = (o.glint ?? 1) * (0.5 + 0.5 * Math.sin(t * 6)); if (tw > 0.1) { const L = 26 * tw; glowAdd(6, -40, 50, 'rgba(220,240,255,1)', 0.6 * tw);
      piece([[6, -40 - L], [9, -43], [6 + L, -40], [9, -37], [6, -40 + L], [3, -37], [6 - L, -40], [3, -43]], '#ffffff', { raw: true, line: false, tex: false }); }
  }
  push(0, -6, 1, 0); const lh = 40 * (1 - op) + 8;                                                  // крышка: открыта — стоит вертикально сзади, закрыта — сверху
  if (op > 0.05) piece([[-62, 0], [62, 0], [58, -lerp(10, 62, op)], [-58, -lerp(10, 62, op)]], '#6a1020', { seed: 14004, lw: 2.4, shade: () => { piece([[-48, -6], [48, -6], [44, -lerp(8, 52, op)], [-44, -lerp(8, 52, op)]], '#f2e8d8', { seed: 14005, line: false, a: 0.85 }); } });
  else piece([[-64, 2], [64, 2], [60, -lh], [-60, -lh]], VELVET, { seed: 14006, lw: 2.6 });
  pop(); pop();
}
function receiptP(x, y, s, rot) { push(x, y, s, rot); piece([[-40, -90], [40, -90], [42, 70], [30, 62], [18, 72], [6, 62], [-6, 72], [-18, 62], [-30, 72], [-42, 64]], '#fbfaf6', { seed: 14010, lw: 1.8, shade: () => {
  for (let i = 0; i < 6; i++) stroke([[-28, -64 + i * 18], [i % 2 ? 10 : 28, -64 + i * 18]], '#9a9488', 3); txt('$', -20, 48, 26, { font: 'Inter Black', col: '#1c1512' }); stroke([[0, 46], [30, 46]], '#1c1512', 4); } }); pop(); }

/* ---------- за окном (d 2.4): дождливая ночь через улицу */
function nightCity(t, o = {}) {
  rectP(-300, 60, 1300, 1500, '#141a2e', { seed: 14100, line: false, shade: () => {
    [['#1a2240', 60, 260], ['#202a4a', 320, 200], ['#28304e', 520, 200]].forEach(([c, y, h], i) => rectP(-300, y, 1300, h, c, { seed: 14101 + i, line: false }));
    [[-260, 520, 200, '#0e1222'], [-40, 470, 180, '#121630'], [150, 560, 230, '#0c1020'], [400, 430, 200, '#101428'], [620, 520, 220, '#0e1222']].forEach(([x, y, w, c], i) => {
      rectP(x, y, w, 1500 - y, c, { seed: 14110 + i, lw: 1.6 });
      for (let k = 0; k < 4; k++) for (let j = 0; j < 7; j++) { const lit = (k * 3 + j * 2 + i) % 5 === 0; if (lit) { rectP(x + 20 + k * 44, y + 30 + j * 60, 24, 34, '#e8b860', { seed: 14120 + i * 30 + k * 7 + j, line: false }); glowAdd(x + 32 + k * 44, y + 47 + j * 60, 26, 'rgba(240,180,90,1)', 0.35); } } });
    // билборд «НАВСЕГДА ♦» на крыше напротив
    push(470, 330); stroke([[-120, 70], [-120, 140]], '#2a2a30', 8); stroke([[120, 70], [120, 140]], '#2a2a30', 8);
    rectP(-170, -70, 340, 140, '#0e1424', { seed: 14140, lw: 3 }); const fl = Math.sin(t * 1.7) > -0.9 ? 1 : 0.4;
    glowAdd(0, 0, 220, 'rgba(140,200,255,1)', 0.35 * fl); txt('НАВСЕГДА', -20, 10, 44, { font: 'Inter Black', col: fl > 0.5 ? '#d8f0ff' : '#5a7088' });
    piece([[118, -22], [148, -22], [158, -8], [133, 22], [108, -8]], fl > 0.5 ? '#d8f0ff' : '#5a7088', { seed: 14141, lw: 1.6 }); pop();
    // неон «ЛОМБАРД 24» на первом этаже
    push(190, 760); rectP(-150, -50, 300, 100, '#1a0e18', { seed: 14150, lw: 2.4 }); const nf = (Math.sin(t * 9) > -0.7 || Math.sin(t * 2.3) > 0) ? 1 : 0.25;
    glowAdd(0, 0, 240, 'rgba(255,60,140,1)', 0.45 * nf); txt('ЛОМБАРД 24', 0, 10, 40, { font: 'Inter Black', col: nf > 0.5 ? '#ff7ab8' : '#6a2a48' }); pop();
    glowAdd(560, 900, 160, 'rgba(255,200,120,1)', 0.4); stroke([[560, 900], [560, 1300]], '#2a2a30', 10);   // фонарь
    ctx.save(); ctx.globalAlpha = 0.35; const r = rng(14160); for (let i = 0; i < 70; i++) { const x = -280 + r() * 1260, y = ((r() * 1500 + t * 900 * (0.8 + r() * 0.4)) % 1450) + 60; stroke([[x, y], [x - 6, y + 34]], '#a8b8d8', 2); } ctx.restore();   // дождь
  } });
}
/* ---------- стена (d 1.35) с проёмом окна 120..600 × 240..980 */
function aptWall(t, o = {}) {
  [[-300, -300, 1700, 540], [-300, 980, 1700, 600], [-300, 240, 420, 740], [600, 240, 800, 740]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#26304a', { seed: 14200 + i * 3, line: false, step: 70 }));
  for (let x = -280; x < 1400; x += 64) if (!(x > 110 && x < 610)) stroke([[x, -300], [x, 1300]], '#2c3854', 10); else { stroke([[x, -300], [x, 236]], '#2c3854', 10); stroke([[x, 984], [x, 1300]], '#2c3854', 10); }
  rectP(-300, 1240, 1700, 300, '#3a2418', { seed: 14210, lw: 2.2, shade: () => { for (let x = -280; x < 1400; x += 130) rectP(x, 1262, 100, 250, '#33200f', { seed: 14211 + x, lw: 1.6 }); } });
  rectP(-300, 1228, 1700, 16, GOLD, { seed: 14212, lw: 1.6 });
  // окно: стекло с каплями, рама, тяжёлые шторы
  ctx.save(); ctx.globalAlpha = 0.5; const r = rng(14220); for (let i = 0; i < 26; i++) { const x = 130 + r() * 460, y0 = 250 + r() * 700, y = y0 + ((t * 40 * (0.3 + r())) % 120); dot(x, y, 4 + r() * 4, '#c8d8f0'); stroke([[x, y - 26], [x, y]], '#a8b8d8', 2); } ctx.restore();
  [[110, 230, 500, 22], [110, 230, 22, 760], [588, 230, 22, 760], [348, 230, 16, 760], [110, 600, 500, 16], [110, 970, 500, 26]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#1c1612', { seed: 14230 + i, lw: 2.2 }));
  piece([[40, 200], [150, 200], [130, 600], [160, 1000], [30, 1000], [70, 600]], '#5a1424', { seed: 14240, lw: 2.4, shade: () => { [70, 110].forEach(x => stroke([[x, 220], [x - 8, 980]], '#3e0c18', 7)); } });
  piece([[560, 200], [680, 200], [650, 600], [700, 1000], [570, 1000], [600, 600]], '#5a1424', { seed: 14241, lw: 2.4, shade: () => { [600, 640].forEach(x => stroke([[x, 220], [x + 8, 980]], '#3e0c18', 7)); } });
  rectP(10, 186, 700, 16, '#1c1612', { seed: 14242, lw: 2 });
  // на стене: календарь с обведённым сердцем 14-м числом, картина, бра
  push(830, 390, 1, 0.02); rectP(-90, -100, 180, 200, '#f2ead8', { seed: 14250, lw: 2 }); rectP(-90, -100, 180, 40, '#7a1424', { seed: 14251, lw: 1.6 }); txt('НОЯБРЬ', 0, -80, 20, { font: 'Inter Black', col: '#f2ead8' });
  for (let i = 0; i < 20; i++) rectP(-76 + (i % 5) * 32, -48 + Math.floor(i / 5) * 34, 26, 26, '#e2d8c4', { seed: 14252 + i, line: false });
  push(-12, -14); piece([[0, 8], [-16, -6], [-10, -16], [0, -10], [10, -16], [16, -6]], '#d8243c', { seed: 14275, lw: 1.4 }); pop(); pop();
  push(1110, 420, 1, -0.02); rectP(-110, -130, 220, 260, '#3a2a1a', { seed: 14280, lw: 3, shade: () => { rectP(-90, -110, 180, 220, '#4a5a6a', { seed: 14281, line: false }); blobP([[-90, 60], [-30, 0], [20, 30], [90, -20], [90, 110], [-90, 110]], '#2a3a3a', { seed: 14282, line: false }); ellP(40, -50, 22, 22, '#e8d8a8', { seed: 14283, line: false }); } }); pop();
  push(690, 600); piece([[-30, -40], [30, -40], [20, 10], [-20, 10]], '#e8c890', { seed: 14290, lw: 2 }); rectP(-6, 10, 12, 30, GOLD, { seed: 14291, lw: 1.4 }); glowAdd(0, -10, 120, 'rgba(255,200,130,1)', 0.45); pop();
}
/* ---------- комната (d 1.0): пол, ковёр, стол со скатертью, свечи, роза, тарелки, пакет ювелирного с чеком */
function candle(x, y, t, h = 120) { rectP(x - 12, y - h, 24, h, '#f2ead8', { seed: 14300 + x, lw: 2 }); const f = 1 + 0.15 * Math.sin(t * 13 + x) * Math.sin(t * 7);
  piece([[x, y - h - 40 * f], [x + 10, y - h - 10], [x, y - h + 2], [x - 10, y - h - 10]], '#ffd27a', { raw: true, lw: 1.4 }); dot(x, y - h - 12, 5, '#fff6d8'); glowAdd(x, y - h - 18, 90, 'rgba(255,190,110,1)', 0.7); }
function aptMid(t, o = {}) {
  rectP(-300, 1530, 1700, 700, '#3a2618', { seed: 14400, step: 60, shade: () => { for (let y = 1560; y < 2250; y += 54) { stroke([[-300, y], [1400, y]], '#2c1c10', 4); for (let x = -260 + ((y / 54) % 3) * 80; x < 1400; x += 240) stroke([[x, y], [x, y + 54]], '#2c1c10', 3); } } });
  rectP(-300, 1512, 1700, 20, '#1c1612', { seed: 14401, lw: 2 });
  ellP(420, 1690, 400, 76, '#5a1424', { seed: 14402, lw: 2.4, shade: () => { ellP(420, 1690, 340, 58, '#7a2a34', { seed: 14403, line: false }); ellP(420, 1690, 270, 42, '#5a1424', { seed: 14404, line: false }); } });
  // стол со скатертью
  rectP(650, 1080, 30, 450, '#2a1a10', { seed: 14410, lw: 1.8 }); rectP(1120, 1080, 30, 450, '#2a1a10', { seed: 14411, lw: 1.8 });
  piece([[620, 990], [1180, 990], [1196, 1150], [1150, 1170], [1100, 1150], [1040, 1172], [980, 1150], [920, 1172], [860, 1150], [800, 1172], [740, 1150], [680, 1170], [606, 1150]], '#f2ece0', { seed: 14412, lw: 2.4, shade: () => { [700, 820, 940, 1060].forEach(x => stroke([[x, 1000], [x + 10, 1160]], '#ddd4c4', 5)); } });
  candle(700, 994, t); candle(1130, 994, t, 100);
  push(1040, 994); piece([[-16, 0], [16, 0], [10, -70], [-10, -70]], 'rgba(200,230,240,0.6)', { raw: true, lw: 2, tex: false });   // ваза с розой
  const pet = o.rose ?? 1; stroke([[0, -60], [4, -150]], '#2f6a3a', 5); blobP([[-18, -40 - 110], [0, -60 - 110], [18, -40 - 110], [12, -20 - 110], [-12, -20 - 110]].map(([a, b]) => [a * pet, b]), '#c8243c', { seed: 14420, lw: 1.8 }); pop();
  ellP(780, 1004, 70, 14, '#fbfaf6', { seed: 14430, lw: 1.8 });
  // пакет ювелирного с чеком (на полу у стола)
  push(1010, 1540, 0.9, 0.05); piece([[-70, -140], [70, -140], [76, 0], [-76, 0]], '#1c1a22', { seed: 14440, lw: 2.4, shade: () => { txt('JEWELRY', 0, -60, 22, { font: 'Inter Black', col: GOLD }); } });
  stroke([[-40, -140], [-30, -190], [30, -190], [40, -140]], GOLD, 5); receiptP(30, -170, 0.6, 0.25); pop();
}
function aptFg(t) {                                                   // передний план у объектива (размыт): угол стула снизу слева
  push(-150, 1980, 1, -0.06); rectP(-60, -460, 70, 520, '#1c1210', { seed: 14500, lw: 3 }); rectP(-60, -460, 300, 60, '#1c1210', { seed: 14501, lw: 3 }); pop();
}
function aptLight(t, fn) { lightmap('#a49cb4', () => {
  [[700, 856], [1130, 876]].forEach(([x, y]) => radial(x, y, 620, 'rgba(255,190,120,1)', 0.85 + 0.06 * Math.sin(t * 11 + x)));
  radial(690, 600, 500, 'rgba(255,200,140,1)', 0.45);
  radial(360, 640, 640, 'rgba(120,150,255,1)', 0.4); radial(240, 860, 420, 'rgba(255,80,160,1)', 0.22 * (Math.sin(t * 9) > -0.7 ? 1 : 0.3));   // луна/город и неон ломбарда
  cone(360, 620, 520, 1800, 420, 'rgba(140,160,240,1)', 0.16);
  if (fn) fn(); });
}
/* «взгляд в окно»: дальний план крупно + рама поверх (неон ломбарда, билборд «НАВСЕГДА») */
function windowLook(t, wx, wy, z, o = {}) {
  cam25(540 + (wx - 540) * 2.4, 960 + (wy - 960) * 2.4, z, { focus: 2.4, dof: 0, shake: o.shake ?? 0 });
  plane(0, 2.4, () => nightCity(t));
  ctx.save(); ctx.globalAlpha = 0.5; const r = rng(14600); for (let i = 0; i < 30; i++) { const x = r() * 1080, y = (r() * 1920 + t * 60 * (0.3 + r())) % 1920; dot(x, y, 6 + r() * 6, '#c8d8f0'); stroke([[x, y - 40], [x, y]], '#a8b8d8', 3); } ctx.restore();   // капли на стекле
  [[160, -40, 40, 2000], [-40, 1200, 1200, 40]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#1c1612', { seed: 14610 + i, lw: 3 }));
}

// ------------------------------------------------------------------ вставки: тёмный бархат ювелирной витрины
function velvetBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#16121c', { seed, line: false, step: 80 });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(90,30,50,0.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
  const r = rng(seed + 1); for (let i = 0; i < 22; i++) { const x = r() * 1080, y = r() * 1920, k = 0.5 + 0.5 * Math.sin((t || 0) * 3 + i * 1.7); dot(x, y, 2 + r() * 2, '#eaf6ff', 0.15 + 0.35 * k); }
}
function gem(x, y, s, col = '#eaf6ff') { push(x, y, s); piece([[-40, -20], [-20, -40], [20, -40], [40, -20], [0, 40]], col, { seed: 14700, lw: 2.4, shade: () => { stroke([[-40, -20], [40, -20]], '#a8c8dc', 2); stroke([[-20, -40], [0, 40]], '#a8c8dc', 2); stroke([[20, -40], [0, 40]], '#a8c8dc', 2); } }); pop(); }
function cartelIns(t, c) {                                            // ~80 % продаж алмазов у De Beers почти весь XX век + «кран» по чуть-чуть
  if (!c.fg) velvetBg(14710, t); if (c.bg) return;
  push(540, 700, 1, -0.01); card(0, 0, 860, 560, 0, 14711, '#f6f1e4'); txt('ДОЛЯ ПРОДАЖ АЛМАЗОВ В МИРЕ', 0, -230, 40, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
  const k = sm(pr(t, c.share - 0.6, c.share + 0.6)); ctx.save(); ctx.lineCap = 'butt'; ctx.lineWidth = 70 / S;
  ctx.strokeStyle = '#d8d0c0'; ctx.beginPath(); ctx.arc(-200, 40, 140, 0, 6.283); ctx.stroke(); ctx.strokeStyle = GOLD; ctx.beginPath(); ctx.arc(-200, 40, 140, -1.571, -1.571 + 6.283 * 0.8 * k); ctx.stroke(); ctx.restore();
  txt(Math.round(80 * k) + '%', -200, 56, 62, { font: 'Inter Black', col: '#1c1512' });
  txt('De Beers', 160, -10, 50, { font: 'Inter Black', col: '#8a6a1a', maxW: 360 }); txt('почти весь XX век', 160, 50, 32, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 360 }); pop();
  push(540, 1150, 1, 0.02); card(0, 0, 760, 230, 0, 14712, '#e8e2d4'); rectP(-330, -80, 200, 160, '#5a5a62', { seed: 14713, lw: 2.4, shade: () => { ellP(-230, 0, 46, 46, '#3a3a40', { seed: 14714, lw: 2 }); stroke([[-230, 0], [-200, -20]], GOLD, 6); } });
  stroke([[-130, 0], [-60, 0], [-60, 30]], '#5a5a62', 16); const dk = (t * 0.8) % 1; gem(-60, 50 + dk * 60, 0.35); txt('выпускали по чуть-чуть', 140, 10, 34, { font: 'Inter Black', col: '#1c1512', maxW: 400 }); pop();
  label(540, 1330, 'GIA: ~80 % продаж необработанных алмазов', 0, '#f4e6a8', 0.01, 28);
}
function sloganIns(t, c) {                                            // 1947: копирайтер пишет «Бриллиант — это навсегда»
  if (!c.fg) velvetBg(14720, t); if (c.bg) return;
  push(540, 760, 1, -0.02); card(0, 0, 780, 640, 0, 14721, '#fbfaf6');
  const S0 = 'БРИЛЛИАНТ —', S1 = 'ЭТО НАВСЕГДА', n = Math.floor(sm(pr(t, c.slogan - 0.1, c.slogan + 1.3)) * (S0.length + S1.length));
  txt(S0.slice(0, n), -320, -120, 64, { font: "'Courier 10 Pitch'", col: '#1c1512', align: 'left' }); txt(S1.slice(0, Math.max(0, n - S0.length)), -320, -30, 64, { font: "'Courier 10 Pitch'", col: '#1c1512', align: 'left' });
  for (let i = 0; i < 5; i++) stroke([[-320, 70 + i * 40], [200 - (i % 2) * 120, 70 + i * 40]], '#d8d0c0', 6); pop();
  if (t > c.y47) { push(800, 470, popK(t, c.y47, 0.3), 0.15); ransom('1947', 0, 0, 110, 14722, { reveal: 1, pop: true }); pop(); }
  label(540, 1170, 'копирайтер Фрэнсис Герети, агентство N.W. Ayer — для De Beers', 0, '#f4e6a8', 0.01, 28);
  label(540, 1250, '«слоган века» — Advertising Age, 1999', 0, '#fbfaf6', -0.01, 30);
}
function japanIns(t, c) {                                             // Япония: <5 % (1967) → ≈60 % (1981)
  if (!c.fg) velvetBg(14730, t); if (c.bg) return;
  push(540, 780, 1, 0); card(0, 0, 880, 760, 0, 14731, '#f6f1e4'); ellP(-330, -290, 34, 34, '#d8243c', { seed: 14732, lw: 2 });
  txt('ЯПОНИЯ: НЕВЕСТЫ С БРИЛЛИАНТОМ', 40, -280, 38, { font: 'Inter Black', col: '#1c1512', maxW: 660 });
  const B = [['1967', 0.05, '< 5 %', c.y67], ['1981', 0.6, '≈ 60 %', c.y81]];
  B.forEach(([yr, v, lab, t0], i) => { const k = sm(pr(t, t0 - 0.2, t0 + 0.8)); if (k <= 0) return; const x = -170 + i * 340, h = 680 * v * k + 6;
    rectP(x - 90, 260 - h, 180, h, i ? GOLD : '#9a9488', { seed: 14733 + i, lw: 2.4 }); txt(yr, x, 310, 40, { font: 'Inter Black', col: '#1c1512' }); txt(lab, x, 240 - h, 48, { font: 'Inter Black', col: i ? '#8a6a1a' : '#4a4038' }); });
  pop(); if (t > c.y81) { push(540, 1215, 1, -0.03); ransom('ЗА 14 ЛЕТ РЕКЛАМЫ', 0, 0, 64, 14736, { reveal: pr(t, c.y81, c.y81 + 0.4), pop: true }); pop(); }
  label(540, 1400, 'Э. Эпстайн, The Atlantic, 1982', 0, '#fbfaf6', 0.01, 28);
}
function salaryIns(t, c) {                                            // реклама 1980-х: «две зарплаты длились вечно»
  if (!c.fg) velvetBg(14740, t); if (c.bg) return;
  push(540, 760, 1, 0.02); card(0, 0, 820, 760, 0, 14741, '#efe2c4');
  txt('КАК СДЕЛАТЬ, ЧТОБЫ', 0, -280, 46, { font: 'Inter Black', col: '#3a2418', maxW: 740 }); txt('ДВЕ ЗАРПЛАТЫ', 0, -210, 62, { font: 'Inter Black', col: '#7a1424', maxW: 740 }); txt('ДЛИЛИСЬ ВЕЧНО?', 0, -140, 46, { font: 'Inter Black', col: '#3a2418', maxW: 740 });
  ringBox(0, 90, 2.0, 0, { open: 1, t }); txt('реклама, США, 1980-е', 0, 300, 30, { font: 'Inter', weight: 800, col: '#6b5a48' }); pop();
  if (t > c.forever) { push(540, 1240, 1, -0.03); ransom('ПРАВИЛО ИЗ РЕКЛАМЫ', 0, 0, 72, 14742, { reveal: pr(t, c.forever, c.forever + 0.4), pop: true }); pop(); }
}
function resaleIns(t, c) {                                            // магазин 100 % → ломбард «хорошо если треть»
  if (!c.fg) velvetBg(14750, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 860, 600, 0, 14751, '#f6f1e4'); txt('СКОЛЬКО ВЕРНЁТСЯ', 0, -230, 46, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
  const k = sm(pr(t, c.third - 0.4, c.third + 0.6)); [['МАГАЗИН', 1, '100 %', '#7a1424'], ['ЛОМБАРД', lerp(1, 0.33, k), k > 0.5 ? '≤ 33 %' : '…', GOLD]].forEach(([n, v, p, col], i) => {
    const y = -110 + i * 170; txt(n, -380, y, 36, { font: 'Inter Black', col: '#1c1512', align: 'left' }); rectP(-380, y + 24, 600 * v, 70, col, { seed: 14752 + i, lw: 2.2 }); txt(p, 330, y + 72, 48, { font: 'Inter Black', col, maxW: 140 }); });
  pop(); label(540, 1150, 'ломбарды и скупка: обычно 20–40 % от цены в магазине', 0, '#f4e6a8', -0.01, 28);
}
function labIns(t, c) {                                               // добытый = выращенный (тот же углерод) · FTC 2018 · De Beers Lightbox $800/карат
  if (!c.fg) velvetBg(14760, t); if (c.bg) return;
  push(540, 700, 1, 0); card(0, 0, 900, 560, 0, 14761, '#f6f1e4');
  gem(-220, -80, 2.2); gem(220, -80, 2.2); txt('ДОБЫТЫЙ', -220, 80, 40, { font: 'Inter Black', col: '#1c1512' }); txt('ВЫРАЩЕННЫЙ', 220, 80, 40, { font: 'Inter Black', col: '#1c1512', maxW: 360 });
  if (t > c.carbon) { txt('=', 0, -60, 110, { font: 'Inter Black', col: GOLD }); txt('C — тот же углерод, та же решётка', 0, 180, 32, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 820 }); } pop();
  if (t > c.ftc) label(540, 1060, 'FTC, 2018: выращенный — тоже алмаз', 0, '#d9f0d2', -0.02, 34);
  if (t > c.price) { push(540, 1210, popK(t, c.price, 0.3), 0.03); ransom('$800 ЗА КАРАТ', 0, 0, 96, 14762, { reveal: 1, pop: true }); pop(); label(540, 1340, 'Lightbox — бренд самой De Beers, 2018', 0, '#fbfaf6', 0.01, 28); }
}
/* лента истории (цвета серии: бархат и золото) */
function timeline14(k, t) {
  const Y = [['XX век', '80 % рынка'], ['1947', 'слоган'], ['1967→81', 'Япония'], ['1980-е', '2 зарплаты'], ['2018', '$800/карат']], x0 = 140, x1 = 940, y = 300;
  rectP(x0 - 70, y - 70, x1 - x0 + 140, 150, 'rgba(40,10,22,0.85)', { seed: 14990, line: false, tex: false });
  stroke([[x0, y], [x1, y]], '#6b5a48', 8); if (k > 0) stroke([[x0, y], [lerp(x0, x1, k / 4), y]], GOLD, 10);
  Y.forEach(([yr, w], i) => { const x = lerp(x0, x1, i / 4), on = i === k, past = i < k;
    ellP(x, y, on ? 26 : 16, on ? 26 : 16, on ? '#f2e8d8' : past ? GOLD : '#4a3a3a', { seed: 14991 + i, lw: 2.2 });
    txt(yr, x, y - 40, on ? 32 : 24, { font: 'Inter Black', col: on ? '#f2e8d8' : '#c8b898' }); txt(w, x, y + 50, 22, { font: 'Inter', weight: 800, col: '#c8b898' }); });
}
