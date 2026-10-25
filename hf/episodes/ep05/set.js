/* Эп. 5 «Табачный заговор?» — декорация (балкон на закате) и вставки-коллажи. */

function balcony(t) {
  rectP(-300, -300, 1680, 900, '#f2a65e', { seed: 5000, line: false, step: 80 });                          // небо: закат полосами
  rectP(-300, 380, 1680, 500, '#f4c27a', { seed: 5001, line: false, step: 80 }); rectP(-300, 700, 1680, 500, '#f7dba0', { seed: 5002, line: false, step: 80 });
  ellP(760, 760, 130, 130, '#fff1c8', { seed: 5003, line: false, a: 0.95 });
  { const r = rng(5004); for (let i = 0; i < 9; i++) { const x = -260 + i * 180, h = 260 + r() * 340; rectP(x, 1180 - h, 150 + r() * 40, h, i % 2 ? '#8a5a6e' : '#734a62', { seed: 5010 + i, line: false });
      for (let k = 0; k < 6; k++) rectP(x + 14 + r() * 110, 1180 - h + 20 + r() * (h - 60), 12, 16, '#ffd98a', { seed: 5030 + i * 10 + k, line: false, tex: false, a: 0.9 }); } }
  // бельевая верёвка с носками
  stroke([[-40, 300], [540, 360], [1120, 300]], '#3a2a24', 4);
  [[160, 330, '#e2533a'], [300, 345, '#3a8fe2'], [780, 345, '#f2e85c'], [920, 330, '#46b86a']].forEach(([x, y, c], i) => { const sw = Math.sin(step(t) * 3 + i) * 0.06;
    push(x, y, 1, sw); piece([[-18, 0], [18, 0], [18, 90], [40, 110], [36, 130], [-10, 120], [-18, 100]], c, { seed: 5060 + i, step: 8, lw: 2.2 }); pop(); stroke([[x - 6, -6], [x - 6, 12]], '#c99a62', 6); stroke([[x + 6, -6], [x + 6, 12]], '#c99a62', 6); });
  // парапет — кирпич, сверху бетонная полка
  rectP(-300, 1180, 1680, 400, '#b0533c', { seed: 5070, step: 30, shade: () => { for (let y = 1210, j = 0; y < 1560; y += 50, j++) { stroke([[-300, y], [1380, y]], '#8f4130', 4, { smooth: false });
      for (let x = -300 + (j % 2) * 60; x < 1380; x += 120) stroke([[x, y - 50], [x, y]], '#8f4130', 4, { smooth: false }); } } });
  rectP(-300, 1150, 1680, 44, '#c9c4b8', { seed: 5071, lw: 2.6 });
  // банка-пепельница и цветок в горшке
  push(600, 1150, 1); piece([[-34, 0], [34, 0], [38, -84], [-38, -84]], 'rgba(210,235,240,0.6)', { seed: 5072, lw: 2.4, tex: false }); piece([[-34, 0], [34, 0], [36, -30], [-36, -30]], '#8a7a6a', { seed: 5073, line: false });
  [-16, 4, 20].forEach((x, i) => { stroke([[x, -26], [x + 6, -64]], '#f3efe4', 9); stroke([[x + 5, -60], [x + 6, -66]], '#d8a64a', 9); }); pop();
  push(1010, 1150, 1); piece([[-50, 0], [50, 0], [62, -80], [-62, -80]], '#c46a2c', { seed: 5074, lw: 2.4 }); [[-30, -150], [0, -190], [34, -160]].forEach(([x, y], i) => { stroke([[0, -80], [x, y]], '#3f7a3a', 6); ellP(x, y, 26, 14, '#5fa35a', { seed: 5075 + i, rot: 0.5 }); }); pop();
  rectP(-300, 1560, 1680, 700, '#8a8478', { seed: 5080, step: 60, shade: () => { for (let x = -300; x < 1380; x += 120) stroke([[x, 1560], [x - 60, 2240]], '#77726a', 3, { smooth: false }); } });
}
function cig(x, y, s, rot, t, lit = true) {                         // сигарета + дымок
  push(x, y, s, rot); rectP(0, -6, 70, 12, '#f6f3ea', { seed: 5100, lw: 1.6, tex: false }); rectP(-20, -6, 22, 12, '#d8a64a', { seed: 5101, lw: 1.6, tex: false });
  if (lit) { rectP(68, -6, 6, 12, '#e2533a', { seed: 5102, line: false, tex: false }); pop(); smoke(x + 74 * s * Math.cos(rot), y + 74 * s * Math.sin(rot), t, 5); } else pop();
}
function smoke(x, y, t, n, seed = 5110) { for (let i = 0; i < n; i++) { const ph = ((step(t, 12) * 0.5 + i / n) % 1), r = rng(seed + i);
  ellP(x + Math.sin(ph * 6 + i) * 20 * ph, y - ph * 220, 10 + ph * 34, 8 + ph * 26, 'rgba(235,235,240,1)', { seed: seed + i, line: false, tex: false, a: 0.55 * (1 - ph) }); } }
