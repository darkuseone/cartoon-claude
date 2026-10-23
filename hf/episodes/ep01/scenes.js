/* Эп. 1 «Котам нужно молоко?» — сцены. Тайминги — от слов озвучки (те же метки берёт синтез звука, tools/sfx.py). */

const WS = {}; LINES.forEach(l => { WS[l.key] = l.words.filter(w => w.w !== '—').map(w => w.s); });
const Wd = (k, i) => WS[k][i];
const LN = {}; LINES.forEach(l => { LN[l.key] = l; });

// ------------------------------------------------------------------ метки (сек) — общие для картинки и звука
const CUE = {
  eyes: Wd('t01', 0), saucerCut: Wd('t01', 1), slowly: Wd('t01', 3), stand: Wd('n01', 0), milk: Wd('n01', 3), allcats: Wd('n01', 4),
  tomA: Wd('t02', 0), boxes: Wd('t02', 5), box: Wd('t02', 7), food: Wd('t02', 10), notfood: Wd('t02', 11),
  sit: Wd('t03', 0), explain: Wd('t03', 1), why: Wd('t03', 3), ticket: Wd('t03', 8) - 0.15, litter: Wd('t03', 10), night: Wd('t03', 13), dive: LN.t03.end - 0.3,
  kitten: Wd('t04', 0), mama: Wd('t04', 2), belly: Wd('t04', 5), enzyme: Wd('t04', 9), lactase: Wd('t04', 10), split: Wd('t04', 12), milksugar: Wd('t04', 13),
  grow: Wd('t05', 2) - 0.2, left: Wd('t05', 4), tenth: Wd('t05', 7),
  sugar: Wd('t06', 0), water: Wd('t06', 3), bact: Wd('t06', 10), gas: Wd('t06', 12), boil: Wd('t06', 13), poo: Wd('t06', 14), flash: Wd('t06', 14) + 0.6,
  eww: Wd('n02', 0), lamp: Wd('n02', 1) + 0.35, where: Wd('n03', 0), kitty: Wd('n03', 6),
  village: Wd('t07', 0), circle: Wd('t07', 1), lick: Wd('t07', 9), fat: Wd('t07', 14), less: Wd('t07', 17), cartoons: Wd('t07', 19), myth: Wd('t07', 20),
  busted: Wd('n04', 0), bottom: Wd('n04', 7), caught: Wd('n04', 8),
  because: Wd('t08', 0), sniff: Wd('t08', 3), fat2: Wd('t08', 5), tasty: Wd('t08', 6), box2: Wd('t08', 8), litter2: Wd('t08', 11), you: Wd('t08', 12),
  water2: Wd('t09', 2), catmilk: Wd('t09', 7), nolact: Wd('t09', 10), ok: Wd('n05', 0), drink: Wd('n05', 4) + 0.15,
  drinkpei: Wd('t10', 0), btw: Wd('t10', 1), twothirds: Wd('t10', 4), adults: Wd('t10', 6), lact2: Wd('t10', 10), works: Wd('t10', 14),
  tomq: Wd('n06', 0), throne: LN.n06.end + 0.25, notake: Wd('t11', 0), sub: Wd('t11', 3), next: Wd('t11', 5), three: Wd('t11', 11), poster: DUR - 3.0
};
const TURN = CUE.flash;                                            // поворот: после него — тёплое

// ------------------------------------------------------------------ помощники
function ex(t, list, d = 0.15) {                                   // выражения по словам: шаги с короткой смазкой чисел
  let cur = {}, prev = {}, t0 = -1e9;
  for (const [tt, o] of list) if (t >= tt) { prev = cur; cur = { ...cur, ...o }; t0 = tt; }
  const k = sm((t - t0) / d), r = { ...cur };
  for (const key in cur) if (typeof cur[key] === 'number' && typeof prev[key] === 'number') r[key] = lerp(prev[key], cur[key], k);
  return r;
}
function ck(t, K) {                                                // камера по ключам [t, x, y, z]
  if (t <= K[0][0]) return K[0].slice(1);
  for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const a = K[i - 1], b = K[i], k = eio((t - a[0]) / (b[0] - a[0])); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], k)]; }
  return K[K.length - 1].slice(1);
}
const COLD = { ang: Math.PI * 0.97, a: 0.44, col: '#9fd4ff', rimA: 0.6 };
const WARMLIGHT = { ang: -Math.PI * 0.6, a: 0.5, col: '#ffcf8a', rimA: 0.5 };
const lightAt = t => (t < CUE.lamp ? COLD : WARMLIGHT);
function talk(who, t) { const m = mouthAt(who, t); return { m, bob: -m.open * 6, tilt: m.talking ? Math.sin(t * 2.6) * 0.035 : 0 }; }
function shakeAt(t) { let s = 0; for (const [t0, d, a] of SHAKES) if (t >= t0 && t < t0 + d) s = Math.max(s, a * (1 - (t - t0) / d)); return s; }
const SHAKES = [[CUE.gas, 0.3, 10], [CUE.boil, 0.7, 18], [CUE.poo, 0.6, 34], [CUE.ticket + 0.05, 0.15, 8], [CUE.litter, 0.2, 14], [CUE.notfood, 0.2, 12], [CUE.myth, 0.25, 14], [CUE.tomq + 0.2, 0.2, 6]];
function sketchIn(t, t0, d = 0.45) { return clamp((t - t0) / d); }   // «проявление» линии мелом

// Том и Никита в кухне (базовые позиции)
const TOMK = { x: 800, y: 690, s: 0.62 };
function tomK(t, o = {}) { const tk = talk('tom', t); tom({ ...TOMK, t, light: lightAt(t), m: tk.m, bob: tk.bob, tilt: tk.tilt, glowE: t < CUE.lamp ? 0.9 : 0.5, ...o }); }
function nikK(t, o = {}) { const tk = talk('nikita', t); nikita({ x: 300, y: 820, s: 0.9, t, light: lightAt(t), m: tk.m, bob: tk.bob, tilt: tk.tilt, legs: 'stand', ...o }); }

// ------------------------------------------------------------------ сцены
const SC = [
  ['hook', 0, CUE.stand - 0.02], ['milk', CUE.stand - 0.02, CUE.tomA - 0.05], ['box', CUE.tomA - 0.05, CUE.sit - 0.05], ['ticket', CUE.sit - 0.05, CUE.kitten - 0.02],
  ['kitten', CUE.kitten - 0.02, CUE.grow - 0.25], ['grow', CUE.grow - 0.25, CUE.sugar - 0.06], ['gut', CUE.sugar - 0.06, TURN],
  ['lamp', TURN, CUE.village - 0.05], ['village', CUE.village - 0.05, CUE.busted - 0.05], ['busted', CUE.busted - 0.05, CUE.because - 0.02],
  ['sniff', CUE.because - 0.02, CUE.water2 - 0.95], ['advice', CUE.water2 - 0.95, CUE.drinkpei - 0.05], ['twothirds', CUE.drinkpei - 0.05, CUE.throne], ['throne', CUE.throne, DUR + 1]
];
const sceneAt = t => { let i = 0; while (i < SC.length - 1 && t >= SC[i + 1][1]) i++; return i; };

function frame(t) {
  const i = sceneAt(t), [name, t0] = SC[i];
  SCENES[name](t, t - t0);
}

