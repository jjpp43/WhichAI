"use server";

import { createServerClient } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export interface CreateCommentData {
  postId: string;
  content: string;
  parentId?: string;
}

export async function createComment(data: CreateCommentData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please sign in to comment");
  }

  const supabase = createServerClient();

  const { data: comment, error } = await supabase
    .from("comments")
    .insert({
      post_id: data.postId,
      user_id: user.id,
      parent_id: data.parentId,
      content: data.content,
    })
    .select(
      `
      *,
      profiles!comments_user_id_fkey(full_name, avatar_url)
    `
    )
    .single();

  if (error) throw error;

  revalidatePath(`/blog/${data.postId}`);
  return comment;
}

export async function deleteComment(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please sign in");
  }

  const supabase = createServerClient();

  // Get comment to check ownership
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  // Check if user owns comment or is admin
  if (comment.user_id !== user.id && !user.profile?.is_admin) {
    throw new Error("Unauthorized: You can only delete your own comments");
  }

  const { error } = await supabase.from("comments").delete().eq("id", id);

  if (error) throw error;

  revalidatePath(`/blog/${comment.post_id}`);
}

export async function getComments(postId: string) {
  const supabase = createServerClient();

  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      profiles!comments_user_id_fkey(full_name, avatar_url)
    `
    )
    .eq("post_id", postId)
    .eq("is_approved", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return comments;
}
