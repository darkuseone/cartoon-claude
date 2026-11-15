/* Эп. 26 «Зачем дырка в колпачке?» — сцены по эталону ep12 v3. Ночное купе, Никита и Том едут на дачу.
   Сюжет-мини: Никита давится колпачком (кашель, колпачок вылетает в ладонь) → Том на столике бьёт ложечку в стакане → «подстраховала твою жизнь» →
   «а ты кто? взрослый мужик…» — Никита смущённо снова суёт колпачок в рот → дырочка в корпусе (рассматривает ручку на свет ночника) → «для презервативов же!» →
   часовой карман: Никита вытряхивает из него мелочь («двадцать лет пихаю») → «буду нырять с ним» — колпачок в зубы, нос зажал → «…Блять. Это последний шанс» →
   петля: «выплюни колпачок» — он плюёт, и колпачок шлёпается в стакан с чаем. */
frame = frame25;
const CUE = {
  chew: Wd('n01', 0), inhale: Wd('n01', 8), hole: Wd('n01', 12), defect: Wd('n01', 15), notdef: Wd('t01', 1), save: Wd('t01', 7), life: Wd('t01', 9),
  stuck: Wd('t02', 2), air: Wd('t02', 10), bic: Wd('t02', 12), y91: Wd('t02', 16), risk: Wd('t02', 22),
  who: Wd('t03', 2), man: Wd('t03', 4), train: Wd('t03', 11), chews: Wd('t03', 12), barrel: Wd('n04', 6),
  no: Wd('t04', 0), pressure: Wd('t04', 3), outside: Wd('t04', 6), nonsense: Wd('t04', 16), nuB: Wd('n05', 2), condoms: Wd('n05', 7),
  watches: Wd('t05', 1), levis: Wd('t05', 2), y1870: Wd('t05', 9), pocketwatch: Wd('t05', 11), name: Wd('t05', 17), ohr: Wd('n06', 0), coins: Wd('n06', 6),
  nochew: Wd('t07', 1), time: Wd('t07', 7), choke: Wd('t07', 10), call: Wd('t07', 16), kids: Wd('t07', 19), breathe: Wd('n08', 5), dive: Wd('n08', 7), snorkel: Wd('n08', 12),
  mat: Wd('t08', 0), last: Wd('t08', 5), sub: Wd('t09', 0), spit: Wd('t09', 3), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.inhale, 0.4, 10], [CUE.life, 0.25, 6], [CUE.risk, 0.25, 8], [CUE.chews, 0.25, 6], [CUE.name, 0.25, 6], [CUE.coins, 0.3, 8], [CUE.call, 0.25, 6], [CUE.mat, 0.5, 16], [CUE.spit + 0.6, 0.3, 8]];
const EP = { title: ['ЗАЧЕМ ДЫРКА', 'В КОЛПАЧКЕ?'], cens: { '…Блять.': '…БЛ*ТЬ.' },
  hot: /^(колпачок|вдохнул|дырка|бракованная|подстраховала|жизнь|застрянет|горле|воздух|бике|девяносто|удушья|взрослый|мужик|поезде|грызёт|давление|снаружи|ерунду|карманчик|презервативов|часов|ливайс|семидесятых|часовой|карман|мелочь|грызть|время|скорую|детям|трубкой|последний|шанс|кожаный|выплюни)/i,
  hideMat: [['t08', '…Блять', CUE.mat]] };
