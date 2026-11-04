/* Эп. 10 «Цена 99 — развод?» — сцены. Общие помощники в engine2/common.js. */
const CUE = {
  zero: Wd('n01', 11), caught: Wd('t01', 9), brainI: Wd('t02', 3), left: Wd('t02', 6), two: Wd('t02', 13), three: Wd('t02', 15),
  dressI: Wd('t03', 1), p34: Wd('t03', 5), p39: Wd('t03', 9), third: Wd('t03', 15), skid: Wd('t04', 2), none: Wd('t04', 6),
  cars: Wd('t05', 2), m22: Wd('t05', 4), km: Wd('t05', 8), price: Wd('t05', 16), mile: Wd('t05', 20),
  tip1: Wd('t06', 0), tip2: Wd('t06', 8), tag39: Wd('n07', 5), mat: Wd('t07', 1), more: Wd('t07', 5), sub: Wd('t08', 0), loop: LN.t08.end + 0.3
};
const SHAKES = [[CUE.caught, 0.3, 8], [CUE.third, 0.25, 8], [CUE.none, 0.25, 8], [CUE.price, 0.25, 8], [CUE.mat, 0.5, 16]];
const EP = { title: ['ЦЕНА 99 —', 'РАЗВОД?'], cens: { 'наебали': 'НАЕ*АЛИ' },
  hot: /^(центу|цент|экономил|ноль|поймали|слева|девяносто|девять|два|три|тридцати|девяти|треть|чаще|дороже|скидка|скидки|двадцать|миллиона|восьмидесяти|миль|двести|долларов|округляй|десять|килограмм|тридцать|кожаный|бесплатно)/i,
  hideMat: [['t07', 'наебали', CUE.mat]] };
const TOMP = { x: 820, y: 941, s: 0.62 }, NIKP = { x: 330, y: 1077, s: 0.95 };
const TOMD = { lid: 0.55, lk: [-0.8, -0.1], smirk: 0.2 };
const HOLD = { l: [-190, 40, 'open'], r: [190, 110, 'fist'] };            // левая — пустой кошелёк, правая — чек
const handW = a => [NIKP.x + a[0] * NIKP.s, NIKP.y + a[1] * NIKP.s];

function scene(t, tomO, nikO) {
  supermarket(t);
  if (tomO) layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, m: tk.m, bob: tk.bob, ...tomO }); }, { sx: 7, sy: 8, sb: 12 });
  if (nikO) layer(() => { const tk = talk('nikita', t), n = { legs: 'stand', arms: HOLD, ...nikO }; nikita({ ...NIKP, t, m: tk.m, bob: tk.bob, ...n });
    if (n.receipt !== false) { const [hx, hy] = handW(n.arms.r); receiptP(hx, hy, t); }
    if (n.wallet !== false && n.arms.l[2] === 'open') { const [wx, wy] = handW(n.arms.l); walletP(wx, wy + 10, 0.8, t); }
    if (n.tag) { const [hx, hy] = handW(n.arms.l); priceTag(hx, hy - 70, 0.6 * (n.tagK ?? 1), -0.08, '$39', '', { big: 96, seed: 10950 }); }
    if (n.moth != null && n.moth > 0) { const k = n.moth, [wx, wy] = handW(HOLD.l); mothP(wx + 10 + 90 * k + 18 * Math.sin(t * 9), wy - 40 - 640 * k, 1.1, t); } }, { sx: 7, sy: 8, sb: 12 });
  storeLight();
}
const NCL = (z = 2.0, sh = 0) => cam(NIKP.x + 10, NIKP.y + 70, z, 0, sh);
const TCL = (z = 2.2, sh = 0) => cam(TOMP.x, TOMP.y + 80, z, 0, sh);
const COLD = { mood: 'angry', brow: 0.6, lk: [0.3, -0.2], smile: 0 };

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA'], [LN.n02.start - 0.05, 'nikA'], [LN.t02.start - 0.05, 'tomB'], [CUE.brainI - 0.05, 'left'],
  [LN.n03.start - 0.05, 'nikB'], [CUE.dressI - 0.05, 'dress'], [LN.n04.start - 0.05, 'nikC'], [LN.t04.start - 0.05, 'whisper'], [LN.n05.start - 0.05, 'nikD'],
  [LN.t05.start - 0.05, 'lot'], [CUE.km - 0.05, 'odo'], [CUE.mile - 0.05, 'tomD'], [LN.n06.start - 0.05, 'nikE'], [LN.t06.start - 0.05, 'tips'],
  [LN.n07.start - 0.05, 'nikF'], [LN.n07.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.more - 0.05, 'wideM'], [LN.t08.start - 0.08, 'final']];

