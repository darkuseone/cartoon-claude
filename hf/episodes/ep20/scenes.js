/* Эп. 20 «Паста во всю щётку — развод?» — сцены по эталону ep12 v3. Ночь, ванная гостиничного номера.
   Никита: давит полоску во всю щётку, машет щёткой, в финале подносит тюбик ко рту («буду глотать»).
   Том на столешнице: ловит лапой струю из крана, гоняет колпачок от пасты, умывается, зевает, на «не полощи» лапой закрывает кран, фейспалм. */
frame = frame25;
const CUE = {
  ended: Wd('n01', 2), ad: Wd('n01', 12), stripe: Wd('t01', 2), bla: Wd('t01', 7), pic: Wd('t01', 9), pea: Wd('t01', 12), dal: Wd('n02', 0), more: Wd('n02', 2),
  brushW: Wd('t02', 1), foam: Wd('t02', 4), fluor: Wd('t02', 8), adult: Wd('t02', 10), peaG: Wd('t02', 14), spit: Wd('t02', 18),
  under3: Wd('t03', 3), rice: Wd('t03', 7), three6: Wd('t03', 10), pea3: Wd('t03', 13), usa: Wd('t03', 16), pct: Wd('t03', 20), more3: Wd('t03', 29),
  swallow: Wd('t04', 2), extra: Wd('t04', 4), spots: Wd('t04', 8), fluorosis: Wd('t04', 12), pea4: Wd('t04', 15),
  nuB: Wd('n05', 2), rinse: Wd('n05', 6), nhs: Wd('t05', 3), spitS: Wd('t05', 7), norinse: Wd('t05', 10), longer: Wd('t05', 13), ohr: Wd('n06', 0),
  peaR: Wd('t07', 0), ppm: Wd('t07', 7), two: Wd('t07', 12), night: Wd('t07', 18), spitR: Wd('t07', 21), swallow8: Wd('n08', 6), fluor8: Wd('n08', 8),
  mat: Wd('t08', 0), instr: Wd('t08', 3), sub: Wd('t09', 0), many: Wd('t09', 2), loop: LN.t09.end + 0.3
};
for (const k in LN) CUE['L' + k] = LN[k].start;
const SHAKES = [[CUE.bla, 0.2, 6], [CUE.pea, 0.25, 8], [CUE.pct, 0.3, 8], [CUE.fluorosis, 0.3, 10], [CUE.norinse, 0.25, 8], [CUE.ohr, 0.3, 6], [CUE.mat, 0.5, 16], [CUE.instr, 0.25, 8]];
const EP = { title: ['ПАСТА ВО ВСЮ', 'ЩЁТКУ?'], cens: { 'бля,': 'бл*,', '…Ёб': '…Ё*' },
  hot: /^(тюбик|неделю|рекламе|полоска|картинки|горошин|щётка|пена|фтор|взрослому|сплёвываешь|меньше|трёх|мазок|рисовое|шести|америке|сорок|процентов|нормы|глотает|лишний|пятна|флюороз|полощи|дольше|тысячу|триста|пятьдесят|две|минуты|два|раза|сном|сплюнул|полощешь|глотать|сплёвывать|инструкции|кожаный|много)/i,
  hideMat: [['t08', '…Ёб', CUE.mat]] };
