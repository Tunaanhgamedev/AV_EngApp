import { VocabTopic, VocabWord } from './vocabularyData';

export type PosCategory = 'all' | 'noun' | 'verb' | 'adjective' | 'adverb' | 'idiom' | 'other';

export interface PosMeta {
  key: PosCategory;
  labelVi: string;
  labelEn: string;
  short: string;
  desc: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  cardBorderHover: string;
  iconColor: string;
  darkBg: string;
  darkBorder: string;
  darkText: string;
}

export const POS_METADATA: Record<PosCategory, PosMeta> = {
  all: {
    key: 'all',
    labelVi: 'Tất cả Loại Từ',
    labelEn: 'All Parts of Speech',
    short: 'ALL',
    desc: 'Toàn bộ kho từ vựng tổng hợp gồm danh từ, động từ, tính từ và thành ngữ.',
    gradient: 'from-slate-700 to-slate-900',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
    badgeBorder: 'border-slate-300',
    cardBorderHover: 'hover:border-slate-500',
    iconColor: 'text-slate-700',
    darkBg: 'dark:bg-slate-900',
    darkBorder: 'dark:border-slate-700',
    darkText: 'dark:text-slate-300'
  },
  noun: {
    key: 'noun',
    labelVi: 'Danh từ',
    labelEn: 'Nouns',
    short: 'n.',
    desc: 'Từ chỉ người, sự vật, địa điểm, hiện tượng, khái niệm trừu tượng hoặc cụ thể.',
    gradient: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/50',
    badgeText: 'text-blue-700 dark:text-blue-300',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    cardBorderHover: 'hover:border-blue-400 dark:hover:border-blue-500',
    iconColor: 'text-blue-600 dark:text-blue-400',
    darkBg: 'dark:bg-blue-950/40',
    darkBorder: 'dark:border-blue-900/60',
    darkText: 'dark:text-blue-300'
  },
  verb: {
    key: 'verb',
    labelVi: 'Động từ',
    labelEn: 'Verbs',
    short: 'v.',
    desc: 'Từ chỉ hành động, quá trình, trạng thái hoặc sự chuyển đổi của chủ thể.',
    gradient: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    cardBorderHover: 'hover:border-emerald-400 dark:hover:border-emerald-500',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    darkBg: 'dark:bg-emerald-950/40',
    darkBorder: 'dark:border-emerald-900/60',
    darkText: 'dark:text-emerald-300'
  },
  adjective: {
    key: 'adjective',
    labelVi: 'Tính từ',
    labelEn: 'Adjectives',
    short: 'adj.',
    desc: 'Từ miêu tả đặc điểm, tính chất, kích thước, màu sắc hoặc cảm xúc của sự vật/người.',
    gradient: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/50',
    badgeText: 'text-amber-700 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    cardBorderHover: 'hover:border-amber-400 dark:hover:border-amber-500',
    iconColor: 'text-amber-600 dark:text-amber-400',
    darkBg: 'dark:bg-amber-950/40',
    darkBorder: 'dark:border-amber-900/60',
    darkText: 'dark:text-amber-300'
  },
  adverb: {
    key: 'adverb',
    labelVi: 'Trạng từ',
    labelEn: 'Adverbs',
    short: 'adv.',
    desc: 'Từ bổ nghĩa cho động từ, tính từ hoặc trạng từ khác để chỉ cách thức, mức độ, thời gian.',
    gradient: 'from-purple-500 to-fuchsia-600',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/50',
    badgeText: 'text-purple-700 dark:text-purple-300',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    cardBorderHover: 'hover:border-purple-400 dark:hover:border-purple-500',
    iconColor: 'text-purple-600 dark:text-purple-400',
    darkBg: 'dark:bg-purple-950/40',
    darkBorder: 'dark:border-purple-900/60',
    darkText: 'dark:text-purple-300'
  },
  idiom: {
    key: 'idiom',
    labelVi: 'Thành ngữ & Cụm từ',
    labelEn: 'Idioms & Phrases',
    short: 'idiom',
    desc: 'Cụm từ cố định mang ý nghĩa đặc thù, giúp diễn đạt tự nhiên như người bản ngữ.',
    gradient: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/50',
    badgeText: 'text-rose-700 dark:text-rose-300',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    cardBorderHover: 'hover:border-rose-400 dark:hover:border-rose-500',
    iconColor: 'text-rose-600 dark:text-rose-400',
    darkBg: 'dark:bg-rose-950/40',
    darkBorder: 'dark:border-rose-900/60',
    darkText: 'dark:text-rose-300'
  },
  other: {
    key: 'other',
    labelVi: 'Từ loại khác',
    labelEn: 'Other POS',
    short: 'other',
    desc: 'Giới từ, liên từ, thán từ và các cấu trúc ngữ pháp đặc biệt khác.',
    gradient: 'from-cyan-500 to-sky-600',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/50',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    cardBorderHover: 'hover:border-cyan-400 dark:hover:border-cyan-500',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    darkBg: 'dark:bg-cyan-950/40',
    darkBorder: 'dark:border-cyan-900/60',
    darkText: 'dark:text-cyan-300'
  }
};

