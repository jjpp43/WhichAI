"use client";
import Navigation from "./Navigation";

interface AppLayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
}

export default function AppLayout({
  children,
  showHero = false,
}: AppLayoutProps) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start w-full max-w-6xl">
        {/* Navigation */}
        <div className="w-full mb-8">
          <Navigation />
        </div>

        {/* Hero Section (only on home page) */}
        {showHero && (
          <section
            style={{ width: "100%", height: "600px", position: "relative" }}
            className="mb-8"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-neutral-900">
                  Discover the Best AI Tools
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 text-center tracking-wide max-w-2xl mb-8">
                  Your curated directory for the latest and greatest AI-powered
                  apps. Find, compare, and explore the future of productivity
                  and creativity.
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
        )}

        {/* Page Content */}
        <div className="w-full">{children}</div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-neutral-600">
          © 2024 AI Tools Hub. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
