"use server";

import { createServerClient } from "@/lib/supabase";
import { getCurrentUser, isAdmin } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export interface CreatePostData {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  tags?: string[];
}

export async function createPost(data: CreatePostData) {
  const user = await getCurrentUser();
  if (!user || !user.profile?.is_admin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const supabase = createServerClient();

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      ...data,
      author_id: user.id,
      tags: data.tags || [],
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  return post;
}

export async function updatePost(id: string, data: Partial<CreatePostData>) {
  const user = await getCurrentUser();
  if (!user || !user.profile?.is_admin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const supabase = createServerClient();

  const { data: post, error } = await supabase
    .from("posts")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  return post;
}

export async function deletePost(id: string) {
  const user = await getCurrentUser();
  if (!user || !user.profile?.is_admin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const supabase = createServerClient();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/blog");
}

export async function publishPost(id: string) {
  const user = await getCurrentUser();
  if (!user || !user.profile?.is_admin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const supabase = createServerClient();

  const { data: post, error } = await supabase
    .from("posts")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return post;
}

export async function getPosts(
  status: "published" | "draft" | "all" = "published"
) {
  const supabase = createServerClient();

  let query = supabase
    .from("posts")
    .select(
      `
      *,
      profiles!posts_author_id_fkey(full_name, avatar_url)
    `
    )
    .order("created_at", { ascending: false });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data: posts, error } = await query;

  if (error) throw error;
  return posts;
}

export async function getPost(slug: string) {
  const supabase = createServerClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles!posts_author_id_fkey(full_name, avatar_url)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return post;
}
