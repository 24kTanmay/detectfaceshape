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
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden select-none pb-12">
      {/* High tech background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-35 pointer-events-none" />
      <div className="absolute top-[-10%] right-[10%] w-[35rem] h-[35rem] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

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
            <ThemeToggle />
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
    </main>
  );
}
