"use client";
import { X } from "lucide-react";

interface CategoryLabelsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryLabels({
  selectedCategory,
  onCategoryChange,
}: CategoryLabelsProps) {
  const toggleCategory = (category: string) => {
    onCategoryChange(selectedCategory === category ? null : category);
  };

  const getCategoryStyles = (category: string) => {
    const isSelected = selectedCategory === category;

    const baseStyles =
      "px-4 py-2 flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer";

    const categoryStyles = {
      Chatbot: isSelected
        ? "bg-blue-600 text-white border border-blue-600 shadow-md"
        : "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200",
      "Image Generation": isSelected
        ? "bg-purple-600 text-white border border-purple-600 shadow-md"
        : "bg-purple-100 text-purple-800 border border-purple-200 hover:bg-purple-200",
      "Video Generation": isSelected
        ? "bg-green-600 text-white border border-green-600 shadow-md"
        : "bg-green-100 text-green-800 border border-green-200 hover:bg-green-200",
      "Writing Assistant": isSelected
        ? "bg-orange-600 text-white border border-orange-600 shadow-md"
        : "bg-orange-100 text-orange-800 border border-orange-200 hover:bg-orange-200",
      Design: isSelected
        ? "bg-pink-600 text-white border border-pink-600 shadow-md"
        : "bg-pink-100 text-pink-800 border border-pink-200 hover:bg-pink-200",
      Coding: isSelected
        ? "bg-teal-600 text-white border border-teal-600 shadow-md"
        : "bg-teal-100 text-teal-800 border border-teal-200 hover:bg-teal-200",
      Audio: isSelected
        ? "bg-yellow-600 text-white border border-yellow-600 shadow-md"
        : "bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200",
      Research: isSelected
        ? "bg-red-600 text-white border border-red-600 shadow-md"
        : "bg-red-100 text-red-800 border border-red-200 hover:bg-red-200",
    };

    return `${baseStyles} ${
      categoryStyles[category as keyof typeof categoryStyles]
    }`;
  };

  // Define the original order of categories
  const originalOrder = [
    "Chatbot",
    "Image Generation",
    "Video Generation",
    "Writing Assistant",
    "Design",
    "Coding",
    "Audio",
    "Research",
    "Automation",
  ];

  // Sort categories: selected first, then unselected (in original order)
  const sortedCategories = [...originalOrder].sort((a, b) => {
    const aSelected = selectedCategory === a;
    const bSelected = selectedCategory === b;

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;

    // If both are unselected, maintain original order
    return originalOrder.indexOf(a) - originalOrder.indexOf(b);
  });

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {sortedCategories.map((category) => (
        <div
          key={category}
          className={getCategoryStyles(category)}
          onClick={() => toggleCategory(category)}
        >
          {category}
          {selectedCategory === category && <X className="w-4 h-4" />}
        </div>
      ))}
    </div>
  );
}