const SCENES = {
  // 0 — обложка и хук: глаза в темноте → Никита с блюдцем
  hook(t) {
    if (t < CUE.saucerCut - 0.02) {
      const [cx, cy, z] = ck(t, [[0, 800, 680, 2.9], [CUE.saucerCut, 800, 676, 3.15]]);
      cam(cx, cy, z); kitchen(t, { fridge: 0.25 }); table(430, 1180, 1100);
      const e = ex(t, [[0, { lid: 0.18, pup: 0.95, brow: 0.2 }], [CUE.eyes, { lid: 0.48, pup: 0.75, brow: -0.6 }]]);
      tomK(t, { ...e, glowE: 1.3, light: { ...COLD, a: 0.25 } });
      pop(); screenFill('#05060a', 0.35, 'multiply');
      return;
    }
    const [cx, cy, z] = ck(t, [[CUE.saucerCut, 380, 1120, 1.55], [CUE.slowly, 400, 1150, 1.6], [CUE.slowly + 0.5, 470, 1230, 2.1], [CUE.stand, 480, 1240, 2.2]]);
    const tr = t > CUE.slowly ? Math.sin(t * 60) * 3 : 0;
    cam(cx, cy, z); kitchen(t, { fridge: 1 }); table(430, 1180, 1100); tomK(t, { lid: 0.48, brow: -0.6, pup: 0.7 });
    nikK(t, { x: 330, y: 1090, legs: 'crouch', mood: 'shock', lk: [0.6, -0.6], yaw: 0.25, brow: 0.6,
      arms: { r: [[235, 380], [150 + tr, 262], 'hold'], l: [[-60, 420], [60 + tr, 300], 'hold'] } });
    saucer(510 + tr * 0.9, 1300, 0.75, { t, slosh: t > CUE.slowly ? 1 : 0.2, glow: 0.9 });
    if (t > CUE.slowly) { const k = pr(t, CUE.slowly, CUE.slowly + 0.6); shape(spline([[0, -14], [8, 2], [0, 10], [-8, 2]], true, 5).map(([x, y]) => [425 + x * 1.6, 1010 + y * 1.6 + k * 50]), { wash: PAL.cold, washA: 0.8, w: 2, col: '#d8f0ff', key: 7 }); }
    pop();
  },
  // 1 — «Это ж молочко!»: Никита встаёт, двухшот
  milk(t) {
    const [cx, cy, z] = ck(t, [[CUE.stand, 470, 1150, 1.9], [CUE.stand + 0.6, 560, 980, 1.06], [CUE.tomA, 580, 960, 1.1]]);
    cam(cx, cy, z); kitchen(t, { fridge: 1 }); table(430, 1180, 1100);
    tomK(t, ex(t, [[0, { lid: 0.5, brow: -0.3, yaw: -0.25, lk: [-0.5, 0.2] }], [CUE.allcats + 0.4, { lid: 0.75 }], [CUE.allcats + 0.9, { lid: 0.5 }]]));
    const up = eo(pr(t, CUE.stand, CUE.stand + 0.45)), lift = eo(pr(t, CUE.milk - 0.1, CUE.milk + 0.25)), sweep = eo(pr(t, CUE.allcats, CUE.allcats + 0.3));
    const y = lerp(1090, 820, up);
    const e = ex(t, [[0, { mood: 'shock', brow: 0.6 }], [CUE.stand + 0.3, { mood: '', brow: 0.9, smile: 0.5, yaw: 0.3, lk: [0.6, -0.3] }], [CUE.allcats, { brow: 1, smile: 0.7 }]]);
    nikK(t, { ...e, x: 300, y, legs: up > 0.5 ? 'stand' : 'crouch',
      arms: { r: [[lerp(235, 250, lift), lerp(380, 300, lift)], [lerp(150, 200, lift), lerp(262, 40, lift)], 'hold'], l: [[lerp(-60, -250, sweep), lerp(420, 320, sweep)], [lerp(60, -330, sweep), lerp(300, 200, sweep)], sweep > 0.5 ? 'spread' : 'hold'] } });
    const sx = 300 + lerp(150, 200, lift) * 0.9 + 40, sy = y + lerp(262, 40, lift) * 0.9 - 25;
    saucer(lerp(510, sx, up), lerp(1300, sy, up), 0.75, { t, slosh: 0.4, glow: 0.9 + lift * 0.6 });
    if (lift > 0.1) { ctx.save(); glow(sx, sy, 320, hexA(PAL.milk, 0.7), 0.35 * lift); ctx.restore(); }
    pop();
  },
  // 2 — «коробка едой не становится»: набросок мелом рядом с Томом
  box(t) {
    const [cx, cy, z] = ck(t, [[CUE.tomA, 760, 700, 1.75], [CUE.boxes - 0.1, 760, 700, 1.8], [CUE.boxes + 0.4, 640, 690, 1.45], [CUE.sit, 640, 690, 1.5]]);
    cam(cx, cy, z); kitchen(t, { fridge: 1 }); table(430, 1180, 1100);
    tomK(t, ex(t, [[0, { yaw: -0.15, lid: 0.45, smirk: 0.6 }], [CUE.boxes, { yaw: -0.35, lk: [-0.7, 0], paw: 1, pawX: 130, pawY: 230 }], [CUE.notfood, { yaw: 0, lk: [0, 0], paw: 0, lid: 0.55, smirk: 1 }]]));
    // набросок: строительные линии → коробка с котом → вилка и нож → «= ЕДА?» → крест
    const bx = 480, by = 640, a1 = sketchIn(t, CUE.boxes - 0.05, 0.35);
    guides(1 - pr(t, CUE.boxes + 0.4, CUE.boxes + 1.0), [['c', bx, by - 40, 150], ['l', bx - 220, by + 60, bx + 220, by + 60], ['l', bx, by - 220, bx, by + 200]]);
    if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1; cardBox(bx, by, 0.75 * (0.85 + 0.15 * popK(t, CUE.boxes, 0.3)), { cat: true, t }); ctx.restore(); }
    if (t > CUE.box) { const k = popK(t, CUE.box, 0.3);
      push(bx - 165, by + 215, k); line([[0, -70], [0, 70]], { w: 5, key: 301 }); [-14, 0, 14].forEach((dx, i) => line([[dx, -70], [dx, -20]], { w: 3, key: 302 + i })); pop();
      push(bx + 165, by + 215, k); line([[0, -70], [0, 70]], { w: 5, key: 306 }); shape(spline([[0, -70], [16, -40], [12, 0], [0, 0]], true, 5), { wash: PAL.line, washA: 0.4, w: 3, key: 307 }); pop(); }
    if (t > CUE.food) txt('= ЕДА?', bx, by + 220, 64, { font: 'Osw', weight: 600, col: PAL.line, reveal: pr(t, CUE.food, CUE.food + 0.3) });
    if (t > CUE.notfood) { const k = pr(t, CUE.notfood, CUE.notfood + 0.18), k2 = pr(t, CUE.notfood + 0.12, CUE.notfood + 0.3);
      pencil([[bx - 120, by + 190], [lerp(bx - 120, bx + 120, k), lerp(by + 190, by + 290, k)]], { w: 12, col: PAL.alarm, glow: 1, key: 309 });
      if (k2 > 0) pencil([[bx + 120, by + 190], [lerp(bx + 120, bx - 120, k2), lerp(by + 190, by + 290, k2)]], { w: 12, col: PAL.alarm, glow: 1, key: 310 }); }
    pop();
  },
  // 3 — «Садись. Щас объясню…» → билет в лоток → ныряем в молоко
  ticket(t) {
    const dive = pr(t, CUE.dive, CUE.kitten);
    const sx = 360 + 150, sy = 1110;
    const [cx0, cy0, z0] = ck(t, [[CUE.sit, 560, 960, 1.08], [CUE.ticket - 0.2, 560, 960, 1.08], [CUE.ticket + 0.3, 560, 900, 1.12], [CUE.dive, 560, 920, 1.15]]);
    const cx = lerp(cx0, sx, eio(dive)), cy = lerp(cy0, sy, eio(dive)), z = z0 * Math.pow(9, eio(dive));
    cam(cx, cy, z); kitchen(t, { fridge: 1 }); table(430, 1180, 1100);
    tomK(t, ex(t, [[0, { yaw: -0.2, lid: 0.45, lk: [-0.5, 0.3] }], [CUE.explain, { paw: 1, pawX: 160, pawY: 130, pawWave: 0.4, brow: 0.4 }], [CUE.why, { paw: 0.4, pawX: 60, pawY: 300, brow: 0 }], [CUE.ticket, { paw: 0, lid: 0.4, smirk: 0.9 }]]));
    const sit = eo(pr(t, CUE.sit, CUE.sit + 0.25)), bounce = Math.sin(pr(t, CUE.sit + 0.25, CUE.sit + 0.6) * Math.PI) * 14;
    stool(330, 1340, 0.9);
    nikK(t, { ...ex(t, [[0, { yaw: 0.3, lk: [0.6, -0.4], brow: 0.3 }], [CUE.why, { lk: [0.4, 0.8], yaw: 0.2 }], [CUE.ticket, { mood: 'shock', lk: [0.5, -0.5] }]]),
      y: lerp(820, 905, sit) + bounce, legs: sit > 0.5 ? 'sit' : 'stand', arms: { r: [[230, 360], [190, 300], 'hold'], l: [[-80, 430], [120, 330], 'hold'] } });
    saucer(sx, sy + bounce * 0.5, 0.7, { t, slosh: 0.3, glow: 0.9 + dive * 3 });
    if (t > CUE.ticket - 0.05 && dive < 0.3) { const k = popK(t, CUE.ticket - 0.05, 0.4), fly = eo(pr(t, CUE.ticket - 0.05, CUE.ticket + 0.25));
      ticket(lerp(sx, 560, fly), lerp(sy, 560, fly), 0.95 * k, { rot: -0.08 + Math.sin(t * 3) * 0.03, stamp: t > CUE.litter ? 1 : 0, stampT: CUE.litter, t }); }
    pop();
    if (dive > 0) screenFill('#f4fbff', sm(pr(t, CUE.dive + 0.15, CUE.kitten)) * 0.95);
  },
  // 4 — неон-наука: котёнок, линза в живот, лактаза режет лактозу
  kitten(t) {
    const lens = eo(pr(t, CUE.belly - 0.1, CUE.belly + 0.45));
    cam(540, 900, 1);
    const kx = 640, ky = 700, kd = sketchIn(t, CUE.kitten, 0.5);
    // мама-кошка: бок с шерстью слева, котёнок прильнул
    const ma = 1 - pr(t, CUE.belly - 0.1, CUE.belly + 0.3), mom = catSil(170, 360, 1.05, 'adult');
    if (ma > 0) { ctx.save(); ctx.globalAlpha = ma; wash(pathOf(mom), '#0d1513', 0.9 * kd); pencil(mom, { w: 4, col: PAL.sci, glow: 0.7, reveal: kd, key: 401 });
    if (kd > 0.6) { silFace(170, 360, 1.05, 'adult', (kd - 0.6) * 2.5 * ma, t); silExtras(170, 360, 1.05, 'adult', (kd - 0.6) * 2.5 * ma, t); } ctx.restore(); }
    txt('МАМА', 170, 1150, 56, { font: 'Osw', weight: 600, col: PAL.sci, a: 0.85 * kd * (1 - pr(t, CUE.belly - 0.1, CUE.belly + 0.2)) });
    const ks = catSil(kx, ky, 1.4, 'kitten'); wash(pathOf(ks), '#0d1513', 0.9 * kd); pencil(ks, { w: 5, col: PAL.sci, glow: 1, reveal: kd, key: 402 });
    if (kd > 0.6) { silFace(kx, ky, 1.4, 'kitten', (kd - 0.6) * 2.5, t); silExtras(kx, ky, 1.4, 'kitten', (kd - 0.6) * 2.5, t); }
    if (t > CUE.mama) for (let i = 0; i < 6; i++) { const ph = ((t - CUE.mama) * 1.4 + i / 6) % 1; ell(lerp(330, kx - 20, ph), lerp(800, ky + 50, ph) - Math.sin(ph * 3.14) * 60, 10, 13, { wash: PAL.milk, w: 1.6, col: '#bfe6ff', glow: 0.8, key: 403 + i }); }
    txt('КОТЁНОК', kx, 1150, 64, { font: 'Osw', weight: 600, col: PAL.sci, reveal: pr(t, CUE.kitten + 0.1, CUE.kitten + 0.5), glow: 0.6, a: 1 - pr(t, CUE.belly - 0.1, CUE.belly + 0.2) });
    // линза: окно внутрь живота
    if (lens > 0) {
      const R = lerp(60, 360, lens), lx = lerp(kx, 540, lens), ly = lerp(ky + 150, 800, lens);
      ctx.save(); ctx.beginPath(); ctx.arc(lx, ly, R, 0, 6.3); ctx.fillStyle = '#0c1214'; ctx.fill(); ctx.clip();
      // стенки кишечника
      for (let i = 0; i < 2; i++) pencil(Array.from({ length: 40 }, (_, k) => [lx - R + k / 39 * 2 * R, ly + (i ? 1 : -1) * R * 0.62 + Math.sin(k * 0.7 + t * 2) * 18]), { w: 4, col: PAL.sci, a: 0.7, glow: 0.4, key: 410 + i });
      hatch(null, [lx - R, ly - R, lx + R, ly + R], { ang: -0.6, gap: 22, w: 1.4, col: PAL.sci, a: 0.12, key: 412 });
      // сахар и ферменты
      const sp = eo(pr(t, CUE.split, CUE.split + 0.35));
      [[-200, -60, 0], [60, 90, 1], [190, -120, 2]].forEach(([dx, dy, i]) => { const drift = Math.sin(t * 1.3 + i) * 12;
        const sk = clamp(sp * 1.6 - i * 0.25); sugar(lx + dx, ly + dy + drift, 0.9, { split: sk, a: lens });
        if (t > CUE.enzyme) { const a = eo(pr(t, CUE.enzyme + i * 0.12, CUE.enzyme + 0.35 + i * 0.12)); lactase(lx + dx - 180 + a * 120 - sk * 60, ly + dy + drift + 10, 0.75, { t, a, chomp: sk > 0 && sk < 1 ? 0.5 + 0.5 * Math.sin(t * 30) : undefined }); }
        if (sk > 0.05 && sk < 0.9) for (let k = 0; k < 6; k++) { const a = k / 6 * 6.28; pencil([[lx + dx + Math.cos(a) * 20, ly + dy + drift + Math.sin(a) * 20], [lx + dx + Math.cos(a) * (30 + sk * 50), ly + dy + drift + Math.sin(a) * (30 + sk * 50)]], { w: 2.4, col: '#ffffff', a: 1 - sk, pass2: false, gap: false, key: 420 + k }); } });
      ctx.restore();
      pencil(ellPts(lx, ly, R, R, 0, 0.08, 80), { w: 6, col: PAL.sci, glow: 1, key: 430 });
      if (t > CUE.lactase) { txt('ЛАКТАЗА', 300, 380, 70, { font: 'Osw', weight: 600, col: PAL.sci, glow: 0.8, reveal: pr(t, CUE.lactase, CUE.lactase + 0.35) }); txt('фермент', 300, 438, 44, { col: PAL.sci, a: 0.85 * pr(t, CUE.lactase, CUE.lactase + 0.4) }); }
      if (t > CUE.milksugar - 0.2) { txt('МОЛОЧНЫЙ САХАР', 560, 1236, 64, { font: 'Osw', weight: 600, col: PAL.sci2, glow: 0.8, reveal: pr(t, CUE.milksugar - 0.2, CUE.milksugar + 0.3) }); txt('(лактоза)', 560, 1292, 44, { col: PAL.sci2, a: 0.85 * pr(t, CUE.milksugar, CUE.milksugar + 0.4) }); }
    }
    pop();
    if (t < CUE.kitten + 0.35) screenFill('#f4fbff', 0.95 * (1 - sm(pr(t, CUE.kitten - 0.02, CUE.kitten + 0.35))));
  },
  // 5 — котёнок вырос: морф в огромного Тома, 9 из 10 лактаз засыпают
  grow(t, u) {
    cam(540, 900, 1);
    const mk = eio(pr(t, CUE.grow, CUE.grow + 0.9)), sil = morphPts(catSil(640, 700, 1.4, 'kitten'), catSil(540, 540, 1.0, 'adult'), mk);
    const shrink = 1 - eo(pr(t, CUE.grow - 0.25, CUE.grow + 0.1));
    if (shrink > 0) { ctx.save(); ctx.globalAlpha = shrink; ctx.beginPath(); ctx.arc(540, 800, 360 * shrink + 1, 0, 6.3); ctx.fillStyle = '#0c1214'; ctx.fill(); pencil(ellPts(540, 800, 360 * shrink + 1, 360 * shrink + 1), { w: 6, col: PAL.sci, glow: 1, key: 430 }); ctx.restore(); }
    wash(pathOf(sil), '#0d1513', 0.9); pencil(sil, { w: 5, col: PAL.sci, glow: 1, key: 402 });
    silExtras(lerp(640, 540, mk), lerp(700, 540, mk), lerp(1.4, 1.0, mk), mk < 0.5 ? 'kitten' : 'adult', Math.abs(mk - 0.5) * 2, t);
    if (mk < 0.5) silFace(lerp(640, 540, mk), lerp(700, 540, mk), lerp(1.4, 1.0, mk), 'kitten', 1 - mk * 2, t); else silFace(lerp(640, 540, mk), lerp(700, 540, mk), lerp(1.4, 1.0, mk), 'adult', (mk - 0.5) * 2, t);
    if (mk > 0.1) txt('ВЗРОСЛЫЙ КОТ', 540, 1180, 60, { font: 'Osw', weight: 600, col: PAL.sci, glow: 0.5, a: sm(pr(t, CUE.grow + 0.5, CUE.grow + 0.9)) });
    // 10 лактаз внутри; на «остаётся» 9 гаснут и падают
    const fall = pr(t, CUE.left, CUE.left + 0.9);
    for (let i = 0; i < 10; i++) { const gx = 540 + ((i % 5) - 2) * 84, gy = 830 + Math.floor(i / 5) * 100, keep = i === 7;
      const a0 = sm(pr(t, CUE.grow + 0.7 + i * 0.04, CUE.grow + 1.0 + i * 0.04)), f = keep ? 0 : eo(clamp(fall * 1.5 - (i % 5) * 0.08));
      if (a0 <= 0) continue;
      lactase(gx, gy + f * 120, 0.42, { t, a: a0 * (1 - f * 0.75), col: keep || f < 0.05 ? PAL.sci : '#3a5c52', chomp: f > 0.3 ? 0.05 : undefined, sleep: f > 0.6, rot: f * 0.6 }); }
    if (t > CUE.tenth - 0.15) { const k = popK(t, CUE.tenth - 0.15, 0.4); push(540, 225, k, -0.04); txt('1/10', 0, 0, 200, { font: 'Osw', weight: 600, col: PAL.sci, glow: 1 }); pop();
      txt('лактазы осталось', 540, 345, 52, { col: PAL.sci, a: pr(t, CUE.tenth, CUE.tenth + 0.4) }); }
    pop();
  },
  // 6 — кишечный тоннель: вода, бактерии, газы, бурление, ПОНОС → вспышка (ПОВОРОТ)
  gut(t) {
    const sh = shakeAt(t), fly = t * 0.9;
    cam(540, 900, 1, 0, sh);
    // тоннель: кольца летят навстречу
    for (let i = 0; i < 9; i++) { const d = ((i / 9 - fly * 0.35) % 1 + 1) % 1, r = 60 + Math.pow(d, 2.2) * 1300, wob = 1 + Math.sin(t * 3 + i) * 0.04;
      const alarm = pr(t, CUE.poo, CUE.poo + 0.2); const col = mix(PAL.sci, PAL.alarm, Math.max(alarm, pr(t, CUE.boil, CUE.poo) * 0.5));
      const ring = (rr0, ph) => Array.from({ length: 97 }, (_, k) => { const th = k / 96 * 6.2832, rr = rr0 * (1 + 0.075 * Math.sin(th * 13 + i * 1.7 + ph)) * wob; return [540 + Math.cos(th) * rr, 900 + Math.sin(th) * rr * 0.82]; });
      pencil(ring(r, t * 2), { w: 2 + d * 6, col, a: 0.25 + d * 0.6, glow: 0.4 * d, key: 450 + i, gap: false });
      pencil(ring(r * 0.9, t * 2 + 1.3), { w: 1 + d * 2, col: mix(col, '#ff8fa8', 0.4), a: 0.15 + d * 0.3, pass2: false, key: 460 + i }); }
    // сахара плывут целыми (лактазы нет)
    const n = 7; for (let i = 0; i < n; i++) { const r = rng(460 + i), ang = r() * 6.28, rad = 120 + r() * 300, x = 540 + Math.cos(ang + t * 0.3) * rad, y = 900 + Math.sin(ang + t * 0.3) * rad * 0.8;
      const eaten = t > CUE.bact ? pr(t, CUE.bact + 0.15 * i, CUE.bact + 0.6 + 0.15 * i) : 0;
      if (eaten < 1) sugar(x, y, 0.62 * (1 - eaten), { rot: t * 0.5 + i, a: pr(t, CUE.sugar, CUE.sugar + 0.4) });
      if (t > CUE.bact + 0.1 * i) bacterium(x + Math.cos(i) * 70 * (1 - eaten), y + 40 * (1 - eaten), 0.55 + 0.25 * eaten, { t: t + i, rot: Math.sin(t * 3 + i) * 0.2 }); }
    if (t > CUE.sugar + 0.4 && t < CUE.water + 0.4) lactase(220, 1260, 0.6, { t, sleep: true, chomp: 0.05, col: '#3a5c52' });
    if (t > CUE.sugar + 0.5) txt('НЕ ПЕРЕВАРИВАЕТСЯ', 540, 300, 64, { font: 'Osw', weight: 600, col: PAL.sci2, glow: 0.7, reveal: pr(t, CUE.sugar + 0.6, CUE.sugar + 1.0), a: 1 - pr(t, CUE.water - 0.2, CUE.water) });
    // вода стекается
    if (t > CUE.water) for (let i = 0; i < 14; i++) { const r = rng(470 + i), side = i % 2 ? 1 : -1, ph = ((t - CUE.water) * 0.8 + r()) % 1;
      waterDrop(540 + side * lerp(560, 120, ph), 500 + r() * 800, 0.8, sm(pr(t, CUE.water, CUE.water + 0.4)) * (1 - ph * 0.5)); }
    if (t > CUE.water) txt('+ ВОДА', 540, 300, 72, { font: 'Osw', weight: 600, col: PAL.cold, glow: 0.7, reveal: pr(t, CUE.water, CUE.water + 0.3), a: 1 - pr(t, CUE.bact - 0.2, CUE.bact) });
    // газы
    const g = pr(t, CUE.gas, CUE.gas + 1.2), boil = pr(t, CUE.boil, CUE.boil + 0.5);
    if (g > 0) for (let i = 0; i < 18; i++) { const r = rng(480 + i), ph = ((t - CUE.gas) * (0.5 + boil * 1.5) + r()) % 1, br = (14 + r() * 40) * (0.4 + g);
      bubble(160 + r() * 760, 1500 - ph * 1100 + Math.sin(t * 4 + i) * 20, br * (0.6 + ph * 0.6), g * (1 - ph * 0.6), i % 4); }
    // удары слов
    [[CUE.gas, 'ГАЗЫ.', '#bfff9a', 360], [CUE.boil, 'БУРЛЕНИЕ.', '#ffd25e', 600], [CUE.poo, 'ПОНОС.', PAL.alarm, 900]].forEach(([tt, w, col, y]) => {
      if (t < tt) return; const k = popK(t, tt, 0.35), big = w === 'ПОНОС.';
      push(540, y, (big ? 1.6 : 1.1) * (1.6 - 0.6 * k), (big ? -0.08 : 0.05) * (w === 'ГАЗЫ.' ? 1 : -1)); txt(w, 0, 0, big ? 190 : 130, { font: 'Osw', weight: 600, col, glow: 1.2, stroke: 18 }); pop(); });
    pop();
    const al = pr(t, CUE.poo, CUE.poo + 0.15) * (1 - pr(t, CUE.poo + 0.15, CUE.poo + 0.5)); if (al > 0) screenFill(PAL.alarm, 0.35 * al, 'lighter');
    const wf = pr(t, TURN - 0.25, TURN); if (wf > 0) screenFill('#ffffff', wf);
  },
  // 7 — ПОВОРОТ: «Фу, бля» → лампа → тёплая кухня; «Котик, блюдечко…» — клише в рамке на стене
  lamp(t) {
    const L = eo(pr(t, CUE.lamp, CUE.lamp + 0.12)) * (t < CUE.lamp + 0.3 ? (Math.sin(t * 70) > -0.2 ? 1 : 0.3) : 1);
    const into = eio(pr(t, CUE.village - 0.55, CUE.village - 0.05));
    const [cx0, cy0, z0] = ck(t, [[TURN, 560, 960, 1.08], [CUE.where, 560, 960, 1.08], [CUE.kitty, 520, 860, 1.12]]);
    const fx = 300, fy = 470;
    cam(lerp(cx0, fx, into), lerp(cy0, fy, into), z0 * Math.pow(5.5, into));
    kitchen(t, { fridge: 1 - L * 0.7, lamp: L }); table(430, 1180, 1100, { warm: L });
    tomK(t, { yaw: -0.3, lid: 0.55, lk: [-0.5, 0.2], smirk: 0.8 });
    const push2 = eo(pr(t, CUE.eww, CUE.eww + 0.3)), spread = eo(pr(t, CUE.where, CUE.where + 0.3));
    nikK(t, { ...ex(t, [[0, { mood: 'eww', yaw: 0.25, lk: [0.4, 0.4], tilt: -0.08 }], [CUE.where, { mood: '', brow: 0.8, smile: 0, lk: [0.6, -0.3] }], [CUE.kitty, { brow: 1, lk: [-0.3, -0.8], yaw: -0.15, smile: 0.6 }]]),
      y: 905, legs: 'sit', lean: -0.05 * push2 * (1 - spread),
      arms: spread > 0 ? { r: [[260, 300], [lerp(330, 360, spread), lerp(380, 140, spread)], 'spread'], l: [[-260, 300], [-360, 140], 'spread'] } : { r: [[260, 330], [400, 360], 'hold'], l: [[-80, 430], [100, 340], 'hold'] } });
    if (spread < 0.5) saucer(lerp(510, 650, push2), 1120, 0.7, { t, glow: 0.6 });
    stool(330, 1340, 0.9);
    // клише на стене: милый котик с блюдцем в рамке
    if (t > CUE.kitty - 0.1) { const k = popK(t, CUE.kitty - 0.1, 0.4); push(fx, fy, k);
      rect(-170, -130, 340, 260, { wash: '#2b1f22', w: 5, col: '#f0d6a0', key: 501 }); rect(-150, -110, 300, 220, { w: 2, col: '#f0d6a0', a: 0.6, key: 502 });
      clicheKitty(0, 10, 0.85, t); pop(); }
    pop();
    const wf = 1 - pr(t, TURN, TURN + 0.35); if (wf > 0) screenFill('#ffffff', wf);
  },
  // 8 — деревня (сепия): вёдра, коты, сливки; плёнка, «МИФ»
  village(t) {
    const [cx, cy, z] = ck(t, [[CUE.village, 540, 900, 1.25], [CUE.circle, 540, 960, 1.0], [CUE.lick - 0.3, 540, 980, 1.0], [CUE.lick + 0.3, 600, 1040, 1.75], [CUE.cartoons - 0.2, 600, 1040, 1.8], [CUE.cartoons + 0.4, 540, 960, 1.0]]);
    cam(cx, cy, z);
    vilBG(t);
    bucket(420, 1180, 1.0); bucket(720, 1200, 0.9);
    [[0, 260], [1, 200], [2, 330]].forEach(([i, r]) => { const a = t * 0.6 + i * 2.1, x = 570 + Math.cos(a) * r, y = 1290 + Math.sin(a) * 60; if (i === 0 && t > CUE.lick - 0.3) return;
      villageCat(x, y, 0.62, t + i, { flip: Math.sin(a) > 0 }); });
    if (t > CUE.lick - 0.3) { push(640, 1150, 0.75); villageCat(0, 0, 1, t, { lick: true, flip: true }); pop(); }
    if (t > CUE.village + 0.15) txt('ДЕРЕВНЯ', 540, 470, 96, { font: 'Osw', weight: 600, col: '#ffe2a8', glow: 0.4, reveal: pr(t, CUE.village + 0.1, CUE.village + 0.5), a: 1 - pr(t, CUE.lick - 0.5, CUE.lick - 0.2) });
    if (t > CUE.lick) txt('сливки', 560, 960, 58, { col: '#fff1c8', rot: -0.06, reveal: pr(t, CUE.lick + 0.4, CUE.lick + 0.8) });
    pop();
    const nf = 1 - pr(t, CUE.cartoons - 0.2, CUE.cartoons + 0.1);
    if (t > CUE.fat) txt('ЖИРА ↑', 290, 560, 86, { font: 'Osw', weight: 600, col: PAL.warm, glow: 0.6, stroke: 14, a: nf, reveal: pr(t, CUE.fat, CUE.fat + 0.3) });
    if (t > CUE.less) txt('САХАРА ↓', 770, 560, 86, { font: 'Osw', weight: 600, col: '#ffe2a8', glow: 0.6, stroke: 14, a: nf, reveal: pr(t, CUE.less, CUE.less + 0.3) });
    const fg = pr(t, CUE.cartoons - 0.1, CUE.cartoons + 0.3);
    if (fg > 0) {                                                     // «мультфильмы закрепили»: плёнка + штамп МИФ
      screenFill('#120c06', 0.45 * fg);
      push(540, 900, 1); clicheKitty(0, 0, 1.25 * fg, t, true); pop();
      filmGate(t, fg);
      if (t > CUE.myth) { const k = popK(t, CUE.myth, 0.3); push(540, 1160, 1.8 - 0.8 * k, -0.18); ell(0, 0, 210, 90, { w: 10, col: PAL.alarm, glow: 0.8, key: 520 }); txt('МИФ', 0, 6, 130, { font: 'Osw', weight: 600, col: PAL.alarm, glow: 0.8 }); pop(); }
    }
    if (t < CUE.village + 0.3) { const k = pr(t, CUE.village - 0.05, CUE.village + 0.3); screenFill('#2b1f22', 1 - k); }
  },
  // 9 — «А чё ты тогда моё молоко до дна вылизываешь?!»: улика
  busted(t) {
    const caught = t > CUE.caught + 0.05;
    if (!caught) {
      const [cx, cy, z] = ck(t, [[CUE.busted, 360, 880, 1.45], [CUE.bottom, 380, 860, 1.6]]);
      cam(cx, cy, z, 0, shakeAt(t)); kitchen(t, { fridge: 0.3, lamp: 1 }); table(430, 1180, 1100, { warm: 1 });
      const flip = eo(pr(t, CUE.bottom - 0.1, CUE.bottom + 0.2));
      nikK(t, { mood: 'angry', brow: -0.6, yaw: 0.35, lk: [0.7, -0.2], y: 905, legs: 'sit', arms: { r: [[250, 240], [260, 40], 'hold'], l: [[-200, 380], [-60, 330], 'fist'] } });
      glass(300 + 290 * 0.9, 905 + 10 * 0.9 - 30, 0.85, { fill: 0, licked: true, rot: flip * Math.PI * 0.85, glow: 0 });
      if (flip > 0.8) txt('пусто!', 600, 640, 60, { col: PAL.warm, reveal: pr(t, CUE.bottom + 0.2, CUE.bottom + 0.5) });
      pop(); return;
    }
    cam(800, 700, 1.9, 0, 4 * (1 - pr(t, CUE.caught, CUE.caught + 0.3))); kitchen(t, { fridge: 0.3, lamp: 1 }); table(430, 1180, 1100, { warm: 1 });
    tomK(t, { mood: 'shock', lid: 0.05, pup: 1, brow: 1, fluff: 1.5, ear: 1, yaw: -0.15 });
    pop();
  },
  // 10 — «нюхом чую жир… Вкусно, бля. А расплачивается потом лоток. И ты.»
  sniff(t) {
    if (t < CUE.box2) {
      const [cx, cy, z] = ck(t, [[CUE.because, 760, 700, 1.9], [CUE.sniff, 720, 720, 1.7], [CUE.tasty, 780, 700, 2.0]]);
      cam(cx, cy, z); kitchen(t, { fridge: 0.3, lamp: 1 }); table(430, 1180, 1100, { warm: 1 });
      glass(560, 960, 0.6, { fill: 0.05, licked: true, glow: 0.2 });
      tomK(t, ex(t, [[0, { mood: 'smug', lid: 0.5, yaw: -0.2, smirk: 0.7 }], [CUE.sniff, { yaw: -0.4, lk: [-0.8, 0.4], whisk: 1, lid: 0.35 }], [CUE.tasty, { mood: 'bliss', yaw: 0, smirk: 1, whisk: 0 }]]));
      if (t > CUE.sniff - 0.1 && t < CUE.tasty + 0.2) { const a = pr(t, CUE.sniff - 0.1, CUE.sniff + 0.2) * (1 - pr(t, CUE.tasty, CUE.tasty + 0.2));
        for (let i = 0; i < 3; i++) scent([[560, 860 - i * 10], [620, 760 - i * 20], [700, 720 - i * 8], [760, 740]], t + i * 0.3, PAL.warm, a, i); }
      if (t > CUE.fat2) txt('ЖИР', 640, 600, 84, { font: 'Osw', weight: 600, col: PAL.warm, glow: 1, reveal: pr(t, CUE.fat2, CUE.fat2 + 0.25), a: 1 - pr(t, CUE.tasty + 0.3, CUE.tasty + 0.6) });
      if (t > CUE.tasty) for (let i = 0; i < 5; i++) { const ph = ((t - CUE.tasty) * 0.7 + i / 5) % 1; txt('♥', 800 + Math.sin(i * 2) * 150, 560 - ph * 200, 40, { col: PAL.rose, a: 1 - ph }); }
      pop(); return;
    }
    if (t < CUE.you - 0.08) {                                          // лоток на полу
      cam(560, 1380, 1.6, 0, shakeAt(t)); kitchen(t, { fridge: 0.3, lamp: 1 }); table(430, 1180, 1100, { warm: 1 });
      const k = popK(t, CUE.box2, 0.35); litterBox(560, 1580, 0.95 * k, { t, stink: pr(t, CUE.box2, CUE.box2 + 0.4) });
      if (t > CUE.litter2) { const k2 = popK(t, CUE.litter2, 0.3); push(560, 1300, k2, 0.05); txt('ЛОТОК', 0, 0, 96, { font: 'Osw', weight: 600, col: '#9fe07a', glow: 0.8, stroke: 12 }); pop(); }
      pop(); return;
    }
    const wp = eo(pr(t, CUE.you - 0.08, CUE.you + 0.15));             // вжух на Никиту с совком
    cam(lerp(900, 330, wp), 900, 1.6); kitchen(t, { fridge: 0.3, lamp: 1 }); table(430, 1180, 1100, { warm: 1 });
    nikK(t, { mood: 'dumb', brow: -0.3, lid: 0.55, yaw: 0.25, y: 905, legs: 'sit', smile: -0.6, arms: { r: [[260, 360], [280, 200], 'fist'], l: [[-220, 380], [-160, 300], 'fist'] } });
    scoop(300 + 280 * 0.9 + 20, 905 + 200 * 0.9 + 10, 0.9);
    pop();
  },
  // 11 — совет: вода ✓, кошачье молоко без лактозы ✓; «Ну ладно. Тогда сам выпью.» — пьёт
  advice(t) {
    const [cx, cy, z] = ck(t, [[CUE.water2 - 0.95, 620, 900, 1.15], [CUE.ok - 0.2, 600, 900, 1.12], [CUE.ok + 0.3, 420, 900, 1.35], [CUE.drinkpei, 420, 880, 1.4]]);
    cam(cx, cy, z); kitchen(t, { fridge: 0.3, lamp: 1 }); table(430, 1180, 1100, { warm: 1 });
    tomK(t, ex(t, [[0, { yaw: -0.2, lid: 0.45 }], [CUE.water2, { paw: 1, pawX: 140, pawY: 250, lk: [-0.6, 0.6] }], [CUE.catmilk, { paw: 1, pawX: 150, pawY: 270 }], [CUE.ok, { paw: 0, lk: [-0.6, 0.1], lid: 0.5, smirk: 0.9 }]]));
    if (t > CUE.water2 - 0.1) { const k = popK(t, CUE.water2 - 0.1, 0.35); glass(500, 994, 0.55 * k, { water: true, fill: 0.8, glow: 0.7 }); if (t > CUE.water2 + 0.4) check(500, 860, 1, pr(t, CUE.water2 + 0.4, CUE.water2 + 0.7)); }
    if (t > CUE.catmilk - 0.15) { const k = popK(t, CUE.catmilk - 0.15, 0.35); carton(650, 985, 0.5 * k, { cat: true, rot: -0.06 }); if (t > CUE.nolact) check(650, 840, 1, pr(t, CUE.nolact, CUE.nolact + 0.3)); }
    const grab = eo(pr(t, CUE.ok + 0.6, CUE.ok + 1.0)), sip = pr(t, CUE.drink, CUE.drinkpei + 0.3);
    nikK(t, { ...ex(t, [[0, { yaw: 0.3, lk: [0.6, -0.2], brow: 0.3 }], [CUE.ok, { brow: -0.2, smile: 0.3, lid: 0.45 }], [CUE.drink, { lid: 0.85, tilt: -0.22, yaw: 0.2 }]]),
      y: 905, legs: 'sit', arms: { r: [[260, 330], DRINK(grab, sip).h, 'hold'], l: [[-200, 400], [-80, 340], 'hold'] } });
    const D = DRINK(grab, sip); glass(D.g[0], D.g[1], 0.55, { fill: 0.85 * (1 - sip * 0.9), rot: D.rot, glow: 0.4 });
    pop();
  },
  // 12 — «Пей-пей. Кстати, у двух третей взрослых людей…» → «…Том?» (стол пуст)
  twothirds(t) {
    const empty = t > CUE.tomq - 0.05;
    const [cx, cy, z] = empty ? ck(t, [[CUE.tomq - 0.05, 420, 880, 1.5], [CUE.tomq + 0.35, 760, 780, 1.4]])
      : ck(t, [[CUE.drinkpei, 560, 880, 1.1], [CUE.btw + 0.3, 540, 820, 1.05], [CUE.lact2, 540, 820, 1.05], [CUE.works, 360, 880, 1.55], [CUE.tomq, 380, 880, 1.6]]);
    cam(cx, cy, z, 0, shakeAt(t)); kitchen(t, { fridge: 0.3, lamp: 1 }); table(430, 1180, 1100, { warm: 1 });
    if (!empty) tomK(t, ex(t, [[0, { yaw: -0.3, lid: 0.55, smirk: 1, lk: [-0.6, 0.2] }], [CUE.twothirds, { yaw: -0.1, lk: [-0.3, -0.5] }], [CUE.lact2, { lid: 0.42, lk: [-0.6, 0.2], smirk: 1 }]]));
    else for (let i = 0; i < 6; i++) { const r = rng(600 + i); pencil([[760 + r() * 120, 1040 + r() * 20], [770 + r() * 120, 1030 + r() * 30]], { w: 1.6, a: 0.7, pass2: false, key: 600 + i }); }
    const freeze = t > CUE.lact2 + 0.2, D = freeze ? DRINK(1, 0, true) : DRINK(1, 1);
    nikK(t, { ...ex(t, [[0, { lid: 0.85, tilt: -0.22, yaw: 0.2 }], [CUE.btw + 0.6, { lid: 0.3, tilt: 0, yaw: 0.3, lk: [0.6, -0.3] }], [CUE.lact2 + 0.2, { mood: 'shock', lk: [0, 0.2], yaw: 0.1 }], [CUE.tomq - 0.1, { mood: 'shock', yaw: 0.45, lk: [0.9, -0.3] }]]),
      y: 905, legs: 'sit', arms: { r: [[260, 330], D.h, 'hold'], l: [[-200, 400], [freeze ? -40 : -80, freeze ? 300 : 340], freeze ? 'spread' : 'hold'] } });
    glass(D.g[0], D.g[1], 0.55, { fill: freeze ? 0.15 : 0.35, rot: D.rot, glow: 0.3 });
    if (t > CUE.lact2) { pencil(spline([[300 - 40, 905 + 72], [300, 905 + 64], [300 + 44, 905 + 72]], false, 5), { w: 9, col: PAL.milk, a: 0.95, key: 610 });   // молочные усы
      const gl = pr(t, CUE.lact2 + 0.3, CUE.works + 0.5); glow(300, 905 + 420, 220, 'rgba(150,255,110,0.7)', 0.5 * gl * (0.7 + 0.3 * Math.sin(t * 14))); }
    pop();
    // глобус и человечки (HUD-план, поверх камеры)
    const gk = pr(t, CUE.twothirds - 0.5, CUE.twothirds) * (1 - pr(t, CUE.lact2 + 0.1, CUE.lact2 + 0.5));
    if (gk > 0 && !empty) { push(540, 360, eo(gk) * 0.8);
      globe(0, 0, 190, t);
      [-1, 0, 1].forEach((k, i) => { const red = i < 2 && t > CUE.twothirds + 0.3 + i * 0.15; person(k * 170 - 0, 300, 0.95, red ? PAL.alarm : PAL.line, 1, i * 3); });
      if (t > CUE.adults) txt('2 из 3 взрослых', 0, 470, 60, { font: 'Osw', weight: 600, col: PAL.alarm, glow: 0.6, reveal: pr(t, CUE.adults, CUE.adults + 0.4) });
      pop(); }
  },
  // 13 — Том на троне-лотке; Никита бежит; ПОСТЕР
  throne(t) {
    const P = pr(t, CUE.poster, CUE.poster + 0.5);
    const [cx, cy, z] = ck(t, [[CUE.throne, 540, 980, 1.35], [CUE.notake, 540, 960, 1.25], [CUE.sub, 540, 920, 1.15], [CUE.poster, 540, 900, 1.05], [DUR, 540, 890, 1.08]]);
    cam(cx, cy, z, 0, shakeAt(t));
    hallway(t);
    litterBox(540, 1260, 1.25, { t, stink: 0 });
    tom({ x: 540, y: 820, s: 0.62, t, light: WARMLIGHT, glowE: 0.9, ...talk('tom', t), ...ex(t, [[0, { lid: 0.5, yaw: 0.2, lk: [0.5, 0] }], [CUE.notake, { lid: 0.45, yaw: 0, lk: [0, 0], smirk: 1 }], [CUE.sub, { paw: 1, pawX: 120, pawY: 140, lid: 0.4 }], [CUE.next, { paw: 0 }], [CUE.three, { pup: 0.2, lid: 0.25, brow: 0.5 }]]) });
    const run = pr(t, CUE.notake + 0.6, CUE.notake + 1.3);           // Никита проносится мимо
    if (run > 0 && run < 1) { push(lerp(-300, 1400, run), 980, 1, -0.15); nikita({ x: 0, y: 0, s: 0.85, t, mood: 'shock', legs: 'stand', arms: { r: [[200, 420], [140, 560], 'fist'], l: [[-200, 420], [-140, 560], 'fist'] } }); pop();
      for (let i = 0; i < 6; i++) pencil([[lerp(-300, 1400, run) - 260 - i * 30, 700 + i * 80], [lerp(-300, 1400, run) - 520 - i * 50, 700 + i * 80]], { w: 3, a: 0.6, pass2: false, key: 700 + i }); }
    pop();
    if (P > 0) {                                                       // постер: часы 3:00 и подпись
      const k = popK(t, CUE.poster, 0.4);
      push(540, 440, k); clockFace(0, 0, 90, 2 + pr(t, CUE.poster, CUE.three) * 1, lerp(58, 60, pr(t, CUE.poster, CUE.three)) % 60, t); pop();
      if (t > CUE.three) glow(540, 440, 230, hexA(PAL.alarm, 0.6), 0.5 * (0.6 + 0.4 * Math.sin(t * 12)));
    }
  }
};
function DRINK(grab, sip, down) {                                   // правая рука Никиты (сидит: голова 300,905, масштаб 0.9) и стакан
  if (down) return { h: [300, 260], g: [300 + 300 * 0.9 + 25, 905 + 260 * 0.9 - 30], rot: -0.1 };
  const s3 = sm(sip * 3), h0 = [lerp(320, 170, grab), lerp(360, 200, grab)], h = [lerp(h0[0], 90, s3), lerp(h0[1], 105, s3)];
  return { h, g: [300 + h[0] * 0.9 + lerp(25, 0, s3), 905 + h[1] * 0.9 + lerp(-30, -5, s3)], rot: -s3 * 1.4 };
}

