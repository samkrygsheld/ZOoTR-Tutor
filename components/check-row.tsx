import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { CheckState } from '../shared/models';
import { StorageService } from '../shared/storage.service';

function colorFromState(checkState: CheckState) {
  return checkState.checked ? 'grey' : checkState.check.completable ? 'green' : 'red';
}
export default function CheckRow({ checkState }: { checkState: CheckState }): JSX.Element {
  const $storage = StorageService.Instance;
  const [color, setColor] = useState(colorFromState(checkState));
  // Updates color when needed
  useEffect(() => {
    setColor(colorFromState(checkState));
  }, [checkState]);
  return (
    <li css={css`
      display: flex;
      align-items: flex-end;
      text-align: left;
      cursor: pointer;
      padding: 10px;
      font-size: 1.5em;
      border-bottom: 1px solid var(--light-brown);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    `} onClick={() => {
      checkState.checked = !checkState.checked;
      $storage.saveData.checks[checkState.check.spoiler] = checkState.checked;
      $storage.saveState();
      setColor(colorFromState(checkState));
    }}>
      <span css={css`
        flex-grow: 1;
        text-align: left;
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
        line-height: initial;
        color: ${color}
      `}>{ checkState.check.description }</span>
      <span css={css`
        flex-grow: 1;
        text-align: right;
        white-space: nowrap;
      `}>{ checkState.check.icons }</span>
    </li>
  );
}
