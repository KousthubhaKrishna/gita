import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

/** Thin section divider: hairline — small lotus bud — hairline. */
export function Ornament({ color, width = 160 }: { color: string; width?: number }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={width} height={16} viewBox={`0 0 ${width} 16`}>
        <Line x1={0} y1={8} x2={width / 2 - 16} y2={8} stroke={color} strokeWidth={0.8} />
        <Line x1={width / 2 + 16} y1={8} x2={width} y2={8} stroke={color} strokeWidth={0.8} />
        <Path
          d={`M${width / 2} 2 C ${width / 2 + 4} 5, ${width / 2 + 4} 11, ${width / 2} 14 C ${width / 2 - 4} 11, ${width / 2 - 4} 5, ${width / 2} 2 Z`}
          stroke={color}
          strokeWidth={0.9}
          fill="none"
        />
        <Circle cx={width / 2 - 9} cy={8} r={1.2} fill={color} />
        <Circle cx={width / 2 + 9} cy={8} r={1.2} fill={color} />
      </Svg>
    </View>
  );
}
