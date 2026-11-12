/* Эп. 13 «Тефлон травит?» — сцены v2 по эталону ep12 v3: 2.5D (cam25.js), взрослые эмоции (emo.js), кошачья жизнь Тома
   (охота на котлету, гипноз попугая, умывание, ловит и ест котлету, злорадство над кашляющим попугаем), Никита со сковородкой и банкой «речной» воды,
   переходы по теме: дым ('smoke'), вспышка, хлыст, пролёт. */
frame = frame25;
const CUE = {
  pan: Wd('n01', 1), teeth: Wd('n01', 5), calves: Wd('t01', 3), put: Wd('t01', 8), cutlet: Wd('t01', 13), chemW: Wd('n02', 6),
  subst: Wd('t02', 6), c8: Wd('t02', 11), plant: Wd('t02', 12), river: Wd('t02', 20), dump: Wd('t02', 24),
  cows: Wd('t03', 5), fluor: Wd('t03', 13), ban: Wd('n04', 7),
  knew: Wd('t04', 8), secretI: Wd('t04', 9), secret: Wd('t04', 10), preg: Wd('t04', 13), fetus: Wd('t04', 18), told: Wd('t04', 19),
  fined: Wd('t05', 0), fineI: Wd('t05', 1), mln: Wd('t05', 3), park: Wd('t05', 13),
  people: Wd('t06', 1), six: Wd('t06', 12), kidney: Wd('t06', 15), result: Wd('t06', 17), paid: Wd('t06', 21),
  bloodI: Wd('t07', 1), free: Wd('t07', 6), heat: Wd('t07', 7), parrot: Wd('t07', 15), me: Wd('t07', 16), but2: Wd('t07', 18), blood: Wd('t07', 23), water: Wd('t07', 28),
  river2: Wd('n08', 7), mat: Wd('t08', 0), there: Wd('t08', 3), sub: Wd('t09', 0), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;                         // L<реплика> — начало реплики (для звука)
CUE.toss = LN.n05.start + 0.15; CUE.catch = CUE.toss + 0.75;           // котлета улетает со сковородки — Том ловит
CUE.eat1 = CUE.result;                                                  // доел
const SHAKES = [[CUE.calves, 0.25, 8], [CUE.c8, 0.25, 8], [CUE.cows, 0.25, 8], [CUE.told, 0.3, 10], [CUE.catch, 0.25, 8], [CUE.mln, 0.25, 8], [CUE.paid, 0.3, 10],
  [CUE.water, 0.3, 10], [CUE.mat, 0.5, 16], [CUE.there, 0.3, 10]];
const EP = { title: ['ТЕФЛОН', 'ТРАВИТ?'], cens: { '…Ёб': '…Ё*' },
  hot: /^(сковородку|тефлона|тефлон|зубы|чернеют|выпадают|телят|котлета|химия|си-восемь|dupont|речку|свалке|сто|пятьдесят|три|фтора|знали|восемьдесят|беременных|плоду|властям|сообщили|оштрафовали|шестнадцать|миллионов|долларов|парковку|шестьдесят|девять|тысяч|шестью|рак|почки|шестьсот|семьдесят|миллион|пятнадцатого|пустую|перегревай|попугаи|крови|всех|американцев|воды|речки|натуральная|сливали|кожаный)/i,
  hideMat: [['t08', '…Ёб', CUE.mat]] };
const GRADE = { sat: 1.25, con: 1.07, bri: 1.03 };
const TOMP = { x: 820, y: 761, s: 0.62 }, NIKP = { x: 380, y: 1077, s: 0.95 };
const BIN = { l: [-150, 300, 'open'], r: [190, 230, 'fist'] };            // сковородка над мусоркой
const HOLD = { l: [-150, 300, 'open'], r: [190, 110, 'fist'] };
const SHOW = { l: [-150, 300, 'open'], r: [180, -20, 'fist'] };            // показывает сковородку
const UP = { l: [-150, 300, 'open'], r: [150, -230, 'fist'] };             // дёрнул вверх
const JAR = { l: [-190, 40, 'fist'], r: [190, 110, 'fist'] };              // банка речной воды в левой
const handW = (a, dx = 0) => nikHand({ x: NIKP.x + dx, y: NIKP.y, s: NIKP.s }, a);
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });

