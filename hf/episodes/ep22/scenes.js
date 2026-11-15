/* Эп. 22 «Что будет, если долго не пердеть?» — сцены по эталону ep12 v3. Застрявший лифт, вечер.
   Никита держится за живот, телефон без сети; в финале «не терплю» — облако, блаженство. Том на переноске: смотрит с ужасом на «со мной, в запертой коробке»,
   морщится на «выдохнешь мне в лицо», умывается, закатывает глаза, долбит лапой кнопку вызова диспетчера, на выстреле — надевает противогаз. */
frame = frame25;
const CUE = {
  stuck: Wd('n01', 1), lunch: Wd('n01', 7), gas: Wd('n01', 9), burst: Wd('n01', 14), wait: Wd('t01', 7), relax: Wd('t01', 12), here: Wd('t01', 16), me: Wd('t01', 18), box: Wd('t01', 21),
  part: Wd('t02', 3), blood: Wd('t02', 7), lungs: Wd('t02', 11), exhale: Wd('t02', 16), face: Wd('t02', 19), fu: Wd('n03', 0), tear: Wd('n03', 7),
  gastro: Wd('t03', 2), bloat: Wd('t03', 8), spasm: Wd('t03', 12), scary: Wd('t03', 15), nhs: Wd('t04', 4), five: Wd('t04', 8), fifteen: Wd('t04', 10), gasL: Wd('t04', 15), half: Wd('t04', 20), twoL: Wd('t04', 22),
  nuB: Wd('n05', 3), ninety: Wd('t05', 2), odorless: Wd('t05', 9), azot: Wd('t05', 10), stink: Wd('t05', 15), h2s: Wd('t05', 19), bla: Wd('n06', 3), balloon: Wd('n06', 6),
  away: Wd('t07', 0), release: Wd('t07', 6), pain: Wd('t07', 12), doctor: Wd('t07', 20), notsuffer: Wd('n08', 5),
  mat: Wd('t08', 0), said: Wd('t08', 4), nobody: Wd('t08', 7), sub: Wd('t09', 0), lift: Wd('t09', 2), moved: Wd('t09', 4), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
CUE.fart = LN.n08.end + 0.35;
const SHAKES = [[CUE.box, 0.25, 6], [CUE.face, 0.25, 6], [CUE.scary, 0.3, 8], [CUE.twoL, 0.25, 8], [CUE.h2s, 0.3, 10], [CUE.balloon, 0.3, 8], [CUE.fart, 0.6, 14], [CUE.mat, 0.5, 16], [CUE.moved, 0.4, 6]];
const EP = { title: ['ЧТО БУДЕТ, ЕСЛИ', 'НЕ ПЕРДЕТЬ?'], cens: { 'блять,': 'бл*ть,', '…Ёб': '…Ё*' },
  hot: /^(лифт|застрял|терплю|газы|лопну|лопнешь|подождёт|расслабишься|запертой|коробке|кровь|лёгкие|выдохнешь|лицо|порвёт|раздует|спазмом|страшилка|пяти|пятнадцати|полулитра|двух|литров|бутылка|девяносто|девять|пахнут|вонь|одного|сероводород|газовый|баллон|никого|выпустить|врачу|вредно|поехал|кожаный)/i,
  hideMat: [['t08', '…Ёб', CUE.mat]] };
const GRADE = { sat: 1.15, con: 1.1, bri: 1.0 };
const TOMP = { x: 840, y: CARRY_TOP - 239, s: 0.62 }, NIKX = 400, NIKS = 0.95, NY = 1077;
const STRAIN = { l: [-40, 200, 'belly'], r: [150, -40, 'phone'] }, BELLY2 = { l: [-40, 200, 'belly'], r: [40, 210, 'belly'] }, OPEN = { l: [-170, 120, 'open'], r: [170, 120, 'open'] };
const flick = t => (t < CUE.moved - 0.3 && Math.sin(t * 9) * Math.sin(t * 2.3) > 0.75) ? 0 : 1;
const gasK = t => t < CUE.fart ? 0 : Math.min(2, (t - CUE.fart) / 1.2);
const maskK = t => sm(pr(t, CUE.fart + 0.1, CUE.fart + 0.45));
function tomLife(t) {
  const L = { mask: maskK(t) };
  if (t < LN.t01.start) Object.assign(L, ET.deadpan, { lk: [-0.8, 0.3] });
  if (t >= CUE.here - 0.2 && t < LN.n02.start) Object.assign(L, ET.alarm, { lk: [-0.9, 0.4] });
  if (t >= CUE.exhale && t < CUE.face + 0.8) Object.assign(L, ET.disgust, { lk: [-0.8, 0.2] });
  if (t >= LN.n03.start + 0.4 && t < LN.t03.start) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });
  if (t >= LN.n04.start && t < LN.n04.end + 0.4) Object.assign(L, ET.eyeroll);
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= LN.n07.start && t < LN.t07.start + 0.3) Object.assign(L, ET.alarm, { paw: 1, pawX: 225 + 12 * Math.sin(t * 14), pawY: -50, lk: [0.9, -0.3] });      // долбит кнопку вызова
  if (t >= LN.n08.start && t < CUE.fart) Object.assign(L, ET.alarm, { lk: [-0.9, 0.4] });
  if (t >= CUE.fart && t < CUE.mat - 0.2) Object.assign(L, ET.fear, { lk: [-0.9, 0.3] });
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t), fl = flick(t), call = t >= LN.n07.start && t < LN.t07.start + 0.3 ? 0.6 + 0.4 * Math.sin(t * 14) : 0, moving = t > CUE.moved - 0.2;
  const C = { fl, call, floor: moving ? 7 - Math.min(3, Math.floor((t - CUE.moved + 0.2) * 3)) : 7, dir: moving ? -1 : 0 };
  plane(0, 2.4, () => mirrorRefl(t, C));
  plane(1, 1.35, () => cabin(t, C));
  plane(2, 1.0, () => {
    cabFloor(t);
    const n = nikO ? { arms: STRAIN, ...nikO } : null;
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY, s: NIKS }, sq = n.squirm ? 0.05 * Math.sin(t * 7) : 0;
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt + sq, phoneLit: true, ...n }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(10,10,10,0.5)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF };
      layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m: tk.m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(10,10,10,0.5)' }); }
    gasCloud(NIKX - 20, 1300, gasK(t), t);
  });
  onPlane(1.0, () => cabLight(t, { fl, em: call, gas: Math.min(1, gasK(t)) }));
  if (o.fg !== false) plane(3, 0.6, () => cabFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 20, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, dx = 0, o = {}) => cam25(NIKX + dx + 30, 1120, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 610, 1060, o.z ?? 1.32, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(620, 1080, 1.24, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); } }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [CUE.here - 0.25, 'boxW', 'whip'], [LN.n02.start - 0.05, 'nikHope', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'],
  [CUE.part - 0.3, 'route', 'iris'], [CUE.face - 0.4, 'faceT', 'whip'], [LN.n03.start - 0.05, 'fuW', 'whip'], [LN.t03.start - 0.05, 'tomC', 'whip'], [CUE.bloat - 0.6, 'myth', 'iris'],
  [LN.n04.start - 0.05, 'eyeW', 'whip'], [LN.t04.start - 0.05, 'count', 'flash'], [CUE.gasL - 0.3, 'countB', 'whip'], [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.nuB - 0.1, 'stareA'],
  [LN.t05.start - 0.05, 'comp', 'iris'], [CUE.stink - 0.3, 'compB', 'whip'], [LN.n06.start - 0.05, 'nikMat'], [LN.n07.start - 0.05, 'callW', 'whip'], [LN.t07.start - 0.05, 'advice', 'iris'],
  [LN.n08.start - 0.05, 'reliefW', 'whip'], [CUE.mat - 0.15, 'mat'], [CUE.said - 0.1, 'nobodyW', 'whip'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.burst + 0.4)) }); scene(t, {}, { ...ex(t, [[0, EN.panic], [CUE.gas - 0.2, EMO(EN.panic, { browIn: -14 })]]), squirm: true }); },
  tomA(t) { TOM(lerp(2.1, 2.3, pr(t, LN.t01.start, CUE.here))); scene(t, { ...ET.deadpan }, null); },
  boxW(t) { TWO({ Z: 0.12 * pr(t, CUE.here, LN.n02.start) }); scene(t, {}, { ...EN.worried, arms: BELLY2, squirm: true });
    if (t > CUE.box) { push(540, 400, popK(t, CUE.box, 0.3), -0.03); ransom('В ЗАПЕРТОЙ КОРОБКЕ', 0, 0, 74, 22950, { reveal: 1, pop: true }); pop(); } },
  nikHope(t) { NIK(2.0, 0, { Z: 0.05 }); scene(t, null, { ...EN.naive, arms: BELLY2, squirm: true }); },
  tomB(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  route: ins(routeIns, { hand: 0.5 }),
  faceT(t) { TOM(2.5, { shake: shakeAt(t) }); scene(t, {}, null); },
  fuW(t) { TWO(); scene(t, {}, { ...ex(t, [[0, EN.eww], [CUE.tear - 0.4, EN.horror]]), arms: BELLY2, squirm: true }); },
  tomC(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  myth: ins(mythIns, { hand: 0.5 }),
  eyeW(t) { TWO(); scene(t, {}, { ...EN.proud, arms: STRAIN, squirm: true }); },
  count: ins(countIns, { hand: 0.5 }),
  countB: ins(countIns, { hand: 0.5, zoom: [540, 1000, 1.05] }),
  nuuW(t) { TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuB) }); scene(t, {}, { ...EN.awe, arms: BELLY2, squirm: true }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.nuB, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  comp: ins(compIns, { hand: 0.5 }),
  compB: ins(compIns, { hand: 0.5, zoom: [540, 1000, 1.05] }),
  nikMat(t) { NIK(2.1, 0, { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) }); scene(t, null, { ...EN.horror, jaw: 0.15, arms: BELLY2, lid: 0.35 });
    if (t > CUE.balloon) { push(540, 420, popK(t, CUE.balloon, 0.3), -0.04); ransom('ГАЗОВЫЙ БАЛЛОН', 0, 0, 96, 22955, { reveal: 1, pop: true }); pop(); } },
  callW(t) { cam25(720, 1050, 1.5, { dof: 5 }); scene(t, {}, { ...EN.panic, arms: BELLY2, squirm: true }); },
  advice: ins(adviceIns, { hand: 0.5 }),
  reliefW(t) { const k = sm(pr(t, CUE.fart - 0.1, CUE.fart + 0.4)); TWO({ shake: shakeAt(t), Z: 0.05 * pr(t, LN.n08.start, CUE.mat) });
    scene(t, {}, { ...(k > 0.5 ? EMO(EN.proud, { lid: 0.75, grin: 0.4, brow: 0.6 }) : EN.eureka), arms: k > 0.5 ? OPEN : STRAIN, squirm: k < 0.5 });
    if (t > CUE.fart + 0.2) { push(540, 400, popK(t, CUE.fart + 0.2, 0.3), 0.04); ransom('ПФФФ…', 0, 0, 130, 22958, { reveal: 1, pop: true }); pop(); } },
  mat(t) { TOM(2.55, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('Ё* ТВОЮ', 0, 0, 150, 22960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); push(560, 540, 1, 0.03); ransom('МАТЬ', 0, 0, 150, 22961, { reveal: pr(t, CUE.mat + 0.2, CUE.mat + 0.4), pop: true }); pop(); } },
  nobodyW(t) { TWO({ shake: shakeAt(t) }); scene(t, { ...ET.furious }, { ...EMO(EN.proud, { lid: 0.75, grin: 0.3 }), arms: OPEN });
    if (t > CUE.nobody) { push(540, 400, popK(t, CUE.nobody, 0.3), -0.03); ransom('ГДЕ НИКОГО НЕТ', 0, 0, 96, 22962, { reveal: 1, pop: true }); pop(); } },
  final(t) { WIDE({ shake: shakeAt(t) }); const back = t > CUE.loop - 0.6;
    scene(t, { ...ET.deadpan }, back ? { ...EN.panic, squirm: true } : { ...EMO(EN.proud, { lid: 0.6 }), arms: OPEN });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 22970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ТЕРПИТ ДО ДОМА', 0, 0, 74, 22971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
