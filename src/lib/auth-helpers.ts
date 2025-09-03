import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function getServerSession() {
  const cookieStore = await cookies();
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user) return null;

  const supabase = createServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return { ...session.user, profile };
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.profile?.is_admin ?? false;
}
