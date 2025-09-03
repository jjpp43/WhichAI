"use client";
import data from "../data/test.json";
import DotGrid from "@/components/reactBits/DotGrid/DotGrid";
import Navigation from "../components/Navigation";
import CategoryLabels from "../components/CategoryLabels";
import AIToolCard from "../components/AIToolCard";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter data based on selected category
  const filteredData = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start w-full max-w-6xl">
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
                Discover the Best AI Tools
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 text-center tracking-wide max-w-2xl mb-8">
                Your curated directory for the latest and greatest AI-powered
                apps. Find, compare, and explore the future of productivity and
                creativity.
              </p>
              <a
                href="#cards"
                className="inline-block px-7 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Explore Tools
              </a>
            </div>
          </div>
        </section>

        {/* Category Filter Section */}
        <section aria-label="Filter AI tools by category">
          <CategoryLabels
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        {/* AI Tools Grid Section */}
        <section id="cards" aria-label="AI tools directory">
          <h2 className="sr-only">AI Tools Directory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredData.map((item) => (
              <AIToolCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-neutral-600">
          © 2024 AI Tools Hub. All rights reserved.
        </p>
      </footer>

      {/* Structured Data for AI Tools */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AI Tools Directory",
            description:
              "A curated collection of the best AI-powered applications",
            numberOfItems: data.length,
            itemListElement: data.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "SoftwareApplication",
                name: item.name,
                description: item.description,
                url: item.url,
                applicationCategory: item.category,
                dateCreated: item.createdDate,
                dateModified: item.updatedDate,
                offers: {
                  "@type": "Offer",
                  availability: "https://schema.org/InStock",
                },
              },
            })),
          }),
        }}
      />
    </div>
  );
}
