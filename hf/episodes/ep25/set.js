/* Эп. 25 «Пятисекундное правило?» — продолжение эп. 24. Ночь после дня рождения Никиты: гостиная, гирлянда «С ДНЁМ РОЖДЕНИЯ», шары,
   на журнальном столике — торт без куска, колпаки, конфетти. Том в праздничном колпаке сидит на столике и слизывает крем.
   Лор: на полу коробка «ОТ ТОМА» с бантиком (Том в эп. 24: «подарок — это с бантиком») — в финале её открывают. На стене — рамка «РАБОТНИК МЕСЯЦА». 
   2.5D: ночной город с салютом 2.4, стена гостиной 1.35, ковёр, столик и герои 1.0, передний план 0.6. */

const TABLE = 1300, CREAM = '#fbf0f4', SPONGE = '#e8b870';
function cakeWhole(x, y, s, t) { push(x, y, s); ellP(0, 6, 150, 26, '#e8ecf0', { seed: 25001, lw: 2 });
  piece([[-120, 0], [60, 0], [60, -110], [-120, -110]], SPONGE, { seed: 25002, lw: 2.4, shade: () => { rectP(-120, -60, 180, 14, '#d8486a', { seed: 25003, line: false }); } });
  piece([[60, 0], [120, -30], [120, -140], [60, -110]], '#d8a860', { seed: 25004, lw: 2 });                                                          // срез без куска
  piece(spline([[-126, -110], [60, -112], [124, -142], [-60, -146]], true, 4), CREAM, { raw: true, lw: 2 }); for (let i = 0; i < 5; i++) dot(-100 + i * 40, -126, 9, '#e8243c');
  for (let i = 0; i < 3; i++) { rectP(-80 + i * 50, -190, 10, 50, ['#5ab8e8', '#f2c84a', '#e84a6a'][i], { seed: 25005 + i, lw: 1.2 }); const f = 1 + 0.2 * Math.sin(t * 12 + i); piece([[-75 + i * 50, -190 - 20 * f], [-69 + i * 50, -192], [-75 + i * 50, -186], [-81 + i * 50, -192]], '#ffd27a', { raw: true, lw: 1 }); glowAdd(-75 + i * 50, -200, 40, 'rgba(255,200,120,1)', 0.5); }
  pop(); }
function slice(x, y, s, rot, o = {}) { push(x, y, s, rot); if (o.plate !== false) ellP(0, 10, 80, 16, '#fbfaf2', { seed: 25010, lw: 2 });
  piece([[-50, 0], [50, 0], [50, -60], [-50, -40]], SPONGE, { seed: 25011, lw: 2, shade: () => rectP(-50, -30, 100, 10, '#d8486a', { seed: 25012, line: false }) }); piece(spline([[-54, -40], [54, -62], [50, -78], [-50, -56]], true, 4), CREAM, { raw: true, lw: 1.8 }); dot(20, -72, 8, '#e8243c');
  if (o.hair) stroke(spline([[0, -60], [24, -94], [8, -120], [30, -150]], false, 6), '#7a6a5a', 2.4);
  if (o.fuzz) for (let i = 0; i < 5; i++) stroke([[-40 + i * 20, -60 + (i % 2) * 10], [-36 + i * 20, -80]], '#8a7a6a', 2);
  pop(); }
function giftBox(x, y, s, t, o = {}) { const op = o.open ?? 0; push(x, y, s); rectP(-90, -150, 180, 150, '#5a3ac8', { seed: 25020, lw: 2.4, shade: () => { rectP(-12, -150, 24, 150, '#f2c84a', { seed: 25021, line: false }); } });
  rectP(-50, -110, 100, 40, '#fbfaf2', { seed: 25022, lw: 1.4 }); txt('ОТ ТОМА', 0, -82, 18, { font: 'Inter Black', col: '#5a3ac8' });
  if (op > 0.5 && o.inside) o.inside();
  push(0, -150 - 120 * op, 1, -0.6 * op); rectP(-100, -24, 200, 30, '#6a4ad8', { seed: 25023, lw: 2.4 }); piece([[0, -24], [-50, -70], [-60, -30]], '#f2c84a', { seed: 25024, lw: 1.6 }); piece([[0, -24], [50, -70], [60, -30]], '#f2c84a', { seed: 25025, lw: 1.6 }); dot(0, -24, 12, '#e8a83a'); pop();
  pop(); }
