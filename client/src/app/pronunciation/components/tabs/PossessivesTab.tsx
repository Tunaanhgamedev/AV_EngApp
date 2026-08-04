'use client';

import React, { useState } from 'react';
import { Users, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { POSSESSIVE_TABLE, POSSESSIVE_RULES } from '../../grammarData';
import { speak } from '../../utils/pronunciationUtils';

export default function PossessivesTab() {
  const [possSection, setPossSection] = useState<'table' | 'rules'>('table');

  return (
      
        <div className="space-y-6">
          <div className="premium-card p-5 sm:p-6 bg-gradient-to-r from-teal-50 dark:from-teal-950/30 to-cyan-50 dark:to-cyan-950/30 border-teal-200 dark:border-teal-800">
            <h3 className="text-lg font-black text-teal-800 flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" /> Đại Từ Sở Hữu (Possessive Pronouns)
            </h3>
            <p className="text-sm text-teal-700 dark:text-teal-400 leading-relaxed font-medium">
              Hệ thống đại từ sở hữu gồm 3 loại chính: <strong>Tính từ sở hữu</strong> (my, your...), <strong>Đại từ sở hữu</strong> (mine, yours...) và <strong>Đại từ phản thân</strong> (myself, yourself...).
            </p>
          </div>

          {/* Sub-navigation */}
          <div className="flex flex-wrap gap-2">
            {([{ id: 'table' as const, label: 'Bảng tổng hợp' }, { id: 'rules' as const, label: 'Quy tắc sử dụng' }]).map(s => (
              <button key={s.id} onClick={() => setPossSection(s.id)} className={cn("px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer", possSection === s.id ? "bg-teal-600 text-white shadow-lg" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-teal-400")}>
                {s.label}
              </button>
            ))}
          </div>

          {possSection === 'table' && (
            <div className="space-y-4">
              {/* Comprehensive Table */}
              <div className="premium-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left px-3 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Chủ ngữ</th>
                        <th className="text-left px-3 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Tân ngữ</th>
                        <th className="text-left px-3 py-3 font-black text-teal-600 dark:text-teal-400 text-xs uppercase tracking-wider bg-teal-50 dark:bg-teal-500/10">TT sở hữu</th>
                        <th className="text-left px-3 py-3 font-black text-cyan-600 dark:text-cyan-400 text-xs uppercase tracking-wider bg-cyan-50 dark:bg-cyan-500/10">ĐT sở hữu</th>
                        <th className="text-left px-3 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider hidden sm:table-cell">Phản thân</th>
                        <th className="text-center px-2 py-3 font-black text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">🔊</th>
                      </tr>
                    </thead>
                    <tbody>
                      {POSSESSIVE_TABLE.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-teal-50/50 transition-colors">
                          <td className="px-3 py-3 font-black text-slate-800 dark:text-slate-100">{row.subject}</td>
                          <td className="px-3 py-3 font-semibold text-slate-600 dark:text-slate-300">{row.object}</td>
                          <td className="px-3 py-3 font-black text-teal-700 dark:text-teal-400 bg-teal-50/30">{row.possAdj}</td>
                          <td className="px-3 py-3 font-black text-cyan-700 dark:text-cyan-400 bg-cyan-50/30">{row.possPron}</td>
                          <td className="px-3 py-3 font-semibold text-slate-500 dark:text-slate-400 hidden sm:table-cell">{row.reflexive}</td>
                          <td className="px-2 py-3 text-center">
                            <button onClick={() => speak(`${row.possAdj}, ${row.possPron}`)} className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-500/10 hover:bg-teal-500 text-teal-500 hover:text-white flex items-center justify-center transition-all cursor-pointer mx-auto border border-teal-100 dark:border-teal-800">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Example Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {POSSESSIVE_TABLE.filter(r => r.possPron !== '(không dùng)').map((row, i) => (
                  <div key={i} className="premium-card p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 dark:text-teal-400 font-black text-sm flex items-center justify-center">{row.subject}</span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{row.vi}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-teal-50 dark:bg-teal-500/10 rounded-xl p-3 border border-teal-100 dark:border-teal-800">
                        <p className="text-xs font-black text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">Tính từ sở hữu ({row.possAdj})</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{row.exAdj}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{row.exAdjVi}</p>
                      </div>
                      <div className="bg-cyan-50 dark:bg-cyan-500/10 rounded-xl p-3 border border-cyan-100 dark:border-cyan-800">
                        <p className="text-xs font-black text-cyan-700 dark:text-cyan-400 uppercase tracking-wider mb-1">Đại từ sở hữu ({row.possPron})</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{row.exPron}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{row.exPronVi}</p>
                      </div>
                    </div>
                    <button onClick={() => speak(`${row.exAdj} ${row.exPron}`)} className="w-full py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-teal-500 text-slate-400 dark:text-slate-500 hover:text-white text-xs font-bold transition-all cursor-pointer border border-slate-100 dark:border-slate-800 flex items-center justify-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5" /> Nghe ví dụ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {possSection === 'rules' && (
            <div className="space-y-4">
              {POSSESSIVE_RULES.map((r, i) => (
                <div key={i} className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] space-y-3">
                  <h4 className="text-sm font-black text-teal-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-600 dark:text-teal-400 text-xs font-black flex items-center justify-center">{i + 1}</span>
                    {r.rule}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{r.desc}</p>
                  <div className="bg-teal-50 dark:bg-teal-500/10 rounded-xl p-3 border border-teal-100 dark:border-teal-800">
                    <p className="text-xs font-mono text-teal-700 dark:text-teal-400 font-bold">{r.formula}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.examples.map((ex, j) => (
                      <button key={j} onClick={() => speak(ex)} className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 font-bold hover:bg-teal-500 hover:text-white transition-all cursor-pointer">
                        {ex}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 italic font-medium">💡 {r.exVi}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        );
}
