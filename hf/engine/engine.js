/* «Ночной графит» — движок рисованных кодом мультиков «Том и Никита» (по методичке «Мультики кодом»).
   ДНК: рисунок на двойках (12 рисунков/с при 24 fps), линии кипят (зерно = номер рисунка), рваная линия-лента с нажимом,
   второй тонкий проход, штриховка вместо заливки (на тёмной бумаге штрихуем СВЕТ), потёртая угольная бумага,
   строительные линии в начале сцен, свечение — только на акцентах. Всё считается от времени t, случайность — только с зерном. */
const W = 1080, H = 1920, DFPS = 12;

// ------------------------------------------------------------------ палитры: бумага + роли цветов (весь ролик перекрашивается одной строкой)
const PALS = {
  night: {                     // «ночной графит»: угольная бумага, мел, кислотный кошачий глаз
    paper: '#16151a', paperHi: 'rgba(210,200,230,0.035)', paperLo: 'rgba(0,0,0,0.05)',
    line: '#ece5d8', soft: 'rgba(236,229,216,0.5)', guide: 'rgba(236,229,216,0.16)', fill: '#1b1a20',
    eye: '#b8ff5a',            // акцент Тома: глаза, его ключевые слова
    milk: '#e9f6ff',           // молоко — светится холодным белым
    cold: '#7fc8ff',           // свет холодильника, ночь
    sci: '#5ef0c4', sci2: '#b08cff',   // наука: лактаза (мята) и сахар (фиолет)
    alarm: '#ff4d3d',          // тревога: понос, бактерии, «нельзя»
    warm: '#ffb24a',           // тёплое — только после поворота (лампа, деревня, финал)
    nik: '#4d8dff',            // худи Никиты
    rose: '#ee9aa8', skin: '#e9c3a4', fur: '#d9cdb8'
  },
  chalk: {                     // «мел»: зелёная доска
    paper: '#1f3a30', paperHi: 'rgba(220,240,230,0.04)', paperLo: 'rgba(0,0,0,0.05)',
    line: '#f1efe6', soft: 'rgba(241,239,230,0.5)', guide: 'rgba(241,239,230,0.16)', fill: '#22402f',
    eye: '#fff36b', milk: '#ffffff', cold: '#a7e4ff', sci: '#9ff5d0', sci2: '#ffb3e6', alarm: '#ff7a6b', warm: '#ffc76b',
    nik: '#8fc3ff', rose: '#ffb3c0', skin: '#f2d1b8', fur: '#e8e2d3'
  },
  blueprint: {                 // «синька»
    paper: '#14305c', paperHi: 'rgba(200,225,255,0.05)', paperLo: 'rgba(0,0,0,0.06)',
    line: '#e8f1ff', soft: 'rgba(232,241,255,0.5)', guide: 'rgba(232,241,255,0.18)', fill: '#173563',
    eye: '#ffe066', milk: '#ffffff', cold: '#9fdcff', sci: '#7dffd8', sci2: '#ffd0ff', alarm: '#ff8a7a', warm: '#ffc670',
    nik: '#bcd6ff', rose: '#ffc1cc', skin: '#ffe0c8', fur: '#e8f1ff'
  }
};
const THEME = typeof EP_THEME !== 'undefined' ? EP_THEME : 'night';
const PAL = PALS[THEME];

const cv = document.getElementById('c'), out = cv.getContext('2d');
const ink = document.createElement('canvas'); ink.width = W; ink.height = H;
let ctx = ink.getContext('2d');
let FRAME = 0, S = 1; const SS = [];

// ------------------------------------------------------------------ случайность с зерном
function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function hsh(...v) { let h = 2166136261; for (const x of v) { h ^= (x | 0); h = Math.imul(h, 16777619); } return h >>> 0; }
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const sm = k => { k = clamp(k); return k * k * (3 - 2 * k); };
const eo = k => 1 - Math.pow(1 - clamp(k), 3);                 // ease-out
const eio = k => { k = clamp(k); return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const pr = (t, a, b) => clamp((t - a) / (b - a));             // прогресс t на отрезке [a, b]
const q = t => Math.floor(t * DFPS + 1e-6) / DFPS;            // время рисунка (на двойках)
function popK(t, t0, d = 0.35) { const u = clamp((t - t0) / d); return u >= 1 ? 1 : 1 - Math.exp(-6 * u) * Math.cos(u * 11); }   // выскакивание с отскоком
function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
function mix(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = s => Math.round(lerp((a >> s) & 255, (b >> s) & 255, clamp(k)));
  return '#' + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1); }

