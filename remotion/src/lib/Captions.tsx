import React from 'react';
import { Line } from './time';
import { easeBack, prog } from './time';

const COLORS = { tom: '#ffc94a', nikita: '#7fe3ff' } as const;

type Group = { speaker: 'tom' | 'nikita'; words: { w: string; s: number }[]; s: number; e: number };

// фразы по 1–3 слова, новая фраза — после точки/восклицания или когда длинно
export const buildGroups = (lines: Line[]): Group[] => {
  const out: Group[] = [];
  for (const ln of lines) {
    const ws = ln.words.filter((w) => w.w !== '—');
    const gs: Group[] = [];
    let cur: { w: string; s: number }[] = [];
    const flush = () => { if (cur.length) gs.push({ speaker: ln.speaker, words: cur, s: 0, e: 0 }); cur = []; };
    for (const w of ws) {
      const len = cur.reduce((n, x) => n + x.w.length + 1, 0) + w.w.length;
      if (cur.length >= 3 || len > 16) flush();
      cur.push(w);
      if (/[.!?…]$/.test(w.w)) flush();
    }
    flush();
    gs.forEach((g, i) => {
      g.s = g.words[0].s - 0.04;
      g.e = i + 1 < gs.length ? gs[i + 1].words[0].s - 0.04 : ln.end + 0.2;
    });
    out.push(...gs);
  }
  return out;
};

// слова-акценты: крупнее и другим цветом
const HOT = /^(лактаза|лактазы|лактозы|лоток|лоток\.|бля|газы|бурление|понос|жир|кожаный|молоко|воды|сливки|десятая)/i;

export const Captions: React.FC<{ t: number; groups: Group[]; y?: number }> = ({ t, groups, y = 1470 }) => {
  const g = groups.find((x) => t >= x.s && t < x.e);
  if (!g) return null;
  const k = easeBack(prog(t, g.s, g.s + 0.14));
  return (
    <div style={{
      position: 'absolute', left: 60, right: 60, top: y, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 22px',
      transform: `scale(${0.8 + 0.2 * k})`, transformOrigin: '50% 50%',
      fontFamily: '"Inter Display", "Inter", sans-serif', fontWeight: 900, fontSize: 84, lineHeight: 1.08, textTransform: 'uppercase',
      textAlign: 'center',
    }}>
      {g.words.map((w, i) => {
        const on = t >= w.s - 0.03;
        const hot = HOT.test(w.w.replace(/[,!?.…]/g, ''));
        const pop = on ? easeBack(prog(t, w.s - 0.03, w.s + 0.1)) : 0;
        return (
          <span key={i} style={{
            color: on ? (hot ? '#ff6b4a' : COLORS[g.speaker]) : '#ffffff',
            WebkitTextStroke: '16px #15121a', paintOrder: 'stroke fill',
            display: 'inline-block', transform: `scale(${1 + (hot ? 0.18 : 0.06) * pop})`,
            textShadow: '0 8px 0 rgba(0,0,0,0.35)',
          }}>{w.w.replace(/[—]/g, '')}</span>
        );
      })}
    </div>
  );
};
