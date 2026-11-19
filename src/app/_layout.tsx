import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});
SplashScreen.setOptions({ fade: true, duration: 350 });

function Shell() {
  const t = useTheme();
  return (
    <>
      <StatusBar style={t.name === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: t.bg },
          animation: 'fade_from_bottom',
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="chapter/[c]" />
        <Stack.Screen name="read/[c]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="settings" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="about" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    'NotoSerifTelugu-SemiBold': require('@/assets/fonts/NotoSerifTelugu-SemiBold.ttf'),
    'NotoSerifTelugu-Bold': require('@/assets/fonts/NotoSerifTelugu-Bold.ttf'),
    'NotoSerifTelugu-ExtraBold': require('@/assets/fonts/NotoSerifTelugu-ExtraBold.ttf'),
    'NotoSansTelugu-Medium': require('@/assets/fonts/NotoSansTelugu-Medium.ttf'),
    'NotoSansTelugu-SemiBold': require('@/assets/fonts/NotoSansTelugu-SemiBold.ttf'),
    'NotoSansTelugu-Bold': require('@/assets/fonts/NotoSansTelugu-Bold.ttf'),
  });
  useEffect(() => {
    if (loaded) SplashScreen.hideAsync().catch(() => {});
  }, [loaded]);
  if (!loaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Shell />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