// ------------------------------------------------------------------ бумага: один лист на весь ролик (угольная, потёртая)
const paper = document.createElement('canvas'); paper.width = W; paper.height = H;
(function makePaper() {
  const g = paper.getContext('2d'), r = rng(11);
  g.fillStyle = PAL.paper; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 320; i++) {                                // пятна плотности
    const x = r() * W, y = r() * H, rad = 40 + r() * 260, d = r() < 0.5;
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, d ? PAL.paperLo : PAL.paperHi); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  for (let i = 0; i < 2400; i++) {                               // волокна
    const x = r() * W, y = r() * H, a = r() * 6.28, l = 6 + r() * 28;
    g.strokeStyle = r() < 0.6 ? 'rgba(0,0,0,0.16)' : 'rgba(230,225,240,0.045)'; g.lineWidth = 0.6 + r();
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a) * l * 0.5 + r() * 4, y + Math.sin(a) * l * 0.5, x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  for (let i = 0; i < 4; i++) {                                  // следы от кружки
    const x = r() * W, y = r() * H, rad = 60 + r() * 120;
    g.strokeStyle = 'rgba(230,220,200,0.035)'; g.lineWidth = 3; g.beginPath(); g.ellipse(x, y, rad, rad * (0.8 + r() * 0.2), r() * 3, 0, 6.3); g.stroke();
  }
  for (let i = 0; i < 14; i++) {                                 // меловая пыль после ластика + призрачные линии
    const x = r() * W, y = r() * H;
    g.fillStyle = 'rgba(220,215,230,0.025)'; g.beginPath(); g.ellipse(x, y, 80 + r() * 120, 22 + r() * 40, r() * 3, 0, 6.3); g.fill();
    g.strokeStyle = 'rgba(236,229,216,0.05)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x - 90, y + 10); g.bezierCurveTo(x - 20, y - 50, x + 30, y + 40, x + 100, y - 5); g.stroke();
  }
  const vg = g.createRadialGradient(W / 2, H * 0.46, H * 0.25, W / 2, H * 0.5, H * 0.75);     // виньетка листа
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.42)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  const id = g.getImageData(0, 0, W, H), d = id.data;            // зерно
  for (let i = 0; i < d.length; i += 4) { const n = (r() - 0.5) * 14; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(id, 0, 0);
})();
const grain = document.createElement('canvas'); grain.width = 512; grain.height = 512;   // зерно, которое «съедает» мел (как по шершавой бумаге)
(function makeGrain() {
  const g = grain.getContext('2d'), r = rng(5), id = g.createImageData(512, 512), d = id.data;
  for (let i = 0; i < d.length; i += 4) { const v = r(); d[i] = d[i + 1] = d[i + 2] = 0; d[i + 3] = v < 0.45 ? 120 * r() : (v < 0.53 ? 210 : 0); }
  g.putImageData(id, 0, 0);
})();

// ------------------------------------------------------------------ стек трансформаций (толщина линий остаётся в пикселях экрана)
function push(x, y, s = 1, r = 0, fx = 1, sy = 1) { ctx.save(); SS.push(S); ctx.translate(x, y); if (r) ctx.rotate(r); ctx.scale(s * fx, s * sy); S *= s; }
function pop() { ctx.restore(); S = SS.pop(); }
function cam(cx, cy, z, rot = 0, shake = 0) {                    // камера: точка (cx, cy) мира в центре экрана, зум z
  const r = rng(hsh(FRAME, 99)); const wx = shake ? (r() - 0.5) * shake : 0, wy = shake ? (r() - 0.5) * shake : 0;
  ctx.save(); SS.push(S); ctx.translate(540 + wx, 960 + wy); if (rot) ctx.rotate(rot); ctx.scale(z, z); ctx.translate(-cx, -cy); S *= z;
}

