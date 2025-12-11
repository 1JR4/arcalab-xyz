'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, X, ChevronLeft, ChevronRight, Calendar, Mail, ArrowLeft } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

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
    logo: "/fn_logo.svg",
    externalLink: "https://www.flyingnimbus.io/"
  },
  {
    id: 2,
    projectName: "BitnBolt",
    tagline: "Build and manage websites through conversation.",
    heroTitle1: "Build and Manage Websites",
    heroTitle2: "just by talking to it",
    heroSubtitle: "Conversational website builder and manager",
    bgImages: ["/bb.png"],
    useGradient: false,
    logo: "/bitnbolt.svg",
    externalLink: "https://bitnbolt.com/"
  },
  {
    id: 5,
    projectName: "Arcadion",
    tagline: "No-PM OS",
    heroTitle1: "Say bye to project",
    heroTitle2: "and program managers.",
    heroSubtitle: "Turns your architecture into a living map. AI agents coordinate status, risks, and dependencies.",
    bgImages: ["/arcadion.png"],
    useGradient: false,
    comingSoon: true,
    logo: "/arca.png"
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

export default function HomePage() {
  const { theme, toggleTheme } = useThemeWithToggle()
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactOption, setContactOption] = useState<'calendar' | 'form' | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [brandFont] = useState('Raleway, sans-serif')
  const [heroFont] = useState('EB Garamond, serif')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mgcDescText] = useState('Click to explore interactive features')
  const [mgcDescPlacement] = useState<'above-mgc' | 'on-mgc' | 'next-to-brand' | 'below-brand' | 'none'>('none')
  const [mgcHeadline] = useState('Our Products')
  const [showMgcHeadline] = useState(true)
  const [showProductsModal, setShowProductsModal] = useState(false)

  // Auto-advance slides every 8 seconds if not interacting? (Optional, disabled for now to keep it calm)

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

  return (
    <React.Fragment>
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-black" style={{ zIndex: -10 }} />
      <div className="fixed inset-0 z-[-5] overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("/noise.png")' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-[48px] h-[48px] overflow-hidden rounded-xl bg-white/5 border border-white/10 group-hover:border-yellow-500/50 transition-colors">
              <Image
                src="/arcalab.png"
                alt="ARCALAB"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: brandFont }}>ARCALAB</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 mr-4">
              <button
                onClick={() => setShowProductsModal(true)}
                className="text-sm font-medium text-white/70 hover:text-yellow-400 transition-colors"
              >
                Products
              </button>
              <Link href="/blog" className="text-sm font-medium text-white/70 hover:text-yellow-400 transition-colors">
                Blog
              </Link>
              <button
                onClick={() => setShowContactModal(true)}
                className="text-sm font-medium text-white/70 hover:text-yellow-400 transition-colors"
              >
                Contact
              </button>
            </div>

            <div className="w-px h-6 bg-white/10 hidden md:block" />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-yellow-400 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">

        {/* Hero Section - The "Magic" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
          <HeroSection
            heroFont={heroFont}
            headline="Let's build the next thing."
            subheadline="Innovating with AI and creativity."
          />
        </motion.div>

        <div className="px-4 md:px-8 max-w-[1400px] mx-auto w-full space-y-32">

          {/* Featured Product Slider (The Giant Card) */}
          <section className="space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: heroFont }}>
                {mgcHeadline}
              </h2>
              <div className="w-24 h-1 bg-yellow-500 rounded-full" />
            </div>

            <div className="relative group">
              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 z-50 opacity-100 transition-all duration-300">
                <button
                  onClick={prevSlide}
                  className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white hover:text-white transition-all shadow-xl hover:scale-110"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 z-50 opacity-100 transition-all duration-300">
                <button
                  onClick={nextSlide}
                  className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white hover:text-white transition-all shadow-xl hover:scale-110"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              {/* Giant Card Container */}
              <div className="relative h-[65vh] md:h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-[#0a0a0a]">

                {/* View All Link Absolute */}
                <div className="absolute top-8 right-8 z-50">
                  <button
                    onClick={() => setShowProductsModal(true)}
                    className="px-5 py-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all hover:scale-105 flex items-center gap-2"
                  >
                    View All Products <ArrowLeft className="w-3 h-3 rotate-180" />
                  </button>
                </div>

                <div className="h-full relative">
                  <div
                    className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {SLIDES.map((slide) => (
                      <div key={slide.id} className="min-w-full h-full relative">
                        {/* Full Background with Gradient/Image */}
                        <div className="absolute inset-0">
                          {slide.useGradient ? (
                            <div className={`w-full h-full bg-gradient-to-br ${slide.bgColor} relative overflow-hidden`}>
                              {/* Add some ambient noise/texture to gradient backgrounds */}
                              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("/noise.png")' }}></div>
                              <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-white/10 rounded-full blur-[100px]" />
                            </div>
                          ) : (
                            <div className="w-full h-full relative">
                              <Image
                                src={slide.bgImages?.[0] || ''}
                                alt={slide.projectName}
                                fill
                                className="object-cover opacity-60"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                            </div>
                          )}
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-8 md:p-20 flex flex-col justify-center max-w-5xl z-20">
                          {slide.logo && (
                            <div className="mb-8">
                              <Image src={slide.logo} alt="Logo" width={80} height={80} className="w-20 h-20 drop-shadow-xl" />
                            </div>
                          )}

                          <h2 className="text-5xl md:text-8xl font-bold text-white mb-4 tracking-tight drop-shadow-lg leading-[1.1]" style={{ fontFamily: slide.id === 2 ? 'Space Grotesk, sans-serif' : heroFont }}>
                            {slide.heroTitle1}
                          </h2>
                          <h3 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 mb-8 pb-2 drop-shadow-lg" style={{ fontFamily: slide.id === 2 ? 'Space Grotesk, sans-serif' : heroFont }}>
                            {slide.heroTitle2}
                          </h3>

                          <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-medium leading-relaxed mb-12 drop-shadow-md">
                            {slide.heroSubtitle}
                          </p>

                          <div>
                            {slide.comingSoon ? (
                              <div className="inline-flex items-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white/50 font-semibold tracking-wider uppercase">
                                Coming Soon
                              </div>
                            ) : (
                              <Link
                                href={slide.externalLink || (slide.id === 1 ? "/portal" : `/${slide.projectName.toLowerCase()}`)}
                                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] hover:-translate-y-1"
                              >
                                Explore {slide.projectName} <ArrowLeft className="rotate-180 w-5 h-5" />
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Logo and Branding - Lower Right */}
                        <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
                          <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                            <Image
                              src="/arcalab.png"
                              alt="ARCALAB"
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-bold text-white tracking-wide" style={{ fontFamily: brandFont }}>ARCALAB</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4">
                    {SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`transition-all duration-300 rounded-full h-1.5 ${currentSlide === idx
                          ? 'w-12 bg-yellow-500 shadow-[0_0_10px_rgba(250,204,21,0.5)]'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="relative">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white relative z-10" style={{ fontFamily: heroFont }}>
                The Studio
              </h2>
              <div className="w-24 h-1 bg-yellow-500 rounded-full" />
            </div>
            <AboutUsSection heroFont={heroFont} />
          </section>

          {/* Blog Section */}
          <section className="relative">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white relative z-10" style={{ fontFamily: heroFont }}>
                Blogs
              </h2>
              <div className="w-24 h-1 bg-yellow-500 rounded-full" />
            </div>
            <BlogSection heroFont={heroFont} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-lg mt-20">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/40 text-sm">
            © 2025 ARCALAB. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-sm text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-white/40 hover:text-white transition-colors">Terms of Service</Link>
            <button onClick={() => setShowContactModal(true)} className="text-sm text-white/40 hover:text-white transition-colors">Contact Us</button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowContactModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-lg w-full relative z-[101] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setShowContactModal(false)} className="text-white/30 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: heroFont }}>Let's Talk</h2>
                <p className="text-white/60 mb-8">How can we help you build your next big thing?</p>

                {!contactOption ? (
                  <div className="space-y-4">
                    <button onClick={() => setContactOption('calendar')} className="w-full group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all">
                      <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform"><Calendar className="w-5 h-5" /></div>
                      <div className="text-left">
                        <div className="font-semibold text-white">Schedule a Call</div>
                        <div className="text-xs text-white/40">Book a 30-min intro chat</div>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-white/20 ml-auto rotate-180" />
                    </button>
                    <button onClick={() => setContactOption('form')} className="w-full group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all">
                      <div className="p-3 rounded-full bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform"><Mail className="w-5 h-5" /></div>
                      <div className="text-left">
                        <div className="font-semibold text-white">Send a Message</div>
                        <div className="text-xs text-white/40">Drop us a line directly</div>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-white/20 ml-auto rotate-180" />
                    </button>
                  </div>
                ) : contactOption === 'calendar' ? (
                  <div>
                    <button onClick={() => setContactOption(null)} className="mb-4 text-xs text-white/40 hover:text-white flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Back</button>
                    <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      <CalendarScheduler />
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <button onClick={() => setContactOption(null)} type="button" className="mb-4 text-xs text-white/40 hover:text-white flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Back</button>
                    <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50" />
                    <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50" />
                    <textarea rows={4} placeholder="Message" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 resize-none" />
                    <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors">Send Message</button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProductsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowProductsModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-12 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative z-[101] shadow-2xl custom-scrollbar"
            >
              <button
                onClick={() => setShowProductsModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: heroFont }}>All Products</h2>
                <div className="w-16 h-1 bg-yellow-500 rounded-full mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SLIDES.map((product) => (
                  <Link
                    key={product.id}
                    href={product.externalLink || (product.id === 1 ? "/portal" : `/${product.projectName.toLowerCase()}`)}
                    onClick={() => setShowProductsModal(false)}
                    className="group relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] bg-[#1a1a1a]"
                  >
                    <div className="absolute inset-0">
                      {product.useGradient ? (
                        <div className={`w-full h-full bg-gradient-to-br ${product.bgColor}`} />
                      ) : (
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${product.bgImages?.[0]}')` }}>
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                        </div>
                      )}
                    </div>
                    <div className="relative h-full p-8 flex flex-col justify-end z-10">
                      {product.logo && (
                        <div className="absolute top-8 left-8">
                          <Image src={product.logo} alt="Logo" width={48} height={48} className="w-12 h-12 drop-shadow-lg" />
                        </div>
                      )}
                      <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: heroFont }}>{product.projectName}</h3>
                      <p className="text-lg text-yellow-400 font-medium mb-3">{product.tagline}</p>
                      <p className="text-sm text-white/70 line-clamp-3 mb-6">{product.heroSubtitle}</p>
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
      </AnimatePresence>
    </React.Fragment>
  )
}
