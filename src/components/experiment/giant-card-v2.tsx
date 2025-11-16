"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppWindow as WorkstationIcon,
  ShoppingBag as MarketplaceIcon,
  BookOpen as ResourcesIcon,
  BookOpen,
  CreditCard as PlansIcon,
  CheckCircle2,
  BadgeCheck,
  ArrowRight,
  Star,
  Plus,
  Play,
  Pin,
  Hash,
  DollarSign,
  Filter,
  X,
} from "lucide-react";

/**
 * Flying Nimbus – Giant Card V2
 *
 * • Single interactive surface that replaces most top‑nav hopping.
 * • Liquid‑glass aesthetic, keyboard navigation, in‑card trays.
 * • Topics: Marketplace, Workstation, Plans, Resources.
 * • Everything updates in‑place; no page navigation required.
 *
 * Usage:
 *  <GiantCardV2 />
 *
 * Tailwind required. Framer Motion + lucide‑react used for polish.
 */

// ---------------------------
// Config (swap with real data)
// ---------------------------
const CONFIG = {
  product: {
    name: "Flying Nimbus",
    beta: true,
    tagline: "Access all your tools and projects in one place.",
    ctaPrimarySignedOut: "Start free",
    ctaPrimarySignedIn: "Open workstation",
    ctaSecondary: "Browse marketplace",
  },
  topics: ["Workstation", "Marketplace", "Plans", "Resources"] as const,
  marketplace: {
    filters: [
      "Automation",
      "Writing",
      "Research",
      "Data",
      "Design",
      "Dev Tools",
    ],
    trending: [
      {
        id: "scraper",
        name: "Smart Scraper",
        outcome: "Turn any page into data",
        price: "Free",
        rating: 4.8,
      },
      {
        id: "summarizer",
        name: "Quick Summarizer",
        outcome: "Digest long docs in seconds",
        price: "Free",
        rating: 4.7,
      },
      {
        id: "sheetmate",
        name: "SheetMate",
        outcome: "Pipe AI into spreadsheets",
        price: "Premium",
        rating: 4.6,
      },
    ],
    gallery: Array.from({ length: 6 }).map((_, i) => ({
      id: `tool-${i + 1}`,
      name: [
        "AutoTagger",
        "Prompt Shelf",
        "CSV Cleaner",
        "Brand Writer",
        "Image Prompt Buddy",
        "Repo Reader",
      ][i],
      outcome: [
        "Label data fast",
        "Save and reuse prompts",
        "Fix messy CSVs",
        "On‑brand copy",
        "Better prompts for art",
        "Understand any repo",
      ][i],
      price: ["Free", "Free", "Premium", "Premium", "Pro", "Free"][i],
      rating: 4.3 + Math.random() * 0.5,
    })),
  },
  plans: {
    faqs: [
      {
        q: "How do payouts work?",
        a: "We issue monthly payouts to Pro builders with revenue over the threshold.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. Downgrades take effect at the next billing date.",
      },
      {
        q: "Do you offer team pricing?",
        a: "Contact us for volume licensing and SSO.",
      },
    ],
  },
  resources: [
    {
      key: "about",
      title: "About",
      body: "We build tools that help anyone create, share, and monetize AI‑powered apps.",
    },
    {
      key: "blog",
      title: "Blog",
      body: "Product notes, customer stories, and hands‑on guides.",
    },
    {
      key: "careers",
      title: "Careers",
      body: "Join a small team shipping big things. Roles in product, design, and infra.",
    },
    {
      key: "contact",
      title: "Contact",
      body: "Reach us at hello@flyingnimbus.app. We usually reply within one business day.",
    },
    {
      key: "docs",
      title: "Docs",
      body: "SDKs, publishing guide, and examples. Start with the Quickstart.",
    },
    {
      key: "changelog",
      title: "Changelog",
      body: "Weekly improvements to marketplace, workstation, and billing.",
    },
  ],
};

type Topic = (typeof CONFIG.topics)[number];

