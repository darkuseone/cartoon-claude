/* Оформление канала: аватар (1024×1024) и шапка YouTube (2560×1440). Рисуется тем же движком, что серии.
   Сборка: tools/brand.sh → ../publish/brand/. BRAND_MODE подставляет brand.sh ('avatar' | 'banner'). */
const BRAND = typeof BRAND_MODE !== 'undefined' ? BRAND_MODE : 'banner';
const EP = {}, SHOTS = [[0, 'x']], SH = { x() {} };
function hudFrame() {}
function post() {}
function frame(t) { if (BRAND === 'avatar') avatar(t); else banner(t); }

function avatar(t) {
  rectP(-20, -20, W + 40, H + 40, '#f2c230', { seed: 9000, line: false, step: 60 });
  { const r = rng(9001); for (let i = 0; i < 70; i++) dot(r() * W, r() * H, 6 + r() * 6, '#e8b51f', 0.9); }
  layer(() => { push(W / 2, H / 2 + 80, 1.95); tomHead({ t: 0, mood: 'smug', lid: 0.5, lk: [0.15, 0.1], smirk: 1, brow: 0.2, m: { open: 0, round: 0 } }); pop(); }, { sx: 10, sy: 14, sb: 22 });
}

function bulb(x, y, s, lit) { push(x, y, s); ellP(0, 10, 46, 52, lit ? '#fff1a8' : '#cfd6dc', { seed: 9100, lw: 2.4, tex: false }); stroke([[-14, 34], [-12, 4], [-6, -6], [6, -6], [12, 4], [14, 34]], lit ? '#ff9a2a' : '#6b655c', 4);
  rectP(-22, -48, 44, 22, '#b8b2a4', { seed: 9101, lw: 1.6 }); pop(); }
function evid(x, y, rot, w, h, col, seed, fn) { push(x, y, 1, rot); card(0, 0, w, h, 0, seed, col); if (fn) fn(); pop(); pin(x, y - h / 2 + 22); }

function banner(t) {
  rectP(-40, -40, W + 80, H + 80, '#b98a5a', { seed: 9199, line: false, step: 90 });                              // пробковая доска на всю шапку
  { const r = rng(9198); for (let i = 0; i < 900; i++) dot(r() * W, r() * H, 2 + r() * 4, r() < 0.5 ? '#a47648' : '#c99c6a', 0.8); }
  rectP(-20, -20, W + 40, H + 40, 'rgba(120,70,30,0.25)', { seed: 9200, line: false, step: 80 });
  // «улики» по краям (видны на ПК и ТВ, на телефоне обрезаются)
  const E = [[260, 260, -0.06], [880, 210, 0.04], [1700, 200, -0.03], [2300, 280, 0.05], [230, 1150, 0.05], [900, 1230, -0.04], [1680, 1240, 0.03], [2330, 1160, -0.05]];
  // красные нитки между улик — через центр
  const pins = E.map(([x, y]) => [x, y - 120]); [[0, 5], [1, 6], [2, 4], [3, 7], [0, 3], [4, 7], [1, 2], [5, 6]].forEach(([a, b]) => stroke([pins[a], [1280, 720 + (a - b) * 6], pins[b]], '#c8241c', 5));
  evid(...E[0], 360, 260, '#ece6d6', 9210, () => { txt('ГАЗЕТА', 0, -70, 34, { font: 'DejaVu Serif', weight: 700, col: '#3a3530' }); txt('«МЫ ВАС', 0, -10, 46, { font: 'DejaVu Serif', weight: 700, col: '#1c1512' }); txt('НЕ СЛУШАЕМ»', 0, 44, 46, { font: 'DejaVu Serif', weight: 700, col: '#1c1512' }); });
  evid(...E[1], 300, 300, '#fbfaf6', 9211, () => { bulb(0, 10, 1.6, true); txt('1000 ч', 0, 110, 40, { font: 'Inter Black', col: '#c8241c' }); });
  evid(...E[2], 340, 240, '#ffd9d2', 9212, () => { txt('СЕКРЕТНО', 0, -40, 50, { font: 'Inter Black', col: '#c8241c' }); txt('Doubt is', 0, 20, 34, { font: "'Courier 10 Pitch'", weight: 700, col: '#1c1512' }); txt('our product', 0, 60, 34, { font: "'Courier 10 Pitch'", weight: 700, col: '#1c1512' }); });
  evid(...E[3], 300, 340, '#fbfaf6', 9213, () => { phoneCut(0, 10, 0.62, 0.05, { dead: true }); });
  evid(...E[4], 340, 280, '#d9f0d2', 9214, () => { moneyStack(0, 40, 0.65, 1, 0); txt('$2 500 000 000', 0, -96, 26, { font: 'Inter Black', col: '#1c1512' }); });
  evid(...E[5], 300, 260, '#f4e6a8', 9215, () => { txt('5:00', 0, -30, 90, { font: 'Inter Black', col: '#c8241c' }); txt('380 Гц', 0, 60, 44, { font: 'Inter Black', col: '#1c1512' }); });
  evid(...E[6], 340, 250, '#fbfaf6', 9216, () => { txt('НЕ КЛАДИТЕ', 0, -40, 44, { font: 'Inter Black', col: '#1c1512' }); txt('iPhone в рис', 0, 20, 44, { font: 'Inter Black', col: '#1c1512' }); stroke([[-140, 70], [140, 70]], '#ffd23a', 14); });
  evid(...E[7], 300, 300, '#fbfaf6', 9217, () => { txt('60 %', 0, -40, 90, { font: 'Inter Black', col: '#c8241c' }); txt('в раковине', 0, 50, 40, { font: 'Inter Black', col: '#1c1512' }); });
  // центр (безопасная зона 1546×423: x 507–2053, y 508–931) — подложка, герои, название, слоган
  push(1280, 720, 1); piece([[-790, -230], [790, -224], [784, 230], [-786, 226]], '#f6f1e4', { seed: 9230, lw: 3, step: 24 }); pop();
  tape(560, 500, 160, -0.3, 9231); tape(2000, 500, 160, 0.3, 9232);
  layer(() => tom({ x: 655, y: 931 - 385 * 0.5 - 8, s: 0.5, t: 0, mood: 'smug', lid: 0.5, lk: [0.6, 0], smirk: 1, flip: true, m: { open: 0, round: 0 } }), { sx: 6, sy: 8, sb: 12 });
  layer(() => nikita({ x: 1920, y: 931 - 508 * 0.5 - 6, s: 0.5, t: 0, legs: 'stand', mood: 'dumb', smile: 0.8, brow: 1, lk: [-0.7, -0.3], arms: { l: [-150, 40, 'point'], r: [170, 200, 'open'] }, m: { open: 0.4, round: 0.3 } }), { sx: 6, sy: 8, sb: 12 });
  push(1315, 650, 1, -0.015); ransom('ТОМ И НИКИТА', 0, 0, 150, 9240, { maxW: 1000 }); pop();
  label(1315, 835, 'кот объясняет то, что от тебя скрывали', 0, '#f4e6a8', 0.01, 40);
}
