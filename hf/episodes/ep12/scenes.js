/* Эп. 12 «Радиевые часы — заговор?» — сцены. Общие помощники в engine2/common.js. */
const CUE = {
  watch: Wd('n01', 3), glow: Wd('n01', 14), radium: Wd('t01', 1), bowl: Wd('t01', 9), paintW: Wd('n02', 6),
  rad: Wd('t02', 0), y17: Wd('t02', 2), lips: Wd('t02', 14), lick: Wd('t02', 15), dip: Wd('t02', 16), paint: Wd('t02', 17),
  knew: Wd('t03', 0), chemI: Wd('t03', 1), girls: Wd('t03', 13), safe: Wd('t03', 15), useful: Wd('t03', 17),
  healthW: Wd('t04', 4), paste: Wd('t04', 6), cream: Wd('t04', 9), water: Wd('t04', 11), smile: Wd('n05', 3),
  teeth: Wd('t05', 4), jaw: Wd('t05', 7), molly: Wd('t05', 8), diag: Wd('t05', 16), lie: Wd('n06', 3),
  worse: Wd('t06', 0), prof: Wd('t06', 3), proved: Wd('t06', 9), other: Wd('t06', 16), allOk: Wd('t06', 18),
  consp: Wd('n07', 3), five: Wd('t07', 2), months: Wd('t07', 10), ten: Wd('t07', 14), rights: Wd('t07', 17), mine: Wd('n08', 2), nails: Wd('t04', 18), bodry: Wd('t06', 20),
  hundred: Wd('t08', 4), thousand: Wd('t08', 10), s1: Wd('t09', 1), s2: Wd('t09', 3), inside: Wd('t09', 10), s3: Wd('t09', 15), pillow: Wd('n10', 5), night: Wd('n10', 7),
  mat: Wd('t10', 0), k1: Wd('t10', 1), k3: Wd('t10', 3), sub: Wd('t11', 0), loop: LN.t11.end + 0.3
};
const SHAKES = [[CUE.radium, 0.25, 8], [CUE.lips, 0.25, 8], [CUE.safe, 0.25, 8], [CUE.diag, 0.3, 10], [CUE.allOk + 0.3, 0.3, 10], [CUE.ten, 0.25, 8], [CUE.thousand, 0.3, 10], [CUE.mat, 0.5, 16], [CUE.k3, 0.3, 10]];
const EP = { title: ['СВЕТЯТ', '100 ЛЕТ?'], cens: { '…Блять.': '…БЛ*ТЬ.' },
  hot: /^(барахолке|сто|светятся|радием|радий|радиевая|миской|семнадцатом|губами|лизнуть|макнуть|покрасить|знали|щипцами|свинцовыми|безвредно|полезно|здоровье|зубной|зубы|челюсть|молли|двадцать|сифилис|враньё|гарвард|радий|другой|здоровы|заговор|пять|месяцы|десять|тысяч|долларов|ерунда|тысячу|шестьсот|ночник|кожаный)/i,
  hideMat: [['t10', '…Блять', CUE.mat]] };
const GRADE = { sat: 1.35, con: 1.07, bri: 1.03 };                       // сочнее (просьба владельца, 11.2026)
const TOMP = { x: 820, y: 745, s: 0.62 }, NIKP = { x: 380, y: 1077, s: 0.95 };
const TOMD = { lid: 0.55, lk: [-0.8, 0.1], smirk: 0.2 };
const HOLD = { l: [-150, 300, 'open'], r: [190, 110, 'fist'] };            // часы в кулаке у груди
const LOOK = { l: [-150, 300, 'open'], r: [160, -40, 'fist'] };            // часы у лица: любуется
const UP = { l: [-150, 300, 'open'], r: [150, -230, 'fist'] };             // часы над головой: «понял!»
const handW = a => [NIKP.x + a[0] * NIKP.s, NIKP.y + a[1] * NIKP.s];

