import React from 'react';
import Svg, { Circle, Defs, G, LinearGradient, Path, RadialGradient, Stop } from 'react-native-svg';

/**
 * A lotus built from one petal path rotated around the centre, in three layers.
 * Procedural, so every instance shares the exact same hand.
 */
type Props = { size?: number; a: string; b: string; ink?: string; glow?: boolean };

const PETAL = 'M0 0 C -13 -14, -13 -40, 0 -54 C 13 -40, 13 -14, 0 0 Z';

export function Lotus({ size = 220, a, b, ink = 'rgba(0,0,0,0.25)', glow = true }: Props) {
  const back = [-72, -48, -24, 0, 24, 48, 72];
  const mid = [-60, -36, -12, 12, 36, 60];
  const front = [-30, 0, 30];
  return (
    <Svg width={size} height={size * 0.78} viewBox="-70 -62 140 110">
      <Defs>
        <LinearGradient id="lp" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={a} />
          <Stop offset="1" stopColor={b} />
        </LinearGradient>
        <LinearGradient id="lp2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={a} stopOpacity={0.85} />
          <Stop offset="1" stopColor={b} stopOpacity={0.95} />
        </LinearGradient>
        <RadialGradient id="lg" cx="0.5" cy="0.6" r="0.5">
          <Stop offset="0" stopColor={a} stopOpacity={0.55} />
          <Stop offset="1" stopColor={a} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      {glow && <Circle cx={0} cy={-10} r={64} fill="url(#lg)" />}
      <G transform="translate(0 40)">
        {back.map((r) => (
          <Path key={`b${r}`} d={PETAL} fill="url(#lp2)" stroke={ink} strokeWidth={0.6} transform={`rotate(${r}) scale(0.78)`} />
        ))}
        {mid.map((r) => (
          <Path key={`m${r}`} d={PETAL} fill="url(#lp)" stroke={ink} strokeWidth={0.6} transform={`rotate(${r}) scale(0.9)`} />
        ))}
        {front.map((r) => (
          <Path key={`f${r}`} d={PETAL} fill="url(#lp)" stroke={ink} strokeWidth={0.7} transform={`rotate(${r})`} />
        ))}
        <Circle cx={0} cy={-6} r={4} fill={a} stroke={ink} strokeWidth={0.6} />
      </G>
    </Svg>
  );
}

/** Faint concentric mandala used as a background texture behind heroes. */
export function Mandala({ size = 360, color, opacity = 0.12 }: { size?: number; color: string; opacity?: number }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <Svg width={size} height={size} viewBox="-100 -100 200 200" opacity={opacity}>
      <G fill="none" stroke={color} strokeWidth={0.8}>
        <Circle r={96} />
        <Circle r={80} strokeDasharray="2 5" />
        <Circle r={54} />
        <Circle r={24} />
        {petals.map((r) => (
          <Path key={r} d="M0 -54 C 8 -66, 8 -84, 0 -96 C -8 -84, -8 -66, 0 -54 Z" transform={`rotate(${r})`} />
        ))}
        {petals.map((r) => (
          <Path key={`i${r}`} d="M0 -24 C 5 -32, 5 -46, 0 -54 C -5 -46, -5 -32, 0 -24 Z" transform={`rotate(${r + 11.25})`} />
        ))}
      </G>
    </Svg>
  );
}
