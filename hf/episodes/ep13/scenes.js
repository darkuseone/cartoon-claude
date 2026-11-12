/* Эп. 13 «Тефлоновый заговор?» — сцены. Общие помощники в engine2/common.js. */
const CUE = {
  pan: Wd('n01', 1), teeth: Wd('n01', 5), calves: Wd('t01', 3), cutlet: Wd('t01', 13), chemW: Wd('n02', 6),
  subst: Wd('t02', 6), c8: Wd('t02', 11), plant: Wd('t02', 12), river: Wd('t02', 20), dump: Wd('t02', 24),
  cows: Wd('t03', 5), fluor: Wd('t03', 13), ban: Wd('n04', 7),
  knew: Wd('t04', 8), secretI: Wd('t04', 9), secret: Wd('t04', 10), preg: Wd('t04', 13), fetus: Wd('t04', 18), told: Wd('t04', 19),
  fined: Wd('t05', 0), fineI: Wd('t05', 1), mln: Wd('t05', 3), park: Wd('t05', 13),
  people: Wd('t06', 1), six: Wd('t06', 12), kidney: Wd('t06', 15), result: Wd('t06', 17), paid: Wd('t06', 21),
  bloodI: Wd('t07', 0), free: Wd('t07', 6), heat: Wd('t07', 10), parrot: Wd('t07', 15), me: Wd('t07', 16), but2: Wd('t07', 18), blood: Wd('t07', 23), water: Wd('t07', 28), river2: Wd('n08', 7),
  mat: Wd('t08', 0), there: Wd('t08', 3), sub: Wd('t09', 0), loop: LN.t09.end + 0.3
};
const SHAKES = [[CUE.calves, 0.25, 8], [CUE.c8, 0.25, 8], [CUE.cows, 0.25, 8], [CUE.told, 0.3, 10], [CUE.mln, 0.25, 8], [CUE.paid, 0.3, 10], [CUE.water, 0.3, 10], [CUE.mat, 0.5, 16], [CUE.there, 0.3, 10]];
const EP = { title: ['ТЕФЛОН', 'ТРАВИТ?'], cens: { '…Ёб': '…Ё*' },
  hot: /^(сковородку|тефлона|тефлон|зубы|чернеют|выпадают|телят|котлета|химия|си-восемь|dupont|реку|свалке|сто|пятьдесят|три|фтора|знали|восемьдесят|беременных|плоду|властям|сообщили|оштрафовали|шестнадцать|миллионов|долларов|парковку|шестьдесят|девять|тысяч|шестью|рак|почки|шестьсот|семьдесят|миллион|пятнадцатого|крови|всех|американцев|воды|речки|натуральная|сливали|кожаный)/i,
  hideMat: [['t08', '…Ёб', CUE.mat]] };
const GRADE = { sat: 1.35, con: 1.07, bri: 1.03 };                       // сочнее (просьба владельца, 11.2026)
const TOMP = { x: 820, y: 761, s: 0.62 }, NIKP = { x: 380, y: 1077, s: 0.95 };
const TOMD = { lid: 0.55, lk: [-0.8, 0.1], smirk: 0.2 };
const HOLD = { l: [-150, 300, 'open'], r: [190, 110, 'fist'] };            // сковородка в правой руке
const SHOW = { l: [-150, 300, 'open'], r: [180, -20, 'fist'] };            // сковородку показывает Тому
const UP = { l: [-150, 300, 'open'], r: [150, -230, 'fist'] };             // «понял!»
const handW = a => [NIKP.x + a[0] * NIKP.s, NIKP.y + a[1] * NIKP.s];

