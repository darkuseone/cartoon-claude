/* Эп. 15 «Сахарный заговор?» — декорация: ночная кухня, 3 часа ночи, открытый холодильник светит на Никиту (он стоит на весах с «обезжиренным»).
   Том сидит на холодильнике рядом с маслёнкой и банкой «ЗАНАЧКА». За окном — ночной город и билборд «ВРАЧИ РЕКОМЕНДУЮТ 0 %».
   Тон серьёзный: глубокий сине-бирюзовый, холодный свет холодильника + тёплый фонарь. 2.5D: небо 2.4, стена 1.35, кухня 1.0, передний план 0.6. */

const TEAL = '#1d4a56', SUGAR = '#f4f1ea', FRIDGE = '#d8e0e4', ICE = '#c8f0ff';
const FX0 = 600, FX1 = 960, FTOP = 880;                                  // холодильник: x 600..960, верх 880, пол 1560

/* стаканчик «0 % ЖИРА»: flip 0..1 — переворачивает дном вверх (читает этикетку) */
function yogurtP(x, y, s, rot, o = {}) {
  push(x, y, s, rot + Math.PI * sm(o.flip ?? 0));
  piece([[-34, -44], [34, -44], [26, 40], [-26, 40]], '#fbfaf6', { seed: 15001, lw: 2.2, shade: () => {
    rectP(-30, -20, 60, 30, '#5ab8d8', { seed: 15002, line: false }); txt('0%', 0, 2, 26, { font: 'Inter Black', col: '#fbfaf6' });
    if ((o.flip ?? 0) > 0.5) { push(0, 26, 1, Math.PI); txt('САХАР', 0, 4, 12, { font: 'Inter Black', col: '#c8243c' }); pop(); } } });
  if (o.lid !== false) piece([[-38, -44], [38, -44], [36, -52], [-36, -52]], '#c8ccd0', { seed: 15003, lw: 1.6 });
  if (o.spoon) { stroke([[10, -40], [36, -110]], '#c8ccd4', 6); ellP(38, -116, 10, 14, '#d8dce0', { seed: 15004, lw: 1.6 }); }
  pop();
}
/* сахарница с ложкой (o.heap — горка на ложке) */
function sugarBowl(x, y, s, rot, o = {}) {
  push(x, y, s, rot);
  piece([[-60, -40], [60, -40], [48, 30], [-48, 30]], '#f2ead8', { seed: 15010, lw: 2.4, shade: () => { txt('САХАР', 0, 4, 22, { font: 'Inter Black', col: '#2a5a8a' }); } });
  blobP([[-56, -40], [-30, -60], [0, -66], [30, -60], [56, -40]], SUGAR, { seed: 15011, lw: 1.6 });
  if (o.spoon !== false) { stroke([[20, -50], [70, -130]], '#c8ccd4', 7); }
  pop();
}
function spoonHeap(x, y, s, rot) { push(x, y, s, rot); stroke([[0, 0], [0, 90]], '#c8ccd4', 8); ellP(0, -10, 22, 28, '#d8dce0', { seed: 15015, lw: 1.8 }); blobP([[-22, -14], [-10, -34], [8, -36], [22, -14]], SUGAR, { seed: 15016, lw: 1.4 }); pop(); }
function butterDish(x, y, s, o = {}) { push(x, y, s); const bite = o.bite ?? 0;
  ellP(0, 6, 70, 14, '#e8ecf0', { seed: 15020, lw: 2 }); piece([[-44, 0], [44 - 30 * bite, 0], [44 - 30 * bite, -36], [-44, -36]], '#f6dc7a', { seed: 15021, lw: 2, shade: () => { if (bite > 0.1) stroke([[44 - 30 * bite, -36], [38 - 30 * bite, -18], [44 - 30 * bite, 0]], '#e2c060', 3); } });
  txt('МАСЛО 82%', 0, 34, 14, { font: 'Inter Black', col: '#e8ecf0' }); pop(); }
function stashJar(x, y, s, rot) { push(x, y, s, rot);
  piece([[-44, -90], [44, -90], [48, 0], [-48, 0]], 'rgba(200,230,240,0.55)', { raw: true, lw: 2.4, tex: false });
  const r = rng(15030); for (let i = 0; i < 9; i++) ellP(-30 + r() * 60, -10 - r() * 66, 14, 10, ['#d8243c', '#f2a83a', '#5ab8d8', '#7ac85a'][i % 4], { seed: 15031 + i, lw: 1.4, rot: r() * 3 });
  rectP(-46, -108, 92, 20, '#c8243c', { seed: 15040, lw: 2 }); rectP(-36, -64, 72, 30, '#fbfaf6', { seed: 15041, lw: 1.4 }); txt('ЗАНАЧКА', 0, -44, 13, { font: 'Inter Black', col: '#1c1512' }); pop(); }
