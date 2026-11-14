/* Эп. 15 «Сахарный заговор?» — сцены по эталону ep12 v3, тон серьёзный (ночь, холодильник светит, город за окном).
   Никита на весах ест «обезжиренное», подходит к Тому со стаканчиком, переворачивает его (читает этикетку), в финале — сахарница и ложка.
   Том на холодильнике: умывается, демонстративно ест масло на «жир — главный враг», надевает профессорские очки («учёные из Гарварда»),
   фейспалм, зевок, лапой смахивает банку «ЗАНАЧКА» на «минус ноль кило». В крупных планах второй герой не рисуется. */
frame = frame25;
const CUE = {
  jru: Wd('n01', 3), skinul: Wd('n01', 8), fat0: Wd('t01', 0), dosyp: Wd('t01', 8), sugar1: Wd('t01', 9), bla: Wd('t01', 11), dessert: Wd('t01', 15),
  vrachi: Wd('n02', 2), fat2: Wd('n02', 5), enemy: Wd('n02', 7),
  y67: Wd('t02', 8), sugInd: Wd('t02', 10), secret: Wd('t02', 12), sci: Wd('t02', 14), harv: Wd('t02', 16), usd: Wd('t02', 18), today: Wd('t02', 23),
  review: Wd('t03', 1), guilty: Wd('t03', 6), trifle: Wd('t03', 11), money: Wd('t03', 13), noword: Wd('t03', 17),
  author: Wd('t04', 2), usda: Wd('t04', 7), guide: Wd('t04', 14), handy: Wd('t04', 15),
  nuSugar: Wd('n05', 3), checked: Wd('t05', 0), sponsor: Wd('t05', 4), rats: Wd('t05', 9), alarm: Wd('t05', 11), money2: Wd('t05', 14), cut: Wd('t05', 16), unpub: Wd('t05', 22),
  ohu: Wd('n06', 0), eatfat: Wd('n07', 3),
  flip: Wd('t07', 0), per100: Wd('t07', 5), who: Wd('t07', 7), g50: Wd('t07', 10), g25: Wd('t07', 18), six: Wd('t07', 21),
  sugar8: Wd('n08', 4), spoon: Wd('n08', 6), deceit: Wd('n08', 9),
  mat: Wd('t08', 0), minus: Wd('t08', 3), noll: Wd('t08', 4), guar: Wd('t08', 6),
  sub: Wd('t09', 0), flip2: Wd('t09', 3), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.bla, 0.2, 6], [CUE.dessert, 0.25, 8], [CUE.today, 0.3, 10], [CUE.guilty, 0.3, 10], [CUE.noword, 0.3, 10], [CUE.cut, 0.35, 12], [CUE.ohu, 0.3, 6], [CUE.six, 0.25, 8], [CUE.mat, 0.5, 16], [CUE.minus + 0.35, 0.3, 10]];
const EP = { title: ['САХАРНЫЙ', 'ЗАГОВОР?'], cens: { 'бля,': 'бл*,', '…Охуеть.': '…ОХ*ЕТЬ.', '…Ёб': '…Ё*' },
  hot: /^(обезжиренное|скинул|жир|сахар|десерт|враг|гарварда|пятидесяти|тысяч|долларов|тайно|обзор|виноват|мелочь|деньги|слова|министерстве|госрекомендации|удобно|проверяли|крысах|тревожные|перестали|опубликовали|баночку|сто|граммов|воз|двадцать|шесть|ложек|ложкой|обмана|минус|ноль|кожаный|переверни)/i,
  hideMat: [['n06', '…Охуеть', CUE.ohu], ['t08', '…Ёб', CUE.mat]] };
const GRADE = { sat: 1.15, con: 1.1, bri: 1.0 };                       // серьёзно: ночь, холодный свет холодильника
const TOMP = { x: 790, y: FTOP - 239, s: 0.62 }, NIKX = 450, NIKS = 0.95;
const NY = scale => scale ? 1063 : 1077;                                 // на весах — на 14 px выше пола
const HOLD = { l: [-150, 300, 'open'], r: [150, 130, 'fist'] };          // стаканчик у живота
const EAT = { l: [-150, 300, 'open'], r: [70, -40, 'fist'] };            // ложку ко рту
const SHAKEF = { l: [-150, 300, 'open'], r: [175, -130, 'fist'] };       // трясёт стаканчиком: «жир — враг!»
const OFFER = { l: [-150, 300, 'open'], r: [210, -40, 'fist'] };         // тянет стаканчик Тому
const READ = { l: [-150, 300, 'open'], r: [120, -170, 'fist'] };         // поднял к глазам, читает дно
const SUGARA = { l: [-150, 120, 'fist'], r: [150, -170, 'fist'] };       // сахарница в левой, ложка с горкой в правой
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const eatArms = (t, t0) => { const u = (t - t0) % 2.2; return armsK(HOLD, EAT, sm(pr(u, 0.2, 0.6)) * (1 - sm(pr(u, 1.2, 1.6)))); };   // ест ложкой каждые 2.2 с

