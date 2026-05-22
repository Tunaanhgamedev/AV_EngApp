'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LogIn, Mail } from 'lucide-react';

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;
  if (user) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full space-y-8 premium-card p-10 bg-white shadow-2xl">
        <div className="text-center">
          <div className="inline-flex p-4 bg-primary/10 rounded-3xl text-primary mb-4">
            <LogIn className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome to AVEngApp</h2>
          <p className="mt-2 text-sm text-slate-500">
            Learn English with EngBot. Sign in to track your progress.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          
          <button
            disabled
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-300 cursor-not-allowed grayscale"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            Continue with GitHub
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-400">Or continue with</span>
            </div>
          </div>

          <button
            disabled
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 text-slate-400 rounded-2xl font-bold text-sm cursor-not-allowed"
          >
            <Mail className="w-5 h-5" />
            Email & Password
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy. 
          EngBot is here to help you learn faster and better.
        </p>
      </div>
    </div>
  );
}