function scaleP(x, y, s, o = {}) { push(x, y, s);                       // напольные весы: на табло «84,0» — ни грамма
  piece([[-120, -26], [120, -26], [126, 10], [-126, 10]], '#e8ecf0', { seed: 15050, lw: 2.4 }); rectP(-46, -22, 92, 22, '#1c2a30', { seed: 15051, lw: 1.6 });
  txt(o.num ?? '84,0', 0, -6, 18, { font: "'Courier 10 Pitch'", col: '#7ae8a8' }); pop(); }

/* ---------- за окном (d 2.4): ночной город, луна, билборд «ВРАЧИ РЕКОМЕНДУЮТ 0 %» */
function nightTown(t, o = {}) {
  rectP(-400, 0, 1500, 1500, '#0f1a30', { seed: 15100, line: false, shade: () => {
    [['#132240', 0, 300], ['#18284a', 300, 220], ['#1e2e50', 520, 200]].forEach(([c, y, h], i) => rectP(-400, y, 1500, h, c, { seed: 15101 + i, line: false }));
    ellP(-120, 230, 54, 54, '#f2ead0', { seed: 15105, lw: 1.6 }); glowAdd(-120, 230, 200, 'rgba(240,230,200,1)', 0.35);
    const r0 = rng(15106); for (let i = 0; i < 40; i++) dot(-380 + r0() * 1460, 20 + r0() * 420, 1.6 + r0() * 1.6, '#e8eaf8', 0.4 + 0.4 * Math.abs(Math.sin(t * 2 + i)));
    [[-360, 600, 200, '#0b1426'], [-140, 540, 170, '#0e182c'], [60, 640, 220, '#0a1222'], [300, 500, 200, '#0d1730'], [540, 610, 240, '#0b1426'], [800, 560, 220, '#0e182c']].forEach(([x, y, w, c], i) => {
      rectP(x, y, w, 1500 - y, c, { seed: 15110 + i, lw: 1.6 });
      for (let k = 0; k < 4; k++) for (let j = 0; j < 7; j++) if ((k * 5 + j * 3 + i * 2) % 6 === 0) { rectP(x + 18 + k * 44, y + 30 + j * 62, 24, 34, j % 3 ? '#e8b860' : '#8ac8e8', { seed: 15120 + i * 30 + k * 7 + j, line: false }); glowAdd(x + 30 + k * 44, y + 47 + j * 62, 24, 'rgba(240,190,110,1)', 0.3); } });
    // билборд на крыше: врач с йогуртом
    push(400, 390); stroke([[-130, 80], [-130, 120]], '#2a2a30', 8); stroke([[130, 80], [130, 120]], '#2a2a30', 8);
    rectP(-190, -80, 380, 160, '#123a6a', { seed: 15140, lw: 3, shade: () => {
      ellP(-140, -16, 30, 34, '#f0dccb', { seed: 15141, lw: 2 }); piece([[-178, 80], [-102, 80], [-108, 22], [-172, 22]], '#ffffff', { seed: 15142, lw: 2 }); stroke([[-150, 26], [-140, 54], [-130, 26]], '#5ab8d8', 3);
      txt('ВРАЧИ', 50, -40, 36, { font: 'Inter Black', col: '#ffffff', maxW: 230 }); txt('РЕКОМЕНДУЮТ', 50, -2, 26, { font: 'Inter Black', col: '#ffffff', maxW: 230 }); txt('0 % ЖИРА', 50, 50, 46, { font: 'Inter Black', col: '#7ae0ff', maxW: 230 }); } });
    glowAdd(0, 0, 260, 'rgba(200,230,255,1)', 0.3); pop();
    push(-260, 840); rectP(-90, -40, 180, 80, '#0e2a1a', { seed: 15150, lw: 2.4 }); const ap = Math.sin(t * 3) > -0.6 ? 1 : 0.4;        // аптека 24
    glowAdd(0, 0, 170, 'rgba(80,255,140,1)', 0.4 * ap); txt('АПТЕКА 24', 0, 9, 26, { font: 'Inter Black', col: ap > 0.5 ? '#8affb8' : '#2a6a40' }); pop();
    glowAdd(720, 880, 150, 'rgba(255,200,120,1)', 0.45); stroke([[720, 880], [720, 1300]], '#2a2a30', 10);   // фонарь
  } });
}
/* ---------- стена (d 1.35): кафель, окно 80..420 × 380..900, часы 03:07 */
function kWall(t, o = {}) {
  [[-300, -300, 1700, 680], [-300, 900, 1700, 700], [-300, 380, 380, 520], [420, 380, 1000, 520]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, TEAL, { seed: 15200 + i * 3, line: false, step: 70 }));
  for (let y = -300; y < 1300; y += 56) for (let x = -300 + ((y / 56) % 2) * 28; x < 1400; x += 56) if (!(x > 60 && x < 430 && y > 360 && y < 905)) rectP(x + 3, y + 3, 50, 50, (Math.floor(x / 56) + Math.floor(y / 56)) % 7 === 0 ? '#24606e' : '#1f5260', { seed: 15210 + ((x * 7 + y * 3) & 511), line: false });
  rectP(-300, 1120, 1700, 30, '#16343e', { seed: 15215, line: false });
  // окно
  [[70, 370, 360, 20], [70, 370, 20, 540], [410, 370, 20, 540], [240, 370, 14, 540], [70, 630, 360, 14], [60, 890, 380, 26]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#e8ecf0', { seed: 15230 + i, lw: 2.2 }));
  piece([[20, 340], [120, 340], [100, 640], [130, 920], [10, 920], [50, 640]], '#c87a3a', { seed: 15240, lw: 2.2, shade: () => { [50, 90].forEach(x => stroke([[x, 360], [x - 6, 900]], '#a85a2a', 6)); } });
  rectP(0, 326, 470, 14, '#2a2a30', { seed: 15242, lw: 2 });
  push(330, 878); rectP(-30, -50, 60, 50, '#c8643a', { seed: 15245, lw: 2 }); [[-20, -90], [0, -110], [22, -86]].forEach(([a, b], i) => blobP([[0, -50], [a - 14, b], [a, b - 20], [a + 14, b]], '#3a8a4a', { seed: 15246 + i, lw: 1.6 })); pop();   // цветок на подоконнике
  // часы 03:07 и магнитный листок «ДИЕТА» на стене
  push(560, 460); ellP(0, 0, 64, 64, '#f2ead8', { seed: 15250, lw: 3 }); stroke([[0, 0], [0, -44]], '#1c1512', 6); stroke([[0, 0], [26, 8]], '#1c1512', 7); dot(0, 0, 6, '#c8243c');
  const sa = t * 6.283 / 60; stroke([[0, 0], [Math.sin(sa) * 50, -Math.cos(sa) * 50]], '#c8243c', 2.4); pop();
  push(1110, 560, 1, 0.04); rectP(-90, -120, 180, 240, '#fbfaf6', { seed: 15255, lw: 2 }); txt('ДИЕТА', 0, -86, 26, { font: 'Inter Black', col: '#c8243c' });
  ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ'].forEach((d, i) => { txt(d, -54, -40 + i * 34, 18, { font: 'Inter Black', col: '#4a4038' }); txt('0%', 30, -40 + i * 34, 18, { font: 'Inter Black', col: '#5ab8d8' }); }); pop();
}
/* ---------- кухня (d 1.0): пол, столешница слева, холодильник с открытой дверью, весы */
function fridge(t, o = {}) {
  const fl = 0.92 + 0.08 * Math.sin(t * 50) * (Math.sin(t * 0.7) > 0.96 ? 1 : 0);    // лампа холодильника изредка мигает
  rectP(FX0, FTOP, FX1 - FX0, 1560 - FTOP, FRIDGE, { seed: 15300, lw: 3 });                                   // корпус
  rectP(FX0 + 10, FTOP + 10, FX1 - FX0 - 20, 130, '#e8eef2', { seed: 15301, lw: 2.4, shade: () => { rectP(FX1 - 60, FTOP + 50, 20, 70, '#a8b0b8', { seed: 15302, lw: 1.6 }); } });   // морозилка (закрыта)
  // магниты на морозилке
  [[650, 930, '#c8243c'], [700, 960, '#f2a83a'], [760, 925, '#5ab8d8']].forEach(([x, y, c], i) => ellP(x, y, 14, 14, c, { seed: 15305 + i, lw: 1.6 }));
  push(840, 960, 1, -0.06); rectP(-40, -30, 80, 60, '#fbfaf6', { seed: 15308, lw: 1.6 }); txt('−5 КГ', 0, 6, 18, { font: 'Inter Black', col: '#c8243c' }); pop();
  // открытая камера
  rectP(FX0 + 14, FTOP + 150, FX1 - FX0 - 28, 1540 - FTOP - 150, '#eef8fc', { seed: 15310, lw: 2.4, shade: () => {
    glowAdd(780, FTOP + 200, 300, 'rgba(220,245,255,1)', 0.7 * fl);
    [1170, 1320, 1450].forEach((y, i) => { rectP(FX0 + 20, y, FX1 - FX0 - 40, 10, 'rgba(180,220,235,0.8)', { seed: 15311 + i, line: false }); });
    // полка 1: стаканчики «0 %», пакет молока «0 %», торт под колпаком (ирония)
    for (let i = 0; i < 4; i++) { push(650 + i * 46, 1168); piece([[-20, -50], [20, -50], [16, 0], [-16, 0]], '#fbfaf6', { seed: 15320 + i, lw: 1.6, shade: () => { rectP(-18, -36, 36, 16, '#5ab8d8', { seed: 15325 + i, line: false }); txt('0%', 0, -24, 12, { font: 'Inter Black', col: '#fbfaf6' }); } }); pop(); }
    push(880, 1168); piece([[-34, -120], [34, -120], [34, 0], [-34, 0]], '#fbfaf6', { seed: 15330, lw: 1.8, shade: () => { rectP(-34, -90, 68, 40, '#5ab8d8', { seed: 15331, line: false }); txt('0 %', 0, -64, 18, { font: 'Inter Black', col: '#fbfaf6' }); } });
    piece([[-34, -120], [0, -146], [34, -120]], '#e8ecf0', { seed: 15332, lw: 1.6 }); pop();
    push(720, 1318); ellP(0, 0, 90, 12, '#e8ecf0', { seed: 15340, lw: 1.6 }); piece([[-70, 0], [70, 0], [60, -60], [-60, -60]], '#f2c8d8', { seed: 15341, lw: 1.8, shade: () => { rectP(-60, -40, 120, 10, '#fbfaf6', { seed: 15342, line: false }); dot(0, -66, 10, '#d8243c'); } });
    piece(spline([[-84, 0], [-80, -90], [0, -120], [80, -90], [84, 0]], false, 6), 'rgba(220,240,250,0.35)', { raw: true, lw: 2, tex: false });
    txt('ОБЕЗЖИРЕННЫЙ', 0, -78, 11, { font: 'Inter Black', col: '#a8243c' }); pop();
    push(870, 1318); [[-30, '#c8243c'], [10, '#3a8a4a']].forEach(([dx, c], i) => { piece([[dx - 14, -90], [dx + 14, -90], [dx + 16, 0], [dx - 16, 0]], c, { seed: 15350 + i, lw: 1.6 }); }); pop();   // кетчуп, соус
    push(700, 1448); ellP(-30, -20, 30, 24, '#f2e04a', { seed: 15355, lw: 1.6 }); ellP(20, -18, 28, 22, '#7ac85a', { seed: 15356, lw: 1.6 }); pop();   // лимон, яблоко
    push(860, 1448); piece([[-46, -60], [46, -60], [46, 0], [-46, 0]], '#e8b860', { seed: 15357, lw: 1.6, shade: () => txt('СЫР 5%', 0, -26, 13, { font: 'Inter Black', col: '#5a3a1a' }) }); pop();
  } });
  // дверь открыта вправо-на нас: внутренняя сторона с бутылками
  piece([[FX1, FTOP + 150], [FX1 + 120, FTOP + 120], [FX1 + 120, 1600], [FX1, 1545]], '#e8eef2', { seed: 15360, lw: 3, shade: () => {
    [1120, 1300, 1460].forEach((y, i) => { piece([[FX1 + 8, y], [FX1 + 112, y - 16], [FX1 + 112, y + 24], [FX1 + 8, y + 36]], '#c8d4dc', { seed: 15361 + i, lw: 1.6 });
      [20, 54, 86].forEach((dx, k) => { if ((i + k) % 2 === 0) piece([[FX1 + dx - 12, y - 70 - dx * 0.1], [FX1 + dx + 12, y - 72 - dx * 0.1], [FX1 + dx + 12, y + 10], [FX1 + dx - 12, y + 12]], ['#7ac8e8', '#f2a83a', '#fbfaf6'][k], { seed: 15365 + i * 3 + k, lw: 1.4 }); }); });
  } });
  rectP(FX0 - 6, FTOP - 8, FX1 - FX0 + 12, 12, '#c8d0d6', { seed: 15370, lw: 2 });
}
function kMid(t, o = {}) {
  rectP(-300, 1540, 1700, 700, '#2a3a44', { seed: 15400, step: 60, shade: () => { for (let y = 1560; y < 2250; y += 90) for (let x = -300 + ((y / 90) % 2) * 45; x < 1400; x += 90) rectP(x + 2, y + 2, 86, 86, ((x / 90 + y / 90) & 1) ? '#334652' : '#26343e', { seed: 15401 + ((x + y) & 255), line: false }); } });
  // столешница слева: чайник, сахарница, банка печенья, доска
  rectP(-300, 1150, 640, 410, '#2c5a6a', { seed: 15410, lw: 2.4, shade: () => { [[-260, 1200], [-40, 1200], [180, 1200]].forEach(([x, y], i) => { rectP(x, y, 190, 330, '#25505e', { seed: 15411 + i, lw: 1.8 }); rectP(x + 80, y + 20, 30, 10, '#c8ccd0', { seed: 15415 + i, lw: 1 }); }); } });
  rectP(-310, 1112, 660, 44, '#e8e0d0', { seed: 15420, lw: 2.4 });
  push(-120, 1112); piece([[-60, -10], [60, -10], [50, -110], [-50, -110]], '#c8243c', { seed: 15421, lw: 2.2 }); stroke([[50, -90], [90, -60], [60, -30]], '#c8243c', 10); stroke([[-30, -110], [0, -134], [30, -110]], '#1c1512', 6); pop();   // чайник
  if (o.bowl !== false) sugarBowl(220, 1072, 0.8, 0.0, { spoon: o.bowlSpoon !== false });
  push(80, 1112); rectP(-30, -80, 60, 80, '#e8b860', { seed: 15430, lw: 1.8, shade: () => txt('ЧАЙ', 0, -36, 14, { font: 'Inter Black', col: '#5a3a1a' }) }); pop();
  scaleP(450, 1572, 1);
}
function kFg(t) {                                                      // передний план у объектива (размыт): угол стола и стул справа снизу
  push(1300, 1990, 1, 0.05); rectP(-160, -420, 60, 480, '#14242c', { seed: 15500, lw: 3 }); rectP(-200, -440, 360, 50, '#14242c', { seed: 15501, lw: 3 }); pop();
}
function kLight(t, fn) { lightmap('#8890b0', () => {
  const fl = 0.92 + 0.08 * Math.sin(t * 50) * (Math.sin(t * 0.7) > 0.96 ? 1 : 0);
  radial(780, 1250, 760, 'rgba(210,240,255,1)', 1.0 * fl); cone(780, 1250, 300, 1500, 700, 'rgba(200,235,255,1)', 0.45 * fl);   // свет холодильника на Никиту
  radial(250, 640, 500, 'rgba(120,150,255,1)', 0.45); radial(-60, 860, 300, 'rgba(80,255,140,1)', 0.12);                           // луна, аптека
  radial(560, 460, 180, 'rgba(255,230,190,1)', 0.15);
  if (fn) fn(); });
}
/* «взгляд в окно»: дальний план крупно + рама поверх */
function windowLook(t, wx, wy, z, o = {}) {
  cam25(540 + (wx - 540) * 2.4, 960 + (wy - 960) * 2.4, z, { focus: 2.4, dof: 0, shake: o.shake ?? 0 });
  plane(0, 2.4, () => nightTown(t));
  [[40, -40, 40, 2000], [-40, 1500, 1200, 40]].forEach(([x, y, w, h], i) => rectP(x, y, w, h, '#e8ecf0', { seed: 15610 + i, lw: 3 }));
}

