"use client";

import React, { useRef, useState } from "react";
import { compressImage, fileToDataUrl } from "../utils/imageHelpers";

export default function UploadZone({ onImageSelected }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Unsupported file format. Please upload a valid image (JPEG, PNG).");
      return;
    }

    setError("");
    setProcessing(true);

    try {
      // 1. Compress image to improve processing performance
      const compressedBlob = await compressImage(file, 1000);
      
      // 2. Convert to Data URL for instant rendering & local sharing
      const dataUrl = await fileToDataUrl(compressedBlob);
      
      onImageSelected(dataUrl);
    } catch (err) {
      console.error("Image preprocessing failed:", err);
      setError("Failed to preprocess image. Please try a different photo.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/30 dark:shadow-none relative min-h-[460px]">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      
      {/* Hidden mobile camera input */}
      <input
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileChange}
        className="hidden"
        ref={cameraInputRef}
      />

      {/* Nested interactive drag-drop dashed container */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className={`group relative flex-grow flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer text-center select-none transition-all duration-300 ${
          isDragActive
            ? "border-cyan-400 bg-cyan-50/40 dark:bg-cyan-950/20 shadow-inner scale-[0.99]"
            : "border-blue-200/70 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/10 hover:border-blue-400 dark:hover:border-blue-500/20 hover:bg-blue-50/20 dark:hover:bg-slate-900/20"
        }`}
      >
        {/* Decorative laboratory crosshairs */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-blue-400 dark:border-slate-700/60" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-blue-400 dark:border-slate-700/60" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-blue-400 dark:border-slate-700/60" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-blue-400 dark:border-slate-700/60" />

        <div className="space-y-4 w-full py-4">
          {/* Glowing upload visual circle */}
          <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-slate-950 border border-blue-200/60 dark:border-slate-800 group-hover:border-blue-400 dark:group-hover:border-blue-500/30 flex items-center justify-center mx-auto shadow-inner transition-all duration-300 group-hover:scale-105">
            {processing ? (
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-6 h-6 text-blue-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-wide group-hover:text-blue-650 dark:group-hover:text-blue-300 transition-colors">
              {processing ? "Preparing analysis..." : "Biometric Capture Portal"}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans max-w-[220px] mx-auto">
              Drag & drop front-facing photo here or click to browse.
            </p>
          </div>
        </div>
      </div>

      {/* Control panel and privacy area (Directly inside outer card, under dashed area) */}
      <div className="w-full pt-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full z-10 relative">
          {/* Action 1: Choose File */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current.click();
            }}
            className="w-full sm:w-1/2 px-5 py-3 rounded-xl border border-blue-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-900 font-bold text-xs tracking-wider uppercase transition-all duration-200 active:scale-97 flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            Choose Image
          </button>

          {/* Action 2: Take Live Selfie */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              cameraInputRef.current.click();
            }}
            className="w-full sm:w-1/2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-650 dark:hover:bg-blue-550 text-white font-bold text-xs tracking-wider uppercase transition-all duration-200 active:scale-97 flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 dark:shadow-blue-950/20"
          >
            <svg className="w-4 h-4 text-blue-400 dark:text-white/80" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Take Selfie
          </button>
        </div>

        {/* Visual error feedback */}
        {error && (
          <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg text-center font-sans tracking-wide">
            ⚠️ {error}
          </div>
        )}

        {/* Security Privacy Notice */}
        <p className="text-slate-400 dark:text-slate-500 text-[10px] text-center flex items-center justify-center gap-1.5 font-mono pt-1">
          <span>🔒</span>
          Your snapshot is processed purely client-side.
        </p>
      </div>
    </div>
  );
}
