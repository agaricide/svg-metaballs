import GithubBadge from "./github-badge";
import makeGoo from "./metaball/metaball";
import React, { Fragment, useRef, useState, useCallback } from "react";
import { config, Spring } from "react-spring/renderprops";
import { Point } from "./metaball/types/Point";
import { toSVGCoord } from "./metaball/utils/dom";
import "./App.css";

const STARTING_POINT: Point = [600, 350];
const R1 = 100;
const R2 = 75;

const App: React.FC = () => {
  const [coord, setCoord] = useState(STARTING_POINT);
  const [isMoving, setIsMoving] = useState(false);
  const svgEl = useRef<SVGSVGElement>(null);
  const gEl = useRef<SVGGElement>(null);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!svgEl.current || !gEl.current || !isMoving) return;
      const x = event.clientX;
      const y = event.clientY;
      setCoord(toSVGCoord([x, y], svgEl.current, gEl.current));
    },
    [isMoving]
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (!svgEl.current || !gEl.current || !isMoving) return;
      const x = event.touches[0].pageX;
      const y = event.touches[0].pageY;
      setCoord(toSVGCoord([x, y], svgEl.current, gEl.current));
      event.preventDefault();
    },
    [isMoving]
  );

  const handleStartMoving = useCallback(() => setIsMoving(true), []);

  const handleStopMoving = useCallback(() => setIsMoving(false), []);

  const grabbingClassName = isMoving ? "grabbing" : "";

  return (
    <Fragment>
      <GithubBadge className={grabbingClassName} />
      <svg
        ref={svgEl}
        viewBox="0 0 1200 1200"
        onTouchMove={handleTouchMove}
        onTouchStart={handleStartMoving}
        onTouchEnd={handleStopMoving}
        onMouseMove={handleMouseMove}
        onMouseDown={handleStartMoving}
        onMouseUp={handleStopMoving}
      >
        <Spring
          config={config.molasses}
          from={{ coord: STARTING_POINT }}
          to={{ coord: coord }}
        >
          {animation => (
            <g ref={gEl} className={grabbingClassName}>
              <circle cx={coord[0]} cy={coord[1]} r={R1} />
              <circle cx={animation.coord[0]} cy={animation.coord[1]} r={R2} />
              <path d={makeGoo(R1, R2, coord, animation.coord)} />
            </g>
          )}
        </Spring>
      </svg>
    </Fragment>
  );
};

export default App;
