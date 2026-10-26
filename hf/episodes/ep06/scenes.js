/* Эп. 6 «Кот тобой манипулирует?» — сцены. Общие помощники в engine2/common.js. */
const CUE = {
  five: Wd('n01', 1), hz1: Wd('t01', 4), study: Wd('t02', 8), hz: Wd('t02', 18), baby: Wd('t03', 3), fifty: Wd('t03', 5), urgent: Wd('t03', 13),
  adults: Wd('t04', 1), meow: Wd('t04', 8), teach: Wd('t05', 5), love: Wd('t06', 0), mat: Wd('t06', 2), sub: Wd('t07', 0), loop: LN.t07.end + 0.3
};
const SHAKES = [[CUE.mat, 0.5, 14], [CUE.hz, 0.3, 8], [CUE.urgent, 0.25, 8]];
const EP = { title: ['КОТ ТОБОЙ', 'УПРАВЛЯЕТ?'], cens: { 'блять.': 'Б*ЯТЬ.' },
  hot: /^(пять|корм|триста|восемьдесят|герц|мурчание|трёхсот|восьмидесяти|младенца|пятьдесят|срочным|мяукают|мяу|людей|учишь|любишь|люблю|кожаный)/i,
  hideMat: [['t06', 'блять', CUE.mat]] };
const TOMP = { x: 860, y: 1051, s: 0.62 }, NIKP = { x: 300, y: 1050, s: 0.95 };
const TOMD = { lid: 0.5, lk: [-0.8, 0.1], smirk: 0.6 };
const POUR = { mood: 'sleepy', lid: 0.75, lk: [0.4, 0.6], arms: { l: [-150, 300, 'open'], r: [160, 250, 'fist'] }, bag: 1 };
const handW = a => [NIKP.x + a[0] * NIKP.s, NIKP.y + a[1] * NIKP.s];

function scene(t, tomO, nikO, o = {}) {
  bedroom(t, { food: o.food ?? 0.6 });
  if (tomO) layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, m: tk.m, bob: tk.bob, ...tomO }); }, { sx: 7, sy: 8, sb: 12 });
  if (nikO) layer(() => { const tk = talk('nikita', t), n = { legs: 'stand', ...nikO }; nikita({ ...NIKP, t, m: tk.m, bob: tk.bob, ...n });
    if (n.bag) { const [hx, hy] = handW(n.arms.r); foodBag(hx + 10, hy + 30, 0.85, n.bag === 1 ? 2.3 : 0.2);
      if (n.bag === 1) for (let i = 0; i < 6; i++) { const ph = (t * 1.6 + i / 6) % 1; ellP(hx + 40 + i * 3, hy + 60 + ph * 240, 9, 7, '#a8743e', { seed: 6500 + i, lw: 1, np: 10, tex: false }); } } }, { sx: 7, sy: 8, sb: 12 });
  if (o.extra) o.extra();
  dawnLight(() => { if (o.eyes) [-1, 1].forEach(sd => radial(TOMP.x + sd * 55 * TOMP.s, TOMP.y - 16, 80, 'rgba(200,255,120,1)', 0.6)); });
}

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA'], [LN.n02.start - 0.05, 'nikA'], [LN.t02.start - 0.05, 'tomB'], [CUE.study - 0.05, 'spectro'], [LN.t03.start - 0.05, 'cry'],
  [LN.n03.start - 0.05, 'nikB'], [LN.t04.start - 0.05, 'tomC'], [CUE.adults - 0.05, 'meow'], [LN.t05.start - 0.05, 'loop'], [LN.n04.start - 0.05, 'nikC'],
  [LN.n04.end + 0.06, 'stare'], [CUE.love - 0.05, 'mat'], [LN.t07.start - 0.08, 'final']];

const SH = {
  cold(t) { const [cx, cy, z] = ck(t, [[0, 420, 1180, 1.8], [CUE.five, 420, 1160, 1.7]]); cam(cx, cy, z); scene(t, null, POUR, { food: 0.3 + t * 0.1 }); pop(); },
  tomA(t) { cam(860, 1120, t > CUE.hz1 ? 2.4 : 2.2); scene(t, ex(t, [[0, { ...TOMD }], [CUE.hz1, { lid: 0.35, smirk: 1, lk: [-0.9, -0.2] }]]), POUR, { eyes: t > CUE.hz1 }); pop(); },
  nikA(t) { cam(330, 1110, 2.0, 0, 3); scene(t, TOMD, { mood: 'shock', brow: 0.9, lk: [0.9, 0], arms: { l: [-150, 300, 'open'], r: [160, 120, 'fist'] }, bag: 2 }); pop(); },
  tomB(t) { cam(860, 1120, 2.2); scene(t, { ...TOMD, paw: 1, pawX: 175, pawY: 110, smirk: 0.4 }, { mood: 'dumb' }); pop(); },
  spectro(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => spectro(t, CUE)); pop(); },
  cry(t, u) { cam(540, 960, t > CUE.fifty ? 1.04 : 1, 0, shakeAt(t)); slideIn(u, () => cryInsert(t, CUE)); pop(); },
  nikB(t) { cam(330, 1110, 2.1, 0, 4); scene(t, TOMD, { mood: 'shock', brow: 1, lk: [0.9, -0.2], arms: { l: [-120, 40, 'open'], r: [160, 120, 'fist'] }, bag: 2 }); pop(); },
  tomC(t) { cam(860, 1120, 2.4); scene(t, { lid: 0.4, smirk: 1, lk: [0, 0.2], brow: 0.3 }, { mood: 'shock' }, { eyes: true }); pop(); },
  meow(t, u) { cam(540, 960, 1); slideIn(u, () => meowChart(t, CUE)); pop(); },
  loop(t, u) { cam(540, 960, 1); slideIn(u, () => loopInsert(t, CUE)); pop(); },
  nikC(t) { cam(330, 1110, 2.0); scene(t, TOMD, { mood: 'dread', brow: 0.9, lk: [0.9, 0.3], arms: { l: [-150, 300, 'open'], r: [160, 250, 'fist'] }, bag: 2 }); pop(); },
  stare(t) { cam(860, 1110, 2.3); scene(t, { lid: 0.6, lk: [-0.3, 0.2], smirk: 0, brow: 0.2 }, { mood: 'dread' }); pop(); },   // тишина и неподвижность
  mat(t) { const m = t > CUE.mat - 0.3; cam(860, 1110, m ? 2.5 : 2.3, 0, shakeAt(t)); scene(t, m ? { lid: 0.85, lk: [0, 0.3], brow: -0.7, smirk: 0 } : { mood: 'bliss', lid: 0.9, smirk: 0.3 }, { mood: 'dread' }); pop();
    if (t > CUE.mat) { push(540, 330, 1, -0.04); ransom('НАСЫПАЙ, Б*ЯТЬ', 0, 0, 104, 6600, { reveal: pr(t, CUE.mat, CUE.mat + 0.25), pop: true }); pop(); } },
  final(t) { cam(600, 1140, 1.3); scene(t, ex(t, [[0, { ...TOMD, mood: 'bliss', lid: 0.9 }], [CUE.sub, { lid: 0.45, lk: [0, 0.2], paw: 1, pawX: 175, pawY: 110, smirk: 0.8 }], [CUE.loop - 0.3, { paw: 0, lk: [-0.8, 0.1] }]]), POUR, { food: 0.9 }); pop();
    if (t > CUE.sub) { push(540, 300, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 6620, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 430, 1, 0.02); ransom('КТО ВСТАЁТ В 5 УТРА', 0, 0, 78, 6621, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
