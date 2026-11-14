/* Эп. 16 «Свинцовый бензин — заговор?» — декорация: дедов гараж на закате. Старая вишнёвая «Волга»-седан боком, Том греется на капоте,
   Никита с дедовой канистрой «ЭТИЛИРОВАННЫЙ · ЯДОВИТ». Ворота открыты: за ними ряд гаражей, закатное небо в смоге, заправка через дорогу.
   Тон серьёзный: тёплая лампочка без абажура + холодные сумерки. 2.5D: небо 2.4, стена 1.35, гараж 1.0, передний план 0.6. */

const CHERRY = '#8a1c24', CHROME = '#d8dce0', RUST = '#a8582a', BULB = '#ffd88a';
const HOOD = 1165;                                                     // верх капота (Том сидит: y = 1165 − 239)

/* канистра: o.open — крышка откинута */
function jerrycan(x, y, s, rot, o = {}) {
  push(x, y, s, rot);
  piece([[-62, 0], [62, 0], [62, 170], [-62, 170]], '#a8241c', { seed: 16001, lw: 2.6, shade: () => {
    piece([[-48, 20], [48, 20], [48, 150], [-48, 150]], '#8a1c16', { seed: 16002, line: false, a: 0.5 }); stroke([[-48, 30], [48, 150]], '#7a1810', 6); stroke([[48, 30], [-48, 150]], '#7a1810', 6);
    rectP(-50, 54, 100, 64, '#f2e8c8', { seed: 16003, lw: 1.6 }); txt('ЭТИЛИРОВАН.', 0, 76, 13, { font: 'Inter Black', col: '#1c1512', maxW: 88 }); txt('ЯДОВИТ', 0, 104, 18, { font: 'Inter Black', col: '#c8241c', maxW: 88 }); } });
  [-36, 0, 36].forEach(dx => rectP(dx - 12, -26, 24, 30, '#a8241c', { seed: 16004 + dx, lw: 2 }));                 // ручка
  rectP(-44, -30, 88, 12, '#a8241c', { seed: 16008, lw: 2 });
  if (o.open) { push(46, 0, 1, -0.8 * o.open); rectP(-10, -26, 22, 26, '#6a6a70', { seed: 16009, lw: 1.6 }); pop(); } else rectP(36, -24, 24, 24, '#6a6a70', { seed: 16010, lw: 1.6 });
  pop();
}
function car(t, o = {}) {                                             // вишнёвый седан 60-х боком, нос влево
  const lamp = o.lamp ?? 0;
  piece([[500, 1300], [520, 1210], [560, HOOD], [900, HOOD - 14], [1010, 960], [1360, 950], [1460, 1150], [1460, 1430], [500, 1430]], CHERRY, { seed: 16100, lw: 3, shade: () => {
    piece([[920, HOOD - 30], [1018, 985], [1180, 978], [1180, HOOD - 30]], '#2a3a4a', { seed: 16101, lw: 2.4, shade: () => { stroke([[960, HOOD - 40], [1030, 1000]], '#6a8aa8', 5, { a: 0.6 }); } });   // стекло
    piece([[1200, 978], [1340, 976], [1420, HOOD - 30], [1200, HOOD - 30]], '#2a3a4a', { seed: 16102, lw: 2.4 });
    stroke([[520, 1270], [1460, 1270]], CHROME, 8); stroke([[560, HOOD + 6], [900, HOOD - 8]], '#a8242c', 6);
    rectP(1050, 1250, 60, 12, CHROME, { seed: 16103, lw: 1.4 }); ellP(1010, 1220, 40, 26, '#7a161c', { seed: 16104, line: false, a: 0.4 });
    blobP([[980, 1360], [1040, 1340], [1120, 1356], [1090, 1400], [1000, 1404]], RUST, { seed: 16105, line: false, a: 0.6 });   // ржавчина
  } });
  ellP(536, 1236, 30, 34, CHROME, { seed: 16110, lw: 2.4, shade: () => ellP(536, 1236, 20, 24, lamp > 0 ? '#fff6c8' : '#c8d0d8', { seed: 16111, line: false }) }); if (lamp > 0) glowAdd(520, 1236, 160, 'rgba(255,240,180,1)', 0.6 * lamp);
  rectP(470, 1320, 160, 34, CHROME, { seed: 16112, lw: 2.2 });                                                              // бампер
  [700, 1300].forEach((x, i) => { piece([[x - 130, 1440], [x - 110, 1360], [x + 110, 1360], [x + 130, 1440]], '#5a1016', { seed: 16120 + i, line: false });
    ellP(x, 1468, 96, 96, '#1c1a1c', { seed: 16122 + i, lw: 3, shade: () => { ellP(x, 1468, 52, 52, CHROME, { seed: 16124 + i, lw: 2 }); dot(x, 1468, 12, '#6a6e74'); } }); });
}
/* ---------- за воротами (d 2.4): закат в смоге, ряд гаражей, заправка, трасса */
function duskSky(t, o = {}) {
  rectP(-400, -100, 1600, 1600, '#3a2a4a', { seed: 16200, line: false, shade: () => {
    [['#4a2c50', 120, 260], ['#8a3a4a', 380, 200], ['#d8643a', 580, 160], ['#f2a85a', 740, 120]].forEach(([c, y, h], i) => rectP(-400, y, 1600, h, c, { seed: 16201 + i, line: false }));
    ellP(300, 800, 110, 110, '#ffd27a', { seed: 16205, line: false }); glowAdd(300, 800, 380, 'rgba(255,180,90,1)', 0.5);
    ctx.save(); ctx.globalAlpha = 0.35; for (let i = 0; i < 5; i++) blobP([[-400, 640 + i * 40], [100 + i * 60 + 30 * Math.sin(t * 0.3 + i), 600 + i * 40], [600, 650 + i * 40], [1200, 610 + i * 40], [1200, 700 + i * 40], [-400, 720 + i * 40]], '#8a7a6a', { seed: 16210 + i, line: false }); ctx.restore();   // смог
    stroke([[-400, 520], [1200, 470]], '#1c1418', 3); stroke([[-400, 560], [1200, 520]], '#1c1418', 3); [[-200, 400], [600, 400]].forEach(([x, y]) => { stroke([[x, y], [x, 1100]], '#1c1418', 12); stroke([[x - 60, y + 30], [x + 60, y + 30]], '#1c1418', 8); });   // ЛЭП
    rectP(-400, 900, 1600, 600, '#2a2024', { seed: 16220, line: false });
    for (let i = 0; i < 9; i++) { const x = -380 + i * 180; rectP(x, 900, 170, 240, i % 2 ? '#4a4a52' : '#545a62', { seed: 16221 + i, lw: 2, shade: () => { stroke([[x + 10, 930], [x + 160, 930]], '#3a3a40', 4); for (let k = 0; k < 6; k++) stroke([[x + 14, 960 + k * 28], [x + 156, 960 + k * 28]], '#3e3e46', 3); } }); }   // ряд гаражей
    push(820, 760); stroke([[0, 0], [0, 300]], '#2a2a30', 12); rectP(-120, -100, 240, 110, '#1a1a1e', { seed: 16240, lw: 2.4 }); const f = Math.sin(t * 7) > -0.8 ? 1 : 0.3;   // заправка
    glowAdd(0, -45, 220, 'rgba(255,120,60,1)', 0.45 * f); txt('БЕНЗИН', 0, -36, 40, { font: 'Inter Black', col: f > 0.5 ? '#ffb07a' : '#6a3a2a' }); pop();
    for (let i = 0; i < 3; i++) { const x = ((t * 120 + i * 520) % 1800) - 500; push(x, 1330); rectP(-80, -40, 160, 40, ['#3a5a8a', '#8a6a2a', '#5a2a3a'][i], { seed: 16250 + i, lw: 2 }); rectP(-50, -70, 90, 34, '#2a3a4a', { seed: 16253 + i, lw: 1.6 }); dot(-60, 4, 16, '#1c1a1c'); dot(60, 4, 16, '#1c1a1c');
      ctx.save(); ctx.globalAlpha = 0.4; ellP(-120 - 30 * ((t * 2 + i) % 1), -10, 40, 22, '#8a8478', { seed: 16256 + i, line: false }); ctx.restore(); pop(); }   // машины с выхлопом
  } });
}
/* ---------- стена (d 1.35): проём ворот 40..500 × 280..1160, перфощит с инструментом, полка, лампочка */
function gWall(t, o = {}) {
  [[-300, -300, 1700, 580], [-300, 1160, 1700, 500], [-300, 280, 340, 880], [500, 280, 900, 880]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#3c3a40', { seed: 16300 + i * 3, line: false, step: 70 }));
  for (let y = -280; y < 1300; y += 44) for (let x = -300 + ((y / 44) % 2) * 50; x < 1400; x += 100) if (!(x > 0 && x < 520 && y > 250 && y < 1170)) rectP(x + 3, y + 3, 94, 38, ((x / 100 + y / 44) & 3) ? '#46424a' : '#4e4850', { seed: 16310 + ((x * 3 + y) & 511), line: false });   // кирпич
  [[30, 270, 480, 18], [30, 270, 18, 900], [494, 270, 18, 900]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#2a2a30', { seed: 16330 + i, lw: 2.2 }));
  push(270, 268); rectP(-240, -60, 480, 60, '#6a6e74', { seed: 16335, lw: 2.2, shade: () => { for (let k = 0; k < 3; k++) stroke([[-230, -48 + k * 18], [230, -48 + k * 18]], '#545a60', 4); } }); pop();   // поднятые ворота
  // перфощит с инструментами
  rectP(580, 420, 520, 400, '#8a6a4a', { seed: 16340, lw: 2.4, shade: () => { for (let y = 440; y < 810; y += 30) for (let x = 600; x < 1090; x += 30) dot(x, y, 3, '#5a4430');
    stroke([[640, 480], [640, 640]], '#6a6e74', 10); rectP(620, 460, 40, 30, '#c8241c', { seed: 16341, lw: 1.6 });                                    // отвёртка
    stroke([[720, 470], [760, 640]], '#6a6e74', 12); ellP(716, 470, 22, 18, '#6a6e74', { seed: 16342, lw: 1.6 });                                     // ключ
    piece([[820, 480], [880, 480], [870, 520], [860, 640], [840, 640], [830, 520]], '#3a3a40', { seed: 16343, lw: 1.6 }); rectP(810, 470, 80, 20, '#c8a03a', { seed: 16344, lw: 1.4 });   // молоток
    ellP(980, 560, 70, 70, 'rgba(0,0,0,0)', { raw: true, lc: '#1c1a1c', lw: 12, tex: false });                                                          // шланг
    for (let i = 0; i < 4; i++) rectP(620 + i * 40, 700, 26, 80, ['#6a6e74', '#c8a03a', '#3a5a8a', '#6a6e74'][i], { seed: 16345 + i, lw: 1.4 }); } });
  rectP(1120, 560, 200, 16, '#5a4430', { seed: 16350, lw: 2 }); [[1150, '#3a6a3a'], [1200, '#c8a03a'], [1260, '#3a5a8a']].forEach(([x, c], i) => rectP(x - 20, 480, 44, 80, c, { seed: 16351 + i, lw: 1.6 }));   // масло
  push(1180, 360, 1, 0.03); rectP(-100, -120, 200, 240, '#f2e8c8', { seed: 16360, lw: 2 }); rectP(-100, -120, 200, 60, '#c8241c', { seed: 16361, line: false });   // календарь 1991
  txt('1991', 0, -78, 34, { font: 'Inter Black', col: '#f2e8c8' }); for (let i = 0; i < 20; i++) rectP(-80 + (i % 5) * 34, -40 + Math.floor(i / 5) * 36, 26, 26, '#e2d8bc', { seed: 16362 + i, line: false }); pop();
  push(860, 340, 1, -0.03); rectP(-110, -60, 220, 120, '#f2c83a', { seed: 16385, lw: 2.2 }); txt('АИ-76', 0, -8, 46, { font: 'Inter Black', col: '#1c1512' }); txt('ЭТИЛИРОВАННЫЙ', 0, 36, 18, { font: 'Inter Black', col: '#8a1c16' }); pop();   // старый плакат
}
function bulb(t) { stroke([[640, -300], [640, 250]], '#1c1a1c', 4); rectP(626, 250, 28, 26, '#3a3a40', { seed: 16390, lw: 1.6 }); const sw = 1 + 0.06 * Math.sin(t * 17) * Math.sin(t * 3);
  ellP(640, 300, 26, 32, BULB, { seed: 16391, lw: 1.8 }); glowAdd(640, 300, 200 * sw, 'rgba(255,210,140,1)', 0.8); }
function gMid(t, o = {}) {
  rectP(-300, 1540, 1700, 700, '#4a4a4e', { seed: 16400, step: 60, shade: () => { for (let x = -300; x < 1400; x += 260) stroke([[x, 1540], [x - 60, 2240]], '#3e3e42', 4);
    blobP([[150, 1640], [260, 1626], [380, 1650], [330, 1676], [190, 1672]], '#323236', { seed: 16401, line: false, a: 0.5 }); } });                 // масляное пятно
  rectP(-300, 1525, 1700, 18, '#2a2a2e', { seed: 16402, lw: 1.6 });
  [0, 1, 2].forEach(i => ellP(60, 1530 - i * 60, 120, 38, '#1c1a1c', { seed: 16410 + i, lw: 2.4, shade: () => ellP(60, 1530 - i * 60, 60, 16, '#2e2c2e', { seed: 16413 + i, line: false }) }));   // стопка шин
  push(150, 1540); rectP(-40, -90, 80, 90, '#3a6a3a', { seed: 16420, lw: 2, shade: () => txt('М-8', 0, -40, 18, { font: 'Inter Black', col: '#f2e8c8' }) }); pop();
  car(t, o);
  bulb(t);
}
function gFg(t) { push(-140, 2000, 1, -0.05); rectP(-80, -480, 280, 520, '#2a1c18', { seed: 16500, lw: 3, shade: () => { rectP(-60, -460, 240, 30, '#c8241c', { seed: 16501, line: false }); } }); pop(); }   // тележка с инструментом
function gLight(t, fn) { lightmap('#9890a8', () => {
  const sw = 1 + 0.06 * Math.sin(t * 17) * Math.sin(t * 3);
  radial(640, 320, 900, 'rgba(255,200,130,1)', 0.95 * sw); cone(640, 320, 600, 1600, 900, 'rgba(255,200,130,1)', 0.35 * sw);
  radial(260, 760, 700, 'rgba(255,140,90,1)', 0.55); cone(270, 700, 200, 1700, 520, 'rgba(255,150,100,1)', 0.25);           // закат из ворот
  if (fn) fn(); });
}
function windowLook(t, wx, wy, z, o = {}) {
  cam25(540 + (wx - 540) * 2.4, 960 + (wy - 960) * 2.4, z, { focus: 2.4, dof: 0, shake: o.shake ?? 0 });
  plane(0, 2.4, () => duskSky(t));
  [[-40, -40, 70, 2000], [-40, -40, 1200, 60]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#2a2a30', { seed: 16610 + i, lw: 3 }));
}

// ------------------------------------------------------------------ вставки: гаражный перфощит
function pegBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#4a3a2c', { seed, line: false, step: 80, shade: () => { for (let y = -80; y < 2100; y += 46) for (let x = -80; x < 1180; x += 46) dot(x, y, 4, '#2e241a'); } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,190,120,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0.35)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function newsCard(x, y, w, h, rot, seed, head) { push(x, y, 1, rot); card(0, 0, w, h, 0, seed, '#efe6d0'); txt(head, 0, -h / 2 + 50, 34, { font: "'Courier 10 Pitch'", col: '#1c1512', maxW: w - 60 }); stroke([[-w / 2 + 30, -h / 2 + 80], [w / 2 - 30, -h / 2 + 80]], '#1c1512', 3); pop(); }
function bayIns(t, c) {                                               // 1924, Бэйуэй (Нью-Джерси): 5 погибших, остальных увозили с галлюцинациями, «бешеный газ»
  if (!c.fg) pegBg(16710, t); if (c.bg) return;
  newsCard(540, 760, 880, 760, -0.01, 16711, 'THE NEW YORK TIMES · 1924');
  push(540, 760, 1, -0.01); push(-230, -170); rectP(-140, -40, 280, 160, '#6a6e74', { seed: 16712, lw: 2.4 }); [-90, -20, 50].forEach((x, i) => rectP(x, -140, 40, 100, '#5a5e64', { seed: 16713 + i, lw: 2 }));
  for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i * 0.33) % 1; ctx.save(); ctx.globalAlpha = 0.6 * (1 - u); ellP(-70 + i * 70 + 20 * u, -150 - 120 * u, 26 + 40 * u, 22 + 30 * u, '#9a9488', { seed: 16716 + i, line: false }); ctx.restore(); } pop();
  txt('Бэйуэй,', 200, -230, 46, { font: 'Inter Black', col: '#1c1512' }); txt('Нью-Джерси', 200, -176, 40, { font: 'Inter Black', col: '#1c1512' }); txt('завод присадки', 200, -124, 28, { font: 'Inter', weight: 800, col: '#6b5a48' });
  for (let i = 0; i < 5; i++) if (t > c.died - 0.2 + i * 0.12) { push(-300 + i * 150, 110); personIcon(0, 0, 0.85, '#3a3a40', 16720 + i); if (t > c.five) stampX(0, -10, 0.8, pr(t, c.five, c.five + 0.3)); pop(); }
  if (t > c.five) txt('5 погибших', 0, 230, 44, { font: 'Inter Black', col: '#a8241c' });
  if (t > c.halluc - 0.4) txt('десятки — в больницу, галлюцинации', 0, 300, 30, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 800 }); pop();
  if (t > c.nick) { push(540, 1280, popK(t, c.nick, 0.3), -0.03); ransom('«БЕШЕНЫЙ ГАЗ»', 0, 0, 110, 16725, { reveal: 1, pop: true }); pop(); }
}
function midgleyIns(t, c) {                                           // завод закрыли; Миджли облил руки и минуту нюхал — «безопасно»; а за год до этого сам лечился от свинца
  if (!c.fg) pegBg(16730, t); if (c.bg) return;
  if (t < c.inventor - 0.1) { push(540, 760, 1, 0.02); card(0, 0, 760, 400, 0, 16731, '#efe6d0'); rectP(-200, -40, 400, 160, '#6a6e74', { seed: 16732, lw: 2.4 }); txt('ЗАВОД', 0, -110, 50, { font: 'Inter Black', col: '#1c1512' });
    if (t > c.closed) { push(0, 40, popK(t, c.closed, 0.25), -0.08); rectP(-240, -54, 480, 108, 'rgba(0,0,0,0)', { raw: true, lc: '#c8241c', lw: 9, tex: false }); txt('ЗАКРЫТ', 0, 20, 70, { font: 'Inter Black', col: '#c8241c' }); pop(); } pop(); return; }
  push(540, 700, 1, -0.01); card(0, 0, 860, 640, 0, 16733, '#f6f1e4'); txt('ТОМАС МИДЖЛИ', 0, -260, 50, { font: 'Inter Black', col: '#1c1512', maxW: 800 }); txt('изобретатель присадки · 1924', 0, -208, 28, { font: 'Inter', weight: 800, col: '#6b5a48', maxW: 800 });
  personIcon(-220, 60, 1.7, '#3a4a5a', 16734);
  if (t > c.wash - 0.1) { push(-120, 120); piece([[-20, -60], [20, -60], [34, 30], [-34, 30]], 'rgba(200,220,180,0.7)', { raw: true, lw: 2.4, tex: false }); txt('Pb', 0, 10, 26, { font: 'Inter Black', col: '#3a4a2a' }); pop(); }
  if (t > c.sniff - 0.5) { const k = clamp((t - (c.sniff - 0.5)) / 2.5); push(200, 20); ellP(0, 0, 110, 110, '#fbfaf6', { seed: 16735, lw: 4 }); stroke([[0, 0], [Math.sin(k * 6.283) * 90, -Math.cos(k * 6.283) * 90]], '#c8241c', 7); dot(0, 0, 8, '#1c1512');
    txt('60 сек', 0, 160, 38, { font: 'Inter Black', col: '#1c1512' }); pop(); }
  if (t > c.safe) { push(-60, -110, popK(t, c.safe, 0.25), 0.04); piece([[-170, -50], [170, -50], [170, 40], [20, 40], [-10, 80], [-20, 40], [-170, 40]], '#fbfaf6', { seed: 16736, lw: 2.6 }); txt('«БЕЗОПАСНО»', 0, 10, 40, { font: 'Inter Black', col: '#2a6a3a' }); pop(); }
  pop();
  if (t > c.before - 0.2) { push(540, 1180, popK(t, c.before - 0.2, 0.3), 0.03); card(0, 0, 720, 200, 0, 16737, '#e8f0f2'); rectP(-360, -100, 80, 200, '#c8241c', { seed: 16738, line: false }); stroke([[-320, -40], [-320, 40]], '#fbfaf6', 12); stroke([[-360, 0], [-280, 0]], '#fbfaf6', 12);
    txt('1923: лечился', 60, -26, 46, { font: 'Inter Black', col: '#1c1512', maxW: 560 }); txt('от отравления свинцом', 60, 40, 36, { font: 'Inter', weight: 800, col: '#a8241c', maxW: 560 }); pop(); }
}
function banIns(t, c) {                                               // США — запрет только в 1996, последним сдался Алжир — 2021
  if (!c.fg) pegBg(16740, t); if (c.bg) return;
  push(540, 800, 1, 0.01); card(0, 0, 880, 720, 0, 16741, '#f6f1e4'); txt('ЗАПРЕТ СВИНЦОВОГО БЕНЗИНА', 0, -300, 36, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  const X = y => lerp(-360, 360, (y - 1920) / 105); stroke([[-380, 0], [380, 0]], '#4a4038', 6);
  [1920, 1950, 1980, 2000, 2025].forEach(y => { stroke([[X(y), -10], [X(y), 10]], '#4a4038', 4); txt(String(y), X(y), 50, 24, { font: 'Inter', weight: 800, col: '#6b5a48' }); });
  const k = sm(pr(t, c.us - 0.3, c.algeria + 0.6)); ctx.save(); ctx.globalAlpha = 0.85; rectP(X(1921), -50, (X(lerp(1921, 2021, k)) - X(1921)), 40, '#a8241c', { seed: 16742, line: false }); ctx.restore();
  txt('ЭПОХА СВИНЦА: ~100 ЛЕТ', 0, -80, 28, { font: 'Inter Black', col: '#a8241c' });
  if (t > c.y96 - 0.3) { push(X(1996), -150, popK(t, c.y96 - 0.3, 0.3)); rectP(-110, -60, 220, 100, '#3a5a8a', { seed: 16743, lw: 2.2 }); txt('США', 0, -24, 32, { font: 'Inter Black', col: '#fbfaf6' }); txt('1996', 0, 20, 36, { font: 'Inter Black', col: '#fbfaf6' }); stroke([[0, 40], [0, 140]], '#3a5a8a', 5); pop(); }
  if (t > c.algeria - 0.2) { push(X(2021) - 40, 200, popK(t, c.algeria - 0.2, 0.3)); rectP(-130, -60, 260, 120, '#3a7a4a', { seed: 16744, lw: 2.2 }); txt('АЛЖИР', 0, -14, 34, { font: 'Inter Black', col: '#fbfaf6' }); txt('2021', 0, 36, 40, { font: 'Inter Black', col: '#fbfaf6' }); stroke([[40, -60], [40, -190]], '#3a7a4a', 5); pop(); }
  pop();
  if (t > c.y21) { push(540, 1250, popK(t, c.y21, 0.3), -0.03); ransom('ПОСЛЕДНИЙ В МИРЕ', 0, 0, 84, 16745, { reveal: 1, pop: true }); pop(); }
  label(540, 1375, 'ЮНЕП, 2021: эпоха свинцового бензина окончена', 0, '#f4e6a8', 0.01, 26);
}
function iqIns(t, c) {                                                // PNAS 2022: 170 млн американцев в детстве под высоким свинцом → −824 млн баллов IQ
  if (!c.fg) pegBg(16750, t); if (c.bg) return;
  push(540, 700, 1, -0.01); card(0, 0, 880, 640, 0, 16751, '#f6f1e4'); txt('США: ДЕТСТВО В СВИНЦОВОМ ВЫХЛОПЕ', 0, -270, 32, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  const kP = sm(pr(t, c.m170 - 0.3, c.m170 + 1.2)); for (let i = 0; i < 40; i++) { const col = i < 20 * kP * 1.0 + 0 && i < 20 ? '#a8241c' : '#b8b0a0', x = -340 + (i % 10) * 75, y = -170 + Math.floor(i / 10) * 95;
    push(x, y, 0.42); ellP(0, -70, 34, 34, col, { seed: 16752, lw: 2 }); piece(spline([[-54, 70], [-46, -16], [0, -34], [46, -16], [54, 70]], true, 6), col, { seed: 16753, raw: true, lw: 2 }); pop(); }
  if (t > c.m170) { txt('170 МЛН', -180, 250, 64, { font: 'Inter Black', col: '#a8241c' }); txt('≈ половина страны', 200, 250, 32, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 380 }); }
  pop();
  if (t > c.minus - 0.1) { const k = sm(pr(t, c.minus, c.iq - 0.3)); push(540, 1180, 1, 0.02); card(0, 0, 820, 220, 0, 16754, '#1c1a1c');
    txt('−' + Math.round(824 * k) + ' 000 000', 0, -10, 76, { font: 'Inter Black', col: '#ff6a5a', maxW: 760 }); txt('баллов IQ на всех', 0, 66, 32, { font: 'Inter', weight: 800, col: '#f2e8c8' }); pop(); }
  label(540, 1360, 'McFarland, Hauer, Reuben · PNAS, 2022', 0, '#f4e6a8', -0.01, 26);
}
function wasteIns(t, c) {                                             // что делать с канистрой
  if (!c.fg) pegBg(16760, t); if (c.bg) return;
  push(540, 740, 1, 0.01); card(0, 0, 860, 820, 0, 16761, '#f6f1e4'); txt('ДЕДОВА КАНИСТРА', 0, -340, 46, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
  const R = [['не открывать', c.noopen, 0], ['не жечь', c.noburn, 0], ['не сливать в канаву', c.ditch, 0], ['сдать как опасные отходы', c.handin, 1], ['вымыть руки', c.hands, 1]];
  R.forEach(([s, t0, ok], i) => { if (t < t0 - 0.2) return; const y = -230 + i * 120, k = pr(t, t0 - 0.2, t0 + 0.2);
    if (ok) check(-340, y, 0.9, k); else stampX(-340, y, 0.7, k); txt(s, -270, y + 14, 40, { font: 'Inter Black', col: ok ? '#2a6a3a' : '#1c1512', align: 'left', maxW: 640 }); });
  if (t > c.handin) txt('пункт приёма опасных отходов — спросите в администрации', 0, 360, 24, { font: 'Inter', weight: 800, col: '#6b5a48', maxW: 800 });
  pop();
  jerrycan(860, 1250, 0.9, 0.08);
}
/* лента истории (цвета серии: вишня и бензиново-жёлтый) */
function timeline16(k, t, f = k) {
  const Y = [['1921', 'присадка'], ['1924', 'бешеный газ'], ['1996', 'США'], ['2021', 'Алжир'], ['2022', '−824 млн IQ']], x0 = 190, x1 = 890, y = 300;
  rectP(x0 - 110, y - 70, x1 - x0 + 220, 150, 'rgba(30,14,14,0.85)', { seed: 16990, line: false, tex: false });
  stroke([[x0, y], [x1, y]], '#6a4a40', 8); if (f > 0) stroke([[x0, y], [lerp(x0, x1, f / 4), y]], '#f2c83a', 10);
  Y.forEach(([yr, w], i) => { const x = lerp(x0, x1, i / 4), on = i === k, past = i <= f && !on;
    ellP(x, y, on ? 26 : 16, on ? 26 : 16, on ? '#f2e8c8' : past ? '#f2c83a' : '#4a3030', { seed: 16991 + i, lw: 2.2 });
    txt(yr, x, y - 40, on ? 32 : 24, { font: 'Inter Black', col: on ? '#f2e8c8' : '#d8c0a0' }); txt(w, x, y + 50, 21, { font: 'Inter', weight: 800, col: '#d8c0a0', maxW: 150 }); });
}
