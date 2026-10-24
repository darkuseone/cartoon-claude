/* Эп. 1 v4 «Котам можно молоко?» — бумажная вырезка. Метки — от слов новой озвучки (их же берёт синтез звука). */

const CUE = {
  tom0: Wd('n01', 0), pay: Wd('t01', 0), yourMilk: Wd('t01', 1), what: Wd('n02', 0), allMilk: Wd('n02', 2),
  roof: LN.t02.start - 0.05, yell: Wd('t02', 3), three: Wd('t02', 5), notMean: Wd('t02', 7),
  shortly: Wd('t03', 0), kitten: Wd('t03', 2), belly: Wd('t03', 4), enzyme: Wd('t03', 6), lactase: Wd('t03', 7), cut: Wd('t03', 9), sugar: Wd('t03', 10),
  grown: Wd('t04', 1), left: Wd('t04', 4), ten: Wd('t04', 7), sowhat: Wd('n03', 0),
  gut: LN.t05.start - 0.05, stuck: Wd('t05', 3), water: Wd('t05', 5), bact: Wd('t05', 12), gas: Wd('t05', 14), boil: Wd('t05', 15), and: Wd('t05', 16),
  back: LN.t05.end, lightOn: LN.t05.end + 0.12, groan: LN.t06.start, fuck: Wd('t06', 0),
  where: Wd('n04', 0), crap: Wd('n04', 5), saucer: Wd('n04', 7),
  village: Wd('t07', 0), lick: Wd('t07', 2), fat: Wd('t07', 6), sweet: Wd('t07', 8), toons: Wd('t07', 11), cult: Wd('t07', 15),
  angry: Wd('n05', 0), bottom: Wd('n05', 6), lickd: Wd('n05', 8),
  fatty: Wd('t08', 2), iam: Wd('t08', 3), diet: Wd('t08', 7),
  advice: Wd('t09', 0), water2: Wd('t09', 2), water3: Wd('t09', 3), catmilk: Wd('t09', 6), nolact: Wd('t09', 9),
  ok: Wd('n06', 0), drink: Wd('n06', 3) + 0.35, btw: Wd('t10', 0), two: Wd('t10', 2), thirds: Wd('t10', 3), adults: Wd('t10', 4), also: Wd('t10', 7),
  gurgle: LN.t10.end + 0.15, pzdc: Wd('n07', 0), busy: Wd('t11', 0), run: Wd('t11', 1) + 0.1, sub: Wd('t11', 2), lightOff: LN.t11.end + 0.1
};
CUE.slam = CUE.run + 0.55;

// ------------------------------------------------------------------ помощники
function ex(t, list, d = 0.08) { let cur = {}, prev = {}, t0 = -1e9; for (const [tt, o] of list) if (t >= tt) { prev = cur; cur = { ...cur, ...o }; t0 = tt; }
  const k = sm((t - t0) / d), r = { ...cur }; for (const key in cur) if (typeof cur[key] === 'number' && typeof prev[key] === 'number') r[key] = lerp(prev[key], cur[key], k); return r; }
function ck(t, K) { if (t <= K[0][0]) return K[0].slice(1); for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const a = K[i - 1], b = K[i], k = eio((t - a[0]) / (b[0] - a[0])); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], k)]; } return K[K.length - 1].slice(1); }
const lit = t => t >= CUE.lightOn && t < CUE.lightOff;
function talk(who, t) { const m = mouthAt(who, t); return { m, bob: m.talking ? -m.open * 5 : 0 }; }
const SHAKES = [[CUE.fuck, 0.5, 16], [CUE.gas, 0.25, 8], [CUE.boil, 0.8, 14], [CUE.pzdc, 0.3, 10], [CUE.slam, 0.25, 14], [CUE.cult, 0.2, 10], [CUE.ten, 0.2, 10]];
function shakeAt(t) { let s = 0; for (const [t0, d, a] of SHAKES) if (t >= t0 && t < t0 + d) s = Math.max(s, a * (1 - (t - t0) / d)); return s; }

