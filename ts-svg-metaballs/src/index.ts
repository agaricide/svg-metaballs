import "./index.css";
import { toSVGCoords } from "./utils";
import metaball from "./metaball";

const HALF_PI = Math.PI / 2;
const VIEWBOX_SIZE = { W: 1200, H: 1200 };
const SIZES = {
  CIRCLE1: 96,
  CIRCLE2: 64
};

const svg = <SVGSVGElement>document.querySelector("#js-svg");
const g = <SVGGElement>document.querySelector("#js-g");
const circle1 = <SVGCircleElement>document.querySelector("#js-circle1");
const circle2 = <SVGCircleElement>document.querySelector("#js-circle2");
const goo = <SVGPathElement>document.querySelector("#js-connector");

svg.addEventListener("mousemove", (e: MouseEvent) => {
  const [x, y] = toSVGCoords(svg, circle2, e);
  circle2.setAttribute("cx", x.toString());
  circle2.setAttribute("cy", y.toString());
  const circle1Pos = [400, 600];
  const circle2Pos = [x, y];
  goo.setAttribute("d", metaball(96, 64, circle1Pos, circle2Pos));
});
