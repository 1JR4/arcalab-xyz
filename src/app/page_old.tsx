'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, X, ChevronLeft, ChevronRight, Calendar, Mail, ArrowLeft } from 'lucide-react'
import { useTheme } from 'next-themes'

// Wrapper to match old theme provider API
function useThemeWithToggle() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  return { theme, toggleTheme, setTheme }
}
import CalendarScheduler from '@/components/calendar-scheduler'
import AboutUsSection from '@/components/about-us-section'
import BlogSection from '@/components/blog-section'

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
    id: 5,
    projectName: "KodiakHana",
    tagline: "No-PM OS: The end of manual project management.",
    heroTitle1: "No-PM OS",
    heroTitle2: "AgentOps Map",
    heroSubtitle: "Turns your architecture into a living map. AI agents coordinate status, risks, and dependencies.",
    bgColor: "from-orange-900/50 to-amber-900/50",
    useGradient: true,
    comingSoon: true
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

export default function HomePage() {
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

  const currentSlideData = SLIDES[currentSlide]

  return (
    <>
      {/* Black background */}
      <div className="fixed inset-0 bg-black" style={{ zIndex: -10 }} />

      {/* Navigation - stays on top */}
      <nav className="navigation">
        <div className="nav-content">
          {/* Logo and Brand */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Image
                src="/arcalab.png"
                alt="ARCALAB Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <span className="text-xl font-bold text-white" style={{ fontFamily: brandFont }}>ARCALAB</span>
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
            <Link href="/blog" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">
              Blog
            </Link>
            <button
              onClick={() => setShowContactModal(true)}
              className="text-sm font-medium text-white hover:text-yellow-500 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>


      {/* Scrollable content container */}
      <div className="relative min-h-screen">
        {/* About Us Section - positioned below nav */}
        <div className="px-16 pb-8">
          <AboutUsSection heroFont={heroFont} />
        </div>

        {/* Headline above MGC - positioned below About Us with padding */}
        {showMgcHeadline && (
          <div className="px-16 pb-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white" style={{ fontFamily: heroFont }}>
              {mgcHeadline}
            </h2>
          </div>
        )}

        {/* Mega Giant Card (MGC) Container - Solid Card */}
        <div className="px-16 pb-4 relative h-[45vh]">

          {mgcDescPlacement === 'above-mgc' && (
            <div className="absolute -top-8 left-0 right-0 text-center z-20">
              <span className="text-sm text-white/80 italic px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 inline-block">
                {mgcDescText}
              </span>
            </div>
          )}

          {/* Slider Navigation Buttons - Positioned relative to MGC */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full glass-card hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all shadow-2xl"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full glass-card hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all shadow-2xl"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="h-full rounded-3xl overflow-hidden relative">
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
                  <div className={`absolute bottom-4 right-8 z-40 flex items-center ${slide.id === 2 ? 'gap-1' : 'gap-4'}`}>
                    {slide.logo && (
                      <Image
                        src={slide.logo}
                        alt={`${slide.projectName} Logo`}
                        width={88}
                        height={88}
                        className="w-22 h-22 drop-shadow-lg"
                        style={{ width: '5.5rem', height: '5.5rem' }}
                      />
                    )}
                    <span className="text-[2.75rem] md:text-[3.3rem] font-bold text-white drop-shadow-lg">{slide.projectName}</span>
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
                  <div className="relative z-20 h-full flex items-center px-8 md:px-12">
                    <div className="max-w-4xl">
                      {/* Headlines */}
                      <div className="space-y-2 mb-6" style={{ fontFamily: slide.id === 2 ? 'Space Grotesk, sans-serif' : heroFont }}>
                        <h1 className={slide.id === 2 ? "text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg" : "text-6xl md:text-7xl font-bold text-white drop-shadow-lg"}>
                          {slide.id === 1 ? (
                            <>
                              Dream Big <span className="text-3xl md:text-4xl">(or small)</span>
                            </>
                          ) : (
                            slide.heroTitle1
                          )}
                        </h1>
                        <h1 className={`${slide.id === 2 ? 'text-6xl md:text-7xl font-bold' : 'text-6xl md:text-7xl font-bold'} bg-gradient-to-r ${slide.id === 2
                          ? 'from-cyan-300 via-blue-300 to-teal-300'
                          : slide.id === 5
                            ? 'from-orange-300 via-amber-300 to-red-300'
                            : 'from-yellow-300 via-green-300 to-emerald-300'
                          } bg-clip-text text-transparent ${slide.id === 2 ? 'tracking-tight' : ''} drop-shadow-lg`}>
                          {slide.heroTitle2}
                        </h1>
                      </div>

                      {/* Subheadline */}
                      <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl drop-shadow-lg">
                        {slide.heroSubtitle}
                      </p>

                      {/* CTA Button */}
                      <div className="flex items-center gap-4">
                        {slide.comingSoon ? (
                          <button disabled className="px-8 py-4 rounded-xl bg-white/20 text-white/60 font-semibold shadow-lg text-lg cursor-not-allowed">
                            Coming Soon
                          </button>
                        ) : (
                          <Link href={slide.id === 1 ? "/portal" : `/${slide.projectName.toLowerCase()}`} className="px-8 py-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-colors shadow-lg text-lg">
                            Visit {slide.projectName}
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

        {/* About Us Section - positioned below Giant Card */}


        {/* Blog Section */}
        <div className="px-16 py-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8" style={{ fontFamily: heroFont }}>
            Blog
          </h2>
          <BlogSection heroFont={heroFont} />
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

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-6 bg-black border border-white/20 rounded-2xl p-8 max-h-[90vh] overflow-y-auto text-white">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowContactModal(false)
                setContactOption(null)
              }}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Close contact modal"
            >
              <X className="w-6 h-6" />
            </button>

            {!contactOption ? (
              <>
                {/* Modal Content - Selection */}
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-xl text-white/70">Choose how you'd like to connect with us</p>
                </div>

                {/* Contact Options */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Calendar Option */}
                  <button
                    onClick={() => setContactOption('calendar')}
                    className="border border-white/20 p-6 rounded-xl hover:bg-white/10 transition-all group text-left"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 transition-all">
                        <Calendar className="w-8 h-8 text-yellow-500" />
                      </div>
                      <h3 className="text-xl font-bold">Schedule a Meeting</h3>
                      <p className="text-white/70">Book a time that works for you on our calendar</p>
                      <div className="mt-2 px-6 py-2 rounded-full bg-yellow-500 text-black font-semibold group-hover:bg-yellow-400 transition-colors">
                        Open Calendar
                      </div>
                    </div>
                  </button>

                  {/* Form Option */}
                  <button
                    onClick={() => setContactOption('form')}
                    className="border border-white/20 p-6 rounded-xl hover:bg-white/10 transition-all group text-left"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 transition-all">
                        <Mail className="w-8 h-8 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-bold">Send a Message</h3>
                      <p className="text-white/70">Fill out our contact form and we'll respond soon</p>
                      <div className="mt-2 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold group-hover:bg-blue-400 transition-colors">
                        Open Form
                      </div>
                    </div>
                  </button>
                </div>
              </>
            ) : contactOption === 'calendar' ? (
              <>
                {/* Back Button */}
                <button
                  onClick={() => setContactOption(null)}
                  className="mb-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to options
                </button>

                {/* Custom Calendar Scheduler */}
                <CalendarScheduler
                  onBooking={(data) => {
                    console.log('Booking data:', data)
                    // Handle booking submission here
                  }}
                />
              </>
            ) : (
              <>
                {/* Back Button */}
                <button
                  onClick={() => setContactOption(null)}
                  className="mb-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to options
                </button>

                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-500 focus:outline-none transition-colors text-white placeholder:text-white/40"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-500 focus:outline-none transition-colors text-white placeholder:text-white/40"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-500 focus:outline-none transition-colors text-white placeholder:text-white/40"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-500 focus:outline-none transition-colors resize-none text-white placeholder:text-white/40"
                        placeholder="Tell us more..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
