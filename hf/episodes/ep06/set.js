/* Эп. 6 «Кот тобой манипулирует?» — декорация (спальня в 5 утра) и вставки-коллажи. */

function bedroom(t, o = {}) {
  rectP(-300, -300, 1680, 1860, '#3c4a78', { seed: 6000, line: false, step: 60 });
  { const r = rng(6001); for (let i = 0; i < 40; i++) dot(-260 + r() * 1600, -260 + r() * 1700, 3, '#4a5888', 0.8); }   // обои в точку
  rectP(80, 280, 340, 400, '#1d2448', { seed: 6002, lw: 3, shade: () => { rectP(80, 560, 340, 120, '#6a5a8e', { seed: 6003, line: false }); radial(250, 680, 220, 'rgba(255,170,140,0.6)', 1);
    dot(150, 340, 3, '#fff'); dot(330, 400, 2.5, '#fff'); dot(260, 320, 2, '#fff'); } });
  stroke([[250, 280], [250, 680]], '#d8cdb6', 10); rectP(64, 266, 372, 24, '#d8cdb6', { seed: 6004, lw: 2.4 }); rectP(56, 676, 388, 26, '#d8cdb6', { seed: 6005, lw: 2.4 });
  // кровать справа: изголовье, одеяло, подушка
  rectP(620, 900, 520, 360, '#6b4a2e', { seed: 6010, lw: 3 }); rectP(600, 1240, 560, 70, '#e9e0c8', { seed: 6011, lw: 2.4 });
  piece([[600, 1290], [1160, 1290], [1170, 1520], [590, 1520]], '#c8574a', { seed: 6012, step: 20, lw: 2.6, shade: () => { stroke([[640, 1360], [1140, 1350]], '#a8443a', 6); } });
  ellP(740, 1230, 90, 40, '#fbfaf6', { seed: 6013, lw: 2.4 });
  // тумбочка с будильником 05:00
  rectP(460, 1120, 150, 200, '#8a5a34', { seed: 6020, lw: 2.6 }); push(535, 1080, 1); rectP(-60, -40, 120, 80, '#1c1512', { seed: 6021, lw: 2.4 });
  txt('05:00', 0, 2, 40, { font: 'Inter Black', col: Math.floor(t * 2) % 2 ? '#ff4a3a' : '#c8241c' }); pop();
  // пол и миска
  rectP(-300, 1540, 1680, 700, '#4a3a5a', { seed: 6030, step: 60, shade: () => { for (let y = 1570; y < 2240; y += 70) stroke([[-300, y], [1380, y + 6]], '#3e3050', 3, { smooth: false }); } });
  push(470, 1560, 1); piece([[-70, 0], [70, 0], [56, -36], [-56, -36]], '#2f6db3', { seed: 6031, lw: 2.4 }); if (o.food) { const k = clamp(o.food); for (let i = 0; i < 12 * k; i++) ellP(-40 + (i % 6) * 16, -40 - Math.floor(i / 6) * 10, 9, 7, '#a8743e', { seed: 6032 + i, lw: 1, np: 10, tex: false }); } pop();
}
function foodBag(x, y, s, rot) {                                    // пакет корма в руке
  push(x, y, s, rot); piece([[-60, -90], [60, -90], [70, 90], [-70, 90]], '#e25c2c', { seed: 6040, lw: 2.6 }); rectP(-46, -30, 92, 60, '#fbe9c8', { seed: 6041, lw: 1.6 }); txt('КОРМ', 0, 0, 26, { font: 'Inter Black', col: '#e25c2c' }); pop();
}
function dawnLight(fn) { lightmap('#8d8fbd', () => { radial(250, 600, 700, 'rgba(255,190,170,1)', 0.8); radial(535, 1080, 380, 'rgba(255,120,110,1)', 0.7); radial(470, 1200, 600, 'rgba(255,240,220,1)', 0.35); if (fn) fn(); }); }

// ------------------------------------------------------------------ вставки
function spectro(t, c) {                                             // «спектрограмма»: в мурчании пик ~380 Гц
  bg('#1d2026', 6100); push(540, 800, 1); card(0, 0, 900, 700, 0, 6101, '#11141a');
  txt('МУРЧАНИЕ «ДАЙ ЕДЫ»', 0, -300, 44, { font: 'Inter Black', col: '#e9eef2' });
  const r = rng(6102); for (let i = 0; i < 60; i++) { const x = -400 + i * 13.5, h = 30 + r() * 70 + Math.sin(t * 6 + i * 0.4) * 10; rectP(x, 200 - h, 10, h, '#3a8fe2', { seed: 6110 + i, line: false, tex: false, a: 0.85 }); }
  const k = pr(t, c.hz - 0.2, c.hz + 0.4); for (let i = 0; i < 60; i++) { const x = -400 + i * 13.5, h = 220 * k * Math.exp(-Math.pow((i - 38) / 4, 2)); if (h > 2) rectP(x, 200 - 100 - h, 10, h, '#ff4a3a', { seed: 6180 + i, line: false, tex: false }); }
  stroke([[-410, 210], [410, 210]], '#9aa3ad', 3); txt('низкие', -330, 250, 26, { font: 'Inter', weight: 700, col: '#9aa3ad' }); txt('высокие', 330, 250, 26, { font: 'Inter', weight: 700, col: '#9aa3ad' });
  pop();
  if (t > c.hz) { push(700, 380, 1, 0.04); ransom('380 ГЦ', 0, 0, 100, 6190, { reveal: pr(t, c.hz, c.hz + 0.3), pop: true }); pop(); }
  txt('McComb и др., Current Biology, 2009', 540, 1240, 28, { font: 'Inter', weight: 700, col: '#9aa3ad' });
}
function babyCut(x, y, s) { push(x, y, s); ellP(0, 0, 90, 84, '#f2c7a5', { seed: 6200, lw: 2.6 }); [-1, 1].forEach(sd => { stroke([[sd * 40, -10], [sd * 20, 0]], '#1c1512', 6); drop(sd * 34, 30, 0.6, 6201 + sd); });
  ellP(0, 40, 26, 20, '#c8574a', { seed: 6203, lw: 2 }); piece([[-90, 60], [90, 60], [110, 200], [-110, 200]], '#bfe6ff', { seed: 6204, lw: 2.4 }); pop(); }
