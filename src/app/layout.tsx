import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Tools Hub - Discover the Best AI-Powered Applications",
  description:
    "Your curated directory for the latest and greatest AI-powered apps. Find, compare, and explore the future of productivity and creativity with our comprehensive collection of AI tools.",
  keywords: [
    "AI tools",
    "artificial intelligence",
    "AI applications",
    "productivity tools",
    "AI chatbots",
    "image generation",
    "video generation",
    "writing assistant",
    "AI design tools",
    "coding AI",
    "audio AI",
    "analytics AI",
    "machine learning tools",
    "AI directory",
  ],
  authors: [{ name: "AI Tools Hub" }],
  creator: "AI Tools Hub",
  publisher: "AI Tools Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ai-tools-hub.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Tools Hub - Discover the Best AI-Powered Applications",
    description:
      "Your curated directory for the latest and greatest AI-powered apps. Find, compare, and explore the future of productivity and creativity.",
    url: "https://ai-tools-hub.com",
    siteName: "AI Tools Hub",
    images: [
      {
        url: "/og-image.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "AI Tools Hub - Discover the Best AI-Powered Applications",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Hub - Discover the Best AI-Powered Applications",
    description:
      "Your curated directory for the latest and greatest AI-powered apps. Find, compare, and explore the future of productivity and creativity.",
    images: ["/og-image.png"], // Same image as Open Graph
    creator: "@ai_tools_hub", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AI Tools Hub",
              url: "https://ai-tools-hub.com",
              logo: "https://ai-tools-hub.com/logo.png",
              description:
                "Your curated directory for the latest and greatest AI-powered apps",
              sameAs: [
                "https://twitter.com/ai_tools_hub",
                "https://linkedin.com/company/ai-tools-hub",
              ],
            }),
          }}
        />

        {/* Structured Data for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AI Tools Hub",
              url: "https://ai-tools-hub.com",
              description:
                "Your curated directory for the latest and greatest AI-powered apps",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://ai-tools-hub.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
