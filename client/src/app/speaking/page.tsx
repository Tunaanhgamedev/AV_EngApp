'use client';

import React, { useState, Suspense, lazy } from 'react';
import { Mic2, Camera, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SpeakingPracticeTab = lazy(() => import('./components/SpeakingPracticeTab'));
const MouthShapeTab = lazy(() => import('./components/MouthShapeTab'));

const TabLoader = () => (
  <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-lg space-y-4 my-8 animate-pulse">
    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
    <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Đang tải phòng luyện tập...</p>
  </div>
);

export default function SpeakingPage() {
  const [activeTab, setActiveTab] = useState<'speaking' | 'mouth'>('speaking');

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 pb-12 animate-in fade-in duration-500">
      {/* Dynamic Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/95 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
        
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-black uppercase tracking-wider text-primary">
            <Sparkles className="w-3.5 h-3.5 fill-primary" /> AI Pronunciation Coach
          </div>
          <h1 className="text-3xl md:text-4xl font-black">Luyện Nói & Khẩu Hình AI</h1>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed font-medium">
            Luyện tập phát âm chuẩn bản xứ theo câu thực tế hoặc so khớp khẩu hình miệng trực quan bằng camera cùng trợ lý <span className="text-white font-bold underline decoration-primary decoration-2">EngBot AI</span>.
          </p>
        </div>

        <div className="flex gap-2.5 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 relative z-10 w-fit shrink-0">
          <button 
            onClick={() => setActiveTab('speaking')}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === 'speaking' ? "bg-white text-slate-900 shadow-md" : "text-slate-200 hover:text-white"
            )}
          >
            <Mic2 className="w-4 h-4" /> Luyện Phát Âm
          </button>
          <button 
            onClick={() => setActiveTab('mouth')}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === 'mouth' ? "bg-white text-slate-900 shadow-md" : "text-slate-200 hover:text-white"
            )}
          >
            <Camera className="w-4 h-4" /> Phòng Khẩu Hình AI
          </button>
        </div>
      </header>

      <Suspense fallback={<TabLoader />}>
        {activeTab === 'speaking' ? <SpeakingPracticeTab /> : <MouthShapeTab />}
      </Suspense>
    </div>
  );
}
