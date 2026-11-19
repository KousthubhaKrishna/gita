import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArchImage } from '@/components/art/ArchImage';
import { ChapterComplete } from '@/components/ChapterComplete';
import { VersePage } from '@/components/VersePage';
import { Icon, IconButton } from '@/components/ui/IconButton';
import { Text } from '@/components/ui/Text';
import { CHAPTER_ART } from '@/data/art';
import { CHAPTERS } from '@/data/chapters';
import { getChapterVerses, indexOfSloka, Verse } from '@/data';
import { verseLabel } from '@/lib/telugu';
import { useProgress } from '@/store/progress';
import { ChapterHues, Radius, Spacing, useTheme } from '@/theme';

type ViewToken<T> = { item: T; index?: number | null; isViewable: boolean };
type Page = Verse | { end: true; id: string };

/** How long a verse must be on screen before it counts as read. */
const DWELL_MS = 4000;
const VIEWABILITY = { itemVisiblePercentThreshold: 60 };

export default function Reader() {
  const { c: cParam, v: vParam } = useLocalSearchParams<{ c: string; v?: string }>();
  const c = Math.min(18, Math.max(1, Number(cParam) || 1));
  const ch = CHAPTERS[c - 1];
  const hue = ChapterHues[c - 1];
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const verses = useMemo(() => getChapterVerses(c), [c]);
  const pages = useMemo<Page[]>(() => [...verses, { end: true, id: 'end' }], [verses]);
  const initial = useMemo(() => indexOfSloka(c, Number(vParam) || 1), [c, vParam]);
  const [index, setIndex] = useState(initial);
  const listRef = useRef<FlatList<Page>>(null);

  const read = useProgress((s) => s.read);
  const bookmarks = useProgress((s) => s.bookmarks);
  const markRead = useProgress((s) => s.markRead);
  const unmarkRead = useProgress((s) => s.unmarkRead);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const setLast = useProgress((s) => s.setLast);

  const atEnd = index >= verses.length;
  const current = verses[Math.min(index, verses.length - 1)];
  const isRead = !!read[current.id];

  useEffect(() => {
    if (atEnd) return;
    setLast(current.id, c, current.v);
    if (read[current.id]) return;
    const id = setTimeout(() => markRead(current.id, c, current.v), DWELL_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.id, atEnd]);

  const onViewable = useCallback(({ viewableItems }: { viewableItems: ViewToken<Page>[] }) => {
    const first = viewableItems[0];
    if (first && typeof first.index === 'number') setIndex(first.index);
  }, []);

  const goTo = (i: number) => {
    if (i < 0 || i >= pages.length) return;
    listRef.current?.scrollToIndex({ index: i, animated: true });
  };

  const toggleRead = () => {
    Haptics.notificationAsync(isRead ? Haptics.NotificationFeedbackType.Warning : Haptics.NotificationFeedbackType.Success).catch(() => {});
    if (isRead) unmarkRead(current.id);
    else markRead(current.id, c, current.v);
  };

  const progress = Math.min(1, (index + 1) / verses.length);
  const bottomH = 76 + insets.bottom;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton name="back" onPress={() => router.back()} label="వెనుకకు" />
        <Pressable style={styles.headerTitle} onPress={() => router.push({ pathname: '/chapter/[c]', params: { c: String(c) } })}>
          <ArchImage art={CHAPTER_ART[c - 1]} width={30} height={38} />
          <View style={{ flex: 1 }}>
            <Text variant="subheading" numberOfLines={1} style={{ fontSize: 16, lineHeight: 24 }}>{ch.te}</Text>
            <Text variant="numeral" color="textTertiary" style={{ fontSize: 13, fontWeight: '500' }}>
              అధ్యాయం {c} · {Math.min(index + 1, verses.length)} / {verses.length}
            </Text>
          </View>
        </Pressable>
        <IconButton
          name={bookmarks[current.id] ? 'bookmarkFilled' : 'bookmark'}
          color={bookmarks[current.id] ? t.accent : t.text}
          onPress={() => toggleBookmark(current.id)}
          label="బుక్‌మార్క్"
        />
      </View>
      <View style={[styles.track, { backgroundColor: t.surfaceAlt }]}>
        <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: hue.b }]} />
      </View>

      <FlatList
        ref={listRef}
        data={pages}
        horizontal
        pagingEnabled
        initialScrollIndex={initial}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        keyExtractor={(p) => p.id}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewable}
        viewabilityConfig={VIEWABILITY}
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        renderItem={({ item }) => (
          <View style={{ width }}>
            {'end' in item ? (
              <ChapterComplete chapter={c} bottomInset={bottomH + Spacing.lg} />
            ) : (
              <VersePage verse={item} chapter={c} bottomInset={bottomH + Spacing.lg} />
            )}
          </View>
        )}
      />

      {/* Bottom bar */}
      <View style={[styles.bottom, { paddingBottom: insets.bottom + Spacing.sm, backgroundColor: t.bgElevated, borderTopColor: t.goldSoft }]}>
        <IconButton name="back" onPress={() => goTo(index - 1)} color={index === 0 ? t.textTertiary : t.text} label="మునుపటి శ్లోకం" />
        {atEnd ? (
          <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.readBtn, { backgroundColor: t.indigo, opacity: pressed ? 0.85 : 1 }]}>
            <Text variant="subheading" color="#FFFFFF" style={{ fontSize: 16 }}>అధ్యాయానికి తిరిగి</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={toggleRead}
            style={({ pressed }) => [styles.readBtn, { backgroundColor: isRead ? t.success : t.accent, opacity: pressed ? 0.85 : 1 }]}>
            <Icon name="check" color="#FFFFFF" size={20} strokeWidth={2.6} />
            <Text variant="subheading" color="#FFFFFF" style={{ fontSize: 16 }}>{isRead ? 'చదివాను' : 'చదివినట్లు గుర్తించు'}</Text>
            <Text variant="numeral" color="rgba(255,255,255,0.9)" style={{ fontSize: 14 }}>{verseLabel(c, current.vs)}</Text>
          </Pressable>
        )}
        <IconButton name="chevron" onPress={() => goTo(index + 1)} color={atEnd ? t.textTertiary : t.text} label="తరువాతి శ్లోకం" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs, gap: Spacing.xs },
  headerTitle: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  track: { height: 4, marginHorizontal: Spacing.md, borderRadius: 2, overflow: 'hidden', marginBottom: 2 },
  fill: { height: 4, borderRadius: 2 },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingTop: Spacing.sm, borderTopWidth: 1 },
  readBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingHorizontal: Spacing.lg, height: 52, borderRadius: Radius.pill },
});
