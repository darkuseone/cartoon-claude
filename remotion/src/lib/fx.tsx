import React from 'react';
import { AbsoluteFill, random, useCurrentFrame } from 'remotion';
import { clamp, easeBack, easeOut, prog, lerp } from './time';

const FONT = '"Inter Display", "Inter", sans-serif';

// виньетка + зерно плёнки + пылинки в свете лампы
export const Atmosphere: React.FC<{ dust?: boolean; warm?: boolean }> = ({ dust = true, warm = true }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {dust && (
        <svg width={1080} height={1920} style={{ position: 'absolute' }}>
          {Array.from({ length: 34 }).map((_, i) => {
            const x0 = random(`dx${i}`) * 1080, y0 = random(`dy${i}`) * 1500;
            const sp = 8 + random(`ds${i}`) * 18;
            const x = (x0 + Math.sin(t * 0.4 + i) * 30 + t * sp * 0.4) % 1080;
            const y = (y0 + t * sp) % 1600 + 80;
            const r = 1.2 + random(`dr${i}`) * 2.6;
            const o = 0.18 + 0.35 * Math.abs(Math.sin(t * 0.7 + i));
            return <circle key={i} cx={x} cy={y} r={r} fill={warm ? '#ffe2a8' : '#ffffff'} opacity={o} />;
          })}
        </svg>
      )}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(12,6,18,0.55) 100%)' }} />
      <svg width={1080} height={1920} style={{ position: 'absolute', mixBlendMode: 'overlay', opacity: 0.09 }}>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 23} /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width={1080} height={1920} filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

// плашка-«наклейка» в экранных координатах
export const Chip: React.FC<{ t: number; at: number; x: number; y: number; text: string; color?: string; bg?: string; rot?: number; size?: number; out?: number }> = ({
  t, at, x, y, text, color = '#1b1410', bg = '#ffd25e', rot = -4, size = 54, out,
}) => {
  const k = easeBack(prog(t, at, at + 0.28));
  const o = out ? 1 - prog(t, out, out + 0.2) : 1;
  if (k <= 0.001 || o <= 0) return null;
  return (
    <div style={{
      position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${k})`, opacity: o,
      background: bg, color, fontFamily: FONT, fontWeight: 900, fontSize: size, padding: '14px 30px', borderRadius: 22,
      border: '6px solid #1b1410', boxShadow: '0 14px 0 rgba(0,0,0,0.35)', whiteSpace: 'nowrap', letterSpacing: 1,
    }}>{text}</div>
  );
};

// крупное слово-удар по центру (ГАЗЫ / БУРЛЕНИЕ / ПОНОС)
export const Slam: React.FC<{ t: number; at: number; until: number; text: string; color: string; y?: number; rot?: number }> = ({
  t, at, until, text, color, y = 760, rot = -6,
}) => {
  if (t < at || t > until) return null;
  const k = prog(t, at, at + 0.12);
  const s = lerp(2.4, 1, easeOut(k));
  return (
    <div style={{
      position: 'absolute', left: 540, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${s})`, opacity: clamp(k * 3),
      fontFamily: FONT, fontWeight: 900, fontSize: 150, color, WebkitTextStroke: '14px #1b1410', paintOrder: 'stroke',
      textShadow: '0 16px 0 rgba(0,0,0,0.45)', letterSpacing: 2,
    }}>{text}</div>
  );
};

// билет в лоток
export const Ticket: React.FC<{ t: number; at: number; stamp: number; out: number }> = ({ t, at, stamp, out }) => {
  if (t < at || t > out + 0.3) return null;
  const k = easeOut(prog(t, at, at + 0.35));
  const o = 1 - prog(t, out, out + 0.25);
  const sk = easeBack(prog(t, stamp, stamp + 0.18));
  return (
    <div style={{
      position: 'absolute', left: 540, top: 520, opacity: o,
      transform: `translate(-50%,-50%) translateX(${lerp(900, 0, k)}px) rotate(${lerp(30, -7, k)}deg)`,
    }}>
      <div style={{
        width: 680, height: 300, background: 'linear-gradient(135deg,#ffe6a3,#f2c14e)', borderRadius: 26, border: '7px solid #1b1410',
        boxShadow: '0 22px 0 rgba(0,0,0,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT, color: '#1b1410', position: 'relative',
        WebkitMaskImage: 'radial-gradient(circle 34px at 0 50%, transparent 98%, #000 100%), radial-gradient(circle 34px at 100% 50%, transparent 98%, #000 100%)',
        WebkitMaskComposite: 'source-in',
      }}>
        <div style={{ fontWeight: 900, fontSize: 40, letterSpacing: 8, opacity: 0.75 }}>БИЛЕТ</div>
        <div style={{ fontWeight: 900, fontSize: 84, lineHeight: 1 }}>В ЛОТОК</div>
        <div style={{ fontWeight: 800, fontSize: 34, marginTop: 10 }}>место: всю ночь · ряд: 1</div>
      </div>
      {sk > 0.001 && (
        <div style={{
          position: 'absolute', left: 430, top: 20, transform: `rotate(-18deg) scale(${lerp(2, 1, sk)})`, opacity: clamp(sk * 2),
          border: '8px solid #c62f2f', color: '#c62f2f', fontFamily: FONT, fontWeight: 900, fontSize: 52, padding: '6px 18px', borderRadius: 14,
          background: 'rgba(255,255,255,0.15)',
        }}>ОДОБРЕНО</div>
      )}
    </div>
  );
};

