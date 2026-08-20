import React from 'react';
import { ChevronLeft, Volume2, XCircle, Lightbulb, CheckCircle2, Loader2, Trophy, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPosBadge } from '../posUtils';

interface Word {
  id: string;
  word: string;
  phonetic: string;
  meaningEn: string;
  meaningVi: string;
  wordType: string;
  cefrLevel: string;
  audioUs?: string;
  usage?: string;
  example?: string;
  exampleVi?: string;
}

interface FlashcardSessionProps {
  selectedLevel: string;
  words: Word[];
  currentIndex: number;
  showHint: boolean;
  completed: boolean;
  loading: boolean;
  onBack: () => void;
  onNext: () => void;
  onIKnowIt: () => void;
  onShowHintChange: (show: boolean) => void;
  playPronunciation: () => void;
}

export default function FlashcardSession({
  selectedLevel,
  words,
  currentIndex,
  showHint,
  completed,
  loading,
  onBack,
  onNext,
  onIKnowIt,
  onShowHintChange,
  playPronunciation
}: FlashcardSessionProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
        <Loader2 className="w-10 h-10 text-[#002147] dark:text-sky-400 animate-spin" />
        <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Đang tải từ mới...</p>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-6">
        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center">
          <BrainCircuit className="w-10 h-10 text-slate-300 dark:text-slate-700" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Không có dữ liệu từ mới</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 font-medium">Hiện tại không thể tải từ vựng mới cấp độ {selectedLevel}. Vui lòng thử lại sau.</p>
        </div>
        <button
          onClick={onBack}
          className="px-8 py-3 bg-[#002147] dark:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer"
        >
          Trở lại Chọn Trình Độ
        </button>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-100 dark:shadow-none">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Tuyệt vời!</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Bạn đã hoàn thành việc học 15 từ vựng mới cấp độ {selectedLevel}.</p>
        </div>
        <button
          onClick={onBack}
          className="px-10 py-3 bg-[#002147] dark:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-bold shadow-md cursor-pointer"
        >
          Tiếp Tục Học
        </button>
      </div>
    );
  }

  const currentWord = words[currentIndex];
  const badge = currentWord ? getPosBadge(currentWord.wordType) : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold transition-colors cursor-pointer text-xs"
        >
          <ChevronLeft className="w-4 h-4" /> Chọn Cấp Độ
        </button>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 bg-green-50 border border-green-100 dark:bg-green-950/30 dark:border-green-900/50 text-xs font-bold text-green-700 dark:text-green-400 rounded-full">{selectedLevel}</span>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{currentIndex + 1}/{words.length}</span>
        </div>
      </div>

      {/* Word Flashcard */}
      <div className="perspective-1000 w-full h-[280px] xs:h-[320px] sm:h-[360px] md:h-[400px] landscape:h-[260px] landscape:sm:h-[300px]">
        <div className={cn(
          "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 dark:border-slate-800/80 rounded-[2.5rem] shadow-xl",
          showHint ? "rotate-y-180" : ""
        )}>
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[11px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
                {currentWord.cefrLevel}
              </span>
              {badge && (
                <span className={cn(
                  "px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold rounded-full border",
                  badge.badgeBg,
                  badge.badgeText,
                  badge.badgeBorder
                )}>
                  {badge.labelVi} ({badge.raw})
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-1 sm:mb-2">{currentWord.word}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-serif text-slate-400 dark:text-slate-500">{currentWord.phonetic}</span>
            </div>
            <button
              onClick={playPronunciation}
              className="mt-4 sm:mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-900/50 flex items-center justify-center text-green-500 dark:text-green-400 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
            <p className="absolute bottom-4 sm:bottom-6 text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Nhấn &quot;Hiện gợi ý&quot; bên dưới để lật thẻ</p>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-[#002147] dark:bg-slate-900 text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
            {(!currentWord.meaningVi || currentWord.meaningVi === currentWord.word) ? (
              <div className="flex flex-col items-center justify-center space-y-4 w-full">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                <p className="text-xs text-slate-300 font-bold uppercase tracking-widest animate-pulse">Đang dịch & phân tích từ...</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 w-full">
                <div>
                  <span className="text-[11px] sm:text-xs text-emerald-400 font-bold uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                  <h2 className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">{currentWord.meaningVi}</h2>
                </div>
                <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3">
                  <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block">Định nghĩa (EN)</span>
                  <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 mt-1 italic leading-relaxed">&quot;{currentWord.meaningEn}&quot;</p>
                </div>
                {currentWord.example && (
                  <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3 text-left">
                    <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                    <p className="text-xs sm:text-sm text-white font-medium italic">&quot;{currentWord.example}&quot;</p>
                    {currentWord.exampleVi && <p className="text-xs text-emerald-400/80 dark:text-emerald-400 mt-0.5 italic">→ {currentWord.exampleVi}</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onNext}
          className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-955/20 hover:border-rose-200 dark:hover:border-rose-900/40 group transition-all cursor-pointer"
        >
          <XCircle className="w-6 h-6 text-rose-500" />
          <span className="text-[10px] sm:text-xs font-bold text-rose-500 uppercase tracking-wider">Đang Học</span>
        </button>

        <button
          onClick={() => onShowHintChange(!showHint)}
          className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-amber-50 dark:hover:bg-amber-955/20 hover:border-amber-200 dark:hover:border-amber-900/40 group transition-all cursor-pointer"
        >
          <Lightbulb className="w-6 h-6 text-amber-500" />
          <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-wider">{showHint ? 'Ẩn gợi ý' : 'Hiện gợi ý'}</span>
        </button>

        <button
          onClick={onIKnowIt}
          className="flex flex-col items-center gap-1.5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-green-50 dark:hover:bg-green-955/20 hover:border-green-200 dark:hover:border-green-900/40 group transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          <span className="text-[10px] sm:text-xs font-bold text-green-500 uppercase tracking-wider">Đã Thuộc</span>
        </button>
      </div>
    </div>
  );
}
