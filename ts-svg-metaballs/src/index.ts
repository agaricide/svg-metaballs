import "./index.css";
import { toSVGCoord } from "./utils/dom";
import { Point } from "./types/Point";
import makeGoo from "./metaball";

const SIZES = [96, 64];

const svg = <SVGSVGElement>document.querySelector("#svg");
const circle1 = <SVGCircleElement>document.querySelector("#circle1");
const circle2 = <SVGCircleElement>document.querySelector("#circle2");
const goo = <SVGPathElement>document.querySelector("#goo");

svg.addEventListener("mousemove", (ev: MouseEvent) => {
  const [x, y] = toSVGCoord(ev, svg, circle2);
  const c1xy: Point = [400, 600];
  const c2xy: Point = [x, y];
  circle2.setAttribute("cx", x.toString());
  circle2.setAttribute("cy", y.toString());
  goo.setAttribute("d", makeGoo(SIZES[0], SIZES[1], c1xy, c2xy));
});