// шкала лактазы: котёнок 100%, взрослый тает до ~10%
export const LactaseMeter: React.FC<{ t: number; at: number; drainAt: number; out: number }> = ({ t, at, drainAt, out }) => {
  const k = easeBack(prog(t, at, at + 0.35));
  const o = 1 - prog(t, out, out + 0.25);
  if (k <= 0.001 || o <= 0) return null;
  const d = easeOut(prog(t, drainAt, drainAt + 1.1));
  const adult = lerp(100, 10, d);
  const Bar = ({ label, v, col }: { label: string; v: number; col: string }) => (
    <div style={{ marginTop: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 40, fontWeight: 900 }}>
        <span>{label}</span><span>{Math.round(v)}%</span>
      </div>
      <div style={{ height: 46, background: '#2a211b', borderRadius: 23, border: '5px solid #1b1410', overflow: 'hidden', marginTop: 8 }}>
        <div style={{ width: `${v}%`, height: '100%', background: col, borderRadius: 18 }} />
      </div>
    </div>
  );
  return (
    <div style={{
      position: 'absolute', left: 540, top: 330, width: 820, transform: `translate(-50%,-50%) scale(${k})`, opacity: o,
      background: 'rgba(255,248,232,0.95)', border: '7px solid #1b1410', borderRadius: 34, padding: '26px 40px 36px',
      fontFamily: FONT, color: '#1b1410', boxShadow: '0 18px 0 rgba(0,0,0,0.35)',
    }}>
      <div style={{ fontSize: 56, fontWeight: 900, textAlign: 'center' }}>ЛАКТАЗА</div>
      <Bar label="котёнок" v={100} col="linear-gradient(90deg,#59c96b,#9be37a)" />
      <Bar label="взрослый кот" v={adult} col={adult < 40 ? 'linear-gradient(90deg,#e0483c,#ff8a5c)' : 'linear-gradient(90deg,#59c96b,#9be37a)'} />
    </div>
  );
};

