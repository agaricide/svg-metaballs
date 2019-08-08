import React, { useState, useRef } from "react";
import { toSVGCoord } from "./metaball/utils/dom";
import { Point } from "./metaball/types/Point";
import makeGoo from "./metaball/metaball";
import { Spring, config } from "react-spring/renderprops";

import "./App.css";

const STARTING_POINT: Point = [600, 350];
const R1 = 90;
const R2 = 70;

const App: React.FC = () => {
  const [mouseCoord, setMouseCoord] = useState(STARTING_POINT);
  const gEl = useRef<SVGGElement>(null);
  const svgEl = useRef<SVGSVGElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!svgEl.current || !gEl.current) return;
    setMouseCoord(toSVGCoord(event, svgEl.current, gEl.current));
  };

  const [x, y] = mouseCoord;

  return (
    <svg viewBox="0 0 1200 1200" ref={svgEl} onMouseMove={handleMouseMove}>
      <Spring
        config={config.molasses}
        from={{ coord: STARTING_POINT }}
        to={{ coord: [x, y] }}
      >
        {(animate: any) => (
          <g ref={gEl}>
            <circle cx={x} cy={y} r={R1} />
            <circle cx={animate.coord[0]} cy={animate.coord[1]} r={R2} />
            <path d={makeGoo(R1, R2, [x, y], animate.coord)} />
          </g>
        )}
      </Spring>
    </svg>
  );
};

export default App;
