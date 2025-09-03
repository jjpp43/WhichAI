"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function AuthStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">(
    "checking"
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setStatus("connected");
      } catch (err: any) {
        setStatus("error");
        setError(err.message);
      }
    };

    checkConnection();
  }, []);

  if (status === "checking") {
    return <div className="text-sm text-gray-500">Checking connection...</div>;
  }

  if (status === "error") {
    return (
      <div className="text-sm text-red-500">Connection error: {error}</div>
    );
  }

  return <div className="text-sm text-green-500">✅ Supabase connected</div>;
}