// ------------------------------------------------------------------ сценические детали
function clicheKitty(x, y, s, t, bw) {                              // «котик с блюдечком» из старых мультиков: розовый, бант, сердечки
  push(x, y, s); const pink = bw ? '#e8dcc6' : '#ff9ec7', dark = bw ? '#1a140e' : '#3a1a2a';
  saucer(0, 80, 0.55, { t, glow: bw ? 0 : 0.3 });
  blob([[-60, 60], [-70, 0], [-40, -50], [40, -50], [70, 0], [60, 60]], { wash: dark, fill: pink, fillO: { a: 0.5, gap: 6, key: 511 }, w: 3.4, col: pink, key: 510 });
  [[-1], [1]].forEach(([sd], i) => shape([[sd * 20, -46], [sd * 46, -96], [sd * 58, -36]], { wash: dark, fill: pink, fillO: { a: 0.5, gap: 6, key: 512 + i }, w: 3, col: pink, key: 514 + i }));
  [[-22], [22]].forEach(([dx], i) => { ell(dx, -8, 14, 18, { wash: '#fff', w: 2, col: pink, key: 516 + i }); ell(dx + 3, -4, 7, 10, { wash: '#000', line: false }); });
  shape([[-8, 14], [8, 14], [0, 22]], { wash: pink, line: false }); shape([[-6, 30], [6, 30], [0, 46]], { wash: '#ff6f91', line: false });
  shape([[-30, -52], [-10, -62], [-30, -72], [-50, -62]], { wash: '#ff4f7a', line: false });
  if (!bw) for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; txt('♥', 90 - i * 60, -80 - ph * 90, 40, { col: '#ff6f91', a: 1 - ph }); }
  pop();
}
function vilBG(t) {                                                 // деревня на рассвете (сепия)
  wash(pathOf([[-400, -400], [1480, -400], [1480, 1100], [-400, 1100]]), '#3a2814', 1);
  glow(760, 760, 700, 'rgba(255,180,90,0.75)', 0.8); ell(760, 760, 120, 120, { wash: '#ffcf7a', washA: 0.9, w: 2, col: '#ffe2a8', key: 530 });
  shape([[-400, 980], [100, 820], [500, 900], [900, 800], [1480, 900], [1480, 1100], [-400, 1100]], { wash: '#2a1c10', w: 3, col: '#f3e2c0', key: 531 });
  // сарай
  shape([[60, 1080], [60, 700], [240, 560], [420, 700], [420, 1080]], { wash: '#2e1d10', fill: '#a8642e', fillO: { a: 0.35, gap: 8, key: 533 }, w: 3.6, col: '#f3e2c0', key: 532 });
  shape([[170, 1080], [170, 860], [310, 860], [310, 1080]], { wash: '#1c120a', w: 3, col: '#f3e2c0', key: 534 }); pencil([[170, 860], [310, 1080]], { w: 2.4, col: '#f3e2c0', a: 0.7, key: 535 }); pencil([[310, 860], [170, 1080]], { w: 2.4, col: '#f3e2c0', a: 0.7, key: 536 });
  wash(pathOf([[-400, 1080], [1480, 1080], [1480, 2400], [-400, 2400]]), '#33230f', 1);
  hatch(pathOf([[-400, 1080], [1480, 1080], [1480, 2400], [-400, 2400]]), [-400, 1080, 1480, 2400], { ang: -1.4, gap: 12, w: 2, col: '#c9a064', a: 0.35, seg: 40, key: 537 });
  for (let i = 0; i < 9; i++) { const x = 460 + i * 80; pencil([[x, 1090], [x, 960]], { w: 4, col: '#f3e2c0', a: 0.8, key: 540 + i }); }
  pencil([[440, 990], [1140, 990]], { w: 3.4, col: '#f3e2c0', key: 550 }); pencil([[440, 1040], [1140, 1040]], { w: 3.4, col: '#f3e2c0', key: 551 });
  for (let i = 0; i < 4; i++) { const ph = (t * 0.25 + i / 4) % 1; pencil(spline([[380 + i * 90, 1120 - ph * 200], [400 + i * 90, 1080 - ph * 200], [380 + i * 90, 1040 - ph * 200]], false, 5), { w: 3, col: '#fff1d0', a: 0.5 * (1 - ph), key: 555 + i }); }   // пар от парного молока
}
function hallway(t) {                                                 // коридор у двери туалета, тёплый свет
  wash(pathOf([[-400, -400], [1480, -400], [1480, 1560], [-400, 1560]]), '#2a2119', 1);
  hatch(pathOf([[-400, -400], [1480, -400], [1480, 1560], [-400, 1560]]), [-400, -400, 1480, 1560], { ang: Math.PI / 2, gap: 40, w: 1.4, a: 0.1, seg: 2400, key: 560 });
  glow(540, 200, 700, hexA(PAL.warm, 0.5), 0.6);
  shape([[760, 1560], [760, 300], [1100, 300], [1100, 1560]], { wash: '#1d1712', fill: '#8a6a4c', fillO: { a: 0.3, gap: 9, cross: false, key: 562 }, w: 4, key: 561 });
  ell(800, 950, 14, 14, { wash: '#d8c39a', w: 2, key: 563 });
  rect(870, 520, 140, 140, { w: 3, key: 564 }); txt('WC', 940, 590, 60, { font: 'Osw', weight: 600 });
  wash(pathOf([[-400, 1560], [1480, 1560], [1480, 2400], [-400, 2400]]), '#1e1812', 1); pencil([[-400, 1560], [1480, 1560]], { w: 3.4, key: 565 });
  const sl = pr(t, CUE.notake + 1.1, CUE.notake + 1.25); if (sl > 0) { txt('БАМ!', 940, 420, 80, { font: 'Osw', weight: 600, col: PAL.warm, a: 1 - pr(t, CUE.notake + 1.5, CUE.notake + 1.9), rot: 0.1 }); }
  rect(60, 360, 300, 400, { wash: '#1d1a20', w: 3, key: 566 }); txt('Том', 210, 560, 70, { col: PAL.eye, glow: 0.4, rot: -0.05 }); txt('— босс', 210, 630, 44, { a: 0.7 });
}
function scoop(x, y, s) { push(x, y, s, 0.15); pencil([[0, 0], [0, -150]], { w: 12, col: '#c9d6e0', key: 576 }); shape([[-70, -150], [70, -150], [86, -330], [-86, -330]], { wash: '#26303a', fill: '#9fb6c8', fillO: { a: 0.45, gap: 7, key: 577 }, w: 3.6, col: '#e3edf4', key: 570 }); for (let i = -2; i <= 2; i++) pencil([[i * 24, -180], [i * 28, -300]], { w: 7, col: '#0d1014', a: 0.9, pass2: false, key: 571 + i }); pencil([[-86, -330], [-100, -350]], { w: 3, col: '#e3edf4', key: 578 }); pencil([[86, -330], [100, -350]], { w: 3, col: '#e3edf4', key: 579 }); pop(); }
function check(x, y, s, k) { if (k <= 0) return; pencil([[x - 40 * s, y], [x - 8 * s, y + 34 * s], [x + 50 * s, y - 40 * s]], { w: 10, col: '#7dff9a', glow: 1, reveal: k, gap: false, key: 580 }); }

