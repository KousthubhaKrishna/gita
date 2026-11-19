/**
 * Verse data access. Chapters are bundled as separate JSON modules so Metro can keep
 * each one as its own asset and the app never parses more than it is looking at.
 * Purports (long commentary) live in separate files and are only required on demand.
 */
export type Verse = {
  id: string; // "2.47" or "1.21-22"
  c: number;
  v: number; // first sloka number
  vs: number[]; // all sloka numbers covered by this card
  sp: string | null; // speaker line, e.g. "శ్రీ భగవానువాచ"
  te: string[]; // sloka lines in Telugu script
  sa: string; // Devanagari
  tr: string; // IAST transliteration
  words: [string, string][]; // ప్రతిపదార్థం
  tat: string; // తాత్పర్యం (primary)
  tat2: string; // తాత్పర్యం (second translation, CC BY-SA)
  en: string; // English translation
};

const VERSES: Record<number, () => Verse[]> = {
  1: () => require('./verses/ch01.json'),
  2: () => require('./verses/ch02.json'),
  3: () => require('./verses/ch03.json'),
  4: () => require('./verses/ch04.json'),
  5: () => require('./verses/ch05.json'),
  6: () => require('./verses/ch06.json'),
  7: () => require('./verses/ch07.json'),
  8: () => require('./verses/ch08.json'),
  9: () => require('./verses/ch09.json'),
  10: () => require('./verses/ch10.json'),
  11: () => require('./verses/ch11.json'),
  12: () => require('./verses/ch12.json'),
  13: () => require('./verses/ch13.json'),
  14: () => require('./verses/ch14.json'),
  15: () => require('./verses/ch15.json'),
  16: () => require('./verses/ch16.json'),
  17: () => require('./verses/ch17.json'),
  18: () => require('./verses/ch18.json'),
};

const PURPORT: Record<number, () => Record<string, string[]>> = {
  1: () => require('./purport/ch01.json'),
  2: () => require('./purport/ch02.json'),
  3: () => require('./purport/ch03.json'),
  4: () => require('./purport/ch04.json'),
  5: () => require('./purport/ch05.json'),
  6: () => require('./purport/ch06.json'),
  7: () => require('./purport/ch07.json'),
  8: () => require('./purport/ch08.json'),
  9: () => require('./purport/ch09.json'),
  10: () => require('./purport/ch10.json'),
  11: () => require('./purport/ch11.json'),
  12: () => require('./purport/ch12.json'),
  13: () => require('./purport/ch13.json'),
  14: () => require('./purport/ch14.json'),
  15: () => require('./purport/ch15.json'),
  16: () => require('./purport/ch16.json'),
  17: () => require('./purport/ch17.json'),
  18: () => require('./purport/ch18.json'),
};

const verseCache = new Map<number, Verse[]>();

export function getChapterVerses(c: number): Verse[] {
  let v = verseCache.get(c);
  if (!v) {
    v = VERSES[c]();
    verseCache.set(c, v);
  }
  return v;
}

export function getPurport(c: number, id: string): string[] {
  return PURPORT[c]()[id] ?? [];
}

/** Index of the card that contains sloka `v` in chapter `c`. */
export function indexOfSloka(c: number, v: number): number {
  const list = getChapterVerses(c);
  const i = list.findIndex((x) => x.vs.includes(v));
  return i < 0 ? 0 : i;
}

export function getVerse(c: number, v: number): Verse {
  const list = getChapterVerses(c);
  return list[indexOfSloka(c, v)];
}

/** Deterministic "verse of the day" — walks the whole text once every ~650 days. */
export function verseOfTheDay(date = new Date()): Verse {
  const day = Math.floor(date.getTime() / 86_400_000);
  const all: Verse[] = [];
  for (let c = 1; c <= 18; c++) all.push(...getChapterVerses(c));
  // Spread over a prime stride so consecutive days hop around the text.
  const i = (day * 263) % all.length;
  return all[i];
}
