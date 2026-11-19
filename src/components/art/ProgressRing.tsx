import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import Svg, { Circle, Defs, G, Line, LinearGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  size?: number;
  stroke?: number;
  /** 0..1 */
  value: number;
  track: string;
  a: string;
  b: string;
  /** 18 chapter fractions, drawn as tick marks around the ring */
  ticks?: number[];
  tickColor?: string;
  children?: React.ReactNode;
};

/** Ring with 18 petal ticks — one per chapter — and an animated arc for overall progress. */
export function ProgressRing({ size = 160, stroke = 10, value, track, a, b, ticks, tickColor, children }: Props) {
  const r = (size - stroke) / 2 - (ticks ? 10 : 0);
  const C = 2 * Math.PI * r;
  const p = useSharedValue(0);
  useEffect(() => {
    p.set(withTiming(value, { duration: 900, easing: Easing.out(Easing.cubic) }));
  }, [value, p]);
  const props = useAnimatedProps(() => ({ strokeDashoffset: C * (1 - p.value) }));
  const cx = size / 2;
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={a} />
            <Stop offset="1" stopColor={b} />
          </LinearGradient>
        </Defs>
        <Circle cx={cx} cy={cx} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={cx}
          cy={cx}
          r={r}
          stroke="url(#ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${C} ${C}`}
          animatedProps={props}
          transform={`rotate(-90 ${cx} ${cx})`}
        />
        {ticks && (
          <G>
            {ticks.map((t, i) => {
              const ang = (i / ticks.length) * 2 * Math.PI - Math.PI / 2;
              const r1 = r + stroke / 2 + 4;
              const r2 = r1 + (t >= 1 ? 6 : 3.5);
              return (
                <Line
                  key={i}
                  x1={cx + r1 * Math.cos(ang)}
                  y1={cx + r1 * Math.sin(ang)}
                  x2={cx + r2 * Math.cos(ang)}
                  y2={cx + r2 * Math.sin(ang)}
                  stroke={t >= 1 ? b : tickColor ?? track}
                  strokeWidth={t >= 1 ? 2.5 : 1.5}
                  strokeLinecap="round"
                  opacity={t > 0 ? 1 : 0.6}
                />
              );
            })}
          </G>
        )}
      </Svg>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.center}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ center: { flex: 1, alignItems: 'center', justifyContent: 'center' } });
