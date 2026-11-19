import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { ViewStyleProp } from '@/lib/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ArtKey } from '@/data/art';
import { useArt } from '@/hooks/use-art';

type Props = {
  art: ArtKey;
  style?: ViewStyleProp;
  /** Warm bottom scrim so overlaid text stays readable. */
  scrim?: 'none' | 'bottom' | 'full';
  scrimColor?: string;
  children?: React.ReactNode;
  transition?: number;
};

/** A bundled miniature painting, cropped to its focal point, with an optional readability scrim. */
export function Painting({ art, style, scrim = 'none', scrimColor = '#1A0E05', children, transition = 250 }: Props) {
  const a = useArt(art);
  return (
    <View style={[styles.wrap, style]}>
      <Image source={a.src} style={StyleSheet.absoluteFill} contentFit="cover" contentPosition={a.focus} transition={transition} />
      {scrim === 'bottom' && (
        <LinearGradient
          colors={['transparent', `${scrimColor}55`, `${scrimColor}E6`]}
          locations={[0.35, 0.65, 1]}
          style={StyleSheet.absoluteFill}
        />
      )}
      {scrim === 'full' && <View style={[StyleSheet.absoluteFill, { backgroundColor: `${scrimColor}88` }]} />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { overflow: 'hidden', backgroundColor: '#3A2614' } });
