# Том и Никита — мультики кодом

**Актуально (v3): `hf/` — стиль «ночной графит».** Всё рисуется кодом (canvas + JS), рендер — HyperFrames 24 к/с, звук синтезируется кодом поверх готовой озвучки ElevenLabs. Генеративные картинки/видео не используются. Правила стиля и порядок работы — `.claude/skills/nochnoy-grafit/SKILL.md`.

```
cd hf && npm install                       # HyperFrames + puppeteer-core
tools/render.sh ep01 snap 0,3.5,12         # контрольные кадры → build/ep01/snaps/sheet.jpg
tools/render.sh ep01                       # полный ролик → build/ep01/final.mp4 и chat.mp4
```

- `hf/engine/engine.js` — карандаш/мел, штриховка, бумага, палитры по ролям, свет; `chars.js` — риги Тома и Никиты; `props.js` — кухня, наука, деревня, реквизит.
- `hf/episodes/ep01/` — раскадровка (`storyboard.md`) и сцены (`scenes.js`); тайминги — от слов озвучки.
- `hf/tools/sound.py` — музыка нотами и шумы по тем же меткам; `cues.cjs` выгружает метки со страницы.
- Озвучка и липсинк: `pipeline/voice_v2.py` → `remotion/public/ep01/{voice.wav,timeline.json}`.

## Архив (v1–v2)

### v1: SVG-пайплайн

Персонажи и сцены рисуются кодом (SVG), озвучка — ElevenLabs, рендер — Chromium + ffmpeg.

```
python pipeline/audio.py episodes/<ep>      # склейка реплик, тайминги слов (faster-whisper), огибающая для липсинка
python episodes/<ep>/sfx.py                 # шумы + сведение -> build/mix.wav
node pipeline/render.mjs episodes/<ep> --stills 1.5,8.0   # превью-кадры
node pipeline/render.mjs episodes/<ep>      # полный рендер -> build/episode.mp4
```

- `pipeline/lib.js` — Том, Никита, субтитры, меловая доска, оверлеи.
- `episodes/<ep>/script.json` — реплики и файлы озвучки; `scene.html` — раскадровка эпизода.
