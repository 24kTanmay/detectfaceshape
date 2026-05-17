"use client";

import React, { useState, useEffect } from "react";

const messages = [
  "Initializing WebAssembly AI Model...",
  "Detecting 468 high-precision facial landmarks...",
  "Analyzing jaw and chin structure...",
  "Calculating mid-face symmetry matrix...",
  "Measuring proportions and eye spacing...",
  "Classifying face shape profile...",
  "Generating targeted hairstyle recommendations...",
  "Finalizing high-fidelity rendering overlay..."
];

export default function AnalyzingScreen() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle messages quickly for a highly active high-tech feel
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        return prev; // hold on the last one
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Increment progress bar smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 98) return prev + 1;
        return prev;
      });
    }, 40);
    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6 overflow-hidden relative">
      {/* Background visual grid elements for a technical laboratory feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Decorative neon subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Animated Scanner Visual */}
        <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
          {/* Outer glowing pulsing border */}
          <div className="absolute inset-0 border border-blue-500/30 rounded-full animate-ping opacity-25" />
          <div className="absolute inset-2 border-2 border-blue-400/20 rounded-full" />
          
          {/* Spinning dashed technical ring */}
          <div className="absolute inset-4 border-2 border-dashed border-cyan-500/40 rounded-full animate-[spin_10s_linear_infinite]" />
          
          {/* Inner solid border */}
          <div className="absolute inset-6 border border-blue-500/60 rounded-full flex items-center justify-center bg-slate-900/80 shadow-2xl shadow-blue-500/10">
            {/* High-tech Face SVG silhouette */}
            <svg
              className="w-16 h-16 text-blue-400/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Sweeping Horizontal Laser Bar */}
          <div className="absolute left-6 right-6 h-0.5 bg-cyan-400 shadow-[0_0_12px_#22d3ee] rounded-full animate-[bounce_2.5s_ease-in-out_infinite]" />
        </div>

        {/* Status Messages */}
        <div className="space-y-4 w-full px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-xs font-semibold tracking-wider text-blue-400 uppercase shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Analysis in Progress
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white min-h-[3rem] flex items-center justify-center px-4 transition-all duration-300">
            {messages[currentMessage]}
          </h2>

          {/* Precision percentage progress bar */}
          <div className="w-full bg-slate-900/80 rounded-full h-2.5 p-0.5 border border-slate-800 shadow-inner mt-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 h-1.5 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 mt-2 font-mono px-1">
            <span>CALIBRATING SENSORS</span>
            <span>{progress}% SECURE</span>
          </div>
        </div>

        {/* Security / Privacy reassurance badge */}
        <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 bg-slate-900/50 border border-slate-800/80 px-4 py-2.5 rounded-xl text-sm shadow-sm backdrop-blur-sm">
          <svg
            className="w-4 h-4 text-emerald-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="font-medium tracking-wide">Client-Side Sandbox (100% Private)</span>
        </div>
      </div>
    </div>
  );
}