const GRADE = { sat: 1.15, con: 1.1, bri: 1.0 };
const TOMP = { x: 900, y: CTOP - 26 - 239, s: 0.62 }, NIKX = 430, NIKS = 0.95, NY = 1077;
const SQUEEZE = { l: [140, 40, 'fist'], r: [190, -20, 'fist'] }, WAVE = { l: [-150, 300, 'open'], r: [175, -130, 'fist'] }, HOLD = { l: [-150, 300, 'fist'], r: [150, 110, 'fist'] };
const MOUTH = { l: [-150, 300, 'open'], r: [60, -60, 'fist'] }, OFFER = { l: [-150, 300, 'fist'], r: [205, -30, 'fist'] };
const lerpArm = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[2]];
const armsK = (A, B, k) => ({ l: lerpArm(A.l, B.l, k), r: lerpArm(A.r, B.r, k) });
const TAP = () => CUE.norinse - 0.1, waterOn = t => t < TAP() + 0.2;
const capX = t => t < CUE.dal ? 820 : t < LN.t02.start ? lerp(820, 1040, sm(pr(t, CUE.dal, CUE.dal + 1.2))) : 1040;   // колпачок гоняет лапой
function tomLife(t) {
  const L = {};
  if (t < LN.t01.start + 0.2) Object.assign(L, ET.hunt, { flip: true, paw: 1, pawX: 194 + 10 * Math.sin(t * 9), pawY: 270 + 14 * Math.sin(t * 13), lk: [0.9, 0.6] });   // ловит струю
  if (t >= CUE.dal && t < LN.t02.start) { const k = Math.sin(t * 8); Object.assign(L, ET.hunt, { paw: 1, pawX: 200 + 30 * k, pawY: 330, lk: [0.8, 0.9] }); }            // гоняет колпачок
  if (t >= LN.n03.start && t < LN.t03.start + 0.2) Object.assign(L, { paw: 1, pawX: 70, pawY: 70, tongue: Math.sin(t * 9) > 0 ? 1 : 0.4, tilt: -0.08, lid: 0.6 });
  if (t >= LN.n04.start + 0.2 && t < LN.n04.end + 0.3) Object.assign(L, ET.yawn);
  if (t >= LN.n05.start && t < LN.t05.start) Object.assign(L, ET.stare, { lk: [-0.9, 0.4] });
  if (t >= TAP() - 0.4 && t < TAP() + 0.6) { const k = sm(pr(t, TAP() - 0.4, TAP())); Object.assign(L, ET.deadpan, { flip: true, paw: 1, pawX: lerp(150, 290, k), pawY: lerp(220, 150, k), lk: [0.9, 0.3] }); }   // закрывает кран
  if (t >= LN.n08.start && t < CUE.mat - 0.3) Object.assign(L, ET.stare, { lk: [-0.9, 0.5] });
  if (t >= CUE.instr + 0.6 && t < LN.t09.start) Object.assign(L, ET.facepalm);
  return L;
}
function scene(t, tomO, nikO, o = {}) {
  const LF = tomLife(t);
  plane(0, 2.4, () => hotelCity(t));
  plane(1, 1.35, () => bathWall(t));
  plane(2, 1.0, () => {
    counter(t, { water: waterOn(t), bat: t < LN.t01.start + 0.2, cap: [capX(t), t * 3] });
    const n = nikO ? { arms: HOLD, ...nikO } : null;
    if (n) { const dx = n.dx ?? 0, br = breathe(t, 2, 1.0), P = { x: NIKX + dx, y: NY, s: NIKS };
      layer(() => { const tk = talk('nikita', t); nikita({ ...P, t, m: tk.m, bob: tk.bob + br.bob, tilt: (n.tilt ?? 0) + br.tilt, ...n });
        const [hx, hy] = nikHand(P, n.arms.r), [lx, ly] = nikHand(P, n.arms.l);
        if (n.gulp) pasteTube(hx, hy - 60, 0.55, 2.6); else brush(hx - 4, hy - 70, 0.62, n.br ?? 0.2, { paste: n.paste ?? 'full' });
        if (!n.gulp && n.tubeL !== false) pasteTube(lx, ly - 40, 0.5, n.tr ?? 0.4); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(10,10,20,0.5)' }); }
    if (tomO) { const br = breathe(t, 1, 0.8), life = { ...LF };
      layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, tailK: Math.sin(t * 1.6) * 0.5, ...tomO, ...life, m: tk.m, bob: tk.bob + br.bob, tilt: br.tilt + (life.tilt ?? 0) + (tomO.tilt ?? 0), squash: tomO.q ?? 1 }); }, { sx: 10, sy: 12, sb: 18, sc: 'rgba(10,10,20,0.5)' }); }
  });
  onPlane(1.0, () => bathLight(t));
  if (o.fg !== false) plane(3, 0.6, () => bathFg(t));
}
const TOM = (z, o = {}) => cam25(TOMP.x - 30, TOMP.y + 110, z, { dof: 6, ...o });
const NIK = (z, dx = 0, o = {}) => cam25(NIKX + dx + 30, 1120, z, { dof: 6, ...o });
const TWO = (o = {}) => cam25(o.cx ?? 640, 1050, o.z ?? 1.27, { dof: 5, ...o });
const WIDE = (o = {}) => cam25(650, 1070, 1.22, { dof: 5, ...o });
const ins = (fn, o = {}) => (t, u) => insert25(t, () => fn(t, { ...CUE, bg: 1 }), () => {
  if (o.zoom) { const [zx, zy, zz] = o.zoom; push(540, 960, zz); push(-zx, -zy); } push(540, 1000, 0.88); push(-540, -1000); fn(t, { ...CUE, fg: 1 }); pop(); pop(); if (o.zoom) { pop(); pop(); } }, { shake: shakeAt(t), ...o });

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA', 'whip'], [CUE.pic - 0.3, 'peaA', 'flash'], [LN.n02.start - 0.05, 'nikMore', 'whip'], [LN.t02.start - 0.05, 'tomB', 'whip'],
  [CUE.fluor - 0.3, 'peaB', 'iris'], [LN.n03.start - 0.05, 'lickW', 'whip'], [LN.t03.start - 0.05, 'kids', 'fly'], [CUE.usa - 0.3, 'kidsB', 'whip'], [LN.n04.start - 0.05, 'yawnW', 'whip'],
  [LN.t04.start - 0.05, 'tomC', 'whip'], [CUE.spots - 0.4, 'fluorI', 'iris'], [LN.n05.start - 0.05, 'nuuW', 'whip'], [CUE.nuB - 0.1, 'stareA'], [LN.t05.start - 0.05, 'tomD', 'whip'],
  [CUE.spitS - 0.4, 'tapW', 'whip'], [CUE.norinse + 0.5, 'spitI', 'iris'], [LN.n06.start - 0.05, 'nikOhr'], [LN.n07.start - 0.05, 'twoW', 'whip'], [LN.t07.start - 0.05, 'tomE', 'whip'],
  [CUE.ppm - 0.6, 'rule', 'iris'], [CUE.night - 0.3, 'ruleB', 'whip'], [LN.n08.start - 0.05, 'gulpW', 'whip'], [LN.n08.end + 0.06, 'stare'], [CUE.mat - 0.3, 'mat'], [CUE.instr - 0.1, 'instrT'], [LN.t09.start - 0.08, 'final', 'whip']];

