'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users, ChevronUp, ChevronDown, Timer, Sparkles, Globe } from 'lucide-react';
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

const TABS = ['Global', 'Weekly', 'Classmates'];

const AVATAR_COLORS = [
  "bg-amber-100 text-amber-600",
  "bg-slate-100 text-slate-600",
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-pink-100 text-pink-600",
  "bg-green-100 text-green-600",
  "bg-indigo-100 text-indigo-600",
  "bg-teal-100 text-teal-600"
];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState('Global');
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [countdown, setCountdown] = useState({ d: 4, h: 18, m: 35, s: 42 });

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
          
          // Sort by XP descending
          const sortedUsers = [...dbUsers].sort((a, b) => b.xp - a.xp);

          // Map display fields (colors, initials, trend, isMe flags)
          const mappedUsers = sortedUsers.map((u, i) => {
            const initials = u.username ? u.username.charAt(0).toUpperCase() : 'U';
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            const isMe = user ? (u.id === user.uid || u.email === user.email) : false;
            
            // Random trend simulation for visual premium feedback
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

  const myRank = leaderboard.find(p => p.isMe);
  const myIndex = leaderboard.findIndex(p => p.isMe);
  const fmt = (n: number) => String(n).padStart(2, '0');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold">Tải bảng xếp hạng trực tiếp...</p>
      </div>
    );
  }

  // Define top 3 podium slots from actual database users
  const top1 = leaderboard[0] || null;
  const top2 = leaderboard[1] || null;
  const top3 = leaderboard[2] || null;

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500 fill-yellow-500 animate-pulse" />Bảng Xếp Hạng Ruby
          </h1>
          <p className="text-slate-500 font-medium">Bảng vinh danh trực tiếp từ cơ sở dữ liệu học viên!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-5 py-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 flex items-center gap-3">
            <Timer className="w-5 h-5 text-rose-500 animate-spin-slow" />
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-rose-400">Giải đấu kết thúc sau</p>
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
            {myRank.avatarUrl ? <img src={myRank.avatarUrl} className="w-full h-full rounded-2xl object-cover" alt="" /> : myRank.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-800">{myRank.username}</h3>
              <span className="px-2 py-0.5 bg-primary text-white text-[8px] font-black rounded uppercase tracking-widest">BẠN</span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cấp độ {myRank.level} · 🔥 {myRank.streak} ngày liên tục</p>
          </div>
          <div className="text-center hidden md:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hạng của bạn</p>
            <p className="text-4xl font-black text-primary">#{myIndex + 1}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng Điểm XP</p>
            <p className="text-2xl font-black text-slate-800">{myRank.xp.toLocaleString()}</p>
          </div>
        </section>
      )}

      {/* Podium Top 3 */}
      <section className="grid grid-cols-3 gap-4 md:gap-8 items-end pt-10 pb-6 px-4">
        {/* Rank 2 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {top2 ? (
              <>
                <div className={cn("w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl font-black border-4 border-white shadow-xl overflow-hidden", top2.color)}>
                  {top2.avatarUrl ? <img src={top2.avatarUrl} className="w-full h-full object-cover" alt="" /> : top2.avatar}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white text-sm shadow-md">2</div>
              </>
            ) : (
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-bold bg-slate-50">
                -
              </div>
            )}
          </div>
          <div className="text-center min-h-[40px]">
            {top2 ? (
              <>
                <p className="font-bold text-slate-800 truncate max-w-[100px]">{top2.username}</p>
                <p className="text-xs font-black text-primary">{top2.xp.toLocaleString()} XP</p>
              </>
            ) : (
              <p className="text-xs text-slate-400 italic font-medium">Trống</p>
            )}
          </div>
          <div className="w-full h-24 md:h-32 bg-slate-100/50 rounded-t-3xl border-t-2 border-slate-200/50 shadow-inner" />
        </div>
        
        {/* Rank 1 */}
        <div className="flex flex-col items-center space-y-4 scale-110 md:scale-125 z-10">
          <div className="relative">
            {top1 ? (
              <>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce"><Crown className="w-10 h-10 text-yellow-500 fill-yellow-500" /></div>
                <div className={cn("w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-3xl font-black border-4 border-yellow-400 shadow-2xl shadow-yellow-200 overflow-hidden", top1.color)}>
                  {top1.avatarUrl ? <img src={top1.avatarUrl} className="w-full h-full object-cover" alt="" /> : top1.avatar}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg">1</div>
              </>
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-bold bg-slate-50">
                -
              </div>
            )}
          </div>
          <div className="text-center min-h-[40px]">
            {top1 ? (
              <>
                <p className="font-black text-slate-900 truncate max-w-[120px]">{top1.username}</p>
                <p className="text-sm font-black text-primary">{top1.xp.toLocaleString()} XP</p>
              </>
            ) : (
              <p className="text-xs text-slate-400 italic font-medium">Trống</p>
            )}
          </div>
          <div className="w-full h-32 md:h-40 bg-gradient-to-b from-yellow-100/50 to-yellow-50/20 rounded-t-3xl border-t-2 border-yellow-200/50 shadow-inner" />
        </div>

        {/* Rank 3 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {top3 ? (
              <>
                <div className={cn("w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl font-black border-4 border-white shadow-xl overflow-hidden", top3.color)}>
                  {top3.avatarUrl ? <img src={top3.avatarUrl} className="w-full h-full object-cover" alt="" /> : top3.avatar}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white text-sm shadow-md">3</div>
              </>
            ) : (
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-bold bg-slate-50">
                -
              </div>
            )}
          </div>
          <div className="text-center min-h-[40px]">
            {top3 ? (
              <>
                <p className="font-bold text-slate-800 truncate max-w-[100px]">{top3.username}</p>
                <p className="text-xs font-black text-primary">{top3.xp.toLocaleString()} XP</p>
              </>
            ) : (
              <p className="text-xs text-slate-400 italic font-medium">Trống</p>
            )}
          </div>
          <div className="w-full h-16 md:h-24 bg-orange-50/50 rounded-t-3xl border-t-2 border-orange-100/50 shadow-inner" />
        </div>
      </section>

      {/* Full List */}
      <section className="premium-card overflow-hidden bg-white">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex gap-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={cn("px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-1",
                  tab === t ? "bg-primary text-white shadow-md" : "text-slate-400 hover:text-slate-700"
                )}>
                {t === 'Global' ? <Globe className="w-3 h-3" /> : t === 'Weekly' ? <Timer className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                {t}
              </button>
            ))}
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đang cập nhật trực tiếp</p>
        </div>

        <div className="divide-y divide-slate-50">
          {leaderboard.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-medium">Chưa có người dùng nào trên bảng xếp hạng.</div>
          ) : (
            leaderboard.map((player, i) => (
              <div key={player.id} className={cn("p-4 md:p-5 flex items-center gap-4 transition-all hover:bg-slate-50 group", player.isMe ? "bg-primary/5 ring-1 ring-inset ring-primary/10" : "")}>
                <div className="w-8 text-center font-black text-slate-300 group-hover:text-primary transition-colors text-lg">{i + 1}</div>
                <div className="w-8 flex justify-center">
                  {player.trend === 'up' && <ChevronUp className="w-4 h-4 text-green-500 animate-bounce" />}
                  {player.trend === 'down' && <ChevronDown className="w-4 h-4 text-rose-500" />}
                  {player.trend === 'same' && <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                </div>
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border border-white overflow-hidden flex-shrink-0", player.color)}>
                  {player.avatarUrl ? <img src={player.avatarUrl} className="w-full h-full object-cover" alt="" /> : player.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800 truncate">{player.username}</h4>
                    {player.isMe && <span className="px-2 py-0.5 bg-primary text-white text-[8px] font-black rounded uppercase tracking-wider">BẠN</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lv {player.level}</p>
                    <span className="text-xs text-orange-500 font-bold">🔥 {player.streak} ngày</span>
                  </div>
                </div>
                <div className="hidden md:block w-32">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-indigo-400 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (player.xp / (leaderboard[0]?.xp || 1)) * 100)}%` }} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-800">{player.xp.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">XP</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-6 bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><TrendingUp className="w-6 h-6 text-primary" /></div>
              <div>
                <h4 className="font-bold">Đua Top Tăng Tốc!</h4>
                <p className="text-xs text-slate-400">
                  Luyện tập từ vựng, viết nhật ký AI, hoặc chơi game ngay hôm nay để nhận thêm điểm XP và bảo vệ chuỗi ngày học tập của bạn!
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2">
              Chia sẻ thành tích <Sparkles className="w-4 h-4" />
            </button>
          </div>
          <Medal className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 opacity-20" />
        </div>
      </section>
    </div>
  );
}
