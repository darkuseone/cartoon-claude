/* Эп. 21 «Жвачка — 7 лет в желудке?» — сцены по эталону ep12 v3. Полдень, озеро, мостки.
   Никита: в панике с пачкой жвачки, ест бутерброд «перед купанием», в финале — по пачке в каждой руке «для плавучести».
   Том на сумке-холодильнике: рыбачит лапой, на «семь лет!» вытаскивает рыбу, держит её как указку, потом съедает; зевает, фейспалм. */
frame = frame25;
const CUE = {
  gum: Wd('n01', 1), seven: Wd('n01', 4), stomach: Wd('n01', 9), notdig: Wd('t01', 4), stuck: Wd('t01', 8), days: Wd('t01', 11), out: Wd('t01', 12), bla: Wd('t01', 13),
  dal: Wd('n02', 0), seven2: Wd('n02', 6), nocheck: Wd('t02', 4), myth: Wd('t02', 9), problem: Wd('t02', 10), often: Wd('t02', 16),
  y98: Wd('t03', 1), three: Wd('t03', 7), handfuls: Wd('t03', 11), plug: Wd('t03', 14), girl: Wd('t03', 17), coins: Wd('t03', 22),
  after: Wd('n04', 2), drown: Wd('n04', 7), myth2: Wd('t04', 1), red: Wd('t04', 3), y50: Wd('t04', 10), notCause: Wd('t04', 16),
  nuB: Wd('n05', 2), blood: Wd('n05', 4), nausea: Wd('t05', 6), tonut: Wd('t05', 11), pizd: Wd('n06', 0),
  alone: Wd('t07', 1), noguard: Wd('t07', 5), dive: Wd('t07', 7), sandw: Wd('t07', 17), water: Wd('n08', 7), two: Wd('n08', 8), float: Wd('n08', 11),
  mat: Wd('t08', 0), inflat: Wd('t08', 3), sub: Wd('t09', 0), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.bla, 0.2, 6], [CUE.seven2 + 0.3, 0.25, 8], [CUE.myth, 0.3, 10], [CUE.plug, 0.25, 8], [CUE.notCause, 0.3, 10], [CUE.pizd, 0.3, 6], [CUE.mat, 0.5, 16], [CUE.inflat, 0.25, 8]];
const EP = { title: ['ЖВАЧКА — 7 ЛЕТ', 'В ЖЕЛУДКЕ?'], cens: { 'бля,': 'бл*,', '…Пиздец.': '…П*ЗДЕЦ.', '…Блять.': '…БЛ*ТЬ.' },
  hot: /^(жвачку|семь|желудке|переваривается|застревает|пару|дней|проверял|миф|постоянно|помногу|девяносто|педиатрия|трёх|горстями|пробку|монетками|час|утонешь|красный|крест|пятьдесят|причина|утоплений|подташнивает|смертельно|бутерброда|одному|спасателей|нырять|глубину|плавучести|надувная|кожаный|дна)/i,
  hideMat: [['n06', '…Пиздец', CUE.pizd], ['t08', '…Блять', CUE.mat]] };
const GRADE = { sat: 1.25, con: 1.06, bri: 1.0 };                      // летний полдень — сочнее, но без «детской» кислотности
const TOMP = { x: 860, y: LTOP - 239, s: 0.62 }, NIKX = 400, NIKS = 0.95, NY = 1077;
const PANIC = { l: [-150, 300, 'open'], r: [170, -140, 'fist'] }, HOLD = { l: [-150, 300, 'open'], r: [150, 110, 'fist'] }, EAT = { l: [-150, 300, 'open'], r: [70, -40, 'fist'] };
const TWOB = { l: [-175, -80, 'fist'], r: [175, -80, 'fist'] }, OFFER = { l: [-150, 300, 'open'], r: [200, -20, 'fist'] };
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const eatArms = (t, t0) => { const u = (t - t0) % 2.4; return armsK(HOLD, EAT, sm(pr(u, 0.2, 0.6)) * (1 - sm(pr(u, 1.2, 1.6)))); };
const CATCH = () => CUE.seven2;
function fishAt(t) { const c = CATCH(), P = [TOMP.x + 90 * 0.62 + 20, TOMP.y + 120 * 0.62]; if (t < c - 0.1) return null;
  if (t < c + 0.4) { const k = (t - c + 0.1) / 0.5; return { x: lerp(1060, P[0], k), y: lerp(1420, P[1], k) - 200 * Math.sin(Math.PI * k), r: 6 * k, left: 1 }; }
  const left = 1 - sm(pr(t, LN.n04.start, LN.t04.end)); return left > 0.05 ? { x: P[0], y: P[1], r: -1.3 + 0.1 * Math.sin(t * 6), left } : null; }
