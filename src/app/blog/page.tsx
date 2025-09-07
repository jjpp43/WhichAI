import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, User, ArrowRight } from "lucide-react";
import { getPublishedBlogPosts } from "@/lib/blog/blog";
import Navigation from "@/components/Navigation";
import DotGrid from "@/components/reactBits/DotGrid/DotGrid";
// Add this import at the top
import { FloatingActionButton } from "@/components/blog/FloatingActionButton";

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

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts(); // This will fetch from Supabase

  return (
    <>
      <div>
        {/* Hero Section */}
        <section
          style={{ width: "100%", height: "600px", position: "relative" }}
        >
          <div className="absolute top-0 w-full z-10">
            <Navigation />
          </div>
          <DotGrid
            dotSize={3}
            gap={20}
            baseColor="#D6CCFF"
            activeColor="#7B5AFF"
            proximity={120}
            shockRadius={200}
            shockStrength={1}
            resistance={750}
            returnDuration={1.5}
          />
          {/* Gradient overlay to fade out only the dot grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-5 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-neutral-900">
                AI Blog & Resources
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 text-center tracking-wide max-w-2xl mb-8">
                Stay ahead with expert analysis, practical tutorials, and the
                latest developments in artificial intelligence and machine
                learning.
              </p>
              <a
                href="#cards"
                className="inline-block px-7 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Read Articles
              </a>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {posts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.featured_image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featured_image_url}
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
                      {/* <span className="text-sm text-neutral-500">•</span>
                      <span className="text-sm text-neutral-500">
                        {post.read_time}
                      </span> */}
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
                          <CalendarDays className="w-4 h-4" />
                          {new Date(
                            post.published_at || post.created_at
                          ).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.read_time} min read
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
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.featured_image_url && (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.featured_image_url}
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
                    {/* <span className="text-xs text-neutral-500">•</span>
                    <span className="text-xs text-neutral-500">
                      {post.read_time}
                    </span> */}
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
                        <CalendarDays className="w-4 h-4" />
                        {new Date(
                          post.published_at || post.created_at
                        ).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.read_time} min read
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
        <FloatingActionButton />
      </div>
    </>
  );
}
