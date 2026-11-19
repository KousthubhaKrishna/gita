import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

/**
 * A painted landscape in the manner of Pahari miniatures: layered hills, cypress and
 * plantain trees, a river with lotuses, birds, and a sun (or moon at night).
 * Drawn procedurally so it is crisp at any width and costs nothing in bundle size.
 */
type Props = { width: number; height?: number; night?: boolean };

export function NatureScene({ width, height = width * 0.62, night = false }: Props) {
  const sky = night ? ['#0E1430', '#26305E', '#4B4777'] : ['#F7D9A6', '#F3B77A', '#EE9B6A'];
  const hills = night ? ['#2C355F', '#252C50', '#1C2241'] : ['#9DB27A', '#6F9157', '#4E7440'];
  const water = night ? ['#2C3768', '#1B2247'] : ['#9CC7C4', '#5E9C9E'];
  return (
    <Svg width={width} height={height} viewBox="0 0 400 248" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={sky[0]} />
          <Stop offset="0.6" stopColor={sky[1]} />
          <Stop offset="1" stopColor={sky[2]} />
        </LinearGradient>
        <RadialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor={night ? '#FFF6DA' : '#FFF4D2'} />
          <Stop offset="0.45" stopColor={night ? '#F3E3B0' : '#FFD27A'} stopOpacity={0.9} />
          <Stop offset="1" stopColor={night ? '#F3E3B0' : '#FFB25C'} stopOpacity={0} />
        </RadialGradient>
        <LinearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={water[0]} />
          <Stop offset="1" stopColor={water[1]} />
        </LinearGradient>
      </Defs>

      <Rect x={0} y={0} width={400} height={248} fill="url(#sky)" />
      {/* sun / moon */}
      <Circle cx={292} cy={92} r={58} fill="url(#sun)" />
      <Circle cx={292} cy={92} r={night ? 15 : 19} fill={night ? '#FFF6DA' : '#FFF1C9'} />
      {night && [[40, 30], [90, 55], [150, 22], [210, 48], [350, 30], [370, 70], [120, 80]].map(([x, y], i) => <Circle key={i} cx={x} cy={y} r={1.2} fill="#FFF6DA" opacity={0.8} />)}

      {/* far hills */}
      <Path d="M0 150 C 50 112, 95 120, 140 136 C 190 102, 250 104, 300 130 C 340 112, 375 116, 400 126 L400 248 L0 248 Z" fill={hills[0]} opacity={0.75} />
      {/* mid hills */}
      <Path d="M0 170 C 60 142, 120 150, 170 164 C 230 140, 300 146, 400 160 L400 248 L0 248 Z" fill={hills[1]} />

      {/* cypress + plantain trees */}
      {[[58, 150, 1], [76, 156, 0.8], [330, 152, 0.95], [348, 158, 0.75]].map(([x, y, s], i) => (
        <G key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <Path d="M0 0 C -7 -14, -6 -34, 0 -52 C 6 -34, 7 -14, 0 0 Z" fill={night ? '#151a36' : '#2F5A33'} />
          <Rect x={-0.8} y={0} width={1.6} height={6} fill={night ? '#151a36' : '#3B2A18'} />
        </G>
      ))}
      <G transform="translate(110 168)">
        <Path d="M0 0 L0 -26" stroke={night ? '#151a36' : '#3E6B34'} strokeWidth={2} />
        {[-60, -25, 20, 55].map((r) => (
          <Path key={r} d="M0 -26 C 6 -32, 18 -34, 24 -30 C 16 -27, 7 -26, 0 -26 Z" fill={night ? '#1b2142' : '#5C8C45'} transform={`rotate(${r} 0 -26)`} />
        ))}
      </G>

      {/* river */}
      <Path d="M0 196 C 80 184, 150 192, 210 188 C 280 184, 340 190, 400 186 L400 248 L0 248 Z" fill="url(#water)" />
      {[0, 1, 2].map((i) => (
        <Path key={i} d={`M${40 + i * 120} ${206 + i * 8} q 14 -4 28 0`} stroke={night ? '#8e9ad6' : '#E8F3EF'} strokeWidth={1} fill="none" opacity={0.7} />
      ))}

      {/* near bank */}
      <Path d="M0 226 C 70 214, 130 220, 190 230 C 260 240, 330 224, 400 230 L400 248 L0 248 Z" fill={hills[2]} />

      {/* lotuses + pads */}
      {[[150, 214], [236, 210], [290, 220]].map(([x, y], i) => (
        <G key={i} transform={`translate(${x} ${y})`}>
          <Ellipse cx={-10} cy={4} rx={9} ry={2.6} fill={night ? '#2c4a3c' : '#4C8448'} />
          <Ellipse cx={11} cy={5} rx={7} ry={2.2} fill={night ? '#2c4a3c' : '#4C8448'} />
          {[-34, 0, 34].map((r) => (
            <Path key={r} d="M0 0 C -3 -3, -3 -8, 0 -11 C 3 -8, 3 -3, 0 0 Z" fill={night ? '#e7a2bd' : '#F2A4BF'} stroke={night ? '#b56c88' : '#C4567A'} strokeWidth={0.5} transform={`rotate(${r})`} />
          ))}
        </G>
      ))}

      {/* birds */}
      {[[96, 70], [112, 62], [128, 74]].map(([x, y], i) => (
        <Path key={i} d={`M${x} ${y} q 5 -5 10 0 q 5 -5 10 0`} stroke={night ? '#d8d4f0' : '#6B3F22'} strokeWidth={1.3} fill="none" strokeLinecap="round" />
      ))}
    </Svg>
  );
}
