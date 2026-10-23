"""Генерирует кадры эпизода по frames.json (пропускает готовые).
usage: python gen_frames.py <episode_dir> [имена...]"""
import json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REFS = {"tom": ROOT / "design/frames/tom_table.png", "nik": ROOT / "design/concepts/nik_a.png"}

ep = Path(sys.argv[1])
spec = json.loads((ep / "frames.json").read_text())
only = set(sys.argv[2:])
for name, f in spec["frames"].items():
    out = ep / "frames" / f"{name}.png"
    if (only and name not in only) or (not only and out.exists()):
        continue
    notes = " ".join(spec[f"{r}_note"] for r in f["refs"])
    prompt = f"{spec['style']} {notes} {f['prompt']}"
    cmd = [sys.executable, str(ROOT / "pipeline/xai_image.py"), str(out), prompt]
    for r in f["refs"]:
        cmd += ["--ref", str(REFS[r])]
    subprocess.run(cmd)
