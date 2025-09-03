"use client";

import { useEffect, useState } from "react";

export function SupabaseConfigCheck() {
  const [config, setConfig] = useState({
    url: "",
    hasUrl: false,
    hasKey: false,
  });

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    setConfig({
      url: url,
      hasUrl: !!url,
      hasKey: !!key,
    });
  }, []);

  return (
    <div className="text-xs text-gray-500 space-y-1">
      <div>SUPABASE_URL: {config.hasUrl ? "✅" : "❌"}</div>
      <div>SUPABASE_ANON_KEY: {config.hasKey ? "✅" : "❌"}</div>
      {config.hasUrl && (
        <div className="text-xs text-gray-400">
          URL: {config.url.substring(0, 30)}...
        </div>
      )}
    </div>
  );
}
