'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Loader2, AlertTriangle, Compass } from 'lucide-react';

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || navigator.vendor || '';
      const inApp = /FBAN|FBAV|Instagram|Zalo|Messenger|Line|WeChat|Kakaotalk|MicroMessenger/i.test(ua);
      setIsInApp(inApp);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-slate-500 font-medium">Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  if (user) {
    router.push('/');
    return null;
  }

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithGoogle();
    } catch {
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center py-8 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-y-auto">
      <div className="w-full max-w-sm sm:max-w-md landscape:max-w-3xl bg-white dark:bg-slate-900 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 landscape:p-8 border border-slate-100 dark:border-slate-800 transition-all duration-300">
        <div className="flex flex-col landscape:flex-row landscape:items-center landscape:gap-10 space-y-6 landscape:space-y-0">
          
          {/* Left Column: Branding */}
          <div className="flex flex-col items-center landscape:items-start text-center landscape:text-left landscape:w-1/2 space-y-3 sm:space-y-4 landscape:space-y-3">
            <div className="inline-flex p-3 sm:p-4 bg-primary/10 dark:bg-primary/20 rounded-2xl sm:rounded-3xl text-primary">
              <LogIn className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Welcome to EngBot</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Learn English with AI. Sign in to track your progress, practice pronunciation, and chat with EngBot.
              </p>
            </div>
            
            {isInApp && (
              <div className="w-full p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3 text-amber-600 dark:text-amber-400 text-left animate-in fade-in duration-300">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-wider">⚠️ Trình duyệt nội bộ</p>
                  <p className="text-[10px] leading-relaxed font-medium">
                    Nhấp vào <strong>(...)</strong> góc màn hình và chọn <strong>"Mở bằng Trình duyệt / Safari / Chrome"</strong> để đăng nhập thành công.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sign In Buttons */}
          <div className="flex flex-col landscape:w-1/2 space-y-3 sm:space-y-4">
            <button
              onClick={handleSignIn}
              disabled={signingIn}
              className="w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 border-2 border-slate-100 dark:border-slate-800 rounded-xl sm:rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm disabled:opacity-60 disabled:cursor-wait touch-manipulation cursor-pointer"
            >
              {signingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-sm sm:text-base">Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Continue with Google</span>
                </>
              )}
            </button>
            
            <button
              disabled
              className="w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 border-2 border-slate-100 dark:border-slate-800 rounded-xl sm:rounded-2xl font-bold text-slate-300 dark:text-slate-700 cursor-not-allowed grayscale"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="text-sm sm:text-base">Continue with GitHub</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-400 text-xs sm:text-sm">Or continue with</span>
              </div>
            </div>

            <button
              disabled
              className="w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm cursor-not-allowed"
            >
              <Mail className="w-5 h-5" />
              Email & Password
            </button>

            <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed px-2">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

