/* Эп. 16 «Свинцовый бензин — заговор?» — сцены по эталону ep12 v3, тон серьёзный (закат, гараж, лампочка).
   Никита с дедовой канистрой: несёт, тянет к Тому, пытается открыть крышку, ставит на пол, в финале стучит себе по голове («гениальный»).
   Том на тёплом капоте: спит, надевает противогаз на «опасен», «дышит» в противогазе на «минуту нюхал», снимает и зевает,
   лапой захлопывает крышку канистры на «не открывать», умывает лапу на «руки вымыть», фейспалм на «всё сходится». */
frame = frame25;
const CUE = {
  ded: Wd('n01', 0), better: Wd('n01', 5), prisadk: Wd('n01', 7), knock: Wd('n01', 11),
  lead: Wd('t01', 2), motor2: Wd('t01', 4), brains: Wd('t01', 10), bla: Wd('t01', 11), planet: Wd('t01', 13),
  danger: Wd('n02', 6), ban: Wd('n02', 10),
  seen: Wd('t02', 0), y24: Wd('t02', 4), plant: Wd('t02', 7), died: Wd('t02', 10), five: Wd('t02', 11), halluc: Wd('t02', 16), gas: Wd('t02', 17), nick: Wd('t02', 21),
  closed: Wd('t03', 1), inventor: Wd('t03', 3), wash: Wd('t03', 9), sniff: Wd('t03', 13), safe: Wd('t03', 17), before: Wd('t03', 21), poison: Wd('t03', 26),
  us: Wd('t04', 1), y96: Wd('t04', 5), last: Wd('t04', 8), algeria: Wd('t04', 12), y21: Wd('t04', 14),
  nuu: Wd('n05', 0), how: Wd('n05', 2), harm: Wd('n05', 5),
  study: Wd('t05', 0), m170: Wd('t05', 5), child: Wd('t05', 9), exhaust: Wd('t05', 13), minus: Wd('t05', 16), iq: Wd('t05', 22),
  mat2: Wd('n06', 0), canister: Wd('n07', 3),
  noopen: Wd('t07', 1), noburn: Wd('t07', 3), ditch: Wd('t07', 6), handin: Wd('t07', 9), hazard: Wd('t07', 11), hands: Wd('t07', 14),
  stop: Wd('n08', 0), y90: Wd('n08', 4), why: Wd('n08', 8), genius: Wd('n08', 11),
  mat: Wd('t08', 0), fits: Wd('t08', 1), sub: Wd('t09', 0), ded2: Wd('t09', 3), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.bla, 0.2, 6], [CUE.five, 0.3, 10], [CUE.nick, 0.3, 10], [CUE.closed, 0.3, 10], [CUE.before, 0.3, 8], [CUE.y21, 0.3, 8], [CUE.iq, 0.35, 12], [CUE.mat2, 0.3, 6], [CUE.noopen, 0.3, 10], [CUE.mat, 0.5, 16], [CUE.fits, 0.3, 8]];
const EP = { title: ['СВИНЦОВЫЙ', 'БЕНЗИН?'], cens: { 'бля,': 'бл*,', '…Блять.': '…БЛ*ТЬ.' },
  hot: /^(присадк|мотор|свинец|свинц|мозгам|планете|опасен|запретили|опасность|двадцать|пять|умерли|галлюцинац|бешеный|газ|миджли|облил|руки|минуту|нюхал|безопасно|год|отравлен|америке|девяносто|алжир|сто|семидесяти|миллион|iq|восемьсот|минус|канистр|открывать|жечь|канаву|сливать|сдать|опасные|отходы|вымыть|девяностых|гениальный|сходится|кожаный|деду)/i,
  hideMat: [['t08', '…Блять', CUE.mat]] };
