'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, X, ChevronLeft, ChevronRight, Calendar, Mail, ArrowLeft, Sparkles } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

import CalendarScheduler from '@/components/calendar-scheduler'
import AboutUsSection from '@/components/about-us-section'
import BlogSection from '@/components/blog-section'
import HeroSection from '@/components/hero-section'

// Wrapper to match old theme provider API
function useThemeWithToggle() {
    const { theme, setTheme } = useTheme()
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
    return { theme, toggleTheme, setTheme }
}

const FONT_OPTIONS = [
    // Sans-Serif
    { name: 'Inter', value: 'Inter, sans-serif', category: 'Sans-Serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif', category: 'Sans-Serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', category: 'Sans-Serif' },
    { name: 'Raleway', value: 'Raleway, sans-serif', category: 'Sans-Serif' },
    { name: 'Work Sans', value: 'Work Sans, sans-serif', category: 'Sans-Serif' },
    { name: 'DM Sans', value: 'DM Sans, sans-serif', category: 'Sans-Serif' },

    // Serif
    { name: 'Playfair Display', value: 'Playfair Display, serif', category: 'Serif' },
    { name: 'Merriweather', value: 'Merriweather, serif', category: 'Serif' },
    { name: 'Lora', value: 'Lora, serif', category: 'Serif' },
    { name: 'Crimson Pro', value: 'Crimson Pro, serif', category: 'Serif' },
    { name: 'EB Garamond', value: 'EB Garamond, serif', category: 'Serif' },
    { name: 'Cormorant', value: 'Cormorant, serif', category: 'Serif' },

    // Display
    { name: 'Bebas Neue', value: 'Bebas Neue, sans-serif', category: 'Display' },
    { name: 'Orbitron', value: 'Orbitron, sans-serif', category: 'Display' },
    { name: 'Space Grotesk', value: 'Space Grotesk, sans-serif', category: 'Display' },
    { name: 'Righteous', value: 'Righteous, sans-serif', category: 'Display' },
    { name: 'Russo One', value: 'Russo One, sans-serif', category: 'Display' },
    { name: 'Anton', value: 'Anton, sans-serif', category: 'Display' },

    // Script
    { name: 'Pacifico', value: 'Pacifico, cursive', category: 'Script' },
    { name: 'Dancing Script', value: 'Dancing Script, cursive', category: 'Script' },
    { name: 'Great Vibes', value: 'Great Vibes, cursive', category: 'Script' },
    { name: 'Satisfy', value: 'Satisfy, cursive', category: 'Script' },
    { name: 'Caveat', value: 'Caveat, cursive', category: 'Script' },
]

// Slide data - each slide represents a different project
const SLIDES = [
    {
        id: 1,
        projectName: "Flying Nimbus",
        tagline: "Access all your tools and projects in one place.",
        heroTitle1: "Dream Big (or small)",
        heroTitle2: "Build fast, go far.",
        heroSubtitle: "AI-Powered Workstation for everyone",
        bgImages: ["/website_light.png"],
        useGradient: false,
        logo: "/fn_logo.svg"
    },
    {
        id: 2,
        projectName: "BitnBolt",
        tagline: "Build and manage websites through conversation.",
        heroTitle1: "Build and Manage Websites",
        heroTitle2: "by just thinking about it",
        heroSubtitle: "Conversational website builder and manager",
        bgImages: ["/bitnbolt.png"],
        useGradient: false,
        logo: "/bitnbolt.svg"
    },
    {
        id: 5,
        projectName: "Arcadion",
        tagline: "No-PM OS: The end of manual project management.",
        heroTitle1: "No-PM OS",
        heroTitle2: "AgentOps Map",
        heroSubtitle: "Turns your architecture into a living map. AI agents coordinate status, risks, and dependencies.",
        bgColor: "from-orange-900/50 to-amber-900/50",
        useGradient: true,
        comingSoon: true
    },
    {
        id: 3,
        projectName: "Mitgosa",
        tagline: "AI-powered stock trading recommendations.",
        heroTitle1: "Smart Trading Insights",
        heroTitle2: "Powered by AI",
        heroSubtitle: "Stock trading recommendation engine",
        bgColor: "from-emerald-900/50 to-teal-900/50",
        useGradient: true,
        comingSoon: true,
        logo: "/arca.png"
    },
    {
        id: 4,
        projectName: "Lumambo",
        tagline: "Discover insights about your personality.",
        heroTitle1: "Know Yourself",
        heroTitle2: "Unlock Your Potential",
        heroSubtitle: "Personality insight app for consumers",
        bgColor: "from-purple-900/50 to-pink-900/50",
        useGradient: true,
        comingSoon: true
    },
]

