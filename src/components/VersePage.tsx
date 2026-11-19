import React, { useState } from 'react';
import { LayoutAnimation, Platform, Pressable, ScrollView, StyleSheet, UIManager, View } from 'react-native';
import { Frame } from '@/components/art/Frame';
import { Ornament } from '@/components/art/Ornament';
import { Icon } from '@/components/ui/IconButton';
import { LotusBud } from '@/components/ui/SectionTitle';
import { Text } from '@/components/ui/Text';
import { getPurport, Verse } from '@/data';
import { verseLabel } from '@/lib/telugu';
import { useSettings } from '@/store/settings';
import { ChapterHues, Radius, Spacing, useTheme } from '@/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = { verse: Verse; chapter: number; bottomInset: number };

function Heading({ title, color }: { title: string; color: string }) {
  const t = useTheme();
  return (
    <View style={styles.heading}>
      <LotusBud color={color} size={18} />
      <Text variant="heading" style={{ fontSize: 18 }}>{title}</Text>
      <View style={[styles.headingLine, { backgroundColor: t.goldSoft }]} />
    </View>
  );
}

/** One verse: sloka → ప్రతిపదార్థం → తాత్పర్యం → వ్యాఖ్యానం. */
export function VersePage({ verse, chapter, bottomInset }: Props) {
  const t = useTheme();
  const hue = ChapterHues[chapter - 1];
  const { showDevanagari, showTransliteration, showSecondTranslation, showEnglish } = useSettings();
  const [open, setOpen] = useState(false);
  const purport = open ? getPurport(chapter, verse.id) : [];

  return (
    <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]} showsVerticalScrollIndicator={false}>
      {/* Sloka */}
      <Frame padding={22}>
        <View style={styles.slokaBlock}>
          <View style={[styles.medal, { backgroundColor: hue.b }]}>
            <Text variant="numeral" color="#FFFFFF" style={{ fontSize: 14 }}>శ్లోకం {verseLabel(verse.c, verse.vs)}</Text>
          </View>
          {verse.sp && (
            <Text variant="subheading" color="accent" style={{ textAlign: 'center', marginBottom: Spacing.xs }}>
              {verse.sp}
            </Text>
          )}
          {verse.te.map((line, i) => (
            <Text key={i} variant="sloka" style={styles.slokaLine}>{line}</Text>
          ))}
          {(showDevanagari || showTransliteration) && <View style={{ height: Spacing.sm }} />}
          {showDevanagari && !!verse.sa && (
            <Text variant="body" face="system" color="textSecondary" style={styles.alt}>{verse.sa}</Text>
          )}
          {showTransliteration && !!verse.tr && (
            <Text variant="caption" face="system" color="textSecondary" style={[styles.alt, { fontStyle: 'italic' }]}>{verse.tr}</Text>
          )}
        </View>
      </Frame>

      {/* Word by word */}
      {verse.words.length > 0 && (
        <View style={styles.section}>
          <Heading title="ప్రతిపదార్థం" color={hue.b} />
          <View style={[styles.wordTable, { borderColor: t.goldSoft, backgroundColor: t.surface }]}>
            {verse.words.map(([w, m], i) => (
              <View key={i} style={[styles.wordRow, { backgroundColor: i % 2 ? t.bgElevated : t.surface }]}>
                <Text variant="body" face="serif" color={t.name === 'dark' ? hue.a : hue.b} style={styles.word}>{w}</Text>
                <View style={[styles.wordSep, { backgroundColor: t.goldSoft }]} />
                <Text variant="body" style={styles.meaning}>{m}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Translation */}
      <View style={styles.section}>
        <Heading title="తాత్పర్యం" color={hue.b} />
        <View style={[styles.tatCard, { backgroundColor: t.surface, borderLeftColor: hue.b, borderColor: t.hairline }]}>
          <Text variant="bodyLg">{verse.tat}</Text>
        </View>
        {showSecondTranslation && !!verse.tat2 && (
          <View style={[styles.quote, { borderColor: t.hairline, backgroundColor: t.surfaceAlt }]}>
            <Text variant="body" color="textSecondary">{verse.tat2}</Text>
            <Text variant="caption" color="textTertiary" style={{ marginTop: 6, fontSize: 13 }}>— స్వామిని శారదాప్రియానంద</Text>
          </View>
        )}
        {showEnglish && !!verse.en && (
          <Text variant="body" face="system" color="textSecondary" style={{ fontStyle: 'italic' }}>{verse.en}</Text>
        )}
      </View>

      {/* Commentary */}
      <View style={styles.section}>
        <Pressable
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setOpen((o) => !o);
          }}
          style={({ pressed }) => [styles.disclosure, { backgroundColor: t.surface, borderColor: t.goldSoft, opacity: pressed ? 0.85 : 1 }]}>
          <LotusBud color={t.gold} size={18} />
          <Text variant="subheading" style={{ flex: 1 }}>వ్యాఖ్యానం</Text>
          <Text variant="caption" color="textTertiary" style={{ fontSize: 13 }}>{open ? 'మూసివేయి' : 'చదవండి'}</Text>
          <View style={{ transform: [{ rotate: open ? '90deg' : '0deg' }] }}>
            <Icon name="chevron" color={t.textTertiary} size={18} />
          </View>
        </Pressable>
        {open && (
          <View style={{ gap: Spacing.md, paddingTop: Spacing.sm, paddingHorizontal: 4 }}>
            {purport.length === 0 && <Text variant="body" color="textTertiary">ఈ శ్లోకానికి వ్యాఖ్యానం లేదు.</Text>}
            {purport.map((p, i) => (
              <Text key={i} variant="body">{p}</Text>
            ))}
            {purport.length > 0 && <Text variant="caption" color="textTertiary">— స్వామి ముకుందానంద</Text>}
          </View>
        )}
      </View>

      <Ornament color={t.goldSoft} width={160} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, gap: Spacing.lg },
  slokaBlock: { alignItems: 'center', gap: 2 },
  medal: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: Radius.pill, marginBottom: Spacing.md },
  slokaLine: { textAlign: 'center' },
  alt: { textAlign: 'center', marginTop: Spacing.xs },
  section: { gap: Spacing.sm },
  heading: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  headingLine: { flex: 1, height: 1, opacity: 0.7 },
  wordTable: { borderRadius: Radius.md, borderWidth: 1, overflow: 'hidden' },
  wordRow: { flexDirection: 'row', alignItems: 'stretch', paddingHorizontal: Spacing.md, paddingVertical: 10, gap: Spacing.sm },
  word: { width: '36%' },
  wordSep: { width: 1, opacity: 0.6 },
  meaning: { flex: 1 },
  tatCard: { borderLeftWidth: 4, borderWidth: StyleSheet.hairlineWidth, borderRadius: Radius.md, padding: Spacing.md },
  quote: { borderWidth: StyleSheet.hairlineWidth, borderRadius: Radius.md, padding: Spacing.md },
  disclosure: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.md, borderRadius: Radius.md, borderWidth: 1 },
});
