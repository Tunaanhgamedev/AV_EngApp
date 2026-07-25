'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TENSES_DATA, TENSE_GROUPS, type TenseDetail } from './tenses-data';

export default function TheoryTab() {
  const [selectedTense, setSelectedTense] = useState<TenseDetail>(TENSES_DATA[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Tense selector sidebar — DRY loop over 3 groups */}
      <div className="lg:col-span-1 space-y-4">
        {TENSE_GROUPS.map(group => (
          <div key={group.key} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <h3 className={cn("font-black text-[10px] uppercase tracking-widest border-b pb-2 flex items-center gap-1.5", group.colorClass)}>
              <Clock className="w-3.5 h-3.5" /> {group.label}
            </h3>
            <div className="space-y-1">
              {TENSES_DATA.filter(t => t.group === group.key).map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTense(t)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-xl transition-all font-bold text-xs border flex items-center justify-between",
                    selectedTense.id === t.id
                      ? "bg-emerald-50 text-emerald-850 border-emerald-100 shadow-sm"
                      : "bg-white text-slate-600 border-slate-50 hover:bg-slate-55"
                  )}
                >
                  <span>{t.nameVi}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed content */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
          {/* Title */}
          <div>
            <span className={cn(
              "px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider",
              selectedTense.group === 'present' ? "bg-blue-100 text-blue-800" :
              selectedTense.group === 'past' ? "bg-rose-100 text-rose-800" : "bg-purple-100 text-purple-800"
            )}>
              {selectedTense.name} · {selectedTense.group === 'present' ? 'Hiện Tại' : selectedTense.group === 'past' ? 'Quá khứ' : 'Tương lai'}
            </span>
            <h2 className="text-3xl font-black text-slate-800 mt-2">{selectedTense.nameVi}</h2>
          </div>

          {/* Formulas bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase">Khẳng định (+)</span>
              <p className="text-sm font-black text-slate-800 font-mono">{selectedTense.formula.pos}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase">Phủ định (-)</span>
              <p className="text-sm font-black text-slate-800 font-mono">{selectedTense.formula.neg}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase">Nghi vấn (?)</span>
              <p className="text-sm font-black text-slate-800 font-mono">{selectedTense.formula.q}</p>
            </div>
          </div>

          {/* Basic and Advanced usage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-black text-slate-800 text-md flex items-center gap-2 border-b pb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Cách Dùng Cơ Bản
              </h4>
              <ul className="space-y-3">
                {selectedTense.basicUsage.map((u, i) => (
                  <li key={i} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">{i+1}</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-slate-800 text-md flex items-center gap-2 border-b pb-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Cách Dùng Nâng Cao
              </h4>
              <ul className="space-y-3">
                {selectedTense.advancedUsage.map((u, i) => (
                  <li key={i} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">{i+1}</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Signals */}
          <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl space-y-2">
            <h4 className="text-amber-800 font-black text-xs uppercase tracking-wider">Trạng từ / Dấu hiệu nhận biết</h4>
            <div className="flex flex-wrap gap-2">
              {selectedTense.signals.map(s => (
                <span key={s} className="px-3 py-1 bg-white border border-amber-100 rounded-lg text-xs font-semibold text-amber-700">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Examples comparing */}
          <div className="space-y-4">
            <h4 className="font-black text-slate-800 text-md border-b pb-2">Ví dụ trực quan so sánh</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTense.examples.map((ex, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-4 rounded-2xl border transition-all",
                    ex.type === 'basic' 
                      ? "border-emerald-100 bg-emerald-50/20 hover:border-emerald-300"
                      : "border-indigo-100 bg-indigo-50/10 hover:border-indigo-300"
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn(
                      "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider",
                      ex.type === 'basic' ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800"
                    )}>
                      {ex.type === 'basic' ? 'Cơ bản' : 'Nâng cao'}
                    </span>
                  </div>
                  <p className="font-bold text-slate-800 text-base leading-snug">{ex.en}</p>
                  <p className="text-slate-500 text-xs mt-1.5 font-medium italic">{ex.vi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
