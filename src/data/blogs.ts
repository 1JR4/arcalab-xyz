import aiWorkflow from './ai-workflow-beyond-prompt-engineering.json'
import bridgingAtoms from './bridging-atoms-and-bits.json'
import goodToGreat from './from-good-to-great-pm-in-ai.json'
import gptOss from './gpt-oss-revolution.json'
import woodWideWeb from './wood-wide-web.json'
import riggedByDesign from './rigged-by-design.json'

export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image?: string
  tldr?: string[]
  tableOfContents?: {
    id: string
    title: string
    level: number
  }[]
  relatedArticles?: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  gptOss,
  aiWorkflow,
  goodToGreat,
  bridgingAtoms,
  riggedByDesign,
  woodWideWeb
] as BlogPost[]
