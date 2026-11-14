/* Эп. 14 «Бриллиант — это навсегда?» — сцены по эталону ep12 v3, тон серьёзнее (ночь, дождь, свечи, неон).
   Никита репетирует предложение «на Томе»: встаёт с колен, несёт футляр Тому «на продажу», оседает на «…Пиздец», в финале снова на колене.
   Том: оценщик с лупой, зевает, жуёт розу, фейспалм, лапой захлопывает футляр на «продать — нет», умывается, фейспалм на мате.
   Композиция: в двухшотах оба целиком, в крупных планах второй герой не рисуется (никаких рук из-за края). */
frame = frame25;
const CUE = {
  ring: Wd('n01', 3), forever0: Wd('n01', 8), slog: Wd('t01', 3), stand: Wd('t01', 6), bla: Wd('t01', 9), cat: Wd('t01', 11),
  rare: Wd('n02', 6), made: Wd('t02', 2), cent: Wd('t02', 3), share: Wd('t02', 11), drip: Wd('t02', 18), trad: Wd('n03', 7),
  ancient: Wd('t03', 0), slogan: Wd('t03', 3), y47: Wd('t03', 9), japan: Wd('t03', 11), y67: Wd('t03', 15), y14: Wd('t03', 23), y81: Wd('t03', 27),
  two: Wd('n04', 2), also: Wd('t04', 0), ad80: Wd('t04', 2), forever: Wd('t04', 12), sell: Wd('n05', 4),
  pawn: Wd('t05', 1), third: Wd('t05', 5), thisW: Wd('t05', 6), buy: Wd('t05', 11), no: Wd('t05', 14), pizd: Wd('n06', 0),
  real: Wd('n07', 4), lab: Wd('t07', 0), carbon: Wd('t07', 3), ftc: Wd('t07', 4), deb: Wd('t07', 13), price: Wd('t07', 20),
  forever2: Wd('n08', 7), mat: Wd('t08', 0), slogan2: Wd('t08', 1), sub: Wd('t09', 0), check: Wd('t09', 3), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.bla, 0.2, 6], [CUE.share, 0.25, 8], [CUE.y81, 0.3, 10], [CUE.no, 0.35, 12], [CUE.pizd, 0.3, 6], [CUE.price, 0.3, 10], [CUE.mat, 0.5, 16], [CUE.slogan2, 0.3, 10]];
const EP = { title: ['БРИЛЛИАНТ', 'НАВСЕГДА?'], cens: { 'бля.': 'бл*.', '…Пиздец.': '…П*ЗДЕЦ.', '…Сука.': '…С*КА.' },
  hot: /^(три|зарплаты|навсегда|слоган|кот|редкие|редкими|двадцатый|de|beers|восьмидесяти|процентов|по|чуть|традиция|древняя|реклама|сорок|седьмом|японии|шестьдесят|пяти|четырнадцать|две|вечно|продам|ломбард|треть|купить|продать|нет|углерод|регулятор|алмазом|восемьсот|долларов|карат|честно|работает|чек|кожаный)/i,
  hideMat: [['n06', '…Пиздец', CUE.pizd], ['t08', '…Сука', CUE.mat]] };
const GRADE = { sat: 1.15, con: 1.1, bri: 1.0 };                       // серьёзнее: приглушённо, контрастно, ночной свет
const TOMP = { x: 880, y: 751, s: 0.62 }, NIKX = 400, NIKS = 0.95;
const NY = legs => legs === 'kneel' ? 1128 : 1077;                      // стоит: ноги на полу 1560; на колене — ниже
const PRESENT = { l: [-150, 300, 'open'], r: [205, 0, 'fist'] };          // на колене протягивает футляр Тому
const LIGHT = { l: [-150, 300, 'open'], r: [140, -170, 'fist'] };         // поднял к свету
const HUG = { l: [-40, 200, 'open'], r: [40, 170, 'fist'] };              // прижал футляр к груди
const OFFER = { l: [-150, 300, 'open'], r: [215, -60, 'fist'] };          // несёт Тому «оценить»
const UP = { l: [-150, 300, 'open'], r: [140, -210, 'fist'] };            // триумф
const SLUMP = { l: [-120, 330, 'open'], r: [120, 320, 'fist'] };          // осел, руки висят
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });

