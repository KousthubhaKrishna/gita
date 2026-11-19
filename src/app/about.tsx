import { router } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Lotus } from '@/components/art/Lotus';
import { IconButton } from '@/components/ui/IconButton';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { ArtKey, DEVOTIONAL, MINIATURE } from '@/data/art';
import { ChapterHues, Radius, Spacing, useTheme } from '@/theme';
import { Image } from 'expo-image';

const SOURCES = [
  {
    title: 'శ్లోకాలు, ప్రతిపదార్థం, తాత్పర్యం, వ్యాఖ్యానం',
    by: 'స్వామి ముకుందానంద — holy-bhagavad-gita.org (తెలుగు), gita-api.vercel.app ద్వారా',
    url: 'https://www.holy-bhagavad-gita.org/',
    note: 'కాపీరైట్ రచయితలది. వ్యక్తిగత పఠనం కోసం మాత్రమే.',
  },
  {
    title: 'రెండవ తెలుగు అనువాదం',
    by: 'పరమపూజ్య స్వామిని శారదాప్రియానంద (చిన్మయ మిషన్) — te.wikisource.org',
    url: 'https://te.wikisource.org/wiki/భగవద్గీత_-_తెలుగు_అనువాదము',
    note: 'CC BY-SA 4.0',
  },
  {
    title: 'దేవనాగరి పాఠం, IAST, ఆంగ్ల అనువాదం',
    by: 'github.com/nvkudva/Bhagavad-Geeta సంకలనం (స్వామి శివానంద అనువాదం ఆధారంగా)',
    url: 'https://github.com/nvkudva/Bhagavad-Geeta',
    note: '',
  },
  {
    title: 'అక్షరాలు',
    by: 'Noto Serif Telugu, Noto Sans Telugu (Google / Noto project)',
    url: 'https://fonts.google.com/noto/specimen/Noto+Serif+Telugu',
    note: 'SIL Open Font License 1.1',
  },
];

export default function About() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const hue = ChapterHues[9];
  return (
    <Screen top={false}>
      <View style={[styles.header, { paddingTop: Spacing.md }]}>
        <Text variant="heading">మూలాలు & కృతజ్ఞతలు</Text>
        <IconButton name="close" onPress={() => router.back()} label="మూసివేయి" />
      </View>
      <ScrollView contentContainerStyle={{ padding: Spacing.md, paddingBottom: insets.bottom + Spacing.xl, gap: Spacing.md }}>
        <View style={{ alignItems: 'center', marginVertical: Spacing.md }}>
          <Lotus size={160} a={hue.a} b={hue.b} />
          <Text variant="body" color="textSecondary" style={{ textAlign: 'center', marginTop: Spacing.sm }}>
            ఈ యాప్ పూర్తిగా ఆఫ్‌లైన్‌లో పనిచేస్తుంది. 700 శ్లోకాలు, ప్రతిపదార్థం, రెండు తెలుగు అనువాదాలు, వ్యాఖ్యానం — అన్నీ యాప్‌లోనే ఉన్నాయి.
          </Text>
        </View>
        {SOURCES.map((s) => (
          <Pressable key={s.title} disabled={!s.url} onPress={() => Linking.openURL(s.url)} style={[styles.card, { backgroundColor: t.surface, borderColor: t.hairline }]}>
            <Text variant="subheading">{s.title}</Text>
            <Text variant="body" color="textSecondary">{s.by}</Text>
            {!!s.note && <Text variant="caption" color="accent">{s.note}</Text>}
          </Pressable>
        ))}
        <Text variant="heading" style={{ marginTop: Spacing.md }}>చిత్రాలు</Text>
        <Text variant="body" color="textSecondary">
          అమరికలలో రెండు శైలులు ఎంచుకోవచ్చు: పబ్లిక్ డొమైన్ / CC0 భారతీయ సూక్ష్మ చిత్రకళ, లేదా వికీమీడియా కామన్స్ నుండి ఛాయాచిత్రాలు మరియు రవివర్మ చిత్రాలు. ప్రకృతి దృశ్యం, కమలం, మండలం, అధ్యాయ చిహ్నాలు కోడ్‌తో గీయబడ్డాయి.
        </Text>
        <Text variant="subheading" color="gold">సూక్ష్మ చిత్రకళ (శాస్త్రీయ శైలి)</Text>
        {(Object.keys(MINIATURE) as ArtKey[]).map((k) => (
          <View key={k} style={[styles.card, styles.artRow, { backgroundColor: t.surface, borderColor: t.hairline }]}>
            <Image source={MINIATURE[k].src} style={styles.thumb} contentFit="cover" />
            <View style={{ flex: 1, gap: 2 }}>
              <Text variant="subheading">{MINIATURE[k].title}</Text>
              <Text variant="caption" color="textSecondary">{MINIATURE[k].credit}</Text>
            </View>
          </View>
        ))}
        <Text variant="subheading" color="gold" style={{ marginTop: Spacing.md }}>ఛాయాచిత్రాలు & రవివర్మ చిత్రాలు</Text>
        {(Object.keys(DEVOTIONAL) as ArtKey[]).map((k) => (
          <View key={k} style={[styles.card, styles.artRow, { backgroundColor: t.surface, borderColor: t.hairline }]}>
            <Image source={DEVOTIONAL[k].src} style={styles.thumb} contentFit="cover" />
            <View style={{ flex: 1, gap: 2 }}>
              <Text variant="subheading">{DEVOTIONAL[k].title}</Text>
              <Text variant="caption" color="textSecondary">{DEVOTIONAL[k].credit}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: Spacing.md, paddingRight: Spacing.sm },
  card: { borderRadius: Radius.md, borderWidth: StyleSheet.hairlineWidth, padding: Spacing.md, gap: 4 },
  artRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  thumb: { width: 48, height: 64, borderRadius: 8 },
});
