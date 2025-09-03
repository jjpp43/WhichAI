"use client";

import { useEffect, useState } from "react";

export function EnvironmentCheck() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: boolean;
    supabaseAnonKey: boolean;
  }>({ supabaseUrl: false, supabaseAnonKey: false });

  useEffect(() => {
    setEnvStatus({
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
  }, []);

  return (
    <div className="text-xs text-gray-500 space-y-1">
      <div>SUPABASE_URL: {envStatus.supabaseUrl ? "✅" : "❌"}</div>
      <div>SUPABASE_ANON_KEY: {envStatus.supabaseAnonKey ? "✅" : "❌"}</div>
    </div>
  );
}
