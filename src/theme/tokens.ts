/**
 * Design tokens — inspired by Indian miniature painting:
 * parchment grounds, vermilion borders, gold leaf, Krishna-blue, lotus pink and leaf green.
 */
/**
 * Static font weights (Android ignores fontWeight on custom/variable fonts, so each
 * weight is its own family). Index = weight step; the user's "text weight" setting
 * picks the starting step and headings sit one step above body.
 */
export const SERIF = ['NotoSerifTelugu-SemiBold', 'NotoSerifTelugu-Bold', 'NotoSerifTelugu-ExtraBold'] as const;
export const SANS = ['NotoSansTelugu-Medium', 'NotoSansTelugu-SemiBold', 'NotoSansTelugu-Bold'] as const;
export type TextWeight = 'regular' | 'medium' | 'bold';
export const WEIGHT_STEP: Record<TextWeight, number> = { regular: 0, medium: 1, bold: 2 };

export function serif(step: number) {
  return SERIF[Math.max(0, Math.min(SERIF.length - 1, step))];
}
export function sans(step: number) {
  return SANS[Math.max(0, Math.min(SANS.length - 1, step))];
}

/** Default (medium-weight) families, for the rare place that sets a font outside <Text>. */
export const Fonts = {
  sloka: SERIF[1],
  serif: SERIF[2],
  sans: SANS[1],
} as const;

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const Radius = { sm: 10, md: 16, lg: 22, xl: 30, pill: 999 } as const;

export type Palette = {
  name: 'light' | 'dark';
  bg: string;
  bgElevated: string;
  surface: string;
  surfaceAlt: string;
  hairline: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentDeep: string;
  accentSoft: string;
  accentText: string;
  gold: string;
  goldSoft: string;
  vermilion: string;
  indigo: string;
  leaf: string;
  lotus: string;
  success: string;
  shadow: string;
};

export const Light: Palette = {
  name: 'light',
  bg: '#F4EAD5',
  bgElevated: '#FBF4E4',
  surface: '#FFF9EC',
  surfaceAlt: '#EEDFC2',
  hairline: 'rgba(110, 70, 20, 0.16)',
  text: '#2A1B0C',
  textSecondary: '#55412A',
  textTertiary: '#7A6143',
  accent: '#C2531B',
  accentDeep: '#8E2A1E',
  accentSoft: 'rgba(194, 83, 27, 0.12)',
  accentText: '#FFF8EC',
  gold: '#9A6B16',
  goldSoft: '#D9B566',
  vermilion: '#9E2F22',
  indigo: '#23306A',
  leaf: '#4D7A36',
  lotus: '#C4567A',
  success: '#3F7F3A',
  shadow: '#5A3A14',
};

export const Dark: Palette = {
  name: 'dark',
  bg: '#0D1124',
  bgElevated: '#131833',
  surface: '#181E3C',
  surfaceAlt: '#232A4D',
  hairline: 'rgba(240, 210, 150, 0.16)',
  text: '#F6ECD8',
  textSecondary: '#D5C6AA',
  textTertiary: '#A8987B',
  accent: '#F0A04B',
  accentDeep: '#E07B3A',
  accentSoft: 'rgba(240, 160, 75, 0.16)',
  accentText: '#1A1206',
  gold: '#E6BF66',
  goldSoft: '#B8923E',
  vermilion: '#D9654F',
  indigo: '#8E9EF0',
  leaf: '#8DC36F',
  lotus: '#F08DAE',
  success: '#7FC48C',
  shadow: '#000000',
};

/**
 * One hue per chapter, walking from dawn saffron through dusk rose, night indigo,
 * forest green and back to the gold of a new day.
 */
export const ChapterHues: { a: string; b: string; ink: string }[] = [
  { a: '#F2B56B', b: '#C2531B', ink: '#5B2A0A' },
  { a: '#F3C27A', b: '#B0741A', ink: '#4D300A' },
  { a: '#EFAA6E', b: '#A9481F', ink: '#4A1F0C' },
  { a: '#F2BF8D', b: '#A8652A', ink: '#4A2C0B' },
  { a: '#E9A28A', b: '#9C4532', ink: '#431B12' },
  { a: '#D9A3A8', b: '#8A4459', ink: '#3E1A24' },
  { a: '#C9A3C4', b: '#74437A', ink: '#32193A' },
  { a: '#B3A3D4', b: '#56448A', ink: '#241A40' },
  { a: '#A3A8DE', b: '#3F4594', ink: '#1C1E45' },
  { a: '#9FB7E0', b: '#365596', ink: '#172545' },
  { a: '#9EC3DC', b: '#2D6690', ink: '#122C40' },
  { a: '#A1CBCD', b: '#2F777B', ink: '#13383A' },
  { a: '#A9CFB6', b: '#357752', ink: '#15372A' },
  { a: '#C2D0A2', b: '#5E7A36', ink: '#2C3A17' },
  { a: '#D8D19B', b: '#7C7630', ink: '#3A3813' },
  { a: '#E6CB8E', b: '#957823', ink: '#44380E' },
  { a: '#EFBE7E', b: '#A6651B', ink: '#4C2E0B' },
  { a: '#F4C48C', b: '#BF6524', ink: '#58310B' },
];
