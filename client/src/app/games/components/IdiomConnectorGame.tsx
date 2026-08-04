'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCcw, RefreshCw, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATIC_SCRAMBLE_IDIOMS } from '@/data/games/gameData';
import { speak, shuffle, SimpleGameProps } from './shared';

export default function IdiomConnectorGame({ onClose, awardXp }: SimpleGameProps) {
  const [idiomList, setIdiomList] = useState<any[]>([]);
  const [idiomIdx, setIdiomIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wordsPool, setWordsPool] = useState<{ word: string; originalIdx: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ word: string; poolIdx: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const initGame = useCallback(() => {
    const list = shuffle(STATIC_SCRAMBLE_IDIOMS).slice(0, 5);
    setIdiomList(list);
    setIdiomIdx(0);
    setScore(0);
    setDone(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 25, 'Idiom Connector Game');
    }
  }, [done, score, awardXp]);

  const activeIdiom = idiomList[idiomIdx];

  const initIdiom = useCallback(() => {
    if (!activeIdiom) return;
    const words = activeIdiom.idiom.split(' ');
    const shuffled = words
      .map((w: string, i: number) => ({ word: w, originalIdx: i, used: false }))
      .sort(() => Math.random() - 0.5);
    setWordsPool(shuffled);
    setAnswer([]);
    setIsCorrect(null);
  }, [activeIdiom]);

  useEffect(() => { initIdiom(); }, [initIdiom]);

  const selectWord = (poolIdx: number) => {
    if (wordsPool[poolIdx].used) return;
    const word = wordsPool[poolIdx].word;
    setWordsPool(prev => prev.map((item, i) => i === poolIdx ? { ...item, used: true } : item));
    setAnswer(prev => [...prev, { word, poolIdx }]);
    setIsCorrect(null);
  };

  const removeWord = (answerIdx: number) => {
    const item = answer[answerIdx];
    setWordsPool(prev => prev.map((w, i) => i === item.poolIdx ? { ...w, used: false } : w));
    setAnswer(prev => prev.filter((_, i) => i !== answerIdx));
    setIsCorrect(null);
  };

  const resetIdiom = () => {
    setWordsPool(prev => prev.map(w => ({ ...w, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const spelled = answer.map(a => a.word).join(' ');
    if (spelled.toLowerCase() === activeIdiom.idiom.toLowerCase()) {
      setIsCorrect(true);
      setScore(s => s + 1);
      speak(activeIdiom.idiom);
      setTimeout(() => {
        if (idiomIdx < idiomList.length - 1) {
          setIdiomIdx(i => i + 1);
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
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
          <div>
            <h2 className="text-xl font-black text-white">Idiom Connector</h2>
            <p className="text-violet-200 text-xs font-medium">Ghép nối từ tạo thành thành ngữ tiếng Anh hoàn chỉnh (Ngẫu nhiên)</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500">
            <div className="text-5xl">💡</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Hoàn Thành Thành Ngữ!</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Bạn đã ghép đúng {score}/{idiomList.length} thành ngữ phổ biến.</p>
            <p className="text-green-600 dark:text-green-400 font-black">+{score * 25} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-violet-600 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-violet-600/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Quay Về</button>
            </div>
          </div>
        ) : activeIdiom ? (
          <div className="p-8 space-y-6">
            {/* Hint Box */}
            <div className="p-4 bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-800 rounded-2xl text-violet-800 dark:text-violet-400 text-sm font-medium leading-relaxed">
              <span className="font-bold block text-xs uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-1">Ý nghĩa của thành ngữ</span>
              {activeIdiom?.hint}
            </div>

            {/* Answer Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Thành ngữ bạn đang ghép</span>
              <div className={cn(
                "min-h-20 p-4 rounded-2xl border-2 border-dashed flex flex-wrap gap-2.5 items-center justify-center transition-all duration-300",
                isCorrect === true ? "bg-green-50 dark:bg-green-500/10 border-green-400 dark:border-green-800" :
                  isCorrect === false ? "bg-red-50 dark:bg-red-500/10 border-red-400 dark:border-red-800 animate-shake" :
                    "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
              )}>
                {answer.map((item, idx) => (
                  <button key={idx} onClick={() => removeWord(idx)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 border border-slate-700 dark:border-slate-600 text-white font-bold text-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm animate-in zoom-in duration-200">
                    {item.word}
                  </button>
                ))}
                {answer.length === 0 && <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">Nhấp các từ bên dưới để bắt đầu sắp xếp thành ngữ</span>}
              </div>
            </div>

            {/* Pool Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Các từ vựng</span>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {wordsPool.map((item, idx) => (
                  <button key={idx} onClick={() => selectWord(idx)} disabled={item.used}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center border-2 transition-all cursor-pointer shadow-sm",
                      item.used ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 scale-95" :
                        "bg-white dark:bg-slate-900 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400 hover:scale-105 hover:border-violet-400 dark:hover:border-violet-600 active:scale-90"
                    )}>
                    {item.word}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <button onClick={resetIdiom}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 text-slate-500 dark:text-slate-400 cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5" /> Xóa Tất Cả
              </button>
              <button onClick={checkAnswer} disabled={answer.length !== wordsPool.length}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-indigo-600/20">
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
