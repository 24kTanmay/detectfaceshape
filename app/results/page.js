"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MetricCard from "../../components/MetricCard";
import HairstyleSection from "../../components/HairstyleSection";
import CanvasOverlay from "../../components/CanvasOverlay";
import ShareCard from "../../components/ShareCard";
import ThemeToggle from "../../components/ThemeToggle";

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read local face analysis data
    const stored = localStorage.getItem("face_analysis_data");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse stored metrics:", err);
      }
    }
    setLoading(false);
  }, []);

  // Return a sleek loading screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400">
        <div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest">Loading metrics database...</p>
      </div>
    );
  }

  // Handle case where user directly navigates to /results without scanning first
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-35 pointer-events-none" />
        <div className="z-10 max-w-md w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">No Active Scan Session</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              To view facial biometrics, you must first upload a selfie snapshot for analysis.
            </p>
          </div>
          <Link
            href="/"
            className="block w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-900 dark:text-white font-bold text-sm tracking-wide uppercase transition-all duration-300 text-center shadow-md active:scale-95"
          >
            Start scanning session
          </Link>
        </div>
      </div>
    );
  }

  const { shape, metrics, imageDataUrl } = data;

  // Custom descriptions per metric to increase dashboard premium quality
  const getSymmetryDescription = (score) => {
    if (score >= 90) return "Excellent bilateral alignment. Your left and right features exhibit highly synchronous geometry.";
    if (score >= 75) return "Balanced symmetry score. Features align within standard physiological proportions.";
    return "Slight structural variation detected. Perfect symmetry is rare and natural asymmetry is standard.";
  };

  const getJawlineDescription = (sharpness) => {
    if (sharpness === "Very Sharp") return "Distinct, highly defined angular contours reflecting strong masseter-chin structures.";
    if (sharpness === "Sharp") return "Well-defined chin angles. Structured profile with clear jaw contours.";
    if (sharpness === "Average") return "Smooth, standard athletic angles. Proportional chin-jaw structure.";
    return "Soft, rounded profile. Features flow smoothly into neck lines.";
  };

  const getEyeSpacingDescription = (ratio) => {
    if (ratio < 0.95) return "Close-set spacing profile. The distance between your inner corners is slightly narrow.";
    if (ratio > 1.25) return "Wide-set spacing profile. The distance between your inner corners is slightly broad.";
    return "Golden-ratio eye spacing. Eye separation perfectly matches single eye width dimensions.";
  };

  const getFaceRatioDescription = (ratio) => {
    if (ratio > 1.6) return "Elongated facial contour. Height is significantly greater than width.";
    if (ratio < 1.3) return "Compressed facial contour. Proportions display balanced square/round length-to-width.";
    return "Proportional length-to-width ratio. Ideal balanced face shape distribution.";
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden pb-12">
      {/* High tech background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-35 pointer-events-none" />
      <div className="absolute top-[-10%] right-[10%] w-[35rem] h-[35rem] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Futuristic Floating Navigation Header */}
      <header className="z-50 w-full max-w-6xl mx-auto px-6 py-4 mt-6 bg-white/70 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-900/80 rounded-2xl backdrop-blur-md flex justify-between items-center shadow-lg shadow-slate-100/30 dark:shadow-none relative">
        {/* Brand Left Column */}
        <Link href="/" className="flex items-center gap-3.5 group select-none">
          {/* Official brand visual gradient shield checkmark logo */}
          <div className="w-8 h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 shadow-lg shadow-blue-500/10 rounded-lg">
              <defs>
                <linearGradient id="headerGradResults" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="5.5" fill="url(#headerGradResults)" stroke="none" />
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
          <Link href="/blog" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150">
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
      <div className="z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        
        {/* Header bar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-900/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">DIAGNOSTICS_COMPLETED</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Biometric Scan Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white tracking-wider uppercase transition-all flex items-center gap-2 shadow-sm"
            >
              <svg
                className="w-4 h-4 text-slate-600 dark:text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17"
                />
              </svg>
              Re-Calibrate
            </Link>
          </div>
        </header>

        {/* Biometrics Grid */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs font-semibold tracking-wider font-mono text-blue-400 uppercase">SECTION_01</span>
            <span className="text-xs text-slate-600 font-mono">/ /</span>
            <span className="text-xs font-semibold tracking-wider font-mono text-slate-600 dark:text-slate-400 uppercase">GEOMETRY_METRICS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard
              label="Bilateral Symmetry"
              value={`${metrics.symmetry}%`}
              description={getSymmetryDescription(metrics.symmetry)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            />
            <MetricCard
              label="Jawline Sharpness"
              value={metrics.jawlineSharpness}
              description={getJawlineDescription(metrics.jawlineSharpness)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <MetricCard
              label="Eye Spacing Ratio"
              value={`${metrics.eyeSpacing.toFixed(2)}`}
              description={getEyeSpacingDescription(metrics.eyeSpacing)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            />
            <MetricCard
              label="Face Height Ratio"
              value={`${metrics.faceRatio.toFixed(2)}`}
              description={getFaceRatioDescription(metrics.faceRatio)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-5V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5 5" />
                </svg>
              }
            />
          </div>
        </section>

        {/* Dynamic Vector Rendering */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs font-semibold tracking-wider font-mono text-blue-400 uppercase">SECTION_02</span>
            <span className="text-xs text-slate-600 font-mono">/ /</span>
            <span className="text-xs font-semibold tracking-wider font-mono text-slate-600 dark:text-slate-400 uppercase">VECTOR_OVERLAYS</span>
          </div>
          <CanvasOverlay imageDataUrl={imageDataUrl} landmarks={metrics.landmarks} />
        </section>

        {/* Hair recommendations */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs font-semibold tracking-wider font-mono text-blue-400 uppercase">SECTION_03</span>
            <span className="text-xs text-slate-600 font-mono">/ /</span>
            <span className="text-xs font-semibold tracking-wider font-mono text-slate-600 dark:text-slate-400 uppercase">STYLE_COMPATIBILITY</span>
          </div>
          <HairstyleSection shape={shape} />
        </section>

        {/* Share Result */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs font-semibold tracking-wider font-mono text-blue-400 uppercase">SECTION_04</span>
            <span className="text-xs text-slate-600 font-mono">/ /</span>
            <span className="text-xs font-semibold tracking-wider font-mono text-slate-600 dark:text-slate-400 uppercase">EXPORTS_&_SHARING</span>
          </div>
          <ShareCard symmetry={metrics.symmetry} shape={shape} />
        </section>

      </div>

      {/* Futuristic Branded Sitemap Footer */}
      <footer className="z-10 w-full border-t border-slate-200/80 dark:border-slate-900/80 bg-slate-50 dark:bg-slate-950 py-16 px-6 relative mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 pb-12 border-b border-slate-200/85 dark:border-slate-900/60 text-center justify-items-center">
          
          {/* Brand Col */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/30 transition-all duration-300">
                <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold font-mono tracking-wider text-base uppercase text-slate-900 dark:text-white">
                DetectFaceShape<span className="text-blue-400">.shop</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Advanced AI-powered biometric facial analysis. Map 468 geometry nodes instantly in your browser to evaluate facial landmarks, jawline ratios, and hair styling compatibility.
            </p>
            {/* Live Online Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold font-mono text-emerald-500 uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              MediaPipe WASM Engine Active
            </div>
          </div>

          {/* Connect Col */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Connect With Us
            </h4>
            <div className="flex gap-3.5">
              {/* Instagram */}
              <a href="https://www.instagram.com/rtanmay588/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-200/50 dark:bg-slate-900 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-indigo-500 hover:text-white text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="https://x.com/TanmayR98734842" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-200/50 dark:bg-slate-900 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all duration-300 hover:scale-105">
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
