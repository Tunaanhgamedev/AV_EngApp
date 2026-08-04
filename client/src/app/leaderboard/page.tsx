'use client';

import React, { useState, useEffect, memo, useMemo } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  Users, 
  ChevronUp, 
  ChevronDown, 
  Timer, 
  Sparkles, 
  Globe,
  Search,
  Flame,
  Zap,
  ShieldAlert,
  Award,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface LeaderboardUser {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  xp: number;
  level: number;
  streak: number;
  color?: string;
  avatar?: string;
  trend?: string;
  isMe?: boolean;
}

const AVATAR_COLORS = [
  "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700",
  "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700",
  "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-700",
  "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700",
  "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-700",
  "bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-300 dark:border-pink-700",
  "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700",
  "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700",
  "bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-300 dark:border-teal-700"
];

// Memoized timer badge to isolate 1s tick re-renders from the main leaderboard table & podium
const CountdownBadge = memo(function CountdownBadge() {
  const [countdown, setCountdown] = useState({ d: 4, h: 18, m: 35, s: 42 });

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

  const fmt = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="px-5 py-3 bg-slate-900 text-white rounded-2xl border border-slate-800 flex items-center gap-3 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
      <Timer className="w-5 h-5 text-rose-500 animate-spin-slow" />
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Giải Đấu Mùa 12 Kết Thúc Sau</p>
        <p className="text-base font-black font-mono text-rose-400 tracking-wider">
          {countdown.d}d {fmt(countdown.h)}:{fmt(countdown.m)}:{fmt(countdown.s)}
        </p>
      </div>
    </div>
  );
});