function scene(t, tomO, nikO, o = {}) {
  kitchen(t, o);
  if (tomO) layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, m: tk.m, bob: tk.bob, ...tomO }); }, { sx: 7, sy: 8, sb: 12 });
  if (nikO) layer(() => { const tk = talk('nikita', t), n = { legs: 'stand', arms: HOLD, ...nikO }; nikita({ ...NIKP, t, m: tk.m, bob: tk.bob, ...n });
    if (n.pan !== false) { const [hx, hy] = handW(n.arms.r); panP(hx + 150 * (n.pS ?? 0.6), hy + 6, n.pS ?? 0.6, n.pR ?? 0, { cutlet: n.cutlet }); } }, { sx: 7, sy: 8, sb: 12 });
  sunsetLight(t);
}
const NCL = (z = 2.0, sh = 0) => cam(NIKP.x + 60, NIKP.y + 20, z, 0, sh);
const TCL = (z = 2.2, sh = 0) => cam(TOMP.x - 20, TOMP.y + 80, z, 0, sh);
const COLD = { mood: 'eww', brow: 0.8, lk: [0.6, -0.3], arms: SHOW };
const TCOLD = { lid: 0.5, lk: [-0.6, 0.4], smirk: 0.3, brow: -0.2 };      // Том смотрит на котлету

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA'], [LN.n02.start - 0.05, 'nikA'], [LN.t02.start - 0.05, 'tomB'], [CUE.c8 - 0.3, 'c8'],
  [LN.n03.start - 0.05, 'nikB'], [LN.t03.start - 0.05, 'cow'], [LN.n04.start - 0.05, 'nikC'], [LN.t04.start - 0.05, 'tomC'], [CUE.secretI - 0.05, 'secret'],
  [LN.n05.start - 0.05, 'nikD'], [LN.t05.start - 0.05, 'tomD'], [CUE.fineI - 0.05, 'fine'], [LN.n06.start - 0.05, 'nikE'], [LN.t06.start - 0.05, 'tomE'],
  [CUE.people - 0.05, 'panel'], [CUE.result - 0.05, 'paidW'], [LN.n07.start - 0.05, 'nikF'], [LN.n07.end + 0.05, 'stareT'], [LN.t07.start - 0.05, 'blood'], [CUE.me - 0.05, 'tomP'], [CUE.but2 - 0.05, 'blood'],
  [LN.n08.start - 0.05, 'nikH'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.there - 0.05, 'wideM'], [LN.t09.start - 0.08, 'final']];

