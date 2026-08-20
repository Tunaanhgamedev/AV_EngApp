import React from 'react';
import { Layers, Search, XCircle, ChevronRight, BookMarked, Zap, Sparkles, Compass, Flame, HelpCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PosCategory, POS_METADATA } from '../posUtils';

interface PosSelectorProps {
  posCounts: Record<PosCategory, number>;
  posSearchQuery: string;
  setPosSearchQuery: (q: string) => void;
  posFilterLevel: 'all' | 'beginner' | 'advanced';
  setPosFilterLevel: (l: 'all' | 'beginner' | 'advanced') => void;
  onSelectPosCategory: (cat: PosCategory) => void;
}

const POS_ICONS: Record<PosCategory, any> = {
  all: Layers,
  noun: BookMarked,
  verb: Zap,
  adjective: Sparkles,
  adverb: Compass,
  idiom: Flame,
  other: HelpCircle
};

export default function PosSelector({
  posCounts,
  posSearchQuery,
  setPosSearchQuery,
  posFilterLevel,
  setPosFilterLevel,
  onSelectPosCategory
}: PosSelectorProps) {
  const categories: PosCategory[] = ['all', 'noun', 'verb', 'adjective', 'adverb', 'idiom', 'other'];

  const filteredCategories = categories.filter(cat => {
    const meta = POS_METADATA[cat];
    const matchesSearch =
      meta.labelVi.toLowerCase().includes(posSearchQuery.toLowerCase()) ||
      meta.labelEn.toLowerCase().includes(posSearchQuery.toLowerCase()) ||
      meta.desc.toLowerCase().includes(posSearchQuery.toLowerCase()) ||
      meta.short.toLowerCase().includes(posSearchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-md shadow-blue-500/20">
          <Layers className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Grammar & Parts of Speech</span>
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
          Học Từ Vựng Theo Loại Từ
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-2xl mx-auto leading-relaxed">
          Nắm vững bản chất ngữ pháp tiếng Anh qua hệ thống phân loại từ vựng đa chiều: <strong className="text-blue-600 dark:text-blue-400">Danh từ</strong>, <strong className="text-emerald-600 dark:text-emerald-400">Động từ</strong>, <strong className="text-amber-600 dark:text-amber-400">Tính từ</strong>, <strong className="text-purple-600 dark:text-purple-400">Trạng từ</strong> và <strong className="text-rose-600 dark:text-rose-400">Thành ngữ</strong>.
        </p>
      </div>

      {/* Quick Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
        <div
          onClick={() => onSelectPosCategory('noun')}
          className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Danh từ</span>
            <BookMarked className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-blue-950 dark:text-blue-200 mt-2">{posCounts.noun || 0}</p>
          <span className="text-[10px] text-blue-500/80 font-medium">Nouns (n.)</span>
        </div>

        <div
          onClick={() => onSelectPosCategory('verb')}
          className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Động từ</span>
            <Zap className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-950 dark:text-emerald-200 mt-2">{posCounts.verb || 0}</p>
          <span className="text-[10px] text-emerald-500/80 font-medium">Verbs (v.)</span>
        </div>

        <div
          onClick={() => onSelectPosCategory('adjective')}
          className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">Tính từ</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-950 dark:text-amber-200 mt-2">{posCounts.adjective || 0}</p>
          <span className="text-[10px] text-amber-500/80 font-medium">Adjectives (adj.)</span>
        </div>

        <div
          onClick={() => onSelectPosCategory('adverb')}
          className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">Trạng từ</span>
            <Compass className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-950 dark:text-purple-200 mt-2">{posCounts.adverb || 0}</p>
          <span className="text-[10px] text-purple-500/80 font-medium">Adverbs (adv.)</span>
        </div>

        <div
          onClick={() => onSelectPosCategory('idiom')}
          className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">Thành ngữ</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-950 dark:text-rose-200 mt-2">{posCounts.idiom || 0}</p>
          <span className="text-[10px] text-rose-500/80 font-medium">Idioms & Phrases</span>
        </div>

        <div
          onClick={() => onSelectPosCategory('all')}
          className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Tổng cộng</span>
            <Layers className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">{posCounts.all || 0}</p>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Toàn bộ kho từ</span>
        </div>
      </div>

      {/* Search & Level Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-900/30 p-4 rounded-3xl border border-slate-100 dark:border-slate-800/60 max-w-5xl mx-auto w-full">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={posSearchQuery}
            onChange={(e) => setPosSearchQuery(e.target.value)}
            placeholder="Tìm kiếm loại từ (Danh từ, Verb...)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 transition-all font-medium text-slate-700 dark:text-slate-300"
          />
          {posSearchQuery && (
            <button
              onClick={() => setPosSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => setPosFilterLevel('all')}
            className={cn(
              "flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              posFilterLevel === 'all'
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            Tất cả cấp độ
          </button>
          <button
            onClick={() => setPosFilterLevel('beginner')}
            className={cn(
              "flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              posFilterLevel === 'beginner'
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            🌱 Cơ bản
          </button>
          <button
            onClick={() => setPosFilterLevel('advanced')}
            className={cn(
              "flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              posFilterLevel === 'advanced'
                ? "bg-violet-500 text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            🚀 Nâng cao
          </button>
        </div>
      </div>

      {/* Category Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {filteredCategories.map((catKey) => {
          const meta = POS_METADATA[catKey];
          const IconComponent = POS_ICONS[catKey] || Layers;
          const count = posCounts[catKey] || 0;

          return (
            <div
              key={catKey}
              onClick={() => onSelectPosCategory(catKey)}
              className={cn(
                "group relative bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden",
                meta.cardBorderHover
              )}
            >
              {/* Top Row: Icon + Count */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110",
                    meta.badgeBg,
                    meta.badgeBorder,
                    "border"
                  )}>
                    <IconComponent className={cn("w-6 h-6", meta.iconColor)} />
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border",
                      meta.badgeBg,
                      meta.badgeText,
                      meta.badgeBorder
                    )}>
                      {count} từ
                    </span>
                  </div>
                </div>

                {/* Title and Short tag */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {meta.labelVi}
                    </h3>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">({meta.short})</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">{meta.labelEn}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium line-clamp-2 leading-relaxed">
                  {meta.desc}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <span>Vào học ngay</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