// ------------------------------------------------------------------ вставки: ночной кухонный стол с рассыпанным сахаром
function sugarBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#1a2a34', { seed, line: false, step: 80, shade: () => { for (let y = -100; y < 2100; y += 160) stroke([[-100, y], [1180, y + 20]], '#16242c', 6); } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(120,200,230,0.28)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
  const r = rng(seed + 1); for (let i = 0; i < 60; i++) { const x = r() * 1080, y = r() * 1920, k = 0.5 + 0.5 * Math.sin((t || 0) * 3 + i * 1.7); push(x, y, 1, r() * 3); rectP(-4, -4, 8, 8, SUGAR, { seed: seed + 10 + i, line: false, a: 0.35 + 0.4 * k }); pop(); }
}
function cube(x, y, s, rot = 0) { push(x, y, s, rot); piece([[-22, -22], [22, -22], [22, 22], [-22, 22]], SUGAR, { seed: 15700, lw: 2, shade: () => { stroke([[-22, -22], [-10, -32], [32, -32], [22, -22]], '#d8d4ca', 2); } }); pop(); }
function tsp(x, y, s) { push(x, y, s); stroke([[0, 20], [0, 120]], '#a8b0b8', 9); ellP(0, 0, 28, 36, '#c8ccd4', { seed: 15705, lw: 2 }); blobP([[-26, -6], [-12, -30], [12, -30], [26, -6]], SUGAR, { seed: 15706, lw: 1.4 }); pop(); }
function dessertIns(t, c) {                                           // жир убрали → вкус вернули сахаром → «десерт»
  if (!c.fg) sugarBg(15710, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 860, 720, 0, 15711, '#f6f1e4'); txt('«ОБЕЗЖИРЕННЫЙ»', 0, -290, 50, { font: 'Inter Black', col: '#2a5a8a', maxW: 800 });
  yogurtP(-200, 40, 3.2, 0, { lid: false });
  const kF = sm(pr(t, c.fat0, c.fat0 + 0.5)); push(150, -150); txt('ЖИР', 0, 0, 52, { font: 'Inter Black', col: '#1c1512' }); if (kF > 0) { stroke([[-80, -14], [lerp(-80, 80, kF), -14]], '#c8243c', 10); txt('убрали', 0, 60, 34, { font: 'Inter', weight: 800, col: '#c8243c' }); } pop();
  const kS = pr(t, c.sugar1 - 0.2, c.sugar1 + 1.6); for (let i = 0; i < 6; i++) { const u = clamp(kS * 6 - i); if (u <= 0) continue; const y = lerp(-260, -20 - i * 6, eo(u)); cube(-200 + (i % 3 - 1) * 46, y, 1.1, i * 0.6 * (1 - u)); }
  if (t > c.sugar1) { txt('САХАР', 150, 70, 64, { font: 'Inter Black', col: '#c8243c' }); txt('досыпали', 150, 130, 34, { font: 'Inter', weight: 800, col: '#4a4038' }); } pop();
  if (t > c.dessert) { push(540, 1260, popK(t, c.dessert, 0.3), -0.03); ransom('ЭТО ДЕСЕРТ', 0, 0, 110, 15712, { reveal: 1, pop: true }); pop(); }
}
function harvardIns(t, c) {                                           // Фонд сахарных исследований → 3 учёных Гарварда, $6 500 ≈ $50 000 сегодня
  if (!c.fg) sugarBg(15720, t); if (c.bg) return;
  push(540, 640, 1, -0.02); card(0, 0, 860, 380, 0, 15721, '#fbfaf6'); rectP(-430, -190, 860, 70, '#c8243c', { seed: 15722, line: false });
  txt('SUGAR RESEARCH FOUNDATION', 0, -146, 34, { font: 'Inter Black', col: '#fbfaf6', maxW: 800 }); txt('сахарная индустрия США', 0, -60, 34, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 800 });
  const kE = sm(pr(t, c.secret - 0.3, c.secret + 0.4)); push(0, 70, 1, -0.05); rectP(-120, -60, 240, 120, '#e8dcc0', { seed: 15723, lw: 2.4 }); stroke([[-120, -60], [0, 10], [120, -60]], '#a8987c', 4);
  if (kE > 0) { ellP(0, 10, 30 * kE, 30 * kE, '#a8243c', { seed: 15724, lw: 2 }); txt('ТАЙНО', 0, 100, 34, { font: 'Inter Black', col: '#a8243c' }); } pop(); pop();
  if (t > c.harv - 0.4) { push(540, 1000, 1, 0.02); card(0, 0, 820, 260, 0, 15725, '#f2ead8'); txt('ГАРВАРД', -200, -60, 48, { font: 'Inter Black', col: '#8a1424' });
    [-300, -200, -100].forEach((x, i) => { if (t > c.harv - 0.4 + i * 0.15) personIcon(x, 50, 0.9, '#3a4a5a', 15726 + i); });
    txt('3 учёных', -200, 110, 26, { font: 'Inter', weight: 800, col: '#4a4038' });
    if (t > c.usd) { txt('$6 500', 200, -30, 70, { font: 'Inter Black', col: '#2a6a3a' }); txt('в 1965 году', 200, 30, 28, { font: 'Inter', weight: 800, col: '#4a4038' }); } pop(); }
  if (t > c.today) { push(540, 1250, popK(t, c.today, 0.3), -0.03); ransom('≈ $50 000 СЕГОДНЯ', 0, 0, 84, 15729, { reveal: 1, pop: true }); pop(); }
  label(540, 1390, 'документы: JAMA Internal Medicine, 2016', 0, '#f4e6a8', 0.01, 28);
}
function nejmIns(t, c) {                                              // обзор в NEJM, 1967: виноват жир, сахар — мелочь; о финансировании — ни слова
  if (!c.fg) sugarBg(15730, t); if (c.bg) return;
  push(540, 780, 1, 0.01); card(0, 0, 820, 860, 0, 15731, '#fbfaf6');
  txt('The New England', 0, -360, 40, { font: 'Inter Black', col: '#1c1512', maxW: 760 }); txt('Journal of Medicine', 0, -310, 40, { font: 'Inter Black', col: '#1c1512', maxW: 760 });
  stroke([[-380, -280], [380, -280]], '#1c1512', 4); txt('1967 · ОБЗОР', 0, -244, 28, { font: 'Inter', weight: 800, col: '#6b5a48' });
  txt('Жиры, углеводы', 0, -180, 38, { font: "'Courier 10 Pitch'", col: '#1c1512', maxW: 760 }); txt('и болезни сердца', 0, -136, 38, { font: "'Courier 10 Pitch'", col: '#1c1512', maxW: 760 });
  for (let i = 0; i < 6; i++) stroke([[-340, -80 + i * 34], [340 - (i % 3) * 90, -80 + i * 34]], '#d8d0c0', 6);
  if (t > c.guilty) { push(0, 180, popK(t, c.guilty, 0.25), -0.06); rectP(-260, -50, 520, 100, 'rgba(0,0,0,0)', { raw: true, lc: '#c8243c', lw: 8, tex: false }); txt('ВИНОВАТ: ЖИР', 0, 16, 56, { font: 'Inter Black', col: '#c8243c', maxW: 500 }); pop(); }
  if (t > c.trifle) { txt('сахар — «так, мелочь»', 0, 290, 34, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 740 }); }
  if (t > c.money - 0.2) { stroke([[-380, 330], [380, 330]], '#d8d0c0', 3); txt('Финансирование:', -120, 376, 30, { font: "'Courier 10 Pitch'", col: '#1c1512' }); txt('—', 200, 376, 40, { font: 'Inter Black', col: '#1c1512' }); }
  pop();
  if (t > c.noword) { push(540, 1260, popK(t, c.noword, 0.3), 0.03); ransom('НИ СЛОВА', 0, 0, 120, 15732, { reveal: 1, pop: true }); pop(); }
}
function usdaIns(t, c) {                                              // один из авторов, Д. Марк Хегстед → глава питания USDA, 1977 → проект госрекомендаций
  if (!c.fg) sugarBg(15740, t); if (c.bg) return;
  push(540, 620, 1, -0.01); card(0, 0, 860, 380, 0, 15741, '#f6f1e4'); personIcon(-280, 30, 1.6, '#3a4a5a', 15742);
  txt('Д. Марк Хегстед', 90, -90, 44, { font: 'Inter Black', col: '#1c1512', maxW: 520 }); txt('соавтор обзора 1967', 90, -36, 30, { font: 'Inter', weight: 800, col: '#6b5a48', maxW: 520 });
  if (t > c.usda) { rectP(-140, 20, 460, 110, '#2a5a8a', { seed: 15743, lw: 2.4 }); txt('USDA · 1977', 90, 62, 40, { font: 'Inter Black', col: '#fbfaf6', maxW: 420 }); txt('глава отдела питания', 90, 106, 26, { font: 'Inter', weight: 800, col: '#d8e8f8', maxW: 420 }); } pop();
  if (t > c.guide - 0.6) { push(540, 1040, popK(t, c.guide - 0.6, 0.3), 0.02); card(0, 0, 640, 340, 0, 15744, '#fbfaf6'); rectP(-320, -170, 640, 60, '#2a5a8a', { seed: 15745, line: false });
    txt('ГОСРЕКОМЕНДАЦИИ', 0, -128, 38, { font: 'Inter Black', col: '#fbfaf6', maxW: 600 }); txt('ПО ПИТАНИЮ', 0, -40, 44, { font: 'Inter Black', col: '#1c1512' });
    txt('жир — урезать', 0, 30, 34, { font: "'Courier 10 Pitch'", col: '#1c1512' }); for (let i = 0; i < 3; i++) stroke([[-240, 80 + i * 30], [240 - i * 60, 80 + i * 30]], '#d8d0c0', 6); pop(); }
  if (t > c.handy) { push(540, 1295, popK(t, c.handy, 0.3), -0.03); ransom('УДОБНО', 0, 0, 110, 15746, { reveal: 1, pop: true }); pop(); }
  label(540, 1395, 'помогал готовить проект — The New York Times, 2016', 0, '#f4e6a8', 0.01, 26);
}
function ratIco(x, y, s, k = 0) { push(x, y, s); blobP([[-50, 0], [-30, -30], [20, -34], [50, -10], [56, 6], [30, 20], [-40, 20]], '#d8d4d0', { seed: 15750, lw: 2 }); ellP(30, -30, 14, 14, '#f2c8d0', { seed: 15751, lw: 1.6 }); dot(46, -8, 4, '#1c1512');
  stroke(spline([[-50, 6], [-90, 0 + 10 * Math.sin(k)], [-120, 20]], false, 6), '#e8b8c0', 4); pop(); }
