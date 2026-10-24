#!/usr/bin/env bash
# Сборка серии «Аппликации» одной командой.
#   tools/make.sh <эп> snap 0,3.5,12   — контрольные кадры → build/<эп>/snaps/sheet.jpg (секунды)
#   tools/make.sh <эп> sound           — метки + звук (build/<эп>/audio.wav)
#   tools/make.sh <эп> clean <имя>     — после all: версия с запиканным матом → ../out/<имя>_clean.mp4
#   tools/make.sh <эп> all <имя>       — проверка JS, звук, рендер 24 к/с, сведение → ../out/<имя>_chat.mp4 (< 28 МиБ) + контакт-лист
set -euo pipefail
cd "$(dirname "$0")/.."
EP=$1; MODE=${2:-all}; B=build/$EP; PY=${PY:-/tmp/claude-0/-home-user-cartoon-claude/afa73990-c08e-5c54-9ceb-32385d03002a/scratchpad/venv/bin/python}
python3 tools/mkpage.py "$EP" >/dev/null
if [ "$MODE" = snap ]; then node tools/shot.cjs "$B/film" "$B/snaps" ${3//,/ } | tail -1; exit 0; fi
if [ "$MODE" = clean ]; then BLEEP=1 $PY -I tools/sound_spec.py "$EP"; OUT=../out/${3:-$EP}_clean.mp4; ffmpeg -y -v error -i ../out/${3:-$EP}_chat.mp4 -i "$B/audio_clean.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 160k -shortest -movflags +faststart "$OUT"; ls -la "$OUT"; exit 0; fi
node tools/cues.cjs "$B/film" > "$B/cues.json"
$PY -I tools/sound_spec.py "$EP"
[ "$MODE" = sound ] && exit 0
node tools/dbg.cjs "$B/film" | tail -1
npx hyperframes render "$B/film" -f 24 -q high -w 4 -o "$B/video.mp4" > "$B/render.log" 2>&1
NAME=${3:-$EP}; OUT=../out/${NAME}_chat.mp4
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$B/video.mp4"); VB=$(python3 -c "print(int(28*1024*1024*8/$DUR/1000 - 160))")
ffmpeg -y -v error -i "$B/video.mp4" -i "$B/audio.wav" -map 0:v -map 1:a -c:v libx264 -preset slow -b:v ${VB}k -maxrate $((VB*2))k -bufsize $((VB*2))k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart "$OUT"
mkdir -p "$B/vchk"; i=0; for t in $(python3 -c "d=$DUR; print(' '.join(f'{d*k/15:.2f}' for k in range(15))) ") $(python3 -c "print(f'{$DUR-0.05:.2f}')"); do ffmpeg -v error -y -ss $t -i "$OUT" -frames:v 1 -vf scale=240:-1 "$B/vchk/$(printf %02d $i).png"; i=$((i+1)); done
ffmpeg -v error -y -i "$B/vchk/%02d.png" -vf tile=8x2 -frames:v 1 "../out/${NAME}_sheet.jpg"
ls -la "$OUT"; echo "длительность $DUR с"