function scene(t, tomO, nikO, o = {}) {
  nightRoom(t, o);
  if (tomO) layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, m: tk.m, bob: tk.bob, ...tomO }); }, { sx: 7, sy: 8, sb: 12 });
  if (nikO) layer(() => { const tk = talk('nikita', t), n = { legs: 'stand', arms: HOLD, ...nikO }; nikita({ ...NIKP, t, m: tk.m, bob: tk.bob, ...n });
    if (n.watch !== false) { const [hx, hy] = handW(n.arms.r); watchP(hx + 4, hy - 30, n.wS ?? 0.42, n.wR ?? 0.2, { t }); } }, { sx: 7, sy: 8, sb: 12 });
  nightLight(t);
}
const NCL = (z = 2.0, sh = 0) => cam(NIKP.x + 40, NIKP.y + 20, z, 0, sh);
const TCL = (z = 2.2, sh = 0) => cam(TOMP.x - 20, TOMP.y + 80, z, 0, sh);
const COLD = { mood: 'dumb', smile: 1, brow: 0.8, lk: [0.6, -0.4], arms: LOOK, wS: 0.5 };
const TCOLD = { lid: 0.7, lk: [-0.9, 0.1], smirk: 0, brow: -0.2 };

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA'], [LN.n02.start - 0.05, 'nikA'], [LN.t02.start - 0.05, 'tomB'], [CUE.y17 - 0.05, 'paint'],
  [LN.n03.start - 0.05, 'nikB'], [LN.t03.start - 0.05, 'tomC'], [CUE.chemI - 0.05, 'chem'], [LN.n04.start - 0.05, 'nikC'], [LN.t04.start - 0.05, 'ads'],
  [LN.n05.start - 0.05, 'nikD'], [LN.t05.start - 0.05, 'tomD'], [CUE.molly - 0.05, 'molly'], [LN.n06.start - 0.05, 'nikE'], [LN.t06.start - 0.05, 'tomE'],
  [CUE.prof - 0.05, 'report'], [CUE.bodry - 0.05, 'tomR'], [LN.n07.start - 0.05, 'nikF'], [LN.t07.start - 0.05, 'tomF'], [CUE.five - 0.05, 'court'], [LN.n08.start - 0.05, 'nikG'], [LN.n08.end + 0.05, 'stareT'],
  [LN.t08.start - 0.05, 'tomG'], [CUE.hundred - 0.05, 'half'], [LN.n09.start - 0.05, 'nikI'], [LN.t09.start - 0.05, 'safety'], [LN.n10.start - 0.05, 'nikH'], [LN.n10.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'],
  [CUE.k1 - 0.05, 'wideM'], [LN.t10.start - 0.08, 'final']];

