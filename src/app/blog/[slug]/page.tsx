import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog/blog";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

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
              {block.data.text}
            </HeaderTag>
          );

        case "paragraph":
          return (
            <p
              key={index}
              className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap break-words"
            >
              {block.data.text}
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
              {block.data.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="text-gray-700 leading-relaxed">
                  {item}
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
                {post.read_time} min read
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
