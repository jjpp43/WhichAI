"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "./ui/card";
import OptimizedLogo from "./OptimizedLogo";

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  createdDate: string;
  updatedDate: string;
  url: string;
}

interface AIToolCardProps {
  item: AITool;
}

export default function AIToolCard({ item }: AIToolCardProps) {
  const getCategoryColor = (category: string) => {
    const categoryColors = {
      Chatbot: "bg-blue-100 text-blue-800 border-blue-200",
      "Image Generation": "bg-purple-100 text-purple-800 border-purple-200",
      "Video Generation": "bg-green-100 text-green-800 border-green-200",
      "Writing Assistant": "bg-orange-100 text-orange-800 border-orange-200",
      Design: "bg-pink-100 text-pink-800 border-pink-200",
      Coding: "bg-teal-100 text-teal-800 border-teal-200",
      Audio: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Research: "bg-red-100 text-red-800 border-red-200",
      Automation: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };

    return (
      categoryColors[category as keyof typeof categoryColors] ||
      "bg-indigo-100 text-indigo-800 border-indigo-200"
    );
  };

  return (
    <article className="group">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-xl"
        aria-label={`Visit ${item.name} - ${item.description}`}
      >
        <Card className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 border border-neutral-100 rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg hover:border-indigo-500 cursor-pointer text-left h-48">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <OptimizedLogo
                serviceName={item.name}
                alt={`${item.name} logo`}
                width={40}
                height={40}
                className="flex-shrink-0"
              />
              <CardTitle className="text-lg font-bold text-neutral-900 group-hover:text-indigo-700 transition-colors">
                {item.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                  item.category
                )}`}
                aria-label={`Category: ${item.category}`}
              >
                {item.category}
              </span>
            </div>
            <div className="text-sm text-neutral-600 mb-2 leading-relaxed">
              {item.description}
            </div>
          </CardContent>
        </Card>
      </a>
    </article>
  );
}
