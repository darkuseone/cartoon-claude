"""Собирает озвучку эпизода: обрезает тишину, ускоряет, склеивает реплики,
снимает тайминги слов (whisper) и огибающую громкости для липсинка.

usage: python audio.py <episode_dir>
Ждёт <episode_dir>/script.json, пишет <episode_dir>/build/{voice.wav,timeline.json}
"""
import json, subprocess, sys
from pathlib import Path
import numpy as np

SR = 44100
FPS = 30


def decode(path, tempo):
    out = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-af", f"atempo={tempo}",
         "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
        capture_output=True, check=True).stdout
    return np.frombuffer(out, dtype=np.float32).copy()


def trim(a, thr=0.012, pad=0.04):
    idx = np.where(np.abs(a) > thr)[0]
    p = int(pad * SR)
    return a[max(idx[0] - p, 0): min(idx[-1] + p, len(a))]


def words_of(a, model):
    n =int(len(a) * 16000 / SR)
    a16 = np.interp(np.linspace(0, len(a) - 1, n), np.arange(len(a)), a).astype(np.float32)
    segs, _ = model.transcribe(a16, language="ru", word_timestamps=True)
    return [{"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)}
            for s in segs for w in s.words]


def main(ep):
    ep = Path(ep)
    cfg = json.loads((ep / "script.json").read_text())
    build = ep / "build"
    build.mkdir(exist_ok=True)
    tempo = cfg.get("tempo", 1.0)
    gap = cfg.get("gap", 0.25)

    from faster_whisper import WhisperModel
    model = WhisperModel("small", device="cpu", compute_type="int8")

    t = cfg.get("head", 0.4)
    chunks, lines = [], []
    for ln in cfg["lines"]:
        a = trim(decode(ep / ln["file"], tempo))
        start = t
        chunks.append((int(start * SR), a))
        words = words_of(a, model)
        # текст слов берём из сценария (whisper иногда коверкает), тайминги — из whisper
        script_words = ln["text"].split()
        if len(script_words) == len(words):
            for w, sw in zip(words, script_words):
                w["w"] = sw
        else:
            # распределяем слова сценария по длине в пределах фразы
            s0, e0 = words[0]["s"], words[-1]["e"]
            total_ch = sum(len(w) + 1 for w in script_words)
            acc, words = 0, []
            for sw in script_words:
                s = s0 + (e0 - s0) * acc / total_ch
                acc += len(sw) + 1
                words.append({"w": sw, "s": round(s, 3), "e": round(s0 + (e0 - s0) * acc / total_ch, 3)})
        for w in words:
            w["s"] = round(w["s"] + start, 3)
            w["e"] = round(w["e"] + start, 3)
        lines.append({**ln, "start": round(start, 3), "end": round(start + len(a) / SR, 3), "words": words})
        t = start + len(a) / SR + ln.get("after", gap)

    total = t + cfg.get("tail", 1.2)
    mix = np.zeros(int(total * SR) + 1, dtype=np.float32)
    env = {sp: np.zeros(int(total * FPS) + 1) for sp in {l["speaker"] for l in lines}}
    hop = SR // FPS
    for (off, a), ln in zip(chunks, lines):
        mix[off: off + len(a)] += a
        for f in range(len(a) // hop):
            seg = a[f * hop:(f + 1) * hop]
            env[ln["speaker"]][off // hop + f] = float(np.sqrt(np.mean(seg ** 2)))
    for sp, e in env.items():
        e /= max(e.max(), 1e-6)
        env[sp] = [round(min(1.0, v ** 0.6), 3) for v in e]

    mix /= max(np.abs(mix).max(), 1e-6) / 0.9
    (build / "voice.f32").write_bytes(mix.tobytes())
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1",
                    "-i", str(build / "voice.f32"), str(build / "voice.wav")], check=True)
    (build / "voice.f32").unlink()
    (build / "timeline.json").write_text(json.dumps(
        {"fps": FPS, "duration": round(total, 3), "lines": lines, "env": env}, ensure_ascii=False))
    for l in lines:
        print(f"{l['start']:6.2f}-{l['end']:6.2f} {l['speaker']:7s} {' '.join(w['w'] for w in l['words'])}")
    print("total", round(total, 2))


if __name__ == "__main__":
    main(sys.argv[1])
