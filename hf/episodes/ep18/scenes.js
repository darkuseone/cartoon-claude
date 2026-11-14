/* Эп. 18 «Срок годности — развод?» — сцены по эталону ep12 v3. Ночь, контейнерная площадка.
   Никита: тащит мешок «просрочки», бросает на землю, машет пачкой печенья, в финале на коленях достаёт из мешка курицу.
   Том на крышке контейнера: ест выпавшую колбасу → на «мясо… не рискуй» отправляет её в бак, умывается, зевает,
   нюхает вздутую банку и на «сразу выкидывай» смахивает её в открытый бак, фейспалм на «курицу — не надо». */
frame = frame25;
const CUE = {
  half: Wd('n01', 1), expired: Wd('n01', 3), bla: Wd('t01', 1), normal: Wd('t01', 4), halfT: Wd('t01', 6), dal: Wd('n02', 0), poison: Wd('n02', 7),
  useby: Wd('t02', 3), safety: Wd('t02', 7), meat: Wd('t02', 8), risk: Wd('t02', 11), better: Wd('t02', 15), cookie: Wd('t02', 20), canEat: Wd('t02', 25),
  maker: Wd('t03', 0), us: Wd('t03', 3), formula: Wd('t03', 9), guess: Wd('t03', 14), pack: Wd('n04', 3),
  ec: Wd('t04', 0), pct: Wd('t04', 3), confusion: Wd('t04', 12), nine: Wd('t04', 17), nuB: Wd('n05', 2), short: Wd('n05', 5),
  reserve: Wd('t05', 1), buy: Wd('t05', 7), uk: Wd('t05', 10), removed: Wd('t05', 12), look: Wd('t05', 20), ohr: Wd('n06', 0),
  r1: Wd('t07', 0), smell: Wd('t07', 7), r2: Wd('t07', 9), sniff: Wd('t07', 13), r3: Wd('t07', 17), throwC: Wd('t07', 21),
  plot: Wd('n08', 3), trash: Wd('n08', 8), chicken: Wd('n08', 10), mat: Wd('t08', 0), chick2: Wd('t08', 2), sub: Wd('t09', 0), read2: Wd('t09', 3), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.bla, 0.2, 6], [CUE.poison, 0.25, 8], [CUE.risk, 0.25, 6], [CUE.guess, 0.3, 8], [CUE.nine, 0.3, 10], [CUE.look, 0.25, 8], [CUE.ohr, 0.3, 6], [CUE.r3 + 0.6, 0.3, 8], [CUE.mat, 0.5, 16]];
const EP = { title: ['ПРОСРОЧКА —', 'РАЗВОД?'], cens: { 'бля,': 'бл*,', '…Ёбаный': '…Ё*АНЫЙ' },
  hot: /^(выкинул|полхолодильника|просрочено|нормальную|отрава|употребить|безопасность|мясо|рыба|молочка|рискуй|лучше|качество|можно|производитель|закон|детской|смеси|прикидка|еврокомиссия|десяти|процентов|девять|миллионов|тонн|запас|раньше|британии|убрали|продукт|этикетку|мусор|нюхай|пробуй|вздутую|банку|сразу|заговор|курицу|кожаный|читай)/i,
  hideMat: [['t08', '…Ёбаный', CUE.mat]] };
const GRADE = { sat: 1.15, con: 1.1, bri: 1.0 };
const TOMP = { x: 760, y: LID - 239, s: 0.62 }, NIKX = 360, NIKS = 0.95;
const NY = legs => legs === 'kneel' ? 1128 : 1077;
const CARRY = { l: [-150, 300, 'open'], r: [150, 250, 'fist'] }, DOWN = { l: [-150, 300, 'open'], r: [130, 300, 'open'] };
const WAVE = { l: [-150, 300, 'open'], r: [175, -120, 'fist'] }, SHOW = { l: [-150, 300, 'open'], r: [200, -20, 'fist'] }, UP = { l: [-150, 300, 'open'], r: [140, -200, 'fist'] };
const DIG = { l: [-150, 300, 'open'], r: [190, 260, 'open'] };
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const BAG = [600, 1560, 0.05];                                          // мешок на земле
/* колбаса у Тома: в лапе (ест) → летит в открытый бак на «не рискуй» */
function sausageAt(t) { const t0 = CUE.risk - 0.1, P = [TOMP.x + 30, TOMP.y + 70];
  if (t < t0) return { x: P[0], y: P[1], r: -0.3, bite: clamp(t / LN.t02.start) * 0.6 };
  if (t < t0 + 0.55) { const k = (t - t0) / 0.55; return { x: lerp(P[0], 1100, k), y: lerp(P[1], 1140, k) - 160 * Math.sin(Math.PI * k), r: -0.3 + 6 * k, bite: 0.6 }; } return null; }
