# Том и Никита — мультики кодом

**Актуально: v4 «Аппликация» (`hf/engine2`).** Вся инструкция для работы — в **[CLAUDE.md](CLAUDE.md)**, детали — в скиллах `.claude/skills/` (`applikatsiya`, `tom-nikita-temy`, `tom-nikita-scenarij`, `tom-nikita-montazh`).

```
bash tools/setup.sh                          # окружение: .venv, Rhubarb, npm, проверки
cd hf && tools/make.sh ep08 snap 0.5,3,12    # контрольные кадры → build/ep08/snaps/sheet.jpg
tools/make.sh ep08 all ep08_bulb             # полный ролик → ../out/ep08_bulb_chat.mp4
```

Готовые серии — `out/*_chat.mp4`, тексты для выкладки — `publish/`.

Ниже — история старых версий (v1–v3), для новых серий не использовать.

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
