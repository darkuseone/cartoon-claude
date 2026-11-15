/* Эп. 25 «Пятисекундное правило?» — продолжение эп. 24, ночь после дня рождения Никиты.
   Сюжет-мини: кусок торта на ковре, таймер «3 сек» → Том в колпаке слизывает крем с торта («бактерии правило не читали») → школьница и Шнобелевка → Ратгерс
   → крупно кусок в руке Никиты: крем + волосок (подстава) → «а на ковёр?» → Том отряхивается, шерсть летит → Никита вытаскивает волос из торта («…Блять. Так вот откуда»)
   → роняет торт на ковёр нарочно → «Это диагноз» (фейспалм) → петля: «открой мой подарок — там с бантиком» → в коробке мышь с бантиком (из эп. 24). */
frame = frame25;
const CUE = {
  drop: Wd('n01', 0), cake: Wd('n01', 5), lift: Wd('n01', 6), three: Wd('n01', 8), rule: Wd('n01', 10), clean: Wd('n01', 13), bact: Wd('t01', 3), read: Wd('t01', 6),
  y03: Wd('t02', 2), girl: Wd('t02', 4), tile: Wd('t02', 10), gummy: Wd('t02', 13), cookie: Wd('t02', 15), fast: Wd('t02', 16), five: Wd('t02', 19), prize: Wd('t02', 23),
  rut: Wd('t03', 3), k25: Wd('t03', 7), sec: Wd('t03', 18), longer: Wd('t03', 20), wet: Wd('t03', 26),
  melon: Wd('t04', 0), most: Wd('t04', 3), gummy4: Wd('t04', 5), least: Wd('t04', 6), yours: Wd('t04', 8), cream: Wd('t04', 11), think: Wd('t04', 14),
  nuB: Wd('n05', 3), carpet: Wd('n05', 4), better: Wd('t05', 3), carpet5: Wd('t05', 4), tile5: Wd('t05', 9), zato: Wd('t05', 12), fur: Wd('t05', 16),
  bla: Wd('n06', 0), hair: Wd('n06', 6), dry: Wd('t07', 0), wet7: Wd('t07', 7), hall: Wd('t07', 12), kids: Wd('t07', 21),
  drop8: Wd('n08', 2), carpet8: Wd('n08', 6), eat8: Wd('n08', 9), diag: Wd('t08', 5), sub: Wd('t09', 0), open: Wd('t09', 3), bow: Wd('t09', 8), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.lift, 0.2, 5], [CUE.prize, 0.3, 8], [CUE.wet, 0.3, 8], [CUE.cream, 0.25, 6], [CUE.zato, 0.4, 6], [CUE.bla, 0.3, 8], [CUE.diag, 0.3, 10], [CUE.bow + 0.2, 0.4, 10]];
const EP = { title: ['5 СЕКУНД —', 'НЕ УПАЛО?'], cens: { '…Блять.': '…Бл*ть.' },
  hot: /^(уронил|торта|три|секунды|пятисекундное|чистый|бактерии|читали|школьница|плитки|мармелад|печенье|пять|шнобелевскую|ратгерса|замеров|секунду|влажность|арбуз|крем|мокрый|ковёр|шерсть|сухое|мокрое|мусор|детям|диагноз|подарок|бантиком|кожаный)/i,
  hideMat: [] };
