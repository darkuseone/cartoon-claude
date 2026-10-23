// Эпизод 1 «Котам нужно молоко?» — раскадровка, камера, гэги, звук.
import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';
import timelineJson from '../../public/ep01/timeline.json';
import facesJson from '../../public/ep01/faces.json';
import { Plate, Cam, FaceRig } from '../lib/Plate';
import { Captions, buildGroups } from '../lib/Captions';
import { Atmosphere, Chip, Slam, Ticket, LactaseMeter, TipCards, PeopleStat, OldFilm, Cta } from '../lib/fx';
import { Timeline, makeT, prog, easeInOut, easeOut, lerp } from '../lib/time';

const tl = timelineJson as unknown as Timeline;
const faces = facesJson as unknown as Record<string, Record<string, FaceRig>>;
const T = makeT(tl);
const L = T.L, W = T.W;
const groups = buildGroups(tl.lines);
const FPS = 30;

type Enter = 'cut' | 'whip' | 'flash' | 'zoom' | 'iris';
type Shot = {
  img: string;
  start: number;
  end: number;
  from: Cam;
  to: Cam;
  enter?: Enter;
  punches?: { at: number; amt: number }[]; // резкие наезды на ключевых словах
  shakes?: { at: number; dur: number; amt: number }[];
  filter?: string;
};

// --- раскадровка (время — от реплик) ---
const S: Shot[] = [];
const add = (s: Omit<Shot, 'start'>) => S.push({ ...s, start: S.length ? S[S.length - 1].end : 0 });

add({ img: 'tom_eyes', end: L('n01').start - 0.05, from: { x: 560, y: 900, z: 1.45 }, to: { x: 560, y: 900, z: 1.7 },
  punches: [{ at: W('t01', 1), amt: 0.06 }, { at: W('t01', 3), amt: 0.08 }] });
add({ img: 'nik_pour', end: L('t02').start - 0.05, enter: 'whip', from: { x: 600, y: 760, z: 1.25 }, to: { x: 620, y: 700, z: 1.4 } });
add({ img: 'tom_table', end: L('t04').start - 0.1, enter: 'zoom', from: { x: 540, y: 960, z: 1.0 }, to: { x: 560, y: 820, z: 1.12 },
  punches: [{ at: W('t02', 7), amt: 0.05 }, { at: W('t03', 0), amt: 0.22 }, { at: W('t03', 8), amt: 0.08 }] });
add({ img: 'kitten', end: L('t05').start - 0.05, enter: 'flash', from: { x: 540, y: 820, z: 1.35 }, to: { x: 480, y: 900, z: 1.55 } });
add({ img: 'tom_table', end: L('t06').start - 0.05, enter: 'whip', from: { x: 560, y: 1000, z: 1.0 }, to: { x: 560, y: 1050, z: 1.06 },
  punches: [{ at: W('t05', 7), amt: 0.06 }] });
add({ img: 'belly', end: L('n02').start - 0.03, enter: 'zoom', from: { x: 540, y: 1150, z: 1.25 }, to: { x: 540, y: 1200, z: 1.4 },
  shakes: [{ at: W('t06', 12), dur: 0.35, amt: 14 }, { at: W('t06', 13), dur: 0.35, amt: 16 }, { at: W('t06', 14), dur: 0.5, amt: 22 }] });
add({ img: 'nik_disgust', end: L('n03').start - 0.03, enter: 'whip', from: { x: 380, y: 720, z: 1.5 }, to: { x: 380, y: 720, z: 1.62 },
  shakes: [{ at: L('n02').start, dur: 0.4, amt: 8 }] });
add({ img: 'nik_curious', end: L('t07').start - 0.05, enter: 'cut', from: { x: 520, y: 820, z: 1.15 }, to: { x: 440, y: 760, z: 1.3 } });
add({ img: 'farm', end: W('t07', 18) - 0.06, enter: 'flash', from: { x: 540, y: 520, z: 1.4 }, to: { x: 540, y: 900, z: 1.0 } });
add({ img: 'oldtoon', end: L('n04').start - 0.05, enter: 'iris', from: { x: 540, y: 800, z: 1.15 }, to: { x: 540, y: 800, z: 1.25 },
  filter: 'contrast(1.15) brightness(1.05)' });
add({ img: 'nik_point', end: L('t08').start - 0.05, enter: 'whip', from: { x: 640, y: 640, z: 1.35 }, to: { x: 600, y: 700, z: 1.2 } });
add({ img: 'tom_lick', end: W('t08', 12) - 0.05, enter: 'cut', from: { x: 560, y: 860, z: 1.25 }, to: { x: 570, y: 820, z: 1.4 },
  punches: [{ at: W('t08', 6), amt: 0.12 }, { at: W('t08', 11), amt: 0.1 }] });
