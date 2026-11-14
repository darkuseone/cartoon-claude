/* Эп. 18 «Срок годности — развод?» — декорация: ночная контейнерная площадка во дворе панельки.
   Никита с огромным мешком «просрочки», Том сидит на крышке контейнера и доедает выпавшую колбасу; рядом — вздутая банка консервов.
   Тон серьёзный: ночь, жёлтый фонарь над площадкой, окна дома. 2.5D: небо и дом 2.4, двор 1.35, площадка 1.0, передний план 0.6. */

const BIN = '#2a6a4a', LAMP = '#ffcf7a';
const LID = 1135;                                                      // крышка контейнера (Том сидит: y = 1135 − 239)

function trashBag(x, y, s, rot, o = {}) {                             // мешок с «просрочкой»: торчат сыр, батон, молоко, яйца
  push(x, y, s, rot);
  if (o.items !== false) { piece([[-70, -150], [-10, -170], [-30, -110]], '#f2c84a', { seed: 18001, lw: 2, shade: () => [[-50, -148], [-34, -136]].forEach(([a, b]) => dot(a, b, 4, '#d8a82a')) });   // сыр
    rectP(-6, -200, 44, 100, '#fbfaf2', { seed: 18002, lw: 2, shade: () => { rectP(-6, -170, 44, 30, '#5ab8d8', { seed: 18003, line: false }); } });   // молоко
    piece(spline([[30, -160], [90, -190], [110, -170], [60, -130]], true, 4), '#e8b860', { raw: true, lw: 2 }); }                                    // батон
  piece(spline([[-110, -110], [110, -120], [140, 40], [80, 110], [-80, 112], [-140, 40]], true, 6), '#1c1c22', { raw: true, lw: 3, shade: () => {
    stroke([[-80, -60], [-40, 60]], '#34343e', 6); stroke([[60, -70], [90, 50]], '#34343e', 6); } });
  stroke([[-40, -118], [-10, -150], [20, -118]], '#1c1c22', 12); pop();
}
function sausage(x, y, s, rot, o = {}) { const b = o.bite ?? 0; push(x, y, s, rot);
  piece(spline([[-70 + 40 * b, -14], [60, -16], [76, 0], [60, 16], [-70 + 40 * b, 14]], true, 4), '#b8483a', { raw: true, lw: 2, shade: () => { [-20, 20].forEach(dx => dot(dx, -2, 4, '#e8c8b8')); } });
  stroke([[76, 0], [92, -10]], '#e8d8a8', 4); pop(); }
function drumstick(x, y, s, rot) { push(x, y, s, rot); piece(spline([[-50, -30], [10, -40], [40, -10], [10, 30], [-50, 26], [-70, 0]], true, 6), '#e8b070', { raw: true, lw: 2.2, shade: () => stroke([[-40, -10], [0, -18]], '#f2d0a0', 5) });
  stroke([[40, -6], [90, 10]], '#f2ead8', 12); ellP(96, 4, 12, 14, '#f2ead8', { seed: 18010, lw: 1.6 }); ellP(96, 18, 12, 12, '#f2ead8', { seed: 18011, lw: 1.6 }); pop(); }
function cookies(x, y, s, rot) { push(x, y, s, rot); rectP(-70, -40, 140, 80, '#2a6ac8', { seed: 18015, lw: 2, shade: () => { txt('ПЕЧЕНЬЕ', 0, -10, 18, { font: 'Inter Black', col: '#fbfaf2' }); rectP(-50, 10, 100, 18, '#fbfaf2', { seed: 18016, line: false }); txt('ЛУЧШЕ ДО', 0, 24, 12, { font: 'Inter Black', col: '#2a6ac8' }); } }); pop(); }
function bulgeCan(x, y, s, rot) { push(x, y, s, rot); piece(spline([[-36, -50], [0, -64], [36, -50], [44, 0], [36, 50], [0, 62], [-36, 50], [-44, 0]], true, 6), '#c8ccd4', { raw: true, lw: 2.4, shade: () => {
  rectP(-42, -24, 84, 48, '#c8483a', { seed: 18020, line: false }); txt('ТУШЁНКА', 0, 6, 14, { font: 'Inter Black', col: '#fbfaf2' }); } }); pop(); }
