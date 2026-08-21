'use client';

import React, { useState } from 'react';
import { Clock, Sparkles, CheckCircle2, ArrowRight, Lightbulb, Compass, Calendar, Layers, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TENSES_SEQUENCE_DATA, TenseSequenceRule } from '../grammarData';

interface TensesReadingTabProps {
  speak: (text: string) => void;
}

export default function TensesReadingTab({ speak }: TensesReadingTabProps) {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(TENSES_SEQUENCE_DATA[0].id);

  const activeRule = TENSES_SEQUENCE_DATA.find(r => r.id === selectedRuleId) || TENSES_SEQUENCE_DATA[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-emerald-700 to-green-800 p-8 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-black uppercase tracking-wider text-teal-200 border border-white/20">
            <Clock className="w-4 h-4 text-amber-300" /> Ngữ Pháp Đọc Hiểu Chuyên Sâu
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Sự Phối Hợp Thì & Hòa Hợp Chủ Ngữ - Động Từ Trong Bài Đọc
          </h2>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            Trong các bài đọc và bài thi tiếng Anh, việc xác định chính xác trình tự thời gian giữa các mệnh đề liên kết bởi <em>when, while, since, before, by the time, as soon as</em> là chìa khóa để hiểu đúng mạch văn và không bị lừa trong câu hỏi chia động từ.
          </p>
        </div>
      </div>

      {/* Rules Selector */}
      <div className="space-y-6">
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl overflow-x-auto gap-1">
          {TENSES_SEQUENCE_DATA.map(rule => (
            <button
              key={rule.id}
              onClick={() => setSelectedRuleId(rule.id)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                selectedRuleId === rule.id
                  ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {rule.title.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Active Rule Details Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
                Sequence of Tenses in Context
              </span>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">
                {activeRule.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1.5 max-w-3xl">
                {activeRule.usage}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200/60 dark:border-teal-800/60 max-w-sm flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Dấu Hiệu Nhận Diện:
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                {activeRule.readingRecognition}
              </p>
            </div>
          </div>

          {/* Formula Box */}
          <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-600" /> Công Thức Phối Hợp Chuẩn:
            </span>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-200/60 dark:border-teal-800/60 font-mono text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100">
              {activeRule.formula}
            </div>
          </div>

          {/* Connectors Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Từ nối thời gian:
            </span>
            {activeRule.connectors.map((conn, ci) => (
              <span key={ci} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700">
                {conn}
              </span>
            ))}
          </div>

          {/* Examples Breakdown */}
          <div className="space-y-4 pt-2">
            <h4 className="text-base font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-600" /> Phân Tích Ví Dụ Minh Họa:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeRule.examples.map((ex, ei) => (
                <div key={ei} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">{ex.en}</p>
                    <button onClick={() => speak(ex.en)} className="text-xs text-teal-600 hover:underline font-bold cursor-pointer flex-shrink-0 ml-2">
                      Nghe
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">{ex.vi}</p>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium text-teal-800 dark:text-teal-300">
                    🔍 <strong>Giải thích:</strong> {ex.tenseBreakdown}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
