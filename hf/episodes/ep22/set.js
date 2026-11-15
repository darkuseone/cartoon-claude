/* Эп. 22 «Что будет, если долго не пердеть?» — декорация: застрявший лифт панельки вечером. Никита (с обеда терпит) держится за живот,
   в телефоне «нет сети»; Том сидит на переноске «ВЕТКЛИНИКА» — их везли к врачу. Мигает плафон, горит кнопка вызова диспетчера.
   2.5D: отражение в зеркале 2.4, стены кабины 1.35, пол и герои 1.0, передний план 0.6. */

const STEEL = '#8a929a', CABIN = '#c8b89a', CARRY_TOP = 1250;
function carrier(x, y, s) { push(x, y, s); rectP(-130, 0, 260, 250, '#3a6ac8', { seed: 22001, lw: 2.6, shade: () => {
  rectP(-100, 40, 120, 150, '#1c2a3a', { seed: 22002, lw: 2 }); for (let i = 0; i < 5; i++) stroke([[-92 + i * 24, 46], [-92 + i * 24, 184]], '#c8ccd4', 4);
  rectP(40, 60, 76, 40, '#fbfaf2', { seed: 22003, lw: 1.4 }); txt('ВЕТКЛИНИКА', 78, 86, 10, { font: 'Inter Black', col: '#c8243c' }); } });
  stroke([[-60, 0], [-40, -40], [40, -40], [60, 0]], '#2a4a8a', 10); pop(); }
function gasCloud(x, y, k, t) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = 0.28 * Math.min(1, k * 2) * (1 - 0.6 * Math.max(0, k - 1));
  const r = rng(22010); for (let i = 0; i < 7; i++) { const a = r() * 6.28, d = 40 + r() * 180 * Math.min(1, k); ellP(x - 60 + Math.cos(a) * d + 10 * Math.sin(t * 2 + i), y + 120 + Math.sin(a) * d * 0.5 - 60 * Math.min(1, k), 60 + 70 * Math.min(1, k), 50 + 50 * Math.min(1, k), i % 2 ? '#b8d86a' : '#c8e08a', { seed: 22011 + i, line: false }); }
  ctx.restore(); }
