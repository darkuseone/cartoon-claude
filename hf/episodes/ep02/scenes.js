/* Эп. 2 «Телефоны нас слушают?» — сцены. Метки от слов озвучки (их же берёт звук). */
const WS = {}; LINES.forEach(l => { WS[l.key] = l.words.filter(w => w.w !== '—').map(w => w.s); });
const Wd = (k, i) => WS[k][i]; const LN = {}; LINES.forEach(l => { LN[l.key] = l; });

const CUE = {
  foil: Wd('t01', 2), corm: Wd('n02', 3), today: Wd('n02', 5), bla: Wd('n02', 7), ad: Wd('n02', 8),
  googled: Wd('t02', 3), three: Wd('t02', 4), saw: Wd('t02', 6), other: Wd('n03', 1),
  shortly: Wd('t03', 0), apps: Wd('t03', 4), none: Wd('t03', 7), mic: Wd('t03', 11),
  rec: Wd('t04', 2), screen: Wd('t04', 3), scroll: Wd('t04', 14), how: Wd('n04', 0),
  lit: LN.t05.start - 0.08, geo: Wd('t05', 4), search: Wd('t05', 5), likes: Wd('t05', 6), wifi: Wd('t05', 11), lyoha: Wd('t05', 13), bought: Wd('t05', 17),
  brain: Wd('t06', 1), one: Wd('t06', 3), miss: Wd('t06', 6),
  gotcha: Wd('n05', 0), boast: Wd('n05', 5), was: Wd('t07', 0), checked: Wd('t07', 4), nobody: Wd('t07', 5),
  lied: Wd('t08', 2), phew: Wd('n06', 0), remove: Wd('n06', 2),
  siri: Wd('t09', 2), alice: Wd('t09', 4), word: Wd('t09', 8), apple: Wd('t09', 11), mln: Wd('t09', 13), suit: Wd('t09', 18),
  hatBack: LN.t09.end + 0.15, keep: Wd('t10', 0), suits: Wd('t10', 2), sub: Wd('t10', 4), lightOff: LN.t10.end + 0.1
};

function ex(t, list, d = 0.08) { let cur = {}, prev = {}, t0 = -1e9; for (const [tt, o] of list) if (t >= tt) { prev = cur; cur = { ...cur, ...o }; t0 = tt; }
  const k = sm((t - t0) / d), r = { ...cur }; for (const key in cur) if (typeof cur[key] === 'number' && typeof prev[key] === 'number') r[key] = lerp(prev[key], cur[key], k); return r; }
function ck(t, K) { if (t <= K[0][0]) return K[0].slice(1); for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const a = K[i - 1], b = K[i], k = eio((t - a[0]) / (b[0] - a[0])); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], k)]; } return K[K.length - 1].slice(1); }
const lit = t => t >= CUE.lit && t < CUE.lightOff;
function talk(who, t) { const m = mouthAt(who, t); return { m, bob: m.talking ? -m.open * 5 : 0 }; }
const SHAKES = [[CUE.bla, 0.3, 10], [CUE.lied, 0.4, 14], [CUE.none, 0.25, 10], [CUE.nobody, 0.3, 10], [CUE.mln, 0.3, 10]];
function shakeAt(t) { let s = 0; for (const [t0, d, a] of SHAKES) if (t >= t0 && t < t0 + d) s = Math.max(s, a * (1 - (t - t0) / d)); return s; }

