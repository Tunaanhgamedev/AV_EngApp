'use client';

import React, { useState } from 'react';
import { Zap, Target, Search, Loader2, Sparkles, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STRESS_RULES } from '../../phonicsData';
import { speak } from '../../utils/pronunciationUtils';

export default function StressRulesTab() {
  const [targetWord, setTargetWord] = useState('application');
  const [stressLoading, setStressLoading] = useState(false);
  const [stressResult, setStressResult] = useState<any>(null);

  const handleAnalyzeStress = async () => {
    if (!targetWord.trim()) return;
    setStressLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/ai/analyze-stress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: targetWord.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        setStressResult(data);
      }
    } catch (err) {
      console.error('Failed to analyze stress:', err);
    } finally {
      setStressLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="premium-card p-6 bg-gradient-to-r from-amber-50 dark:from-amber-950/30 to-orange-50 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
        <h3 className="text-lg font-black text-amber-900 flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Quy Tắc Trọng Âm & Công Cụ Phân Tích AI
        </h3>
        <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
          Trọng âm là việc phát âm một âm tiết to hơn, dài hơn và cao hơn các âm tiết còn lại. Nắm vững quy tắc trọng âm giúp người nghe hiểu chính xác từ bạn đang nói.
        </p>
      </div>

      {/* AI Stress Analyzer Component */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 animate-bounce" />
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-300">Công cụ Phân Tích Trọng Âm AI</h4>
          </div>
          <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">Gemini Powered</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={targetWord}
            onChange={(e) => setTargetWord(e.target.value)}
            placeholder="Nhập từ tiếng Anh (ví dụ: photograph, education...)"
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-sm font-semibold focus:outline-hidden focus:border-amber-400 text-white placeholder:text-slate-500"
          />
          <button
            onClick={handleAnalyzeStress}
            disabled={stressLoading || !targetWord.trim()}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {stressLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Phân Tích Ngay
          </button>
        </div>

        {stressResult && (
          <div className="mt-4 p-5 bg-slate-800/90 rounded-2xl border border-slate-700/80 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">{stressResult.word || targetWord}</span>
              <button
                onClick={() => speak(targetWord)}
                className="p-2 bg-amber-500/20 text-amber-300 rounded-full hover:bg-amber-500/30 transition-all cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            {stressResult.ipa && (
              <p className="text-xs text-amber-400 font-mono font-bold">Phiên âm: /{stressResult.ipa}/</p>
            )}
            {stressResult.explanation && (
              <p className="text-xs text-slate-300 leading-relaxed font-medium">{stressResult.explanation}</p>
            )}
          </div>
        )}
      </div>

      {/* Rules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STRESS_RULES.map((rule: any, idx: number) => (
          <div key={idx} className="premium-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3 hover:border-slate-300 transition-all">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 dark:text-amber-400 font-black text-xs flex items-center justify-center shrink-0">
                #{idx + 1}
              </span>
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{rule.title || rule.rule}</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{rule.description || rule.pattern}</p>
            {rule.examples && (
              <div className="flex flex-wrap gap-2 pt-1">
                {rule.examples.map((ex: any, i: number) => {
                  const wordStr = typeof ex === 'string' ? ex : ex.word;
                  const ipaStr = typeof ex === 'string' ? '' : ex.ipa;
                  return (
                    <button
                      key={i}
                      onClick={() => speak(wordStr)}
                      className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:bg-amber-50 dark:hover:bg-amber-500/20 hover:border-amber-200 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {wordStr} {ipaStr && <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">({ipaStr})</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
