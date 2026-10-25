/* Эп. 5 «Табачный заговор?» — сцены. Общие помощники в engine2/common.js. */
const CUE = {
  cough: Wd('n01', 0), paid: Wd('t01', 4), consp: Wd('n02', 2), y54: Wd('t02', 2), n448: Wd('t02', 7), link: Wd('t02', 11),
  memo: Wd('t03', 3), doubt: Wd('t03', 8), seven: Wd('t04', 3), oath: Wd('t04', 8), nic: Wd('t04', 11),
  y06: Wd('t05', 3), decades: Wd('t05', 7), mafia: Wd('t05', 13), vape: Wd('n05', 3),
  mat: Wd('t06', 0), owner: Wd('t06', 1), bln: Wd('t06', 7), sub: Wd('t07', 0), loop: LN.t07.end + 0.35
};
const SHAKES = [[CUE.cough, 0.4, 8], [CUE.mat, 0.5, 16], [CUE.nic + 0.9, 0.3, 8], [CUE.n448, 0.25, 6]];
const EP = { title: ['ТАБАЧНЫЙ', 'ЗАГОВОР?'], cens: { '…Блять.': '…Б*ЯТЬ.' },
  hot: /^(вредно|спорят|табачники|заплатили|заговор|газетах|раком|«сомнение|продукт|семь|присягой|никотин|зависимость|суд|десятилетиями|мафии|вейп|«мальборо»|juul|тринадцать|миллиардов|кожаный|брось)/i,
  hideMat: [['t06', '…Блять', CUE.mat]] };
const TOMP = { x: 830, y: 911, s: 0.62 }, NIKP = { x: 330, y: 1050, s: 0.95 };
const TOMD = { lid: 0.55, lk: [-0.8, 0], smirk: 0.3 };
const NIKD = { legs: 'stand', arms: { l: [-150, 300, 'open'], r: [190, 110, 'fist'] } };
const handW = a => [NIKP.x + a[0] * NIKP.s, NIKP.y + a[1] * NIKP.s];

function scene(t, tomO, nikO, o = {}) {                              // балкон на закате + персонажи
  balcony(t);
  if (tomO) layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, m: tk.m, bob: tk.bob, ...tomO }); }, { sx: 7, sy: 8, sb: 12 });
  if (nikO) layer(() => { const tk = talk('nikita', t), n = { ...NIKD, ...nikO }; nikita({ ...NIKP, t, m: tk.m, bob: tk.bob, ...n });
    const [hx, hy] = handW(n.arms.r); if (n.hold === 'cig') pack(hx + 2, hy + 22, 0.95, -0.12); if (n.hold === 'vape') vapeBox(hx + 2, hy + 18, 0.95, 0.15); }, { sx: 7, sy: 8, sb: 12 });
  cough(NIKP.x + 40, NIKP.y + 40, t, CUE.cough);
  if (o.extra) o.extra();
  lightmap('#b9a6b2', () => { radial(760, 760, 1300, 'rgba(255,228,190,1)', 1); radial(400, 1200, 700, 'rgba(255,235,210,1)', 0.5); });
}

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA'], [LN.n02.start - 0.05, 'nikA'], [LN.t02.start - 0.05, 'frank'], [LN.t03.start - 0.05, 'memo'],
  [LN.n03.start - 0.05, 'nikB'], [LN.t04.start - 0.05, 'ceos'], [LN.n04.start - 0.05, 'nikC'], [LN.t05.start - 0.05, 'court'], [LN.n05.start - 0.05, 'vapeW'],
  [LN.n05.end + 0.08, 'stare'], [CUE.mat - 0.05, 'mat'], [CUE.owner - 0.05, 'juul'], [LN.t07.start - 0.08, 'final']];

