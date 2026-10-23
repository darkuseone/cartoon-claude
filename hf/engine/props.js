/* Реквизит и миры «Том и Никита»: кухня ночью, молоко, наука (неон), деревня (сепия), плёнка. Всё — мелом по угольной бумаге. */

// ------------------------------------------------------------------ кухня
/* o: lamp 0..1 (тёплая лампа включена), fridge 0..1 (дверь открыта), clock [ч, мин], warm 0..1 (общая теплота) */
function kitchen(t, o = {}) {
  const lamp = o.lamp ?? 0, fr = o.fridge ?? 1, warm = o.warm ?? lamp;
  // стена: плитка до середины, выше — обои с ромбами (едва видно)
  const wall = [[-200, -200], [1280, -200], [1280, 1560], [-200, 1560]];
  wash(pathOf(wall), mix('#18171d', '#2a2119', warm), 1);
  hatch(pathOf([[-200, 760], [1280, 760], [1280, 1560], [-200, 1560]]), [-200, 760, 1280, 1560], { ang: 0, gap: 64, w: 1.4, a: 0.12, seg: 1600, key: 1 });
  hatch(pathOf([[-200, 760], [1280, 760], [1280, 1560], [-200, 1560]]), [-200, 760, 1280, 1560], { ang: Math.PI / 2, gap: 64, w: 1.4, a: 0.1, seg: 1600, key: 2 });
  pencil([[-200, 760], [1280, 760]], { w: 3, a: 0.5, key: 3 });
  // окно: ночь, луна, город
  const wx = 640, wy = 170, ww = 360, wh = 400;
  const win = pathOf([[wx, wy], [wx + ww, wy], [wx + ww, wy + wh], [wx, wy + wh]]);
  wash(win, mix('#0d1530', '#2c2440', warm * 0.6), 1);
  ctx.save(); ctx.clip(win);
  glow(wx + 270, wy + 90, 140, 'rgba(210,225,255,0.5)', 0.7); ell(wx + 270, wy + 90, 34, 34, { wash: '#e9eef8', washA: 0.9, w: 2, key: 4 });
  const cr = rng(7); for (let i = 0; i < 14; i++) { ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.4 + 0.5 * Math.abs(Math.sin(t * 2 + i)); ctx.fillRect(wx + cr() * ww, wy + cr() * 200, 2.5, 2.5); } ctx.globalAlpha = 1;
  const city = [[wx, wy + wh], [wx, wy + 300], [wx + 40, wy + 300], [wx + 40, wy + 250], [wx + 90, wy + 250], [wx + 90, wy + 320], [wx + 130, wy + 320], [wx + 130, wy + 220], [wx + 185, wy + 220], [wx + 185, wy + 290], [wx + 240, wy + 290], [wx + 240, wy + 260], [wx + 300, wy + 260], [wx + 300, wy + 310], [wx + ww, wy + 310], [wx + ww, wy + wh]];
  shape(city, { wash: '#07080f', w: 2, a: 0.6, key: 5 });
  const wr = rng(8); ctx.fillStyle = '#ffd27a'; for (let i = 0; i < 26; i++) { ctx.globalAlpha = 0.5 + 0.4 * wr(); ctx.fillRect(wx + 10 + wr() * (ww - 20), wy + 240 + wr() * 140, 6, 8); } ctx.globalAlpha = 1;
  ctx.restore();
  rect(wx, wy, ww, wh, { w: 4, key: 6 }); pencil([[wx + ww / 2, wy], [wx + ww / 2, wy + wh]], { w: 3.4, key: 7 }); pencil([[wx, wy + wh * 0.42], [wx + ww, wy + wh * 0.42]], { w: 3, key: 8 });
  rect(wx - 20, wy + wh, ww + 40, 20, { wash: '#1b1a20', w: 3, key: 9 });
  // часы (пасхалка: скоро 3:00)
  const [ch, cm] = o.clock || [2, 58]; clockFace(470, 330, 62, ch, cm, t);
  // полка с банками
  pencil([[40, 600], [430, 600]], { w: 4, key: 10 }); [[90, 540, 40, 60], [160, 520, 46, 80], [250, 550, 36, 50], [330, 530, 50, 70]].forEach((v, i) => { rect(v[0] - v[2] / 2, v[1] - v[3] / 2 + (600 - v[1] - v[3] / 2), v[2], v[3], { wash: '#1c1b22', w: 2.4, key: 11 + i }); });
  // лампа над столом
  const lx = 760, ly = 140 + Math.sin(t * 0.8) * 3;
  pencil([[lx, -200], [lx + Math.sin(t * 0.8) * 2, ly - 40]], { w: 2.4, key: 20 });
  const shade = [[lx - 110, ly + 60], [lx - 40, ly - 40], [lx + 40, ly - 40], [lx + 110, ly + 60]];
  if (lamp > 0.01) { beam([[lx - 70, ly + 60], [lx + 70, ly + 60], [lx + 460, 1250], [lx - 460, 1250]], hexA(PAL.warm, 0.9), 0.22 * lamp); glow(lx, ly + 70, 380, hexA(PAL.warm, 0.6), 0.6 * lamp); }
  shape(shade, { wash: mix('#24232b', '#c0782a', lamp * 0.5), w: 3.4, key: 21, glow: lamp * 0.6, col: lamp > 0.5 ? mix(PAL.line, PAL.warm, 0.5) : PAL.line });
  ell(lx, ly + 66, 34, 12, { wash: lamp > 0.01 ? mix('#3a3530', '#fff4d0', lamp) : '#2a2830', w: 2, key: 22 });
  // пол
  wash(pathOf([[-200, 1560], [1280, 1560], [1280, 2200], [-200, 2200]]), mix('#121116', '#1e1812', warm), 1);
  pencil([[-200, 1560], [1280, 1560]], { w: 3.4, key: 30 });
  for (let i = -6; i <= 8; i++) pencil([[540 + i * 90, 1560], [540 + i * 210, 2100]], { w: 1.6, a: 0.25, pass2: false, key: 31 + i });
  // холодильник (слева), дверь открыта к зрителю
  fridge(t, fr);
}
function clockFace(x, y, r, h, m, t) {
  ell(x, y, r, r, { wash: '#1d1c22', w: 3.4, key: 40 }); ell(x, y, r * 0.86, r * 0.86, { line: true, w: 1.4, a: 0.4, key: 41 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; pencil([[x + Math.cos(a) * r * 0.72, y + Math.sin(a) * r * 0.72], [x + Math.cos(a) * r * 0.82, y + Math.sin(a) * r * 0.82]], { w: 2.2, pass2: false, gap: false, key: 42 + i }); }
  const ah = ((h % 12) + m / 60) / 12 * 6.283 - 1.5708, am = m / 60 * 6.283 - 1.5708;
  pencil([[x, y], [x + Math.cos(ah) * r * 0.45, y + Math.sin(ah) * r * 0.45]], { w: 4.4, pass2: false, gap: false, key: 55 });
  pencil([[x, y], [x + Math.cos(am) * r * 0.68, y + Math.sin(am) * r * 0.68]], { w: 3, pass2: false, gap: false, key: 56 });
  const as = (t % 60) / 60 * 6.283 * 12 - 1.5708; pencil([[x, y], [x + Math.cos(as) * r * 0.7, y + Math.sin(as) * r * 0.7]], { w: 1.4, col: PAL.alarm, a: 0.8, pass2: false, gap: false, key: 57 });
}
function fridge(t, open) {
  const x0 = -60, x1 = 250, y0 = 300, y1 = 1560;
  const body = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  shape(body, { wash: '#1e1d23', w: 4, key: 60 });
  if (open > 0.01) {
    const inner = [[x0 + 20, y0 + 40], [x1 - 14, y0 + 40], [x1 - 14, y1 - 40], [x0 + 20, y1 - 40]];
    const ip = pathOf(inner); wash(ip, mix('#1e1d23', '#cfe9ff', 0.75 * open), 1);
    glow(x1 - 60, y0 + 380, 420, hexA(PAL.cold, 0.8), 0.7 * open);
    hatch(ip, bbOf(inner), { ang: -1.3, gap: 9, w: 1.6, col: '#ffffff', a: 0.35 * open, key: 61 });
    [560, 820, 1080].forEach((y, i) => pencil([[x0 + 20, y], [x1 - 14, y]], { w: 3, col: '#0b1a2a', a: 0.7, key: 62 + i }));
    carton(150, 500, 0.62, { glow: open });
    [[60, 770, 50, 40], [170, 1040, 70, 46], [70, 1030, 40, 70]].forEach((v, i) => rect(v[0] - v[2] / 2, v[1] - v[3], v[2], v[3], { wash: '#9fb6c8', washA: 0.8, col: '#0b1a2a', w: 2.4, key: 66 + i }));
    // дверь распахнута к зрителю
    const dx = x1 + 120 * open;
    const door = [[x1, y0 - 10], [dx, y0 - 60], [dx, y1 + 80], [x1, y1 + 10]];
    shape(door, { wash: '#232229', w: 4, key: 70 }); pencil([[dx - 30, 700], [dx - 30, 900]], { w: 6, key: 71 });
    beam([[x1 + 6, y0 + 60], [x1 + 6, y1 - 20], [1180, 2100], [1180, 1300]], hexA(PAL.cold, 0.85), 0.16 * open);
  } else { pencil([[x0, 820], [x1, 820]], { w: 3, key: 72 }); pencil([[x1 - 30, 500], [x1 - 30, 700]], { w: 6, key: 73 }); pencil([[x1 - 30, 900], [x1 - 30, 1100]], { w: 6, key: 74 }); }
}
function table(x0, x1, y, o = {}) {                                // столешница в лёгкой перспективе
  const top = [[x0 + 60, y - 70], [x1 + 60, y - 70], [x1, y], [x0, y]];
  shape(top, { wash: mix('#2a2420', '#5a3a22', o.warm ?? 0), fill: mix('#8a6a4c', PAL.warm, (o.warm ?? 0) * 0.5), fillO: { a: 0.35, gap: 9, ang: 0.05, cross: false, key: 81 }, w: 3.6, key: 80 });
  shape([[x0, y], [x1, y], [x1, y + 34], [x0, y + 34]], { wash: '#1a1714', w: 3.4, key: 82 });
  [[x0 + 40, 0], [x1 - 60, 1]].forEach(([lx, i]) => shape([[lx, y + 34], [lx + 34, y + 34], [lx + 30, 1600], [lx + 6, 1600]], { wash: '#1a1714', w: 3, key: 83 + i }));
}

// ------------------------------------------------------------------ молоко и посуда
function carton(x, y, s, o = {}) {
  push(x, y, s, o.rot || 0);
  const lbl = o.cat ? '#3d8f6e' : '#3a6fc4';
  shape([[-80, -110], [80, -110], [80, 150], [-80, 150]], { wash: '#eef3f6', washA: 0.92, w: 3.4, key: 90 });
  shape([[-80, -110], [-40, -170], [40, -170], [80, -110]], { wash: '#dfe7ec', washA: 0.95, w: 3.2, key: 91 });
  rect(-30, -196, 60, 26, { wash: '#dfe7ec', w: 2.6, key: 92 });
  rect(-80, -40, 160, 110, { wash: lbl, washA: 0.95, w: 2.6, key: 93 });
  txt(o.cat ? 'ДЛЯ КОШЕК' : 'МОЛОКО', 0, -6, o.cat ? 28 : 40, { font: 'Osw', weight: 600, col: '#fff' });
  txt(o.cat ? 'без лактозы' : '3,2%', 0, 36, 30, { col: '#fff' });
  if (o.cat) { ell(0, 106, 26, 20, { wash: '#3d8f6e', washA: 0.9, w: 2, key: 94 }); [-16, 0, 16].forEach((dx, i) => ell(dx, 84 - (i === 1 ? 6 : 0), 6, 7, { wash: '#3d8f6e', w: 1.6, key: 95 + i })); }
  if (o.glow) glow(0, 0, 240, hexA(PAL.milk, 0.5), 0.5 * o.glow);
  pop();
}
/* блюдце: o.milk 0..1, o.slosh (рябь), o.glow, o.licked */
function saucer(x, y, s, o = {}) {
  push(x, y, s, o.rot || 0); const t = o.t ?? 0;
  ell(0, 10, 150, 42, { wash: '#2c2b33', w: 3.4, key: 100 });
  ell(0, 4, 128, 34, { wash: '#d9dee6', washA: 0.85, w: 2.6, key: 101 });
  if ((o.milk ?? 1) > 0.02) {
    const m = o.milk ?? 1, sl = o.slosh ?? 0;
    const mp = ellPts(0, 2, 104 * Math.sqrt(m), 25 * Math.sqrt(m)); const p = pathOf(mp);
    wash(p, PAL.milk, 1); ctx.save(); ctx.clip(p);
    for (let i = 0; i < 3; i++) { const rr = ((t * 0.8 + i / 3) % 1) * 100 * (0.3 + sl); pencil(ellPts(sl * 10 * Math.sin(t * 9), 2, rr, rr * 0.24), { w: 1.6, col: '#9cb8d0', a: 0.6 * (1 - rr / 100), pass2: false, gap: false, key: 102 + i }); }
    ctx.restore(); glow(0, 2, 200, hexA(PAL.milk, 0.6), (o.glow ?? 0.6) * m);
  }
  if (o.licked) for (let i = 0; i < 4; i++) pencil([[-60 + i * 36, -8], [-48 + i * 36, 14]], { w: 2, col: '#8aa0b4', a: 0.8, pass2: false, key: 106 + i });
  pop();
}
/* стакан: o.fill 0..1, o.water, o.licked (следы языка), o.glow */
function glass(x, y, s, o = {}) {
  push(x, y, s, o.rot || 0);
  const g = [[-52, -150], [52, -150], [42, 120], [-42, 120]];
  wash(pathOf(g), '#1a2129', 0.55);
  const f = o.fill ?? 0.8;
  if (f > 0.02) { const ty = lerp(120, -140, f), lp = [[lerp(-42, -52, (120 - ty) / 270), ty], [lerp(42, 52, (120 - ty) / 270), ty], [42, 120], [-42, 120]];
    const col = o.water ? '#7fd6ff' : PAL.milk; shape(lp, { wash: col, washA: o.water ? 0.55 : 0.95, line: false }); ell(0, ty, lerp(42, 52, (120 - ty) / 270), 8, { wash: col, washA: 0.9, w: 1.6, col: o.water ? '#bdeaff' : '#a9c1d6', key: 111 });
    glow(0, (ty + 120) / 2, 170, hexA(col, 0.6), o.glow ?? 0.5); }
  if (o.licked) { ctx.save(); ctx.clip(pathOf(g)); for (let i = 0; i < 7; i++) pencil(spline([[-40, -100 + i * 30], [0, -88 + i * 30 + 14], [40, -100 + i * 30]], false, 5), { w: 2, col: '#cfe0ee', a: 0.7, pass2: false, key: 112 + i }); ctx.restore(); }
  shape(g, { line: false }); pencil(g.concat([g[0]]), { w: 3.4, key: 120 });
  ell(0, -150, 52, 10, { w: 2.4, key: 121 });
  pencil([[-30, -120], [-26, 90]], { w: 5, col: '#ffffff', a: 0.35, pass2: false, gap: false, key: 122 });
  pop();
}
function litterBox(x, y, s, o = {}) {
  push(x, y, s, o.rot || 0); const t = o.t ?? 0;
  shape([[-170, -40], [170, -40], [150, 60], [-150, 60]], { wash: '#2d3b38', fill: '#6fae9a', fillO: { a: 0.35, gap: 8, key: 131 }, w: 3.6, key: 130 });
  ell(0, -40, 170, 24, { wash: '#3b3530', w: 3, key: 132 });
  const r = rng(133); ctx.fillStyle = '#b8a890'; for (let i = 0; i < 70; i++) { const a = r() * 6.28, rr = Math.sqrt(r()); ctx.globalAlpha = 0.7; ctx.fillRect(Math.cos(a) * 150 * rr, -40 + Math.sin(a) * 18 * rr, 4, 3); } ctx.globalAlpha = 1;
  if (o.stink) for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; pencil(spline([[-60 + i * 60, -60 - ph * 160], [-40 + i * 60, -100 - ph * 160], [-60 + i * 60, -140 - ph * 160], [-40 + i * 60, -180 - ph * 160]], false, 6), { w: 3, col: '#9fe07a', a: o.stink * (1 - ph), glow: 0.5, key: 134 + i }); }
  pop();
}
function ticket(x, y, s, o = {}) {
  push(x, y, s, o.rot || 0);
  const tk = [[-230, -100], [230, -100], [230, -30], [212, -14], [230, 4], [230, 100], [-230, 100], [-230, 4], [-212, -14], [-230, -30]];
  shape(tk, { wash: '#efe2c2', washA: 0.96, w: 3.4, col: '#3a2a1a', key: 140 });
  pencil([[110, -88], [110, 88]], { w: 2.2, col: '#3a2a1a', a: 0.6, key: 141 });
  txt('БИЛЕТ', -60, -48, 46, { font: 'Osw', weight: 600, col: '#3a2a1a' });
  txt('в ЛОТОК', -60, 8, 58, { col: '#c4332a' });
  txt('на всю ночь · 1 кот', -60, 62, 30, { col: '#3a2a1a' });
  txt('№ 3:00', 170, 0, 30, { col: '#3a2a1a', rot: -1.5708 });
  if (o.stamp > 0) { const k = popK(o.t ?? 0, o.stampT ?? 0, 0.3); push(-30, 0, 1.6 - 0.6 * k, -0.25); ell(0, 0, 120, 58, { w: 6, col: '#c4332a', a: 0.85 * o.stamp, key: 142 }); txt('ОДОБРЕНО', 0, 4, 44, { font: 'Osw', weight: 600, col: '#c4332a', a: 0.85 * o.stamp }); pop(); }
  pop();
}
function cardBox(x, y, s, o = {}) {
  push(x, y, s, o.rot || 0);
  shape([[-140, -60], [140, -60], [140, 120], [-140, 120]], { wash: '#2b2219', fill: '#b98a54', fillO: { a: 0.4, gap: 8, key: 151 }, w: 3.6, key: 150 });
  shape([[-140, -60], [-200, -130], [-60, -130], [0, -60]], { wash: '#2b2219', fill: '#b98a54', fillO: { a: 0.3, gap: 8, key: 153 }, w: 3, key: 152 });
  shape([[140, -60], [200, -130], [60, -130], [0, -60]], { wash: '#2b2219', fill: '#b98a54', fillO: { a: 0.3, gap: 8, key: 155 }, w: 3, key: 154 });
  pencil([[-60, 20], [60, 20]], { w: 6, col: '#e8d5b0', a: 0.6, key: 156 });
  if (o.cat) { push(0, -70, 0.42); tomHead({ t: o.t, lid: 0.55, light: { a: 0.3 } }); pop(); }
  pop();
}
function stool(x, y, s) { push(x, y, s); ell(0, 0, 120, 30, { wash: '#2a2420', fill: '#8a6a4c', fillO: { a: 0.35, gap: 9, key: 161 }, w: 3.4, key: 160 }); [[-90, 0], [90, 1], [-30, 2], [40, 3]].forEach(([lx, i]) => pencil([[lx, 20], [lx * 1.15, 380]], { w: 6, key: 162 + i })); pop(); }

