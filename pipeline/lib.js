// Общая библиотека мультфильма: хелперы анимации, персонажи Том и Никита, субтитры, оверлеи.
// Всё рисуется строками SVG; render(t) эпизода собирает кадр целиком.

const W = 1080, H = 1920;
const OL = '#2b2633';

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const eio = k => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
const eout = k => 1 - Math.pow(1 - k, 3);
const eback = k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const f1 = v => Math.round(v * 10) / 10;

let _uid = 0;
const uid = p => `${p}${++_uid}`;

// громкость реплики персонажа в момент t (0..1), сглаженная по соседним кадрам
function talk(sp, t) {
  const e = (window.TL.env[sp] || []);
  const i = Math.round(t * window.TL.fps);
  const v = ((e[i - 1] || 0) + 2 * (e[i] || 0) + (e[i + 1] || 0)) / 4;
  return v < 0.08 ? 0 : v;
}

// моргание: 1 = глаза закрыты
function blink(t, seed) {
  const period = 3.2 + seed * 0.9;
  const ph = (t + seed * 1.7) % period;
  return ph < 0.16 ? 1 - Math.abs(ph - 0.08) / 0.08 : 0;
}

// двухзвенная рука: плечо -> локоть -> кисть, кисть стремится в target
function ik(sh, target, L1, L2, bend) {
  const dx = target[0] - sh[0], dy = target[1] - sh[1];
  const d = Math.min(Math.hypot(dx, dy), L1 + L2 - 0.5);
  const a = Math.atan2(dy, dx);
  const b = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const a1 = a + bend * b;
  const el = [sh[0] + L1 * Math.cos(a1), sh[1] + L1 * Math.sin(a1)];
  const hand = [sh[0] + d * Math.cos(a), sh[1] + d * Math.sin(a)];
  return { el, hand };
}

// ---------------------------------------------------------------- ТОМ
// Серый полосатый кот, сидит. Начало координат — середина основания (где лапы).
function tom(o) {
  const d = Object.assign({
    x: 0, y: 0, s: 1, talk: 0, lid: 0.42, blink: 0, lookX: 0, lookY: 0,
    browL: 0, browR: 0, tail: 0, tilt: 0, ear: 0, down: 0, mustache: 0,
    lick: 0, lidTilt: 5, breath: 0,
  }, o);
  const G = '#8d929c', GD = '#676c77', GL = '#c9cdd5';
  let s = '';
  const ta = d.tail;
  const tail = `M95,-45 C190,-40 ${f1(205 + 25 * ta)},-120 ${f1(215 + 40 * ta)},${f1(-235 + 20 * Math.abs(ta))}`;
  s += `<path d="${tail}" stroke="${OL}" stroke-width="50" fill="none" stroke-linecap="round"/>`;
  s += `<path d="${tail}" stroke="${G}" stroke-width="37" fill="none" stroke-linecap="round"/>`;
  s += `<circle cx="${f1(215 + 40 * ta)}" cy="${f1(-235 + 20 * Math.abs(ta))}" r="17" fill="${GD}"/>`;
  s += `<g transform="translate(0,0) scale(1,${1 + 0.012 * d.breath})">`;
  s += `<path d="M-120,0 C-172,-10 -166,-162 -105,-216 C-70,-246 70,-246 105,-216 C166,-162 172,-10 120,0 Z" fill="${G}" stroke="${OL}" stroke-width="6"/>`;
  s += `<path d="M-152,-112 q36,-8 56,12 M-160,-70 q38,-6 58,14 M152,-112 q-36,-8 -56,12 M160,-70 q-38,-6 -58,14" stroke="${GD}" stroke-width="12" stroke-linecap="round" fill="none"/>`;
  s += `<path d="M-62,-206 C-80,-120 -55,-36 0,-28 C55,-36 80,-120 62,-206 Z" fill="${GL}"/>`;
  s += `<path d="M-62,-12 C-122,-22 -132,-92 -92,-122 M62,-12 C122,-22 132,-92 92,-122" stroke="${OL}" stroke-width="5" fill="none" opacity=".45"/>`;
  for (const sx of [-1, 1]) {
    s += `<ellipse cx="${42 * sx}" cy="-10" rx="35" ry="20" fill="${GL}" stroke="${OL}" stroke-width="5"/>`;
    s += `<path d="M${42 * sx - 10},-2 l0,-9 M${42 * sx + 10},-2 l0,-9" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>`;
  }
  s += `</g>`;
  const hx = -150 * d.down, hy = -232 + 150 * d.down, hr = d.tilt - 22 * d.down;
  s += `<g transform="translate(${f1(hx)},${f1(hy)}) rotate(${f1(hr)})">${tomHead(d)}</g>`;
  return `<g transform="translate(${f1(d.x)},${f1(d.y)}) scale(${d.s})">${s}</g>`;
}

