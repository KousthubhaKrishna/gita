import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { useSettings } from '@/store/settings';
import { sans, serif, useTheme, WEIGHT_STEP } from '@/theme';

type Variant = 'display' | 'sloka' | 'title' | 'heading' | 'subheading' | 'body' | 'bodyLg' | 'caption' | 'label' | 'numeral';

/**
 * Sizes are generous because Telugu conjuncts need room. `face` says which family a
 * variant uses and `step` how much heavier than the user's base weight it is.
 */
const BASE: Record<Variant, TextStyle & { face?: 'serif' | 'sans'; step?: number }> = {
  display: { face: 'serif', step: 2, fontSize: 40, lineHeight: 60 },
  sloka: { face: 'serif', step: 0, fontSize: 23, lineHeight: 42 },
  title: { face: 'serif', step: 1, fontSize: 28, lineHeight: 44 },
  heading: { face: 'serif', step: 1, fontSize: 20, lineHeight: 32 },
  subheading: { face: 'serif', step: 1, fontSize: 17, lineHeight: 28 },
  body: { face: 'sans', step: 0, fontSize: 16, lineHeight: 29 },
  bodyLg: { face: 'sans', step: 0, fontSize: 18, lineHeight: 33 },
  caption: { face: 'sans', step: 0, fontSize: 14, lineHeight: 22 },
  label: { face: 'serif', step: 1, fontSize: 14, lineHeight: 22, letterSpacing: 0.3 },
  numeral: { fontSize: 15, lineHeight: 20, fontWeight: '600', fontVariant: ['tabular-nums'] },
};

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  /** Override the variant's typeface (e.g. Sanskrit words in serif inside body text). */
  face?: 'serif' | 'sans' | 'system';
  /** Apply the user's reading font scale (on by default for reading variants). */
  scaled?: boolean;
};

export function Text({ variant = 'body', color = 'text', face, scaled, style, ...rest }: Props) {
  const t = useTheme();
  const scale = useSettings((s) => s.fontScale);
  const weight = useSettings((s) => s.textWeight);
  const { face: baseFace, step = 0, ...base } = BASE[variant];
  const f = face ?? baseFace;
  const k = (scaled ?? (variant === 'sloka' || variant === 'body' || variant === 'bodyLg')) ? scale : 1;
  const w = WEIGHT_STEP[weight ?? 'medium'] + step;
  const fontFamily = f === 'serif' ? serif(w) : f === 'sans' ? sans(w) : undefined;
  const c = (t as unknown as Record<string, string>)[color] ?? color;
  return (
    <RNText
      {...rest}
      style={[base, { fontFamily, color: c, fontSize: base.fontSize! * k, lineHeight: base.lineHeight! * k }, style]}
    />
  );
}
