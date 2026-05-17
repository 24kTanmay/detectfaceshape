# Face Analysis SaaS — Detailed AI Build Plan

## Project Overview

Build a client-side web application where a user uploads a photo of their face and receives:
- Face shape classification (oval, round, square, oblong, heart, diamond)
- Geometry metrics (symmetry %, jawline sharpness, eye spacing, face ratio)
- Hairstyle recommendations based on detected face shape
- Visual overlay of facial landmarks drawn on a canvas
- A shareable result card

**Core constraint:** No backend, no database, no auth. Everything runs in the browser using MediaPipe Face Mesh (WebAssembly). Zero AI API costs.

---

## Tech Stack

| Layer | Tool | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Easy Vercel deploy, SSR control, good defaults |
| Styling | Tailwind CSS | Fast, consistent, dark theme friendly |
| Face Detection | MediaPipe Face Mesh | Free, 468 landmarks, runs in browser via WASM |
| Canvas Drawing | HTML Canvas API (native) | No extra dependency needed |
| Deployment | Vercel | Free tier, auto-deploy from GitHub |

---

## Critical Setup Notes for Next.js + MediaPipe

MediaPipe uses WebAssembly and does NOT work with Next.js server-side rendering. You MUST do the following or it will crash:

```js
// In any component that uses MediaPipe, import it like this:
const FaceMesh = dynamic(() => import('../components/FaceAnalyzer'), {
  ssr: false
});
```

Also install the correct package:
```bash
npm install @mediapipe/face_mesh @mediapipe/camera_utils
```

MediaPipe needs its WASM files served from a CDN. In your component, initialize it like this:

```js
const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  }
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
```

---

## File Structure

```
/app
  /page.jsx              ← Landing page with upload UI
  /results/page.jsx      ← Results dashboard (receives analysis via state/localStorage)
  /layout.jsx            ← Global layout, fonts, dark theme

/components
  /UploadZone.jsx        ← Drag-and-drop image upload area
  /FaceAnalyzer.jsx      ← MediaPipe init + landmark extraction (NO SSR)
  /CanvasOverlay.jsx     ← Draws landmarks and lines on canvas
  /MetricCard.jsx        ← Single reusable metric display card
  /HairstyleCard.jsx     ← Card showing one hairstyle recommendation
  /ShareCard.jsx         ← Generates the shareable image/text card
  /AnalyzingScreen.jsx   ← Animated loading screen shown during analysis

/lib
  /faceMetrics.js        ← All geometry calculation functions
  /faceClassifier.js     ← Face shape classification logic
  /hairstyleData.js      ← Hardcoded hairstyle recommendations per face shape

/utils
  /landmarkIndices.js    ← Named constants for MediaPipe landmark point numbers
  /imageHelpers.js       ← Image compression and canvas helpers
```

---

## MediaPipe Landmark Indices Reference

MediaPipe returns an array of 468 points. You must use specific indices for accurate measurements. Save these as named constants — never use raw numbers in your logic:

```js
// /utils/landmarkIndices.js

export const LANDMARKS = {
  // Face boundary
  CHIN_BOTTOM: 152,
  FOREHEAD_TOP: 10,

  // Jaw corners
  JAW_LEFT: 234,
  JAW_RIGHT: 454,

  // Cheekbones (widest point of face)
  CHEEK_LEFT: 116,
  CHEEK_RIGHT: 345,

  // Temple / forehead width
  TEMPLE_LEFT: 103,
  TEMPLE_RIGHT: 332,

  // Eyes
  LEFT_EYE_INNER: 133,
  LEFT_EYE_OUTER: 33,
  RIGHT_EYE_INNER: 362,
  RIGHT_EYE_OUTER: 263,

  // Nose
  NOSE_TIP: 4,
  NOSE_BASE: 2,

  // Lips
  MOUTH_LEFT: 61,
  MOUTH_RIGHT: 291,
  MOUTH_TOP: 0,
  MOUTH_BOTTOM: 17,

  // Mid-face symmetry line
  FACE_CENTER_TOP: 10,
  FACE_CENTER_BOTTOM: 152,
};
```

---

## Geometry Calculations

All functions go in `/lib/faceMetrics.js`. Each function takes the `landmarks` array from MediaPipe (normalized 0–1 coordinates) and returns a number or string.

### Helper: Distance Between Two Points

```js
function distance(p1, p2) {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
  );
}
```

### 1. Face Height / Width Ratio

