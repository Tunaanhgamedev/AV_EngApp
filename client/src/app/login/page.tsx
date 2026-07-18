'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  LogIn, 
  Mail, 
  Loader2, 
  AlertTriangle, 
  User, 
  Lock, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  Flame,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const { 
    user, 
    signInWithGoogle, 
    signInWithFacebook, 
    signInWithApple, 
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    loading 
  } = useAuth();
  
  const router = useRouter();
  
  // Tab control: 'login' or 'register'
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Loading states per action
  const [authLoading, setAuthLoading] = useState<'google' | 'facebook' | 'apple' | 'github' | 'email' | null>(null);
  const [isInApp, setIsInApp] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || navigator.vendor || '';
      const inApp = /FBAN|FBAV|Instagram|Zalo|Messenger|Line|WeChat|Kakaotalk|MicroMessenger/i.test(ua);
      setIsInApp(inApp);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600 dark:text-indigo-400" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  if (user) {
    router.push('/');
    return null;
  }

  const handleOAuthSignIn = async (provider: 'google' | 'facebook' | 'apple' | 'github') => {
    setAuthLoading(provider);
    setErrorMsg(null);
    setSuccessMsg(null);
    
    try {
      if (provider === 'google') await signInWithGoogle();
      if (provider === 'facebook') await signInWithFacebook();
      if (provider === 'apple') await signInWithApple();
      if (provider === 'github') await signInWithGithub();
      setSuccessMsg("Đăng nhập thành công! Đang chuyển hướng...");
    } catch (err: any) {
      setAuthLoading(null);
      console.error(`[Login] ${provider} Sign-In error:`, err);
      
      if (err?.code === 'auth/popup-blocked') {
        setErrorMsg("Trình duyệt đã chặn cửa sổ đăng nhập (Popup). Hãy cấp quyền mở popup cho trang này hoặc thử lại.");
      } else if (err?.code === 'auth/unauthorized-domain') {
        setErrorMsg("Tên miền này chưa được cấp phép đăng nhập trong Firebase Console.");
      } else if (err?.code === 'auth/cancelled-popup-request') {
        setErrorMsg("Yêu cầu đăng nhập trước đó đã bị hủy.");
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setErrorMsg("Bạn đã đóng cửa sổ đăng nhập trước khi hoàn tất.");
      } else {
        setErrorMsg(err?.message || `Đã xảy ra lỗi kết nối với ${provider}.`);
      }
    }
  };

  const handleEmailAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validation checks
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Vui lòng điền đầy đủ Email và Mật khẩu.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }

    setAuthLoading('email');

    try {
      if (activeTab === 'register') {
        if (!displayName.trim()) {
          setErrorMsg("Vui lòng điền Họ & Tên.");
          setAuthLoading(null);
          return;
        }
        if (password !== confirmPassword) {
          setErrorMsg("Mật khẩu nhập lại không khớp. Vui lòng kiểm tra lại.");
          setAuthLoading(null);
          return;
        }
        
        await signUpWithEmail(email, password, displayName);
        setSuccessMsg("Đăng ký tài khoản thành công! Đang chuyển hướng...");
      } else {
        await signInWithEmail(email, password);
        setSuccessMsg("Đăng nhập thành công! Đang chuyển hướng...");
      }
    } catch (err: any) {
      setAuthLoading(null);
      console.error("[Login] Email Auth error:", err);
      
      if (err?.code === 'auth/email-already-in-use') {
        setErrorMsg("Email này đã được sử dụng bởi một tài khoản khác.");
      } else if (err?.code === 'auth/invalid-email') {
        setErrorMsg("Định dạng địa chỉ Email không hợp lệ.");
      } else if (err?.code === 'auth/weak-password') {
        setErrorMsg("Mật khẩu quá yếu (yêu cầu ít nhất 6 ký tự).");
      } else if (err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential') {
        setErrorMsg("Email hoặc Mật khẩu không chính xác.");
      } else {
        setErrorMsg(err?.message || "Đã xảy ra lỗi hệ thống. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center py-8 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 transition-all duration-300">
        
        {/* Logo and Greeting */}
        <div className="flex flex-col items-center text-center mb-8 space-y-3">
          <div className="relative">
            <div className="inline-flex p-4 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-3xl text-indigo-600 dark:text-indigo-400">
              <LogIn className="w-10 h-10" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">EngBot Platform</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              Đăng nhập hoặc đăng ký tài khoản để đồng bộ tiến trình học, điểm số và sổ tay từ vựng của bạn.
            </p>
          </div>
          
          {isInApp && (
            <div className="w-full p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3 text-amber-600 dark:text-amber-400 text-left animate-in fade-in duration-300">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-wider">⚠️ Trình duyệt in-app</p>
                <p className="text-[10px] leading-relaxed font-medium">
                  Nhấp vào dấu <strong>(...)</strong> góc màn hình và chọn <strong>"Mở bằng Trình duyệt / Safari / Chrome"</strong> để đăng nhập ổn định.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl mb-6 relative">
          <button
            onClick={() => { setActiveTab('login'); setErrorMsg(null); }}
            className={cn(
              "flex-1 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer",
              activeTab === 'login' 
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-none" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => { setActiveTab('register'); setErrorMsg(null); }}
            className={cn(
              "flex-1 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer",
              activeTab === 'register' 
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-none" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            Đăng Ký
          </button>
        </div>

        {/* Email & Password Authentication Form */}
        <form onSubmit={handleEmailAuthSubmit} className="space-y-4 mb-6">
          {activeTab === 'register' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Họ & Tên</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 dark:text-slate-100 text-sm transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Địa chỉ Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 dark:text-slate-100 text-sm transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="password"
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 dark:text-slate-100 text-sm transition-all"
                required
              />
            </div>
          </div>

          {activeTab === 'register' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Nhập lại Mật khẩu</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu trùng khớp"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 dark:text-slate-100 text-sm transition-all"
                  required
                />
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold leading-relaxed animate-in fade-in duration-300">
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-xl text-xs font-semibold leading-relaxed flex items-center gap-2 animate-in fade-in duration-300">
              <Check className="w-4 h-4 text-green-500 shrink-0" /> {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading !== null}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-75 disabled:cursor-wait touch-manipulation cursor-pointer"
          >
            {authLoading === 'email' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <span>{activeTab === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Hoặc tiếp tục với
            </span>
          </div>
        </div>

        {/* OAuth Social Providers Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Google */}
          <button
            type="button"
            onClick={() => handleOAuthSignIn('google')}
            disabled={authLoading !== null}
            className="flex items-center justify-center gap-2.5 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all font-bold text-xs text-slate-700 dark:text-slate-200 active:scale-95 disabled:opacity-50 disabled:cursor-wait cursor-pointer"
          >
            {authLoading === 'google' ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
            )}
            <span>Google</span>
          </button>

          {/* GitHub */}
          <button
            type="button"
            onClick={() => handleOAuthSignIn('github')}
            disabled={authLoading !== null}
            className="flex items-center justify-center gap-2.5 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all font-bold text-xs text-slate-700 dark:text-slate-200 active:scale-95 disabled:opacity-50 disabled:cursor-wait cursor-pointer"
          >
            {authLoading === 'github' ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
            ) : (
              <svg className="w-4 h-4 fill-current text-slate-900 dark:text-slate-100" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            )}
            <span>GitHub</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={() => handleOAuthSignIn('facebook')}
            disabled={authLoading !== null}
            className="flex items-center justify-center gap-2.5 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all font-bold text-xs text-slate-700 dark:text-slate-200 active:scale-95 disabled:opacity-50 disabled:cursor-wait cursor-pointer"
          >
            {authLoading === 'facebook' ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            )}
            <span>Facebook</span>
          </button>

          {/* Apple */}
          <button
            type="button"
            onClick={() => handleOAuthSignIn('apple')}
            disabled={authLoading !== null}
            className="flex items-center justify-center gap-2.5 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all font-bold text-xs text-slate-700 dark:text-slate-200 active:scale-95 disabled:opacity-50 disabled:cursor-wait cursor-pointer"
          >
            {authLoading === 'apple' ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-900 dark:text-slate-100" />
            ) : (
              <svg className="w-4 h-4 fill-current text-slate-900 dark:text-slate-100" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94 1.07.08 2.15-.52 2.81-1.33z"/>
              </svg>
            )}
            <span>Apple</span>
          </button>
        </div>

        {/* Footer Policy */}
        <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed px-2">
          Bằng việc tiếp tục, bạn đồng ý với các Điều khoản Dịch vụ và Chính sách Bảo mật của EngBot.
        </p>
      </div>
    </div>
  );
}
