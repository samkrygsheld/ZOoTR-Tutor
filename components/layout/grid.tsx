import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

const Grid: FunctionComponent<{ columns: number, rows: number }> = function ({ children, columns, rows }): JSX.Element {
  return (
    <div
      css={css`
        display: grid;
        width: 100%;
        grid-template-columns: repeat(${columns}, 1fr);
        grid-template-rows: repeat(${rows}, 40px);
        justify-items: center;
        gap: 5px;
      `}
    >
      { children }
    </div>
  );
};
export default Grid;
