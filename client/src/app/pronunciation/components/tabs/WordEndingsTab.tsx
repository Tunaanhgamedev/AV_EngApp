'use client';

import React from 'react';
import { FileText, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ED_RULES, S_RULES } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';

export default function WordEndingsTab() {
  return (
      
        <div className="space-y-8">
          {/* -ed section */}
          <section className="space-y-4">
            <div className="premium-card p-6 bg-gradient-to-r from-rose-50 to-orange-50 border-rose-200">
              <h3 className="text-lg font-black text-rose-800 flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-rose-600" /> Cách phát âm đuôi -ED
              </h3>
              <p className="text-sm text-rose-700 leading-relaxed font-medium">
                Đuôi -ed (quá khứ đơn, phân từ) có 3 cách đọc: <strong>/t/</strong>, <strong>/d/</strong>, hoặc <strong>/ɪd/</strong> tùy thuộc vào âm cuối của động từ gốc.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ED_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-black px-3 py-1 rounded-full", i === 0 ? "bg-sky-100 text-sky-700" : i === 1 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>{r.rule}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex: any, j: number) => (
                      <button key={j} onClick={() => speak(ex.word)} className="group w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer">
                        <span className="font-bold text-sm text-slate-800">{ex.word}</span>
                        <span className="text-xs font-mono text-slate-400">{ex.ipa}</span>
                        <Play className="w-3 h-3 text-slate-300 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* -s/-es section */}
          <section className="space-y-4">
            <div className="premium-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="text-lg font-black text-blue-800 flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-600" /> Cách phát âm đuôi -S / -ES
              </h3>
              <p className="text-sm text-blue-700 leading-relaxed font-medium">
                Đuôi -s/-es (số nhiều, ngôi thứ 3 số ít) có 3 cách đọc: <strong>/s/</strong>, <strong>/z/</strong>, hoặc <strong>/ɪz/</strong> tùy thuộc vào âm cuối.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {S_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-black px-3 py-1 rounded-full", i === 0 ? "bg-sky-100 text-sky-700" : i === 1 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>{r.rule}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <button key={j} onClick={() => speak(ex.word)} className="group w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer">
                        <span className="font-bold text-sm text-slate-800">{ex.word}</span>
                        <span className="text-xs font-mono text-slate-400">{ex.ipa}</span>
                        <Play className="w-3 h-3 text-slate-300 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        );
}
