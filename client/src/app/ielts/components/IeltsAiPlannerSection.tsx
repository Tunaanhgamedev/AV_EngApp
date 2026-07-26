'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getIeltsStudyPlan } from '@/services/ielts.service';

export default function IeltsAiPlannerSection() {
  const { user } = useAuth();
  const router = useRouter();

  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [errorPlan, setErrorPlan] = useState<string | null>(null);

  const handleGenerateIeltsPlan = async () => {
    if (!user || loadingPlan) return;
    try {
      setLoadingPlan(true);
      setErrorPlan(null);
      const token = await user.getIdToken();
      const plan = await getIeltsStudyPlan(user.uid, token);
      setStudyPlan(plan);
    } catch (err: any) {
      setErrorPlan('Không thể tạo lộ trình. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoadingPlan(false);
    }
  };

  return (
    <section className="premium-card p-6 bg-gradient-to-r from-violet-500/5 to-purple-500/5 border border-violet-100/50 rounded-3xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20 flex-shrink-0">
            <Brain className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              Cố Vấn Lộ Trình Học IELTS
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-violet-100 text-violet-700 animate-bounce">AI</span>
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Phân tích band score lịch sử 4 kỹ năng để thiết kế lộ trình ôn tập 4 tuần cá nhân hóa tối ưu nhất.
            </p>
          </div>
        </div>
        <button
          onClick={handleGenerateIeltsPlan}
          disabled={loadingPlan || !user}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-black text-xs rounded-xl shadow-lg shadow-violet-500/20 hover:opacity-95 transition-all flex items-center gap-1.5 justify-center disabled:opacity-50 flex-shrink-0 cursor-pointer"
        >
          {loadingPlan ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> ĐANG PHÂN TÍCH...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> THIẾT KẾ LỘ TRÌNH IELTS</>
          )}
        </button>
      </div>

      {errorPlan && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-sm font-bold text-rose-600 flex items-center gap-2">
          <span>⚠️</span> {errorPlan}
        </div>
      )}

      {studyPlan && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 border-t border-slate-100 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2 md:col-span-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Phân tích năng lực IELTS</h3>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed">{studyPlan.summary}</p>
            </div>
            <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2 flex flex-col justify-center items-center text-center">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Mục tiêu Band Score</h3>
              <div className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mt-1">
                IELTS {studyPlan.recommendedTarget}
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-1">Lộ trình 4 tuần nâng band vượt bậc</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Lộ trình học tập chi tiết 4 tuần</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyPlan.weeks?.map((w: any) => (
                <div key={w.weekNumber} className="premium-card p-5 border-slate-100/60 bg-white hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-black flex items-center justify-center flex-shrink-0">
                        {w.weekNumber}
                      </span>
                      <h4 className="text-sm font-black text-slate-800">{w.theme}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {w.focusSkills?.map((s: string) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-extrabold text-[9px] uppercase tracking-wider">
                          {s}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-500 font-medium list-disc list-inside">
                      {w.actions?.map((act: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{act}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {w.focusSkills?.slice(0, 2).map((s: string) => (
                      <button
                        key={s}
                        onClick={() => router.push(`/ielts/practice/${s}`)}
                        className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60 font-bold rounded-lg text-[10px] transition-colors capitalize"
                      >
                        Luyện {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
