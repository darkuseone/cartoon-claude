/* Эп. 24 «Кот приносит мышей — подарок?» — сцены по эталону ep12 v3. Утро, прихожая.
   Сюжет-мини: мышь выпадает из кроссовка → Том дописывает когтем ещё одну палочку в «отчёт» на обоях → Никита узнаёт, что голод ни при чём, считает миллиарды,
   → «на потом»: Том молча кивает на куртку, Никита лезет в карман («что-то мягкое») → удочка с перьями: Том отбивает её лапой → Никита торжественно поднимает мышь за хвост
   («придётся съесть») → «Сука, не вздумай» → петля: Никита суёт руку во второй кроссовок. */
frame = frame25;
const CUE = {
  shoe: Wd('n01', 1), mouse: Wd('n01', 5), gift: Wd('n01', 9), bow: Wd('t01', 3), report: Wd('t01', 6), night: Wd('t01', 8), why: Wd('n02', 0), feed: Wd('n02', 7),
  y76: Wd('t02', 6), bowl: Wd('t02', 11), rat: Wd('t02', 15), drop: Wd('t02', 17), catch: Wd('t02', 19), back: Wd('t02', 22),
  usa: Wd('t03', 4), homeless: Wd('t03', 9), birds: Wd('t03', 18), twelve: Wd('t03', 20), beasts: Wd('t03', 23), nuB: Wd('n04', 3),
  safe: Wd('t04', 4), later: Wd('t04', 6), version: Wd('t04', 8), teach: Wd('t04', 12), notbelieve: Wd('t04', 19), you: Wd('t04', 23),
  wait: Wd('n05', 0), later2: Wd('n05', 10), pocket: Wd('t05', 1), soft: Wd('n06', 2), stop: Wd('n07', 3),
  brit: Wd('t07', 3), k300: Wd('t07', 6), meat: Wd('t07', 10), third: Wd('t07', 19), play: Wd('t07', 21), quarter: Wd('t07', 29), puzzle: Wd('t07', 31), plus: Wd('t07', 33),
  feed8: Wd('n08', 5), offend: Wd('n08', 9), eat: Wd('n08', 11), mat: Wd('t08', 0), sub: Wd('t09', 0), second: Wd('t09', 4), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.mouse, 0.25, 8], [CUE.report, 0.2, 5], [CUE.back, 0.25, 8], [CUE.beasts, 0.3, 8], [CUE.notbelieve, 0.3, 8], [CUE.soft, 0.3, 8], [CUE.plus, 0.25, 8], [CUE.mat, 0.5, 16], [CUE.second + 0.5, 0.3, 8]];
const EP = { title: ['МЫШЬ', 'В КРОССОВКЕ?'], cens: { '…Сука,': '…С*КА,' },
  hot: /^(кроссовок|мышь|подарок|бантиком|отчёт|ночной|охотишься|голод|семьдесят|сытым|крысу|бросали|доедать|бездомные|двух|половиной|миллиардов|птиц|двенадцати|безопасно|потом|учит|верят|тоже|карман|куртки|мягкое|трёхстах|мяса|злаков|треть|удочкой|четверть|кормушка-головоломка|плюс|съесть|вздумай|второй|кожаный)/i,
  hideMat: [['t08', '…Сука', CUE.mat]] };
const GRADE = { sat: 1.2, con: 1.08, bri: 1.0 };
const TOMP = { x: 830, y: SHOE_TOP - 14 - 239, s: 0.62 }, NIKX = 400, NIKS = 0.95;
const NY = legs => legs === 'kneel' ? 1128 : 1077;
const SHOEUP = { l: [-120, 60, 'fist'], r: [170, -110, 'fist'] }, POINT = { l: [-150, 300, 'open'], r: [205, -40, 'point'] }, OPEN = { l: [-170, 100, 'open'], r: [170, 100, 'open'] };
const POCKET = { l: [-205, 40, 'open'], r: [150, 200, 'open'] }, WAND = { l: [-150, 300, 'open'], r: [200, -60, 'fist'] }, TAIL = { l: [-150, 300, 'open'], r: [110, -170, 'fist'] }, SHOE2 = { l: [190, 260, 'open'], r: [150, 230, 'fist'] };
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const tally = t => t < CUE.report ? 23 : 24;
function mouseFloor(t) { const t0 = CUE.mouse - 0.45; if (t < t0) return null; if (t >= LN.n08.start) return null;
  if (t < t0 + 0.35) { const k = (t - t0) / 0.35; return [lerp(520, 540, k), lerp(1000, 1555, k * k), 4 * k]; } return [540, 1555, 0.1]; }
