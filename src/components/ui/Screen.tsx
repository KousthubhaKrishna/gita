import type { ViewStyleProp } from '@/lib/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

/** Full-bleed screen container that paints the themed background under the status bar. */
export function Screen({ children, style, top = true }: { children: React.ReactNode; style?: ViewStyleProp; top?: boolean }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return <View style={[styles.root, { backgroundColor: t.bg, paddingTop: top ? insets.top : 0 }, style]}>{children}</View>;
}

const styles = StyleSheet.create({ root: { flex: 1 } });
