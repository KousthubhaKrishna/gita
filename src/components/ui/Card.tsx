import * as Haptics from 'expo-haptics';
import type { ViewStyleProp } from '@/lib/types';
import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Radius, useTheme } from '@/theme';

const APressable = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & {
  style?: ViewStyleProp;
  haptic?: boolean;
  elevated?: boolean;
};

/** Tap target with a gentle press-scale and a soft shadow. */
export function Card({ style, haptic = true, elevated = true, onPressIn, onPressOut, onPress, children, ...rest }: Props) {
  const t = useTheme();
  const s = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: s.value }] }));
  return (
    <APressable
      {...rest}
      onPressIn={(e) => {
        s.set(withSpring(0.975, { damping: 18, stiffness: 300 }));
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        s.set(withSpring(1, { damping: 16, stiffness: 260 }));
        onPressOut?.(e);
      }}
      onPress={(e) => {
        if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onPress?.(e);
      }}
      style={[
        styles.card,
        { backgroundColor: t.surface, borderColor: t.hairline },
        elevated && { shadowColor: t.shadow, shadowOpacity: t.name === 'dark' ? 0.35 : 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 3 },
        anim,
        style,
      ]}>
      {children}
    </APressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: Radius.lg, borderWidth: StyleSheet.hairlineWidth, overflow: 'visible' },
});
