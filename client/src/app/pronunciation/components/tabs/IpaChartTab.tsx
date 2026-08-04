'use client';

import React, { useState } from 'react';
import { BookOpen, Volume2, Sparkles, ChevronDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VOWELS, DIPHTHONGS, CONSONANTS } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';
import SpeechPracticeSection from '../shared/SpeechPracticeSection';

function IPACell({ item, color, isActive, onClick }: { item: any; color: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-1 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-slate-800 dark:text-slate-100 cursor-pointer",
        isActive ? "border-primary bg-primary/10 scale-[1.03] shadow-md shadow-primary/5" : color
      )}
    >
      <span className="text-xl sm:text-2xl font-black font-mono">{item.ipa}</span>
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item.example}</span>
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Volume2 className="w-4 h-4 text-primary animate-pulse" />
      </div>
    </button>
  );
}

export default function IpaChartTab() {
  const [selectedIpa, setSelectedIpa] = useState<any>(null);
  const [chartTab, setChartTab] = useState<'all' | 'vowels' | 'diphthongs' | 'consonants'>('all');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="premium-card p-6 bg-gradient-to-r from-violet-50 dark:from-violet-950/30 via-purple-50 dark:via-purple-950/30 to-indigo-50 dark:to-indigo-950/30 border-violet-200 dark:border-violet-700">
        <h3 className="text-lg font-black text-violet-900 dark:text-violet-400 flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" /> Bảng phiên âm Quốc Tế IPA (International Phonetic Alphabet)
        </h3>
        <p className="text-xs sm:text-sm text-violet-800 dark:text-violet-400 leading-relaxed font-medium">
          Gồm 44 âm chuẩn Anh-Mỹ: 12 Nguyên âm đơn (Monophthongs), 8 Nguyên âm đôi (Diphthongs) và 24 Phụ âm (Consonants). Nhấp vào từng ô để nghe âm thanh mẫu, xem hướng dẫn khẩu hình miệng và luyện đọc.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        {[
          { id: 'all' as const, label: 'Tất cả 44 âm' },
          { id: 'vowels' as const, label: 'Nguyên âm đơn (12)' },
          { id: 'diphthongs' as const, label: 'Nguyên âm đôi (8)' },
          { id: 'consonants' as const, label: 'Phụ âm (24)' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setChartTab(t.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              chartTab === t.id
                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className="space-y-8">
        {(chartTab === 'all' || chartTab === 'vowels') && (
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Nguyên âm đơn (Monophthongs)
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {VOWELS.map(v => (
                <IPACell
                  key={v.ipa}
                  item={v}
                  color="bg-blue-50/50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600"
                  isActive={selectedIpa?.ipa === v.ipa}
                  onClick={() => { setSelectedIpa(v); speak(v.example); }}
                />
              ))}
            </div>
          </div>
        )}

        {(chartTab === 'all' || chartTab === 'diphthongs') && (
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Nguyên âm đôi (Diphthongs)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3">
              {DIPHTHONGS.map(d => (
                <IPACell
                  key={d.ipa}
                  item={d}
                  color="bg-amber-50/50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600"
                  isActive={selectedIpa?.ipa === d.ipa}
                  onClick={() => { setSelectedIpa(d); speak(d.example); }}
                />
              ))}
            </div>
          </div>
        )}

        {(chartTab === 'all' || chartTab === 'consonants') && (
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Phụ âm (Consonants)
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {CONSONANTS.map(c => (
                <IPACell
                  key={c.ipa}
                  item={c}
                  color="bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600"
                  isActive={selectedIpa?.ipa === c.ipa}
                  onClick={() => { setSelectedIpa(c); speak(c.example); }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal / Panel */}
      {selectedIpa && (
        <div className="mt-8 p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl font-black font-mono text-primary bg-primary/20 px-4 py-2 rounded-2xl border border-primary/30">
                {selectedIpa.ipa}
              </span>
              <div>
                <h4 className="text-lg font-bold text-slate-200 uppercase tracking-wide">{selectedIpa.type || 'Âm vị IPA'}</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Từ ví dụ: <strong className="text-white">{selectedIpa.example}</strong> ({selectedIpa.meaning || 'Ví dụ chuẩn'})</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedIpa(null)}
              className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60">
              <h5 className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> Hướng dẫn khẩu hình & cách phát âm
              </h5>
              <p className="text-slate-300 leading-relaxed font-medium">
                {selectedIpa.description || 'Mở rộng khẩu hình vừa phải, phát âm rõ ràng từ cổ họng.'}
              </p>
            </div>
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60">
              <h5 className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Dấu hiệu nhận biết chữ cái (Spelling)
              </h5>
              <p className="text-slate-300 leading-relaxed font-medium">
                {selectedIpa.spelling || 'Thường xuất hiện khi chữ cái đứng ở vị trí nguyên âm chính.'}
              </p>
            </div>
          </div>

          <SpeechPracticeSection targetWord={selectedIpa.example} />
        </div>
      )}
    </div>
  );
}
