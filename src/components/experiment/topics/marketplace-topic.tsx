"use client";

import { useState } from "react";
import { Star, Bookmark, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  id: string;
  name: string;
  outcome: string;
  rating: number;
  price: "Free" | "Premium" | "Pro";
  category: string;
}

const trendingTools: Tool[] = [
  { id: "1", name: "Smart Scraper", outcome: "Turn any page into data", rating: 4.8, price: "Free", category: "Data" },
  { id: "2", name: "Quick Summarizer", outcome: "Get instant article summaries", rating: 4.9, price: "Free", category: "Writing" },
  { id: "3", name: "Code Assistant", outcome: "Write better code faster", rating: 4.7, price: "Premium", category: "Dev Tools" },
];

const discoveryTools: Tool[] = [
  { id: "4", name: "SEO Analyzer", outcome: "Optimize your content for search", rating: 4.6, price: "Free", category: "Writing" },
  { id: "5", name: "Email Parser", outcome: "Extract data from emails automatically", rating: 4.5, price: "Premium", category: "Automation" },
  { id: "6", name: "Image Generator", outcome: "Create stunning visuals with AI", rating: 4.8, price: "Pro", category: "Design" },
  { id: "7", name: "CSV Transformer", outcome: "Clean and transform your data", rating: 4.4, price: "Free", category: "Data" },
  { id: "8", name: "API Builder", outcome: "Build REST APIs in minutes", rating: 4.7, price: "Premium", category: "Dev Tools" },
  { id: "9", name: "Research Assistant", outcome: "Find and summarize research papers", rating: 4.9, price: "Pro", category: "Research" },
];

const categories = ["Automation", "Writing", "Research", "Data", "Design", "Dev Tools"];

export function MarketplaceTopic() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const getPriceColor = (price: string) => {
    switch (price) {
      case "Free":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Premium":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Pro":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Strip - Trending Today */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Trending today</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingTools.map((tool) => (
            <div
              key={tool.id}
              className={cn(
                "p-5 rounded-2xl bg-white/8 dark:bg-gray-900/20",
                "backdrop-blur-md border-2 border-white/20 dark:border-white/15",
                "hover:bg-white/12 hover:border-white/30 transition-all duration-200",
                "group cursor-pointer"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center border border-amber-500/30">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </div>
                <button className="text-white/50 hover:text-amber-400 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              <h4 className="text-base font-bold text-white mb-1">{tool.name}</h4>
              <p className="text-sm text-white/65 mb-3">{tool.outcome}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">{tool.rating}</span>
                </div>
                <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 text-sm font-semibold border border-amber-500/30 hover:from-amber-500/30 hover:to-yellow-500/30 transition-all">
                  Try
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Filter Row */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Filter by category</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter("All")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeFilter === "All"
                ? "bg-white/20 text-white border-2 border-white/40"
                : "bg-white/5 text-white/60 border-2 border-white/10 hover:bg-white/10 hover:text-white/80"
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeFilter === category
                  ? "bg-white/20 text-white border-2 border-white/40"
                  : "bg-white/5 text-white/60 border-2 border-white/10 hover:bg-white/10 hover:text-white/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Discover tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discoveryTools
            .filter((tool) => activeFilter === "All" || tool.category === activeFilter)
            .map((tool) => (
              <div
                key={tool.id}
                className={cn(
                  "p-4 rounded-xl bg-white/6 dark:bg-gray-900/15",
                  "backdrop-blur-sm border border-white/15 dark:border-white/10",
                  "hover:bg-white/10 hover:border-white/25 transition-all duration-200",
                  "group cursor-pointer"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-sm font-bold text-white">{tool.name}</h5>
                  <span className={cn("px-2 py-0.5 text-xs font-semibold rounded border", getPriceColor(tool.price))}>
                    {tool.price}
                  </span>
                </div>
                <p className="text-xs text-white/60 mb-3">{tool.outcome}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-semibold">{tool.rating}</span>
                  </div>
                  <button className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
                    Try
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Build Strip */}
      <div className={cn(
        "p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10",
        "border-2 border-purple-500/20 dark:border-purple-500/15",
        "backdrop-blur-md"
      )}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Turn your idea into a tool</h4>
            <p className="text-sm text-white/70">Build, publish, and earn from your creations.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/20">
              Open Builder
            </button>
            <button className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold hover:bg-white/15 transition-all">
              Publishing guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