// ------------------------------------------------------------------ карандаш (мел)
function resample(pts, step) {
  const o = [pts[0]]; let carry = 0;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], L = Math.hypot(x1 - x0, y1 - y0); let d = step - carry;
    while (d <= L) { o.push([x0 + (x1 - x0) * d / L, y0 + (y1 - y0) * d / L]); d += step; }
    carry = L - (d - step);
  }
  o.push(pts[pts.length - 1]); return o;
}
/* линия-лента с нажимом: сужается на концах, кипит, местами рвётся, поверх тонкий набросочный проход */
function pencil(pts, o = {}) {
  if (!pts || pts.length < 2) return;
  const w = (o.w ?? 3.4) / S, jit = (o.jit ?? 1.6) / S, col = o.col || PAL.line, A = o.a ?? 0.92;
  const r = rng(hsh(FRAME, pts[0][0] * 13, pts[0][1] * 7, (o.key || 0) + pts.length * 31));
  const P = resample(pts, 5 / S), n = P.length;
  const ph1 = r() * 6.28, ph2 = r() * 6.28, ph3 = r() * 6.28, gapR = r(), gapC = r(), gapL = r();
  let total = 0; const sArr = [0];
  for (let i = 1; i < n; i++) { total += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]) * S; sArr.push(total); }
  const off = (i, k) => {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const s = sArr[i], v = (0.7 * Math.sin(s * 0.012 + ph1 + k) + 0.3 * Math.sin(s * 0.05 + ph2 + k * 2)) * jit;
    return [P[i][0] - dy / L * v, P[i][1] + dx / L * v];
  };
  let g0 = -1, g1 = -1;
  if (o.gap !== false && total > 160 && gapR < 0.6) { g0 = (0.2 + gapC * 0.6) * total; g1 = g0 + 8 + gapL * 18; }
  const reveal = o.reveal ?? 1;                                   // проявление линии «пером» по длине
  ctx.strokeStyle = col; ctx.lineCap = 'round';
  if (o.glow) {                                                   // свечение под линией (только акценты!)
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = o.glow * 0.22; ctx.lineWidth = w * 5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n && sArr[i] <= total * reveal; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.stroke();
    ctx.globalAlpha = o.glow * 0.12; ctx.lineWidth = w * 11; ctx.stroke(); ctx.restore();
  }
  let prev = off(0, 0);
  for (let i = 1; i < n; i++) {
    const cur = off(i, 0), s = sArr[i], tt = s / (total || 1);
    if (tt > reveal) break;
    if (!(s > g0 && s < g1)) {
      const taper = o.taper === false ? 1 : Math.pow(clamp(tt / 0.12), 0.6) * Math.pow(clamp((1 - tt) / 0.15), 0.6);
      ctx.globalAlpha = A * (0.72 + 0.28 * r());
      ctx.lineWidth = w * (0.4 + 0.6 * taper) * (0.85 + 0.3 * Math.sin(s * 0.02 + ph3));
      ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(cur[0], cur[1]); ctx.stroke();
    }
    prev = cur;
  }
  if (o.pass2 !== false && reveal >= 1) {                         // второй тонкий проход
    ctx.globalAlpha = A * 0.3; ctx.lineWidth = w * 0.35; ctx.beginPath();
    let p = off(0, 2.1); ctx.moveTo(p[0], p[1]);
    for (let i = 1; i < n; i++) { p = off(i, 2.1); ctx.lineTo(p[0] + 1.2 / S, p[1] - 0.8 / S); }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
function hline(a, b, w, col, A, r) {                              // один штрих штриховки
  const mx = (a[0] + b[0]) / 2 + (r() - 0.5) * 3 / S, my = (a[1] + b[1]) / 2 + (r() - 0.5) * 3 / S;
  ctx.globalAlpha = A * (0.55 + 0.45 * r()); ctx.lineWidth = w * (0.7 + 0.5 * r()); ctx.strokeStyle = col;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(mx, my, b[0], b[1]); ctx.stroke();
}
/* штриховка вместо заливки: короткие штрихи с разбросом концов внутри формы */
function hatch(path, bb, o = {}) {
  const ang = o.ang ?? -0.95, gap = (o.gap ?? 10) / S, w = (o.w ?? 2.2) / S, col = o.col || PAL.line, A = o.a ?? 0.5;
  const cx = (bb[0] + bb[2]) / 2, cy = (bb[1] + bb[3]) / 2, R = Math.hypot(bb[2] - bb[0], bb[3] - bb[1]) / 2 + 4 / S;
  const r = rng(hsh(FRAME, cx * 3, cy * 5, (o.key || 0) + 77));
  const dx = Math.cos(ang), dy = Math.sin(ang), nx = -dy, ny = dx, seg = (o.seg ?? 70) / S;
  ctx.save(); if (path) ctx.clip(path); if (o.clip2) ctx.clip(o.clip2); ctx.lineCap = 'round';
  for (let k = -R; k <= R; k += gap) {
    const kk = k + (r() - 0.5) * gap * 0.5;
    for (let s = -R - r() * seg; s < R; s += seg * (0.75 + 0.5 * r())) {
      const L = seg * (0.55 + 0.6 * r());
      const a = [cx + nx * kk + dx * s, cy + ny * kk + dy * s], b = [a[0] + dx * L + (r() - 0.5) * 2 / S, a[1] + dy * L + (r() - 0.5) * 2 / S];
      if (o.fade) { const f = o.fade(a[0], a[1]); if (f <= 0.02) continue; hline(a, b, w, col, A * f, r); } else hline(a, b, w, col, A, r);
    }
  }
  ctx.restore(); ctx.globalAlpha = 1;
}
function crayon(path, bb, col, o = {}) {                          // цветной мелок: плотная штриховка + лёгкий второй слой
  hatch(path, bb, { ang: o.ang ?? -1.05, gap: o.gap ?? 6.5, w: o.w ?? 3.4, col, a: o.a ?? 0.7, key: (o.key || 0) + 1, seg: 60, clip2: o.clip2, fade: o.fade });
  if (o.cross !== false) hatch(path, bb, { ang: (o.ang ?? -1.05) + 0.6, gap: (o.gap ?? 6.5) * 1.6, w: (o.w ?? 3.4) * 0.8, col, a: (o.a ?? 0.7) * 0.5, key: (o.key || 0) + 2, seg: 50, clip2: o.clip2, fade: o.fade });
}
function wash(path, col, a = 0.6) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fill(path); ctx.restore(); }
/* полуплоскость к источнику света: клип для штриховки освещённой стороны */
function litClip(bb, ang, k = 0.5) {
  const cx = (bb[0] + bb[2]) / 2, cy = (bb[1] + bb[3]) / 2, R = Math.hypot(bb[2] - bb[0], bb[3] - bb[1]);
  const dx = Math.cos(ang), dy = Math.sin(ang), off = (k - 0.5) * R;
  const p = new Path2D(); const bx = cx - dx * off, by = cy - dy * off, nx = -dy, ny = dx;
  p.moveTo(bx + nx * R, by + ny * R); p.lineTo(bx + nx * R + dx * R * 2, by + ny * R + dy * R * 2); p.lineTo(bx - nx * R + dx * R * 2, by - ny * R + dy * R * 2); p.lineTo(bx - nx * R, by - ny * R); p.closePath();
  return p;
}

