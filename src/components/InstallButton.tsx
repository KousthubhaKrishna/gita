import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Icon } from '@/components/ui/IconButton';
import { Text } from '@/components/ui/Text';
import { useInstallPrompt } from '@/hooks/use-install-prompt';
import { Radius, Spacing, useTheme } from '@/theme';

/**
 * "Install" pill shown only in a browser (web build, not yet installed).
 * Android/desktop: opens the browser's install dialog. iOS: explains Add to Home Screen.
 */
export function InstallButton() {
  const { mode, install } = useInstallPrompt();
  const [showHelp, setShowHelp] = useState(false);
  const t = useTheme();
  if (mode === 'hidden') return null;

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="యాప్ ఇన్‌స్టాల్ చేయండి"
        onPress={() => (mode === 'prompt' ? install() : setShowHelp(true))}
        style={({ pressed }) => [styles.pill, pressed && { opacity: 0.8 }]}>
        <Icon name="download" color="#FFF6E6" size={18} strokeWidth={2.2} />
        <Text variant="label" color="#FFF6E6" style={{ lineHeight: 20 }}>
          ఇన్‌స్టాల్ చేయండి
        </Text>
      </Pressable>

      <Modal visible={showHelp} transparent animationType="fade" onRequestClose={() => setShowHelp(false)}>
        <Pressable style={styles.backdrop} onPress={() => setShowHelp(false)}>
          <Pressable style={[styles.sheet, { backgroundColor: t.surface, borderColor: t.hairline }]} onPress={() => {}}>
            <Text variant="heading" style={{ textAlign: 'center' }}>
              హోమ్ స్క్రీన్‌కు జోడించండి
            </Text>
            <Text variant="caption" color="textSecondary" style={{ textAlign: 'center', marginTop: -4 }}>
              Add to Home Screen · ఆపై యాప్‌లా, ఆఫ్‌లైన్‌లోనూ పనిచేస్తుంది
            </Text>

            <Step n={1} icon="share" color={t.accent}>
              Safari క్రింద ఉన్న <Text variant="body" color="accent">Share</Text> బటన్ నొక్కండి
            </Step>
            <Step n={2} icon="plusSquare" color={t.accent}>
              జాబితాలో <Text variant="body" color="accent">Add to Home Screen</Text> ఎంచుకోండి
            </Step>
            <Step n={3} icon="check" color={t.accent}>
              పైన కుడివైపు <Text variant="body" color="accent">Add</Text> నొక్కండి
            </Step>

            <Pressable
              accessibilityRole="button"
              onPress={() => setShowHelp(false)}
              style={({ pressed }) => [styles.okBtn, { backgroundColor: t.accent, opacity: pressed ? 0.85 : 1 }]}>
              <Text variant="label" color={t.accentText}>
                సరే
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function Step({ n, icon, color, children }: { n: number; icon: 'share' | 'plusSquare' | 'check'; color: string; children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View style={styles.step}>
      <View style={[styles.stepIcon, { backgroundColor: t.surfaceAlt, borderColor: t.hairline }]}>
        <Icon name={icon} color={color} size={22} strokeWidth={2} />
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="caption" color="textTertiary">
          {n}
        </Text>
        <Text variant="body">{children}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(20,12,4,0.35)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,240,210,0.4)',
  },
  backdrop: { flex: 1, backgroundColor: 'rgba(10,6,2,0.55)', justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  step: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  stepIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: StyleSheet.hairlineWidth },
  okBtn: { height: 48, borderRadius: Radius.pill, alignItems: 'center', justifyContent: 'center', marginTop: Spacing.xs },
});