```js
export function getFaceRatio(landmarks) {
  const faceHeight = distance(landmarks[LANDMARKS.FOREHEAD_TOP], landmarks[LANDMARKS.CHIN_BOTTOM]);
  const faceWidth = distance(landmarks[LANDMARKS.CHEEK_LEFT], landmarks[LANDMARKS.CHEEK_RIGHT]);
  return faceHeight / faceWidth;
}
```

### 2. Jaw Width

```js
export function getJawWidth(landmarks) {
  return distance(landmarks[LANDMARKS.JAW_LEFT], landmarks[LANDMARKS.JAW_RIGHT]);
}
```

### 3. Cheekbone Width

```js
export function getCheekboneWidth(landmarks) {
  return distance(landmarks[LANDMARKS.CHEEK_LEFT], landmarks[LANDMARKS.CHEEK_RIGHT]);
}
```

### 4. Forehead Width

```js
export function getForeheadWidth(landmarks) {
  return distance(landmarks[LANDMARKS.TEMPLE_LEFT], landmarks[LANDMARKS.TEMPLE_RIGHT]);
}
```

### 5. Eye Spacing Ratio

```js
export function getEyeSpacingRatio(landmarks) {
  const leftEyeWidth = distance(landmarks[LANDMARKS.LEFT_EYE_INNER], landmarks[LANDMARKS.LEFT_EYE_OUTER]);
  const rightEyeWidth = distance(landmarks[LANDMARKS.RIGHT_EYE_INNER], landmarks[LANDMARKS.RIGHT_EYE_OUTER]);
  const eyeGap = distance(landmarks[LANDMARKS.LEFT_EYE_INNER], landmarks[LANDMARKS.RIGHT_EYE_INNER]);
  const avgEyeWidth = (leftEyeWidth + rightEyeWidth) / 2;
  return eyeGap / avgEyeWidth;
  // < 1.0 = close-set, 1.0 = average, > 1.3 = wide-set
}
```

### 6. Symmetry Score (0–100%)

```js
export function getSymmetryScore(landmarks) {
  // Calculate the vertical midline as the average x of top and bottom center points
  const midX = (landmarks[LANDMARKS.FACE_CENTER_TOP].x + landmarks[LANDMARKS.FACE_CENTER_BOTTOM].x) / 2;

  // Mirror pairs: [left index, right index]
  const pairs = [
    [LANDMARKS.JAW_LEFT, LANDMARKS.JAW_RIGHT],
    [LANDMARKS.CHEEK_LEFT, LANDMARKS.CHEEK_RIGHT],
    [LANDMARKS.TEMPLE_LEFT, LANDMARKS.TEMPLE_RIGHT],
    [LANDMARKS.LEFT_EYE_OUTER, LANDMARKS.RIGHT_EYE_OUTER],
    [LANDMARKS.LEFT_EYE_INNER, LANDMARKS.RIGHT_EYE_INNER],
    [LANDMARKS.MOUTH_LEFT, LANDMARKS.MOUTH_RIGHT],
  ];

  let totalDeviation = 0;

  for (const [leftIdx, rightIdx] of pairs) {
    const leftDist = Math.abs(landmarks[leftIdx].x - midX);
    const rightDist = Math.abs(landmarks[rightIdx].x - midX);
    const yDiff = Math.abs(landmarks[leftIdx].y - landmarks[rightIdx].y);
    totalDeviation += Math.abs(leftDist - rightDist) + yDiff * 0.5;
  }

  const avgDeviation = totalDeviation / pairs.length;
  // Normalize: 0 deviation = 100%, 0.05+ deviation = 0% (scale is 0–1 normalized coords)
  const score = Math.max(0, Math.min(100, (1 - avgDeviation / 0.05) * 100));
  return Math.round(score);
}
```

### 7. Jawline Sharpness

```js
export function getJawlineSharpness(landmarks) {
  const jawWidth = getJawWidth(landmarks);
  const chinToJawLeft = distance(landmarks[LANDMARKS.CHIN_BOTTOM], landmarks[LANDMARKS.JAW_LEFT]);
  const chinToJawRight = distance(landmarks[LANDMARKS.CHIN_BOTTOM], landmarks[LANDMARKS.JAW_RIGHT]);
  const avgAngleArm = (chinToJawLeft + chinToJawRight) / 2;

  // Sharpness = ratio of chin-to-jaw-corner vs jaw width
  // Higher ratio = more pointed chin = sharper jawline
  const ratio = avgAngleArm / jawWidth;

  if (ratio > 0.65) return "Very Sharp";
  if (ratio > 0.55) return "Sharp";
  if (ratio > 0.45) return "Average";
  return "Soft";
}
```

