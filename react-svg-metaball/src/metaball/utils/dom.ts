import { Point } from "../types/Point";

/**
 * Translate a MouseEvent "mousemove" to a coordinate in SVG space
 * @param ev a MouseEvent "mousemove" event
 * @param svg the parent svg container
 * @param el the svg object we are translating (fixes bugs caused by e.g. transform="scale(2)")
 * @see https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/
 */
const toSVGCoord = (
  ev: React.MouseEvent,
  svg: SVGSVGElement,
  el: SVGGElement
): Point => {
  if (!ev || !svg || !el) return [0, 0];
  // Use parent container to create a point for calculating
  const point = svg.createSVGPoint();
  point.x = ev.clientX;
  point.y = ev.clientY;
  // Use target object's matrix so calculations are accurate
  const elMatrix = (<DOMMatrix>el.getScreenCTM()).inverse();
  const translated = point.matrixTransform(elMatrix);
  return [translated.x, translated.y];
};

const toSVGCoordTouch = (
  ev: React.TouchEvent,
  svg: SVGSVGElement,
  el: SVGGElement
): Point => {
  if (!ev || !svg || !el) return [0, 0];
  // Use parent container to create a point for calculating
  const point = svg.createSVGPoint();
  point.x = ev.touches[0].pageX;
  point.y = ev.touches[0].pageY;
  // Use target object's matrix so calculations are accurate
  const elMatrix = (<DOMMatrix>el.getScreenCTM()).inverse();
  const translated = point.matrixTransform(elMatrix);
  return [translated.x, translated.y];
};

export { toSVGCoord, toSVGCoordTouch };
