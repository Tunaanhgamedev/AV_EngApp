'use client';

import React, { useState, lazy, Suspense } from 'react';
import { Clock, Sparkles, BookOpen, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import TheoryTab from './TheoryTab';

// ─── Lazy-loaded tabs — only download when user clicks ─────────
const GraderTab = lazy(() => import('./GraderTab'));
const SpeedrunTab = lazy(() => import('./SpeedrunTab'));

// ─── Loading skeleton ──────────────────────────────────────────
function TabSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
        <div className="h-6 w-48 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        <div className="h-4 w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg" />
        <div className="h-4 w-3/4 bg-slate-50 dark:bg-slate-800/50 rounded-lg" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-2xl" />
          <div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-2xl" />
          <div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Tab config ────────────────────────────────────────────────
const TABS = [
  { id: 'theory' as const, label: 'Lý Thuyết & So Sánh', icon: BookOpen },
  { id: 'grader' as const, label: 'Cố Vấn AI Tenses', icon: Sparkles },
  { id: 'speedrun' as const, label: 'Tense Speedrun ⚡', icon: Timer },
] as const;

type TabId = typeof TABS[number]['id'];

export default function TensesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('theory');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Panel */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
              12 Tenses AI Portal <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              Hệ thống chuyên biệt nghiên cứu 12 thì tiếng Anh toàn diện từ cơ bản đến nâng cao, tích hợp chấm điểm AI và phản xạ nhanh.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all",
                activeTab === t.id 
                  ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* ─── Tab Content ─── */}
      {activeTab === 'theory' && <TheoryTab />}

      {activeTab === 'grader' && (
        <Suspense fallback={<TabSkeleton />}>
          <GraderTab />
        </Suspense>
      )}

      {activeTab === 'speedrun' && (
        <Suspense fallback={<TabSkeleton />}>
          <SpeedrunTab />
        </Suspense>
      )}
    </div>
  );
}
