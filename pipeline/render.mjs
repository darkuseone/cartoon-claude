// Рендер эпизода: Chromium рисует scene.html по кадрам, ffmpeg склеивает с озвучкой.
// usage: node render.mjs <episode_dir> [--stills 1.0,5.2,...] [--workers 3]
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const ep = path.resolve(process.argv[2]);
const arg = n => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
const tl = JSON.parse(readFileSync(path.join(ep, 'build/timeline.json'), 'utf8'));
const stills = arg('--stills');
const workers = Number(arg('--workers') || 3);
const fps = tl.fps;

const browser = await chromium.launch();
async function page() {
  const p = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  await p.goto('file://' + path.join(ep, 'scene.html'));
  await p.evaluate(t => { window.TL = t; }, tl);
  await p.evaluate(() => document.fonts.ready);
  return { p, errors };
}

if (stills) {
  const dir = path.join(ep, 'build/stills');
  mkdirSync(dir, { recursive: true });
  const { p, errors } = await page();
  for (const t of stills.split(',').map(Number)) {
    await p.evaluate(t => render(t), t);
    await p.screenshot({ path: path.join(dir, `t${t.toFixed(2)}.jpg`), type: 'jpeg', quality: 85 });
  }
  if (errors.length) console.error('page errors:', errors);
  console.log('stills ->', dir);
} else {
  const n = Math.ceil(tl.duration * fps);
  const dir = path.join(ep, 'build/frames');
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });
  let next = 0, done = 0;
  const t0 = Date.now();
  await Promise.all(Array.from({ length: workers }, async () => {
    const { p, errors } = await page();
    while (next < n) {
      const f = next++;
      await p.evaluate(t => render(t), f / fps);
      await p.screenshot({ path: path.join(dir, `f${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 93 });
      if (++done % 100 === 0) console.log(`${done}/${n} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    if (errors.length) console.error('page errors:', errors.slice(0, 5));
  }));
  const out = path.join(ep, 'build/episode.mp4');
  const mix = path.join(ep, 'build/mix.wav');
  const audio = existsSync(mix) ? mix : path.join(ep, 'build/voice.wav');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(fps), '-i', path.join(dir, 'f%05d.jpg'),
    '-i', audio, '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out]);
  console.log('video ->', out);
}
await browser.close();
