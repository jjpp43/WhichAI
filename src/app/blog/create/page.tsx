"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { BlogEditor } from "@/components/blog/blogEditor";
import { createBlogPost, generateSlug } from "@/lib/blog/blog";
import { CreateBlogPostData } from "@/types/blog";

export default function CreateBlogPost() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    seo_title: "",
    seo_description: "",
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You need to be logged in to create blog posts.
          </p>
        </div>
      </div>
    );
  }

  const handleSave = async (content: any) => {
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }

    setIsSaving(true);
    try {
      const postData: CreateBlogPostData = {
        title: formData.title,
        slug: generateSlug(formData.title),
        excerpt: formData.excerpt,
        content,
        author_id: user.id,
        status: "draft",
        category: formData.category,
        seo_title: formData.seo_title || formData.title,
        seo_description: formData.seo_description || formData.excerpt,
      };

      const createdPost = await createBlogPost(postData);
      console.log("Draft saved successfully:", createdPost);
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (content: any) => {
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }

    setIsSaving(true);
    try {
      const postData: CreateBlogPostData = {
        title: formData.title,
        slug: generateSlug(formData.title),
        excerpt: formData.excerpt,
        content,
        author_id: user.id,
        status: "published",
        category: formData.category,
        seo_title: formData.seo_title || formData.title,
        seo_description: formData.seo_description || formData.excerpt,
        published_at: new Date().toISOString(),
      };

      const createdPost = await createBlogPost(postData);
      console.log("Post published successfully:", createdPost);
      alert("Post published successfully!");
      router.push("/blog");
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Error publishing post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Create New Blog Post
          </h1>

          {/* Form Fields */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your blog post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Brief description of your post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., AI Tools, Tutorials, News"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={(e) =>
                    setFormData({ ...formData, seo_title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="SEO title (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <input
                  type="text"
                  value={formData.seo_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo_description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="SEO description (optional)"
                />
              </div>
            </div>
          </div>

          {/* Editor */}
          <BlogEditor
            onSave={handleSave}
            onPublish={handlePublish}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
}
