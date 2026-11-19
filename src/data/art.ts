/**
 * Public-domain / CC0 Indian miniature paintings bundled with the app (WebP, ≤1400px).
 * `focus` is the content position used when the image is cropped (x%, y%).
 */
export type ArtKey =
  | 'upadesh'
  | 'chariot'
  | 'kurukshetra'
  | 'manuscript'
  | 'counsel'
  | 'grove'
  | 'shrinathji'
  | 'kaliya'
  | 'cosmic'
  | 'govardhan';

export type Art = { src: number; focus: { left: string; top: string }; title: string; credit: string };

export const MINIATURE: Record<ArtKey, Art> = {
  upadesh: {
    src: require('@/assets/art/upadesh.webp'),
    focus: { left: '45%', top: '55%' },
    title: 'శ్రీకృష్ణుడు అర్జునునికి గీతోపదేశం',
    credit: 'Kashmir school, 19th c. — Public domain (Google Cultural Institute / Wikimedia Commons)',
  },
  chariot: {
    src: require('@/assets/art/chariot.webp'),
    focus: { left: '50%', top: '55%' },
    title: 'పార్థసారథి',
    credit: 'Krishna and Arjuna on the chariot, 19th c. — Public domain (Wikimedia Commons)',
  },
  kurukshetra: {
    src: require('@/assets/art/kurukshetra.webp'),
    focus: { left: '50%', top: '45%' },
    title: 'కురుక్షేత్ర రణరంగం',
    credit: 'Arjuna and his charioteer Krishna confront Karna, Himachal/Jammu, c.1820 — Public domain (Wikimedia Commons)',
  },
  manuscript: {
    src: require('@/assets/art/manuscript.webp'),
    focus: { left: '70%', top: '50%' },
    title: 'సచిత్ర గీతా ప్రతి, శ్లోకం 1.20–21',
    credit: 'Illustrated Bhagavad Gita manuscript, 19th c. — Public domain (Wikimedia Commons)',
  },
  counsel: {
    src: require('@/assets/art/counsel.webp'),
    focus: { left: '60%', top: '50%' },
    title: 'అర్జునుడు శ్రీకృష్ణుని ఎన్నుకొనుట',
    credit: 'Arjuna chooses Krishna, Himachal Pradesh, 18th–19th c. — Public domain (Wikimedia Commons)',
  },
  grove: {
    src: require('@/assets/art/grove.webp'),
    focus: { left: '50%', top: '45%' },
    title: 'పుష్పవనంలో రాధాకృష్ణులు',
    credit: 'Radha and Krishna walk in a flowering grove, Kota, c.1720 — The Met, CC0',
  },
  shrinathji: {
    src: require('@/assets/art/shrinathji.webp'),
    focus: { left: '50%', top: '35%' },
    title: 'శ్రీనాథజీ',
    credit: 'Krishna in the form of Shri Nathji, Nathdwara, c.1840 — The Met, CC0',
  },
  kaliya: {
    src: require('@/assets/art/kaliya.webp'),
    focus: { left: '50%', top: '40%' },
    title: 'కాళీయ మర్దనం',
    credit: 'Krishna subduing Kaliya, Tirupati, 19th c. — The Met, CC0',
  },
  cosmic: {
    src: require('@/assets/art/cosmic.webp'),
    focus: { left: '40%', top: '45%' },
    title: 'నవగుంజర — శ్రీకృష్ణుని విశ్వరూపం',
    credit: 'Navagunjara, a universal form of Krishna, Jodhpur, c.1835 — The Met, CC0',
  },
  govardhan: {
    src: require('@/assets/art/govardhan.webp'),
    focus: { left: '50%', top: '40%' },
    title: 'గోవర్ధనోద్ధరణం',
    credit: 'Krishna lifting Mount Govardhana, Kangra, 18th c. — Public domain (Wikimedia Commons)',
  },
};

/**
 * Second style: real photographs of Gita sites and temple deities, plus vibrant
 * Ravi Varma–era prints. All from Wikimedia Commons; licences listed per image.
 */
