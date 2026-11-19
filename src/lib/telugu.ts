/** "2.47" | "1.21–22" — plain digits everywhere for readability. */
export function verseLabel(c: number, vs: number[]): string {
  return vs.length > 1 ? `${c}.${vs[0]}–${vs[vs.length - 1]}` : `${c}.${vs[0]}`;
}

/** Sloka-number label inside a chapter: "47" | "21–22" */
export function slokaLabel(vs: number[]): string {
  return vs.length > 1 ? `${vs[0]}–${vs[vs.length - 1]}` : String(vs[0]);
}