/* ---------- отражение в зеркале (d 2.4): тусклый «двойник» кабины */
function mirrorRefl(t, o = {}) {
  rectP(-400, -100, 1600, 1600, '#3a4048', { seed: 22100, line: false, shade: () => {
    rectP(-100, 300, 1100, 900, '#4a5058', { seed: 22101, line: false }); rectP(300, 380, 400, 600, '#3e444c', { seed: 22102, line: false });
    const fl = o.fl ?? 1; ellP(500, 200, 260, 30, fl > 0.5 ? '#fff6d8' : '#8a8a7a', { seed: 22103, line: false }); if (fl > 0.5) glowAdd(500, 220, 300, 'rgba(255,240,200,1)', 0.25);
  } });
}
/* ---------- стены кабины (d 1.35) */
function cabin(t, o = {}) {
  const fl = o.fl ?? 1;
  rectP(-400, -300, 1800, 2000, CABIN, { seed: 22200, line: false, step: 70, shade: () => { for (let x = -380; x < 1400; x += 90) stroke([[x, -300], [x, 1700]], '#b8a888', 3, { a: 0.6 }); } });
  piece([[-400, -300], [1400, -300], [1080, 200], [-80, 200]], '#a8a090', { seed: 22201, line: false });                                 // потолок
  rectP(200, 140, 600, 60, fl > 0.5 ? '#fff6d8' : '#6a6a5a', { seed: 22202, lw: 2 }); if (fl > 0.5) glowAdd(500, 170, 360, 'rgba(255,240,200,1)', 0.5);   // плафон
  ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; ctx.fillRect(300, 420, 400, 640); ctx.restore();        // зеркало — сквозь него «отражение»
  ctx.save(); ctx.globalAlpha = 0.15; rectP(300, 420, 400, 640, '#dfe8f0', { seed: 22203, raw: true, line: false }); ctx.restore();
  stroke([[330, 450], [460, 620]], '#ffffff', 6, { a: 0.3 }); rectP(290, 410, 420, 660, 'rgba(0,0,0,0)', { raw: true, lc: STEEL, lw: 10, tex: false });
  rectP(-400, 1150, 1800, 20, STEEL, { seed: 22204, lw: 2 });                                                                                     // поручень
  // табло этажа над зеркалом
  push(500, 330); rectP(-90, -50, 180, 100, '#0a0a10', { seed: 22210, lw: 2 }); txt(String(o.floor ?? 7), -20, 26, 70, { font: "'Courier 10 Pitch'", col: '#ff5a3a' });
  if (o.dir) { const k = (t * 2) % 1; piece([[50, o.dir > 0 ? -20 - 10 * k : 20 + 10 * k], [30, o.dir > 0 ? 10 : -10], [70, o.dir > 0 ? 10 : -10]], '#ff5a3a', { raw: true, line: false }); } pop();
  // таблички и наклейки
  push(860, 520, 1, 0.02); rectP(-90, -60, 180, 120, '#fbfaf2', { seed: 22220, lw: 1.6 }); txt('ГРУЗОПОДЪЁМНОСТЬ', 0, -24, 14, { font: 'Inter Black', col: '#1c1512' }); txt('400 кг · 5 чел.', 0, 6, 20, { font: 'Inter Black', col: '#1c1512' }); txt('не курить', 0, 34, 14, { font: 'Inter', weight: 800, col: '#c8243c' }); pop();
  push(130, 760, 1, -0.05); rectP(-80, -100, 160, 200, '#f2c84a', { seed: 22221, lw: 1.6 }); txt('ПИЦЦА', 0, -50, 26, { font: 'Inter Black', col: '#c8243c' }); txt('24/7', 0, -10, 30, { font: 'Inter Black', col: '#1c1512' }); ellP(0, 50, 40, 40, '#e8a83a', { seed: 22222, lw: 1.6 }); pop();
  push(150, 980, 1, 0.04); rectP(-70, -40, 140, 80, '#fbfaf2', { seed: 22223, lw: 1.4 }); txt('ЗДЕСЬ', 0, -8, 18, { font: "'Courier 10 Pitch'", col: '#2a5aa8' }); txt('БЫЛ ВАСЯ', 0, 18, 18, { font: "'Courier 10 Pitch'", col: '#2a5aa8' }); pop();   // каракули ручкой
  // кнопочная панель справа
  push(1010, 760); rectP(-60, -160, 120, 380, STEEL, { seed: 22230, lw: 2.2, shade: () => { for (let i = 0; i < 9; i++) { const x = -26 + (i % 2) * 52, y = -120 + Math.floor(i / 2) * 56; ellP(x, y, 18, 18, '#d8dce0', { seed: 22231 + i, lw: 1.4 }); txt(String(9 - i), x, y + 7, 16, { font: 'Inter Black', col: '#3a3a40' }); } } });
  const call = o.call ?? 0; ellP(0, 170, 26, 26, call > 0 ? '#ffd23a' : '#c8a83a', { seed: 22240, lw: 2 }); if (call > 0) glowAdd(0, 170, 90, 'rgba(255,210,60,1)', 0.6 * call); txt('!', 0, 180, 30, { font: 'Inter Black', col: '#3a2a10' }); pop();
}
/* ---------- пол кабины (d 1.0) */
function cabFloor(t, o = {}) {
  rectP(-400, 1530, 1800, 700, '#5a4a3a', { seed: 22300, step: 60, shade: () => { for (let x = -400; x < 1400; x += 60) stroke([[x, 1530], [x - 30, 2230]], '#4e4032', 3); } });
  rectP(-400, 1510, 1800, 24, STEEL, { seed: 22301, lw: 1.6 });
  carrier(840, CARRY_TOP, 1);
  push(170, 1560); rectP(-50, -90, 100, 90, '#e8e0d0', { seed: 22310, lw: 1.6, shade: () => txt('КОРМ', 0, -40, 16, { font: 'Inter Black', col: '#c8243c' }) }); pop();   // пакет с кормом из зоомагазина
}
function cabFg(t) { push(1290, 1960, 1, 0.04); rectP(-100, -1300, 200, 1340, '#9aa2aa', { seed: 22500, lw: 3, shade: () => stroke([[-60, -1250], [-60, 0]], '#c8ccd4', 6) }); pop(); }   // створка двери у края
function cabLight(t, o, fn) { const fl = o.fl ?? 1, em = o.em ?? 0; lightmap(fl > 0.5 ? '#a8a49a' : '#6a6878', () => {
  if (fl > 0.5) { radial(500, 170, 1000, 'rgba(255,240,200,1)', 0.9); cone(500, 170, 500, 1600, 900, 'rgba(255,240,200,1)', 0.35); }
  if (em > 0) radial(1010, 930, 500, 'rgba(255,200,60,1)', 0.5 * em); if (o.gas) radial(500, 1300, 900, 'rgba(180,230,90,1)', 0.35 * o.gas);
  if (fn) fn(); });
}

