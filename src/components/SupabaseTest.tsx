"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function SupabaseTest() {
  const [testResult, setTestResult] = useState<string>("Testing...");

  useEffect(() => {
    const testSupabase = async () => {
      try {
        // Test basic connection
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setTestResult(`Error: ${error.message}`);
        } else {
          setTestResult("✅ Supabase connection working");
        }
      } catch (err: any) {
        setTestResult(`Connection failed: ${err.message}`);
      }
    };

    testSupabase();
  }, []);

  return (
    <div className="text-xs text-gray-500">
      <div>Supabase Test: {testResult}</div>
    </div>
  );
}
