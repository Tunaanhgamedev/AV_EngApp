'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Tag, CheckCircle2, AlertTriangle, BookOpen, Layers, Filter, Check, HelpCircle, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NOUN_RULES_DATA, NounEndingRule } from '../grammarData';

interface NounEndingsTabProps {
  speak: (text: string) => void;
}

export default function NounEndingsTab({ speak }: NounEndingsTabProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'suffixes' | 'plurals' | 'uncountable'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quizSelection, setQuizSelection] = useState<Record<number, string>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const filteredRules = NOUN_RULES_DATA.filter(rule => {
    const matchesCat = activeCategory === 'all' || rule.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.items.some(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.examples.some(ex => ex.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesCat && matchesSearch;
  });

  // Interactive Quick Check mini questions
  const miniQuestions = [
    {
      word: 'Information',
      options: ['Đếm được (Countable)', 'Không đếm được (Uncountable)'],
      answer: 'Không đếm được (Uncountable)',
      explanation: '"information" là danh từ không đếm được, không dùng với "an" và không thêm "s".'
    },
    {
      word: 'Criteria',
      options: ['Số ít (Singular)', 'Số nhiều (Plural)'],
      answer: 'Số nhiều (Plural)',
      explanation: '"criteria" là dạng số nhiều bất quy tắc của "criterion" (tiêu chí).'
    },
    {
      word: 'Approval',
      options: ['Tính từ (Adjective)', 'Danh từ (Noun)'],
      answer: 'Danh từ (Noun)',
      explanation: '"approval" (sự phê duyệt) là Danh từ có đuôi "-al", xuất phát từ động từ "approve".'
    },
    {
      word: 'Equipment',
      options: ['Đếm được (Countable)', 'Không đếm được (Uncountable)'],
      answer: 'Không đếm được (Uncountable)',
      explanation: '"equipment" (trang thiết bị) luôn là danh từ không đếm được. Để đếm dùng "a piece of equipment".'
    }
  ];

  const handleQuizAnswer = (qIdx: number, selected: string) => {
    setQuizSelection(prev => ({ ...prev, [qIdx]: selected }));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 p-8 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-black uppercase tracking-wider text-emerald-200 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" /> Cẩm Nang Ngữ Pháp Trọng Điểm
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Cách Chia Đuôi Danh Từ, Số Ít / Số Nhiều & Danh Từ Không Đếm Được
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Tổng hợp toàn bộ quy tắc thêm đuôi <strong>-s, -es, -ies, -ves</strong>, bảng danh từ biến đổi bất quy tắc, các bẫy danh từ đuôi <strong>-al</strong> và phương pháp nhận diện danh từ không đếm được chuẩn xác.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl overflow-x-auto gap-1">
          {[
            { id: 'all', label: 'Tất Cả Quy Tắc' },
            { id: 'suffixes', label: '🏷️ Đuôi Nhận Diện (-tion, -ment...)' },
            { id: 'plurals', label: '🔢 Quy Tắc Số Nhiều (-s, -es, -ves)' },
            { id: 'uncountable', label: '💧 Không Đếm Được & Lượng Từ' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                activeCategory === tab.id
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm quy tắc hoặc đuôi từ..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:outline-hidden focus:border-emerald-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Rules Display Grid */}
      <div className="space-y-8">
        {filteredRules.map(rule => (
          <div
            key={rule.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-widest">
                  {rule.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">
                  {rule.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                {rule.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rule.items.map((item, ii) => (
                <div
                  key={ii}
                  className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3"
                >
                  <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {item.label}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-line">
                    {item.rule}
                  </p>

                  {/* Examples List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Ví dụ minh họa:
                    </span>
                    <div className="space-y-1">
                      {item.examples.map((ex, ei) => (
                        <div
                          key={ei}
                          className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900/80 p-2 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
                        >
                          <span>{ex}</span>
                          <button
                            onClick={() => speak(ex.split('(')[0])}
                            className="text-[10px] text-emerald-600 hover:underline font-bold ml-2 cursor-pointer flex-shrink-0"
                          >
                            Nghe
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exceptions if any */}
                  {item.exceptions && item.exceptions.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
                      <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Lưu Ý & Ngoại Lệ:
                      </span>
                      {item.exceptions.map((exc, exi) => (
                        <p key={exi} className="text-xs text-amber-900 dark:text-amber-200 font-medium">
                          {exc}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Exam Tip */}
                  {item.examTip && (
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-1">
                      <span className="text-[10px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Mẹo Thi Cử:
                      </span>
                      <p className="text-xs text-blue-900 dark:text-blue-200 font-medium leading-relaxed">
                        {item.examTip}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Quick Check Section */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-xl font-black flex items-center gap-2 text-white">
              <HelpCircle className="w-5 h-5 text-emerald-400" /> Thử Thách Phản Xạ Nhanh Về Danh Từ
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Kiểm tra khả năng phân biệt danh từ đếm được, không đếm được và danh từ bất quy tắc trong 10 giây.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {miniQuestions.map((mq, mi) => {
            const userChoice = quizSelection[mi];
            const hasChosen = userChoice !== undefined;
            const isCorrect = userChoice === mq.answer;

            return (
              <div key={mi} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3">
                <div className="text-center py-2 bg-white/10 rounded-xl">
                  <span className="text-lg font-black text-amber-300">{mq.word}</span>
                </div>
                <div className="space-y-1.5">
                  {mq.options.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => handleQuizAnswer(mi, opt)}
                      className={cn(
                        "w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer flex items-center justify-between",
                        !hasChosen
                          ? "bg-white/5 border-white/10 text-white hover:bg-white/20"
                          : opt === mq.answer
                          ? "bg-emerald-500 text-white border-emerald-400 font-black"
                          : opt === userChoice
                          ? "bg-rose-500 text-white border-rose-400"
                          : "bg-white/5 border-transparent text-white/40"
                      )}
                    >
                      <span>{opt}</span>
                      {hasChosen && opt === mq.answer && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
                {hasChosen && (
                  <p className="text-[11px] text-slate-200 leading-snug font-medium pt-1">
                    {mq.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
