import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Emblem } from '@/components/art/Emblem';
import { Frame } from '@/components/art/Frame';
import { Ornament } from '@/components/art/Ornament';
import { Painting } from '@/components/art/Painting';
import { Card } from '@/components/ui/Card';
import { Icon, IconButton } from '@/components/ui/IconButton';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Text } from '@/components/ui/Text';
import { CHAPTER_ART } from '@/data/art';
import { useArt } from '@/hooks/use-art';
import { CHAPTERS } from '@/data/chapters';
import { getChapterVerses } from '@/data';
import { slokaLabel } from '@/lib/telugu';
import { chapterReadCount, useProgress } from '@/store/progress';
import { ChapterHues, Radius, Spacing, useTheme } from '@/theme';

export default function ChapterScreen() {
  const { c: cParam } = useLocalSearchParams<{ c: string }>();
  const c = Math.min(18, Math.max(1, Number(cParam) || 1));
  const ch = CHAPTERS[c - 1];
  const hue = ChapterHues[c - 1];
  const art = CHAPTER_ART[c - 1];
  const artInfo = useArt(art);
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const read = useProgress((s) => s.read);
  const last = useProgress((s) => s.last);
  const verses = useMemo(() => getChapterVerses(c), [c]);
  const done = chapterReadCount(read, c);
  const firstUnread = verses.find((v) => !read[v.id]);
  const resumeV = last?.c === c ? last.v : (firstUnread?.v ?? verses[0].v);
  const heroH = Math.min(460, width * 0.95) + insets.top;
  const cols = Math.max(5, Math.floor((width - Spacing.md * 2 + 10) / 62));
  const cell = (width - Spacing.md * 2 - (cols - 1) * 10) / cols;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xxl }} showsVerticalScrollIndicator={false}>
        <Painting art={art} scrim="bottom" style={{ height: heroH }}>
          <View style={[styles.topBar, { paddingTop: insets.top + Spacing.xs }]}>
            <View style={styles.glass}>
              <IconButton name="back" color="#FFF6E6" onPress={() => router.back()} label="వెనుకకు" />
            </View>
          </View>
          <View style={styles.heroText}>
            <View style={styles.chapterPill}>
              <Emblem name={ch.emblem} chapter={c} size={22} variant="line" color="#F2D28A" />
              <Text variant="label" color="#F2D28A">అధ్యాయం {c}</Text>
            </View>
            <Text variant="title" color="#FFF6E6" style={[styles.shadow, { fontSize: 32, lineHeight: 50 }]}>{ch.te}</Text>
            <Text variant="caption" color="#F3E2C0" style={styles.shadow}>{ch.sa} · {ch.slokas} శ్లోకాలు</Text>
          </View>
        </Painting>

        <View style={styles.content}>
          <Frame style={{ marginTop: -36 }}>
            <Text variant="bodyLg" style={{ textAlign: 'center' }}>{ch.gist}</Text>
            <View style={{ marginTop: Spacing.md }}>
              <Ornament color={t.goldSoft} width={120} />
            </View>
            <Text variant="caption" color="textTertiary" style={{ textAlign: 'center', marginTop: Spacing.xs, fontSize: 12, lineHeight: 18 }}>
              చిత్రం: {artInfo.title}
            </Text>
          </Frame>

          <Card elevated={false} style={{ borderWidth: 0, backgroundColor: 'transparent' }} onPress={() => router.push({ pathname: '/read/[c]', params: { c: String(c), v: String(resumeV) } })}>
            <LinearGradient colors={[t.accent, t.accentDeep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cta}>
              <View style={{ flex: 1 }}>
                <Text variant="subheading" color="#FFF8EC" style={{ fontSize: 18 }}>
                  {done === 0 ? 'పఠనం ప్రారంభించండి' : done >= ch.cards ? 'మళ్ళీ చదవండి' : 'పఠనం కొనసాగించండి'}
                </Text>
                <Text variant="caption" color="#FFE9CC">శ్లోకం {resumeV} నుండి · {done}/{ch.cards} పూర్తి</Text>
              </View>
              <View style={styles.ctaIcon}>
                <Icon name="chevron" color="#FFF8EC" size={22} strokeWidth={2.4} />
              </View>
            </LinearGradient>
          </Card>

          <SectionTitle title="శ్లోకాలు" right={<Text variant="numeral" color="textTertiary">{done}/{verses.length}</Text>} />
          <View style={styles.grid}>
            {verses.map((v) => {
              const isRead = !!read[v.id];
              const isLast = last?.id === v.id;
              const wide = v.vs.length > 1;
              return (
                <Pressable
                  key={v.id}
                  onPress={() => router.push({ pathname: '/read/[c]', params: { c: String(c), v: String(v.v) } })}
                  style={({ pressed }) => [
                    styles.cell,
                    {
                      width: wide ? cell * 2 + 10 : cell,
                      height: cell * 0.86,
                      backgroundColor: isRead ? hue.b : t.surface,
                      borderColor: isLast ? t.accent : isRead ? hue.b : t.goldSoft,
                      borderWidth: isLast ? 2 : 1,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}>
                  <Text variant="numeral" color={isRead ? '#FFFFFF' : 'text'} style={{ fontSize: 16 }}>{slokaLabel(v.vs)}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.legend}>
            <LegendDot color={hue.b} label="చదివినవి" />
            <LegendDot color={t.surface} border={t.goldSoft} label="మిగిలినవి" />
            <LegendDot color={t.surface} border={t.accent} label="చివరిసారి" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function LegendDot({ color, border, label }: { color: string; border?: string; label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <View style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: color, borderWidth: border ? 1.5 : 0, borderColor: border }} />
      <Text variant="caption" color="textSecondary" style={{ fontSize: 13 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { paddingHorizontal: Spacing.md, flexDirection: 'row' },
  glass: { borderRadius: 22, backgroundColor: 'rgba(20,12,4,0.38)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,240,210,0.4)' },
  heroText: { position: 'absolute', left: 0, right: 0, bottom: 56, alignItems: 'center', paddingHorizontal: Spacing.lg, gap: 2 },
  chapterPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 4, borderRadius: Radius.pill, backgroundColor: 'rgba(20,12,4,0.4)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(242,210,138,0.6)' },
  shadow: { textShadowColor: 'rgba(0,0,0,0.6)', textShadowRadius: 8, textShadowOffset: { width: 0, height: 1 }, textAlign: 'center' },
  content: { paddingHorizontal: Spacing.md, gap: Spacing.md },
  cta: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, paddingLeft: Spacing.lg, borderRadius: Radius.lg },
  ctaIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  cell: { borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  legend: { flexDirection: 'row', gap: Spacing.md, flexWrap: 'wrap', marginTop: Spacing.xs },
});
