import { supabase } from "@/lib/supabase";
import { BlogPost, CreateBlogPostData } from "@/types/blog";

// Generate URL-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

// Estimate reading time based on content
export function estimateReadTime(content: any): number {
  if (!content || !content.blocks) return 1;

  let wordCount = 0;
  content.blocks.forEach((block: any) => {
    if (block.type === "paragraph" && block.data?.text) {
      wordCount += block.data.text.split(" ").length;
    } else if (block.type === "header" && block.data?.text) {
      wordCount += block.data.text.split(" ").length;
    } else if (block.type === "list" && block.data?.items) {
      block.data.items.forEach((item: any) => {
        // Handle different list item formats
        let itemText = "";
        if (typeof item === "string") {
          itemText = item;
        } else if (typeof item === "object" && item !== null) {
          // Try different possible properties
          itemText = item.content || item.text || item.value || "";
        }

        if (itemText) {
          wordCount += itemText.split(" ").length;
        }
      });
    }
  });

  // Average reading speed: 200 words per minute
  return Math.max(1, Math.ceil(wordCount / 200));
}

// Create a new blog post
export async function createBlogPost(
  postData: CreateBlogPostData
): Promise<BlogPost> {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert([
      {
        ...postData,
        read_time: estimateReadTime(postData.content),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    throw new Error(`Failed to create blog post: ${error.message}`);
  }

  return data;
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }

  return data || [];
}

// Get published blog posts
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching published blog posts:", error);
    throw new Error(`Failed to fetch published blog posts: ${error.message}`);
  }

  return data || [];
}

// Get blog post by slug
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Post not found
    }
    console.error("Error fetching blog post:", error);
    throw new Error(`Failed to fetch blog post: ${error.message}`);
  }

  return data;
}

// Update blog post
export async function updateBlogPost(
  id: string,
  postData: Partial<CreateBlogPostData>
): Promise<BlogPost> {
  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      ...postData,
      read_time: postData.content
        ? estimateReadTime(postData.content)
        : undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    throw new Error(`Failed to update blog post: ${error.message}`);
  }

  return data;
}

// Delete blog post
export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    throw new Error(`Failed to delete blog post: ${error.message}`);
  }
}

// Get user's blog posts (for admin)
export async function getUserBlogPosts(userId: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user blog posts:", error);
    throw new Error(`Failed to fetch user blog posts: ${error.message}`);
  }

  return data || [];
}