const GRADE = { sat: 1.15, con: 1.1, bri: 1.0 };
const TOMP = { x: 790, y: TABLE - 239, s: 0.62 }, NIKX = 330, NIKS = 0.95, NY = 1041;
const WRITE = { l: [-60, 210, 'open'], r: [150, 120, 'fist'] }, CHEW = { l: [-60, 210, 'open'], r: [60, -40, 'fist'] }, PENUP = { l: [-60, 210, 'open'], r: [140, -160, 'fist'] };
const COUGH = { l: [40, -40, 'fist'], r: [170, 60, 'open'] }, POCKET = { l: [-70, 300, 'open'], r: [150, 120, 'fist'] }, SHOWC = { l: [-150, 40, 'open'], r: [150, 120, 'fist'] };
const SNORK = { l: [30, -110, 'fist'], r: [60, -40, 'fist'] }, OPEN = { l: [-170, 100, 'open'], r: [170, 100, 'open'] };
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const MOUTH = [NIKX + 6, NY - 60];
function capFly(t) { const t0 = CUE.spit + 0.25; if (t < t0) return null; if (t > t0 + 0.5) return 'glass'; const k = (t - t0) / 0.5; return [lerp(MOUTH[0], 610, k), lerp(MOUTH[1], TABLE - 100, k) - 180 * Math.sin(Math.PI * k), 8 * k]; }
function tomLife(t) {
  const L = {};
  if (t < LN.t01.start) Object.assign(L, ET.hunt, { lk: [-0.6, -0.8] });                                                                     // следит за огнями в окне
  if (t >= LN.n02.start && t < LN.t02.start) Object.assign(L, ET.hunt, { flip: true, paw: 1, pawX: 220 + 20 * Math.sin(t * 12), pawY: 160, lk: [0.9, 0.5] });   // бьёт ложечку в стакане
  if (t >= LN.n03.start && t < LN.t03.start) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });
  if (t >= LN.n04.start && t < LN.t04.start) Object.assign(L, ET.eyeroll);
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= LN.n07.start && t < LN.n07.end + 0.3) Object.assign(L, ET.yawn);
  if (t >= LN.n08.start && t < CUE.mat - 0.3) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= CUE.spit + 0.7) Object.assign(L, ET.disgust, { lk: [0.9, 0.6] });                                                                // колпачок в чае
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t), F = capFly(t);
  plane(0, 2.4, () => nightRail(t));
  plane(1, 1.35, () => compartment(t));
  plane(2, 1.0, () => {
    compMid(t, { capInGlass: F === 'glass', rattle: t >= LN.n02.start && t < LN.t02.start ? 3 : 1, coins: o.coins });
    const n = nikO ? { arms: WRITE, legs: 'sit', ...nikO } : null;
    if (n) { const br = breathe(t, 2, 0.8), P = { x: NIKX + (n.dx ?? 0), y: NY, s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r); if (n.pen !== false) penP(hx, hy - 20, 0.7, n.penR ?? 0.5, { cap: n.capOn });
        if (n.capMouth) capP(MOUTH[0] + (n.dx ?? 0), MOUTH[1], 0.8, 1.4);
        if (n.coinsHand) { const [lx, ly] = nikHand(P, n.arms.l); coins(lx, ly - 10, 5, 26340); } }, { sx: 8, sy: 10, sb: 16, sc: 'rgba(10,8,20,0.5)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF };
      layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m: tk.m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 }); }, { sx: 8, sy: 10, sb: 16, sc: 'rgba(10,8,20,0.5)' }); }
    if (Array.isArray(F)) capP(F[0], F[1], 0.8, F[2]);
  });
  onPlane(1.0, () => compLight(t));
  if (o.fg !== false) plane(3, 0.6, () => compFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 10, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, o = {}) => cam25(NIKX + 30, NY + 100, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 590, 1090, o.z ?? 1.3, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(600, 1100, 1.22, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); } }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [LN.n02.start - 0.05, 'nikQ', 'whip'], [LN.t02.start - 0.05, 'spoonW', 'whip'], [CUE.air - 0.4, 'capI', 'iris'],
  [LN.n03.start - 0.05, 'dismissW', 'whip'], [LN.t03.start - 0.05, 'tomC', 'whip'], [CUE.man - 0.2, 'nikRoast', 'whip'], [LN.n04.start - 0.05, 'penW', 'whip'], [LN.t04.start - 0.05, 'barrelI', 'iris'],
  [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.condoms - 0.2, 'stareA'], [LN.t05.start - 0.05, 'pocketI', 'flash'], [LN.n06.start - 0.05, 'nikCoins'], [LN.n07.start - 0.05, 'yawnW', 'whip'],
  [LN.t07.start - 0.05, 'advice', 'iris'], [LN.n08.start - 0.05, 'snorkW', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.15, 'mat'], [CUE.last - 0.2, 'lastT', 'whip'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.defect + 0.4)), shake: shakeAt(t) }); const k = sm(pr(t, CUE.inhale - 0.3, CUE.inhale + 0.2));   // давится колпачком
    scene(t, {}, { ...ex(t, [[0, EMO(EN.naive, { lid: 0.4 })], [CUE.inhale - 0.2, EMO(EN.panic, { pale: 0.3 })], [CUE.hole, EN.doubt]]), capMouth: k < 0.5, arms: k < 0.5 ? CHEW : armsK(COUGH, PENUP, sm(pr(t, CUE.hole - 0.3, CUE.hole + 0.3))), capOn: false }); },
  tomA(t) { TOM(lerp(2.1, 2.3, pr(t, LN.t01.start, LN.t01.end))); scene(t, { ...ET.deadpan }, null);
    if (t > CUE.life) { push(540, 420, popK(t, CUE.life, 0.3), 0.03); ransom('ТВОЮ ЖИЗНЬ', 0, 0, 120, 26950, { reveal: 1, pop: true }); pop(); } },
  nikQ(t) { NIK(2.0, { Z: 0.05 }); scene(t, null, { ...EN.shock, arms: PENUP }); },
  spoonW(t) { TWO(); scene(t, { ...ET.lecture }, { ...EN.naive, arms: WRITE }); },
  capI: ins(capIns, { hand: 0.5 }),
  dismissW(t) { TWO(); scene(t, {}, { ...EN.dismiss, arms: PENUP }); },
  tomC(t) { TOM(2.35); scene(t, { ...ET.smug }, null); },
  nikRoast(t) { NIK(lerp(2.0, 2.3, pr(t, CUE.man, LN.n04.start)), {}); scene(t, null, { ...ex(t, [[0, EN.doubt], [CUE.chews, EMO(EN.sad, { lid: 0.5, blush: 0.3 })]]), capMouth: t > CUE.chews, arms: t > CUE.chews ? CHEW : PENUP }); },
  penW(t) { TWO({ Z: 0.05 }); scene(t, { ...ET.eyeroll }, { ...EN.doubt, arms: PENUP, penR: 1.4, lk: [0.6, -0.8] }); },
  barrelI: ins(barrelIns, { hand: 0.5 }),
  nuuW(t) { TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuB) }); scene(t, {}, { ...EMO(EN.naive, { grin: 0.4 }), arms: POCKET }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.condoms, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  pocketI: ins(pocketIns, { hand: 0.5 }),
  nikCoins(t) { const k = sm(pr(t, CUE.coins - 0.6, CUE.coins)); NIK(2.0, { Z: 0.08 * pr(t, LN.n06.start, LN.n06.end) }); scene(t, null, { ...EN.awe, jaw: 0.2, arms: armsK(POCKET, SHOWC, k), coinsHand: k > 0.5 }, { coins: k > 0.5 ? [420, 1420] : null }); },
  yawnW(t) { TWO(); scene(t, {}, { ...EN.worried, arms: WRITE }, { coins: [420, 1420] }); },
  advice: ins(adviceIns, { hand: 0.5 }),
  snorkW(t) { const k = sm(pr(t, CUE.dive - 0.4, CUE.dive)); TWO({ Z: 0.05 * pr(t, LN.n08.start, LN.n08.end) });             // колпачок в зубы, нос зажал
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.snorkel - 0.3, EMO(EN.proud, { grin: 0.4, lid: 0.3 })]]), capMouth: k > 0.5, arms: k > 0.5 ? SNORK : PENUP, capOn: false }); },
  stare(t) { TOM(lerp(2.3, 2.6, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare }, null); },
  mat(t) { TOM(2.55, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('БЛ*ТЬ', 0, 0, 170, 26960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  lastT(t) { TOM(2.4); scene(t, { ...ET.grave }, null); if (t > CUE.last) { push(540, 420, popK(t, CUE.last, 0.3), 0.03); ransom('ПОСЛЕДНИЙ ШАНС', 0, 0, 96, 26965, { reveal: 1, pop: true }); pop(); } },
  final(t) { WIDE({ shake: shakeAt(t) }); const back = t > CUE.loop - 0.6, spat = t > CUE.spit + 0.2;                         // «выплюни» — колпачок летит в чай
    scene(t, {}, back ? { ...EN.naive, capMouth: true, arms: CHEW, capOn: false } : { ...ex(t, [[0, EN.sad], [CUE.spit + 0.3, EN.shock]]), capMouth: !spat, arms: SNORK, capOn: false });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 26970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ГРЫЗЁТ РУЧКИ', 0, 0, 80, 26971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