/**
 * Normalizes any raw wordType string into a standardized PosCategory
 */
export function normalizePos(wordType: string | undefined): PosCategory {
  if (!wordType) return 'noun';
  const t = wordType.toLowerCase().trim();

  if (t.includes('noun') || t === 'n' || t === 'n.') return 'noun';
  if (t.includes('verb') || t === 'v' || t === 'v.') return 'verb';
  if (t.includes('adj') || t.includes('adjective')) return 'adjective';
  if (t.includes('adv') || t.includes('adverb')) return 'adverb';
  if (t.includes('idiom') || t.includes('phrase')) return 'idiom';
  if (t.includes('prep') || t.includes('conj') || t.includes('interj')) return 'other';

  return 'noun';
}

/**
 * Returns badge styling and text for a given wordType
 */
export function getPosBadge(wordType: string | undefined) {
  const cat = normalizePos(wordType);
  const meta = POS_METADATA[cat] || POS_METADATA.noun;
  return {
    category: cat,
    labelVi: meta.labelVi,
    labelEn: meta.labelEn,
    short: meta.short,
    badgeBg: meta.badgeBg,
    badgeText: meta.badgeText,
    badgeBorder: meta.badgeBorder,
    raw: wordType || meta.short
  };
}

export interface PosWordItem extends VocabWord {
  topicId: string;
  topicTitle: string;
  level: 'beginner' | 'advanced';
  posCategory: PosCategory;
}

/**
 * Aggregates and deduplicates all words from all topics, grouped by POS
 */
export function extractAllPosWords(topics: VocabTopic[]): {
  all: PosWordItem[];
  byCategory: Record<PosCategory, PosWordItem[]>;
  counts: Record<PosCategory, number>;
} {
  const seen = new Set<string>();
  const all: PosWordItem[] = [];
  const byCategory: Record<PosCategory, PosWordItem[]> = {
    all: [],
    noun: [],
    verb: [],
    adjective: [],
    adverb: [],
    idiom: [],
    other: []
  };

  for (const topic of topics) {
    // Beginner
    for (const w of topic.beginner || []) {
      const key = (w.word || '').toLowerCase().trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);

      const posCategory = normalizePos(w.wordType);
      const item: PosWordItem = {
        ...w,
        topicId: topic.id,
        topicTitle: topic.title,
        level: 'beginner',
        posCategory
      };
      all.push(item);
      byCategory[posCategory].push(item);
    }

    // Advanced
    for (const w of topic.advanced || []) {
      const key = (w.word || '').toLowerCase().trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);

      const posCategory = normalizePos(w.wordType);
      const item: PosWordItem = {
        ...w,
        topicId: topic.id,
        topicTitle: topic.title,
        level: 'advanced',
        posCategory
      };
      all.push(item);
      byCategory[posCategory].push(item);
    }
  }

  byCategory.all = all;

  const counts: Record<PosCategory, number> = {
    all: all.length,
    noun: byCategory.noun.length,
    verb: byCategory.verb.length,
    adjective: byCategory.adjective.length,
    adverb: byCategory.adverb.length,
    idiom: byCategory.idiom.length,
    other: byCategory.other.length
  };

  return { all, byCategory, counts };
}
