'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BAND_DESCRIPTORS } from '@/data/ieltsData';

export default function IeltsBandDescriptorsSection() {
  return (
    <section className="premium-card p-8">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Thang điểm IELTS Band Score</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Hiểu rõ mục tiêu điểm số của bạn</p>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {BAND_DESCRIPTORS.map(b => (
            <div key={b.band} className="text-center space-y-2 group cursor-default">
              <div className={cn("h-16 rounded-xl flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-105", b.color)}>
                {b.band}
              </div>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
