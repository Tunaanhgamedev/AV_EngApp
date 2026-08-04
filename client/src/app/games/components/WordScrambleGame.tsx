'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCcw, RefreshCw, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATIC_SCRAMBLE_WORDS } from '@/data/games/gameData';
import { speak, shuffle, getCategoryLabel, GameVocabularyRecap, GameComponentProps } from './shared';

export default function WordScrambleGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: GameComponentProps) {
  const [scrambleList, setScrambleList] = useState<any[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lettersPool, setLettersPool] = useState<{ char: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ char: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  const initGame = useCallback(() => {
    let pool = STATIC_SCRAMBLE_WORDS;
    let trackWords: any[] = [];
    if (dbWords && dbWords.length >= 8) {
      pool = dbWords.map(w => ({
        word: w.word.toUpperCase(),
        hint: `Từ loại: ${w.wordType || 'từ'}. Nghĩa Việt: ${w.meaningVi}${w.phonetic ? ` (Phiên âm: ${w.phonetic})` : ''}`
      }));
      const shuffled = shuffle(pool).slice(0, 10);
      const list = shuffled;
      trackWords = shuffled.map(s => {
        const orig = dbWords.find(d => d.word.toUpperCase() === s.word);
        return orig || { word: s.word.charAt(0) + s.word.slice(1).toLowerCase(), meaningVi: s.hint, meaningEn: s.word, wordType: '', phonetic: '' };
      });
      setSessionWords(trackWords);
      setScrambleList(list);
    } else {
      const list = shuffle(pool).slice(0, 10);
      setSessionWords(list.map(s => ({ word: s.word.charAt(0) + s.word.slice(1).toLowerCase(), meaningVi: s.hint, meaningEn: s.word, wordType: 'Noun', phonetic: '' })));
      setScrambleList(list);
    }
    setWordIdx(0);
    setScore(0);
    setDone(false);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 15, 'Word Scramble Game');
    }
  }, [done, score, awardXp]);

  const activeWord = scrambleList[wordIdx];

  const initWord = useCallback(() => {
    if (!activeWord) return;
    const chars = activeWord.word.split('');
    const shuffled = chars
      .map((c: string, i: number) => ({ char: c, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setLettersPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
  }, [activeWord]);

  useEffect(() => { initWord(); }, [initWord]);

  const selectChar = (poolIdx: number) => {
    if (lettersPool[poolIdx].used) return;
    const char = lettersPool[poolIdx].char;
    setLettersPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { char, poolIdx }]);
    setIsCorrect(null);
  };

  const removeChar = (answerIdx: number) => {
    const item = answer[answerIdx];
    setLettersPool(prev => prev.map((l, i) => i === item.poolIdx ? { ...l, used: false } : l));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  };

  const resetWord = () => {
    setLettersPool(prev => prev.map(l => ({ ...l, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const spelled = answer.map(a => a.char).join('');
    if (spelled === activeWord.word) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeWord.word);
      setTimeout(() => {
        if (wordIdx < scrambleList.length - 1) {
          setWordIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Word Scramble</h2>
            <p className="text-purple-200 text-xs font-medium">Ghép các chữ cái xáo trộn thành một từ có nghĩa (Danh mục: {getCategoryLabel(category)})</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">🐝</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Hoàn Thành Ghép Chữ!</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Bạn đã ghép đúng {score}/{scrambleList.length} từ vựng.</p>
            <p className="text-green-600 dark:text-green-400 font-black">+{score * 15} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-purple-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
          </div>
        ) : activeWord ? (
          <div className="p-8 space-y-6">
            {/* Hint Box */}
            <div className="p-4 bg-purple-50 dark:bg-purple-500/10 border border-purple-100 rounded-2xl text-purple-800 text-sm font-medium leading-relaxed">
              <span className="font-bold block text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">Gợi ý từ vựng</span>
              {activeWord?.hint}
            </div>

            {/* Answer Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Từ bạn ghép</span>
              <div className={cn(
                "min-h-16 p-3 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center justify-center transition-all duration-300",
                isCorrect === true ? "bg-green-50 dark:bg-green-500/10 border-green-400" :
                  isCorrect === false ? "bg-red-50 dark:bg-red-500/10 border-red-400 animate-shake" :
                    "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              )}>
                {answer.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => removeChar(idx)}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-white font-black text-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm animate-in zoom-in duration-200"
                  >
                    {item.char}
                  </button>
                ))}
                {answer.length === 0 && <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">Nhấp các chữ cái bên dưới để bắt đầu</span>}
              </div>
            </div>

            {/* Pool Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Các chữ cái</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {lettersPool.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectChar(idx)}
                    disabled={item.used}
                    className={cn(
                      "w-12 h-12 rounded-xl text-lg font-black flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                      item.used
                        ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 scale-95"
                        : "bg-white dark:bg-slate-900 border-purple-200 text-purple-700 dark:text-purple-400 hover:scale-115 hover:border-purple-400 active:scale-90"
                    )}
                  >
                    {item.char}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={resetWord}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 text-slate-500 dark:text-slate-400 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
              </button>
              <button
                onClick={checkAnswer}
                disabled={answer.length !== activeWord?.word.length}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-600/20"
              >
                Kiểm Tra <Play className="w-3 h-3 fill-white text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">Đang chuẩn bị...</div>
        )}
      </div>
    </div>
  );
}
