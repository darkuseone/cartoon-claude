/* Эп. 23 «Кот пьёт неправильно?» — сцены по эталону ep12 v3. Дачная веранда на закате.
   Никита: со шваброй (весь пол мокрый), потом с миской: показывает её, на «как надо» отодвигает от еды, в финале на коленях «лакать вместе».
   Том на лавке: лакает из тазика под капающим краном (брызги), обижается на «идиот», объясняет физику, зевает, в финале снова лакает. */
frame = frame25;
const CUE = {
  idiot: Wd('n01', 3), slap: Wd('n01', 4), wet: Wd('n01', 8), nothing: Wd('n01', 12), all: Wd('t01', 2), vacuum: Wd('t01', 7), physics: Wd('t01', 13),
  dal: Wd('n02', 0), touch: Wd('n02', 9), exactly: Wd('t02', 1), mit: Wd('t02', 4), camera: Wd('t02', 9), tip: Wd('t02', 10), column: Wd('t02', 22), close: Wd('t02', 25),
  four: Wd('t03', 0), tenth: Wd('t03', 6), repeat: Wd('t03', 8), bowlN: Wd('n04', 11), desert: Wd('t04', 4), prey: Wd('t04', 10), weak: Wd('t04', 15),
  nuB: Wd('n05', 2), tap: Wd('n05', 6), close5: Wd('t05', 5), away: Wd('t05', 11), dirty: Wd('t05', 19), flow: Wd('t05', 21), wrong: Wd('n06', 5),
  wide: Wd('t07', 0), away2: Wd('t07', 3), fountain: Wd('t07', 7), wet2: Wd('t07', 9), vet: Wd('t07', 19), bath: Wd('n08', 4), lap: Wd('n08', 9), physics8: Wd('n08', 14),
  mat: Wd('t08', 0), mine: Wd('t08', 4), sub: Wd('t09', 0), move: Wd('t09', 3), loop: LN.t09.end + 0.3
};
CUE.wet = Wd('n01', 8);
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.idiot, 0.2, 6], [CUE.vacuum, 0.25, 6], [CUE.column, 0.25, 6], [CUE.repeat, 0.3, 8], [CUE.weak, 0.25, 6], [CUE.close5, 0.25, 8], [CUE.mat, 0.5, 16], [CUE.mine, 0.25, 8]];
const EP = { title: ['КОТ ПЬЁТ', 'НЕПРАВИЛЬНО?'], cens: { '…Блять.': '…БЛ*ТЬ.' },
  hot: /^(идиот|мокрый|ничего|всё|пылесос|физики|касаешься|массачусетского|скоростной|кончик|столбик|пасть|четыре|секунду|десятой|миллилитра|повтори|пустыне|добычи|жажду|слабо|крана|вплотную|подальше|грязной|проточную|широкую|неглубокую|фонтанчик|влажный|восьмидесяти|ветеринару|лакать|физике|моей|кожаный|отодвинь)/i,
  hideMat: [['t08', '…Блять', CUE.mat]] };
