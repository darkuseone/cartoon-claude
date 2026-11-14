/* Эп. 17 «Завтрак — заговор?» — сцены по эталону ep12 v3. Утро, остановка, автобус уехал.
   Никита: доедает хлопья на ходу, тянет миску Тому, в финале достаёт бутерброд с беконом — Том утаскивает бекон.
   Том на лавке: охотится взглядом на голубей (взлетают от «Да ладно!»), зевает, очки на «BMJ», умывается, фейспалм, ест бекон. */
frame = frame25;
const CUE = {
  missed: Wd('n01', 0), ate: Wd('n01', 4), most: Wd('n01', 7), sells: Wd('t01', 7), eta: Wd('t01', 8), bla: Wd('t01', 10), ad: Wd('t01', 12),
  dal: Wd('n02', 0), light: Wd('t02', 2), bacon0: Wd('t02', 5), bad: Wd('t02', 7), beech: Wd('t02', 10), bern: Wd('t02', 13), pr: Wd('t02', 15),
  k5: Wd('t03', 4), k45: Wd('t03', 11), yes: Wd('t03', 16), paper: Wd('t03', 19), sytnee: Wd('t03', 23), bacon: Wd('t03', 25),
  flakes: Wd('n04', 2), kell: Wd('t04', 3), bland: Wd('t04', 7), y44: Wd('t04', 12), gf: Wd('t04', 15), slogan: Wd('t04', 20), sell: Wd('t04', 24),
  nuu: Wd('n05', 0), nuB: Wd('n05', 2), fat: Wd('n05', 5), checked: Wd('t05', 0), bmj: Wd('t05', 10), kcal: Wd('t05', 18), notthin: Wd('t05', 23),
  pizd: Wd('n06', 0), hungry: Wd('t07', 0), nothungry: Wd('t07', 3), day: Wd('t07', 7), slog2: Wd('t07', 16),
  bacon8: Wd('n08', 3), doctors: Wd('n08', 10), mat: Wd('t08', 0), bern2: Wd('t08', 1), sub: Wd('t09', 0), opt: Wd('t09', 2), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.bla, 0.2, 6], [CUE.ad, 0.3, 10], [CUE.dal, 0.25, 6], [CUE.pr, 0.3, 8], [CUE.yes, 0.25, 8], [CUE.bacon, 0.3, 10], [CUE.sell, 0.25, 6], [CUE.kcal, 0.3, 10], [CUE.pizd, 0.3, 6], [CUE.slog2, 0.3, 8], [CUE.mat, 0.5, 16]];
const EP = { title: ['ЗАВТРАК —', 'ЗАГОВОР?'], cens: { 'бля,': 'бл*,', '…Пиздец.': '…П*ЗДЕЦ.', '…Сука.': '…С*КА.' },
  hot: /^(автобус|позавтракал|самый|важный|реклама|бекон|бич|бернейса|пиара|врач|пять|четыре|половиной|да|газеты|сытнее|яйцами|хлопья|келлоги|санатории|пресную|сорок|радио|хорошо|лучше|продать|толстеют|проверяли|тринадцати|би|двести|шестьдесят|калорий|худее|голоден|день|слоган|ошибаться|бернейс|кожаный|желанию)/i,
  hideMat: [['n06', '…Пиздец', CUE.pizd], ['t08', '…Сука', CUE.mat]] };
