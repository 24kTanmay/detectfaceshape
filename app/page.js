"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UploadZone from "../components/UploadZone";
import AnalyzingScreen from "../components/AnalyzingScreen";
import FaceAnalyzer from "../components/FaceAnalyzer";
import ThemeToggle from "../components/ThemeToggle";

const faceShapes = [
  {
    name: "Oval",
    desc: "An oval face shape is characterized by balanced proportions where the face length is slightly longer than its width. The forehead is typically wider than the jawline, with softly rounded edges and a gently tapered chin. An oval shaped face is commonly described as even and symmetrical.",
    geometry: <ellipse cx="50" cy="46" rx="20" ry="28" stroke="currentColor" strokeWidth="2.5" fill="none" />,
    stats: [
      { label: "Length Ratio", val: "1.5x", pct: 75 },
      { label: "Jawline Angle", val: "Soft", pct: 40 },
      { label: "Forehead Width", val: "Balanced", pct: 60 }
    ]
  },
  {
    name: "Round",
    desc: "A round face shape has a similar width and length with soft, curved lines. The cheeks are usually full, and the jawline is smooth rather than sharp. A round shaped face often appears balanced and youthful, with fewer angles and a gently rounded overall appearance.",
    geometry: <circle cx="50" cy="46" r="23" stroke="currentColor" strokeWidth="2.5" fill="none" />,
    stats: [
      { label: "Length Ratio", val: "1.0x", pct: 30 },
      { label: "Jawline Angle", val: "Smooth", pct: 20 },
      { label: "Forehead Width", val: "Curved", pct: 85 }
    ]
  },
  {
    name: "Heart",
    desc: "A heart face shape is wider at the forehead and gradually narrows toward the chin. The cheekbones are often noticeable, and the chin may appear pointed. A heart shaped face creates a top-heavy appearance with a softer, slimmer lower face and clear facial contrast.",
    geometry: <path d="M50 72C50 72 28 56 28 42C28 31 37 24 46 28C48 29 50 31 50 31C50 31 52 29 54 28C63 24 72 31 72 42C72 56 50 72 50 72Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />,
    stats: [
      { label: "Length Ratio", val: "1.3x", pct: 60 },
      { label: "Jawline Angle", val: "Pointed", pct: 85 },
      { label: "Forehead Width", val: "Wide", pct: 90 }
    ]
  },
  {
    name: "Diamond",
    desc: "A diamond face shape has a narrow forehead and jawline with wide, prominent cheekbones. The face appears angular, with sharper lines and a slightly pointed chin. A diamond shaped face is less common and is defined by strong cheekbone structure and balanced facial length.",
    geometry: <polygon points="50,18 76,46 50,74 24,46" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />,
    stats: [
      { label: "Length Ratio", val: "1.4x", pct: 68 },
      { label: "Jawline Angle", val: "Angular", pct: 80 },
      { label: "Forehead Width", val: "Narrow", pct: 30 }
    ]
  },
  {
    name: "Square",
    desc: "A square face shape has strong, straight lines with similar width across the forehead, cheekbones, and jawline. The jaw is usually broad and well defined, creating a structured look. This face shape often appears balanced and angular, with clear edges rather than soft curves.",
    geometry: <rect x="27" y="23" width="46" height="46" rx="4" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />,
    stats: [
      { label: "Length Ratio", val: "1.0x", pct: 30 },
      { label: "Jawline Angle", val: "Sharp", pct: 95 },
      { label: "Forehead Width", val: "Broad", pct: 80 }
    ]
  },
  {
    name: "Oblong",
    desc: "An oblong face shape is longer than it is wide, with a straight cheek line and a narrow jaw. The forehead, cheeks, and jaw are usually similar in width. This face shape has a long, slim appearance with fewer curves and a more rectangular overall outline.",
    geometry: <rect x="32" y="16" width="36" height="60" rx="10" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />,
    stats: [
      { label: "Length Ratio", val: "1.8x", pct: 95 },
      { label: "Jawline Angle", val: "Straight", pct: 50 },
      { label: "Forehead Width", val: "Narrow", pct: 40 }
    ]
  }
];