const SH = {
  cold(t) { WIDE({ Z: 0.14 * sm(pr(t, 0.3, CUE.ad + 0.4)) }); scene(t, {}, { ...ex(t, [[0, EN.proud], [CUE.ended - 0.2, EN.outrage]]), arms: armsK(SQUEEZE, WAVE, sm(pr(t, CUE.ended - 0.3, CUE.ended + 0.3))) }); },
  tomA(t) { TOM(lerp(2.1, 2.35, pr(t, LN.t01.start, CUE.pic))); scene(t, { ...ET.deadpan }, null); },
  peaA: ins(peaIns, { hand: 0.5 }),
  nikMore(t) { NIK(2.0, 0, { Z: 0.05 }); scene(t, null, { ...EN.outrage, arms: WAVE }); },
  tomB(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  peaB: ins(peaIns, { hand: 0.5, zoom: [540, 1000, 1.05] }),
  lickW(t) { TWO(); scene(t, {}, { ...EN.naive, arms: HOLD }); },
  kids: ins(kidsIns, { hand: 0.5 }),
  kidsB: ins(kidsIns, { hand: 0.5, zoom: [540, 1010, 1.05] }),
  yawnW(t) { TWO(); scene(t, {}, { ...EN.dismiss, arms: WAVE }); },
  tomC(t) { TOM(2.3); scene(t, { ...ET.grave }, null); },
  fluorI: ins(fluorIns, { hand: 0.5 }),
  nuuW(t) { const k = sm(pr(t, LN.n05.start, LN.n05.start + 1.0)); TWO({ Z: 0.06 * pr(t, LN.n05.start, CUE.nuB) }); scene(t, {}, { ...EN.naive, arms: armsK(HOLD, OFFER, k), dx: 100 * k }); },
  stareA(t) { TOM(lerp(2.3, 2.5, pr(t, CUE.nuB, LN.t05.start))); scene(t, { ...ET.stare }, null); },
  tomD(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  tapW(t) { cam25(780, 1060, lerp(1.6, 1.75, pr(t, CUE.spitS - 0.4, CUE.norinse + 0.5)), { dof: 5, shake: shakeAt(t) }); scene(t, {}, { ...EN.doubt, arms: OFFER, dx: 100 }); },
  spitI: ins(spitIns, { hand: 0.5 }),
  nikOhr(t) { NIK(2.1, 100, { Z: 0.1 * pr(t, LN.n06.start, LN.n06.end + 0.3) }); scene(t, null, { ...EN.awe, jaw: 0.2, arms: HOLD, dx: 100 });
    if (t > CUE.ohr) { push(540, 420, 1, -0.04); ransom('ОХРЕНЕТЬ', 0, 0, 120, 20955, { reveal: pr(t, CUE.ohr, CUE.ohr + 0.25), pop: true }); pop(); } },
  twoW(t) { TWO(); scene(t, { ...ET.eyeroll }, { ...EN.worried, arms: HOLD, dx: 100, paste: 'pea' }); },
  tomE(t) { TOM(2.3); scene(t, { ...ET.lecture }, null); },
  rule: ins(ruleIns, { hand: 0.5 }),
  ruleB: ins(ruleIns, { hand: 0.5, zoom: [540, 1010, 1.05] }),
  gulpW(t) { const k = sm(pr(t, CUE.swallow8 - 0.6, CUE.swallow8)); TWO({ Z: 0.05 * pr(t, LN.n08.start, LN.n08.end) });
    scene(t, {}, { ...ex(t, [[0, EN.eureka], [CUE.swallow8, EMO(EN.proud, { grin: 0.5 })]]), gulp: k > 0.5, arms: k > 0.5 ? MOUTH : armsK(HOLD, WAVE, k * 2), dx: 100 }); },
  stare(t) { TOM(lerp(2.3, 2.65, pr(t, LN.n08.end, CUE.mat)), { Z: 0.1 * pr(t, LN.n08.end, CUE.mat) }); scene(t, { ...ET.stare, lk: [-0.9, 0.5] }, null); },
  mat(t) { TOM(2.6, { shake: shakeAt(t), Z: 0.08 }); scene(t, { ...ET.furious, q: take(t, CUE.mat, 0.08) }, null);
    if (t > CUE.mat) { push(540, 380, 1, -0.04); ransom('Ё* ТВОЮ', 0, 0, 150, 20960, { reveal: pr(t, CUE.mat, CUE.mat + 0.2), pop: true }); pop(); push(560, 540, 1, 0.03); ransom('МАТЬ', 0, 0, 150, 20961, { reveal: pr(t, CUE.mat + 0.2, CUE.mat + 0.4), pop: true }); pop(); } },
  instrT(t) { TOM(2.45, { shake: shakeAt(t) }); scene(t, { ...ET.deadpan }, null); if (t > CUE.instr) { push(540, 420, popK(t, CUE.instr, 0.3), 0.03); ransom('СПЛЁВЫВАТЬ!', 0, 0, 110, 20965, { reveal: 1, pop: true }); pop(); } },
  final(t) { WIDE(); const back = t > CUE.loop - 0.6;
    scene(t, ex(t, [[0, ET.deadpan], [CUE.many - 0.3, EMO(ET.lecture, { lk: [-0.8, 0.4] })]]), back ? { ...EN.proud, arms: SQUEEZE } : { ...EN.sad, arms: HOLD, dx: 100, paste: 'pea' });
    if (t > CUE.sub && t < CUE.loop) { push(540, 330, 1, -0.03); ransom('ПЕРЕШЛИ ТОМУ,', 0, 0, 92, 20970, { reveal: pr(t, CUE.sub, CUE.sub + 0.3) }); pop();
      push(540, 450, 1, 0.02); ransom('КТО ДАВИТ ПОЛТЮБИКА', 0, 0, 70, 20971, { reveal: pr(t, CUE.sub + 0.3, CUE.sub + 0.7) }); pop(); } }
};
