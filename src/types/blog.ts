export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: any; // Editor.js output
  author_id: string;
  status: "draft" | "published" | "archived";
  featured_image_url?: string;
  category?: string;
  read_time?: number;
  seo_title?: string;
  seo_description?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogImage {
  id: string;
  post_id: string;
  filename: string;
  url: string;
  alt_text?: string;
  caption?: string;
  order_index: number;
  created_at: string;
}

export interface CreateBlogPostData {
  title: string;
  slug: string;
  excerpt?: string;
  content: any;
  status: "draft" | "published";
  author_id: string; // Added this
  featured_image_url?: string;
  category?: string;
  seo_title?: string;
  seo_description?: string;
  published_at?: string; // Added this
}
