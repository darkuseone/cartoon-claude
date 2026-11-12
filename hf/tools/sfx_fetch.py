"""Скачать звуки CC0 с BigSoundBank (общественное достояние, можно в коммерческих роликах, указание автора не обязательно).
  python3 tools/sfx_fetch.py имя "поисковый запрос" [номер_в_выдаче]   # → hf/assets/sfx/cc0/<имя>.mp3 + строка в SOURCES.md
  python3 tools/sfx_fetch.py имя s0007                                 # конкретный звук по id страницы
Берёт только звуки, у которых на странице написано «License CC0». Список того, что уже скачано, — hf/assets/sfx/cc0/SOURCES.md."""
import re, sys, urllib.request, urllib.parse
from pathlib import Path

BASE = 'https://bigsoundbank.com'
OUT = Path(__file__).resolve().parent.parent / 'assets' / 'sfx' / 'cc0'
UA = {'User-Agent': 'Mozilla/5.0 (sfx-fetch)'}


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r: return r.read()


def pages(query):
    html = get(f'{BASE}/search?q={urllib.parse.quote(query)}').decode('utf8', 'ignore')
    seen = []
    for p in re.findall(r'/[a-z0-9-]+-s\d{4}\.html', html):
        if p not in seen: seen.append(p)
    return seen


def fetch(name, page):
    html = get(BASE + page).decode('utf8', 'ignore')
    if 'CC0 (public domain)' not in html: return None
    sid = re.search(r'-s(\d{4})\.html', page).group(1)
    title = re.sub(r'\s+', ' ', re.search(r'<title>(.*?)</title>', html, re.S).group(1)).strip()
    OUT.mkdir(parents=True, exist_ok=True); (OUT / f'{name}.mp3').write_bytes(get(f'{BASE}/UPLOAD/mp3/{sid}.mp3'))
    src = OUT / 'SOURCES.md'; lines = src.read_text().splitlines() if src.exists() else ['# Звуки CC0 (BigSoundBank, Joseph Sardin) — общественное достояние', '']
    lines = [l for l in lines if not l.startswith(f'- `{name}.mp3`')] + [f'- `{name}.mp3` — {title} — {BASE}{page} — CC0']
    src.write_text('\n'.join(lines) + '\n'); return title


if __name__ == '__main__':
    name, q = sys.argv[1], sys.argv[2]; k = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    cand = [f'/x-s{q[1:]}.html'] if re.fullmatch(r's\d{4}', q) else pages(q)
    if re.fullmatch(r's\d{4}', q):   # страница по id: настоящий адрес ищем через поиск по id
        cand = [p for p in pages(q[1:]) if p.endswith(f'-{q}.html')] or cand
    for p in cand[k:]:
        t = fetch(name, p)
        if t: print(f'{name}.mp3 ← {t} ({BASE}{p})'); break
    else: sys.exit(f'{name}: не нашёл CC0 по запросу «{q}»')