// постановка в коридоре
const TOMP = { x: 760, y: 1035, s: 0.72 }, NIKP = { x: 300, y: 890, s: 1.0 };
const PHONE = [NIKP.x - 70, NIKP.y + 215];
function tomH(t, o = {}) { const tk = talk('tom', t); tom({ ...TOMP, t, m: tk.m, bob: tk.bob, ...o }); }
function nikH(t, o = {}) { const tk = talk('nikita', t); nikita({ ...NIKP, t, m: tk.m, bob: tk.bob, ...o }); }
function hallScene(t, tomO, nikO, extra) {
  hallway(t, { lamp: lit(t), switchOn: lit(t), doorLight: t > CUE.slam && t < CUE.lightOff + 0.6 ? 1 : 0, min: 7 + Math.floor(t / 60), sec: (t * 1) % 60 });
  if (tomO) layer(() => tomH(t, tomO), { sx: lit(t) ? 6 : -10, sy: 8, sb: 12 });
  litterFront();
  if (nikO) { ellP((nikO.x ?? NIKP.x), NIKP.y + 512, 120, 16, 'rgba(20,12,6,0.35)', { line: false, tex: false }); layer(() => nikH(t, nikO), { sx: 8, sy: 8, sb: 14 }); }
  if (extra) extra();
  if (!lit(t)) lightmap('#4b5794', () => {                         // ночь: фонарик телефона на Тома, отсвет экрана на лицо Никиты
    if (nikO && !nikO.noBeam) { cone(PHONE[0], PHONE[1], TOMP.x, TOMP.y + 60, 300, 'rgba(255,255,255,1)', 1); radial(TOMP.x, TOMP.y + 60, 330, 'rgba(230,240,255,1)', 0.8); radial(PHONE[0] + 20, PHONE[1] - 120, 260, 'rgba(150,190,255,0.9)', 0.9); }
    radial(TOMP.x, TOMP.y, 120, 'rgba(160,255,120,0.35)', 1);
  });
  else lightmap('#d9c8b4', () => { radial(625, 470, 1100, 'rgba(255,240,215,1)', 0.75); radial(540, 1100, 1300, 'rgba(255,255,255,1)', 0.35); });
  if (!lit(t) && tomO && (tomO.lid ?? 0.45) < 0.95 && tomO.mood !== 'bliss') [-1, 1].forEach(sd => glowAdd(TOMP.x + sd * 55 * TOMP.s, TOMP.y - 16, 70, 'rgba(180,255,90,0.55)', 0.8));
}

// ------------------------------------------------------------------ планы (жёсткие склейки)
const SHOTS = [
  [0, 'cold'], [LN.t01.start - 0.06, 'tomCU1'], [LN.n02.start - 0.1, 'nikCU1'], [CUE.roof, 'roof'], [CUE.notMean - 0.05, 'tomCU2'], [CUE.shortly - 0.05, 'board'],
  [LN.n03.start - 0.05, 'nikCU2'], [CUE.gut, 'gut'], [CUE.back, 'tomCU3'], [LN.n04.start - 0.1, 'pointPic'], [CUE.village - 0.05, 'village'], [CUE.toons - 0.05, 'cult'],
  [LN.n05.start - 0.05, 'angry'], [LN.t08.start - 0.05, 'tomCU4'], [LN.t09.start - 0.05, 'advice'], [LN.n06.start - 0.05, 'drink'], [LN.t10.start - 0.05, 'twothirds'],
  [LN.t10.end, 'dread'], [LN.t11.start - 0.05, 'final']
];

function frame(t) { const i = shotAt(t); SH[SHOTS[i][1]](t, t - SHOTS[i][0]); }

function slideIn(u, fn) { const k = step(clamp(u / 0.25), 24); push((1 - eo(k)) * 1100, 0, 1, (1 - k) * 0.08); fn(); pop(); }   // вставка «въезжает» карточкой

