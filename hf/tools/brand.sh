#!/usr/bin/env bash
# Аватар и шапка канала: tools/brand.sh → ../publish/brand/{avatar.png, banner.png, banner_phone.png, banner_zones.jpg}
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tools/mkpage.py brand >/dev/null
O=../publish/brand; mkdir -p "$O"
for spec in "avatar 1024 1024" "banner 2560 1440"; do
  set -- $spec; F=build/brand/film_$1; rm -rf "$F"; cp -r build/brand/film "$F"
  sed -i "s/const W = 1080, H = 1920/const W = $2, H = $3/" "$F/engine.js"
  sed -i "s/width:1080px;height:1920px/width:$2px;height:$3px/; s/data-width=\"1080\" data-height=\"1920\"/data-width=\"$2\" data-height=\"$3\"/; s/width=\"1080\" height=\"1920\"/width=\"$2\" height=\"$3\"/" "$F/index.html"
  echo "const BRAND_MODE = '$1';" >> "$F/data.js"
  node tools/brand.cjs "$F" "$2" "$3" "$O/$1.png"
done
# как шапку видно на телефоне (центр 1546×423) и где границы зон на ПК/ТВ
ffmpeg -v error -y -i "$O/banner.png" -vf "crop=1546:423:507:508" "$O/banner_phone.png"
ffmpeg -v error -y -i "$O/banner.png" -vf "drawbox=x=507:y=508:w=1546:h=423:color=red@0.9:t=8,drawbox=x=0:y=508:w=2560:h=423:color=yellow@0.8:t=6,scale=1280:-1" "$O/banner_zones.jpg"
ls -la "$O"