const SH = {
  cold(t) { const [cx, cy, z] = ck(t, [[0, 550, 1080, 1.28], [CUE.teeth, 540, 1060, 1.5]]); cam(cx, cy, z);
    scene(t, TCOLD, ex(t, [[0, COLD], [CUE.teeth - 0.2, { ...COLD, mood: 'dread', brow: 1 }]])); pop(); },
  tomA(t) { TCL(t > CUE.calves ? 2.45 : 2.25, shakeAt(t)); scene(t, ex(t, [[0, { lid: 0.5, lk: [-0.8, 0.1], smirk: 0, brow: -0.3 }], [CUE.cutlet - 0.5, { lid: 0.3, lk: [-0.6, 0.6], smirk: 0.6, brow: 0.3, mood: 'bliss' }]]), { mood: 'shock', arms: SHOW }); pop(); },
  nikA(t) { NCL(); scene(t, TOMD, { mood: 'angry', brow: 0.6, lk: [0.9, -0.2], arms: SHOW, pS: 0.7 }); pop(); },
  tomB(t) { TCL(2.2); scene(t, { ...TOMD, paw: 1, pawX: 175, pawY: 110 }, { mood: 'dumb' }); pop(); },
  c8(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => c8Ins(t, CUE)); pop(); },
  nikB(t) { NCL(2.05); scene(t, TOMD, { mood: 'dumb', brow: 0.7, lk: [0.9, -0.3] }); pop(); },
  cow(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => cowIns(t, CUE)); pop(); },
  nikC(t) { NCL(2.1, 3); scene(t, TOMD, { mood: 'angry', brow: 0.6, lk: [0.9, -0.2], arms: SHOW, pS: 0.7 }); pop(); },
  tomC(t) { TCL(2.4); scene(t, { lid: 0.45, lk: [-0.9, 0], smirk: 0, brow: -0.5 }, { mood: 'angry' }); pop(); },
  secret(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => secretIns(t, CUE)); pop(); },
  nikD(t) { NCL(2.3, 5); scene(t, TOMD, { mood: 'angry', brow: 1, lk: [0.9, -0.2], arms: UP }); pop(); },
  tomD(t) { TCL(2.3); scene(t, { lid: 0.5, lk: [-0.9, 0.1], smirk: 0.6, brow: -0.2 }, { mood: 'angry' }); pop(); },
  fine(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => fineIns(t, CUE)); pop(); },
  nikE(t) { NCL(2.2, 4); scene(t, TOMD, { mood: 'shock', brow: 1, lk: [0.9, -0.2] }); pop(); },
  tomE(t) { TCL(2.4); scene(t, { lid: 0.55, lk: [-0.9, 0], smirk: 0, brow: -0.4 }, { mood: 'shock' }); pop(); },
  panel(t, u) { cam(540, 960, lerp(1, 1.06, pr(t, CUE.people, CUE.result))); slideIn(u, () => panelIns(t, CUE)); pop(); },
  paidW(t) { cam(600, 1060, 1.35, 0, shakeAt(t)); scene(t, { ...TOMD, lid: 0.5, smirk: 0.3 }, { mood: 'shock', brow: 1, lk: [0.8, -0.3] }); pop();
    if (t > CUE.paid) { push(540, 330, 1, -0.03); ransom('$671 000 000', 0, 0, 78, 13900, { reveal: pr(t, CUE.paid, CUE.paid + 0.4), pop: true }); pop(); label(540, 450, 'DuPont заплатила по искам, 2017', 0, '#f4e6a8', 0.02, 32); } },
  nikF(t) { cam(NIKP.x + 160, NIKP.y + 40, 2.1); scene(t, TOMD, { mood: 'dread', brow: 1, lk: [0.7, 0.3], arms: SHOW, pS: 0.75 }); pop(); },
  stareT(t) { const z = lerp(2.3, 2.6, sm(pr(t, LN.n07.end, LN.t07.start + 0.4))); TCL(z); scene(t, { lid: 0.75, lk: [-0.5, 0.2], smirk: 0, brow: -0.3 }, { mood: 'dread', arms: SHOW, pS: 0.75 }); pop(); },
  tomP(t) { TCL(2.5); scene(t, { mood: 'bliss', lid: 0.3, lk: [0.2, -0.4], smirk: 1, brow: 0.3 }, { mood: 'dread' }); pop(); },
  blood(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => bloodIns(t, CUE)); pop(); },
  nikH(t) { cam(480, 1000, 1.5); scene(t, ex(t, [[0, TOMD], [CUE.river2, { lid: 0.3, lk: [-0.9, -0.3], smirk: 0, brow: 0.4 }]]),
      { mood: 'dumb', smile: 1, brow: 1, lk: [0.4, -0.6], arms: t > LN.n08.start + 0.3 ? UP : HOLD }); pop(); },
  stare(t) { TCL(2.3); scene(t, { lid: 0.62, lk: [-0.2, 0.1], smirk: 0, brow: -0.2 }, { mood: 'dumb', smile: 1, arms: UP }); pop(); },
  mat(t) { TCL(2.5, shakeAt(t)); scene(t, { lid: 0.88, lk: [0, 0.3], brow: -0.8, smirk: 0 }, { mood: 'dumb', smile: 1, arms: UP }); pop();
    if (t > CUE.mat) { push(540, 330, 1, -0.04); ransom('Ё* ТВОЮ МАТЬ', 0, 0, 120, 13960, { reveal: pr(t, CUE.mat, CUE.mat + 0.5), pop: true }); pop(); } },
  wideM(t) { cam(610, 1040, 1.3, 0, shakeAt(t)); scene(t, { lid: 0.7, lk: [-0.8, 0.1], brow: -0.6, mood: 'strain' }, { mood: 'dumb', smile: 0.9, brow: 0.8, lk: [0.8, -0.2], arms: UP }); pop();
    if (t > CUE.there) { push(540, 330, 1, 0.03); ransom('ТУДА И СЛИВАЛИ', 0, 0, 86, 13965, { reveal: pr(t, CUE.there, CUE.there + 0.4), pop: true }); pop(); } },
  final(t) { const [cx, cy, z] = ck(t, [[0, 570, 1040, 1.3], [CUE.loop - 0.2, 570, 1040, 1.3], [DUR, 550, 1080, 1.28]]); cam(cx, cy, z);
    scene(t, ex(t, [[0, { ...TOMD, lid: 0.5, smirk: 0.8 }], [CUE.sub, { lid: 0.45, lk: [0, 0.2], paw: 1, pawX: 175, pawY: 110, smirk: 0.8 }], [CUE.loop - 0.3, TCOLD]]),
      ex(t, [[0, { mood: 'dread', smile: 0, brow: 0.8, lk: [0.8, -0.2], arms: UP }], [CUE.loop, COLD]])); pop();
    if (t > CUE.sub && t < CUE.loop) { push(540, 300, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 13970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 430, 1, 0.02); ransom('КТО БОИТСЯ СКОВОРОДОК', 0, 0, 66, 13971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
