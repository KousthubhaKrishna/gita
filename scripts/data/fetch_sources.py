#!/usr/bin/env python3
"""Download the raw verse sources the app is compiled from.

These sources are NOT redistributed in this repository because their licences
differ from the code licence (see README "Data & licences"). Run this once,
then `python3 scripts/data/compile.py` to produce src/data/verses and src/data/purport.

  raw/nvkudva_verses.json   github.com/nvkudva/Bhagavad-Geeta  (Devanagari, IAST, English,
                            te.wikisource Telugu translation CC BY-SA 4.0)
  raw/tel/CC_VV.json        gita-api.vercel.app /tel            (Telugu sloka, word meanings,
                            translation and commentary by Swami Mukundananda,
                            holy-bhagavad-gita.org, copyright the author)
"""
import concurrent.futures as cf
import json
import os
import time
import urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(ROOT, "raw")
TEL = os.path.join(RAW, "tel")
COUNTS = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78]
NVKUDVA = "https://raw.githubusercontent.com/nvkudva/Bhagavad-Geeta/main/src/data/verses.json"
GITA_API = "https://gita-api.vercel.app/tel/verse/{}/{}"
UA = {"User-Agent": "Mozilla/5.0 gita-app-builder"}


def get(url: str, timeout: int = 60) -> bytes:
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
        return r.read()


def fetch_nvkudva() -> None:
    out = os.path.join(RAW, "nvkudva_verses.json")
    if os.path.exists(out) and os.path.getsize(out) > 1_000_000:
        print("nvkudva_verses.json cached")
        return
    print("downloading nvkudva_verses.json ...")
    with open(out, "wb") as f:
        f.write(get(NVKUDVA))


def fetch_verse(ch: int, v: int) -> str:
    p = os.path.join(TEL, f"{ch:02d}_{v:02d}.json")
    if os.path.exists(p) and os.path.getsize(p) > 200:
        return "cached"
    err = ""
    for attempt in range(5):
        try:
            d = json.loads(get(GITA_API.format(ch, v), timeout=30))
            if "error" in d:
                return f"ERR:{d}"
            with open(p, "w") as f:
                json.dump(d, f, ensure_ascii=False)
            return "ok"
        except Exception as e:  # noqa: BLE001
            err = str(e)
            time.sleep(1.5 * (attempt + 1))
    return f"FAIL:{err}"


def fetch_tel() -> None:
    jobs = [(c + 1, v) for c, n in enumerate(COUNTS) for v in range(1, n + 1)]
    print(f"fetching {len(jobs)} Telugu verses from gita-api.vercel.app ...")
    bad = 0
    with cf.ThreadPoolExecutor(4) as ex:
        for (ch, v), s in zip(jobs, ex.map(lambda a: fetch_verse(*a), jobs)):
            if s not in ("ok", "cached"):
                bad += 1
                print(ch, v, s, flush=True)
    print(f"done, {len(os.listdir(TEL))} files, {bad} failures")


if __name__ == "__main__":
    os.makedirs(TEL, exist_ok=True)
    fetch_nvkudva()
    fetch_tel()