const GRADE = { sat: 1.2, con: 1.08, bri: 1.0 };
const TOMP = { x: 860, y: TABLE - 239, s: 0.62 }, NIKX = 380, NIKS = 0.95;
const NY = legs => legs === 'kneel' ? 1128 : 1077;
const PLATE = { l: [-150, 300, 'open'], r: [160, 60, 'fist'] }, UP = { l: [-150, 300, 'open'], r: [150, -150, 'fist'] }, LOOK = { l: [-150, 300, 'open'], r: [110, -110, 'fist'] };
const HAIR = { l: [40, -110, 'fist'], r: [140, 80, 'fist'] }, DOWN = { l: [-150, 300, 'open'], r: [200, 280, 'open'] }, OPEN = { l: [-170, 100, 'open'], r: [170, 100, 'open'] };
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const giftOpen = t => sm(pr(t, CUE.open + 0.3, CUE.open + 0.8)) * (1 - sm(pr(t, CUE.loop + 0.2, CUE.loop + 0.4)));
const licking = t => t < LN.t01.start || (t >= LN.n02.start && t < LN.t02.start);
function tomLife(t) {
  const L = {};
  if (licking(t)) Object.assign(L, ET.sneaky, { tongue: Math.sin(t * 9) > 0 ? 1 : 0.3, lk: [0.9, 0.7], tilt: 0.16 });                         // слизывает крем с торта
  if (t >= LN.n03.start && t < LN.t03.start) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });
  if (t >= LN.n04.start && t < LN.t04.start) Object.assign(L, ET.hunt, { paw: 1, pawX: 200 + 30 * Math.sin(t * 8), pawY: -20 + 30 * Math.sin(t * 11), lk: [0.8, -0.6] });   // бьёт лапой ленточку шарика
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= CUE.zato - 0.1 && t < CUE.fur + 0.6) Object.assign(L, ET.deadpan, { tilt: 0.18 * Math.sin(t * 30), lid: 0.9 });                     // отряхивается
  if (t >= LN.n07.start && t < LN.n07.end + 0.3) Object.assign(L, ET.yawn);
  if (t >= LN.n08.start && t < LN.t08.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.6] });
  if (t >= CUE.diag - 0.3 && t < LN.t09.start) Object.assign(L, ET.facepalm);
  if (t >= LN.t09.start) Object.assign(L, ET.sneaky, { paw: 1, pawX: -60, pawY: 300, lk: [-0.6, 0.9] });                                         // кивает на подарок
  return L;
}
function furPuffs(t) { if (t < CUE.zato || t > CUE.fur + 2.5) return; const u = t - CUE.zato, r = rng(25900); for (let i = 0; i < 14; i++) { const a = r() * 6.28, d = 40 + 260 * Math.min(1, u * 0.7) * (0.5 + r()), x = TOMP.x + Math.cos(a) * d, y = TOMP.y + 120 + Math.sin(a) * d * 0.6 + 80 * u;
  stroke([[x, y], [x + 10, y - 8], [x + 18, y]], '#8a7a6a', 3, { a: Math.max(0, 1 - u / 2.5) }); } }
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t);
  plane(0, 2.4, () => nightFest(t));
  plane(1, 1.35, () => livingWall(t));
  plane(2, 1.0, () => {
    const n = nikO ? { arms: PLATE, legs: 'stand', ...nikO } : null;
    livingMid(t, { giftOpen: giftOpen(t), floorSlice: o.floorSlice });
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY(n.legs), s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r); if (n.prop !== false) slice(hx, hy - 24, 0.62, 0.05, { hair: n.hairOn, plate: true });
        if (n.pull) { const [lx, ly] = nikHand(P, n.arms.l); stroke(spline([[lx, ly], [lx + 10, ly + 40], [lx - 6, ly + 80], [lx + 8, ly + 120]], false, 6), '#7a6a5a', 3); } }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(10,10,30,0.5)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF };
      layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m: tk.m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 });
        partyHat(TOMP.x + 20, TOMP.y - 150 * 0.62 + (life.tilt ?? 0) * 40, 0.75, 0.25 + (life.tilt ?? 0));
        if (t > LN.t01.start - 0.2 && t < LN.n03.start) dot(TOMP.x + 2, TOMP.y + 30, 9, CREAM); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(10,10,30,0.5)' }); }
    furPuffs(t);
  });
  onPlane(1.0, () => livingLight(t));
  if (o.fg !== false) plane(3, 0.6, () => livingFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 10, TOMP.y + 100, z, { dof: 6, ...o });