// две карточки-совета: вода и кошачье молоко
export const TipCards: React.FC<{ t: number; a1: number; a2: number; out: number }> = ({ t, a1, a2, out }) => {
  const o = 1 - prog(t, out, out + 0.25);
  if (o <= 0) return null;
  const Card = ({ at, x, icon, title, sub, rot }: { at: number; x: number; icon: React.ReactNode; title: string; sub: string; rot: number }) => {
    const k = easeBack(prog(t, at, at + 0.3));
    if (k <= 0.001) return null;
    return (
      <div style={{
        position: 'absolute', left: x, top: 420, width: 440, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${k})`,
        background: 'rgba(255,248,232,0.96)', border: '7px solid #1b1410', borderRadius: 34, padding: '22px 20px 26px', textAlign: 'center',
        fontFamily: FONT, color: '#1b1410', boxShadow: '0 16px 0 rgba(0,0,0,0.35)', opacity: o,
      }}>
        {icon}
        <div style={{ fontSize: 50, fontWeight: 900, marginTop: 6 }}>{title}</div>
        <div style={{ fontSize: 32, fontWeight: 800, opacity: 0.75 }}>{sub}</div>
        <div style={{ position: 'absolute', right: -18, top: -24, width: 74, height: 74, borderRadius: 37, background: '#4cbf5e', border: '6px solid #1b1410', color: '#fff', fontSize: 50, fontWeight: 900, lineHeight: '62px' }}>✓</div>
      </div>
    );
  };
  const bowl = (
    <svg width={170} height={120} viewBox="0 0 170 120">
      <ellipse cx={85} cy={52} rx={74} ry={20} fill="#7fd0f5" stroke="#1b1410" strokeWidth={6} />
      <path d="M11 52 Q 20 108 85 110 Q 150 108 159 52" fill="#e05a4a" stroke="#1b1410" strokeWidth={6} />
      <ellipse cx={65} cy={48} rx={18} ry={5} fill="#fff" opacity={0.8} />
    </svg>
  );
  const carton = (
    <svg width={170} height={120} viewBox="0 0 170 120">
      <path d="M58 30 L112 30 L112 116 L58 116 Z" fill="#fff" stroke="#1b1410" strokeWidth={6} />
      <path d="M58 30 L70 6 L100 6 L112 30 Z" fill="#e9e6df" stroke="#1b1410" strokeWidth={6} strokeLinejoin="round" />
      <rect x={58} y={58} width={54} height={28} fill="#f08a3e" />
      <path d="M78 72 q7 -10 14 0 q-7 10 -14 0" fill="#1b1410" />
    </svg>
  );
  return (
    <>
      <Card at={a1} x={290} icon={bowl} title="ВОДА" sub="всегда свежая" rot={-5} />
      <Card at={a2} x={790} icon={carton} title="КОШАЧЬЕ" sub="молоко без лактозы" rot={5} />
    </>
  );
};

// ≈ 2/3 взрослых людей
export const PeopleStat: React.FC<{ t: number; at: number; out: number }> = ({ t, at, out }) => {
  const k = easeBack(prog(t, at, at + 0.35));
  const o = 1 - prog(t, out, out + 0.25);
  if (k <= 0.001 || o <= 0) return null;
  const person = (c: string, i: number) => {
    const pk = easeBack(prog(t, at + 0.15 + i * 0.12, at + 0.4 + i * 0.12));
    return (
      <svg key={i} width={150} height={220} viewBox="0 0 150 220" style={{ transform: `scale(${pk})` }}>
        <circle cx={75} cy={48} r={38} fill={c} stroke="#1b1410" strokeWidth={7} />
        <path d="M18 210 Q 18 100 75 98 Q 132 100 132 210 Z" fill={c} stroke="#1b1410" strokeWidth={7} />
      </svg>
    );
  };
  return (
    <div style={{
      position: 'absolute', left: 540, top: 380, transform: `translate(-50%,-50%) scale(${k})`, opacity: o,
      background: 'rgba(255,248,232,0.96)', border: '7px solid #1b1410', borderRadius: 34, padding: '24px 40px', textAlign: 'center',
      fontFamily: FONT, color: '#1b1410', boxShadow: '0 16px 0 rgba(0,0,0,0.35)',
    }}>
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center' }}>{[ '#e0483c', '#e0483c', '#8fd18a' ].map(person)}</div>
      <div style={{ fontSize: 60, fontWeight: 900, marginTop: 8 }}>≈ 2 из 3 взрослых</div>
      <div style={{ fontSize: 36, fontWeight: 800, opacity: 0.75 }}>лактаза почти выключена</div>
    </div>
  );
};

// мерцание старой плёнки: царапины, прыгающая рамка
export const OldFilm: React.FC<{ t: number }> = ({ t }) => {
  const f = Math.floor(t * 24);
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <AbsoluteFill style={{ background: '#000', opacity: 0.08 + 0.08 * random(`fl${f}`) }} />
      <svg width={1080} height={1920} style={{ position: 'absolute' }}>
        {Array.from({ length: 3 }).map((_, i) => {
          const x = random(`sc${f}${i}`) * 1080;
          return random(`sv${f}${i}`) > 0.45 ? <line key={i} x1={x} y1={0} x2={x + 6} y2={1920} stroke="#fff" strokeOpacity={0.35} strokeWidth={2} /> : null;
        })}
        {random(`blob${f}`) > 0.7 && <circle cx={random(`bx${f}`) * 1080} cy={random(`by${f}`) * 1920} r={6 + random(`br${f}`) * 14} fill="#000" opacity={0.6} />}
      </svg>
    </AbsoluteFill>
  );
};

// плашка «подпишись» в конце
export const Cta: React.FC<{ t: number; at: number }> = ({ t, at }) => {
  const k = easeBack(prog(t, at, at + 0.35));
  if (k <= 0.001) return null;
  const pulse = 1 + 0.04 * Math.sin((t - at) * 8);
  return (
    <div style={{
      position: 'absolute', left: 540, top: 330, transform: `translate(-50%,-50%) rotate(-3deg) scale(${k * pulse})`,
      background: '#e0483c', color: '#fff', fontFamily: FONT, fontWeight: 900, fontSize: 64, padding: '20px 44px', borderRadius: 30,
      border: '7px solid #1b1410', boxShadow: '0 16px 0 rgba(0,0,0,0.4)', whiteSpace: 'nowrap',
    }}>ПОДПИШИСЬ, КОЖАНЫЙ</div>
  );
};