/* контейнер: o.open — крышка откинута назад */
function container(x0, x1, t, o = {}) {
  piece([[x0, LID + 10], [x1, LID + 10], [x1 - 14, 1540], [x0 + 14, 1540]], o.col ?? BIN, { seed: 18100 + x0, lw: 3, shade: () => {
    [x0 + 60, (x0 + x1) / 2, x1 - 60].forEach(x => stroke([[x, LID + 40], [x, 1510]], '#1e4e36', 8)); txt(o.label ?? 'ТБО', (x0 + x1) / 2, LID + 120, 34, { font: 'Inter Black', col: '#e8f2e0' }); } });
  [x0 + 40, x1 - 40].forEach((x, i) => ellP(x, 1548, 22, 22, '#1c1c1c', { seed: 18110 + i + x0, lw: 2 }));
  if (o.open) piece([[x0 - 6, LID + 10], [x1 + 6, LID + 10], [x1 - 6, LID - 200], [x0 + 6, LID - 200]], '#24583e', { seed: 18120 + x0, lw: 2.6 });
  else rectP(x0 - 8, LID - 6, x1 - x0 + 16, 22, '#24583e', { seed: 18121 + x0, lw: 2.6 });
}
/* ---------- небо и панелька (d 2.4) */
function nightBlock(t) {
  rectP(-400, -100, 1600, 1600, '#0f1630', { seed: 18200, line: false, shade: () => {
    [['#141c3a', 260, 260], ['#1a2446', 520, 200]].forEach(([c, y, h], i) => rectP(-400, y, 1600, h, c, { seed: 18201 + i, line: false }));
    ellP(820, 260, 60, 60, '#f2ead0', { seed: 18205, lw: 1.6 }); glowAdd(820, 260, 220, 'rgba(240,230,200,1)', 0.35);
    const r = rng(18206); for (let i = 0; i < 40; i++) dot(-380 + r() * 1460, 20 + r() * 380, 1.6 + r() * 1.4, '#e8eaf8', 0.4 + 0.4 * Math.abs(Math.sin(t * 2 + i)));
    rectP(-380, 420, 1500, 1100, '#3a3e4c', { seed: 18210, lw: 2.4, shade: () => {
      for (let k = 0; k < 14; k++) for (let j = 0; j < 9; j++) { const lit = (k * 7 + j * 3) % 5 === 0, x = -350 + k * 104, y = 450 + j * 110;
        rectP(x, y, 64, 70, lit ? (j % 2 ? '#ffd27a' : '#8ac8e8') : '#262a36', { seed: 18220 + k * 9 + j, lw: 1.2 }); if (lit) glowAdd(x + 32, y + 35, 40, 'rgba(255,200,120,1)', 0.3); }
      for (let k = 0; k < 15; k++) stroke([[-380 + k * 104 - 20, 420], [-380 + k * 104 - 20, 1500]], '#33374a', 3); } });
  } });
}
/* ---------- двор (d 1.35): забор, деревья, машина, детская горка */
function yard(t) {
  rectP(-400, 1100, 1800, 500, '#22283a', { seed: 18300, line: false });
  [[-200, 0.9], [1150, 1.0]].forEach(([x, s], i) => { push(x, 1100, s); stroke([[0, 0], [0, -420]], '#2a1e18', 26); blobP([[-160, -380], [-60, -560], [80, -580], [180, -420], [120, -300], [-120, -300]], '#1e3a2a', { seed: 18310 + i, lw: 2.2 }); pop(); });
  push(160, 1180); piece([[-150, -60], [-90, -120], [90, -120], [150, -60], [160, 10], [-160, 10]], '#5a2a3a', { seed: 18320, lw: 2.4, shade: () => { rectP(-80, -110, 150, 50, '#2a3a4a', { seed: 18321, lw: 1.6 }); } }); dot(-90, 14, 30, '#141414'); dot(90, 14, 30, '#141414'); pop();   // машина
  push(-260, 1160); stroke([[-40, 0], [-40, -160]], '#c8483a', 8); stroke([[40, 0], [40, -160]], '#c8483a', 8); stroke([[-40, -160], [120, 0]], '#e8b83a', 12); pop();   // горка
  for (let x = -380; x < 1400; x += 40) stroke([[x, 1100], [x, 1030]], '#3a3e4a', 5); stroke([[-400, 1040], [1400, 1040]], '#3a3e4a', 5);
}
/* ---------- площадка (d 1.0): навес, фонарь, контейнеры, коробки, объявление */
function pad(t, o = {}) {
  rectP(-400, 1530, 1800, 700, '#3a3a42', { seed: 18400, step: 60, shade: () => { for (let x = -380; x < 1400; x += 200) stroke([[x, 1530], [x - 40, 2230]], '#30303a', 4); ellP(380, 1700, 220, 40, '#2e2e36', { seed: 18401, line: false, a: 0.6 }); } });
  rectP(520, 760, 820, 780, '#5a5a62', { seed: 18405, lw: 2.4, shade: () => { for (let y = 780; y < 1520; y += 60) stroke([[520, y], [1340, y]], '#4e4e56', 4);   // бетонная стенка
    push(700, 900, 1, -0.03); rectP(-110, -70, 220, 140, '#fbfaf2', { seed: 18406, lw: 2 }); txt('ВЫВОЗ', 0, -30, 30, { font: 'Inter Black', col: '#1c1512' }); txt('ПН · СР · ПТ', 0, 14, 24, { font: 'Inter Black', col: '#c8483a' }); txt('крупное — у стены', 0, 48, 16, { font: 'Inter', weight: 800, col: '#4a4038' }); pop();
    txt('НЕ СОРИТЬ', 1120, 880, 40, { font: 'Inter Black', col: '#c8d0d8' }); } });
  piece([[480, 720], [1380, 720], [1360, 770], [500, 770]], '#2a2e3a', { seed: 18410, lw: 2.4 });                                // навес
  push(470, 760); stroke([[0, 0], [0, 790]], '#2a2e3a', 12); stroke([[0, 10], [70, -20]], '#2a2e3a', 8); piece([[50, -30], [110, -30], [100, 0], [60, 0]], '#3a3e4a', { seed: 18411, lw: 1.6 }); ellP(80, 6, 22, 10, LAMP, { seed: 18412, lw: 1.4 });
  glowAdd(80, 6, 160 * (0.95 + 0.05 * Math.sin(t * 23)), 'rgba(255,210,130,1)', 0.8); pop();
  container(600, 920, t, { label: 'ТБО' }); container(940, 1260, t, { open: true, label: 'ТБО' });
  push(1310, 1460, 1, 0.08); rectP(-70, -90, 140, 100, '#b88a5a', { seed: 18420, lw: 2, shade: () => stroke([[-70, -60], [70, -60]], '#a07a4a', 4) }); pop();   // коробка
  if (o.bag) trashBag(o.bag[0], o.bag[1], 0.9, o.bag[2] ?? 0);
}
function padFg(t) { push(-150, 1990, 1, -0.05); rectP(-90, -520, 180, 560, '#1e4e36', { seed: 18500, lw: 3, shade: () => txt('ПЛАСТИК', 0, -300, 22, { font: 'Inter Black', col: '#c8e0d0' }) }); pop(); }   // край бака для пластика
function padLight(t, fn) { lightmap('#7880a0', () => {
  const f = 0.95 + 0.05 * Math.sin(t * 23); radial(550, 770, 900, 'rgba(255,200,120,1)', 1.0 * f); cone(550, 770, 650, 1600, 900, 'rgba(255,210,140,1)', 0.4 * f);
  radial(820, 300, 500, 'rgba(160,180,255,1)', 0.25);
  if (fn) fn(); });
}
function windowLook(t, wx, wy, z, o = {}) { cam25(540 + (wx - 540) * 2.4, 960 + (wy - 960) * 2.4, z, { focus: 2.4, dof: 0, shake: o.shake ?? 0 }); plane(0, 2.4, () => nightBlock(t)); }

