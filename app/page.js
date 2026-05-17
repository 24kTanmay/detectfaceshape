"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UploadZone from "../components/UploadZone";
import AnalyzingScreen from "../components/AnalyzingScreen";
import FaceAnalyzer from "../components/FaceAnalyzer";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, analyzing, error
  const [errorType, setErrorType] = useState(null); // no_face, multiple_faces, analysis_failed
  const [startTime, setStartTime] = useState(null);

  const handleImageSelected = (dataUrl) => {
    setImageSrc(dataUrl);
    setStatus("analyzing");
    setErrorType(null);
    setStartTime(Date.now());
  };

  const handleAnalysisComplete = (result) => {
    try {
      const analysisData = {
        shape: result.shape,
        metrics: result.metrics,
        imageDataUrl: imageSrc,
      };
      
      // Save data locally for Results page retrieval
      localStorage.setItem("face_analysis_data", JSON.stringify(analysisData));

      // Build perceived product quality - hold scanning animation for at least 3.2s
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 3200 - elapsed);

      setTimeout(() => {
        router.push("/results");
      }, delay);
    } catch (err) {
      console.error("Storage error:", err);
      setStatus("error");
      setErrorType("analysis_failed");
    }
  };

  const handleAnalysisError = (type) => {
    console.error("Face Analysis Error:", type);
    setStatus("error");
    setErrorType(type);
  };

  const handleReset = () => {
    setImageSrc(null);
    setStatus("idle");
    setErrorType(null);
  };

  // Rendering Error screens inside high-tech card layout
  if (status === "error") {
    let errorHeadline = "Analysis Calibration Error";
    let errorMessage = "The face scanning process was interrupted. Please review the criteria below.";
    
    if (errorType === "no_face") {
      errorHeadline = "Zero Face Vertices Detected";
      errorMessage = "The system failed to detect any face structure in the provided snapshot. Ensure your face is fully visible, well-lit, and directly facing the camera.";
    } else if (errorType === "multiple_faces") {
      errorHeadline = "Multiple Face Clusters Detected";
      errorMessage = "The diagnostic engine detected more than one person in the frame. Please upload a clear photo with only a single, front-facing person.";
    } else if (errorType === "image_load_failed") {
      errorHeadline = "Image Frame Failure";
      errorMessage = "Failed to open the image source. The file may be corrupt or formatted incorrectly. Try converting it to standard JPG or PNG.";
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-950 text-slate-100 p-6 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-30 pointer-events-none" />
        
        <div className="z-10 max-w-md w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          {/* Diagnostic Error Visual */}
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 animate-[pulse_2s_infinite]"
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 border border-red-800 text-[10px] font-mono tracking-widest text-red-400 uppercase">
              SCAN_STATUS: FAILED
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{errorHeadline}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{errorMessage}</p>
          </div>

          {/* Guidelines checklist */}
          <div className="bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 rounded-xl p-4 text-left text-xs text-slate-600 dark:text-slate-400 space-y-2.5 font-sans">
            <div className="font-semibold text-slate-700 dark:text-slate-300 font-mono tracking-wide uppercase mb-1">RECOMMENDED SCAN GUIDELINES:</div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Front-facing view: Look directly at the camera.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Proper lighting: Avoid deep shadows or intense backlighting.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Single subject: Ensure only your face is present in the viewport.</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-900 dark:text-white font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-95"
          >
            Re-Calibrate scanner
          </button>
        </div>
      </div>
    );
  }

  // Rendering Active scanning overlay
  if (status === "analyzing" && imageSrc) {
    return (
      <>
        <AnalyzingScreen />
        <FaceAnalyzer
          imageSrc={imageSrc}
          onAnalysisComplete={handleAnalysisComplete}
          onAnalysisError={handleAnalysisError}
        />
      </>
    );
  }

  // Default Landing Page
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden select-none">
      {/* High tech technical grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-35 pointer-events-none" />

      {/* Radiant ambient glow */}
      <div className="absolute top-[-10%] left-[5%] w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[40rem] h-[40rem] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-200/60 dark:border-slate-900/60 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/10">
            <svg
              className="w-5 h-5 text-slate-900 dark:text-white"
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
          </div>
          <span className="font-bold font-mono tracking-wider text-sm uppercase text-slate-900 dark:text-white">
            DetectFaceShape<span className="text-blue-400">.shop</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[10px] font-mono tracking-widest text-slate-600 dark:text-slate-400 uppercase">
            WASM_V1.0.0
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="z-10 flex-grow flex flex-col items-center justify-center px-6 py-12 sm:py-20 text-center max-w-6xl mx-auto space-y-12 w-full">
        {/* Title Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider font-mono text-blue-400 uppercase shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Local Client-Side Diagnostics
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-4xl mx-auto">
            AI Face Shape Detector – Detect Face Shape Instantly
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-sans max-w-3xl mx-auto leading-relaxed">
            Want to know which styles suit you best? Our AI Face Shape Detector makes it easy to find your face shape and get simple, personalized ideas for hairstyles, makeup, and more, so you can feel confident in every look.
          </p>
        </div>

        {/* Split Grid: Left side Image, Right side Upload Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full max-w-5xl text-left">
          {/* Left Column: Hero Image (Demo) */}
          <div className="md:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <img
              src="/hero_image.png"
              alt="AI Face Shape Detector Demo"
              className="w-full h-auto object-cover block"
            />
          </div>

          {/* Right Column: UploadZone */}
          <div className="md:col-span-5 w-full">
            <UploadZone onImageSelected={handleImageSelected} />
          </div>
        </div>

        {/* Features Specs list */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl pt-8 border-t border-slate-200/80 dark:border-slate-900/80">
          <div className="p-4 bg-white/20 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-900/60 rounded-xl space-y-1">
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">468 POINTS</div>
            <div className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">Face Mesh Scan</div>
          </div>
          <div className="p-4 bg-white/20 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-900/60 rounded-xl space-y-1">
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">100% SECURE</div>
            <div className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">No Server Uploads</div>
          </div>
          <div className="p-4 bg-white/20 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-900/60 rounded-xl space-y-1">
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">BIO-METRIC</div>
            <div className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">Symmetry & Jawline</div>
          </div>
          <div className="p-4 bg-white/20 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-900/60 rounded-xl space-y-1">
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">STYLING</div>
            <div className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">Style Matches</div>
          </div>
        </div>
      </section>

      {/* Sticky Footer */}
      <footer className="z-10 w-full border-t border-slate-200/60 dark:border-slate-900/60 py-6 px-6 bg-white/50 dark:bg-slate-950/20 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500 font-sans">
          © {new Date().getFullYear()} DetectFaceShape.shop. Powered by client-side MediaPipe WASM.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider font-bold">Contact Us</Link>
        </div>
      </footer>
    </main>
  );
}
