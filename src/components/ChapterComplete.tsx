import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Frame } from '@/components/art/Frame';
import { Painting } from '@/components/art/Painting';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/IconButton';
import { Text } from '@/components/ui/Text';
import { CHAPTER_ART } from '@/data/art';
import { CHAPTERS } from '@/data/chapters';
import { chapterReadCount, useProgress } from '@/store/progress';
import { Radius, Spacing, useTheme } from '@/theme';

/** Final page of the reader: chapter summary + the next chapter's painting. */
export function ChapterComplete({ chapter, bottomInset }: { chapter: number; bottomInset: number }) {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const read = useProgress((s) => s.read);
  const ch = CHAPTERS[chapter - 1];
  const next = chapter < 18 ? CHAPTERS[chapter] : null;
  const done = chapterReadCount(read, chapter);

  return (
    <ScrollView contentContainerStyle={{ padding: Spacing.md, paddingBottom: bottomInset, gap: Spacing.lg }}>
      <Frame>
        <View style={{ alignItems: 'center', gap: 6 }}>
          <Text variant="label" color="gold">ఇతి శ్రీమద్భగవద్గీతాసు</Text>
          <Text variant="title" style={{ textAlign: 'center' }}>{ch.te} సమాప్తం</Text>
          <Text variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
            ఈ అధ్యాయంలో {done}/{ch.cards} శ్లోకాలు చదివారు.
          </Text>
        </View>
      </Frame>

      {next ? (
        <Card style={{ overflow: 'hidden', padding: 0 }} onPress={() => router.replace({ pathname: '/read/[c]', params: { c: String(next.n), v: '1' } })}>
          <Painting art={CHAPTER_ART[next.n - 1]} scrim="bottom" style={{ height: Math.min(300, width * 0.7), borderTopLeftRadius: Radius.lg, borderTopRightRadius: Radius.lg }}>
            <View style={styles.nextText}>
              <Text variant="label" color="#F2D28A">తదుపరి · అధ్యాయం {next.n}</Text>
              <Text variant="title" color="#FFF6E6" style={styles.shadow}>{next.te}</Text>
            </View>
          </Painting>
          <View style={styles.nextRow}>
            <Text variant="body" color="textSecondary" style={{ flex: 1 }} numberOfLines={2}>{next.gist}</Text>
            <View style={[styles.go, { backgroundColor: t.accent }]}>
              <Icon name="chevron" color={t.accentText} size={20} strokeWidth={2.4} />
            </View>
          </View>
        </Card>
      ) : (
        <Frame>
          <Text variant="sloka" style={{ textAlign: 'center' }}>ఓం తత్ సత్</Text>
          <Text variant="body" color="textSecondary" style={{ textAlign: 'center', marginTop: Spacing.sm }}>
            శ్రీమద్భగవద్గీత సంపూర్ణం. హరిః ఓం.
          </Text>
        </Frame>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  nextText: { position: 'absolute', left: Spacing.md, right: Spacing.md, bottom: Spacing.md },
  shadow: { textShadowColor: 'rgba(0,0,0,0.6)', textShadowRadius: 8, textShadowOffset: { width: 0, height: 1 } },
  nextRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md },
  go: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});