const TOMNIGHT = { mood: 'strain', lid: 0.6 };
const SH = {
  cold(t) {
    const [cx, cy, z] = ck(t, [[0, 540, 1060, 1.22], [LN.t01.start, 580, 1060, 1.32]]);
    cam(cx, cy, z); hallScene(t, ex(t, [[0, { ...TOMNIGHT, lk: [-0.2, 0] }], [CUE.tom0 + 0.3, { lk: [-0.8, 0] }]]),
      { mood: 'sleepy', lk: [0.7, 0.2], arms: { l: [-40, 205, 'phone'], r: [112, 280, 'glass'] }, glass: 0.75 }); pop();
  },
  tomCU1(t) {
    cam(760, 990, 2.25); hallScene(t, ex(t, [[0, { mood: 'strain', lid: 0.62, lk: [0, 0] }], [CUE.yourMilk, { mood: 'strain', lid: 0.5, lk: [-0.9, 0], brow: -0.5 }]]),
      { mood: 'sleepy', arms: { l: [-40, 205, 'phone'], r: [112, 280, 'glass'] }, glass: 0.75 }); pop();
  },
  nikCU1(t) {
    const up = eo(pr(t, CUE.allMilk, CUE.allMilk + 0.2));
    cam(320, 960, 2.0); hallScene(t, TOMNIGHT, { ...ex(t, [[0, { mood: 'shock', lk: [0.8, 0.2] }], [CUE.allMilk, { mood: '', brow: 0.8, smile: 0.3, lk: [0.6, 0] }]]),
      arms: { l: [-40, 205, 'phone'], r: [lerp(112, 175, up), lerp(280, 40, up), 'glass'] }, glass: 0.75 }); pop();
  },
  roof(t, u) { cam(540, 960, 1); slideIn(u, () => roofInsert(t, pr(t, CUE.yell - 0.05, CUE.yell + 0.5))); pop(); },
  tomCU2(t) { cam(760, 990, 2.25); hallScene(t, { mood: 'strain', lid: 0.55, brow: -0.4, lk: [-0.9, 0] }, { mood: 'sleepy', arms: { l: [-40, 205, 'phone'], r: [112, 280, 'glass'] }, glass: 0.75 }); pop(); },
  board(t, u) {
    cam(540, 960, 1); slideIn(u, () => {
      cork();
      card(540, 300, 760, 190, -0.02, 700, '#fbf6e8'); txt('ПОЧЕМУ КОТАМ НЕЛЬЗЯ МОЛОКО', 540, 300, 48, { font: 'Inter Black', col: '#1c1512', rot: -0.02 }); pin(180, 230); pin(900, 232, '#2f6db3');
      const grown = t >= CUE.grown;                                  // стоп-моушен замена: котёнок → взрослый Том
      card(330, 760, 460, 560, 0.03, 701); pin(330, 500, '#f2c230');
      if (!grown) kittenCut(330, 760, 1.05, t); else { push(330, 720, 0.66); tom({ x: 0, y: 0, s: 1, t, lid: 0.45, smirk: 0.5 }); pop(); }
      if (t > CUE.belly) { const k = popK(t, CUE.belly, 0.25); push(330, grown ? 880 : 900, k); ellP(0, 0, 70, 52, '#e8829a', { seed: 702, lw: 3 }); stroke([[-40, -10], [0, 10], [40, -10], [10, 20]], '#b9536a', 6); pop(); txt('живот', 450, grown ? 960 : 980, 40, { font: 'Hand', col: '#1c1512', rot: -0.1 }); }
      txt(grown ? 'ВЗРОСЛЫЙ' : 'КОТЁНОК', 330, 1080, 52, { font: 'Inter Black', col: grown ? '#b8322a' : '#2f6db3' });
      // лактазы-ножницы
      if (t > CUE.enzyme - 0.1) { const n = grown ? 10 : 3;
        for (let i = 0; i < n; i++) { const gx = grown ? 760 + (i % 2) * 190 : 830, gy = grown ? 560 + Math.floor(i / 2) * 120 : 620 + i * 190;
          const fall = grown && i !== 4 ? clamp((t - CUE.left - i * 0.06) / 0.6) : 0, fy = step(fall, 12) * step(fall, 12) * 1300;
          if (gy + fy > 2100) continue; scissors(gx, gy + fy, grown ? 0.8 : 1.15, t + i, { rot: fall * 3, sleep: grown && i !== 4 && fall > 0, open: fall > 0 ? 0.05 : undefined }); }
        if (t > CUE.lactase) { push(820, grown ? 470 : 520, popK(t, CUE.lactase, 0.25), 0.05); piece([[-130, -32], [130, -32], [130, 32], [-130, 32]], '#f4e6a8', { seed: 703, step: 10, lw: 1.6 }); txt('ЛАКТАЗА', 0, 2, 46, { font: 'Inter Black', col: '#1c1512' }); pop(); } }
      // молочный сахар: кубики на скотче; ножницы режут
      if (t > CUE.cut - 0.15 && !grown) { const sp = eo(pr(t, CUE.sugar, CUE.sugar + 0.3)); sugarPair(540, 1330, 1.3, sp, 710);
        push(540, 1340, 1); txt('МОЛОЧНЫЙ САХАР', 0, -120, 54, { font: 'Inter Black', col: '#1c1512', a: pr(t, CUE.sugar, CUE.sugar + 0.2) }); pop();
        if (sp < 1) scissors(540 - 190 + sp * 160, 1330, 1.1, t, { rot: 0.9, open: sp > 0 ? 0.05 : 0.5 }); }
      if (t > CUE.ten - 0.05) ransom('÷10', 820, 1260, 170, 720, { reveal: pr(t, CUE.ten - 0.05, CUE.ten + 0.15) });
    }); pop();
  },
  nikCU2(t) { cam(320, 960, 2.0); hallScene(t, TOMNIGHT, { mood: 'dumb', brow: 0.9, lk: [0.7, 0], arms: { l: [-40, 205, 'phone'], r: [112, 280, 'glass'] }, glass: 0.75 }); pop(); },
  gut(t, u) {
    cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => {
      rectP(-100, -100, 1280, 2200, '#2a2140', { seed: 730, line: false, step: 80 });
      const sw = pr(t, CUE.gas, CUE.and + 0.4);
      gutBoard(t, { swell: sw * 3, wob: t > CUE.boil ? 1 : 0 });
      txt('КИШКИ', 540, 300, 64, { font: 'Inter Black', col: '#f6efe0', a: 1 - pr(t, CUE.gas - 0.1, CUE.gas) });
      const pts = [[-300, -300], [300, -300], [300, -100], [-300, -100], [-300, 100], [300, 100], [300, 300], [-300, 300]], path = spline(pts, false, 10);
      const at = k => { const p = path[Math.floor(clamp(k) * (path.length - 1))]; return [540 + p[0], 860 + p[1]]; };
      for (let i = 0; i < 6; i++) { const k = (0.08 + i * 0.15 + step(t) * 0.02) % 1, [x, y] = at(k), eaten = t > CUE.bact ? pr(t, CUE.bact + i * 0.12, CUE.bact + 0.4 + i * 0.12) : 0; if (eaten < 1) sugarPair(x, y, 0.55 * (1 - eaten), 0, 740 + i * 5); }
      if (t > CUE.stuck && t < CUE.water) scissors(260, 1420, 0.8, t, { sleep: true, open: 0.05 });
      if (t > CUE.stuck && t < CUE.bact) push(540, 1450, 1), ransom('НЕ ПЕРЕВАРИВАЕТСЯ', 0, 0, 56, 760, { reveal: pr(t, CUE.stuck, CUE.stuck + 0.4) }), pop();
      if (t > CUE.water) for (let i = 0; i < 10; i++) { const ph = ((t - CUE.water) * 0.6 + i / 10) % 1, sd = i % 2 ? 1 : -1; drop(540 + sd * lerp(520, 140, ph), 520 + (i * 97) % 700, 0.9, 770 + i); }
      if (t > CUE.bact) for (let i = 0; i < 6; i++) { const [x, y] = at((0.08 + i * 0.15) % 1); bacterium(x + 40, y + 20, 0.75 * popK(t, CUE.bact + i * 0.08, 0.25), t, 780 + i * 7); }
      if (t > CUE.gas) for (let i = 0; i < 14; i++) { const r = rng(800 + i), ph = ((t - CUE.gas) * (t > CUE.boil ? 1.4 : 0.6) + r()) % 1; bubble(160 + r() * 760, 1400 - ph * 1000, (16 + r() * 40) * (0.5 + ph), 800 + i); }
      [[CUE.gas, 'ГАЗЫ', 380, -0.06], [CUE.boil, 'БУРЛЕНИЕ', 560, 0.05]].forEach(([tt, w, y, r]) => { if (t > tt) { push(540, y, 1, r); ransom(w, 0, 0, 110, 820 + y, { reveal: pr(t, tt, tt + 0.25), pop: true }); pop(); } });
    }); pop();
  },
  tomCU3(t) {
    cam(760, 990, 2.25, 0, shakeAt(t) + (t > CUE.groan ? 3 : 0));
    hallScene(t, ex(t, [[0, { mood: 'shock', pup: 1, fur: 1 }], [CUE.groan, { mood: 'pain', lid: 0.7, ears: 1, brow: -0.8, sweat: 1 }]]),
      { mood: 'sleepy', arms: { l: [-40, 205, 'phone'], r: [112, 280, 'glass'] }, glass: 0.75 }); pop();
    if (t > CUE.fuck) { push(540, 330, 1, -0.05); ransom('ЕБ*ТЬ!', 0, 0, 150, 900, { reveal: pr(t, CUE.fuck, CUE.fuck + 0.2), pop: true }); pop(); }
  },
  pointPic(t) {
    const [cx, cy, z] = ck(t, [[LN.n04.start, 540, 960, 1.0], [CUE.crap, 560, 940, 1.05], [CUE.saucer + 0.1, 760, 640, 2.4], [CUE.village, 760, 610, 4.2]]);
    cam(cx, cy, z);
    hallScene(t, { mood: 'pain', lid: 0.65, ears: 0.8, sweat: 1, lk: [-0.5, 0] }, { ...ex(t, [[0, { mood: '', brow: 0.6, lk: [0.9, -0.6] }], [CUE.crap, { mood: 'dumb', brow: 1, lk: [0.9, -0.8] }]]),
      noBeam: true, arms: { l: [-40, 205, 'phone'], r: [lerp(112, 210, eo(pr(t, CUE.where, CUE.where + 0.2))), lerp(280, -60, eo(pr(t, CUE.where, CUE.where + 0.2))), 'point'] }, glass: 0, phoneLit: false });
    pop();
  },
  village(t, u) {
    cam(540, 960, 1); const zoom = 1 + (1 - eo(clamp(u / 0.5))) * 1.5;
    rectP(-100, -100, 1280, 2200, '#3b2e24', { seed: 830, line: false, step: 80 });
    push(540, 900, zoom); sepiaPhoto(0, 0, 1.15, -0.02, t, { notes: t > CUE.fat, notes2: t > CUE.sweet }); pop();
    push(540, 280, 1); ransom('ДЕРЕВНЯ', 0, 0, 96, 840, { reveal: pr(t, CUE.village, CUE.village + 0.3) }); pop();
    pop();
  },
  cult(t) {
    cam(540, 960, 1, 0, shakeAt(t)); rectP(-100, -100, 1280, 2200, '#2b2622', { seed: 850, line: false, step: 80 });
    const slots = [[300, 520], [780, 520], [540, 820], [300, 1120], [780, 1120], [540, 1420], [180, 820], [900, 820]];
    slots.forEach(([x, y], i) => { const t0 = CUE.toons + i * 0.18; if (t > t0) tv(x, y, 0.95 * popK(t, t0, 0.25), t, 860 + i * 5, { rot: (i % 3 - 1) * 0.05 }); });
    if (t > CUE.cult) { push(540, 300, 1, -0.04); ransom('КУЛЬТ', 0, 0, 150, 880, { reveal: pr(t, CUE.cult, CUE.cult + 0.2), pop: true }); pop(); }
    pop();
  },
  angry(t) {
    cam(540, 1060, 1.22); hallScene(t, ex(t, [[0, { mood: '', lid: 0.55, lk: [-0.8, 0], ears: 0.3 }], [CUE.lickd, { mood: 'shock', pup: 0.9, lk: [-0.8, 0] }]]),
      { mood: 'angry', brow: -0.6, lk: [0.9, 0.2], noBeam: true, arms: { l: [-110, 290, 'phone'], r: [200, 120, 'point'] }, glass: 0, phoneLit: false });
    if (t > CUE.bottom) polaroid(330, 520, 0.9 * popK(t, CUE.bottom, 0.3), -0.08, t, 'вчера, 3:12');
    pop();
  },
  tomCU4(t) {
    cam(760, 990, 2.1); hallScene(t, ex(t, [[0, { mood: 'smug', lid: 0.5, lk: [-0.6, 0], smirk: 0.8 }], [CUE.fatty, { mood: 'bliss' }], [CUE.iam, { mood: 'smug', lid: 0.45, lk: [0.3, 0.3], smirk: 1 }]]),
      { mood: '', arms: { l: [-110, 290, 'phone'], r: [112, 280, 'open'] }, noBeam: true, phoneLit: false }); pop();
    if (t > CUE.iam) { const tear = eo(pr(t, CUE.diet + 0.1, CUE.diet + 0.4)); push(540, 470, 1); diploma(0, 0, 0.95 * popK(t, CUE.iam, 0.3), -0.05, tear); pop(); }
  },
  advice(t) {
    cam(700, 1060, 1.55); hallScene(t, ex(t, [[0, { lid: 0.45, paw: 1, pawX: 170, pawY: 120, lk: [-0.4, -0.3] }]]),
      { arms: { l: [-110, 290, 'phone'], r: [112, 280, 'glass'] }, glass: 0.4, noBeam: true, phoneLit: false }); pop();
    if (t > CUE.water2 - 0.05) { glassP(140, 760, 0.9 * popK(t, CUE.water2 - 0.05, 0.3), 0.75, { water: true }); check(140, 580, 1, pr(t, CUE.water3, CUE.water3 + 0.15)); }
    if (t > CUE.catmilk - 0.1) { cartonP(320, 740, 0.85 * popK(t, CUE.catmilk - 0.1, 0.3), 0.04); check(320, 520, 1, pr(t, CUE.nolact, CUE.nolact + 0.15)); }
  },
  drink(t) {
    const dr = pr(t, CUE.drink - 0.25, CUE.drink + 0.6), sip = pr(t, CUE.drink + 0.35, CUE.btw - 0.2);
    cam(320, 960, 1.9); hallScene(t, { lid: 0.5, smirk: 0.8, lk: [-0.8, 0] },
      { ...ex(t, [[0, { brow: -0.2, smile: 0.2, lk: [0.6, 0] }]]), noBeam: true, phoneLit: false, milkMoustache: sip > 0.7, drink: dr,
        arms: { l: [-110, 290, 'phone'], r: [112, 280, 'glass'] }, glass: 0.45 * (1 - sip * 0.92) }); pop();
  },
  twothirds(t) {
    const fr = t > CUE.also;
    cam(540, 1060, 1.22); hallScene(t, ex(t, [[0, { lid: 0.45, smirk: 1, lk: [-0.8, 0] }], [CUE.thirds, { lk: [-0.3, -0.6] }], [CUE.also, { lk: [-0.8, 0], smirk: 1 }]]),
      { ...ex(t, [[0, { lid: 0.2, lk: [0.8, 0] }], [CUE.btw + 0.5, { lid: 0.2, lk: [0.8, 0] }], [CUE.also, { mood: 'shock', lk: [0, 0.4] }]]), milkMoustache: true, noBeam: true, phoneLit: false,
        drink: fr ? 0 : 1, arms: { l: [-110, 290, 'phone'], r: [112, 280, 'glass'] }, glass: 0.04 }); pop();
    if (t > CUE.two - 0.2) card(540, 400, 860, 440, -0.02, 905, '#f6f1e4');
    if (t > CUE.two - 0.2) [-1, 0, 1].forEach((k, i) => { personIcon(540 + k * 200, 360, 0.9 * popK(t, CUE.two - 0.2 + i * 0.1, 0.25), i < 2 && t > CUE.thirds + i * 0.18 ? '#e9a0a0' : '#f4efe2', 900 + i * 3); if (i < 2) stampX(540 + k * 200, 350, 0.9, pr(t, CUE.thirds + i * 0.18, CUE.thirds + i * 0.18 + 0.12)); });
    if (t > CUE.adults) { push(540, 545, 1); piece([[-250, -36], [250, -36], [250, 36], [-250, 36]], '#f4e6a8', { seed: 910, step: 10, lw: 1.6 }); txt('2 из 3 взрослых людей', 0, 2, 42, { font: 'Inter Black', col: '#1c1512' }); pop(); }
  },
  dread(t) {
    cam(320, 1000, 2.0, 0, shakeAt(t)); hallScene(t, { lid: 0.45, smirk: 1, lk: [-0.8, 0] },
      { mood: 'dread', milkMoustache: true, sweat: 1, belly: pr(t, CUE.gurgle, CUE.gurgle + 0.5), lk: [0, 0.6], noBeam: true, phoneLit: false,
        arms: { l: [-60, 250, 'belly'], r: [70, 250, 'belly'] } }); pop();
    if (t > CUE.pzdc) { push(540, 330, 1, 0.04); ransom('П*ЗДЕЦ', 0, 0, 150, 920, { reveal: pr(t, CUE.pzdc, CUE.pzdc + 0.2), pop: true }); pop(); }
  },
  final(t) {
    const run = pr(t, CUE.run, CUE.slam), gone = t > CUE.slam;
    cam(540, 1060, 1.22, 0, shakeAt(t));
    hallScene(t, ex(t, [[0, { lid: 0.5, smirk: 1, lk: [-0.8, 0] }], [CUE.sub, { lid: 0.45, lk: [0, 0.2], paw: 1, pawX: 170, pawY: 110, smirk: 1 }], [CUE.lightOff, { paw: 0, lid: 0.35 }]]),
      gone ? null : { ...(run > 0 ? { x: lerp(NIKP.x, 230, run), legs: 'run', mood: 'shock', lean: -0.15 } : { mood: 'dread', lk: [0.9, 0.5] }), milkMoustache: true, noBeam: true, phoneLit: false, belly: 1, arms: { l: [-60, 250, 'belly'], r: [70, 250, 'belly'] } });
    pop();
    if (t > CUE.lightOff) { push(540, 300, 1, -0.03); ransom('ПОДПИШИСЬ', 0, 0, 120, 940, { reveal: pr(t, CUE.lightOff, CUE.lightOff + 0.25), pop: true }); pop(); }
  }
};