export const DEVOTIONAL: Record<ArtKey, Art> = {
  upadesh: {
    src: require('@/assets/art/devotional/upadesh.webp'),
    focus: { left: '50%', top: '55%' },
    title: 'శ్రీకృష్ణార్జున రథ స్మారకం, కురుక్షేత్రం',
    credit: 'Photo: Tsevang — CC BY-SA 4.0 (Wikimedia Commons)',
  },
  chariot: {
    src: require('@/assets/art/devotional/chariot.webp'),
    focus: { left: '50%', top: '55%' },
    title: 'బ్రహ్మసరోవరం వద్ద శ్రీకృష్ణ రథం, కురుక్షేత్రం',
    credit: 'Photo: Gagan.leonidas — CC BY-SA 3.0 (Wikimedia Commons)',
  },
  kurukshetra: {
    src: require('@/assets/art/devotional/kurukshetra.webp'),
    focus: { left: '55%', top: '60%' },
    title: 'కృష్ణార్జునుల విగ్రహం, ఋషికేశ్',
    credit: 'Photo: Bodhisattwa — CC BY-SA 3.0 (Wikimedia Commons)',
  },
  manuscript: {
    src: require('@/assets/art/devotional/manuscript.webp'),
    focus: { left: '50%', top: '50%' },
    title: 'దీపారాధన',
    credit: 'Photo: Ara Basu — CC BY-SA 4.0 (Wikimedia Commons)',
  },
  counsel: {
    src: require('@/assets/art/devotional/counsel.webp'),
    focus: { left: '72%', top: '45%' },
    title: 'శ్రీకృష్ణ రాయబారం — రాజా రవివర్మ',
    credit: 'Raja Ravi Varma, Krishna as Envoy — Public domain (Wikimedia Commons)',
  },
  grove: {
    src: require('@/assets/art/devotional/grove.webp'),
    focus: { left: '40%', top: '40%' },
    title: 'మురళీధరుడు — జన్మాష్టమి అలంకరణ',
    credit: 'Photo: Sudarshana from Bangalore — CC BY 2.0 (Wikimedia Commons)',
  },
  shrinathji: {
    src: require('@/assets/art/devotional/shrinathji.webp'),
    focus: { left: '45%', top: '40%' },
    title: 'శ్రీ రాధాకృష్ణులు, ఇస్కాన్ చెన్నై',
    credit: 'Photo: Rasnaboy — CC BY-SA 3.0 (Wikimedia Commons)',
  },
  kaliya: {
    src: require('@/assets/art/devotional/kaliya.webp'),
    focus: { left: '50%', top: '50%' },
    title: 'పద్మం',
    credit: 'Photo: Hong Zhang — CC0 (Wikimedia Commons)',
  },
  cosmic: {
    src: require('@/assets/art/devotional/cosmic.webp'),
    focus: { left: '60%', top: '35%' },
    title: 'భారత యుద్ధంలో విశ్వరూపం',
    credit: 'Mural photo: T.sujatha — CC BY-SA 3.0 (Wikimedia Commons)',
  },
  govardhan: {
    src: require('@/assets/art/devotional/govardhan.webp'),
    focus: { left: '50%', top: '40%' },
    title: 'గరుడ వాహన శ్రీమహావిష్ణువు',
    credit: 'Ravi Varma studio, c.1910s — Public domain (Wikimedia Commons)',
  },
};

export type ArtStyle = 'miniature' | 'devotional';
export const ART_SETS: Record<ArtStyle, Record<ArtKey, Art>> = { miniature: MINIATURE, devotional: DEVOTIONAL };

/** Painting shown for each chapter (index = chapter - 1). */
export const CHAPTER_ART: ArtKey[] = [
  'kurukshetra', // 1  Arjuna's grief on the battlefield
  'upadesh', //     2  the teaching begins
  'chariot', //     3  action — the charioteer
  'counsel', //     4  the Lord as guide through the ages
  'manuscript', //  5  renunciation — the river bank
  'grove', //       6  meditation in nature
  'shrinathji', //  7  "I am the taste in water…"
  'chariot', //     8  the imperishable
  'govardhan', //   9  the Lord carries His devotees
  'shrinathji', //  10 divine glories
  'cosmic', //      11 the universal form
  'grove', //       12 devotion
  'manuscript', //  13 the field and its knower
  'counsel', //     14 the three gunas
  'govardhan', //   15 the supreme person
  'kaliya', //      16 divine vs. demonic
  'kurukshetra', // 17 threefold faith
  'upadesh', //     18 liberation — "surrender unto Me"
];
