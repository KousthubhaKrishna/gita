import type { ViewStyleProp } from '@/lib/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { useTheme } from '@/theme';

/** Small four-petal rosette, the motif used in miniature-painting borders. */
export function Rosette({ size = 18, color, center }: { size?: number; color: string; center?: string }) {
  return (
    <Svg width={size} height={size} viewBox="-10 -10 20 20">
      <G fill={color}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
          <Path key={r} d="M0 -9 C 2.4 -6, 2.4 -3.5, 0 -2 C -2.4 -3.5, -2.4 -6, 0 -9 Z" transform={`rotate(${r})`} opacity={r % 90 === 0 ? 1 : 0.6} />
        ))}
      </G>
      <Circle r={2.2} fill={center ?? color} />
    </Svg>
  );
}

type Props = {
  children: React.ReactNode;
  style?: ViewStyleProp;
  /** 'royal' = vermilion band + gold rule (for paintings). 'leaf' = gold double rule on parchment (for text). */
  variant?: 'royal' | 'leaf';
  padding?: number;
};

/**
 * Border styled after Pahari/Rajput miniature mounts: an outer coloured band,
 * a thin gold rule and rosettes at the corners.
 */
export function Frame({ children, style, variant = 'leaf', padding }: Props) {
  const t = useTheme();
  if (variant === 'royal') {
    return (
      <View style={[styles.royalOuter, { backgroundColor: t.vermilion, shadowColor: t.shadow }, style]}>
        <View style={[styles.royalRule, { borderColor: t.goldSoft }]}>
          <View style={{ flex: 1, overflow: 'hidden', borderRadius: 4 }}>{children}</View>
        </View>
        <Corners color={t.goldSoft} center={t.vermilion} inset={-2} size={16} />
      </View>
    );
  }
  return (
    <View style={[styles.leafOuter, { backgroundColor: t.surface, borderColor: t.goldSoft, shadowColor: t.shadow }, style]}>
      <View style={[styles.leafInner, { borderColor: t.hairline, padding: padding ?? 20 }]}>{children}</View>
      <Corners color={t.gold} center={t.surface} inset={4} size={18} />
    </View>
  );
}

function Corners({ color, center, inset, size }: { color: string; center: string; inset: number; size: number }) {
  const pos = [
    { top: inset, left: inset },
    { top: inset, right: inset },
    { bottom: inset, left: inset },
    { bottom: inset, right: inset },
  ];
  return (
    <>
      {pos.map((p, i) => (
        <View key={i} pointerEvents="none" style={[styles.corner, p]}>
          <Rosette size={size} color={color} center={center} />
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  royalOuter: { padding: 7, borderRadius: 10, shadowOpacity: 0.25, shadowRadius: 14, shadowOffset: { width: 0, height: 8 }, elevation: 5 },
  royalRule: { flex: 1, borderWidth: 1.5, borderRadius: 5, padding: 2 },
  leafOuter: { borderWidth: 1.5, borderRadius: 18, padding: 5, shadowOpacity: 0.1, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  leafInner: { borderWidth: 1, borderRadius: 13 },
  corner: { position: 'absolute' },
});
