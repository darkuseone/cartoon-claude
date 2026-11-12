/* Эп. 12 «Радиевые часы — заговор?» — сцены v2 (11.2026): 2.5D-камера (cam25.js), эмоции (emo.js), гэг «Том не допрыгнул до полки»,
   Никита работает с предметами (коробка, часы, подушка), тематические переходы (стрелка часов, радиевая вспышка, вспышка фото, хлыст). */
frame = frame25;
const CUE = {
  watch: Wd('n01', 3), glow: Wd('n01', 14), radium: Wd('t01', 1), put: Wd('t01', 2), slow: Wd('t01', 3), bowl: Wd('t01', 9), paintW: Wd('n02', 6),
  rad: Wd('t02', 0), y17: Wd('t02', 2), lips: Wd('t02', 14), lick: Wd('t02', 15), dip: Wd('t02', 16), paint: Wd('t02', 17),
  gub: Wd('n03', 0), noone: Wd('n03', 1), knew: Wd('t03', 0), chemI: Wd('t03', 1), girls: Wd('t03', 13), safe: Wd('t03', 15), useful: Wd('t03', 17),
  healthW: Wd('t04', 4), paste: Wd('t04', 6), cream: Wd('t04', 9), water: Wd('t04', 11), nails: Wd('t04', 18), smile: Wd('n05', 3),
  teeth: Wd('t05', 4), jaw: Wd('t05', 7), molly: Wd('t05', 8), diag: Wd('t05', 16), lie: Wd('n06', 2),
  worse: Wd('t06', 0), prof: Wd('t06', 3), proved: Wd('t06', 9), other: Wd('t06', 16), allOk: Wd('t06', 18), bodry: Wd('t06', 20),
  consp: Wd('n07', 3), five: Wd('t07', 2), months: Wd('t07', 10), ten: Wd('t07', 14), rights: Wd('t07', 17), mine: Wd('n08', 2),
  hundred: Wd('t08', 4), thousand: Wd('t08', 10), s1: Wd('t09', 1), s2: Wd('t09', 3), inside: Wd('t09', 10), s3: Wd('t09', 15),
  pillow: Wd('n10', 5), night: Wd('n10', 7), mat: Wd('t10', 0), k1: Wd('t10', 1), k3: Wd('t10', 3), sub: Wd('t11', 0), loop: LN.t11.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;   // L<реплика> — начало реплики (для звука)                                      // Том пытается сбежать на полку от часов — и не допрыгивает
const SHAKES = [[CUE.radium, 0.25, 8], [CUE.lips, 0.25, 8], [CUE.safe, 0.25, 8], [CUE.diag, 0.3, 10], [CUE.allOk + 0.3, 0.3, 10], [CUE.ten, 0.25, 8],
  [CUE.thousand, 0.3, 10], [CUE.mat, 0.5, 16], [CUE.k3, 0.3, 10]];
const EP = { title: ['СВЕТЯТ', '100 ЛЕТ?'], cens: { '…Блять.': '…БЛ*ТЬ.' },
  hot: /^(барахолке|сто|светятся|радием|радий|радиевая|миской|семнадцатом|губами|лизнуть|макнуть|покрасить|знали|щипцами|свинцовыми|безвредно|полезно|поле|здоровье|зубной|ногти|зубы|челюсть|молли|двадцать|сифилис|враньё|гарвард|другой|здоровы|бодрый|заговор|пять|месяцы|десять|тысяч|долларов|право|ерунда|тысячу|шестьсот|вскрывай|краску|шестидесятых|ночник|кожаный)/i,
  hideMat: [['t10', '…Блять', CUE.mat]] };
const GRADE = { sat: 1.25, con: 1.07, bri: 1.03 };
const TOMP = { x: 820, y: 745, s: 0.62 }, NIKP = { x: 380, y: 1077, s: 0.95 };
const BOX = { l: [-150, 300, 'open'], r: [200, 430, 'fist'] };            // рука в коробке с барахолки
const HOLD = { l: [-150, 300, 'open'], r: [190, 110, 'fist'] };
const LOOK = { l: [-150, 300, 'open'], r: [160, -40, 'fist'] };            // часы у лица: любуется
const THRUST = { l: [-150, 300, 'open'], r: [260, 20, 'fist'] };           // тянет часы к Тому
const AWAY = { l: [-120, 220, 'open'], r: [250, 160, 'fist'] };            // держит часы подальше
const MOUTH = { l: [-150, 300, 'open'], r: [60, 110, 'fist'] };             // часы у рта: «светящаяся улыбка»
const THROW = { l: [-170, 200, 'open'], r: [180, -200, 'fist'] };          // замахнулся выкинуть
const UP = { l: [-150, 300, 'open'], r: [150, -230, 'fist'] };
const PIL = { l: [-200, 60, 'fist'], r: [150, -230, 'fist'] };             // подушка в левой, часы в правой
const handW = (a, dx = 0) => nikHand({ x: NIKP.x + dx, y: NIKP.y, s: NIKP.s }, a);
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });

