'use client';

import React, { useState } from 'react';
import { Zap, Volume2, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMMON_ADJECTIVES, ADJECTIVE_RULES, ADJECTIVE_TYPES, ADJECTIVES_USE_CASES, ADJECTIVES_BODY_PARTS } from '../../grammarData';
import { speak } from '../../utils/pronunciationUtils';

export default function AdjectivesTab() {
  const [adjSection, setAdjSection] = useState<'list' | 'rules' | 'types' | 'cases' | 'body'>('list');

  return (
      
        <div className="space-y-6">
          <div className="premium-card p-5 sm:p-6 bg-gradient-to-r from-pink-50 dark:from-pink-950/30 to-rose-50 dark:to-rose-950/30 border-pink-200 dark:border-pink-800">
            <h3 className="text-lg font-black text-pink-800 dark:text-pink-400 flex items-center gap-2 mb-2">
              <Palette className="w-5 h-5 text-pink-600 dark:text-pink-400" /> Tính Từ Tiếng Anh (English Adjectives)
            </h3>
            <p className="text-sm text-pink-700 dark:text-pink-400 leading-relaxed font-medium">
              Tính từ dùng để <strong>mô tả đặc điểm</strong> của danh từ. Tính từ có 3 cấp độ: <strong>Nguyên cấp</strong> (Positive), <strong>So sánh hơn</strong> (Comparative), và <strong>So sánh nhất</strong> (Superlative).
            </p>
          </div>

          {/* Sub-navigation */}
          <div className="flex flex-wrap gap-2">
            {([{ id: 'list' as const, label: 'Bảng tính từ' }, { id: 'rules' as const, label: 'Quy tắc so sánh' }, { id: 'types' as const, label: 'Phân loại' }, { id: 'cases' as const, label: 'Đối tượng & Đuôi -ed/-ing' }, { id: 'body' as const, label: 'Ngoại hình & Bộ phận' }]).map(s => (
              <button key={s.id} onClick={() => setAdjSection(s.id)} className={cn("px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer", adjSection === s.id ? "bg-pink-600 text-white shadow-lg" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-pink-400 dark:hover:border-pink-600")}>
                {s.label}
              </button>
            ))}
          </div>

          {adjSection === 'list' && (
            <div className="premium-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Nguyên cấp</th>
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">So sánh hơn</th>
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">So sánh nhất</th>
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider hidden sm:table-cell">Quy tắc</th>
                      <th className="text-left px-3 sm:px-4 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Nghĩa</th>
                      <th className="text-center px-2 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">🔊</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMMON_ADJECTIVES.map((adj, i) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                        <td className="px-3 sm:px-4 py-3 font-black text-slate-800 dark:text-slate-100">{adj.word}</td>
                        <td className="px-3 sm:px-4 py-3 font-semibold text-pink-700 dark:text-pink-400">{adj.comparative}</td>
                        <td className="px-3 sm:px-4 py-3 font-semibold text-rose-700 dark:text-rose-400">{adj.superlative}</td>
                        <td className="px-3 sm:px-4 py-3 text-slate-400 dark:text-slate-500 text-xs hidden sm:table-cell">{adj.rule}</td>
                        <td className="px-3 sm:px-4 py-3 text-slate-600 dark:text-slate-300 font-medium text-xs">{adj.vi}</td>
                        <td className="px-2 py-3 text-center">
                          <button onClick={() => speak(adj.word)} className="w-8 h-8 rounded-full bg-pink-50 dark:bg-pink-500/10 hover:bg-pink-500 text-pink-500 hover:text-white flex items-center justify-center transition-all cursor-pointer mx-auto border border-pink-100 dark:border-pink-800">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adjSection === 'rules' && (
            <div className="space-y-4">
              {ADJECTIVE_RULES.map((r, i) => (
                <div key={i} className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] space-y-3">
                  <h4 className="text-sm font-black text-pink-800 dark:text-pink-400 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 text-xs font-black flex items-center justify-center">{i + 1}</span>
                    {r.rule}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium bg-pink-50 dark:bg-pink-500/10 rounded-xl px-3 py-2">{r.examples}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic font-medium">💡 {r.note}</p>
                </div>
              ))}
            </div>
          )}

          {adjSection === 'types' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ADJECTIVE_TYPES.map((at, i) => (
                <div key={i} className="premium-card p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] space-y-2">
                  <h5 className="text-sm font-black text-pink-800 dark:text-pink-400">{at.type}</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{at.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {at.examples.map((ex, j) => (
                      <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-pink-50 dark:bg-pink-500/10 border border-pink-100 dark:border-pink-800 text-pink-700 dark:text-pink-400 font-bold">{ex}</span>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium italic">{at.vi}</p>
                </div>
              ))}
            </div>
          )}

          {adjSection === 'cases' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Describing People Only */}
                <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] space-y-4">
                  <h4 className="text-sm font-black text-pink-800 dark:text-pink-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    👥 Tính Từ Chỉ Người (Personality & Physical)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                    Dùng để tả tính cách, cảm xúc, hoặc đặc điểm thể chất đặc trưng của con người.
                  </p>
                  <div className="space-y-3">
                    {ADJECTIVES_USE_CASES.peopleOnly.map((adj, i) => (
                      <div key={i} className="p-3 bg-pink-50/50 dark:bg-pink-500/10 rounded-xl border border-pink-100 dark:border-pink-800 flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-pink-700 dark:text-pink-400">{adj.word}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">{adj.ipa}</span>
                            <span className="text-[10px] bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 px-1.5 py-0.5 rounded font-black">{adj.vi}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic">"{adj.ex}"</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">💡 {adj.exVi}</p>
                        </div>
                        <button onClick={() => speak(adj.word + ". " + adj.ex)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-pink-200 dark:border-pink-700 hover:bg-pink-500 text-pink-500 hover:text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Describing Things / Environments Only */}
                <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] space-y-4">
                  <h4 className="text-sm font-black text-pink-800 dark:text-pink-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    📦 Tính Từ Chỉ Vật & Khác (Things & Space)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                    Dùng để miêu tả đặc điểm hình dáng, không gian, trạng thái cơ học hoặc tính chất phi nhân hóa.
                  </p>
                  <div className="space-y-3">
                    {ADJECTIVES_USE_CASES.thingsOnly.map((adj, i) => (
                      <div key={i} className="p-3 bg-rose-50/50 dark:bg-rose-500/10 rounded-xl border border-rose-100 dark:border-rose-800 flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-rose-700 dark:text-rose-400">{adj.word}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">{adj.ipa}</span>
                            <span className="text-[10px] bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300 px-1.5 py-0.5 rounded font-black">{adj.vi}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic">"{adj.ex}"</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">💡 {adj.exVi}</p>
                        </div>
                        <button onClick={() => speak(adj.word + ". " + adj.ex)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-700 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ED vs ING Section */}
              <div className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] space-y-4">
                <h4 className="text-sm font-black text-pink-800 dark:text-pink-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  ⚠️ Phân biệt tính từ đuôi -ed và -ing (Crucial Distinction)
                </h4>
                <div className="p-4 bg-gradient-to-r from-pink-50 dark:from-pink-950/30 to-rose-50 dark:to-rose-950/30 rounded-2xl border border-pink-100 dark:border-pink-800 space-y-2">
                  <p className="text-xs text-pink-900 dark:text-pink-300 leading-relaxed font-bold">
                    📌 Quy tắc ghi nhớ:
                  </p>
                  <ul className="text-xs text-pink-800 dark:text-pink-300 list-disc pl-5 space-y-1 font-semibold">
                    <li><strong>Đuôi -ed:</strong> Diễn tả cảm xúc, thái độ của <strong>người</strong> trước một sự việc/sự vật. (Ví dụ: "I am bored" = Tôi thấy chán).</li>
                    <li><strong>Đuôi -ing:</strong> Diễn tả tính chất, bản chất của <strong>vật, sự việc hoặc chính con người đó</strong>. (Ví dụ: "The movie is boring" = Bộ phim tẻ nhạt).</li>
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left px-3 py-2 font-black text-pink-700 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-500/10">Đuôi -ed (Feeling)</th>
                        <th className="text-left px-3 py-2 font-black text-rose-700 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-500/10">Đuôi -ing (Characteristic)</th>
                        <th className="text-center px-2 py-2 font-black text-slate-500 dark:text-slate-400">🔊</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ADJECTIVES_USE_CASES.edVsIng.map((pair, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-3 py-3 space-y-1 bg-pink-50/20 dark:bg-pink-500/5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-pink-800 dark:text-pink-400">{pair.ed}</span>
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono italic">({pair.edVi})</span>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium italic">"{pair.exEd}"</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">💡 {pair.exEdVi}</p>
                          </td>
                          <td className="px-3 py-3 space-y-1 bg-rose-50/20 dark:bg-rose-500/5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-rose-800 dark:text-rose-400">{pair.ing}</span>
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono italic">({pair.ingVi})</span>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium italic">"{pair.exIng}"</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">💡 {pair.exIngVi}</p>
                          </td>
                          <td className="px-2 py-3 text-center">
                            <button onClick={() => speak(`${pair.ed}. ${pair.exEd}. ${pair.ing}. ${pair.exIng}`)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-pink-500 text-slate-500 dark:text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-all mx-auto">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {adjSection === 'body' && (
            <div className="space-y-6">
              {/* Alert card / Common Mistakes */}
              <div className="p-4 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2">
                <h4 className="text-xs font-black text-amber-800 dark:text-amber-400 flex items-center gap-2">
                  💡 LƯU Ý QUAN TRỌNG KHI TẢ BỘ PHẬN & NGOẠI HÌNH
                </h4>
                <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed font-semibold">
                  Tránh dịch thô (word-by-word) từ tiếng Việt sang tiếng Anh khi mô tả các bộ phận cơ thể. Ví dụ:
                </p>
                <ul className="text-xs text-amber-700 dark:text-amber-300 list-disc pl-5 space-y-1 font-medium">
                  <li><strong>Mũi thẳng:</strong> Dùng <span className="font-bold text-amber-900 dark:text-amber-500">straight nose</span>, không dùng <span className="line-through text-red-500 font-bold">long nose</span> (mũi dài - gợi liên tưởng mũi của Pinocchio khi nói dối).</li>
                  <li><strong>Mắt hai mí:</strong> Dùng <span className="font-bold text-amber-900 dark:text-amber-500">double-lidded eyes</span>, tránh dịch bừa thành <span className="line-through text-red-500 font-bold">two-eyelid eyes</span>.</li>
                  <li><strong>Mũi dọc dừa:</strong> Thường dùng <span className="font-bold text-amber-900 dark:text-amber-500">pointed nose</span> hoặc <span className="font-bold text-amber-900 dark:text-amber-500">straight, high nose</span> để mô tả độ cao và thanh thoát.</li>
                </ul>
              </div>

              {/* Grid of Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ADJECTIVES_BODY_PARTS.map((cat, i) => (
                  <div key={i} className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] space-y-4">
                    <h4 className="text-sm font-black text-pink-800 dark:text-pink-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      ✨ {cat.category}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                      {cat.desc}
                    </p>
                    <div className="space-y-3">
                      {cat.items.map((item, j) => (
                        <div key={j} className="p-3 bg-pink-50/30 dark:bg-pink-500/10 rounded-xl border border-pink-100/50 dark:border-pink-800/50 flex items-center justify-between gap-3 hover:border-pink-300 dark:hover:border-pink-600 transition-colors">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-black text-pink-700 dark:text-pink-400">{item.word}</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">{item.ipa}</span>
                              <span className="text-[10px] bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 px-1.5 py-0.5 rounded font-black">{item.vi}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold italic">({item.note})</p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold italic">"{item.ex}"</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">💡 {item.exVi}</p>
                          </div>
                          <button onClick={() => speak(item.word + ". " + item.ex)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-pink-200 dark:border-pink-700 hover:bg-pink-500 text-pink-500 hover:text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        );
}
