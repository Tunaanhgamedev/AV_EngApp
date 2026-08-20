import React, { useState, useMemo } from 'react';
import { ChevronLeft, Volume2, XCircle, Lightbulb, CheckCircle2, Trophy, Search, BookMarked, Zap, Sparkles, Compass, Flame, HelpCircle, Layers, ArrowLeft, ArrowRight, Shuffle, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PosCategory, PosWordItem, POS_METADATA, getPosBadge } from '../posUtils';

interface PosStudyViewProps {
  selectedPosCategory: PosCategory;
  onSelectPosCategory: (cat: PosCategory) => void;
  words: PosWordItem[];
  posFilterLevel: 'all' | 'beginner' | 'advanced';
  setPosFilterLevel: (l: 'all' | 'beginner' | 'advanced') => void;
  speak: (text: string) => void;
  onBack: () => void;
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

export default function PosStudyView({
  selectedPosCategory,
  onSelectPosCategory,
  words,
  posFilterLevel,
  setPosFilterLevel,
  speak,
  onBack
}: PosStudyViewProps) {
  const [activeTab, setActiveTab] = useState<'card' | 'list'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);

  // Filter words by level and search query
  const filteredWords = useMemo(() => {
    let list = words;
    if (posFilterLevel !== 'all') {
      list = list.filter(w => w.level === posFilterLevel);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.meaningVi.toLowerCase().includes(q) ||
        w.meaningEn.toLowerCase().includes(q) ||
        w.topicTitle.toLowerCase().includes(q)
      );
    }
    return list;
  }, [words, posFilterLevel, searchQuery]);

  const currentWord = filteredWords[currentIndex] || filteredWords[0];
  const meta = POS_METADATA[selectedPosCategory] || POS_METADATA.all;
  const PosIcon = POS_ICONS[selectedPosCategory] || Layers;

  const handleNext = () => {
    setShowHint(false);
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (completed) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-yellow-100 dark:shadow-none">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Xuất sắc hoàn thành!</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium px-4 leading-relaxed">
            Bạn đã ôn tập xong toàn bộ danh sách <strong>{meta.labelVi}</strong> ({filteredWords.length} từ vựng).
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setShowHint(false);
              setCompleted(false);
            }}
            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Học Lại Bộ Này
          </button>
          <button
            onClick={onBack}
            className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            Chọn Loại Từ Khác
          </button>
        </div>
      </div>
    );
  }

  const allPosKeys: PosCategory[] = ['all', 'noun', 'verb', 'adjective', 'adverb', 'idiom', 'other'];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Top Header: Back + Active POS Info + Sub POS Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold transition-colors cursor-pointer text-xs"
          >
            <ChevronLeft className="w-4 h-4" /> Danh Sách Loại Từ
          </button>
          <span className="text-xs font-black text-slate-300 dark:text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <PosIcon className={cn("w-4 h-4", meta.iconColor)} />
            <span className="text-sm font-black text-slate-700 dark:text-slate-200">{meta.labelVi}</span>
            <span className="text-xs font-mono text-slate-400">({meta.short})</span>
          </div>
        </div>

        {/* View Switcher: Card vs List */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('card')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer",
                activeTab === 'card'
                  ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              🎴 Thẻ Flashcard
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer",
                activeTab === 'list'
                  ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              📋 Danh Sách ({filteredWords.length})
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal POS Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {allPosKeys.map((posKey) => {
          const itemMeta = POS_METADATA[posKey];
          const isSelected = selectedPosCategory === posKey;
          const ItemIcon = POS_ICONS[posKey] || Layers;

          return (
            <button
              key={posKey}
              onClick={() => {
                onSelectPosCategory(posKey);
                setCurrentIndex(0);
                setShowHint(false);
                setCompleted(false);
              }}
              className={cn(
                "px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 border transition-all cursor-pointer",
                isSelected
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 border-transparent shadow-sm scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              <ItemIcon className={cn("w-3.5 h-3.5", isSelected ? "text-white dark:text-slate-950" : itemMeta.iconColor)} />
              <span>{itemMeta.labelVi}</span>
              <span className="text-[10px] opacity-70 font-mono">({itemMeta.short})</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50/60 dark:bg-slate-900/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            placeholder="Tìm từ, nghĩa tiếng Việt, ví dụ..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 text-slate-700 dark:text-slate-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
            <button
              onClick={() => { setPosFilterLevel('all'); setCurrentIndex(0); }}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                posFilterLevel === 'all' ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm" : "text-slate-400 hover:text-slate-700"
              )}
            >
              Tất cả
            </button>
            <button
              onClick={() => { setPosFilterLevel('beginner'); setCurrentIndex(0); }}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                posFilterLevel === 'beginner' ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-700"
              )}
            >
              🌱 Cơ bản
            </button>
            <button
              onClick={() => { setPosFilterLevel('advanced'); setCurrentIndex(0); }}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                posFilterLevel === 'advanced' ? "bg-violet-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-700"
              )}
            >
              🚀 Nâng cao
            </button>
          </div>

          <span className="text-xs font-black text-slate-400 dark:text-slate-500 whitespace-nowrap">
            {filteredWords.length > 0 ? `${currentIndex + 1}/${filteredWords.length}` : '0 từ'}
          </span>
        </div>
      </div>

      {/* Content Area */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Không tìm thấy từ vựng phù hợp</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Thử thay đổi từ khóa tìm kiếm hoặc chọn cấp độ khác.</p>
        </div>
      ) : activeTab === 'card' ? (
        /* Flashcard View */
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                meta.gradient ? `bg-gradient-to-r ${meta.gradient}` : "bg-blue-600"
              )}
              style={{ width: `${((currentIndex + 1) / filteredWords.length) * 100}%` }}
            />
          </div>

          {/* Flashcard 3D */}
          <div className="perspective-1000 w-full h-[300px] xs:h-[340px] sm:h-[380px] md:h-[420px]">
            <div className={cn(
              "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 dark:border-slate-800/80 rounded-[2.5rem] shadow-xl",
              showHint ? "rotate-y-180" : ""
            )}>
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-[2.5rem]">
                <div className="flex items-center gap-2 mb-3">
                  <span className={cn(
                    "px-3 py-1 text-[11px] sm:text-xs font-bold rounded-full uppercase tracking-wider border",
                    meta.badgeBg,
                    meta.badgeText,
                    meta.badgeBorder
                  )}>
                    {meta.labelVi} ({currentWord.wordType})
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                    {currentWord.level === 'beginner' ? '🌱 Cơ bản' : '🚀 Nâng cao'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">
                  {currentWord.word}
                </h1>

                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-serif text-slate-400 dark:text-slate-500">{currentWord.phonetic}</span>
                </div>

                <button
                  onClick={() => speak(currentWord.word)}
                  className="mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>

                <p className="absolute bottom-4 sm:bottom-6 text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  Nhấn &quot;Lật thẻ&quot; bên dưới để xem nghĩa chi tiết
                </p>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-slate-900 dark:bg-slate-950 text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
                <div className="space-y-3 sm:space-y-4 w-full">
                  <div>
                    <span className="text-[11px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mt-1">{currentWord.meaningVi}</h2>
                  </div>

                  <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3">
                    <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block">Định nghĩa tiếng Anh</span>
                    <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 mt-1 italic leading-relaxed">&quot;{currentWord.meaningEn}&quot;</p>
                  </div>

                  {currentWord.example && (
                    <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3 text-left">
                      <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                      <p className="text-xs text-white dark:text-slate-100 font-medium italic">&quot;{currentWord.example}&quot;</p>
                      {currentWord.exampleVi && <p className="text-xs text-emerald-400/90 mt-0.5 italic">→ {currentWord.exampleVi}</p>}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => speak(currentWord.example || currentWord.word)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-white/10 dark:border-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe ví dụ
                    </button>
                    <span className="text-[10px] text-slate-400 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                      Chủ đề: {currentWord.topicTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls and Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={cn(
                "flex flex-col items-center gap-1.5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all cursor-pointer",
                currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-slate-100 dark:hover:bg-slate-850"
              )}
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Từ Trước</span>
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-200 dark:hover:border-amber-900/40 transition-all cursor-pointer"
            >
              <Lightbulb className="w-6 h-6 text-amber-500" />
              <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-wider">{showHint ? 'Ẩn nghĩa' : 'Lật thẻ'}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-200 dark:hover:border-green-900/40 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="text-[10px] sm:text-xs font-bold text-green-500 uppercase tracking-wider">
                {currentIndex < filteredWords.length - 1 ? 'Từ Tiếp Theo' : 'Hoàn Thành'}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* List & Search View */
        <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              📋 Danh sách từ loại: <span className="text-blue-600 dark:text-blue-400">{meta.labelVi}</span> ({filteredWords.length} từ)
            </h3>
            <span className="text-xs text-slate-400">Click vào từ để nghe và học thẻ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredWords.map((item, idx) => {
              const badge = getPosBadge(item.wordType);

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setActiveTab('card');
                    setShowHint(false);
                  }}
                  className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50/50 dark:bg-slate-900/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {item.word}
                      </h4>
                      <span className="text-xs font-serif text-slate-400 dark:text-slate-500">{item.phonetic}</span>
                      <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded-md border",
                        badge.badgeBg,
                        badge.badgeText,
                        badge.badgeBorder
                      )}>
                        {badge.short}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate">
                      {item.meaningVi}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 italic truncate">
                      &quot;{item.example}&quot;
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(item.word);
                    }}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 transition-all cursor-pointer shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