// Memoized League Tier Banner Component
const LeagueTierBanner = memo(function LeagueTierBanner() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { name: "Diamond League", range: "Top 1 - 3", color: "from-blue-600 to-cyan-500", icon: "💎", badge: "Thăng Hạng Rạng Rỡ" },
        { name: "Emerald League", range: "Top 4 - 10", color: "from-emerald-600 to-teal-500", icon: "❇️", badge: "Trụ Hạng Vững Vàng" },
        { name: "Ruby League", range: "Top 11 - 20", color: "from-rose-600 to-pink-500", icon: "🔴", badge: "Khu Vực An Toàn" },
        { name: "Gold League", range: "Top 21+", color: "from-amber-600 to-yellow-500", icon: "🪙", badge: "Khu Vực Cố Gắng" }
      ].map((tier, idx) => (
        <div key={idx} className="premium-card p-4 bg-slate-900 border border-slate-800 rounded-2xl text-white relative overflow-hidden flex flex-col justify-between space-y-2 group hover:border-slate-700 transition-all">
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color}`} />
          <div className="flex items-center justify-between">
            <span className="text-xl">{tier.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700">
              {tier.range}
            </span>
          </div>
          <div>
            <h4 className="text-xs font-black text-white group-hover:text-primary transition-colors">{tier.name}</h4>
            <p className="text-[10px] text-slate-400 font-medium">{tier.badge}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

// Memoized Podium Top 3 Component
const PodiumWidget = memo(function PodiumWidget({ top1, top2, top3 }: {
  top1: LeaderboardUser | null;
  top2: LeaderboardUser | null;
  top3: LeaderboardUser | null;
}) {
  return (
    <section className="grid grid-cols-3 gap-3 md:gap-8 items-end pt-12 pb-6 px-2 md:px-4">
      
      {/* Rank 2 (Silver Podium) */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {top2 ? (
            <>
              <div className={cn("w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl font-black border-4 border-slate-300 dark:border-slate-700 shadow-xl overflow-hidden relative", top2.color)}>
                {top2.avatarUrl ? <img src={top2.avatarUrl} className="w-full h-full object-cover" alt="" /> : top2.avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black border-2 border-white dark:border-slate-800 text-xs shadow-md">
                2
              </div>
            </>
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold bg-slate-100 dark:bg-slate-800">
              -
            </div>
          )}
        </div>
        <div className="text-center min-h-[44px]">
          {top2 ? (
            <>
              <p className="font-black text-slate-800 dark:text-slate-200 text-xs md:text-sm truncate max-w-[100px] md:max-w-[120px]">{top2.username}</p>
              <p className="text-[11px] font-black text-primary">{top2.xp.toLocaleString()} XP</p>
              {top2.streak > 0 && <p className="text-[10px] font-bold text-amber-500">🔥 {top2.streak} ngày</p>}
            </>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500 italic font-medium">Trống</p>
          )}
        </div>
        <div className="w-full h-24 md:h-32 bg-gradient-to-b from-slate-200 dark:from-slate-800 via-slate-100 dark:via-slate-800/50 to-slate-50 dark:to-slate-900 rounded-t-3xl border-t-4 border-slate-300 dark:border-slate-700 shadow-lg flex flex-col items-center justify-center p-2">
          <Medal className="w-8 h-8 text-slate-400 dark:text-slate-500 opacity-60" />
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Á Quân</span>
        </div>
      </div>
      
      {/* Rank 1 (Gold Champion Podium) */}
      <div className="flex flex-col items-center space-y-4 scale-105 md:scale-115 z-10">
        <div className="relative">
          {top1 ? (
            <>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce">
                <Crown className="w-10 h-10 text-yellow-500 fill-yellow-500 filter drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
              </div>
              <div className={cn("w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-3xl font-black border-4 border-yellow-400 shadow-2xl shadow-yellow-400/40 overflow-hidden relative", top1.color)}>
                {top1.avatarUrl ? <img src={top1.avatarUrl} className="w-full h-full object-cover" alt="" /> : top1.avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-black border-2 border-white dark:border-slate-800 shadow-xl text-sm">
                1
              </div>
            </>
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold bg-slate-100 dark:bg-slate-800">
              -
            </div>
          )}
        </div>
        <div className="text-center min-h-[44px]">
          {top1 ? (
            <>
              <p className="font-black text-slate-900 dark:text-slate-100 text-sm md:text-base truncate max-w-[120px] md:max-w-[140px]">{top1.username}</p>
              <p className="text-xs md:text-sm font-black text-primary">{top1.xp.toLocaleString()} XP</p>
              {top1.streak > 0 && <p className="text-[10px] font-bold text-amber-500">🔥 {top1.streak} ngày</p>}
            </>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500 italic font-medium">Trống</p>
          )}
        </div>
        <div className="w-full h-32 md:h-40 bg-gradient-to-b from-yellow-200 dark:from-yellow-900/30 via-amber-100 dark:via-amber-900/20 to-yellow-50 dark:to-yellow-900/10 rounded-t-3xl border-t-4 border-yellow-400 shadow-2xl flex flex-col items-center justify-center p-2">
          <Trophy className="w-10 h-10 text-yellow-600 filter drop-shadow-sm" />
          <span className="text-[10px] font-black text-yellow-800 uppercase tracking-widest mt-1">Quán Quân</span>
        </div>
      </div>

      {/* Rank 3 (Bronze Podium) */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {top3 ? (
            <>
              <div className={cn("w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl font-black border-4 border-amber-600/40 shadow-xl overflow-hidden relative", top3.color)}>
                {top3.avatarUrl ? <img src={top3.avatarUrl} className="w-full h-full object-cover" alt="" /> : top3.avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black border-2 border-white dark:border-slate-800 text-xs shadow-md">
                3
              </div>
            </>
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold bg-slate-100 dark:bg-slate-800">
              -
            </div>
          )}
        </div>
        <div className="text-center min-h-[44px]">
          {top3 ? (
            <>
              <p className="font-black text-slate-800 dark:text-slate-200 text-xs md:text-sm truncate max-w-[100px] md:max-w-[120px]">{top3.username}</p>
              <p className="text-[11px] font-black text-primary">{top3.xp.toLocaleString()} XP</p>
              {top3.streak > 0 && <p className="text-[10px] font-bold text-amber-500">🔥 {top3.streak} ngày</p>}
            </>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500 italic font-medium">Trống</p>
          )}
        </div>
        <div className="w-full h-16 md:h-24 bg-gradient-to-b from-amber-100 dark:from-amber-900/30 via-orange-100 dark:via-orange-900/20 to-amber-50 dark:to-amber-900/10 rounded-t-3xl border-t-4 border-amber-600/50 shadow-lg flex flex-col items-center justify-center p-2">
          <Medal className="w-7 h-7 text-amber-700 opacity-70" />
          <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest mt-1">Hạng 3</span>
        </div>
      </div>
    </section>
  );
});

// Memoized User Leaderboard Row Component
const UserRankRow = memo(function UserRankRow({ player, rankIndex, maxXP }: {
  player: LeaderboardUser;
  rankIndex: number;
  maxXP: number;
}) {
  const isTop3 = rankIndex < 3;
  const progressPct = Math.min(100, Math.max(8, (player.xp / (maxXP || 1)) * 100));

  return (
    <div 
      id={player.isMe ? "my-rank-row" : undefined}
      className={cn(
        "p-4 md:p-5 flex items-center gap-4 transition-all duration-200 group border-b border-slate-100 dark:border-slate-800",
        player.isMe 
          ? "bg-primary/10 border-l-4 border-l-primary shadow-sm" 
          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
      )}
    >
      {/* Rank Position Badge */}
      <div className="w-9 text-center font-black text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors text-base md:text-lg shrink-0">
        {rankIndex === 0 ? "🥇" : rankIndex === 1 ? "🥈" : rankIndex === 2 ? "🥉" : `#${rankIndex + 1}`}
      </div>

      {/* Rank Movement Trend */}
      <div className="w-6 flex justify-center shrink-0">
        {player.trend === 'up' && <ChevronUp className="w-4 h-4 text-emerald-500 animate-bounce" />}
        {player.trend === 'down' && <ChevronDown className="w-4 h-4 text-rose-500" />}
        {player.trend === 'same' && <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />}
      </div>

      {/* User Avatar */}
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border-2 overflow-hidden shrink-0", player.color)}>
        {player.avatarUrl ? <img src={player.avatarUrl} className="w-full h-full object-cover" alt="" /> : player.avatar}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-black text-slate-800 dark:text-slate-200 text-sm md:text-base truncate">{player.username}</h4>
          {player.isMe && (
            <span className="px-2 py-0.5 bg-primary text-white text-[8px] font-black rounded-md uppercase tracking-wider">
              BẠN
            </span>
          )}
          {player.streak >= 7 && (
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-bold rounded-md border border-amber-500/20 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" /> Hot Streak
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500">Lv {player.level}</span>
          <span className="text-xs font-bold text-slate-300 dark:text-slate-600">·</span>
          <span className="text-xs font-extrabold text-amber-500 flex items-center gap-1">
            🔥 {player.streak} ngày
          </span>
        </div>
      </div>

      {/* Progress XP Bar (Desktop) */}
      <div className="hidden md:block w-36 shrink-0">
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-600">
          <div 
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-indigo-500 rounded-full transition-all duration-700" 
            style={{ width: `${progressPct}%` }} 
          />
        </div>
      </div>

      {/* XP Points Score */}
      <div className="text-right shrink-0">
        <p className="text-base md:text-lg font-black text-slate-900 dark:text-slate-100">{player.xp.toLocaleString()}</p>
        <p className="text-[9px] font-black text-primary uppercase tracking-widest">XP Points</p>
      </div>
    </div>
  );
});