const GRADE = { sat: 1.25, con: 1.06, bri: 1.0 };
const TOMP = { x: 900, y: BENCH - 239, s: 0.62 }, NIKX = 400, NIKS = 0.95;
const NY = legs => legs === 'kneel' ? 1128 : 1077;
const MOP = { l: [-60, 120, 'fist'], r: [120, 40, 'fist'] }, POINT = { l: [-150, 300, 'open'], r: [205, -60, 'point'] }, SHOWB = { l: [-150, 300, 'open'], r: [190, -40, 'fist'] };
const HOLDB = { l: [-150, 300, 'open'], r: [150, 120, 'fist'] }, DOWNB = { l: [-150, 300, 'open'], r: [200, 300, 'fist'] }, FACEB = { l: [-150, 300, 'open'], r: [80, -10, 'fist'] };
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const lapping = t => t < LN.t01.start || (t >= LN.n02.start && t < LN.t02.start) || t >= LN.t09.start + 0.3;
const waterX = t => t < CUE.away2 - 0.3 ? 640 : t < LN.n08.start ? lerp(640, 1180, sm(pr(t, CUE.away2 - 0.3, CUE.away2 + 0.6))) : 1180;
const bowlHeld = t => (t >= LN.n04.start - 0.2 && t < CUE.away2 - 0.3) || t >= LN.n08.start;
function tomLife(t) {
  const L = {};
  if (lapping(t)) { const k = Math.sin(t * 6.283 * 2) > 0 ? 1 : 0.2; Object.assign(L, { lid: 0.55, lk: [0, 1], hb: 46, tongue: k, smirk: 0.2, tilt: 0.04 }); }   // лакает 4 раза в секунду
  if (t >= CUE.idiot && t < LN.t01.start) Object.assign(L, ET.disgust, { hb: 0, tongue: 0, lk: [-0.8, 0] });
  if (t >= LN.n03.start && t < LN.t03.start) Object.assign(L, ET.smug);
  if (t >= LN.n04.start && t < LN.n04.end + 0.3) Object.assign(L, ET.eyeroll);
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= LN.n07.start && t < LN.n07.end + 0.4) Object.assign(L, ET.yawn);
  if (t >= LN.n08.start && t < CUE.mat - 0.3) Object.assign(L, ET.stare, { lk: [-0.9, 0.6] });
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t);
  plane(0, 2.4, () => garden(t));
  plane(1, 1.35, () => veranda(t));
  plane(2, 1.0, () => {
    deck(t, { basin: false, waterX: bowlHeld(t) ? -999 : waterX(t) });
    const n = nikO ? { arms: MOP, legs: 'stand', ...nikO } : null;
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY(n.legs), s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r); if (n.prop === 'mop') mop(hx, hy + 40, 0.9, 0.25 + 0.15 * Math.sin(t * 3)); else if (n.prop === 'bowl') bowlP(hx, hy - 4, 0.7, { seed: 5 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(40,20,10,0.45)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF }, hb = life.hb ?? 0; delete life.hb;
      layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m: tk.m, bob: tk.bob + br.bob + (tk.m.talking ? 0 : hb), tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(40,20,10,0.45)' }); }
    basin(880, BENCH, 0.9, t, { splash: lapping(t) && Math.sin(t * 6.283 * 2) > 0.3 });
  });
  onPlane(1.0, () => deckLight(t));
  if (o.fg !== false) plane(3, 0.6, () => deckFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 20, TOMP.y + 120, z, { dof: 6, ...o });
