#!/usr/bin/env python3
"""Compile raw Gita sources into the compact per-chapter JSON the app bundles.

Sources
  raw/tel/CC_VV.json        gita-api.vercel.app /tel  (Telugu sloka, word-by-word, translation, purport)
  raw/nvkudva_verses.json   github.com/nvkudva/Bhagavad-Geeta (Devanagari, IAST, te.wikisource translation CC BY-SA 4.0,
                            English translation)

Output
  src/data/verses/chNN.json   [{id,c,v,vs,sp,te,sa,tr,words,tat,tat2,en}]
  src/data/purport/chNN.json  {"c.v": [paragraphs]}
  src/data/stats.json         verse counts per chapter (sanity)
"""
import json, glob, os, re, unicodedata

ROOT = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.abspath(os.path.join(ROOT, "..", ".."))
RAW = os.path.join(ROOT, "raw")
OUT_V = os.path.join(PROJ, "src", "data", "verses")
OUT_P = os.path.join(PROJ, "src", "data", "purport")
COUNTS = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78]


def norm(s: str) -> str:
    s = unicodedata.normalize("NFC", s or "")
    s = s.replace("\xa0", " ").replace("‌", "").replace("​", "")
    s = re.sub(r"[ \t]+", " ", s)
    return s.strip()


def clean_sloka(text: str):
    """Split speaker line, strip trailing verse numerals, return (speaker, lines)."""
    lines = [norm(l) for l in text.split("\n") if norm(l)]
    speaker = None
    if lines and "ఉవాచ" in lines[0] and len(lines[0]) < 40:
        speaker = re.sub(r"[।|॥.\s]+$", "", lines[0]).strip()
        lines = lines[1:]
    out = []
    for l in lines:
        l = re.sub(r"\s*(।।|॥|\|\|)\s*[\d౦-౯]+(\s*[-–]\s*[\d౦-౯]+)?\s*(।।|॥|\|\|)\s*$", " ॥", l)
        l = re.sub(r"\s*[।|]\s*$", " ।", l)
        l = re.sub(r"\s+([।॥])", r" \1", l)
        out.append(l.strip())
    return speaker, out


def parse_words(s: str):
    s = norm(s)
    pairs = []
    for chunk in re.split(r";\s*", s):
        chunk = chunk.strip().rstrip(".").strip()
        if not chunk:
            continue
        if "—" in chunk:
            w, m = chunk.split("—", 1)
        elif " - " in chunk:
            w, m = chunk.split(" - ", 1)
        else:
            w, m = chunk, ""
        w, m = norm(w), norm(m)
        if w:
            pairs.append([w, m])
    return pairs


def clean_dev(text: str) -> str:
    lines = [norm(l) for l in text.split("\n") if norm(l)]
    out = []
    for l in lines:
        if "उवाच" in l and len(l) < 40:
            continue
        l = re.sub(r"\s*।।\s*[\d.\-–]+\s*।।\s*$", " ॥", l)
        l = re.sub(r"\s*॥\s*[\d.\-–]+\s*॥\s*$", " ॥", l)
        out.append(l)
    return "\n".join(out)


def clean_iast(text: str) -> str:
    lines = [norm(l) for l in text.split("\n") if norm(l)]
    return "\n".join(l for l in lines if not re.search(r"uv[āa]cha?$", l))


def main():
    nv = json.load(open(os.path.join(RAW, "nvkudva_verses.json")))
    nvmap = {(x["chapter_id"], x["verse_number"]): x for x in nv}

    stats = {}
    for c, n in enumerate(COUNTS, start=1):
        verses, purports, seen = [], {}, set()
        for v in range(1, n + 1):
            d = json.load(open(os.path.join(RAW, "tel", f"{c:02d}_{v:02d}.json")))
            vs = d["verse_no"] if isinstance(d["verse_no"], list) else [d["verse_no"]]
            key = (c, vs[0])
            if key in seen:
                continue
            seen.add(key)
            raw_verse = d["verse"] if isinstance(d["verse"], str) else "\n".join(d["verse"])
            speaker, te_lines = clean_sloka(raw_verse)

            sa_parts, tr_parts, tat2_parts, en_parts = [], [], [], []
            for vv in vs:
                x = nvmap.get((c, vv))
                if not x:
                    continue
                sa_parts.append(clean_dev(x["text"]))
                tr_parts.append(clean_iast(x["transliteration"]))
                tat2_parts.append(norm(x["translation_telugu"]))
                en_parts.append(norm(x["translation_english"]))

            vid = f"{c}.{vs[0]}" if len(vs) == 1 else f"{c}.{vs[0]}-{vs[-1]}"
            verses.append({
                "id": vid,
                "c": c,
                "v": vs[0],
                "vs": vs,
                "sp": speaker,
                "te": te_lines,
                "sa": "\n".join(p for p in sa_parts if p),
                "tr": "\n".join(p for p in tr_parts if p),
                "words": parse_words(d["synonyms"]),
                "tat": norm(d["translation"]),
                "tat2": " ".join(p for p in tat2_parts if p),
                "en": " ".join(p for p in en_parts if p),
            })
            paras = d["purport"] if isinstance(d["purport"], list) else [d["purport"]]
            paras = [norm(p) for p in paras if norm(p)]
            if paras:
                purports[vid] = paras

        with open(os.path.join(OUT_V, f"ch{c:02d}.json"), "w") as f:
            json.dump(verses, f, ensure_ascii=False, separators=(",", ":"))
        with open(os.path.join(OUT_P, f"ch{c:02d}.json"), "w") as f:
            json.dump(purports, f, ensure_ascii=False, separators=(",", ":"))
        stats[c] = {"cards": len(verses), "slokas": n, "withWords": sum(1 for x in verses if x["words"])}
        print(f"ch{c:02d}: {len(verses)} cards / {n} slokas, purport {len(purports)}")

    json.dump(stats, open(os.path.join(PROJ, "src", "data", "stats.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