add({ img: 'nik_point', end: L('t09').start - 0.05, enter: 'zoom', from: { x: 720, y: 520, z: 2.0 }, to: { x: 720, y: 520, z: 2.15 },
  shakes: [{ at: W('t08', 12), dur: 0.3, amt: 6 }] });
add({ img: 'tom_table', end: L('n05').start - 0.05, enter: 'whip', from: { x: 540, y: 1100, z: 1.0 }, to: { x: 540, y: 1150, z: 1.05 } });
add({ img: 'nik_drink', end: L('t10').start - 0.05, enter: 'cut', from: { x: 560, y: 760, z: 1.2 }, to: { x: 600, y: 640, z: 1.4 } });
add({ img: 'tom_table', end: L('n06').start - 0.55, enter: 'zoom', from: { x: 560, y: 900, z: 1.25 }, to: { x: 570, y: 860, z: 1.45 },
  punches: [{ at: W('t10', 5), amt: 0.06 }] });
add({ img: 'nik_panic', end: L('n06').end + 0.75, enter: 'cut', from: { x: 480, y: 820, z: 1.2 }, to: { x: 440, y: 700, z: 1.55 },
  shakes: [{ at: L('n06').start - 0.5, dur: 0.6, amt: 10 }, { at: L('n06').end + 0.15, dur: 0.5, amt: 6 }], filter: 'saturate(1.1)' });
add({ img: 'door', end: tl.duration + 1, enter: 'whip', from: { x: 540, y: 980, z: 1.15 }, to: { x: 580, y: 920, z: 1.3 },
  shakes: [{ at: L('n06').end + 0.75, dur: 0.45, amt: 18 }] });

// --- звуки ---
const SFX: { f: string; at: number; vol?: number }[] = [
  { f: 'sting', at: 0, vol: 0.9 },
  { f: 'whip_whoosh', at: S[1].start - 0.1, vol: 0.6 },
  { f: 'paper_whoosh', at: W('t03', 8) - 0.15, vol: 0.8 },
  { f: 'stamp_thud', at: W('t03', 10) + 0.05, vol: 0.7 },
  { f: 'shimmer', at: S[3].start, vol: 0.5 },
  { f: 'whip_whoosh', at: S[4].start - 0.1, vol: 0.5 },
  { f: 'wood_bonk', at: W('t05', 7) + 0.9, vol: 0.6 },
  { f: 'bubbles_burst', at: S[5].start, vol: 0.6 },
  { f: 'stamp_thud', at: W('t06', 12), vol: 0.7 },
  { f: 'stamp_thud', at: W('t06', 13), vol: 0.7 },
  { f: 'stomach', at: W('t06', 14) - 0.1, vol: 0.5 },
  { f: 'whip_whoosh', at: S[6].start - 0.1, vol: 0.5 },
  { f: 'shimmer', at: S[8].start, vol: 0.5 },
  { f: 'projector', at: S[9].start, vol: 0.55 },
  { f: 'whip_whoosh', at: S[10].start - 0.1, vol: 0.5 },
  { f: 'tiny_tuk', at: W('t08', 11), vol: 0.8 },
  { f: 'whip_whoosh', at: S[13].start - 0.1, vol: 0.5 },
  { f: 'teleport_pop', at: W('t09', 3), vol: 0.6 },
  { f: 'teleport_pop', at: W('t09', 7), vol: 0.6 },
  { f: 'gulp', at: L('n05').end + 0.1, vol: 0.9 },
  { f: 'teleport_pop', at: W('t10', 4), vol: 0.6 },
  { f: 'stomach', at: L('n06').start - 0.6, vol: 0.9 },
  { f: 'door', at: L('n06').end + 0.25, vol: 0.9 },
  { f: 'cat_meow', at: L('t11').end + 0.05, vol: 0.7 },
];

const camAt = (s: Shot, t: number): Cam => {
  const k = easeInOut(prog(t, s.start, s.end));
  let z = lerp(s.from.z, s.to.z, k);
  for (const p of s.punches ?? []) {
    if (t >= p.at) z *= 1 + p.amt * (0.7 + 0.3 * easeOut(prog(t, p.at, p.at + 0.12)));
  }
  return { x: lerp(s.from.x, s.to.x, k), y: lerp(s.from.y, s.to.y, k), z };
};

const shakeAt = (s: Shot, t: number) =>
  (s.shakes ?? []).reduce((a, sh) => a + (t >= sh.at && t < sh.at + sh.dur ? sh.amt * (1 - (t - sh.at) / sh.dur) : 0), 0);

