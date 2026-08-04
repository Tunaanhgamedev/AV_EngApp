'use client';

import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PHONICS_BLENDS, DIGRAPHS, SILENT_LETTERS, COMPOUND_WORDS, CONSONANT_VOWEL_LINKING, VOWEL_VOWEL_LINKING, ASSIMILATION_RULES, ELISION_RULES } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';

export default function WordBuildingTab() {
  const [buildingSubTab, setBuildingSubTab] = useState<'blends' | 'digraphs' | 'silent' | 'compound' | 'linking_cv' | 'linking_vv' | 'assimilation' | 'elision'>('blends');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="premium-card p-6 bg-gradient-to-r from-pink-50 dark:from-pink-950/30 to-rose-50 dark:to-rose-950/30 border-pink-200 dark:border-pink-800">
        <h3 className="text-lg font-black text-pink-900 flex items-center gap-2 mb-2">
          <Palette className="w-5 h-5 text-pink-600 dark:text-pink-400" /> Ghép Âm, Nối Từ & Hiện Tượng Biến Âm (Word Building & Connected Speech)
        </h3>
        <p className="text-xs sm:text-sm text-pink-800 leading-relaxed font-medium">
          Tìm hiểu cách kết hợp phụ âm kép (Blends), âm ghép (Digraphs), âm câm (Silent letters) và các quy tắc nối âm tự nhiên của người bản xứ.
        </p>
      </div>

      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        {[
          { id: 'blends' as const, label: 'Phụ âm ghép (Blends)' },
          { id: 'digraphs' as const, label: 'Âm ghép (Digraphs)' },
          { id: 'silent' as const, label: 'Chữ cái câm (Silent)' },
          { id: 'compound' as const, label: 'Từ ghép (Compound)' },
          { id: 'linking_cv' as const, label: 'Nối âm Phụ âm-Nguyên âm' },
          { id: 'linking_vv' as const, label: 'Nối âm Nguyên âm-Nguyên âm' },
          { id: 'assimilation' as const, label: 'Đồng hóa âm (Assimilation)' },
          { id: 'elision' as const, label: 'Nuốt âm (Elision)' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setBuildingSubTab(t.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              buildingSubTab === t.id
                ? "bg-pink-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Display Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buildingSubTab === 'blends' && PHONICS_BLENDS.map((item, idx) => (
          <div key={idx} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3 shadow-xs">
            <h4 className="font-extrabold text-base text-pink-700 dark:text-pink-400 font-mono">{item.blend}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Ví dụ: {item.examples.join(', ')}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {item.examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => speak(ex)}
                  className="px-2.5 py-1 bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 font-bold text-xs rounded-xl hover:bg-pink-100 transition-all cursor-pointer"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ))}

        {buildingSubTab === 'digraphs' && DIGRAPHS.map((item, idx) => (
          <div key={idx} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3 shadow-xs">
            <h4 className="font-extrabold text-base text-pink-700 dark:text-pink-400 font-mono">{item.digraph}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold font-mono">Phiên âm: /{item.sound}/</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {item.examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => speak(ex)}
                  className="px-2.5 py-1 bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 font-bold text-xs rounded-xl hover:bg-pink-100 transition-all cursor-pointer"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
