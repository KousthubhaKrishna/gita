import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CHAPTERS, TOTAL_CARDS } from '@/data/chapters';

export type VerseRef = { c: number; v: number };

type Progress = {
  /** verse card ids ("2.47", "1.21-22") that have been read */
  read: Record<string, number>; // id -> timestamp
  bookmarks: Record<string, number>;
  last: { c: number; v: number; id: string } | null;
  /** YYYY-MM-DD strings with at least one verse read */
  days: Record<string, number>;
  markRead: (id: string, c: number, v: number) => void;
  unmarkRead: (id: string) => void;
  toggleBookmark: (id: string) => void;
  setLast: (id: string, c: number, v: number) => void;
  reset: () => void;
};

export const todayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const useProgress = create<Progress>()(
  persist(
    (set) => ({
      read: {},
      bookmarks: {},
      last: null,
      days: {},
      markRead: (id, c, v) =>
        set((s) => {
          if (s.read[id]) return { last: { c, v, id } };
          const day = todayKey();
          return {
            read: { ...s.read, [id]: Date.now() },
            days: { ...s.days, [day]: (s.days[day] ?? 0) + 1 },
            last: { c, v, id },
          };
        }),
      unmarkRead: (id) =>
        set((s) => {
          const read = { ...s.read };
          delete read[id];
          return { read };
        }),
      toggleBookmark: (id) =>
        set((s) => {
          const bookmarks = { ...s.bookmarks };
          if (bookmarks[id]) delete bookmarks[id];
          else bookmarks[id] = Date.now();
          return { bookmarks };
        }),
      setLast: (id, c, v) => set({ last: { c, v, id } }),
      reset: () => set({ read: {}, bookmarks: {}, last: null, days: {} }),
    }),
    { name: 'gita.progress.v1', storage: createJSONStorage(() => AsyncStorage) },
  ),
);

/* ---------- derived selectors (pure, cheap) ---------- */

export function chapterReadCount(read: Record<string, number>, c: number): number {
  const prefix = `${c}.`;
  let n = 0;
  for (const k in read) if (k.startsWith(prefix)) n++;
  return n;
}

export function overallFraction(read: Record<string, number>): number {
  return Math.min(1, Object.keys(read).length / TOTAL_CARDS);
}

export function chapterFraction(read: Record<string, number>, c: number): number {
  const ch = CHAPTERS[c - 1];
  return Math.min(1, chapterReadCount(read, c) / ch.cards);
}

/** Consecutive days (ending today or yesterday) with at least one verse read. */
export function streak(days: Record<string, number>): number {
  let n = 0;
  const d = new Date();
  if (!days[todayKey(d)]) d.setDate(d.getDate() - 1);
  while (days[todayKey(d)]) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