const NIK = (z, dx = 0, legs = 'stand', o = {}) => cam25(NIKX + dx + 30, NY(legs) + 43, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 630, 1080, o.z ?? 1.3, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(640, 1090, 1.22, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); } }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [LN.n02.start - 0.05, 'lapW', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'], [CUE.camera - 0.3, 'phys', 'iris'],
  [LN.n03.start - 0.05, 'nikQ', 'whip'], [LN.t03.start - 0.05, 'rate', 'flash'], [LN.n04.start - 0.05, 'bowlW', 'whip'], [LN.t04.start - 0.05, 'tomC', 'whip'], [CUE.desert - 0.3, 'desert', 'iris'],
  [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.nuB - 0.1, 'stareA'], [LN.t05.start - 0.05, 'tomD', 'whip'], [CUE.close5 - 0.4, 'bowlI', 'iris'], [LN.n06.start - 0.05, 'nikGuilty'],
  [LN.n07.start - 0.05, 'yawnW', 'whip'], [LN.t07.start - 0.05, 'moveW', 'whip'], [CUE.fountain - 0.3, 'advice', 'iris'], [LN.n08.start - 0.05, 'kneelW', 'whip'], [LN.n08.end + 0.06, 'stare'],
  [CUE.mat - 0.3, 'mat'], [CUE.mine - 0.2, 'mineT'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.nothing + 0.4)) }); scene(t, {}, { ...ex(t, [[0, EN.dismiss], [CUE.wet - 0.2, EN.outrage]]), prop: 'mop', arms: MOP }); },
  tomA(t) { TOM(lerp(2.1, 2.3, pr(t, LN.t01.start, LN.t01.end))); scene(t, { ...ex(t, [[0, ET.disgust], [CUE.vacuum, ET.smug]]) }, null); },
  lapW(t) { TWO({ Z: 0.05 }); scene(t, {}, { ...EN.dismiss, prop: 'mop', arms: armsK(MOP, POINT, sm(pr(t, CUE.touch - 0.8, CUE.touch))) }); },
  tomB(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  phys: ins(physicsIns, { hand: 0.5 }),
  nikQ(t) { NIK(2.0, 0, 'stand', { Z: 0.05 }); scene(t, null, { ...EN.awe, prop: 'mop', arms: MOP }); },
  rate: ins(rateIns, { hand: 0.5 }),
  bowlW(t) { const k = sm(pr(t, LN.n04.start, LN.n04.start + 0.6)); TWO(); scene(t, {}, { ...EN.outrage, prop: 'bowl', arms: armsK(HOLDB, SHOWB, k), dx: 60 * k }); },
  tomC(t) { TOM(2.3); scene(t, { ...ET.grave }, null); },
  desert: ins(desertIns, { hand: 0.5 }),
  nuuW(t) { TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuB) }); scene(t, {}, { ...EN.naive, prop: 'bowl', arms: armsK(SHOWB, POINT, sm(pr(t, LN.n05.start, LN.n05.start + 0.8))), dx: 60 }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.nuB, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  tomD(t) { TOM(2.35); scene(t, { ...ET.smug }, null); },
  bowlI: ins(bowlIns, { hand: 0.5 }),
  nikGuilty(t) { NIK(2.1, 60, 'stand', { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) }); scene(t, null, { ...EN.sad, prop: 'bowl', arms: HOLDB, dx: 60 }); },
  yawnW(t) { TWO(); scene(t, {}, { ...EN.worried, prop: 'bowl', arms: HOLDB, dx: 60 }); },
  moveW(t) { const k = sm(pr(t, CUE.wide, CUE.away2 - 0.3)); cam25(800, 1150, 1.25, { dof: 5 }); scene(t, { ...ET.lecture }, { ...EN.naive, prop: t < CUE.away2 - 0.3 ? 'bowl' : null, arms: armsK(HOLDB, DOWNB, k), dx: lerp(60, 640, sm(pr(t, CUE.away2 - 0.3, CUE.away2 + 0.6))) }); },
  advice: ins(adviceIns, { hand: 0.5 }),
  kneelW(t) { const k = sm(pr(t, CUE.bath, CUE.bath + 0.6)); TWO({ Z: 0.05 * pr(t, LN.n08.start, LN.n08.end) });
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.lap - 0.2, EMO(EN.proud, { grin: 0.5 })]]), legs: k > 0.5 ? 'kneel' : 'stand', prop: 'bowl', arms: k > 0.5 ? FACEB : SHOWB, dx: 120 }); },
  stare(t) { TOM(lerp(2.3, 2.65, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare, lk: [-0.9, 0.6] }, null); },
  mat(t) { TOM(2.6, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('БЛ*ТЬ', 0, 0, 170, 23960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  mineT(t) { TOM(2.45, { shake: shakeAt(t) }); scene(t, { ...ET.deadpan, lk: [-0.9, 0.4] }, null); if (t > CUE.mine) { push(540, 420, popK(t, CUE.mine, 0.3), 0.03); ransom('НЕ ИЗ МОЕЙ', 0, 0, 120, 23965, { reveal: 1, pop: true }); pop(); } },
  final(t) { WIDE(); const back = t > CUE.loop - 0.6;
    scene(t, ex(t, [[0, ET.deadpan], [CUE.move - 0.3, EMO(ET.lecture, { lk: [-0.8, 0.4] })]]), back ? { ...EN.dismiss, prop: 'mop', arms: MOP } : { ...EN.sad, legs: 'kneel', prop: 'bowl', arms: FACEB, dx: 120 });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 23970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('У КОГО ЕСТЬ КОТ', 0, 0, 84, 23971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
