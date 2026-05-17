import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "../../../lib/blogData";
import ThemeToggle from "../../../components/ThemeToggle";

// Statically generate parameters for faster builds and full static export support
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get other/related posts for recommendations
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

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
                <linearGradient id="detailHeaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="5.5" fill="url(#detailHeaderGrad)" stroke="none" />
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

      {/* Main Container */}
      <div className="z-10 w-full max-w-5xl mx-auto px-6 py-12 flex-grow">
        
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Articles
        </Link>

        {/* Article Meta Header */}
        <div className="mb-10">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white tracking-tight mt-4 mb-6 leading-tight max-w-4xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-605 dark:text-slate-450 font-mono">
            <span>By {post.author}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-800" />
            <span>{post.date}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-800" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Big Banner Cover Image */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-12 shadow-2xl relative">
          {post.coverImage ? (
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          ) : null}
          <div className="hidden absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900 flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/15">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="font-mono text-sm uppercase text-slate-400 tracking-widest font-bold">Biometric Anatomy Suite</h3>
          </div>
        </div>

        {/* 2 Column Layout: Content & Sidebar CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Rich Paraphrased Content */}
          <div className="lg:col-span-8">
            <article 
              className="prose dark:prose-invert max-w-none prose-h3:font-mono prose-p:leading-relaxed text-slate-700 dark:text-slate-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Right Column: Dynamic Sticky Sidebar CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              
              {/* Premium Floating Interactive Test Card */}
              <div className="relative overflow-hidden bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl text-center">
                {/* Radial back glowing blur */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4 shadow-lg shadow-blue-500/5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white mb-2">Find Your Match</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Skip the guess work. Map 468 landmark coordinates locally using our WebAssembly analyzer to get instant, 100% private face shape diagnostic reports.
                </p>

                <Link
                  href="/"
                  className="block w-full py-3 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl shadow-lg shadow-blue-500/15 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Analyze My Face Now
                </Link>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Local Browser Diagnostics
                </div>
              </div>

              {/* Share Box */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 text-center shadow-lg shadow-slate-100/50 dark:shadow-none">
                <h4 className="text-xs font-bold font-mono text-slate-550 dark:text-slate-400 uppercase tracking-widest mb-3">Share This Guide</h4>
                <div className="flex justify-center gap-3">
                  {/* Share on X */}
                  <a 
                    href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20fitting%20guide%20for%20finding%20the%20perfect%20eyeglasses%20for%20your%20face%20shape!&url=https://detectfaceshape.shop/blog/${post.slug}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-white hover:text-slate-950 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors duration-250 border border-slate-200 dark:border-slate-800"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* Share on Whatsapp */}
                  <a 
                    href={`https://api.whatsapp.com/send?text=Check%20out%20this%20fitting%20guide%20for%20face%20shapes:%20https://detectfaceshape.shop/blog/${post.slug}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-emerald-600 hover:text-white text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors duration-250 border border-slate-200 dark:border-slate-800"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 1.977 14.113.953 11.998.953 6.561.953 2.137 5.324 2.133 10.751c0 1.688.451 3.336 1.307 4.8l-.364 1.33 1.424-.373 1.272.766-.125-.12z"/></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Posts Section */}
        <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-900">
          <h3 className="text-2xl font-bold font-mono text-slate-900 dark:text-white mb-8 text-center">Recommended For You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((rPost) => (
              <div 
                key={rPost.slug}
                className="group relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl overflow-hidden hover:border-slate-350 dark:hover:border-slate-800 transition-all duration-300 flex flex-col justify-between shadow-md shadow-slate-100/50 dark:shadow-none"
              >
                <div>
                  <div className="aspect-video w-full relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                    {rPost.coverImage ? (
                      <img 
                        src={rPost.coverImage} 
                        alt={rPost.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}
                    <div className="hidden absolute inset-0 bg-white dark:bg-slate-950 flex-col items-center justify-center p-6 text-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white mb-2 shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">{rPost.category}</span>
                    <h4 className="text-lg font-bold font-mono text-slate-900 dark:text-white tracking-tight mt-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      <Link href={`/blog/${rPost.slug}`}>
                        {rPost.title}
                      </Link>
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {rPost.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <Link 
                    href={`/blog/${rPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-650 dark:text-blue-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    Read Guide
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Centered Footer */}
      <footer className="z-10 w-full border-t border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950 py-16 px-6 relative mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 pb-12 border-b border-slate-200 dark:border-slate-900 text-center justify-items-center">
          
          {/* Brand Col */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/30 transition-all duration-300">
                <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold font-mono tracking-wider text-base uppercase text-slate-900 dark:text-white">
                DetectFaceShape<span className="text-blue-550 dark:text-blue-400">.shop</span>
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
