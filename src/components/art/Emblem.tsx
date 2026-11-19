import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, Line, LinearGradient, Path, Stop } from 'react-native-svg';
import type { EmblemKey } from '@/data/chapters';
import { ChapterHues } from '@/theme/tokens';

/**
 * Eighteen chapter emblems drawn in a single hand: 48×48 grid, 1.7px round strokes,
 * one optional soft fill. Because they are code, they are pixel-consistent at any size
 * and cost nothing in the bundle.
 */
type GlyphProps = { s: string; f: string };

const GLYPHS: Record<EmblemKey, (p: GlyphProps) => React.ReactNode> = {
  bow: ({ s }) => (
    <>
      <Path d="M17 6 C 41 17, 41 31, 17 42" stroke={s} />
      <Line x1={17} y1={6} x2={17} y2={42} stroke={s} />
      <Line x1={22} y1={24} x2={40} y2={24} stroke={s} />
      <Path d="M36 20 L40 24 L36 28" stroke={s} />
    </>
  ),
  lamp: ({ s, f }) => (
    <>
      <Path d="M24 27 C 19 21, 20 16, 24 10 C 28 16, 29 21, 24 27 Z" stroke={s} fill={f} />
      <Path d="M9 30 Q24 41 39 30 Z" stroke={s} />
      <Line x1={15} y1={38} x2={33} y2={38} stroke={s} />
    </>
  ),
  wheel: ({ s, f }) => (
    <>
      <Circle cx={24} cy={24} r={16} stroke={s} />
      <Circle cx={24} cy={24} r={3.5} stroke={s} fill={f} />
      {[0, 45, 90, 135].map((a) => (
        <Line key={a} x1={24} y1={8} x2={24} y2={40} stroke={s} transform={`rotate(${a} 24 24)`} />
      ))}
    </>
  ),
  sun: ({ s, f }) => (
    <>
      <Circle cx={24} cy={24} r={8.5} stroke={s} fill={f} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <Line key={a} x1={24} y1={5} x2={24} y2={10} stroke={s} transform={`rotate(${a} 24 24)`} />
      ))}
    </>
  ),
  leaf: ({ s, f }) => (
    <>
      <Path d="M24 7 C 38 7, 43 24, 32 38 C 28 42, 20 42, 16 38 C 5 24, 10 7, 24 7 Z" stroke={s} />
      <Line x1={24} y1={7} x2={24} y2={41} stroke={s} />
      <Circle cx={30} cy={22} r={3} stroke={s} fill={f} />
    </>
  ),
  seat: ({ s, f }) => (
    <>
      <Circle cx={24} cy={11} r={4.5} stroke={s} fill={f} />
      <Path d="M12 33 C 12 20, 36 20, 36 33" stroke={s} />
      <Path d="M7 36 Q24 43 41 36" stroke={s} />
      <Path d="M17 33 L24 28 L31 33" stroke={s} />
    </>
  ),
  ocean: ({ s }) => (
    <>
      {[16, 25, 34].map((y) => (
        <Path key={y} d={`M6 ${y} Q12 ${y - 6} 18 ${y} T30 ${y} T42 ${y}`} stroke={s} />
      ))}
    </>
  ),
  om: ({ s, f }) => (
    <>
      <Path d="M29 7 A16 16 0 1 0 29 41 A12.5 12.5 0 1 1 29 7 Z" stroke={s} fill={f} />
      <Circle cx={37} cy={14} r={2} stroke={s} fill={s} />
    </>
  ),
  kalasha: ({ s, f }) => (
    <>
      <Path d="M16 21 C 9 29, 12 39, 24 41 C 36 39, 39 29, 32 21 Z" stroke={s} />
      <Line x1={15} y1={17} x2={33} y2={17} stroke={s} />
      <Line x1={17} y1={21} x2={31} y2={21} stroke={s} />
      <Circle cx={24} cy={11} r={4} stroke={s} fill={f} />
      <Path d="M20 10 L13 5 M28 10 L35 5 M24 7 L24 2" stroke={s} />
    </>
  ),
  feather: ({ s, f }) => (
    <>
      <Ellipse cx={24} cy={16} rx={8} ry={10.5} stroke={s} />
      <Ellipse cx={24} cy={17} rx={4} ry={5.5} stroke={s} fill={f} />
      <Circle cx={24} cy={18} r={1.3} fill={s} />
      <Line x1={24} y1={26.5} x2={24} y2={44} stroke={s} />
      <Path d="M24 31 L18 37 M24 35 L30 41 M24 29 L30 33 M24 37 L18 43" stroke={s} />
    </>
  ),
  eye: ({ s, f }) => (
    <>
      <Path d="M6 24 Q24 6 42 24 Q24 42 6 24 Z" stroke={s} />
      <Circle cx={24} cy={24} r={6.5} stroke={s} fill={f} />
      <Circle cx={24} cy={24} r={2} fill={s} />
      <Path d="M24 3 V7 M24 41 V45 M9 9 L12 12 M39 9 L36 12 M9 39 L12 36 M39 39 L36 36" stroke={s} />
    </>
  ),
  heart: ({ s, f }) => (
    <>
      <Path d="M24 41 C 10 31, 5 22, 9 14 C 13 7, 22 9, 24 16 C 26 9, 35 7, 39 14 C 43 22, 38 31, 24 41 Z" stroke={s} fill={f} />
      <Path d="M24 16 L24 41" stroke={s} />
    </>
  ),
  field: ({ s, f }) => (
    <>
      <Line x1={6} y1={41} x2={42} y2={41} stroke={s} />
      <Line x1={24} y1={41} x2={24} y2={20} stroke={s} />
      <Path d="M24 30 C 17 30, 12 26, 12 18 C 19 18, 24 22, 24 30 Z" stroke={s} fill={f} />
      <Path d="M24 24 C 31 24, 36 20, 36 12 C 29 12, 24 16, 24 24 Z" stroke={s} fill={f} />
    </>
  ),
  bands: ({ s, f }) => (
    <>
      <Circle cx={24} cy={24} r={17} stroke={s} />
      <Circle cx={24} cy={24} r={11} stroke={s} />
      <Circle cx={24} cy={24} r={5} stroke={s} fill={f} />
    </>
  ),
  tree: ({ s }) => (
    <>
      <Line x1={24} y1={9} x2={24} y2={44} stroke={s} />
      <Path d="M24 9 L15 3 M24 9 L33 3 M24 9 V2" stroke={s} />
      <Path d="M24 21 L14 29 M24 21 L34 29 M24 30 L17 38 M24 30 L31 38" stroke={s} />
    </>
  ),
  scale: ({ s, f }) => (
    <>
      <Line x1={24} y1={8} x2={24} y2={41} stroke={s} />
      <Line x1={9} y1={14} x2={39} y2={14} stroke={s} />
      <Line x1={16} y1={41} x2={32} y2={41} stroke={s} />
      <Path d="M9 14 L4 27 M9 14 L14 27 M39 14 L34 27 M39 14 L44 27" stroke={s} />
      <Path d="M3 27 Q9 33 15 27 Z" stroke={s} fill={f} />
      <Path d="M33 27 Q39 33 45 27 Z" stroke={s} fill={f} />
    </>
  ),
  fire: ({ s, f }) => (
    <>
      <Path d="M24 5 C 16 15, 13 22, 15 30 C 17 36, 21 38, 24 42 C 27 38, 31 36, 33 30 C 35 22, 32 15, 24 5 Z" stroke={s} />
      <Path d="M24 23 C 21 27, 20.5 31, 24 36 C 27.5 31, 27 27, 24 23 Z" stroke={s} fill={f} />
      <Line x1={11} y1={43} x2={37} y2={43} stroke={s} />
    </>
  ),
  conch: ({ s, f }) => (
    <>
      <Path d="M30 6 C 43 8, 44 27, 31 33 L22 44 L13 31 C 6 22, 14 5, 30 6 Z" stroke={s} />
      <Path d="M30 12 C 37 14, 37 24, 30 26 C 25 24, 25 17, 30 15" stroke={s} fill={f} />
    </>
  ),
};

