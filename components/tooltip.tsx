import { css } from '@emotion/react';
import { ReactNode, cloneElement, isValidElement, useRef, MouseEvent, useState, useEffect } from 'react';

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
export default function Tooltip(props: { dynamicText?: (e: MouseEvent) => string, text?: string, children?: ReactNode }): JSX.Element {
  const [pos, setPos] = useState({x: 0, y: 0});
  const lastMousePosRef = useRef({x: 0, y: 0});
  const tooltipRef = useRef<HTMLDivElement>(null!);
  const [show, setShow] = useState(false);
  const [text, setText] = useState(props.text || '');
  useEffect(() => {
    setText(props.text || '');
    // Timeout to let the new text render for correct positioning
    setTimeout(() => {
      const ele = tooltipRef.current;
      const rect = ele.getBoundingClientRect();
      setPos({ x: lastMousePosRef.current.x - rect.width / 2, y: lastMousePosRef.current.y - rect.height - 10 });
    }, 0);
  }, [props.text]);
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
          if (typeof props.dynamicText === 'function') {
            setText(props.dynamicText(e));
          }
          const ele = tooltipRef.current;
          const rect = ele.getBoundingClientRect();
          lastMousePosRef.current = { x: e.pageX, y: e.pageY };
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
