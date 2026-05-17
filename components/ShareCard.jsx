"use client";

import React, { useState } from "react";

export default function ShareCard({ symmetry, shape }) {
  const [copied, setCopied] = useState(false);
  const shareText = `My face symmetry score is ${symmetry}% and my face shape is ${shape}! Get your local face shape analysis at DetectFaceShape.shop (100% private, runs on-device).`;

  function copyToClipboard() {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
      {/* Decorative high-tech grid ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,#3b82f610,transparent)] pointer-events-none" />

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full mb-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Share Your Biometric Report</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono uppercase">
            Let friends compare their geometry and symmetry scores
          </p>
        </div>

        {/* High fidelity share card mockup preview */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-5 text-left font-mono relative overflow-hidden select-all shadow-inner">
          <div className="absolute top-2 right-2 text-[10px] text-slate-500 tracking-widest uppercase">
            VERIFIED_SCAN
          </div>
          <div className="text-[11px] text-blue-400 mb-2 font-semibold">🧬 BIOMETRIC SUMMARY</div>
          <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans italic border-l-2 border-blue-500 pl-3 py-1 bg-white/30 dark:bg-slate-900/30 rounded-r">
            &quot;{shareText}&quot;
          </p>
        </div>

        {/* Interactive glowing action button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={copyToClipboard}
            className={`w-full sm:w-auto min-w-[200px] px-6 py-3 rounded-xl text-sm font-bold tracking-wide uppercase shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              copied
                ? "bg-emerald-600 text-slate-900 dark:text-white shadow-emerald-500/10 cursor-default"
                : "bg-blue-600 hover:bg-blue-500 text-slate-900 dark:text-white shadow-blue-500/15 hover:shadow-blue-500/25 hover:-translate-y-0.5"
            }`}
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4 text-slate-900 dark:text-white animate-[bounce_0.5s_ease]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                REPORT COPIED!
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 text-slate-900 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                COPY REPORT TO SHARE
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