// ------------------------------------------------------------------ наука (неон: мята, фиолет)
function lactase(x, y, s, o = {}) {                                // фермент-ножницы: мятный «пакман» с ножницами-челюстями
  const t = o.t ?? 0, chomp = o.chomp ?? (0.5 + 0.5 * Math.sin(t * 10 + x)), col = o.col || PAL.sci, a = o.a ?? 1;
  push(x, y, s, o.rot || 0); ctx.globalAlpha = a;
  const op = 0.15 + 0.55 * chomp, P = [[0, 0]]; for (let i = 0; i <= 30; i++) { const ang = op + (6.283 - op * 2) * i / 30; P.push([Math.cos(ang) * 60, Math.sin(ang) * 60]); }
  shape(P, { wash: hexA(col, 0.18), w: 4, col, glow: 0.9 * a, key: 170 });
  ell(-6, -30, 8, 9, { wash: col, line: false }); pencil([[-18, -48], [4, -42]], { w: 3, col, a, pass2: false, key: 171 });
  if (o.sleep) txt('z z', 50, -70, 40, { col, a: a * 0.9 });
  ctx.globalAlpha = 1; pop();
}
function hexPts(x, y, r, rot = 0) { const P = []; for (let i = 0; i <= 6; i++) { const a = rot + i / 6 * 6.283; P.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); } return P; }
function sugar(x, y, s, o = {}) {                                  // лактоза: два шестиугольника (галактоза + глюкоза) на связи; split разводит их
  const sp = o.split ?? 0, a = o.a ?? 1; push(x, y, s, o.rot || 0); ctx.globalAlpha = a;
  const dx = 46 + sp * 40;
  shape(hexPts(-dx, 0, 40, 0.52), { wash: hexA(PAL.sci2, 0.25), w: 3.6, col: PAL.sci2, glow: 0.8, key: 180 });
  shape(hexPts(dx, 0, 40, 0.52), { wash: hexA(PAL.sci2, 0.25), w: 3.6, col: mix(PAL.sci2, '#ffffff', 0.35), glow: 0.8, key: 181 });
  if (sp < 0.3) pencil([[-dx + 40, 0], [dx - 40, 0]], { w: 4, col: PAL.sci2, a: a * (1 - sp / 0.3), key: 182 });
  ctx.globalAlpha = 1; pop();
}
function bacterium(x, y, s, o = {}) {
  const t = o.t ?? 0, col = o.col || PAL.alarm; push(x, y, s, o.rot || 0);
  const P = []; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283, r = 52 + (i % 2 ? 16 : 0) + Math.sin(t * 7 + i) * 4; P.push([Math.cos(a) * r, Math.sin(a) * r]); }
  blob(P, { wash: hexA(col, 0.22), w: 3.6, col, glow: 0.8, key: 190 });
  ell(-18, -14, 9, 11, { wash: '#fff', w: 1.6, col, key: 191 }); ell(18, -14, 9, 11, { wash: '#fff', w: 1.6, col, key: 192 });
  ell(-16, -12, 4, 5, { wash: '#000', line: false }); ell(20, -12, 4, 5, { wash: '#000', line: false });
  const mo = 6 + 14 * Math.abs(Math.sin(t * 9 + x));
  shape([[-24, 16], [24, 16], [14, 16 + mo], [-14, 16 + mo]], { wash: '#0b0709', w: 2.4, col, key: 193 });
  for (let i = -2; i <= 2; i++) shape([[i * 9 - 4, 16], [i * 9 + 4, 16], [i * 9, 24]], { wash: '#fff', line: false });
  pop();
}
function waterDrop(x, y, s, a = 1) { push(x, y, s); shape(spline([[0, -40], [20, -6], [22, 14], [0, 30], [-22, 14], [-20, -6]], true, 6), { wash: hexA(PAL.cold, 0.35 * a), w: 3, col: PAL.cold, a, glow: 0.7 * a, key: 200 }); pop(); }
function bubble(x, y, r, a = 1, key = 0) { ell(x, y, r, r, { wash: 'rgba(160,255,140,0.08)', w: 2.6, col: '#bfff9a', a, glow: 0.5 * a, key: 210 + key }); pencil([[x - r * 0.5, y - r * 0.3], [x - r * 0.3, y - r * 0.55]], { w: 2, col: '#ffffff', a: a * 0.8, pass2: false, gap: false, key: 211 }); }

