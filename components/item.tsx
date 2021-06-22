import { css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';
import { Item as ItemModel, ItemState } from '../shared/models';
import { StorageService } from '../shared/storage.service';
import Tooltip from './tooltip';

function getItemName(itemState: ItemState) {
  const displayIdx = Math.max(itemState.state - 1, 0);
  return typeof itemState.item.display === 'string' ? itemState.item.display : itemState.item.display[displayIdx];
}

export function Item({ item, ...props }: { item: ItemModel }): JSX.Element {
  const itemState = useMemo(
    () => new ItemState(item, item.icons.length === 2),
    [item]
  );
  const [currentImage, setImage] = useState(itemState.icon);
  const [tooltipText, setTooltipText] = useState(getItemName(itemState));
  useEffect(() => {
    const $storage = StorageService.Instance;
    itemState.setState($storage.saveData.inventory[item.name] || 0);
    setImage(itemState.icon);
    setTooltipText(getItemName(itemState));
  }, [item.name, itemState]);
  return (
    <Tooltip text={tooltipText}>
      <img
        id={item.name}
        {...props}
        src={currentImage}
        css={css`
          cursor: pointer;
          display: inline-block;
          height: 40px;
          width: 40px;
          object-fit: contain;
        `}
        onClick={() => {
          itemState.incrementState();
          setImage(itemState.icon);
          setTooltipText(getItemName(itemState));
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          itemState.decrementState();
          setImage(itemState.icon);
          setTooltipText(getItemName(itemState));
        }}
      ></img>
    </Tooltip>
  );
}
