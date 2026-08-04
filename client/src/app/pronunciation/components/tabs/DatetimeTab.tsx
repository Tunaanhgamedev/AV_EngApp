'use client';

import React, { useState } from 'react';
import { Calendar, Play, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DAYS_OF_WEEK, RELATIVE_TIME_WORDS, MONTHS_OF_YEAR, YEAR_RULES } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';

export default function DatetimeTab() {
  const [datetimeSection, setDatetimeSection] = useState<'days' | 'relative' | 'months' | 'years'>('days');

  return (
      
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="premium-card p-6 bg-gradient-to-r from-violet-50 dark:from-violet-950/30 to-purple-50 dark:to-purple-950/30 border-violet-200 dark:border-violet-800">
            <h3 className="text-lg font-black text-violet-800 flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-violet-600 dark:text-violet-400" /> Phát Âm Thứ, Tháng & Năm trong Tiếng Anh
            </h3>
            <p className="text-sm text-violet-700 dark:text-violet-400 leading-relaxed font-medium">
              Cách đọc chuẩn xác các thứ trong tuần, tháng trong năm và quy tắc đọc các mốc năm trong tiếng Anh kèm phiên âm IPA đầy đủ.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'days' as const, label: 'Thứ trong tuần' },
              { id: 'relative' as const, label: 'Từ chỉ Ngày/Thời gian' },
              { id: 'months' as const, label: 'Tháng trong năm' },
              { id: 'years' as const, label: 'Cách đọc Năm' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setDatetimeSection(s.id)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                  datetimeSection === s.id ? "bg-violet-600 text-white shadow-md" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Days of week */}
          {datetimeSection === 'days' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {DAYS_OF_WEEK.map(d => (
                <button
                  key={d.day}
                  onClick={() => speak(d.day)}
                  className="group premium-card p-5 flex flex-col items-center justify-center text-center gap-2 hover:shadow-xl hover:-translate-y-0.5 transition-all border border-violet-100 dark:border-violet-800 bg-violet-50/10 cursor-pointer"
                >
                  <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest bg-violet-100 px-2 py-0.5 rounded-md">{d.abbreviation}</span>
                  <span className="text-xl font-black text-slate-800 dark:text-slate-100">{d.day}</span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium">{d.ipa}</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 w-full pt-1.5 mt-1">{d.vi}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-violet-500 flex items-center justify-center transition-colors mt-1">
                    <Play className="w-3.5 h-3.5 fill-slate-400 text-slate-400 dark:text-slate-500 group-hover:fill-white group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Relative time terms */}
          {datetimeSection === 'relative' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
              {RELATIVE_TIME_WORDS.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => speak(r.term)}
                  className="group premium-card p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all border border-violet-100 dark:border-violet-800 bg-violet-50/10 cursor-pointer text-left h-full"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-[9px] font-black text-violet-600 dark:text-violet-400 bg-violet-100/50 px-2 py-0.5 rounded-md uppercase tracking-widest">{r.category}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-violet-500 flex items-center justify-center transition-colors">
                      <Play className="w-3 h-3 fill-slate-400 text-slate-400 dark:text-slate-500 group-hover:fill-white group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight group-hover:text-violet-600 transition-colors">{r.term}</p>
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium">{r.ipa}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">({r.vi})</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Months of year */}
          {datetimeSection === 'months' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {MONTHS_OF_YEAR.map(m => (
                <button
                  key={m.month}
                  onClick={() => speak(m.month)}
                  className="group premium-card p-5 flex items-center gap-4 hover:shadow-xl hover:-translate-y-0.5 transition-all border border-purple-100 dark:border-purple-800 bg-purple-50/10 cursor-pointer text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-sm uppercase flex-shrink-0">
                    {m.abbreviation}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">{m.month}</p>
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium">{m.ipa}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{m.vi}</p>
                  </div>
                  <Play className="w-4 h-4 text-slate-200 group-hover:text-purple-600 flex-shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Years rules */}
          {datetimeSection === 'years' && (
            <div className="space-y-4">
              <div className="premium-card p-4 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-800 flex items-start gap-3 text-left">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700 dark:text-amber-400 font-medium space-y-1">
                  <p><strong>Nguyên tắc chung:</strong> Đối với các năm trước năm 2000, ta thường chia đôi năm thành 2 cụm số hàng chục để đọc. Kể từ năm 2000 trở đi, có thể đọc cả số nghìn hoặc tiếp tục áp dụng quy tắc chia đôi.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {YEAR_RULES.map((y, idx) => (
                  <button
                    key={idx}
                    onClick={() => speak(y.read)}
                    className="group premium-card p-5 flex items-center gap-5 hover:shadow-xl transition-all text-left cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg shadow-purple-500/10">
                      {y.example}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-black text-slate-800 dark:text-slate-100 leading-tight">{y.read}</p>
                      <p className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium mt-0.5">{y.ipa}</p>
                      <p className="text-xs text-violet-600 dark:text-violet-400 font-bold mt-1">💡 {y.rule}</p>
                    </div>
                    <Play className="w-5 h-5 text-slate-200 group-hover:text-violet-600 flex-shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        );
}