// ------------------------------------------------------------------ силуэты для морфинга (сидящий вислоухий кот анфас; одинаковое число точек)
function catSil(cx, cy, s, kind) {
  const k = kind === 'kitten', hr = k ? 95 : 150, sw = k ? 64 : 160, bw = k ? 100 : 250, bh = k ? 250 : 545, ck = k ? 1.08 : 1.18;
  const R = [[0, -hr], [hr * 0.42, -hr * 1.04], [hr * 0.86, -hr * 0.8], [hr * 0.78, -hr * 0.6], [hr * ck, hr * 0.1], [hr * 0.9, hr * 0.62], [sw, hr * 1.05], [bw * 0.92, bh * 0.55], [bw, bh * 0.8], [bw * 0.8, bh], [bw * 0.3, bh + 6]];
  const P = R.concat([[0, bh + 8]]).concat(R.slice(1).reverse().map(([x, y]) => [-x, y]));
  return spline(P.map(([x, y]) => [cx + x * s, cy + y * s]), true, 8);
}
function silExtras(cx, cy, s, kind, a, t) {                       // хвост и лапки силуэта
  const k = kind === 'kitten', bw = k ? 100 : 250, bh = k ? 250 : 545, col = PAL.sci, sw = Math.sin(t * 2) * 10;
  pencil(spline([[cx + bw * 0.75 * s, cy + bh * 0.95 * s], [cx + (bw + 60) * s, cy + bh * 0.9 * s], [cx + (bw + 70) * s, cy + bh * 0.6 * s + sw], [cx + (bw + 40) * s, cy + bh * 0.45 * s + sw]], false, 8), { w: 6, col, a, glow: 0.8, key: 456 });
  [-1, 1].forEach(sd => pencil(ellPts(cx + sd * bw * 0.32 * s, cy + bh * s, bw * 0.2 * s, bw * 0.1 * s), { w: 4, col, a, glow: 0.6, key: 457 + sd }));
}
function silFace(cx, cy, s, kind, a, t) {                         // глаза, нос, усы поверх силуэта
  const k = kind === 'kitten', hr = k ? 95 : 150, col = PAL.sci;
  [-1, 1].forEach(sd => { const ex = cx + sd * hr * 0.4 * s, ey = cy - hr * 0.02 * s, r = (k ? 30 : 34) * s;
    if (k) { pencil(ellPts(ex, ey, r, r * 1.05), { w: 4, col, a, glow: 0.8, key: 445 + sd }); ell(ex + 4 * s, ey + 4 * s, r * 0.5, r * 0.6, { wash: col, line: false }); }
    else { pencil(spline([[ex - r, ey], [ex, ey - r * 0.55], [ex + r, ey]], false, 6), { w: 4, col, a, glow: 0.8, key: 447 + sd }); pencil([[ex - r * 1.05, ey - 2], [ex + r * 1.05, ey - 2]], { w: 5, col, a, glow: 0.8, key: 449 + sd }); ell(ex, ey + r * 0.15, r * 0.18, r * 0.38, { wash: col, line: false }); }
    for (let i = 0; i < 2; i++) pencil([[cx + sd * hr * 0.3 * s, cy + hr * (0.38 + i * 0.1) * s], [cx + sd * hr * 1.25 * s, cy + hr * (0.25 + i * 0.25) * s]], { w: 2, col, a: a * 0.8, pass2: false, gap: false, key: 451 + sd * 3 + i }); });
  shape([[cx - 12 * s, cy + hr * 0.3 * s], [cx + 12 * s, cy + hr * 0.3 * s], [cx, cy + hr * 0.42 * s]], { wash: col, w: 2, col, a, key: 455 });
}
// ------------------------------------------------------------------ глобус и люди
function globe(x, y, r, t) {
  ell(x, y, r, r, { wash: '#101a26', w: 4, col: PAL.cold, glow: 0.4, key: 220 });
  ctx.save(); ctx.clip(pathOf(ellPts(x, y, r, r)));
  for (let i = -2; i <= 2; i++) pencil(ellPts(x, y, r * Math.cos(i * 0.5), r, 0, 0, 40), { w: 1.4, col: PAL.cold, a: 0.35, pass2: false, key: 221 + i });
  for (let i = -2; i <= 2; i++) pencil([[x - r, y + i * r * 0.38], [x + r, y + i * r * 0.38]], { w: 1.4, col: PAL.cold, a: 0.3, pass2: false, key: 226 + i });
  const sh = (t * 30) % (r * 2);
  [[-0.5, -0.3, 0.35, 0.25], [0.3, -0.1, 0.4, 0.45], [-0.1, 0.45, 0.25, 0.2]].forEach((c, i) => blob(ellPts(x + ((c[0] * r + sh) % (r * 2.4)) - r * 0.2, y + c[1] * r, c[2] * r, c[3] * r, i).filter((_, k) => k % 4 === 0), { wash: hexA(PAL.sci, 0.25), w: 2.4, col: PAL.sci, key: 231 + i }));
  ctx.restore();
}
function person(x, y, s, col, a = 1, key = 0) {
  push(x, y, s); ctx.globalAlpha = a;
  ell(0, -70, 28, 30, { wash: hexA(col, 0.3), w: 3.4, col, glow: col === PAL.alarm ? 0.8 : 0, key: 240 + key });
  shape(spline([[-46, 70], [-40, -10], [0, -32], [40, -10], [46, 70]], false, 6).concat([[-46, 70]]), { wash: hexA(col, 0.3), w: 3.4, col, glow: col === PAL.alarm ? 0.8 : 0, key: 241 + key });
  ctx.globalAlpha = 1; pop();
}