function ratsIns(t, c) {                                              // Project 259: крысы, сахар против крахмала → тревожные сигналы → финансирование прекращено, не опубликовано
  if (!c.fg) sugarBg(15760, t); if (c.bg) return;
  push(540, 740, 1, 0.01); card(0, 0, 880, 700, 0, 15761, '#f6f1e4'); txt('PROJECT 259', 0, -290, 52, { font: 'Inter Black', col: '#1c1512' }); txt('опыт на крысах · деньги сахарщиков', 0, -232, 30, { font: 'Inter', weight: 800, col: '#6b5a48', maxW: 820 });
  for (let i = 0; i < 9; i++) stroke([[-380 + i * 95, -190], [-380 + i * 95, 60]], '#8a9298', 5); stroke([[-400, -190], [400, -190]], '#8a9298', 7); stroke([[-400, 60], [400, 60]], '#8a9298', 7);   // клетка
  ratIco(-200, 20, 1.3, t * 6); ratIco(180, 20, 1.3, t * 6 + 2); txt('САХАР', -200, -130, 34, { font: 'Inter Black', col: '#c8243c' }); txt('КРАХМАЛ', 180, -130, 34, { font: 'Inter Black', col: '#6b5a48' });
  const kA = sm(pr(t, c.alarm - 0.2, c.alarm + 0.8)); if (kA > 0) { [[-200, 1.0, '#c8243c'], [180, 0.45, '#9a9488']].forEach(([x, v, col], i) => { const h = 190 * v * kA + 4; rectP(x - 60, 320 - h, 120, h, col, { seed: 15762 + i, lw: 2.2 }); });
    txt('жиры в крови', 0, 250, 30, { font: 'Inter', weight: 800, col: '#4a4038' }); txt('↑', -80, 170, 70, { font: 'Inter Black', col: '#c8243c' }); }
  pop();
  if (t > c.cut) { push(540, 1150, popK(t, c.cut, 0.25), -0.05); rectP(-400, -60, 800, 120, 'rgba(0,0,0,0)', { raw: true, lc: '#c8243c', lw: 9, tex: false }); txt('ДЕНЬГИ ПРЕКРАЩЕНЫ', 0, 20, 62, { font: 'Inter Black', col: '#c8243c', maxW: 760 }); pop(); }
  if (t > c.unpub) { push(540, 1270, popK(t, c.unpub, 0.3), 0.03); ransom('НЕ ОПУБЛИКОВАНО', 0, 0, 84, 15763, { reveal: 1, pop: true }); pop(); }
  label(540, 1375, '1967–1971 · разбор: PLOS Biology, 2017', 0, '#f4e6a8', -0.01, 26);
}
function whoIns(t, c) {                                               // этикетка «сахар на 100 г» → ВОЗ: < 50 г, лучше 25 г = 6 чайных ложек
  if (!c.fg) sugarBg(15770, t); if (c.bg) return;
  push(540, 600, 1, -0.01); card(0, 0, 820, 400, 0, 15771, '#fbfaf6'); txt('ПИЩЕВАЯ ЦЕННОСТЬ на 100 г', 0, -150, 34, { font: 'Inter Black', col: '#1c1512', maxW: 760 });
  [['Жиры', '0 г'], ['Углеводы', '15 г'], ['в т.ч. сахара', '12 г']].forEach(([a, b], i) => { const y = -80 + i * 70, hot = i === 2 && t > c.per100;
    if (hot) rectP(-380, y - 40, 760, 64, '#ffe27a', { seed: 15772, line: false }); txt(a, -360, y, 38, { font: 'Inter', weight: 800, col: '#1c1512', align: 'left' }); txt(b, 340, y, 38, { font: 'Inter Black', col: hot ? '#c8243c' : '#1c1512', align: 'right' }); stroke([[-380, y + 26], [380, y + 26]], '#d8d0c0', 3); });
  txt('пример этикетки', 0, 170, 24, { font: 'Inter', weight: 800, col: '#9a9488' }); pop();
  if (t > c.who - 0.2) { push(540, 1040, 1, 0.01); card(0, 0, 880, 500, 0, 15773, '#f6f1e4'); txt('ВОЗ: ДОБАВЛЕННЫЙ САХАР В ДЕНЬ', 0, -210, 34, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
    const k1 = sm(pr(t, c.g50 - 0.2, c.g50 + 0.6)), k2 = sm(pr(t, c.g25 - 0.2, c.g25 + 0.6));
    if (k1 > 0) { rectP(-380, -150, 700 * k1, 70, '#e8a83a', { seed: 15774, lw: 2.2 }); txt('< 50 г', 360, -100, 44, { font: 'Inter Black', col: '#8a5a1a', align: 'right' }); }
    if (k2 > 0) { rectP(-380, -50, 350 * k2, 70, '#3a8a4a', { seed: 15775, lw: 2.2 }); txt('лучше 25 г', 360, 0, 44, { font: 'Inter Black', col: '#2a6a3a', align: 'right' }); }
    for (let i = 0; i < 6; i++) if (t > c.six - 0.4 + i * 0.1) tsp(-325 + i * 130, 110, 1.15);
    pop(); }
  if (t > c.six + 0.3) { push(540, 1355, popK(t, c.six + 0.3, 0.3), -0.03); ransom('= 6 ЧАЙНЫХ ЛОЖЕК', 0, 0, 72, 15776, { reveal: 1, pop: true }); pop(); }
}
/* лента истории (цвета серии: бирюза и сахар) */
function timeline15(k, t, f = k) {
  const Y = [['1965', 'оплата'], ['1967', 'обзор NEJM'], ['1967–71', 'крысы'], ['1977', 'USDA'], ['2015', 'ВОЗ']], x0 = 190, x1 = 890, y = 300;
  rectP(x0 - 110, y - 70, x1 - x0 + 220, 150, 'rgba(10,30,40,0.85)', { seed: 15990, line: false, tex: false });
  stroke([[x0, y], [x1, y]], '#4a6a74', 8); if (f > 0) stroke([[x0, y], [lerp(x0, x1, f / 4), y]], ICE, 10);
  Y.forEach(([yr, w], i) => { const x = lerp(x0, x1, i / 4), on = i === k, past = i <= f && !on;
    ellP(x, y, on ? 26 : 16, on ? 26 : 16, on ? SUGAR : past ? ICE : '#2a4048', { seed: 15991 + i, lw: 2.2 });
    txt(yr, x, y - 40, on ? 32 : 24, { font: 'Inter Black', col: on ? SUGAR : '#a8c8d0' }); txt(w, x, y + 50, 21, { font: 'Inter', weight: 800, col: '#a8c8d0', maxW: 150 }); });
}
