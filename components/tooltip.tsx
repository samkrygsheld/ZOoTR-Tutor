import { css } from '@emotion/react';
import { ReactNode, MouseEvent, forwardRef } from 'react';

const tooltipStyle = css`
  position: absolute;
  z-index: 1;
  text-align: center;
  top: 0;
  left: 0;
  min-width: 100px;
  padding: 5px 15px;
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 3px 3px 3px black;
  pointer-events: none;
  font-size: 25px;
`;
export default forwardRef<HTMLDivElement, { dynamicText?: (e: MouseEvent) => string, text?: string, pos: {x: number, y: number}, show?: boolean }>(
  function Tooltip(props, ref): JSX.Element {
    return (
      <div ref={ref}
        css={tooltipStyle}
        style={{
          transform: `translate(${props.pos.x}px, ${props.pos.y}px)`,
          opacity: `${ props.show === false ? 0 : 1 }`,
        }}
      >
        { props.text }
      </div>
    );

  }
);
