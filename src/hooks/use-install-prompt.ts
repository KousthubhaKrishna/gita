/** Native: the app is already installed, so there is never an install prompt. */
export type InstallMode = 'hidden' | 'prompt' | 'ios';

export function useInstallPrompt(): { mode: InstallMode; install: () => Promise<boolean> } {
  return { mode: 'hidden', install: async () => false };
}
