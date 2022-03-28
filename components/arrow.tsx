import { css } from '@emotion/react';

interface Point {
  x: number;
  y: number;
}
function toMapPoint(map: DOMRect, point: Point): Point {
  return {
    x: point.x - map.left - window.scrollX,
    y: point.y - map.top - window.scrollY,
  };
}
export default function Arrow({ mapBounds, start, end, show }: { mapBounds: DOMRect, start: Point, end: Point, show: boolean }): JSX.Element {
  const arrowStyle = css`
    position: absolute;
    top: ${mapBounds.top + window.scrollY}px;
    left: ${mapBounds.left + window.scrollX}px;
    width: ${mapBounds.width}px;
    height: ${mapBounds.height}px;
    pointer-events: none;
  `;
  start = toMapPoint(mapBounds, start);
  end = toMapPoint(mapBounds, end);
  end.x -= 20;
  const ctrlPtOffset = end.x - start.x;
  return (
    <>
      { show ?
        <svg
          css={arrowStyle}
        >
          <path
            d={`M ${start.x} ${start.y} C ${start.x + ctrlPtOffset} ${start.y}, ${end.x - ctrlPtOffset} ${end.y + 10}, ${end.x} ${end.y + 10}`}
            stroke='red'
            strokeWidth={3}
            fill={'transparent'}
          ></path>
          <g
            stroke='red'
            transform={`translate(${end.x},${end.y - 5 + 10}) scale(10)`}
          >
            <path d='M 0 0 L 1 0.5 L 0 1 L 0.25 0.5 z' /> 
          </g>
        </svg>
        : null }
    </>
  );
}
