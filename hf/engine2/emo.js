/* Эмоции героев — готовые наборы параметров лица и тела (11.2026, просьба владельца: «больше эмоций, чтобы успевали прочитать»).
   Использование: nikita({ ...NIKP, ...EN.shock, arms: … }), tom({ ...TOMP, ...ET.smug }). Листы-образцы: design/emotions/nikita.jpg, tom.jpg (hf/episodes/emo_sheet: tools/make.sh emo_sheet snap 0.5,1.5).
   Правила: эмоция держится в кадре ≥ 0,8 с; смена эмоции — с «рывком» take() (сжатие-растяжение головы/тела); реакцию показывать крупным планом.
   Новые параметры лица — chars.js: eyeS (размер глаз), pupS (зрачок), sparkle (искры), jaw (отвисшая челюсть), grin (улыбка до ушей), browIn (внутренний край брови: + злой, − жалобный),
   blush (румянец), pale (бледно-зелёный), tears (слёзы), vein (вена-«крестик»), squash (сжатие/растяжение, 1 — норма). */
const EN = {                                                           // Никита
  proud:    { mood: '', smile: 0.9, grin: 0.8, brow: 0.6, lid: 0.25, lk: [0.4, -0.4], blush: 0.25 },
  naive:    { mood: 'dumb', grin: 1, brow: 1, eyeS: 1.1, sparkle: 0.8, blush: 0.3 },
  awe:      { mood: 'shock', eyeS: 1.25, sparkle: 1, jaw: 0.45, brow: 1 },
  doubt:    { mood: '', lid: 0.45, browA: 0.9, smile: -0.4, lk: [0.8, -0.1] },
  dismiss:  { mood: '', lid: 0.55, brow: 0.5, smirkN: 0.9, lk: [-0.6, -0.5] },
  shock:    { mood: 'shock', eyeS: 1.35, pupS: 0.6, jaw: 0.85, brow: 1.2, pale: 0.25 },
  horror:   { mood: 'dread', eyeS: 1.3, pupS: 0.5, jaw: 0.6, brow: 1, pale: 0.7, sweat: 1 },
  outrage:  { mood: 'angry', brow: -0.3, browIn: 18, jaw: 0.55, vein: 1, blush: 0.7 },
  panic:    { mood: 'dread', eyeS: 1.3, pupS: 0.55, jaw: 0.5, sweat: 1, pale: 0.45, brow: 1 },
  sad:      { mood: '', browIn: -16, brow: 0.6, lid: 0.35, smile: -0.8, tears: 0.6 },
  eureka:   { mood: 'dumb', grin: 1, brow: 1.2, eyeS: 1.2, sparkle: 1, blush: 0.25 },
  worried:  { mood: 'dread', browIn: -12, brow: 0.8, smile: -0.6, sweat: 0.6 },
  eww:      { mood: 'eww', browIn: 12, lid: 0.5, pale: 0.4 }
};
const ET = {                                                           // Том
  deadpan:  { lid: 0.62, lk: [-0.8, 0.1], smirk: 0 },
  smug:     { lid: 0.42, smirk: 1, brow: -0.2, lk: [-0.7, 0] },
  lecture:  { lid: 0.5, paw: 1, pawX: 175, pawY: 110, smirk: 0.3, brow: 0.2, lk: [-0.8, 0] },
  alarm:    { mood: 'shock', eyeS: 1.2, jaw: 0.5, fur: 0.7, ears: 0.3 },
  fear:     { mood: 'shock', eyeS: 1.25, fur: 1, ears: 0.8, jaw: 0.35, sweat: 1 },
  disgust:  { lid: 0.68, brow: -0.6, smirk: 0, ears: 0.4, lk: [0.2, 0.5] },
  grave:    { lid: 0.6, brow: 0.5, smirk: 0, lk: [-0.3, 0.3], ears: 0.25 },
  furious:  { lid: 0.82, brow: -0.9, vein: 1, ears: 0.6, smirk: 0 },
  eyeroll:  { lid: 0.5, lk: [0.2, -1], smirk: 0.2, pup: 0.05 },
  bliss:    { mood: 'bliss', smirk: 0.8, blush: 0.6 },
  sneaky:   { lid: 0.55, smirk: 0.8, lk: [0.9, 0.2], brow: -0.3 },
  shame:    { lid: 0.5, blush: 1, lk: [0.7, 0.6], ears: 0.6, smirk: 0 },
  stare:    { lid: 0.7, lk: [-0.3, 0.1], smirk: 0, brow: -0.2 }
};
/* у каждого набора — полный «нейтральный» базис, чтобы при смене эмоции (ex()) не залипали чужие параметры (например, mood:'shock') */
const EN0 = { mood: '', eyeS: 1, pupS: 1, sparkle: 0, jaw: 0, grin: 0, browIn: undefined, browA: 0, brow: 0, blush: 0, pale: 0, tears: 0, vein: 0, sweat: 0, smile: undefined, smirkN: 0, lid: undefined };
const ET0 = { mood: '', eyeS: 1, pup: 0.12, jaw: 0, fur: 0, ears: 0, sweat: 0, vein: 0, blush: 0, paw: 0, brow: 0, smirk: undefined, lid: undefined };
for (const k in EN) EN[k] = { ...EN0, ...EN[k] }; for (const k in ET) ET[k] = { ...ET0, ...ET[k] };
const EMO = (base, ...more) => Object.assign({}, base, ...more);