const ShotView: React.FC<{ s: Shot; t: number; i: number }> = ({ s, t, i }) => {
  const local = t - s.start;
  let wrap: React.CSSProperties = {};
  let extra: React.ReactNode = null;
  if (s.enter === 'whip' && local < 0.22) {
    const k = easeOut(local / 0.22);
    wrap = { transform: `translateX(${lerp(260, 0, k)}px)`, filter: `url(#mb${Math.round((1 - k) * 4)})` };
  } else if (s.enter === 'zoom' && local < 0.25) {
    const k = easeOut(local / 0.25);
    wrap = { transform: `scale(${lerp(1.18, 1, k)})` };
  } else if (s.enter === 'flash' && local < 0.25) {
    extra = <AbsoluteFill style={{ background: '#fff8e8', opacity: 1 - local / 0.25 }} />;
  } else if (s.enter === 'iris' && local < 0.35) {
    const r = lerp(0, 1300, easeOut(local / 0.35));
    wrap = { clipPath: `circle(${r}px at 50% 45%)` };
  }
  return (
    <AbsoluteFill style={{ ...wrap }}>
      <Plate img={s.img} cam={camAt(s, t)} t={t} tl={tl} faces={faces[s.img] ?? {}} shake={shakeAt(s, t)} filter={s.filter} />
      {s.img === 'oldtoon' && <OldFilm t={t} />}
      {extra}
    </AbsoluteFill>
  );
};

export const Ep01: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const si = S.findIndex((s) => t >= s.start && t < s.end);
  const s = S[si === -1 ? S.length - 1 : si];

  // леттербокс «мафия» на хуке
  const bars = 1 - easeOut(prog(t, S[0].end - 0.2, S[0].end + 0.1));
  const music = (f: number) => interpolate(f, [0, L('n01').start * FPS, (tl.duration - 1.5) * FPS, tl.duration * FPS], [0, 0.11, 0.11, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        {[1, 2, 3, 4].map((n) => (
          <filter key={n} id={`mb${n}`}><feGaussianBlur stdDeviation={`${n * 9} 0`} /></filter>
        ))}
      </svg>
      <ShotView s={s} t={t} i={si} />

      {/* гэги и графика поверх кадра */}
      <Ticket t={t} at={W('t03', 8) - 0.15} stamp={W('t03', 10) + 0.05} out={L('t03').end + 0.1} />
      {s === S[3] && <Chip t={t} at={W('t04', 10) - 0.05} x={300} y={560} text="ЛАКТАЗА ✓" bg="#9be37a" rot={-6} />}
      <LactaseMeter t={t} at={S[4].start + 0.15} drainAt={W('t05', 4)} out={S[4].end - 0.15} />
      <Slam t={t} at={W('t06', 12)} until={W('t06', 13) - 0.02} text="ГАЗЫ" color="#b6f27a" rot={-7} />
      <Slam t={t} at={W('t06', 13)} until={W('t06', 14) - 0.02} text="БУРЛЕНИЕ" color="#ffd25e" rot={5} />
      <Slam t={t} at={W('t06', 14)} until={S[5].end} text="ПОНОС" color="#ff6b4a" rot={-4} />
      {s === S[8] && <Chip t={t} at={W('t07', 14)} x={300} y={980} text="ЖИР ↑" bg="#ffd25e" rot={-6} />}
      {s === S[8] && <Chip t={t} at={W('t07', 17)} x={790} y={1060} text="САХАР ↓" bg="#7fe3ff" rot={5} />}
      <TipCards t={t} a1={W('t09', 3)} a2={W('t09', 7)} out={S[13].end - 0.1} />
      <PeopleStat t={t} at={W('t10', 4)} out={S[15].end - 0.05} />
      <Cta t={t} at={W('t11', 3)} />

      <Atmosphere dust={s.img !== 'oldtoon' && s.img !== 'belly'} />
      {bars > 0 && (
        <>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 200 * bars, background: '#000' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 200 * bars, background: '#000' }} />
        </>
      )}
      <Captions t={t} groups={groups} y={1420} />

      {/* звук */}
      <Audio src={staticFile('ep01/voice.wav')} />
      <Sequence from={Math.round(L('n01').start * FPS) - 10}>
        <Audio src={staticFile('ep01/sfx/music_kyiv.mp3')} loop volume={(f) => music(f + L('n01').start * FPS - 10)} />
      </Sequence>
      {SFX.map((x, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(x.at * FPS))}>
          <Audio src={staticFile(`ep01/sfx/${x.f}.mp3`)} volume={x.vol ?? 0.7} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
