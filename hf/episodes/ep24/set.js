/* Эп. 24 «Кот приносит мышей — подарок?» — декорация: прихожая квартиры Никиты, 7:40 утра, он опаздывает на работу.
   Лор: на обоях за обувной тумбой Том выцарапывает когтем счёт трофеев (палочки по пять), над ним рамка «РАБОТНИК МЕСЯЦА — ТОМ»;
   на полке — переноска «ВЕТКЛИНИКА» (эп. 22) и дедова канистра «ЯДОВИТ» (эп. 16); на крючке — куртка Никиты (в кармане — «на потом»).
   Входная дверь приоткрыта — за ней утренняя лестничная клетка. 2.5D: подъезд 2.4, стена прихожей 1.35, тумба и герои 1.0, передний план 0.6. */

const SHOE_TOP = 1250, PAPER = '#d8c8a0';
function sneaker(x, y, s, rot, o = {}) { push(x, y, s, rot, o.flipX ? -1 : 1);
  piece(spline([[-80, 0], [-70, -50], [-20, -60], [30, -40], [80, -20], [90, 10], [-80, 14]], true, 5), '#fbfaf2', { raw: true, lw: 2.4, shade: () => { stroke([[-60, -36], [10, -50]], '#c8243c', 8); stroke([[-40, -50], [-30, -30]], '#1c1512', 2); stroke([[-26, -54], [-16, -32]], '#1c1512', 2); } });
  rectP(-84, 8, 178, 14, '#2a2a30', { seed: 24001, lw: 1.6 }); pop(); }
function mouseDead(x, y, s, rot, o = {}) { push(x, y, s, rot); blobP([[-40, 0], [-30, -24], [10, -28], [36, -12], [44, 4], [20, 12], [-30, 12]], '#8a8a92', { seed: 24010, lw: 2 });
  ellP(26, -22, 10, 10, '#e8b0b8', { seed: 24011, lw: 1.4 }); [[34, -6]].forEach(([a, b]) => { stroke([[a - 5, b - 5], [a + 5, b + 5]], '#1c1512', 2.4); stroke([[a + 5, b - 5], [a - 5, b + 5]], '#1c1512', 2.4); });
  stroke(spline([[-40, 4], [-70, 10 + 6 * Math.sin(o.t ?? 0)], [-96, -4]], false, 5), '#d8a0a8', 3); if (o.bow) { piece([[0, -30], [-18, -44], [-18, -16]], '#c8243c', { raw: true, lw: 1.4 }); piece([[0, -30], [18, -44], [18, -16]], '#c8243c', { raw: true, lw: 1.4 }); dot(0, -30, 5, '#a81c2c'); } pop(); }
function wand(x0, y0, x1, y1, t) { stroke([[x0, y0], [lerp(x0, x1, 0.5), lerp(y0, y1, 0.5) - 30], [x1, y1]], '#c8a060', 5);
  push(x1, y1 + 20, 1, 0.5 * Math.sin(t * 9)); stroke([[0, -20], [0, 30]], '#3a3a40', 2); [[-14, 30, '#e84a6a'], [0, 40, '#5ab8e8'], [14, 30, '#f2c84a']].forEach(([a, b, c], i) => piece([[0, 20], [a - 8, b], [a, b + 26], [a + 8, b]], c, { raw: true, lw: 1.2 })); pop(); }
function jacket(x, y, s, o = {}) { push(x, y, s); piece([[-90, 0], [90, 0], [120, 420], [-120, 420]], '#2a4a6a', { seed: 24020, lw: 2.6, shade: () => { stroke([[0, 20], [0, 410]], '#1c3450', 4); rectP(-100, 260, 80, 70, '#24405c', { seed: 24021, lw: 1.8 });
  if (o.bulge) ellP(-60, 290, 34, 26, '#24405c', { seed: 24022, lw: 1.6 }); } }); stroke([[0, -20], [0, 6]], '#3a3a40', 6); pop(); }
