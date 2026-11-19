import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSettings } from '@/store/settings';
import { Dark, Light, Palette } from './tokens';

export * from './tokens';

const ThemeCtx = createContext<Palette>(Light);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const pref = useSettings((s) => s.theme);
  const palette = useMemo(() => {
    const mode = pref === 'system' ? system : pref;
    return mode === 'dark' ? Dark : Light;
  }, [pref, system]);
  return <ThemeCtx.Provider value={palette}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): Palette {
  return useContext(ThemeCtx);
}
