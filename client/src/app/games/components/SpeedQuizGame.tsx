'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATIC_QUIZ_QUESTIONS } from '@/data/games/gameData';
import { shuffle, getCategoryLabel, GameVocabularyRecap, GameComponentProps } from './shared';

export default function SpeedQuizGame({ dbWords, category, onClose, awardXp, onSaveWord, savedWords, savingWord }: GameComponentProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);
  const [sessionWords, setSessionWords] = useState<any[]>([]);

  const initGame = useCallback(() => {
    let generated: any[] = [];

    if (dbWords && dbWords.length >= 10) {
      const shuffledWords = shuffle(dbWords);
      const selectedFullWords = shuffledWords.slice(0, 10);
      setSessionWords(selectedFullWords);
      for (let index = 0; index < 10; index++) {
        const target = shuffledWords[index];
        const isFillInBlank = Math.random() > 0.5 && target.example && target.example.toLowerCase().includes(target.word.toLowerCase());
        const distractors = shuffledWords
          .filter(w => w.word !== target.word)
          .slice(0, 3);

        if (isFillInBlank) {
          const regex = new RegExp(`\\b${target.word}\\b`, 'gi');
          const blanked = target.example.replace(regex, '_______');
          const options = shuffle([target.word, ...distractors.map(d => d.word)]);
          const answer = options.indexOf(target.word);
          generated.push({
            q: `Điền từ thích hợp vào chỗ trống:\n"${blanked}" (${target.exampleVi || 'Dịch nghĩa câu'})`,
            options,
            answer
          });
        } else {
          const options = shuffle([target.meaningVi, ...distractors.map(d => d.meaningVi)]);
          const answer = options.indexOf(target.meaningVi);
          generated.push({
            q: `Từ "${target.word}" trong tiếng Việt mang ý nghĩa là gì?`,
            options,
            answer
          });
        }
      }
    }

    if (generated.length === 0) {
      generated = shuffle(STATIC_QUIZ_QUESTIONS).slice(0, 10);
      setSessionWords([]);
    }

    setQuestions(generated);
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(15);
    setDone(false);
  }, [dbWords]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (done && score > 0) {
      awardXp?.(score * 20, 'Speed Quiz Game');
    }
  }, [done, score, awardXp]);

  useEffect(() => {
    if (done || selected !== null || questions.length === 0) return;
    if (timeLeft === 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, selected, questions]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const q = questions[qIdx];
    if (idx === q.answer) setScore(s => s + 1);

    setTimeout(() => {
      if (qIdx < questions.length - 1) {
        setQIdx(q => q + 1);
        setSelected(null);
        setTimeLeft(15);
      } else {
        setDone(true);
      }
    }, 1200);
  };

  const q = questions[qIdx];
  const pct = (timeLeft / 15) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-8 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-black opacity-85">Câu hỏi {qIdx + 1}/{questions.length}</span>
            <span className={cn("text-2xl font-black", timeLeft <= 5 && "animate-pulse text-yellow-300")}>{timeLeft}s</span>
            <button onClick={onClose} className="p-1.5 bg-white/20 rounded-full text-white"><X className="w-4 h-4" /></button>
          </div>
          <p className="text-pink-100 text-[10px] font-bold uppercase tracking-widest mb-2">Danh mục: {getCategoryLabel(category)}</p>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {done ? (
          <div className="p-10 text-center space-y-5 animate-in zoom-in duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="text-5xl">{score >= 4 ? '🏆' : score >= 3 ? '🎉' : '📚'}</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Trả lời đúng {score}/{questions.length} câu!</h3>
            <p className="text-slate-500 dark:text-slate-400 font-semibold">+{score * 20} XP</p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold flex items-center gap-1 shadow-lg shadow-rose-500/30 cursor-pointer"><RotateCcw className="w-4 h-4" />Chơi Lại</button>
              <button onClick={onClose} className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Quay Về</button>
            </div>
            <GameVocabularyRecap words={sessionWords} onSaveWord={onSaveWord} savedWords={savedWords} savingWord={savingWord} />
          </div>
        ) : q ? (
          <div className="p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 leading-snug whitespace-pre-line">{q.q}</h3>
            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={cn(
                    "p-4 rounded-2xl text-sm font-bold border-2 text-left transition-all cursor-pointer",
                    selected === null ? "border-slate-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 hover:bg-rose-50/50 dark:hover:bg-rose-500/10 text-slate-700 dark:text-slate-300" :
                      i === q.answer ? "bg-green-50 dark:bg-green-500/10 border-green-400 dark:border-green-800 text-green-700 dark:text-green-400" :
                        i === selected ? "bg-rose-50 dark:bg-rose-500/10 border-rose-400 dark:border-rose-800 text-rose-700 dark:text-rose-400" :
                          "border-slate-100 dark:border-slate-800 opacity-40 text-slate-700 dark:text-slate-300"
                  )}
                >{opt}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">Đang chuẩn bị câu hỏi...</div>
        )}
      </div>
    </div>
  );
}
