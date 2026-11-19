import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ArtStyle } from '@/data/art';
import type { TextWeight } from '@/theme/tokens';

export type ThemePref = 'system' | 'light' | 'dark';

type Settings = {
  theme: ThemePref;
  /** Image style: classical miniature paintings, or real photographs and Ravi Varma prints. */
  artStyle: ArtStyle;
  /** Multiplier applied to all reading text. */
  fontScale: number;
  /** Base text weight; headings sit one step heavier. */
  textWeight: TextWeight;
  showDevanagari: boolean;
  showTransliteration: boolean;
  showSecondTranslation: boolean;
  showEnglish: boolean;
  set: (patch: Partial<Omit<Settings, 'set'>>) => void;
};

export const FONT_SCALES = [0.85, 1, 1.15, 1.3, 1.5] as const;

export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      theme: 'system',
      artStyle: 'miniature',
      fontScale: 1,
      textWeight: 'medium',
      showDevanagari: false,
      showTransliteration: false,
      showSecondTranslation: true,
      showEnglish: false,
      set: (patch) => set(patch),
    }),
    { name: 'gita.settings.v1', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
