'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, X, ExternalLink, Heart, Share2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BLOG_POSTS, type BlogPost } from '@/data/blogs'

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (post: BlogPost) => {
    setSelectedPost(post)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
    document.body.style.overflow = ''
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto">
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
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Blog
            </h1>
            <p className="text-xl text-white/60">
              Insights on solving meaningful problems and building for impact
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, index) => (
              <motion.div
                key={post.slug}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => openModal(post)}
                className="cursor-pointer group"
              >
                <div className="h-full p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-white/60 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/70 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs">{post.date}</span>
                    <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/50">
          <p>© 2025 ARCALAB. All rights reserved.</p>
        </div>
      </footer>

      {/* Article Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPost && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="sticky top-4 float-right mr-4 mt-4 z-10 bg-white/10 backdrop-blur-sm border border-white/20 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
                      {selectedPost.category}
                    </span>
                    <span className="text-white/60 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedPost.readTime}
                    </span>
                    <span className="text-white/60 text-sm">{selectedPost.date}</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {selectedPost.title}
                  </h1>

                  <p className="text-lg text-white/70 mb-4">
                    By {selectedPost.author}
                  </p>

                  <p className="text-xl text-white/60 leading-relaxed">
                    {selectedPost.excerpt}
                  </p>
                </div>

                {/* Article Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <div
                    className="text-white/80 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: selectedPost.content
                        .replace(/^## /gm, '<h2 class="text-3xl font-bold mt-8 mb-4 text-white">')
                        .replace(/\n## /g, '</h2>\n<h2 class="text-3xl font-bold mt-8 mb-4 text-white">')
                        .replace(/^### /gm, '<h3 class="text-2xl font-semibold mt-6 mb-3 text-white">')
                        .replace(/\n### /g, '</h3>\n<h3 class="text-2xl font-semibold mt-6 mb-3 text-white">')
                        .replace(/^#### /gm, '<h4 class="text-xl font-semibold mt-4 mb-2 text-white">')
                        .replace(/\n#### /g, '</h4>\n<h4 class="text-xl font-semibold mt-4 mb-2 text-white">')
                        .replace(/^\- /gm, '<li class="ml-6 mb-2">')
                        .replace(/\n- /g, '</li>\n<li class="ml-6 mb-2">')
                        .replace(/^\d+\. /gm, '<li class="ml-6 mb-2 list-decimal">')
                        .replace(/\n\d+\. /g, '</li>\n<li class="ml-6 mb-2 list-decimal">')
                        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
                        .replace(/\n\n/g, '</p><p class="mb-4">')
                        .replace(/^(.)/gm, '<p class="mb-4">$1')
                    }}
                  />
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engagement */}
                <div className="mt-8 flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                    Like
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
