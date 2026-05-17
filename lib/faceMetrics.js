import { LANDMARKS } from '../utils/landmarkIndices';

function distance(p1, p2) {
  if (!p1 || !p2) return 0;
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
  );
}

export function getFaceRatio(landmarks) {
  const faceHeight = distance(landmarks[LANDMARKS.FOREHEAD_TOP], landmarks[LANDMARKS.CHIN_BOTTOM]);
  const faceWidth = distance(landmarks[LANDMARKS.CHEEK_LEFT], landmarks[LANDMARKS.CHEEK_RIGHT]);
  return faceWidth > 0 ? faceHeight / faceWidth : 1.0;
}

export function getJawWidth(landmarks) {
  return distance(landmarks[LANDMARKS.JAW_LEFT], landmarks[LANDMARKS.JAW_RIGHT]);
}

export function getCheekboneWidth(landmarks) {
  return distance(landmarks[LANDMARKS.CHEEK_LEFT], landmarks[LANDMARKS.CHEEK_RIGHT]);
}

export function getForeheadWidth(landmarks) {
  return distance(landmarks[LANDMARKS.TEMPLE_LEFT], landmarks[LANDMARKS.TEMPLE_RIGHT]);
}

export function getEyeSpacingRatio(landmarks) {
  const leftEyeWidth = distance(landmarks[LANDMARKS.LEFT_EYE_INNER], landmarks[LANDMARKS.LEFT_EYE_OUTER]);
  const rightEyeWidth = distance(landmarks[LANDMARKS.RIGHT_EYE_INNER], landmarks[LANDMARKS.RIGHT_EYE_OUTER]);
  const eyeGap = distance(landmarks[LANDMARKS.LEFT_EYE_INNER], landmarks[LANDMARKS.RIGHT_EYE_INNER]);
  const avgEyeWidth = (leftEyeWidth + rightEyeWidth) / 2;
  return avgEyeWidth > 0 ? eyeGap / avgEyeWidth : 1.0;
  // < 1.0 = close-set, 1.0 = average, > 1.3 = wide-set
}

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
    if (!landmarks[leftIdx] || !landmarks[rightIdx]) continue;
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

export function getJawlineSharpness(landmarks) {
  const jawWidth = getJawWidth(landmarks);
  const chinToJawLeft = distance(landmarks[LANDMARKS.CHIN_BOTTOM], landmarks[LANDMARKS.JAW_LEFT]);
  const chinToJawRight = distance(landmarks[LANDMARKS.CHIN_BOTTOM], landmarks[LANDMARKS.JAW_RIGHT]);
  const avgAngleArm = (chinToJawLeft + chinToJawRight) / 2;

  // Sharpness = ratio of chin-to-jaw-corner vs jaw width
  // Higher ratio = more pointed chin = sharper jawline
  const ratio = jawWidth > 0 ? avgAngleArm / jawWidth : 0.5;

  if (ratio > 0.65) return "Very Sharp";
  if (ratio > 0.55) return "Sharp";
  if (ratio > 0.45) return "Average";
  return "Soft";
}

export function calculateAllMetrics(landmarks) {
  if (!landmarks || landmarks.length === 0) return null;
  return {
    faceRatio: getFaceRatio(landmarks),
    jawWidth: getJawWidth(landmarks),
    cheekboneWidth: getCheekboneWidth(landmarks),
    foreheadWidth: getForeheadWidth(landmarks),
    eyeSpacing: getEyeSpacingRatio(landmarks),
    symmetry: getSymmetryScore(landmarks),
    jawlineSharpness: getJawlineSharpness(landmarks),
  };
}