---

## Face Shape Classification

Goes in `/lib/faceClassifier.js`. Takes all the metrics as input and returns a shape string.

```js
export function classifyFaceShape({ faceRatio, jawWidth, cheekboneWidth, foreheadWidth }) {
  const jawToCheek = jawWidth / cheekboneWidth;
  const foreheadToCheek = foreheadWidth / cheekboneWidth;

  // Oblong: very tall face
  if (faceRatio > 1.75) return "oblong";

  // Round: wide and short, similar jaw/cheek/forehead
  if (faceRatio < 1.25 && jawToCheek > 0.85) return "round";

  // Square: jaw nearly as wide as cheekbones, shorter face
  if (jawToCheek > 0.9 && faceRatio < 1.5) return "square";

  // Heart: wide forehead, narrow jaw
  if (foreheadToCheek > 0.95 && jawToCheek < 0.75) return "heart";

  // Diamond: narrow forehead, wide cheeks, narrow jaw
  if (foreheadToCheek < 0.8 && jawToCheek < 0.8) return "diamond";

  // Oval: default (balanced proportions)
  return "oval";
}
```

---

## Hairstyle Recommendation Data

Goes in `/lib/hairstyleData.js`. Hardcoded. Easily expandable later.

```js
export const hairstyleRecommendations = {
  oval: {
    description: "Oval faces suit almost any hairstyle. Your balanced proportions give you maximum flexibility.",
    strengths: ["Balanced proportions", "Versatile with styles", "Defined cheekbones"],
    styles: [
      { name: "Textured Crop", reason: "Enhances natural balance" },
      { name: "Side Part", reason: "Classic look that works perfectly" },
      { name: "Quiff", reason: "Adds height without looking unbalanced" },
    ]
  },
  round: {
    description: "Round faces benefit from styles that add height and reduce width.",
    strengths: ["Youthful appearance", "Soft features", "Friendly look"],
    styles: [
      { name: "Pompadour", reason: "Adds vertical height to elongate the face" },
      { name: "Textured Quiff", reason: "Height on top counterbalances width" },
      { name: "Faux Hawk", reason: "Creates the illusion of a longer face" },
    ]
  },
  square: {
    description: "Square faces have a strong jawline. Softer styles complement this well.",
    strengths: ["Strong jawline", "Masculine structure", "Defined features"],
    styles: [
      { name: "Ivy League", reason: "Soft top softens the jaw angles" },
      { name: "Textured Fringe", reason: "Breaks up the angular forehead line" },
      { name: "Slick Back", reason: "Highlights your strong bone structure" },
    ]
  },
  oblong: {
    description: "Oblong faces are longer than wide. Styles with volume on the sides work best.",
    strengths: ["Elegant proportions", "Defined chin", "Versatile structure"],
    styles: [
      { name: "Side Part with Volume", reason: "Adds width to balance length" },
      { name: "Textured Mid-Length", reason: "Reduces apparent face length" },
      { name: "Curtain Hair", reason: "Side-swept fringe shortens visual length" },
    ]
  },
  heart: {
    description: "Heart faces have a wider forehead and narrower jaw. Volume near the jaw helps balance.",
    strengths: ["Prominent cheekbones", "Defined forehead", "Tapered chin"],
    styles: [
      { name: "Side Swept Fringe", reason: "Reduces forehead width visually" },
      { name: "Textured Medium Length", reason: "Adds volume near jaw to balance proportions" },
      { name: "Undercut with Length on Top", reason: "Draws attention downward" },
    ]
  },
  diamond: {
    description: "Diamond faces have high cheekbones and a narrow forehead and jaw.",
    strengths: ["High cheekbones", "Striking structure", "Angular features"],
    styles: [
      { name: "Side Part", reason: "Adds width at the forehead" },
      { name: "Textured Fringe", reason: "Broadens the upper face" },
      { name: "Quiff", reason: "Balances cheekbone prominence with height" },
    ]
  }
};
```

---

## Page Flow