const SH = {
  cold(t) { const [cx, cy, z] = ck(t, [[0, 420, 1080, 1.95], [LN.t01.start, 400, 1060, 1.8]]); cam(cx, cy, z, 0, shakeAt(t));
    scene(t, null, ex(t, [[0, { mood: 'eww', brow: -0.4, lk: [0.6, 0.3], hold: 'cig', lean: 0.04 }], [Wd('n01', 1), { mood: 'angry', brow: -0.6, lk: [0.8, 0], lean: 0, hold: 'cig', arms: { l: [-190, 120, 'open'], r: [190, 110, 'fist'] } }]])); pop(); },
  tomA(t) { cam(830, 990, t > CUE.paid ? 2.4 : 2.2); scene(t, ex(t, [[0, { ...TOMD, lid: 0.62 }], [CUE.paid, { lid: 0.5, lk: [-0.9, -0.3], smirk: 0.6 }]]), { mood: 'angry', hold: 'cig' }); pop(); },
  nikA(t) { cam(360, 1120, 2.0); scene(t, TOMD, { mood: 'dread', lk: [-0.8, 0.2], brow: 0.6, hold: 'cig' }); pop(); },
  frank(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => { cork(); frankAd(t, CUE); }); pop(); },
  memo(t, u) { cam(540, 960, 1); slideIn(u, () => memo(t, CUE)); pop(); },
  nikB(t) { cam(360, 1120, 2.0); scene(t, TOMD, { mood: 'dumb', brow: 0.3, lk: [0.9, -0.2], hold: 'cig', arms: { l: [-120, 60, 'open'], r: [190, 110, 'fist'] } }); pop(); },
  ceos(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => ceos(t, CUE)); pop(); },
  nikC(t) { cam(360, 1120, 2.1, 0, 3); scene(t, TOMD, { mood: 'angry', brow: -0.9, lk: [0.9, 0], hold: 'cig', arms: { l: [-190, 40, 'open'], r: [190, 110, 'fist'] } }); pop(); },
  court(t, u) { cam(540, 960, 1); slideIn(u, () => court(t, CUE)); pop(); },
  vapeW(t) { const v = t > CUE.vape - 0.2; cam(600, 1060, 1.25);
    scene(t, ex(t, [[0, { ...TOMD }], [CUE.vape, { lid: 0.3, lk: [-0.9, -0.2], smirk: 0 }]]),
      { mood: 'dumb', smile: 0.8, brow: 1, lk: [0.7, -0.3], hold: v ? 'vape' : 'cig', arms: { l: [-150, 300, 'open'], r: v ? [200, -40, 'fist'] : [190, 110, 'fist'] } }); pop(); },
  stare(t) { cam(830, 980, 2.3); scene(t, { lid: 0.62, lk: [-0.2, 0.15], smirk: 0, brow: -0.2 }, { mood: 'dumb', hold: 'vape', arms: { l: [-150, 300, 'open'], r: [200, -40, 'fist'] } }); pop(); },
  mat(t) { cam(830, 980, 2.5, 0, shakeAt(t)); scene(t, { lid: 0.9, lk: [0, 0.3], brow: -0.8, smirk: 0 }, { mood: 'dumb' }); pop();
    push(540, 330, 1, -0.04); ransom('Б*ЯТЬ', 0, 0, 160, 5300, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); },
  juul(t, u) { cam(540, 960, 1); slideIn(u, () => juul(t, CUE)); pop(); },
  final(t) { cam(600, 1060, 1.25); scene(t, ex(t, [[0, { ...TOMD, lid: 0.5, smirk: 0.8 }], [CUE.sub, { lid: 0.45, lk: [0, 0.2], paw: 1, pawX: 175, pawY: 110, smirk: 0.8 }], [CUE.loop - 0.3, { paw: 0, lk: [-0.8, 0] }]]),
      ex(t, [[0, { mood: 'dread', lk: [0.6, 0.2], brow: 0.5, hold: 'vape', arms: { l: [-150, 300, 'open'], r: [200, -40, 'fist'] } }], [CUE.loop, { mood: 'eww', hold: 'cig', lean: 0.04, arms: { l: [-150, 300, 'open'], r: [190, 110, 'fist'] } }]])); pop();
    if (t > CUE.sub && t < CUE.loop) { push(540, 300, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 5320, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 430, 1, 0.02); ransom('КТО «ПРОСТО ПАРИТ»', 0, 0, 80, 5321, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