function vape(x, y, s, rot) { push(x, y, s, rot); piece([[-12, -60], [12, -60], [14, 40], [-14, 40]], '#2a2d36', { seed: 5120, lw: 2.2 }); rectP(-8, -84, 16, 26, '#7a5cb8', { seed: 5121, lw: 1.6 }); dot(0, 20, 5, '#46e0ff'); pop(); }
function cough(x, y, t, t0) { if (t < t0 || t > t0 + 1.2) return; const k = (t - t0) / 1.2; for (let i = 0; i < 4; i++) ellP(x + 30 + i * 40 * k + i * 20, y - 10 - i * 14 * k, 26 + 30 * k, 20 + 20 * k, 'rgba(230,230,236,1)', { seed: 5130 + i, line: false, tex: false, a: 0.7 * (1 - k) }); }

// ------------------------------------------------------------------ вставки
function frankAd(t, c) {                                             // «Откровенное заявление курильщикам», 1954
  push(540, 800, 1.04, -0.03); piece([[-420, -470], [420, -460], [410, 470], [-415, 460]], '#ece6d6', { seed: 5200, step: 14, edge: 2, lw: 2 });
  txt('ГАЗЕТЫ США · 4 ЯНВАРЯ 1954', 0, -410, 26, { font: 'DejaVu Serif', weight: 700, col: '#3a3530' }); stroke([[-380, -380], [380, -380]], '#3a3530', 3);
  txt('ОТКРОВЕННОЕ', 0, -300, 70, { font: 'DejaVu Serif', weight: 700, col: '#1c1512' }); txt('ЗАЯВЛЕНИЕ', 0, -220, 70, { font: 'DejaVu Serif', weight: 700, col: '#1c1512' });
  txt('КУРИЛЬЩИКАМ', 0, -150, 48, { font: 'DejaVu Serif', weight: 700, col: '#3a3530' });
  for (let i = 0; i < 6; i++) stroke([[-380, -70 + i * 34], [i === 5 ? 60 : 380, -70 + i * 34]], '#9a9488', 6);
  if (t > c.link - 0.1) { const k = pr(t, c.link - 0.1, c.link + 0.5); ctx.save(); ctx.globalAlpha = 0.85; piece([[-380, 160], [-380 + 760 * k, 156], [-380 + 760 * k, 236], [-380, 240]], '#ffe54a', { seed: 5201, line: false, step: 20 }); ctx.restore(); }
  txt('«связь с раком не доказана»', 0, 200, 50, { font: 'DejaVu Serif', weight: 700, col: '#1c1512' });
  for (let i = 0; i < 4; i++) stroke([[-380, 290 + i * 34], [i === 3 ? -40 : 380, 290 + i * 34]], '#9a9488', 6);
  txt('— 14 табачных компаний и ассоциаций', 120, 430, 26, { font: 'DejaVu Serif', weight: 400, col: '#3a3530' });
  tape(-360, -470, 120, -0.5, 5202); tape(360, -460, 120, 0.5, 5203); pop();
  if (t > c.n448) { push(540, 1330, 1, 0.03); ransom('448 ГАЗЕТ', 0, 0, 110, 5204, { reveal: pr(t, c.n448, c.n448 + 0.3), pop: true }); pop(); }
}
function memo(t, c) {                                                // «Сомнение — наш продукт», 1969
  bg('#2b2622', 5210); push(540, 820, 1.05, 0.03); card(0, 0, 820, 980, 0, 5211, '#f8f5ec');
  txt('CONFIDENTIAL', 0, -420, 54, { font: "'Courier 10 Pitch'", weight: 700, col: '#c8241c' }); txt('Brown & Williamson · 1969', 0, -350, 34, { font: "'Courier 10 Pitch'", weight: 700, col: '#1c1512' });
  for (let i = 0; i < 5; i++) stroke([[-360, -270 + i * 40], [i === 4 ? 0 : 360, -270 + i * 40]], '#b8b2a4', 8);
  if (t > c.doubt - 0.1) { const k = pr(t, c.doubt - 0.1, c.doubt + 0.5); ctx.save(); ctx.globalAlpha = 0.85; piece([[-370, -30], [-370 + 740 * k, -34], [-370 + 740 * k, 50], [-370, 54]], '#ffe54a', { seed: 5212, line: false, step: 20 }); ctx.restore(); }
  txt('«Doubt is our product»', 0, 10, 60, { font: "'Courier 10 Pitch'", weight: 700, col: '#1c1512' });
  for (let i = 0; i < 6; i++) stroke([[-360, 120 + i * 40], [i === 5 ? -100 : 360, 120 + i * 40]], '#b8b2a4', 8);
  pop();
  if (t > c.doubt) { push(540, 210, 1, -0.03); ransom('СОМНЕНИЕ — НАШ ПРОДУКТ', 0, 0, 74, 5213, { reveal: pr(t, c.doubt, c.doubt + 0.5) }); pop(); }
}
function ceos(t, c) {                                                // семь глав компаний под присягой, 1994
  bg('#2f3a52', 5220); rectP(-100, 1040, 1280, 120, '#6b4a2e', { seed: 5221, lw: 2.6 });
  for (let i = 0; i < 7; i++) { const x = 120 + i * 140, k = pr(t, c.seven - 0.4 + i * 0.08, c.seven - 0.2 + i * 0.08); if (k <= 0) continue;
    push(x, 900, 1.2 * k); personIcon(0, 0, 1, ['#4a4f5c', '#3a3f4a', '#555c66'][i % 3], 5230 + i); stroke([[30, -20], [60, -110]], '#3a3f4a', 16); ellP(60, -122, 14, 16, '#f2c7a5', { seed: 5240 + i, lw: 1.6 }); pop(); }
  txt('Конгресс США · 14 апреля 1994', 540, 1120, 34, { font: 'Inter Black', col: '#fbe9c8' });
  if (t > c.oath) { push(540, 330, popK(t, c.oath, 0.3), -0.03); card(0, 0, 560, 110, 0, 5250, '#f4e6a8'); txt('ПОД ПРИСЯГОЙ', 0, 4, 56, { font: 'Inter Black', col: '#1c1512' }); pop(); }
  if (t > c.nic) { push(540, 560, popK(t, c.nic, 0.3), 0.02); card(0, 0, 900, 150, 0, 5251, '#fbfaf6'); txt('«Никотин не вызывает зависимость»', 0, 4, 46, { font: 'Inter Black', col: '#1c1512' }); pop();
    if (t > c.nic + 0.9) { push(760, 640, 1.6 - 0.6 * popK(t, c.nic + 0.9, 0.3), -0.15); ctx.globalAlpha = 0.9; piece([[-190, -50], [190, -50], [190, 50], [-190, 50]], 'rgba(0,0,0,0)', { raw: true, lc: '#c8241c', lw: 9, tex: false });
      txt('НЕПРАВДА', 0, 4, 58, { font: 'Inter Black', col: '#c8241c' }); ctx.globalAlpha = 1; pop(); } }
}
function court(t, c) {                                               // «США против Philip Morris», 2006: закон против мафии
  cork(); push(540, 720, 1, -0.03); card(0, 0, 780, 560, 0, 5260, '#fbfaf6'); pin(-340, -250); pin(340, -250, '#2f6db3');
  txt('США против Philip Morris и др.', 0, -180, 36, { font: 'DejaVu Serif', weight: 700, col: '#1c1512' }); txt('решение суда · 17.08.2006', 0, -120, 34, { font: 'Inter', weight: 700, col: '#3a3530' });
  if (t > c.decades) txt('обманывали десятилетиями', 0, 0, 44, { font: 'Inter Black', col: '#c8241c', reveal: pr(t, c.decades - 0.1, c.decades + 0.6) });
  for (let i = 0; i < 4; i++) stroke([[-330, 90 + i * 40], [i === 3 ? 0 : 330, 90 + i * 40]], '#c9c4b8', 9); pop();
  push(330, 1170, 1, -0.5 + 0.5 * eo(pr(t, c.decades - 0.2, c.decades))); rectP(-30, -20, 300, 40, '#8a5a34', { seed: 5261, lw: 2.4 }); rectP(-90, -70, 120, 140, '#6b4226', { seed: 5262, lw: 2.6 }); pop();
  if (t > c.mafia - 0.3) { push(760, 1130, popK(t, c.mafia - 0.3, 0.3), 0.05);                     // шляпа-федора: «закон против мафии»
    piece([[-150, 30], [150, 30], [130, 56], [-130, 56]], '#1c1512', { seed: 5263, lw: 2.4 }); piece([[-90, 32], [-80, -60], [-30, -80], [0, -60], [30, -80], [80, -60], [90, 32]], '#2a2420', { seed: 5264, lw: 2.4 }); rectP(-90, 0, 180, 24, '#c8241c', { seed: 5265, line: false }); pop();
    push(540, 1300, 1, -0.02); ransom('ЗАКОН ПРОТИВ МАФИИ', 0, 0, 70, 5266, { reveal: pr(t, c.mafia - 0.3, c.mafia + 0.3) }); pop(); }
}
function juul(t, c) {                                                // хозяин «Мальборо» → Juul: $12,8 млрд за 35 %
  cork(); push(300, 760, 3.4, -0.2); vape(0, 0, 1, 0); pop(); moneyStack(740, 900, 1.1, t, c.bln - 0.6);
  push(540, 330, 1, -0.04); ransom('$12 800 000 000', 0, 0, 100, 5270, { reveal: pr(t, c.bln - 0.5, c.bln + 0.3) }); pop();
  push(540, 1190, popK(t, c.owner, 0.3), 0.03); card(0, 0, 860, 160, 0, 5271, '#fbfaf6'); txt('Altria (владелец Marlboro в США)', 0, -26, 38, { font: 'Inter Black', col: '#1c1512' }); txt('→ 35 % Juul, декабрь 2018', 0, 30, 38, { font: 'Inter', weight: 800, col: '#c8241c' }); pop();
}