const NIKP = { x: 360, y: 960, s: 0.95 }, TOMP = { x: 790, y: 1000, s: 0.62 };
const PHONEW = () => [NIKP.x + 0, NIKP.y + 200 * NIKP.s];
const NIKBASE = { legs: 'sit', foil: 1, arms: { l: [-30, 196, 'phone'], r: [40, 214, 'fist'] } };
function room(t, tomO, nikO, extra) {
  livingRoom(t, { lit: lit(t) }); sofaBack();
  if (tomO) layer(() => { const tk = talk('tom', t); tom({ ...TOMP, t, m: tk.m, bob: tk.bob, ...tomO }); }, { sx: 7, sy: 8, sb: 12 });
  if (nikO) layer(() => { const tk = talk('nikita', t); nikita({ ...NIKP, t, m: tk.m, bob: tk.bob, ...NIKBASE, ...nikO, phoneLit: !lit(t) }); }, { sx: 7, sy: 8, sb: 12 });
  sofaFront(); if (extra) extra();
  if (!lit(t)) lightmap('#6470ad', () => { const [px, py] = PHONEW(); radial(px, py - 60, 320, 'rgba(200,225,255,1)', 0.95); radial(840, 400, 520, 'rgba(170,190,255,1)', 0.5); radial(TOMP.x, TOMP.y, 120, 'rgba(160,255,120,0.3)', 1); });
  else lightmap('#d6c4ae', () => { radial(96, 650, 1100, 'rgba(255,236,200,1)', 0.85); radial(560, 1100, 1200, 'rgba(255,255,255,1)', 0.3); });
  if (!lit(t) && tomO && (tomO.lid ?? 0.45) < 0.95 && tomO.mood !== 'bliss') [-1, 1].forEach(sd => glowAdd(TOMP.x + sd * 55 * TOMP.s, TOMP.y - 16, 60, 'rgba(180,255,90,0.55)', 0.8));
}
function slideIn(u, fn) { const k = step(clamp(u / 0.25), 24); push((1 - eo(k)) * 1100, 0, 1, (1 - k) * 0.08); fn(); pop(); }
const TOMD = { lid: 0.55, lk: [-0.8, 0], smirk: 0.3 };

const SHOTS = [[0, 'cold'], [LN.t01.start - 0.03, 'tomA'], [LN.n02.start - 0.05, 'nikA'], [CUE.today - 0.05, 'ad'], [LN.t02.start - 0.05, 'search'], [LN.n03.start - 0.05, 'nikB'],
  [CUE.shortly - 0.03, 'apps'], [LN.t04.start - 0.05, 'rec'], [LN.n04.start - 0.05, 'nikC'], [CUE.lit - 0.35, 'lamp'], [CUE.geo - 0.45, 'threads'], [LN.t06.start - 0.05, 'brain'],
  [LN.n05.start - 0.05, 'gotcha'], [LN.t07.start - 0.05, 'news'], [LN.t08.start - 0.1, 'tomB'], [LN.n06.start - 0.05, 'relief'], [LN.t09.start - 0.05, 'siri'], [CUE.apple - 0.1, 'money'],
  [CUE.hatBack, 'hatBack'], [CUE.keep - 0.05, 'final']];
const shotAt = t => { let i = 0; while (i < SHOTS.length - 1 && t >= SHOTS[i + 1][0]) i++; return i; };
const SC = SHOTS.map((s, i) => [s[1], s[0], i + 1 < SHOTS.length ? SHOTS[i + 1][0] : DUR]);
function frame(t) { const i = shotAt(t); SH[SHOTS[i][1]](t, t - SHOTS[i][0]); }

