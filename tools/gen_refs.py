"""Справочники для скиллов (экономят токены: не читать большие файлы целиком). Запуск из корня после новой серии:
  python3 tools/gen_refs.py
→ .claude/skills/tom-nikita-kod/api.md      — все функции движка и декораций серий (имя, аргументы, комментарий)
→ .claude/skills/tom-nikita-kanal/scripts.md — тексты всех вышедших серий (образцы голоса героев)"""
import json, re
from pathlib import Path
R = Path(__file__).resolve().parent.parent
EPS = [('ep01', 'ep01_milk_v4', 'ep01v4'), ('ep02', 'ep02_phones', 'ep02'), ('ep03', 'ep03_rice', 'ep03'), ('ep04', 'ep04_subs', 'ep04'),
       ('ep05', 'ep05_tobacco', 'ep05'), ('ep06', 'ep06_cat', 'ep06'), ('ep07', 'ep07_chicken', 'ep07'), ('ep08', 'ep08_bulb', 'ep08')]
# новые серии добавляются сами: episodes/epNN_* + hf/episodes/epNN
known = {e[1] for e in EPS}
for d in sorted((R / 'episodes').glob('ep[0-9][0-9]_*')):
    n = d.name[:4]
    if d.name not in known and (R / 'hf/episodes' / n).exists() and int(n[2:]) > 8: EPS.append((n, d.name, n))
FN = re.compile(r'^(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)\s*\{?(.*)$')
AR = re.compile(r'^const\s+(\w+)\s*=\s*\(?([\w\s,=.\'\-]*)\)?\s*=>(.*)$')

def funcs(p):
    out = []
    for line in p.read_text().splitlines():
        m = FN.match(line) or AR.match(line)
        if m:
            c = re.search(r'//\s*(.+)$', m.group(3)); out.append(f"- `{m.group(1)}({m.group(2).strip()})`" + (f" — {c.group(1).strip()}" if c else ''))
    return out

api = ['# API движка engine2 и декораций (сгенерировано tools/gen_refs.py — не править руками)', '',
       'Сигнатуры и комментарии. Перед вызовом незнакомой функции — `grep -n "function имя" <файл>` и прочитать 5–10 строк.', '']
for f in ['engine.js', 'props.js', 'common.js', 'chars.js']:
    api += [f'## hf/engine2/{f}', *funcs(R / 'hf/engine2' / f), '']
api += ['# Декорации и вставки серий (копировать и менять, а не писать с нуля)', '']
for n, vo, hf in EPS:
    p = R / 'hf/episodes' / hf / 'set.js'
    if not p.exists(): continue
    head = p.read_text().splitlines()[0].strip('/* ').rstrip('*/ ')
    api += [f'## hf/episodes/{hf}/set.js — {head}', *funcs(p), '']
(R / '.claude/skills/tom-nikita-kod/api.md').write_text('\n'.join(api) + '\n')

sc = ['# Тексты вышедших серий — образцы голоса Тома и Никиты (сгенерировано tools/gen_refs.py)', '',
      'Н — Никита, Т — Том. «[пауза N с]» — пауза перед панчлайном (`after`). Видео — `out/<папка>_chat.mp4`.', '']
for n, vo, hf in EPS:
    p = R / 'episodes' / vo / 'script.json'
    if not p.exists(): continue
    s = json.load(open(p)); words = sum(len(l['text'].split()) for l in s['lines'])
    tl = R / 'episodes' / vo / 'out/timeline.json'; dur = json.load(open(tl))['duration'] if tl.exists() else 0
    sc += [f"## {n.upper()} «{s.get('title', '').replace(' (v4)', '')}» — {words} слов, {dur:.1f} с (`episodes/{vo}`)", '']
    for l in s['lines']:
        sc.append(f"- **{'Т' if l['speaker'] == 'tom' else 'Н'}:** {l['text']}" + (f"  *[пауза {l['after']} с]*" if l.get('after', 0) >= 0.4 else ''))
    sc.append('')
(R / '.claude/skills/tom-nikita-kanal/scripts.md').write_text('\n'.join(sc) + '\n')
print('api.md:', len(api), 'строк; scripts.md:', len(sc), 'строк; серий:', len(EPS))
