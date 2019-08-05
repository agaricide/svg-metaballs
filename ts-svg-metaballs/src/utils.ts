/**
 * Translate a MouseEvent "mousemove" to SVG coordinates
 * @param svg the parent svg container
 * @param el the svg object we are translating (fixes bugs caused by e.g. transform="scale(2)")
 * @see https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/
 */
const toSVGCoords = (ev: MouseEvent, svg: SVGSVGElement, el: SVGGElement) => {
  // Use parent container to create a point for calculating
  const point = svg.createSVGPoint();
  point.x = ev.clientX;
  point.y = ev.clientY;
  // Use target object's matrix so calcs are accurate, even if transformed
  const elMatrix = (<DOMMatrix>el.getScreenCTM()).inverse();
  const translated = point.matrixTransform(elMatrix);
  return [translated.x, translated.y];
};

const dist = ([x1, y1]: number[], [x2, y2]: number[]) => {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
};

function getVector([cx, cy]: number[], a: number, r: number) {
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function angle([x1, y1]: number[], [x2, y2]: number[]) {
  return Math.atan2(y1 - y2, x1 - x2);
}

export { toSVGCoords, dist, getVector, angle };