/* футляр: открыт / закрыт по сюжету (Том захлопывает на «нет», Никита открывает на «настоящий») */
function boxOpen(t) { if (t < LN.n03.start) return 1; if (t < LN.n04.start) return 1 - sm(pr(t, LN.n03.start, LN.n03.start + 0.2));
  if (t < CUE.no) return sm(pr(t, LN.n04.start, LN.n04.start + 0.3)); if (t < CUE.real) return 1 - sm(pr(t, CUE.no, CUE.no + 0.12)); return sm(pr(t, CUE.real, CUE.real + 0.3)); }
/* Кошачья жизнь Тома в этой серии */
function tomLife(t) {
  const L = {};
  if (t < LN.n02.start) Object.assign(L, ET.appraise, { lk: [-0.8, 0.5] });                          // оценщик с лупой
  if (t >= LN.n02.start + 0.5 && t < LN.n02.end - 0.4) Object.assign(L, ET.yawn);                  // демонстративный зевок на «редкие»
  if (t >= LN.n03.start && t < LN.t03.start) { const chew = Math.abs(Math.sin(t * 13)); Object.assign(L, ET.sneaky, { lk: [1, 0.2], tilt: 0.14, m: { open: 0.15 + 0.3 * chew, round: 0.1 } }); }   // жуёт розу
  if (t >= LN.n04.start + 0.1 && t < LN.t04.start + 0.5) Object.assign(L, ET.facepalm);           // фейспалм на «две зарплаты»
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.3] });      // молча смотрит, как Никита несёт футляр
  if (t >= CUE.buy && t < CUE.no + 0.6) { const k = sm(pr(t, CUE.buy, CUE.no - 0.05)), hit = t >= CUE.no;   // тянет лапу и захлопывает футляр
    Object.assign(L, ET.deadpan, { flip: true, paw: 1, pawX: lerp(175, 205, k), pawY: lerp(110, hit ? 380 : 330, k), lk: [0.8, 0.6] }); }
  if (t >= LN.n07.start && t < LN.t07.start) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });   // умывается
  if (t >= LN.t07.start && t < LN.n08.start) Object.assign(L, ET.appraise);                        // снова лупа: «тот же углерод»
  if (t >= CUE.mat - 0.3 && t < CUE.slogan2) Object.assign(L, ET.facepalm);                         // фейспалм на мате
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  let W0 = null; const LF = tomLife(t), rose = 1 - 0.35 * sm(pr(t, LN.n03.start, LN.t03.start));
  plane(0, 2.4, () => nightCity(t));
  plane(1, 1.35, () => aptWall(t));
  plane(2, 1.0, () => {
    aptMid(t, { rose });
    if (nikO) { const n = { legs: 'stand', arms: OFFER, ...nikO }, dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY(n.legs) + (n.dy ?? 0), s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        if (n.box !== false) { const [hx, hy] = nikHand(P, n.arms.r); W0 = [hx, hy - 40]; ringBox(hx, hy - 34, 0.55, n.boxR ?? 0, { open: n.open ?? boxOpen(t), t }); } }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(5,3,8,0.55)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF }, lm = life.m; delete life.m;
      layer(() => { const tk = talk('tom', t), m = (lm && tk.m.open < 0.05) ? lm : tk.m;
        tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(5,3,8,0.55)' });
      if (t >= LN.n03.start && t < LN.t03.start) { const r = rng(hsh(FRAME, 5)); for (let i = 0; i < 2; i++) { const u = ((t * 0.7 + i * 0.5) % 1); push(1000 - u * 60, 850 + u * 200, 1, u * 4); blobP([[-10, 0], [0, -8], [10, 0], [0, 8]], '#c8243c', { seed: 14800 + i, lw: 1.2 }); pop(); } }   // лепестки падают
    }
  });
  onPlane(1.0, () => aptLight(t, () => { if (W0) radial(W0[0], W0[1], 160, 'rgba(220,240,255,1)', 0.35); }));
  if (o.fg !== false) plane(3, 0.6, () => aptFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 20, TOMP.y + 90, z, { dof: 6, ...o });
