'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AboutUsSectionProps {
    className?: string;
    heroFont?: string;
}

export default function AboutUsSection({ className, heroFont }: AboutUsSectionProps) {
    return (
        <div className={cn("w-full py-12", className)}>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-stretch">
                {/* Image Card - Right Side on Desktop (70% width) */}
                <div className="relative group perspective-1000 lg:col-span-7 order-1 lg:order-2 h-full">
                    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
                        <Image
                            src="/background.png"
                            alt="ARCALAB Team"
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-contain"
                            priority
                            sizes="(max-width: 768px) 100vw, 70vw"
                        />
                        {/* Subtle inner border for premium feel */}
                        <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] pointer-events-none" />
                        {/* Subtle gradient overlay only at very bottom for "grounding" */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                    </div>
                    {/* Decorative element behind */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Text Content - Left Side on Desktop (30% width) */}
                <div className="lg:col-span-3 order-2 lg:order-1 h-full">
                    <div className="glass-card h-full flex flex-col justify-center p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                        {/* Interactive Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10">
                            {/* Heading removed as requested */}

                            <div className="space-y-4 text-white/90 font-light text-base leading-relaxed">
                                <p className="text-white/80">
                                    ARCALAB is my solo studio for AI products & enterprise consultancy.
                                </p>

                                <div className="w-12 h-[1px] bg-white/20 my-4" />

                                <p className="text-white/80 text-sm">
                                    Ex-Product Manager at a streaming giant & B2B startup. Marketer at a top agency.
                                </p>

                                <p className="text-white/80 text-sm">
                                    Check out the projects on the right or read the blog below.
                                </p>

                                <p className="pt-2 text-yellow-500 font-medium italic text-right">
                                    — Wonjae
                                </p>
                            </div>

                            <div className="pt-6 mt-2 flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-yellow-500 tracking-widest uppercase">
                                    Solo Founder
                                </span>
                                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-blue-400 tracking-widest uppercase">
                                    Lead Builder
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
