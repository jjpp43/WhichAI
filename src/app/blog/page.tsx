import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, User, ArrowRight } from "lucide-react";
import { getFeaturedPosts, getRegularPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "AI Blog - Latest Insights, Guides, and Tool Reviews",
  description:
    "Stay updated with the latest AI trends, comprehensive guides, and in-depth reviews of AI tools. Expert insights to help you navigate the AI landscape.",
  keywords: [
    "AI blog",
    "artificial intelligence",
    "AI guides",
    "AI tools review",
    "AI trends",
    "machine learning",
    "AI tutorials",
    "AI productivity",
  ],
  openGraph: {
    title: "AI Blog - Latest Insights, Guides, and Tool Reviews",
    description:
      "Stay updated with the latest AI trends, comprehensive guides, and in-depth reviews of AI tools.",
    type: "website",
  },
};

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const regularPosts = getRegularPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/20 to-indigo-50/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">AI Blog</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Stay updated with the latest AI trends, comprehensive guides, and
            in-depth reviews of AI tools.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-neutral-500">•</span>
                      <span className="text-sm text-neutral-500">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {new Date(post.publishedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.image && (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-500">•</span>
                    <span className="text-xs text-neutral-500">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {new Date(post.publishedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
                    >
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
