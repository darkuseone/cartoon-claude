/* листы персонажей для Claude Design: каждая секунда — отдельная картинка */
const COLDL = { ang: Math.PI * 0.97, a: 0.44, col: '#9fd4ff', rimA: 0.6 }, WARML = { ang: -Math.PI * 0.6, a: 0.5, col: '#ffcf8a', rimA: 0.5 };
function frame(t) {
  const i = Math.floor(t), u = 0.4;
  const T = (o) => tom({ t: u, light: COLDL, glowE: 0.8, ...o }), N = (o) => nikita({ t: u, light: WARML, ...o });
  [
    () => T({ x: 540, y: 620, s: 1.05, lid: 0.45, smirk: 0.8 }),
    () => T({ x: 540, y: 620, s: 1.05, yaw: -0.42, lid: 0.4, lk: [-0.6, 0] }),
    () => T({ x: 540, y: 620, s: 1.05, yaw: 0.42, lid: 0.5, lk: [0.6, 0], paw: 1, pawX: 160, pawY: 130 }),
    () => T({ x: 540, y: 980, s: 2.3, body: false, lid: 0.45, smirk: 1, m: { open: 0.45, round: 0 } }),
    () => T({ x: 540, y: 980, s: 2.3, body: false, mood: 'bliss', smirk: 1, light: WARML }),
    () => T({ x: 540, y: 980, s: 2.3, body: false, mood: 'shock', lid: 0.05, pup: 1, brow: 1, fluff: 1.5, light: WARML }),
    () => T({ x: 540, y: 980, s: 2.3, body: false, mood: 'angry', lid: 0.4, brow: -1, m: { open: 0.85, round: 0 } }),
    () => T({ x: 540, y: 980, s: 2.3, body: false, lid: 0.2, pup: 0.95, glowE: 1.4 }),
    () => N({ x: 540, y: 420, s: 0.95, legs: 'stand', yaw: 0.2, smile: 0.4, arms: { r: [[230, 420], [200, 590], 'down'], l: [[-230, 420], [-200, 590], 'down'] } }),
    () => N({ x: 540, y: 820, s: 2.1, mood: 'shock', brow: 0.8, yaw: 0.2 }),
    () => N({ x: 540, y: 820, s: 2.1, mood: 'eww', yaw: 0.25, tilt: -0.08 }),
    () => N({ x: 540, y: 820, s: 2.1, mood: 'dumb', smile: 0.8, brow: 1, m: { open: 0.3, round: 0 }, yaw: -0.2 }),
    () => N({ x: 540, y: 820, s: 2.1, mood: 'angry', brow: -0.8, m: { open: 0.6, round: 0 }, yaw: 0.3 }),
    () => { N({ x: 540, y: 820, s: 2.1, mood: 'shock', yaw: 0.1 }); pencil(spline([[540 - 40 * 2.1, 820 + 72 * 2.1], [540, 820 + 64 * 2.1], [540 + 44 * 2.1, 820 + 72 * 2.1]], false, 5), { w: 18, col: PAL.milk, a: 0.95, key: 610 }); }
  ][i]?.();
}
