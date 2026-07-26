'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { TOEICList } from '@/data/toeicVocab';
import { speakWord, getWordInputHint } from './shared';

interface Props {
  selectedList: TOEICList;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ToeicFillTab({ selectedList, currentIndex, setCurrentIndex }: Props) {
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
    <div className="premium-card p-5 sm:p-8 bg-white border border-slate-100 shadow-xl rounded-3xl space-y-4">
      <div>
        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
          Điền Từ Tiếng Anh
        </span>
        <h3 className="text-base sm:text-lg font-black text-slate-800 mt-1">Dịch từ sau sang tiếng Anh</h3>
      </div>

      <div className="flex flex-col landscape:flex-row gap-4">
        {/* Definition Box */}
        <div className="flex-1 p-4 landscape:p-3 bg-slate-50 border border-slate-200/50 rounded-2xl text-center shadow-inner flex flex-col justify-center min-h-[90px] landscape:min-h-[130px]">
          <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block font-mono">Từ loại: {currentWord.wordType}</span>
          <h4 className="text-lg font-black text-slate-800 mt-1">&quot;{currentWord.meaningVi}&quot;</h4>
          <p className="text-[11px] text-slate-450 italic mt-0.5 line-clamp-2">Định nghĩa: {currentWord.meaningEn}</p>
        </div>

        {/* Input Fields */}
        <div className="flex-1 space-y-2.5">
          <div className="relative">
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
              placeholder="Gõ từ tại đây..."
              className={cn(
                "w-full px-4 py-2.5 bg-slate-50 border-2 rounded-xl text-sm font-black focus:outline-none focus:bg-white transition-all shadow-inner",
                inputFeedback === 'correct'
                  ? "border-emerald-500 bg-emerald-50/10 text-emerald-800"
                  : inputFeedback === 'wrong'
                    ? "border-rose-500 bg-rose-50/10 text-rose-800 animate-shake"
                    : "border-slate-200 focus:border-primary"
              )}
            />
          </div>

          {showInputHint && (
            <p className="text-[10px] font-black text-primary font-mono tracking-widest bg-primary/5 p-2 rounded-lg border border-primary/10">
              Gợi ý: {getWordInputHint(currentWord.word)}
            </p>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setShowInputHint(true)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
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