const SH = {
  cold(t) { const [cx, cy, z] = ck(t, [[0, 590, 1080, 1.28], [CUE.glow, 540, 1000, 1.7]]); cam(cx, cy, z);
    scene(t, TCOLD, ex(t, [[0, COLD], [CUE.glow - 0.2, { ...COLD, smile: 1, brow: 1, lk: [0.4, -0.6] }]])); pop(); },
  tomA(t) { TCL(t > CUE.radium ? 2.5 : 2.25, shakeAt(t)); scene(t, ex(t, [[0, { ...TCOLD, lk: [-0.6, 0.2], lid: 0.4, brow: 0.2 }], [CUE.radium, { lid: 0.3, lk: [-0.9, 0.2], smirk: 0, brow: 0.5, mood: 'shock' }], [CUE.bowl, { lid: 0.6, lk: [-0.3, 0.6], smirk: 0.3, brow: -0.4 }]]), { mood: 'shock' }); pop(); },
  nikA(t) { NCL(); scene(t, TOMD, { mood: 'dumb', smile: 0.6, brow: 0.5, lk: [0.9, -0.2], arms: LOOK, wS: 0.5 }); pop(); },
  tomB(t) { TCL(2.2); scene(t, { ...TOMD, paw: 1, pawX: 175, pawY: 110 }, { mood: 'dumb' }); pop(); },
  paint(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => paintIns(t, CUE)); pop(); },
  nikB(t) { NCL(2.05, 3); scene(t, TOMD, { mood: 'shock', brow: 1, lk: [0.9, -0.3] }); pop(); },
  tomC(t) { TCL(2.4); scene(t, { lid: 0.5, lk: [-0.9, 0], smirk: 0, brow: -0.5 }, { mood: 'shock' }); pop(); },
  chem(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => chemIns(t, CUE)); pop(); },
  nikC(t) { NCL(2.3, 5); scene(t, TOMD, { mood: 'shock', brow: 1, lk: [0.9, -0.2] }); pop(); },
  ads(t, u) { cam(540, 960, 1); slideIn(u, () => adsIns(t, CUE)); pop(); },
  nikD(t) { cam(520, 1020, 1.45); scene(t, { ...TOMD, lid: 0.7, smirk: 0 }, { mood: 'dumb', smile: 1, brow: 1, lk: [0.4, -0.5], arms: LOOK, wS: 0.5 }); pop(); },
  tomD(t) { const z = lerp(2.2, 2.6, sm(pr(t, LN.t05.start, CUE.molly))); TCL(z); scene(t, { lid: 0.62, lk: [-0.3, 0.3], smirk: 0, brow: 0.3 }, { mood: 'dread' }); pop(); },
  molly(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => mollyIns(t, CUE)); pop(); },
  nikE(t) { NCL(2.1, 4); scene(t, TOMD, { mood: 'angry', brow: 1, lk: [0.9, -0.2] }); pop(); },
  tomE(t) { TCL(2.35); scene(t, { lid: 0.45, lk: [-0.9, 0], smirk: 0.4, brow: -0.5 }, { mood: 'angry' }); pop(); },
  report(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => reportIns(t, CUE)); pop(); },
  nikF(t) { cam(520, 1040, 1.45, 0, 4); scene(t, { ...TOMD, lid: 0.5 }, { mood: 'angry', brow: 1, lk: [0.8, -0.3], arms: { l: [-150, 300, 'open'], r: [190, 110, 'fist'] } }); pop(); },
  tomF(t) { TCL(2.45); scene(t, { lid: 0.5, lk: [-0.9, 0.1], smirk: 0, brow: -0.3 }, { mood: 'angry' }); pop(); },
  court(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => courtIns(t, CUE)); pop(); },
  nikG(t) { cam(NIKP.x + 120, NIKP.y - 30, 2.3); scene(t, TOMD, { mood: 'dread', brow: 1, lk: [0.6, 0.2], arms: LOOK, wS: 0.5 }); pop(); },
  tomG(t) { TCL(2.3); scene(t, { lid: 0.55, lk: [-0.9, 0.1], smirk: 0.5, brow: -0.2 }, { mood: 'dread', arms: LOOK }); pop(); },
  half(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => halfIns(t, CUE)); pop(); },
  nikH(t) { cam(480, 1000, 1.5); scene(t, ex(t, [[0, TOMD], [CUE.pillow, { lid: 0.3, lk: [-0.9, -0.3], smirk: 0, brow: 0.4 }]]),
      { mood: 'dumb', smile: 1, brow: 1, lk: [0.4, -0.6], arms: t > LN.n10.start + 0.3 ? UP : HOLD }); pop(); },
  stareT(t) { const z = lerp(2.3, 2.6, sm(pr(t, LN.n08.end, LN.t08.start + 0.5))); TCL(z); scene(t, { lid: 0.75, lk: [-0.5, 0.2], smirk: 0, brow: -0.3 }, { mood: 'dread', arms: LOOK }); pop(); },
  tomR(t) { TCL(2.45); scene(t, { lid: 0.4, lk: [0.1, 0.3], smirk: 0.9, brow: 0.2 }, { mood: 'angry' }); pop(); },
  nikI(t) { NCL(2.2, 3); scene(t, TOMD, { mood: 'dread', brow: 1, lk: [0.6, 0.2], arms: LOOK, wS: 0.5 }); pop(); },
  safety(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => safetyIns(t, CUE)); pop(); },
  stare(t) { TCL(2.3); scene(t, { lid: 0.62, lk: [-0.2, 0.1], smirk: 0, brow: -0.2 }, { mood: 'dumb', smile: 1, arms: UP }); pop(); },
  mat(t) { TCL(2.5, shakeAt(t)); scene(t, { lid: 0.88, lk: [0, 0.3], brow: -0.8, smirk: 0 }, { mood: 'dumb', smile: 1, arms: UP }); pop();
    if (t > CUE.mat) { push(540, 330, 1, -0.04); ransom('БЛ*ТЬ', 0, 0, 170, 12960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  wideM(t) { cam(610, 1040, 1.3, 0, shakeAt(t)); scene(t, { lid: 0.7, lk: [-0.8, 0.1], brow: -0.6, mood: t > CUE.k3 ? 'strain' : undefined }, { mood: 'dumb', smile: 0.9, brow: 0.8, lk: [0.8, -0.2], arms: UP }); pop();
    if (t > CUE.k1) { push(540, 330, 1, 0.03); ransom('1600 ЛЕТ', 0, 0, 140, 12965, { reveal: pr(t, CUE.k1, CUE.k3 + 0.2), pop: true }); pop(); } },
  final(t) { const [cx, cy, z] = ck(t, [[0, 600, 1040, 1.3], [CUE.loop - 0.2, 600, 1040, 1.3], [DUR, 590, 1080, 1.28]]); cam(cx, cy, z);
    scene(t, ex(t, [[0, { ...TOMD, lid: 0.5, smirk: 0.8 }], [CUE.sub, { lid: 0.45, lk: [0, 0.2], paw: 1, pawX: 175, pawY: 110, smirk: 0.8 }], [CUE.loop - 0.3, TCOLD]]),
      ex(t, [[0, { mood: 'dread', smile: 0, brow: 0.8, lk: [0.8, -0.2], arms: UP }], [CUE.loop, COLD]])); pop();
    if (t > CUE.sub && t < CUE.loop) { push(540, 300, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 12970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 430, 1, 0.02); ransom('КТО ХОДИТ НА БАРАХОЛКУ', 0, 0, 66, 12971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
