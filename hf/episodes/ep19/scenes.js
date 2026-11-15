/* Эп. 19 «Шринкфляция — развод?» — сцены по эталону ep12 v3. Вечер, офисный коридор, снековый автомат.
   Никита: трясёт пачкой, тянет её Тому, на «привычка смотреть на пачку» разглядывает её, в финале — по пачке в каждой руке.
   Том на автомате: спит → на «азот» прокалывает когтем запасную пачку (пшик, N₂), закатывает глаза, зевает, умывается, фейспалм. */
frame = frame25;
const CUE = {
  half: Wd('n01', 4), air: Wd('n01', 6), rob: Wd('n01', 8), azot: Wd('t01', 2), rancid: Wd('t01', 6), crumble: Wd('t01', 9), but: Wd('t01', 10), bla: Wd('t01', 14),
  grams: Wd('t02', 2), pack: Wd('t02', 3), price: Wd('t02', 6), less: Wd('t02', 11), shrink: Wd('t02', 14),
  stat: Wd('t03', 3), k25: Wd('t03', 10), smaller: Wd('t03', 20), choco: Wd('t03', 23),
  carf: Wd('t04', 4), warn: Wd('t04', 8), tea: Wd('t04', 9), l15: Wd('t04', 12), l125: Wd('t04', 15), plus40: Wd('t04', 22),
  nuB: Wd('n05', 2), honest: Wd('t05', 4), law: Wd('t05', 5), habit: Wd('t05', 12), pizd: Wd('n06', 0),
  perkg: Wd('t07', 8), small: Wd('t07', 11), compare: Wd('t07', 14), two: Wd('n08', 5), one: Wd('n08', 9),
  mat: Wd('t08', 0), exactly: Wd('t08', 1), sub: Wd('t09', 0), kg2: Wd('t09', 6), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.bla, 0.2, 6], [CUE.azot + 0.15, 0.25, 8], [CUE.shrink, 0.3, 10], [CUE.smaller, 0.25, 8], [CUE.plus40, 0.3, 10], [CUE.pizd, 0.3, 6], [CUE.compare, 0.25, 8], [CUE.mat, 0.5, 16]];
const EP = { title: ['ЧИПСЫ —', 'РАЗВОД?'], cens: { 'бля,': 'бл*,', '…Пиздец.': '…П*ЗДЕЦ.', '…Сука.': '…С*КА.' },
  hot: /^(чипсы|половина|воздух|обворовывают|азот|прогоркли|раскрошились|почти|граммами|пачка|цена|меньше|шринкфляция|британии|двух|половиной|тысяч|упаковка|шоколад|франции|карфур|полтора|литр|четвертью|сорок|процентов|честный|закон|привычка|граммы|килограмм|ценника|сравнивай|две|пачки|рассчитывали|кожаный)/i,
  hideMat: [['n06', '…Пиздец', CUE.pizd], ['t08', '…Сука', CUE.mat]] };
