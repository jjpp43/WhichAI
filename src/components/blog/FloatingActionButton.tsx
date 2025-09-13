"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { Plus } from "lucide-react";

export function FloatingActionButton() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Link
      href="/blog/create"
      className="fixed bottom-6 right-72 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
    >
      <Plus className="w-6 h-6" />
      <span className="sr-only">Create new blog post</span>
    </Link>
  );
}
