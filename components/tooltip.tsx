import { css } from '@emotion/react';
import { ReactNode, cloneElement, isValidElement, useRef, MouseEvent, useState } from 'react';

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
export default function Tooltip(props: { text: ((e: MouseEvent) => string) | string, children?: ReactNode }): JSX.Element {
  const [pos, setPos] = useState({x: 0, y: 0});
  const tooltipRef = useRef<HTMLDivElement>(null!);
  const [show, setShow] = useState(false);
  const [text, setText] = useState(typeof props.text === 'string' ? props.text : '');
  return (
    <>
      <div ref={tooltipRef}
        css={tooltipStyle}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          opacity: `${ show ? 1 : 0 }`,
        }}
      >
        { text }
      </div>
      { isValidElement(props.children) ? cloneElement(props.children, {
        onMouseMove: (e: MouseEvent) => {
          if (typeof props.text === 'function') {
            setText(props.text(e));
          }
          const ele = tooltipRef.current;
          const rect = ele.getBoundingClientRect();
          setPos({ x: e.pageX - rect.width / 2, y: e.pageY - rect.height - 10 });
          setShow(true);
        },
        onMouseOut: () => {
          setShow(false);
        },
      }) : props.children }
    </>
  );

}
