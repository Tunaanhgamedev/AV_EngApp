'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Menu, X, AlertTriangle } from 'lucide-react';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

// Pages that should render without the sidebar/topbar shell
const FULL_SCREEN_PAGES = ['/login'];

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfigWarning, setShowConfigWarning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const isApiLocal = apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1') || apiUrl.includes('192.168.');
      
      if (!isLocal && isApiLocal) {
        setShowConfigWarning(true);
      }

      // Dynamic theme and font settings application
      const applySettings = () => {
        const theme = localStorage.getItem('pref_theme_mode') || 'light';
        const fontSize = localStorage.getItem('pref_font_size') || 'medium';

        // Apply dark/light classes to root documentElement
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }

        // Apply font size class
        document.documentElement.classList.remove('theme-font-small', 'theme-font-medium', 'theme-font-large');
        document.documentElement.classList.add(`theme-font-${fontSize}`);
      };

      applySettings();
      window.addEventListener('settingsUpdated', applySettings);
      return () => window.removeEventListener('settingsUpdated', applySettings);
    }
  }, []);

  // Render children directly without shell for full-screen pages (e.g. login)
  if (FULL_SCREEN_PAGES.includes(pathname)) {
    return (
      <div className="w-full flex flex-col min-h-screen">
        {showConfigWarning && (
          <div className="w-full p-4 bg-amber-500/10 border-b border-amber-500/20 text-amber-800 dark:text-amber-300 flex items-start justify-center gap-3 shadow-sm animate-in slide-in-from-top duration-500 z-50">
            <div className="max-w-4xl w-full flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-wider">⚠️ LỖI CẤU HÌNH KẾT NỐI API (THIẾU ENVIRONMENT VARIABLE)</p>
                <p className="text-xs leading-relaxed font-medium">
                  Website đang chạy trên internet nhưng lại kết nối tới API Backend tại <strong>localhost (máy cá nhân)</strong>. Điều này làm cho tất cả tính năng đăng nhập và đồng bộ dữ liệu báo lỗi kết nối.
                </p>
                <p className="text-xs font-bold text-amber-950 dark:text-amber-200 mt-1">
                  👉 <strong>Cách khắc phục:</strong> Truy cập Vercel Dashboard &rarr; <strong>Settings</strong> &rarr; <strong>Environment Variables</strong> &rarr; thêm biến <code>NEXT_PUBLIC_API_URL</code> trỏ đến Backend Render của bạn (ví dụ: <code>https://your-backend.onrender.com/api</code>) và **Redeploy** lại dự án trên Vercel.
                </p>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full relative">
      {/* Mobile Topbar */}
      <header className="lg:hidden h-16 border-b border-slate-200/50 bg-background/80 backdrop-blur-md fixed top-0 left-0 right-0 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/20">E</div>
          <div>
            <h1 className="text-base font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-tight">EngBot</h1>
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">AI English Mentor</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
        </button>
      </header>

      {/* Sidebar Drawer */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 min-h-screen pt-16 lg:pt-0 transition-all duration-300 bg-background text-foreground">
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
          {showConfigWarning && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 rounded-2xl flex items-start gap-3 shadow-sm animate-in slide-in-from-top duration-500">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-wider">⚠️ LỖI CẤU HÌNH KẾT NỐI API (THIẾU ENVIRONMENT VARIABLE)</p>
                <p className="text-xs leading-relaxed font-medium">
                  Website đang chạy trên internet nhưng lại kết nối tới API Backend tại <strong>localhost (máy cá nhân)</strong>. Điều này làm cho tất cả các tính năng học từ vựng, dịch thuật, chat AI báo lỗi kết nối máy chủ.
                </p>
                <p className="text-xs font-bold text-amber-950 dark:text-amber-200 mt-1.5">
                  👉 <strong>Cách khắc phục:</strong> Truy cập Vercel Dashboard dự án của bạn &rarr; <strong>Settings</strong> &rarr; <strong>Environment Variables</strong> và thêm biến <code>NEXT_PUBLIC_API_URL</code> với giá trị là đường dẫn API backend thực tế trên Render của bạn (ví dụ: <code>https://your-backend.onrender.com/api</code>), sau đó thực hiện <strong>Redeploy</strong> lại dự án trên Vercel.
                </p>
              </div>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

