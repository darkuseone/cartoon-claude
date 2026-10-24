/* Эп. N «…» — сцены. Общие помощники в engine2/common.js: Wd/LN, ex, ck, talk, shakeAt, slideIn, bg, label, slam, субтитры, обложка. */
const CUE = {
  // имя: Wd('реплика', индекс слова) ± сдвиг   — индексы печатать скриптом, «—» не считается
  lit: LN.t05.start - 0.08, lightOff: LN.t10.end + 0.1
};
const SHAKES = [/* [CUE.x, 0.3, 12] */];
const EP = { title: ['СТРОКА 1', 'СТРОКА 2?'], cens: { /* 'бля,': 'Б*Я,' */ }, hot: /^(ключевые|слова)/i, hideMat: [/* ['t08', 'пиздели', CUE.lied] */] };
const lit = t => t >= CUE.lit && t < CUE.lightOff;
const TOMP = { x: 790, y: 1000, s: 0.62 }, NIKP = { x: 360, y: 960, s: 0.95 };
function room(t, tomO, nikO, extra) { /* декорация + layer(tom) + layer(nikita) + lightmap(ночь/свет) — см. ep02/scenes.js */ }
const SHOTS = [[0, 'cold'] /* , [LN.t01.start - 0.03, 'tomA'] ... жёсткие склейки каждые 2–4 с */];
const SH = {
  cold(t) { cam(575, 1090, 1.42); /* room(t, {...}, {...}); */ pop(); }
};
