import { Point } from "../types/Point";

/**
 * Get the distance between 2 points
 */
const getDist = ([x1, y1]: Point, [x2, y2]: Point) =>
  ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;

/**
 * Get the angle between the difference vector of p1 and p2 and the x-axis in radians
 */
const getDiffAngle = ([x1, y1]: Point, [x2, y2]: Point) =>
  Math.atan2(y1 - y2, x1 - x2);

/**
 * Turn a starting point, an angle, and a distance into a 2D Vector (aka a point)
 * @param point a starting point
 * @param a an angle in radians
 * @param d a distance along the ray from the starting point
 */
const getVector = ([x, y]: Point, a: number, d: number): Point => [
  x + d * Math.cos(a),
  y + d * Math.sin(a)
];

export { getDist, getDiffAngle, getVector };
