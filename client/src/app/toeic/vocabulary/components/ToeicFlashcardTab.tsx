'use client';

import React, { useState } from 'react';
import { Volume2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOEICList, TOEICWord } from '@/data/toeicVocab';
import { speakWord } from './shared';

interface Props {
  selectedList: TOEICList;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  learnedStatus: Record<string, boolean>;
  setLearnedStatus: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setLearnedCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function ToeicFlashcardTab({
  selectedList,
  currentIndex,
  setCurrentIndex,
  learnedStatus,
  setLearnedStatus,
  setLearnedCount,
}: Props) {
  const [showHint, setShowHint] = useState(false);
  const currentWord = selectedList.words[currentIndex];

  if (!currentWord) return null;

  return (
    <div className="space-y-4">
      {/* 3D Flip Card */}
      <div className="perspective-1000 w-full h-[260px] landscape:h-[200px] xs:h-[300px] xs:landscape:h-[210px] sm:h-[360px] sm:landscape:h-[240px] md:h-[380px]">
        <div
          onClick={() => setShowHint(prev => !prev)}
          className={cn(
            "relative w-full h-full preserve-3d transition-transform duration-500 border border-slate-150/60 rounded-[2rem] shadow-lg cursor-pointer",
            showHint ? "rotate-y-180" : ""
          )}
        >
          {/* Front View */}
          <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 p-4 sm:p-8 rounded-[2rem]">
            <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[9px] font-black rounded-full uppercase tracking-wider mb-2 landscape:mb-1">
              {currentWord.wordType}
            </span>
            <h2 className="text-3xl sm:text-4xl landscape:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-1">
              {currentWord.word}
            </h2>
            <p className="text-sm sm:text-base landscape:text-xs font-serif text-slate-400 dark:text-slate-500 font-bold mb-4 landscape:mb-2">
              {currentWord.phonetic}
            </p>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                speakWord(currentWord.word);
              }}
              className="w-12 h-12 landscape:w-10 landscape:h-10 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <Volume2 className="w-5 h-5 landscape:w-4 landscape:h-4" />
            </button>
            
            <p className="absolute bottom-4 landscape:bottom-2 text-[8px] text-slate-300 dark:text-slate-600 font-black uppercase tracking-widest">Bấm vào thẻ để xem nghĩa</p>
          </div>

          {/* Back View */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center bg-slate-900 text-white p-4 sm:p-6 overflow-y-auto rounded-[2rem]">
            <div className="space-y-3 landscape:space-y-1.5 w-full">
              <div>
                <span className="text-[8px] text-primary font-black uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                <h3 className="text-xl sm:text-2xl landscape:text-lg font-black text-primary mt-0.5">
                  {currentWord.meaningVi}
                </h3>
              </div>

              <div className="border-t border-slate-800 pt-2">
                <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest block">Định nghĩa tiếng Anh</span>
                <p className="text-[11px] sm:text-xs landscape:text-[10px] text-slate-350 mt-0.5 italic font-medium leading-normal">
                  &quot;{currentWord.meaningEn}&quot;
                </p>
              </div>

              <div className="border-t border-slate-800 pt-2 text-left">
                <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest block mb-0.5">Ví dụ</span>
                <p className="text-xs landscape:text-[10px] text-slate-200 font-semibold italic">
                  &quot;{currentWord.example}&quot;
                </p>
                <p className="text-[10px] text-primary/80 mt-0.5 italic">
                  &quot;{currentWord.exampleVi}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-row items-center gap-3">
        <div className="flex gap-2 flex-1">
          <button
            onClick={() => {
              setShowHint(false);
              if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
            }}
            disabled={currentIndex === 0}
            className="flex-1 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-xs disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
          >
            Trước
          </button>
          <button
            onClick={() => {
              setShowHint(false);
              if (currentIndex < selectedList.words.length - 1) {
                setCurrentIndex(prev => prev + 1);
              }
            }}
            disabled={currentIndex === selectedList.words.length - 1}
            className="flex-1 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-xs disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
          >
            Tiếp
          </button>
        </div>

        <button
          onClick={() => {
            const wordId = currentWord.id;
            setLearnedStatus(prev => {
              const updated = { ...prev, [wordId]: true };
              setLearnedCount(Object.values(updated).filter(Boolean).length);
              return updated;
            });
            setTimeout(() => {
              setShowHint(false);
              if (currentIndex < selectedList.words.length - 1) {
                setCurrentIndex(prev => prev + 1);
              }
            }, 200);
          }}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-emerald-100 cursor-pointer shrink-0"
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Đã thuộc
        </button>
      </div>
    </div>
  );
}
