'use client';

import React from 'react';
import { 
  User, 
  Mail, 
  Trophy, 
  Zap, 
  Flame, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Calendar,
  ChevronRight,
  Edit3,
  Award,
  Star,
  Clock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, dbUser, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full">
          <User className="w-16 h-16 text-slate-300" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Sign in to see your profile</h2>
          <p className="text-slate-500 dark:text-slate-400">Track your learning progress, XP, and streaks.</p>
        </div>
        <Link 
          href="/login"
          className="px-8 py-3 bg-primary text-white rounded-2xl font-bold hover:opacity-90 transition-all flex items-center gap-2"
        >
          <User className="w-5 h-5" />
          Sign in with Google
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Header */}
      <div className="premium-card p-1 gradient-bg rounded-[32px] overflow-hidden">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[30px] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl transition-transform group-hover:scale-105 duration-500">
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl shadow-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-3xl font-black text-slate-800 dark:text-slate-200">{user.displayName || 'Learner'}</h1>
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-primary/20">
                Level {dbUser?.level || 1} Pro
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 dark:text-slate-400 font-medium text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Joined March 2026
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="p-3 glass border rounded-2xl text-slate-400 dark:text-slate-500 hover:text-primary hover:border-primary transition-all">
              <Settings className="w-6 h-6" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-3 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all border border-red-100 dark:border-red-500/20"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total XP', value: dbUser?.xp || 0, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
          { label: 'Day Streak', value: dbUser?.streak || 0, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
          { label: 'League', value: 'Silver', icon: Trophy, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
          { label: 'Ranking', value: '#1,204', icon: Award, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="premium-card p-6 flex flex-col items-center text-center space-y-2 dark:bg-slate-800">
            <div className={cn("p-3 rounded-2xl mb-2", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Learning Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="premium-card p-8 dark:bg-slate-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2 dark:text-slate-100">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Achievements
              </h3>
              <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Early Bird', desc: 'Learned before 7 AM', status: 'Unlocked' },
                { title: 'Word Master', desc: 'Learned 100 words', status: 'In Progress' },
                { title: 'Streak King', desc: '7-day streak', status: 'Locked' },
                { title: 'Chatty Bot', desc: '10 AI conversations', status: 'Unlocked' },
              ].map((ach, i) => (
                <div key={i} className={cn(
                  "p-4 rounded-2xl border transition-all cursor-pointer group",
                  ach.status === 'Unlocked' ? "bg-slate-50 dark:bg-slate-700 border-slate-100 dark:border-slate-600" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-700 opacity-60"
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      ach.status === 'Unlocked' ? "bg-white dark:bg-slate-800 shadow-sm" : "bg-slate-50 dark:bg-slate-800"
                    )}>
                      <Award className={cn("w-5 h-5", ach.status === 'Unlocked' ? "text-primary" : "text-slate-300 dark:text-slate-500")} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{ach.title}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{ach.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card p-8 dark:bg-slate-800">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6 dark:text-slate-100">
              <Clock className="w-5 h-5 text-blue-500" />
              Recent Activity
            </h3>
            <div className="space-y-6">
              {[
                { activity: 'Learned 10 words in "Oxford 3000"', time: '2 hours ago', xp: '+150' },
                { activity: 'Practiced Speaking "Daily Routine"', time: 'Yesterday', xp: '+45' },
                { activity: 'Completed "Listening Lab #4"', time: '2 days ago', xp: '+60' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">{item.activity}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-lg border border-green-100 dark:border-green-500/20">
                    {item.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="space-y-6">
          <div className="premium-card p-6 dark:bg-slate-800">
            <h3 className="font-bold mb-6 flex items-center gap-2 dark:text-slate-100">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Account Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Email Verified</span>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-all text-red-500">
                <span className="text-sm font-bold">Delete Account</span>
              </div>
            </div>
          </div>

          <div className="premium-card p-6 bg-slate-900 text-white">
            <h3 className="font-bold mb-4">EngBot Premium</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Unlock unlimited AI conversations, custom wordlists, and advanced pronunciation analysis.
            </p>
            <button className="w-full py-3 bg-primary text-white rounded-xl font-black text-sm hover:opacity-90 transition-all">
              UPGRADE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
