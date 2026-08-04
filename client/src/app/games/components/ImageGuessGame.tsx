'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCcw, RefreshCw, Play, ImageIcon, HelpCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IMAGE_GUESS_POOL } from '@/data/games/gameData';
import { speak, shuffle, SimpleGameProps } from './shared';

export default function ImageGuessGame({ onClose, awardXp }: SimpleGameProps) {
  const [list, setList] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lettersPool, setLettersPool] = useState<{ char: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ char: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const initGame = useCallback(() => {
    const selected = shuffle(IMAGE_GUESS_POOL).slice(0, 8);
    setList(selected);
    setIdx(0);
    setScore(0);
    setDone(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 20, 'Image Guessing Game');
    }
  }, [done, score, awardXp]);

  const activeItem = list[idx];

  const initItem = useCallback(() => {
    if (!activeItem) return;
    setImgLoading(true);
    const wordChars = activeItem.word.split('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const poolChars = [...wordChars];
    while (poolChars.length < 12) {
      const randChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      poolChars.push(randChar);
    }
    const shuffled = poolChars
      .map((c: string, i: number) => ({ char: c, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setLettersPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
    setShowHint(false);
  }, [activeItem]);

  useEffect(() => {
    initItem();
  }, [initItem]);

  const selectChar = useCallback((poolIdx: number) => {
    if (!activeItem) return;
    if (lettersPool[poolIdx].used || answer.length >= activeItem.word.length) return;
    const char = lettersPool[poolIdx].char;
    setLettersPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { char, poolIdx }]);
    setIsCorrect(null);
  }, [lettersPool, answer, activeItem]);

  const removeChar = useCallback((answerIdx: number) => {
    const item = answer[answerIdx];
    if (!item) return;
    setLettersPool(prev => prev.map((l, i) => i === item.poolIdx ? { ...l, used: false } : l));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  }, [answer]);

  const resetItem = () => {
    setLettersPool(prev => prev.map(l => ({ ...l, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = useCallback(() => {
    if (!activeItem) return;
    const spelled = answer.map(a => a.char).join('');
    if (spelled === activeItem.word) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeItem.word);
      setTimeout(() => {
        if (idx < list.length - 1) {
          setIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  }, [answer, activeItem, idx, list]);

  // Keyboard support
  useEffect(() => {
    if (done || !activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'BACKSPACE') {
        if (answer.length > 0) {
          removeChar(answer.length - 1);
        }
      } else if (key === 'ENTER') {
        if (answer.length === activeItem.word.length) {
          checkAnswer();
        }
      } else if (/^[A-Z]$/.test(key)) {
        const poolIdx = lettersPool.findIndex(l => l.char === key && !l.used);
        if (poolIdx !== -1) {
          selectChar(poolIdx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lettersPool, answer, done, activeItem, selectChar, removeChar, checkAnswer]);

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-xl lg:max-w-4xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> Image Guessing
            </h2>
            <p className="text-amber-100 text-xs font-medium">Nhìn hình ảnh thực tế đoán từ vựng tiếng Anh tương ứng</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-6 animate-in zoom-in duration-500">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">Hoàn Thành Thử Thách!</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base">Bạn đã xuất sắc đoán đúng <strong className="text-amber-600 dark:text-amber-400 font-black">{score}/{list.length}</strong> từ vựng qua ảnh thực tế.</p>
            <div className="inline-block px-6 py-2 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-150">
              <p className="text-amber-700 dark:text-amber-400 font-black text-2xl">+{score * 20} XP</p>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={initGame} className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:opacity-90 active:scale-95 transition-all"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-8 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
          </div>
        ) : activeItem ? (
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Image Box & Hints */}
              <div className="space-y-4">
                <div className="w-full h-44 sm:h-52 lg:h-64 relative rounded-2xl overflow-hidden shadow-md border border-slate-150 bg-slate-50 dark:bg-slate-800 flex items-center justify-center group">
                  {imgLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                    </div>
                  )}
                  <img 
                    src={activeItem.imageUrl} 
                    alt="Guess the word" 
                    referrerPolicy="no-referrer"
                    onLoad={() => setImgLoading(false)}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                      imgLoading ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                    Round {idx + 1}/{list.length}
                  </div>
                </div>

                {/* Hint Alert Box */}
                {showHint ? (
                  <div className="p-4 bg-amber-50 dark:bg-amber-500/10/80 border border-amber-100 rounded-2xl text-amber-900 text-xs sm:text-sm font-medium leading-relaxed animate-in slide-in-from-top-2 duration-300">
                    <span className="font-black block text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">Gợi ý nghĩa từ vựng</span>
                    Nghĩa: <span className="font-bold text-amber-900">{activeItem.vi}</span> — {activeItem.hint}
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowHint(true)}
                    className="w-full py-3 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100/70 border border-amber-100 rounded-2xl text-xs sm:text-sm font-black text-amber-700 dark:text-amber-400 hover:text-amber-800 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <HelpCircle className="w-4 h-4" /> Bấm xem gợi ý tiếng Việt
                  </button>
                )}
              </div>

              {/* Right Column: Interaction, Slots & Letters */}
              <div className="space-y-6">
                {/* Answer Slots Display */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Từ cần tìm ({activeItem.word.length} chữ cái)</span>
                  <div className={cn(
                    "min-h-16 p-3 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center justify-center transition-all duration-300",
                    isCorrect === true ? "bg-green-50 dark:bg-green-500/10/80 border-green-400 shadow-inner animate-bounce" :
                      isCorrect === false ? "bg-red-50 dark:bg-red-500/10/80 border-red-400 animate-shake shadow-inner" :
                        "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  )}>
                    {Array.from({ length: activeItem.word.length }).map((_, charIdx) => {
                      const filled = answer[charIdx];
                      return (
                        <button
                          key={charIdx}
                          onClick={() => filled && removeChar(charIdx)}
                          className={cn(
                            "w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-lg font-black flex items-center justify-center transition-all shadow-sm border-2 cursor-pointer",
                            filled 
                              ? "bg-slate-900 border-slate-800 text-white hover:scale-105 active:scale-95" 
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-300 cursor-default"
                          )}
                        >
                          {filled ? filled.char : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Letters Pool Box */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Các chữ cái gợi ý</span>
                  <div className="grid grid-cols-6 gap-2 justify-center max-w-sm mx-auto lg:mx-0">
                    {lettersPool.map((item, poolIdx) => (
                      <button
                        key={poolIdx}
                        onClick={() => selectChar(poolIdx)}
                        disabled={item.used}
                        className={cn(
                          "w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-base sm:text-lg font-black flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                          item.used
                            ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 scale-95 cursor-default"
                            : "bg-white dark:bg-slate-900 border-amber-100 text-amber-800 hover:scale-110 hover:border-amber-300 hover:bg-amber-50 dark:bg-amber-500/10/20 active:scale-90"
                        )}
                      >
                        {item.char}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={resetItem}
                    className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 text-slate-500 dark:text-slate-400 cursor-pointer active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
                  </button>
                  <button
                    onClick={checkAnswer}
                    disabled={answer.length !== activeItem.word.length}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-xs hover:opacity-95 transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
                  >
                    Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}
