import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, User, ArrowLeft, Clock, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/data/blog-posts";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} - AI Tools Hub Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author],
      images: post.image ? [post.image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/20 to-indigo-50/30">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
          {/* Featured Image */}
          {post.image && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          <div className="p-8">
            {/* Meta Information */}
            <div className="flex items-center gap-4 mb-6 text-sm text-neutral-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {new Date(post.publishedDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Share Button */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-neutral-200">
              <button className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                <Share2 className="w-4 h-4" />
                Share Article
              </button>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