function tomHead(d) {
  const G = '#8d929c', GD = '#676c77', WH = '#eeebf2';
  let s = '';
  s += `<g transform="rotate(${f1(-d.ear * 14)} -80 -165)"><path d="M-130,-118 L-110,-242 L-40,-178 Z" fill="${G}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/><path d="M-114,-140 L-104,-212 L-64,-176 Z" fill="#e9a6ae"/></g>`;
  // правое ухо с надломом — фирменная деталь Тома
  s += `<path d="M130,-118 L122,-205 L146,-232 L104,-216 L40,-178 Z" fill="${G}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/><path d="M114,-140 L110,-200 L66,-176 Z" fill="#e9a6ae"/>`;
  s += `<path d="M-130,-90 C-140,-170 -70,-196 0,-196 C70,-196 140,-170 130,-90 C152,-72 148,-40 122,-30 C112,0 60,16 0,16 C-60,16 -112,0 -122,-30 C-148,-40 -152,-72 -130,-90 Z" fill="${G}" stroke="${OL}" stroke-width="6"/>`;
  s += `<path d="M-38,-193 L-28,-150 L-18,-193 Z M-8,-196 L2,-142 L12,-196 Z M22,-193 L32,-150 L42,-193 Z" fill="${GD}"/>`;
  s += `<path d="M-142,-82 l36,5 M-144,-56 l33,8 M142,-82 l-36,5 M144,-56 l-33,8" stroke="${GD}" stroke-width="9" stroke-linecap="round"/>`;
  for (const sx of [-1, 1]) {
    const cx = 52 * sx, cy = -100, rx = 34, ry = 30;
    const id = uid('te');
    const close = Math.max(d.lid, d.blink);
    const ly = cy - ry + 2 * ry * close;
    const tiltOuter = d.lidTilt * (close < 0.95 ? 1 : 0);
    const yL = sx < 0 ? ly + tiltOuter : ly - tiltOuter, yR = sx < 0 ? ly - tiltOuter : ly + tiltOuter;
    const px = cx + d.lookX * 12, py = cy + d.lookY * 9;
    s += `<clipPath id="${id}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath>`;
    s += `<g clip-path="url(#${id})"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#f2c14e"/>`;
    s += `<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="7.5" ry="21" fill="#1d1a22"/><circle cx="${f1(px + 5)}" cy="${f1(py - 9)}" r="5" fill="#fff"/>`;
    s += `<path d="M${cx - 40},${cy - 40} L${cx + 40},${cy - 40} L${cx + 40},${f1(yR)} L${cx - 40},${f1(yL)} Z" fill="${G}"/>`;
    s += `<path d="M${cx - 40},${f1(yL)} L${cx + 40},${f1(yR)}" stroke="${OL}" stroke-width="6"/></g>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${OL}" stroke-width="5"/>`;
    const by = -150 - (sx < 0 ? d.browL : d.browR) * 16;
    s += `<path d="M${cx - 30 * sx},${f1(by + 6)} Q${cx},${f1(by - 6)} ${cx + 30 * sx},${f1(by + 2)}" stroke="${OL}" stroke-width="9" stroke-linecap="round" fill="none"/>`;
  }
  if (d.talk > 0.06) {
    const ry = 4 + d.talk * 24, rx = 17 + d.talk * 7;
    s += `<ellipse cx="0" cy="${f1(-26 + ry * 0.6)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="#4b1d2b" stroke="${OL}" stroke-width="4"/>`;
    s += `<ellipse cx="0" cy="${f1(-26 + ry * 1.15)}" rx="${f1(rx * 0.6)}" ry="${f1(ry * 0.35)}" fill="#e2788a"/>`;
  }
  if (d.lick > 0.02) s += `<ellipse cx="10" cy="${f1(-20 + 12 * d.lick)}" rx="15" ry="${f1(6 + 13 * d.lick)}" fill="#e2788a" stroke="${OL}" stroke-width="4"/>`;
  s += `<ellipse cx="-27" cy="-46" rx="33" ry="25" fill="${WH}" stroke="${OL}" stroke-width="3" stroke-opacity=".35"/><ellipse cx="27" cy="-46" rx="33" ry="25" fill="${WH}" stroke="${OL}" stroke-width="3" stroke-opacity=".35"/>`;
  if (d.talk <= 0.06) s += `<path d="M-24,-30 Q-12,-19 0,-31 Q12,-19 24,-30" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (d.mustache > 0) s += `<g opacity="${d.mustache}"><path d="M-66,-58 Q-34,-74 0,-62 Q34,-74 66,-58 Q72,-30 50,-20 Q46,4 38,-14 Q20,-8 6,-14 Q2,8 -6,-14 Q-24,-6 -40,-16 Q-48,2 -52,-22 Q-72,-30 -66,-58 Z" fill="#fffdf4" stroke="#d6d0c0" stroke-width="3"/><ellipse cx="-30" cy="-50" rx="10" ry="5" fill="#fff" opacity=".9"/></g>`;
  s += `<path d="M-15,-70 Q0,-75 15,-70 L0,-52 Z" fill="#ea8a9b" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  s += `<path d="M-58,-52 L-152,-64 M-58,-44 L-155,-38 M-58,-36 L-146,-12 M58,-52 L152,-64 M58,-44 L155,-38 M58,-36 L146,-12" stroke="#f6f4fa" stroke-width="3.5" stroke-linecap="round"/>`;
  return s;
}

