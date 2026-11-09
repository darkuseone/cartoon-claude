/* Эп. 11 «Корм „с лососем“ — развод?» — сцены. Общие помощники в engine2/common.js. */
const CUE = {
  voro: Wd('n01', 12), three: Wd('t01', 2), corn: Wd('t01', 6), hope: Wd('t01', 8), fish: Wd('n02', 6),
  threeI: Wd('t02', 4), word: Wd('t02', 11), min3: Wd('t02', 14), only3: Wd('t02', 17),
  w1: Wd('t03', 0), w2: Wd('t03', 1), w3: Wd('t03', 2), p25: Wd('t03', 3), small: Wd('n04', 3),
  worst: Wd('t04', 3), flavI: Wd('t04', 5), noMin: Wd('t04', 8), taste: Wd('t04', 12), swim: Wd('t04', 16),
  ladder: Wd('t05', 2), p95: Wd('t05', 9), backI: Wd('t06', 0), desc: Wd('t06', 5), first: Wd('t06', 7), cornB: Wd('t06', 12), hunter: Wd('t06', 15),
  honest: Wd('n07', 8), mat: Wd('t07', 0), more: Wd('t07', 1), fishW: Wd('t07', 3), sub: Wd('t08', 0), loop: LN.t08.end + 0.3
};
CUE.corn6 = CUE.cornB;                                                  // для backIns: c.corn
const SHAKES = [[CUE.three, 0.25, 8], [CUE.min3, 0.25, 8], [CUE.noMin, 0.25, 8], [CUE.p95, 0.25, 8], [CUE.mat, 0.5, 16], [CUE.fishW, 0.3, 10]];
const EP = { title: ['«С ЛОСОСЕМ» —', 'РАЗВОД?'], cens: { 'Сука.': 'С*КА.' },
  hot: /^(сорок|долларов|лососем|лосося|три|процента|кукуруза|надежда|рыба|США|минимум|ужин|блюдо|формула|двадцать|пять|четверть|вкусом|минимума|завода|маркетинг|девяносто|убыванию|первое|хищник|хомяк|честно|кожаный)/i,
  hideMat: [['t07', 'Сука', CUE.mat]] };
const TOMP = { x: 860, y: 761, s: 0.62 }, NIKP = { x: 380, y: 1077, s: 0.95 };
const TOMD = { lid: 0.55, lk: [-0.8, 0.1], smirk: 0.2 };
const HOLD = { l: [-150, 300, 'open'], r: [190, 110, 'fist'] };            // правая — пачка корма у груди
const READ = { l: [-150, 300, 'open'], r: [175, 30, 'fist'] };            // пачка у лица: читает мелкий шрифт
const UP = { l: [-150, 300, 'open'], r: [150, -230, 'fist'] };             // пачка над головой: «понял!»
const handW = a => [NIKP.x + a[0] * NIKP.s, NIKP.y + a[1] * NIKP.s];

function scene(t, tomO, nikO, o = {}) {
  windowRoom(t, o);
  if (tomO) layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, m: tk.m, bob: tk.bob, ...tomO }); }, { sx: 7, sy: 8, sb: 12 });
  if (nikO) layer(() => { const tk = talk('nikita', t), n = { legs: 'stand', arms: HOLD, ...nikO }; nikita({ ...NIKP, t, m: tk.m, bob: tk.bob, ...n });
    if (n.pack !== false) { const [hx, hy] = handW(n.arms.r); foodPack(hx + 6, hy - 40, n.packS ?? 0.78, n.packR ?? -0.08, { small: n.small }); } }, { sx: 7, sy: 8, sb: 12 });
  morningLight(t);
}
const NCL = (z = 2.0, sh = 0) => cam(NIKP.x + 20, NIKP.y + 40, z, 0, sh);
const TCL = (z = 2.2, sh = 0) => cam(TOMP.x - 20, TOMP.y + 80, z, 0, sh);
const COLD = { mood: 'angry', brow: 0.6, lk: [0.8, -0.3], smile: 0 };
const TCOLD = { lid: 0.6, lk: [0.9, -0.4], smirk: 0, brow: -0.4 };       // Том демонстративно отвернулся от миски

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA'], [LN.n02.start - 0.05, 'nikA'], [LN.t02.start - 0.05, 'tomB'], [CUE.threeI - 0.05, 'three'],
  [LN.n03.start - 0.05, 'nikB'], [LN.t03.start - 0.05, 'dinner'], [LN.n04.start - 0.05, 'nikC'], [LN.t04.start - 0.05, 'tomC'], [CUE.flavI - 0.05, 'flavor'],
  [LN.n05.start - 0.05, 'nikD'], [LN.t05.start - 0.05, 'tomD'], [CUE.ladder - 0.05, 'ladder'], [LN.n06.start - 0.05, 'nikE'], [LN.t06.start - 0.05, 'back'],
  [CUE.hunter - 0.05, 'tomE'], [LN.n07.start - 0.05, 'nikF'], [LN.n07.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.more - 0.05, 'wideM'], [LN.t08.start - 0.08, 'final']];

