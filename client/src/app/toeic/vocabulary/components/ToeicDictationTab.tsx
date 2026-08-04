'use client';

import React, { useState } from 'react';
import { Volume2, Snail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOEICList } from '@/data/toeicVocab';
import { speakWord } from './shared';

interface Props {
  selectedList: TOEICList;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ToeicDictationTab({ selectedList, currentIndex, setCurrentIndex }: Props) {
  const [typedInput, setTypedInput] = useState('');
  const [inputFeedback, setInputFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showInputHint, setShowInputHint] = useState(false);

  const currentWord = selectedList.words[currentIndex];

  const handleCheckTextAnswer = () => {
    if (!currentWord) return;
    const isCorrect = typedInput.trim().toLowerCase() === currentWord.word.toLowerCase();

    if (isCorrect) {
      setInputFeedback('correct');
      speakWord(currentWord.word);
      setTimeout(() => {
        setTypedInput('');
        setInputFeedback(null);
        setShowInputHint(false);
        if (currentIndex < selectedList.words.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          alert('Chúc mừng! Bạn đã hoàn thành danh sách từ này.');
          setCurrentIndex(0);
        }
      }, 1500);
    } else {
      setInputFeedback('wrong');
      setTimeout(() => setInputFeedback(null), 800);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="premium-card p-5 sm:p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl rounded-3xl space-y-4">
      <div>
        <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/10">
          Luyện Nghe Chính Tả
        </span>
        <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 mt-1">Nghe âm thanh và gõ lại từ vựng</h3>
      </div>

      <div className="flex flex-col landscape:flex-row gap-4">
        {/* Audio Playing Station */}
        <div className="flex-1 p-5 landscape:p-3 bg-slate-900 text-white rounded-2xl flex flex-row landscape:flex-col items-center justify-center gap-3 relative overflow-hidden shadow-inner min-h-[90px] landscape:min-h-[130px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          
          <button
            onClick={() => speakWord(currentWord.word, false)}
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary/95 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          <button
            onClick={() => speakWord(currentWord.word, true)}
            className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Nghe tốc độ chậm"
          >
            <Snail className="w-4 h-4" />
          </button>
        </div>

        {/* Input and checks */}
        <div className="flex-1 space-y-2.5">
          <input
            type="text"
            value={typedInput}
            onChange={(e) => {
              setTypedInput(e.target.value);
              if (inputFeedback) setInputFeedback(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCheckTextAnswer();
            }}
            placeholder="Gõ từ nghe được..."
            className={cn(
              "w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 rounded-xl text-sm font-black focus:outline-none focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner",
              inputFeedback === 'correct'
                ? "border-emerald-500 bg-emerald-50/10 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400"
                : inputFeedback === 'wrong'
                  ? "border-rose-500 bg-rose-50/10 dark:bg-rose-500/10 text-rose-800 dark:text-rose-400 animate-shake"
                  : "border-slate-200 dark:border-slate-700 focus:border-primary"
            )}
          />

          {showInputHint && (
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 text-[11px] space-y-0.5">
              <p className="font-bold text-slate-500 dark:text-slate-400">Nghĩa tiếng Việt:</p>
              <p className="font-black text-primary">&quot;{currentWord.meaningVi}&quot;</p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setShowInputHint(true)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              💡 Gợi ý
            </button>
            
            <button
              onClick={handleCheckTextAnswer}
              className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
            >
              Kiểm Tra (Enter)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
