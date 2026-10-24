"""Звук эп. 2 «Телефоны нас слушают?»: python tools/sound_ep02.py ep02 <voice.wav> <sfx_dir> → build/ep02/audio.wav"""
import json, subprocess, sys
from pathlib import Path
import numpy as np
sys.path.insert(0, str(Path(__file__).resolve().parent))
from sound import (SR, T, filt, noise, note, m, stereo_reverb, Bus, bass, chord, brush, hat, kick, pluck, pad, bell, whoosh, thud, pop, clink,
                   blip, gliss, slam, riser, click, hum, buzzer, load)
from sound2 import strum, sting, trombone, paper, tear, scratch
import pyloudnorm as pyln
ROOT = Path(__file__).resolve().parent.parent


def foil(d=0.6, g=1.0):                                              # хруст фольги
    t = T(d); r = np.random.default_rng(9); cr = (r.random(len(t)) < 0.01).astype(float); cr = np.convolve(cr, np.hanning(40), 'same')
    return filt(noise(d), 'highpass', 3000) * (0.2 + cr) * np.sin(np.pi * t / d) * g


def main(ep, voice, sfxdir):
    C = json.load(open(ROOT / 'build' / ep / 'cues.json')); c = C['CUE']; DUR = C['DUR']; sd = Path(sfxdir)
    V = load(voice); V = V / np.abs(V).max() * 0.9; MUS, FX = Bus(DUR), Bus(DUR)
    meow = load(sd / 'cat_meow.mp3')
    # музыка: ночная паранойя (тремоло-пэд, пульс), наука — щипковая, свет — гитарный грув, финал — стинг
    MUS.add(pad(note(m('E2')), c['lit'] + 0.3, 0.8), 0)
    for i, tt in enumerate(np.arange(0.1, c['lit'], 60 / 76)): MUS.add(bass(note(m(['E2', 'E2', 'G2', 'F#2'][i % 4])), 0.5, 0.45), tt); MUS.add(hat(0.05), tt + 60 / 152)
    k, tt, mel = 0, c['shortly'] + 0.1, ['E5', 'G5', 'B5', 'G5', 'A5', 'C6', 'B5', 'G5']
    while tt < c['how'] - 0.1: MUS.add(pluck(note(m(mel[k % 8])), 0.25, 0.1, 2600), tt); k += 1; tt += 0.25
    gb = 60 / 96; prog = [['E2', 'B2', 'E3', 'G#3', 'B3'], ['A2', 'E3', 'A3', 'C#4', 'E4'], ['B2', 'F#3', 'B3', 'D#4', 'F#4'], ['A2', 'E3', 'A3', 'C#4', 'E4']]
    def groove(t0, t1, g=0.09):
        tt, i = t0, 0
        while tt < t1:
            ch = prog[(i // 4) % 4]; strum(MUS, tt, ch if i % 2 == 0 else ch[1:], g * (1 if i % 2 == 0 else 0.6), 0.9, 0.012)
            if i % 4 == 0: MUS.add(bass(note(m(ch[0])), gb * 1.8, 0.45), tt)
            if i % 2 == 1: MUS.add(brush(0.12, 0.1), tt)
            tt += gb; i += 1
    groove(c['lit'], c['lied'] - 0.3); groove(c['phew'] + 0.2, c['hatBack'])
    for i, (n, d) in enumerate([('A3', 0.4), ('G#3', 0.4), ('G3', 0.4), ('F#3', 1.0)]): MUS.add(trombone(note(m(n)), d, 0.7), c['hatBack'] + 0.2 + i * 0.4)
    groove(c['keep'] + 0.1, c['lightOff'], 0.07); sting(MUS, c['lightOff'] + 0.05, 1.1)
    for tt in [c['today'], c['googled'] - 0.6, c['shortly'], c['rec'] - 1.1, c['geo'] - 0.45, c['brain'] - 0.1, c['was'], c['siri'] - 0.5, c['apple'] - 0.1]: sting(MUS, tt, 0.7)
    # шумы
    FX.add(hum(c['lit'], 0.12), 0)
    for tt in np.arange(0, c['lit'], 1.0): FX.add(click(0.1), tt)
    FX.add(blip(1400, 0.08, 0.3), c['ad'] - 0.2); FX.add(blip(1800, 0.08, 0.3), c['ad'] - 0.08); FX.add(slam(0.6), c['ad'])
    for i in range(3): FX.add(click(0.5), c['three'] + i * 0.16); FX.add(blip(1100 + 100 * i, 0.05, 0.12), c['googled'] - 0.2 + i * 0.32)
    for i in range(42): FX.add(pop(0.05, 500 + (i % 6) * 60), c['apps'] - 0.3 + i * 0.025)
    FX.add(buzzer(0.35), c['none']); FX.add(slam(0.5), c['none'])
    for tt in np.arange(c['rec'], c['how'] - 0.2, 0.5): FX.add(blip(2400, 0.04, 0.08), tt)
    FX.add(click(0.9), c['lit'] - 0.02); FX.add(hum(0.3, 0.15), c['lit'])
    for k2 in ['geo', 'search', 'likes', 'wifi', 'lyoha']: FX.add(pop(0.35, 420), c[k2]); FX.add(whoosh(0.18, True, 0.15, 1500, 6000), c[k2] + 0.02)
    FX.add(slam(0.4), c['bought'])
    FX.add(pop(0.4, 600), c['one'] - 0.05)
    for i in range(14): FX.add(paper(0.12, 0.12), c['miss'] - 0.05 + i * 0.04)
    FX.add(slam(0.7), c['nobody']); FX.add(slam(0.8), c['lied']); FX.add(scratch(0.3), c['lied'] - 0.35)
    FX.add(foil(0.7, 0.8), c['remove'] - 0.1); FX.add(foil(1.2, 0.7), c['hatBack'] + 0.2)
    for i in range(2): FX.add(bell(note(m(['E6', 'G6'][i])), 0.6, 0.15), [c['siri'], c['alice']][i])
    for i in range(6): FX.add(paper(0.1, 0.2), c['apple'] + i * 0.06)
    FX.add(slam(0.5), c['mln'])
    if meow is not None: FX.add(meow[:int(1.0 * SR)], c['keep'] - 0.4, 0.25)
    FX.add(pop(0.3, 600), c['sub']); FX.add(click(0.6), c['lightOff'] - 0.02)
    n = int(DUR * SR); v = np.zeros(n); v[:min(n, len(V))] = V[:n]; mus = MUS.b[:n]; fx = FX.b[:n]
    w = int(0.05 * SR); e = np.sqrt(np.convolve(v ** 2, np.ones(w) / w, 'same')); e = np.convolve(e, np.ones(int(0.25 * SR)) / int(0.25 * SR), 'same')
    duck = 1 - 0.5 * np.clip(e / (e.max() * 0.35 + 1e-9), 0, 1)
    mus = mus / (np.abs(mus).max() + 1e-9) * 0.22 * duck; fx = fx / (np.abs(fx).max() + 1e-9) * 0.7
    st = stereo_reverb(mus, 1.2, 0.22, 1) + stereo_reverb(fx, 0.7, 0.12, 2) + np.stack([v, v], 1)
    meter = pyln.Meter(SR); L = meter.integrated_loudness(st)
    for nm, x in (('музыка', stereo_reverb(mus, 1.2, 0.22, 1)), ('шумы', stereo_reverb(fx, 0.7, 0.12, 2))): print(f'  {nm}: {meter.integrated_loudness(x) - L:+.1f} LU')
    st *= 10 ** ((-15 - L) / 20); lim = 10 ** (-1.2 / 20); a = np.abs(st)
    st *= np.where(a > lim * 0.85, (lim * 0.85 + lim * 0.15 * np.tanh((a - lim * 0.85) / (lim * 0.15))) / np.maximum(a, 1e-9), 1.0)
    out = ROOT / 'build' / ep / 'audio.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'pcm_s16le', str(out)], input=st.astype(np.float32).tobytes(), check=True)
    print(out, f'LUFS {meter.integrated_loudness(st):.1f}, peak {20 * np.log10(np.abs(st).max()):.2f} dBFS')


if __name__ == '__main__':
    main(*sys.argv[1:4])
