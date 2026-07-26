'use client';

import React, { useState } from 'react';
import { Target, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MINIMAL_PAIRS } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';

export default function MinimalPairsTab() {
  const [pairTypeFilter, setPairTypeFilter] = useState<'all' | 'vowel' | 'consonant'>('all');
  const [selectedFocusFilter, setSelectedFocusFilter] = useState<string>('all');

  const pairsToUse = (MINIMAL_PAIRS && MINIMAL_PAIRS.length > 0) ? MINIMAL_PAIRS : [
    { sound1: '/iː/', sound2: '/ɪ/', word1: 'sheep', word2: 'ship', ipa1: '/ʃiːp/', ipa2: '/ʃɪp/', focusSound: '/iː/ vs /ɪ/', type: 'vowel' },
    { sound1: '/e/', sound2: '/æ/', word1: 'pen', word2: 'pan', ipa1: '/pen/', ipa2: '/pæn/', focusSound: '/e/ vs /æ/', type: 'vowel' },
    { sound1: '/uː/', sound2: '/ʊ/', word1: 'fool', word2: 'full', ipa1: '/fuːl/', ipa2: '/fʊl/', focusSound: '/uː/ vs /ʊ/', type: 'vowel' },
    { sound1: '/p/', sound2: '/b/', word1: 'pat', word2: 'bat', ipa1: '/pæt/', ipa2: '/bæt/', focusSound: '/p/ vs /b/', type: 'consonant' },
    { sound1: '/t/', sound2: '/d/', word1: 'ten', word2: 'den', ipa1: '/ten/', ipa2: '/den/', focusSound: '/t/ vs /d/', type: 'consonant' },
    { sound1: '/k/', sound2: '/ɡ/', word1: 'coat', word2: 'goat', ipa1: '/koʊt/', ipa2: '/ɡoʊt/', focusSound: '/k/ vs /ɡ/', type: 'consonant' },
  ];

  const filteredPairs = pairsToUse.filter(p => {
    const matchType = pairTypeFilter === 'all' || p.type === pairTypeFilter;
    const matchFocus = selectedFocusFilter === 'all' || p.focusSound === selectedFocusFilter;
    return matchType && matchFocus;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="premium-card p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <h3 className="text-lg font-black text-emerald-900 flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-emerald-600" /> Cặp Âm Dễ Nhầm Lẫn (Minimal Pairs)
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-medium">
          Luyện phân biệt các cặp từ chỉ khác nhau duy nhất 1 âm vị. Nhấp vào từ để nghe sự khác biệt rõ rệt.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all' as const, label: 'Tất cả' },
          { id: 'vowel' as const, label: 'Cặp nguyên âm' },
          { id: 'consonant' as const, label: 'Cặp phụ âm' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setPairTypeFilter(t.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              pairTypeFilter === t.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Pair Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPairs.map((pair, idx) => (
          <div key={idx} className="p-5 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xs hover:border-emerald-300 transition-all">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
              {pair.focusSound}
            </span>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => speak(pair.word1)}
                className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer"
              >
                <span className="font-extrabold text-sm text-slate-800">{pair.word1}</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold mt-0.5">{pair.ipa1}</span>
              </button>

              <button
                onClick={() => speak(pair.word2)}
                className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer"
              >
                <span className="font-extrabold text-sm text-slate-800">{pair.word2}</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold mt-0.5">{pair.ipa2}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
