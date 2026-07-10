'use client';
import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: "Building a Futuristic AI Operating System Portfolio in Next.js",
    date: "July 10, 2026",
    readTime: "8 min read",
    category: "Architecture",
    content: `
# Introduction
When deciding how to present my skills to the world, I didn't want a standard scrolling website. I wanted an experience. This led me to build an AI-powered operating system right in the browser using Next.js and Tailwind CSS.

## The Architecture
The core of the system relies on a global state manager (Zustand) to handle window management, z-indexing, and application lifecycles. By treating each section of my portfolio (Projects, Skills, Contact) as an isolated "App", I achieved maximum modularity.

## Animations and Polish
Framer Motion was crucial. Every window open, close, and minimize action is physics-based. The taskbar and desktop icons rely on spring animations to feel tactile and responsive.

## The Result
A highly immersive, deeply interactive portfolio that proves my frontend engineering capabilities rather than just stating them.
    `
  },
  {
    id: 2,
    title: "Why Local LLMs are the Future of Development",
    date: "June 22, 2026",
    readTime: "5 min read",
    category: "AI & ML",
    content: "Content for this post..."
  },
  {
    id: 3,
    title: "Optimizing Computer Vision at the Edge",
    date: "May 15, 2026",
    readTime: "12 min read",
    category: "Engineering",
    content: "Content for this post..."
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <div className="flex h-full bg-[#050505] text-white">
      {/* Sidebar List */}
      <div className={`${selectedPost ? 'hidden md:block w-1/3' : 'w-full'} border-r border-white/10 p-4 bg-navy/40 overflow-y-auto transition-all`}>
        <div className="flex items-center gap-2 mb-8 px-2">
          <BookOpen className="w-6 h-6 text-cyan" />
          <h2 className="text-xl font-bold text-gray-200">Terminal Blog</h2>
        </div>

        <div className="space-y-2">
          {blogPosts.map(post => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`w-full text-left p-4 rounded-xl border transition-all group ${
                selectedPost?.id === post.id 
                  ? 'bg-cyan/10 border-cyan text-white' 
                  : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-gray-200'
              }`}
            >
              <div className="text-xs text-cyan mb-2 font-mono uppercase">{post.category}</div>
              <h3 className="font-bold mb-2 group-hover:text-cyan transition-colors line-clamp-2">{post.title}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reader Area */}
      <div className={`${selectedPost ? 'block flex-1' : 'hidden md:flex flex-1 items-center justify-center'} overflow-y-auto p-8 relative bg-[#0a0a0a]`}>
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500 flex flex-col items-center"
            >
              <BookOpen className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-mono">Select an article to read</p>
            </motion.div>
          ) : (
            <motion.div 
              key={selectedPost.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="md:hidden flex items-center gap-2 text-cyan text-sm mb-6 bg-white/5 px-3 py-1.5 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" /> Back to list
              </button>
              
              <div className="mb-8 border-b border-white/10 pb-8">
                <div className="text-cyan font-mono text-sm uppercase tracking-wider mb-4">{selectedPost.category}</div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{selectedPost.title}</h1>
                <div className="flex items-center gap-6 text-sm text-gray-400 font-mono">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {selectedPost.readTime}</span>
                </div>
              </div>
              
              <div className="prose prose-invert prose-cyan max-w-none prose-headings:font-bold prose-a:text-cyan prose-p:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selectedPost.content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
