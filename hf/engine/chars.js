/* Персонажи «Том и Никита» — риги, нарисованные кодом в стиле «ночной графит».
   Лица — на «сфере»: черты заданы углом u по горизонтали, поворот головы yaw сдвигает их и сжимает дальнюю сторону.
   ТОМ: огромный пушистый вислоухий табби, грива-воротник, крошечные сложенные ушки, кислотно-зелёные светящиеся глаза,
        тяжёлые веки (ему всё ясно), светлая морда, сидит «лапка на лапке». Босс кухни и профессор, матерится спокойно.
   НИКИТА: длинный сутулый парень лет 25, худи на размер больше, кудрявая копна, большой нос с горбинкой,
        щетина, мешки под глазами, серьга-гвоздик. Добрый, уверенный в глупостях. */

const VIS = { A: [0, 0], B: [0.28, 0], C: [0.55, 0.1], D: [0.95, 0], E: [0.6, 0.55], F: [0.32, 0.9], G: [0.2, 0], H: [0.45, 0], X: [0, 0] };
function mouthAt(who, t) {                                         // раскрытие рта и округлость губ по виземам Rhubarb
  const ln = LINES.find(l => l.speaker === who && t >= l.start - 0.02 && t <= l.end + 0.05);
  if (!ln) return { open: 0, round: 0, talking: false };
  const cues = ln.visemes; let i = cues.length - 1; while (i > 0 && cues[i].s > t) i--;
  const cur = VIS[cues[i]?.v ?? 'X'], prev = VIS[cues[i - 1]?.v ?? 'X'], k = clamp((t - (cues[i]?.s ?? 0)) / 0.06);
  return { open: lerp(prev[0], cur[0], k), round: lerp(prev[1], cur[1], k), talking: true };
}
function blinkAt(t, seed) { const per = 3.1 + (seed % 7) * 0.41, ph = (t + seed * 1.91) % per; return ph < 0.14 ? 1 - Math.abs(ph - 0.07) / 0.07 : 0; }

const TC = { base: '#4b423a', dark: '#15110e', light: '#efe5d3', muzzle: '#9a8f83', ruff: '#655b52', pad: '#c98d97' };
const NC = { skin: '#8c6b59', skinL: '#f7dcc4', hair: '#241a15', hairL: '#b08664', hood: '#1a2645', hoodL: '#5b97ff' };
const LDEF = { ang: -2.4, a: 0.42, col: '#9fd4ff', rimA: 0.45 };

// трубка по осевой: контур для лап, хвоста, рукавов, пальцев
function tube(cl, w0, w1) {
  const P = cl.length > 2 ? spline(cl, false, 8) : resample(cl, 6), n = P.length, Lf = [], Rt = [];
  for (let i = 0; i < n; i++) {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, w = lerp(w0, w1, i / (n - 1)) / 2;
    Lf.push([P[i][0] - dy / L * w, P[i][1] + dx / L * w]); Rt.push([P[i][0] + dy / L * w, P[i][1] - dx / L * w]);
  }
  return { pts: Lf.concat(Rt.reverse()), axis: P, left: Lf, right: Rt };
}
// контур головы с переменным радиусом и клоками шерсти
function headContour(R, seed, tuft) {
  const r = rng(seed), P = [], n = 60;
  for (let i = 0; i <= n; i++) {
    const a = -Math.PI / 2 + i / n * Math.PI * 2, rr = R(a), tl = tuft(a);
    P.push([Math.cos(a) * rr, Math.sin(a) * rr]);
    if (tl > 0 && i < n) { const dir = Math.cos(a) > 0 ? 1 : -1, st = Math.PI * 2 / n, L = tl * (i % 3 === 1 ? 1.3 : 0.6) * (0.6 + 0.6 * r());
      const at = (da, k) => { const aa = a + da * dir; return [Math.cos(aa) * (R(aa) + k), Math.sin(aa) * (R(aa) + k)]; };
      P.push(at(st * 0.35, L * 0.5), at(st * 0.75, L), at(st * 0.7, L * 0.35)); }
  }
  return P;
}
const bump = (a, c, w) => { const d = Math.atan2(Math.sin(a - c), Math.cos(a - c)); return Math.exp(-(d * d) / (w * w)); };
// масса формы: заглушка + мелок со стороны света + (опц.) контур
function mass(pts, base, light, L, o = {}) {
  const p = pathOf(pts), bb = bbOf(pts);
  wash(p, base, 1);
  if (light) crayon(p, bb, light, { a: (o.a ?? 1) * L.a, gap: o.gap ?? 7, key: o.key, fade: litFade(bb, L.ang, o.k ?? 0.5, 0.32), ang: o.ang });
  if (o.line !== false) pencil(pts.concat(pts.slice(1, 4)), { w: o.w ?? 3.4, key: (o.key || 0) + 5, a: o.la });
  return { path: p, bb };
}

// =========================================================================================== ТОМ
/* o: x, y, s, t, yaw(-0.6..0.6), tilt, lk:[x,y] взгляд, lid 0..1 (0.42 — фирменный ленивый прищур), pup 0..1 (0 щель, 1 круглый зрачок в темноте),
      brow -1 (злой) .. 1 (удивлён), smirk 0..1, m {open, round}, paw 0..1 поднять правую лапу, body, light {ang, a, col, rimA}, glowE,
      mood: 'smug'|'bliss'|'shock'|'angry', fluff, tailK */