/* Кошачья жизнь Тома на кухне — пока Никита отвлекает */
let PAN = [650, 1300];                                                  // где сейчас сковородка (для охоты на котлету)
function tomLife(t) {
  const L = {};
  if (t < LN.t01.end) {                                                 // охотится на котлету в сковородке: развернулся, тянет лапу
    const dx = (TOMP.x - PAN[0]) / TOMP.s, sw = (t % 1.2) < 0.4, k = sw ? sm((t % 1.2) / 0.2) : 0.35;
    Object.assign(L, ET.hunt, { flip: true, lk: [0.9, 0.35], paw: 1, pawX: lerp(170, clamp(dx, 160, 300), k), pawY: lerp(110, 200, k) });
    if (t > CUE.cutlet - 0.3) Object.assign(L, { tongue: 1, lid: 0.4, pup: 0.5 });
  } else if (t >= LN.n02.start && t < LN.t03.start) {                   // гипнотизирует попугая: зрачки во весь глаз, присел, хвост бьёт
    Object.assign(L, ET.hunt, { lk: [-1, 0.1], ears: 0.3, q: 1 - 0.06 - 0.025 * Math.sin(t * 20), tailK: Math.sin(t * 9) * 1.4 });
  } else if (t >= LN.n04.start && t < LN.t04.start) {                   // умывается
    Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });
  } else if (t >= LN.t04.start && t < LN.n05.start) {                   // крадётся к клетке, пока говорит
    Object.assign(L, ET.hunt, { lk: [-1, 0.1], dx: -50 * sm(pr(t, LN.t04.start, LN.t04.start + 1.5)), q: 0.94 });
  }
  if (t >= CUE.toss && t < CUE.catch + 0.3) Object.assign(L, ET.alarm, { paw: 1, pawX: 120, pawY: -120, lk: [-0.6, -0.8] });   // ловит котлету
  if (t >= CUE.catch + 0.3 && t < CUE.eat1) {                          // ест котлету: голова вниз, жуёт; поднимает — говорит с набитым ртом
    const talking = talk('tom', t).m.open > 0.05, down = talking ? 0 : (Math.sin(t * 2.4) > -0.3 ? 1 : 0);
    Object.assign(L, { cutletEat: 1, bob: 70 * down, tilt: 0.12 * down, lid: down ? 0.8 : undefined, chew: !talking && !down });
  }
  if (t >= CUE.eat1 && t < CUE.eat1 + 1.5) Object.assign(L, { tongue: 1, lid: 0.45 });   // облизывается
  if (t >= CUE.heat && t < LN.n08.start) Object.assign(L, { lk: [-1, 0.1] });            // смотрит, как кашляет попугай
  return L;
}
function cutletFly(t) {                                                 // полёт котлеты со сковородки к Тому
  const k = pr(t, CUE.toss, CUE.catch), x = lerp(PAN[0], TOMP.x - 10, k), y = lerp(PAN[1] - 40, TOMP.y + 160, k) - Math.sin(k * Math.PI) * 360;
  push(x, y, 0.6, k * 9); blobP([[-46, -6], [-30, -26], [20, -28], [50, -10], [40, 14], [-20, 18]], '#8a5030', { seed: 13004, lw: 2 }); pop();
}
function scene(t, tomO, nikO, o = {}) {
  let pan = null; const LF = tomLife(t), heat = sm(pr(t, CUE.heat, CUE.heat + 1.2)) * (1 - pr(t, LN.n08.start, LN.n08.start + 1.5));
  plane(0, 2.4, () => kitSky(t, { bell: 1 }));
  plane(1, 1.35, () => kitWall(t, { alarm: heat > 0.5 ? 1 : 0 }));
  plane(2, 1.0, () => {
    kitMid(t, { cough: heat > 0.5 && t < LN.n08.start + 1 });
    if (tomO) { const br = breathe(t, 1), life = { ...LF }, q = (tomO.q ?? 1) * (life.q ?? 1), dx = life.dx ?? 0; delete life.q; delete life.dx;
      layer(() => { const tk = talk('tom', t), m = life.chew ? { open: Math.abs(Math.sin(t * 14)) * 0.35, round: 0.2 } : tk.m;
        tom({ ...TOMP, x: TOMP.x + dx, t, m, tailK: Math.sin(t * 2.6) * 0.6, ...tomO, ...life, bob: tk.bob + br.bob + (life.bob ?? 0), tilt: br.tilt + (life.tilt ?? 0), squash: q }); }, { sx: 9, sy: 11, sb: 16 });
      if (LF.cutletEat) { push(TOMP.x - 10, 990, 0.62); blobP([[-46, -6], [-30, -26], [20, -28], [50, -10], [40, 14], [-20, 18]], '#8a5030', { seed: 13004, lw: 2 }); pop(); } }
    if (nikO) { const n = { legs: 'stand', arms: HOLD, ...nikO }, dx = n.dx ?? 0, br = breathe(t, 2, 1.2);
      layer(() => { const tk = talk('nikita', t); nikita({ ...NIKP, x: NIKP.x + dx, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        if (n.jar) { const [jx, jy] = handW(n.arms.l, dx); jarP(jx, jy - 40, 0.75); }
        const [hx, hy] = handW(n.arms.r, dx), ps = n.pS ?? 0.6; pan = [hx + 150 * ps, hy + 6]; PAN = pan;
        panP(pan[0], pan[1], ps, n.pR ?? 0, { cutlet: t < CUE.toss }); smokeP(pan[0], pan[1] - 20, t, heat); }, { sx: 9, sy: 11, sb: 16 }); }
    if (t >= CUE.toss && t < CUE.catch) cutletFly(t);
  });
  onPlane(1.0, () => sunsetLight(t));
  if (o.fg !== false) plane(3, 0.6, () => kitFg(t));
}
const T = (z, o = {}) => cam25(TOMP.x - 20, TOMP.y + 80, z, { dof: 6, ...o });
const N = (z, o = {}) => cam25(NIKP.x + 60, NIKP.y + 20, z, { dof: 6, ...o });
const WIDE = (o = {}) => cam25(570, 1080, 1.28, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => { push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop();
  if (o.tl !== undefined) timeline13(o.tl, t); }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [LN.n02.start - 0.05, 'nikA', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'], [CUE.c8 - 0.3, 'c8', 'smoke'],
  [LN.n03.start - 0.05, 'nikB', 'whip'], [LN.t03.start - 0.05, 'cowW', 'whip'], [CUE.cows - 0.4, 'cow', 'fly'], [LN.n04.start - 0.05, 'wash', 'whip'],
  [LN.t04.start - 0.05, 'tomC', 'whip'], [CUE.secretI - 0.05, 'secret', 'flash'], [LN.n05.start - 0.05, 'tossW', 'whip'], [LN.t05.start + 0.1, 'tomD'],
  [CUE.fineI - 0.05, 'fine', 'whip'], [LN.n06.start - 0.05, 'nikE', 'whip'], [LN.t06.start - 0.05, 'tomE', 'whip'], [CUE.people - 0.05, 'panel', 'iris'],
  [CUE.result - 0.05, 'paidW', 'whip'], [LN.n07.start - 0.05, 'nikF', 'whip'], [LN.n07.end + 0.05, 'stareT'], [LN.t07.start - 0.05, 'tomG'],
  [CUE.bloodI - 0.05, 'blood', 'whip'], [CUE.heat - 0.05, 'smokeW', 'smoke'], [CUE.me - 0.05, 'tomP', 'whip'], [CUE.but2 - 0.05, 'blood2', 'smoke'],
  [LN.n08.start - 0.05, 'nikH', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.there - 0.05, 'pipe', 'whip'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.22 * sm(pr(t, CUE.pan, CUE.teeth + 0.4)), shake: shakeAt(t) });          // сковородка над мусоркой, Том тянется к котлете
    scene(t, {}, { ...ex(t, [[0, EN.eww], [CUE.teeth - 0.2, EN.horror]]), arms: BIN, squash: take(t, CUE.teeth - 0.2) }); },
  tomA(t) { T(lerp(2.0, 2.35, sm(pr(t, CUE.put - 0.4, CUE.cutlet))), { Z: 0.08 * pr(t, CUE.calves, CUE.cutlet) });
    scene(t, {}, { ...EN.doubt, arms: armsK(BIN, HOLD, sm(pr(t, CUE.put, CUE.put + 0.5))) }); },
  nikA(t) { N(2.0); scene(t, {}, { ...EN.dismiss, arms: SHOW, pS: 0.7, squash: take(t, LN.n02.start, 0.1) }); },
  tomB(t) { T(2.3); scene(t, { ...ET.lecture, q: take(t, LN.t02.start, 0.08) }, { ...EN.doubt }); },
  c8: ins(c8Ins),
  nikB(t) { N(2.05); scene(t, {}, { ...EN.awe, arms: HOLD }); },
  cowW(t) { const cx = 560 + ((t * 9) % 500); windowLook(t, cx + 20, 890, lerp(2.4, 2.9, pr(t, LN.t03.start, CUE.cows))); },   // взгляд в окно на корову с колокольчиком
  cow: ins(cowIns, { tl: 1 }),
  wash(t) { cam25(600, 1050, 1.36, { dof: 5 }); scene(t, ET.deadpan, { ...EN.outrage, arms: SHOW, pS: 0.7, squash: take(t, LN.n04.start, 0.1) }); },
  tomC(t) { T(2.35); scene(t, { ...ET.grave }, { ...EN.outrage }); },
  secret: ins(secretIns, { tl: 0 }),
  tossW(t) { cam25(620, 1000, 1.32, { shake: shakeAt(t), dof: 5 });                              // «Посадили?!» — дёрнул сковородку, котлета улетает к Тому
    scene(t, {}, { ...EN.outrage, arms: armsK(HOLD, UP, sm(pr(t, LN.n05.start, CUE.toss + 0.1))), squash: take(t, LN.n05.start) }); },
  tomD(t) { T(2.3); scene(t, ET.smug, { ...EN.outrage, arms: UP }); },
  fine: ins(fineIns, { tl: 2 }),
  nikE(t) { N(2.05, { Z: 0.2 * sm(pr(t, LN.n06.start, LN.n06.end)) }); scene(t, {}, { ...EN.sad, arms: HOLD, squash: take(t, LN.n06.start, 0.08) }); },   // «И… всё-ё?!» — медленный наезд
  tomE(t) { T(2.35); scene(t, ET.deadpan, { ...EN.sad }); },
  panel: ins(panelIns, { tl: 3 }),
  paidW(t) { WIDE({ shake: shakeAt(t) }); scene(t, ET.smug, { ...EN.shock, arms: HOLD });
    if (t > CUE.paid) { push(540, 360, 1, -0.03); ransom('$671 000 000', 0, 0, 78, 13900, { reveal: pr(t, CUE.paid, CUE.paid + 0.4), pop: true }); pop(); label(540, 480, 'DuPont заплатила по искам, 2017', 0, '#f4e6a8', 0.02, 32); } },
  nikF(t) { cam25(NIKP.x + 160, NIKP.y + 40, 2.1, { Z: 0.06 }); scene(t, {}, { ...EN.worried, lk: [0.7, 0.3], arms: SHOW, pS: 0.75, squash: take(t, LN.n07.start, 0.08) }); },
  stareT(t) { T(lerp(2.3, 2.6, sm(pr(t, LN.n07.end, LN.t07.start + 0.4))), { Z: 0.12 * pr(t, LN.n07.end, LN.t07.start) }); scene(t, ET.stare, { ...EN.worried, arms: SHOW, pS: 0.75 }); },
  tomG(t) { T(2.35); scene(t, ET.lecture, { ...EN.worried, arms: SHOW, pS: 0.75 }); },
  blood: ins(bloodIns),
  smokeW(t) { WIDE({ shake: 2 }); scene(t, ET.sneaky, { ...EN.panic, arms: armsK(SHOW, UP, sm(pr(t, CUE.heat + 0.8, CUE.heat + 1.6))), pS: 0.7 }); },   // пустая сковородка дымит, датчик пищит, попугай кашляет
  tomP(t) { cam25(700, 860, 1.9, { dof: 6 }); scene(t, { ...ET.bliss, lk: [-1, 0], q: take(t, CUE.me, 0.1) }, { ...EN.panic, arms: UP }); },
  blood2: ins(bloodIns),
  nikH(t) { cam25(500, 1000, 1.45, { dof: 5 }); const jk = sm(pr(t, CUE.river2 - 0.5, CUE.river2));
    scene(t, ex(t, [[0, ET.deadpan], [CUE.river2, ET.alarm]]), { ...EN.eureka, arms: jk > 0.5 ? JAR : HOLD, jar: jk > 0.5, squash: take(t, LN.n08.start) }); },
  stare(t) { T(lerp(2.3, 2.55, pr(t, LN.n08.end, CUE.mat))); scene(t, ET.stare, { ...EN.eureka, arms: JAR, jar: true }); },
  mat(t) { T(2.6, { shake: shakeAt(t), Z: 0.06 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.22) }, { ...EN.eureka, arms: JAR, jar: true });
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('Ё* ТВОЮ МАТЬ', 0, 0, 120, 13960, { reveal: pr(t, CUE.mat, CUE.mat + 0.5), pop: true }); pop(); } },
  pipe(t) { windowLook(t, 1000, 740, lerp(1.9, 2.3, pr(t, CUE.there, LN.t09.start)), { shake: shakeAt(t) });   // взгляд в окно на трубу завода: «туда и сливали»
    if (t > CUE.there) { push(540, 380, 1, 0.03); ransom('ТУДА И СЛИВАЛИ', 0, 0, 86, 13965, { reveal: pr(t, CUE.there, CUE.there + 0.4), pop: true }); pop(); } },
  final(t) { const k = sm(pr(t, CUE.loop - 0.4, DUR)); WIDE();
    scene(t, ex(t, [[0, ET.smug], [CUE.sub, ET.lecture], [CUE.loop - 0.3, {}]]), t < CUE.loop ? { ...EN.worried, arms: JAR, jar: true } : { ...EN.eww, arms: armsK(HOLD, BIN, k) });
    if (t > CUE.sub && t < CUE.loop) { push(540, 360, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 13970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 490, 1, 0.02); ransom('КТО БОИТСЯ СКОВОРОДОК', 0, 0, 66, 13971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