// ------------------------------------------------------------------ вставки: гофрокартон
function boxBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#b88a5a', { seed, line: false, step: 80, shade: () => { for (let x = -100; x < 1200; x += 26) stroke([[x, -100], [x, 2100]], '#a87a4a', 4); } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,220,160,0.1)'); g.addColorStop(1, 'rgba(20,10,0,0.55)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
  tape(200, 220, 260, -0.1, seed + 2); tape(880, 1700, 240, 0.12, seed + 3);
}
function labelsIns(t, c) {                                            // «употребить до» = безопасность / «лучше употребить до» = качество
  if (!c.fg) boxBg(18710, t); if (c.bg) return;
  push(540, 560, 1, -0.02); card(0, 0, 820, 380, 0, 18711, '#fbfaf2'); rectP(-410, -190, 820, 80, '#c8243c', { seed: 18712, line: false });
  txt('«УПОТРЕБИТЬ ДО»', 0, -136, 46, { font: 'Inter Black', col: '#fbfaf2', maxW: 760 }); txt('БЕЗОПАСНОСТЬ', 0, -40, 52, { font: 'Inter Black', col: '#c8243c' });
  if (t > c.meat - 0.1) txt('мясо · рыба · молочка', 0, 30, 40, { font: 'Inter', weight: 800, col: '#1c1512', maxW: 760 });
  if (t > c.risk) { push(0, 110, popK(t, c.risk, 0.25), -0.04); txt('после даты — не рискуй', 0, 0, 38, { font: 'Inter Black', col: '#c8243c', maxW: 760 }); pop(); } pop();
  if (t > c.better - 0.2) { push(540, 1020, popK(t, c.better - 0.2, 0.3), 0.02); card(0, 0, 820, 380, 0, 18713, '#fbfaf2'); rectP(-410, -190, 820, 80, '#2a8a4a', { seed: 18714, line: false });
    txt('«ЛУЧШЕ УПОТРЕБИТЬ ДО»', 0, -136, 42, { font: 'Inter Black', col: '#fbfaf2', maxW: 760 }); txt('КАЧЕСТВО', 0, -40, 52, { font: 'Inter Black', col: '#2a8a4a' });
    if (t > c.cookie - 0.1) txt('печенье мягче · крупа суше', 0, 30, 38, { font: 'Inter', weight: 800, col: '#1c1512', maxW: 760 });
    if (t > c.canEat) { push(0, 110, popK(t, c.canEat, 0.25), 0.03); txt('есть можно', 0, 0, 44, { font: 'Inter Black', col: '#2a8a4a' }); pop(); } pop(); }
}
function usIns(t, c) {                                                // США: обязательная дата — только на детской смеси
  if (!c.fg) boxBg(18720, t); if (c.bg) return;
  push(540, 700, 1, 0.01); card(0, 0, 860, 640, 0, 18721, '#fbfaf2'); txt('КТО СТАВИТ ДАТУ?', 0, -250, 50, { font: 'Inter Black', col: '#1c1512' });
  personIcon(-260, -60, 1.3, '#3a4a5a', 18722); txt('сам производитель', 120, -70, 40, { font: 'Inter Black', col: '#1c1512', maxW: 460 });
  if (t > c.formula - 0.3) { push(-260, 170); rectP(-60, -90, 120, 180, '#fbfaf2', { seed: 18723, lw: 2.4, shade: () => { rectP(-60, -50, 120, 60, '#f2a8c8', { seed: 18724, line: false }); txt('BABY', 0, -12, 26, { font: 'Inter Black', col: '#fbfaf2' }); } }); pop();
    txt('США: закон требует дату', 120, 130, 34, { font: 'Inter Black', col: '#1c1512', maxW: 480 }); txt('только на детской смеси', 120, 180, 34, { font: 'Inter Black', col: '#c8243c', maxW: 480 }); } pop();
  if (t > c.guess) { push(540, 1160, popK(t, c.guess, 0.3), -0.03); ransom('ОСТАЛЬНОЕ — ПРИКИДКА', 0, 0, 74, 18725, { reveal: 1, pop: true }); pop(); }
  label(540, 1290, 'NRDC и Гарвардская школа права, «The Dating Game», 2013', 0, '#f4e6a8', 0.01, 24);
}
function euIns(t, c) {                                                // ЕС: до 10 % из 88 млн т пищевых отходов — из-за путаницы с датами
  if (!c.fg) boxBg(18730, t); if (c.bg) return;
  push(540, 720, 1, -0.01); card(0, 0, 880, 680, 0, 18731, '#fbfaf2'); txt('ПИЩЕВЫЕ ОТХОДЫ ЕС В ГОД', 0, -270, 40, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  const k = sm(pr(t, c.pct - 0.4, c.pct + 0.6)); for (let i = 0; i < 50; i++) { const x = -340 + (i % 10) * 76, y = -180 + Math.floor(i / 10) * 74, red = i >= 45 && k > (i - 45) / 5;
    rectP(x - 30, y - 30, 60, 60, red ? '#c8243c' : '#4a4a56', { seed: 18733 + i, lw: 1.6 }); }
  txt('88 млн тонн', -200, 230, 46, { font: 'Inter Black', col: '#1c1512' }); if (k > 0.2) txt('до 10 % — из-за дат', 190, 230, 40, { font: 'Inter Black', col: '#c8243c', maxW: 420 }); pop();
  if (t > c.nine) { push(540, 1210, popK(t, c.nine, 0.3), 0.03); ransom('≈ 9 МЛН ТОНН ЕДЫ', 0, 0, 84, 18732, { reveal: 1, pop: true }); pop(); }
  label(540, 1340, 'исследование для Еврокомиссии, 2018', 0, '#f4e6a8', -0.01, 26);
}
function fruit(x, y, s, col, seed) { push(x, y, s); ellP(0, 0, 40, 40, col, { seed, lw: 2 }); stroke([[0, -38], [6, -56]], '#5a3a1a', 5); blobP([[6, -50], [30, -64], [24, -44]], '#3a8a4a', { seed: seed + 1, lw: 1.4 }); pop(); }
function ukIns(t, c) {                                                // Британия: сети убрали «лучше до» с сотен фруктов и овощей
  if (!c.fg) boxBg(18740, t); if (c.bg) return;
  push(540, 700, 1, 0.01); card(0, 0, 880, 620, 0, 18741, '#fbfaf2'); txt('БРИТАНИЯ: «ЛУЧШЕ ДО» — УБРАЛИ', 0, -250, 38, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  [['#c8243c', -280], ['#f2a83a', -120], ['#7ac85a', 40], ['#e8c84a', 200], ['#c8243c', 340]].forEach(([col, x], i) => { fruit(x, -110, 1.3, col, 18742 + i * 3); if (t > c.uk + i * 0.12) stampX(x + 30, -60, 0.4, 1); });
  [['Tesco', '2018'], ['M&S', '300+ товаров, 2022'], ['Sainsbury’s', '1500+ позиций']].forEach(([a, b], i) => { if (t < c.removed - 0.2 + i * 0.25) return; txt(a, -330, 40 + i * 70, 38, { font: 'Inter Black', col: '#2a6ac8', align: 'left' }); txt(b, 360, 40 + i * 70, 32, { font: 'Inter', weight: 800, col: '#4a4038', align: 'right', maxW: 440 }); });
  pop();
  if (t > c.look) { push(540, 1170, popK(t, c.look, 0.3), -0.03); ransom('СМОТРИ НА ПРОДУКТ', 0, 0, 80, 18750, { reveal: 1, pop: true }); pop(); }
}
function ruleIns(t, c) {                                              // как понять: правило на холодильник
  if (!c.fg) boxBg(18760, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 880, 820, 0, 18761, '#fbfaf2'); txt('ПРАВИЛО НА ХОЛОДИЛЬНИК', 0, -350, 42, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  const R = [['«Употребить до» прошло', 'в мусор, даже если пахнет нормально', '#c8243c', c.r1, 0], ['«Лучше до» прошло', 'смотри · нюхай · пробуй чуть-чуть', '#2a8a4a', c.r2, 1], ['Банка вздулась', 'сразу в мусор, при любой дате', '#c8243c', c.r3, 0]];
  R.forEach(([a, b, col, t0, ok], i) => { if (t < t0 - 0.2) return; const y = -230 + i * 200, k = pr(t, t0 - 0.2, t0 + 0.2); if (ok) check(-360, y + 10, 0.8, k); else stampX(-360, y + 10, 0.6, k);
    txt(a, -300, y, 40, { font: 'Inter Black', col, align: 'left', maxW: 680 }); txt(b, -300, y + 56, 32, { font: 'Inter', weight: 800, col: '#4a4038', align: 'left', maxW: 680 }); });
  pop();
}
