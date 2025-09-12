import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check environment variables
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create Supabase client using request headers instead of cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            // Don't set cookies in API routes
          },
          remove(name: string, options: any) {
            // Don't remove cookies in API routes
          },
        },
      }
    );

    const { slug } = await params;
    console.log("fetching blog post with slug: ", slug);

    // Query blog_posts table (no profiles join since author_id references auth.users)
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!post) {
      console.log("No post found with slug:", slug);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    console.log("Post found:", post.title);

    // Transform the post data to match the expected format
    const transformedPost = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content, // Already jsonb, no parsing needed
      author_id: post.author_id,
      status: post.status,
      featured_image_url: post.featured_image_url, // Correct field name
      category: post.category, // Correct field name
      read_time: post.read_time ?? 5, // Use actual field or default
      seo_title: post.seo_title ?? post.title,
      seo_description: post.seo_description ?? post.excerpt,
      published_at: post.published_at,
      created_at: post.created_at,
      updated_at: post.updated_at,
    };

    return NextResponse.json(transformedPost);
  } catch (error: any) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