const SH = {
  cold(t) { const [cx, cy, z] = ck(t, [[0, 575, 1090, 1.42], [LN.t01.start, 575, 1080, 1.5]]); cam(cx, cy, z);
    room(t, { ...TOMD, lid: 0.6 }, { mood: 'shock', lk: [0.9, 0.2], brow: 0.6 }); pop(); },
  tomA(t) { cam(790, 990, 2.2); room(t, ex(t, [[0, { ...TOMD }], [CUE.foil, { lid: 0.5, lk: [-0.9, -0.5], brow: -0.3 }]]), { mood: 'shock' }); pop(); },
  nikA(t) { cam(360, 960, 2.0, 0, shakeAt(t)); room(t, TOMD, { mood: 'angry', brow: -0.5, lk: [0.9, 0] }); pop(); },
  ad(t, u) { cam(540, 960, 1, 0, shakeAt(t)); rectP(-100, -100, 1280, 2200, '#2b2a3a', { seed: 2000, line: false, step: 80 });
    slideIn(u, () => bigPhone(540, 860, 1.05, -0.04, () => adScreen(t, CUE.ad))); pop();
    if (t > CUE.ad) { push(540, 230, 1, 0.03); ransom('ОН СЛЫШАЛ!', 0, 0, 100, 2001, { reveal: pr(t, CUE.ad, CUE.ad + 0.3), pop: true }); pop(); } },
  search(t, u) { cam(540, 960, 1); slideIn(u, () => { cork(); searchCard(540, 760, 1.12, t, CUE.googled - 0.2);
      if (t > CUE.three) { push(540, 1250, 1, -0.05); ransom('×3', 0, 0, 170, 2002, { reveal: pr(t, CUE.three, CUE.three + 0.2), pop: true }); pop(); } }); pop(); },
  nikB(t) { cam(360, 960, 2.0); room(t, TOMD, { mood: 'dumb', brow: 0.9, lk: [0.7, -0.3], smile: 0.3 }); pop(); },
  apps(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => { cork(); card(540, 300, 820, 170, -0.02, 2010, '#fbfaf6'); txt('ПРОВЕРИЛИ ПРИЛОЖЕНИЯ', 540, 300, 50, { font: 'Inter Black', col: '#1c1512', rot: -0.02 });
      appGrid(t, CUE.apps - 0.3, t > CUE.none ? CUE.none : 0);
      if (t > CUE.apps) { push(540, 1440, 1, 0.03); ransom('17 000+', 0, 0, 120, 2011, { reveal: pr(t, CUE.apps, CUE.apps + 0.3) }); pop(); }
      if (t > CUE.mic) { push(540, 1120, 1, -0.04); card(0, 0, 640, 110, 0, 2012, '#f4e6a8'); txt('микрофон тайком — 0', 0, 4, 50, { font: 'Inter Black', col: '#1c1512' }); pop(); } }); pop(); },
  rec(t, u) { cam(540, 960, 1); rectP(-100, -100, 1280, 2200, '#2b2a3a', { seed: 2020, line: false, step: 80 });
    const z = 1 + eio(pr(t, CUE.scroll - 0.4, CUE.scroll + 0.3)) * 0.18;
    slideIn(u, () => bigPhone(540, 900, 1.05 * z, 0.03, () => recScreen(t))); pop();
    if (t > CUE.rec) { push(540, 240, 1, -0.03); ransom('ЗАПИСЬ ЭКРАНА', 0, 0, 84, 2021, { reveal: pr(t, CUE.rec, CUE.rec + 0.3) }); pop(); } },
  nikC(t) { cam(360, 960, 2.0); room(t, TOMD, { mood: 'angry', brow: -0.8, lk: [0.9, 0], arms: { l: [-30, 196, 'phone'], r: [150, 40, 'open'] } }); pop(); },
  lamp(t) { cam(575, 1090, 1.42); room(t, { ...TOMD, paw: 1, pawX: 175, pawY: 120 }, { mood: 'angry', brow: -0.6, lk: [0.9, 0] }); pop(); },
  threads(t, u) { cam(540, 960, 1); slideIn(u, () => threadBoard(t, CUE)); pop();
    if (t > CUE.bought) { push(540, 220, 1, 0.02); ransom('ВСЁ СДАЛ САМ', 0, 0, 84, 2030, { reveal: pr(t, CUE.bought, CUE.bought + 0.3) }); pop(); } },
  brain(t, u) { cam(540, 960, 1); slideIn(u, () => brainInsert(t, CUE.one - 0.05, CUE.miss - 0.05)); pop(); },
  gotcha(t) { cam(575, 1090, 1.42); room(t, ex(t, [[0, { ...TOMD, lid: 0.6 }], [CUE.boast, { lid: 0.7, smirk: 0.6 }]]), { mood: 'dumb', brow: 1, smile: 0.6, lk: [0.8, -0.4], arms: { l: [-30, 196, 'phone'], r: [150, -30, 'point'] } }); pop(); },
  news(t, u) { cam(540, 960, 1, 0, shakeAt(t)); rectP(-100, -100, 1280, 2200, '#2b2622', { seed: 2040, line: false, step: 80 });
    slideIn(u, () => newspaper(540, 820, 1.12, -0.04, t, CUE.nobody - 0.05)); pop();
    if (t > CUE.checked - 0.2) { push(540, 1330, 1, 0.03); card(0, 0, 640, 110, 0, 2041, '#f4e6a8'); txt('проверка регулятора США', 0, 4, 46, { font: 'Inter Black', col: '#1c1512' }); pop(); } },
  tomB(t) { cam(790, 990, 2.2, 0, shakeAt(t)); room(t, ex(t, [[0, { lid: 0.62, lk: [0, 0.2], smirk: 0.2 }], [CUE.lied, { lid: 0.5, lk: [0, 0], smirk: 0.9 }]]), { mood: 'dumb' }); pop();
    if (t > CUE.lied) { push(540, 330, 1, -0.04); ransom('П*ЗДЕЛИ', 0, 0, 150, 2050, { reveal: pr(t, CUE.lied, CUE.lied + 0.2), pop: true }); pop(); } },
  relief(t) { const lift = eo(pr(t, CUE.remove - 0.1, CUE.remove + 0.5));
    cam(360, 940, 1.9); room(t, TOMD, { mood: '', smile: 0.7, lid: 0.3, lk: [0.6, 0], foilLift: lift, arms: { l: [-30, 196, 'phone'], r: [lerp(40, 120, lift), lerp(214, -110, lift), 'fist'] } }); pop(); },
  siri(t, u) { cam(540, 960, 1); rectP(-100, -100, 1280, 2200, '#2b2a3a', { seed: 2060, line: false, step: 80 });
    slideIn(u, () => bigPhone(540, 960, 0.95, -0.03, () => { rectP(0, 0, 528, 1000, '#13161c', { seed: 2061, line: false, tex: false });
      const g = 0.6 + 0.4 * Math.sin(step(t) * 8); ellP(264, 700, 110 * g, 110 * g, '#7c6cff', { seed: 2062, line: false, tex: false, a: 0.85 }); ellP(264, 700, 70, 70, '#c86cff', { seed: 2063, line: false, tex: false, a: 0.9 });
      if (t > CUE.siri) { card(200, 220, 340, 110, -0.03, 2064, '#2f6db3'); txt('Привет, Сири', 200, 222, 40, { font: 'Inter Black', col: '#fff' }); }
      if (t > CUE.alice) { card(330, 380, 300, 110, 0.03, 2065, '#7c4dff'); txt('Алиса!', 330, 382, 44, { font: 'Inter Black', col: '#fff' }); } })); pop();
    if (t > CUE.word) { push(540, 1560 - 120, 1, 0.02); card(0, 0, 720, 110, 0, 2066, '#f4e6a8'); txt('ждут только кодовое слово', 0, 4, 44, { font: 'Inter Black', col: '#1c1512' }); pop(); } },
  money(t, u) { cam(540, 960, 1, 0, shakeAt(t)); slideIn(u, () => { cork(); moneyStack(540, 980, 1.3, t, CUE.apple);
      push(540, 400, 1, -0.05); ransom('$95 000 000', 0, 0, 110, 2070, { reveal: pr(t, CUE.mln - 0.3, CUE.mln + 0.3) }); pop();
      if (t > CUE.suit) { push(540, 1260, 1, 0.04); card(0, 0, 700, 120, 0, 2071, '#fbfaf6'); txt('иск про случайные записи Siri', 0, 4, 40, { font: 'Inter Black', col: '#1c1512' }); pop(); } }); pop(); },
  hatBack(t) { const k = eio(pr(t, CUE.hatBack + 0.2, CUE.keep - 0.25));
    cam(360, 920, 2.0); room(t, TOMD, { mood: 'dread', lk: [0, 0.3], foilLift: 1 - k, arms: { l: [-30, 196, 'phone'], r: [lerp(120, 40, k), lerp(-110, 214, k), 'fist'] } }); pop(); },
  final(t) { cam(575, 1090, 1.42); room(t, ex(t, [[0, { ...TOMD, lid: 0.5, smirk: 1 }], [CUE.sub, { lid: 0.45, lk: [0, 0.2], paw: 1, pawX: 175, pawY: 110, smirk: 1 }], [CUE.lightOff, { paw: 0 }]]),
      { mood: 'dread', lk: [0.8, 0.2], brow: 0.3 }); pop();
    if (t > CUE.lightOff) { push(540, 300, 1, -0.03); ransom('ПОДПИШИСЬ', 0, 0, 120, 2080, { reveal: pr(t, CUE.lightOff, CUE.lightOff + 0.25), pop: true }); pop(); } }
};

