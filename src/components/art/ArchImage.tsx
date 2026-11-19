import { Image } from 'expo-image';
import type { ViewStyleProp } from '@/lib/types';
import React from 'react';
import { View } from 'react-native';
import { ArtKey } from '@/data/art';
import { useArt } from '@/hooks/use-art';
import { useTheme } from '@/theme';

/** Painting cropped into a temple-window arch with a thin gold surround. */
export function ArchImage({ art, width, height, style }: { art: ArtKey; width: number; height: number; style?: ViewStyleProp }) {
  const t = useTheme();
  const r = width / 2;
  const a = useArt(art);
  return (
    <View
      style={[
        {
          width,
          height,
          borderTopLeftRadius: r,
          borderTopRightRadius: r,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 2,
          borderColor: t.goldSoft,
          padding: 2,
          backgroundColor: t.surface,
        },
        style,
      ]}>
      <Image
        source={a.src}
        contentFit="cover"
        contentPosition={a.focus}
        transition={200}
        style={{ flex: 1, borderTopLeftRadius: r - 4, borderTopRightRadius: r - 4, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
      />
    </View>
  );
}
