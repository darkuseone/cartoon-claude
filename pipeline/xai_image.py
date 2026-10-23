"""Картинки через xAI (grok-imagine). Каждая генерация пишет цену в design/xai_costs.csv.

usage: python xai_image.py <out.png> "<prompt>" [--ref a.png --ref b.jpg ...] [--aspect 9:16] [--model grok-imagine-image-2.0]
Референсы в промпте: <IMAGE_0>, <IMAGE_1>, ... (порядок --ref).
"""
import argparse, base64, io, json, os, sys, time, urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LEDGER = ROOT / "design" / "xai_costs.csv"
MAX_USD = 0.12  # потолок цены одной картинки (просьба владельца)


def data_url(path, side=1024):
    im = Image.open(path).convert("RGB")
    im.thumbnail((side, side))
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=90)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def call(endpoint, body):
    req = urllib.request.Request(
        f"https://api.x.ai/v1/images/{endpoint}", data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {os.environ['XAI_API_KEY']}"})
    with urllib.request.urlopen(req, timeout=300) as r:
        return json.load(r)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("out")
    ap.add_argument("prompt")
    ap.add_argument("--ref", action="append", default=[])
    ap.add_argument("--aspect", default="9:16")
    ap.add_argument("--model", default="grok-imagine-image-2.0")
    ap.add_argument("--resolution", default="1k")
    a = ap.parse_args()

    body = {"model": a.model, "prompt": a.prompt, "aspect_ratio": a.aspect,
            "resolution": a.resolution, "response_format": "b64_json", "n": 1}
    if a.ref:
        body["images"] = [{"url": data_url(p)} for p in a.ref]
    t0 = time.time()
    res = call("edits" if a.ref else "generations", body)
    usd = res.get("usage", {}).get("cost_in_usd_ticks", 0) / 1e10
    img = base64.b64decode(res["data"][0]["b64_json"])
    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    Image.open(io.BytesIO(img)).convert("RGB").save(out)
    LEDGER.parent.mkdir(exist_ok=True)
    new = not LEDGER.exists()
    with LEDGER.open("a") as f:
        if new:
            f.write("time,file,model,usd\n")
        f.write(f"{time.strftime('%Y-%m-%d %H:%M')},{out.relative_to(ROOT) if out.is_absolute() else out},{a.model},{usd:.4f}\n")
    w, h = Image.open(io.BytesIO(img)).size
    print(f"{out} {w}x{h} ${usd:.4f} {time.time() - t0:.0f}s" + ("  !!! дороже лимита" if usd > MAX_USD else ""))


if __name__ == "__main__":
    main()
