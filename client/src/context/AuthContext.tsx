'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
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

// Detect mobile browsers where signInWithPopup may fail
const isMobileBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || '';
  return /android|iphone|ipad|ipod|webos|blackberry|windows phone|opera mini|iemobile|mobile/i.test(ua);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Handle redirect result on page load (for mobile signInWithRedirect flow)
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          await fetchDbUser(result.user);
        }
      } catch (error: any) {
        // Silently ignore "no redirect result" — this is normal on non-redirect loads
        if (error?.code !== 'auth/popup-closed-by-user') {
          console.error("Redirect sign-in error:", error);
        }
      }
    };
    handleRedirectResult();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchDbUser(firebaseUser);
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Primary: Try popup sign-in first for all environments
      // This is because on mobile Chrome/Safari, signInWithPopup works natively if user-triggered
      // and avoids the Safari ITP / third-party cookies block that breaks signInWithRedirect.
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await fetchDbUser(result.user);
      }
    } catch (error: any) {
      console.warn("signInWithPopup failed or was blocked, attempting redirect fallback...", error);
      // Fallback: If popup is blocked, closed, or cancelled, use redirect
      if (
        error?.code === 'auth/popup-blocked' || 
        error?.code === 'auth/popup-closed-by-user' || 
        error?.code === 'auth/cancelled-popup-request' ||
        error?.code === 'auth/operation-not-supported-in-this-environment'
      ) {
        try {
          await signInWithRedirect(auth, provider);
        } catch (redirectError) {
          console.error("Redirect sign-in also failed:", redirectError);
        }
      } else {
        console.error("Error signing in with Google:", error);
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

