// Таймлайн озвучки: реплики, слова, виземы Rhubarb. Всё в секундах.

export type Word = { w: string; s: number; e: number };
export type Line = {
  key: string;
  speaker: 'tom' | 'nikita';
  text: string;
  start: number;
  end: number;
  words: Word[];
  visemes: { s: number; v: string }[];
};
export type Timeline = { fps: number; duration: number; lines: Line[] };

export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const easeInOut = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
export const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);
export const easeBack = (k: number) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
};

export const makeT = (tl: Timeline) => {
  const byKey = Object.fromEntries(tl.lines.map((l) => [l.key, l]));
  const L = (key: string) => byKey[key];
  // время начала слова: индекс среди слов реплики (тире не считаются словами)
  const W = (key: string, i: number) => L(key).words.filter((w) => w.w !== '—')[i].s;
  return { L, W, lines: tl.lines, duration: tl.duration };
};

// раскрытие рта и округлость губ по виземе Rhubarb
const VIS: Record<string, [number, number]> = {
  A: [0, 0], B: [0.28, 0], C: [0.55, 0.1], D: [0.95, 0], E: [0.6, 0.55], F: [0.32, 0.9], G: [0.2, 0], H: [0.45, 0], X: [0, 0],
};

export const mouthAt = (tl: Timeline, speaker: string, t: number) => {
  const line = tl.lines.find((l) => l.speaker === speaker && t >= l.start - 0.02 && t <= l.end + 0.05);
  if (!line) return { open: 0, round: 0, talking: false };
  const cues = line.visemes;
  let i = cues.length - 1;
  while (i > 0 && cues[i].s > t) i--;
  const cur = VIS[cues[i]?.v ?? 'X'];
  const prev = VIS[cues[i - 1]?.v ?? 'X'];
  const k = clamp((t - (cues[i]?.s ?? 0)) / 0.06);
  return { open: lerp(prev[0], cur[0], k), round: lerp(prev[1], cur[1], k), talking: true };
};

// детерминированное моргание: 1 = глаз закрыт
export const blinkAt = (t: number, seed: number) => {
  const period = 2.8 + (seed % 7) * 0.37;
  const ph = (t + seed * 1.91) % period;
  const b = ph < 0.16 ? 1 - Math.abs(ph - 0.08) / 0.08 : 0;
  return clamp(b * 1.2);
};
