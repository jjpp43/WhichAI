"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log("AuthProvider: Getting initial session...");
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        
        console.log("AuthProvider: Session result:", { session: !!session, error: !!error });
        
        if (mounted) {
          if (error) {
            console.error("Error getting session:", error);
            setUser(null);
          } else {
            setUser(session?.user ?? null);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Unexpected error getting session:", err);
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.id);
      
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        console.error("Error signing in with Google:", error);
      }
    } catch (err) {
      console.error("Unexpected error signing in:", err);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
      setUser(null);
    } catch (err) {
      console.error("Unexpected error signing out:", err);
      setUser(null);
    }
  };

  const getAccessToken = async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting access token:", error);
        return null;
      }
      return data.session?.access_token ?? null;
    } catch (err) {
      console.error("Unexpected error getting access token:", err);
      return null;
    }
  };

  console.log("AuthProvider render:", { user: user?.id, loading });

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, signOut, getAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
