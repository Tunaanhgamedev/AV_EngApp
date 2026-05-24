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
  History,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ReviewPage() {
  const { user } = useAuth();
  const [dueWords, setDueWords] = useState<any[]>([]);
  const [dailyStatus, setDailyStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const [dueRes, statusRes] = await Promise.all([
          fetch(`${API_BASE}/vocabulary/due-reviews`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_BASE}/vocabulary/daily-review-status`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        
        if (dueRes.ok) {
          const dueData = await dueRes.json();
          setDueWords(dueData.words || []);
        }
        if (statusRes.ok) {
          const statusData = await statusRes.json();
          setDailyStatus(statusData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-indigo-200 animate-pulse" />
          <Loader2 className="w-10 h-10 text-primary animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Đang kiểm tra tiến độ học...</p>
      </div>
    );
  }

  const dueCount = dueWords?.length || 0;

  // Calculate relative time
  const getRelativeTime = (dateStr: string) => {
    if (!dateStr) return 'Mới thêm';
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    return 'Vừa xong';
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-10 pb-20 px-2 sm:px-4 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Hệ thống ôn tập thông minh</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <BookMarked className="w-8 h-8 text-primary" />
            Ôn Tập Từ Vựng
          </h1>
          <p className="text-slate-500 font-medium">EngBot tự động lên lịch ôn tập cho những từ bạn đã học. Hãy ôn lại mỗi ngày!</p>
        </div>
      </header>

      {/* Hero Review Section */}
      <section className="premium-card p-1 gradient-bg rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
        <div className="bg-white/95 backdrop-blur-xl rounded-[22px] p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <div className="flex-1 space-y-6 text-center sm:text-left">
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest",
              dueCount > 0 ? "bg-orange-100 text-orange-600 animate-pulse" : "bg-green-100 text-green-600"
            )}>
              <Zap className={cn("w-3 h-3 fill-current", dueCount > 0 ? "fill-orange-600" : "fill-green-600")} />
              {dueCount > 0 ? `${dueCount} từ cần ôn tập` : "Đã hoàn thành tất cả!"}
            </div>

            <h2 className="text-4xl font-black leading-tight text-slate-800">
              {dueCount > 0
                ? <>Bạn có <span className="text-primary">{dueCount} từ vựng</span> cần kiểm tra hôm nay.</>
                : <>Tuyệt vời! Trí nhớ của bạn đang <span className="text-primary">rất tốt</span>!</>}
            </h2>

            <p className="text-slate-500 text-lg font-medium">
              {dueCount > 0
                ? "Ôn tập mỗi ngày giúp chuyển từ vựng vào trí nhớ dài hạn. Bắt đầu ngay nhé!"
                : "Bạn đã ôn hết tất cả từ vựng. Hãy thêm từ mới vào Notebook hoặc quay lại vào ngày mai."}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
              {dueCount > 0 ? (
                <Link
                  href="/review/quiz"
                  className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/30 flex items-center gap-3 group"
                >
                  <Sparkles className="w-5 h-5" />
                  Bắt đầu ôn tập
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  {dailyStatus?.totalNotebook > 0 && (
                    <Link
                      href="/review/quiz"
                      className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-3 group"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Luyện tập thêm
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  <Link
                    href="/learn"
                    className={cn(
                      "px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center gap-3",
                      dailyStatus?.totalNotebook > 0
                        ? "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    )}
                  >
                    <BookOpen className="w-5 h-5" />
                    Học từ mới
                    <ChevronRight className="w-6 h-6" />
                  </Link>
                </>
              )}
              <Link
                href="/notebook"
                className="px-6 py-4 bg-white/50 border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-white transition-all flex items-center gap-2"
              >
                <BookMarked className="w-4 h-4" />
                Notebook của tôi
              </Link>
            </div>
          </div>

          <div className="w-full sm:w-1/3 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-[12px] border-slate-50 flex items-center justify-center relative">
                <div className="text-center">
                  <p className="text-5xl font-black text-slate-800">{dueCount === 0 ? '100' : Math.max(0, Math.round(100 - dueCount * 5))}%</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Mức ghi nhớ</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Danh sách từ cần ôn tập
            </h3>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{dueCount} từ</span>
          </div>

          <div className="space-y-4">
            {dueWords && dueWords.length > 0 ? (
              dueWords.slice(0, 10).map((word, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary/20 hover:bg-primary/[0.02] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-indigo-100 rounded-xl flex items-center justify-center font-black text-primary text-sm">
                      {word.word?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 group-hover:text-primary transition-colors">{word.word}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{word.wordType || '—'}</p>
                        {word.cefrLevel && word.cefrLevel !== 'Custom' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">{word.cefrLevel}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {word.meaningVi && (
                      <span className="text-xs text-slate-500 font-medium max-w-[120px] truncate hidden md:inline italic">{word.meaningVi}</span>
                    )}
                    <div className="px-3 py-1.5 bg-white rounded-lg text-[10px] font-bold text-slate-400 border border-slate-100 whitespace-nowrap">
                      {getRelativeTime(word.lastReviewedAt || word.learnedAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-2xl">
                <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="text-slate-600 font-bold">Không có từ nào cần ôn tập!</p>
                  <p className="text-slate-400 text-sm mt-1">Hãy tiếp tục học từ mới nhé!</p>
                </div>
                <Link href="/learn" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
                  Học từ mới
                </Link>
              </div>
            )}
            {dueCount > 10 && (
              <p className="text-center text-xs text-slate-400 font-bold pt-2">
                và {dueCount - 10} từ khác nữa...
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* How SRS Works */}
          <div className="premium-card p-6">
            <h3 className="font-bold mb-5 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              SRS hoạt động thế nào?
            </h3>
            <div className="space-y-3">
              {[
                { step: '1', text: 'Lưu từ mới vào Notebook', color: 'bg-blue-500' },
                { step: '2', text: 'Sau 1 ngày, hệ thống nhắc ôn tập', color: 'bg-amber-500' },
                { step: '3', text: 'Trả lời đúng → ôn sau 3 ngày', color: 'bg-emerald-500' },
                { step: '4', text: 'Trả lời sai → ôn lại ngày mai', color: 'bg-rose-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5", item.color)}>
                    {item.step}
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Card */}
          <div className="premium-card p-6 bg-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <h3 className="font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Mẹo học hiệu quả
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>Ôn tập ngay khi có thông báo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>Đọc to từ vựng để nhớ phát âm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>Tạo câu ví dụ với từ mới</span>
                </li>
              </ul>
            </div>
            <History className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 opacity-20" />
          </div>

          {/* Quick Links */}
          <div className="premium-card p-6 space-y-3">
            <h3 className="font-bold text-sm text-slate-800 mb-4">Truy cập nhanh</h3>
            <Link href="/notebook" className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all group">
              <div className="flex items-center gap-3">
                <BookMarked className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-slate-700">Notebook</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
            <Link href="/dictionary" className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all group">
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-slate-700">Từ điển</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
            <Link href="/learn" className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-all group">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-slate-700">Học từ mới</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
