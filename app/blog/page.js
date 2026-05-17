"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "../../lib/blogData";
import ThemeToggle from "../../components/ThemeToggle";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Style Guide", "AI & Biotech", "Grooming", "Celebrity Style"];

  // Filter blog posts based on search and category
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* High tech technical grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-35 pointer-events-none" />

      {/* Radiant ambient glow */}
      <div className="absolute top-[-10%] left-[5%] w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[40rem] h-[40rem] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Futuristic Floating Navigation Header */}
      <header className="z-50 w-full max-w-6xl mx-auto px-6 py-4 mt-6 bg-white/70 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-900/80 rounded-2xl backdrop-blur-md flex justify-between items-center shadow-lg shadow-slate-100/30 dark:shadow-none relative">
        {/* Brand Left Column */}
        <Link href="/" className="flex items-center gap-3.5 group select-none">
          {/* Official brand visual gradient shield checkmark logo */}
          <div className="w-8 h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 shadow-lg shadow-blue-500/10 rounded-lg">
              <defs>
                <linearGradient id="blogHeaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="5.5" fill="url(#blogHeaderGrad)" stroke="none" />
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-black tracking-tight text-base sm:text-lg text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-blue-500">
            Detect Face Shape
          </span>
        </Link>

        {/* Navigation Middle Sitemap Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150">
             Face Shape Detector
          </Link>
          <Link href="/blog" className="text-xs font-bold uppercase tracking-wider text-blue-500 transition-colors duration-150">
            Blog
          </Link>
          <Link href="/contact" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150">
            Contact Us
          </Link>
        </nav>

        {/* Right side options: ThemeToggle */}
        <div className="flex items-center gap-5">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Body content */}
      <div className="z-10 w-full max-w-6xl mx-auto px-6 py-16 flex-grow">
        
        {/* Title Area */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold font-mono text-blue-400 uppercase tracking-widest mb-4">
            Facial Intelligence Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Expert Biometrics <br />& <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Styling Ratios</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover how computer vision, facial landmark ratios, and bone structure dynamics shape the perfect hairstyles, glasses frames, and grooming routines.
          </p>
        </div>

        {/* Search & Category Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-slate-200 dark:border-slate-900">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/15"
                    : "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input bar */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-850 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 transition-all duration-300"
            />
            <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Blog Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.slug}
                className="group relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300 flex flex-col justify-between h-full shadow-md shadow-slate-100/50 dark:shadow-none"
              >
                <div>
                  {/* Decorative glowing gradient borders */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Cover Image Container */}
                  <div className="aspect-video w-full relative overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback to decorative SVG
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    
                    {/* Glowing fallback graphic */}
                    <div className="hidden absolute inset-0 bg-white dark:bg-slate-950 flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-500/10">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>
                      <span className="font-mono text-xs uppercase text-slate-500 tracking-wider">Interactive Biometrics</span>
                    </div>

                    {/* Category Badge on card */}
                    <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-lg bg-white/85 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[10px] font-bold font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider backdrop-blur-sm shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Text area */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 text-xs text-slate-550 dark:text-slate-500 font-mono mb-3">
                      <span>{post.date}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-800" />
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-tight mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 mt-auto">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    Read Article 
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-100 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <svg className="w-12 h-12 text-slate-500 dark:text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-mono mb-2">No Articles Found</h3>
            <p className="text-sm text-slate-600 dark:text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any articles matching &quot;{searchQuery}&quot;. Try refining your search query or choosing another category.
            </p>
          </div>
        )}
      </div>

      {/* Unified Sitemap Centered Footer */}
      <footer className="z-10 w-full border-t border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950 py-16 px-6 relative mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-slate-900 text-center justify-items-center">
          
          {/* Brand Col */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/30 transition-all duration-300">
                <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold font-mono tracking-wider text-base uppercase text-slate-900 dark:text-white">
                DetectFaceShape<span className="text-blue-500 dark:text-blue-400">.shop</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
              Advanced AI-powered biometric facial analysis. Map 468 geometry nodes instantly in your browser to evaluate facial landmarks, jawline ratios, and hair styling compatibility.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold font-mono text-emerald-600 dark:text-emerald-500 uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-500 animate-pulse" />
              MediaPipe WASM Engine Active
            </div>
          </div>

          {/* Tools Col */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Online Suite
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Face Shape Detector</Link></li>
              <li><Link href="/" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Symmetry Diagnostics</Link></li>
              <li><Link href="/" className="text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hairstyle Recommendations</Link></li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/contact" className="text-slate-655 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support Center</Link></li>
              <li><Link href="/contact" className="text-slate-655 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Connect Col */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Connect With Us
            </h4>
            <div className="flex gap-3.5">
              <a href="https://www.instagram.com/rtanmay588/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-900 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-indigo-500 hover:text-white text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://x.com/TanmayR98734842" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-900 hover:bg-white hover:text-slate-950 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-8 flex flex-col items-center text-center text-xs sm:text-sm text-slate-500 font-mono gap-4">
          <p>© {new Date().getFullYear()} DetectFaceShape.shop. Powered by WebAssembly face-mesh algorithms. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-blue-500 transition-colors uppercase tracking-wider text-xs sm:text-sm">Contact Us</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