// ------------------------------------------------------------------ деревня (сепия)
function bucket(x, y, s, o = {}) {
  push(x, y, s);
  shape([[-90, -80], [90, -80], [70, 110], [-70, 110]], { wash: '#3a2a1c', fill: '#c99a5c', fillO: { a: 0.35, gap: 8, key: 251 }, w: 3.6, col: '#f3e2c0', key: 250 });
  [-30, 40].forEach((yy, i) => pencil([[-88 + (yy + 80) * 0.1, yy], [88 - (yy + 80) * 0.1, yy]], { w: 5, col: '#f3e2c0', a: 0.7, key: 252 + i }));
  ell(0, -80, 90, 22, { wash: '#fff6dc', washA: 0.95, w: 2.6, col: '#f3e2c0', key: 254 });
  ell(0, -82, 70, 14, { wash: '#ffe7a0', washA: 0.9, line: false });   // сливки
  pencil(spline([[-90, -80], [-40, -190], [40, -190], [90, -80]], false, 8), { w: 3, col: '#f3e2c0', a: 0.8, key: 255 });
  glow(0, -80, 160, 'rgba(255,230,160,0.6)', 0.5);
  pop();
}
function villageCat(x, y, s, t, o = {}) {                          // деревенский кот сбоку (сепия): идёт; o.lick — тянется к сливкам
  push(x, y, s, 0, o.flip ? -1 : 1); const col = '#f3e2c0', fill = '#c98a4a', L = { ang: -2.2, a: 0.45, col: '#ffd9a0', rimA: 0.4 };
  const wk = o.lick ? 0 : Math.sin(t * 7 + x * 0.01), lk = o.lick ? Math.sin(t * 12) : 0;
  const tail = tube([[-104, -52], [-150, -96 + wk * 6], [-148, -150], [-122, -176]], 22, 10); mass(tail.pts, '#2a1d12', fill, L, { key: 266, col, w: 3 });
  [[-84, 1], [-58, -1], [52, -1], [76, 1]].forEach(([lx, ph], i) => { const sw = wk * 14 * ph; const lg = tube([[lx, -20], [lx + sw * 0.5, 20], [lx + sw, 58]], 22, 16); mass(lg.pts, '#2a1d12', fill, L, { key: 267 + i, w: 2.6 }); });
  const body = spline([[84, -30], [56, -70], [-10, -80], [-84, -70], [-112, -36], [-80, 6], [20, 8], [80, 0]], true, 8);
  mass(body, '#2a1d12', fill, L, { key: 260, w: 3.4 });
  for (let i = 0; i < 4; i++) pencil([[-70 + i * 30, -76], [-60 + i * 30, -40]], { w: 5, col: '#2a1d12', a: 0.7, pass2: false, gap: false, key: 272 + i });
  const hx = o.lick ? 124 : 96, hy = o.lick ? -52 + lk * 5 : -94;
  const head = spline([[hx - 34, hy + 6], [hx - 26, hy - 26], [hx + 6, hy - 34], [hx + 34, hy - 14], [hx + 44, hy + 8], [hx + 20, hy + 28], [hx - 16, hy + 26]], true, 8);
  [[hx - 20, hy - 22, hx - 14, hy - 58, hx + 2, hy - 30], [hx + 6, hy - 32, hx + 18, hy - 62, hx + 26, hy - 24]].forEach((e, i) => shape([[e[0], e[1]], [e[2], e[3]], [e[4], e[5]]], { wash: '#2a1d12', fill, fillO: { a: 0.4, gap: 6, key: 276 + i }, w: 3, col, key: 278 + i }));
  mass(head, '#2a1d12', fill, L, { key: 262, w: 3.4 });
  ell(hx + 14, hy - 6, 5, o.lick ? 2 : 6, { wash: col, line: false }); shape([[hx + 40, hy + 4], [hx + 46, hy + 8], [hx + 40, hy + 12]], { wash: '#ee9aa8', line: false });
  for (let k = 0; k < 2; k++) pencil([[hx + 34, hy + 12 + k * 6], [hx + 76, hy + 4 + k * 12]], { w: 1.4, col, a: 0.8, pass2: false, gap: false, key: 280 + k });
  if (o.lick) shape(spline([[hx + 36, hy + 16], [hx + 52, hy + 18 + Math.max(0, lk) * 10], [hx + 44, hy + 30 + Math.max(0, lk) * 14], [hx + 34, hy + 24]], true, 5), { wash: '#ee9aa8', w: 2, col, key: 282 });
  pop();
}
function filmGate(t, a = 1) {                                      // рамка старой плёнки: перфорация, царапины, мерцание
  if (a <= 0.01) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1;
  ctx.globalAlpha = a; ctx.fillStyle = '#0b0805'; ctx.fillRect(0, 0, 90, H); ctx.fillRect(W - 90, 0, 90, H);
  const off = (t * 24 * 40) % 160; for (let y = -160 + off; y < H; y += 160) { ctx.fillStyle = '#e9dcc0'; ctx.globalAlpha = a * 0.85; ctx.fillRect(28, y, 34, 70); ctx.fillRect(W - 62, y, 34, 70); }
  const r = rng(hsh(FRAME, 31)); ctx.strokeStyle = '#f3e6c8';
  for (let i = 0; i < 3; i++) { if (r() < 0.5) continue; const x = 120 + r() * (W - 240); ctx.globalAlpha = a * 0.35; ctx.lineWidth = 1 + r() * 2; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + (r() - 0.5) * 30, H); ctx.stroke(); }
  for (let i = 0; i < 8; i++) { ctx.fillStyle = '#f3e6c8'; ctx.globalAlpha = a * 0.5 * r(); ctx.beginPath(); ctx.arc(120 + r() * (W - 240), r() * H, 1 + r() * 4, 0, 6.3); ctx.fill(); }
  ctx.globalAlpha = a * (0.06 + 0.06 * r()); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.restore();
}
function scent(pts, t, col, a = 1, key = 0) {                      // струйка запаха: бегущая волнистая линия
  const P = []; const n = 30; for (let i = 0; i <= n; i++) { const k = i / n, p = resampleN(pts, n + 1)[i]; P.push([p[0] + Math.sin(k * 14 - t * 8) * 14, p[1] + Math.cos(k * 14 - t * 8) * 10]); }
  pencil(P, { w: 3, col, a, glow: 0.7, gap: false, key: 280 + key });
}