function tomLife(t) {
  const L = {};
  if (t < LN.t01.start) Object.assign(L, ET.smug, { lk: [-0.8, 0.6] });
  if (t >= CUE.report - 0.5 && t < CUE.report + 0.6) Object.assign(L, ET.deadpan, { paw: 1, pawX: 210 + 25 * Math.sin(t * 20), pawY: -60, lk: [0.9, -0.3] });   // дописывает палочку когтем
  if (t >= LN.n02.start && t < LN.n02.end + 0.3) Object.assign(L, ET.eyeroll);
  if (t >= LN.n03.start && t < LN.t03.start) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });
  if (t >= LN.n04.start && t < LN.t04.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= LN.n05.start && t < LN.t05.end + 0.2) Object.assign(L, ET.sneaky, { lk: [-1, -0.3] });
  if (t >= LN.n07.start && t < CUE.meat - 0.3) Object.assign(L, ET.hunt, { flip: true, paw: 1, pawX: 170 + 40 * Math.sin(t * 8), pawY: 60 + 30 * Math.sin(t * 11), lk: [0.9, 0.2] });   // отбивает перья
  if (t >= LN.n08.start && t < CUE.mat - 0.2) Object.assign(L, ET.alarm, { lk: [-0.9, 0.2] });
  if (t >= CUE.mat - 0.2 && t < LN.t09.start) Object.assign(L, ET.furious, { paw: 1, pawX: 180, pawY: 90 });
  if (t >= LN.t09.start) Object.assign(L, ET.smug, { lk: [-0.8, 0.6] });
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t), MF = mouseFloor(t);
  plane(0, 2.4, () => stairwell(t));
  plane(1, 1.35, () => hallWall(t, { tally: tally(t) }));
  plane(2, 1.0, () => {
    const n = nikO ? { arms: SHOEUP, legs: 'stand', ...nikO } : null;
    hallMid(t, { mouse: MF, sneaker2: !(n && n.prop === 'shoe2'), bulge: t < CUE.soft + 0.5 });
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY(n.legs), s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r);
        if (n.prop === 'shoe') sneaker(hx, hy - 10, 0.75, Math.PI * 0.9);
        if (n.prop === 'shoe2') sneaker(hx + 20, hy + 40, 0.75, 0.1);
        if (n.prop === 'wand') wand(hx, hy - 10, TOMP.x - 120, TOMP.y + 40 + 40 * Math.sin(t * 6), t);
        if (n.prop === 'mouse') { stroke([[hx, hy - 6], [hx + 4, hy + 40]], '#d8a0a8', 3); mouseDead(hx + 4, hy + 70, 0.8, Math.PI / 2 + 0.1 * Math.sin(t * 3), { t }); } }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(20,14,10,0.45)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF };
      layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m: tk.m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(20,14,10,0.45)' }); }
  });
  onPlane(1.0, () => hallLight(t));
  if (o.fg !== false) plane(3, 0.6, () => hallFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 10, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, dx = 0, legs = 'stand', o = {}) => cam25(NIKX + dx + 30, NY(legs) + 43, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 620, 1070, o.z ?? 1.3, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(620, 1080, 1.22, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); } }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tallyT', 'whip'], [LN.n02.start - 0.05, 'feedW', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'], [CUE.y76 - 0.2, 'adamec', 'iris'],
  [LN.n03.start - 0.05, 'nikD', 'whip'], [LN.t03.start - 0.05, 'us', 'fly'], [CUE.twelve - 0.3, 'usB', 'whip'], [LN.n04.start - 0.05, 'nuuW', 'whip'], [CUE.nuB - 0.1, 'stareA'],
  [LN.t04.start - 0.05, 'stash', 'iris'], [CUE.you - 0.5, 'lookT', 'whip'], [LN.n05.start - 0.05, 'nikRealize'], [LN.t05.start - 0.05, 'glanceT', 'whip'], [LN.t05.end + 0.1, 'pocketW', 'whip'],
  [LN.n07.start - 0.05, 'wandW', 'whip'], [CUE.meat - 0.3, 'exeter', 'iris'], [LN.n08.start - 0.05, 'mouseW', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.15, 'mat'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.gift + 0.4)) });                    // переворачивает кроссовок — выпадает мышь
    scene(t, {}, { ...ex(t, [[0, EN.naive], [CUE.mouse - 0.1, EN.eww], [CUE.gift - 0.2, EMO(EN.shock, { jaw: 0.3 })]]), prop: 'shoe', arms: SHOEUP }); },
  tallyT(t) { cam25(TOMP.x + 60, TOMP.y + 40, lerp(2.0, 2.2, pr(t, LN.t01.start, LN.t01.end)), { dof: 6 }); scene(t, { ...ET.deadpan }, null);   // Том дописывает палочку
    if (t > CUE.report + 0.3) { push(540, 420, popK(t, CUE.report + 0.3, 0.3), 0.03); ransom('ОТЧЁТ', 0, 0, 140, 24950, { reveal: 1, pop: true }); pop(); } },
  feedW(t) { TWO(); scene(t, {}, { ...EN.outrage, prop: 'shoe', arms: armsK(SHOEUP, POINT, sm(pr(t, CUE.feed - 0.6, CUE.feed))) }); },
  tomB(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  adamec: ins(adamecIns, { hand: 0.5 }),
  nikD(t) { NIK(2.0, 0, 'stand', { Z: 0.05 }); scene(t, null, { ...EN.dismiss, prop: 'shoe', arms: SHOEUP }); },
  us: ins(usIns, { hand: 0.5 }),
  usB: ins(usIns, { hand: 0.5, zoom: [540, 1000, 1.05] }),
  nuuW(t) { TWO({ Z: 0.06 * pr(t, LN.n04.start, CUE.nuB) }); scene(t, {}, { ...EN.naive, prop: 'shoe', arms: SHOEUP }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.nuB, LN.t04.start))); scene(t, { ...ET.stare }, null); },
  stash: ins(stashIns, { hand: 0.5 }),
  lookT(t) { TOM(2.45); scene(t, { ...ET.deadpan, lk: [-0.9, 0.3] }, null); },
  nikRealize(t) { NIK(lerp(2.0, 2.3, pr(t, LN.n05.start, LN.n05.end)), 0, 'stand', {}); scene(t, null, { ...ex(t, [[0, EN.doubt], [CUE.later2 - 0.3, EN.horror]]), prop: 'shoe', arms: OPEN, lk: [-0.8, 0] }); },
  glanceT(t) { TOM(2.4); scene(t, { ...ET.sneaky, lk: [-1, -0.2] }, null); },
  pocketW(t) { const k = sm(pr(t, LN.t05.end + 0.1, LN.n06.start + 0.2)); cam25(320, 1080, 1.7, { dof: 5, shake: shakeAt(t) });   // рука в кармане куртки
    scene(t, {}, { ...ex(t, [[0, EN.worried], [CUE.soft - 0.2, EMO(EN.horror, { pale: 0.4 })]]), arms: armsK(OPEN, POCKET, k), dx: -60 * k, lk: [-0.8, 0.3] }); },
  wandW(t) { const k = sm(pr(t, LN.n07.start, LN.n07.start + 0.5)); TWO({ Z: 0.05 * pr(t, LN.n07.start, CUE.meat) });            // удочка с перьями
    scene(t, {}, { ...EN.panic, prop: k > 0.5 ? 'wand' : null, arms: k > 0.5 ? WAND : OPEN, dx: 40 }); },
  exeter: ins(exeterIns, { hand: 0.5 }),
  mouseW(t) { const k = sm(pr(t, LN.n08.start, LN.n08.start + 0.7)); TWO({ Z: 0.06 * pr(t, LN.n08.start, LN.n08.end) });         // торжественно поднимает мышь за хвост
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.offend - 0.2, EMO(EN.sad, { lid: 0.3 })], [CUE.eat - 0.2, EMO(EN.proud, { lid: 0.2, brow: 0.6 })]]), prop: k > 0.5 ? 'mouse' : null, arms: k > 0.5 ? TAIL : OPEN, dx: 40 }); },
  stare(t) { TOM(lerp(2.3, 2.6, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.alarm }, null); },
  mat(t) { TOM(2.55, { shake: shakeAt(t), Z: 0.08 }); scene(t, { q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('С*КА,', 0, 0, 150, 24960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); push(560, 540, 1, 0.03); ransom('НЕ ВЗДУМАЙ', 0, 0, 120, 24961, { reveal: pr(t, CUE.mat + 0.4, CUE.mat + 0.7), pop: true }); pop(); } },
  final(t) { WIDE({ shake: shakeAt(t) }); const back = t > CUE.loop - 0.6, k = sm(pr(t, CUE.second - 0.6, CUE.second));   // петля: рука во второй кроссовок
    scene(t, {}, back ? { ...EN.naive, prop: 'shoe', arms: SHOEUP } : { ...ex(t, [[0, EN.worried], [CUE.second + 0.5, EMO(EN.horror, { pale: 0.4 })]]), legs: k > 0.5 ? 'kneel' : 'stand', prop: k > 0.5 ? 'shoe2' : null, arms: k > 0.5 ? SHOE2 : OPEN, dx: 200 * k });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 24970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('У КОГО КОТ-ОХОТНИК', 0, 0, 70, 24971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
