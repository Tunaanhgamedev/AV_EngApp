'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { 
  onAuthStateChanged, 
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface DbUser {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  xp: number;
  level: number;
  streak: number;
}

interface AuthContextType {
  user: FirebaseUser | null;
  dbUser: DbUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshDbUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Maximum time to wait for Firebase Auth to initialize before showing content
const AUTH_TIMEOUT_MS = 5000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const loadingResolved = useRef(false);

  const resolveLoading = () => {
    if (!loadingResolved.current) {
      loadingResolved.current = true;
      setLoading(false);
    }
  };

  const fetchDbUser = async (firebaseUser: FirebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDbUser(data.user || data);
      }
    } catch (error) {
      console.error("Error fetching db user", error);
    }
  };

  // Safety timeout: If Firebase Auth takes too long to respond (slow network,
  // in-app browser issues, etc.), force loading to false so user sees content
  // instead of an infinite spinner.
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!loadingResolved.current) {
        console.warn(`[AuthContext] Firebase Auth did not respond within ${AUTH_TIMEOUT_MS}ms. Forcing loading=false.`);
        resolveLoading();
      }
    }, AUTH_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, []);

  // Handle redirect result on page load (for mobile signInWithRedirect flow).
  // This runs independently and does NOT block the main auth state listener.
  useEffect(() => {
    const isPending = typeof window !== 'undefined' && localStorage.getItem('auth_redirect_pending') === 'true';

    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          fetchDbUser(result.user);
        }
      })
      .catch((error: any) => {
        if (error?.code === 'auth/unauthorized-domain') {
          const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';
          alert(
            `Lỗi cấu hình Firebase (Redirect):\nTên miền này (${currentDomain}) chưa được cấp phép (Authorized Domains) trong Firebase Console.\n\n` +
            `Vui lòng truy cập Firebase Console -> Authentication -> Settings -> Authorized domains và thêm tên miền này vào danh sách.`
          );
        } else if (error?.code !== 'auth/popup-closed-by-user') {
          console.warn("Redirect result check error:", error?.code || error?.message);
        }
      })
      .finally(() => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_redirect_pending');
        }
        // If we were waiting specifically on a redirect callback, resolve loading now
        if (isPending) {
          resolveLoading();
        }
      });
  }, []);

  // Main auth state listener — this is what resolves loading
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchDbUser(firebaseUser);
      } else {
        setDbUser(null);
      }
      
      // If a redirect is actively pending, do not clear the loading state yet.
      // The getRedirectResult handler will resolve it in its finally block.
      const isPending = typeof window !== 'undefined' && localStorage.getItem('auth_redirect_pending') === 'true';
      if (!isPending) {
        resolveLoading();
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
      console.log("[Auth] Attempting signInWithPopup...");
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await fetchDbUser(result.user);
      }
    } catch (error: any) {
      console.warn("[Auth] signInWithPopup failed:", error?.code || error?.message || error);
      
      // 1. If it's a configuration issue (unauthorized domain), alert immediately and throw
      if (error?.code === 'auth/unauthorized-domain') {
        const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';
        alert(
          `Lỗi cấu hình Firebase:\nTên miền này (${currentDomain}) chưa được cấp phép (Authorized Domains) trong Firebase Console.\n\n` +
          `Vui lòng truy cập Firebase Console -> Authentication -> Settings -> Authorized domains và thêm tên miền "${currentDomain}" để sử dụng chức năng đăng nhập Google.`
        );
        throw error;
      }
      
      // 2. Identify if we should fall back to a full redirect (blocked popups, mobile webviews, or browser limits)
      const isPopupBlocked = error?.code === 'auth/popup-blocked';
      const isEnvNotSupported = error?.code === 'auth/operation-not-supported-in-this-environment';
      const isCrossOriginOrFrameError = /cross-origin|iframe|closed|blocked/i.test(error?.message || '') || error?.code?.includes('iframe');
      
      const shouldRedirectFallback = isPopupBlocked || isEnvNotSupported || isCrossOriginOrFrameError;
      
      if (shouldRedirectFallback) {
        console.log("[Auth] Popup blocked or not supported. Falling back to signInWithRedirect...");
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_redirect_pending', 'true');
          }
          await signInWithRedirect(auth, provider);
        } catch (redirectError: any) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_redirect_pending');
          }
          console.error("[Auth] Redirect fallback also failed:", redirectError);
          alert(
            "Không thể đăng nhập bằng Google.\n" +
            "Vui lòng tắt các trình chặn Quảng cáo/Popup trên trình duyệt của bạn hoặc chọn 'Mở bằng Chrome/Safari' để tiếp tục."
          );
          throw redirectError;
        }
      } else {
        // If it's cancelled by the user (popup-closed-by-user), just rethrow so caller resets loading spinner state
        throw error;
      }
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setDbUser(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const refreshDbUser = async () => {
    if (user) {
      await fetchDbUser(user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, signInWithGoogle, logout, refreshDbUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