// ------------------------------------------------------------------ формы
function spline(cp, closed = true, n = 10) {                     // Catmull-Rom
  const P = []; const L = cp.length, m = closed ? L : L - 1;
  for (let i = 0; i < m; i++) {
    const p0 = cp[(i - 1 + L) % L], p1 = cp[i], p2 = cp[(i + 1) % L], p3 = cp[(i + 2) % L];
    const a0 = closed || i > 0 ? p0 : p1, a3 = closed || i < L - 2 ? p3 : p2;
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      P.push([0.5 * ((2 * p1[0]) + (-a0[0] + p2[0]) * t + (2 * a0[0] - 5 * p1[0] + 4 * p2[0] - a3[0]) * t2 + (-a0[0] + 3 * p1[0] - 3 * p2[0] + a3[0]) * t3),
              0.5 * ((2 * p1[1]) + (-a0[1] + p2[1]) * t + (2 * a0[1] - 5 * p1[1] + 4 * p2[1] - a3[1]) * t2 + (-a0[1] + 3 * p1[1] - 3 * p2[1] + a3[1]) * t3)]);
    }
  }
  P.push(closed ? P[0] : cp[L - 1]); return P;
}
function pathOf(pts) { const p = new Path2D(); p.moveTo(pts[0][0], pts[0][1]); for (const v of pts) p.lineTo(v[0], v[1]); p.closePath(); return p; }
function bbOf(pts) { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (const [x, y] of pts) { a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); } return [a, b, c, d]; }
function ellPts(cx, cy, rx, ry, rot = 0, over = 0, n = 44) {
  const a0 = (hsh(cx * 11, cy * 7) % 628) / 100, P = [];
  for (let i = 0; i <= n * (1 + over); i++) { const a = a0 + i / n * 6.2832, x = Math.cos(a) * rx, y = Math.sin(a) * ry; P.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]); }
  return P;
}
/* форма: заливка-заглушка (чтобы закрыть то, что позади) + мелок + штриховка + контур с заходом за начало */
function shape(pts, o = {}) {
  const path = pathOf(pts), bb = bbOf(pts);
  if (o.wash) wash(path, o.wash, o.washA ?? 1);
  if (o.fill) crayon(path, bb, o.fill, o.fillO || {});
  if (o.shade) hatch(path, bb, o.shade);
  if (o.line !== false) pencil(pts.concat(pts.slice(1, Math.max(3, Math.floor(pts.length * 0.06)))), { w: o.w ?? 3.4, col: o.col, a: o.a, key: o.key, glow: o.glow, reveal: o.reveal });
  return { path, bb };
}
function ell(cx, cy, rx, ry, o = {}) { return shape(ellPts(cx, cy, rx, ry, o.rot || 0), o); }
function blob(cp, o = {}) { return shape(spline(cp, true, 8), o); }
function line(cp, o = {}) { pencil(cp.length > 2 && o.smooth !== false ? spline(cp, false, 8) : cp, o); }
function rect(x, y, w, h, o = {}) { return shape([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], o); }
function arrow(pts, o = {}) {
  line(pts, o); const n = pts.length, [x1, y1] = pts[n - 1], [x0, y0] = pts[n - 2], a = Math.atan2(y1 - y0, x1 - x0), L = o.head ?? 26;
  pencil([[x1 - Math.cos(a - 0.5) * L, y1 - Math.sin(a - 0.5) * L], [x1, y1], [x1 - Math.cos(a + 0.5) * L, y1 - Math.sin(a + 0.5) * L]], { ...o, gap: false, reveal: 1 });
}
/* меховой контур: дуга эллипса с клоками-«языками пламени» разного размера, зачёсанными в сторону sweep */
function fur(cx, cy, rx, ry, a0, a1, n, len, seed, sweep = 0.25) {
  const r = rng(seed), P = [], st = (a1 - a0) / n;
  const at = (a, k) => [cx + Math.cos(a) * (rx + k), cy + Math.sin(a) * (ry + k)];
  for (let i = 0; i < n; i++) {
    const a = a0 + st * (i + (r() - 0.5) * 0.3), big = i % 3 === 1 ? 1.35 : 0.75, L = len * big * (0.6 + 0.6 * r()), sw = sweep * st * (1.4 + r());
    P.push(at(a, 0), at(a + st * 0.3 + sw * 0.25, L * 0.55), at(a + st * 0.45 + sw, L), at(a + st * 0.62 + sw * 0.5, L * 0.45));
  }
  P.push(at(a1, 0)); return P;
}
/* мягкий свет: плотность штриховки нарастает к источнику (без жёсткой границы) */
function litFade(bb, ang, k = 0.45, soft = 0.3) {
  const cx = (bb[0] + bb[2]) / 2, cy = (bb[1] + bb[3]) / 2, R = Math.hypot(bb[2] - bb[0], bb[3] - bb[1]) / 2 || 1, dx = Math.cos(ang), dy = Math.sin(ang);
  return (x, y) => sm((((x - cx) * dx + (y - cy) * dy) / R * 0.5 + 0.5 - (1 - k) + soft) / (2 * soft));
}
/* контровой свет: контур ещё раз светлым с ореолом, только со стороны источника */
function rim(pts, ang, col, a = 0.6, k = 0.7) {
  const bb = bbOf(pts); ctx.save(); ctx.clip(litClip(bb, ang, k)); pencil(pts, { w: 2.4, col, a, glow: 0.45, pass2: false, gap: false, key: 909 }); ctx.restore();
}
/* каракули (волосы, дым, шерсть): петли по эллипсу */
function scribble(cx, cy, rx, ry, n, seed, o = {}) {
  const r = rng(seed), P = []; let a = r() * 6.28;
  for (let i = 0; i < n; i++) { a += 0.5 + r() * 0.9; const rr = 0.35 + 0.65 * Math.sqrt(r()); P.push([cx + Math.cos(a) * rx * rr, cy + Math.sin(a) * ry * rr]); }
  line(P, { w: o.w ?? 2.2, col: o.col, a: o.a ?? 0.7, pass2: false, gap: false, key: seed });
}
/* морфинг формы: обе формы приводятся к одному числу точек */
function morphPts(A, B, k) {
  const N = 120, ra = resampleN(A, N), rb = resampleN(B, N); return ra.map((p, i) => [lerp(p[0], rb[i][0], k), lerp(p[1], rb[i][1], k)]);
}
function resampleN(pts, N) {
  let L = 0; const d = [0]; for (let i = 1; i < pts.length; i++) { L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); d.push(L); }
  const o = []; let j = 1; for (let i = 0; i < N; i++) { const s = L * i / (N - 1); while (j < d.length - 1 && d[j] < s) j++; const k = (s - d[j - 1]) / ((d[j] - d[j - 1]) || 1); o.push([lerp(pts[j - 1][0], pts[j][0], k), lerp(pts[j - 1][1], pts[j][1], k)]); }
  return o;
}
function txt(s, x, y, size, o = {}) {                           // надпись от руки: кипит, проявляется «пером» слева направо
  if ((o.a ?? 1) <= 0.005) return 0;
  ctx.save(); ctx.font = `${o.weight ?? 700} ${size / S}px ${o.font || 'Hand'}`; ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle';
  const r = rng(hsh(FRAME, x * 3, y * 5, s.length));
  const wTot = ctx.measureText(s).width;
  if (o.reveal !== undefined && o.reveal < 1) {
    const x0 = (o.align === 'left' ? x : x - wTot / 2);
    ctx.beginPath(); ctx.rect(x0 - 20 / S, y - size / S, (wTot + 40 / S) * clamp(o.reveal), size * 2 / S); ctx.clip();
  }
  ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot + (r() - 0.5) * 0.012);
  const dx = (r() - 0.5) * 2.4 / S, dy = (r() - 0.5) * 2.4 / S;
  if (o.glow) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.shadowColor = o.col; ctx.shadowBlur = 26; ctx.globalAlpha = o.glow * 0.5 * (o.a ?? 1); ctx.fillStyle = o.col; ctx.fillText(s, dx, dy); ctx.restore(); }
  if (o.stroke) { ctx.lineJoin = 'round'; ctx.lineWidth = o.stroke / S; ctx.strokeStyle = o.strokeCol || 'rgba(10,9,12,0.92)'; ctx.globalAlpha = o.a ?? 0.95; ctx.strokeText(s, dx, dy); }
  ctx.fillStyle = o.col || PAL.line; ctx.globalAlpha = o.a ?? 0.93;
  ctx.fillText(s, dx, dy); ctx.globalAlpha *= 0.35; ctx.fillText(s, dx + 1.5 / S, dy - 1 / S);
  ctx.restore(); return wTot;
}
function guides(alpha, list) {                                   // строительные линии: круги, оси, дуги — гаснут в начале сцены
  if (alpha <= 0.01) return;
  for (const g of list) {
    if (g[0] === 'c') pencil(ellPts(g[1], g[2], g[3], g[4] || g[3], 0, 0.2), { w: 1.6, col: PAL.line, a: 0.22 * alpha, pass2: false, jit: 2.5 });
    else pencil([[g[1], g[2]], [g[3], g[4]]], { w: 1.4, col: PAL.line, a: 0.2 * alpha, pass2: false, gap: false });
  }
}

