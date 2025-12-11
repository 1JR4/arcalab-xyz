'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Globe, Plus, ArrowRight, Search, CheckCircle2,
    Terminal, ShoppingBag, Coins, Database, LayoutTemplate, Box,
    Bot, BarChart, Palette, Zap, FileCode, Book, Video, Mic,
    Image as ImageIcon, Calendar, MessageSquare, Users, Shield, Globe as GlobeIcon,
    ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GiantCardV2Props {
    className?: string;
    onExpandChange?: (expanded: boolean) => void;
    projectName?: string;
    tagline?: string;
}

// Feature data for Flying Nimbus Builder side
const builderFeatures = [
    { id: 'monetization', icon: Coins, name: 'Monetization', description: 'Build revenue streams directly into your tools', details: 'Create subscription tiers, one-time purchases, or usage-based pricing. Automatic payment processing through Stripe with instant payouts.', benefits: ['Stripe integration', 'Multiple pricing models', 'Instant payouts', 'Revenue analytics'] },
    { id: 'ai-integration', icon: Sparkles, name: 'AI Integration', description: 'Add powerful AI capabilities to your applications', details: 'Access state-of-the-art AI models including GPT-4, Claude, and custom models. Built-in rate limiting and cost management.', benefits: ['Multiple AI providers', 'Context management', 'Streaming responses', 'Cost optimization'] },
    { id: 'managed-backend', icon: Database, name: 'Managed Backend', description: 'Zero-config database and API infrastructure', details: 'Fully managed PostgreSQL database with automatic backups, scaling, and security. RESTful APIs generated automatically.', benefits: ['Auto-scaling database', 'Automatic backups', 'Built-in auth', 'Global CDN'] },
    { id: 'no-code-studio', icon: LayoutTemplate, name: 'No-Code Studio', description: 'Visual builder for non-developers', details: 'Drag-and-drop interface builder with pre-built components. No coding required - build production-ready apps visually.', benefits: ['Drag & drop builder', 'Pre-built components', 'Real-time preview', 'Export to code'] },
    { id: 'sdk-apis', icon: Box, name: 'SDK & APIs', description: 'Developer-friendly SDKs and REST APIs', details: 'Comprehensive SDKs for JavaScript, Python, Go, and more. Well-documented REST APIs with webhooks and real-time events.', benefits: ['Multi-language SDKs', 'REST & GraphQL', 'Webhook support', 'Real-time updates'] }
];

// Feature data for Flying Nimbus Marketplace side (15 categories)
const marketplaceFeatures = [
    { id: 'ai-assistants', icon: Bot, name: 'AI Assistants', description: 'Intelligent assistants for every workflow', details: 'Discover AI-powered assistants for coding, writing, research, and more. Customizable to your specific needs.' },
    { id: 'data-analytics', icon: BarChart, name: 'Data Analytics', description: 'Powerful analytics and visualization tools', details: 'Turn your data into insights with advanced analytics, beautiful dashboards, and automated reporting.' },
    { id: 'creative-suite', icon: Palette, name: 'Creative Suite', description: 'Design and content creation tools', details: 'Professional-grade tools for graphic design, video editing, and content creation. AI-assisted workflows.' },
    { id: 'productivity', icon: Zap, name: 'Productivity', description: 'Tools to supercharge your workflow', details: 'Task management, automation, note-taking, and collaboration tools. Integrate with your existing workflow.' },
    { id: 'seo-marketing', icon: Search, name: 'SEO & Marketing', description: 'Grow your audience and optimize reach', details: 'SEO optimization, content marketing, social media management, and analytics. AI-powered insights.' },
    { id: 'developer-tools', icon: FileCode, name: 'Developer Tools', description: 'Essential tools for software development', details: 'IDEs, linters, debuggers, and other utilities to streamline your development process.' },
    { id: 'documentation', icon: Book, name: 'Documentation', description: 'Knowledge bases and documentation tools', details: 'Create, host, and manage documentation for your projects and products.' },
    { id: 'video-tools', icon: Video, name: 'Video Tools', description: 'Video editing and processing', details: 'Edit, compress, and transcode videos directly in your browser.' },
    { id: 'audio-tools', icon: Mic, name: 'Audio Tools', description: 'Audio recording and editing', details: 'Record, edit, and enhance audio files. AI-powered noise reduction and transcription.' },
    { id: 'photo-editors', icon: ImageIcon, name: 'Photo Editors', description: 'Image editing and manipulation', details: 'Edit photos, remove backgrounds, and apply filters with ease.' },
    { id: 'scheduling', icon: Calendar, name: 'Scheduling', description: 'Calendar and scheduling tools', details: 'Manage your time, schedule meetings, and organize your calendar.' },
    { id: 'communication', icon: MessageSquare, name: 'Communication', description: 'Chat and messaging tools', details: 'Stay connected with your team and customers through secure messaging.' },
    { id: 'collaboration', icon: Users, name: 'Collaboration', description: 'Team collaboration software', details: 'Work together in real-time on documents, whiteboards, and projects.' },
    { id: 'security-tools', icon: Shield, name: 'Security Tools', description: 'Cybersecurity and privacy tools', details: 'Protect your data and privacy with encryption, VPNs, and security scanners.' },
    { id: 'web-tools', icon: GlobeIcon, name: 'Web Tools', description: 'Utilities for the web', details: 'DNS lookups, ping tests, speed tests, and other web utilities.' }
];