const NIK = (z, dx = 0, legs = 'stand', o = {}) => cam25(NIKX + dx + 30, NY(legs) + 43, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 630, 1080, o.z ?? 1.3, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(640, 1090, 1.22, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); } }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'creamT', 'whip'], [LN.n02.start - 0.05, 'sliceW', 'whip'], [LN.t02.start - 0.05, 'clarke', 'flash'], [CUE.five - 0.3, 'clarkeB', 'whip'],
  [LN.n03.start - 0.05, 'nikD', 'whip'], [LN.t03.start - 0.05, 'tomB', 'whip'], [CUE.rut - 0.3, 'rutgers', 'iris'], [CUE.longer - 0.3, 'rutB', 'whip'], [LN.n04.start - 0.05, 'balloonW', 'whip'],
  [LN.t04.start - 0.05, 'foods', 'iris'], [CUE.yours - 0.2, 'sliceCU', 'whip'], [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.nuB - 0.1, 'stareA'], [LN.t05.start - 0.05, 'surface', 'iris'],
  [CUE.zato - 0.2, 'furT', 'whip'], [LN.n06.start - 0.05, 'nikHair'], [LN.n07.start - 0.05, 'yawnW', 'whip'], [LN.t07.start - 0.05, 'rule', 'iris'], [LN.n08.start - 0.05, 'dropW', 'whip'],
  [LN.n08.end + 0.06, 'stare'], [LN.t08.start - 0.05, 'diagT'], [LN.t09.start - 0.08, 'final', 'whip'], [CUE.open + 0.1, 'giftCU', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.clean + 0.4)) }); const up = sm(pr(t, CUE.lift - 0.4, CUE.lift + 0.2));                 // кусок на ковре → поднял за 3 сек
    scene(t, {}, { ...ex(t, [[0, EN.panic], [CUE.lift, EMO(EN.proud, { grin: 0.5 })]]), legs: up < 0.5 ? 'kneel' : 'stand', prop: up < 0.5 ? false : undefined, arms: up < 0.5 ? DOWN : armsK(PLATE, UP, sm(pr(t, CUE.rule - 0.3, CUE.rule + 0.3))), dx: 40 }, { floorSlice: up < 0.5 ? [420, 1640] : null });
    if (t > 0.6 && t < LN.t01.start) { timerP(640, 600, 1.2, Math.min(3, (t - 0.6) * 1.2)); txt(Math.min(3, (t - 0.6) * 1.2).toFixed(1) + ' с', 640, 740, 52, { font: 'Inter Black', col: '#fbfaf2' }); } },
  creamT(t) { TOM(lerp(2.1, 2.3, pr(t, LN.t01.start, LN.t01.end))); scene(t, { ...ET.deadpan, lk: [-0.7, 0.2] }, null);
    if (t > CUE.read) { push(540, 420, popK(t, CUE.read, 0.3), 0.03); ransom('НЕ ЧИТАЛИ', 0, 0, 120, 25950, { reveal: 1, pop: true }); pop(); } },
  sliceW(t) { TWO(); scene(t, {}, { ...EN.outrage, arms: UP, dx: 40 }); },
  clarke: ins(clarkeIns, { hand: 0.5 }),
  clarkeB: ins(clarkeIns, { hand: 0.5, zoom: [540, 1000, 1.05] }),
  nikD(t) { NIK(2.0, 40, 'stand', { Z: 0.05 }); scene(t, null, { ...EN.dismiss, arms: UP, dx: 40 }); },
  tomB(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  rutgers: ins(rutgersIns, { hand: 0.5 }),
  rutB: ins(rutgersIns, { hand: 0.5, zoom: [540, 1000, 1.05] }),
  balloonW(t) { TWO(); scene(t, {}, { ...EN.naive, arms: PLATE, dx: 40 }); },
  foods: ins(foodsIns, { hand: 0.5 }),
  sliceCU(t) { cam25(NIKX + 40 + 160 * 0.95, 1077 + 60 * 0.95 - 40, 3.0, { dof: 4, Z: 0.08 * pr(t, CUE.yours, LN.n05.start) });          // крупно: крем и волосок
    scene(t, {}, { ...EN.naive, arms: PLATE, dx: 40, hairOn: true });
    if (t > CUE.wetC - 0.05) { push(540, 420, popK(t, CUE.cream, 0.3), -0.03); ransom('МОКРЫЙ', 0, 0, 120, 25955, { reveal: 1, pop: true }); pop(); } },
  nuuW(t) { TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuB) }); scene(t, {}, { ...EN.naive, arms: LOOK, dx: 40, lk: [0.2, 0.9], hairOn: true }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.nuB, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  surface: ins(surfaceIns, { hand: 0.5 }),
  furT(t) { TOM(2.2, { shake: shakeAt(t) }); scene(t, {}, null);
    if (t > CUE.fur) { push(540, 420, popK(t, CUE.fur, 0.3), 0.03); ransom('МОЯ ШЕРСТЬ', 0, 0, 110, 25960, { reveal: 1, pop: true }); pop(); } },
  nikHair(t) { NIK(2.2, 40, 'stand', { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3), shake: shakeAt(t) });                            // вытаскивает волос изо рта
    scene(t, null, { ...ex(t, [[0, EN.eww], [CUE.hair - 0.3, EMO(EN.horror, { pale: 0.3 })]]), arms: HAIR, pull: true, dx: 40 }); },
  yawnW(t) { TWO(); scene(t, {}, { ...EN.worried, arms: PLATE, dx: 40 }); },
  rule: ins(ruleIns, { hand: 0.5 }),
  dropW(t) { const k = sm(pr(t, CUE.drop8 - 0.2, CUE.drop8 + 0.3)), kn = sm(pr(t, CUE.carpet8, CUE.carpet8 + 0.5)); TWO({ Z: 0.05 * pr(t, LN.n08.start, LN.n08.end) });   // роняет нарочно и тянется
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.eat8 - 0.2, EMO(EN.proud, { grin: 0.5 })]]), legs: kn > 0.5 ? 'kneel' : 'stand', prop: k > 0.5 ? false : undefined, arms: kn > 0.5 ? DOWN : armsK(UP, PLATE, k), dx: 40 }, { floorSlice: k > 0.5 ? [420, 1640] : null }); },
  stare(t) { TOM(lerp(2.3, 2.6, pr(t, LN.n08.end, LN.t08.start)), { Z: 0.08 * pr(t, LN.n08.end, LN.t08.start) }); scene(t, { ...ET.stare }, null); },
  diagT(t) { TOM(2.5, { shake: shakeAt(t) }); scene(t, { ...ET.deadpan }, null); if (t > CUE.diag) { push(540, 420, popK(t, CUE.diag, 0.3), -0.03); ransom('ДИАГНОЗ', 0, 0, 140, 25965, { reveal: 1, pop: true }); pop(); } },
  giftCU(t) { cam25(660, 1440, lerp(2.3, 2.5, pr(t, CUE.open, CUE.loop)), { dof: 4, shake: shakeAt(t) }); scene(t, { ...ET.smug }, null, { floorSlice: [420, 1640] });   // крупно: в коробке мышь с бантиком
    if (t > CUE.bow) { push(540, 640, popK(t, CUE.bow, 0.3), 0.03); ransom('С БАНТИКОМ', 0, 0, 110, 25975, { reveal: 1, pop: true }); pop(); }
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 25970, { reveal: 1 }); pop(); push(540, 450, 1, 0.02); ransom('КТО ЕСТ С ПОЛА', 0, 0, 84, 25971, { reveal: 1 }); pop(); } },
  final(t) { WIDE({ shake: shakeAt(t) }); const back = t > CUE.loop - 0.6, k = sm(pr(t, CUE.open - 0.4, CUE.open + 0.2));                 // открывает подарок: мышь с бантиком
    scene(t, {}, back ? { ...EN.panic, legs: 'kneel', prop: false, arms: DOWN, dx: 40 } : { ...ex(t, [[0, EN.naive], [CUE.open + 0.6, EMO(EN.horror, { pale: 0.4 })]]), legs: k > 0.5 ? 'kneel' : 'stand', prop: false, arms: k > 0.5 ? { l: [180, 220, 'open'], r: [210, 180, 'open'] } : OPEN, dx: lerp(40, 160, k) }, { floorSlice: [420, 1640] });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 25970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ЕСТ С ПОЛА', 0, 0, 84, 25971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
CUE.wetC = Wd('t04', 12);
