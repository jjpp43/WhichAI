"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: any;
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

// Helper function to render text with HTML entities and bold tags
const renderTextWithHTML = (text: string) => {
  if (!text) return "";

  // Decode HTML entities
  const decodedText = text
    .replace(/&nbsp;/g, "\u00A0")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Split by <b> tags and render accordingly
  const parts = decodedText.split(/(<b>.*?<\/b>)/g);

  return parts.map((part, index) => {
    if (part.startsWith("<b>") && part.endsWith("</b>")) {
      const boldText = part.slice(3, -4); // Remove <b> and </b>
      return <b key={index}>{boldText}</b>;
    }
    return part;
  });
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/posts/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Post not found");
          } else {
            setError("Failed to load post");
          }
          return;
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Render Editor.js content
  const renderContent = (content: any) => {
    if (!content || !content.blocks) return null;

    return content.blocks.map((block: any, index: number) => {
      switch (block.type) {
        case "header":
          const HeaderTag =
            `h${block.data.level}` as keyof JSX.IntrinsicElements;
          return (
            <HeaderTag
              key={index}
              className="font-bold text-gray-900 mt-8 mb-4"
            >
              {renderTextWithHTML(block.data.text)}
            </HeaderTag>
          );
        case "bold":
          return (
            <b
              key={index}
              className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap break-words"
            >
              {renderTextWithHTML(block.data.text)}
            </b>
          );

        case "paragraph":
          return (
            <p
              key={index}
              className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap break-words"
            >
              {renderTextWithHTML(block.data.text)}
            </p>
          );

        case "list":
          const ListTag = block.data.style === "ordered" ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={`mb-4 ${
                block.data.style === "ordered" ? "list-decimal" : "list-disc"
              } list-inside`}
            >
              {block.data.items.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="text-gray-700 leading-relaxed">
                  {typeof item === "string"
                    ? item
                    : item.content || item.text || item.value || ""}
                </li>
              ))}
            </ListTag>
          );

        case "image":
          return (
            <div key={index} className="my-8">
              <img
                src={block.data.file.url}
                alt={block.data.caption || ""}
                className="w-full rounded-lg shadow-sm"
              />
              {block.data.caption && (
                <p className="text-sm text-gray-500 text-center mt-2 italic">
                  {block.data.caption}
                </p>
              )}
            </div>
          );

        case "quote":
          return (
            <blockquote
              key={index}
              className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-600"
            >
              <p className="mb-2">{block.data.text}</p>
              {block.data.caption && (
                <cite className="text-sm text-gray-500">
                  — {block.data.caption}
                </cite>
              )}
            </blockquote>
          );

        case "code":
          return (
            <pre
              key={index}
              className="bg-gray-100 rounded-lg p-4 my-6 overflow-x-auto"
            >
              <code className="text-sm text-gray-800">{block.data.code}</code>
            </pre>
          );

        case "table":
          return (
            <div key={index} className="overflow-x-auto my-6">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  {block.data.content[0] && (
                    <tr>
                      {block.data.content[0].map(
                        (cell: string, cellIndex: number) => (
                          <th
                            key={cellIndex}
                            className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
                          >
                            {cell}
                          </th>
                        )
                      )}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {block.data.content
                    .slice(1)
                    .map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex} className="border-b">
                        {row.map((cell: string, cellIndex: number) => (
                          <td
                            key={cellIndex}
                            className="px-4 py-2 text-sm text-gray-700"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          );

        case "warning":
          return (
            <div
              key={index}
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6"
            >
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    {block.data.title}
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{block.data.message}</p>
                  </div>
                </div>
              </div>
            </div>
          );

        case "delimiter":
          return <hr key={index} className="my-8 border-gray-200" />;

        case "embed":
          return (
            <div key={index} className="my-8">
              <div
                dangerouslySetInnerHTML={{ __html: block.data.embed }}
                className="embed-container"
              />
            </div>
          );

        default:
          return null;
      }
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-8"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="w-full min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || "Post Not Found"}
            </h1>
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-sm border p-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                {new Date(
                  post.published_at || post.created_at
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.read_time || 1} min read
              </div>

              {post.category && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.category}
                </div>
              )}
            </div>

            {/* Category Badge */}
            {post.category && (
              <div className="inline-block">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {post.category}
                </span>
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="mb-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>
        </article>
      </div>
    </div>
  );
}
