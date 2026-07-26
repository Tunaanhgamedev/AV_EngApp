'use client';

import React, { useState } from 'react';
import { Hash, Play, Info, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NUMBERS_BASIC, NUMBERS_TENS, NUMBERS_BIG, NUMBERS_COMBO, ORDINALS } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';

export default function NumbersTab() {
  const [numberSection, setNumberSection] = useState<'basic' | 'big' | 'combo' | 'ordinals'>('basic');

  return (
      
        <div className="space-y-6">
          <div className="premium-card p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <h3 className="text-lg font-black text-teal-800 flex items-center gap-2 mb-2">
              <Hash className="w-5 h-5 text-teal-600" /> Cách Đọc Số trong Tiếng Anh
            </h3>
            <p className="text-sm text-teal-700 leading-relaxed font-medium">
              Học cách phát âm các số từ 0–20, hàng chục, hàng trăm, nghìn, triệu, tỉ và quy tắc ghép số. Nhấn vào mỗi số để nghe phát âm.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'basic' as const, label: 'Số 0–20 & Hàng Chục' },
              { id: 'big' as const, label: 'Trăm → Tỉ' },
              { id: 'combo' as const, label: 'Quy Tắc Ghép Số' },
              { id: 'ordinals' as const, label: 'Số Thứ Tự' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setNumberSection(s.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                  numberSection === s.id ? "bg-teal-600 text-white shadow-md" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Basic 0-20 + Tens */}
          {numberSection === 'basic' && (
            <div className="space-y-6">
              <h4 className="font-black text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-teal-500 rounded-full" />Số từ 0 đến 20
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {NUMBERS_BASIC.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-4 flex flex-col items-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-teal-100 bg-teal-50/30 cursor-pointer">
                    <span className="text-2xl font-black text-teal-700">{n.num}</span>
                    <span className="text-xs font-bold text-slate-700">{n.en}</span>
                    <span className="text-[10px] text-slate-400 italic font-sans">{n.vi}</span>
                    <Play className="w-3 h-3 text-slate-300 group-hover:text-teal-500 fill-slate-300 group-hover:fill-teal-500" />
                  </button>
                ))}
              </div>

              <h4 className="font-black text-slate-800 flex items-center gap-2 pt-4">
                <span className="w-2.5 h-6 bg-teal-500 rounded-full" />Hàng Chục (10 – 100)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {NUMBERS_TENS.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-4 flex flex-col items-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-cyan-100 bg-cyan-50/30 cursor-pointer">
                    <span className="text-2xl font-black text-cyan-700">{n.num}</span>
                    <span className="text-xs font-bold text-slate-700">{n.en}</span>
                    <span className="text-[10px] text-slate-400 italic font-sans">{n.vi}</span>
                    <Play className="w-3 h-3 text-slate-300 group-hover:text-cyan-500 fill-slate-300 group-hover:fill-cyan-500" />
                  </button>
                ))}
              </div>

              <div className="premium-card p-4 bg-amber-50 border-amber-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700 font-medium space-y-1">
                  <p><strong>Lưu ý:</strong> Các số 13–19 có đuôi <span className="font-mono bg-amber-100 px-1 rounded">-teen</span> (nhấn mạnh âm TEEN). Hàng chục 20–90 có đuôi <span className="font-mono bg-amber-100 px-1 rounded">-ty</span> (nhấn âm đầu).</p>
                  <p>VD: thir<strong>TEEN</strong> /θɜːˈtiːn/ vs <strong>THIR</strong>ty /ˈθɜː.ti/</p>
                </div>
              </div>
            </div>
          )}

          {/* Big Numbers */}
          {numberSection === 'big' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {NUMBERS_BIG.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-6 flex items-center gap-5 hover:shadow-xl transition-all text-left cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-lg">
                      {n.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-black text-slate-800">{n.en}</p>
                      <p className="text-xs font-mono text-slate-400">{n.ipa}</p>
                      <p className="text-xs text-primary font-bold mt-1">📏 {n.rule}</p>
                    </div>
                    <Play className="w-5 h-5 text-slate-200 group-hover:text-teal-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Combo Rules */}
          {numberSection === 'combo' && (
            <div className="space-y-4">
              <div className="premium-card p-4 bg-purple-50 border-purple-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-purple-700 font-medium">
                  <p><strong>Quy tắc vàng:</strong> Đọc từ trái sang phải, lớn → nhỏ. Dùng <strong>"and"</strong> trước số hàng chục/đơn vị khi đứng sau hàng trăm.</p>
                </div>
              </div>
              <div className="space-y-3">
                {NUMBERS_COMBO.map((n, i) => (
                  <button key={i} onClick={() => speak(n.en)} className="group w-full premium-card p-5 flex items-center gap-4 hover:shadow-lg transition-all text-left cursor-pointer">
                    <span className="w-24 text-right text-2xl font-black text-primary flex-shrink-0 font-mono">{n.num}</span>
                    <div className="flex-1 min-w-0 border-l border-slate-200 pl-4">
                      <p className="font-bold text-slate-800">{n.en}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">📐 {n.rule}</p>
                    </div>
                    <Play className="w-4 h-4 text-slate-200 group-hover:text-primary flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ordinals */}
          {numberSection === 'ordinals' && (
            <div className="space-y-4">
              <div className="premium-card p-4 bg-blue-50 border-blue-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700 font-medium">
                  <p>Số thứ tự dùng để chỉ vị trí, thứ hạng. Thường thêm đuôi <strong>-th</strong> (fourth, fifth...) trừ 1st, 2nd, 3rd.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ORDINALS.map(n => (
                  <button key={n.num} onClick={() => speak(n.en)} className="group premium-card p-4 flex flex-col items-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-indigo-100 bg-indigo-50/30 cursor-pointer">
                    <span className="text-2xl font-black text-indigo-700">{n.num}</span>
                    <span className="text-xs font-bold text-slate-700">{n.en}</span>
                    <span className="text-[10px] text-slate-400 italic font-sans">{n.vi}</span>
                    <Play className="w-3 h-3 text-slate-300 group-hover:text-indigo-500 fill-slate-300 group-hover:fill-indigo-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        );
}