function partyHat(x, y, s, rot, col = '#e84a6a') { push(x, y, s, rot); piece([[-30, 0], [30, 0], [0, -90]], col, { seed: 25030, lw: 2, shade: () => { stroke([[-18, -24], [18, -24]], '#fbfaf2', 5); stroke([[-10, -50], [10, -50]], '#fbfaf2', 5); } }); dot(0, -92, 9, '#f2c84a'); pop(); }
function balloon(x, y, s, col, t, ph = 0) { const sw = 8 * Math.sin(t * 1.2 + ph); push(x + sw, y, s); ellP(0, 0, 60, 74, col, { seed: 25040 + Math.round(ph * 10), lw: 2, shade: () => ellP(-20, -26, 12, 18, '#ffffff', { seed: 25041, line: false, a: 0.4 }) });
  piece([[-6, 74], [6, 74], [0, 86]], col, { raw: true, lw: 1 }); pop(); }
/* ---------- город с салютом (d 2.4) */
function nightFest(t) {
  rectP(-400, -100, 1600, 1600, '#101838', { seed: 25100, line: false, shade: () => {
    rectP(-400, 400, 1600, 400, '#16204a', { seed: 25101, line: false });
    [[-300, 640, 200], [-80, 560, 180], [140, 680, 220], [400, 540, 200], [640, 620, 220], [900, 580, 200]].forEach(([x, y, w], i) => { rectP(x, y, w, 1400 - y, '#0a1026', { seed: 25110 + i, lw: 1.4 });
      for (let k = 0; k < 4; k++) for (let j = 0; j < 10; j++) if ((k * 5 + j * 3 + i) % 6 === 0) rectP(x + 16 + k * 46, y + 24 + j * 58, 26, 30, '#ffd27a', { seed: 25120 + i * 50 + k * 10 + j, line: false, a: 0.8 }); });
    [[200, 260, 0], [620, 200, 1.3], [-80, 300, 2.4]].forEach(([x, y, ph]) => { const u = ((t + ph) % 3) / 3; if (u > 0.15 && u < 0.7) { const k = (u - 0.15) / 0.55; for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283; dot(x + Math.cos(a) * 120 * k, y + Math.sin(a) * 120 * k + 30 * k * k, 5, ['#ff6a8a', '#ffd27a', '#8af0ff'][i % 3], 1 - k); } glowAdd(x, y, 160 * k, 'rgba(255,200,220,1)', 0.3 * (1 - k)); } });
  } });
}
/* ---------- стена гостиной (d 1.35): окно, гирлянда, шары, рамка «работник месяца», полка, торшер */
function livingWall(t) {
  rectP(-400, -300, 1800, 2000, '#3a5a7a', { seed: 25200, line: false, step: 70, shade: () => { for (let x = -380; x < 1400; x += 60) stroke([[x, -300], [x, 1700]], '#365474', 6); } });
  ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; ctx.fillRect(-200, 360, 520, 640); ctx.restore();
  [[-200, 360, 520, 18], [-200, 360, 18, 640], [302, 360, 18, 640], [52, 360, 16, 640], [-210, 990, 540, 26]].forEach(([a, b, c, d], i) => rectP(a, b, c, d, '#e8e4dc', { seed: 25210 + i, lw: 1.6 }));
  piece([[-260, 330], [-150, 330], [-170, 700], [-140, 1020], [-260, 1020]], '#c8486a', { seed: 25220, lw: 2 }); piece([[270, 330], [380, 330], [380, 1020], [260, 1020], [290, 700]], '#c8486a', { seed: 25221, lw: 2 });
  // гирлянда «С ДНЁМ РОЖДЕНИЯ»
  const L = 'С ДНЁМ РОЖДЕНИЯ!'.split(''); stroke(spline([[-300, 240], [200, 300], [700, 250], [1200, 300]], false, 10), '#d8c890', 3);
  L.forEach((ch, i) => { const x = -260 + i * 100, y = 260 + 30 * Math.sin(i / L.length * 3.14) + 4 * Math.sin(t * 2 + i); if (ch === ' ') return; push(x, y, 1, 0.05 * Math.sin(t + i)); piece([[-34, 0], [34, 0], [0, 70]], ['#e84a6a', '#f2c84a', '#5ab8e8', '#7ac85a'][i % 4], { seed: 25230 + i, lw: 1.6 }); txt(ch, 0, 32, 30, { font: 'Inter Black', col: '#fbfaf2' }); pop(); });
  push(1000, 560, 1, -0.02); rectP(-110, -130, 220, 260, '#8a6a2a', { seed: 25240, lw: 3, shade: () => { rectP(-90, -110, 180, 180, '#e8e0d0', { seed: 25241, line: false }); ellP(0, -30, 46, 42, '#8a7a6a', { seed: 25242, lw: 1.6 }); dot(-14, -36, 5, '#5ac84a'); dot(14, -36, 5, '#5ac84a');
    txt('РАБОТНИК', 0, 96, 18, { font: 'Inter Black', col: '#fbfaf2' }); txt('МЕСЯЦА', 0, 118, 18, { font: 'Inter Black', col: '#fbfaf2' }); } }); pop();
  rectP(820, 820, 380, 16, '#6a4a2a', { seed: 25250, lw: 1.6 }); [[860, '#c8243c'], [900, '#2a6ac8'], [940, '#e8a83a'], [980, '#3a8a4a'], [1020, '#7a3ac8']].forEach(([x, c], i) => rectP(x - 16, 700, 32, 120, c, { seed: 25251 + i, lw: 1.4 }));   // книги
  push(560, 1100); stroke([[0, 0], [0, -460]], '#3a3a40', 8); piece([[-70, -460], [70, -460], [50, -560], [-50, -560]], '#f2d890', { seed: 25260, lw: 2 }); glowAdd(0, -500, 260, 'rgba(255,220,150,1)', 0.6); pop();   // торшер
}
/* ---------- ковёр, столик, подарок (d 1.0) */
function livingMid(t, o = {}) {
  rectP(-400, 1530, 1800, 700, '#6a4a3a', { seed: 25300, step: 60, shade: () => { for (let y = 1540; y < 2240; y += 50) stroke([[-400, y], [1400, y]], '#5e4232', 3); } });
  ellP(500, 1680, 640, 120, '#c8486a', { seed: 25301, lw: 2.4, shade: () => { ellP(500, 1680, 540, 96, '#e8a83a', { seed: 25302, line: false }); ellP(500, 1680, 420, 72, '#2a8a8a', { seed: 25303, line: false }); ellP(500, 1680, 300, 50, '#c8486a', { seed: 25304, line: false }); } });   // ковёр
  const r = rng(25310); for (let i = 0; i < 40; i++) dot(-100 + r() * 1200, 1580 + r() * 200, 4, ['#e84a6a', '#f2c84a', '#5ab8e8', '#7ac85a'][i % 4]);   // конфетти
  for (let i = 0; i < 9; i++) { const x = 200 + r() * 700, y = 1620 + r() * 120; stroke([[x, y], [x + 8, y - 10], [x + 16, y - 2]], '#8a7a6a', 2.4); }       // шерсть Тома на ковре
  rectP(720, TABLE, 460, 26, '#6a3a2a', { seed: 25320, lw: 2.4 }); [760, 1140].forEach((x, i) => rectP(x - 14, TABLE + 26, 28, 210, '#5a2e20', { seed: 25321 + i, lw: 1.6 }));   // журнальный столик
  cakeWhole(1040, TABLE, 0.8, t); partyHat(760, TABLE, 0.6, -0.4, '#5ab8e8'); ellP(1150, TABLE - 4, 40, 8, '#fbfaf2', { seed: 25330, lw: 1.4 });
  stroke([[1140, TABLE], [1120 + 14 * Math.sin(t * 1.4), 800]], '#d8d8d8', 2); balloon(1120 + 14 * Math.sin(t * 1.4), 720, 1, '#e84a6a', t, 0.4);   // шарик привязан к столику
  balloon(-60, 900, 1.1, '#f2c84a', t, 1.1); balloon(60, 960, 0.9, '#5ab8e8', t, 2.3); stroke([[-60, 986], [-40, 1530]], '#d8d8d8', 2); stroke([[60, 1040], [40, 1530]], '#d8d8d8', 2);
  if (o.gift !== false) giftBox(640, 1600, 0.85, t, { open: o.giftOpen ?? 0, inside: () => { if (typeof mouseBow === 'function') mouseBow(0, -180, 1.5, t); } });
  if (o.floorSlice) slice(o.floorSlice[0], o.floorSlice[1], 0.7, 0.2, { plate: false, fuzz: true });
}
function mouseBow(x, y, s, t) { push(x, y, s); blobP([[-40, 0], [-30, -24], [10, -28], [36, -12], [44, 4], [20, 12], [-30, 12]], '#8a8a92', { seed: 25350, lw: 2 }); ellP(26, -22, 10, 10, '#e8b0b8', { seed: 25351, lw: 1.4 });
  stroke([[29, -9], [39, 1]], '#1c1512', 2.4); stroke([[39, -9], [29, 1]], '#1c1512', 2.4); piece([[0, -30], [-20, -46], [-20, -14]], '#c8243c', { raw: true, lw: 1.4 }); piece([[0, -30], [20, -46], [20, -14]], '#c8243c', { raw: true, lw: 1.4 }); dot(0, -30, 6, '#a81c2c'); pop(); }
