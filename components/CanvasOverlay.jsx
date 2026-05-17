"use client";

import React, { useRef, useEffect, useState } from "react";
import { LANDMARKS } from "../utils/landmarkIndices";

export default function CanvasOverlay({ imageDataUrl, landmarks }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showMesh, setShowMesh] = useState(true);
  const [showSymmetry, setShowSymmetry] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageDataUrl || !landmarks || landmarks.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Set canvas display aspect ratio
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      const w = canvas.width;
      const h = canvas.height;

      // Apply a dark vignette around edges so light photos blend into the dark UI
      const vignetteGrad = ctx.createRadialGradient(
        w / 2, h / 2, Math.min(w, h) * 0.35,
        w / 2, h / 2, Math.max(w, h) * 0.75
      );
      vignetteGrad.addColorStop(0, "rgba(2, 6, 23, 0)");
      vignetteGrad.addColorStop(0.7, "rgba(2, 6, 23, 0.3)");
      vignetteGrad.addColorStop(1, "rgba(2, 6, 23, 0.85)");
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, w, h);

      // 1. Draw connecting mesh triangles for authentic sci-fi technical appearance
      if (showMesh) {
        ctx.strokeStyle = "rgba(14, 165, 233, 0.25)"; // bright cyan mesh lines
        ctx.lineWidth = 0.8;

        // We can draw connections between eye corners, nose, cheeks, jaw for mesh visualization
        const connections = [
          // Jawline and cheeks contour
          [LANDMARKS.JAW_LEFT, LANDMARKS.CHEEK_LEFT],
          [LANDMARKS.CHEEK_LEFT, LANDMARKS.TEMPLE_LEFT],
          [LANDMARKS.TEMPLE_LEFT, LANDMARKS.FOREHEAD_TOP],
          [LANDMARKS.FOREHEAD_TOP, LANDMARKS.TEMPLE_RIGHT],
          [LANDMARKS.TEMPLE_RIGHT, LANDMARKS.CHEEK_RIGHT],
          [LANDMARKS.CHEEK_RIGHT, LANDMARKS.JAW_RIGHT],
          [LANDMARKS.JAW_RIGHT, LANDMARKS.CHIN_BOTTOM],
          [LANDMARKS.CHIN_BOTTOM, LANDMARKS.JAW_LEFT],

          // Eyes connection
          [LANDMARKS.LEFT_EYE_OUTER, LANDMARKS.LEFT_EYE_INNER],
          [LANDMARKS.RIGHT_EYE_INNER, LANDMARKS.RIGHT_EYE_OUTER],
          [LANDMARKS.LEFT_EYE_INNER, LANDMARKS.RIGHT_EYE_INNER],
          
          // Nose structure
          [LANDMARKS.NOSE_BASE, LANDMARKS.NOSE_TIP],
          [LANDMARKS.NOSE_TIP, LANDMARKS.MOUTH_TOP],
          [LANDMARKS.LEFT_EYE_INNER, LANDMARKS.NOSE_BASE],
          [LANDMARKS.RIGHT_EYE_INNER, LANDMARKS.NOSE_BASE],
          
          // Mouth structure
          [LANDMARKS.MOUTH_LEFT, LANDMARKS.MOUTH_TOP],
          [LANDMARKS.MOUTH_TOP, LANDMARKS.MOUTH_RIGHT],
          [LANDMARKS.MOUTH_RIGHT, LANDMARKS.MOUTH_BOTTOM],
          [LANDMARKS.MOUTH_BOTTOM, LANDMARKS.MOUTH_LEFT],

          // Outer Temple-Forehead connection
          [LANDMARKS.TEMPLE_LEFT, LANDMARKS.FOREHEAD_TOP],
          [LANDMARKS.TEMPLE_RIGHT, LANDMARKS.FOREHEAD_TOP]
        ];

        ctx.beginPath();
        for (const [p1, p2] of connections) {
          if (landmarks[p1] && landmarks[p2]) {
            ctx.moveTo(landmarks[p1].x * w, landmarks[p1].y * h);
            ctx.lineTo(landmarks[p2].x * w, landmarks[p2].y * h);
          }
        }
        ctx.stroke();
      }

      // 2. Draw 468 landmark dots
      if (showLandmarks) {
        ctx.fillStyle = "rgba(34, 211, 238, 0.75)"; // glowing cyan landmarks
        for (let i = 0; i < landmarks.length; i++) {
          const point = landmarks[i];
          ctx.beginPath();
          ctx.arc(point.x * w, point.y * h, Math.max(1.5, w * 0.002), 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      // 3. Draw key structural geometric highlights (Jawline + Cheekbone line + Eye spacing line)
      if (showSymmetry) {
        // Jawline (neon emerald)
        ctx.strokeStyle = "#10b981"; 
        ctx.lineWidth = Math.max(2, w * 0.003);
        ctx.beginPath();
        ctx.moveTo(landmarks[LANDMARKS.JAW_LEFT].x * w, landmarks[LANDMARKS.JAW_LEFT].y * h);
        ctx.lineTo(landmarks[LANDMARKS.CHIN_BOTTOM].x * w, landmarks[LANDMARKS.CHIN_BOTTOM].y * h);
        ctx.lineTo(landmarks[LANDMARKS.JAW_RIGHT].x * w, landmarks[LANDMARKS.JAW_RIGHT].y * h);
        ctx.stroke();

        // Cheekbones / widest point (neon golden yellow)
        ctx.strokeStyle = "#f59e0b";
        ctx.beginPath();
        ctx.moveTo(landmarks[LANDMARKS.CHEEK_LEFT].x * w, landmarks[LANDMARKS.CHEEK_LEFT].y * h);
        ctx.lineTo(landmarks[LANDMARKS.CHEEK_RIGHT].x * w, landmarks[LANDMARKS.CHEEK_RIGHT].y * h);
        ctx.stroke();

        // Vertical mid-line symmetry (neon violet)
        ctx.strokeStyle = "#8b5cf6";
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(landmarks[LANDMARKS.FACE_CENTER_TOP].x * w, landmarks[LANDMARKS.FACE_CENTER_TOP].y * h);
        ctx.lineTo(landmarks[LANDMARKS.FACE_CENTER_BOTTOM].x * w, landmarks[LANDMARKS.FACE_CENTER_BOTTOM].y * h);
        ctx.stroke();
        ctx.setLineDash([]); // reset dashes
      }

      setImageLoaded(true);
    };

    img.src = imageDataUrl;
  }, [imageDataUrl, landmarks, showLandmarks, showMesh, showSymmetry]);

  return (
    <div ref={containerRef} className="flex flex-col bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header section with interactive scan status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-b border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Interactive 3D Landmark Grid</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1 uppercase">Local WebAssembly Vector Mapping</p>
        </div>
        
        {/* Toggle buttons for layers */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowMesh(!showMesh)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider font-mono border transition-all duration-300 ${
              showMesh
                ? "bg-sky-500/10 text-sky-400 border-sky-500/30"
                : "bg-slate-50 dark:bg-slate-950 text-slate-500 border-slate-200 dark:border-slate-900"
            }`}
          >
            MESH GRAPH
          </button>
          <button
            onClick={() => setShowLandmarks(!showLandmarks)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider font-mono border transition-all duration-300 ${
              showLandmarks
                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                : "bg-slate-50 dark:bg-slate-950 text-slate-500 border-slate-200 dark:border-slate-900"
            }`}
          >
            LANDMARKS (468)
          </button>
          <button
            onClick={() => setShowSymmetry(!showSymmetry)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider font-mono border transition-all duration-300 ${
              showSymmetry
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-slate-50 dark:bg-slate-950 text-slate-500 border-slate-200 dark:border-slate-900"
            }`}
          >
            AXES OVERLAYS
          </button>
        </div>
      </div>

      {/* Canvas wrapper with modern medical scan guidelines */}
      <div className="relative flex justify-center bg-slate-50 dark:bg-slate-950 p-6 sm:p-12 overflow-hidden select-none">
        {/* Decorative corner crosshairs */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-slate-400/80 dark:border-slate-700/80 pointer-events-none" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-slate-400/80 dark:border-slate-700/80 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-slate-400/80 dark:border-slate-700/80 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-slate-400/80 dark:border-slate-700/80 pointer-events-none" />

        <div className="relative max-w-full max-h-[60vh] flex items-center justify-center border border-slate-300/60 dark:border-slate-800/60 rounded-xl overflow-hidden shadow-2xl">
          <canvas
            ref={canvasRef}
            className="w-full h-auto object-contain max-h-[60vh]"
            style={{ display: imageLoaded ? "block" : "none" }}
          />
          {!imageLoaded && (
            <div className="flex flex-col items-center justify-center p-20 text-slate-500 space-y-4">
              <div className="w-8 h-8 border-2 border-slate-400 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-sm font-mono uppercase tracking-wider">Rendering Canvas Grid...</p>
            </div>
          )}
        </div>
      </div>

      {/* Legend with interactive colored indicators */}
      <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-900 flex flex-wrap gap-4 text-xs font-mono justify-center sm:justify-start">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-600 dark:text-slate-400">468 Landmarked Vertices</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 bg-emerald-500" />
          <span className="text-slate-600 dark:text-slate-400">Jaw Corner Vectors</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 bg-amber-500" />
          <span className="text-slate-600 dark:text-slate-400">Cheekbone Biometrics</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 border-t-2 border-dashed border-violet-500" />
          <span className="text-slate-600 dark:text-slate-400">Bilateral Symmetry Midline</span>
        </div>
      </div>
    </div>
  );
}
