"""Собирает страницу эпизода для HyperFrames: build/<эп>/film/ = engine/* + episodes/<эп>/*.js + шрифты + data.js (реплики, слова, виземы).
  python3 tools/mkpage.py <эпизод> [timeline.json]"""
import json, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main(ep, tl=None):
    d = ROOT / 'episodes' / ep; f = ROOT / 'build' / ep / 'film'
    if f.exists(): shutil.rmtree(f)
    f.mkdir(parents=True)
    meta = json.load(open(d / 'episode.json')); E = ROOT / meta.get('engine', 'engine')
    for p in [*E.glob('*.js'), E / 'vendor/gsap.min.js', *(ROOT / 'assets/fonts').glob('*.ttf')]: shutil.copy(p, f)
    T = json.load(open(ROOT / meta['timeline'])) if meta.get('timeline') else {'duration': meta['duration'], 'lines': []}
    DUR = round(meta.get('duration', T['duration']), 3)
    lines = [{k: l[k] for k in ('key', 'speaker', 'text', 'start', 'end', 'words', 'visemes')} for l in T['lines']]
    (f / 'data.js').write_text(f"const DUR = {DUR};\nconst LINES = {json.dumps(lines, ensure_ascii=False)};\n")
    for p in meta['scripts']: shutil.copy(d / p, f)
    html = (E / 'page.html').read_text().replace('__DUR__', str(DUR))
    html = html.replace('__SCRIPTS__', ''.join(f'<script src="{p}"></script>' for p in meta['scripts']))
    (f / 'index.html').write_text(html)
    print(f, 'DUR', DUR)


if __name__ == '__main__':
    if len(sys.argv) < 2: sys.exit(__doc__)
    main(sys.argv[1])
