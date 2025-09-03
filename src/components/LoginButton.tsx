"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
    handleSignInWithGoogle: (response: any) => void;
  }
}

export function LoginButton() {
  const { user, loading, signOut } = useAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [googleClientId, setGoogleClientId] = useState<string | null>(null);

  // Debug logging
  console.log("LoginButton render:", { user, loading, googleClientId });

  useEffect(() => {
    // Check if Google Client ID is available
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    console.log("Google Client ID:", clientId);
    setGoogleClientId(clientId || null);

    if (!clientId) {
      console.warn(
        "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set. Google pre-built button will not render."
      );
      return;
    }

    // Load Google GSI script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Define the global callback function
    window.handleSignInWithGoogle = async (response: any) => {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: response.credential,
        });

        if (error) {
          console.error("Error signing in with Google:", error);
          alert("Failed to sign in with Google. Please try again.");
        } else {
          console.log("Successfully signed in with Google:", data);
          // The AuthProvider will automatically update the user state
        }
      } catch (error) {
        console.error("Error signing in with Google:", error);
        alert("Failed to sign in with Google. Please try again.");
      }
    };

    // Initialize Google Sign-In when script loads
    script.onload = () => {
      if (window.google && !user) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: window.handleSignInWithGoogle,
          use_fedcm_for_prompt: true, // For Chrome's third-party cookie phase-out
        });

        // Render the button
        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            type: "standard",
            shape: "pill",
            theme: "outline",
            text: "signin_with",
            size: "large",
            logo_alignment: "left",
          });
        }
      }
    };

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [user]);

  if (loading) {
    console.log("LoginButton: showing loading state");
    return (
      <button
        disabled
        className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md"
      >
        Loading...
      </button>
    );
  }

  if (user) {
    console.log("LoginButton: showing user state", user);
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {user.user_metadata?.full_name || user.email}
        </span>
        <button
          onClick={signOut}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  // If Google Client ID is not set, show a fallback button
  if (!googleClientId) {
    console.log("LoginButton: showing fallback button (no Google Client ID)");
    return (
      <div className="text-center">
        <button
          disabled
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
        >
          Google Sign-In (Setup Required)
        </button>
        <p className="text-xs text-gray-500 mt-1">
          Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to .env.local
        </p>
      </div>
    );
  }

  console.log("LoginButton: showing Google button container");
  return <div ref={googleButtonRef} className="google-signin-button"></div>;
}
