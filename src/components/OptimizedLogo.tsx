"use client";
import Image from "next/image";
import { useState } from "react";

interface OptimizedLogoProps {
  serviceName: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function OptimizedLogo({
  serviceName,
  alt,
  width = 40,
  height = 40,
  className = "",
}: OptimizedLogoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getLogoPath = (serviceName: string) => {
    // Mapping service names to actual file names
    const logoMapping: Record<string, string> = {
      "ChatGPT": "ChatGPT",
      "Claude": "Claude", 
      "Perplexity": "Perplexity",
      "Midjourney": "Midjourney",
      "Leonardo": "Leonardo",
      "Runway": "Runway",
      "Copy": "Copy",
      "Jasper": "Jasper",
      "GithubCopilot": "GithubCopilot",
      "ElevenLabs": "ElevenLabs",
      "Descript": "Descript",
      "Uizard": "Uizard",
      "Khroma": "Khroma",
      "Galileo": "Galileo",
      "Gemini": "Gemini",
      "Pi": "Pi",
      "Stability": "Stability",
      "Synthesia": "Synthesia",
      "Heygen": "Heygen",
      "GrammarlyGO": "GrammarlyGO",
      "Notion": "Notion",
      "SudoWrite": "Sudowrite",
      "Cursor": "Cursor",
      "ReplitGhostwriter": "ReplitGhostwriter",
      "Codeium": "Codeium",
      "Tabnine": "Tabnine",
      "Voicemod": "Voicemod",
      "Murf": "Murf",
      "Riffusion": "Riffusion",
      "Genei": "Genei",
      "Humata": "Humata",
      "Browse": "Browse",
      "Tome": "Tome",
      "Kaiber": "Kaiber",
      "Pikalabs": "Pikalabs"
    };

    // Use mapping if available, otherwise fall back to original logic
    const fileName = logoMapping[serviceName] || serviceName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    
    return `/api/logos/${fileName}.png`;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    // Fallback: Show first letter of service name in a styled div
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg font-bold text-indigo-700 ${className}`}
        style={{ width, height }}
      >
        {serviceName.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" />
      )}
      <Image
        src={getLogoPath(serviceName)}
        alt={alt || `${serviceName} logo`}
        width={width}
        height={height}
        className={`object-contain transition-opacity duration-200 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleLoad}
        onError={handleError}
        priority={false} // Don't prioritize logos
        sizes={`${width}px`}
      />
    </div>
  );
}
