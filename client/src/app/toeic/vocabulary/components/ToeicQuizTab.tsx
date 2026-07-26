'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOEICList, TOEICCategory } from '@/data/toeicVocab';
import { speakWord } from './shared';

interface Props {
  selectedList: TOEICList;
  selectedCategory: TOEICCategory | null;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ToeicQuizTab({
  selectedList,
  selectedCategory,
  currentIndex,
  setCurrentIndex,
}: Props) {
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isReverseQuiz, setIsReverseQuiz] = useState(false);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const quizTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentWord = selectedList.words[currentIndex];

  useEffect(() => {
    setupQuizQuestion(currentIndex);
    return () => {
      if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
    };
  }, [currentIndex, isReverseQuiz]);

  const setupQuizQuestion = (idx: number) => {
    if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
    setQuizAnswered(false);
    setSelectedOpt(null);

    const word = selectedList.words[idx];
    if (!word) return;

    const allCategoryWords = selectedCategory?.lists.flatMap(l => l.words) || selectedList.words;
    const filteredWrong = allCategoryWords.filter(w => w.word !== word.word);
    const shuffledWrong = [...filteredWrong].sort(() => 0.5 - Math.random());
    const selectedWrong = shuffledWrong.slice(0, 3);

    let options: string[] = [];
    if (isReverseQuiz) {
      options = [word.word, ...selectedWrong.map(w => w.word)];
    } else {
      options = [word.meaningVi, ...selectedWrong.map(w => w.meaningVi)];
    }

    setQuizOptions(options.sort(() => 0.5 - Math.random()));
  };

  const handleQuizAnswer = (option: string) => {
    if (quizAnswered || !currentWord) return;
    setQuizAnswered(true);
    setSelectedOpt(option);

    const isCorrect = isReverseQuiz
      ? option.toLowerCase() === currentWord.word.toLowerCase()
      : option === currentWord.meaningVi;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      speakWord(currentWord.word);
      quizTimerRef.current = setTimeout(() => {
        if (currentIndex < selectedList.words.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          alert(`Chúc mừng! Bạn đã hoàn thành bài trắc nghiệm với điểm số: ${quizScore + 1}/${selectedList.words.length}`);
          setCurrentIndex(0);
          setQuizScore(0);
        }
      }, 1300);
    }
  };

  const toggleQuizMode = () => {
    setIsReverseQuiz(prev => !prev);
  };

  if (!currentWord) return null;

  return (
    <div className="premium-card p-5 sm:p-8 bg-white border border-slate-100 shadow-xl rounded-3xl space-y-4">
      {/* Score Header */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-2">
        <div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Điểm số</span>
          <span className="text-sm font-black text-primary">{quizScore} / {selectedList.words.length}</span>
        </div>
        
        <button
          onClick={toggleQuizMode}
          className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3 text-primary" />
          Đổi chiều: {isReverseQuiz ? "Vi -> Eng" : "Eng -> Vi"}
        </button>
      </div>

      {/* Split layout */}
      <div className="flex flex-col landscape:flex-row gap-4">
        {/* Question Box */}
        <div className="flex-1 p-5 landscape:p-4 bg-slate-900 text-white rounded-2xl shadow-inner font-bold text-center flex flex-col justify-center relative overflow-hidden min-h-[100px] landscape:min-h-[140px]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest block mb-1">Chọn nghĩa đúng</span>
          
          {isReverseQuiz ? (
            <span className="text-lg font-black text-primary block leading-snug">
              {currentWord.meaningVi}
            </span>
          ) : (
            <div>
              <span className="text-xl sm:text-2xl landscape:text-lg font-black block leading-none">{currentWord.word}</span>
              <span className="text-xs text-slate-400 font-serif font-bold mt-1 block">{currentWord.phonetic}</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-1 gap-2.5">
          {quizOptions.map((opt) => {
            const isCorrect = isReverseQuiz
              ? opt.toLowerCase() === currentWord.word.toLowerCase()
              : opt === currentWord.meaningVi;
            const isSelected = selectedOpt === opt;

            return (
              <button
                key={opt}
                onClick={() => handleQuizAnswer(opt)}
                disabled={quizAnswered}
                className={cn(
                  "p-3 rounded-xl border-2 text-xs font-black text-left transition-all active:scale-[0.98] cursor-pointer",
                  quizAnswered
                    ? isCorrect
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                      : isSelected
                        ? "bg-rose-50 border-rose-500 text-rose-800"
                        : "bg-white border-slate-100 text-slate-350"
                    : "bg-white border-slate-100 hover:border-primary hover:bg-primary/5 text-slate-700"
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Panel */}
      {quizAnswered && (
        <div className={cn(
          "p-3 rounded-xl border animate-in slide-in-from-top-2 duration-300 text-xs",
          selectedOpt === (isReverseQuiz ? currentWord.word : currentWord.meaningVi)
            ? "bg-emerald-50/40 border-emerald-200/20 text-emerald-800"
            : "bg-rose-50/40 border-rose-200/20 text-rose-800"
        )}>
          <h4 className="font-black uppercase tracking-wider">
            {selectedOpt === (isReverseQuiz ? currentWord.word : currentWord.meaningVi) ? "🎉 Đáp án chính xác!" : "⚠️ Sai rồi!"}
          </h4>
          <p className="font-bold text-slate-700 mt-0.5">
            {currentWord.word} ({currentWord.wordType}): {currentWord.meaningVi}
          </p>
        </div>
      )}
    </div>
  );
}