const GRADE = { sat: 1.2, con: 1.08, bri: 1.0 };                       // утро: тёплый свет, но не «детская» сочность
const TOMP = { x: 820, y: SEAT - 239, s: 0.62 }, NIKX = 380, NIKS = 0.95, NY = 1077;
const HOLD = { l: [-150, 300, 'open'], r: [150, 120, 'fist'] }, EAT = { l: [-150, 300, 'open'], r: [70, -40, 'fist'] };
const OFFER = { l: [-150, 300, 'open'], r: [205, -30, 'fist'] }, SHAKEF = { l: [-150, 300, 'open'], r: [175, -130, 'fist'] }, UP = { l: [-150, 300, 'open'], r: [140, -200, 'fist'] };
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const eatArms = (t, t0) => { const u = (t - t0) % 2.2; return armsK(HOLD, EAT, sm(pr(u, 0.2, 0.6)) * (1 - sm(pr(u, 1.2, 1.6)))); };
const busX = t => lerp(620, 1900, sm(pr(t, 0, 4.2)));
const pigeonFly = t => t < CUE.dal ? 0 : t < LN.t04.start ? pr(t, CUE.dal, CUE.dal + 1.4) : 1 - sm(pr(t, LN.t04.start, LN.t04.start + 0.01));   // взлетают от «Да ладно!», к t04 — снова клюют
const SNATCH = () => CUE.bern2 - 0.15;
function tomLife(t) {
  const L = {};
  if (t < LN.t01.start || (t >= LN.t04.start && t < LN.t04.start + 0.01)) Object.assign(L, ET.hunt, { lk: [-0.5, 1] });                     // охотится взглядом на голубей
  if (t >= CUE.dal && t < CUE.dal + 1.0) Object.assign(L, ET.alarm, { lk: [-0.3, -1] });                                                   // голуби улетели
  if (t >= LN.n04.start + 0.3 && t < LN.n04.end + 0.3) Object.assign(L, ET.yawn);
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  L.glasses = sm(pr(t, LN.t05.start + 0.2, LN.t05.start + 0.6)) * (1 - sm(pr(t, LN.n07.start, LN.n07.start + 0.3)));
  if (t >= LN.n07.start && t < LN.t07.start + 0.2) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });   // умывается
  if (t >= LN.n08.start && t < CUE.mat - 0.3) Object.assign(L, ET.stare, { lk: [-0.9, 0.5] });
  const s0 = SNATCH(); if (t >= s0 - 0.35 && t < s0 + 0.25) { const k = sm(pr(t, s0 - 0.35, s0)); Object.assign(L, ET.sneaky, { flip: true, paw: 1, pawX: lerp(150, 195, k), pawY: lerp(40, 70, k), lk: [0.9, 0.3] }); }
  if (t >= s0 + 0.25) { const ch = Math.abs(Math.sin(t * 11)); Object.assign(L, ET.smug, { m: { open: 0.12 + 0.25 * ch, round: 0.1 }, lk: [-0.8, 0.2] }); }   // жуёт бекон
  return L;
}
/* где бекон: в бутерброде → в лапе Тома → во рту, укорачивается */
function baconAt(t, hand) { const s0 = SNATCH(); if (t < s0) return null; const mouth = [TOMP.x - 10, TOMP.y + 66];
  if (t < s0 + 0.35) { const k = sm(pr(t, s0, s0 + 0.35)); return { x: lerp(hand ? hand[0] : 700, mouth[0], k), y: lerp(hand ? hand[1] - 40 : 1000, mouth[1], k), s: 0.7, r: 0.3 - 0.1 * k }; }
  return { x: mouth[0] - 20, y: mouth[1] + 18, s: 0.85 * Math.max(0.3, 1 - (t - s0 - 0.35) / 4), r: 0.25 + 0.12 * Math.sin(t * 11) }; }
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t); let hand = null;
  plane(0, 2.4, () => dawnCity(t));
  plane(1, 1.35, () => road(t, { busX: busX(t) }));
  plane(2, 1.0, () => {
    stopMid(t, { pigeonFly: pigeonFly(t) });
    const n = nikO ? { arms: HOLD, ...nikO } : null;
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY + (n.dy ?? 0), s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r); hand = [hx, hy];
        if (n.prop === 'sand') baconSand(hx, hy - 30, 0.62, 0.05, { bacon: t < SNATCH() ? 1 : 0 }); else if (n.prop !== false) cerealBowl(hx, hy - 22, 0.55, 0.04, { full: n.full ?? 1 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(30,14,20,0.45)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF }, lm = life.m; delete life.m;
      layer(() => { const tk = talk('tom', t), m = (lm && tk.m.open < 0.05) ? lm : tk.m;
        tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 });
        const b = baconAt(t, hand); if (b) baconStrip(b.x, b.y, b.s, b.r); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(30,14,20,0.45)' }); }
  });
  onPlane(1.0, () => stopLight(t));
  if (o.fg !== false) plane(3, 0.6, () => stopFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 20, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, dx = 0, o = {}) => cam25(NIKX + dx + 30, 1120, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 610, 1060, o.z ?? 1.34, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(620, 1080, 1.25, { dof: 5, ...o });
const ins = (fn, tl, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); }
  if (tl !== undefined) timeline17(tl, t); }, { shake: shakeAt(t), ...o });
