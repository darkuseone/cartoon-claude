#!/usr/bin/env bash
# Полная сборка эпизода «ночной графит»: страница → проверка JS → метки → звук → рендер HyperFrames 24 fps → микс → final.mp4 (+ chat.mp4 < 29 МиБ).
#   tools/render.sh ep01 [voice.wav] [sfx_dir]
#   tools/render.sh ep01 snap 0,3.5,12        # только контрольные кадры → build/<эп>/snaps (+ sheet.jpg)
set -euo pipefail
cd "$(dirname "$0")/.."
EP=$1; B=build/$EP; PY=${PY:-python3}
python3 tools/mkpage.py "$EP"
if [ "${2:-}" = snap ]; then node tools/shot.cjs "$B/film" "$B/snaps" ${3//,/ }; exit 0; fi
VOICE=${2:-../remotion/public/$EP/voice.wav}; SFX=${3:-../remotion/public/$EP/sfx}
node tools/dbg.cjs "$B/film"
node tools/cues.cjs "$B/film" > "$B/cues.json"
$PY -I tools/sound.py "$EP" "$VOICE" "$SFX"
npx hyperframes render "$B/film" -f 24 -q high -w 4 -o "$B/video.mp4"
ffmpeg -y -v error -i "$B/video.mp4" -i "$B/audio.wav" -map 0:v -map 1:a -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "$B/final.mp4"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$B/final.mp4")
VB=$(python3 -c "print(int(28*1024*1024*8/$DUR/1000 - 160))")
ffmpeg -y -v error -i "$B/video.mp4" -i "$B/audio.wav" -map 0:v -map 1:a -c:v libx264 -preset slow -b:v ${VB}k -maxrate $((VB*2))k -bufsize $((VB*2))k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest -movflags +faststart "$B/chat.mp4"
ls -la "$B/final.mp4" "$B/chat.mp4"
