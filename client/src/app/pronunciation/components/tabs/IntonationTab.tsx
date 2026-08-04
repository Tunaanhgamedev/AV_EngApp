'use client';

import React, { useState } from 'react';
import { MessageSquare, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QUESTION_TYPES_DATA, INTONATION_GUIDELINES, SENTENCE_STRESS_RULES } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';

export default function IntonationTab() {
  const [intonationSubTab, setIntonationSubTab] = useState<'questions' | 'intonation' | 'sentence_stress'>('questions');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="premium-card p-6 bg-gradient-to-r from-indigo-50 dark:from-indigo-950/30 to-purple-50 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
        <h3 className="text-lg font-black text-indigo-900 flex items-center gap-2 mb-2">
          <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Ngữ Điệu Câu & Trọng Âm Câu (Intonation & Sentence Stress)
        </h3>
        <p className="text-xs sm:text-sm text-indigo-800 leading-relaxed font-medium">
          Ngữ điệu là sự trầm bổng của giọng nói khi thốt ra một câu. Trọng âm câu giúp nhấn mạnh các từ mang thông tin quan trọng (Content Words).
        </p>
      </div>

      {/* Sub-nav */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        {[
          { id: 'questions' as const, label: 'Ngữ điệu các loại câu hỏi' },
          { id: 'intonation' as const, label: 'Quy tắc ngữ điệu chung' },
          { id: 'sentence_stress' as const, label: 'Trọng âm câu (Sentence Stress)' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setIntonationSubTab(t.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              intonationSubTab === t.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {intonationSubTab === 'questions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUESTION_TYPES_DATA.map((q, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-indigo-900">{q.title || q.type}</h4>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-800">
                  {(q as any).pattern || q.intonation}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{(q as any).description || q.desc}</p>
              {q.examples && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {q.examples.map((ex: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-100">{ex.sentence || ex.text}</span>
                      <button
                        onClick={() => speak(ex.sentence || ex.text)}
                        className="p-1.5 bg-indigo-100 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {intonationSubTab === 'intonation' && (
        <div className="space-y-4">
          {INTONATION_GUIDELINES.map((g: any, idx: number) => (
            <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{g.pattern || g.rule}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{g.desc || g.detail}</p>
            </div>
          ))}
        </div>
      )}

      {intonationSubTab === 'sentence_stress' && (
        <div className="space-y-4">
          {SENTENCE_STRESS_RULES.map((r: any, idx: number) => (
            <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{r.category || r.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{r.desc || r.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
