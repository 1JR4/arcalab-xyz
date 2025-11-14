'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Hero Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                About ARCALAB
              </h1>
              <p className="text-xl text-white/50">
                Solving the biggest painpoints. Contributing to a better world.
              </p>
            </div>
          </section>

          {/* Bio Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                ARCALAB exists to solve the biggest painpoints facing people today and contribute
                to making the world a genuinely better place. Not through empty promises or feel-good
                marketing—but through products and services that create measurable, lasting impact.
              </p>
              <p>
                We believe the most meaningful work happens at the intersection of deep problems and
                thoughtful solutions. Whether it's helping people reclaim their time, democratizing
                access to powerful tools, or enabling new forms of collaboration and creation—we're
                here to tackle challenges that actually matter.
              </p>
              <p>
                This means we're selective. We don't chase every opportunity or trend. We focus on
                problems worth solving, even when they're hard. We build for impact, not vanity metrics.
                And we measure success not by features shipped, but by lives genuinely improved.
              </p>
            </div>
          </section>

          {/* What We Build */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">What We Build</h2>
            <div className="grid gap-6">
              {[
                {
                  name: 'Flying Nimbus',
                  description: 'AI-powered workstation bringing all your tools and projects into one unified space.',
                  status: 'In Development'
                },
                {
                  name: 'BitnBolt',
                  description: 'Build and manage websites through natural conversation. No code required.',
                  status: 'In Development'
                },
                {
                  name: 'Imagen',
                  description: 'AI-powered content generation platform for creators and marketers.',
                  status: 'In Development'
                }
              ].map((project, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Philosophy */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">How We Work</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Impact First',
                  description: 'We only tackle problems that truly matter. Small improvements to big painpoints beat big improvements to small painpoints.'
                },
                {
                  title: 'Deep Understanding',
                  description: 'We spend more time understanding problems than building solutions. The right problem statement is half the solution.'
                },
                {
                  title: 'Long-term Thinking',
                  description: 'We build for lasting impact, not quick wins. The best solutions compound over time.'
                }
              ].map((principle, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-lg">{principle.title}</h3>
                  <p className="text-sm text-white/60">{principle.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {[
                'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
                'Cloudflare Workers', 'PostgreSQL', 'AI/ML',
                'Framer Motion', 'Vercel'
              ].map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-mono hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <div className="space-y-4">
              <p className="text-white/70">
                Working on something that could solve a real problem or make a meaningful difference?
                We'd love to hear about it. Let's explore how we can help.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:hello@arcalabs.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section className="pt-8 border-t border-white/10">
            <div className="flex gap-6">
              {[
                { icon: Github, label: 'GitHub', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-sm text-white/50">
          <p>© 2025 ARCALAB. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
