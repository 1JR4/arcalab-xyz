'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';

interface BlogSectionProps {
    className?: string;
    heroFont?: string;
}

const BLOG_POSTS = [
    {
        id: 1,
        title: "AI Now and Beyond in Consumer Products",
        excerpt: "Exploring how artificial intelligence is reshaping consumer experiences today and the transformative possibilities that lie ahead for product innovation.",
        date: "2025-01-15",
        readTime: "8 min read",
        category: "AI & Innovation",
        thumbnail: "/1.png"
    },
    {
        id: 2,
        title: "How to Survive AI for Enterprise",
        excerpt: "Strategic approaches for enterprise leaders navigating AI adoption, from implementation challenges to organizational transformation and competitive advantage.",
        date: "2025-01-10",
        readTime: "10 min read",
        category: "Enterprise Strategy",
        thumbnail: "/2.png"
    },
    {
        id: 3,
        title: "Reimagining Today's Consumerism",
        excerpt: "A critical look at modern consumer behavior and how technology, sustainability, and changing values are redefining what it means to consume.",
        date: "2025-01-05",
        readTime: "7 min read",
        category: "Consumer Trends",
        thumbnail: "/3.png"
    }
];

export default function BlogSection({ className, heroFont }: BlogSectionProps) {
    return (
        <div className={cn("w-full", className)}>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="group relative flex flex-col h-full rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-[0_0_30px_-10px_rgba(234,179,8,0.2)]"
                    >
                        {/* Thumbnail Image */}
                        <div className="relative h-64 overflow-hidden w-full">
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Gradient Overlay for text readability if overlapped, but nicely fades bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            {/* Floating Category Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-white tracking-wide uppercase">
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 p-8 flex flex-col">
                            {/* Meta Info - Top */}
                            <div className="flex items-center gap-4 text-xs font-mono text-yellow-500/80 mb-4 tracking-wider uppercase">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-yellow-400 transition-colors" style={{ fontFamily: heroFont }}>
                                {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-3">
                                {post.excerpt}
                            </p>

                            {/* "Read Post" Link visual */}
                            <div className="mt-auto flex items-center text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