type Props = {
  name: EmblemKey;
  /** 1-based chapter number — picks the hue */
  chapter: number;
  size?: number;
  /** 'tile' draws a rounded gradient tile behind; 'line' draws bare strokes in `color`. */
  variant?: 'tile' | 'line';
  color?: string;
};

export function Emblem({ name, chapter, size = 56, variant = 'tile', color }: Props) {
  const hue = ChapterHues[(chapter - 1) % ChapterHues.length];
  const id = `em${chapter}`;
  const stroke = variant === 'tile' ? hue.ink : (color ?? hue.b);
  const fill = variant === 'tile' ? 'rgba(255,255,255,0.35)' : 'transparent';
  const Glyph = GLYPHS[name];
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {variant === 'tile' && (
        <>
          <Defs>
            <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={hue.a} />
              <Stop offset="1" stopColor={hue.b} />
            </LinearGradient>
          </Defs>
          <Path d="M0 14 C0 4 4 0 14 0 H34 C44 0 48 4 48 14 V34 C48 44 44 48 34 48 H14 C4 48 0 44 0 34 Z" fill={`url(#${id})`} />
        </>
      )}
      <G
        fill="none"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={variant === 'tile' ? 'translate(7.2 7.2) scale(0.7)' : undefined}>
        <Glyph s={stroke} f={fill} />
      </G>
    </Svg>
  );
}