// ---------------------------------------------------------------- НИКИТА
// Маленький человечек в горчичном худи. Начало координат — основание шеи.
function nikita(o) {
  const d = Object.assign({
    x: 0, y: 0, s: 1, talk: 0, blink: 0, lookX: 0, lookY: 0, brow: 'neutral', mouth: 'smile',
    handL: [-112, 170], handR: [112, 170], carton: null, point: false, sweat: 0, tear: 0, scoop: null,
    headTilt: 0, bob: 0, pinchNose: false, legs: true,
  }, o);
  const SKIN = '#f6c9a3', HOOD = '#f2b632', HOODD = '#cf8f24';
  const L1 = 100, L2 = 95;
  const arm = (sh, target, bend) => {
    const { el, hand } = ik(sh, target, L1, L2, bend);
    const p = `M${f1(sh[0])},${f1(sh[1])} L${f1(el[0])},${f1(el[1])} L${f1(hand[0])},${f1(hand[1])}`;
    return {
      hand,
      svg: `<path d="${p}" stroke="${OL}" stroke-width="48" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${p}" stroke="${HOOD}" stroke-width="36" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
      handSvg: `<circle cx="${f1(hand[0])}" cy="${f1(hand[1])}" r="23" fill="${SKIN}" stroke="${OL}" stroke-width="5"/>`,
    };
  };
  let s = '';
  s += `<ellipse cx="0" cy="-4" rx="96" ry="38" fill="${HOODD}" stroke="${OL}" stroke-width="6"/>`;
  if (d.legs) s += `<path d="M-70,220 L-74,350 L-14,350 L-8,220 Z M70,220 L74,350 L14,350 L8,220 Z" fill="#3c5a8a" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>`;
  if (d.legs) s += `<ellipse cx="-48" cy="356" rx="40" ry="16" fill="#e8e3da" stroke="${OL}" stroke-width="6"/><ellipse cx="48" cy="356" rx="40" ry="16" fill="#e8e3da" stroke="${OL}" stroke-width="6"/>`;
  s += `<path d="M-95,10 C-112,40 -116,160 -104,245 L104,245 C116,160 112,40 95,10 C60,-10 -60,-10 -95,10 Z" fill="${HOOD}" stroke="${OL}" stroke-width="6"/>`;
  s += `<path d="M-104,225 L104,225" stroke="${HOODD}" stroke-width="10"/>`;
  s += `<path d="M-22,16 L-27,84 M22,16 L27,84" stroke="#fff6e3" stroke-width="7" stroke-linecap="round"/><circle cx="-27" cy="88" r="7" fill="#fff6e3"/><circle cx="27" cy="88" r="7" fill="#fff6e3"/>`;
  const aL = arm([-86, 36], d.handL, 1);
  if (!d.pinchNose) s += aL.svg + aL.handSvg;

  let h = '';
  h += `<circle cx="-120" cy="-118" r="24" fill="${SKIN}" stroke="${OL}" stroke-width="5"/><circle cx="120" cy="-118" r="24" fill="${SKIN}" stroke="${OL}" stroke-width="5"/>`;
  h += `<ellipse cx="0" cy="-125" rx="122" ry="116" fill="${SKIN}" stroke="${OL}" stroke-width="6"/>`;
  h += `<path d="M-128,-118 C-140,-215 -60,-262 5,-258 C80,-255 140,-210 128,-118 C118,-160 95,-178 70,-182 C60,-162 40,-168 30,-190 C10,-170 -20,-172 -35,-192 C-50,-168 -80,-170 -95,-160 C-110,-150 -120,-135 -128,-118 Z" fill="#3b2a22" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>`;
  h += `<path d="M-30,-252 L-12,-296 L12,-255 Z M18,-252 L58,-282 L52,-236 Z" fill="#3b2a22" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>`;
  for (const sx of [-1, 1]) {
    const cx = 44 * sx, cy = -118;
    if (d.blink > 0.5) {
      h += `<path d="M${cx - 26},${cy} Q${cx},${cy + 14} ${cx + 26},${cy}" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    } else {
      h += `<ellipse cx="${cx}" cy="${cy}" rx="27" ry="31" fill="#fff" stroke="${OL}" stroke-width="5"/>`;
      const px = cx + d.lookX * 9, py = cy + d.lookY * 10;
      h += `<circle cx="${f1(px)}" cy="${f1(py)}" r="14" fill="#2a1f1c"/><circle cx="${f1(px + 5)}" cy="${f1(py - 6)}" r="5" fill="#fff"/>`;
    }
    const brows = {
      neutral: `M${cx - 26 * sx},-158 Q${cx},-168 ${cx + 26 * sx},-160`,
      up: `M${cx - 26 * sx},-170 Q${cx},-186 ${cx + 26 * sx},-174`,
      angry: `M${cx - 26 * sx},-172 L${cx + 22 * sx},-154`,
      worried: `M${cx - 26 * sx},-156 L${cx + 22 * sx},-174`,
    };
    h += `<path d="${brows[d.brow]}" stroke="#3b2a22" stroke-width="11" fill="none" stroke-linecap="round"/>`;
  }
  h += `<ellipse cx="-78" cy="-80" rx="21" ry="11" fill="#f19a8a" opacity=".55"/><ellipse cx="78" cy="-80" rx="21" ry="11" fill="#f19a8a" opacity=".55"/>`;
  h += `<circle cx="-30" cy="-86" r="3" fill="#c98a63"/><circle cx="-20" cy="-80" r="3" fill="#c98a63"/><circle cx="30" cy="-86" r="3" fill="#c98a63"/><circle cx="20" cy="-80" r="3" fill="#c98a63"/>`;
  h += `<path d="M-7,-92 Q0,-82 8,-92" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (d.talk > 0.06) {
    const ry = 4 + d.talk * 20, rx = 15 + d.talk * 10;
    h += `<ellipse cx="0" cy="${f1(-58 + ry * 0.5)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="#5a1f26" stroke="${OL}" stroke-width="4"/>`;
    h += `<ellipse cx="0" cy="${f1(-58 + ry * 1.05)}" rx="${f1(rx * 0.55)}" ry="${f1(ry * 0.35)}" fill="#e2788a"/>`;
  } else {
    const m = {
      smile: `<path d="M-26,-60 Q0,-36 26,-60" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
      frown: `<path d="M-22,-46 Q0,-64 22,-46" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
      flat: `<path d="M-18,-52 L18,-52" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>`,
      o: `<ellipse cx="0" cy="-52" rx="10" ry="13" fill="#5a1f26" stroke="${OL}" stroke-width="4"/>`,
    };
    h += m[d.mouth];
  }
  if (d.sweat > 0) h += `<path d="M132,-220 Q146,-196 132,-184 Q118,-196 132,-220 Z" fill="#8fd3ff" stroke="${OL}" stroke-width="3" opacity="${d.sweat}"/>`;
  if (d.tear > 0) h += `<path d="M-62,${f1(-92 + d.tear * 40)} q8,14 0,20 q-8,-6 0,-20 Z" fill="#8fd3ff" stroke="${OL}" stroke-width="3"/>`;
  s += `<g transform="translate(0,${f1(-10 + d.bob)}) rotate(${f1(d.headTilt)} 0 -60)">${h}</g>`;

  if (d.pinchNose) s += aL.svg + aL.handSvg;
  const aR = arm([86, 36], d.handR, -1);
  s += aR.svg;
  if (d.carton !== null) s += carton(aR.hand, d.carton);
  if (d.scoop) s += scoop(aR.hand, d.scoop);
  s += aR.handSvg;
  if (d.point) {
    const [hx, hy] = aR.hand;
    s += `<path d="M${f1(hx)},${f1(hy)} l38,-8" stroke="${OL}" stroke-width="20" stroke-linecap="round"/><path d="M${f1(hx)},${f1(hy)} l38,-8" stroke="${SKIN}" stroke-width="11" stroke-linecap="round"/>`;
  }
  return `<g transform="translate(${f1(d.x)},${f1(d.y)}) scale(${d.s})">${s}</g>`;
}