function livingFg(t) { push(-150, 1980, 1, -0.05); rectP(-120, -480, 300, 520, '#2a4a6a', { seed: 25500, lw: 3, shade: () => rectP(-100, -460, 260, 60, '#365a7e', { seed: 25501, line: false }) }); pop(); }   // подлокотник дивана
function livingLight(t, fn) { lightmap('#8a88a8', () => { radial(560, 560, 800, 'rgba(255,220,150,1)', 0.9); radial(1040, 1100, 300, 'rgba(255,200,120,1)', 0.6); radial(60, 680, 500, 'rgba(140,160,255,1)', 0.35); if (fn) fn(); }); }

// ------------------------------------------------------------------ вставки: праздничная скатерть с конфетти
function confettiBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#2a3a5a', { seed, line: false, step: 80 });
  const r = rng(seed + 1); for (let i = 0; i < 120; i++) { push(r() * 1280 - 100, r() * 2200 - 100, 1, r() * 3); rectP(-8, -4, 16, 8, ['#e84a6a', '#f2c84a', '#5ab8e8', '#7ac85a'][i % 4], { seed: seed + 10 + i, line: false, a: 0.7 }); pop(); }
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,230,200,0.12)'); g.addColorStop(1, 'rgba(0,0,20,0.5)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function timerP(x, y, s, sec, col = '#c8243c') { push(x, y, s); ellP(0, 0, 70, 70, '#fbfaf2', { seed: 25700, lw: 4 }); stroke([[0, 0], [Math.sin(sec / 5 * 6.283) * 54, -Math.cos(sec / 5 * 6.283) * 54]], col, 7); dot(0, 0, 8, '#1c1512'); rectP(-14, -90, 28, 18, '#1c1512', { seed: 25701, lw: 1 }); pop(); }
function clarkeIns(t, c) {                                            // 2003: школьница Джиллиан Кларк — бактерии с плитки на мармелад и печенье < 5 с; Шнобелевка 2004
  if (!c.fg) confettiBg(25710, t); if (c.bg) return;
  push(540, 740, 1, -0.01); card(0, 0, 880, 760, 0, 25711, '#fbfaf2'); txt('2003 · ДЖИЛЛИАН КЛАРК', 0, -320, 44, { font: 'Inter Black', col: '#1c1512', maxW: 820 }); txt('школьница, стажировка в Иллинойсе', 0, -266, 28, { font: 'Inter', weight: 800, col: '#6b5a48', maxW: 820 });
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) rectP(-380 + i * 120, -180 + j * 120, 116, 116, (i + j) % 2 ? '#d8e0e8' : '#c8d0d8', { seed: 25712 + i * 2 + j, lw: 1.4 });   // плитка
  if (t > c.tile) { const r = rng(25720); for (let i = 0; i < 30; i++) dot(-380 + r() * 480, -180 + r() * 240, 4, '#5ac84a', 0.8); }
  if (t > c.gummy - 0.1) { push(-260, -40); ellP(0, 0, 30, 40, '#e84a6a', { seed: 25721, lw: 2 }); ellP(-18, -36, 12, 12, '#e84a6a', { seed: 25722, lw: 1.6 }); ellP(18, -36, 12, 12, '#e84a6a', { seed: 25723, lw: 1.6 }); pop(); }
  if (t > c.cookie - 0.1) { ellP(-80, -40, 50, 50, '#c88a4a', { seed: 25724, lw: 2 }); for (let i = 0; i < 4; i++) stroke([[-120 + i * 26, -70], [-100 + i * 26, -10]], '#7a4a2a', 4); }
  if (t > c.fast - 0.2) { timerP(270, -60, 1.1, Math.min(4.9, (t - c.fast + 0.2) * 4)); txt('< 5 сек', 270, 70, 44, { font: 'Inter Black', col: '#c8243c' }); }
  if (t > c.prize - 0.1) { push(0, 230, popK(t, c.prize - 0.1, 0.3)); ellP(-250, 0, 50, 50, '#f2c84a', { seed: 25725, lw: 2.4 }); txt('Ig', -250, 14, 34, { font: 'Inter Black', col: '#8a5a1a' }); txt('Шнобелевская премия, 2004', 60, 14, 36, { font: 'Inter Black', col: '#1c1512', maxW: 560 }); pop(); } pop();
}
function rutgersIns(t, c) {                                           // Ратгерс 2016: 2 560 замеров, < 1 с, дольше — больше, главное — влажность
  if (!c.fg) confettiBg(25730, t); if (c.bg) return;
  push(540, 740, 1, 0.01); card(0, 0, 880, 760, 0, 25731, '#fbfaf2'); rectP(-440, -380, 880, 90, '#c8243c', { seed: 25732, line: false }); txt('УНИВЕРСИТЕТ РАТГЕРСА · 2016', 0, -320, 36, { font: 'Inter Black', col: '#fbfaf2', maxW: 820 });
  if (t > c.k25 - 0.2) txt('2 560 замеров', 0, -220, 60, { font: 'Inter Black', col: '#1c1512' });
  if (t > c.sec - 0.3) { timerP(-260, -60, 1, Math.min(0.9, (t - c.sec + 0.3) * 2), '#c8243c'); txt('иногда — меньше', 120, -90, 40, { font: 'Inter Black', col: '#1c1512', maxW: 460 }); txt('чем за 1 секунду', 120, -36, 40, { font: 'Inter Black', col: '#c8243c', maxW: 460 }); }
  if (t > c.longer - 0.2) { const k = sm(pr(t, c.longer - 0.2, c.longer + 0.8)); stroke([[-340, 220], [340, 220]], '#4a4038', 4); stroke([[-340, 220], [-340, 60]], '#4a4038', 4);
    ctx.save(); ctx.lineWidth = 8 / S; ctx.strokeStyle = '#2a6ac8'; ctx.beginPath(); for (let i = 0; i <= 30 * k; i++) { const x = -340 + i * 22, y = 220 - 140 * (1 - Math.exp(-i / 10)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
    txt('время →', 260, 260, 26, { font: 'Inter', weight: 800, col: '#6b5a48' }); txt('бактерии', -260, 50, 26, { font: 'Inter', weight: 800, col: '#6b5a48' }); }
  if (t > c.wet - 0.1) { push(0, 320, popK(t, c.wet - 0.1, 0.3)); piece([[0, -40], [24, 0], [14, 26], [-14, 26], [-24, 0]], '#5ab8e8', { seed: 25733, lw: 2 }); txt('главное — ВЛАЖНОСТЬ', 260, 14, 34, { font: 'Inter Black', col: '#2a5a8a', maxW: 460 }); pop(); } pop();
}
function foodsIns(t, c) {                                             // арбуз собирает больше всех, мармелад — меньше всех
  if (!c.fg) confettiBg(25740, t); if (c.bg) return;
  push(540, 700, 1, -0.01); card(0, 0, 860, 600, 0, 25741, '#fbfaf2'); txt('ЧТО СОБИРАЕТ БАКТЕРИИ', 0, -250, 42, { font: 'Inter Black', col: '#1c1512', maxW: 800 });
  push(-200, -40); piece([[-120, 40], [120, 40], [0, -100]], '#3a8a4a', { seed: 25742, lw: 2.4 }); piece([[-100, 30], [100, 30], [0, -80]], '#e84a5a', { seed: 25743, line: false }); for (let i = 0; i < 4; i++) dot(-40 + i * 26, -10 + (i % 2) * 14, 5, '#1c1512'); pop();
  if (t > c.most - 0.1) { txt('арбуз', -200, 90, 40, { font: 'Inter Black', col: '#1c1512' }); txt('БОЛЬШЕ ВСЕХ', -200, 140, 34, { font: 'Inter Black', col: '#c8243c' }); }
  if (t > c.gummy4 - 0.2) { push(200, -40); ellP(0, 0, 40, 54, '#f2c84a', { seed: 25744, lw: 2 }); ellP(-24, -50, 16, 16, '#f2c84a', { seed: 25745, lw: 1.6 }); ellP(24, -50, 16, 16, '#f2c84a', { seed: 25746, lw: 1.6 }); pop(); txt('мармелад', 200, 90, 40, { font: 'Inter Black', col: '#1c1512' }); }
  if (t > c.least - 0.1) txt('меньше всех', 200, 140, 34, { font: 'Inter Black', col: '#2a6a3a' }); pop();
  label(540, 1120, 'сочное и мокрое — собирает больше', 0, '#f4e6a8', 0.01, 28);
}
function surfaceIns(t, c) {                                           // ковёр отдаёт меньше, чем плитка и металл
  if (!c.fg) confettiBg(25750, t); if (c.bg) return;
  push(540, 720, 1, 0.01); card(0, 0, 880, 640, 0, 25751, '#fbfaf2'); txt('С КАКОГО ПОЛА БОЛЬШЕ БАКТЕРИЙ', 0, -270, 36, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  const R = [['металл', 0.9, '#8a929a'], ['плитка', 0.8, '#a8c8dc'], ['ковёр', 0.15, '#c8486a']];
  R.forEach(([s, v, col], i) => { const y = -150 + i * 140, k = sm(pr(t, (i < 2 ? c.tile5 : c.carpet5) - 0.3, (i < 2 ? c.tile5 : c.carpet5) + 0.5)); txt(s, -380, y + 50, 40, { font: 'Inter Black', col: '#1c1512', align: 'left' }); rectP(-160, y + 10, 500 * v * k + 4, 60, col, { seed: 25752 + i, lw: 2 }); });
  if (t > c.better) txt('ковёр — как ни странно, лучше', 0, 280, 34, { font: 'Inter Black', col: '#2a6a3a', maxW: 800 }); pop();
  label(540, 1180, 'Ратгерс, 2016 · дерево — по-разному', 0, '#f4e6a8', -0.01, 26);
}
function ruleIns(t, c) {                                              // как понять
  if (!c.fg) confettiBg(25760, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 880, 760, 0, 25761, '#fbfaf2'); txt('УРОНИЛ — ЕСТЬ ИЛИ НЕТ', 0, -320, 44, { font: 'Inter Black', col: '#1c1512', maxW: 820 });
  if (t > c.dry - 0.2) { check(-360, -200, 0.8, pr(t, c.dry - 0.2, c.dry + 0.2)); txt('сухое на чистый сухой пол —', -300, -200, 34, { font: 'Inter Black', col: '#1c1512', align: 'left', maxW: 680 }); txt('риск небольшой', -300, -150, 34, { font: 'Inter Black', col: '#2a6a3a', align: 'left' }); }
  if (t > c.wet7 - 0.2) { stampX(-360, -20, 0.6, pr(t, c.wet7 - 0.2, c.wet7 + 0.2)); txt('мокрое, липкое — на плитку', -300, -30, 34, { font: 'Inter Black', col: '#1c1512', align: 'left', maxW: 680 }); txt('в прихожей — в мусор', -300, 20, 34, { font: 'Inter Black', col: '#c8243c', align: 'left' }); }
  if (t > c.kids - 0.2) { txt('⚠', -360, 170, 60, { font: 'Inter Black', col: '#c8243c' }); txt('детям и больным —', -300, 150, 34, { font: 'Inter Black', col: '#1c1512', align: 'left' }); txt('не рисковать', -300, 200, 34, { font: 'Inter Black', col: '#c8243c', align: 'left' }); } pop();
}
