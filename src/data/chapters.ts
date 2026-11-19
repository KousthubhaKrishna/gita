import stats from './stats.json';

export type Chapter = {
  n: number;
  /** Telugu chapter title */
  te: string;
  /** Sanskrit (IAST) */
  sa: string;
  en: string;
  /** number of slokas in the chapter */
  slokas: number;
  /** number of verse cards (combined verses count once) */
  cards: number;
  /** one-line Telugu gist shown on the chapter card */
  gist: string;
  /** emblem key, see components/art/Emblem */
  emblem: EmblemKey;
};

export type EmblemKey =
  | 'bow'
  | 'lamp'
  | 'wheel'
  | 'sun'
  | 'leaf'
  | 'seat'
  | 'ocean'
  | 'om'
  | 'kalasha'
  | 'feather'
  | 'eye'
  | 'heart'
  | 'field'
  | 'bands'
  | 'tree'
  | 'scale'
  | 'fire'
  | 'conch';

const S = stats as Record<string, { cards: number; slokas: number }>;

const base: Omit<Chapter, 'slokas' | 'cards'>[] = [
  { n: 1, te: 'అర్జున విషాద యోగము', sa: 'Arjuna Viṣāda Yoga', en: 'The Yoga of Arjuna’s Grief', gist: 'రణరంగంలో నిలిచిన అర్జునుడు బంధువులను చూసి విషాదంలో మునిగిపోతాడు.', emblem: 'bow' },
  { n: 2, te: 'సాంఖ్య యోగము', sa: 'Sāṅkhya Yoga', en: 'The Yoga of Knowledge', gist: 'ఆత్మ నిత్యము; దేహము అనిత్యము. స్థితప్రజ్ఞుని లక్షణాలు ఇక్కడే చెప్పబడ్డాయి.', emblem: 'lamp' },
  { n: 3, te: 'కర్మ యోగము', sa: 'Karma Yoga', en: 'The Yoga of Action', gist: 'ఫలాపేక్ష లేకుండా కర్తవ్యాన్ని నిర్వర్తించుటే కర్మయోగము.', emblem: 'wheel' },
  { n: 4, te: 'జ్ఞాన కర్మ సన్న్యాస యోగము', sa: 'Jñāna Karma Sannyāsa Yoga', en: 'The Yoga of Knowledge and Renunciation of Action', gist: 'ధర్మ రక్షణకై నేను యుగయుగాల్లో అవతరిస్తాను. జ్ఞానాగ్ని సర్వకర్మలను భస్మం చేస్తుంది.', emblem: 'sun' },
  { n: 5, te: 'కర్మ సన్న్యాస యోగము', sa: 'Karma Sannyāsa Yoga', en: 'The Yoga of Renunciation', gist: 'తామరాకుపై నీటిబొట్టువలె అంటకుండా కర్మలు చేసేవాడు పాపానికి లోనుకాడు.', emblem: 'leaf' },
  { n: 6, te: 'ధ్యాన యోగము', sa: 'Dhyāna Yoga', en: 'The Yoga of Meditation', gist: 'మనస్సును నిగ్రహించి ఆత్మలో నిలిపే ధ్యాన సాధన ఇక్కడ వివరించబడింది.', emblem: 'seat' },
  { n: 7, te: 'జ్ఞాన విజ్ఞాన యోగము', sa: 'Jñāna Vijñāna Yoga', en: 'The Yoga of Knowledge and Realisation', gist: 'జలంలో రుచి, సూర్యచంద్రుల్లో కాంతి — సమస్తంలో నేనే ఉన్నాను.', emblem: 'ocean' },
  { n: 8, te: 'అక్షర బ్రహ్మ యోగము', sa: 'Akṣara Brahma Yoga', en: 'The Yoga of the Imperishable Brahman', gist: 'అంత్యకాలంలో నన్ను స్మరించేవాడు నన్నే పొందుతాడు.', emblem: 'om' },
  { n: 9, te: 'రాజవిద్యా రాజగుహ్య యోగము', sa: 'Rāja Vidyā Rāja Guhya Yoga', en: 'The Yoga of Royal Knowledge and Royal Secret', gist: 'పత్రం పుష్పం ఫలం తోయం — భక్తితో అర్పించినది నేను స్వీకరిస్తాను.', emblem: 'kalasha' },
  { n: 10, te: 'విభూతి యోగము', sa: 'Vibhūti Yoga', en: 'The Yoga of Divine Glories', gist: 'ఎక్కడ వైభవం, శక్తి, శోభ ఉన్నా అది నా తేజస్సులోని అంశమే.', emblem: 'feather' },
  { n: 11, te: 'విశ్వరూప సందర్శన యోగము', sa: 'Viśvarūpa Darśana Yoga', en: 'The Yoga of the Cosmic Form', gist: 'అర్జునునికి దివ్యదృష్టి ప్రసాదించి శ్రీకృష్ణుడు విశ్వరూపాన్ని చూపిస్తాడు.', emblem: 'eye' },
  { n: 12, te: 'భక్తి యోగము', sa: 'Bhakti Yoga', en: 'The Yoga of Devotion', gist: 'ఎవరిని చూసి లోకం భయపడదో, లోకాన్ని చూసి ఎవరు భయపడరో — ఆ భక్తుడు నాకు ప్రియుడు.', emblem: 'heart' },
  { n: 13, te: 'క్షేత్ర క్షేత్రజ్ఞ విభాగ యోగము', sa: 'Kṣetra Kṣetrajña Vibhāga Yoga', en: 'The Yoga of the Field and its Knower', gist: 'ఈ దేహం క్షేత్రం; దానిని తెలిసినవాడు క్షేత్రజ్ఞుడు.', emblem: 'field' },
  { n: 14, te: 'గుణత్రయ విభాగ యోగము', sa: 'Guṇa Traya Vibhāga Yoga', en: 'The Yoga of the Three Guṇas', gist: 'సత్త్వ రజస్ తమో గుణాలు జీవుని ఎలా బంధిస్తాయో, వాటిని ఎలా దాటాలో.', emblem: 'bands' },
  { n: 15, te: 'పురుషోత్తమ యోగము', sa: 'Puruṣottama Yoga', en: 'The Yoga of the Supreme Person', gist: 'వేర్లు పైన, కొమ్మలు క్రింద — సంసారమనే అశ్వత్థ వృక్షాన్ని వైరాగ్యంతో ఛేదించాలి.', emblem: 'tree' },
  { n: 16, te: 'దైవాసుర సంపద్విభాగ యోగము', sa: 'Daivāsura Sampad Vibhāga Yoga', en: 'The Yoga of Divine and Demoniac Natures', gist: 'కామం, క్రోధం, లోభం — ఆత్మను నాశనం చేసే నరకద్వారాలు మూడు.', emblem: 'scale' },
  { n: 17, te: 'శ్రద్ధాత్రయ విభాగ యోగము', sa: 'Śraddhā Traya Vibhāga Yoga', en: 'The Yoga of the Threefold Faith', gist: 'ఆహారం, యజ్ఞం, తపస్సు, దానం — శ్రద్ధను బట్టి మూడు విధాలు.', emblem: 'fire' },
  { n: 18, te: 'మోక్ష సన్న్యాస యోగము', sa: 'Mokṣa Sannyāsa Yoga', en: 'The Yoga of Liberation through Renunciation', gist: 'సర్వధర్మాలను విడిచి నన్నొక్కడినే శరణు పొందుము; నేను నిన్ను సర్వపాపాల నుండి విముక్తుని చేస్తాను.', emblem: 'conch' },
];

export const CHAPTERS: Chapter[] = base.map((b) => ({
  ...b,
  slokas: S[String(b.n)].slokas,
  cards: S[String(b.n)].cards,
}));

export const TOTAL_SLOKAS = CHAPTERS.reduce((a, c) => a + c.slokas, 0);
export const TOTAL_CARDS = CHAPTERS.reduce((a, c) => a + c.cards, 0);