const GRADE = { sat: 1.15, con: 1.1, bri: 1.0 };
const TOMP = { x: 720, y: HOOD - 239, s: 0.62 }, NIKX = 360, NIKS = 0.95, NY = 1077;
const CARRY = { l: [-150, 300, 'open'], r: [150, 250, 'fist'] };          // канистра в опущенной руке
const LIFT = { l: [-150, 300, 'open'], r: [205, -30, 'fist'] };           // поднял к Тому
const CHEST = { l: [-150, 300, 'open'], r: [170, 60, 'fist'] };           // держит перед собой
const DOWN = { l: [-150, 300, 'open'], r: [130, 300, 'open'] };           // руки свободны
const TAP = { l: [-150, 300, 'open'], r: [70, -190, 'point'] };           // стучит пальцем себе по голове
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });

const maskK = t => sm(pr(t, CUE.danger - 0.3, CUE.danger + 0.3)) * (1 - sm(pr(t, LN.n04.start, LN.n04.start + 0.35)));
const capOpen = t => t < CUE.canister ? 0 : t < CUE.noopen ? sm(pr(t, CUE.canister, CUE.canister + 0.8)) * 0.8 : 0;   // Никита откручивает — Том захлопывает
function tomLife(t) {
  const L = { mask: maskK(t) };
  if (t < LN.t01.start + 0.4 || t > CUE.loop - 0.8) Object.assign(L, { lid: 1, tilt: 0.14, smirk: 0.2, ears: 0.15 });                       // спит на тёплом капоте
  if (t >= LN.n04.start + 0.4 && t < LN.n04.end + 0.3) Object.assign(L, ET.yawn);
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= LN.n07.start && t < CUE.noopen - 0.4) Object.assign(L, ET.hunt, { lk: [-0.8, 0.8] });                                              // прищурился на канистру
  if (t >= CUE.noopen - 0.4 && t < CUE.noopen + 1.0) { const k = sm(pr(t, CUE.noopen - 0.4, CUE.noopen)), hit = t >= CUE.noopen;              // лапой — по крышке
    Object.assign(L, ET.deadpan, { flip: true, paw: 1, pawX: lerp(120, 150, k), pawY: lerp(120, hit ? 225 : 190, k), lk: [0.9, 0.7] }); }
  if (t >= CUE.hands - 0.1 && t < LN.n08.start + 0.3) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });   // «руки вымыть» — умывается
  if (t >= LN.n08.start + 0.3 && t < CUE.mat - 0.3) Object.assign(L, ET.stare, { lk: [-0.9, 0.5] });
  if (t >= CUE.fits - 0.1 && t < LN.t09.start) Object.assign(L, ET.facepalm);
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t);
  plane(0, 2.4, () => duskSky(t));
  plane(1, 1.35, () => gWall(t));
  plane(2, 1.0, () => {
    gMid(t, { lamp: o.lamp ?? 0 });
    const n = nikO ? { arms: CARRY, ...nikO } : null;
    if (n && n.can === false) jerrycan(NIKX + (n.dx ?? 0) + 170, 1450, 0.6, 0.04);
    if (!n && o.floorCan) jerrycan(NIKX + 230, 1450, 0.6, 0.04);
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY + (n.dy ?? 0), s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        if (n.can !== false) { const [hx, hy] = nikHand(P, n.arms.r); jerrycan(hx, hy + 10, 0.6, n.canR ?? 0.05, { open: capOpen(t) }); } }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(14,6,4,0.55)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF };
      layer(() => { const tk = talk('tom', t);
        tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m: tk.m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(14,6,4,0.55)' }); }
  });
  onPlane(1.0, () => gLight(t));
  if (o.fg !== false) plane(3, 0.6, () => gFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 20, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, dx = 0, o = {}) => cam25(NIKX + dx + 30, 1120, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 560, 1060, o.z ?? 1.34, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(590, 1080, 1.25, { dof: 5, ...o });
const ins = (fn, tl, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); }
  if (tl !== undefined) timeline16(tl, t); }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [CUE.brains - 0.6, 'smogLook', 'smoke'], [LN.n02.start - 0.05, 'canW', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'],
  [CUE.y24 - 0.1, 'bayA', 'flash'], [CUE.halluc - 0.5, 'bayB', 'whip'], [LN.n03.start - 0.05, 'nikFold', 'whip'], [LN.t03.start - 0.05, 'midA', 'smoke'], [CUE.inventor - 0.1, 'midB', 'flash'],
  [CUE.sniff - 0.1, 'tomSniff', 'whip'], [CUE.safe - 0.05, 'midC', 'whip'], [LN.n04.start - 0.05, 'yawnW', 'whip'], [LN.t04.start - 0.05, 'tomD', 'whip'], [CUE.y96 - 0.4, 'ban', 'iris'],
  [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.how - 0.1, 'stareA'], [LN.t05.start - 0.05, 'tomE', 'whip'], [CUE.m170 - 0.4, 'iqA', 'smoke'], [CUE.minus - 0.4, 'iqB', 'whip'],
  [LN.n06.start - 0.05, 'nikMat'], [LN.n07.start - 0.05, 'canOpen', 'whip'], [CUE.noopen - 0.45, 'slapW', 'whip'], [CUE.noburn - 0.3, 'waste', 'iris'], [CUE.hands - 0.15, 'lickT', 'whip'],
  [LN.n08.start - 0.05, 'genW', 'whip'], [CUE.why - 0.1, 'nikGen'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.fits - 0.1, 'palmT'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.knock + 0.3)) });                   // гараж деда, канистра, Том спит на капоте
    scene(t, { ...ET.deadpan }, { ...ex(t, [[0, EN.proud], [CUE.knock - 0.3, EMO(EN.proud, { grin: 0.5 })]]), arms: armsK(CARRY, CHEST, sm(pr(t, CUE.prisadk - 0.3, CUE.prisadk + 0.3))) }, { lamp: 0.6 }); },
  tomA(t) { TOM(lerp(2.15, 2.4, pr(t, LN.t01.start, CUE.brains)), { Z: 0.06 }); scene(t, { ...ex(t, [[0, ET.deadpan], [CUE.motor2, ET.lecture]]) }, null); },
  smogLook(t) { windowLook(t, 420, 940, lerp(1.9, 2.2, pr(t, CUE.brains, LN.n02.start)), { shake: shakeAt(t) });              // «по мозгам всей планете» — трасса в смоге
    if (t > CUE.planet) { push(540, 420, popK(t, CUE.planet, 0.3), -0.03); ransom('ВСЕЙ ПЛАНЕТЕ', 0, 0, 110, 16950, { reveal: 1, pop: true }); pop(); } },
  canW(t) { const k = sm(pr(t, CUE.danger - 0.8, CUE.danger)); TWO({ Z: 0.05 });                                                   // тянет канистру к Тому — Том надевает противогаз
    scene(t, {}, { ...EN.outrage, arms: armsK(CHEST, LIFT, k), dx: 80 * k }); },
  tomB(t) { TOM(2.35); scene(t, { ...ET.lecture }, null); },
  bayA: ins(bayIns, 1, { hand: 0.6 }),
  bayB: ins(bayIns, 1, { hand: 0.6, zoom: [540, 1020, 1.06] }),
  nikFold(t) { NIK(2.0, 80, { Z: 0.05 }); scene(t, null, { ...EN.naive, arms: CHEST, dx: 80 }); },
  midA: ins(midgleyIns, 1, { hand: 0.6 }),
  midB: ins(midgleyIns, 1, { hand: 0.6 }),
  tomSniff(t) { TOM(2.45, { Z: 0.06 * pr(t, CUE.sniff, CUE.safe) }); scene(t, { ...ET.deadpan, lk: [-0.2, 0], tilt: -0.05 * Math.sin(t * 3) }, null); },   // «минуту нюхал» — Том демонстративно дышит в противогазе
  midC: ins(midgleyIns, 1, { hand: 0.6, zoom: [540, 990, 1.04] }),
  yawnW(t) { TWO(); scene(t, {}, { ...EN.doubt, arms: CHEST, dx: 80 }); },
  tomD(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  ban: ins(banIns, 2, { hand: 0.6 }),
  nuuW(t) { TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.how) }); scene(t, {}, { ...EN.naive, arms: CARRY, dx: 40, lk: [0.5, -0.3] }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.how, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  tomE(t) { TOM(2.3); scene(t, { ...ET.grave }, null); },
  iqA: ins(iqIns, 4, { hand: 0.6 }),
  iqB: ins(iqIns, 4, { hand: 0.6, zoom: [540, 1000, 1.05] }),
  nikMat(t) { NIK(2.1, 40, { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) }); scene(t, null, { ...EN.horror, jaw: 0.15, arms: CARRY, dx: 40, lid: 0.35 });
    if (t > CUE.mat2) { push(540, 420, 1, -0.04); ransom('ТВОЮ Ж МАТЬ', 0, 0, 96, 16955, { reveal: pr(t, CUE.mat2, CUE.mat2 + 0.3), pop: true }); pop(); } },
  canOpen(t) { const k = sm(pr(t, LN.n07.start, LN.n07.start + 0.6)); TWO({ Z: 0.05 }); scene(t, {}, { ...EN.naive, arms: armsK(CARRY, LIFT, k), dx: 40 + 40 * k }); },
  slapW(t) { cam25(620, 1080, lerp(1.6, 1.72, pr(t, CUE.noopen - 0.45, CUE.noburn)), { shake: shakeAt(t), dof: 5 });           // «Не открывать» — лапой по крышке
    scene(t, {}, { ...ex(t, [[0, EN.naive], [CUE.noopen, EN.shock]]), arms: LIFT, dx: 80 }); },
  waste: ins(wasteIns, undefined, { hand: 0.5 }),
  lickT(t) { TOM(2.35); scene(t, { ...ET.deadpan }, null); },
  genW(t) { const k = sm(pr(t, LN.n08.start, LN.n08.start + 0.6)); TWO({ Z: 0.05 * pr(t, LN.n08.start, CUE.why) });           // ставит канистру, осеняет
    scene(t, {}, { ...ex(t, [[0, EN.awe], [CUE.y90, EN.eureka]]), can: k > 0.5 ? false : undefined, arms: k > 0.5 ? armsK(DOWN, TAP, sm(pr(t, CUE.y90, CUE.y90 + 0.5))) : LIFT, dx: 80 - 40 * k }); },
  nikGen(t) { NIK(2.0, 40, { Z: 0.06 * pr(t, CUE.why, LN.n08.end) }); scene(t, null, { ...EMO(EN.proud, { grin: 0.5, lid: 0.25 }), can: false, arms: TAP, dx: 40 }, { floorCan: true }); },
  stare(t) { TOM(lerp(2.3, 2.65, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare, lk: [-0.9, 0.5] }, null); },
  mat(t) { TOM(2.6, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('БЛ*ТЬ', 0, 0, 170, 16960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  palmT(t) { TOM(2.5, { shake: shakeAt(t) }); scene(t, {}, null);
    if (t > CUE.fits) { push(540, 400, popK(t, CUE.fits, 0.3), 0.03); ransom('ВСЁ СХОДИТСЯ', 0, 0, 110, 16965, { reveal: 1, pop: true }); pop(); } },
  final(t) { WIDE(); const back = t > CUE.loop - 0.6;
    scene(t, ex(t, [[0, ET.smug], [CUE.ded2 - 0.3, EMO(ET.lecture, { lk: [-0.8, 0.4] })]]), back ? { ...EN.proud, arms: CARRY } : { ...EN.eureka, can: false, arms: TAP, dx: 40 }, { lamp: back ? 0.6 : 0 });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 16970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ВЫРОС В 90-Х', 0, 0, 80, 16971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
