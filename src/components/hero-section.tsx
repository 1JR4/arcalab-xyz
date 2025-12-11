'use client';

import React from 'react';

interface HeroSectionProps {
    headline?: string;
    subheadline?: string;
    heroFont?: string;
}

export default function HeroSection({ headline = "We build what's next.", subheadline = "Innovating with AI and design.", heroFont }: HeroSectionProps) {
    return (
        <section className="px-6 md:px-16 max-w-[1400px] mx-auto w-full text-center pt-32 pb-12 md:pb-20 relative">
            <h1 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tight leading-[0.9] drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]" style={{ fontFamily: heroFont }}>
                Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500">next thing.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
                {subheadline}
            </p>
        </section>
    );
}