// ------------------------------------------------------------------ HUD
const CENS = { 'бля,': 'Б*Я,' };
const HOT = /^(фольгу|корм|корма|микрофон|экран|листаешь|геолокация|поиск|лайки|вайфае|лёхой|совпадение|промахов|регуляторы|сири|алиса|apple|миллионов|кожаный|приложений|тысяч|семнадцати)/i;
const GROUPS = (() => { const out = [];
  for (const ln of LINES) { const ws = ln.words.filter(w => w.w !== '—'), gs = []; let cur = [];
    const flush = () => { if (cur.length) gs.push({ sp: ln.speaker, key: ln.key, words: cur }); cur = []; };
    for (const w of ws) { const len = cur.reduce((n, x) => n + x.w.length + 1, 0) + w.w.length; if (cur.length >= 3 || len > 15) flush(); cur.push(w); if (/[.!?…:]$/.test(w.w)) flush(); }
    flush(); gs.forEach((g, i) => { g.s = g.words[0].s - 0.04; g.e = i + 1 < gs.length ? gs[i + 1].words[0].s - 0.04 : ln.end + 0.2; }); out.push(...gs); }
  return out; })();
function hudFrame(t) {
  if (t < LN.t01.start - 0.03) { push(540, 230, 1, -0.03); ransom('ТЕЛЕФОН', 0, 0, 120, 990); pop(); push(540, 380, 1, 0.02); ransom('ТЕБЯ СЛУШАЕТ?', 0, 0, 104, 991); pop(); }
  const g = GROUPS.find(x => t >= x.s && t < x.e); if (!g) return;
  if (g.key === 't08' && t > CUE.lied - 0.05 && g.words.some(w => w.w.startsWith('пиздели'))) return;
  const size = 76, y = 1545; ctx.save(); ctx.font = `900 ${size}px Inter`;
  const words = g.words.map(w => (CENS[w.w] || w.w).replace(/[«»]/g, '').toUpperCase()), sp = ctx.measureText(' ').width * 1.1, wd = words.map(w => ctx.measureText(w).width), tw = wd.reduce((a, b) => a + b, 0) + sp * (words.length - 1);
  ctx.restore(); const sc = Math.min(1, 980 / tw); let x = -tw / 2;
  push(540, y, sc * (0.92 + 0.08 * popK(t, g.s, 0.15)));
  words.forEach((w, i) => { const on = t >= g.words[i].s - 0.03, bare = g.words[i].w.replace(/[,!?.…:«»]/g, ''), mat = !!CENS[g.words[i].w];
    const col = mat ? '#ff4a3a' : HOT.test(bare) ? '#ffd23a' : g.sp === 'tom' ? '#ffffff' : '#bfe6ff';
    txt(w, x + wd[i] / 2, 0, size, { font: 'Inter', weight: 900, col: on ? col : 'rgba(255,255,255,0.5)', stroke: 15, sc: '#120d0b' }); x += wd[i] + sp; });
  pop();
}
function post(t, o) { const v = o.createRadialGradient(W / 2, H * 0.45, H * 0.35, W / 2, H * 0.5, H * 0.8); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.35)'); o.save(); o.fillStyle = v; o.fillRect(0, 0, W, H); o.restore(); }
