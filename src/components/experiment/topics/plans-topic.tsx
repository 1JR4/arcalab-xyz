"use client";

import { useState } from "react";
import { Check, Sparkles, TrendingUp, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  for: string;
  price: { monthly: number; annual: number };
  bullets: string[];
  cta: string;
  popular?: boolean;
  icon: any;
}

const plans: Plan[] = [
  {
    name: "Free",
    for: "Getting started",
    price: { monthly: 0, annual: 0 },
    bullets: [
      "Use free tools",
      "Save to sidebar",
      "Basic history",
      "Community support",
    ],
    cta: "Start free",
    icon: Sparkles,
  },
  {
    name: "Premium",
    for: "Builders and teams",
    price: { monthly: 25, annual: 240 },
    bullets: [
      "Build tools (all 3 methods)",
      "Private & public tools",
      "Advanced history",
      "Team sharing",
      "Priority support",
      "100GB storage",
    ],
    cta: "Start Premium",
    popular: true,
    icon: TrendingUp,
  },
  {
    name: "Pro",
    for: "Creators who monetize",
    price: { monthly: 99, annual: 948 },
    bullets: [
      "Everything in Premium",
      "Monetize your tools",
      "Unlimited premium usage",
      "Advanced analytics",
      "Revenue share (70/30)",
      "Dedicated support",
    ],
    cta: "Start Pro",
    icon: Crown,
  },
];

export function PlansTopic() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white">Choose your plan</h3>
        <p className="text-base text-white/70 leading-relaxed">
          Start free and upgrade as you grow. All plans include access to the marketplace.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
            billingCycle === "monthly"
              ? "bg-white/20 text-white border-2 border-white/40"
              : "bg-white/5 text-white/60 border-2 border-white/10 hover:bg-white/10"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle("annual")}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2",
            billingCycle === "annual"
              ? "bg-white/20 text-white border-2 border-white/40"
              : "bg-white/5 text-white/60 border-2 border-white/10 hover:bg-white/10"
          )}
        >
          Annual
          <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
            Save 20%
          </span>
        </button>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const price = billingCycle === "monthly" ? plan.price.monthly : plan.price.annual;
          const priceLabel = billingCycle === "monthly" ? "/mo" : "/yr";

          return (
            <div
              key={plan.name}
              className={cn(
                "relative p-6 rounded-2xl",
                "backdrop-blur-md border-2 transition-all duration-200",
                plan.popular
                  ? "bg-gradient-to-br from-amber-500/15 to-yellow-500/10 border-amber-500/40 shadow-xl shadow-amber-500/10"
                  : "bg-white/8 dark:bg-gray-900/20 border-white/20 dark:border-white/15 hover:border-white/30"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center border",
                      plan.popular
                        ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/30"
                        : "bg-white/10 border-white/20"
                    )}>
                      <Icon className={cn("w-6 h-6", plan.popular ? "text-amber-400" : "text-white/70")} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{plan.name}</h4>
                      <p className="text-xs text-white/60">{plan.for}</p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">${price}</span>
                    <span className="text-sm text-white/60">{priceLabel}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.bullets.map((bullet, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={cn(
                        "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                        plan.popular
                          ? "bg-amber-500/20 border border-amber-500/30"
                          : "bg-white/10 border border-white/20"
                      )}>
                        <Check className={cn("w-3 h-3", plan.popular ? "text-amber-400" : "text-white/70")} />
                      </div>
                      <span className="text-sm text-white/90 leading-tight">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className={cn(
                    "w-full px-6 py-3 rounded-full font-semibold transition-all shadow-lg",
                    plan.popular
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:opacity-90 shadow-amber-500/20"
                      : "bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/15"
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Builder Highlight */}
      <div className={cn(
        "p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10",
        "border-2 border-purple-500/20 dark:border-purple-500/15",
        "backdrop-blur-md"
      )}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Build, publish, get paid</h4>
              <p className="text-sm text-white/70">
                Premium and Pro plans let you monetize your tools. Keep 70% of revenue, paid monthly.
              </p>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 whitespace-nowrap">
            Learn more
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white">Frequently asked questions</h4>
        <div className="space-y-3">
          {[
            { q: "Can I change plans anytime?", a: "Yes, upgrade or downgrade at any time. Changes take effect immediately." },
            { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for annual plans." },
            { q: "How does revenue share work?", a: "You keep 70% of all revenue from your paid tools. Payouts happen monthly via Stripe." },
          ].map((faq, index) => (
            <details
              key={index}
              className={cn(
                "p-4 rounded-xl bg-white/6 dark:bg-gray-900/15",
                "backdrop-blur-sm border border-white/15 dark:border-white/10",
                "group"
              )}
            >
              <summary className="text-sm font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