// ------------------------------------------------------------------ HUD: обложка, субтитры
const CENS = { 'Ебать,': 'Е*АТЬ,', 'херня': 'Х*РНЯ', '…Пиздец.': 'П*ЗДЕЦ.' };
const HOT = /^(лактаза|лактазы|лактозы|фермент|сахар|сахара|жира|сливки|воды|лоток|кожаный|бактерии|культ|молочко|диетолог|газы|бурление)/i;
function hudFrame(t) {
  if (t < LN.t01.start - 0.06) {                                     // обложка = первый кадр
    push(540, 230, 1, -0.03); ransom('КОТАМ МОЖНО', 0, 0, 104, 990); pop(); push(540, 370, 1, 0.02); ransom('МОЛОКО?', 0, 0, 128, 991); pop();
  }
  const g = GROUPS.find(x => t >= x.s && t < x.e); if (!g) return;
  if (g.key === 't06' && t > CUE.fuck - 0.05 && g.words.some(w => w.w.startsWith('Ебать'))) return;
  if (g.key === 'n07') return;
  const size = 76, y = 1545; ctx.save(); ctx.font = `900 ${size}px Inter`;
  const words = g.words.map(w => (CENS[w.w] || w.w).toUpperCase()), sp = ctx.measureText(' ').width * 1.1, wd = words.map(w => ctx.measureText(w).width), tw = wd.reduce((a, b) => a + b, 0) + sp * (words.length - 1);
  ctx.restore(); const sc = Math.min(1, 980 / tw); let x = -tw / 2;
  push(540, y, sc * (0.92 + 0.08 * popK(t, g.s, 0.15)));
  words.forEach((w, i) => { const on = t >= g.words[i].s - 0.03, bare = g.words[i].w.replace(/[,!?.…:]/g, ''), mat = !!CENS[g.words[i].w];
    const col = mat ? '#ff4a3a' : HOT.test(bare) ? '#ffd23a' : g.sp === 'tom' ? '#ffffff' : '#bfe6ff';
    txt(w, x + wd[i] / 2, 0, size, { font: 'Inter', weight: 900, col: on ? col : 'rgba(255,255,255,0.5)', stroke: 15, sc: '#120d0b' }); x += wd[i] + sp; });
  pop();
}
function post(t, o) { const v = o.createRadialGradient(W / 2, H * 0.45, H * 0.35, W / 2, H * 0.5, H * 0.8); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.35)'); o.save(); o.fillStyle = v; o.fillRect(0, 0, W, H); o.restore(); }