/* банка «ЗАНАЧКА»: стоит на холодильнике → Том смахивает на «минус» → летит и падает на пол */
function jarAt(t) { const t0 = CUE.minus + 0.3, u = t - t0; if (u < 0) return { x: 925, y: FTOP, r: 0, down: false };
  if (u < 0.55) { const k = u / 0.55; return { x: lerp(925, 1010, k), y: FTOP + 690 * k * k, r: 3.4 * k, down: false }; } return { x: 1010, y: 1590, r: Math.PI / 2, down: true }; }
const glassesK = t => sm(pr(t, LN.t02.start + 0.3, LN.t02.start + 0.8)) * (1 - sm(pr(t, LN.n07.start, LN.n07.start + 0.3)));
/* Кошачья жизнь Тома в этой серии */
function tomLife(t) {
  const L = { glasses: glassesK(t) };
  if (t < LN.t01.start) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });           // умывается
  if (t >= CUE.vrachi && t < LN.t02.start) { const k = sm(pr(t, CUE.vrachi, CUE.vrachi + 0.5));                                                       // тянет масло лапой и лижет: «жир — главный враг»
    Object.assign(L, { flip: true, paw: k, pawX: 180, pawY: 330, lk: [0.9, 0.9], tilt: 0.18 * k, tongue: k > 0.6 ? (Math.sin(t * 10) > 0 ? 1 : 0.3) : 0, lid: 0.55, smirk: 0.4 }); }
  if (t >= LN.t02.start && t < LN.t02.start + 0.8) Object.assign(L, { paw: 1 - sm(pr(t, LN.t02.start + 0.5, LN.t02.start + 0.8)), pawX: 60, pawY: -40, lid: 0.5 });   // поправляет очки
  if (t >= LN.n04.start + 0.1 && t < LN.t04.start + 0.4) Object.assign(L, ET.facepalm, { glasses: L.glasses });
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4], glasses: L.glasses });
  if (t >= LN.n07.start + 0.2 && t < LN.n07.end + 0.2) Object.assign(L, ET.yawn);
  if (t >= LN.n08.start && t < CUE.mat - 0.3) Object.assign(L, ET.stare, { lk: [-0.9, 0.5] });
  if (t >= CUE.minus - 0.1 && t < CUE.minus + 0.9) { const k = sm(pr(t, CUE.minus - 0.1, CUE.minus + 0.3));                                          // смахивает банку
    Object.assign(L, ET.deadpan, { paw: 1, pawX: lerp(150, 250, k), pawY: lerp(250, 330, k), lk: [0.9, 0.6] }); }
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t), J = jarAt(t), bite = sm(pr(t, CUE.fat2, LN.t02.start)); let held = null;
  plane(0, 2.4, () => nightTown(t));
  plane(1, 1.35, () => kWall(t));
  plane(2, 1.0, () => {
    const n = nikO ? { arms: HOLD, ...nikO } : null, sugar = n && n.prop === 'sugar';
    kMid(t, { bowl: !sugar });
    fridge(t);
    butterDish(690, FTOP, 0.9, { bite }); if (!J.down) stashJar(J.x, J.y, 0.9, J.r);
    if (J.down) { push(J.x, J.y - 30); stashJar(0, 40, 0.9, J.r); const r = rng(15880); for (let i = 0; i < 8; i++) ellP(-90 + r() * 200, 30 + r() * 30, 12, 9, ['#d8243c', '#f2a83a', '#5ab8d8', '#7ac85a'][i % 4], { seed: 15881 + i, lw: 1.4 }); pop(); }
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY(n.scale) + (n.dy ?? 0), s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r); held = [hx, hy];
        if (sugar) { const [lx, ly] = nikHand(P, n.arms.l); sugarBowl(lx, ly - 10, 0.62, 0.05, { spoon: false }); spoonHeap(hx, hy - 30, 0.75, 0.2); }
        else yogurtP(hx, hy - 34, 0.62, n.yr ?? 0, { flip: n.flip ?? 0, spoon: true }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(3,8,14,0.55)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF };
      layer(() => { const tk = talk('tom', t);
        tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m: tk.m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(3,8,14,0.55)' }); }
  });
  onPlane(1.0, () => kLight(t, () => { if (held) radial(held[0], held[1], 140, 'rgba(220,245,255,1)', 0.25); }));
  if (o.fg !== false) plane(3, 0.6, () => kFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 20, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, dx = 0, o = {}) => cam25(NIKX + dx + 30, 1120, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 590, 1040, o.z ?? 1.32, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(615, 1070, 1.25, { dof: 5, ...o });
const ins = (fn, tl, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); }
  if (tl !== undefined) timeline15(tl, t); }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [CUE.dosyp - 0.05, 'dessert', 'iris'], [LN.n02.start - 0.05, 'billLook', 'whip'], [CUE.fat2 - 0.35, 'butterW', 'whip'],
  [LN.t02.start - 0.05, 'tomB', 'whip'], [CUE.y67 - 0.05, 'harvA', 'flash'], [CUE.harv - 0.45, 'harvB', 'whip'], [LN.n03.start - 0.05, 'nikWhat', 'whip'],
  [LN.t03.start - 0.05, 'nejmA', 'fly'], [CUE.money - 0.3, 'nejmB', 'whip'], [LN.n04.start - 0.05, 'palmW', 'whip'], [LN.t04.start - 0.05, 'tomD', 'whip'], [CUE.usda - 0.3, 'usda', 'iris'],
  [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.nuSugar - 0.1, 'nikNu'], [LN.t05.start - 0.05, 'tomE', 'whip'], [CUE.sponsor - 0.05, 'ratsA', 'iris'], [CUE.money2 - 0.05, 'ratsB', 'whip'],
  [LN.n06.start - 0.05, 'nikOhu'], [LN.n07.start - 0.05, 'yawnW', 'whip'], [LN.t07.start - 0.05, 'flipW', 'whip'], [CUE.per100 - 0.35, 'whoA', 'iris'], [CUE.who - 0.25, 'whoB', 'whip'], [CUE.six - 0.6, 'whoC', 'whip'],
  [LN.n08.start - 0.05, 'sugarW', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.minus - 0.1, 'swipeW', 'whip'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.16 * sm(pr(t, 0.3, CUE.skinul + 0.4)) });                   // 3 часа ночи, весы, «обезжиренное»
    scene(t, { ...ET.deadpan }, { ...ex(t, [[0, EN.proud], [CUE.skinul - 0.2, EN.outrage]]), scale: true, arms: t < CUE.skinul - 0.3 ? eatArms(t, 0) : SHAKEF });
    if (t > CUE.skinul) { push(450, 1420, popK(t, CUE.skinul, 0.3), 0.04); ransom('−0 КГ', 0, 0, 90, 15950, { reveal: 1, pop: true }); pop(); } },
  tomA(t) { TOM(lerp(2.15, 2.4, pr(t, LN.t01.start, CUE.dosyp)), { Z: 0.06 }); scene(t, { ...ex(t, [[0, ET.deadpan], [CUE.fat0 + 1.2, ET.lecture]]) }, null); },
  dessert: ins(dessertIns, undefined, { hand: 0.6 }),
  billLook(t) { windowLook(t, 400, 390, lerp(2.0, 2.3, pr(t, LN.n02.start, CUE.fat2))); },           // «Все врачи говорят» — билборд за окном
  butterW(t) { TWO({ Z: 0.05 }); scene(t, {}, { ...EN.outrage, scale: true, arms: SHAKEF }); },
  tomB(t) { TOM(2.35); scene(t, { ...ET.lecture, lk: [-0.7, 0.1] }, null); },
  harvA: ins(harvardIns, 0, { hand: 0.6 }),
  harvB: ins(harvardIns, 0, { hand: 0.6, zoom: [540, 1000, 1.06] }),
  nikWhat(t) { NIK(2.0, 0, { Z: 0.05 }); scene(t, null, { ...EN.shock, scale: true, arms: HOLD }); },
  nejmA: ins(nejmIns, 1, { hand: 0.5 }),
  nejmB: ins(nejmIns, 1, { hand: 0.5, zoom: [540, 980, 1.05] }),
  palmW(t) { TWO(); scene(t, {}, { ...EN.dismiss, scale: true, arms: eatArms(t, LN.n04.start) }); },
  tomD(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  usda: ins(usdaIns, 3, { hand: 0.6 }),
  nuuW(t) { const k = sm(pr(t, LN.n05.start + 0.3, LN.n05.start + 1.6)); TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuSugar) });   // сходит с весов, несёт стаканчик Тому
    scene(t, {}, { ...EN.naive, scale: k < 0.2, arms: armsK(HOLD, OFFER, k), dx: 150 * k }); },
  nikNu(t) { NIK(2.0, 150, { Z: 0.08 * pr(t, CUE.nuSugar, LN.n05.end) }); scene(t, null, { ...EN.naive, arms: OFFER, dx: 150 }); },
  tomE(t) { TOM(2.3); scene(t, { ...ET.grave }, null); },
  ratsA: ins(ratsIns, 2, { hand: 0.6 }),
  ratsB: ins(ratsIns, 2, { hand: 0.6, zoom: [540, 960, 1.04] }),
  nikOhu(t) { NIK(2.1, 150, { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) }); scene(t, null, { ...EN.horror, jaw: 0.15, arms: HOLD, dx: 150, lid: 0.35 });
    if (t > CUE.ohu) { push(540, 420, 1, -0.04); ransom('ОХ*ЕТЬ', 0, 0, 140, 15955, { reveal: pr(t, CUE.ohu, CUE.ohu + 0.2), pop: true }); pop(); } },
  yawnW(t) { TWO(); scene(t, {}, { ...EN.outrage, arms: SHAKEF, dx: 150 }); },
  flipW(t) { const k = sm(pr(t, CUE.flip, CUE.flip + 0.7)); TWO({ Z: 0.08 * k });                     // «Переворачивай баночку» — переворачивает
    scene(t, { ...ET.lecture }, { ...EN.doubt, arms: armsK(HOLD, READ, k), dx: 150, flip: sm(pr(t, CUE.flip + 0.4, CUE.flip + 1.0)), lk: [0.3, -0.8] }); },
  whoA: ins(whoIns, 4, { hand: 0.5 }),
  whoB: ins(whoIns, 4, { hand: 0.5, zoom: [540, 1000, 1.04] }),
  whoC: ins(whoIns, 4, { hand: 0.5, zoom: [540, 1020, 1.08] }),
  sugarW(t) { const k = sm(pr(t, LN.n08.start + 0.3, LN.n08.start + 0.9)); TWO({ Z: 0.06 * pr(t, LN.n08.start, LN.n08.end) });   // «Понял!» — бросает йогурт, хватает сахарницу и ложку
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.deceit - 0.2, EMO(EN.proud, { grin: 0.5 })]]), prop: k > 0.5 ? 'sugar' : null, arms: k > 0.5 ? SUGARA : armsK(READ, HOLD, k * 2), dx: 150 * (1 - k) }); },
  stare(t) { TOM(lerp(2.3, 2.65, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare, lk: [-0.9, 0.5] }, null); },
  mat(t) { TOM(2.6, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('Ё* ТВОЮ', 0, 0, 150, 15960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop();
      push(560, 540, 1, 0.03); ransom('МАТЬ', 0, 0, 150, 15961, { reveal: pr(t, CUE.mat + 0.2, CUE.mat + 0.4), pop: true }); pop(); } },
  swipeW(t) { cam25(720, 1080, 1.42, { shake: shakeAt(t), dof: 5 });                                     // смахивает «ЗАНАЧКУ»: минус ноль кило
    scene(t, {}, { ...ex(t, [[0, EN.proud], [CUE.minus + 0.8, EN.shock]]), prop: 'sugar', arms: SUGARA });
    if (t > CUE.noll) { push(450, 1300, popK(t, CUE.noll, 0.3), -0.03); ransom('−0 КГ', 0, 0, 100, 15965, { reveal: 1, pop: true }); pop(); }
    if (t > CUE.guar) { push(540, 420, popK(t, CUE.guar, 0.3), 0.03); ransom('ГАРАНТИРУЮ', 0, 0, 100, 15966, { reveal: 1, pop: true }); pop(); } },
  final(t) { WIDE(); const back = t > CUE.loop - 0.6;
    scene(t, ex(t, [[0, ET.smug], [CUE.flip2 - 0.3, EMO(ET.lecture, { lk: [-0.8, 0.4] })], [CUE.loop - 0.4, ET.deadpan]]),
      back ? { ...EN.proud, scale: true, arms: HOLD } : { ...EN.shock, prop: 'sugar', arms: SUGARA });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 15970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ЕСТ «0 %»', 0, 0, 80, 15971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
