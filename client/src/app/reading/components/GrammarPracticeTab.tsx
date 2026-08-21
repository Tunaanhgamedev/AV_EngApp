'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, RefreshCcw, Sparkles, Trophy, HelpCircle, ArrowRight, Zap, Filter, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GRAMMAR_PRACTICE_QUESTIONS, GrammarQuestion } from '../grammarData';

interface GrammarPracticeTabProps {
  speak: (text: string) => void;
}

export default function GrammarPracticeTab({ speak }: GrammarPracticeTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  const filteredQuestions = GRAMMAR_PRACTICE_QUESTIONS.filter(q => {
    const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchLevel = selectedLevel === 'all' || q.level === selectedLevel;
    return matchCat && matchLevel;
  });

  const handleSelectOption = (qId: string, optIdx: number, correctIdx: number) => {
    if (userAnswers[qId] !== undefined) return; // Already answered

    setUserAnswers(prev => ({ ...prev, [qId]: optIdx }));

    if (optIdx === correctIdx) {
      const nextStreak = currentStreak + 1;
      setCurrentStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
    } else {
      setCurrentStreak(0);
    }
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCurrentStreak(0);
  };

  const answeredCount = Object.keys(userAnswers).filter(id =>
    filteredQuestions.some(q => q.id === id)
  ).length;

  const correctCount = Object.entries(userAnswers).filter(([id, optIdx]) => {
    const q = filteredQuestions.find(item => item.id === id);
    return q && q.correctIndex === optIdx;
  }).length;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header & Stats Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-amber-500" /> Interactive Practice Arena
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
              Luyện Tập Thực Chiến: Đại Từ, Đuôi Danh Từ & Vị Trí Câu
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Bộ câu hỏi chọn lọc với giải thích chi tiết, công thức áp dụng và mẹo giải nhanh.
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 block">
                Chuỗi đúng (Streak)
              </span>
              <span className="text-xl font-black text-amber-600 dark:text-amber-300">
                ⚡ {currentStreak}
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-400 block">
                Điểm số
              </span>
              <span className="text-xl font-black text-blue-600 dark:text-blue-300">
                {correctCount}/{answeredCount}
              </span>
            </div>
            {answeredCount > 0 && (
              <button
                onClick={resetQuiz}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                title="Làm lại từ đầu"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category and Level Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl overflow-x-auto gap-1">
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'pronoun_reference', label: '🔗 Đại Từ & Quy Chiếu' },
              { id: 'noun_plurals', label: '🏷️ Đuôi Danh Từ & Số Nhiều' },
              { id: 'word_positions', label: '🎯 Vị Trí Từ Loại' },
              { id: 'tenses_agreement', label: '⏳ Phối Hợp Thì & Chủ Vị' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                  selectedCategory === cat.id
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-400 px-2">Cấp độ:</span>
            {['all', 'A2', 'B1', 'B2'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer uppercase",
                  selectedLevel === lvl
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-slate-400 dark:text-slate-500">
            Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredQuestions.map((q, qIndex) => {
            const userAnswer = userAnswers[q.id];
            const hasAnswered = userAnswer !== undefined;
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className={cn(
                  "bg-white dark:bg-slate-900 rounded-3xl border p-6 sm:p-8 space-y-5 transition-all shadow-sm",
                  hasAnswered
                    ? isCorrect
                      ? "border-emerald-300/80 dark:border-emerald-800/80 bg-emerald-50/10"
                      : "border-rose-300/80 dark:border-rose-800/80 bg-rose-50/10"
                    : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                )}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-black flex items-center justify-center">
                      {qIndex + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-wider">
                      Level {q.level}
                    </span>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      {q.category === 'pronoun_reference' && '🔗 Đại từ & Quy chiếu'}
                      {q.category === 'noun_plurals' && '🏷️ Đuôi Danh Từ & Số Nhiều'}
                      {q.category === 'word_positions' && '🎯 Vị Trí Từ Loại'}
                      {q.category === 'tenses_agreement' && '⏳ Phối Hợp Thì'}
                    </span>
                  </div>

                  {hasAnswered && (
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full",
                      isCorrect ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                    )}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Chính xác (+10 XP)
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Chưa chính xác
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Question Text */}
                <div className="space-y-2">
                  <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                    {q.question}
                  </p>
                  <button
                    onClick={() => speak(q.question)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    🔊 Nghe câu hỏi
                  </button>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                      className={cn(
                        "p-4 rounded-2xl text-xs sm:text-sm font-bold border-2 text-left transition-all cursor-pointer flex items-center justify-between",
                        !hasAnswered
                          ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                          : optIdx === q.correctIndex
                          ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-black shadow-xs"
                          : optIdx === userAnswer
                          ? "bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300"
                          : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 opacity-40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-black flex items-center justify-center">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {hasAnswered && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Explanation Card */}
                {hasAnswered && (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-wider">
                        Công Thức Áp Dụng:
                      </span>
                      <code className="text-xs font-mono font-black text-slate-800 dark:text-slate-200">
                        {q.ruleFormula}
                      </code>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      💡 <strong>Phân tích chi tiết:</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