export default function DesignExperimentPage() {
    const { theme, toggleTheme } = useThemeWithToggle()
    const [showFontPanel, setShowFontPanel] = useState(false)
    const [showContactModal, setShowContactModal] = useState(false)
    const [contactOption, setContactOption] = useState<'calendar' | 'form' | null>(null)
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [brandFont, setBrandFont] = useState('Raleway, sans-serif')
    const [heroFont, setHeroFont] = useState('EB Garamond, serif')
    const [currentSlide, setCurrentSlide] = useState(0)
    const [mgcDescText, setMgcDescText] = useState('Click to explore interactive features')
    const [mgcDescPlacement, setMgcDescPlacement] = useState<'above-mgc' | 'on-mgc' | 'next-to-brand' | 'below-brand' | 'none'>('none')
    const [mgcHeadline, setMgcHeadline] = useState('Products')
    const [showMgcHeadline, setShowMgcHeadline] = useState(true)
    const [showProductsModal, setShowProductsModal] = useState(false)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
    }


    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Thank you for your message! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setContactOption(null)
    }

    const currentSlideData = SLIDES[currentSlide];

    return (
        <React.Fragment>
            <div className="fixed inset-0 z-[100] pointer-events-none p-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 text-xs font-semibold text-yellow-500">
                    <Sparkles className="w-3 h-3" />
                    <span>Design Playground Mode</span>
                </div>
            </div>


            {/* Black background */}
            <div className="fixed inset-0 bg-black" style={{ zIndex: -10 }} />

            {/* Background Ambience from Original Experiment */}
            <div className="fixed inset-0 z-[-5] overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("/noise.png")' }}></div>
            </div>




            {/* Navigation - stays on top */}
            <nav className="navigation">
                <div className="nav-content">
                    {/* Logo and Brand */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/arcalab.png"
                                alt="ARCALAB Logo"
                                width={53}
                                height={53}
                                className="w-[53px] h-[53px]"
                            />
                            <span className="text-2xl font-bold text-white" style={{ fontFamily: brandFont }}>ARCALAB</span>
                            {mgcDescPlacement === 'next-to-brand' && (
                                <span className="text-xs text-white/70 ml-2 italic">{mgcDescText}</span>
                            )}
                        </div>
                        {mgcDescPlacement === 'below-brand' && (
                            <span className="text-xs text-white/70 italic ml-16">{mgcDescText}</span>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowProductsModal(true)}
                            className="text-sm font-medium text-white hover:text-yellow-500 transition-colors"
                        >
                            Products
                        </button>
                        <Link href="/blog" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">
                            Blog
                        </Link>
                        <button
                            onClick={() => setShowContactModal(true)}
                            className="text-sm font-medium text-white hover:text-yellow-500 transition-colors"
                        >
                            Contact
                        </button>
                        <div className="w-px h-4 bg-white/20 mx-2" />
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-yellow-400 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </nav>


            {/* STUDIO HERO / MANIFESTO */}
            <HeroSection heroFont={heroFont} headline="We build what's next." subheadline="Innovating with AI and design." />

            {/* Scrollable content container */}
            <div className="relative min-h-screen pt-24 pb-20 space-y-32">
                {/* Content Sections Container */}
                <div className="px-6 md:px-16 max-w-[1400px] mx-auto w-full space-y-32">
                    {/* Products Section */}
                    <div className="space-y-8">
                        {/* Headline */}
                        {showMgcHeadline && (
                            <div className="">
                                <h2 className="text-5xl md:text-6xl font-bold text-white relative inline-block z-10" style={{ fontFamily: heroFont }}>
                                    {mgcHeadline}
                                    <div className="absolute -bottom-2 left-0 w-1/3 h-2 bg-yellow-500 rounded-full" />
                                </h2>
                            </div>
                        )}

                        {/* Mega Giant Card (MGC) Container - Solid Card */}
                        <div className="relative group">

                            {/* Navigation Buttons - Outside MGC */}
                            <button
                                onClick={prevSlide}
                                className="absolute -left-12 md:-left-20 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full glass-card hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 shadow-2xl group border border-white/10 text-white/50 hover:text-white"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute -right-12 md:-right-20 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full glass-card hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 shadow-2xl group border border-white/10 text-white/50 hover:text-white"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>

                            <div className="relative h-[60vh] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">

                                {mgcDescPlacement === 'above-mgc' && (
                                    <div className="absolute -top-12 left-0 right-0 text-center z-20">
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-sm font-medium text-yellow-400 italic px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-yellow-500/30 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                                        >
                                            <Sparkles className="w-3 h-3 animate-pulse" />
                                            {mgcDescText}
                                        </motion.span>
                                    </div>
                                )}

                                {/* View All Products Button - Top Right of MGC */}
                                <div className="absolute top-6 right-8 z-50">
                                    <button
                                        onClick={() => setShowProductsModal(true)}
                                        className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white hover:bg-white/20 transition-all hover:scale-105 flex items-center gap-2"
                                    >
                                        <span>View All Products</span>
                                        <ArrowLeft className="w-3 h-3 rotate-180" />
                                    </button>
                                </div>

                                {/* Slide Indicators */}
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                                    {SLIDES.map((slide, index) => (
                                        <button
                                            key={slide.id}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide
                                                ? 'w-8 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]'
                                                : 'w-1.5 bg-white/30 hover:bg-white/60 hover:w-3'
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <div className="h-full relative">
                                    {mgcDescPlacement === 'on-mgc' && (
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
                                            <span className="text-sm text-white/90 italic px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/30 inline-block shadow-lg">
                                                {mgcDescText}
                                            </span>
                                        </div>
                                    )}
                                    {/* Slider Container */}
                                    <div
                                        className="flex h-full transition-transform duration-700 ease-in-out"
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    >
                                        {SLIDES.map((slide) => (
                                            <div key={slide.id} className="min-w-full h-full relative">
                                                {/* Logo and Brand - Lower Right */}
                                                <div className={`absolute bottom-8 right-12 z-40 flex items-center ${slide.id === 2 ? 'gap-1' : 'gap-4'}`}>
                                                    {slide.logo && (
                                                        <Image
                                                            src={slide.logo}
                                                            alt={`${slide.projectName} Logo`}
                                                            width={88}
                                                            height={88}
                                                            className="w-22 h-22 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-700"
                                                            style={{ width: '5.5rem', height: '5.5rem' }}
                                                        />
                                                    )}
                                                    <span className="text-[2.75rem] md:text-[3.5rem] font-bold text-white drop-shadow-xl tracking-tight">{slide.projectName}</span>
                                                </div>

                                                {/* Background Layer */}
                                                <div className="absolute inset-0">
                                                    {slide.useGradient ? (
                                                        <>
                                                            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor}`} />
                                                            {slide.id === 2 && (
                                                                <>
                                                                    {/* Floating orbs */}
                                                                    <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                                                                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                                                                    <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

                                                                    {/* Noise texture */}
                                                                    <div className="absolute inset-0 opacity-30"
                                                                        style={{
                                                                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                                                                            backgroundRepeat: 'repeat',
                                                                            backgroundSize: '200px 200px',
                                                                            mixBlendMode: 'overlay'
                                                                        }}
                                                                    />

                                                                    {/* Dot grid pattern */}
                                                                    <div className="absolute inset-0 opacity-20"
                                                                        style={{
                                                                            backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.4) 1px, transparent 1px)`,
                                                                            backgroundSize: '40px 40px'
                                                                        }}
                                                                    />

                                                                    {/* Subtle gradient overlay */}
                                                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
                                                                </>
                                                            )}
                                                            {slide.id === 5 && (
                                                                <>
                                                                    {/* AgentOps Map Effect */}
                                                                    <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                                                                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

                                                                    {/* Technical Grid */}
                                                                    <div className="absolute inset-0 opacity-10"
                                                                        style={{
                                                                            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                                                            backgroundSize: '40px 40px'
                                                                        }}
                                                                    />
                                                                </>
                                                            )}
                                                            {slide.id !== 2 && (
                                                                <div className="absolute inset-0 bg-[url('/website_dark.png')] bg-cover bg-center opacity-20" />
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Background image */}
                                                            {slide.bgImages?.map((bgImage, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="absolute inset-0 bg-cover"
                                                                    style={{
                                                                        backgroundImage: `url('${bgImage}')`,
                                                                        backgroundPosition: slide.id === 2 ? 'center 40%' : 'center 25%',
                                                                        opacity: 1
                                                                    }}
                                                                />
                                                            ))}
                                                            {/* Colored overlay for readability */}
                                                            <div className={`absolute inset-0 z-[1] ${slide.id === 1
                                                                ? 'bg-gradient-to-br from-indigo-600/30 via-violet-500/30 to-fuchsia-500/30'
                                                                : 'bg-gradient-to-br from-blue-600/50 via-cyan-500/50 to-teal-600/50'
                                                                }`} />
                                                        </>
                                                    )}
                                                </div>

                                                {/* Hero Section - Left Aligned */}
                                                <div className="relative z-20 h-full flex items-center px-12 md:px-20">
                                                    <div className="max-w-4xl">
                                                        {/* Headlines */}
                                                        <div className="space-y-4 mb-8" style={{ fontFamily: slide.id === 2 ? 'Space Grotesk, sans-serif' : heroFont }}>
                                                            <h1 className={slide.id === 2 ? "text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-xl" : "text-6xl md:text-8xl font-bold text-white drop-shadow-xl"}>
                                                                {slide.id === 1 ? (
                                                                    <>
                                                                        Dream Big <span className="text-3xl md:text-5xl block mt-2 opacity-80">(or small)</span>
                                                                    </>
                                                                ) : (
                                                                    slide.heroTitle1
                                                                )}
                                                            </h1>
                                                            <h1 className={`${slide.id === 2 ? 'text-6xl md:text-8xl font-bold' : 'text-6xl md:text-8xl font-bold'} bg-gradient-to-r ${slide.id === 2
                                                                ? 'from-cyan-300 via-blue-300 to-teal-300'
                                                                : slide.id === 5
                                                                    ? 'from-orange-300 via-amber-300 to-red-300'
                                                                    : 'from-yellow-300 via-green-300 to-emerald-300'
                                                                } bg-clip-text text-transparent ${slide.id === 2 ? 'tracking-tight' : ''} drop-shadow-lg pb-2`}>
                                                                {slide.heroTitle2}
                                                            </h1>
                                                        </div>

                                                        {/* Subheadline */}
                                                        <p className="text-xl md:text-3xl text-white/90 mb-10 max-w-3xl drop-shadow-lg font-light leading-relaxed">
                                                            {slide.heroSubtitle}
                                                        </p>

                                                        {/* CTA Button */}
                                                        <div className="flex items-center gap-4">
                                                            {slide.comingSoon ? (
                                                                <button disabled className="px-10 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white/50 font-semibold shadow-lg text-lg cursor-not-allowed uppercase tracking-widest">
                                                                    Coming Soon
                                                                </button>
                                                            ) : (
                                                                <Link href={slide.id === 1 ? "/portal" : `/${slide.projectName.toLowerCase()}`} className="px-10 py-5 rounded-2xl bg-white text-black font-bold hover:bg-yellow-400 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(234,179,8,0.2)] hover:-translate-y-1 text-lg flex items-center gap-3">
                                                                    Visit {slide.projectName} <ArrowLeft className="rotate-180 w-5 h-5" />
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Us Section */}
                        <div className="">
                            <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 relative inline-block" style={{ fontFamily: heroFont }}>
                                Studio
                                <div className="absolute -bottom-2 left-0 w-1/3 h-2 bg-yellow-500 rounded-full" />
                            </h2>
                            <AboutUsSection heroFont={heroFont} />
                        </div>

                        {/* Blog Section */}
                        <div className="">
                            <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 relative inline-block" style={{ fontFamily: heroFont }}>
                                Blog
                                <div className="absolute -bottom-2 left-0 w-1/3 h-2 bg-yellow-500 rounded-full" />
                            </h2>
                            <BlogSection heroFont={heroFont} />
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="px-16 py-6">
                        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-white/70">
                            <div>© 2025 ARCALAB. All rights reserved.</div>
                            <div className="flex items-center gap-6">
                                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                                <button
                                    onClick={() => setShowContactModal(true)}
                                    className="hover:text-white transition-colors"
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    </footer>
                </div>

                {/* Original Footer - Remove */}
                <footer className="hidden">
                    <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-white/70">
                        <div>© 2025 ARCALAB. All rights reserved.</div>
                        <div className="flex items-center gap-6 pointer-events-auto">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                            <button
                                onClick={() => setShowContactModal(true)}
                                className="hover:text-white transition-colors"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Contact Modal */}
            {showContactModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowContactModal(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-lg w-full relative z-10 shadow-2xl"
                    >
                        <button
                            onClick={() => setShowContactModal(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: heroFont }}>Get in touch</h2>
                        <p className="text-white/60 mb-8">Choose how you'd like to connect with us.</p>

                        {!contactOption ? (
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => setContactOption('calendar')}
                                    className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group text-left"
                                >
                                    <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Schedule a Call</h3>
                                        <p className="text-sm text-white/50">Book a 30-min discovery chat</p>
                                    </div>
                                    <ArrowLeft className="w-5 h-5 text-white/30 ml-auto rotate-180 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button
                                    onClick={() => setContactOption('form')}
                                    className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group text-left"
                                >
                                    <div className="p-3 rounded-full bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Send a Message</h3>
                                        <p className="text-sm text-white/50">Drop us a line anytime</p>
                                    </div>
                                    <ArrowLeft className="w-5 h-5 text-white/30 ml-auto rotate-180 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ) : contactOption === 'calendar' ? (
                            <div className="space-y-4">
                                <button
                                    onClick={() => setContactOption(null)}
                                    className="text-sm text-white/50 hover:text-white flex items-center gap-2 mb-4"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to options
                                </button>
                                <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    <CalendarScheduler />
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <button
                                    onClick={() => setContactOption(null)}
                                    type="button"
                                    className="text-sm text-white/50 hover:text-white flex items-center gap-2 mb-4"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to options
                                </button>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1">Message</label>
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] transition-all"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Products Modal */}
            {showProductsModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowProductsModal(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-12 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl custom-scrollbar"
                    >
                        <button
                            onClick={() => setShowProductsModal(false)}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors z-50"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: heroFont }}>All Products</h2>
                            <p className="text-white/60 max-w-2xl mx-auto">Explore our suite of AI-powered tools and experiments.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SLIDES.map((product) => (
                                <Link
                                    key={product.id}
                                    href={product.id === 1 ? "/portal" : `/${product.projectName.toLowerCase()}`}
                                    onClick={() => setShowProductsModal(false)}
                                    className="group relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)]"
                                >
                                    {/* Product Background */}
                                    <div className="absolute inset-0">
                                        {product.useGradient ? (
                                            <div className={`w-full h-full bg-gradient-to-br ${product.bgColor}`} />
                                        ) : (
                                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${product.bgImages?.[0]}')` }}>
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                                            </div>
                                        )}
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full p-8 flex flex-col justify-end">
                                        {/* Logo */}
                                        {product.logo && (
                                            <div className="absolute top-8 left-8">
                                                <Image
                                                    src={product.logo}
                                                    alt={`${product.projectName} Logo`}
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12 drop-shadow-lg"
                                                />
                                            </div>
                                        )}

                                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform" style={{ fontFamily: heroFont }}>{product.projectName}</h3>
                                        <p className="text-lg text-yellow-400 font-medium mb-3">{product.tagline}</p>
                                        <p className="text-sm text-white/60 line-clamp-3 mb-6">{product.heroSubtitle}</p>

                                        <div className="flex items-center text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                            {product.comingSoon ? 'Coming Soon' : 'View Product'}
                                            {!product.comingSoon && <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </React.Fragment>
    )
}