const tableRows = [
  {
    name: "Round",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-rose-500/70" />
      </svg>
    ),
    mens: ["Short sides with volume on top", "Textured quiff", "Side-parted styles"],
    womens: ["Long layers", "Side-swept bangs", "High ponytails"]
  },
  {
    name: "Square",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32">
        <rect x="7" y="7" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-indigo-500/70" />
      </svg>
    ),
    mens: ["Crew cut", "Short textured crop", "Slicked-back styles"],
    womens: ["Soft waves", "Curtain bangs", "Long layered cuts"]
  },
  {
    name: "Oval",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32">
        <ellipse cx="16" cy="16" rx="8" ry="12" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-emerald-500/70" />
      </svg>
    ),
    mens: ["Buzz cut", "Pompadour", "Side part"],
    womens: ["Blunt bob", "Long waves", "Pixie cut"]
  },
  {
    name: "Heart",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32">
        <path d="M16 26s-8-5-8-10c0-3.5 2.5-6 6.5-4.5 1 .5 1.5 1.5 1.5 1.5s.5-1 1.5-1.5c4-1.5 6.5 1 6.5 4.5 0 5-8 10-8 10z" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-pink-500/70" />
      </svg>
    ),
    mens: ["Medium-length styles with side sweep", "Textured fringe"],
    womens: ["Chin-length bob", "Curtain/side bangs", "Loose waves"]
  },
  {
    name: "Diamond",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32">
        <polygon points="16,5 27,16 16,27 5,16" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-amber-500/70" />
      </svg>
    ),
    mens: ["Fringe", "Side-parted medium styles", "Slight volume on sides"],
    womens: ["Shoulder-length cuts", "Textured bobs", "Deep side parts"]
  },
  {
    name: "Oblong",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32">
        <rect x="9" y="5" width="14" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-cyan-500/70" />
      </svg>
    ),
    mens: ["Shorter sides with moderate top volume", "Side-swept bangs", "Textured crop or fringe to shorten face"],
    womens: ["Shoulder-length or layered cuts", "Side-swept bangs", "Wavy or curly styles to add width"]
  }
];

const faqs = [
  {
    q: "How can I detect my face shape with this tool?",
    a: "Simply upload a clear, front-facing photo or take a selfie using your webcam. The client-side AI will scan your facial landmarks instantly and determine your face shape."
  },
  {
    q: "Is the face shape detection accurate?",
    a: "Yes! The tool utilizes advanced MediaPipe WebAssembly models to calculate 468 precise biometric landmarks, evaluating facial length, width, jawline angles, and symmetry ratios to classify your shape accurately."
  },
  {
    q: "Can this help me choose a suitable hairstyle?",
    a: "Absolutely! Once your face shape is identified, our system generates custom styling suggestions and compatible haircut lists for both men and women to flatter your natural symmetry."
  },
  {
    q: "Do I need to download anything to use it?",
    a: "No downloads or installations are required. The entire process runs directly in your web browser, ensuring lightning-fast results."
  },
  {
    q: "Can I use this tool for free?",
    a: "Yes, DetectFaceShape.shop is 100% free to use. There are no hidden fees, signups, or subscription plans."
  },
  {
    q: "How does the tool identify my face shape?",
    a: "It scans the outer contour of your face, measures jawline angles, compares forehead width to cheekbone and jawline width, and evaluates height-to-width ratios."
  },
  {
    q: "What if I'm not sure about my face type?",
    a: "You can scan multiple photos or check our comprehensive guide below to manually compare your features with standard shapes."
  },
  {
    q: "Is this tool beginner-friendly?",
    a: "Yes, it is designed to be highly intuitive. Just upload a selfie, and the system handles all the analysis in less than 3 seconds."
  }
];

