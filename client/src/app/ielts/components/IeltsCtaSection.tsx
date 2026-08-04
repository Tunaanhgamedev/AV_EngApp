'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Play, ArrowRight } from 'lucide-react';

export default function IeltsCtaSection() {
  const router = useRouter();

  return (
    <section className="premium-card p-8 bg-gradient-to-r from-red-50 dark:from-red-950/30 to-rose-50 dark:to-rose-950/30 border-red-100">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Sẵn sàng thử sức với bài thi IELTS Full Test?</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Trải nghiệm thi thử 4 kĩ năng trong môi trường mô phỏng thi thật 100%.</p>
        </div>
        <button
          onClick={() => router.push('/ielts/test')}
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-red-500/20 flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          BẮT ĐẦU BÀI THI NGAY
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
