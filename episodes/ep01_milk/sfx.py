"""Шумы эпизода 1, синтезом (без внешних библиотек звуков). Пишет build/mix.wav = голос + SFX."""
import json, subprocess, sys
from pathlib import Path
import numpy as np

SR = 44100
ep = Path(__file__).parent
tl = json.loads((ep / "build/timeline.json").read_text())
L = tl["lines"]
w = lambda li, wi: L[li]["words"][wi]["s"]
rng = np.random.default_rng(7)

voice = np.frombuffer(subprocess.run(
    ["ffmpeg", "-v", "error", "-i", str(ep / "build/voice.wav"), "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
    capture_output=True, check=True).stdout, dtype=np.float32).copy()
fx = np.zeros_like(voice)


def put(t, sig, gain):
    i = int(t * SR)
    n = min(len(sig), len(fx) - i)
    if n > 0:
        fx[i:i + n] += sig[:n] * gain


def env(n, a=0.01, r=0.1):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na)
    e[n - nr:] *= np.linspace(1, 0, nr)
    return e


def bandnoise(dur, lo, hi):
    n = int(dur * SR)
    spec = np.fft.rfft(rng.standard_normal(n))
    f = np.fft.rfftfreq(n, 1 / SR)
    spec[(f < lo) | (f > hi)] = 0
    x = np.fft.irfft(spec, n)
    return x / (np.abs(x).max() + 1e-9)


def tone(dur, f0, f1=None, shape="sin"):
    n = int(dur * SR)
    f = np.linspace(f0, f1 or f0, n)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) if shape == "sin" else 2 * (ph / (2 * np.pi) % 1) - 1


# налив молока: шипящий бульк с модуляцией
d = 1.4
pour = bandnoise(d, 700, 3200) * (0.6 + 0.4 * np.sin(2 * np.pi * 7 * np.arange(int(d * SR)) / SR)) * env(int(d * SR), 0.08, 0.3)
put(1.15, pour, 0.10)

smotri = w(3, 8)
tv0 = L[3]["start"] - 0.05 + 0.15
# писк мыши, топот, БАМ
put(tv0, tone(0.18, 2600, 3600) * env(int(0.18 * SR), 0.01, 0.08), 0.12)
for k in range(10):
    put(tv0 + 0.25 + k * 0.1, bandnoise(0.03, 200, 1200) * env(int(0.03 * SR), 0.002, 0.02), 0.08)
n = int(0.5 * SR)
bam = (tone(0.5, 90, 40) * 0.8 + bandnoise(0.5, 100, 2500) * 0.6) * np.exp(-np.arange(n) / SR * 9)
put(tv0 + 1.25, bam, 0.35)
# звёздочки
for k in range(3):
    put(tv0 + 1.35 + k * 0.12, tone(0.1, 1800 + k * 300) * env(int(0.1 * SR), 0.005, 0.07), 0.05)

# въезд доски — свист
d = 0.3
put(smotri - 0.12, bandnoise(d, 400, 4000) * np.sin(np.linspace(0, np.pi, int(d * SR))) ** 2, 0.12)
# поп заголовка и мела
for t in (w(3, 13), w(3, 11), smotri + 0.25, w(3, 16)):
    put(t - 0.05, tone(0.09, 500, 900) * env(int(0.09 * SR), 0.003, 0.06), 0.10)
# бурление
d = 1.0
nn = int(d * SR)
rumble = bandnoise(d, 40, 260) * (0.5 + 0.5 * np.sin(2 * np.pi * 5 * np.arange(nn) / SR) ** 2) * env(nn, 0.05, 0.4)
put(w(3, 19) - 0.1, rumble, 0.55)

# лакание
lick0, lick1 = L[3]["end"] + 0.15, L[5]["start"] - 0.05
t = lick0 + 0.1
while t < lick1 - 0.1:
    put(t, bandnoise(0.05, 900, 5000) * env(int(0.05 * SR), 0.003, 0.04), 0.06)
    t += 0.2

# мухи над лотком
lit0, lit1 = w(5, 4) - 0.1, L[5]["end"] + 0.5
d = lit1 - lit0
nn = int(d * SR)
buzz = tone(d, 210, 230, "saw") * (0.6 + 0.4 * np.sin(2 * np.pi * 13 * np.arange(nn) / SR)) * env(nn, 0.1, 0.2)
put(lit0, buzz, 0.035)

# финальная карточка
put(lit1, tone(0.12, 400, 1000) * env(int(0.12 * SR), 0.003, 0.08), 0.12)
put(lit1 + 0.12, tone(0.12, 600, 1300) * env(int(0.12 * SR), 0.003, 0.08), 0.10)

mix = voice + fx
mix /= max(np.abs(mix).max() / 0.95, 1.0)
raw = ep / "build/mix.f32"
raw.write_bytes(mix.astype(np.float32).tobytes())
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", str(raw),
                "-af", "loudnorm=I=-15:TP=-1.5:LRA=11", "-ar", str(SR), str(ep / "build/mix.wav")], check=True)
raw.unlink()
print("mix ->", ep / "build/mix.wav")