```
/ (Landing Page)
  → User sees hero section: headline + upload button
  → User clicks upload or drags image

/analyze (client-side, no route change needed)
  → Image loads into hidden <img> tag
  → MediaPipe runs face detection
  → Analyzing screen shows for 3–4 seconds with animated messages
  → Results appear on same page or navigate to /results

/results
  → Face Shape section
  → Geometry Metrics grid
  → Hairstyle Recommendations
  → Canvas Overlay (visual landmark drawing)
  → Share Card generator
```

---

## Analyzing Screen Component

Show this for 3–4 seconds even if analysis completes faster. It builds perceived product quality.

```jsx
// /components/AnalyzingScreen.jsx
const messages = [
  "Detecting facial landmarks...",
  "Analyzing jaw structure...",
  "Calculating symmetry score...",
  "Measuring facial proportions...",
  "Generating hairstyle recommendations...",
];

export default function AnalyzingScreen() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8" />
      <p className="text-white text-xl font-medium animate-pulse">
        {messages[currentMessage]}
      </p>
    </div>
  );
}
```

---

## Canvas Overlay Drawing

Draw on top of the uploaded image to show the detected face structure.

```js
// /components/CanvasOverlay.jsx

function drawOverlay(canvas, image, landmarks) {
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw original image
  ctx.drawImage(image, 0, 0);

  const w = canvas.width;
  const h = canvas.height;

  // Draw all 468 landmark dots
  ctx.fillStyle = 'rgba(0, 200, 255, 0.6)';
  for (const point of landmarks) {
    ctx.beginPath();
    ctx.arc(point.x * w, point.y * h, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Draw jaw line
  ctx.strokeStyle = 'rgba(0, 255, 150, 0.8)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(landmarks[LANDMARKS.JAW_LEFT].x * w, landmarks[LANDMARKS.JAW_LEFT].y * h);
  ctx.lineTo(landmarks[LANDMARKS.CHIN_BOTTOM].x * w, landmarks[LANDMARKS.CHIN_BOTTOM].y * h);
  ctx.lineTo(landmarks[LANDMARKS.JAW_RIGHT].x * w, landmarks[LANDMARKS.JAW_RIGHT].y * h);
  ctx.stroke();

  // Draw face width line (cheekbones)
  ctx.strokeStyle = 'rgba(255, 200, 0, 0.8)';
  ctx.beginPath();
  ctx.moveTo(landmarks[LANDMARKS.CHEEK_LEFT].x * w, landmarks[LANDMARKS.CHEEK_LEFT].y * h);
  ctx.lineTo(landmarks[LANDMARKS.CHEEK_RIGHT].x * w, landmarks[LANDMARKS.CHEEK_RIGHT].y * h);
  ctx.stroke();
}
```

---

## Results Page Layout (Component Structure)

```jsx
// /app/results/page.jsx

export default function ResultsPage() {
  const { shape, metrics, imageDataUrl } = useAnalysisStore(); // from state/context

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">

      {/* Section 1: Face Shape */}
      <FaceShapeSection shape={shape} />

      {/* Section 2: Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <MetricCard label="Symmetry" value={`${metrics.symmetry}%`} />
        <MetricCard label="Jawline" value={metrics.jawlineSharpness} />
        <MetricCard label="Eye Spacing" value={metrics.eyeSpacing} />
        <MetricCard label="Face Ratio" value={metrics.faceRatio.toFixed(2)} />
      </div>

      {/* Section 3: Hairstyle Recommendations */}
      <HairstyleSection shape={shape} />

      {/* Section 4: Visual Overlay */}
      <CanvasOverlay imageDataUrl={imageDataUrl} landmarks={metrics.landmarks} />

      {/* Section 5: Share Card */}
      <ShareCard symmetry={metrics.symmetry} shape={shape} />

    </main>
  );
}
```

---

## Error Handling (Critical — Do Not Skip)

You must handle these failure cases or users will get a broken blank screen:

```js
// In FaceAnalyzer.jsx, after MediaPipe runs:

faceMesh.onResults((results) => {
  // No face detected
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
    setError("no_face");
    return;
  }

  // Multiple faces detected
  if (results.multiFaceLandmarks.length > 1) {
    setError("multiple_faces");
    return;
  }

  // Success
  const landmarks = results.multiFaceLandmarks[0];
  processLandmarks(landmarks);
});

// Render error states:
if (error === "no_face") return <ErrorScreen message="No face detected. Try a clearer front-facing photo." />;
if (error === "multiple_faces") return <ErrorScreen message="Multiple faces detected. Please upload a photo with only one person." />;
```

---

## Privacy Notice (Conversion-Critical)

