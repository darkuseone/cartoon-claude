/* «Живая камера 2.5D» (по мотивам x01_cam25 из проекта USA Survive, адаптировано под 1080×1920).
   Сцена раскладывается на планы глубины d (небо/окно 2–3, стена 1.3–1.5, герои 1.0, передний план 0.5–0.7).
   Камера RIG {X, Y, Z — наезд, zoom, roll}: план на глубине d масштабируется zoom·d/(d−Z) и сдвигается на X/d → параллакс, наезды, «вертиго»;
   планы вне фокуса размываются (глубина резкости). cam25(cx, cy, z) ставит камеру так, что план d=1 выглядит как прежний cam(cx, cy, z).
   Склейки — переходы TRANS: 'clock' (стрелка часов), 'glow' (радиевая вспышка), 'whip' (хлыст), 'fly' (пролёт), 'flash' (вспышка фотоаппарата), 'iris'.
   Серия включает: frame = frame25; SHOTS = [[t, 'план', 'переход'?], …]; в scene() — plane(i, d, fn) и onPlane(1, свет). */
const RIG = { X: 0, Y: 0, Z: 0, zoom: 1, roll: 0, shake: 0, focus: 1, dof: 4 };
const PL = [0, 1, 2, 3, 4, 5].map(() => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; });
const XA = document.createElement('canvas'), XB = document.createElement('canvas'); XA.width = XB.width = W; XA.height = XB.height = H;

/* камера: (cx, cy, z) как у cam(); o: Z (наезд 0..0.5), roll, shake, focus, dof, hand (ручная камера, 1 — по умолчанию) */
function cam25(cx, cy, z, o = {}) {
  const t = TT25, h = o.hand ?? 1;
  RIG.X = cx - 540 + h * (7 * Math.sin(t * 0.9) + 3 * Math.sin(t * 2.3 + 1.1));
  RIG.Y = cy - 960 + h * (5 * Math.sin(t * 0.7 + 2) + 2.5 * Math.sin(t * 1.9));
  RIG.zoom = z; RIG.Z = o.Z ?? 0; RIG.roll = (o.roll ?? 0) + h * 0.006 * Math.sin(t * 0.6 + 0.4);
  RIG.shake = o.shake ?? 0; RIG.focus = o.focus ?? 1; RIG.dof = o.dof ?? 4;
}
function planeT(g, d) {
  const s = RIG.zoom * d / Math.max(0.08, d - RIG.Z), r = rng(hsh(FRAME, 99)), sx = RIG.shake ? (r() - 0.5) * RIG.shake : 0, sy = RIG.shake ? (r() - 0.5) * RIG.shake : 0;
  g.translate(540 + sx, 960 + sy); if (RIG.roll) g.rotate(RIG.roll); g.scale(s, s); g.translate(-(540 + RIG.X / d), -(960 + RIG.Y / d)); return s;
}
/* нарисовать fn на плане глубины d: параллакс + размытие вне фокуса; o.blur — доп. размытие, o.a — прозрачность */
function plane(i, d, fn, o = {}) {
  const c = PL[i], g = c.getContext('2d'), prev = ctx, pS = S, pSS = SS.splice(0);
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.filter = 'none'; g.clearRect(0, 0, W, H);
  const s = planeT(g, d); ctx = g; S = s; fn(); ctx = prev; S = pS; SS.push(...pSS);
  const b = RIG.dof * Math.abs(1 / d - 1 / RIG.focus) + (o.blur || 0);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); if (b > 0.4) ctx.filter = `blur(${Math.min(16, b).toFixed(1)}px)`; ctx.globalAlpha = o.a ?? 1; ctx.drawImage(c, 0, 0); ctx.restore();
}
/* рисовать прямо в кадр в координатах плана d (свет lightmap, частицы поверх всего) */
function onPlane(d, fn) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const pS = S; S = planeT(ctx, d); fn(); S = pS; ctx.restore(); }
/* вставка-коллаж в 2.5D: фон чуть глубже карточек — карточки «висят» над фоном */
function insert25(t, bgFn, cardsFn, o = {}) {
  cam25(540, 960, o.z ?? (1 + 0.025 * Math.sin(t * 0.8)), { hand: o.hand ?? 0.7, shake: o.shake ?? 0, roll: o.roll ?? 0, focus: 1, dof: 3 });
  plane(0, 1.25, bgFn); plane(1, 1.0, cardsFn);
}

// ------------------------------------------------------------------ склейки с переходами
let TT25 = 0;
const TRANS = {                                                       // длительность перехода, с
  clock: 0.45, glow: 0.4, whip: 0.28, fly: 0.35, flash: 0.3, iris: 0.4, smoke: 0.55, glint: 0.4
};
function shotIdx25(t) { let i = 0; while (i < SHOTS.length - 1 && t >= SHOTS[i + 1][0]) i++; return i; }
function drawShot25(i, t) { TT25 = t; RIG.shake = 0; RIG.roll = 0; RIG.Z = 0; SH[SHOTS[i][1]](t, t - SHOTS[i][0]); }
function into(c, fn) { const prev = ctx, g = c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.filter = 'none'; g.clearRect(0, 0, W, H);
  ctx = g; S = 1; SS.length = 0; fn(); ctx = prev; S = 1; SS.length = 0; }