export default function LeaderboardPage() {
  const { user } = useAuth();
  
  const [tab, setTab] = useState<'Global' | 'Weekly' | 'Streak'>('Global');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        let token = '';
        if (user) {
          token = await user.getIdToken();
        }

        const res = await fetch(`${API_BASE}/users/leaderboard`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if (res.ok) {
          const dbUsers: LeaderboardUser[] = await res.json();
          
          const sortedUsers = [...dbUsers].sort((a, b) => b.xp - a.xp);

          const mappedUsers = sortedUsers.map((u, i) => {
            const initials = u.username ? u.username.charAt(0).toUpperCase() : 'U';
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            const isMe = user ? (u.id === user.uid || u.email === user.email) : false;
            
            let trend = 'same';
            if (i === 0 || i % 3 === 0) trend = 'up';
            else if (i % 4 === 0) trend = 'down';

            return {
              ...u,
              color,
              avatar: initials,
              isMe,
              trend
            };
          });

          setLeaderboard(mappedUsers);
        }
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user]);

  // Filtered & Sorted Leaderboard
  const filteredUsers = useMemo(() => {
    let result = [...leaderboard];

    if (tab === 'Streak') {
      result.sort((a, b) => b.streak - a.streak);
    } else if (tab === 'Weekly') {
      result.sort((a, b) => b.xp - a.xp);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(u => u.username.toLowerCase().includes(q));
    }

    return result;
  }, [leaderboard, tab, searchQuery]);

  const myRankIndex = leaderboard.findIndex(p => p.isMe);
  const myRank = leaderboard[myRankIndex] || null;

  const scrollToMyRank = () => {
    const el = document.getElementById("my-rank-row");
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 dark:text-slate-400 font-bold">Đang tải bảng vinh danh trực tiếp từ hệ thống...</p>
      </div>
    );
  }

  const top1 = leaderboard[0] || null;
  const top2 = leaderboard[1] || null;
  const top3 = leaderboard[2] || null;
  const maxXP = top1?.xp || 1;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 animate-in fade-in duration-500 pb-20">
      
      {/* Header Banner */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-600 text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" /> Diamond Hall of Fame
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500 fill-yellow-500 animate-pulse" /> Bảng Vinh Danh Học Viên
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-semibold">
            Bảng xếp hạng thời gian thực ghi nhận nỗ lực học từ vựng, luyện nghe và làm bài test hàng ngày!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <CountdownBadge />
        </div>
      </header>

      {/* League Division Tier Banner */}
      <LeagueTierBanner />

      {/* My Rank Summary Card */}
      {myRank && (
        <section className="premium-card p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl border-2 overflow-hidden shrink-0", myRank.color)}>
              {myRank.avatarUrl ? <img src={myRank.avatarUrl} className="w-full h-full object-cover" alt="" /> : myRank.avatar}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-white">{myRank.username}</h3>
                <span className="px-2 py-0.5 bg-primary text-white text-[8px] font-black rounded uppercase tracking-widest">
                  BẠN
                </span>
              </div>
              <p className="text-xs text-slate-300 font-bold">
                Cấp độ {myRank.level} · 🔥 {myRank.streak} ngày liên tục
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vị Trí Hiện Tại</p>
              <p className="text-3xl font-black text-yellow-400">#{myRankIndex + 1}</p>
            </div>

            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng XP</p>
              <p className="text-2xl font-black text-white">{myRank.xp.toLocaleString()}</p>
            </div>

            <button
              onClick={scrollToMyRank}
              className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-primary/30 cursor-pointer"
            >
              Xem Vị Trí <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* Top 3 Podium Winners Arena */}
      <PodiumWidget top1={top1} top2={top2} top3={top3} />

      {/* Full Leaderboard List Table */}
      <section className="premium-card overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl">
        
        {/* Filter Tabs & Search Bar Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex bg-slate-200/70 dark:bg-slate-700/70 p-1 rounded-2xl gap-1">
            {[
              { id: 'Global', label: 'Toàn Cầu', icon: Globe },
              { id: 'Weekly', label: 'Tuần Phong Độ', icon: Timer },
              { id: 'Streak', label: 'Chuỗi Ngày 🔥', icon: Flame }
            ].map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as any)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer select-none",
                    tab === t.id
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-md"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm tên học viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Leaderboard Table List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500 font-medium">
              Không tìm thấy học viên nào phù hợp.
            </div>
          ) : (
            filteredUsers.map((player, idx) => (
              <UserRankRow
                key={player.id}
                player={player}
                rankIndex={leaderboard.findIndex(u => u.id === player.id)}
                maxXP={maxXP}
              />
            ))
          )}
        </div>

        {/* Leaderboard Footer Motivation Banner */}
        <div className="p-6 bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white">Đua Top Tăng Tốc Nhận Phần Thưởng!</h4>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  Luyện tập từ vựng, viết nhật ký AI hoặc chiến Boss Game ngay hôm nay để tích lũy thêm điểm XP!
                </p>
              </div>
            </div>

            <button
              onClick={() => alert("🎉 Tính năng chia sẻ thành tích đã sẵn sàng! Hãy chụp màn hình để khoe bảng vàng nhé!")}
              className="px-6 py-3 bg-primary text-white rounded-xl font-black text-xs hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/30 shrink-0"
            >
              Chia Sẻ Bảng Vàng <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}
