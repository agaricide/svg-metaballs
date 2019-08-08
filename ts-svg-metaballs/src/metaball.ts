import { getDiffVectorAngle, getDist, getVector } from "./utils/math";
import { Point } from "./types/Point";
const HALF_PI = Math.PI / 2;

/**
 * @param points trapazoid points
 * @param handles handle points
 * @param escaped
 * @param r radius of goo'ed circle
 * @returns a svg "d" attribute path string
 */
const toGooPath = (
  [p1, p2, p3, p4]: Point[],
  [h1, h2, h3, h4]: Point[],
  escaped: boolean,
  r: number
) =>
  [
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

/**
 * Ported from Hiroyuki Sato's original metaball script
 * @param r1 radius 1
 * @param r2 radius 1
 * @param center1 circle center 1
 * @param center2 circle center 2
 * @param handleSize angle severity coefficient
 * @param v spread coefficient
 * @see https://varun.ca/metaballs/
 * @returns a svg "d" attribute path string
 */
const makeMetaballGoo = (
  r1: number,
  r2: number,
  center1: Point,
  center2: Point,
  handleSize = 2.4,
  v = 0.5
) => {
  const d = getDist(center1, center2);
  const maxDist = r1 + r2 * 2.5;
  let u1 = 0;
  let u2 = 0;

  if (r1 <= 0 || r2 <= 0) {
    return "";
  }

  // If circles are within distance
  if (d > maxDist) {
    return "";
  }

  // If one circle is not within the bounds of the other
  if (d <= Math.abs(r1 - r2)) {
    return "";
  }

  // If circles are touching
  if (d < r1 + r2) {
    // Expands spread as circles get closer
    // Hiroyuki Sato magic
    u1 = Math.acos((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d));
    u2 = Math.acos((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d));
  }

  // Angle between the vector connecting center1 & center2 and x-axis
  // Used as a correcting offset for our radian-based calculations
  const angleOffset = getDiffVectorAngle(center2, center1);

  // Max angle of spread is used to find the tangents we use to make the trapazoid
  // @see https://varun.ca/metaballs/#building-the-metaball
  // @see http://www.mathopenref.com/consttangentsext.html
  const maxSpread = Math.acos((r1 - r2) / d);

  // Find the angles for trapazoid via unit cirlce math and Sato offsets
  // Angles are measured clockwise
  const angle1 = angleOffset + u1 + (maxSpread - u1) * v;
  const angle2 = angleOffset - u1 - (maxSpread - u1) * v;
  const angle3 = angleOffset + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v;
  const angle4 = angleOffset - Math.PI + u2 + (Math.PI - u2 - maxSpread) * v;

  // Convert angles to cartesian points of trapazoid corners
  const p1 = getVector(center1, angle1, r1);
  const p2 = getVector(center1, angle2, r1);
  const p3 = getVector(center2, angle3, r2);
  const p4 = getVector(center2, angle4, r2);
  const points = [p1, p2, p3, p4];

  // Handle length = the distance between both ends of the curve
  const totalRadius = r1 + r2;
  // Take into account when balls are overlapping
  const d2Base = Math.min(v * handleSize, getDist(p1, p3) / totalRadius);
  const d2 = d2Base * Math.min(1, (d * 2) / (r1 + r2));

  // Handle length
  const hl1 = r1 * d2;
  const hl2 = r2 * d2;

  // Calculate handles
  // Protrude 180* from respective point p with distance hl
  const h1 = getVector(p1, angle1 - HALF_PI, hl1);
  const h2 = getVector(p2, angle2 + HALF_PI, hl1);
  const h3 = getVector(p3, angle3 + HALF_PI, hl2);
  const h4 = getVector(p4, angle4 - HALF_PI, hl2);
  const handles = [h1, h2, h3, h4];

  return toGooPath(points, handles, d > r1, r2);
};

export default makeMetaballGoo;
