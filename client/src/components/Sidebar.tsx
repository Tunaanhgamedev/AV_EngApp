'use client';

import React, { memo, useMemo, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  BookMarked, 
  Headphones, 
  Mic2, 
  PenTool, 
  MessageSquare, 
  Gamepad2, 
  Search, 
  Settings, 
  Languages, 
  Trophy, 
  LogIn, 
  LogOut, 
  NotebookPen, 
  Volume2, 
  FileText, 
  Music, 
  GraduationCap, 
  Award, 
  Clock 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const STATIC_MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Search, label: 'Dictionary', href: '/dictionary' },
  { icon: Languages, label: 'AI Translator', href: '/translate' },
  { icon: BookOpen, label: 'Learn Vocabulary', href: '/learn' },
  { icon: BookMarked, label: 'Review System', href: '/review', key: 'review' },
  { icon: NotebookPen, label: 'My Notebook', href: '/notebook', key: 'notebook' },
  { icon: FileText, label: 'Reading Room', href: '/reading' },
  { icon: Headphones, label: 'Listening Lab', href: '/listening' },
  { icon: Volume2, label: 'Pronunciation', href: '/pronunciation' },
  { icon: Clock, label: '5 Tenses AI', href: '/tenses' },
  { icon: Mic2, label: 'Speaking AI', href: '/speaking' },
  { icon: PenTool, label: 'Writing Journal', href: '/journal' },
  { icon: MessageSquare, label: 'AI Chat', href: '/chat' },
  { icon: Gamepad2, label: 'Quiz & Games', href: '/games' },
  { icon: GraduationCap, label: 'TOEIC Center', href: '/toeic' },
  { icon: Award, label: 'IELTS Center', href: '/ielts' },
  { icon: Music, label: 'Music Hub', href: '/music' },
  { icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar = memo(function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, dbUser, logout, loading } = useAuth();
  const [reviewCount, setReviewCount] = useState(0);
  const [notebookNeedsReview, setNotebookNeedsReview] = useState(false);

  const fetchReviewCount = useCallback(async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      // Parallel fetch for review count and daily status
      const [res, statusRes] = await Promise.allSettled([
        fetch(`${API_BASE}/vocabulary/notebook`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/vocabulary/daily-review-status`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (res.status === 'fulfilled' && res.value.ok) {
        const data = await res.value.json();
        if (data.words) {
          const now = new Date();
          const due = data.words.filter((w: any) => w.nextReviewAt && new Date(w.nextReviewAt) <= now).length;
          setReviewCount(due);
        }
      }

      if (statusRes.status === 'fulfilled' && statusRes.value.ok) {
        const statusData = await statusRes.value.json();
        setNotebookNeedsReview(statusData.needsReminder);
      }
    } catch {
      // Quietly swallow offline warnings
    }
  }, [user]);

  useEffect(() => {
    fetchReviewCount();
    const interval = setInterval(fetchReviewCount, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchReviewCount]);

  const menuItems = useMemo(() => {
    return STATIC_MENU_ITEMS.map((item) => {
      let badge = 0;
      if (item.key === 'review') badge = reviewCount;
      if (item.key === 'notebook') badge = notebookNeedsReview ? -1 : 0;
      return { ...item, badge };
    });
  }, [reviewCount, notebookNeedsReview]);

  return (
    <aside className={cn(
      "w-64 h-screen glass border-r flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "lg:translate-x-0"
    )}>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-lg">E</div>
          <div>
            <h1 className="text-xl font-bold gradient-text leading-tight">EngBot</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">AI English Mentor</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto py-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                    isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5",
                    isActive ? "text-white" : "text-slate-400 dark:text-slate-500 group-hover:text-primary"
                  )} />
                  <span className="font-medium text-sm flex-1">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.badge === -1 && (
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-slate-200/50 dark:border-slate-800/50">
        {loading ? (
          <div className="animate-pulse flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
            </div>
          </div>
        ) : user ? (
          <div className="space-y-3">
            <Link
              href="/profile"
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" />
              ) : (
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                  {user.displayName?.charAt(0) || 'U'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.displayName || 'Learner'}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
                  Lvl {dbUser?.level || 1} • {dbUser?.xp?.toLocaleString() || 0} XP
                </p>
              </div>
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              onClose?.();
              router.push('/login');
            }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-all font-medium text-sm shadow-lg shadow-slate-900/10 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            Sign In to Sync
          </button>
        )}
      </div>
    </aside>
  );
});
