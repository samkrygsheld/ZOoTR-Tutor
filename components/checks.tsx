import { css } from '@emotion/react';
import { SyntheticEvent, useRef, useState } from 'react';
import { CheckState } from '../shared/models';
import { titleize, useDynamicSVGImport } from '../shared/utils';
import CheckRow from './check-row';
import Tooltip from './tooltip';
import MouseTooltip from './mouse-tooltip';

const headerStyle = css`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 2em;
  font-weight: bold;
`;

export default function Checks({currentMap, switchMap, checks}: { currentMap: string, switchMap: (e: SyntheticEvent) => void, checks: CheckState[]}): JSX.Element {
  const { error, loading, SvgImage } = useDynamicSVGImport(`map-${currentMap}`);
  // if (!loading) {
  //   console.log(error, loading, SvgImage);
  // }
  const [checkTooltipPos, setCheckTooltipPos] = useState({x: 0, y: 0});
  const [checkTooltipText, setCheckTooltipText] = useState('test');
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div id='checksWrapper'>
      <div
        id='checks'
        css={css`
          background: rgba(0, 0, 0, 1);
          padding-top: 5px;
          display: flex;
          flex-direction: column;
          flex: 0 0 350px;
          padding-left: 10px;
        `}
      >
        <h1 css={headerStyle}>Checks</h1>
        <ul
          css={css`
            overflow-y: auto;
            flex: 1;
            flex-basis: 0;
            margin-left: -10px;
            & > li:first-of-type {
              border-top: 1px solid var(--light-brown);
            }
          `}
        >
          {checks.map((check) => {
            return (
              <CheckRow
                onHover={() => {
                  // console.log(`looking for: `)
                  const checkEle = svgRef.current?.querySelector(`#check\\:${check.check.spoiler.replaceAll(' ', '_')}`);
                  // const checkEle = svgRef.current?.querySelector('#path3054-5-5');
                  if (!checkEle) {
                    return;
                  }
                  const rect = checkEle.getBoundingClientRect();
                  setCheckTooltipText(check.check.description);
                  setCheckTooltipPos({ x: rect.x + window.scrollX, y: rect.y + window.scrollY});
                }}
                onUnHover={() => {
                  setCheckTooltipText('');
                }}
                key={check.check.spoiler}
                checkState={check}
              ></CheckRow>
            );
          })}
        </ul>
      </div>
      <div
        css={css`
          flex: 1;
          background-color: white;
        `}
      >
        <span>{currentMap}</span>
        {/* Check tooltip */}
        <Tooltip
          text={checkTooltipText}
          pos={checkTooltipPos}
        ></Tooltip>
        {/* Hover tooltip */}
        <MouseTooltip
          dynamicText={(e) => {
            const ele = e.target as HTMLElement;
            return ele.nodeName === 'path' || ele.nodeName === 'ellipse' || ele.nodeName === 'circle'
              ? titleize(ele.id.replaceAll('_', ' '))
              : '';
          }}
        >
          { SvgImage ? (<SvgImage ref={svgRef} onClick={switchMap} onContextMenu={switchMap}></SvgImage>) : null }
        </MouseTooltip>
      </div>
    </div>
  );
}