// ------------------------------------------------------------------ вставки: шлифованная сталь кабины
function steelBg(seed, t) {
  rectP(-100, -100, 1280, 2200, '#9aa2aa', { seed, line: false, step: 80, shade: () => { const r = rng(seed + 1); for (let i = 0; i < 90; i++) { const y = r() * 2100 - 100; stroke([[-100, y], [1180, y + (r() - 0.5) * 6]], i % 2 ? '#aab2ba' : '#8a929a', 2, { a: 0.6 }); } } });
  ctx.save(); const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1100); g.addColorStop(0, 'rgba(255,255,255,0.1)'); g.addColorStop(1, 'rgba(10,20,30,0.5)'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 1280, 2200); ctx.restore();
}
function routeIns(t, c) {                                             // газ: кишечник → кровь → лёгкие → выдох «мне в лицо»
  if (!c.fg) steelBg(22710, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 860, 760, 0, 22711, '#fbfaf2'); txt('КУДА ДЕВАЕТСЯ ГАЗ', 0, -320, 46, { font: 'Inter Black', col: '#1c1512' });
  const st = [['кишечник', '#f2c8a8', -200, c.part], ['кровь', '#d84a4a', 0, c.blood], ['лёгкие', '#f2a8b8', 200, c.lungs]];
  st.forEach(([s, col, y, t0], i) => { if (t < t0 - 0.3) return; ellP(-200, y - 40, 70, 50, col, { seed: 22712 + i, lw: 2.2 }); txt(s, 40, y - 26, 44, { font: 'Inter Black', col: '#1c1512', align: 'left' }); if (i) txt('↓', -200, y - 130, 50, { font: 'Inter Black', col: '#4a4038' }); });
  if (t > c.exhale - 0.2) { txt('→ выдох', 0, 280, 50, { font: 'Inter Black', col: '#2a6a3a' }); } pop();
  label(540, 1230, 'частично — так считают гастроэнтерологи', 0, '#f4e6a8', 0.01, 26);
}
function mythIns(t, c) {                                              // «кишки порвёт» — страшилка; на деле: вздутие и спазм
  if (!c.fg) steelBg(22720, t); if (c.bg) return;
  push(540, 620, 1, 0.01); card(0, 0, 820, 380, 0, 22721, '#fbfaf2'); txt('«КИШКИ ПОРВЁТ»', 0, -40, 66, { font: 'Inter Black', col: '#1c1512', maxW: 760 });
  if (t > c.scary - 0.1) { push(0, 100, popK(t, c.scary - 0.1, 0.25), -0.06); rectP(-260, -50, 520, 100, 'rgba(0,0,0,0)', { raw: true, lc: '#c8243c', lw: 9, tex: false }); txt('СТРАШИЛКА', 0, 22, 62, { font: 'Inter Black', col: '#c8243c' }); pop(); } pop();
  push(540, 1040, 1, -0.01); card(0, 0, 820, 300, 0, 22722, '#f6f1e4'); txt('если иногда терпеть:', 0, -90, 36, { font: 'Inter', weight: 800, col: '#4a4038' });
  [['вздутие', c.bloat, -190], ['спазм', c.spasm, 190]].forEach(([s, t0, x]) => { if (t < t0 - 0.2) return; ellP(x, 20, 70, 60, '#f2c8a8', { seed: 22723 + x, lw: 2 }); txt(s, x, 120, 40, { font: 'Inter Black', col: '#1c1512' }); }); pop();
}
function countIns(t, c) {                                             // 5–15 раз в день, 0,5–2 л газа в день
  if (!c.fg) steelBg(22730, t); if (c.bg) return;
  push(540, 620, 1, -0.01); card(0, 0, 860, 400, 0, 22731, '#fbfaf2'); txt('НОРМА В ДЕНЬ', 0, -140, 46, { font: 'Inter Black', col: '#1c1512' });
  if (t > c.five - 0.2) txt(t > c.fifteen - 0.1 ? '5–15 раз' : '5…', 0, 20, 110, { font: 'Inter Black', col: '#c8243c' }); if (0) txt('', 0, 20, 110, { font: 'Inter Black', col: '#c8243c' }); txt('NHS, Британия', 0, 130, 28, { font: 'Inter', weight: 800, col: '#6b5a48' }); pop();
  if (t > c.gasL - 0.3) { push(540, 1060, 1, 0.01); card(0, 0, 860, 360, 0, 22732, '#f6f1e4'); const k = sm(pr(t, c.half - 0.2, c.twoL + 0.4));
    push(-240, 0); piece([[-50, 120], [50, 120], [50, -60], [20, -110], [20, -150], [-20, -150], [-20, -110], [-50, -60]], 'rgba(200,230,240,0.5)', { raw: true, lw: 2.4, tex: false });
    rectP(-48, 118 - 170 * k, 96, 170 * k, 'rgba(180,220,120,0.8)', { seed: 22733, raw: true, line: false }); pop();
    txt('0,5–2 литра', 120, -10, 66, { font: 'Inter Black', col: '#1c1512', maxW: 500 }); txt('газа в день', 120, 60, 36, { font: 'Inter', weight: 800, col: '#4a4038' }); pop(); }
}
function compIns(t, c) {                                              // 99 % без запаха, вонь — < 1 % (сероводород)
  if (!c.fg) steelBg(22740, t); if (c.bg) return;
  push(540, 760, 1, 0.01); card(0, 0, 860, 760, 0, 22741, '#fbfaf2'); txt('ИЗ ЧЕГО ОН', 0, -320, 50, { font: 'Inter Black', col: '#1c1512' });
  rectP(-120, -230, 240, 470, '#e8eef2', { seed: 22742, lw: 2.4 }); const k = sm(pr(t, c.ninety - 0.2, c.odorless + 0.4)); rectP(-116, 236 - 460 * k * 0.99, 232, 460 * k * 0.99, '#a8d0e8', { seed: 22743, raw: true, line: false });
  if (t > c.stink - 0.2) rectP(-116, -226, 232, 10, '#8ab83a', { seed: 22744, raw: true, line: false });
  if (k > 0.3) { txt('99 %', 260, -60, 80, { font: 'Inter Black', col: '#2a5a8a' }); txt('без запаха', 260, 0, 34, { font: 'Inter Black', col: '#1c1512' }); }
  if (t > c.azot - 0.1) txt('азот · водород · CO₂', 0, 300, 34, { font: 'Inter', weight: 800, col: '#4a4038', maxW: 800 });
  if (t > c.stink - 0.1) { txt('< 1 %', -280, -200, 56, { font: 'Inter Black', col: '#5a8a1a' }); txt('вонь', -280, -150, 34, { font: 'Inter Black', col: '#1c1512' }); } pop();
  if (t > c.h2s) { push(540, 1260, popK(t, c.h2s, 0.3), -0.03); ransom('СЕРОВОДОРОД', 0, 0, 100, 22745, { reveal: 1, pop: true }); pop(); }
}
function adviceIns(t, c) {                                            // что делать
  if (!c.fg) steelBg(22750, t); if (c.bg) return;
  push(540, 760, 1, -0.01); card(0, 0, 880, 700, 0, 22751, '#fbfaf2'); txt('ЕСЛИ ПРИЖАЛО', 0, -290, 50, { font: 'Inter Black', col: '#1c1512' });
  if (t > c.away - 0.2) { check(-340, -160, 0.9, pr(t, c.away - 0.2, c.away + 0.2)); txt('отойди туда, где никого нет', -280, -146, 40, { font: 'Inter Black', col: '#2a6a3a', align: 'left', maxW: 660 }); }
  if (t > c.release - 0.2) { check(-340, -40, 0.9, pr(t, c.release - 0.2, c.release + 0.2)); txt('и выпусти', -280, -26, 40, { font: 'Inter Black', col: '#2a6a3a', align: 'left', maxW: 660 }); }
  if (t > c.pain - 0.2) { txt('⚠', -340, 110, 64, { font: 'Inter Black', col: '#c8243c' }); txt('сильная боль или вздутие', -280, 90, 36, { font: 'Inter Black', col: '#1c1512', align: 'left', maxW: 660 }); txt('неделями — к врачу', -280, 140, 36, { font: 'Inter Black', col: '#c8243c', align: 'left', maxW: 660 }); } pop();
}
