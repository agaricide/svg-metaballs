import React, { useState, useRef } from "react";
import { toSVGCoord } from "./metaball/utils/dom";
import { Point } from "./metaball/types/Point";
import makeGoo from "./metaball/metaball";
import { Spring, config } from "react-spring/renderprops";

import "./App.css";

const CIRCLE_1: Point = [400, 600];
const R1 = 80;
const R2 = 100;

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
      <Spring
        config={config.molasses}
        from={{ coords: [400, 600] }}
        to={{ coords: [x, y] }}
      >
        {(props: any) => (
          <g ref={gEl} strokeWidth="6" fill="#fff" stroke="#333">
            <circle
              id="circle1"
              cx={props.coords[0]}
              cy={props.coords[1]}
              r={R1}
            />
            <circle id="circle2" cx={x} cy={y} r={R2} stroke="none" />
            <path id="goo" d={makeGoo(R1, R2, props.coords, [x, y])} />
          </g>
        )}
      </Spring>
    </svg>
  );
};

export default App;
