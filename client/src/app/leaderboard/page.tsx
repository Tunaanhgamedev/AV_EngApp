'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users, ChevronUp, ChevronDown, Timer, Sparkles, Globe, UserCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const MOCK_LEADERBOARD = [
  { id: 1,  name: "Alex Rivera",   xp: 12450, avatar: "A", trend: "up",   level: 42, color: "bg-amber-100 text-amber-600",  streak: 28 },
  { id: 2,  name: "Sarah Chen",    xp: 11200, avatar: "S", trend: "down", level: 38, color: "bg-slate-100 text-slate-600",  streak: 15 },
  { id: 3,  name: "Moi Tuấn",      xp: 9800,  avatar: "M", trend: "up",   level: 35, color: "bg-orange-100 text-orange-600",streak: 12, isMe: true },
  { id: 4,  name: "Elena Gilbert", xp: 8500,  avatar: "E", trend: "same", level: 31, color: "bg-blue-100 text-blue-600",   streak: 9  },
  { id: 5,  name: "David Kim",     xp: 7200,  avatar: "D", trend: "up",   level: 28, color: "bg-purple-100 text-purple-600",streak: 7  },
  { id: 6,  name: "Sophia Miller", xp: 6800,  avatar: "S", trend: "down", level: 25, color: "bg-pink-100 text-pink-600",   streak: 4  },
  { id: 7,  name: "James Wilson",  xp: 5900,  avatar: "J", trend: "up",   level: 22, color: "bg-green-100 text-green-600", streak: 3  },
];

