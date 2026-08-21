'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, HelpCircle, Lightbulb, BookOpen, Layers, Target, ChevronRight, Eye, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRONOUN_CATEGORIES, PRONOUN_READING_PASSAGES, PronounPassage } from '../grammarData';

interface PronounsReadingTabProps {
  speak: (text: string) => void;
}

export default function PronounsReadingTab({ speak }: PronounsReadingTabProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>(PRONOUN_CATEGORIES[0].id);
  const [selectedPassage, setSelectedPassage] = useState<PronounPassage>(PRONOUN_READING_PASSAGES[0]);
  const [activePronounIdx, setActivePronounIdx] = useState<number | null>(null);
  const [passageAnswers, setPassageAnswers] = useState<Record<string, number>>({});
  const [showStepHints, setShowStepHints] = useState<Record<string, boolean>>({});

  const activeCategory = PRONOUN_CATEGORIES.find(c => c.id === selectedCatId) || PRONOUN_CATEGORIES[0];

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    setPassageAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const toggleStepHint = (qId: string) => {
    setShowStepHints(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Banner: 4-Step Strategy */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 p-8 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-black uppercase tracking-wider text-blue-200 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" /> Kỹ Năng Đọc Hiểu Trọng Tâm
          </div>
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Đại Từ & Phương Pháp Xử Lý Câu Hỏi Quy Chiếu (Pronoun Reference)
            </h2>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Dạng câu hỏi kinh điển trong bài đọc TOEIC, IELTS & THPT: <em>&ldquo;The word &lsquo;they / it / which / those&rsquo; refers to which of the following?&rdquo;</em>. Nắm vững 4 bước tư duy dưới đây để không bao giờ chọn nhầm!
            </p>
          </div>

          {/* 4-Step Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            {[
              {
                step: 'BƯỚC 1',
                title: 'Định Dạng Đại Từ',
                desc: 'Xác định số ít/nhiều, chỉ người/vật, chủ ngữ hay tân ngữ.',
                icon: Target,
                color: 'bg-blue-500/30 border-blue-300/30'
              },
              {
                step: 'BƯỚC 2',
                title: 'Quét Ngược Về Trước',
                desc: 'Đọc 1-2 câu phía trước, khoanh vùng các danh từ/cụm danh từ phù hợp.',
                icon: BookOpen,
                color: 'bg-indigo-500/30 border-indigo-300/30'
              },
              {
                step: 'BƯỚC 3',
                title: 'Thế Ngược Thử Nghĩa',
                desc: 'Thay thế danh từ vào vị trí đại từ để kiểm tra sự hợp lý về ngữ cảnh.',
                icon: Lightbulb,
                color: 'bg-violet-500/30 border-violet-300/30'
              },
              {
                step: 'BƯỚC 4',
                title: 'Loại Trừ Bẫy',
                desc: 'Cảnh giác bẫy danh từ gần nhất hoặc đại từ thay thế cho cả mệnh đề!',
                icon: CheckCircle2,
                color: 'bg-emerald-500/30 border-emerald-300/30'
              },
            ].map((st, i) => (
              <div key={i} className={cn("p-4 rounded-2xl border backdrop-blur-md space-y-2", st.color)}>
                <div className="flex items-center justify-between text-[11px] font-black tracking-widest text-blue-200">
                  <span>{st.step}</span>
                  <st.icon className="w-4 h-4 text-white/80" />
                </div>
                <h4 className="font-black text-sm text-white">{st.title}</h4>
                <p className="text-xs text-blue-100/80 leading-snug">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Theory by Pronoun Type */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Hệ Thống Các Loại Đại Từ Cần Nhớ
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Bấm vào từng nhóm đại từ để xem bảng quy tắc, ví dụ và mẹo làm bài đọc.
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl overflow-x-auto gap-1">
          {PRONOUN_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2",
                selectedCatId === cat.id
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category Content Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {activeCategory.name}
              </span>
              <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">
                {activeCategory.nameVi}
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1.5 max-w-3xl">
                {activeCategory.description}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-800/60 max-w-sm flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-black text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Mẹo Đọc Hiểu
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                {activeCategory.readingTip}
              </p>
            </div>
          </div>

          {/* Table if available */}
          {activeCategory.table && (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {activeCategory.table.headers.map((h, i) => (
                      <th key={i} className="py-3.5 px-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {activeCategory.table.rows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      {row.map((cell, ci) => (
                        <td key={ci} className={cn("py-3 px-4 text-xs sm:text-sm", ci === 0 ? "font-bold text-slate-900 dark:text-slate-100" : "text-slate-600 dark:text-slate-300")}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Rules & Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h5 className="font-black text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Quy Tắc Trọng Tâm
              </h5>
              <ul className="space-y-2">
                {activeCategory.rules.map((rule, ri) => (
                  <li key={ri} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-black text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" /> Ví Dụ Trong Ngữ Cảnh
              </h5>
              <div className="space-y-2.5">
                {activeCategory.examples.map((ex, ei) => (
                  <div key={ei} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">{ex.en}</p>
                      <button onClick={() => speak(ex.en)} className="text-blue-600 hover:text-blue-700 text-xs font-bold cursor-pointer">
                        Nghe
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">{ex.vi}</p>
                    <span className="inline-block mt-1 text-[11px] font-black text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">
                      {ex.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Interactive Pronoun Reading Passages */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> Luyện Đọc Thực Chiến: Công Cụ Khảo Sát Đại Từ
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Nhấp vào các đại từ được làm nổi bật để xem danh từ gốc được trỏ tới kèm giải thích ngữ nghĩa chi tiết.
          </p>
        </div>

        {/* Passage Selector */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {PRONOUN_READING_PASSAGES.map(passage => (
            <button
              key={passage.id}
              onClick={() => {
                setSelectedPassage(passage);
                setActivePronounIdx(null);
              }}
              className={cn(
                "px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all border text-left cursor-pointer flex-shrink-0 flex items-center gap-3",
                selectedPassage.id === passage.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400"
              )}
            >
              <span className="px-2 py-0.5 rounded bg-white/20 text-[10px]">{passage.level}</span>
              <span>{passage.title}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Passage Interactive Reader (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded uppercase tracking-wider">
                  Level {selectedPassage.level}
                </span>
                <h4 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">
                  {selectedPassage.title}
                </h4>
              </div>
              <button
                onClick={() => speak(selectedPassage.text)}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-600 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> Nghe bài đọc
              </button>
            </div>

            {/* Render passage with clickable reference badges */}
            <div className="space-y-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-[2.1] font-normal">
              {selectedPassage.text.split('\n\n').map((paragraph, pIdx) => {
                return (
                  <p key={pIdx} className="relative">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Pronoun Reference Explorer Chips */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Bấm xem quy chiếu các đại từ trong bài:
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedPassage.pronounReferences.map((ref, rIdx) => (
                  <button
                    key={rIdx}
                    onClick={() => setActivePronounIdx(activePronounIdx === rIdx ? null : rIdx)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-black transition-all border cursor-pointer flex items-center gap-2",
                      activePronounIdx === rIdx
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30 scale-105"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400"
                    )}
                  >
                    <span>&ldquo;{ref.pronoun}&rdquo;</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                    <span className="font-bold opacity-90">{ref.refersTo}</span>
                  </button>
                ))}
              </div>

              {/* Active Reference Detail Popup */}
              {activePronounIdx !== null && selectedPassage.pronounReferences[activePronounIdx] && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-200 dark:border-indigo-800/60 animate-in fade-in zoom-in-95 duration-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-widest">
                      Phân tích quy chiếu cho: &ldquo;{selectedPassage.pronounReferences[activePronounIdx].pronoun}&rdquo;
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-md">
                      {selectedPassage.pronounReferences[activePronounIdx].type}
                    </span>
                  </div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400">&ldquo;{selectedPassage.pronounReferences[activePronounIdx].pronoun}&rdquo;</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 underline decoration-2">{selectedPassage.pronounReferences[activePronounIdx].refersTo}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {selectedPassage.pronounReferences[activePronounIdx].explanationVi}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 italic bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg">
                    Ngữ cảnh: &ldquo;{selectedPassage.pronounReferences[activePronounIdx].contextEn}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pronoun Reference Exam Questions (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h4 className="font-black text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600" /> Câu Hỏi Quy Chiếu Thực Tế
                </h4>
                <span className="text-xs font-bold text-slate-400">
                  {selectedPassage.questions.length} câu hỏi
                </span>
              </div>

              <div className="space-y-6">
                {selectedPassage.questions.map((q, qi) => {
                  const userAnswer = passageAnswers[q.id];
                  const hasAnswered = userAnswer !== undefined;
                  const isCorrect = userAnswer === q.correctIndex;
                  const isHintOpen = showStepHints[q.id];

                  return (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200">
                          {qi + 1}. {q.question}
                        </p>
                        <button
                          onClick={() => toggleStepHint(q.id)}
                          className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex-shrink-0 cursor-pointer flex items-center gap-1"
                        >
                          <Lightbulb className="w-3 h-3 text-amber-500" />
                          {isHintOpen ? 'Ẩn gợi ý' : 'Gợi ý 4 bước'}
                        </button>
                      </div>

                      {/* Step-by-step hint accordion */}
                      {isHintOpen && (
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5 animate-in fade-in duration-200">
                          <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest">
                            Các bước tư duy tìm từ quy chiếu:
                          </span>
                          {q.stepByStep.map((step, si) => (
                            <p key={si} className="text-xs text-amber-900 dark:text-amber-200 font-medium">
                              {step}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={cn(
                              "w-full p-3 rounded-xl text-xs font-bold border-2 text-left transition-all cursor-pointer flex items-center justify-between",
                              !hasAnswered
                                ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20"
                                : optIdx === q.correctIndex
                                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                                : optIdx === userAnswer
                                ? "bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300"
                                : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400 opacity-40"
                            )}
                          >
                            <span>{opt}</span>
                            {hasAnswered && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Explanation box after answer */}
                      {hasAnswered && (
                        <div className={cn(
                          "p-3.5 rounded-xl text-xs font-medium space-y-1 animate-in fade-in duration-200",
                          isCorrect ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800" : "bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                        )}>
                          <div className="font-black text-xs flex items-center gap-1.5">
                            {isCorrect ? '✅ Chính xác!' : '❌ Chưa chính xác!'}
                          </div>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
