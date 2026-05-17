'use client';

import React from 'react';
import { 
  Flame, 
  Target, 
  Award, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  BookOpen,
  Mic2,
  MessageSquare,
  PenTool,
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Dashboard() {
  const { user, dbUser, signInWithGoogle, loading } = useAuth();

  const [stats, setStats] = React.useState({ wordsLearned: 0, oxfordLearned: 0, totalOxford: 3000 });
  const [reviewDue, setReviewDue] = React.useState(0);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  React.useEffect(() => {
    if (user) {
      user.getIdToken().then(token => {
        // Fetch Stats
        fetch(`${API_BASE}/vocabulary/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(console.error);

        // Fetch Review Count
        fetch(`${API_BASE}/vocabulary/notebook`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
          if (data.words) {
            const due = data.words.filter((w: any) => 
              w.nextReviewAt && new Date(w.nextReviewAt) <= new Date()
            ).length;
            setReviewDue(due);
          }
        })
        .catch(console.error);
      });
    }
  }, [user, API_BASE]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-12 py-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered English Learning
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Master English with <span className="gradient-text">EngBot</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium">
            Personalized coaching, real-time feedback, and interactive roleplay. 
            Join thousands of learners worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <button 
              onClick={signInWithGoogle}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2 group"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 glass border rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Watch Demo
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          <div className="premium-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Smart AI Chat</h3>
            <p className="text-slate-500">Natural conversations with EngBot to improve your speaking fluency.</p>
          </div>
          <div className="premium-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Smart SRS</h3>
            <p className="text-slate-500">Scientific vocabulary learning system that remembers what you forget.</p>
          </div>
          <div className="premium-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Real-time Coaching</h3>
            <p className="text-slate-500">Instant grammar and pronunciation feedback while you write or speak.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Review Reminder Notification */}
      {reviewDue > 0 && (
        <div className="premium-card p-4 bg-rose-50 border-rose-100 flex items-center justify-between gap-4 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-black text-rose-900">Đã đến lúc ôn tập từ vựng!</p>
              <p className="text-xs text-rose-600 font-medium">Bạn có {reviewDue} từ cần được nhắc lại hôm nay.</p>
            </div>
          </div>
          <Link href="/review/quiz" className="px-6 py-2 bg-rose-500 text-white rounded-xl font-bold text-xs hover:bg-rose-600 transition-all shadow-md">
            ÔN TẬP NGAY
          </Link>
        </div>
      )}

      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hi, {user.displayName?.split(' ')[0] || 'Learner'}! 👋</h1>
          <p className="text-slate-500">
            {dbUser?.streak ? `You're on a ${dbUser.streak}-day streak. Keep it up!` : 'Start your first learning session today!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 premium-card">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="font-bold">{dbUser?.streak || 0} Days</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 premium-card">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">Level {dbUser?.level || 1}</span>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Words Learned', value: (stats?.wordsLearned ?? 0).toString(), sub: 'Total saved words', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Oxford 3000™', value: `${(((stats?.oxfordLearned || 0) / 3000) * 100).toFixed(1)}%`, sub: `${stats?.oxfordLearned || 0} / 3000 learned`, icon: Target, color: 'text-rose-500', bg: 'bg-rose-50' },
          { label: 'XP Points', value: dbUser?.xp?.toLocaleString() || '0', sub: 'Ranking...', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Learning Time', value: '1.5h', sub: 'This week', icon: Clock, color: 'text-green-500', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className="premium-card p-6 flex items-start justify-between group cursor-pointer hover:premium-card-hover">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stat.sub}</p>
            </div>
            <div className={cn("p-3 rounded-xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Goal & Main Actions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="premium-card p-8 gradient-bg text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">EngBot Intelligence</h2>
              <p className="text-white/80 mb-6">Your personal AI mentor is ready to help you improve today.</p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/chat" className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-black/10">
                  Talk to EngBot
                </Link>
                <Link href="/learn" className="px-6 py-3 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-colors">
                  Learn Vocabulary
                </Link>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute right-12 top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/chat" className="premium-card p-6 hover:premium-card-hover cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-lg">AI Chat Practice</h3>
              <p className="text-sm text-slate-500 mt-1">Start a conversation with EngBot and get instant feedback.</p>
            </Link>
            <Link href="/journal" className="premium-card p-6 hover:premium-card-hover cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-rose-50 rounded-xl">
                  <PenTool className="w-6 h-6 text-rose-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-lg">Writing Journal</h3>
              <p className="text-sm text-slate-500 mt-1">Write your daily journal and let EngBot check your grammar.</p>
            </Link>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="premium-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Oxford 3000™</h3>
              <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">
                {stats?.oxfordLearned || 0} / 3000
              </span>
            </div>
            
            {/* SVG Progress Ring */}
            <div className="flex justify-center mb-6">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle 
                    cx="60" cy="60" r="52" fill="none" 
                    stroke="url(#progressGrad)" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${((stats?.oxfordLearned || 0) / 3000) * 326.7} 326.7`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-800">
                    {(((stats?.oxfordLearned || 0) / 3000) * 100).toFixed(0)}%
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complete</span>
                </div>
              </div>
            </div>

            {/* Level Breakdown Mini Bars */}
            <div className="space-y-2.5">
              {[
                { level: 'A1', color: 'bg-green-400', desc: 'Beginner' },
                { level: 'A2', color: 'bg-emerald-400', desc: 'Elementary' },
                { level: 'B1', color: 'bg-blue-400', desc: 'Intermediate' },
                { level: 'B2', color: 'bg-purple-400', desc: 'Upper-Int' },
              ].map(l => (
                <div key={l.level} className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-400 w-6">{l.level}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${l.color} rounded-full transition-all duration-700`} style={{ width: '30%' }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 w-16 text-right">{l.desc}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Link href="/learn" className="flex-1 text-center py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all">
                Learn Now
              </Link>
              <Link href="/dictionary/wordlist" className="flex-1 text-center py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                Browse
              </Link>
            </div>
          </div>

          <div className="premium-card p-6 bg-slate-900 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-bold mb-2">Join Leaderboard</h3>
              <p className="text-slate-400 text-sm mb-4">Compete with other learners and win weekly rewards.</p>
              <Link href="/leaderboard" className="w-full block text-center py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                View Rankings
              </Link>
            </div>
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