/* ---------- лестничная клетка за приоткрытой дверью (d 2.4) */
function stairwell(t) {
  rectP(-400, -100, 1600, 1600, '#7aa0a8', { seed: 24100, line: false, shade: () => {
    rectP(-400, 800, 1600, 700, '#5a7a82', { seed: 24101, line: false }); rectP(200, 260, 260, 360, '#fff6d8', { seed: 24102, lw: 3 }); glowAdd(330, 440, 360, 'rgba(255,240,200,1)', 0.6);   // окно на лестнице
    [[200, 260, 260, 14], [200, 430, 260, 12], [323, 260, 14, 360]].forEach(([a, b, c, d], i) => rectP(a, b, c, d, '#e8e4dc', { seed: 24103 + i, lw: 1.2 }));
    rectP(620, 360, 260, 560, '#6a4a3a', { seed: 24110, lw: 2.4, shade: () => { txt('42', 750, 440, 30, { font: 'Inter Black', col: '#d8c890' }); dot(840, 650, 8, '#d8c890'); } });   // соседская дверь
    for (let i = 0; i < 6; i++) rectP(-300 + i * 70, 800 + i * 40, 300, 40, '#6a8a92', { seed: 24120 + i, lw: 1.4 });                                // ступени
  } });
}
/* ---------- стена прихожей (d 1.35): обои, дверь, рамка, счёт трофеев, полка с переноской и канистрой */
function hallWall(t, o = {}) {
  rectP(-400, -300, 1800, 2000, PAPER, { seed: 24200, line: false, step: 70, shade: () => { for (let x = -380; x < 1400; x += 80) for (let y = -280; y < 1700; y += 80) { push(x + ((y / 80) % 2) * 40, y); piece([[0, -14], [10, 0], [0, 14], [-10, 0]], '#c8b890', { raw: true, line: false }); pop(); } } });
  // входная дверь слева, приоткрыта — щель на лестницу
  ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; ctx.fillRect(-260, 300, 240, 900); ctx.restore();
  piece([[-20, 300], [80, 280], [80, 1220], [-20, 1200]], '#6a3a2a', { seed: 24210, lw: 3, shade: () => { dot(60, 760, 10, '#d8c890'); } });   // створка двери
  rectP(-280, 286, 20, 920, '#4a2a1a', { seed: 24211, lw: 2 });
  // рамка «РАБОТНИК МЕСЯЦА» и счёт трофеев
  push(980, 520, 1, 0.02); rectP(-120, -140, 240, 280, '#8a6a2a', { seed: 24220, lw: 3, shade: () => { rectP(-96, -116, 192, 190, '#e8e0d0', { seed: 24221, line: false });
    ellP(0, -30, 50, 46, '#8a7a6a', { seed: 24222, lw: 1.8 }); piece([[-40, -66], [-30, -100], [-14, -70]], '#8a7a6a', { raw: true, lw: 1.6 }); piece([[40, -66], [30, -100], [14, -70]], '#8a7a6a', { raw: true, lw: 1.6 }); dot(-16, -36, 6, '#5ac84a'); dot(16, -36, 6, '#5ac84a');
    txt('РАБОТНИК', 0, 100, 20, { font: 'Inter Black', col: '#fbfaf2' }); txt('МЕСЯЦА', 0, 124, 20, { font: 'Inter Black', col: '#fbfaf2' }); } }); pop();
  const n = o.tally ?? 23; for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), j = i % 5, x = 860 + (g % 3) * 110 + j * 18, y = 760 + Math.floor(g / 3) * 110;
    if (j < 4) stroke([[x, y], [x + 3, y + 70]], '#6a4a2a', 4); else stroke([[x - 76, y + 50], [x + 4, y + 16]], '#6a4a2a', 4); }                                          // палочки когтем
  // полка: переноска и дедова канистра
  rectP(380, 400, 360, 16, '#6a4a2a', { seed: 24230, lw: 1.6 }); push(470, 400, 0.55); rectP(-130, -250, 260, 250, '#3a6ac8', { seed: 24231, lw: 2.6 }); rectP(30, -200, 76, 40, '#fbfaf2', { seed: 24232, lw: 1.4 }); txt('ВЕТКЛИНИКА', 68, -174, 10, { font: 'Inter Black', col: '#c8243c' }); pop();
  push(650, 400, 0.5); rectP(-62, -170, 124, 170, '#a8241c', { seed: 24233, lw: 2.4 }); rectP(-50, -116, 100, 64, '#f2e8c8', { seed: 24234, lw: 1.4 }); txt('ЯДОВИТ', 0, -76, 18, { font: 'Inter Black', col: '#c8241c' }); pop();
  push(560, 650); rectP(-60, -30, 120, 60, '#5a3a2a', { seed: 24240, lw: 2 }); for (let i = 0; i < 3; i++) { stroke([[-40 + i * 40, 0], [-40 + i * 40, 30]], '#c8c8d0', 3); dot(-40 + i * 40, 36, 6, '#d8b84a'); } pop();   // ключница
  push(300, 640); ellP(0, 0, 70, 50, '#6a7a8a', { seed: 24245, lw: 2, shade: () => ellP(0, 0, 56, 40, '#a8c8d8', { seed: 24246, line: false }) }); pop();   // круглое зеркальце
}
/* ---------- пол и тумба (d 1.0) */
function hallMid(t, o = {}) {
  rectP(-400, 1530, 1800, 700, '#a87a4a', { seed: 24300, step: 60, shade: () => { for (let y = 1540; y < 2240; y += 50) stroke([[-400, y], [1400, y]], '#94683a', 3); } });
  rectP(-400, 1510, 1800, 24, '#6a4a2a', { seed: 24301, lw: 1.6 });
  rectP(200, 1560, 300, 70, '#8a6a3a', { seed: 24302, lw: 2, shade: () => txt('ДОМ', 350, 1606, 30, { font: 'Inter Black', col: '#6a4a2a' }) });   // коврик
  rectP(640, SHOE_TOP, 380, 290, '#e8e0d0', { seed: 24310, lw: 2.4, shade: () => { [[660, 1290], [840, 1290]].forEach(([x, y], i) => { rectP(x, y, 160, 200, '#d8d0c0', { seed: 24311 + i, lw: 1.6 }); dot(x + 140, y + 100, 6, '#8a8a92'); }); } });   // обувная тумба
  rectP(630, SHOE_TOP - 14, 400, 18, '#c8b898', { seed: 24315, lw: 1.6 });
  bowl2(1090, 1560);
  if (o.jacket !== false) jacket(150, 840, 1, { bulge: o.bulge !== false });
  stroke([[90, 820], [210, 820]], '#4a2a1a', 8); dot(150, 820, 10, '#8a8a92');                                                                // крючок
  if (o.sneaker2 !== false) sneaker(980, 1555, 0.8, 0.05);
  if (o.mouse) mouseDead(o.mouse[0], o.mouse[1], 0.8, o.mouse[2] ?? 0, { t });
}
function bowl2(x, y) { push(x, y); piece([[-50, -24], [50, -24], [40, 8], [-40, 8]], '#e8a83a', { seed: 24320, lw: 2 }); ellP(0, -24, 50, 10, '#a8643a', { seed: 24321, lw: 1.4 }); pop(); }
function hallFg(t) { push(1290, 1990, 1, 0.04); rectP(-90, -1100, 180, 1140, '#6a3a2a', { seed: 24500, lw: 3 }); pop(); }   // косяк двери в комнату у края
function hallLight(t, fn) { lightmap('#a8a0a0', () => { radial(-140, 700, 900, 'rgba(255,240,200,1)', 0.75); cone(-140, 700, 700, 1600, 800, 'rgba(255,240,210,1)', 0.3); radial(540, 120, 700, 'rgba(255,230,190,1)', 0.6); if (fn) fn(); }); }

