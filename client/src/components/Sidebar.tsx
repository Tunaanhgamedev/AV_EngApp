'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Trophy,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Search, label: 'Dictionary', href: '/dictionary' },
  { icon: BookOpen, label: 'Learn Vocabulary', href: '/learn' },
  { icon: BookMarked, label: 'Review System', href: '/review' },
  { icon: Mic2, label: 'Speaking AI', href: '/speaking' },
  { icon: Headphones, label: 'Listening', href: '/listening' },
  { icon: PenTool, label: 'Writing Journal', href: '/journal' },
  { icon: MessageSquare, label: 'AI Chat', href: '/chat' },
  { icon: Gamepad2, label: 'Quiz & Games', href: '/games' },
  { icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen glass border-r flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold gradient-text">AVEngApp</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">AI English Mentor</p>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto py-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                  )} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-slate-200/50 dark:border-slate-800/50">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">John Doe</p>
            <p className="text-xs text-slate-500 truncate">Level 12 • 4,250 XP</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
