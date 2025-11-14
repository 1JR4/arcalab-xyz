"use client";

import { useState } from "react";
import { Play, Plus, Layout, History, Keyboard, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarApps = [
  { id: "1", name: "Smart Scraper", icon: "🔍" },
  { id: "2", name: "Quick Summarizer", icon: "📝" },
  { id: "3", name: "Code Assistant", icon: "💻" },
  { id: "4", name: "SEO Analyzer", icon: "📊" },
  { id: "5", name: "Email Parser", icon: "✉️" },
  { id: "6", name: "Image Generator", icon: "🎨" },
  { id: "7", name: "CSV Transformer", icon: "📂" },
];

export function WorkstationTopic() {
  const [demoRun, setDemoRun] = useState(false);

  const handleRunSample = () => {
    setDemoRun(true);
    setTimeout(() => setDemoRun(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Workstation Overview */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white">Your Workstation</h3>
        <p className="text-base text-white/70 leading-relaxed">
          Everything runs in a focused page. No heavy setup. Add tools from the marketplace and start working.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sidebar Preview */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Your sidebar</h4>
          <div className={cn(
            "p-5 rounded-2xl bg-white/8 dark:bg-gray-900/20",
            "backdrop-blur-md border-2 border-white/20 dark:border-white/15"
          )}>
            <div className="space-y-2">
              {sidebarApps.map((app, index) => (
                <div
                  key={app.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg",
                    "bg-white/5 dark:bg-gray-900/15 border border-white/10",
                    "hover:bg-white/10 hover:border-white/20 transition-all duration-200",
                    "cursor-grab active:cursor-grabbing group"
                  )}
                >
                  <span className="text-2xl">{app.icon}</span>
                  <span className="text-sm font-medium text-white/90 flex-1">{app.name}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                  </div>
                </div>
              ))}
              <button className={cn(
                "w-full p-3 rounded-lg border-2 border-dashed border-white/20",
                "text-sm font-medium text-white/60",
                "hover:border-white/30 hover:text-white/80 hover:bg-white/5 transition-all",
                "flex items-center justify-center gap-2"
              )}>
                <Plus className="w-4 h-4" />
                Add tool
              </button>
            </div>
          </div>
        </div>

        {/* Active App Demo Panel */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Try it now</h4>
          <div className={cn(
            "p-5 rounded-2xl bg-white/8 dark:bg-gray-900/20",
            "backdrop-blur-md border-2 border-white/20 dark:border-white/15",
            "space-y-4"
          )}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                <span className="text-xl">📝</span>
              </div>
              <div>
                <h5 className="text-base font-bold text-white">Quick Summarizer</h5>
                <p className="text-xs text-white/60">Get instant article summaries</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/70">Input</label>
                <textarea
                  className={cn(
                    "w-full p-3 rounded-lg bg-white/5 dark:bg-gray-900/15",
                    "border border-white/15 text-white text-sm",
                    "placeholder:text-white/40 focus:outline-none focus:border-blue-500/50",
                    "resize-none"
                  )}
                  rows={3}
                  placeholder="Paste article text here..."
                  defaultValue="Artificial Intelligence is revolutionizing how we work. From automating repetitive tasks to providing insights from vast datasets, AI tools are becoming essential for modern productivity..."
                />
              </div>

              <button
                onClick={handleRunSample}
                disabled={demoRun}
                className={cn(
                  "w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500",
                  "text-white text-sm font-semibold",
                  "hover:opacity-90 transition-all shadow-lg shadow-blue-500/20",
                  "flex items-center justify-center gap-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {demoRun ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run sample
                  </>
                )}
              </button>

              {demoRun && (
                <div className={cn(
                  "p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30",
                  "animate-[fadeIn_0.3s_ease-in-out]"
                )}>
                  <p className="text-xs font-medium text-emerald-300 mb-1">✓ Summary generated</p>
                  <p className="text-sm text-white/90 leading-relaxed">
                    AI is transforming productivity by automating tasks and analyzing data, making AI tools essential for modern work.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explainer Section */}
      <div className={cn(
        "p-6 rounded-2xl bg-white/6 dark:bg-gray-900/15",
        "backdrop-blur-sm border border-white/15 dark:border-white/10"
      )}>
        <h4 className="text-lg font-bold text-white mb-4">Everything in one focused page</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Plus className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-1">Snap-add</h5>
              <p className="text-xs text-white/60 leading-relaxed">
                Add tools instantly from the marketplace
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <History className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-1">Unified history</h5>
              <p className="text-xs text-white/60 leading-relaxed">
                All your work saved and searchable
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Keyboard className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-1">Keyboard first</h5>
              <p className="text-xs text-white/60 leading-relaxed">
                Navigate and work at the speed of thought
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2">
          <Layout className="w-5 h-5" />
          Open workstation
        </button>
        <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 text-white font-semibold hover:bg-white/15 transition-all flex items-center gap-2">
          Create workspace
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 text-white font-semibold hover:bg-white/15 transition-all">
          Import template
        </button>
      </div>
    </div>
  );
}
