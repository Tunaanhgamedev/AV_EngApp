'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, BookOpen, Sparkles, Check, ChevronRight, Zap, Layers, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOEIC_VOCAB_DATA, TOEICList, TOEICCategory } from '@/data/toeicVocab';

const ToeicFlashcardTab = lazy(() => import('./components/ToeicFlashcardTab'));
const ToeicQuizTab = lazy(() => import('./components/ToeicQuizTab'));
const ToeicMatchingTab = lazy(() => import('./components/ToeicMatchingTab'));
const ToeicFillTab = lazy(() => import('./components/ToeicFillTab'));
const ToeicDictationTab = lazy(() => import('./components/ToeicDictationTab'));

function TabLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Đang tải chế độ luyện tập...</p>
    </div>
  );
}

export default function TOEICVocabularyPage() {
  const router = useRouter();

  // Navigation states
  const [selectedCategory, setSelectedCategory] = useState<TOEICCategory | null>(null);
  const [selectedList, setSelectedList] = useState<TOEICList | null>(null);

  // Practice session states
  const [activeTab, setActiveTab] = useState<'flashcard' | 'quiz' | 'matching' | 'fill' | 'dictation'>('flashcard');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tab 1: Flashcard States
  const [learnedCount, setLearnedCount] = useState(0);
  const [learnedStatus, setLearnedStatus] = useState<Record<string, boolean>>({});

  // Initialize Category/List on load if needed
  useEffect(() => {
    if (selectedList) {
      setCurrentIndex(0);
      setActiveTab('flashcard');
      setLearnedCount(0);
      setLearnedStatus({});
    }
  }, [selectedList]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      
      {/* HEADER NAVIGATION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (selectedList) {
                setSelectedList(null);
              } else if (selectedCategory) {
                setSelectedCategory(null);
              } else {
                router.push('/toeic');
              }
            }}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95 text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              Luyện Từ Vựng TOEIC
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">
              {selectedList 
                ? `${selectedCategory?.title} / ${selectedList.name}`
                : selectedCategory 
                  ? selectedCategory.title
                  : 'Trang Chủ Học Từ Vựng'}
            </p>
          </div>
        </div>

        {selectedList && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-black text-[10px] uppercase tracking-wider">
              {currentIndex + 1} / {selectedList.words.length} Từ
            </span>
          </div>
        )}
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* VIEW 1: CATEGORY SELECTION                               */}
      {/* ──────────────────────────────────────────────────────── */}
      {!selectedCategory && !selectedList && (
        <div className="space-y-8">
          {/* Banner Hero */}
          <div className="premium-card p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 rounded-[2rem] text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                Phương pháp Ôn Tập 5 Chiều
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">Học Từ Vựng Nhớ Suốt Đời</h2>
              <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-semibold">
                Ôn luyện mỗi nhóm 10 từ qua 5 chiều giác quan: Thẻ lật 3D, Trắc nghiệm phản xạ, Ghép thẻ nhanh, Điền từ chính xác và Chính tả âm thanh. Đảm bảo thuộc làu và viết chuẩn.
              </p>
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOEIC_VOCAB_DATA.map((cat) => {
              const totalWords = cat.lists.reduce((acc, l) => acc + l.words.length, 0);
              return (
                <div
                  key={cat.id}
                  className="premium-card p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 rounded-3xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center shadow-md", cat.color)}>
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-full text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Target: {cat.difficulty}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">{cat.title}</h3>
                      <p className="text-xs text-slate-450 font-semibold mt-1 leading-relaxed">{cat.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Quy mô từ</p>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-black">{totalWords} Từ vựng</p>
                    </div>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className="px-4 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                    >
                      Học ngay
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* VIEW 2: LISTS WITHIN CATEGORY                            */}
      {/* ──────────────────────────────────────────────────────── */}
      {selectedCategory && !selectedList && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">{selectedCategory.title}</h2>
              <p className="text-xs text-slate-550 font-semibold mt-0.5">{selectedCategory.description}</p>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-black uppercase tracking-wider cursor-pointer"
            >
              Chọn Target Khác
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCategory.lists.map((list) => (
              <div
                key={list.id}
                className="premium-card p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/20 rounded-2xl flex items-center justify-between shadow-sm transition-all"
              >
                <div className="space-y-1 pr-4">
                  <h3 className="font-black text-sm text-slate-800 dark:text-slate-100">{list.name}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium line-clamp-2">{list.description}</p>
                  <p className="text-[10px] font-bold text-primary bg-primary/5 border border-primary/10 rounded px-2 py-0.5 inline-block mt-1">
                    {list.words.length} từ vựng
                  </p>
                </div>

                <button
                  onClick={() => setSelectedList(list)}
                  className="px-4 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-sm shadow-primary/10 cursor-pointer shrink-0"
                >
                  Vào Học
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* VIEW 3: DYNAMIC STUDY SPACE (5 PRACTICE MODES)            */}
      {/* ──────────────────────────────────────────────────────── */}
      {selectedList && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: TOPIC LISTS & MODE TABS */}
          <div className="md:col-span-4 space-y-4">
            
            {/* 1. Mode Tabs Navigation */}
            <div className="premium-card p-3 sm:p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md rounded-3xl space-y-1.5">
              <h3 className="font-black text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-2">5 Chế Độ Luyện Tập</h3>
              
              <button
                onClick={() => setActiveTab('flashcard')}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'flashcard'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-650 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <span>🎴 Thẻ Flashcard 3D</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'quiz'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-655 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <span>⚡ Trắc Nghiệm Phản Xạ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('matching')}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'matching'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-655 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <span>🧩 Ghép Cặp Thẻ Từ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('fill')}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'fill'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-655 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <span>✏️ Điền Từ Nhớ Từ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('dictation')}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl text-left text-xs font-black flex items-center justify-between border-2 transition-all cursor-pointer",
                  activeTab === 'dictation'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-transparent text-slate-655 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <span>🎧 Luyện Nghe Viết</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Wordlist status display */}
            <div className="premium-card p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-3xl hidden sm:block">
              <div className="flex items-center justify-between mb-3 border-b border-slate-50 dark:border-slate-800 pb-2">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Từ trong bài học</span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{selectedList.words.length} từ</span>
              </div>
              
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                {selectedList.words.map((w, index) => (
                  <button
                    key={w.id}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-full p-2 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer",
                      currentIndex === index 
                        ? "bg-slate-900 border-slate-900 text-white" 
                        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    <span className="truncate">{w.word} <span className={cn("text-[9px] font-sans italic", currentIndex === index ? "text-slate-300" : "text-slate-400")}>({w.wordType})</span></span>
                    {learnedStatus[w.id] && (
                      <Check className="w-3 h-3 text-emerald-500 font-bold shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CENTER PANEL: INTERACTIVE CONTENT */}
          <div className="md:col-span-8 space-y-6">
            
            <Suspense fallback={<TabLoader />}>
              {activeTab === 'flashcard' && (
                <ToeicFlashcardTab
                  selectedList={selectedList}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  learnedStatus={learnedStatus}
                  setLearnedStatus={setLearnedStatus}
                  setLearnedCount={setLearnedCount}
                />
              )}

              {activeTab === 'quiz' && (
                <ToeicQuizTab
                  selectedList={selectedList}
                  selectedCategory={selectedCategory}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              )}

              {activeTab === 'matching' && (
                <ToeicMatchingTab selectedList={selectedList} />
              )}

              {activeTab === 'fill' && (
                <ToeicFillTab
                  selectedList={selectedList}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              )}

              {activeTab === 'dictation' && (
                <ToeicDictationTab
                  selectedList={selectedList}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              )}
            </Suspense>

            {/* Quick stats and help banner */}
            <div className="premium-card p-4 sm:p-5 bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-indigo-50 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900/30 rounded-3xl flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5 fill-primary/20 animate-pulse hidden sm:block" />
              <div className="space-y-1 text-xs">
                <h4 className="font-black text-slate-800 dark:text-slate-100">Phương pháp ôn tập cách quãng</h4>
                <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Luyện tập đầy đủ cả 5 chế độ đối với các từ khó để ghi nhớ vĩnh viễn vào trí nhớ dài hạn. Bạn có thể sử dụng nút &quot;Đã thuộc&quot; để đánh dấu những từ không cần hiển thị lại.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
