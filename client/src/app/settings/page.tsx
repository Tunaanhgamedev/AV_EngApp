'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Volume2, 
  Bell, 
  Eye, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  ShieldAlert, 
  Sliders, 
  Trophy, 
  Award,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, dbUser, loading } = useAuth();
  
  // Profile settings state
  const [displayName, setDisplayName] = useState('');
  const [dailyGoal, setDailyGoal] = useState('30'); // minutes
  const [examTarget, setExamTarget] = useState('toeic'); // toeic / ielts
  const [targetScore, setTargetScore] = useState('750');

  // Assistant & Media options state
  const [soundEffects, setSoundEffects] = useState(true);
  const [speechGender, setSpeechGender] = useState('female'); // male / female
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [aiFeedbackDetail, setAiFeedbackDetail] = useState('high'); // simple / high

  // Notifications options state
  const [emailReminders, setEmailReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Appearance state
  const [themeMode, setThemeMode] = useState('light'); // light / dark
  const [baseFontSize, setBaseFontSize] = useState('medium'); // small / medium / large

  // Page transaction states
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Initializing settings from user profile and localStorage
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || dbUser?.username || '');
    }
    
    // Load local assistant & visual options
    if (typeof window !== 'undefined') {
      const sound = localStorage.getItem('pref_sound_effects');
      if (sound !== null) setSoundEffects(sound === 'true');
      
      const gender = localStorage.getItem('pref_speech_gender');
      if (gender) setSpeechGender(gender);
      
      const autoplay = localStorage.getItem('pref_autoplay_audio');
      if (autoplay !== null) setAutoPlayAudio(autoplay === 'true');
      
      const aiDetail = localStorage.getItem('pref_ai_detail');
      if (aiDetail) setAiFeedbackDetail(aiDetail);

      const email = localStorage.getItem('pref_email_reminders');
      if (email !== null) setEmailReminders(email === 'true');

      const weekly = localStorage.getItem('pref_weekly_digest');
      if (weekly !== null) setWeeklyDigest(weekly === 'true');

      const theme = localStorage.getItem('pref_theme_mode');
      if (theme) setThemeMode(theme);

      const font = localStorage.getItem('pref_font_size');
      if (font) setBaseFontSize(font);

      const goal = localStorage.getItem('pref_daily_goal');
      if (goal) setDailyGoal(goal);

      const target = localStorage.getItem('pref_exam_target');
      if (target) setExamTarget(target);

      const score = localStorage.getItem('pref_target_score');
      if (score) setTargetScore(score);
    }
  }, [user, dbUser]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    try {
      // 1. Persist backend changes if authenticated
      if (user) {
        const token = await user.getIdToken();
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        
        const res = await fetch(`${API_BASE}/users/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            username: displayName,
          })
        });

        if (!res.ok) {
          throw new Error('Failed to update profile on the server database.');
        }
      }

      // 2. Persist to LocalStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('pref_sound_effects', String(soundEffects));
        localStorage.setItem('pref_speech_gender', speechGender);
        localStorage.setItem('pref_autoplay_audio', String(autoPlayAudio));
        localStorage.setItem('pref_ai_detail', aiFeedbackDetail);
        localStorage.setItem('pref_email_reminders', String(emailReminders));
        localStorage.setItem('pref_weekly_digest', String(weeklyDigest));
        localStorage.setItem('pref_theme_mode', themeMode);
        localStorage.setItem('pref_font_size', baseFontSize);
        localStorage.setItem('pref_daily_goal', dailyGoal);
        localStorage.setItem('pref_exam_target', examTarget);
        localStorage.setItem('pref_target_score', targetScore);
        
        // Dispatch dynamic settings event for active modules
        window.dispatchEvent(new Event('settingsUpdated'));
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      console.error(err);
      setSaveError(err.message || 'Một lỗi không xác định đã xảy ra.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin text-primary" />
        <p className="text-slate-500 font-bold">Đang tải cấu hình cài đặt...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex items-center gap-3">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <SettingsIcon className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Cài Đặt Hệ Thống</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Tùy biến học tập, trợ lý AI, âm thanh và cấu hình tài khoản cá nhân của bạn.</p>
        </div>
      </header>

      {!user ? (
        <div className="premium-card p-10 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800">Yêu Cầu Đăng Nhập</h2>
            <p className="text-slate-500 font-medium max-w-sm mx-auto">Vui lòng đăng nhập để lưu trữ cấu hình đồng bộ trực tiếp lên máy chủ cơ sở dữ liệu!</p>
          </div>
          <Link 
            href="/login"
            className="px-8 py-3.5 bg-primary text-white rounded-2xl font-black text-lg hover:opacity-90 transition-all flex items-center gap-2 justify-center mx-auto shadow-xl shadow-primary/30 cursor-pointer animate-pulse"
          >
            <User className="w-5 h-5" /> Đăng nhập với Google
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* Settings Alert Banner */}
          {saveSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-3 animate-in fade-in duration-300">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm font-black">Cập nhật cấu hình cài đặt thành công! Tất cả thay đổi đã được áp dụng và đồng bộ.</span>
            </div>
          )}

          {saveError && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-3 animate-in fade-in duration-300">
              <ShieldAlert className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <span className="text-sm font-black">{saveError}</span>
            </div>
          )}

          {/* Section 1: User Profile Settings */}
          <section className="premium-card p-8 space-y-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 border-b border-slate-50 dark:border-slate-800 pb-4">
              <User className="w-5 h-5 text-indigo-500" /> Thông Tin Học Viên
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Tên hiển thị</label>
                <input 
                  type="text" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                  required
                  placeholder="Nhập tên hiển thị mới..."
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary font-bold text-sm text-slate-700 dark:text-slate-200 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Địa chỉ Email (Định danh)</label>
                <input 
                  type="email" 
                  value={user.email || ''} 
                  disabled
                  className="w-full p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 font-bold text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Mục tiêu ôn luyện</label>
                <select 
                  value={examTarget} 
                  onChange={(e) => setExamTarget(e.target.value)}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-200 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="toeic">Chứng chỉ TOEIC</option>
                  <option value="ielts">Chứng chỉ IELTS</option>
                  <option value="general">Giao tiếp tổng quát</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Điểm số mục tiêu</label>
                <select 
                  value={targetScore} 
                  onChange={(e) => setTargetScore(e.target.value)}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-200 focus:border-primary transition-all cursor-pointer"
                >
                  {examTarget === 'toeic' ? (
                    <>
                      <option value="500">TOEIC 500+</option>
                      <option value="750">TOEIC 750+</option>
                      <option value="900">TOEIC 900+</option>
                      <option value="990">TOEIC 990 (Tuyệt đối)</option>
                    </>
                  ) : examTarget === 'ielts' ? (
                    <>
                      <option value="5.5">IELTS Band 5.5+</option>
                      <option value="6.5">IELTS Band 6.5+</option>
                      <option value="7.5">IELTS Band 7.5+</option>
                      <option value="8.5">IELTS Band 8.5+</option>
                    </>
                  ) : (
                    <>
                      <option value="basic">Giao tiếp Cơ Bản</option>
                      <option value="medium">Giao tiếp Thành Thạo</option>
                      <option value="fluent">Giao tiếp Lưu Loát Pro</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Thời gian tự học hàng ngày</label>
                <select 
                  value={dailyGoal} 
                  onChange={(e) => setDailyGoal(e.target.value)}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-200 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="15">15 phút / ngày (Thư giãn)</option>
                  <option value="30">30 phút / ngày (Tiêu chuẩn)</option>
                  <option value="60">60 phút / ngày (Quyết tâm)</option>
                  <option value="120">120 phút / ngày (Bứt phá)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: AI & Assistant settings */}
          <section className="premium-card p-8 space-y-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 border-b border-slate-50 dark:border-slate-800 pb-4">
              <Sliders className="w-5 h-5 text-emerald-500" /> Trợ Lý Ảo & Phương Tiện
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
              <div className="space-y-5 pr-0 md:pr-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Hiệu ứng âm thanh</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Phát âm thanh chúc mừng khi trả lời đúng.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={soundEffects} 
                      onChange={(e) => setSoundEffects(e.target.checked)} 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Tự động phát phát âm</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Tự động đọc to từ vựng tiếng Anh khi chọn.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={autoPlayAudio} 
                      onChange={(e) => setAutoPlayAudio(e.target.checked)} 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              </div>

              <div className="space-y-5 pt-5 md:pt-0 pl-0 md:pl-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Giọng phát âm trợ lý</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['female', 'male'].map(gender => (
                      <button
                        type="button"
                        key={gender}
                        onClick={() => setSpeechGender(gender)}
                        className={cn(
                          "py-3 border-2 rounded-xl text-xs font-black transition-all cursor-pointer capitalize",
                          speechGender === gender 
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/10" 
                            : "border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800"
                        )}
                      >
                        Giọng {gender === 'female' ? 'Nữ (Female)' : 'Nam (Male)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Mức độ chi tiết giải thích AI</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: 'simple', label: 'Ngắn gọn' },
                      { val: 'high', label: 'Chi tiết chuyên sâu' }
                    ].map(opt => (
                      <button
                        type="button"
                        key={opt.val}
                        onClick={() => setAiFeedbackDetail(opt.val)}
                        className={cn(
                          "py-3 border-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                          aiFeedbackDetail === opt.val
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/10" 
                            : "border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Notifications & Sound */}
          <section className="premium-card p-8 space-y-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 border-b border-slate-50 dark:border-slate-800 pb-4">
              <Bell className="w-5 h-5 text-orange-500" /> Thông Báo & Liên Lạc
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Email nhắc nhở hàng ngày</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Giữ chuỗi ngày học streak liên tục cùng các bài học mới.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={emailReminders} 
                    onChange={(e) => setEmailReminders(e.target.checked)} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Báo cáo học tập tuần</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Nhận thống kê và đánh giá chuyên sâu vào sáng Thứ Hai.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={weeklyDigest} 
                    onChange={(e) => setWeeklyDigest(e.target.checked)} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            </div>
          </section>

          {/* Section 4: Display & Style settings */}
          <section className="premium-card p-8 space-y-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 border-b border-slate-50 dark:border-slate-800 pb-4">
              <Eye className="w-5 h-5 text-indigo-500" /> Giao Diện & Thể Hiện
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Chủ đề hiển thị</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'light', label: '☀️ Chế độ sáng' },
                    { val: 'dark', label: '🌙 Chế độ tối' }
                  ].map(theme => (
                    <button
                      type="button"
                      key={theme.val}
                      onClick={() => {
                        setThemeMode(theme.val);
                        if (theme.val === 'dark') {
                          document.documentElement.classList.add('dark');
                          document.documentElement.classList.remove('light');
                        } else {
                          document.documentElement.classList.add('light');
                          document.documentElement.classList.remove('dark');
                        }
                      }}
                      className={cn(
                        "py-3.5 border-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                        themeMode === theme.val
                          ? "bg-slate-900 border-slate-950 text-white shadow-lg" 
                          : "border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800"
                      )}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Cỡ chữ văn bản</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: 'small', label: 'Nhỏ' },
                    { val: 'medium', label: 'Chuẩn' },
                    { val: 'large', label: 'Lớn' }
                  ].map(font => (
                    <button
                      type="button"
                      key={font.val}
                      onClick={() => {
                        setBaseFontSize(font.val);
                        document.documentElement.classList.remove('theme-font-small', 'theme-font-medium', 'theme-font-large');
                        document.documentElement.classList.add(`theme-font-${font.val}`);
                      }}
                      className={cn(
                        "py-3.5 border-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                        baseFontSize === font.val
                          ? "bg-primary border-primary text-white shadow-md shadow-primary/10" 
                          : "border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800"
                      )}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end pt-4">
            <button 
              type="submit" 
              disabled={saving}
              className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-xl shadow-primary/30 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" /> Đang Đồng Bộ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Lưu Tùy Chọn Cài Đặt
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
