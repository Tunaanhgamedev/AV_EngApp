'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LogIn, Github, Mail } from 'lucide-react';

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
            <Github className="w-5 h-5" />
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
