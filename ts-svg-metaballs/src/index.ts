import "./index.css";
import { toSVGCoords } from "./utils";
import makeGoo from "./metaball";

const HALF_PI = Math.PI / 2;
const VIEWBOX_SIZE = { W: 1200, H: 1200 };
const SIZES = [96, 64];

const svg = <SVGSVGElement>document.querySelector("#js-svg");
const circle1 = <SVGCircleElement>document.querySelector("#js-circle1");
const circle2 = <SVGCircleElement>document.querySelector("#js-circle2");
const goo = <SVGPathElement>document.querySelector("#js-connector");

svg.addEventListener("mousemove", (ev: MouseEvent) => {
  const [x, y] = toSVGCoords(ev, svg, circle2);
  const circle1Pos = [400, 600];
  const circle2Pos = [x, y];
  circle2.setAttribute("cx", x.toString());
  circle2.setAttribute("cy", y.toString());
  goo.setAttribute("d", makeGoo(SIZES[0], SIZES[1], circle1Pos, circle2Pos));
});
