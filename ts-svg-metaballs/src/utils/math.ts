import { Point } from "../types/Point";

const getDist = ([x1, y1]: Point, [x2, y2]: Point) =>
  ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;

const getVector = ([x, y]: Point, a: number, r: number): Point => [
  x + r * Math.cos(a),
  y + r * Math.sin(a)
];

const getAngle = ([x1, y1]: Point, [x2, y2]: Point) =>
  Math.atan2(y1 - y2, x1 - x2);

export { getDist, getVector, getAngle };