// ------------------------------------------------------------------ вставки: пробковая доска
function corkBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#b88a5a', { seed, line: false, step: 80, shade: () => { const r = rng(seed + 1); for (let i = 0; i < 500; i++) dot(r() * 1280 - 100, r() * 2200 - 100, 2 + r() * 3, r() > 0.5 ? '#a87a4a' : '#c89a6a'); } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,230,180,0.1)'); g.addColorStop(1, 'rgba(40,20,0,0.5)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function catIco(x, y, s, col = '#8a7a6a') { push(x, y, s); blobP([[-50, 40], [-40, -10], [0, -30], [40, -10], [50, 40]], col, { seed: 24700, lw: 2 }); ellP(0, -50, 34, 30, col, { seed: 24701, lw: 2 });
  piece([[-26, -70], [-20, -100], [-6, -76]], col, { raw: true, lw: 1.6 }); piece([[26, -70], [20, -100], [6, -76]], col, { raw: true, lw: 1.6 }); stroke([[50, 30], [80, 0], [74, -30]], col, 8); pop(); }
function ratIco(x, y, s) { push(x, y, s); blobP([[-40, 0], [-24, -24], [20, -26], [44, -6], [24, 10], [-30, 10]], '#9a8a7a', { seed: 24710, lw: 2 }); stroke([[-40, 2], [-80, 14]], '#c89aa0', 3); dot(34, -10, 3, '#1c1512'); pop(); }
function adamecIns(t, c) {                                            // 1976: сытые коты бросают миску, ловят крысу, возвращаются доедать
  if (!c.fg) corkBg(24720, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 880, 780, 0, 24721, '#fbfaf2'); txt('ОПЫТ, 1976', 0, -330, 50, { font: 'Inter Black', col: '#1c1512' });
  const S = [['сытый кот у миски', c.bowl, 0], ['рядом — крыса', c.rat, 1], ['бросил еду, поймал', c.catch, 2], ['вернулся доедать', c.back, 3]];
  S.forEach(([s, t0, i]) => { if (t < t0 - 0.3) return; const y = -220 + i * 150; txt(String(i + 1), -380, y + 20, 50, { font: 'Inter Black', col: '#c8243c' });
    if (i === 0 || i === 3) { catIco(-260, y + 30, 0.6); bowl2(-170, y + 50); } if (i === 1) { catIco(-260, y + 30, 0.6); bowl2(-170, y + 50); ratIco(-60, y + 40, 0.7); } if (i === 2) { catIco(-120, y + 30, 0.6); ratIco(-60, y + 40, 0.7); bowl2(-300, y + 50); }
    txt(s, 60, y + 24, 38, { font: 'Inter Black', col: '#1c1512', align: 'left', maxW: 380 }); }); pop();
  if (t > c.back) { push(540, 1250, popK(t, c.back, 0.3), -0.03); ransom('ГОЛОД НИ ПРИ ЧЁМ', 0, 0, 80, 24722, { reveal: 1, pop: true }); pop(); }
  label(540, 1370, 'R. Adamec, Behavioral Biology, 1976', 0, '#f4e6a8', 0.01, 26);
}
function bird(x, y, s, col) { push(x, y, s); blobP([[-30, 0], [-10, -20], [20, -18], [34, -4], [20, 10], [-20, 10]], col, { seed: 24730, lw: 1.6 }); piece([[34, -8], [48, -4], [34, 0]], '#e8a83a', { raw: true, lw: 1 }); dot(22, -8, 3, '#1c1512'); pop(); }
function usIns(t, c) {                                                // США: ~2,4 млрд птиц и ~12 млрд зверьков в год, в основном бездомные кошки
  if (!c.fg) corkBg(24730, t); if (c.bg) return;
  push(540, 760, 1, 0.01); card(0, 0, 880, 760, 0, 24731, '#fbfaf2'); txt('США · КОШКИ ЗА ГОД', 0, -320, 46, { font: 'Inter Black', col: '#1c1512' });
  if (t > c.homeless - 0.2) txt('в основном — бездомные', 0, -260, 32, { font: 'Inter', weight: 800, col: '#6b5a48' });
  const k1 = sm(pr(t, c.birds - 0.6, c.birds + 0.4)), k2 = sm(pr(t, c.twelve - 0.4, c.beasts + 0.4));
  for (let i = 0; i < 12; i++) if (i < 12 * k1) bird(-330 + (i % 6) * 70, -170 + Math.floor(i / 6) * 60, 0.9, ['#5a8ac8', '#c8483a', '#e8a83a'][i % 3]);
  if (k1 > 0.5) txt('≈ 2,4 млрд птиц', 200, -140, 44, { font: 'Inter Black', col: '#2a5a8a', maxW: 360 });
  for (let i = 0; i < 36; i++) if (i < 36 * k2) ratIco(-340 + (i % 9) * 46, 20 + Math.floor(i / 9) * 50, 0.45);
  if (k2 > 0.5) txt('≈ 12 млрд зверьков', 200, 90, 44, { font: 'Inter Black', col: '#8a5a1a', maxW: 360 }); pop();
  label(540, 1250, 'Loss et al., Nature Communications, 2013 (медианы)', 0, '#f4e6a8', -0.01, 26);
}
function stashIns(t, c) {                                             // добычу несут в безопасное место «на потом»; «учит хозяина» — не доказано
  if (!c.fg) corkBg(24740, t); if (c.bg) return;
  push(540, 640, 1, -0.01); card(0, 0, 860, 440, 0, 24741, '#fbfaf2'); txt('«НА ПОТОМ»', 0, -160, 56, { font: 'Inter Black', col: '#1c1512' });
  piece([[-120, 120], [-120, -20], [0, -100], [120, -20], [120, 120]], '#e8c890', { seed: 24742, lw: 2.4, shade: () => { rectP(-30, 40, 60, 80, '#8a5a2a', { seed: 24743, line: false }); } }); txt('дом = безопасно', 260, 20, 34, { font: 'Inter Black', col: '#2a6a3a', maxW: 300 });
  if (t > c.later - 0.2) { sneaker(-300, 120, 0.7, 0); mouseDead(-300, 80, 0.5, 0); } pop();
  if (t > c.version - 0.2) { push(540, 1060, popK(t, c.version - 0.2, 0.3), 0.02); card(0, 0, 860, 300, 0, 24744, '#f6f1e4'); txt('«кошка учит хозяина охотиться»', 0, -60, 36, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
    if (t > c.notbelieve - 0.1) { push(0, 50, popK(t, c.notbelieve - 0.1, 0.25), -0.06); rectP(-230, -46, 460, 92, 'rgba(0,0,0,0)', { raw: true, lc: '#c8243c', lw: 9, tex: false }); txt('НЕ ДОКАЗАНО', 0, 18, 54, { font: 'Inter Black', col: '#c8243c' }); pop(); } pop(); }
}
function exeterIns(t, c) {                                            // Exeter 2021: 355 кошек — мясной корм −36 %, игра −25 %, кормушка-головоломка +33 %
  if (!c.fg) corkBg(24750, t); if (c.bg) return;
  push(540, 760, 1, 0.01); card(0, 0, 900, 800, 0, 24751, '#fbfaf2'); txt('БРИТАНИЯ · 355 КОШЕК', 0, -340, 46, { font: 'Inter Black', col: '#1c1512' }); txt('сколько добычи приносят домой', 0, -282, 30, { font: 'Inter', weight: 800, col: '#6b5a48' });
  const R = [['мясной корм без злаков', -36, c.meat, '#2a8a4a'], ['игра с удочкой 5–10 мин', -25, c.play, '#2a8a4a'], ['кормушка-головоломка', +33, c.puzzle, '#c8243c']];
  R.forEach(([s, v, t0, col], i) => { if (t < t0 - 0.2) return; const y = -170 + i * 170, k = sm(pr(t, t0 - 0.2, t0 + 0.5)); txt(s, -400, y, 36, { font: 'Inter Black', col: '#1c1512', align: 'left', maxW: 520 });
    const w = Math.abs(v) / 40 * 280 * k; rectP(v < 0 ? 40 - w : 40, y + 30, w, 60, col, { seed: 24752 + i, lw: 2 }); stroke([[40, y + 20], [40, y + 100]], '#1c1512', 4); txt((v > 0 ? '+' : '−') + Math.abs(v) + ' %', v < 0 ? 40 - w - 80 : 40 + w + 80, y + 76, 40, { font: 'Inter Black', col, maxW: 130 }); });
  pop(); label(540, 1250, 'Cecchetti et al., Current Biology, 2021', 0, '#f4e6a8', -0.01, 26);
}