Add this below the upload button. Users hesitate to upload face photos. Removing that hesitation increases upload rates significantly.

```jsx
<p className="text-gray-400 text-sm mt-2 text-center">
  🔒 Your photo is analyzed entirely on your device. It is never uploaded to any server.
</p>
```

This is true — MediaPipe runs via WebAssembly in the browser. Make this prominent.

---

## Image Preprocessing Before Analysis

Compress the image before running MediaPipe to improve speed on mobile:

```js
// /utils/imageHelpers.js

export function compressImage(file, maxWidth = 800) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, 'image/jpeg', 0.85);
    };
    img.src = url;
  });
}
```

---

## Share Card

```jsx
// /components/ShareCard.jsx

export default function ShareCard({ symmetry, shape }) {
  const text = `My face symmetry is ${symmetry}% and my face shape is ${shape}. Analyzed at FaceGeometry.ai`;

  function copyToClipboard() {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center">
      <p className="text-2xl font-bold text-white mb-2">"{text}"</p>
      <button onClick={copyToClipboard} className="mt-4 px-6 py-2 bg-blue-600 rounded-lg text-white">
        Copy & Share
      </button>
    </div>
  );
}
```

---

## Design System

Use these Tailwind conventions throughout the entire app:

| Element | Class |
|---|---|
| Page background | `bg-gray-950` |
| Card background | `bg-gray-900` |
| Card border | `border border-gray-800` |
| Primary text | `text-white` |
| Secondary text | `text-gray-400` |
| Accent / highlight | `text-blue-400` |
| Primary button | `bg-blue-600 hover:bg-blue-700 text-white` |
| Card radius | `rounded-xl` |
| Card padding | `p-6` |

Typography:
- Use `font-bold` for all metric values
- Use `text-sm text-gray-400` for labels
- Use `text-3xl font-black` for the face shape result heading

DO NOT add gradients, glassmorphism effects, or animations beyond the loading spinner. The goal is "medical premium" — clinical, clean, trustworthy.

---

## Day-by-Day Build Order

### Day 1
- Initialize Next.js 14 with Tailwind
- Build landing page (hero, upload button, privacy notice)
- Get MediaPipe loading in browser without SSR errors
- Log raw landmarks to console from an uploaded image

### Day 2
- Implement all geometry calculation functions in `faceMetrics.js`
- Implement face shape classifier in `faceClassifier.js`
- Test classifications with 5–10 different face photos
- Fix landmark indices if measurements seem wrong

### Day 3
- Build results page with all 5 sections
- Build analyzing screen with animated messages
- Implement canvas overlay drawing
- Add error states for no face / multiple faces

### Day 4
- Add image compression
- Add mobile camera input (optional but high impact)
- Polish dark theme design
- Test on mobile device

### Day 5
- Deploy to Vercel
- Test with real users (friends/family)
- Fix the top 3 most reported issues

---

## Mobile Camera Input (Optional but High Impact)

Feels far more impressive than file upload. Add this option on the upload screen:

```jsx
<input
  type="file"
  accept="image/*"
  capture="user"   // opens front camera on mobile
  onChange={handleFileChange}
  className="hidden"
  ref={cameraInputRef}
/>
<button onClick={() => cameraInputRef.current.click()}>
  Take Selfie
</button>
```

---

## Future Features (Build After MVP Ships)

- Beard style recommendations
- Side profile analysis (requires separate landmark model)
- PDF download of full report (use `jsPDF` or `html2canvas`)
- Hairstyle visual preview (requires AI — add after validating demand)
- Canthal tilt measurement (add landmark indices 33, 133, 362, 263)
- Glow-up tracker (requires auth — add much later)

---

## SEO Pages to Build After MVP (High Traffic Potential)

Create static pages targeting these search terms:

- `/face-shapes` — "How to find your face shape"
- `/oval-face-hairstyles` — "Best hairstyles for oval faces men"
- `/face-symmetry` — "What is face symmetry and how is it measured"
- `/jawline-guide` — "Jawline types and what they mean"
- `/canthal-tilt` — "What is canthal tilt"

These are high-volume Google searches with weak competition. Build them after launch.

---

## Summary

The complete product is achievable in 5 days. The most technically risky part is getting accurate measurements from correct landmark indices — budget extra time on Day 2 for this. Everything else is standard React/Tailwind work. Do not add auth, payments, or a database until you have at least 100 real users giving feedback on the analysis quality.