const SH = {
  cold(t) { const [cx, cy, z] = ck(t, [[0, 600, 1080, 1.28], [CUE.voro, 610, 1060, 1.34]]); cam(cx, cy, z);
    scene(t, TCOLD, ex(t, [[0, COLD], [CUE.voro - 0.3, { mood: 'angry', brow: 1, lk: [0.9, -0.5] }]])); pop(); },
  tomA(t) { TCL(t > CUE.three ? 2.5 : 2.25, shakeAt(t)); scene(t, ex(t, [[0, { ...TCOLD, lk: [-0.6, 0] }], [CUE.three, { lid: 0.5, lk: [-0.9, 0], smirk: 0.5, brow: -0.3 }]]), { mood: 'shock' }); pop(); },
  nikA(t) { NCL(); scene(t, TOMD, { mood: 'angry', brow: 0.5, lk: [0.9, -0.2], arms: HOLD, packS: 0.95, packR: 0.05 }); pop(); },
  tomB(t) { TCL(2.2); scene(t, { ...TOMD, paw: 1, pawX: 175, pawY: 110 }, { mood: 'dumb' }); pop(); },
  three(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => threeIns(t, CUE)); pop(); },
  nikB(t) { NCL(2.05); scene(t, TOMD, { mood: 'dumb', smile: 0.5, brow: 0.7, lk: [0.9, -0.3] }); pop(); },
  dinner(t, u) { cam(540, 960, 1); slideIn(u, () => dinnerIns(t, CUE)); pop(); },
  nikC(t) { const z = t > CUE.small ? 2.4 : 2.1; cam(NIKP.x + 70, NIKP.y - 20, z); scene(t, TOMD, { mood: t > CUE.small ? 'dread' : 'dumb', brow: 0.8, lk: [0.5, 0.3], arms: READ, packS: 0.95, packR: 0.05, small: 26 }); pop(); },
  tomC(t) { TCL(t > CUE.worst ? 2.45 : 2.25); scene(t, { lid: 0.5, lk: [-0.9, 0], smirk: 0.3, brow: -0.5 }, { mood: 'dread' }); pop(); },
  flavor(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => flavorIns(t, CUE)); pop(); },
  nikD(t) { NCL(2.1, 4); scene(t, TOMD, { mood: 'shock', brow: 1, lk: [0.9, -0.2] }); pop(); },
  tomD(t) { cam(700, 1000, 1.45); scene(t, { ...TOMD, lid: 0.45, smirk: 0.6 }, { mood: 'shock', lk: [0.8, -0.3] }); pop(); },
  ladder(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => ladderIns(t, CUE)); pop(); },
  nikE(t) { NCL(2.1, 3); scene(t, TOMD, { mood: 'dread', brow: 1, lk: [0.9, -0.2] }); pop(); },
  back(t, u) { cam(540, 960, 1); slideIn(u, () => backIns(t, { ...CUE, corn: CUE.cornB })); pop(); },
  tomE(t) { TCL(2.4); scene(t, { lid: 0.4, lk: [-0.3, -0.2], smirk: 0.8, brow: -0.2 }, { mood: 'dumb' }); pop(); },
  nikF(t) { cam(450, 1000, 1.5); scene(t, ex(t, [[0, TOMD], [CUE.honest, { lid: 0.3, lk: [-0.9, -0.3], smirk: 0 }]]),
      { mood: 'dumb', smile: 1, brow: 1, lk: [0.4, -0.6], arms: t > LN.n07.start + 0.3 ? UP : HOLD, packR: 0.1 }); pop(); },
  stare(t) { TCL(2.3); scene(t, { lid: 0.62, lk: [-0.2, 0.1], smirk: 0, brow: -0.2 }, { mood: 'dumb', smile: 1, arms: UP }); pop(); },
  mat(t) { TCL(2.5, shakeAt(t)); scene(t, { lid: 0.88, lk: [0, 0.3], brow: -0.8, smirk: 0 }, { mood: 'dumb', smile: 1, arms: UP }); pop();
    if (t > CUE.mat) { push(540, 330, 1, -0.04); ransom('С*КА', 0, 0, 170, 11960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  wideM(t) { cam(640, 1040, 1.3, 0, shakeAt(t)); scene(t, { lid: 0.7, lk: [-0.8, 0.1], brow: -0.6, mood: t > CUE.fishW ? 'strain' : undefined }, { mood: 'dumb', smile: 0.9, brow: 0.8, lk: [0.8, -0.2], arms: UP }); pop();
    if (t > CUE.fishW) { push(540, 330, 1, 0.03); ransom('МНЕ НУЖНА РЫБА', 0, 0, 110, 11965, { reveal: pr(t, CUE.fishW, CUE.fishW + 0.25), pop: true }); pop(); } },
  final(t) { const [cx, cy, z] = ck(t, [[0, 610, 1040, 1.3], [CUE.loop - 0.2, 610, 1040, 1.3], [DUR, 600, 1080, 1.28]]); cam(cx, cy, z);
    scene(t, ex(t, [[0, { ...TOMD, lid: 0.5, smirk: 0.8 }], [CUE.sub, { lid: 0.45, lk: [0, 0.2], paw: 1, pawX: 175, pawY: 110, smirk: 0.8 }], [CUE.loop - 0.3, TCOLD]]),
      ex(t, [[0, { mood: 'dread', smile: 0, brow: 0.8, lk: [0.8, -0.2], arms: UP }], [CUE.loop, { ...COLD, arms: HOLD }]])); pop();
    if (t > CUE.sub && t < CUE.loop) { push(540, 300, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 11970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 430, 1, 0.02); ransom('КТО ВЕРИТ ПАЧКЕ', 0, 0, 80, 11971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
