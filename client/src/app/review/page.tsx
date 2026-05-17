'use client';

import React, { useState, useEffect } from 'react';
import {
  BookMarked,
  Zap,
  TrendingUp,
  Brain,
  Clock,
  ShieldCheck,
  ChevronRight,
  Loader2,
  Calendar,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ReviewPage() {
  const { user } = useAuth();
  const [dueWords, setDueWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDueReviews = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const res = await fetch('http://localhost:5000/api/vocabulary/due-reviews', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setDueWords(data.words || []);
      } catch (err) {
        console.error(err);
        setDueWords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDueReviews();
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Checking Your Memory...</p>
      </div>
    );
  }

  const dueCount = dueWords?.length || 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookMarked className="w-8 h-8 text-primary" />
            Spaced Repetition System
          </h1>
          <p className="text-slate-500">EngBot automatically schedules reviews for words you learned yesterday.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 glass border rounded-xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-slate-700">SRS Algorithm Active</span>
          </div>
        </div>
      </header>

      {/* Hero Review Section */}
      <section className="premium-card p-1 gradient-bg rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
        <div className="bg-white/95 backdrop-blur-xl rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest",
              dueCount > 0 ? "bg-orange-100 text-orange-600 animate-pulse" : "bg-green-100 text-green-600"
            )}>
              <Zap className={cn("w-3 h-3 fill-current", dueCount > 0 ? "fill-orange-600" : "fill-green-600")} />
              {dueCount > 0 ? "Review session ready" : "All caught up for today"}
            </div>

            <h2 className="text-4xl font-black leading-tight text-slate-800">
              {dueCount > 0
                ? <>You have <span className="text-primary">{dueCount} words</span> due for testing.</>
                : "Your memory is at peak performance!"}
            </h2>

            <p className="text-slate-500 text-lg font-medium">
              {dueCount > 0
                ? "Daily testing helps move words into your long-term memory. Let's practice those words from yesterday!"
                : "Great job! You've reviewed all your words. Come back tomorrow for new challenges."}
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {dueCount > 0 ? (
                <Link
                  href="/learn"
                  className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/30 flex items-center gap-3 group"
                >
                  Bắt đầu ôn tập ngay
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  href="/learn"
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-3"
                >
                  Learn New Words
                  <ChevronRight className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-[12px] border-slate-50 flex items-center justify-center relative">
                <div className="text-center">
                  <p className="text-5xl font-black text-slate-800">{dueCount === 0 ? '100' : '82'}%</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Memory Power</p>
                </div>
                <svg className="absolute -inset-3 w-54 h-54 rotate-[-90deg]" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-primary"
                    strokeDasharray="282.7"
                    strokeDashoffset={dueCount === 0 ? "0" : "50.8"}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 premium-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Due Word List
            </h3>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{dueCount} Words total</span>
          </div>

          <div className="space-y-4">
            {dueWords && dueWords.length > 0 ? (
              dueWords.map((word, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-primary shadow-sm">
                      {word.word.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 group-hover:text-primary transition-colors">{word.word}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{word.wordType} • {word.cefrLevel}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-white rounded-lg text-[10px] font-bold text-slate-500 border border-slate-200">
                    LEARNED 1D AGO
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-3xl">
                <Brain className="w-12 h-12 text-slate-200 mx-auto" />
                <p className="text-slate-400 font-medium">No words due for review. You're doing great!</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="premium-card p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Review Schedule
            </h3>
            <div className="space-y-4">
              {[
                { day: 'Tomorrow', count: dueCount > 0 ? 0 : 12 },
                { day: 'Wednesday', count: 18 },
                { day: 'Thursday', count: 5 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">{item.day}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40" style={{ width: `${(item.count / 30) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-slate-800 w-6">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card p-6 bg-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold mb-2">SRS Insight</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your recall rate for new words is <span className="text-primary font-bold">88%</span>. Keep reviewing within 24 hours to reach 100% mastery.
              </p>
            </div>
            <History className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
