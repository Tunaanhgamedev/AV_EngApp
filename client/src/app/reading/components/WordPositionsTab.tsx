'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb, Compass, Zap, Target, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WORD_POSITIONS_DATA, WordPositionRule } from '../grammarData';

interface WordPositionsTabProps {
  speak: (text: string) => void;
}

export default function WordPositionsTab({ speak }: WordPositionsTabProps) {
  const [selectedPos, setSelectedPos] = useState<'noun' | 'verb' | 'adjective' | 'adverb'>('noun');

  const activeRule = WORD_POSITIONS_DATA.find(r => r.partOfSpeech === selectedPos) || WORD_POSITIONS_DATA[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero: 3-Step Strategy Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 p-8 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-black uppercase tracking-wider text-amber-200 border border-white/20">
            <Zap className="w-4 h-4 text-amber-300" /> Bí Kíp Giải Nhanh Trong 5 Giây
          </div>
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Vị Trí Từ Loại & Phương Pháp Phân Tích Cấu Trúc Câu
            </h2>
            <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
              Các dạng bài tập điền từ loại (Word Form) chiếm tới 30-40% số điểm trong các kỳ thi tiếng Anh. Nắm vững công thức vị trí của <strong>Danh từ, Động từ, Tính từ, Trạng từ</strong> và thực hành quy trình 3 bước xử lý siêu tốc!
            </p>
          </div>

          {/* 3-Step Rapid Solving Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              {
                step: 'BƯỚC 1',
                title: 'Nhìn Trước & Nhìn Sau',
                desc: 'Quan sát từ đứng ngay trước và ngay sau khoảng trống để xác định loại từ cần điền (N, V, Adj hay Adv).',
                color: 'bg-amber-500/30 border-amber-300/30'
              },
              {
                step: 'BƯỚC 2',
                title: 'Loại Trừ Qua Hậu Tố',
                desc: 'Dựa vào đuôi từ (-tion, -ment = N; -ful, -ive = Adj; -ly = Adv) để loại bỏ ngay 2-3 đáp án sai trong 3 giây.',
                color: 'bg-orange-500/30 border-orange-300/30'
              },
              {
                step: 'BƯỚC 3',
                title: 'Xét Chi Tiết Cuối Cùng',
                desc: 'Nếu còn 2 đáp án cùng loại từ: xét số ít/nhiều (N), chủ động/bị động (V) hoặc nghĩa người vs vật.',
                color: 'bg-rose-500/30 border-rose-300/30'
              }
            ].map((st, i) => (
              <div key={i} className={cn("p-5 rounded-2xl border backdrop-blur-md space-y-2", st.color)}>
                <span className="text-[11px] font-black tracking-widest text-amber-200">{st.step}</span>
                <h4 className="font-black text-base text-white">{st.title}</h4>
                <p className="text-xs text-amber-100/80 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POS Switcher */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Compass className="w-6 h-6 text-amber-600 dark:text-amber-400" /> Bảng Công Thức Vị Trí Chi Tiết
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Chọn từ loại để xem toàn bộ vị trí xuất hiện, ví dụ minh họa và các bẫy thường gặp.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'noun' as const, label: '📘 Danh Từ (Noun - N)', desc: 'Chủ ngữ, Tân ngữ, sau mạo từ/sở hữu' },
            { id: 'verb' as const, label: '📗 Động Từ (Verb - V)', desc: 'Sau chủ ngữ, sau modal verbs, to-V' },
            { id: 'adjective' as const, label: '📙 Tính Từ (Adj)', desc: 'Trước Noun, sau Linking Verbs, make O Adj' },
            { id: 'adverb' as const, label: '🔮 Trạng Từ (Adv)', desc: 'Đầu câu phẩy, giữa trợ V và V chính, trước Adj' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedPos(tab.id)}
              className={cn(
                "p-4 rounded-2xl font-black text-left transition-all border cursor-pointer space-y-1",
                selectedPos === tab.id
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-md scale-[1.02]"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400"
              )}
            >
              <div className="text-sm font-black">{tab.label}</div>
              <p className={cn("text-[11px] font-medium leading-snug line-clamp-1", selectedPos === tab.id ? "text-slate-300 dark:text-slate-600" : "text-slate-400 dark:text-slate-500")}>
                {tab.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Active POS Detail Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Part of Speech Analysis
              </span>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">
                {activeRule.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1.5 max-w-3xl">
                {activeRule.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 max-w-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 w-full mb-1">
                Hậu tố nhận diện nhanh:
              </span>
              {activeRule.suffixes.map((suf, si) => (
                <span key={si} className="px-2 py-0.5 rounded-md bg-amber-100/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black">
                  {suf}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Formula Cheat Box */}
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-3">
            <h4 className="font-black text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" /> Tóm Tắt Các Vị Trí Vàng:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeRule.formula.map((form, fi) => (
                <div key={fi} className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-900/30 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  <code>{form}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Position Breakdowns */}
          <div className="space-y-4">
            <h4 className="text-base font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" /> Chi Tiết Từng Vị Trí & Ví Dụ Ngữ Cảnh:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeRule.positions.map((pos, pi) => (
                <div key={pi} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-black text-sm text-slate-800 dark:text-slate-100">
                      {pi + 1}. {pos.rule}
                    </h5>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-100/50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-300 text-xs font-mono font-bold">
                    {pos.formula}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{pos.exampleEn}</p>
                      <button onClick={() => speak(pos.exampleEn)} className="text-xs text-amber-600 hover:underline font-bold cursor-pointer flex-shrink-0 ml-2">
                        Nghe
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">{pos.exampleVi}</p>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 font-medium">
                    💡 <em>{pos.explanation}</em>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Traps Alert */}
          {activeRule.traps && activeRule.traps.length > 0 && (
            <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-4">
              <h4 className="font-black text-sm text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" /> Bẫy Đề Thi Cần Tuyệt Đối Tránh:
              </h4>
              <div className="space-y-3">
                {activeRule.traps.map((trap, ti) => (
                  <div key={ti} className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-rose-200/80 dark:border-rose-900/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black text-rose-700 dark:text-rose-400">
                      <span>⚠️ Bẫy:</span>
                      <span>{trap.trap}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <span>✅ Khắc phục:</span>
                      <span>{trap.correction}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      {trap.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
