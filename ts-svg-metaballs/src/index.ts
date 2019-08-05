import "./index.css";
import { toSVGCoords } from "./utils";
import makeGoo from "./metaball";

const SIZES = [96, 64];

const svg = <SVGSVGElement>document.querySelector("#svg");
const ball1 = <SVGCircleElement>document.querySelector("#ball1");
const ball2 = <SVGCircleElement>document.querySelector("#ball2");
const goo = <SVGPathElement>document.querySelector("#goo");

svg.addEventListener("mousemove", (ev: MouseEvent) => {
  const [x, y] = toSVGCoords(ev, svg, ball2);
  const b1xy: [number, number] = [400, 600];
  const b2xy: [number, number] = [x, y];
  ball2.setAttribute("cx", x.toString());
  ball2.setAttribute("cy", y.toString());
  goo.setAttribute("d", makeGoo(SIZES[0], SIZES[1], b1xy, b2xy));
});
