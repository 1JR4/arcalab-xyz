/**
 * Liquid Glass Design System
 *
 * Centralized utilities and configurations for glassmorphism/liquid glass UI
 * Uses CSS variables from globals.css for consistent theming across portal
 */

import { cn } from "@/lib/utils";

/**
 * Glass intensity levels for different UI components
 */
export type GlassIntensity = "light" | "medium" | "heavy" | "ultra";

/**
 * Glass component variants
 */
export type GlassVariant = "card" | "sidebar" | "header" | "button" | "overlay";

/**
 * Background animation types
 */
export type AnimationType = "particles" | "waves" | "matrix" | "stars" | "geometric" | "aurora" | "none";

/**
 * Color theme for glass effects
 */
export type ColorTheme = "default" | "blue" | "purple" | "green" | "amber" | "cyan" | "trading";

/**
 * Glass effect configuration
 */
export interface GlassConfig {
  intensity: GlassIntensity;
  variant: GlassVariant;
  theme?: ColorTheme;
  hover?: boolean;
  border?: boolean;
}

/**
 * Get glass effect classes based on configuration
 * Uses CSS variables for consistent theming
 */
export function getGlassClasses(config: GlassConfig): string {
  const { intensity, variant, hover = false, border = true } = config;

  // Map intensity to glass class
  const glassIntensityMap: Record<GlassIntensity, string> = {
    light: "glass-light",
    medium: "glass-medium",
    heavy: "glass-heavy",
    ultra: "glass-ultra"
  };

  // Get base intensity class
  const intensityClass = glassIntensityMap[intensity];

  // Add variant-specific shadow
  let shadowClass = "";
  switch (variant) {
    case "sidebar":
      shadowClass = "shadow-2xl";
      break;
    case "header":
      shadowClass = "shadow-lg";
      break;
    case "card":
      shadowClass = "shadow-xl";
      break;
    case "button":
      shadowClass = "shadow-md";
      break;
    case "overlay":
      shadowClass = "shadow-2xl";
      break;
  }

  // Add hover effect if requested
  const hoverClass = hover ? "hover:scale-[1.02] transition-portal" : "transition-portal";

  // Border class
  const borderClass = border ? "border" : "border-0";

  return cn(intensityClass, shadowClass, borderClass, hoverClass);
}

/**
 * Get color theme classes
 */
export function getThemeColors(theme: ColorTheme = "default") {
  switch (theme) {
    case "blue":
      return {
        primary: "from-blue-500 to-cyan-500",
        accent: "text-blue-500",
        border: "border-blue-500/40",
        glow: "shadow-blue-500/20",
        bg: "bg-blue-500/10",
        hover: "hover:bg-blue-500/20"
      };
    case "purple":
      return {
        primary: "from-purple-500 to-pink-500",
        accent: "text-purple-500",
        border: "border-purple-500/40",
        glow: "shadow-purple-500/20",
        bg: "bg-purple-500/10",
        hover: "hover:bg-purple-500/20"
      };
    case "green":
      return {
        primary: "from-emerald-500 to-teal-500",
        accent: "text-emerald-500",
        border: "border-emerald-500/40",
        glow: "shadow-emerald-500/20",
        bg: "bg-emerald-500/10",
        hover: "hover:bg-emerald-500/20"
      };
    case "amber":
      return {
        primary: "from-amber-500 to-yellow-500",
        accent: "text-amber-500",
        border: "border-amber-500/40",
        glow: "shadow-amber-500/20",
        bg: "bg-amber-500/10",
        hover: "hover:bg-amber-500/20"
      };
    case "cyan":
      return {
        primary: "from-cyan-500 to-blue-500",
        accent: "text-cyan-500",
        border: "border-cyan-500/40",
        glow: "shadow-cyan-500/20",
        bg: "bg-cyan-500/10",
        hover: "hover:bg-cyan-500/20"
      };
    case "trading":
      return {
        primary: "from-[#00E6CA] to-[#00D084]", // Teal to green gradient
        accent: "trading-accent",                 // Uses utility class
        border: "border-trading-accent/40",       // Teal border
        glow: "shadow-[#00E6CA]/20",             // Teal glow
        bg: "bg-trading-accent/10",              // Subtle teal background
        hover: "hover:bg-trading-accent/20",     // Hover teal
        // Trading-specific colors
        buy: "trading-buy",                       // Green
        sell: "trading-sell",                     // Red
        buyBg: "bg-trading-buy",
        sellBg: "bg-trading-sell",
        buyBorder: "border-trading-buy",
        sellBorder: "border-trading-sell"
      };
    default:
      return {
        primary: "from-primary to-primary/80",
        accent: "text-primary",
        border: "border-primary/40",
        glow: "glow-primary",
        bg: "bg-primary/10",
        hover: "hover:bg-primary/20"
      };
  }
}

/**
 * Get accent gradient for color theme
 */
export function getAccentGradient(theme: ColorTheme = "default"): string {
  return getThemeColors(theme).primary;
}

/**
 * Liquid glass button variants using CSS variables
 */