function cryInsert(t, c) {                                           // мурчание ≈ плач младенца; 50 слушателей: «срочно»
  cork(); push(300, 560, 1, -0.05); card(0, 0, 360, 420, 0, 6210, '#fbfaf6'); babyCut(0, -30, 0.9); pop(); pin(300, 370);
  push(780, 560, 1, 0.05); card(0, 0, 360, 420, 0, 6211, '#fbfaf6'); push(0, -60, 0.55); tomHead({ t, mood: '', lid: 0.2, m: { open: 0.5, round: 0.4 } }); pop(); txt('мррр-ИИИ', 0, 150, 40, { font: 'Inter Black', col: '#c8241c' }); pop(); pin(780, 370, '#2f6db3');
  txt('≈', 540, 560, 120, { font: 'Inter Black', col: '#1c1512' });
  if (t > c.fifty) for (let i = 0; i < 50; i++) { const k = pr(t, c.fifty + i * 0.02, c.fifty + 0.15 + i * 0.02); if (k <= 0) continue;
    const x = 150 + (i % 10) * 87, y = 880 + Math.floor(i / 10) * 74; push(x, y, 0.32 * k); personIcon(0, 0, 1, ['#9fb6c8', '#c8a0a0', '#a0c8a8'][i % 3], 6220 + i); pop(); }
  if (t > c.urgent) { push(540, 1300, 1, -0.03); ransom('СРОЧНО!', 0, 0, 110, 6280, { reveal: pr(t, c.urgent, c.urgent + 0.2), pop: true }); pop(); }
}
function meowChart(t, c) {                                           // кому коты мяукают
  cork(); push(540, 780, 1, 0.02); card(0, 0, 820, 820, 0, 6300, '#fbfaf6'); pin(-370, -380); pin(370, -380, '#2f6db3');
  txt('КОМУ КОТ МЯУКАЕТ', 0, -320, 48, { font: 'Inter Black', col: '#1c1512' }); stroke([[-340, 280], [340, 280]], '#1c1512', 6);
  const a = eo(pr(t, c.adults, c.adults + 0.5)), b = eo(pr(t, c.meow - 0.1, c.meow + 0.6));
  if (a > 0) { rectP(-260, 280 - 40 * a, 200, 40 * a, '#9fb6c8', { seed: 6301, lw: 2.4 }); txt('котам', -160, 330, 40, { font: 'Inter', weight: 800, col: '#1c1512' }); txt('почти никогда', -160, 200, 30, { font: 'Inter Black', col: '#1c1512' }); }
  if (b > 0) { rectP(60, 280 - 480 * b, 200, 480 * b, '#d8342c', { seed: 6302, lw: 2.4 }); txt('людям', 160, 330, 40, { font: 'Inter', weight: 800, col: '#1c1512' }); txt('постоянно', 160, 250 - 480 * b, 34, { font: 'Inter Black', col: '#1c1512' }); }
  pop();
}
function loopInsert(t, c) {                                          // круг дрессировки: мурчу → встаёшь → корм → снова мурчу
  cork(); const L = ['МУРЧУ', 'ВСТАЁШЬ', 'КОРМ', 'ЗАКРЕПИЛ'], col = ['#f4e6a8', '#fbfaf6', '#d9f0d2', '#ffd9d2'];
  L.forEach((s, i) => { const t0 = c.teach - 0.6 + i * 0.5; if (t < t0) return; const a = -Math.PI / 2 + i * Math.PI / 2, x = 540 + Math.cos(a) * 300, y = 800 + Math.sin(a) * 300;
    push(x, y, popK(t, t0, 0.3), (i % 2 ? 0.05 : -0.05)); card(0, 0, 320, 120, 0, 6400 + i, col[i]); txt(s, 0, 4, 46, { font: 'Inter Black', col: '#1c1512' }); pop(); });
  const sp = (t * 2.2) % 6.283; for (let i = 0; i < 4; i++) { const a0 = -Math.PI / 2 + i * Math.PI / 2 + 0.35; stroke([[540 + Math.cos(a0) * 300, 800 + Math.sin(a0) * 300], [540 + Math.cos(a0 + 0.8) * 300, 800 + Math.sin(a0 + 0.8) * 300]], '#c8241c', 8); }
  dot(540 + Math.cos(sp) * 300, 800 + Math.sin(sp) * 300, 16, '#c8241c');
  txt('и так каждое утро', 540, 1250, 40, { font: 'Inter Black', col: '#3a2a1a' });
}
