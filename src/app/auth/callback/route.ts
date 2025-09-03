import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  try {
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    console.log("Auth callback received:", { code: !!code, next, origin });

    if (code) {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: any) {
              try {
                cookieStore.set({ name, value, ...options });
              } catch {
                // The `set` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
            remove(name: string, options: any) {
              try {
                cookieStore.set({ name, value: "", ...options });
              } catch {
                // The `delete` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
          },
        }
      );

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        console.log("Auth successful, redirecting to:", next);
        return redirect(`${origin}${next}`);
      } else {
        console.error("Auth error:", error);
        return redirect(
          `${origin}/auth/auth-code-error?error=${encodeURIComponent(
            error.message
          )}`
        );
      }
    } else {
      console.log("No code received");
      return redirect(`${origin}/auth/auth-code-error?error=no_code`);
    }
  } catch (error) {
    console.error("Callback error:", error);
    return redirect(`${origin}/auth/auth-code-error?error=callback_error`);
  }
}