const TABS = ['Global', 'Friends', 'Weekly'];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [tab, setTab]         = useState('Global');
  const [countdown, setCountdown] = useState({ d: 2, h: 14, m: 22, s: 15 });

  // Live countdown timer
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(prev => {
        let { d, h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const myRank = MOCK_LEADERBOARD.find(p => p.isMe);
  const fmt = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500 fill-yellow-500" />Ruby League
          </h1>
          <p className="text-slate-500 font-medium">Top 10 will be promoted to the Diamond League!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-5 py-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 flex items-center gap-3">
            <Timer className="w-5 h-5" />
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-rose-400">Season Ends</p>
              <p className="text-lg font-black tabular-nums">
                {countdown.d}d {fmt(countdown.h)}:{fmt(countdown.m)}:{fmt(countdown.s)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* My Card */}
      {myRank && (
        <section className="premium-card p-6 bg-gradient-to-r from-primary/10 to-indigo-50 border-primary/20 flex items-center gap-6 animate-in slide-in-from-bottom-2 duration-500">
          <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm border-2 border-white", myRank.color)}>
            {user?.photoURL ? <img src={user.photoURL} className="w-full h-full rounded-2xl object-cover" alt="" /> : myRank.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-800">{user?.displayName || myRank.name}</h3>
              <span className="px-2 py-0.5 bg-primary text-white text-[8px] font-black rounded uppercase tracking-widest">You</span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level {myRank.level} · 🔥 {myRank.streak} day streak</p>
          </div>
          <div className="text-center hidden md:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Rank</p>
            <p className="text-4xl font-black text-primary">#{MOCK_LEADERBOARD.findIndex(p => p.isMe) + 1}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total XP</p>
            <p className="text-2xl font-black text-slate-800">{myRank.xp.toLocaleString()}</p>
          </div>
        </section>
      )}

      {/* Podium Top 3 */}
      <section className="grid grid-cols-3 gap-4 md:gap-8 items-end pt-10 pb-6 px-4">
        {/* Rank 2 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-black text-slate-500 border-4 border-white shadow-xl">{MOCK_LEADERBOARD[1].avatar}</div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white text-sm">2</div>
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-800 truncate max-w-[100px]">{MOCK_LEADERBOARD[1].name}</p>
            <p className="text-xs font-black text-primary">{MOCK_LEADERBOARD[1].xp.toLocaleString()} XP</p>
          </div>
          <div className="w-full h-24 md:h-32 bg-slate-100 rounded-t-3xl border-t-2 border-slate-200 shadow-inner" />
        </div>
        {/* Rank 1 */}
        <div className="flex flex-col items-center space-y-4 scale-110 md:scale-125 z-10">
          <div className="relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce"><Crown className="w-10 h-10 text-yellow-500 fill-yellow-500" /></div>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-yellow-100 flex items-center justify-center text-3xl font-black text-yellow-600 border-4 border-yellow-400 shadow-2xl shadow-yellow-200">{MOCK_LEADERBOARD[0].avatar}</div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg">1</div>
          </div>
          <div className="text-center">
            <p className="font-black text-slate-900 truncate max-w-[120px]">{MOCK_LEADERBOARD[0].name}</p>
            <p className="text-sm font-black text-primary">{MOCK_LEADERBOARD[0].xp.toLocaleString()} XP</p>
          </div>
          <div className="w-full h-32 md:h-40 bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-t-3xl border-t-2 border-yellow-200 shadow-inner" />
        </div>
        {/* Rank 3 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-orange-100 flex items-center justify-center text-2xl font-black text-orange-600 border-4 border-white shadow-xl">{MOCK_LEADERBOARD[2].avatar}</div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white text-sm">3</div>
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-800 truncate max-w-[100px]">{MOCK_LEADERBOARD[2].name}</p>
            <p className="text-xs font-black text-primary">{MOCK_LEADERBOARD[2].xp.toLocaleString()} XP</p>
          </div>
          <div className="w-full h-16 md:h-24 bg-orange-50 rounded-t-3xl border-t-2 border-orange-100 shadow-inner" />
        </div>
      </section>

      {/* Full List */}
      <section className="premium-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex gap-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={cn("px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-1",
                  tab === t ? "bg-primary text-white shadow-md" : "text-slate-400 hover:text-slate-700"
                )}>
                {t === 'Global' ? <Globe className="w-3 h-3" /> : t === 'Friends' ? <Users className="w-3 h-3" /> : <Timer className="w-3 h-3" />}
                {t}
              </button>
            ))}
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Updated live</p>
        </div>

        <div className="divide-y divide-slate-50">
          {MOCK_LEADERBOARD.map((player, i) => (
            <div key={player.id} className={cn("p-4 md:p-5 flex items-center gap-4 transition-all hover:bg-slate-50 group", player.isMe ? "bg-primary/5 ring-1 ring-inset ring-primary/10" : "")}>
              <div className="w-8 text-center font-black text-slate-300 group-hover:text-primary transition-colors text-lg">{i + 1}</div>
              <div className="w-8 flex justify-center">
                {player.trend === 'up'   && <ChevronUp   className="w-4 h-4 text-green-500" />}
                {player.trend === 'down' && <ChevronDown className="w-4 h-4 text-rose-500" />}
                {player.trend === 'same' && <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
              </div>
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border border-white overflow-hidden", player.color)}>
                {player.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800 truncate">{player.name}</h4>
                  {player.isMe && <span className="px-2 py-0.5 bg-primary text-white text-[8px] font-black rounded uppercase">You</span>}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lv {player.level}</p>
                  <span className="text-xs text-orange-500 font-bold">🔥 {player.streak}d</span>
                </div>
              </div>
              <div className="hidden md:block w-32">
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-indigo-400 rounded-full" style={{ width: `${(player.xp / MOCK_LEADERBOARD[0].xp) * 100}%` }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-slate-800">{player.xp.toLocaleString()}</p>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">XP</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="p-6 bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><TrendingUp className="w-6 h-6 text-primary" /></div>
              <div><h4 className="font-bold">Climbing Fast!</h4><p className="text-xs text-slate-400">You earned <span className="text-white font-bold">1,200 XP</span> this week. Rank up by tomorrow!</p></div>
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2">
              Share Progress <Sparkles className="w-4 h-4" />
            </button>
          </div>
          <Medal className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 opacity-20" />
        </div>
      </section>
    </div>
  );
}