/* «рывок» при смене эмоции: голова/тело сжимается и пружинит (1 → 1±0.16 → 1) */
function take(t, t0, amt = 0.16) { const u = t - t0; if (u < 0 || u > 0.7) return 1; return 1 + amt * Math.exp(-6 * u) * Math.cos(16 * u + Math.PI); }
/* дыхание/покачивание — чтобы герой никогда не стоял «картонкой» */
function breathe(t, seed = 0, a = 1) { return { bob: Math.sin(step(t) * 2.2 + seed) * 3 * a, tilt: Math.sin(step(t) * 1.1 + seed * 2) * 0.025 * a }; }

/* Том пытается запрыгнуть выше (на полку) и не допрыгивает — толстый. t0 — старт, dir — направление (−1 влево).
   Возвращает смещение от места {dx, dy, rot, squash, face, phase}. Длительность ≈ 2,3 с; звуки: jump (t0+0.25), scratch (t0+0.75), fall (t0+1.3). */
function tomJumpFail(t, t0, dir = -1, h = 260) {
  const u = t - t0; if (u < 0 || u > 2.6) return { dx: 0, dy: 0, rot: 0, squash: 1, face: null, phase: 'idle' };
  if (u < 0.25) return { dx: 0, dy: 0, rot: 0, squash: 1 - 0.18 * sm(u / 0.25), face: ET.sneaky, phase: 'crouch' };
  if (u < 0.6) { const k = eo((u - 0.25) / 0.35); return { dx: dir * 90 * k, dy: -h * k, rot: dir * 0.25 * k, squash: 1.18, face: ET.alarm, phase: 'leap' }; }
  if (u < 0.95) { const k = (u - 0.6) / 0.35; return { dx: dir * 90, dy: -h + Math.sin(k * 20) * 4, rot: dir * 0.18, squash: 1.1, face: ET.fear, phase: 'hang' }; }
  if (u < 1.3) { const k = Math.pow(clamp((u - 0.95) / 0.35), 2); return { dx: dir * 90 * (1 - k), dy: -h * (1 - k), rot: dir * 0.18 * (1 - k), squash: 1.05, face: ET.fear, phase: 'slide' }; }
  const v = u - 1.3; return { dx: 0, dy: 0, rot: 0, squash: take(t, t0 + 1.3, 0.28), face: v < 0.35 ? { mood: 'pain' } : ET.shame, phase: 'land' };
}
