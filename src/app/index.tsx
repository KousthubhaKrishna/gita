import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArchImage } from '@/components/art/ArchImage';
import { Frame } from '@/components/art/Frame';
import { InstallButton } from '@/components/InstallButton';
import { NatureScene } from '@/components/art/NatureScene';
import { Ornament } from '@/components/art/Ornament';
import { Painting } from '@/components/art/Painting';
import { ProgressRing } from '@/components/art/ProgressRing';
import { Card } from '@/components/ui/Card';
import { Icon, IconButton } from '@/components/ui/IconButton';
import { LotusBud, SectionTitle } from '@/components/ui/SectionTitle';
import { Text } from '@/components/ui/Text';
import { CHAPTER_ART } from '@/data/art';
import { CHAPTERS, TOTAL_SLOKAS } from '@/data/chapters';
import { getChapterVerses, getVerse, verseOfTheDay } from '@/data';
import { verseLabel } from '@/lib/telugu';
import { chapterFraction, chapterReadCount, overallFraction, streak, useProgress } from '@/store/progress';
import { ChapterHues, Radius, Spacing, useTheme } from '@/theme';

export default function Home() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const read = useProgress((s) => s.read);
  const days = useProgress((s) => s.days);
  const last = useProgress((s) => s.last);

  const overall = overallFraction(read);
  const slokasRead = useMemo(() => {
    let n = 0;
    for (let c = 1; c <= 18; c++) for (const v of getChapterVerses(c)) if (read[v.id]) n += v.vs.length;
    return n;
  }, [read]);
  const ticks = useMemo(() => CHAPTERS.map((ch) => chapterFraction(read, ch.n)), [read]);
  const chaptersDone = ticks.filter((f) => f >= 1).length;
  const dayStreak = streak(days);
  const daily = useMemo(() => verseOfTheDay(), []);
  const lastVerse = last ? getVerse(last.c, last.v) : null;
  const heroH = Math.min(520, width * 1.05) + insets.top;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }} showsVerticalScrollIndicator={false}>
        {/* ───────── Hero painting ───────── */}
        <Painting art="upadesh" scrim="bottom" style={{ height: heroH }}>
          <View style={[styles.heroTop, { paddingTop: insets.top + Spacing.sm }]}>
            <InstallButton />
            <View style={styles.glass}>
              <IconButton name="settings" color="#FFF6E6" onPress={() => router.push('/settings')} label="అమరికలు" />
            </View>
          </View>
          <View style={styles.heroText}>
            <Text variant="label" color="#F2D28A" style={styles.shadow}>శ్రీమద్</Text>
            <Text variant="display" color="#FFF6E6" style={[styles.shadow, { fontSize: 46, lineHeight: 66 }]}>భగవద్గీత</Text>
            <Text variant="body" color="#F6E7C8" style={styles.shadow}>శ్రీకృష్ణార్జున సంవాదం · 18 అధ్యాయాలు · {TOTAL_SLOKAS} శ్లోకాలు</Text>
            <View style={{ marginTop: Spacing.sm }}>
              <Ornament color="#E9C46A" width={200} />
            </View>
          </View>
        </Painting>

        <View style={styles.content}>
          {/* ───────── Progress ───────── */}
          <Frame style={styles.progressFrame} padding={16}>
            <View style={styles.progressRow}>
              <ProgressRing value={overall} size={124} stroke={9} track={t.surfaceAlt} a={t.goldSoft} b={t.accent} ticks={ticks} tickColor={t.hairline}>
                <Text variant="numeral" color="text" style={{ fontSize: 26, lineHeight: 30, fontWeight: '700' }}>{Math.round(overall * 100)}%</Text>
                <Text variant="caption" color="textTertiary" style={{ fontSize: 12, lineHeight: 16 }}>పూర్తి</Text>
              </ProgressRing>
              <View style={{ flex: 1, gap: 10 }}>
                <Stat value={`${slokasRead}`} total={`/ ${TOTAL_SLOKAS}`} label="శ్లోకాలు చదివారు" color={t.accent} />
                <Stat value={`${chaptersDone}`} total="/ 18" label="అధ్యాయాలు పూర్తి" color={t.leaf} />
                <Stat value={`${dayStreak}`} total={dayStreak === 1 ? 'రోజు' : 'రోజులు'} label="వరుస పఠనం" color={t.lotus} />
              </View>
            </View>
          </Frame>

          {/* ───────── Continue ───────── */}
          {lastVerse && last && (
            <Card style={styles.continueCard} onPress={() => router.push({ pathname: '/read/[c]', params: { c: String(last.c), v: String(last.v) } })}>
              <ArchImage art={CHAPTER_ART[last.c - 1]} width={64} height={84} />
              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="label" color="accent">కొనసాగించండి</Text>
                <Text variant="subheading" numberOfLines={1}>{CHAPTERS[last.c - 1].te}</Text>
                <Text variant="caption" color="textSecondary">
                  శ్లోకం {verseLabel(lastVerse.c, lastVerse.vs)} · {chapterReadCount(read, last.c)}/{CHAPTERS[last.c - 1].cards} చదివారు
                </Text>
              </View>
              <View style={[styles.playBtn, { backgroundColor: t.accent }]}>
                <Icon name="chevron" color={t.accentText} size={20} strokeWidth={2.4} />
              </View>
            </Card>
          )}

          {/* ───────── Verse of the day ───────── */}
          <SectionTitle title="నేటి శ్లోకం" right={<Text variant="numeral" color="textTertiary">{verseLabel(daily.c, daily.vs)}</Text>} />
          <Card elevated={false} style={{ backgroundColor: 'transparent', borderWidth: 0 }} onPress={() => router.push({ pathname: '/read/[c]', params: { c: String(daily.c), v: String(daily.v) } })}>
            <Frame>
              <View style={{ alignItems: 'center', gap: 2 }}>
                {daily.te.map((l, i) => (
                  <Text key={i} variant="sloka" style={{ textAlign: 'center', fontSize: 20, lineHeight: 36 }}>{l}</Text>
                ))}
              </View>
              <View style={{ marginVertical: Spacing.md }}>
                <Ornament color={t.goldSoft} width={140} />
              </View>
              <Text variant="body" color="textSecondary" numberOfLines={4} style={{ textAlign: 'center' }}>{daily.tat}</Text>
              <Text variant="caption" color="accent" style={{ textAlign: 'center', marginTop: Spacing.sm }}>
                {CHAPTERS[daily.c - 1].te} · పూర్తిగా చదవండి →
              </Text>
            </Frame>
          </Card>

          {/* ───────── Chapters ───────── */}
          <SectionTitle title="అధ్యాయాలు" />
          <View style={{ gap: Spacing.md }}>
            {CHAPTERS.map((ch) => {
              const f = chapterFraction(read, ch.n);
              const done = chapterReadCount(read, ch.n);
              const hue = ChapterHues[ch.n - 1];
              return (
                <Card key={ch.n} style={styles.chapterCard} onPress={() => router.push({ pathname: '/chapter/[c]', params: { c: String(ch.n) } })}>
                  <ArchImage art={CHAPTER_ART[ch.n - 1]} width={74} height={98} />
                  <View style={{ flex: 1, gap: 3 }}>
                    <View style={styles.chapterMeta}>
                      <View style={[styles.numBadge, { backgroundColor: hue.b }]}>
                        <Text variant="numeral" color="#FFFFFF" style={{ fontSize: 13 }}>{ch.n}</Text>
                      </View>
                      <Text variant="caption" color="textTertiary" numberOfLines={1} style={{ flex: 1 }}>{ch.slokas} శ్లోకాలు</Text>
                      {f >= 1 && <Icon name="check" color={t.success} size={18} strokeWidth={2.4} />}
                    </View>
                    <Text variant="subheading" numberOfLines={1} style={{ fontSize: 18 }}>{ch.te}</Text>
                    <Text variant="caption" color="textSecondary" numberOfLines={2}>{ch.gist}</Text>
                    <View style={styles.barRow}>
                      <View style={[styles.bar, { backgroundColor: t.surfaceAlt }]}>
                        <View style={[styles.barFill, { width: `${Math.max(f * 100, f > 0 ? 4 : 0)}%`, backgroundColor: f >= 1 ? t.success : hue.b }]} />
                      </View>
                      <Text variant="numeral" color="textTertiary" style={{ fontSize: 13 }}>{done}/{ch.cards}</Text>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        </View>

        {/* ───────── Closing scene ───────── */}
        <View style={{ marginTop: Spacing.xl }}>
          <NatureScene width={width} night={t.name === 'dark'} />
          <View style={styles.closing}>
            <LotusBud color="#FFF1D6" size={20} />
            <Text variant="sloka" color="#FFF6E6" style={[styles.shadow, { textAlign: 'center', fontSize: 18, lineHeight: 32 }]}>
              యత్ర యోగేశ్వరః కృష్ణో యత్ర పార్థో ధనుర్ధరః ।{'\n'}తత్ర శ్రీర్విజయో భూతిః ధ్రువా నీతిర్మతిర్మమ ॥
            </Text>
            <Text variant="caption" color="#FFF1D6" style={styles.shadow}>— 18.78</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ value, total, label, color }: { value: string; total: string; label: string; color: string }) {
  return (
    <View style={styles.stat}>
      <View style={[styles.statDot, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Text variant="numeral" color="text" style={{ fontSize: 19, lineHeight: 24, fontWeight: '700' }}>
          {value} <Text variant="caption" color="textTertiary" style={{ fontSize: 13 }}>{total}</Text>
        </Text>
        <Text variant="caption" color="textSecondary" style={{ fontSize: 13, lineHeight: 19 }}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  glass: { borderRadius: 22, backgroundColor: 'rgba(20,12,4,0.35)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,240,210,0.4)' },
  heroText: { position: 'absolute', left: 0, right: 0, bottom: 64, alignItems: 'center', paddingHorizontal: Spacing.lg },
  shadow: { textShadowColor: 'rgba(0,0,0,0.55)', textShadowRadius: 8, textShadowOffset: { width: 0, height: 1 }, textAlign: 'center' },
  content: { paddingHorizontal: Spacing.md, gap: Spacing.md, marginTop: -44 },
  progressFrame: {},
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statDot: { width: 8, height: 28, borderRadius: 4 },
  continueCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md },
  playBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  chapterCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: 12, borderRadius: Radius.lg },
  chapterMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  numBadge: { minWidth: 26, height: 26, borderRadius: 13, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: 4 },
  bar: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: 6, borderRadius: 3 },
  closing: { position: 'absolute', left: 0, right: 0, top: Spacing.lg, alignItems: 'center', paddingHorizontal: Spacing.lg, gap: 4 },
});
