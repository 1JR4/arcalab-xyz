'use client';

import React from 'react';

interface HeroSectionProps {
    headline?: string;
    subheadline?: string;
    heroFont?: string;
}

export default function HeroSection({ headline = "We build what's next.", subheadline = "Innovating with AI and design.", heroFont }: HeroSectionProps) {
    return (
        <section className="px-6 md:px-16 max-w-[1400px] mx-auto w-full text-center py-12 md:py-20 relative">
            <h1 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tight leading-[0.9] drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]" style={{ fontFamily: heroFont }}>
                {headline}
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
                {subheadline}
            </p>
        </section>
    );
}