const NIK = (legs, z, dx = 0, o = {}) => cam25(NIKX + dx + 30, NY(legs) + 40, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(640, 1040, o.z ?? 1.36, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(640, 1060, 1.25, { dof: 5, ...o });
const ins = (fn, tl, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => { push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop();
  if (tl !== undefined) timeline14(tl, t); }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'glint'], [CUE.stand - 0.1, 'standW', 'whip'], [LN.n02.start - 0.05, 'yawnW', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'],
  [CUE.cent - 0.05, 'cartel', 'iris'], [LN.n03.start - 0.05, 'roseW', 'whip'], [LN.t03.start - 0.05, 'tomC', 'whip'], [CUE.slogan - 0.05, 'slogan', 'fly'], [CUE.japan - 0.05, 'japan', 'whip'],
  [LN.n04.start - 0.05, 'palmW', 'whip'], [CUE.ad80 - 0.05, 'salary', 'flash'], [LN.n05.start - 0.05, 'offerW', 'whip'], [LN.t05.start - 0.05, 'tomD', 'whip'], [CUE.pawn - 0.05, 'pawnLook', 'whip'],
  [CUE.third - 0.6, 'resale', 'fly'], [CUE.thisW - 0.05, 'slapW', 'whip'], [LN.n06.start - 0.05, 'nikDown'], [LN.n07.start - 0.05, 'lickW', 'whip'], [LN.t07.start - 0.05, 'tomE', 'glint'],
  [CUE.carbon - 0.05, 'lab', 'glint'], [LN.n08.start - 0.05, 'winW', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.slogan2 - 0.05, 'billboard', 'whip'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.18 * sm(pr(t, CUE.ring, CUE.forever0 + 0.5)) });            // на колене перед Томом с открытым футляром
    scene(t, {}, { ...ex(t, [[0, EN.proud], [CUE.forever0 - 0.2, EMO(EN.proud, { grin: 0.5 })]]), legs: 'kneel', arms: PRESENT }); },
  tomA(t) { TOM(lerp(2.15, 2.4, pr(t, LN.t01.start, CUE.stand)), { Z: 0.06 }); scene(t, { ...ET.deadpan }, null); },
  standW(t) { const up = sm(pr(t, CUE.stand, CUE.stand + 0.5)); TWO({ shake: shakeAt(t) });            // «встань с колен» — встаёт
    scene(t, { ...ex(t, [[0, ET.stare], [CUE.cat - 0.1, ET.smug]]) }, { ...EN.doubt, legs: up > 0.5 ? 'stand' : 'kneel', dy: up > 0.5 ? 0 : 0, arms: armsK(PRESENT, LIGHT, up) }); },
  yawnW(t) { TWO(); scene(t, {}, { ...EN.dismiss, arms: LIGHT }); },
  tomB(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  cartel: ins(cartelIns, 0, { hand: 0.5 }),
  roseW(t) { TWO({ z: 1.4 }); scene(t, {}, { ...EN.outrage, arms: HUG }); },
  tomC(t) { TOM(2.35); scene(t, { ...ET.smug }, null); },
  slogan: ins(sloganIns, 1),
  japan: ins(japanIns, 2),
  palmW(t) { TWO({ z: 1.42 }); scene(t, {}, { ...EN.awe, arms: armsK(HUG, LIGHT, sm(pr(t, LN.n04.start, LN.n04.start + 0.4))) }); },
  salary: ins(salaryIns, 3),
  offerW(t) { const k = sm(pr(t, CUE.sell - 0.8, CUE.sell + 0.6)); TWO({ Z: 0.1 * pr(t, LN.n05.start, LN.n05.end) });   // «Ну-у… продам» — несёт футляр Тому
    scene(t, {}, { ...EN.naive, arms: armsK(LIGHT, OFFER, k), dx: 150 * k }); },
  tomD(t) { TOM(2.3); scene(t, { ...ET.deadpan, lid: 0.7 }, null); },
  pawnLook(t) { windowLook(t, 190, 760, lerp(2.0, 2.4, pr(t, CUE.pawn, CUE.third))); },
  resale: ins(resaleIns),
  slapW(t) { cam25(700, 1020, lerp(1.6, 1.75, pr(t, CUE.thisW, CUE.no)), { shake: shakeAt(t), dof: 5 });   // «купить можно, продать — нет» — Том захлопывает футляр
    scene(t, {}, { ...ex(t, [[0, EN.naive], [CUE.no, EN.shock]]), arms: OFFER, dx: 150 }); },
  nikDown(t) { const k = sm(pr(t, LN.n06.start - 0.1, LN.n06.start + 0.5)); NIK(k > 0.5 ? 'kneel' : 'stand', 2.0, 150, { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) });   // оседает на колени: «…Пиздец»
    scene(t, null, { ...EN.horror, jaw: 0.1, legs: k > 0.5 ? 'kneel' : 'stand', arms: SLUMP, dx: 150, lean: 0.08 * k, tilt: 0.1 * k, lid: 0.4 }); },
  lickW(t) { TWO(); const k = sm(pr(t, CUE.real - 0.3, CUE.real + 0.3)); scene(t, {}, { ...EN.proud, legs: 'kneel', arms: armsK(SLUMP, LIGHT, k), dx: 150 }); },
  tomE(t) { TOM(2.35); scene(t, { ...ET.appraise }, null); },
  lab: ins(labIns, 4),
  winW(t) { TWO({ Z: 0.06 * pr(t, LN.n08.start, LN.n08.end) }); const k = sm(pr(t, LN.n08.start, LN.n08.start + 0.5));   // встаёт, футляр над головой: «он реально навсегда!»
    scene(t, { ...ET.stare }, { ...EN.eureka, legs: k > 0.5 ? 'stand' : 'kneel', arms: armsK(LIGHT, UP, k), dx: 150 }); },
  stare(t) { TOM(lerp(2.3, 2.65, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare }, null); },
  mat(t) { TOM(2.6, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('С*КА', 0, 0, 170, 14960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); } },
  billboard(t) { windowLook(t, 470, 330, lerp(2.2, 2.6, pr(t, CUE.slogan2, LN.t09.start)), { shake: shakeAt(t) });   // «Слоган работает» — билборд «НАВСЕГДА» горит за окном
    if (t > CUE.slogan2) { push(540, 1180, 1, 0.03); ransom('СЛОГАН РАБОТАЕТ', 0, 0, 84, 14965, { reveal: pr(t, CUE.slogan2, CUE.slogan2 + 0.4), pop: true }); pop(); } },
  final(t) { cam25(640, 990, 1.25, { dof: 5 }); const back = t > CUE.loop - 0.5;
    scene(t, ex(t, [[0, ET.smug], [CUE.check - 0.3, EMO(ET.lecture, { pawX: 250, pawY: 330, lk: [0.6, 0.8] })], [CUE.loop - 0.3, ET.appraise]]),   // лапой на пакет с чеком
      back ? { ...EN.proud, legs: 'kneel', arms: PRESENT } : { ...EN.eureka, arms: UP, dx: 150 });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 14970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО КУПИЛ КОЛЬЦО', 0, 0, 74, 14971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
