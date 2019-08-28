import React, { useState, useRef, Fragment } from "react";
import { Spring, config } from "react-spring/renderprops";
import { toSVGCoord } from "./metaball/utils/dom";
import { Point } from "./metaball/types/Point";
import makeGoo from "./metaball/metaball";
import GithubBadge from "./github-badge";

import "./App.css";

const STARTING_POINT: Point = [600, 350];
const R1 = 100;
const R2 = 75;

const App: React.FC = () => {
  const [mouseCoord, setMouseCoord] = useState(STARTING_POINT);
  const [isMouseDown, setMouseDown] = useState(false);
  const svgEl = useRef<SVGSVGElement>(null);
  const gEl = useRef<SVGGElement>(null);

  const handleMouseMove = (event: any) => {
    console.log(event);
    if (!svgEl.current || !gEl.current || !isMouseDown) return;
    setMouseCoord(toSVGCoord(event, svgEl.current, gEl.current));
  };

  const grabbingClassName = isMouseDown ? "grabbing" : "";

  return (
    <Fragment>
      <GithubBadge className={grabbingClassName} />
      <svg
        ref={svgEl}
        viewBox="0 0 1200 1200"
        onTouchMove={handleMouseMove}
        onTouchStart={() => setMouseDown(true)}
        onTouchEnd={() => setMouseDown(false)}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        <Spring
          config={config.molasses}
          from={{ coord: STARTING_POINT }}
          to={{ coord: mouseCoord }}
        >
          {animation => (
            <g ref={gEl} className={grabbingClassName}>
              <circle cx={mouseCoord[0]} cy={mouseCoord[1]} r={R1} />
              <circle cx={animation.coord[0]} cy={animation.coord[1]} r={R2} />
              <path d={makeGoo(R1, R2, mouseCoord, animation.coord)} />
            </g>
          )}
        </Spring>
      </svg>
    </Fragment>
  );
};

export default App;
