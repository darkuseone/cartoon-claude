// Один кадр страницы оформления в PNG: node tools/brand.cjs <film> <W> <H> <out.png>
const puppeteer = require('puppeteer-core'); const path = require('path'); const fs = require('fs');
(async () => {
  const [film, w, h, out] = process.argv.slice(2);
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: +w, height: +h }); p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + path.resolve(film) + '/index.html'); await p.evaluate(() => document.fonts.ready); await new Promise(r => setTimeout(r, 800));
  const r = await p.evaluate(() => { try { lastFr = -1; draw(0); return { ok: document.getElementById('c').toDataURL('image/png') }; } catch (e) { return { err: e.message + ' ' + e.stack }; } });
  if (r.err) { console.log('ERR', r.err); process.exit(1); }
  fs.writeFileSync(out, Buffer.from(r.ok.split(',')[1], 'base64')); console.log(out); await b.close();
})();
