import React from 'react';
import { ChevronLeft, Volume2, XCircle, Lightbulb, CheckCircle2, Trophy, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VocabWord {
  word: string;
  phonetic: string;
  wordType: string;
  meaningEn: string;
  meaningVi: string;
  example: string;
  exampleVi: string;
}

interface VocabTopic {
  id: string;
  title: string;
  desc: string;
  color: string;
  beginner: VocabWord[];
  advanced: VocabWord[];
}

interface TopicStudyViewProps {
  activeVocabTopic: VocabTopic | undefined;
  activeVocabWords: VocabWord[];
  vocabLevel: 'beginner' | 'advanced';
  setVocabLevel: (l: 'beginner' | 'advanced') => void;
  vocabIndex: number;
  setVocabIndex: React.Dispatch<React.SetStateAction<number>>;
  showVocabHint: boolean;
  setShowVocabHint: (show: boolean) => void;
  vocabCompleted: boolean;
  setVocabCompleted: (c: boolean) => void;
  activeTab: 'card' | 'list';
  setActiveTab: (t: 'card' | 'list') => void;
  speak: (text: string) => void;
  onBack: () => void;
}

export default function TopicStudyView({
  activeVocabTopic,
  activeVocabWords,
  vocabLevel,
  setVocabLevel,
  vocabIndex,
  setVocabIndex,
  showVocabHint,
  setShowVocabHint,
  vocabCompleted,
  setVocabCompleted,
  activeTab,
  setActiveTab,
  speak,
  onBack
}: TopicStudyViewProps) {
  if (vocabCompleted) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-yellow-100 dark:shadow-none">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Chủ đề hoàn thành!</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium px-4 leading-relaxed">
            Bạn đã học xong toàn bộ từ vựng cấp độ <strong className="text-emerald-500">{vocabLevel === 'beginner' ? 'Mới bắt đầu' : 'Nâng cao'}</strong> của chủ đề <strong>{activeVocabTopic?.title}</strong>.
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          {vocabLevel === 'beginner' && (
            <button
              onClick={() => {
                setVocabLevel('advanced');
                setVocabIndex(0);
                setShowVocabHint(false);
                setVocabCompleted(false);
                setActiveTab('card');
              }}
              className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Học Level Nâng Cao
            </button>
          )}
          <button
            onClick={onBack}
            className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            Chọn Chủ Đề Khác
          </button>
        </div>
      </div>
    );
  }

  const currentWord = activeVocabWords[vocabIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Top bar: Back + Topic info + Level switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold transition-colors cursor-pointer text-xs"
          >
            <ChevronLeft className="w-4 h-4" /> Chọn Chủ Đề
          </button>
          <span className="text-xs font-black text-slate-300 dark:text-slate-700">|</span>
          <span className="text-sm font-black text-slate-700 dark:text-slate-300">{activeVocabTopic?.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
            <button
              onClick={() => {
                setVocabLevel('beginner');
                setVocabIndex(0);
                setShowVocabHint(false);
                setVocabCompleted(false);
                setActiveTab('card');
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                vocabLevel === 'beginner'
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              🌱 Mới bắt đầu
            </button>
            <button
              onClick={() => {
                setVocabLevel('advanced');
                setVocabIndex(0);
                setShowVocabHint(false);
                setVocabCompleted(false);
                setActiveTab('card');
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                vocabLevel === 'advanced'
                  ? "bg-violet-500 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              🚀 Nâng cao
            </button>
          </div>
          <span className="text-xs font-black text-slate-400 dark:text-slate-500">{vocabIndex + 1}/{activeVocabWords.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            vocabLevel === 'beginner' ? "bg-gradient-to-r from-emerald-400 to-green-500" : "bg-gradient-to-r from-violet-400 to-purple-500"
          )}
          style={{ width: `${((vocabIndex + 1) / activeVocabWords.length) * 100}%` }}
        />
      </div>

      {/* Mobile View Switcher Tabs */}
      {currentWord && (
        <div className="flex lg:hidden bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl mb-1">
          <button
            onClick={() => setActiveTab('card')}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer",
              activeTab === 'card'
                ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            🎴 Thẻ Từ Vựng
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer",
              activeTab === 'list'
                ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            📋 Danh Sách ({activeVocabWords.length})
          </button>
        </div>
      )}

      {currentWord && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 items-start">
          {/* Flashcard (3 cols) */}
          <div className={cn("lg:col-span-3 w-full", activeTab === 'card' ? "block" : "hidden lg:block")}>
            <div className="perspective-1000 w-full h-[280px] xs:h-[320px] sm:h-[340px] md:h-[380px] landscape:h-[250px] landscape:sm:h-[280px]">
              <div className={cn(
                "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-200/80 dark:border-slate-800/80 rounded-[2.5rem] shadow-xl",
                showVocabHint ? "rotate-y-180" : ""
              )}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-[2.5rem]">
                  <span className={cn(
                    "px-3 py-1 text-[11px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-3",
                    vocabLevel === 'beginner' ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400" : "bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400"
                  )}>
                    {vocabLevel === 'beginner' ? '🌱 Beginner' : '🚀 Advanced'}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-1 sm:mb-2">{currentWord.word}</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-serif text-slate-400 dark:text-slate-500">{currentWord.phonetic}</span>
                    <span className="text-xs sm:text-sm font-semibold text-rose-500 dark:text-rose-455 font-sans italic">({currentWord.wordType})</span>
                  </div>
                  <button
                    onClick={() => speak(currentWord.word)}
                    className="mt-4 sm:mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-900/50 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer"
                  >
                    <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </button>
                  <p className="absolute bottom-4 sm:bottom-6 text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Nhấn &quot;Lật thẻ&quot; bên dưới để xem nghĩa</p>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-slate-900 dark:bg-slate-950 text-white p-6 sm:p-8 overflow-y-auto rounded-[2.5rem]">
                  <div className="space-y-3 sm:space-y-4 w-full">
                    <div>
                      <span className="text-[11px] sm:text-xs text-emerald-400 font-bold uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                      <h2 className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">{currentWord.meaningVi}</h2>
                    </div>
                    <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3">
                      <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block">Định nghĩa (EN)</span>
                      <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 mt-1 italic leading-relaxed">&quot;{currentWord.meaningEn}&quot;</p>
                    </div>
                    <div className="border-t border-white/10 dark:border-slate-800 pt-2 sm:pt-3 text-left">
                      <span className="text-[11px] sm:text-xs text-white/40 dark:text-slate-500 font-bold uppercase tracking-widest block mb-1">Ví dụ minh họa</span>
                      <p className="text-xs text-white dark:text-slate-100 font-medium italic">&quot;{currentWord.example}&quot;</p>
                      {currentWord.exampleVi && <p className="text-xs text-emerald-400/80 dark:text-emerald-400 mt-0.5 italic">→ {currentWord.exampleVi}</p>}
                    </div>
                    <button
                      onClick={() => speak(currentWord.example)}
                      className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-white/10 dark:border-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer mx-auto"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe ví dụ
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <button
                onClick={() => {
                  setShowVocabHint(false);
                  if (vocabIndex < activeVocabWords.length - 1) {
                    setVocabIndex(prev => prev + 1);
                  } else {
                    setVocabCompleted(true);
                  }
                }}
                className="flex flex-col items-center gap-1.5 py-4 bg-slate-55/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-955/20 hover:border-rose-200 dark:hover:border-rose-900/40 transition-all cursor-pointer"
              >
                <XCircle className="w-6 h-6 text-rose-500" />
                <span className="text-[10px] sm:text-xs font-bold text-rose-500 uppercase tracking-wider">Đang Học</span>
              </button>

              <button
                onClick={() => setShowVocabHint(!showVocabHint)}
                className="flex flex-col items-center gap-1.5 py-4 bg-slate-55/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-amber-50 dark:hover:bg-amber-955/20 hover:border-amber-200 dark:hover:border-amber-900/40 transition-all cursor-pointer"
              >
                <Lightbulb className="w-6 h-6 text-amber-500" />
                <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-wider">{showVocabHint ? 'Ẩn nghĩa' : 'Lật thẻ'}</span>
              </button>

              <button
                onClick={() => {
                  setShowVocabHint(false);
                  if (vocabIndex < activeVocabWords.length - 1) {
                    setVocabIndex(prev => prev + 1);
                  } else {
                    setVocabCompleted(true);
                  }
                }}
                className="flex flex-col items-center gap-1.5 py-4 bg-slate-55/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-green-50 dark:hover:bg-green-955/20 hover:border-green-200 dark:hover:border-green-900/40 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="text-[10px] sm:text-xs font-bold text-green-500 uppercase tracking-wider">Đã Thuộc</span>
              </button>
            </div>
          </div>

          {/* List View (2 cols - Desktop only) */}
          <div className={cn("lg:col-span-2 w-full", activeTab === 'list' ? "block" : "hidden lg:block")}>
            <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-[2.2rem] p-5 sm:p-6 shadow-sm space-y-4 max-h-[500px] overflow-y-auto">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                📋 Từ vựng trong chủ đề ({activeVocabWords.length})
              </h3>
              <div className="space-y-2">
                {activeVocabWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setVocabIndex(idx);
                      setShowVocabHint(false);
                      setActiveTab('card');
                    }}
                    className={cn(
                      "w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer",
                      vocabIndex === idx
                        ? "border-[#002147] bg-[#002147]/5 dark:border-sky-400 dark:bg-sky-950/20"
                        : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20"
                    )}
                  >
                    <div>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">{word.word}</h4>
                      <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">{word.meaningVi}</p>
                    </div>
                    <span className="text-[10px] font-sans font-semibold text-rose-500 italic">({word.wordType})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