function boardLook(t, z) { cam25(540 + (400 - 540) * 1.35, 960 + (630 - 960) * 1.35, z, { focus: 1.35, dof: 0, shake: shakeAt(t) }); plane(0, 2.4, () => dawnCity(t)); plane(1, 1.35, () => road(t, { busX: busX(t) })); onPlane(1.0, () => stopLight(t)); }

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [CUE.eta - 0.1, 'board', 'whip'], [LN.n02.start - 0.05, 'pigeonsW', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'],
  [CUE.bacon0 - 0.3, 'bern', 'flash'], [LN.n03.start - 0.05, 'nikQ', 'whip'], [LN.t03.start - 0.05, 'survey', 'iris'], [CUE.paper - 0.3, 'surveyB', 'whip'], [CUE.sytnee - 0.25, 'baconP', 'flash'],
  [LN.n04.start - 0.05, 'flakesW', 'whip'], [LN.t04.start - 0.05, 'tomC', 'whip'], [CUE.kell - 0.3, 'cereal', 'fly'], [CUE.y44 - 0.25, 'cerealB', 'whip'], [CUE.sell - 0.3, 'tomSell', 'whip'],
  [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.nuB - 0.1, 'stareA'], [LN.t05.start - 0.05, 'tomD', 'whip'], [CUE.bmj - 0.5, 'bmj', 'iris'], [CUE.kcal - 0.4, 'bmjB', 'whip'],
  [LN.n06.start - 0.05, 'nikMat'], [LN.n07.start - 0.05, 'lickW', 'whip'], [LN.t07.start - 0.05, 'tomE', 'whip'], [CUE.day - 0.1, 'advice', 'iris'],
  [LN.n08.start - 0.05, 'sandW', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [SNATCH() - 0.5, 'snatchW', 'whip'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.most + 0.4)) });                      // автобус уехал, Никита доедает хлопья
    scene(t, {}, { ...ex(t, [[0, EN.outrage], [CUE.ate - 0.2, EMO(EN.proud, { grin: 0.5 })]]), arms: eatArms(t, 0.3) }); },
  tomA(t) { TOM(lerp(2.15, 2.4, pr(t, LN.t01.start, CUE.eta)), { Z: 0.06 }); scene(t, { ...ET.deadpan }, null); },
  board(t) { boardLook(t, lerp(1.9, 2.15, pr(t, CUE.eta, LN.n02.start)));                                    // «раскрутила реклама» — билборд
    if (t > CUE.ad) { push(540, 1180, popK(t, CUE.ad, 0.3), -0.03); ransom('РЕКЛАМА', 0, 0, 130, 17950, { reveal: 1, pop: true }); pop(); } },
  pigeonsW(t) { TWO({ shake: shakeAt(t) }); scene(t, {}, { ...EN.outrage, arms: SHAKEF }); },
  tomB(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  bern: ins(bernaysIns, 1, { hand: 0.6 }),
  nikQ(t) { NIK(2.0, 0, { Z: 0.05 }); scene(t, null, { ...EN.naive, arms: eatArms(t, LN.n03.start) }); },
  survey: ins(surveyIns, 1, { hand: 0.5 }),
  surveyB: ins(surveyIns, 1, { hand: 0.5, zoom: [540, 1010, 1.06] }),
  baconP: ins(baconIns, undefined, { hand: 0.6 }),
  flakesW(t) { const k = sm(pr(t, LN.n04.start, LN.n04.start + 0.6)); TWO(); scene(t, {}, { ...EN.proud, arms: armsK(HOLD, OFFER, k), dx: 100 * k }); },
  tomC(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  cereal: ins(cerealIns, 0, { hand: 0.6 }),
  cerealB: ins(cerealIns, 2, { hand: 0.6, zoom: [540, 1000, 1.05] }),
  tomSell(t) { TOM(2.45); scene(t, { ...ET.smug }, null); },
  nuuW(t) { TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuB) }); scene(t, {}, { ...EN.naive, arms: eatArms(t, LN.n05.start), dx: 100 }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.nuB, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  tomD(t) { TOM(2.3); scene(t, { ...ET.grave }, null); },
  bmj: ins(bmjIns, 3, { hand: 0.5 }),
  bmjB: ins(bmjIns, 3, { hand: 0.5, zoom: [540, 990, 1.05] }),
  nikMat(t) { NIK(2.1, 100, { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) }); scene(t, null, { ...EN.horror, jaw: 0.15, arms: HOLD, dx: 100, lid: 0.35, full: 0.3 });
    if (t > CUE.pizd) { push(540, 420, 1, -0.04); ransom('П*ЗДЕЦ', 0, 0, 150, 17955, { reveal: pr(t, CUE.pizd, CUE.pizd + 0.2), pop: true }); pop(); } },
  lickW(t) { TWO(); scene(t, {}, { ...EN.worried, arms: HOLD, dx: 100, full: 0.3 }); },
  tomE(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  advice: ins(adviceIns, undefined, { hand: 0.5 }),
  sandW(t) { const k = sm(pr(t, LN.n08.start, LN.n08.start + 0.5)); TWO({ Z: 0.05 * pr(t, LN.n08.start, LN.n08.end) });     // достаёт бутерброд с беконом
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.doctors - 0.2, EMO(EN.proud, { grin: 0.5 })]]), prop: k > 0.5 ? 'sand' : undefined, arms: k > 0.5 ? armsK(UP, OFFER, sm(pr(t, CUE.doctors, CUE.doctors + 0.6))) : armsK(HOLD, UP, k * 2), dx: 100, full: 0.3 }); },
  stare(t) { TOM(lerp(2.3, 2.65, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare, lk: [-0.9, 0.5] }, null); },
  mat(t) { TOM(2.6, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('С*КА', 0, 0, 170, 17960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  snatchW(t) { cam25(660, 1060, lerp(1.6, 1.75, pr(t, SNATCH() - 0.5, LN.t09.start)), { dof: 5 });            // Том утаскивает бекон: «Бернейс бы тобой гордился»
    scene(t, {}, { ...ex(t, [[0, EN.proud], [SNATCH() + 0.2, EN.shock]]), prop: 'sand', arms: OFFER, dx: 120 }); },
  final(t) { WIDE(); const back = t > CUE.loop - 0.6;
    scene(t, ex(t, [[0, {}], [CUE.opt - 0.2, ET.deadpan], [CUE.loop - 0.4, ET.hunt]]), back ? { ...EN.proud, arms: eatArms(t, 0) } : { ...EN.sad, prop: 'sand', arms: HOLD, dx: 120 });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 17970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ЕСТ ХЛОПЬЯ', 0, 0, 84, 17971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