/* Кошачья жизнь Тома: пока Никита отвлекает, Том занят своим (охота на мотылька, умывание, еда, кружка с комода, противогаз).
   Возвращает добавки к позе Тома + реквизит. Эмоция из плана накладывается поверх, но действие важнее. */
const LIFE = {
  mug0: LN.n07.start - 0.25, mug1: LN.n07.end - 0.15,                  // смахивает кружку, глядя на Никиту
  eat0: LN.t06.start - 0.6, eat1: CUE.five - 0.1,                      // ест рыбу
  mask0: LN.n09.start + 0.2                                            // надевает противогаз от часов
};
Object.assign(CUE, { mugHit: LIFE.mug0 + (LIFE.mug1 - LIFE.mug0) * 0.86, mugPush: LIFE.mug0 + 0.2, mask0: LIFE.mask0, eat0: LIFE.eat0 + 0.6, eat1: LIFE.eat1 });
function tomLife(t) {
  const L = {}, [mx, my] = mothPos(t), dx = (mx - TOMP.x) / TOMP.s, dy = (my - TOMP.y) / TOMP.s, d = Math.hypot(dx, dy + 40) || 1;
  if (t < LN.t01.start + 0.6) {                                        // охотится на мотылька у лампы: следит глазами, бьёт лапой
    const sw = (t % 1.1) < 0.35, k = sw ? sm(((t % 1.1)) / 0.15) : 0.3;
    Object.assign(L, ET.hunt, { lk: [dx / d, (dy + 40) / d], paw: 1, pawX: lerp(175, clamp(dx, 120, 330), k), pawY: lerp(110, clamp(dy + 60, -150, 120), k), tilt: (dx / d) * 0.08 });
  } else if (t >= LN.n02.start && t < LN.t02.start) {                  // прицеливается прыгнуть за мотыльком на полку — Никита сбивает
    const end = pr(t, LN.n02.end - 0.4, LN.n02.end); Object.assign(L, ET.hunt, { lk: [-0.3, -1], ears: 0.4, q: 1 - (0.09 + 0.03 * Math.sin(t * 22)) * (1 - end) });
    if (end > 0) Object.assign(L, ET.stare);
  } else if (t >= LN.t03.start && t < LN.t04.start) {                  // умывается между фразами
    const talking = talk('tom', t).m.open > 0.05; Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: talking ? 0 : (Math.sin(t * 9) > 0 ? 1 : 0.4), tilt: -0.08 });
  } else if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08 });
  if (t >= LIFE.eat0 && t < LIFE.eat1) {                               // ест: голова в тарелке, поднимает — жуёт и говорит
    const talking = talk('tom', t).m.open > 0.05, down = talking ? 0 : (Math.sin(t * 2.2) > -0.2 ? 1 : 0);
    Object.assign(L, { plate: 1, bob: 70 * down, tilt: 0.12 * down, lid: down ? 0.8 : undefined, chew: !talking && !down });
  }
  if (t >= LIFE.mug0 && t < LIFE.mug1 + 1.5) L.mugK = clamp((t - LIFE.mug0) / (LIFE.mug1 - LIFE.mug0));
  if (t >= LIFE.mug0 && t < LIFE.mug0 + 1.0) Object.assign(L, ET.sneaky, { lk: [-0.9, 0.1], paw: 1, pawX: lerp(150, 250, sm(pr(t, LIFE.mug0, LIFE.mug0 + 0.9))), pawY: lerp(300, 380, sm(pr(t, LIFE.mug0, LIFE.mug0 + 0.9))) });
  if (t >= LIFE.mask0 && t < CUE.loop) L.mask = sm(pr(t, LIFE.mask0, LIFE.mask0 + 0.5));
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  let W0 = null; const LF = tomLife(t);
  plane(0, 2.4, () => nightSky(t));
  plane(1, 1.35, () => nightWall(t));
  plane(2, 1.0, () => {
    nightMid(t, { boxX: 560, mug: LF.mugK ?? (t >= LIFE.mug1 + 1.5 ? 1 : 0) });
    if (tomO) { const br = breathe(t, 1), life = { ...LF }, q = (tomO.q ?? 1) * (life.q ?? 1); delete life.q;
      layer(() => { const tk = talk('tom', t), m = life.chew ? { open: Math.abs(Math.sin(t * 14)) * 0.35, round: 0.2 } : tk.m;
        tom({ ...TOMP, t, m, bob: tk.bob + br.bob + (life.bob ?? 0), tilt: br.tilt + (life.tilt ?? 0), tailK: Math.sin(t * 2.6) * 0.6, ...tomO, ...life, bob: tk.bob + br.bob + (life.bob ?? 0), tilt: br.tilt + (life.tilt ?? 0), squash: q }); }, { sx: 9, sy: 11, sb: 16 });
      if (LF.plate) plateP(TOMP.x - 10, 994); }
    if (nikO) { const n = { legs: 'stand', arms: HOLD, ...nikO }, dx = n.dx ?? 0, br = breathe(t, 2, 1.2);
      layer(() => { const tk = talk('nikita', t); nikita({ ...NIKP, x: NIKP.x + dx, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        if (n.pillow) { const [px, py] = handW(n.arms.l, dx); pillowP(px - 30, py - 10, 0.75, -0.2); }
        if (n.watch !== false) { const [hx, hy] = handW(n.arms.r, dx); W0 = [hx + 4, hy - 30]; watchP(W0[0], W0[1], n.wS ?? 0.45, n.wR ?? 0.2, { t }); } }, { sx: 9, sy: 11, sb: 16 }); }
    { const r = rng(12500); for (let i = 0; i < 18; i++) { const k = (r() + t * 0.015 * (0.5 + r())) % 1; dot(900 + Math.sin(k * 9 + i) * 200, 760 + k * 700, 2 + r() * 2, 'rgba(255,236,190,1)', 0.45 * Math.sin(k * 3.14)); } }   // пылинки у лампы
  });
  onPlane(1.0, () => nightLight(t, () => { if (W0) radial(W0[0], W0[1], o.wGlow ?? 260, 'rgba(150,255,120,1)', 0.55); }));
  if (o.fg !== false) plane(3, 0.6, () => nightFg(t));
}
const T = (z, o = {}) => cam25(TOMP.x - 20, TOMP.y + 80, z, { dof: 6, ...o });
const N = (z, o = {}) => cam25(NIKP.x + 40, NIKP.y + 20, z, { dof: 6, ...o });
const WIDE = (o = {}) => cam25(590, 1080, 1.28, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => { push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop();   // карточки чуть меньше: сверху место ленте времени, снизу — субтитрам
  if (o.tl !== undefined) timeline12(o.tl, t); }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [LN.n02.start - 0.05, 'jumpW', 'whip'], [LN.t02.start - 0.05, 'tomB'], [CUE.y17 - 0.05, 'paint', 'clock'],
  [LN.n03.start - 0.05, 'nikB', 'whip'], [LN.t03.start - 0.05, 'tomC', 'whip'], [CUE.chemI - 0.05, 'chem', 'fly'], [LN.n04.start - 0.05, 'nikC', 'whip'],
  [LN.t04.start - 0.05, 'ads', 'glow'], [LN.n05.start - 0.05, 'nikD', 'glow'], [LN.t05.start - 0.05, 'tomD', 'whip'], [CUE.molly - 0.05, 'molly', 'iris'],
  [LN.n06.start - 0.05, 'nikE', 'whip'], [LN.t06.start - 0.05, 'tomE', 'whip'], [CUE.prof - 0.05, 'report', 'flash'], [CUE.bodry - 0.05, 'tomR', 'whip'],
  [LN.n07.start - 0.05, 'nikF', 'whip'], [LN.t07.start - 0.05, 'tomF', 'whip'], [CUE.five - 0.05, 'court', 'clock'], [LN.n08.start - 0.05, 'nikG', 'whip'],
  [LN.n08.end + 0.05, 'stareT'], [LN.t08.start - 0.05, 'tomG'], [CUE.hundred - 0.05, 'half', 'glow'], [LN.n09.start - 0.05, 'nikI', 'whip'],
  [LN.t09.start - 0.05, 'safety', 'clock'], [LN.n10.start - 0.05, 'nikH', 'whip'], [LN.n10.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'],
  [CUE.k1 - 0.05, 'wideM'], [LN.t11.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { const k = pr(t, 0.3, 1.6), up = sm(k);                   // достаёт часы из коробки, поднимает к лицу; наезд «вертиго» на «светятся»
    WIDE({ Z: 0.3 * sm(pr(t, CUE.watch, CUE.glow + 0.3)), shake: shakeAt(t) });
    scene(t, ET.deadpan, { ...EMO(up < 1 ? EN.doubt : EN.proud, t > CUE.glow - 0.2 ? EN.awe : {}), arms: armsK(BOX, LOOK, up), wS: 0.5, squash: take(t, CUE.glow - 0.2) }, { wGlow: 260 + 160 * sm(pr(t, CUE.glow - 0.3, CUE.glow + 0.4)) }); },
  tomA(t) { T(lerp(2.0, 2.4, sm(pr(t, CUE.radium, CUE.radium + 0.6))), { Z: 0.12 * sm(pr(t, CUE.radium - 0.1, CUE.slow)), shake: shakeAt(t) });
    scene(t, { ...ex(t, [[0, ET.stare], [CUE.radium, ET.alarm], [CUE.put, ET.stare], [CUE.bowl - 0.2, ET.disgust]]), q: take(t, CUE.radium) }, { ...EN.proud, arms: LOOK }); },
  jumpW(t) { cam25(640, 1020, 1.36, { dof: 5, Z: 0.06 * pr(t, LN.n02.start, LN.n02.end) });   // Никита суёт часы, Том целится на полку за мотыльком
    scene(t, {}, { ...EN.dismiss, arms: armsK(LOOK, THRUST, sm(pr(t, LN.n02.start, LN.n02.start + 0.4))), dx: 120 * sm(pr(t, LN.n02.start, LN.n02.start + 0.6)), wS: 0.5 }); },
  tomB(t) { T(2.3); scene(t, { ...ex(t, [[0, ET.shame], [CUE.rad + 0.3, ET.lecture]]), q: take(t, CUE.rad + 0.3, 0.1) }, { ...EN.dismiss, dx: 120, arms: THRUST }); },
  paint: ins(paintIns, { tl: 0 }),
  nikB(t) { N(lerp(2.0, 2.2, pr(t, LN.n03.start, LN.n03.end)), { shake: 3 });
    scene(t, ET.deadpan, { ...ex(t, [[0, EMO(EN.shock, { mood: 'eww' })], [CUE.noone, EN.dismiss]]), arms: armsK(LOOK, AWAY, sm(pr(t, LN.n03.start, LN.n03.start + 0.3))), squash: take(t, LN.n03.start), wS: 0.5 }); },
  tomC(t) { T(2.4, { Z: 0.06 * pr(t, LN.t03.start, CUE.chemI) }); scene(t, { ...ET.grave, q: take(t, CUE.knew, 0.08) }, { ...EN.dismiss }); },
  chem: ins(chemIns, { tl: 0 }),
  nikC(t) { N(2.1, { Z: 0.22 * sm(pr(t, LN.n04.start, LN.n04.end)) });   // «Поле-е-езно?!» — медленный наезд, эмоция держится
    scene(t, ET.deadpan, { ...EN.awe, jaw: 0.3 + 0.5 * sm(pr(t, LN.n04.start, LN.n04.end)), arms: AWAY, squash: take(t, LN.n04.start, 0.12), wS: 0.5 }); },
  ads: ins(adsIns, { tl: 1 }),
  nikD(t) { cam25(560, 1010, 1.5, { dof: 5 });                        // часы у рта — «светящаяся улыбка», Том закатывает глаза
    scene(t, ET.eyeroll, { ...EN.naive, arms: armsK(AWAY, MOUTH, sm(pr(t, LN.n05.start, LN.n05.start + 0.4))), squash: take(t, CUE.smile), wS: 0.55 }, { wGlow: 380 }); },
  tomD(t) { T(lerp(2.2, 2.6, sm(pr(t, LN.t05.start, CUE.molly))), { Z: 0.1 * pr(t, LN.t05.start, CUE.molly) }); scene(t, ET.grave, { ...EN.worried }); },
  molly: ins(mollyIns, { hand: 0.4, tl: 2 }),
  nikE(t) { N(2.15, { shake: 5 }); scene(t, TOMD0(), { ...EN.outrage, arms: { l: [-170, 120, 'fist'], r: [190, 110, 'fist'] }, squash: take(t, LN.n06.start), wS: 0.45 }); },
  tomE(t) { T(2.35); scene(t, { ...ET.sneaky, q: take(t, CUE.worse, 0.08) }, { ...EN.outrage }); },
  report: ins(reportIns, { tl: 3 }),
  tomR(t) { T(2.5, { Z: 0.08 }); scene(t, { ...ET.smug, q: take(t, CUE.bodry, 0.1) }, { ...EN.outrage }); },
  nikF(t) { cam25(640, 1060, 1.4, { shake: 4 }); const sh = Math.sin(step(t) * 30) * 30 * (1 - pr(t, LN.n07.start, LN.n07.end));
    scene(t, ET.deadpan, { ...EN.outrage, arms: { l: [-150, 300, 'open'], r: [190, 20 + sh, 'fist'] }, squash: take(t, CUE.consp) }); },
  tomF(t) { T(2.45); scene(t, ET.grave, { ...EN.outrage }); },
  court: ins(courtIns, { tl: 4 }),
  nikG(t) { cam25(NIKP.x + 140, NIKP.y - 40, 2.3, { Z: 0.1 * pr(t, LN.n08.start, LN.n08.end), dof: 7 });   // часы у лица — зелёный свет на лице
    scene(t, ET.stare, { ...EN.worried, lk: [0.6, 0.2], arms: LOOK, wS: 0.55, squash: take(t, CUE.mine, 0.08) }, { wGlow: 420 }); },
  stareT(t) { T(lerp(2.3, 2.7, sm(pr(t, LN.n08.end, LN.t08.start + 0.4))), { Z: 0.15 * pr(t, LN.n08.end, LN.t08.start) }); scene(t, ET.stare, { ...EN.worried, arms: LOOK }); },
  tomG(t) { T(2.35); scene(t, ET.lecture, { ...EN.worried, arms: LOOK }); },
  half: ins(halfIns),
  nikI(t) { cam25(620, 1030, 1.38, { shake: 3, dof: 5 }); scene(t, ET.alarm, { ...EN.panic, arms: armsK(LOOK, THROW, sm(pr(t, LN.n09.start, LN.n09.start + 0.4))), squash: take(t, LN.n09.start), wS: 0.5 }); },
  safety: ins(safetyIns),
  nikH(t) { cam25(480, 1000, 1.5, { dof: 5 }); const pk = sm(pr(t, CUE.pillow - 0.5, CUE.pillow));
    scene(t, ex(t, [[0, TOMD0()], [CUE.pillow, ET.alarm]]), { ...EN.eureka, arms: pk > 0.5 ? PIL : armsK(HOLD, UP, sm(pr(t, LN.n10.start, LN.n10.start + 0.3))), pillow: pk > 0.5, squash: take(t, LN.n10.start) }); },
  stare(t) { T(lerp(2.3, 2.55, pr(t, LN.n10.end, CUE.mat))); scene(t, ET.stare, { ...EN.eureka, arms: PIL, pillow: true }); },
  mat(t) { T(2.6, { shake: shakeAt(t), Z: 0.06 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.22) }, { ...EN.eureka, arms: PIL, pillow: true });
    if (t > CUE.mat) { push(540, 330, 1, -0.04); ransom('БЛ*ТЬ', 0, 0, 170, 12960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  wideM(t) { WIDE({ shake: shakeAt(t) }); scene(t, { ...ET.furious, mood: t > CUE.k3 ? 'strain' : undefined }, { ...EN.naive, arms: PIL, pillow: true });
    if (t > CUE.k1) { push(540, 330, 1, 0.03); ransom('1600 ЛЕТ', 0, 0, 140, 12965, { reveal: pr(t, CUE.k1, CUE.k3 + 0.2), pop: true }); pop(); } },
  final(t) { const k = sm(pr(t, CUE.loop - 0.4, DUR)); WIDE();
    scene(t, ex(t, [[0, ET.smug], [CUE.sub, ET.lecture], [CUE.loop - 0.3, ET.deadpan]]),
      t < CUE.loop ? { ...EN.worried, arms: PIL, pillow: true } : { ...EN.doubt, arms: armsK(LOOK, BOX, k), wS: 0.5 });
    if (t > CUE.sub && t < CUE.loop) { push(540, 300, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 12970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 430, 1, 0.02); ransom('КТО ХОДИТ НА БАРАХОЛКУ', 0, 0, 66, 12971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
function TOMD0() { return { lid: 0.55, lk: [-0.8, 0.1], smirk: 0.2 }; }
