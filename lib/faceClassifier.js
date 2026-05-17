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
