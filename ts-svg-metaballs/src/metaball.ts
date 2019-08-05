import { dist, getVector, angle } from "./utils";
const HALF_PI = Math.PI / 2;

function makeMetaballGoo(
  r1: number,
  r2: number,
  center1: number[],
  center2: number[],
  handleSize = 2.4,
  v = 0.5
) {
  const d = dist(center1, center2);
  const maxDist = r1 + r2 * 2.5;
  let u1 = 0;
  let u2 = 0;

  if (r1 <= 0 || r2 <= 0 || d > maxDist || d <= Math.abs(r1 - r2)) {
    return "";
  }

  if (d < r1 + r2) {
    u1 = Math.acos((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d));
    u2 = Math.acos((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d));
  }

  const angleBetweenCenters = angle(center2, center1);
  const maxSpread = Math.acos((r1 - r2) / d);

  const angle1 = angleBetweenCenters + u1 + (maxSpread - u1) * v;
  const angle2 = angleBetweenCenters - u1 - (maxSpread - u1) * v;
  const angle3 =
    angleBetweenCenters + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v;
  const angle4 =
    angleBetweenCenters - Math.PI + u2 + (Math.PI - u2 - maxSpread) * v;

  const p1 = getVector(center1, angle1, r1);
  const p2 = getVector(center1, angle2, r1);
  const p3 = getVector(center2, angle3, r2);
  const p4 = getVector(center2, angle4, r2);

  // Define handle length by the
  // distance between both ends of the curve
  const totalRadius = r1 + r2;
  const d2Base = Math.min(v * handleSize, dist(p1, p3) / totalRadius);

  // Take into account when circles are overlapping
  const d2 = d2Base * Math.min(1, (d * 2) / (r1 + r2));

  // Handle length
  const hl1 = r1 * d2;
  const hl2 = r2 * d2;

  const h1 = getVector(p1, angle1 - HALF_PI, hl1);
  const h2 = getVector(p2, angle2 + HALF_PI, hl1);
  const h3 = getVector(p3, angle3 + HALF_PI, hl2);
  const h4 = getVector(p4, angle4 - HALF_PI, hl2);

  return toGooPath([p1, p2, p3, p4], [h1, h2, h3, h4], d > r1, r2);
}

function toGooPath(
  points: number[][],
  handles: number[][],
  escaped: any,
  r: any
) {
  const [p1, p2, p3, p4] = points;
  const [h1, h2, h3, h4] = handles;
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

export default makeMetaballGoo;