function tom(o) {
  const t = o.t ?? 0, s = o.s ?? 1; push(o.x, o.y, s, o.rot || 0, o.flip ? -1 : 1);
  const breathe = 1 + 0.012 * Math.sin(t * 2.1);
  if (o.body !== false) { push(0, 520, 1, 0, 1, breathe); ctx.translate(0, -520); tomBody(o); pop(); }
  push(o.hx || 0, (o.bob ?? 0) + (o.body !== false ? (breathe - 1) * -300 : 0), 1, o.tilt || 0); tomHead(o); pop();
  if (o.body !== false && (o.paw ?? 0) > 0.02) tomPawUp(o);
  pop();
}
function tomBody(o) {
  const t = o.t ?? 0, L = { ...LDEF, ...(o.light || {}) }, fl = o.fluff ?? 1;
  // хвост — позади, огибает лапы спереди
  const tw = Math.sin(t * 1.7 + 1) * 16 + (o.tailK ?? 0) * 60;
  const tl = tube([[200, 470], [262, 548], [150, 590], [-10, 596], [-140, 570 + tw * 0.3], [-205, 526 + tw]], 74, 40);
  mass(tl.pts, TC.base, TC.light, L, { key: 41 });
  for (let i = 1; i < 8; i++) { const j = Math.floor(tl.axis.length * i / 9), a = tl.axis[j], b = tl.axis[j + 1], dx = b[0] - a[0], dy = b[1] - a[1], Lq = Math.hypot(dx, dy) || 1, w = lerp(30, 17, i / 9);
    pencil([[a[0] - dy / Lq * w, a[1] + dx / Lq * w], [a[0] + dx / Lq * 9, a[1] + dy / Lq * 9], [a[0] + dy / Lq * w, a[1] - dx / Lq * w]], { w: 9, col: TC.dark, a: 0.8, pass2: false, gap: false, key: 50 + i }); }
  pencil(tl.pts.concat([tl.pts[0]]), { w: 3, key: 49 });
  // туловище-булка
  const body = spline([[-150, 140], [-226, 290], [-248, 420], [-208, 515], [-90, 548], [90, 548], [208, 515], [248, 420], [226, 290], [150, 140]], true, 8);
  const B = mass(body, TC.base, TC.light, L, { key: 61, line: false });
  [[-214, 300, -150, 336], [-232, 366, -164, 398], [-236, 440, -174, 462], [214, 300, 150, 336], [232, 366, 164, 398], [236, 440, 174, 462]].forEach((v, i) =>
    pencil(spline([[v[0], v[1]], [(v[0] + v[2]) / 2, v[1] + 6], [v[2], v[3]]], false, 6), { w: 10, col: TC.dark, a: 0.75, pass2: false, gap: false, key: 70 + i }));
  pencil(fur(0, 335, 244, 214, 0.08, Math.PI - 0.08, 16, 20 * fl, 63, 0.5), { w: 3.2, key: 63 });
  pencil(spline([[-150, 140], [-226, 290], [-248, 420], [-218, 498]], false, 8), { w: 3.6, key: 64 });
  pencil(spline([[150, 140], [226, 290], [248, 420], [218, 498]], false, 8), { w: 3.6, key: 65 });
  rim(spline([[-150, 140], [-226, 290], [-248, 420], [-218, 498]], false, 8), L.ang, L.col, L.rimA);
  rim(spline([[150, 140], [226, 290], [248, 420], [218, 498]], false, 8), L.ang, L.col, L.rimA);
  // светлая грудь: длинная шерсть
  const ch = spline([[-96, 220], [-116, 340], [-80, 470], [0, 500], [80, 470], [116, 340], [96, 220]], true, 8);
  const C = mass(ch, TC.ruff, TC.light, { ...L, a: L.a * 0.8 }, { key: 66, line: false, ang: -1.2, gap: 8, k: 0.6 });
  for (let i = 0; i < 6; i++) { const x = -64 + i * 26 + Math.sin(i * 7) * 6; pencil(spline([[x, 280 + (i % 3) * 18], [x + 9, 340], [x + 2, 410 + (i % 2) * 24]], false, 6), { w: 1.8, a: 0.4, pass2: false, gap: false, key: 80 + i }); }
  // передние лапы: левая прямо, правая сверху крест-накрест (фирменная поза)
  tomLeg([[-66, 300], [-68, 420], [-64, 488]], [-62, 504, -0.05], 81, L);
  if ((o.paw ?? 0) < 0.02) tomLeg([[70, 300], [52, 420], [10, 486]], [-2, 508, -0.3], 91, L);
}
function tomLeg(cl, paw, key, L) {
  const lg = tube(cl, 74, 64); mass(lg.pts, TC.base, TC.light, L, { key, line: false });
  for (let i = 0; i < 3; i++) { const j = Math.floor(lg.axis.length * (0.2 + i * 0.22)), a = lg.axis[j]; pencil([[a[0] - 30, a[1] - 5], [a[0], a[1] + 5], [a[0] + 30, a[1] - 5]], { w: 7, col: TC.dark, a: 0.7, pass2: false, gap: false, key: key + 3 + i }); }
  pencil(lg.left, { w: 3.2, key: key + 1 }); pencil(lg.right, { w: 3.2, key: key + 2 });
  const [px, py, pr] = paw; push(px, py, 1, pr);
  const pw = ellPts(0, 0, 52, 28); mass(pw, TC.muzzle, TC.light, L, { key: key + 7, w: 3.2 });
  for (let i = -1; i <= 1; i++) pencil([[i * 17 - 4, 10], [i * 17, 25], [i * 17 + 4, 12]], { w: 2.2, a: 0.85, pass2: false, gap: false, key: key + 9 + i });
  pop();
}
function tomPawUp(o) {                                              // жест: правая лапа поднята (указывает когтем)
  const L = { ...LDEF, ...(o.light || {}) }, k = sm(o.paw), t = o.t ?? 0, wv = Math.sin(t * 9) * 6 * (o.pawWave ?? 0);
  const hx = lerp(10, o.pawX ?? 150, k), hy = lerp(486, (o.pawY ?? 150) + wv, k);
  tomLeg([[72, 290], [lerp(52, 160, k), lerp(420, 300, k)], [hx, hy]], [hx, hy + 12, lerp(-0.3, -1.25, k)], 101, L);
  if (k > 0.8) pencil([[hx + 22, hy - 30], [hx + 40, hy - 52], [hx + 36, hy - 28]], { w: 2.4, a: (k - 0.8) * 5, gap: false, pass2: false, key: 109 });
}
function tomHead(o) {
  const t = o.t ?? 0, yaw = o.yaw ?? 0, L = { ...LDEF, ...(o.light || {}) }, fl = o.fluff ?? 1, mood = o.mood || 'smug';
  const R = 150, fx = u => R * Math.sin(u + yaw), fk = u => Math.max(0, Math.cos(u + yaw));
  // грива-воротник под головой
  const rcx = fx(0) * 0.2, ruff = fur(rcx, 74, 204, 168, -0.14, Math.PI / 2, 7, 46 * fl, 201, 0.5).concat(fur(rcx, 74, 204, 168, Math.PI + 0.14, Math.PI / 2, 7, 46 * fl, 207, 0.5).reverse());
  const rp = pathOf(ruff.concat([[0, -40]])), rbb = bbOf(ruff);
  wash(rp, TC.ruff, 1); crayon(rp, rbb, TC.light, { a: L.a * 1.1, gap: 6.5, key: 202, fade: litFade(rbb, L.ang, 0.62, 0.35), ang: -1.3 });
  for (let i = 0; i < 14; i++) { const a = 0.1 + i / 13 * (Math.PI - 0.2), x0 = Math.cos(a) * 126, y0 = 74 + Math.sin(a) * 104; pencil([[x0, y0], [Math.cos(a + 0.08) * 172, 74 + Math.sin(a + 0.08) * 146], [Math.cos(a + 0.18) * 196, 74 + Math.sin(a + 0.18) * 160]], { w: 2, a: 0.5, pass2: false, gap: false, key: 210 + i }); }
  pencil(ruff, { w: 3.4, key: 203 }); rim(ruff, L.ang, L.col, L.rimA);
  ctx.save(); ctx.clip(rp); ctx.translate(fx(0) * 0.3, 128); ctx.scale(1, 0.3); const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, 170); sg.addColorStop(0, 'rgba(10,8,6,0.75)'); sg.addColorStop(1, 'rgba(10,8,6,0)'); ctx.fillStyle = sg; ctx.fillRect(-170, -170, 340, 340); ctx.restore();   // мягкая тень от головы
  // голова: круглый череп, щёки-бакенбарды
  const Rf = a => R * (1 + 0.17 * bump(a, 0.42 + yaw * 0.3, 0.5) + 0.17 * bump(a, Math.PI - 0.42 + yaw * 0.3, 0.5) - 0.07 * bump(a, Math.PI / 2, 0.35)) * (Math.sin(a) < 0 ? 0.93 : 1);
  const hp = headContour(Rf, 220 + (mood === 'shock' ? 1 : 0), a => (Math.sin(a) > -0.1 ? 26 * fl : 7) * (mood === 'shock' ? 1.8 : 1));
  const HD = mass(hp, TC.base, TC.light, L, { key: 221, line: false, k: 0.42 });
  // уши-складки: маленькие клапаны свисают вперёд-вбок
  [[-1], [1]].forEach(([sd], i) => {
    const a1 = -Math.PI / 2 + sd * (0.5 - yaw * 0.5), a2 = -Math.PI / 2 + sd * (1.18 - yaw * 0.5); const vis = fk(sd * 0.85); if (vis < 0.05) return;
    const A = [Math.cos(a1) * Rf(a1) * 0.95, Math.sin(a1) * Rf(a1) * 0.95], B = [Math.cos(a2) * Rf(a2) * 0.95, Math.sin(a2) * Rf(a2) * 0.95];
    const flick = (o.ear ?? 0) * 10 + Math.max(0, Math.sin(t * 0.9 + i * 4) - 0.96) * 160;
    const T = [(A[0] + B[0]) / 2 + sd * 34, (A[1] + B[1]) / 2 + 26 - flick * 0.4], Tp = [(A[0] + B[0]) / 2 - sd * 6, (A[1] + B[1]) / 2 - 42 - flick];
    pencil(spline([B, [T[0] - sd * 4, T[1] + 8], [T[0] + sd * 4, T[1] - 4]], false, 6), { w: 8, col: TC.dark, a: 0.8, pass2: false, gap: false, key: 238 + i });
    const ep = spline([A, Tp, [T[0] + sd * 6, T[1] - 10], T, B, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + 8]], true, 8);
    mass(ep, TC.base, TC.light, L, { key: 230 + i * 7, w: 3.2 });
    pencil(spline([[lerp(A[0], B[0], 0.25), lerp(A[1], B[1], 0.25) - 8], [Tp[0] * 0.5 + T[0] * 0.5, Tp[1] * 0.4 + T[1] * 0.6], [T[0] - sd * 6, T[1] - 2]], false, 6), { w: 2.4, a: 0.75, pass2: false, key: 236 + i });
  });
  pencil(hp.concat(hp.slice(1, 4)), { w: 3.8, key: 222 }); rim(hp, L.ang, L.col, L.rimA);
  // «М» табби на лбу и полосы на щеках (тёмные)
  const mx = fx(0) * 0.9;
  [[-40, -64, -30, -116], [-14, -70, -10, -128], [14, -70, 10, -128], [40, -64, 30, -116]].forEach((v, i) => pencil([[mx + v[0], v[1]], [mx + v[2] * 1.05, (v[1] + v[3]) / 2], [mx + v[2], v[3]]], { w: 9, col: TC.dark, a: 0.85, pass2: false, gap: false, key: 240 + i }));
  [-1, 1].forEach((sd, i) => { const u = sd * 0.95; if (fk(u) < 0.2) return; const x0 = fx(u) * 1.08;
    for (let k = 0; k < 2; k++) pencil([[x0, 18 + k * 30], [x0 - sd * 26, 22 + k * 30], [x0 - sd * 48, 34 + k * 28]], { w: 8, col: TC.dark, a: 0.8, pass2: false, gap: false, key: 250 + i * 2 + k }); });
  // светлая морда
  const nx = fx(0), nk = 0.6 + 0.4 * fk(0);
  const mz = spline([[nx, 26], [nx + 62 * nk, 44], [nx + 76 * nk, 86], [nx + 36 * nk, 118], [nx - 36 * nk, 118], [nx - 76 * nk, 86], [nx - 62 * nk, 44]], true, 8);
  mass(mz, TC.muzzle, TC.light, { ...L, a: L.a * 1.3 }, { key: 270, line: false, k: 0.75, gap: 6 });
  // глаза
  const bl = Math.max(blinkAt(t, 7), o.blinkF ?? 0);
  [[-0.41, -1], [0.41, 1]].forEach(([u, side], i) => tomEye(fx(u), -10, fk(u), side, o, bl, 260 + i * 20));
  // подушечки усов, рот, нос
  const m = o.m || { open: 0, round: 0 }, open = m.open * (mood === 'shock' ? 1.3 : 1), sm2 = o.smirk ?? 0.35;
  [-1, 1].forEach(sd => { const px = nx + sd * 28 * nk; ctx.save(); ctx.fillStyle = TC.dark; for (let k = 0; k < 4; k++) { ctx.globalAlpha = 0.75; ctx.beginPath(); ctx.arc(px + sd * (4 + (k % 2) * 10 + k * 4) * nk, 62 + (k >> 1) * 10 + (k % 2) * 3, 2.4, 0, 6.3); ctx.fill(); } ctx.restore(); });
  if (open > 0.04) {                                                 // открытый рот: тёмная пасть, язык, клыки
    const ow = (26 - 10 * m.round) * nk, oh = 12 + open * 48, my = 72;
    const mp = spline([[nx - ow, my], [nx, my - 2], [nx + ow, my], [nx + ow * 0.7, my + oh * 0.7], [nx, my + oh], [nx - ow * 0.7, my + oh * 0.7]], true, 6);
    shape(mp, { wash: '#0b0709', w: 2.8, key: 281 });
    ctx.save(); ctx.clip(pathOf(mp)); ell(nx, my + oh * 0.82, ow * 0.62, oh * 0.28, { wash: TC.pad, washA: 0.9, line: false }); ctx.restore();
    if (open > 0.3) [-1, 1].forEach(sd => shape([[nx + sd * ow * 0.78, my + 1], [nx + sd * ow * 0.5, my + 1], [nx + sd * ow * 0.64, my + 18]], { wash: '#f3eee4', w: 1.4, key: 282 + sd }));
  }
  shape(spline([[nx - 17 * nk, 44], [nx + 17 * nk, 44], [nx + 8 * nk, 58], [nx, 62], [nx - 8 * nk, 58]], true, 6), { wash: TC.pad, w: 2.6, key: 284 });   // нос
  const cy = 72;
  pencil([[nx, 62], [nx, cy - 2]], { w: 2.6, pass2: false, gap: false, key: 285 });
  pencil(spline([[nx, cy - 2], [nx - 14 * nk, cy + 6], [nx - 30 * nk, cy - 1 - sm2 * 2]], false, 6), { w: 3, gap: false, key: 286 });
  pencil(spline([[nx, cy - 2], [nx + 14 * nk, cy + 6], [nx + 30 * nk, cy - 2 - sm2 * 13]], false, 6), { w: 3, gap: false, key: 287 });
  pencil(spline([[nx - 18, 104], [nx, 110], [nx + 18, 104]], false, 6), { w: 2.2, a: 0.6, pass2: false, gap: false, key: 288 });
  // усы — кипят и подёргиваются
  const tw = Math.sin(t * 2.3) * 4 + (o.whisk ?? 0) * 10;
  for (let sd = -1; sd <= 1; sd += 2) for (let k = 0; k < 3; k++) {
    const x0 = nx + sd * 44 * nk, y0 = 64 + k * 10, x1 = x0 + sd * (200 - k * 24), y1 = y0 - 30 + k * 32 + tw * (k - 1) * 0.6;
    pencil([[x0, y0], [lerp(x0, x1, 0.5), lerp(y0, y1, 0.5) - 9], [x1, y1]], { w: 1.6, a: 0.8, pass2: false, gap: false, key: 290 + k + sd * 5 });
  }
  // брови-вибриссы
  const br = o.brow ?? 0;
  [[-0.41, -1], [0.41, 1]].forEach(([u, sd], i) => { if (fk(u) < 0.1) return; const ex = fx(u);
    for (let k = 0; k < 2; k++) pencil([[ex - sd * 6, -64 - br * 10], [ex + sd * 30, -92 - br * 14 - k * 10], [ex + sd * 64, -124 - br * 16 - k * 16]], { w: 1.5, a: 0.8, pass2: false, gap: false, key: 300 + i * 4 + k }); });
}
function tomEye(ex, ey, k, side, o, blink, key) {
  if (k < 0.12) return;
  const mood = o.mood || 'smug', rx = 46 * (0.35 + 0.65 * k), ry = 44, lk = o.lk || [0, 0];
  const lid = mood === 'bliss' ? 1 : clamp(Math.max(o.lid ?? 0.42, blink));
  if (lid > 0.96) {                                                   // закрытый глаз: дуга (довольная — вверх)
    const up = mood === 'bliss' ? -1 : 1;
    pencil(spline([[ex - rx, ey + 4], [ex, ey + 4 + up * 18], [ex + rx, ey + 4]], false, 6), { w: 4.6, key }); return;
  }
  const ep = ellPts(ex, ey, rx, ry, side * 0.08), path = pathOf(ep);
  ctx.save(); ctx.fillStyle = '#0c0a08'; ctx.fill(pathOf(ellPts(ex, ey, rx + 6, ry + 6, side * 0.08))); ctx.restore();
  const g = ctx.createRadialGradient(ex + lk[0] * 8, ey + 8, 2, ex, ey, ry * 1.05);
  g.addColorStop(0, mix(PAL.eye, '#ffffff', 0.55)); g.addColorStop(0.55, PAL.eye); g.addColorStop(1, mix(PAL.eye, '#0a1a05', 0.6));
  ctx.save(); ctx.fillStyle = g; ctx.fill(path); ctx.restore();
  hatch(path, bbOf(ep), { ang: 1.2, gap: 7, w: 1.4, col: mix(PAL.eye, '#000000', 0.55), a: 0.4, key: key + 1 });
  const pw = lerp(5, 30, o.pup ?? 0.15) * (mood === 'shock' ? 0.5 : 1), ph = mood === 'shock' ? 22 : 38;
  ctx.save(); ctx.clip(path); ctx.fillStyle = '#050406';
  ctx.beginPath(); ctx.ellipse(ex + lk[0] * rx * 0.4, ey + lk[1] * 10, pw * k, ph, 0, 0, 6.3); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.beginPath(); ctx.arc(ex - rx * 0.3 + lk[0] * 6, ey - 16, 7, 0, 6.3); ctx.fill();
  ctx.beginPath(); ctx.arc(ex + rx * 0.28, ey + 14, 3, 0, 6.3); ctx.fill();
  // веко: тяжёлое, срезанное (злость — наклон к носу)
  const br = o.brow ?? 0, tiltL = (mood === 'angry' ? -0.4 : 0) + br * -0.12;
  const ly = ey - ry + lid * ry * 2.05, dyIn = side * tiltL * rx;
  ctx.fillStyle = TC.base; ctx.beginPath(); ctx.moveTo(ex - rx * 1.4, ey - ry * 1.6); ctx.lineTo(ex + rx * 1.4, ey - ry * 1.6);
  ctx.lineTo(ex + rx * 1.4, ly - dyIn); ctx.quadraticCurveTo(ex, ly + 6, ex - rx * 1.4, ly + dyIn); ctx.closePath(); ctx.fill();
  ctx.restore();
  glow(ex, ey, 120, hexA(PAL.eye, 0.55), (o.glowE ?? 0.6) * (1 - lid * 0.7));
  pencil(ep.concat(ep.slice(1, 4)), { w: 3, key: key + 2 });
  if (lid > 0.05) pencil([[ex - rx * 1.12, ly + dyIn * 0.8 + 2], [ex, ly + 6], [ex + rx * 1.12, ly - dyIn * 0.8 + 2]], { w: 5.5, key: key + 3, gap: false });
  pencil([[ex - rx * 0.8, ey + ry + 7], [ex, ey + ry + 13], [ex + rx * 0.8, ey + ry + 7]], { w: 1.8, a: 0.55, pass2: false, gap: false, key: key + 4 });
}