const GRADE = { sat: 1.15, con: 1.1, bri: 1.0 };
const TOMP = { x: 760, y: MTOP - 239, s: 0.62 }, NIKX = 380, NIKS = 0.95, NY = 1077;
const HOLD = { l: [-150, 300, 'open'], r: [150, 110, 'fist'] }, SHAKEF = { l: [-150, 300, 'open'], r: [175, -130, 'fist'] }, OFFER = { l: [-150, 300, 'open'], r: [205, -30, 'fist'] };
const LOOK = { l: [-150, 300, 'open'], r: [110, -150, 'fist'] }, TWOB = { l: [-175, -60, 'fist'], r: [175, -60, 'fist'] };
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const shake = t => Math.sin(t * 28) * 0.25;
const POP = () => CUE.azot + 0.1;
function tomLife(t) {
  const L = {};
  if (t < LN.t01.start + 0.3 || t > CUE.loop - 0.7) Object.assign(L, { lid: 1, tilt: 0.14, smirk: 0.2, ears: 0.15 });                       // спит на тёплом автомате
  if (t >= POP() - 0.4 && t < POP() + 0.5) { const k = sm(pr(t, POP() - 0.4, POP())); Object.assign(L, ET.sneaky, { paw: 1, pawX: lerp(170, 235, k), pawY: lerp(240, 300, k), lk: [0.9, 0.6] }); }   // прокалывает пачку
  if (t >= LN.n03.start && t < LN.n03.end + 0.2) Object.assign(L, ET.eyeroll);
  if (t >= LN.n04.start + 0.2 && t < LN.n04.end + 0.3) Object.assign(L, ET.yawn);
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= LN.n07.start && t < LN.t07.start + 0.2) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });
  if (t >= LN.n08.start && t < CUE.mat - 0.3) Object.assign(L, ET.stare, { lk: [-0.9, 0.5] });
  if (t >= CUE.exactly - 0.1 && t < LN.t09.start) Object.assign(L, ET.facepalm);
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t), popK2 = sm(pr(t, POP(), POP() + 0.3));
  plane(0, 2.4, () => nightOffice(t));
  plane(1, 1.35, () => corridor(t));
  plane(2, 1.0, () => {
    hallMid(t, { pop: popK2 });
    const n = nikO ? { arms: HOLD, ...nikO } : null;
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY, s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r); chipsBag(hx, hy - 50, 0.62, (n.shake ? shake(t) : 0.05) + (n.br ?? 0), { col: '#c8243c' });
        if (n.two) { const [lx, ly] = nikHand(P, n.arms.l); chipsBag(lx, ly - 50, 0.62, -0.08 + shake(t + 0.3) * 0.5, { col: '#2a8a4a' }); } }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(10,14,30,0.5)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF };
      layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m: tk.m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(10,14,30,0.5)' }); }
    puff(915, MTOP - 80, pr(t, POP(), POP() + 1.4));
  });
  onPlane(1.0, () => hallLight(t));
  if (o.fg !== false) plane(3, 0.6, () => hallFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, dx = 0, o = {}) => cam25(NIKX + dx + 30, 1120, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 600, 1050, o.z ?? 1.34, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(620, 1070, 1.25, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); } }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [CUE.rancid - 0.3, 'n2', 'flash'], [CUE.but - 0.1, 'almostW', 'whip'], [LN.n02.start - 0.05, 'nikQ', 'whip'],
  [LN.t02.start - 0.05, 'tomB', 'whip'], [CUE.pack - 0.3, 'shrinkI', 'iris'], [LN.n03.start - 0.05, 'dismissW', 'whip'], [LN.t03.start - 0.05, 'ons', 'fly'], [CUE.smaller - 0.3, 'onsB', 'whip'],
  [LN.n04.start - 0.05, 'yawnW', 'whip'], [LN.t04.start - 0.05, 'carf', 'iris'], [CUE.tea - 0.25, 'carfB', 'whip'], [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.nuB - 0.1, 'stareA'],
  [LN.t05.start - 0.05, 'tomD', 'whip'], [CUE.habit - 0.4, 'habitW', 'whip'], [LN.n06.start - 0.05, 'nikMat'], [LN.n07.start - 0.05, 'lickW', 'whip'], [LN.t07.start - 0.05, 'tomE', 'whip'],
  [CUE.perkg - 0.4, 'kg', 'iris'], [LN.n08.start - 0.05, 'twoW', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.exactly - 0.15, 'palmT'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.rob + 0.5)) }); scene(t, {}, { ...ex(t, [[0, EN.outrage], [CUE.air - 0.2, EN.outrage]]), arms: SHAKEF, shake: true }); },
  tomA(t) { TOM(lerp(2.1, 2.3, pr(t, LN.t01.start, CUE.rancid)), { cx: 0 }); scene(t, { ...ET.deadpan }, null); },
  n2: ins(n2Ins, { hand: 0.5 }),
  almostW(t) { TWO(); scene(t, { ...ET.sneaky, lk: [-0.8, 0.2] }, { ...ex(t, [[0, EN.doubt], [CUE.bla, EN.awe]]), arms: HOLD }); },
  nikQ(t) { NIK(2.0, 0, { Z: 0.05 }); scene(t, null, { ...EN.outrage, arms: SHAKEF, shake: true }); },
  tomB(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  shrinkI: ins(shrinkIns, { hand: 0.5 }),
  dismissW(t) { TWO(); scene(t, {}, { ...EN.dismiss, arms: HOLD }); },
  ons: ins(onsIns, { hand: 0.5 }),
  onsB: ins(onsIns, { hand: 0.5, zoom: [540, 1010, 1.05] }),
  yawnW(t) { TWO(); scene(t, {}, { ...EN.dismiss, arms: SHAKEF }); },
  carf: ins(carrefourIns, { hand: 0.5 }),
  carfB: ins(carrefourIns, { hand: 0.5, zoom: [540, 1010, 1.05] }),
  nuuW(t) { const k = sm(pr(t, LN.n05.start, LN.n05.start + 1.0)); TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuB) }); scene(t, {}, { ...EN.naive, arms: armsK(HOLD, OFFER, k), dx: 100 * k }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.nuB, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  tomD(t) { TOM(2.35); scene(t, { ...ex(t, [[0, ET.deadpan], [CUE.law, ET.smug]]) }, null); },
  habitW(t) { const k = sm(pr(t, CUE.habit - 0.4, CUE.habit + 0.3)); TWO({ Z: 0.05 }); scene(t, { ...ET.smug }, { ...EN.doubt, arms: armsK(OFFER, LOOK, k), dx: 100, lk: [0.6, -0.6] }); },
  nikMat(t) { NIK(2.1, 100, { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) }); scene(t, null, { ...EN.horror, jaw: 0.15, arms: LOOK, dx: 100, lid: 0.35 });
    if (t > CUE.pizd) { push(540, 420, 1, -0.04); ransom('П*ЗДЕЦ', 0, 0, 150, 19955, { reveal: pr(t, CUE.pizd, CUE.pizd + 0.2), pop: true }); pop(); } },
  lickW(t) { TWO(); scene(t, {}, { ...EN.worried, arms: HOLD, dx: 100 }); },
  tomE(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  kg: ins(kgIns, { hand: 0.5 }),
  twoW(t) { const k = sm(pr(t, CUE.two - 0.3, CUE.two + 0.3)); TWO({ Z: 0.05 * pr(t, LN.n08.start, LN.n08.end) });
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.one - 0.2, EMO(EN.proud, { grin: 0.5 })]]), two: k > 0.5, arms: k > 0.5 ? TWOB : armsK(HOLD, SHAKEF, k * 2), dx: 60 }); },
  stare(t) { TOM(lerp(2.3, 2.65, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare, lk: [-0.9, 0.5] }, null); },
  mat(t) { TOM(2.6, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('С*КА', 0, 0, 170, 19960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  palmT(t) { TOM(2.45); scene(t, {}, null); if (t > CUE.exactly + 0.4) { push(540, 400, popK(t, CUE.exactly + 0.4, 0.3), 0.03); ransom('НА ЭТО И РАСЧЁТ', 0, 0, 86, 19965, { reveal: 1, pop: true }); pop(); } },
  final(t) { WIDE(); const back = t > CUE.loop - 0.6;
    scene(t, ex(t, [[0, ET.deadpan], [CUE.kg2 - 0.3, EMO(ET.lecture, { lk: [-0.8, 0.4] })]]), back ? { ...EN.outrage, arms: SHAKEF, shake: true } : { ...EN.naive, two: true, arms: TWOB, dx: 60 });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 19970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ЕСТ ЧИПСЫ', 0, 0, 84, 19971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
