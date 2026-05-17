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
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Dynamic interactive drag-drop box */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 sm:p-14 cursor-pointer text-center select-none transition-all duration-300 ${
          isDragActive
            ? "border-cyan-400 bg-cyan-50 dark:bg-cyan-950/20 shadow-lg shadow-cyan-500/20 scale-[1.01]"
            : "border-blue-300 dark:border-slate-800 bg-white shadow-xl shadow-slate-200/50 dark:shadow-none dark:bg-slate-900/40 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-900/60 hover:shadow-blue-500/10"
        }`}
      >
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

        {/* Decorative laboratory crosshairs */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-blue-400 dark:border-slate-700/60" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-blue-400 dark:border-slate-700/60" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-blue-400 dark:border-slate-700/60" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-blue-400 dark:border-slate-700/60" />

        <div className="space-y-6">
          {/* Glowing upload visual circle */}
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-slate-950 border border-blue-200 dark:border-slate-800 group-hover:border-blue-400 dark:group-hover:border-blue-500/30 flex items-center justify-center mx-auto shadow-inner transition-all duration-300 group-hover:scale-105">
            {processing ? (
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-7 h-7 text-blue-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              {processing ? "Compressing biometrics..." : "Upload facial snapshot"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans max-w-xs mx-auto">
              Drag & drop a front-facing selfie, or click to browse local files.
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons, including Selfie camera */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center max-w-sm mx-auto z-20 relative">
        <button
          onClick={() => cameraInputRef.current.click()}
          className="w-auto px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-blue-900/20 active:scale-95 border border-transparent"
        >
          <svg
            className="w-4 h-4 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Take Selfie
        </button>
      </div>

      {/* Visual error feedback */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-lg text-center font-sans tracking-wide">
          ⚠️ {error}
        </div>
      )}

      {/* Security Privacy Notice */}
      <p className="text-slate-500 text-xs text-center flex items-center justify-center gap-1.5 font-sans pt-2">
        <span>🔒</span>
        Your photo is analyzed entirely on your device. It is never uploaded to any server.
      </p>
    </div>
  );
}
