"use client";

import React, { useEffect, useState } from "react";
import { calculateAllMetrics } from "../lib/faceMetrics";
import { classifyFaceShape } from "../lib/faceClassifier";

// Helper to dynamically load external scripts for 100% bulletproof Next.js support
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", resolve);
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function FaceAnalyzer({ imageSrc, onAnalysisComplete, onAnalysisError }) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Loading analysis models...");

  useEffect(() => {
    if (!imageSrc) return;

    let isSubscribed = true;
    let faceMeshInstance = null;

    async function runAnalysis() {
      try {
        setStatus("Loading WebAssembly AI engine...");
        
        // Load MediaPipe Face Mesh from CDN for complete Next.js bundler compatibility
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js");
        
        if (!isSubscribed) return;

        if (!window.FaceMesh) {
          throw new Error("MediaPipe Face Mesh library failed to initialize.");
        }

        setStatus("Initializing AI model graph...");
        
        // Initialize FaceMesh
        faceMeshInstance = new window.FaceMesh({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
          },
        });

        faceMeshInstance.setOptions({
          maxNumFaces: 2, // Allow detecting up to 2 so we can throw custom error for multiple faces
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        faceMeshInstance.onResults((results) => {
          if (!isSubscribed) return;

          const faces = results.multiFaceLandmarks;
          
          if (!faces || faces.length === 0) {
            onAnalysisError("no_face");
            return;
          }

          if (faces.length > 1) {
            onAnalysisError("multiple_faces");
            return;
          }

          // Single face successfully detected
          const landmarks = faces[0];
          
          setStatus("Extracting facial geometry...");
          const metrics = calculateAllMetrics(landmarks);
          const shape = classifyFaceShape(metrics);

          onAnalysisComplete({
            shape,
            metrics: {
              ...metrics,
              landmarks // Store all 468 landmarks for canvas drawing
            }
          });
        });

        setStatus("Processing image frame...");
        
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = async () => {
          if (!isSubscribed) return;
          try {
            await faceMeshInstance.send({ image: img });
          } catch (err) {
            console.error("FaceMesh send error:", err);
            onAnalysisError("analysis_failed");
          }
        };
        img.onerror = () => {
          if (isSubscribed) onAnalysisError("image_load_failed");
        };
        img.src = imageSrc;

      } catch (err) {
        console.error("Analysis setup error:", err);
        if (isSubscribed) onAnalysisError("setup_failed");
      }
    }

    runAnalysis();

    return () => {
      isSubscribed = false;
      if (faceMeshInstance) {
        try {
          faceMeshInstance.close();
        } catch (e) {
          console.error("Error closing FaceMesh:", e);
        }
      }
    };
  }, [imageSrc, onAnalysisComplete, onAnalysisError]);

  return (
    <div className="hidden">
      {/* Hidden container for background processing */}
      <span className="sr-only">Face Analyzer Active: {status}</span>
    </div>
  );
}
