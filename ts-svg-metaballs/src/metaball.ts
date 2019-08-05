import { dist, getVector, angle } from "./utils";
const HALF_PI = Math.PI / 2;

function metaball(
  radius1: number,
  radius2: number,
  center1: number[],
  center2: number[],
  handleSize = 2.4,
  v = 0.5
) {
  const d = dist(center1, center2);
  const maxDist = radius1 + radius2 * 2.5;
  let u1 = 0;
  let u2 = 0;

  if (radius1 === 0 || radius2 === 0) {
    return "";
  }

  if (d > maxDist || d <= Math.abs(radius1 - radius2)) {
    return "";
  }

  if (d < radius1 + radius2) {
    u1 = Math.acos(
      (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d)
    );
    u2 = Math.acos(
      (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d)
    );
  }

  // All the angles
  const angleBetweenCenters = angle(center2, center1);
  const abc = angleBetweenCenters;
  const maxSpread = Math.acos((radius1 - radius2) / d);

  const angle1 = angleBetweenCenters + u1 + (maxSpread - u1) * v;
  const angle2 = angleBetweenCenters - u1 - (maxSpread - u1) * v;
  const angle3 = abc + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v;
  const angle4 =
    angleBetweenCenters - Math.PI + u2 + (Math.PI - u2 - maxSpread) * v;
  // Points
  const p1 = getVector(center1, angle1, radius1);
  const p2 = getVector(center1, angle2, radius1);
  const p3 = getVector(center2, angle3, radius2);
  const p4 = getVector(center2, angle4, radius2);

  // Define handle length by the
  // distance between both ends of the curve
  const totalRadius = radius1 + radius2;
  const d2Base = Math.min(v * handleSize, dist(p1, p3) / totalRadius);

  // Take into account when circles are overlapping
  const d2 = d2Base * Math.min(1, (d * 2) / (radius1 + radius2));

  const r1 = radius1 * d2;
  const r2 = radius2 * d2;

  const h1 = getVector(p1, angle1 - HALF_PI, r1);
  const h2 = getVector(p2, angle2 + HALF_PI, r1);
  const h3 = getVector(p3, angle3 + HALF_PI, r2);
  const h4 = getVector(p4, angle4 - HALF_PI, r2);

  return metaballToPath(p1, p2, p3, p4, h1, h2, h3, h4, d > radius1, radius2);
}

function metaballToPath(
  p1: any,
  p2: any,
  p3: any,
  p4: any,
  h1: any,
  h2: any,
  h3: any,
  h4: any,
  escaped: any,
  r: any
) {
  return [
    "M",
    p1,
    "C",
    h1,
    h3,
    p3,
    "A",
    r,
    r,
    0,
    escaped ? 1 : 0,
    0,
    p4,
    "C",
    h4,
    h2,
    p2
  ].join(" ");
}

export default metaball;