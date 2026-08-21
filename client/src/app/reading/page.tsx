'use client';

import React, { useState, lazy, Suspense } from 'react';
import { BookOpen, Sparkles, Layers, Tag, Compass, Clock, Zap, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

// Lazy load components for performance
const ReadingPassagesTab = lazy(() => import('./components/ReadingPassagesTab'));
const PronounsReadingTab = lazy(() => import('./components/PronounsReadingTab'));
const NounEndingsTab = lazy(() => import('./components/NounEndingsTab'));
const WordPositionsTab = lazy(() => import('./components/WordPositionsTab'));
const TensesReadingTab = lazy(() => import('./components/TensesReadingTab'));
const GrammarPracticeTab = lazy(() => import('./components/GrammarPracticeTab'));

const speak = (text: string) => {
  if (typeof window === 'undefined') return;

  const playTranslateTTS = () => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audio.play().catch((err) => {
      console.error("Google Translate TTS fallback failed:", err);
    });
  };

  if (window.speechSynthesis) {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      playTranslateTTS();
      return;
    }

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.85;
    const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
    if (v) u.voice = v;

    u.onerror = (e) => {
      console.log("speechSynthesis error, playing Google Translate TTS:", e);
      playTranslateTTS();
    };

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        window.speechSynthesis.speak(u);
      }, 50);
    } else {
      window.speechSynthesis.speak(u);
    }
  } else {
    playTranslateTTS();
  }
};

const READING_TABS = [
  { id: 'articles' as const, label: 'Bài Đọc & AI Reading', icon: BookOpen, desc: 'Luyện đọc hiểu theo chủ đề & AI' },
  { id: 'pronouns' as const, label: 'Đại Từ & Quy Chiếu', icon: Layers, desc: 'Kỹ năng tìm từ quy chiếu trong bài đọc' },
  { id: 'noun_endings' as const, label: 'Chia Đuôi Danh Từ & Số Nhiều', icon: Tag, desc: 'Đuôi -tion, -ment, số ít/nhiều, không đếm được' },
  { id: 'word_positions' as const, label: 'Vị Trí Từ Loại & Cách Làm Bài', icon: Compass, desc: 'Vị trí N, V, Adj, Adv & mẹo giải 5 giây' },
  { id: 'tenses_grammar' as const, label: 'Phối Hợp Thì & Chủ Vị', icon: Clock, desc: 'Chuỗi thì when/while/since/before/as soon as' },
  { id: 'practice' as const, label: 'Luyện Tập Thực Chiến', icon: Zap, desc: 'Trắc nghiệm tương tác có giải thích chi tiết' },
] as const;

type ReadingTabId = typeof READING_TABS[number]['id'];

export default function ReadingPage() {
  const [activeTab, setActiveTab] = useState<ReadingTabId>('articles');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-700 pb-16">
      {/* Main Header */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4" /> Reading & Grammar Master Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
            Reading & Language Tactics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base mt-1 max-w-3xl">
            Luyện đọc hiểu thông minh, làm chủ kỹ năng quy chiếu đại từ, quy tắc chia đuôi danh từ số ít / số nhiều / không đếm được, công thức vị trí từ loại và sự phối hợp thì trong câu.
          </p>
        </div>

        {/* Tab Quick Selector */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl overflow-x-auto max-w-full gap-1 border border-slate-200/60 dark:border-slate-800 self-start xl:self-center">
          {READING_TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-md scale-[1.02]"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Tab Contents */}
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 dark:border-blue-400"></span>
          <p className="text-sm font-bold text-slate-400">Đang tải học phần...</p>
        </div>
      }>
        {activeTab === 'articles' && <ReadingPassagesTab speak={speak} />}
        {activeTab === 'pronouns' && <PronounsReadingTab speak={speak} />}
        {activeTab === 'noun_endings' && <NounEndingsTab speak={speak} />}
        {activeTab === 'word_positions' && <WordPositionsTab speak={speak} />}
        {activeTab === 'tenses_grammar' && <TensesReadingTab speak={speak} />}
        {activeTab === 'practice' && <GrammarPracticeTab speak={speak} />}
      </Suspense>
    </div>
  );
}