export function getLiquidButtonClasses(
  variant: "primary" | "secondary" | "ghost" = "primary",
  theme: ColorTheme = "default",
  rounded: "sharp" | "rounded" | "pill" = "rounded"
): string {
  const roundedClass = rounded === "pill" ? "rounded-full" : rounded === "sharp" ? "rounded-none" : "rounded-lg";
  const themeColors = getThemeColors(theme);

  switch (variant) {
    case "primary":
      return cn(
        roundedClass,
        "backdrop-blur-md bg-gradient-to-r",
        themeColors.primary,
        "text-white font-medium",
        "hover:opacity-90 transition-portal",
        "shadow-lg",
        themeColors.glow
      );
    case "secondary":
      return cn(
        roundedClass,
        "glass-light",
        "border-2",
        themeColors.border,
        themeColors.accent,
        themeColors.hover,
        "transition-portal"
      );
    case "ghost":
      return cn(
        roundedClass,
        "glass-light border-0",
        themeColors.accent,
        themeColors.hover,
        "transition-portal-fast"
      );
  }
}

/**
 * Liquid glass card classes using CSS variables
 */
export function getLiquidCardClasses(
  intensity: GlassIntensity = "medium",
  hover: boolean = true,
  theme?: ColorTheme
): string {
  const baseClasses = getGlassClasses({ intensity, variant: "card", hover, border: true });
  const roundedClass = "rounded-2xl";
  const animateClass = "transition-portal";
  const hoverScale = hover ? "hover:scale-[1.02]" : "";

  return cn(baseClasses, roundedClass, animateClass, hoverScale);
}

/**
 * Liquid glass divider (used in nav bars)
 */
export function getLiquidDividerClasses(): string {
  return "h-6 w-px glass-divider";
}

/**
 * Liquid glass overlay for backgrounds
 */
export function getLiquidOverlayClasses(opacity: number = 20): string {
  return cn(
    "absolute inset-0",
    "glass-medium"
  );
}

/**
 * Animation speed configuration
 */
export const ANIMATION_SPEEDS = {
  slow: 0.5,
  normal: 1,
  fast: 2,
  veryFast: 3
} as const;

/**
 * Glass effect presets for common use cases
 */
export const GLASS_PRESETS = {
  card: { intensity: "medium" as GlassIntensity, variant: "card" as GlassVariant, hover: true },
  sidebar: { intensity: "heavy" as GlassIntensity, variant: "sidebar" as GlassVariant, hover: false },
  header: { intensity: "medium" as GlassIntensity, variant: "header" as GlassVariant, hover: false },
  button: { intensity: "light" as GlassIntensity, variant: "button" as GlassVariant, hover: true },
  modal: { intensity: "ultra" as GlassIntensity, variant: "overlay" as GlassVariant, hover: false }
} as const;

/**
 * Trading-specific button variants (Kraken-inspired)
 * Large, prominent CTAs with clear buy/sell distinction
 */
export function getTradingButtonClasses(
  variant: "buy" | "sell" | "primary" | "secondary" = "primary",
  size: "sm" | "md" | "lg" = "md"
): string {
  // Size classes
  const sizeClasses = {
    sm: "h-10 px-4 text-sm font-semibold",
    md: "h-12 px-6 text-base font-semibold",
    lg: "h-14 px-8 text-lg font-bold"
  };

  const baseClasses = cn(
    "rounded-lg", // Less rounded than standard buttons
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    sizeClasses[size]
  );

  switch (variant) {
    case "buy":
      return cn(
        baseClasses,
        "bg-trading-buy text-white",
        "hover:brightness-110",
        "focus:ring-[#00D084]",
        "shadow-lg shadow-[#00D084]/25"
      );
    case "sell":
      return cn(
        baseClasses,
        "bg-trading-sell text-white",
        "hover:brightness-110",
        "focus:ring-[#F85149]",
        "shadow-lg shadow-[#F85149]/25"
      );
    case "primary":
      return cn(
        baseClasses,
        "bg-trading-accent text-white",
        "hover:brightness-110",
        "focus:ring-[#00E6CA]",
        "shadow-lg shadow-[#00E6CA]/25"
      );
    case "secondary":
      return cn(
        baseClasses,
        "bg-transparent border-2 border-trading-accent",
        "trading-accent",
        "hover:bg-trading-accent/10",
        "focus:ring-[#00E6CA]"
      );
  }
}

/**
 * Trading card classes - flat design with subtle shadows
 */
export function getTradingCardClasses(hover: boolean = true): string {
  return cn(
    "trading-card",
    "p-6",
    hover ? "cursor-pointer" : ""
  );
}

/**
 * Portal spacing system
 */
export const PORTAL_SPACING = {
  section: "py-24",
  sectionMd: "py-16",
  sectionSm: "py-12",
  cardLg: "p-8",
  cardMd: "p-6",
  cardSm: "p-4",
  gapLg: "gap-6",
  gapMd: "gap-4",
  gapSm: "gap-2"
} as const;

/**
 * Portal border radius system
 */
export const PORTAL_RADIUS = {
  card: "rounded-2xl",
  button: "rounded-lg",
  pill: "rounded-full",
  input: "rounded-md"
} as const;