const ITEMS_PER_PAGE = 6;

export default function GiantCardV2({ className, onExpandChange, projectName, tagline }: GiantCardV2Props) {
    // Flying Nimbus state
    const [expandedBuilderFeature, setExpandedBuilderFeature] = useState<string | null>(null);
    const [expandedMarketplaceFeature, setExpandedMarketplaceFeature] = useState<string | null>(null);
    const [marketplacePage, setMarketplacePage] = useState(0);

    const totalMarketplacePages = Math.ceil(marketplaceFeatures.length / ITEMS_PER_PAGE);
    const currentMarketplaceFeatures = marketplaceFeatures.slice(
        marketplacePage * ITEMS_PER_PAGE,
        (marketplacePage + 1) * ITEMS_PER_PAGE
    );

    const nextPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (marketplacePage < totalMarketplacePages - 1) {
            setMarketplacePage(prev => prev + 1);
        }
    };

    const prevPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (marketplacePage > 0) {
            setMarketplacePage(prev => prev - 1);
        }
    };

    // Render Flying Nimbus dual-path card
    if (projectName === "Flying Nimbus") {
        return (
            <div className={cn("w-full", className)}>
                <div className="relative bg-black/30 backdrop-blur-sm border-2 border-white/20 rounded-3xl shadow-2xl overflow-hidden h-[380px]">
                    {/* MAIN SELECTION SCREEN */}
                    <div className="h-full flex flex-col md:flex-row items-stretch">
                        {/* LEFT SIDE (Builder) */}
                        <div className="flex-1 group relative p-6 text-left border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                            {/* Hover Gradient Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 h-full flex flex-col space-y-4">
                                {/* Header Section */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Terminal className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                                        I want to Build Tools
                                    </h2>
                                </div>

                                <p className="text-sm text-white/70">
                                    Access the Workstation & IDE to create, test, and deploy your applications.
                                </p>

                                {/* Content Area - Switches between Grid and Details */}
                                <div className="flex-1 relative mt-2">
                                    <AnimatePresence mode="wait">
                                        {expandedBuilderFeature ? (
                                            <motion.div
                                                key="details"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="absolute inset-0 flex flex-col"
                                            >
                                                {(() => {
                                                    const feature = builderFeatures.find(f => f.id === expandedBuilderFeature);
                                                    if (!feature) return null;
                                                    return (
                                                        <div className="flex flex-col h-full">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setExpandedBuilderFeature(null);
                                                                }}
                                                                className="flex items-center gap-2 text-white/60 hover:text-white mb-4 text-sm"
                                                            >
                                                                <ArrowRight className="w-4 h-4 rotate-180" /> Back to features
                                                            </button>
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                                                    <feature.icon className="w-8 h-8 text-blue-400" />
                                                                </div>
                                                                <h3 className="text-2xl font-bold text-white">{feature.name}</h3>
                                                            </div>
                                                            <p className="text-white/80 text-base mb-6 leading-relaxed">{feature.details}</p>

                                                            {feature.benefits && (
                                                                <div className="grid grid-cols-2 gap-2 mb-6">
                                                                    {feature.benefits.map((benefit, idx) => (
                                                                        <div key={idx} className="flex items-center gap-2 text-sm text-white/70">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                                            {benefit}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            <div className="mt-auto">
                                                                <button
                                                                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
                                                                >
                                                                    Start with {feature.name}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="grid"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="flex flex-wrap gap-4 opacity-80 group-hover:opacity-100 transition-opacity"
                                            >
                                                {builderFeatures.map((feature) => (
                                                    <button
                                                        key={feature.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setExpandedBuilderFeature(feature.id);
                                                        }}
                                                        className="flex flex-col items-center justify-center gap-3 w-36 h-36 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-white/80 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-200 cursor-pointer"
                                                        title={feature.name}
                                                    >
                                                        <feature.icon className="w-8 h-8 text-blue-400" />
                                                        <span className="text-sm font-medium text-center leading-tight px-2">{feature.name}</span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE (Marketplace) */}
                        <div className="flex-1 group relative p-6 text-left overflow-hidden">
                            {/* Hover Gradient Effect */}
                            <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 h-full flex flex-col space-y-4">
                                {/* Header Section */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <ShoppingBag className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                                        I want to Find Tools
                                    </h2>
                                </div>

                                <p className="text-sm text-white/70">
                                    Explore the Marketplace to discover, review, and use community-built tools.
                                </p>

                                {/* Content Area - Switches between Grid and Details */}
                                <div className="flex-1 relative mt-2">
                                    <AnimatePresence mode="wait">
                                        {expandedMarketplaceFeature ? (
                                            <motion.div
                                                key="details"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="absolute inset-0 flex flex-col"
                                            >
                                                {(() => {
                                                    const feature = marketplaceFeatures.find(f => f.id === expandedMarketplaceFeature);
                                                    if (!feature) return null;
                                                    return (
                                                        <div className="flex flex-col h-full">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setExpandedMarketplaceFeature(null);
                                                                }}
                                                                className="flex items-center gap-2 text-white/60 hover:text-white mb-4 text-sm"
                                                            >
                                                                <ArrowRight className="w-4 h-4 rotate-180" /> Back to categories
                                                            </button>
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div className="p-3 bg-cyan-500/20 rounded-lg">
                                                                    <feature.icon className="w-8 h-8 text-cyan-400" />
                                                                </div>
                                                                <h3 className="text-2xl font-bold text-white">{feature.name}</h3>
                                                            </div>
                                                            <p className="text-white/80 text-base mb-6 leading-relaxed">{feature.details}</p>

                                                            <div className="mt-auto">
                                                                <button
                                                                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors"
                                                                >
                                                                    Browse {feature.name}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="grid"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="h-full flex flex-col"
                                            >
                                                <div className="flex flex-wrap gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {currentMarketplaceFeatures.map((feature) => (
                                                        <button
                                                            key={feature.id}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setExpandedMarketplaceFeature(feature.id);
                                                            }}
                                                            className="flex flex-col items-center justify-center gap-3 w-36 h-36 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-white/80 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer"
                                                            title={feature.name}
                                                        >
                                                            <feature.icon className="w-8 h-8 text-cyan-400" />
                                                            <span className="text-sm font-medium text-center leading-tight px-2">{feature.name}</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Pagination Controls */}
                                                <div className="mt-auto flex items-center justify-between px-2 pt-2">
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={marketplacePage === 0}
                                                        className={`p-2 rounded-full transition-colors ${marketplacePage === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
                                                    >
                                                        <ChevronLeft className="w-5 h-5" />
                                                    </button>
                                                    <span className="text-xs text-white/40">
                                                        Page {marketplacePage + 1} of {totalMarketplacePages}
                                                    </span>
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={marketplacePage === totalMarketplacePages - 1}
                                                        className={`p-2 rounded-full transition-colors ${marketplacePage === totalMarketplacePages - 1 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
                                                    >
                                                        <ChevronRight className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render simple informational card for other projects (BitnBolt, Imagen, etc.)
    return (
        <div className={cn("w-full", className)}>
            <div className="relative bg-black/60 backdrop-blur-2xl border-2 border-white/30 rounded-3xl shadow-2xl overflow-hidden h-[380px]">
                {/* Add a subtle gradient overlay for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                <div className="relative h-full flex items-center justify-center p-8 md:p-12">
                    <div className="text-center space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                            {projectName}
                        </h2>
                        {tagline && (
                            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow">
                                {tagline}
                            </p>
                        )}
                        <div className="flex items-center justify-center gap-4 pt-4">
                            <button className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-lg text-lg">
                                Learn More
                            </button>
                            <button className="px-8 py-4 rounded-xl border-2 border-white/40 bg-white/15 text-white font-bold hover:bg-white/25 transition-all text-lg backdrop-blur-sm">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
