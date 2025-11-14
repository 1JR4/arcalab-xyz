"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppWindow as WorkstationIcon,
  ShoppingBag as MarketplaceIcon,
  BookOpen as ResourcesIcon,
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
 * Flying Nimbus – Giant Card
 *
 * • Single interactive surface that replaces most top‑nav hopping.
 * • Liquid‑glass aesthetic, keyboard navigation, in‑card trays.
 * • Topics: Marketplace, Workstation, Plans, Resources.
 * • Everything updates in‑place; no page navigation required.
 *
 * Usage:
 *  <GiantCard />
 *
 * Tailwind required. Framer Motion + lucide‑react used for polish.
 */

// Front-card preview mode: keep interactions lightweight
const FRONT_CARD_ONLY = true;

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
    return map[key || ""] || "Marketplace"; // default to Marketplace
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
  card: "relative rounded-3xl border border-white/15 bg-white/8 dark:bg-white/6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
  inner:
    "rounded-2xl border border-white/10 bg-white/6 dark:bg-white/5 backdrop-blur-xl",
  stroke: "ring-1 ring-white/10",
};

// ---------------------------
// Main component
// ---------------------------
export default function GiantCard({ onExpandChange }: { onExpandChange?: (expanded: boolean) => void }) {
  const [topic, setTopic] = useHashTopic();
  const [signedIn] = useState(false); // wire to auth later
  const [expanded, setExpanded] = useState(false);

  // Auto-expand if hash exists in URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("giantcard=")) {
      setExpanded(true);
      onExpandChange?.(true);
    }
  }, []);

  // Notify parent when expanded state changes
  useEffect(() => {
    onExpandChange?.(expanded);
  }, [expanded, onExpandChange]);

  // Handle topic selection - expand card and show content
  const handleTopicSelect = (t: Topic) => {
    setTopic(t);
    setExpanded(true);
  };

  // Handle topic deselection - collapse card
  const handleCollapse = () => {
    setExpanded(false);
    // Clear hash when collapsing
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // keyboard navigation across topics
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!expanded) return; // Only allow navigation when expanded

      const order: Topic[] = [
        "Marketplace",
        "Workstation",
        "Plans",
        "Resources",
      ];
      const idx = order.indexOf(topic);
      if (e.key === "ArrowRight")
        setTopic(order[(idx + 1) % order.length]);
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
        glass.card,
        "w-full px-6 md:px-10 py-6 md:py-8 text-white/95 transition-all duration-500 ease-in-out",
        expanded ? "h-full overflow-y-auto" : ""
      )}
    >
      {/* Header row: product info + topic cards - STAYS ON TOP */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 items-center">
        <header className="flex flex-col justify-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {CONFIG.product.name}{" "}
              <span className="align-super text-sm font-semibold text-yellow-300">
                {CONFIG.product.beta ? "Beta" : null}
              </span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-white/80">
              {CONFIG.product.tagline}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/90 text-slate-900 px-4 py-2 text-sm font-semibold hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/60">
              {PrimaryCTA}
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => handleTopicSelect("Marketplace")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {CONFIG.product.ctaSecondary}
            </button>
          </div>
        </header>

        {/* Topic cards - single row (right) */}
        <TopicGrid
          topic={expanded ? topic : null}
          onSelect={handleTopicSelect}
          expanded={expanded}
        />
      </div>

      {/* Content canvas - appears BELOW header when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden mt-6 md:mt-8"
          >
            <div className="relative">
              <button
                onClick={handleCollapse}
                className="absolute -top-2 right-0 z-10 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15"
              >
                <X size={16} /> Collapse
              </button>
              <AnimatePresence mode="wait">
                {topic === "Marketplace" && (
                  <TopicPane key="marketplace">
                    <MarketplacePane />
                  </TopicPane>
                )}
                {topic === "Workstation" && (
                  <TopicPane key="workstation">
                    <WorkstationPane />
                  </TopicPane>
                )}
                {topic === "Plans" && (
                  <TopicPane key="plans">
                    <PlansPane />
                  </TopicPane>
                )}
                {topic === "Resources" && (
                  <TopicPane key="resources">
                    <ResourcesPane />
                  </TopicPane>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Utility row - only show when expanded */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-white/60"
        >
          <div className="flex items-center gap-3">
            <kbd className="rounded-lg border border-white/20 bg-white/10 px-1.5 py-0.5">
              ←
            </kbd>
            <kbd className="rounded-lg border border-white/20 bg-white/10 px-1.5 py-0.5">
              →
            </kbd>
            <span>to switch topics</span>
            <span className="text-white/40">•</span>
            <kbd className="rounded-lg border border-white/20 bg-white/10 px-1.5 py-0.5">
              ESC
            </kbd>
            <span>to collapse</span>
          </div>
          <div className="flex items-center gap-3">
            <Hash size={16} />
            <span className="truncate">
              Deep link: #giantcard={topic.toLowerCase()}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}

// ---------------------------
// Topic Grid (four cards in single row)
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
      key: "Marketplace",
      label: "Marketplace",
      icon: <MarketplaceIcon size={20} />,
    },
    {
      key: "Workstation",
      label: "Workstation",
      icon: <WorkstationIcon size={20} />,
    },
    { key: "Plans", label: "Plans", icon: <PlansIcon size={20} /> },
    {
      key: "Resources",
      label: "Resources",
      icon: <ResourcesIcon size={20} />,
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
            "rounded-xl px-3 py-4 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-200",
            topic === b.key && expanded
              ? "ring-2 ring-white/50 bg-white/10"
              : ""
          )}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="rounded-lg border border-white/20 bg-white/10 p-2">
              {b.icon}
            </div>
            <span className="text-sm font-semibold">{b.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ---------------------------
// Pane wrapper with motion
// ---------------------------
function TopicPane({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cx(glass.inner, "p-4 md:p-6 rounded-2xl")}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------
// Marketplace Pane
// ---------------------------
function MarketplacePane() {
  const [filter, setFilter] = useState<string | null>(null);
  const tools = useMemo(() => {
    return CONFIG.marketplace.gallery.filter(
      (t) =>
        !filter ||
        t.outcome.toLowerCase().includes(filter.toLowerCase()) ||
        t.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

  return (
    <div className="space-y-6">
      {/* Hero strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CONFIG.marketplace.trending.map((t) => (
          <div
            key={t.id}
            className={cx(
              glass.card,
              "rounded-2xl p-4 border-white/10 bg-white/8"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-semibold">{t.name}</h4>
                <p className="text-sm text-white/70">{t.outcome}</p>
              </div>
              <div className="flex items-center gap-1 text-white/70">
                <Star size={16} className="translate-y-[1px]" />
                <span className="text-sm">{t.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs rounded-full bg-white/10 px-2 py-1 border border-white/15">
                {t.price}
              </span>
              <div className="flex items-center gap-2">
                <TryButton label="Try" />
                <IconButton title="Save to sidebar">
                  <Pin size={16} />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-sm text-white/70">
          <Filter size={16} /> Quick filters
        </span>
        {CONFIG.marketplace.filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f === filter ? null : f)}
            className={cx(
              "rounded-full border px-3 py-1 text-sm",
              filter === f
                ? "border-white/60 bg-white/15"
                : "border-white/20 bg-white/10 hover:bg-white/15"
            )}
          >
            {f}
          </button>
        ))}
        {filter && (
          <button
            onClick={() => setFilter(null)}
            className="text-sm underline underline-offset-4"
          >
            Clear
          </button>
        )}
      </div>

      {/* Discovery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((t) => (
          <div
            key={t.id}
            className={cx(
              "group rounded-xl border border-white/10 bg-white/6 p-4 hover:bg-white/10"
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-semibold">{t.name}</h5>
                <p className="text-sm text-white/70">{t.outcome}</p>
              </div>
              <span className="text-xs rounded-full bg-white/10 px-2 py-1 border border-white/15">
                {t.price}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <TryButton label="Try" />
              <IconButton title="Save">
                <Pin size={16} />
              </IconButton>
            </div>
            {/* Hover micro-demo stub */}
            <div className="mt-3 hidden group-hover:block text-xs text-white/70">
              Preview: input → instant result
            </div>
          </div>
        ))}
      </div>

      {/* Maker strip */}
      <div
        className={cx(
          glass.card,
          "rounded-xl p-4 flex items-center justify-between border-white/10 bg-white/8"
        )}
      >
        <div className="text-sm">
          Have an idea? <span className="text-white">Open Builder</span> to
          ship a tool today.
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg bg-white/90 text-slate-900 px-3 py-1.5 text-sm font-semibold hover:bg-white">
            Open Builder
          </button>
          <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">
            Publishing guide
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Workstation Pane
// ---------------------------
function WorkstationPane() {
  const [pinned, setPinned] = useState(false);
  const sidebar = [
    "Quick Summarizer",
    "Smart Scraper",
    "CSV Cleaner",
    "Repo Reader",
    "Brand Writer",
    "Prompt Shelf",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
      {/* Sidebar preview */}
      <div
        className={cx(
          glass.card,
          "rounded-xl p-3 border-white/10 bg-white/8"
        )}
      >
        <div className="text-xs uppercase tracking-wide text-white/60 mb-2">
          Your sidebar
        </div>
        <ul className="space-y-1">
          {sidebar.map((s, i) => (
            <li
              key={s}
              className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-sm flex items-center justify-between"
            >
              <span className="truncate">
                {i + 1}. {s}
              </span>
              <span className="text-white/50">⋮⋮</span>
            </li>
          ))}
        </ul>
        <button className="mt-2 w-full rounded-lg border border-white/15 bg-white/10 py-2 text-sm hover:bg-white/15 inline-flex items-center justify-center gap-2">
          <Plus size={16} /> Add tool
        </button>
      </div>

      {/* Active app demo */}
      <div
        className={cx(
          glass.card,
          "rounded-xl p-4 border-white/10 bg-white/8"
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Quick Summarizer</h4>
            <p className="text-sm text-white/70">
              One input, one clean result.
            </p>
          </div>
          <BadgeCheck className="text-white/70" />
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-3">
          <div className="min-h-[120px] rounded-lg bg-white/8 border border-white/15 p-3 text-sm text-white/60 flex items-center justify-center">
            This is a static preview. Open the workstation to interact with tools.
          </div>
          <div className="rounded-lg bg-white/5 border border-white/15 p-3 text-sm text-white/80">
            <div className="text-xs uppercase tracking-wide text-white/60 mb-1">
              Result
            </div>
            <p className="leading-relaxed">
              Key points appear here. You can copy, save, or send to another
              app.
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">
            Open workstation (portal)
          </button>
        </div>
        <ul className="mt-4 text-sm text-white/80 grid grid-cols-1 md:grid-cols-3 gap-2">
          <li className="rounded-md bg-white/6 border border-white/10 px-3 py-2">
            Snap‑add from Marketplace
          </li>
          <li className="rounded-md bg-white/6 border border-white/10 px-3 py-2">
            Runs in a focused page
          </li>
          <li className="rounded-md bg-white/6 border border-white/10 px-3 py-2">
            Searchable history
          </li>
        </ul>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-white/90 text-slate-900 px-3 py-1.5 text-sm font-semibold hover:bg-white">
            Open workstation
          </button>
          <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">
            Create workspace
          </button>
          <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">
            Import template
          </button>
        </div>
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
    priceMonthly: string; // display only
    priceAnnual: string; // display only
    accent: string;
  };
  const plans: Plan[] = [
    {
      name: "Free",
      for: "Getting started",
      bullets: ["Use free tools", "Save to sidebar", "Basic history"],
      priceMonthly: "$0",
      priceAnnual: "$0",
      accent: "from-emerald-300/80 to-teal-300/60",
    },
    {
      name: "Premium",
      for: "Builders and teams",
      bullets: ["Build tools", "Private and public", "Advanced history"],
      priceMonthly: "$12",
      priceAnnual: "$10",
      accent: "from-sky-300/80 to-blue-300/60",
    },
    {
      name: "Pro",
      for: "Creators who monetize",
      bullets: ["Monetize", "Unlimited premium usage", "Analytics"],
      priceMonthly: "$24",
      priceAnnual: "$20",
      accent: "from-amber-300/80 to-orange-300/60",
    },
  ];

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/70">Billing</span>
        <div className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 p-1">
          <button
            onClick={() => setAnnual(false)}
            className={cx(
              "px-3 py-1.5 text-sm rounded-lg",
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
              "px-3 py-1.5 text-sm rounded-lg",
              annual
                ? "bg-white/90 text-slate-900 font-semibold"
                : "text-white/80"
            )}
          >
            Annual
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cx(
              "relative overflow-hidden rounded-2xl border border-white/15 bg-white/6 p-4"
            )}
          >
            <div
              className={`pointer-events-none absolute -inset-1 opacity-20 blur-2xl bg-gradient-to-br ${p.accent}`}
            />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{p.name}</h4>
                  <p className="text-sm text-white/70">{p.for}</p>
                </div>
                <DollarSign className="text-white/60" />
              </div>
              <div className="mt-3 text-2xl font-extrabold">
                {annual ? p.priceAnnual : p.priceMonthly}
                <span className="text-base font-medium text-white/60">
                  {" "}
                  {annual ? "/mo, billed yearly" : "/mo"}
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 text-white/80" />
                    <span className="text-white/90">{b}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full rounded-lg bg-white/90 text-slate-900 px-3 py-2 text-sm font-semibold hover:bg-white">
                Choose {p.name}
              </button>
              <button className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">
                Compare details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ micro-accordion */}
      <details className="mt-4 rounded-xl border border-white/10 bg-white/6 p-4">
        <summary className="cursor-pointer text-sm font-semibold">FAQ</summary>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/90">
          {CONFIG.plans.faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-lg border border-white/10 bg-white/6 p-3"
            >
              <div className="font-medium">{f.q}</div>
              <p className="mt-1 text-white/70">{f.a}</p>
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

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CONFIG.resources.map((r) => (
          <button
            key={r.key}
            onClick={() => setTray(r.key)}
            className="h-28 rounded-xl border border-white/10 bg-white/6 p-4 text-left hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <div className="text-lg font-semibold">{r.title}</div>
            <p className="mt-1 text-sm text-white/70 line-clamp-2">
              Open in a tray. You can jump to the full page from there.
            </p>
          </button>
        ))}
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
                "ml-auto w-full max-w-[520px] rounded-l-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-5 relative"
              )}
            >
              <button
                onClick={() => setTray(null)}
                className="absolute right-3 top-3 rounded-lg border border-white/20 bg-white/10 p-1.5 hover:bg-white/15"
              >
                <X size={16} />
              </button>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                {item.body}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <button className="rounded-lg bg-white/90 text-slate-900 px-3 py-1.5 text-sm font-semibold hover:bg-white">
                  Open full page
                </button>
                <button
                  onClick={() => setTray(null)}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15"
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

  // Preview-only mode: show static "Preview" button
  if (FRONT_CARD_ONLY) {
    return (
      <button className="inline-flex items-center gap-2 rounded-lg bg-white/90 text-slate-900 px-3 py-1.5 text-sm font-semibold hover:bg-white">
        <Play size={16} /> Preview
      </button>
    );
  }

  // Interactive mode: original running-state version
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
