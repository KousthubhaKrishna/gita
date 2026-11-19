import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Icon, IconButton } from '@/components/ui/IconButton';
import { ART_SETS, ArtStyle } from '@/data/art';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { useProgress } from '@/store/progress';
import { FONT_SCALES, ThemePref, useSettings } from '@/store/settings';
import { Radius, serif, Spacing, TextWeight, useTheme, WEIGHT_STEP } from '@/theme';

export default function Settings() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const s = useSettings();
  const reset = useProgress((p) => p.reset);
  const scaleIdx = Math.max(0, FONT_SCALES.findIndex((x) => Math.abs(x - s.fontScale) < 0.01));

  return (
    <Screen top={false}>
      <View style={[styles.header, { paddingTop: Spacing.md }]}>
        <Text variant="heading">అమరికలు</Text>
        <IconButton name="close" onPress={() => router.back()} label="మూసివేయి" />
      </View>
      <ScrollView contentContainerStyle={{ padding: Spacing.md, paddingBottom: insets.bottom + Spacing.xl, gap: Spacing.lg }}>
        <Group title="అక్షర పరిమాణం">
          <View style={[styles.preview, { backgroundColor: t.surfaceAlt }]}>
            <Text variant="sloka" style={{ textAlign: 'center' }}>యోగస్థః కురు కర్మాణి</Text>
          </View>
          <View style={styles.stepper}>
            <Pressable disabled={scaleIdx === 0} onPress={() => s.set({ fontScale: FONT_SCALES[scaleIdx - 1] })} style={[styles.stepBtn, { backgroundColor: t.surfaceAlt, opacity: scaleIdx === 0 ? 0.4 : 1 }]}>
              <Text variant="heading" scaled={false}>అ−</Text>
            </Pressable>
            <View style={styles.dots}>
              {FONT_SCALES.map((_, i) => (
                <View key={i} style={[styles.dot, { backgroundColor: i <= scaleIdx ? t.accent : t.surfaceAlt }]} />
              ))}
            </View>
            <Pressable disabled={scaleIdx === FONT_SCALES.length - 1} onPress={() => s.set({ fontScale: FONT_SCALES[scaleIdx + 1] })} style={[styles.stepBtn, { backgroundColor: t.surfaceAlt, opacity: scaleIdx === FONT_SCALES.length - 1 ? 0.4 : 1 }]}>
              <Text variant="heading" scaled={false}>అ+</Text>
            </Pressable>
          </View>
        </Group>

        <Group title="అక్షర మందం">
          <View style={styles.segment}>
            {([
              ['regular', 'సన్నగా'],
              ['medium', 'మధ్యస్థం'],
              ['bold', 'దళసరిగా'],
            ] as [TextWeight, string][]).map(([w, label]) => {
              const on = (s.textWeight ?? 'medium') === w;
              return (
                <Pressable key={w} onPress={() => s.set({ textWeight: w })} style={[styles.weightBtn, { backgroundColor: on ? t.accent : t.surfaceAlt }]}>
                  <Text variant="sloka" scaled={false} color={on ? t.accentText : 'text'} style={{ fontFamily: serif(WEIGHT_STEP[w]), fontSize: 20, lineHeight: 32 }}>కర్మ</Text>
                  <Text variant="caption" color={on ? t.accentText : 'textSecondary'} style={{ fontSize: 13, lineHeight: 18 }}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
        </Group>

        <Group title="చిత్రాల శైలి">
          <View style={styles.artRow}>
            {([
              ['miniature', 'సూక్ష్మ చిత్రకళ', 'శాస్త్రీయ భారతీయ పెయింటింగ్స్'],
              ['devotional', 'ఛాయాచిత్రాలు', 'క్షేత్రాలు, దేవతా మూర్తులు, రవివర్మ చిత్రాలు'],
            ] as [ArtStyle, string, string][]).map(([key, label, sub]) => {
              const on = s.artStyle === key;
              return (
                <Pressable key={key} onPress={() => s.set({ artStyle: key })} style={[styles.artOption, { borderColor: on ? t.accent : t.hairline, backgroundColor: on ? t.accentSoft : t.surfaceAlt }]}>
                  <Image source={ART_SETS[key].upadesh.src} contentFit="cover" contentPosition={ART_SETS[key].upadesh.focus} style={styles.artPreview} />
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <View style={[styles.radio, { borderColor: on ? t.accent : t.textTertiary }]}>{on && <View style={[styles.radioDot, { backgroundColor: t.accent }]} />}</View>
                    <Text variant="subheading" style={{ fontSize: 15, lineHeight: 24 }}>{label}</Text>
                  </View>
                  <Text variant="caption" color="textSecondary" style={{ fontSize: 12, lineHeight: 18 }}>{sub}</Text>
                </Pressable>
              );
            })}
          </View>
        </Group>

        <Group title="రూపం">
          <View style={styles.segment}>
            {(['system', 'light', 'dark'] as ThemePref[]).map((m) => (
              <Pressable key={m} onPress={() => s.set({ theme: m })} style={[styles.segBtn, { backgroundColor: s.theme === m ? t.accent : t.surfaceAlt }]}>
                <Text variant="caption" color={s.theme === m ? t.accentText : 'textSecondary'} style={{ fontSize: 13 }}>
                  {m === 'system' ? 'పరికరం' : m === 'light' ? 'వెలుగు' : 'చీకటి'}
                </Text>
              </Pressable>
            ))}
          </View>
        </Group>

        <Group title="శ్లోకంతో పాటు చూపించు">
          <Row label="దేవనాగరి లిపి" value={s.showDevanagari} onChange={(v) => s.set({ showDevanagari: v })} />
          <Row label="రోమన్ లిప్యంతరీకరణ (IAST)" value={s.showTransliteration} onChange={(v) => s.set({ showTransliteration: v })} />
          <Row label="రెండవ తెలుగు అనువాదం" value={s.showSecondTranslation} onChange={(v) => s.set({ showSecondTranslation: v })} />
          <Row label="ఆంగ్ల అనువాదం" value={s.showEnglish} onChange={(v) => s.set({ showEnglish: v })} last />
        </Group>

        <Group title="ఇతరం">
          <Pressable onPress={() => router.push('/about')} style={styles.linkRow}>
            <Icon name="info" color={t.textSecondary} />
            <Text variant="body" style={{ flex: 1 }}>మూలాలు & కృతజ్ఞతలు</Text>
            <Icon name="chevron" color={t.textTertiary} size={18} />
          </Pressable>
          <Pressable
            onPress={() =>
              Alert.alert('పురోగతిని తొలగించాలా?', 'చదివిన శ్లోకాలు, బుక్‌మార్క్‌లు, ధార — అన్నీ తొలగించబడతాయి.', [
                { text: 'వద్దు', style: 'cancel' },
                { text: 'తొలగించు', style: 'destructive', onPress: reset },
              ])
            }
            style={styles.linkRow}>
            <Icon name="close" color="#C0392B" />
            <Text variant="body" color="#C0392B">పఠన పురోగతిని తొలగించు</Text>
          </Pressable>
        </Group>
      </ScrollView>
    </Screen>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View style={{ gap: Spacing.sm }}>
      <Text variant="label" color="textTertiary" style={{ marginLeft: Spacing.xs }}>{title}</Text>
      <View style={[styles.group, { backgroundColor: t.surface, borderColor: t.hairline }]}>{children}</View>
    </View>
  );
}

function Row({ label, value, onChange, last }: { label: string; value: boolean; onChange: (v: boolean) => void; last?: boolean }) {
  const t = useTheme();
  return (
    <View style={[styles.row, !last && { borderBottomColor: t.hairline, borderBottomWidth: StyleSheet.hairlineWidth }]}>
      <Text variant="body" style={{ flex: 1 }}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: t.accent }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: Spacing.md, paddingRight: Spacing.sm },
  group: { borderRadius: Radius.md, borderWidth: StyleSheet.hairlineWidth, padding: Spacing.md, gap: Spacing.sm },
  preview: { borderRadius: Radius.sm, padding: Spacing.md },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.md },
  stepBtn: { width: 56, height: 44, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  dots: { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  segment: { flexDirection: 'row', gap: Spacing.sm },
  weightBtn: { flex: 1, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  segBtn: { flex: 1, height: 40, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, gap: Spacing.md },
  artRow: { flexDirection: 'row', gap: Spacing.sm },
  artOption: { flex: 1, borderWidth: 2, borderRadius: Radius.md, padding: 8, gap: 4 },
  artPreview: { width: '100%', aspectRatio: 0.85, borderRadius: Radius.sm },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 8, height: 8, borderRadius: 4 },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.sm },
});
