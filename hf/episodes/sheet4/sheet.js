function frame(t) {
  const i = Math.floor(t);
  ctx.fillStyle = '#c9b48f'; ctx.fillRect(0, 0, W, H);
  const T = o => layer(() => tom({ t: 0.3, ...o })), N = o => layer(() => nikita({ t: 0.3, ...o }));
  [
    () => T({ x: 540, y: 700, s: 1.25, lid: 0.45, smirk: 0.6 }),
    () => T({ x: 540, y: 900, s: 2.4, body: false, lid: 0.3, m: { open: 0.6, round: 0 } }),
    () => T({ x: 540, y: 900, s: 2.4, body: false, mood: 'strain' }),
    () => T({ x: 540, y: 900, s: 2.4, body: false, mood: 'shock', pup: 1 }),
    () => N({ x: 540, y: 520, s: 1.45, arms: { l: [-150, 230, 'phone'], r: [150, 230, 'glass'] }, glass: 0.6 }),
    () => N({ x: 540, y: 820, s: 2.6, mood: 'shock', m: { open: 0.5, round: 0.3 } }),
    () => N({ x: 540, y: 820, s: 2.6, mood: 'dread', milkMoustache: true, belly: 1 }),
    () => { T({ x: 760, y: 1050, s: 0.8, paw: 1, m: { open: 0.4, round: 0 } }); N({ x: 300, y: 820, s: 1.0, mood: 'sleepy', lk: [0.7, 0.3], arms: { l: [-120, 300, 'phone'], r: [130, 280, 'glass'] } }); },
  ][i]?.();
}