// пакет молока в руке; возвращает и SVG, и мировую позицию носика через cartonSpout
function carton(hand, tilt) {
  return `<g transform="translate(${f1(hand[0])},${f1(hand[1])}) rotate(${f1(tilt)})">
    <path d="M-32,-72 L32,-72 L32,40 L-32,40 Z" fill="#fbfbf7" stroke="${OL}" stroke-width="5"/>
    <path d="M-32,-72 L-14,-102 L14,-102 L32,-72 Z" fill="#e6e6df" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="-32" y="-34" width="64" height="32" fill="#3d7fd1"/>
    <text x="0" y="-12" font-family="Inter Display" font-weight="900" font-size="13" fill="#fff" text-anchor="middle">МОЛОКО</text>
    <path d="M-14,-6 q14,16 28,0" stroke="#3d7fd1" stroke-width="5" fill="none"/></g>`;
}
function cartonSpout(hand, tilt) {
  const a = tilt * Math.PI / 180, lx = 30, ly = -88;
  return [hand[0] + lx * Math.cos(a) - ly * Math.sin(a), hand[1] + lx * Math.sin(a) + ly * Math.cos(a)];
}

function scoop(hand, angle) {
  return `<g transform="translate(${f1(hand[0])},${f1(hand[1])}) rotate(${f1(angle)})">
    <path d="M0,0 L0,110" stroke="${OL}" stroke-width="18" stroke-linecap="round"/><path d="M0,0 L0,110" stroke="#e45d5d" stroke-width="9" stroke-linecap="round"/>
    <path d="M-45,110 L45,110 L38,190 L-38,190 Z" fill="#e45d5d" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M-22,125 L-20,175 M0,125 L0,175 M22,125 L20,175" stroke="${OL}" stroke-width="6" stroke-linecap="round"/></g>`;
}

