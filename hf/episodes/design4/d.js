function frame(t) {
  const i = Math.floor(t); ctx.fillStyle = '#6b8775'; ctx.fillRect(0, 0, W, H);
  if (TEXP === null) TEXP = ctx.createPattern(TEX, 'repeat'); ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = 0.5; ctx.fillStyle = TEXP; ctx.fillRect(0, 0, W, H); ctx.restore();
  const T = o => layer(() => tom({ t: 0.3, ...o })), N = o => layer(() => nikita({ t: 0.3, ...o }));
  [
    () => T({ x: 540, y: 700, s: 1.3, lid: 0.45, smirk: 0.8 }),
    () => T({ x: 540, y: 900, s: 2.4, body: false, lid: 0.45, smirk: 1, m: { open: 0.5 } }),
    () => T({ x: 540, y: 900, s: 2.4, body: false, mood: 'strain' }),
    () => T({ x: 540, y: 900, s: 2.4, body: false, mood: 'shock', pup: 1, fur: 1 }),
    () => T({ x: 540, y: 900, s: 2.4, body: false, mood: 'bliss' }),
    () => T({ x: 540, y: 900, s: 2.4, body: false, mood: 'pain', lid: 0.7, ears: 1, brow: -0.8, m: { open: 0.5 } }),
    () => N({ x: 540, y: 470, s: 1.55, arms: { l: [-40, 205, 'phone'], r: [112, 280, 'glass'] }, glass: 0.7, phoneLit: false }),
    () => N({ x: 540, y: 820, s: 2.6, mood: 'sleepy' }),
    () => N({ x: 540, y: 820, s: 2.6, mood: 'shock', m: { open: 0.5, round: 0.3 } }),
    () => N({ x: 540, y: 820, s: 2.6, mood: 'dumb', brow: 1, m: { open: 0.3 } }),
    () => N({ x: 540, y: 820, s: 2.6, mood: 'angry', brow: -0.6, m: { open: 0.6 } }),
    () => N({ x: 540, y: 820, s: 2.6, mood: 'dread', milkMoustache: true, sweat: 1 }),
  ][i]?.();
}
