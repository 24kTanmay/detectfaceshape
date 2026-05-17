"use client";

import React from "react";

export default function MetricCard({ label, value, description, icon }) {
  return (
    <div className="group relative bg-white/60 dark:bg-slate-900/60 border border-slate-300/80 dark:border-slate-800/80 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 overflow-hidden">
      {/* Decorative interactive hover slide background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-blue-500/5 group-hover:to-teal-500/5 transition-all duration-500 pointer-events-none" />

      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold tracking-wider font-mono text-slate-600 dark:text-slate-400 uppercase">
          {label}
        </span>
        {icon && (
          <div className="text-slate-500 group-hover:text-blue-400 transition-colors duration-300">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-200 transition-colors duration-300 font-mono">
          {value}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans mt-2">
        {description}
      </p>

      {/* Modern thin neon loading-style progress line indicator at the card bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-0 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </div>
  );
}