// ---------------------------------------------------------------- СУБТИТРЫ
const SUB_COLORS = { tom: '#ffc94a', nikita: '#7fe3ff' };

function buildSubGroups(lines) {
  const groups = [];
  for (const ln of lines) {
    let cur = [];
    const flush = () => { if (cur.length) groups.push({ speaker: ln.speaker, words: cur }); cur = []; };
    for (const w of ln.words) {
      const chars = cur.reduce((n, x) => n + x.w.length + 1, 0) + w.w.length;
      if (cur.length >= 3 || chars > 17) flush();
      cur.push(w);
      if (/[.!?]$/.test(w.w)) flush();
    }
    flush();
    const lineGroups = groups.filter(g => g.words[0].s >= ln.start - 0.01 && g.words[0].s <= ln.end);
    lineGroups.forEach((g, i) => {
      g.s = g.words[0].s - 0.05;
      g.e = i + 1 < lineGroups.length ? lineGroups[i + 1].words[0].s - 0.05 : ln.end + 0.25;
    });
  }
  return groups;
}

function subtitles(t, groups, y = 1540) {
  const g = groups.find(g => t >= g.s && t < g.e);
  if (!g) return '';
  const k = eback(prog(t, g.s, g.s + 0.14));
  const sc = 0.82 + 0.18 * k;
  const col = SUB_COLORS[g.speaker];
  const spans = g.words.map(w => `<tspan fill="${t >= w.s - 0.03 ? col : '#ffffff'}">${w.w.toUpperCase()}</tspan>`).join(' ');
  return `<g id="sub" transform="translate(540,${y}) scale(${f1(sc * 100) / 100})"><text x="0" y="0" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="84" letter-spacing="1" stroke="#15121a" stroke-width="18" stroke-linejoin="round" paint-order="stroke">${spans}</text></g>`;
}

