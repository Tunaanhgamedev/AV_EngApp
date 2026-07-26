'use client';

import React, { useState } from 'react';
import { BookOpen, Play, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PLURAL_RULES, IRREGULAR_NOUNS, UNCOUNTABLE_NOUNS, ARTICLE_RULES } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';

export default function NounsTab() {
  const [nounSection, setNounSection] = useState<'rules' | 'irregular' | 'uncountable' | 'articles'>('rules');
  const [uncountableCategory, setUncountableCategory] = useState<string>('all');

  return (
      
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="premium-card p-6 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200">
            <h3 className="text-lg font-black text-indigo-800 flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-indigo-600" /> Quy Tắc Danh Từ: Số Ít, Số Nhiều & Mạo Từ
            </h3>
            <p className="text-sm text-indigo-700 leading-relaxed font-medium">
              Học cách chuyển đổi danh từ số ít sang số nhiều, quy tắc thêm đuôi -s/-es, sử dụng mạo từ a/an chính xác và các danh từ không đếm được đặc trưng.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 no-scrollbar">
            {[
              { id: 'rules' as const, label: 'Quy Tắc Số Nhiều (-s/-es)' },
              { id: 'irregular' as const, label: 'Từ Đặc Biệt (Bất Quy Tắc)' },
              { id: 'uncountable' as const, label: 'Danh Từ Không Đếm Được' },
              { id: 'articles' as const, label: 'Mạo Từ A / AN' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setNounSection(s.id)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                  nounSection === s.id ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Rules -s/-es */}
          {nounSection === 'rules' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PLURAL_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3 bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">{r.rule}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <div key={j} className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-semibold">{ex.word} (ít) ➔</span>
                          <button onClick={() => speak(ex.plural)} className="group flex items-center gap-2 font-bold text-sm text-indigo-600 hover:underline">
                            {ex.plural} <span className="text-[11px] font-mono text-slate-400">{ex.ipa}</span>
                            <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600" />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Ý nghĩa: {ex.vi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Irregular Nouns */}
          {nounSection === 'irregular' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {IRREGULAR_NOUNS.map((noun, idx) => (
                <div key={idx} className="premium-card p-4 hover:shadow-lg transition-all bg-white border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-400">Số ít:</span>
                        <button onClick={() => speak(noun.singular)} className="group flex items-center gap-1.5 font-bold text-sm text-slate-800 hover:text-indigo-600">
                          {noun.singular} <span className="text-[10px] font-mono text-slate-400">{noun.ipaSingular}</span>
                          <Play className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-600" />
                        </button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-slate-400">Số nhiều:</span>
                        <button onClick={() => speak(noun.plural)} className="group flex items-center gap-1.5 font-bold text-sm text-indigo-600 hover:underline">
                          {noun.plural} <span className="text-[10px] font-mono text-slate-400">{noun.ipaPlural}</span>
                          <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium text-center">Nghĩa: <span className="font-semibold text-slate-700">{noun.vi}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Uncountable Nouns */}
          {nounSection === 'uncountable' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs font-medium leading-relaxed text-left">
                👉 <strong>Quy tắc quan trọng:</strong> Danh từ không đếm được (Uncountable Nouns) không có dạng số nhiều (không thêm -s/-es) và không thể dùng với <strong>a/an</strong> trực tiếp. Để đếm chúng, ta phải sử dụng các <strong>từ chỉ đo lường/đóng gói</strong> cụ thể đi kèm.
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pb-1 no-scrollbar overflow-x-auto text-left">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'liquid', label: 'Chất lỏng (Liquids)' },
                  { id: 'grain', label: 'Hạt & Bột (Grains & Powders)' },
                  { id: 'meat', label: 'Thịt & Thực phẩm (Meats & Food)' },
                  { id: 'abstract', label: 'Trừu tượng (Abstract)' },
                  { id: 'material', label: 'Vật liệu (Materials)' },
                  { id: 'other', label: 'Hiện tượng & Khác' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setUncountableCategory(cat.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                      uncountableCategory === cat.id
                        ? "bg-amber-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UNCOUNTABLE_NOUNS.filter(noun => uncountableCategory === 'all' || noun.category === uncountableCategory).map((noun, idx) => (
                  <div key={idx} className="premium-card p-4 hover:shadow-md transition-all bg-white border border-slate-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start text-left">
                      <div>
                        <button onClick={() => speak(noun.term)} className="group flex items-center gap-1.5 font-bold text-slate-800 hover:text-indigo-600">
                          {noun.term} <span className="text-xs font-mono text-slate-400">{noun.ipa}</span>
                          <Play className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-600" />
                        </button>
                        <p className="text-xs text-slate-400 font-medium mt-1">Nghĩa: {noun.vi}</p>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-100 p-2.5 rounded-xl text-right">
                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">Cụm từ đong đếm:</span>
                        <button onClick={() => speak(noun.measure)} className="group flex items-center gap-1 font-bold text-xs text-indigo-700 hover:underline mt-0.5">
                          {noun.measure} <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600 shrink-0" />
                        </button>
                        <span className="text-[10px] text-indigo-950 font-medium block mt-0.5">{noun.measureVi}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles A / AN */}
          {nounSection === 'articles' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ARTICLE_RULES.map((r, i) => (
                <div key={i} className="premium-card p-6 hover:shadow-xl transition-all space-y-3 bg-white text-left">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-black px-3 py-1 rounded-full", i < 2 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                      {r.rule}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">{r.condition}</p>
                  <div className="space-y-2">
                    {r.examples.map((ex, j) => (
                      <button key={j} onClick={() => speak(ex.word)} className="group w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-all cursor-pointer">
                        <span className="font-bold text-sm text-slate-800">{ex.word}</span>
                        <span className="text-xs font-mono text-slate-400">{ex.ipa}</span>
                        <Play className="w-3 h-3 text-slate-300 group-hover:text-indigo-600" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        );
}
