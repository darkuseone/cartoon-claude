# Том объясняет — пайплайн мультика

Персонажи и сцены рисуются кодом (SVG), озвучка — ElevenLabs, рендер — Chromium + ffmpeg.

```
python pipeline/audio.py episodes/<ep>      # склейка реплик, тайминги слов (faster-whisper), огибающая для липсинка
python episodes/<ep>/sfx.py                 # шумы + сведение -> build/mix.wav
node pipeline/render.mjs episodes/<ep> --stills 1.5,8.0   # превью-кадры
node pipeline/render.mjs episodes/<ep>      # полный рендер -> build/episode.mp4
```

- `pipeline/lib.js` — Том, Никита, субтитры, меловая доска, оверлеи.
- `episodes/<ep>/script.json` — реплики и файлы озвучки; `scene.html` — раскадровка эпизода.
