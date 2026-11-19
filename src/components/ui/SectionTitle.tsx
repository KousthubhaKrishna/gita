import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Text } from '@/components/ui/Text';
import { Spacing, useTheme } from '@/theme';

/** Small lotus bud glyph */
export function LotusBud({ size = 16, color }: { size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 3 C 15 7, 15 13, 12 17 C 9 13, 9 7, 12 3 Z" fill={color} />
      <Path d="M12 17 C 8 16, 5 12, 4 8 C 8 9, 11 12, 12 17 Z" fill={color} opacity={0.7} />
      <Path d="M12 17 C 16 16, 19 12, 20 8 C 16 9, 13 12, 12 17 Z" fill={color} opacity={0.7} />
      <Path d="M5 20 H19" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

/** Section heading: lotus bud · title · gold hairline that runs to the edge. */
export function SectionTitle({ title, right }: { title: string; right?: React.ReactNode }) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      <LotusBud color={t.gold} />
      <Text variant="heading" style={{ fontSize: 19 }}>{title}</Text>
      <View style={[styles.line, { backgroundColor: t.goldSoft }]} />
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.md },
  line: { flex: 1, height: 1, opacity: 0.7 },
});