export default function Home() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, analyzing, error
  const [errorType, setErrorType] = useState(null); // no_face, multiple_faces, analysis_failed
  const [startTime, setStartTime] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedTableTab, setSelectedTableTab] = useState("Round");

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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

      {/* Futuristic Floating Navigation Header */}
      <header className="z-50 w-full max-w-6xl mx-auto px-6 py-4 mt-6 bg-white/70 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-900/80 rounded-2xl backdrop-blur-md flex justify-between items-center shadow-lg shadow-slate-100/30 dark:shadow-none relative">
        {/* Brand Left Column */}
        <Link href="/" className="flex items-center gap-3.5 group select-none">
          {/* Super premium three-pill overlapping logo exactly like reference! */}
          <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0 scale-110">
            {/* Pink/Rose Pill (Left, tilted right) */}
            <div className="absolute w-3.5 h-6.5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 rotate-[30deg] translate-x-[-3.5px] translate-y-[2px] opacity-90 transition-transform duration-300 group-hover:rotate-[45deg]" />
            {/* Blue/Cyan Pill (Right, tilted left) */}
            <div className="absolute w-3.5 h-6.5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 rotate-[-30deg] translate-x-[3.5px] translate-y-[2px] opacity-90 transition-transform duration-300 group-hover:rotate-[-45deg]" />
            {/* Indigo/Deep Blue Center-Top Overlapping Pill */}
            <div className="absolute w-3.5 h-6.5 rounded-full bg-gradient-to-b from-indigo-900 to-slate-900 dark:from-blue-100 dark:to-indigo-300 translate-y-[-4.5px] opacity-95 transition-transform duration-300 group-hover:scale-105" />
          </div>
          <span className="font-black tracking-tight text-base sm:text-lg text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-blue-500">
            Detect Face Shape
          </span>
        </Link>

        {/* Navigation Middle Sitemap Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150">
            Face Shape Detector
          </Link>
          <a href="#workflow" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150">
            About
          </a>
          <a href="#recommendations" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150">
            Blog
          </a>
          <Link href="/contact" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-150">
            Contact Us
          </Link>
        </nav>

        {/* Right side options: ThemeToggle */}
        <div className="flex items-center gap-5">
          <ThemeToggle />
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch w-full max-w-5xl text-left">
          {/* Left Column: Hero Image (Demo) */}
          <div className="md:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex">
            <img
              src="/hero_image.png"
              alt="AI Face Shape Detector Demo"
              className="w-full h-auto object-cover block"
            />
          </div>

          {/* Right Column: UploadZone */}
          <div className="md:col-span-5 w-full flex">
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

      {/* How to Use Section (Diagnostics Workflow UI) */}
      <section className="z-10 w-full max-w-5xl mx-auto px-6 py-20 text-center border-t border-slate-100 dark:border-slate-900/60">
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-semibold tracking-wider font-mono text-blue-500 uppercase">
            System Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            AI Scan & Analysis Pipeline
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans max-w-md mx-auto">
            How our client-side biometric parser calculates your structural geometry in three steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative flex flex-col items-start bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 text-left group hover:border-blue-500/40 transition-colors duration-300">
            <div className="absolute top-4 right-6 text-4xl font-black font-mono text-slate-200 dark:text-slate-800/40 select-none">
              01
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/10 mb-6 font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide font-mono text-blue-600 dark:text-blue-400">
              Input Capture
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Upload a front-facing selfie or drop a photo. The system immediately parses the file locally.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-start bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 text-left group hover:border-blue-500/40 transition-colors duration-300">
            <div className="absolute top-4 right-6 text-4xl font-black font-mono text-slate-200 dark:text-slate-800/40 select-none">
              02
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/10 mb-6 font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide font-mono text-indigo-600 dark:text-indigo-400">
              Biometric Mapping
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              MediaPipe WASM initializes client-side to calculate 468 landmark matrices without sending data to servers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-start bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 text-left group hover:border-blue-500/40 transition-colors duration-300">
            <div className="absolute top-4 right-6 text-4xl font-black font-mono text-slate-200 dark:text-slate-800/40 select-none">
              03
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/10 mb-6 font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.303.197l-1.591 1.591M21.75 12h-2.25m-.197 5.303l-1.591-1.591M12 21.75V19.5m-5.303-.197l1.591-1.591M2.25 12h2.25m.197-5.303l1.591 1.591" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide font-mono text-cyan-600 dark:text-cyan-400">
              Symmetry Report
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Review your customized face symmetry ratios, compatible hairstyles, and vector overlays instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Face Shape Types Section (Highly Unique Biometric ID Cards) */}
      <section className="z-10 w-full max-w-6xl mx-auto px-6 py-20 text-center border-t border-slate-100 dark:border-slate-900/60">
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-semibold tracking-wider font-mono text-blue-500 uppercase">
            Biometric Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Biometric Geometry Profiles
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans max-w-md mx-auto">
            Our neural mapping classifies facial structures into these six distinct geometric schemas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faceShapes.map((shape) => (
            <div
              key={shape.name}
              className="flex flex-col bg-slate-50/40 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-900 rounded-3xl p-6 hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all duration-300 group text-left relative overflow-hidden"
            >
              {/* Card Accent Grid Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
                    <path d="M 50 15 C 37 15 37 32 37 46 C 37 56 41 68 46 72 C 48 75 49 78 49 79 C 49 80 51 80 51 79 C 51 78 52 75 54 72 C 59 68 63 56 63 46 C 63 32 63 15 50 15 Z" fill="currentColor" opacity="0.08" />
                    {shape.geometry}
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Profile Schema</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {shape.name} Shape
                  </h3>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                {shape.desc}
              </p>

              {/* Advanced Biometric Stats display (100% Unique to us!) */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-900/60 space-y-2.5">
                {shape.stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-400 uppercase tracking-wider">{stat.label}</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{stat.val}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200/60 dark:bg-slate-900/80 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500/80 dark:bg-blue-400/80 rounded-full transition-all duration-500 group-hover:bg-blue-600" style={{ width: `${stat.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hairstyle Section (Interactive Dashboard Console - Zero Copied Tables!) */}
      <section className="z-10 w-full max-w-5xl mx-auto px-6 py-20 border-t border-slate-100 dark:border-slate-900/60">
        <div className="space-y-4 mb-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-semibold tracking-wider font-mono text-blue-500 uppercase">
            Interactive Advice
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Styling Compatibility Console
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans max-w-lg mx-auto">
            Select a biometric shape below to dynamically display optimized hair recommendations.
          </p>
        </div>

        {/* Tab row selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-slate-50 dark:bg-slate-950 p-2 rounded-2xl border border-slate-200/60 dark:border-slate-900 max-w-3xl mx-auto">
          {tableRows.map((row) => (
            <button
              key={row.name}
              onClick={() => setSelectedTableTab(row.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide uppercase transition-all duration-300 ${
                selectedTableTab === row.name
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/15"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-900/60"
              }`}
            >
              {row.icon}
              {row.name}
            </button>
          ))}
        </div>

        {/* Interactive result board card */}
        {(() => {
          const activeRow = tableRows.find((r) => r.name === selectedTableTab);
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-900 p-8 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Men column recommendations */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-900">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">♂</div>
                  <h4 className="font-mono text-sm uppercase tracking-wider font-bold text-slate-800 dark:text-slate-200">
                    Men&apos;s Styling Options
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {activeRow?.mens.map((style) => (
                    <div key={style} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-xl hover:border-blue-500/20 transition-all">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{style}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Women column recommendations */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-900">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">♀</div>
                  <h4 className="font-mono text-sm uppercase tracking-wider font-bold text-slate-800 dark:text-slate-200">
                    Women&apos;s Styling Options
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {activeRow?.womens.map((style) => (
                    <div key={style} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-xl hover:border-rose-500/20 transition-all">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{style}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* FAQ Section */}
      <section className="z-10 w-full max-w-4xl mx-auto px-6 py-20 border-t border-slate-100 dark:border-slate-900/60">
        <div className="space-y-4 mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-semibold tracking-wider font-mono text-blue-500 uppercase">
            FAQ Database
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Queries
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-slate-200 dark:border-slate-900 pb-4 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between py-3 text-left font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors focus:outline-none group"
              >
                <span className="flex items-center gap-3">
                  <span className="text-blue-500 group-hover:translate-x-0.5 transition-transform">▶</span>
                  {faq.q}
                </span>
                <span className={`text-xl font-bold text-yellow-500 transition-transform duration-300 ${openFaqIndex === index ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-350 ${
                  openFaqIndex === index ? "max-h-[300px] pt-2 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Futuristic Branded Sitemap Footer */}
      <footer className="z-10 w-full border-t border-slate-200/80 dark:border-slate-900/80 bg-slate-50 dark:bg-slate-950 py-16 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-200/85 dark:border-slate-900/60">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/30 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold font-mono tracking-wider text-sm uppercase text-slate-900 dark:text-white">
                DetectFaceShape<span className="text-blue-400">.shop</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Advanced AI-powered biometric facial analysis. Map 468 geometry nodes instantly in your browser to evaluate facial landmarks, jawline ratios, and hair styling compatibility.
            </p>
            {/* Live Online Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold font-mono text-emerald-500 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              MediaPipe WASM Engine Active
            </div>
          </div>

          {/* Tools Col */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Online Suite
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="text-slate-500 hover:text-blue-500 transition-colors">Face Shape Detector</Link></li>
              <li><Link href="/" className="text-slate-500 hover:text-blue-500 transition-colors">Symmetry Diagnostics</Link></li>
              <li><Link href="/" className="text-slate-500 hover:text-blue-500 transition-colors">Hairstyle Recommendations</Link></li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/contact" className="text-slate-500 hover:text-blue-500 transition-colors">Support Center</Link></li>
              <li><Link href="/contact" className="text-slate-500 hover:text-blue-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Connect Col */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Connect With Us
            </h4>
            <div className="flex gap-3">
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-200/50 dark:bg-slate-900 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-indigo-500 hover:text-white text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-200/50 dark:bg-slate-900 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Select Region</label>
              <select className="text-xs bg-slate-200/40 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-600 dark:text-slate-400 focus:outline-none focus:border-blue-500">
                <option value="en">English (US)</option>
              </select>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-mono gap-4">
          <p>© {new Date().getFullYear()} DetectFaceShape.shop. Powered by WebAssembly face-mesh algorithms. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-blue-500 transition-colors uppercase tracking-wider">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