const SH = {
  cold(t) { const [cx, cy, z] = ck(t, [[0, 400, 1080, 1.5], [CUE.zero, 410, 1060, 1.58]]); cam(cx, cy, z);
    scene(t, null, { ...ex(t, [[0, COLD], [CUE.zero, { mood: 'shock', brow: 1, lk: [-0.5, -0.8] }]]), moth: pr(t, CUE.zero - 0.1, CUE.zero + 1.4) }); pop(); },
  tomA(t) { TCL(t > CUE.caught ? 2.5 : 2.25, shakeAt(t)); scene(t, ex(t, [[0, { ...TOMD, lid: 0.62 }], [CUE.caught, { lid: 0.45, lk: [-0.9, 0], smirk: 0.6, brow: -0.3 }]]), { mood: 'shock', moth: 1 }); pop(); },
  nikA(t) { NCL(); scene(t, TOMD, { mood: 'dumb', smile: 0.5, brow: 0.4, lk: [0.9, -0.1], moth: 0 }); pop(); },
  tomB(t) { TCL(2.2); scene(t, { ...TOMD, paw: 1, pawX: 175, pawY: 110 }, { mood: 'dumb' }); pop(); },
  left(t, u) { cam(540, 960, 1); slideIn(u, () => leftIns(t, CUE)); pop(); },
  nikB(t) { NCL(2.05); scene(t, TOMD, { mood: 'angry', brow: 0.2, smile: 0.3, lk: [0.9, -0.3], arms: { l: [-190, 40, 'open'], r: [190, 110, 'fist'] } }); pop(); },
  dress(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => dressIns(t, CUE)); pop(); },
  nikC(t) { NCL(2.1, 4); scene(t, TOMD, { mood: 'shock', brow: 1, lk: [0.9, -0.2] }); pop(); },
  whisper(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => whisperIns(t, CUE)); pop(); },
  nikD(t) { NCL(2.0); scene(t, TOMD, { mood: 'dumb', smile: 0.4, brow: 0.6, lk: [0.9, -0.2] }); pop(); },
  lot(t, u) { cam(540, 960, 1); slideIn(u, () => lotIns(t, CUE)); pop(); },
  odo(t) { cam(540, 960, 1, 0, shakeAt(t)); odoIns(t, CUE); pop(); },
  tomD(t) { cam(640, 1080, 1.35); scene(t, { ...TOMD, lid: 0.45, smirk: 0.7 }, { mood: 'dread', lk: [0.7, -0.2] }); pop(); },
  nikE(t) { NCL(2.1, 3); scene(t, TOMD, { mood: 'dread', brow: 1, lk: [0.9, -0.2] }); pop(); },
  tips(t, u) { cam(540, 960, 1); slideIn(u, () => tipsIns(t, CUE)); pop(); },
  nikF(t) { cam(430, 1040, 1.55); scene(t, ex(t, [[0, TOMD], [CUE.tag39, { lid: 0.3, lk: [-0.9, -0.3], smirk: 0 }]]),
      { mood: 'dumb', smile: 1, brow: 1, lk: [0.4, -0.6], wallet: false, tag: t > CUE.tag39 - 0.15, tagK: popK(t, CUE.tag39 - 0.15, 0.3), arms: { l: [-150, -230, 'fist'], r: [190, 110, 'fist'] } }); pop(); },
  stare(t) { TCL(2.3); scene(t, { lid: 0.62, lk: [-0.2, 0.1], smirk: 0, brow: -0.2 }, { mood: 'dumb', smile: 1, wallet: false, tag: true, arms: { l: [-150, -230, 'fist'], r: [190, 110, 'fist'] } }); pop(); },
  mat(t) { TCL(2.5, shakeAt(t)); scene(t, { lid: 0.88, lk: [0, 0.3], brow: -0.8, smirk: 0 }, { mood: 'dumb', smile: 1, wallet: false, tag: true, arms: { l: [-150, -230, 'fist'], r: [190, 110, 'fist'] } }); pop();
    if (t > CUE.mat) { push(540, 330, 1, -0.04); ransom('НАЕ*АЛИ', 0, 0, 150, 10960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  wideM(t) { cam(620, 1080, 1.3); scene(t, { lid: 0.7, lk: [-0.8, 0.1], brow: -0.5 }, { mood: 'dumb', smile: 0.9, brow: 0.8, lk: [0.8, -0.2], wallet: false, tag: true, arms: { l: [-150, -230, 'fist'], r: [190, 110, 'fist'] } }); pop(); },
  final(t) { const [cx, cy, z] = ck(t, [[0, 620, 1080, 1.3], [CUE.loop - 0.2, 620, 1080, 1.3], [DUR, 405, 1065, 1.55]]); cam(cx, cy, z);
    scene(t, ex(t, [[0, { ...TOMD, lid: 0.5, smirk: 0.8 }], [CUE.sub, { lid: 0.45, lk: [0, 0.2], paw: 1, pawX: 175, pawY: 110, smirk: 0.8 }], [CUE.loop - 0.3, { paw: 0, lk: [-0.8, -0.1], smirk: 0.2 }]]),
      ex(t, [[0, { mood: 'dread', smile: 0, brow: 0.8, lk: [0.8, -0.2], wallet: false, tag: true, arms: { l: [-150, -230, 'fist'], r: [190, 110, 'fist'] } }], [CUE.loop, { ...COLD, tag: false, wallet: true, arms: HOLD }]])); pop();
    if (t > CUE.sub && t < CUE.loop) { push(540, 300, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 10970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 430, 1, 0.02); ransom('КТО КЛЮЁТ НА .99', 0, 0, 80, 10971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