function frame25(t) {
  const i = shotIdx25(t), tr = SHOTS[i][2], dur = TRANS[tr], u = t - SHOTS[i][0];
  if (!tr || !dur || i === 0 || u >= dur) { drawShot25(i, t); return; }
  const p = clamp(u / dur), fitB = FIT.boxes.length, fitT = FIT.txts.length;
  into(XA, () => drawShot25(i - 1, t)); FIT.boxes.length = fitB; FIT.txts.length = fitT;   // старый план (в проверку текста не идёт)
  into(XB, () => drawShot25(i, t));
  const g = ctx; g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  if (tr === 'fly') { g.drawImage(XB, 0, 0); const sc = 1 + 0.9 * eo(p); g.globalAlpha = 1 - sm(p); g.translate(540, 960); g.scale(sc, sc); g.filter = `blur(${(7 * p).toFixed(1)}px)`; g.drawImage(XA, -540, -960); }
  else if (tr === 'whip') { const k = eio(p), b = 16 * Math.sin(Math.PI * p); g.filter = `blur(${b.toFixed(1)}px)`; g.drawImage(XA, -k * W, 0); g.drawImage(XB, (1 - k) * W, 0); }
  else if (tr === 'clock') {                                           // секторная шторка по часовой стрелке + сама стрелка
    g.drawImage(XA, 0, 0); const a0 = -Math.PI / 2, a1 = a0 + Math.PI * 2 * eio(p);
    g.save(); g.beginPath(); g.moveTo(540, 960); g.arc(540, 960, 1400, a0, a1); g.closePath(); g.clip(); g.drawImage(XB, 0, 0); g.restore();
    g.lineCap = 'round'; g.strokeStyle = '#1c1512'; g.lineWidth = 34; g.beginPath(); g.moveTo(540, 960); g.lineTo(540 + Math.cos(a1) * 1300, 960 + Math.sin(a1) * 1300); g.stroke();
    g.strokeStyle = '#b8ff8a'; g.lineWidth = 16; g.stroke(); g.fillStyle = '#d6a84a'; g.beginPath(); g.arc(540, 960, 40, 0, 6.3); g.fill(); }
  else if (tr === 'glow') {                                            // радиевая вспышка: всё заливает зелёным свечением
    g.drawImage(p < 0.5 ? XA : XB, 0, 0); const k = Math.sin(Math.PI * p); g.globalCompositeOperation = 'lighter';
    const gr = g.createRadialGradient(540, 960, 50, 540, 960, 1300); gr.addColorStop(0, `rgba(190,255,140,${0.95 * k})`); gr.addColorStop(1, `rgba(60,160,60,${0.5 * k})`); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
  else if (tr === 'flash') { g.drawImage(p < 0.25 ? XA : XB, 0, 0); g.fillStyle = `rgba(255,255,250,${p < 0.25 ? p / 0.25 : Math.pow(1 - (p - 0.25) / 0.75, 2)})`; g.fillRect(0, 0, W, H); }
  else if (tr === 'glint') {                                           // блеск бриллианта: звезда-искра вспыхивает и раскрывает новый план
    g.drawImage(p < 0.45 ? XA : XB, 0, 0); const k = Math.sin(Math.PI * p), L = 1600 * k;
    g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(540, 960, 0, 540, 960, 700 * k + 1); gr.addColorStop(0, `rgba(255,255,255,${0.95 * k})`); gr.addColorStop(1, 'rgba(180,220,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = `rgba(255,255,255,${k})`; [[1, 0], [0, 1]].forEach(([a, b]) => { g.beginPath(); g.moveTo(540 - L * a, 960 - L * b); g.lineTo(540 + 18 * b, 960 + 18 * a); g.lineTo(540 + L * a, 960 + L * b); g.lineTo(540 - 18 * b, 960 - 18 * a); g.fill(); });
    g.globalCompositeOperation = 'source-over'; }
  else if (tr === 'smoke') {                                           // клубы дыма закрывают кадр и расходятся (сковородка, пожар, завод)
    g.drawImage(p < 0.5 ? XA : XB, 0, 0); const k = Math.sin(Math.PI * p), r = rng(77);
    for (let i = 0; i < 14; i++) { const x = r() * W, y = r() * H, rr = (220 + r() * 260) * (0.4 + k); const gr = g.createRadialGradient(x, y, 0, x, y, rr);
      gr.addColorStop(0, `rgba(190,186,182,${0.95 * k})`); gr.addColorStop(1, 'rgba(190,186,182,0)'); g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); } }
  else if (tr === 'iris') { g.drawImage(XA, 0, 0); g.save(); g.beginPath(); g.arc(540, 960, 1150 * eio(p), 0, 6.3); g.clip(); g.drawImage(XB, 0, 0); g.restore();
    g.lineWidth = 18; g.strokeStyle = '#1c1512'; g.beginPath(); g.arc(540, 960, 1150 * eio(p), 0, 6.3); g.stroke(); }
  g.restore();
}
