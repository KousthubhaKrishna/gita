import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/theme';

export type IconName = 'back' | 'close' | 'settings' | 'bookmark' | 'bookmarkFilled' | 'check' | 'info' | 'chevron' | 'list' | 'textSize';

const PATHS: Record<IconName, string> = {
  back: 'M15 5 L8 12 L15 19',
  close: 'M6 6 L18 18 M18 6 L6 18',
  settings: 'M12 15.5 A3.5 3.5 0 1 0 12 8.5 A3.5 3.5 0 1 0 12 15.5 Z M19.4 15 A1.65 1.65 0 0 0 19.7 16.8 L19.8 16.9 A2 2 0 1 1 17 19.7 L16.9 19.6 A1.65 1.65 0 0 0 15 19.3 A1.65 1.65 0 0 0 14 20.8 V21 A2 2 0 1 1 10 21 V20.9 A1.65 1.65 0 0 0 8.9 19.4 A1.65 1.65 0 0 0 7.1 19.7 L7 19.8 A2 2 0 1 1 4.2 17 L4.3 16.9 A1.65 1.65 0 0 0 4.6 15.1 A1.65 1.65 0 0 0 3.1 14 H3 A2 2 0 1 1 3 10 H3.1 A1.65 1.65 0 0 0 4.6 8.9 A1.65 1.65 0 0 0 4.3 7.1 L4.2 7 A2 2 0 1 1 7 4.2 L7.1 4.3 A1.65 1.65 0 0 0 8.9 4.6 H9 A1.65 1.65 0 0 0 10 3.1 V3 A2 2 0 1 1 14 3 V3.1 A1.65 1.65 0 0 0 15 4.6 A1.65 1.65 0 0 0 16.8 4.3 L16.9 4.2 A2 2 0 1 1 19.7 7 L19.6 7.1 A1.65 1.65 0 0 0 19.3 8.9 V9 A1.65 1.65 0 0 0 20.8 10 H21 A2 2 0 1 1 21 14 H20.9 A1.65 1.65 0 0 0 19.4 15 Z',
  bookmark: 'M6 4 H18 V21 L12 16.5 L6 21 Z',
  bookmarkFilled: 'M6 4 H18 V21 L12 16.5 L6 21 Z',
  check: 'M5 12.5 L10 17.5 L19 7',
  info: 'M12 21 A9 9 0 1 0 12 3 A9 9 0 1 0 12 21 Z M12 11 V16 M12 8 V8.01',
  chevron: 'M9 5 L16 12 L9 19',
  list: 'M5 7 H19 M5 12 H19 M5 17 H13',
  textSize: 'M4 18 L9 6 L14 18 M6 14 H12 M15 18 L18 11 L21 18 M16.5 16 H19.5',
};

export function Icon({ name, size = 22, color, strokeWidth = 1.8 }: { name: IconName; size?: number; color: string; strokeWidth?: number }) {
  const filled = name === 'bookmarkFilled';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={PATHS[name]} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={filled ? color : 'none'} />
    </Svg>
  );
}

export function IconButton({ name, onPress, color, size = 22, label }: { name: IconName; onPress?: () => void; color?: string; size?: number; label?: string }) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label ?? name}
      hitSlop={8}
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
      style={({ pressed }) => [styles.btn, { backgroundColor: pressed ? 'rgba(128,96,48,0.18)' : 'transparent' }]}>
      <Icon name={name} size={size} color={color ?? t.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});
