import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { noise2D } from '@remotion/noise';
import { clamp, mouthAt, blinkAt, Timeline } from './time';

export type FaceRig = {
  jawOnly?: boolean;
  eyes: [number, number, number, number][];
  lid: string[];
  mouth?: [number, number, number];
  head?: [number, number, number, number];
  pivot?: [number, number];
};
export type Cam = { x: number; y: number; z: number };

const W = 1080, H = 1920;

// камера: точка (x, y) кадра в центре экрана, z — зум (>= 1); края картинки не показываем
export const camTransform = (c: Cam) => {
  const z = Math.max(1, c.z);
  const x = clamp(c.x, W / 2 / z, W - W / 2 / z);
  const y = clamp(c.y, H / 2 / z, H - H / 2 / z);
  return `translate(${W / 2 - x * z}px, ${H / 2 - y * z}px) scale(${z})`;
};

type Props = {
  img: string;
  cam: Cam;
  t: number;
  tl: Timeline;
  faces: Record<string, FaceRig>;
  shake?: number;
  filter?: string;
  children?: React.ReactNode; // оверлеи в координатах кадра (двигаются с камерой)
};

export const Plate: React.FC<Props> = ({ img, cam, t, tl, faces, shake = 0, filter, children }) => {
  const src = staticFile(`ep01/img/${img}.jpg`);
  const sx = shake ? noise2D('sx', t * 18, 0) * shake : 0;
  const sy = shake ? noise2D('sy', 0, t * 18) * shake : 0;
  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#000' }}>
      <div
        style={{
          position: 'absolute', width: W, height: H, transformOrigin: '0 0',
          transform: `translate(${sx}px, ${sy}px) ${camTransform(cam)}`, filter,
        }}
      >
        <Img src={src} style={{ position: 'absolute', width: W, height: H }} />
        <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
          {Object.entries(faces).map(([who, rig], i) => (
            <Face key={who} who={who} rig={rig} src={src} t={t} tl={tl} seed={i * 3 + img.length} />
          ))}
        </svg>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Лицо: голова слегка качается при речи, челюсть опускается по виземам, глаза моргают.
const Face: React.FC<{ who: string; rig: FaceRig; src: string; t: number; tl: Timeline; seed: number }> = ({
  who, rig, src, t, tl, seed,
}) => {
  const m = mouthAt(tl, who, t);
  const id = `${who}${seed}`;
  const isCat = who === 'tom';
  let angle = 0, nod = 0;
  if (rig.head) {
    angle = 0.5 * Math.sin(t * 1.3 + seed) + (m.talking ? 1.1 * Math.sin(t * 3.7 + seed) + 0.6 * m.open : 0);
    nod = m.talking ? -m.open * 4 : Math.sin(t * 1.1 + seed) * 1.5;
  }
  const [px, py] = rig.pivot ?? [0, 0];
  const blink = blinkAt(t, seed);

  let mouth = null;
  if (rig.mouth) {
    const [mx, my, w] = rig.mouth;
    const drop = m.open * w * (isCat ? 0.32 : 0.38);
    const rx = (w / 2) * (0.5 + 0.3 * (1 - m.round)) * (0.55 + 0.45 * m.open);
    const ry = Math.max(0.5, drop * 0.55 + 1.5);
    mouth = (
      <>
        <defs>
          <radialGradient id={`jg${id}`} cx="50%" cy="40%" r="50%">
            <stop offset="0.55" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <filter id={`jb${id}`}><feGaussianBlur stdDeviation="1.5" /></filter>
          <mask id={`jm${id}`} maskUnits="userSpaceOnUse">
            <g filter={`url(#jb${id})`}>
              <ellipse cx={mx} cy={my + w * 0.42} rx={w * 0.95} ry={w * 0.62} fill={`url(#jg${id})`} />
              <rect x={mx - w * 1.5} y={my - w} width={w * 3} height={w + 1} fill="#000" />
            </g>
          </mask>
          <radialGradient id={`cv${id}`} cx="50%" cy="30%" r="70%">
            <stop offset="0" stopColor="#3d1217" />
            <stop offset="1" stopColor="#120507" />
          </radialGradient>
        </defs>
        {drop > 0.6 && !rig.jawOnly && (
          <g>
            <ellipse cx={mx} cy={my + drop * 0.45} rx={rx} ry={ry} fill={`url(#cv${id})`} />
            {!isCat && m.open > 0.35 && (
              <rect x={mx - rx * 0.7} y={my - 1} width={rx * 1.4} height={Math.min(ry * 0.5, 7)} rx={3} fill="#f4efe6" opacity={0.9} />
            )}
            <ellipse cx={mx} cy={my + drop * 0.82} rx={rx * 0.5} ry={Math.max(1, ry * 0.32)} fill="#c95f6e" opacity={0.8} />
          </g>
        )}
        <g transform={`translate(0 ${drop})`}>
          <image href={src} width={1080} height={1920} mask={`url(#jm${id})`} />
        </g>
      </>
    );
  }

  const eyes = rig.eyes.map(([ex, ey, rx, ry], k) => {
    if (blink < 0.02) return null;
    const cid = `ec${id}${k}`;
    const top = ey - ry * 1.35;
    const h = ry * 2.7 * blink;
    return (
      <g key={k}>
        <defs>
          <clipPath id={cid}><ellipse cx={ex} cy={ey} rx={rx * 1.18} ry={ry * 1.3} /></clipPath>
        </defs>
        <g clipPath={`url(#${cid})`}>
          <rect x={ex - rx * 1.3} y={top} width={rx * 2.6} height={h} fill={rig.lid[k]} />
          <path d={`M ${ex - rx * 1.2} ${top + h} Q ${ex} ${top + h + ry * 0.35} ${ex + rx * 1.2} ${top + h}`} stroke="#2a1a14" strokeWidth={Math.max(2, ry * 0.18)} fill="none" />
        </g>
      </g>
    );
  });

  if (!rig.head) return <g>{mouth}{eyes}</g>;
  const [hx, hy, hrx, hry] = rig.head;
  return (
    <g transform={`rotate(${angle} ${px} ${py}) translate(0 ${nod})`}>
      <defs>
        <radialGradient id={`hg${id}`}>
          <stop offset="0.7" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`hm${id}`} maskUnits="userSpaceOnUse">
          <ellipse cx={hx} cy={hy} rx={hrx} ry={hry} fill={`url(#hg${id})`} />
        </mask>
      </defs>
      <image href={src} width={1080} height={1920} mask={`url(#hm${id})`} />
      {mouth}
      {eyes}
    </g>
  );
};
