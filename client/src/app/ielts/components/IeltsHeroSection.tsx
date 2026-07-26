'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Award, Target, Clock, BarChart3, Play, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BAND_DESCRIPTORS } from '@/data/ieltsData';

export default function IeltsHeroSection() {
  const router = useRouter();

  return (
    <section className="premium-card p-1 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-br from-red-950 via-rose-900 to-red-800 rounded-[22px] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI2di0yaDEwem0wLTRWMjhoLTEwdjJoMTB6bS0xNCA0aDJ2LTJoLTJ2MnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/20 text-red-200 rounded-full border border-red-500/20">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">IELTS Academic & General</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Luyện thi <span className="bg-gradient-to-r from-red-300 to-rose-200 bg-clip-text text-transparent">IELTS</span>
              <br />mô phỏng thật 100%
            </h1>

            <p className="text-red-200/80 text-lg font-medium max-w-xl">
              Giao diện luyện thi giống phòng thi thật. Chấm bài Writing & Speaking bằng AI. Đầy đủ 4 kĩ năng Listening, Reading, Writing, Speaking.
            </p>

            <div className="flex flex-wrap gap-6 justify-center md:justify-start text-red-300/80 text-sm font-bold">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-300" />
                <span>4 kĩ năng</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-300" />
                <span>~2 giờ 45 phút/bài thi</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-red-300" />
                <span>Band Score: 0 — 9.0</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <button
                onClick={() => router.push('/ielts/test')}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-rose-400 text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-red-500/30 flex items-center gap-2 group"
              >
                <Play className="w-5 h-5" />
                THI THỬ FULL TEST
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur"
              >
                <Sparkles className="w-5 h-5" />
                LUYỆN TỪNG KĨ NĂNG
              </button>
            </div>
          </div>

          {/* Band Score Display */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#ieltsGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="44" />
                <defs>
                  <linearGradient id="ieltsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">7.0</span>
                <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">Mục tiêu</span>
              </div>
            </div>
            <div className="flex gap-3">
              {BAND_DESCRIPTORS.slice(0, 4).map(b => (
                <div key={b.band} className="text-center">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black", b.color)}>
                    {b.band}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