// ---------------------------------------------------------------- ОВЕРЛЕИ
function overlays(frame) {
  return `<defs>
    <radialGradient id="vig" cx="50%" cy="45%" r="75%"><stop offset="55%" stop-color="#140a1e" stop-opacity="0"/><stop offset="100%" stop-color="#140a1e" stop-opacity=".55"/></radialGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${frame % 97}"/><feColorMatrix type="saturate" values="0"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity=".07" style="mix-blend-mode:overlay"/>`;
}

const CHALK_DEFS = `<filter id="chalk"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="1" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5"/></filter>`;

function chalkboard() {
  return `<rect width="${W}" height="${H}" fill="#22362d"/>
  <ellipse cx="300" cy="500" rx="420" ry="260" fill="#fff" opacity=".035"/><ellipse cx="800" cy="1300" rx="380" ry="300" fill="#fff" opacity=".03"/>
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="#7b5232" stroke-width="36"/>
  <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none" stroke="#4e321f" stroke-width="4"/>`;
}

// меловой кот: kitten | smug | sick
function chalkCat(cx, cy, r, mood) {
  const c = '#f4f1e8';
  let s = `<g transform="translate(${cx},${cy})" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#chalk)">`;
  s += `<path d="M${-r},0 C${-r},${-r * 0.95} ${r},${-r * 0.95} ${r},0 C${r},${r * 0.75} ${-r},${r * 0.75} ${-r},0 Z"/>`;
  s += `<path d="M${-r * 0.86},${-r * 0.42} L${-r * 0.72},${-r * 1.08} L${-r * 0.26},${-r * 0.66} M${r * 0.86},${-r * 0.42} L${r * 0.72},${-r * 1.08} L${r * 0.26},${-r * 0.66}"/>`;
  for (const sx of [-1, 1]) {
    const ex = sx * r * 0.38, ey = -r * 0.1, er = r * (mood === 'kitten' ? 0.2 : 0.15);
    if (mood === 'sick') {
      s += `<path d="M${ex - er},${ey - er} L${ex + er},${ey + er} M${ex + er},${ey - er} L${ex - er},${ey + er}"/>`;
    } else {
      s += `<circle cx="${ex}" cy="${ey}" r="${er}"/><circle cx="${ex}" cy="${ey + (mood === 'kitten' ? 0 : er * 0.3)}" r="${er * 0.4}" fill="${c}"/>`;
      if (mood === 'smug') s += `<path d="M${ex - er * 1.1},${ey - er * 0.1} L${ex + er * 1.1},${ey - er * 0.1}"/>`;
    }
  }
  s += `<path d="M${-r * 0.08},${r * 0.12} L${r * 0.08},${r * 0.12} L0,${r * 0.22} Z" fill="${c}"/>`;
  s += mood === 'sick'
    ? `<path d="M${-r * 0.25},${r * 0.4} q${r * 0.08},-${r * 0.08} ${r * 0.16},0 t${r * 0.16},0 t${r * 0.16},0"/>`
    : `<path d="M${-r * 0.18},${r * 0.3} q${r * 0.09},${r * 0.1} ${r * 0.18},0 q${r * 0.09},${r * 0.1} ${r * 0.18},0"/>`;
  s += `<path d="M${-r * 0.4},${r * 0.2} L${-r * 1.05},${r * 0.1} M${-r * 0.4},${r * 0.3} L${-r * 1.0},${r * 0.38} M${r * 0.4},${r * 0.2} L${r * 1.05},${r * 0.1} M${r * 0.4},${r * 0.3} L${r * 1.0},${r * 0.38}" stroke-width="4"/>`;
  return s + `</g>`;
}

function chalkText(x, y, size, txt, color = '#f4f1e8', extra = '') {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="${size}" fill="${color}" filter="url(#chalk)" ${extra}>${txt}</text>`;
}