// ------------------------------------------------------------------ грейдинг кадра (свет сцены) и HUD
function post(t, o) {
  const n = SC[sceneAt(t)][0];
  o.save();
  if (['kitten', 'grow', 'gut'].includes(n)) { o.globalCompositeOperation = 'soft-light'; o.fillStyle = 'rgba(40,120,110,0.35)'; o.fillRect(0, 0, W, H); }
  else if (n === 'village') { o.globalCompositeOperation = 'soft-light'; o.fillStyle = 'rgba(255,170,80,0.55)'; o.fillRect(0, 0, W, H); }
  else if (t < CUE.lamp) { o.globalCompositeOperation = 'soft-light'; o.fillStyle = 'rgba(60,110,200,0.45)'; o.fillRect(0, 0, W, H); }
  else { o.globalCompositeOperation = 'soft-light'; o.fillStyle = 'rgba(255,150,60,0.32)'; o.fillRect(0, 0, W, H); }
  o.globalCompositeOperation = 'source-over';
  const vg = o.createRadialGradient(W / 2, H * 0.45, H * 0.3, W / 2, H * 0.5, H * 0.78); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.55)'); o.fillStyle = vg; o.fillRect(0, 0, W, H);
  o.restore();
}
// субтитры: по 1–3 слова, Oswald 84 px (высота заглавной ≈ 58 px), y ≈ 1440, выше зоны интерфейса (нижние 15 %)
const HOT_TOM = /^(лактаза|лактазы|лактозы|фермент|сахар|сахара|жир|жира|сливки|воды|лоток|лоток\.|кожаный|десятая)/i;
const HOT_RED = /^(газы|бурление|понос|бля|бактерии|кишки)/i;
const GROUPS = (() => {
  const out = [];
  for (const ln of LINES) {
    const ws = ln.words.filter(w => w.w !== '—'), gs = []; let cur = [];
    const flush = () => { if (cur.length) gs.push({ sp: ln.speaker, words: cur }); cur = []; };
    for (const w of ws) { const len = cur.reduce((n, x) => n + x.w.length + 1, 0) + w.w.length; if (cur.length >= 3 || len > 15) flush(); cur.push(w); if (/[.!?…,]$/.test(w.w) && cur.length >= 1 && len > 6) flush(); }
    flush();
    gs.forEach((g, i) => { g.s = g.words[0].s - 0.04; g.e = i + 1 < gs.length ? gs[i + 1].words[0].s - 0.04 : ln.end + 0.25; });
    out.push(...gs);
  }
  return out;
})();
function hudFrame(t) {
  // обложка/хук: вопрос серии
  if (t < CUE.saucerCut + 0.6) { const a = 1 - pr(t, CUE.saucerCut + 0.2, CUE.saucerCut + 0.6);
    txt('МОЛОКО — КОТУ?', 540, 250, 104, { font: 'Osw', weight: 600, col: '#f4ecdc', a, stroke: 16 }); txt('объясняет кот', 540, 345, 52, { col: PAL.eye, a: a * 0.95, glow: 0.4 }); }
  if (t > CUE.poster) { const k = popK(t, CUE.poster + 0.15, 0.4);
    push(540, 175, k, -0.03); txt('ПОДПИШИСЬ, КОЖАНЫЙ', 0, 0, 88, { font: 'Osw', weight: 600, col: '#f4ecdc', stroke: 16 }); pop();
    txt('дальше: почему я ору в 3 ночи', 540, 280, 62, { col: PAL.warm, stroke: 12, a: pr(t, CUE.poster + 0.3, CUE.poster + 0.7) }); }
  const g = GROUPS.find(x => t >= x.s && t < x.e); if (!g) return;
  const n = SC[sceneAt(t)][0]; if (n === 'gut' && t > CUE.gas - 0.05) return;     // в кульминации слова — сами по себе картинка
  const size = 84, y = 1440; ctx.save(); ctx.font = `600 ${size}px Osw`;
  const words = g.words.map(w => w.w.replace(/[—]/g, '').toUpperCase()), sp = ctx.measureText(' ').width * 1.2, wd = words.map(w => ctx.measureText(w).width), tw = wd.reduce((a, b) => a + b, 0) + sp * (words.length - 1);
  ctx.restore();
  const k = popK(t, g.s, 0.18); push(540, y, 0.9 + 0.1 * k); let x = -tw / 2;
  words.forEach((w, i) => { const on = t >= g.words[i].s - 0.03, bare = g.words[i].w.replace(/[,!?.…]/g, '');
    const col = HOT_RED.test(bare) ? PAL.alarm : HOT_TOM.test(bare) ? (g.sp === 'tom' ? PAL.eye : PAL.warm) : (g.sp === 'tom' ? '#f4ecdc' : '#a9d4ff');
    const pk = on ? popK(t, g.words[i].s - 0.03, 0.2) : 0;
    push(x + wd[i] / 2, 0, 1 + 0.08 * pk * (col !== '#f4ecdc' && col !== '#a9d4ff' ? 2 : 1));
    txt(w, 0, 0, size, { font: 'Osw', weight: 600, col: on ? col : 'rgba(244,236,220,0.55)', stroke: 16, a: 1 });
    pop(); x += wd[i] + sp; });
  pop();
}
