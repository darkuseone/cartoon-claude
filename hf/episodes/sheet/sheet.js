/* лист персонажей: каждая секунда — своя поза/эмоция */
function frame(t) {
  const i = Math.floor(t), u = t - i;
  if (i === 0) { tom({ x: 540, y: 620, s: 1.25, t, lid: 0.42, pup: 0.1, m: { open: 0, round: 0 } }); }
  if (i === 1) { tom({ x: 540, y: 820, s: 2.6, t, lid: 0.15, pup: 0.9, m: { open: 0.6, round: 0 }, glowE: 1, body: false }); }
  if (i === 2) { nikita({ x: 540, y: 700, s: 1.6, t, m: { open: 0, round: 0 } }); }
  if (i === 3) { nikita({ x: 540, y: 700, s: 1.6, t, yaw: 0.35, mood: 'shock', m: { open: 0.5, round: 0.2 }, arms: { r: [[260, 330], [180, 160], 'spread'] } }); }
  if (i === 4) { tom({ x: 760, y: 560, s: 0.9, t, yaw: -0.3, lid: 0.4, m: { open: 0.4, round: 0 }, paw: 1 }); nikita({ x: 330, y: 1150, s: 1.05, t, yaw: 0.4, mood: 'eww', arms: { l: [[-230, 380], [-120, 300], 'hold'] } }); }
  if (i === 5) { tom({ x: 540, y: 820, s: 2.6, t, yaw: 0.25, mood: 'bliss', body: false, smirk: 1 }); }
  if (i === 6) { nikita({ x: 540, y: 700, s: 1.6, t, yaw: -0.3, mood: 'dumb', smile: 0.8, m: { open: 0.3, round: 0 } }); }
  if (i === 7) { tom({ x: 540, y: 820, s: 2.6, t, mood: 'angry', lid: 0.35, brow: -1, body: false, m: { open: 0.9, round: 0 } }); }
}
