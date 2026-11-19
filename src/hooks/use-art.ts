import { ART_SETS, Art, ArtKey } from '@/data/art';
import { useSettings } from '@/store/settings';

/** Resolves an art key to the image for the user's chosen style. */
export function useArt(key: ArtKey): Art {
  const style = useSettings((s) => s.artStyle);
  return (ART_SETS[style] ?? ART_SETS.miniature)[key];
}

export function useArtSet() {
  const style = useSettings((s) => s.artStyle);
  return ART_SETS[style] ?? ART_SETS.miniature;
}