// Utility: tiny classnames combiner
function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function useHashTopic(): [Topic, (t: Topic) => void] {
  const parse = (): Topic => {
    const h = typeof window !== "undefined" ? window.location.hash : "";
    const m = /giantcard=([a-z]+)/i.exec(h || "");
    const key = m?.[1]?.toLowerCase();
    const map: Record<string, Topic> = {
      workstation: "Workstation",
      marketplace: "Marketplace",
      plans: "Plans",
      resources: "Resources",
    };
    return map[key || ""] || "Marketplace"; // default
  };
  const [topic, setTopicState] = useState<Topic>(parse());
  const setTopic = (t: Topic) => {
    setTopicState(t);
    if (typeof window !== "undefined") {
      const slug = t.toLowerCase();
      window.location.hash = `#giantcard=${slug}`;
    }
  };
  useEffect(() => {
    const onHash = () => setTopicState(parse());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [topic, setTopic];
}

// Glass primitives
const glass = {
  card: "relative rounded-3xl border border-white/20 bg-white/15 dark:bg-white/12 backdrop-blur-[0.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
  cardExpanded: "relative rounded-3xl border border-white/25 bg-white/20 dark:bg-white/18 backdrop-blur-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
  inner:
    "rounded-2xl border border-white/10 bg-white/6 dark:bg-white/5 backdrop-blur-[1px]",
  innerExpanded:
    "rounded-2xl border border-white/15 bg-white/10 dark:bg-white/8 backdrop-blur-[12px]",
  stroke: "ring-1 ring-white/10",
};

// ---------------------------
// Main component
// ---------------------------
export default function GiantCardV2({
  onExpandChange,
  projectName,
  tagline,
}: {
  onExpandChange?: (expanded: boolean) => void;
  projectName?: string;
  tagline?: string;
}) {
  const [topic, setTopic] = useHashTopic();
  const [signedIn] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Auto-expand if hash exists in URL
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash.includes("giantcard=")
    ) {
      setExpanded(true);
      onExpandChange?.(true);
    }
  }, []);

  // Notify parent when expanded state changes
  useEffect(() => {
    onExpandChange?.(expanded);
  }, [expanded, onExpandChange]);

  // Handle topic selection
  const handleTopicSelect = (t: Topic) => {
    setTopic(t);
    setExpanded(true);
  };

  // Handle collapse
  const handleCollapse = () => {
    setExpanded(false);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // keyboard navigation across topics
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!expanded) return;

      const order: Topic[] = [
        "Marketplace",
        "Workstation",
        "Plans",
        "Resources",
      ];
      const idx = order.indexOf(topic);
      if (e.key === "ArrowRight") setTopic(order[(idx + 1) % order.length]);
      if (e.key === "ArrowLeft")
        setTopic(order[(idx - 1 + order.length) % order.length]);
      if (e.key.toLowerCase() === "w") setTopic("Workstation");
      if (e.key.toLowerCase() === "m") setTopic("Marketplace");
      if (e.key.toLowerCase() === "p") setTopic("Plans");
      if (e.key.toLowerCase() === "r") setTopic("Resources");
      if (e.key === "Escape") handleCollapse();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [topic, setTopic, expanded]);

  const PrimaryCTA = signedIn
    ? CONFIG.product.ctaPrimarySignedIn
    : CONFIG.product.ctaPrimarySignedOut;

  return (
    <section
      aria-label="Giant Card"
      className={cx(
        expanded ? glass.cardExpanded : glass.card,
        "w-full text-white/95 transition-all duration-[1000ms] ease-in-out",
        expanded ? "h-full overflow-hidden flex flex-col" : "",
        expanded ? "px-6 md:px-10 py-4 md:py-5" : "px-6 md:px-10 py-6 md:py-8"
      )}
    >
      {/* Header row: product info + topic buttons */}
      <div className={cx(
        "grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] items-stretch",
        expanded ? "gap-4" : "gap-6"
      )}>
        <header className={cx(
          "flex flex-col justify-between",
          expanded ? "min-h-0" : "min-h-[220px]"
        )}>
          <div>
            <div className={cx(
              "flex items-center gap-3",
              expanded ? "gap-2" : "gap-4"
            )}>
              {(projectName === "Flying Nimbus" || projectName === CONFIG.product.name || projectName === "BitnBolt") && (
                <Image
                  src={projectName === "BitnBolt" ? "/bitnbolt.svg" : "/fn_logo.svg"}
                  alt={`${projectName} Logo`}
                  width={projectName === "BitnBolt" ? (expanded ? 48 : 64) : (expanded ? 32 : 48)}
                  height={projectName === "BitnBolt" ? (expanded ? 48 : 64) : (expanded ? 32 : 48)}
                  className={cx(
                    "flex-shrink-0",
                    projectName === "BitnBolt"
                      ? (expanded ? "w-12 h-12" : "w-16 h-16")
                      : (expanded ? "w-8 h-8" : "w-12 h-12")
                  )}
                />
              )}
              <h2 className={cx(
                "font-extrabold tracking-tight",
                expanded ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"
              )}>
                {projectName || CONFIG.product.name}{" "}
                <span className="align-super text-base font-semibold text-yellow-300">
                  {CONFIG.product.beta && projectName === CONFIG.product.name ? "Beta" : null}
                </span>
              </h2>
            </div>
            <p className={cx(
              "text-white/80 max-w-xl",
              expanded ? "mt-1 text-sm md:text-base" : "mt-4 text-lg md:text-xl"
            )}>
              {tagline || CONFIG.product.tagline}
            </p>
          </div>

          {/* Buttons - show different ones based on expanded state */}
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.div
                key="collapsed-button"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 mt-6"
              >
                <button
                  onClick={() => handleTopicSelect("Marketplace")}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
                >
                  <span className="font-semibold">Learn More</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="expanded-buttons"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 mt-3"
              >
                <button className="inline-flex items-center gap-2 rounded-xl bg-white/90 text-slate-900 font-semibold hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/60 px-3 py-1.5 text-sm">
                  {PrimaryCTA}
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => handleTopicSelect("Marketplace")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 font-medium hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50 px-3 py-1.5 text-sm"
                >
                  {CONFIG.product.ctaSecondary}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Topic grid (right) */}
        <TopicGrid
          topic={expanded ? topic : null}
          onSelect={handleTopicSelect}
          expanded={expanded}
        />
      </div>

      {/* Content canvas */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-3 flex-1 flex flex-col min-h-0"
          >
            <div className="relative flex-1 flex flex-col min-h-0">
              <button
                onClick={handleCollapse}
                className="absolute -top-2 right-0 z-10 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15"
              >
                <X size={14} /> Collapse
              </button>

              <div className="flex-1 overflow-y-auto min-h-0">
                <AnimatePresence mode="wait">
                  {topic === "Marketplace" && (
                    <TopicPane key="marketplace" expanded={expanded}>
                      <MarketplacePane />
                    </TopicPane>
                  )}
                  {topic === "Workstation" && (
                    <TopicPane key="workstation" expanded={expanded}>
                      <WorkstationPane />
                    </TopicPane>
                  )}
                  {topic === "Plans" && (
                    <TopicPane key="plans" expanded={expanded}>
                      <PlansPane />
                    </TopicPane>
                  )}
                  {topic === "Resources" && (
                    <TopicPane key="resources" expanded={expanded}>
                      <ResourcesPane />
                    </TopicPane>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Utility row */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60"
        >
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-white/20 bg-white/10 px-1 py-0.5 text-[10px]">
              ←
            </kbd>
            <kbd className="rounded border border-white/20 bg-white/10 px-1 py-0.5 text-[10px]">
              →
            </kbd>
            <span className="text-[11px]">switch</span>
            <span className="text-white/40">•</span>
            <kbd className="rounded border border-white/20 bg-white/10 px-1 py-0.5 text-[10px]">
              ESC
            </kbd>
            <span className="text-[11px]">collapse</span>
          </div>
          <div className="flex items-center gap-2">
            <Hash size={12} />
            <span className="truncate text-[11px]">
              #giantcard={topic.toLowerCase()}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}

// ---------------------------
// Topic Grid (four big buttons)
// ---------------------------
function TopicGrid({
  topic,
  onSelect,
  expanded,
}: {
  topic: Topic | null;
  onSelect: (t: Topic) => void;
  expanded: boolean;
}) {
  const buttons: Array<{
    key: Topic;
    label: Topic;
    icon: React.ReactNode;
  }> = [
    {
      key: "Workstation",
      label: "Workstation",
      icon: <WorkstationIcon size={expanded ? 18 : 22} />,
    },
    {
      key: "Marketplace",
      label: "Marketplace",
      icon: <MarketplaceIcon size={expanded ? 18 : 22} />,
    },
    { key: "Plans", label: "Plans", icon: <PlansIcon size={expanded ? 18 : 22} /> },
    {
      key: "Resources",
      label: "Resources",
      icon: <ResourcesIcon size={expanded ? 18 : 22} />,
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {buttons.map((b) => (
        <button
          key={b.key}
          onClick={() => onSelect(b.key)}
          role="tab"
          aria-selected={topic === b.key}
          className={cx(
            glass.inner,
            "rounded-2xl text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all",
            expanded ? "min-h-0 py-2 px-3" : "aspect-square py-4 px-4",
            topic === b.key && expanded ? "ring-2 ring-white/50 bg-white/10" : ""
          )}
        >
          <div className={cx(
            "flex h-full w-full items-center gap-2",
            expanded ? "flex-row justify-start" : "flex-col justify-center"
          )}>
            <div className={cx(
              "rounded-xl border border-white/20 bg-white/10 flex items-center justify-center",
              expanded ? "p-2" : "p-3"
            )}>
              {b.icon}
            </div>
            <span className={cx(
              "font-semibold text-center",
              expanded ? "text-sm" : "text-base"
            )}>{b.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ---------------------------
// Pane wrapper with motion
// ---------------------------
function TopicPane({ children, expanded }: { children: React.ReactNode; expanded: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cx(expanded ? glass.innerExpanded : glass.inner, "p-4 md:p-6 rounded-2xl h-full flex flex-col min-h-0")}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------
// Marketplace Pane (description-first)
// ---------------------------
function MarketplacePane() {
  const buildingMethods = [
    {
      title: "No-Code Builder",
      description: "Visual drag & drop—no coding needed",
      audience: "Non-coders",
      time: "Minutes to publish"
    },
    {
      title: "Vibe Coding",
      description: "Describe what you want, AI writes the code",
      audience: "Idea people",
      time: "Under an hour"
    },
    {
      title: "SDK / Code",
      description: "Full control with our developer SDK",
      audience: "Developers",
      time: "Your timeline"
    }
  ];

  const topBuilders = [
    { name: "Sarah K.", tools: 3, earnings: "$2.4k/mo", badge: "Top Creator" },
    { name: "Marcus T.", tools: 1, earnings: "$890/mo", badge: "Rising Star" },
    { name: "Dev Team", tools: 7, earnings: "$5.1k/mo", badge: "Power Builder" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
      <div className="space-y-3 flex-shrink-0">
        <h3 className="text-2xl md:text-3xl font-bold">
          Build once, earn forever
        </h3>
        <p className="text-base md:text-lg text-white/80 max-w-3xl">
          Create useful tools and start monetizing immediately. Our community rewards builders who solve real problems—whether you code or not.
        </p>
      </div>

      {/* Three ways to build */}
      <div className="space-y-3 mt-4 flex-shrink-0">
          <h4 className="text-base font-semibold flex items-center gap-2">
            <Plus size={16} className="text-white/60" />
            Three ways to build
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {buildingMethods.map((method, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-white/6 p-4 hover:bg-white/10 transition-all cursor-pointer"
              >
                <h5 className="text-base font-semibold mb-2">{method.title}</h5>
                <p className="text-sm text-white/70 mb-3">{method.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">{method.audience}</span>
                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs">
                    {method.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Community & rewards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 flex-1">
        {/* Top builders */}
        <div className="rounded-xl border border-white/10 bg-white/6 p-4 flex flex-col">
          <h4 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Star size={16} className="text-yellow-300" />
            Top builders this month
          </h4>
          <div className="space-y-2 flex-1">
              {topBuilders.map((builder, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-xs font-bold text-slate-900">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{builder.name}</div>
                      <div className="text-xs text-white/60">{builder.tools} tools · {builder.earnings}</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {builder.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick monetization */}
          <div className="rounded-xl border border-white/10 bg-white/6 p-4">
            <h4 className="text-base font-semibold mb-3">How you earn</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <DollarSign size={12} className="mt-0.5 text-emerald-300 flex-shrink-0" />
                <div>
                  <strong>Set your price:</strong>
                  <span className="text-white/70"> Free, one-time, or subscription—you choose</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={12} className="mt-0.5 text-emerald-300 flex-shrink-0" />
                <div>
                  <strong>Instant payouts:</strong>
                  <span className="text-white/70"> Get paid monthly, we handle everything</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Star size={12} className="mt-0.5 text-yellow-300 flex-shrink-0" />
                <div>
                  <strong>Community boost:</strong>
                  <span className="text-white/70"> Top-rated tools get featured and promoted</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BadgeCheck size={12} className="mt-0.5 text-blue-300 flex-shrink-0" />
                <div>
                  <strong>Revenue share:</strong>
                  <span className="text-white/70"> You keep 80%, we take 20% for hosting & support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="flex items-center gap-3 pt-3 flex-shrink-0">
        <button className="rounded-lg bg-white/90 text-slate-900 px-5 py-2 text-sm font-semibold hover:bg-white">
          Start building now
        </button>
        <button className="rounded-lg border border-white/20 bg-white/10 px-5 py-2 text-sm hover:bg-white/15">
          Browse marketplace
        </button>
      </div>
    </div>
  );
}

// ---------------------------
// Workstation Pane (description-first)
// ---------------------------
function WorkstationPane() {
  const toolUseCases = [
    {
      tool: "Smart Scraper",
      useCase: "Extract data from competitor sites into clean spreadsheets",
      benefit: "No code required"
    },
    {
      tool: "Quick Summarizer",
      useCase: "Turn 50-page reports into 5-minute briefs",
      benefit: "Saves hours daily"
    },
    {
      tool: "Brand Writer",
      useCase: "Generate on-brand copy for social, emails, and ads",
      benefit: "Always consistent"
    },
    {
      tool: "Sheet Analyzer",
      useCase: "Ask questions about your data in plain English",
      benefit: "Instant insights"
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
      <div className="space-y-3 flex-shrink-0">
        <h3 className="text-2xl md:text-3xl font-bold">
          One workspace, unlimited tools
        </h3>
        <p className="text-base md:text-lg text-white/80 max-w-3xl">
          Save any tool from the marketplace and access them all in one place. No juggling tabs, no switching apps—just your tools, ready when you need them.
        </p>
      </div>

      {/* Tool use cases showcase */}
      <div className="space-y-3 mt-4 flex-1 flex flex-col min-h-0">
          <h4 className="text-base font-semibold flex items-center gap-2">
            <WorkstationIcon size={16} className="text-white/60" />
            Popular use cases
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {toolUseCases.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-white/6 p-4 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h5 className="text-base font-semibold">{item.tool}</h5>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 flex-shrink-0">
                    {item.benefit}
                  </span>
                </div>
                <p className="text-sm text-white/70">{item.useCase}</p>
              </div>
            ))}
          </div>
        </div>

      {/* Platform benefits */}
      <div className="rounded-xl border border-white/10 bg-white/6 p-4 mt-4 flex-shrink-0">
        <h4 className="text-base font-semibold mb-3">Why tools work better here</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={12} className="mt-0.5 text-blue-300 flex-shrink-0" />
            <div>
              <strong>Chain tools together:</strong>
              <span className="text-white/70"> Scrape data → Analyze → Generate report, all in one flow</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={12} className="mt-0.5 text-blue-300 flex-shrink-0" />
            <div>
              <strong>Shared context:</strong>
              <span className="text-white/70"> Your data stays available across all tools</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={12} className="mt-0.5 text-blue-300 flex-shrink-0" />
            <div>
              <strong>Save workflows:</strong>
              <span className="text-white/70"> Turn multi-step tasks into one-click actions</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <BadgeCheck size={12} className="mt-0.5 text-purple-300 flex-shrink-0" />
            <div>
              <strong>Team collaboration:</strong>
              <span className="text-white/70"> Share tools and outputs with your team (Pro)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-3 flex-shrink-0">
        <button className="rounded-lg bg-white/90 text-slate-900 px-5 py-2 text-sm font-semibold hover:bg-white flex items-center gap-2">
          <Play size={14} />
          Try the workstation
        </button>
        <button className="rounded-lg border border-white/20 bg-white/10 px-5 py-2 text-sm hover:bg-white/15">
          See it in action
        </button>
      </div>
    </div>
  );
}

// ---------------------------
// Plans Pane
// ---------------------------
function PlansPane() {
  const [annual, setAnnual] = useState(true);
  type Plan = {
    name: "Free" | "Premium" | "Pro";
    for: string;
    bullets: string[];
    priceMonthly: string;
    priceAnnual: string;
    accent: string;
  };
  const plans: Plan[] = [
    {
      name: "Free",
      for: "Exploring",
      bullets: ["Free catalog", "Save tools", "Basic history"],
      priceMonthly: "$0",
      priceAnnual: "$0",
      accent: "from-emerald-300/80 to-teal-300/60",
    },
    {
      name: "Premium",
      for: "Building",
      bullets: ["Build tools", "Team sharing", "Adv. history"],
      priceMonthly: "$12",
      priceAnnual: "$10",
      accent: "from-sky-300/80 to-blue-300/60",
    },
    {
      name: "Pro",
      for: "Monetizing",
      bullets: ["Publish paid", "Unlimited use", "Analytics"],
      priceMonthly: "$24",
      priceAnnual: "$20",
      accent: "from-amber-300/80 to-orange-300/60",
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between flex-shrink-0 mb-2">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">
            Choose your plan
          </h3>
          <p className="text-sm md:text-base text-white/80 mt-1">
            Try, build, or monetize. Upgrade anytime.
          </p>
        </div>
        {/* Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">Billing</span>
          <div className="inline-flex items-center rounded-lg border border-white/15 bg-white/10 p-0.5">
            <button
              onClick={() => setAnnual(false)}
              className={cx(
                "px-3 py-1.5 text-sm rounded-md",
                !annual
                  ? "bg-white/90 text-slate-900 font-semibold"
                  : "text-white/80"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cx(
                "px-3 py-1.5 text-sm rounded-md",
                annual
                  ? "bg-white/90 text-slate-900 font-semibold"
                  : "text-white/80"
              )}
            >
              Annual
            </button>
          </div>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 mt-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cx(
              "relative overflow-hidden rounded-xl border border-white/15 bg-white/6 p-5"
            )}
          >
            <div
              className={`pointer-events-none absolute -inset-1 opacity-20 blur-2xl bg-gradient-to-br ${p.accent}`}
            />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-xl font-bold">{p.name}</h4>
                  <p className="text-sm text-white/70 mt-1">{p.for}</p>
                </div>
                <DollarSign size={18} className="text-white/60" />
              </div>
              <div className="text-3xl font-extrabold">
                {annual ? p.priceAnnual : p.priceMonthly}
                <span className="text-sm font-medium text-white/60 ml-1">
                  {annual ? "/mo, yearly" : "/mo"}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-1.5">
                    <CheckCircle2 size={12} className="mt-0.5 text-white/80 flex-shrink-0" />
                    <span className="text-white/90">{b}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-5 w-full rounded-lg bg-white/90 text-slate-900 px-4 py-2.5 text-sm font-semibold hover:bg-white transition-all">
                Choose {p.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ micro-accordion */}
      <details className="mt-3 rounded-lg border border-white/10 bg-white/6 p-3">
        <summary className="cursor-pointer text-sm font-semibold">Frequently Asked Questions</summary>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-white/90">
          {CONFIG.plans.faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-md border border-white/10 bg-white/6 p-3"
            >
              <div className="font-medium text-sm">{f.q}</div>
              <p className="mt-1 text-white/70 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

// ---------------------------
// Resources Pane (with in‑card tray)
// ---------------------------
function ResourcesPane() {
  const [tray, setTray] = useState<string | null>(null);
  const item = CONFIG.resources.find((r) => r.key === tray);

  const resourceSections = [
    {
      title: "Learn & Build",
      items: CONFIG.resources.filter(r => ["docs", "blog"].includes(r.key))
    },
    {
      title: "Company",
      items: CONFIG.resources.filter(r => ["about", "careers", "changelog"].includes(r.key))
    },
    {
      title: "Support",
      items: CONFIG.resources.filter(r => ["contact"].includes(r.key))
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
      <div className="space-y-3 flex-shrink-0">
        <h3 className="text-2xl md:text-3xl font-bold">
          Everything you need to get started
        </h3>
        <p className="text-base md:text-lg text-white/80 max-w-3xl">
          Documentation, guides, product updates, and support—all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 flex-1">
          {resourceSections.map((section) => (
            <div key={section.title} className="rounded-xl border border-white/10 bg-white/6 p-4">
              <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
                {section.title}
              </h4>
              <div className="space-y-2">
                {section.items.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setTray(r.key)}
                    className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium">{r.title}</span>
                      <ArrowRight size={14} className="text-white/60 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-sm text-white/70 mt-1 line-clamp-1">{r.body}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      {/* Quick stats or social proof */}
      <div className="flex items-center gap-6 pt-3 text-sm text-white/70 flex-shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen size={16} />
          <span>Comprehensive docs</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Weekly updates</span>
        </div>
        <div className="flex items-center gap-2">
          <Star size={16} />
          <span>1-day support response</span>
        </div>
      </div>

      <AnimatePresence>
        {tray && item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-stretch"
          >
            {/* Dimmer inside the card only */}
            <div className="absolute inset-0 rounded-2xl bg-black/30" />

            <motion.aside
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cx(
                "ml-auto w-full max-w-[400px] rounded-l-xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 relative"
              )}
            >
              <button
                onClick={() => setTray(null)}
                className="absolute right-2 top-2 rounded-lg border border-white/20 bg-white/10 p-1 hover:bg-white/15"
              >
                <X size={14} />
              </button>
              <h4 className="text-base font-semibold">{item.title}</h4>
              <p className="mt-2 text-xs text-white/80 leading-relaxed">
                {item.body}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button className="rounded-lg bg-white/90 text-slate-900 px-3 py-1 text-xs font-semibold hover:bg-white">
                  Open full page
                </button>
                <button
                  onClick={() => setTray(null)}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs hover:bg-white/15"
                >
                  Close
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------
// Tiny UI helpers
// ---------------------------
function TryButton({ label }: { label: string }) {
  const [running, setRunning] = useState(false);
  return (
    <button
      onClick={() => {
        if (running) return;
        setRunning(true);
        setTimeout(() => setRunning(false), 900);
      }}
      className={cx(
        "inline-flex items-center gap-2 rounded-lg bg-white/90 text-slate-900 px-3 py-1.5 text-sm font-semibold hover:bg-white",
        running && "opacity-80"
      )}
    >
      <Play size={16} /> {running ? "Running…" : label}
    </button>
  );
}

function IconButton({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      title={title}
      className="rounded-lg border border-white/20 bg-white/10 p-1.5 hover:bg-white/15"
    >
      {children}
    </button>
  );
}