// ------------------------------------------------------------------ свет (только акценты)
function glow(x, y, r, col, a = 1) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }
function screenFill(col, a, op) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; if (op) ctx.globalCompositeOperation = op; ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function beam(pts, col, a) {                                     // клин света (холодильник, фонарь, проектор)
  const p = pathOf(pts), bb = bbOf(pts); const g = ctx.createLinearGradient(pts[0][0], pts[0][1], (bb[0] + bb[2]) / 2 + (bb[2] - bb[0]) * 0.3, bb[3]);
  g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fill(p); ctx.restore();
  hatch(p, bb, { ang: Math.atan2(bb[3] - pts[0][1], (bb[0] + bb[2]) / 2 - pts[0][0]), gap: 16, w: 1.6, col, a: a * 0.45, seg: 90, key: 5 });
}
function motes(n, box, col, t, seed, o = {}) {                   // пылинки в луче, пузырьки, искры
  const [x0, y0, x1, y1] = box; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { const r = rng(seed * 1000 + i), sp = (o.sp ?? 20) * (0.5 + r()), ph = r() * 6.28, sz = (o.sz || 3) * (0.4 + r());
    const x = x0 + ((r() * (x1 - x0) + Math.sin(t * 0.7 + ph) * (o.wob ?? 18)) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
    const y = y0 + ((r() * (y1 - y0) - t * sp) % (y1 - y0) + (y1 - y0)) % (y1 - y0);
    ctx.globalAlpha = (o.a || 0.6) * (0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + ph))); ctx.beginPath(); ctx.arc(x, y, sz, 0, 6.3); ctx.fill(); }
  ctx.restore();
}
