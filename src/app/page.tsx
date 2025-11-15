'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, Type, X, ChevronLeft, ChevronRight, Calendar, Mail, ArrowLeft } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import GiantCardV2 from '@/components/experiment/giant-card-v2'
import CalendarScheduler from '@/components/calendar-scheduler'

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
    bgImages: ["/website_dark.png"],
    useGradient: false
  },
  {
    id: 2,
    projectName: "BitnBolt",
    tagline: "Build and manage websites through conversation.",
    heroTitle1: "Build and Manage Websites",
    heroTitle2: "by just thinking about it",
    heroSubtitle: "Conversational website builder and manager",
    bgColor: "from-blue-950 via-indigo-950 to-purple-950",
    useGradient: true
  },
  {
    id: 3,
    projectName: "Imagen",
    tagline: "Generate high-quality content with AI assistance.",
    heroTitle1: "Create content,",
    heroTitle2: "Powered by AI.",
    heroSubtitle: "AI content generation platform",
    bgColor: "from-emerald-900/50 to-teal-900/50",
    useGradient: true
  }
]

export default function Experiment6Page() {
  const { theme, toggleTheme } = useTheme()
  const [showFontPanel, setShowFontPanel] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactOption, setContactOption] = useState<'calendar' | 'form' | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [brandFont, setBrandFont] = useState('Raleway, sans-serif')
  const [heroFont, setHeroFont] = useState('EB Garamond, serif')
  const [cardExpandedStates, setCardExpandedStates] = useState<Record<number, boolean>>({})
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const handleCardExpandChange = useCallback((slideId: number, expanded: boolean) => {
    setCardExpandedStates(prev => {
      // Only update if the value actually changed
      if (prev[slideId] === expanded) return prev;
      return { ...prev, [slideId]: expanded };
    })
  }, [])

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
      {/* Background with images */}
      <div className="bg-layer" />

      {/* Navigation - stays on top */}
      <nav className="navigation">
        <div className="nav-content">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/arca.png"
              alt="Arca Labs Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <span className="text-xl font-bold text-white" style={{ fontFamily: brandFont }}>ARCALAB</span>
          </div>

          {/* Navigation Links & Theme Switcher */}
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">
              Blog
            </Link>
            <button
              onClick={() => setShowContactModal(true)}
              className="text-sm font-medium text-white hover:text-yellow-500 transition-colors"
            >
              Contact
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass-card hover:bg-white/10 dark:hover:bg-gray-800/10 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Slider Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full glass-card hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all shadow-2xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full glass-card hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all shadow-2xl"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Mega Giant Card (MGC) Container - Solid Card */}
      <div className="fixed left-16 right-16 top-24 bottom-4 z-10">
        <div className="h-full rounded-3xl overflow-hidden">
          {/* Slider Container */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div key={slide.id} className="min-w-full h-full relative">
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
                      {slide.id !== 2 && (
                        <div className="absolute inset-0 bg-[url('/images/website_dark.png')] bg-cover bg-center opacity-20" />
                      )}
                    </>
                  ) : (
                    <>
                      {/* Background image for Flying Nimbus */}
                      {slide.bgImages?.map((bgImage, idx) => (
                        <div
                          key={idx}
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${bgImage}')`,
                            opacity: 1
                          }}
                        />
                      ))}
                      {/* Subtle overlay layer */}
                      <div className="absolute inset-0 bg-white/5" />
                    </>
                  )}
                </div>

                {/* Hero Section */}
                <div
                  className="relative z-10 px-8 md:px-12"
                  style={{
                    transform: cardExpandedStates[slide.id] ? 'translateY(-150vh)' : 'translateY(0)',
                    opacity: cardExpandedStates[slide.id] ? 0 : 1,
                    transition: 'all 1000ms ease-in-out',
                    paddingTop: '6vh'
                  }}
                >
                  <div className="hero-content">
                    {/* Headlines */}
                    <div className="space-y-0" style={{ fontFamily: slide.id === 2 ? 'Space Grotesk, sans-serif' : heroFont }}>
                      <h1 className={slide.id === 2 ? "text-4xl md:text-5xl font-bold tracking-tight" : "headline-1"}>
                        {slide.id === 1 ? (
                          <>
                            Dream Big <span className="text-2xl md:text-3xl">(or small)</span>
                          </>
                        ) : (
                          slide.heroTitle1
                        )}
                      </h1>
                      <h1 className={`${slide.id === 2 ? 'text-6xl md:text-7xl font-bold' : 'headline-1 headline-2'} bg-gradient-to-r ${
                        slide.id === 2
                          ? 'from-blue-400 via-cyan-400 to-blue-500'
                          : 'from-blue-400 to-emerald-400'
                      } bg-clip-text text-transparent ${slide.id === 2 ? 'tracking-tight' : ''}`}>
                        {slide.heroTitle2}
                      </h1>
                    </div>

                    {/* Subheadline */}
                    <p className="subheadline max-w-2xl">
                      {slide.heroSubtitle}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4 pt-2">
                      <Link href={slide.id === 1 ? "/portal" : `/${slide.projectName.toLowerCase()}`} className="btn-primary">
                        Visit {slide.projectName}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Giant Card Module */}
                <div
                  className="absolute left-8 right-8 md:left-12 md:right-12 z-30"
                  style={{
                    bottom: cardExpandedStates[slide.id] ? 0 : '2rem',
                    top: cardExpandedStates[slide.id] ? '6rem' : 'calc(100vh - 450px)',
                    transition: 'bottom 1000ms ease-in-out, top 1000ms ease-in-out'
                  }}
                >
                  <GiantCardV2
                    onExpandChange={(expanded) => handleCardExpandChange(slide.id, expanded)}
                    projectName={slide.projectName}
                    tagline={slide.tagline}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Outside MGC */}
      <footer className="fixed bottom-6 left-0 right-0 z-50 px-6 pointer-events-none">
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

      {/* Font Preview Toggle Button */}
      <button
        onClick={() => setShowFontPanel(!showFontPanel)}
        className="fixed top-24 right-6 z-50 p-3 rounded-lg glass-card hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all"
        aria-label="Toggle font preview panel"
      >
        <Type className="w-5 h-5" />
      </button>

      {/* Font Preview Panel */}
      {showFontPanel && (
        <div className="fixed top-24 right-20 z-50 w-80 glass-card p-6 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Type className="w-5 h-5" />
              Font Preview
            </h3>
            <button
              onClick={() => setShowFontPanel(false)}
              className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/10 transition-all"
              aria-label="Close font panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Font Selector */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Brand Name Font</label>
            <select
              value={brandFont}
              onChange={(e) => setBrandFont(e.target.value)}
              className="w-full p-2 rounded-lg bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/20 focus:border-yellow-500 focus:outline-none transition-colors"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.name} ({font.category})
                </option>
              ))}
            </select>
            <div className="mt-2 p-3 rounded-lg bg-white/5 dark:bg-gray-900/20 text-center">
              <span className="text-xl font-bold" style={{ fontFamily: brandFont }}>
                ARCALAB
              </span>
            </div>
          </div>

          {/* Hero Font Selector */}
          <div>
            <label className="block text-sm font-semibold mb-2">Hero Headlines Font</label>
            <select
              value={heroFont}
              onChange={(e) => setHeroFont(e.target.value)}
              className="w-full p-2 rounded-lg bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/20 focus:border-yellow-500 focus:outline-none transition-colors"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.name} ({font.category})
                </option>
              ))}
            </select>
            <div className="mt-2 p-3 rounded-lg bg-white/5 dark:bg-gray-900/20">
              <p className="text-2xl font-bold" style={{ fontFamily: heroFont }}>
                Dream big,
              </p>
              <p className="text-2xl font-bold text-yellow-500" style={{ fontFamily: heroFont }}>
                Build fast, and go far.
              </p>
            </div>
          </div>
        </div>
      )}

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