function canAt(t) { const t0 = CUE.r3 + 0.35; if (t < t0) return { x: 895, y: LID - 58, r: 0 };
  if (t < t0 + 0.5) { const k = (t - t0) / 0.5; return { x: lerp(895, 1100, k), y: lerp(LID - 58, 1180, k) - 120 * Math.sin(Math.PI * k), r: 4 * k }; } return null; }
function tomLife(t) {
  const L = {};
  if (t < CUE.risk - 0.4) { const ch = Math.abs(Math.sin(t * 11)); Object.assign(L, { paw: 1, pawX: 70, pawY: 110, lid: 0.5, lk: [-0.5, 0.3], m: { open: 0.1 + 0.25 * ch, round: 0.1 } });
    if (t >= LN.t02.start) Object.assign(L, { lk: [0.6, 0.6], lid: 0.55, brow: 0.3 }); }                                                // рассматривает колбасу
  if (t >= CUE.risk - 0.4 && t < CUE.risk + 0.4) { const k = sm(pr(t, CUE.risk - 0.4, CUE.risk)); Object.assign(L, ET.deadpan, { paw: 1, pawX: lerp(70, 210, k), pawY: lerp(110, 60, k), lk: [0.9, 0.2] }); }
  if (t >= LN.n03.start && t < LN.t03.start + 0.2) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });   // умывается
  if (t >= LN.n04.start + 0.3 && t < LN.n04.end + 0.3) Object.assign(L, ET.yawn);
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= LN.n07.start && t < CUE.r3 - 0.1) Object.assign(L, ET.disgust, { lk: [0.9, 0.7], tilt: 0.14 });                                      // нюхает вздутую банку
  if (t >= CUE.r3 - 0.1 && t < CUE.r3 + 1.0) { const k = sm(pr(t, CUE.r3 - 0.1, CUE.r3 + 0.35)); Object.assign(L, ET.deadpan, { paw: 1, pawX: lerp(160, 240, k), pawY: lerp(240, 280, k), lk: [0.9, 0.6] }); }
  if (t >= LN.n08.start && t < CUE.mat - 0.3) Object.assign(L, ET.stare, { lk: [-0.9, 0.6] });
  if (t >= CUE.chick2 - 0.1 && t < LN.t09.start) Object.assign(L, ET.facepalm);
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t), S0 = sausageAt(t), C0 = canAt(t);
  plane(0, 2.4, () => nightBlock(t));
  plane(1, 1.35, () => yard(t));
  plane(2, 1.0, () => {
    const n = nikO ? { arms: CARRY, legs: 'stand', ...nikO } : null, bagHeld = n && n.prop === 'bag';
    pad(t, { bag: bagHeld || t < CUE.poison - 0.3 && n ? null : BAG });
    if (C0) bulgeCan(C0.x, C0.y, 0.62, C0.r);
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY(n.legs) + (n.dy ?? 0), s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r);
        if (bagHeld) trashBag(hx, hy + 150, 0.8, 0.05); else if (n.prop === 'cookies') cookies(hx, hy - 20, 0.6, -0.1); else if (n.prop === 'chicken') drumstick(hx, hy - 20, 0.7, -0.5); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(6,6,14,0.55)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF }, lm = life.m; delete life.m;
      layer(() => { const tk = talk('tom', t), m = (lm && tk.m.open < 0.05) ? lm : tk.m;
        tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 });
        if (S0) sausage(S0.x, S0.y, 0.55, S0.r, { bite: S0.bite }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(6,6,14,0.55)' }); }
  });
  onPlane(1.0, () => padLight(t));
  if (o.fg !== false) plane(3, 0.6, () => padFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 20, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, dx = 0, legs = 'stand', o = {}) => cam25(NIKX + dx + 30, NY(legs) + 43, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 590, 1060, o.z ?? 1.34, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(610, 1080, 1.25, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); } }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [LN.n02.start - 0.05, 'dropW', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'], [CUE.useby - 0.3, 'labels', 'flash'],
  [CUE.risk - 0.5, 'tomRisk', 'whip'], [CUE.better - 0.3, 'labelsB', 'whip'], [LN.n03.start - 0.05, 'nikWho', 'whip'], [LN.t03.start - 0.05, 'tomC', 'whip'], [CUE.us - 0.3, 'usI', 'iris'],
  [LN.n04.start - 0.05, 'cookieW', 'whip'], [LN.t04.start - 0.05, 'eu', 'iris'], [CUE.confusion - 0.3, 'euB', 'whip'], [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.nuB - 0.1, 'stareA'],
  [LN.t05.start - 0.05, 'tomD', 'whip'], [CUE.uk - 0.3, 'ukI', 'fly'], [LN.n06.start - 0.05, 'nikOhr'], [LN.n07.start - 0.05, 'sniffW', 'whip'], [LN.t07.start - 0.05, 'rule', 'iris'],
  [CUE.r3 - 0.3, 'canW', 'whip'], [LN.n08.start - 0.05, 'digW', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.chick2 - 0.15, 'palmW', 'whip'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.expired + 0.6)) });                   // ночь, мешок «просрочки», Том ест выпавшую колбасу
    scene(t, {}, { ...ex(t, [[0, EN.proud], [CUE.expired - 0.2, EMO(EN.proud, { grin: 0.5 })]]), prop: 'bag', arms: CARRY }); },
  tomA(t) { TOM(lerp(2.15, 2.4, pr(t, LN.t01.start, LN.t01.end))); scene(t, { ...ET.deadpan }, null); },
  dropW(t) { TWO({ shake: shakeAt(t) }); const drop = t > CUE.poison - 0.3; scene(t, {}, { ...EN.outrage, prop: drop ? null : 'bag', arms: drop ? DOWN : CARRY }); },
  tomB(t) { TOM(2.35); scene(t, { ...ET.lecture, paw: 0 }, null); },
  labels: ins(labelsIns, { hand: 0.5 }),
  tomRisk(t) { TOM(2.3); scene(t, {}, null); },
  labelsB: ins(labelsIns, { hand: 0.5, zoom: [540, 1010, 1.05] }),
  nikWho(t) { NIK(2.0, 0, 'stand', { Z: 0.05 }); scene(t, null, { ...EN.doubt, prop: 'cookies', arms: SHOW }); },
  tomC(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  usI: ins(usIns, { hand: 0.5 }),
  cookieW(t) { TWO(); scene(t, {}, { ...EN.dismiss, prop: 'cookies', arms: WAVE }); },
  eu: ins(euIns, { hand: 0.5 }),
  euB: ins(euIns, { hand: 0.5, zoom: [540, 1000, 1.05] }),
  nuuW(t) { TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuB) }); scene(t, {}, { ...EN.naive, prop: 'cookies', arms: SHOW, dx: 60 }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.nuB, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  tomD(t) { TOM(2.35); scene(t, { ...ex(t, [[0, ET.smug], [CUE.buy - 0.2, ET.sneaky]]) }, null); },
  ukI: ins(ukIns, { hand: 0.5 }),
  nikOhr(t) { NIK(2.1, 60, 'stand', { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) }); scene(t, null, { ...EN.awe, jaw: 0.2, arms: DOWN, dx: 60 });
    if (t > CUE.ohr) { push(540, 420, 1, -0.04); ransom('ОХРЕНЕТЬ', 0, 0, 120, 18955, { reveal: pr(t, CUE.ohr, CUE.ohr + 0.25), pop: true }); pop(); } },
  sniffW(t) { TWO(); scene(t, {}, { ...EN.worried, arms: DOWN, dx: 60 }); },
  rule: ins(ruleIns, { hand: 0.5 }),
  canW(t) { cam25(800, 1060, lerp(1.7, 1.85, pr(t, CUE.r3 - 0.3, LN.n08.start)), { dof: 5, shake: shakeAt(t) }); scene(t, {}, null);   // «вздутую — сразу выкидывай»: смахивает банку в бак
    if (t > CUE.throwC) { push(540, 420, popK(t, CUE.throwC, 0.3), 0.03); ransom('СРАЗУ В МУСОР', 0, 0, 96, 18960, { reveal: 1, pop: true }); pop(); } },
  digW(t) { const k = sm(pr(t, CUE.trash - 0.6, CUE.trash)), up = sm(pr(t, CUE.chicken, CUE.chicken + 0.4)); TWO({ Z: 0.05 * pr(t, LN.n08.start, LN.n08.end) });   // на коленях у мешка — достаёт курицу
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.chicken, EMO(EN.proud, { grin: 0.5 })]]), legs: k > 0.5 ? 'kneel' : 'stand', prop: up > 0.3 ? 'chicken' : null, arms: up > 0 ? armsK(DIG, UP, up) : armsK(DOWN, DIG, k), dx: 80 * k }); },
  stare(t) { TOM(lerp(2.3, 2.65, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare, lk: [-0.9, 0.6] }, null); },
  mat(t) { TOM(2.6, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('Ё*АНЫЙ', 0, 0, 150, 18965, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop();
      push(560, 540, 1, 0.03); ransom('СТЫД', 0, 0, 150, 18966, { reveal: pr(t, CUE.mat + 0.2, CUE.mat + 0.4), pop: true }); pop(); } },
  palmW(t) { TWO({ shake: shakeAt(t) }); scene(t, {}, { ...EN.shock, legs: 'kneel', prop: 'chicken', arms: UP, dx: 80 }); },
  final(t) { WIDE(); const back = t > CUE.loop - 0.6;
    scene(t, ex(t, [[0, ET.deadpan], [CUE.read2 - 0.3, EMO(ET.lecture, { lk: [-0.8, 0.4] })]]), back ? { ...EN.proud, prop: 'bag', arms: CARRY } : { ...EN.sad, legs: 'kneel', prop: 'chicken', arms: SHOW, dx: 80 });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 18970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ВЫКИДЫВАЕТ ЕДУ', 0, 0, 72, 18971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
