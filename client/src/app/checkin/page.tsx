'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, Flame, Award, ChevronLeft, ArrowLeft, Trophy, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CheckinPage() {
  const { user, dbUser } = useAuth();
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkinHistory, setCheckinHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [vietnamTime, setVietnamTime] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'year'>('month');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Real-time clock for ICT
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const ictTime = new Date(utc + (3600000 * 7));
      setVietnamTime(ictTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchCheckinData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const token = await user.getIdToken();
      
      // Fetch Status
      const statusRes = await fetch(`${API_BASE}/users/checkin-status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setCheckedIn(statusData.checkedIn);
      }

      // Fetch History
      const historyRes = await fetch(`${API_BASE}/users/checkin-history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (historyRes.ok) {
        const historyData = await historyRes.json();
        // Array of ISO date strings
        setCheckinHistory(historyData);
      }
    } catch (err) {
      console.error('Failed to load checkin data:', err);
    } finally {
      setLoading(false);
    }
  }, [user, API_BASE]);

  useEffect(() => {
    if (user) {
      fetchCheckinData();
    }
  }, [user, fetchCheckinData]);

  const handleCheckin = async () => {
    if (!user || checkingIn || checkedIn) return;
    try {
      setCheckingIn(true);
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/users/checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setCheckedIn(true);
        // Reload checkin statistics
        await fetchCheckinData();
        // Optionally refresh page or trigger notification
      }
    } catch (err) {
      console.error('Checkin Error:', err);
    } finally {
      setCheckingIn(false);
    }
  };

  const getDayLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  // Check if a date has check-in activity (ignoring time, using YYYY-MM-DD string)
  const isDateCheckedIn = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    return checkinHistory.includes(dateStr);
  };

  // ─── Stats Generators ──────────────────────────────────────────────────────────

  // Week Statistics
  const getWeekDays = () => {
    if (!vietnamTime) return [];
    const list = [];
    const current = new Date(vietnamTime);
    // Find Monday of current week
    const dayOfWeek = current.getDay();
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(current.setDate(current.getDate() + distanceToMonday));

    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      list.push(day);
    }
    return list;
  };

  // Month Statistics
  const getMonthWeeks = () => {
    if (!vietnamTime) return [];
    const year = vietnamTime.getFullYear();
    const month = vietnamTime.getMonth();
    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Map days into 2D week grid
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = Array(7).fill(null);

    // Monday start mapping
    let startOffset = firstDay.getDay();
    startOffset = startOffset === 0 ? 6 : startOffset - 1;

    for (let i = 0; i < startOffset; i++) {
      currentWeek[i] = null;
    }

    for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
      const date = new Date(year, month, dayNum);
      let dayIndex = date.getDay();
      dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

      currentWeek[dayIndex] = date;

      if (dayIndex === 6 || dayNum === totalDays) {
        weeks.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }
    }

    return weeks;
  };

  // Year Heatmap (GitHub Heatmap Style - Last 52 Weeks)
  const getYearContributionData = () => {
    if (!vietnamTime) return [];
    const data = [];
    const today = new Date(vietnamTime);
    // We want to generate grid of weeks (7 days each) for the last 365 days
    // Starting 365 days ago, ending today
    const totalCells = 364; // 52 weeks * 7 days
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - totalCells);

    // Find the Monday of the start week to keep contribution rows synchronized
    const startDay = startDate.getDay();
    const distanceToMonday = startDay === 0 ? -6 : 1 - startDay;
    startDate.setDate(startDate.getDate() + distanceToMonday);

    // 53 columns (weeks), each containing 7 days (Monday - Sunday)
    for (let col = 0; col < 53; col++) {
      const week = [];
      for (let row = 0; row < 7; row++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (col * 7) + row);
        week.push({
          date,
          checkedIn: isDateCheckedIn(date),
          isFuture: date.getTime() > today.getTime()
        });
      }
      data.push(week);
    }
    return data;
  };

  const formatClock = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatFullDateVietnamese = (date: Date) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dayName}, ngày ${day} tháng ${month} năm ${year}`;
  };

  if (loading || !vietnamTime) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Đang tải lịch sử điểm danh...</p>
      </div>
    );
  }

  // Count checkins in current week, month and year
  const weekDays = getWeekDays();
  const checkedInThisWeek = weekDays.filter(d => isDateCheckedIn(d)).length;

  const currentMonthStr = String(vietnamTime.getMonth() + 1).padStart(2, '0');
  const currentYearStr = String(vietnamTime.getFullYear());

  const checkedInThisMonth = checkinHistory.filter(dateStr => {
    const parts = dateStr.split('-');
    return parts[1] === currentMonthStr && parts[0] === currentYearStr;
  }).length;

  const checkedInThisYear = checkinHistory.filter(dateStr => {
    const parts = dateStr.split('-');
    return parts[0] === currentYearStr;
  }).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 animate-in fade-in duration-700">
      
      {/* Navigation Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay lại Dashboard
          </Link>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Flame className="w-8 h-8 text-orange-500 fill-orange-500 animate-pulse" /> Điểm Danh Hằng Ngày
          </h1>
          <p className="text-slate-500 font-medium">Bảo vệ chuỗi hoạt động học tập, tích lũy XP và nâng hạng cùng học viên khác!</p>
        </div>

        {/* Vietnam Time Widget */}
        <div className="premium-card px-6 py-4 bg-slate-900 text-white flex items-center gap-4 relative overflow-hidden shadow-xl shadow-slate-900/20">
          <div className="p-3 bg-white/10 rounded-2xl">
            <Clock className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] font-black tracking-widest text-primary/80 uppercase">Múi Giờ Việt Nam (ICT)</p>
            <p className="text-2xl font-black tabular-nums">{formatClock(vietnamTime)}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">{formatFullDateVietnamese(vietnamTime)}</p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        </div>
      </header>

      {/* Main Check-in Action Ribbon */}
      <div className={cn(
        "premium-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border transition-all duration-300",
        checkedIn 
          ? "bg-emerald-50/50 border-emerald-100/80" 
          : "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-transparent shadow-lg shadow-orange-500/20"
      )}>
        <div className="flex items-center gap-5 relative z-10">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center shadow-lg",
            checkedIn ? "bg-emerald-500 text-white" : "bg-white/20 text-white"
          )}>
            {checkedIn ? (
              <CheckCircle className="w-8 h-8" />
            ) : (
              <Flame className="w-8 h-8 animate-pulse text-yellow-300" />
            )}
          </div>
          <div className="space-y-1">
            <h2 className={cn("text-xl font-black", checkedIn ? "text-emerald-900" : "text-white")}>
              {checkedIn ? 'Hôm Nay Đã Điểm Danh! ✅' : 'Điểm Danh Ngày Hôm Nay'}
            </h2>
            <p className={cn("text-sm", checkedIn ? "text-emerald-700 font-medium" : "text-white/80")}>
              {checkedIn 
                ? 'Bạn đã điểm danh thành công ngày hôm nay.'
                : 'Điểm danh ngay để nhận ngay +50 XP và phát triển ngọn lửa học tập của bạn!'}
            </p>
          </div>
        </div>

        <button 
          onClick={handleCheckin}
          disabled={checkedIn || checkingIn}
          className={cn(
            "px-10 py-4 rounded-2xl font-black text-sm transition-all shadow-md relative z-10 cursor-pointer disabled:cursor-not-allowed",
            checkedIn 
              ? "bg-emerald-100 text-emerald-700 opacity-60" 
              : "bg-white text-orange-600 hover:bg-orange-50 active:scale-95"
          )}
        >
          {checkingIn ? 'ĐANG XỬ LÝ...' : checkedIn ? 'ĐÃ ĐIỂM DANH' : 'ĐIỂM DANH NGAY'}
        </button>

        {!checkedIn && <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />}
      </div>

      {/* Stats Summary Boxes */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Điểm danh tuần này', value: `${checkedInThisWeek} / 7`, sub: 'Ngày đã học', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Điểm danh tháng này', value: `${checkedInThisMonth} Ngày`, sub: `Tháng ${vietnamTime.getMonth() + 1}`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Tổng trong năm', value: `${checkedInThisYear} Ngày`, sub: `Năm ${vietnamTime.getFullYear()}`, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((box, i) => (
          <div key={i} className="premium-card p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{box.label}</p>
              <h3 className="text-3xl font-black mt-2 text-slate-800">{box.value}</h3>
              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">{box.sub}</p>
            </div>
            <div className={cn("p-4 rounded-2xl", box.bg)}>
              <Award className={cn("w-6 h-6", box.color)} />
            </div>
          </div>
        ))}
      </section>

      {/* Contribution Calendars Layout */}
      <div className="premium-card bg-white overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-1.5">
            {[
              { id: 'week', label: 'Thống kê Tuần' },
              { id: 'month', label: 'Lịch Tháng' },
              { id: 'year', label: 'Bản Đồ Đóng Góp (Heatmap)' }
            ].map(t => (
              <button 
                key={t.id} 
                onClick={() => setViewMode(t.id as any)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  viewMode === t.id ? "bg-primary text-white shadow-md" : "text-slate-400 hover:text-slate-700"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 animate-bounce" /> Chuỗi: {dbUser?.streak || 0} ngày
          </span>
        </div>

        {/* View Mode: WEEK */}
        {viewMode === 'week' && (
          <div className="p-8">
            <div className="grid grid-cols-7 gap-4 max-w-3xl mx-auto">
              {weekDays.map((date, idx) => {
                const checked = isDateCheckedIn(date);
                const isToday = date.getDate() === vietnamTime.getDate() && date.getMonth() === vietnamTime.getMonth();
                const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
                return (
                  <div key={idx} className="flex flex-col items-center space-y-3">
                    <span className="text-xs font-bold text-slate-400">{dayNames[date.getDay()]}</span>
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2",
                      checked 
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                        : isToday 
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-100 bg-white"
                    )}>
                      {checked ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="text-xs font-black text-slate-400">{date.getDate()}</span>
                      )}
                    </div>
                    {isToday && <span className="text-[9px] font-black bg-primary/10 text-primary px-1.5 py-0.5 rounded">HÔM NAY</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View Mode: MONTH */}
        {viewMode === 'month' && (
          <div className="p-8 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-black text-slate-800 text-lg uppercase tracking-wide">
                Tháng {vietnamTime.getMonth() + 1} / {vietnamTime.getFullYear()}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Màu xanh hiển thị ngày học tập đã điểm danh
              </p>
            </div>

            <div className="border border-slate-100 rounded-3xl p-6 bg-slate-50/30">
              <div className="grid grid-cols-7 gap-3 text-center mb-4">
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(h => (
                  <span key={h} className="text-xs font-black text-slate-400 uppercase tracking-widest">{h}</span>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-3">
                {getMonthWeeks().map((week, wIdx) => (
                  <React.Fragment key={wIdx}>
                    {week.map((date, dIdx) => {
                      if (!date) {
                        return <div key={`empty-${wIdx}-${dIdx}`} />;
                      }
                      const checked = isDateCheckedIn(date);
                      const isToday = date.getDate() === vietnamTime.getDate() && date.getMonth() === vietnamTime.getMonth();

                      return (
                        <div 
                          key={date.toISOString()}
                          className={cn(
                            "aspect-square rounded-2xl flex flex-col items-center justify-center transition-all relative border border-slate-50",
                            checked 
                              ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/10 scale-105" 
                              : isToday
                                ? "border-primary bg-primary/5 text-primary border-2 scale-105"
                                : "bg-white text-slate-600 hover:bg-slate-50"
                          )}
                        >
                          <span className="text-sm font-black">{date.getDate()}</span>
                          {checked && <div className="w-1.5 h-1.5 rounded-full bg-white absolute bottom-1.5" />}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View Mode: YEAR */}
        {viewMode === 'year' && (
          <div className="p-8 overflow-x-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-black text-slate-800 text-lg uppercase tracking-wide">Bản đồ đóng góp 1 năm</h3>
                <p className="text-xs text-slate-400 font-medium">Bảng ô màu xanh thể hiện sự chăm chỉ tích lũy XP trong 365 ngày qua (mô phỏng tương tự GitHub commit graph)</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Ít</span>
                <div className="w-3.5 h-3.5 bg-slate-100 rounded-sm" />
                <div className="w-3.5 h-3.5 bg-emerald-500 rounded-sm" />
                <span>Nhiều</span>
              </div>
            </div>

            <div className="flex items-start gap-3 min-w-[760px] p-4 bg-slate-50/50 rounded-3xl border border-slate-100">
              
              {/* Day Labels Column */}
              <div className="grid grid-rows-7 gap-1 text-[9px] font-black text-slate-400 uppercase tracking-widest pt-5 pr-1 text-right">
                <span className="h-3.5 leading-tight">T2</span>
                <span className="h-3.5" />
                <span className="h-3.5 leading-tight">T4</span>
                <span className="h-3.5" />
                <span className="h-3.5 leading-tight">T6</span>
                <span className="h-3.5" />
                <span className="h-3.5" />
              </div>

              {/* Grid Column Layout */}
              <div className="flex-1 flex gap-1">
                {getYearContributionData().map((week, colIdx) => (
                  <div key={colIdx} className="grid grid-rows-7 gap-1 flex-1">
                    {week.map((cell, rowIdx) => (
                      <div 
                        key={`${colIdx}-${rowIdx}`}
                        title={`${cell.date.toLocaleDateString('vi-VN')}: ${cell.checkedIn ? 'Đã điểm danh' : 'Chưa điểm danh'}`}
                        className={cn(
                          "w-3.5 h-3.5 rounded-sm transition-all cursor-pointer",
                          cell.checkedIn 
                            ? "bg-emerald-500 scale-105 shadow-sm shadow-emerald-500/10" 
                            : cell.isFuture 
                              ? "bg-slate-100/30 cursor-not-allowed opacity-20"
                              : "bg-slate-100 hover:bg-slate-200"
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
