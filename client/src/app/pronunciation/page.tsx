'use client';

import React, { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { Volume2, BookOpen, Sparkles, Target, Star, Hash, FileText, Calendar, Globe, MessageSquare, Zap, Palette, Users, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Lazy-loaded Tab Components
const AlphabetTab = lazy(() => import('./components/tabs/AlphabetTab'));
const IpaChartTab = lazy(() => import('./components/tabs/IpaChartTab'));
const StressRulesTab = lazy(() => import('./components/tabs/StressRulesTab'));
const IntonationTab = lazy(() => import('./components/tabs/IntonationTab'));
const MinimalPairsTab = lazy(() => import('./components/tabs/MinimalPairsTab'));
const WordBuildingTab = lazy(() => import('./components/tabs/WordBuildingTab'));
const NumbersTab = lazy(() => import('./components/tabs/NumbersTab'));
const WordEndingsTab = lazy(() => import('./components/tabs/WordEndingsTab'));
const NounsTab = lazy(() => import('./components/tabs/NounsTab'));
const DatetimeTab = lazy(() => import('./components/tabs/DatetimeTab'));
const CountriesTab = lazy(() => import('./components/tabs/CountriesTab'));
const TopicsTab = lazy(() => import('./components/tabs/TopicsTab'));
const VerbsTab = lazy(() => import('./components/tabs/VerbsTab'));
const AdjectivesTab = lazy(() => import('./components/tabs/AdjectivesTab'));
const PossessivesTab = lazy(() => import('./components/tabs/PossessivesTab'));
const TensesPronunciationTab = lazy(() => import('./components/tabs/TensesPronunciationTab'));

function TabLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-xs">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
      <p className="text-xs font-bold text-slate-500">Đang tải nội dung học...</p>
    </div>
  );
}

export default function PronunciationPage() {
  const [activeTab, setActiveTab] = useState<string>('alphabet');

  const TABS = [
    { id: 'alphabet', name: 'Bảng chữ cái & Phonics', icon: BookOpen, color: 'text-blue-600' },
    { id: 'chart', name: 'Bảng phiên âm IPA', icon: Volume2, color: 'text-violet-600' },
    { id: 'stress', name: 'Trọng âm từ & Phân tích AI', icon: Sparkles, color: 'text-amber-600' },
    { id: 'intonation', name: 'Ngữ điệu & Trọng âm câu', icon: MessageSquare, color: 'text-indigo-600' },
    { id: 'pairs', name: 'Cặp âm dễ nhầm (Minimal Pairs)', icon: Target, color: 'text-emerald-600' },
    { id: 'building', name: 'Ghép âm & Từ nối', icon: Palette, color: 'text-pink-600' },
    { id: 'numbers', name: 'Phát âm Chữ số & Số thứ tự', icon: Hash, color: 'text-orange-600' },
    { id: 'endings', name: 'Quy tắc Đuôi -ed / -s / -es', icon: FileText, color: 'text-teal-600' },
    { id: 'nouns', name: 'Danh từ: Số nhiều, Không đếm được', icon: BookOpen, color: 'text-cyan-600' },
    { id: 'datetime', name: 'Thứ, Tháng, Năm & Thời gian', icon: Calendar, color: 'text-purple-600' },
    { id: 'countries', name: 'Quốc gia & Quốc tịch', icon: Globe, color: 'text-blue-500' },
    { id: 'topics', name: 'Phát âm theo Chủ đề', icon: MessageSquare, color: 'text-rose-600' },
    { id: 'verbs', name: 'Động từ: Bảng 3 thể & Chia thì', icon: Zap, color: 'text-amber-500' },
    { id: 'adjectives', name: 'Tính từ: So sánh & Trật tự', icon: Star, color: 'text-indigo-500' },
    { id: 'possessives', name: 'Đại từ & Tính từ sở hữu', icon: Users, color: 'text-emerald-500' },
    { id: 'tenses', name: 'Hệ thống Thì & Ôn tập', icon: Clock, color: 'text-slate-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-violet-50 text-violet-600 text-xs font-black rounded-full border border-violet-100">
                Luyện âm chuẩn IPA
              </span>
              <span className="text-xs font-semibold text-slate-400">16 Chuyên đề</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Phòng Luyện Phát Âm & Ngữ Pháp
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
              Luyện phát âm chuẩn IPA, trọng âm, ngữ điệu và nắm vững quy tắc ngữ pháp với AI.
            </p>
          </div>

          <Link
            href="/speaking"
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" /> Luyện nói AI với EngBot
          </Link>
        </div>

        {/* Tab Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 bg-white p-2.5 rounded-3xl border border-slate-200/60 shadow-xs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer text-center group relative",
                  isActive
                    ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                    : "hover:bg-slate-50 text-slate-600"
                )}
              >
                <Icon className={cn("w-5 h-5 mb-1.5 transition-transform group-hover:scale-110", isActive ? "text-white" : tab.color)} />
                <span className="text-[11px] font-bold leading-tight line-clamp-2">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content with Suspense Code Splitting */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-xs min-h-[500px]">
          <Suspense fallback={<TabLoader />}>
            {activeTab === 'alphabet' && <AlphabetTab />}
            {activeTab === 'chart' && <IpaChartTab />}
            {activeTab === 'stress' && <StressRulesTab />}
            {activeTab === 'intonation' && <IntonationTab />}
            {activeTab === 'pairs' && <MinimalPairsTab />}
            {activeTab === 'building' && <WordBuildingTab />}
            {activeTab === 'numbers' && <NumbersTab />}
            {activeTab === 'endings' && <WordEndingsTab />}
            {activeTab === 'nouns' && <NounsTab />}
            {activeTab === 'datetime' && <DatetimeTab />}
            {activeTab === 'countries' && <CountriesTab />}
            {activeTab === 'topics' && <TopicsTab />}
            {activeTab === 'verbs' && <VerbsTab />}
            {activeTab === 'adjectives' && <AdjectivesTab />}
            {activeTab === 'possessives' && <PossessivesTab />}
            {activeTab === 'tenses' && <TensesPronunciationTab />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