function tomLife(t) {
  const L = {}, c = CATCH();
  if (t < LN.t01.start || (t >= LN.n02.start && t < c)) Object.assign(L, ET.hunt, { paw: 1, pawX: 210, pawY: 300 + 25 * Math.sin(t * 7), lk: [0.8, 0.9] });   // рыбачит
  if (t >= c - 0.1 && t < LN.n05.start) Object.assign(L, { paw: 1, pawX: 90, pawY: 120 });                                                                       // рыба в лапе
  if (t >= c && t < c + 0.8) Object.assign(L, ET.smug, { lk: [0.6, 0.2] });
  if (t >= LN.n04.start && t < LN.t04.end && !talk('tom', t).m.talking) { const ch = Math.abs(Math.sin(t * 11)); L.m = { open: 0.12 + 0.25 * ch, round: 0.1 }; }   // жуёт рыбу
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= LN.n07.start + 0.2 && t < LN.n07.end + 0.3) Object.assign(L, ET.yawn);
  if (t >= LN.n08.start && t < CUE.mat - 0.3) Object.assign(L, ET.stare, { lk: [-0.9, 0.5] });
  if (t >= CUE.inflat - 0.1 && t < LN.t09.start) Object.assign(L, ET.facepalm);
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t), F = fishAt(t);
  plane(0, 2.4, () => summerSky(t));
  plane(1, 1.35, () => lake(t));
  plane(2, 1.0, () => {
    pier(t);
    const n = nikO ? { arms: HOLD, ...nikO } : null;
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY, s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r); if (n.prop === 'sand') sandwich(hx, hy - 24, 0.6, 0.05, { bite: n.bite ?? 0 }); else gumPack(hx, hy - 30, 0.62, n.gr ?? 0.1);
        if (n.two) { const [lx, ly] = nikHand(P, n.arms.l); gumPack(lx, ly - 30, 0.62, -0.1); } }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(20,40,60,0.35)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF }, lm = life.m; delete life.m;
      layer(() => { const tk = talk('tom', t), m = (lm && tk.m.open < 0.05) ? lm : tk.m;
        tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 });
        if (F) fish(F.x, F.y, 0.55, F.r, { left: F.left }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(20,40,60,0.35)' }); }
  });
  onPlane(1.0, () => pierLight(t));
  if (o.fg !== false) plane(3, 0.6, () => pierFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 10, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, dx = 0, o = {}) => cam25(NIKX + dx + 30, 1120, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 620, 1060, o.z ?? 1.3, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(630, 1070, 1.22, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); } }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [CUE.notdig - 0.3, 'gut', 'iris'], [LN.n02.start - 0.05, 'catchW', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'],
  [CUE.myth - 0.4, 'mythI', 'flash'], [LN.n03.start - 0.05, 'nikQ', 'whip'], [LN.t03.start - 0.05, 'ped', 'fly'], [CUE.plug - 0.3, 'pedB', 'whip'], [LN.n04.start - 0.05, 'sandW', 'whip'],
  [LN.t04.start - 0.05, 'tomC', 'whip'], [CUE.red - 0.3, 'redI', 'iris'], [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.nuB - 0.1, 'stareA'], [LN.t05.start - 0.05, 'tomD', 'whip'],
  [CUE.tonut - 0.2, 'biteW', 'whip'], [LN.n06.start - 0.05, 'nikMat'], [LN.n07.start - 0.05, 'yawnW', 'whip'], [LN.t07.start - 0.05, 'towerLook', 'whip'], [CUE.dive - 0.3, 'safe', 'iris'],
  [LN.n08.start - 0.05, 'floatW', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.inflat - 0.15, 'palmT'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.stomach + 0.4)) }); scene(t, {}, { ...ex(t, [[0, EN.panic], [CUE.seven - 0.2, EN.horror]]), arms: PANIC }); },
  tomA(t) { TOM(lerp(2.1, 2.3, pr(t, LN.t01.start, CUE.notdig))); scene(t, { ...ET.deadpan }, null); },
  gut: ins(gutIns, { hand: 0.5 }),
  catchW(t) { TWO({ shake: shakeAt(t) }); scene(t, {}, { ...ex(t, [[0, EN.outrage], [CUE.seven2 + 0.3, EN.shock]]), arms: PANIC }); },
  tomB(t) { TOM(2.3); scene(t, { ...ET.lecture, paw: 1, pawX: 90, pawY: 120 }, null); },
  mythI: ins(mythIns, { hand: 0.5 }),
  nikQ(t) { NIK(2.0, 0, { Z: 0.05 }); scene(t, null, { ...EN.naive, arms: HOLD }); },
  ped: ins(pedIns, { hand: 0.5 }),
  pedB: ins(pedIns, { hand: 0.5, zoom: [540, 1010, 1.05] }),
  sandW(t) { TWO(); scene(t, {}, { ...EN.doubt, prop: 'sand', arms: eatArms(t, LN.n04.start), bite: 0.3 }); },
  tomC(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  redI: ins(redIns, { hand: 0.5 }),
  nuuW(t) { TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuB) }); scene(t, {}, { ...EN.naive, prop: 'sand', arms: armsK(HOLD, OFFER, sm(pr(t, LN.n05.start, LN.n05.start + 1))), dx: 80, bite: 0.4 }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.nuB, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  tomD(t) { TOM(2.3); scene(t, { ...ex(t, [[0, ET.deadpan], [CUE.nausea, ET.smug]]) }, null); },
  biteW(t) { TWO({ Z: 0.05 }); scene(t, { ...ET.smug }, { ...EN.awe, prop: 'sand', arms: eatArms(t, CUE.tonut - 0.2), dx: 80, bite: 0.6 }); },
  nikMat(t) { NIK(2.1, 80, { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) }); scene(t, null, { ...EN.horror, jaw: 0.15, prop: 'sand', arms: HOLD, dx: 80, lid: 0.35, bite: 0.6 });
    if (t > CUE.pizd) { push(540, 420, 1, -0.04); ransom('П*ЗДЕЦ', 0, 0, 150, 21955, { reveal: pr(t, CUE.pizd, CUE.pizd + 0.2), pop: true }); pop(); } },
  yawnW(t) { TWO(); scene(t, {}, { ...EN.worried, arms: HOLD, dx: 80 }); },
  towerLook(t) { windowLook(t, -180, 760, lerp(1.7, 1.95, pr(t, LN.t07.start, CUE.dive)));                          // пустая вышка спасателя
    if (t > CUE.noguard) { push(540, 1200, popK(t, CUE.noguard, 0.3), -0.03); ransom('НЕТ СПАСАТЕЛЕЙ', 0, 0, 90, 21960, { reveal: 1, pop: true }); pop(); } },
  safe: ins(safeIns, { hand: 0.5 }),
  floatW(t) { const k = sm(pr(t, CUE.two - 0.3, CUE.two + 0.3)); TWO({ Z: 0.05 * pr(t, LN.n08.start, LN.n08.end) });
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.float - 0.2, EMO(EN.proud, { grin: 0.5 })]]), two: k > 0.5, arms: k > 0.5 ? TWOB : armsK(HOLD, PANIC, k * 2), dx: 60 }); },
  stare(t) { TOM(lerp(2.3, 2.65, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare, lk: [-0.9, 0.5] }, null); },
  mat(t) { TOM(2.6, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('БЛ*ТЬ', 0, 0, 170, 21965, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  palmT(t) { TOM(2.45, { shake: shakeAt(t) }); scene(t, {}, null); if (t > CUE.inflat) { push(540, 420, popK(t, CUE.inflat, 0.3), 0.03); ransom('НЕ НАДУВНАЯ', 0, 0, 104, 21966, { reveal: 1, pop: true }); pop(); } },
  final(t) { WIDE(); const back = t > CUE.loop - 0.6;
    scene(t, ex(t, [[0, ET.deadpan], [CUE.loop - 0.6, ET.hunt]]), back ? { ...EN.panic, arms: PANIC } : { ...EN.sad, two: true, arms: TWOB, dx: 60 });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 21970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ГЛОТАЕТ ЖВАЧКУ', 0, 0, 72, 21971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
