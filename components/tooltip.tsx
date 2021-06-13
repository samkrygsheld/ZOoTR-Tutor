import { css } from '@emotion/react';
import { forwardRef } from 'react';

const Tooltip = forwardRef<HTMLDivElement, { text: string, show: boolean }>((props, ref) => {

  return (
    <>
      <div ref={ref}
        css={css`
          position: absolute;
          text-align: center;
          /* top: -45px;
          left: -50px; */
          top: 0;
          left: 0;
          min-width: 100px;
          padding: 5px 15px;
          color: white;
          text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 3px 3px 3px black;
          pointer-events: none;
          display: ${ props.show ? 'block' : 'none' };
          font-size: 25px;
        `}
      >
        {props.text}
      </div>
    </>
  );

});

export default Tooltip;