// =========================================================================================== НИКИТА
/* o: x, y, s, t, yaw, tilt, lk, lid 0..1, brow -1..1, browA (асимметрия), smile -1..1, m {open, round}, mood: 'eww'|'shock'|'dumb'|'angry'|'sick',
      arms: { l: [[ex,ey],[hx,hy],'pose','front'|'back'], r: [...] } (координаты от центра головы), lean, light */
function nikita(o) {
  const t = o.t ?? 0, s = o.s ?? 1; push(o.x, o.y, s, o.rot || 0, o.flip ? -1 : 1);
  push(0, 0, 1, o.lean || 0); nikBody(o);
  push(0, (o.bob ?? 0), 1, o.tilt || 0); nikHead(o); pop();
  nikArms(o, 'front'); pop();
  pop();
}
function nikLegs(o) {
  const lg = o.legs; if (!lg) return; const L = { ...LDEF, ...(o.light || {}) };
  const P = lg === 'crouch' ? [[[-90, 620], [-170, 820], [-120, 1010]], [[90, 620], [190, 800], [150, 1000]]]
          : lg === 'sit' ? [[[-90, 620], [-110, 760], [-150, 1060]], [[90, 620], [120, 760], [170, 1060]]]
          : [[[-80, 620], [-96, 980], [-104, 1330]], [[80, 620], [92, 980], [98, 1330]]];
  P.forEach((cl, i) => { const tb = tube(cl, 128, 98); mass(tb.pts, '#1d2433', '#7f93b8', L, { key: 470 + i * 5, gap: 7, line: false }); pencil(tb.left, { w: 3.4, key: 471 + i * 5 }); pencil(tb.right, { w: 3.4, key: 472 + i * 5 });
    const e = cl[2]; shape(spline([[e[0] - 60, e[1] - 10], [e[0] + 70 * (i ? 1 : -1) * 0.2 + 40, e[1] - 20], [e[0] + 80, e[1] + 30], [e[0] - 66, e[1] + 34]], true, 6), { wash: '#e9e4da', washA: 0.9, w: 3.2, key: 473 + i * 5 }); });
}
function nikBody(o) {
  const L = { ...LDEF, ...(o.light || {}) };
  nikLegs(o);
  const hood = spline([[-132, 178], [-122, 110], [-62, 88], [62, 88], [122, 110], [132, 178], [60, 208], [-60, 208]], true, 8);
  mass(hood, NC.hood, NC.hoodL, L, { key: 401, a: 1.3 });
  pencil(spline([[-96, 162], [-42, 130], [42, 130], [96, 162]], false, 6), { w: 2.2, a: 0.6, key: 403 });
  nikArms(o, 'back');
  const hp = spline([[-46, 178], [-152, 216], [-208, 266], [-230, 420], [-236, 660], [236, 660], [230, 420], [208, 266], [152, 216], [46, 178]], true, 8);
  mass(hp, NC.hood, NC.hoodL, { ...L, a: L.a * 1.5 }, { key: 411, line: false, gap: 6, k: 0.62 });
  hatch(pathOf(hp), bbOf(hp), { ang: -0.4, gap: 11, w: 1.6, col: NC.hoodL, a: 0.22, key: 412 });
  pencil(hp.concat(hp.slice(1, 4)), { w: 3.8, key: 413 }); rim(hp, L.ang, L.col, L.rimA);
  [[-150, 300, -122, 420], [150, 300, 120, 430], [-62, 250, -42, 330], [72, 260, 56, 340]].forEach((v, i) => pencil([[v[0], v[1]], [(v[0] + v[2]) / 2 + 8, (v[1] + v[3]) / 2], [v[2], v[3]]], { w: 2.2, a: 0.55, pass2: false, key: 420 + i }));
  pencil(spline([[-132, 660], [-120, 530], [120, 530], [132, 660]], false, 6), { w: 2.8, a: 0.8, key: 425 });
  const sw = Math.sin((o.t ?? 0) * 1.6) * 4;
  [-1, 1].forEach((sd, i) => { pencil([[sd * 22, 208], [sd * 26 + sw, 272], [sd * 24 + sw * 1.4, 332]], { w: 2.6, key: 430 + i, gap: false });
    rect(sd * 24 + sw * 1.4 - 5, 332, 10, 22, { wash: PAL.line, washA: 0.9, w: 1.6, key: 432 + i }); });
  const nk = spline([[-34, 100], [-36, 150], [-44, 192], [0, 214], [44, 192], [36, 150], [34, 100]], true, 6);
  mass(nk, mix(NC.skin, '#000000', 0.25), NC.skinL, L, { key: 441, w: 3, a: 0.6 });
  pencil([[6, 150], [10, 160], [6, 170]], { w: 2, a: 0.6, pass2: false, gap: false, key: 443 });     // кадык
  pencil(spline([[-50, 188], [0, 224], [50, 188]], false, 6), { w: 3.4, key: 444 });                 // ворот
}
function nikArms(o, layer) {
  const A = o.arms || {}, L = { ...LDEF, ...(o.light || {}) };
  [['l', -1], ['r', 1]].forEach(([k, sd], i) => {
    const def = [[sd * 206, 440], [sd * 186, 610], 'down', 'front'], a = A[k] || def; if ((a[3] || 'front') !== layer) return;
    const sh = [sd * 162, 240], el = a[0], hd = a[1];
    const tb = tube([sh, el, hd], 96, 70);
    mass(tb.pts, NC.hood, NC.hoodL, { ...L, a: L.a * 1.5 }, { key: 450 + i * 9, line: false, gap: 6 });
    pencil(tb.left, { w: 3.4, key: 451 + i * 9 }); pencil(tb.right, { w: 3.4, key: 452 + i * 9 });
    const n = tb.axis.length, c0 = tb.axis[n - 4], c1 = tb.axis[n - 1], ang = Math.atan2(c1[1] - c0[1], c1[0] - c0[0]);
    pencil([[c1[0] - Math.sin(ang) * 35, c1[1] + Math.cos(ang) * 35], [c1[0] + Math.sin(ang) * 35, c1[1] - Math.cos(ang) * 35]], { w: 3.2, key: 453 + i * 9 });   // манжета
    hand(c1[0] + Math.cos(ang) * 26, c1[1] + Math.sin(ang) * 26, ang, a[2] || 'down', sd, 454 + i * 9, L, a[4] || 0);
  });
}
function finger(x0, y0, x1, y1, w, key, L) { const f = tube([[x0, y0], [x1, y1]], w, w * 0.8); mass(f.pts, NC.skin, NC.skinL, L, { key, w: 2.4, gap: 6 }); }
function hand(x, y, ang, pose, sd, key, L, rot) {
  push(x, y, 1, ang + rot, 1, sd < 0 ? -1 : 1);
  const palm = spline([[-10, -24], [30, -27], [46, -8], [42, 20], [10, 28], [-12, 16]], true, 6);
  if (pose === 'spread') { [[-0.5, 30], [-0.15, 34], [0.18, 32], [0.5, 26]].forEach(([a, l], k) => finger(38, -16 + k * 11, 38 + Math.cos(a) * l, -16 + k * 11 + Math.sin(a) * l * 1.4, 15, key + 2 + k, L)); }
  if (pose === 'point') finger(36, -14, 84, -18, 15, key + 2, L);
  mass(palm, NC.skin, NC.skinL, L, { key, w: 3 });
  if (pose === 'down' || pose === 'hold' || pose === 'fist') for (let k = 0; k < 3; k++) pencil([[30, -14 + k * 11], [44, -12 + k * 12]], { w: 2, a: 0.75, pass2: false, gap: false, key: key + 6 + k });
  finger(6, -20, pose === 'hold' ? 30 : 22, pose === 'hold' ? -44 : -40, 16, key + 9, L);   // большой палец
  pop();
}
function curls(pts, seed, sz, o = {}) {                             // кудри по контуру: петли
  const r = rng(seed); for (let i = 0; i < pts.length; i += o.step ?? 3) { const [x, y] = pts[i], rr = sz * (0.6 + 0.7 * r());
    const sp = []; const a0 = r() * 6.28; for (let k = 0; k <= 16; k++) { const a = a0 + k / 16 * 6.28 * 1.25, q2 = rr * (1 - k / 40); sp.push([x + Math.cos(a) * q2, y + Math.sin(a) * q2 * 0.85]); }
    pencil(sp, { w: o.w ?? 2.6, col: o.col, a: o.a ?? 0.85, pass2: false, gap: false, key: seed + i }); }
}
function nikHead(o) {
  const t = o.t ?? 0, yaw = o.yaw ?? 0, mood = o.mood || '', L = { ...LDEF, ...(o.light || {}) };
  const R = 96, fx = u => R * Math.sin(u + yaw), fk = u => Math.max(0, Math.cos(u + yaw));
  // уши (+ серьга)
  [[-1.45, -1], [1.45, 1]].forEach(([u, sd], i) => { if (Math.cos(u + yaw) < -0.25) return; const ex = R * Math.sin(u + yaw) * 1.02;
    mass(spline([[ex, -8], [ex + sd * 20, -24], [ex + sd * 27, 8], [ex + sd * 12, 38], [ex, 30]], true, 6), NC.skin, NC.skinL, L, { key: 501 + i * 3, w: 3 });
    pencil([[ex + sd * 8, -6], [ex + sd * 16, 8], [ex + sd * 8, 22]], { w: 2, a: 0.6, pass2: false, key: 507 + i });
    if (sd > 0) { ell(ex + sd * 12, 42, 4, 4, { wash: PAL.cold, w: 1.4, key: 509 }); glow(ex + sd * 12, 42, 18, hexA(PAL.cold, 0.8), 0.6); } });
  // череп и челюсть (челюсть уезжает при открытом рте)
  const m = o.m || { open: 0, round: 0 }, jaw = m.open * 14 + (mood === 'shock' ? 16 : 0), sh = yaw * 34;
  const head = spline([[sh * 0.2, -126], [62 + sh * 0.4, -114], [94 + sh * 0.2, -60], [97 + sh * 0.1, 0], [88 + sh * 0.25, 46], [70 + sh * 0.5, 96 + jaw * 0.6], [30 + sh * 0.85, 132 + jaw], [sh, 140 + jaw],
    [-30 + sh * 0.85, 132 + jaw], [-70 + sh * 0.5, 96 + jaw * 0.6], [-88 + sh * 0.25, 46], [-97 + sh * 0.1, 0], [-94 + sh * 0.2, -60], [-62 + sh * 0.4, -114]], true, 8);
  const HD = mass(head, NC.skin, NC.skinL, { ...L, a: L.a * 1.25 }, { key: 511, line: false, k: 0.5 });
  const sr = rng(513); ctx.save(); ctx.clip(HD.path); ctx.fillStyle = '#1a1310';          // щетина
  for (let i = 0; i < 190; i++) { const a = sr() * Math.PI, rr = 0.55 + sr() * 0.5, x = sh * 0.7 + Math.cos(a) * 82 * rr, y = 58 + jaw * 0.5 + Math.sin(a) * 78 * rr; if (y < 72 && Math.abs(x - sh) < 42) continue; ctx.globalAlpha = 0.45 + sr() * 0.3; ctx.fillRect(x, y, 2.2, 2.2); }
  ctx.restore();
  pencil(head.concat(head.slice(1, 5)), { w: 3.8, key: 514 }); rim(head, L.ang, L.col, L.rimA);
  pencil(spline([[-62 + sh * 0.5, 66], [-52 + sh * 0.6, 84], [-60 + sh * 0.5, 100]], false, 5), { w: 1.8, a: 0.5, pass2: false, key: 515 });
  // кудрявая копна
  const hair = spline([[-106 + sh * 0.1, -24], [-124, -84], [-104, -140], [-56, -176], [4, -190], [62, -176], [108, -140], [124, -82], [108, -22], [92, -60], [64, -70], [30, -54], [-6, -74], [-44, -60], [-80, -70]], true, 6);
  const hp = pathOf(hair), hbb = bbOf(hair);
  wash(hp, NC.hair, 1); crayon(hp, hbb, NC.hairL, { a: 0.7, gap: 6, w: 3, key: 521, fade: litFade(hbb, L.ang, 0.55, 0.4) });
  ctx.save(); ctx.clip(hp); const cr = rng(525); for (let i = 0; i < 26; i++) pencil(ellPts(-110 + cr() * 220, -180 + cr() * 140, 10 + cr() * 9, 8 + cr() * 7, cr() * 3, 0.15, 12), { w: 2, col: NC.hairL, a: 0.55, pass2: false, gap: false, key: 526 + i }); ctx.restore();
  curls(hair.slice(0, Math.floor(hair.length * 0.6)), 541, 15, { step: 3, col: NC.hairL, w: 3 });
  curls(hair.slice(Math.floor(hair.length * 0.6)), 571, 12, { step: 3, a: 0.75, col: NC.hairL, w: 2.6 });
  pencil(hair.concat(hair.slice(1, 3)), { w: 2.4, col: PAL.line, a: 0.55, key: 579 });
  // брови
  const br = o.brow ?? 0, ba = o.browA ?? 0, eyeY = -6;
  [[-0.42, -1], [0.42, 1]].forEach(([u, sd], i) => { if (fk(u) < 0.12) return; const ex = fx(u), w = 32 * (0.4 + 0.6 * fk(u)), lift = br * 12 + (sd > 0 ? ba : -ba) * 10, inner = mood === 'eww' || mood === 'angry' ? 9 : (mood === 'shock' || mood === 'dumb' ? -9 : 0);
    const bp = spline([[ex - sd * w * 0.9, eyeY - 30 - lift + inner], [ex, eyeY - 41 - lift * 1.2], [ex + sd * w * 1.05, eyeY - 32 - lift]], false, 6);
    pencil(bp, { w: 11, col: NC.hair, a: 1, key: 550 + i, gap: false }); pencil(bp, { w: 3, col: NC.hairL, a: 0.8, key: 552 + i, gap: false }); });
  // глаза: миндалины, мешки, тяжёлые веки
  const bl = Math.max(blinkAt(t, 3), o.blinkF ?? 0), lid = clamp(Math.max(o.lid ?? 0.3, bl) + (mood === 'eww' ? 0.35 : 0) - (mood === 'shock' ? 0.3 : 0), 0, 1), lk = o.lk || [0, 0];
  [[-0.42, -1], [0.42, 1]].forEach(([u, sd], i) => { const k = fk(u); if (k < 0.15) return; const ex = fx(u), rx = 24 * (0.4 + 0.6 * k), ry = mood === 'shock' ? 18 : 13;
    const ep = spline([[ex - rx, eyeY + 2], [ex - rx * 0.3, eyeY - ry], [ex + rx * 0.5, eyeY - ry * 0.9], [ex + rx, eyeY], [ex + rx * 0.2, eyeY + ry * 0.8], [ex - rx * 0.5, eyeY + ry * 0.7]], true, 6), path = pathOf(ep);
    if (lid < 0.95) {
      ctx.save(); ctx.fillStyle = '#ebe5d8'; ctx.fill(path); ctx.clip(path);
      const ix = ex + lk[0] * rx * 0.45 + yaw * 6, iy = eyeY + 1 + lk[1] * 4, ir = mood === 'shock' ? 7 : 10;
      ctx.fillStyle = '#6a4630'; ctx.beginPath(); ctx.arc(ix, iy, ir, 0, 6.3); ctx.fill(); ctx.fillStyle = '#0a0708'; ctx.beginPath(); ctx.arc(ix, iy, ir * 0.5, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ix - 3, iy - 4, 2.6, 0, 6.3); ctx.fill();
      const ly = eyeY - ry + lid * ry * 2; ctx.fillStyle = NC.skin; ctx.fillRect(ex - rx * 1.3, eyeY - ry * 2, rx * 2.6, ly - (eyeY - ry * 2));
      ctx.restore();
      pencil([[ex - rx * 1.05, eyeY - ry + lid * ry * 2 + 3], [ex, eyeY - ry - 1 + lid * ry * 2], [ex + rx * 1.12, eyeY - ry * 0.6 + lid * ry * 2]], { w: 4, key: 561 + i, gap: false });
      pencil(ep.slice(Math.floor(ep.length * 0.55)), { w: 1.8, a: 0.6, pass2: false, gap: false, key: 563 + i });
    } else pencil(spline([[ex - rx, eyeY + 2], [ex, eyeY + (mood === 'eww' ? -4 : 6)], [ex + rx, eyeY]], false, 5), { w: 4, key: 565 + i });
    pencil(spline([[ex - rx * 0.8, eyeY + ry + 6], [ex, eyeY + ry + 13], [ex + rx * 0.9, eyeY + ry + 4]], false, 5), { w: 1.8, a: 0.5, pass2: false, gap: false, key: 567 + i });   // мешки
  });
  // нос: большой, с горбинкой, с тенью
  const nx = fx(0), nsd = yaw >= 0 ? 1 : -1;
  const nose = spline([[nx - nsd * 4, -18], [nx + nsd * 4, 8], [nx + nsd * 18 + yaw * 18, 44], [nx + nsd * 8, 60], [nx - nsd * 12, 58], [nx - nsd * 10, 20]], true, 6);
  wash(pathOf(nose), mix(NC.skin, '#000000', 0.3), 0.8);
  pencil(spline([[nx - nsd * 6, -16], [nx + nsd * 4, 10], [nx + 18 * nsd + yaw * 18, 44], [nx + 8 * nsd, 60]], false, 6), { w: 3.6, key: 571 });
  pencil(spline([[nx - 18, 52], [nx - 6, 62], [nx + 10, 59]], false, 5), { w: 2.8, key: 572 });
  ell(nx - 8 + yaw * 8, 55, 4.5, 3, { wash: '#0a0708', line: false });
  // рот
  const mw = 38 * (0.6 + 0.4 * fk(0)) * (1 - m.round * 0.45), my = 90 + jaw * 0.4, smile = o.smile ?? 0, mx = fx(0) * 0.9;
  if (m.open > 0.05 || mood === 'shock' || mood === 'eww') {
    const oh = 6 + m.open * 34 + (mood === 'shock' ? 22 : 0);
    const mp = spline([[mx - mw, my - smile * 8], [mx, my - 4], [mx + mw, my - smile * 8 - (o.smirkN ?? 0) * 8], [mx + mw * 0.6, my + oh * 0.8], [mx, my + oh], [mx - mw * 0.6, my + oh * 0.8]], true, 6);
    shape(mp, { wash: '#0b0709', w: 3.2, key: 581 });
    ctx.save(); ctx.clip(pathOf(mp)); ctx.fillStyle = '#ece6da'; ctx.globalAlpha = 0.92; ctx.fillRect(mx - mw, my - 12, mw * 2, 10 + Math.min(6, oh * 0.18)); ctx.restore();
    if (mood === 'eww') shape(spline([[mx - 11, my + oh * 0.6], [mx + 13, my + oh * 0.6], [mx + 9, my + oh + 24], [mx - 7, my + oh + 24]], true, 5), { wash: PAL.rose, washA: 0.95, w: 2.4, key: 583 });
    else { ctx.save(); ctx.clip(pathOf(mp)); ell(mx, my + oh * 0.85, mw * 0.5, oh * 0.25, { wash: PAL.rose, washA: 0.7, line: false }); ctx.restore(); }
  } else pencil(spline([[mx - mw, my - smile * 10], [mx - mw * 0.3, my + 2 + smile * 4], [mx + mw * 0.4, my + 1 + smile * 4], [mx + mw, my - smile * 10 - (o.smirkN ?? 0) * 10]], false, 6), { w: 3.8, key: 584 });
  pencil(spline([[mx - 14, my + 28 + jaw * 0.6], [mx, my + 32 + jaw * 0.6], [mx + 14, my + 28 + jaw * 0.6]], false, 5), { w: 1.8, a: 0.5, pass2: false, gap: false, key: 585 });
  if (mood === 'eww' || mood === 'sick') glow(nx, 40, 170, 'rgba(140,255,120,0.55)', 0.3);
}
