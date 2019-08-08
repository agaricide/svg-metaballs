import React, { useState, useRef } from "react";
import { toSVGCoord } from "./metaball/utils/dom";
import { Point } from "./metaball/types/Point";
import makeGoo from "./metaball/metaball";

import "./App.css";

const CIRCLE_1: Point = [400, 600];
const R1 = 96;
const R2 = 64;

const App: React.FC = () => {
  const [circleCoord, setCircleCoord] = useState([0, 0]);
  const gEl = useRef<SVGGElement>(null);
  const svgEl = useRef<SVGSVGElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!svgEl.current || !gEl.current) return;
    setCircleCoord(toSVGCoord(event, svgEl.current, gEl.current));
  };

  const [x, y] = circleCoord;

  return (
    <svg
      id="svg"
      className="w-100 h-100"
      viewBox="0 0 1200 1200"
      ref={svgEl}
      onMouseMove={handleMouseMove}
    >
      <g ref={gEl} strokeWidth="6" fill="#fff" stroke="#333">
        <circle id="circle1" cx={CIRCLE_1[0]} cy={CIRCLE_1[1]} r={R1} />
        <circle id="circle2" cx={x} cy={y} r={R2} stroke="none" />
        <path id="goo" d={makeGoo(R1, R2, CIRCLE_1, [x, y])} />
      </g>
    </svg>
  );
};

export default App;
