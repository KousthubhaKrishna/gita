import { useCallback, useEffect, useState } from 'react';

export type InstallMode = 'hidden' | 'prompt' | 'ios';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

declare global {
  interface Window {
    /** Captured early by public/index.html so we do not miss the event while fonts load. */
    __gitaInstallEvent?: BeforeInstallPromptEvent | null;
  }
}

function isStandalone() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOS() {
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Web PWA install state.
 * - `prompt`: Chrome/Edge/Android fired `beforeinstallprompt`; `install()` opens the native dialog.
 * - `ios`: Safari has no prompt API; show "Share → Add to Home Screen" instructions instead.
 * - `hidden`: already installed, or the browser offers no install path.
 */
function initialEvent(): BeforeInstallPromptEvent | null {
  return typeof window === 'undefined' ? null : (window.__gitaInstallEvent ?? null);
}

function initialMode(): InstallMode {
  if (typeof window === 'undefined' || isStandalone()) return 'hidden';
  if (window.__gitaInstallEvent) return 'prompt';
  return isIOS() ? 'ios' : 'hidden';
}

export function useInstallPrompt(): { mode: InstallMode; install: () => Promise<boolean> } {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(initialEvent);
  const [mode, setMode] = useState<InstallMode>(initialMode);

  useEffect(() => {
    if (typeof window === 'undefined' || isStandalone()) return;
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
      setMode('prompt');
    };
    const onInstalled = () => {
      window.__gitaInstallEvent = null;
      setEvent(null);
      setMode('hidden');
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!event) return false;
    await event.prompt();
    const { outcome } = await event.userChoice;
    if (outcome === 'accepted') {
      window.__gitaInstallEvent = null;
      setEvent(null);
      setMode('hidden');
    }
    return outcome === 'accepted';
  }, [event]);

  return { mode, install };
}
