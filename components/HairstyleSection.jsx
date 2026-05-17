"use client";

import React from "react";
import { hairstyleRecommendations } from "../lib/hairstyleData";

export default function HairstyleSection({ shape }) {
  const recommendations = hairstyleRecommendations[shape] || hairstyleRecommendations.oval;

  return (
    <div className="bg-white/40 dark:bg-slate-900/40 border border-slate-300/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-300 dark:border-slate-800">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold font-mono tracking-wider text-blue-400 uppercase">
              BIOMETRIC PROFILE
            </span>
            <span className="text-xs text-slate-500 font-mono">ID: {shape?.toUpperCase()}_SHAPE</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight capitalize">
            {shape} Face Geometry Recommendations
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {recommendations.description}
          </p>
        </div>

        {/* Strengths / Key Features List */}
        <div className="flex-shrink-0 space-y-2">
          <p className="text-xs font-semibold tracking-wider font-mono text-slate-600 dark:text-slate-400 uppercase">
            STRUCTURAL STRENGTHS
          </p>
          <div className="flex flex-wrap gap-2 md:flex-col md:items-start">
            {recommendations.strengths.map((strength, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400"
              >
                <svg
                  className="w-3 h-3 text-emerald-400"
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
                {strength}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Styles Grid */}
      <div className="mt-8">
        <h4 className="text-xs font-semibold tracking-wider font-mono text-slate-600 dark:text-slate-400 uppercase mb-5">
          TARGETED HAIRSTYLES
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.styles.map((style, idx) => {
            // Distinct icon per card position
            const icons = [
              // #01 — Scissors
              <svg key="scissors" className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
              </svg>,
              // #02 — Sparkles / star
              <svg key="sparkles" className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>,
              // #03 — Crown / trophy
              <svg key="crown" className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.853m0 0H12m2.77-.853a6.023 6.023 0 002.77-.853m-5.54 0H12m-2.77.853A6.023 6.023 0 017.73 9.728" />
              </svg>,
            ];

            return (
              <div
                key={idx}
                className="group relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 hover:border-blue-500/40 p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5"
              >
                {/* Card visual elements */}
                <div className="absolute top-4 right-4 text-slate-700 font-mono text-lg font-bold group-hover:text-blue-500/30 transition-colors">
                  #0{idx + 1}
                </div>

                <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:border-blue-500/30 transition-colors">
                  {icons[idx] || icons[0]}
                </div>

                <h5 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-200 transition-colors">
                  {style.name}
                </h5>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2 font-medium">
                  {style.reason}
                </p>

                {/* Glowing bottom line indicator on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white dark:bg-slate-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 w-0 group-hover:w-full transition-all duration-300 ease-out" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
