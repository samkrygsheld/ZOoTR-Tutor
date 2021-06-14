import { css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';
import { Item as ItemModel, ItemState } from '../shared/models';
import { StorageService } from '../shared/storage.service';
import Tooltip from './tooltip';

export function Item({ item, ...props }: { item: ItemModel }): JSX.Element {
  const itemState = useMemo(() => new ItemState(item, item.icons.length === 2), [ item ]);
  useEffect(() => {
    const $storage = StorageService.Instance;
    itemState.setState($storage.saveData.inventory[item.name] || 0);
    setImage(itemState.icon);
  }, [item.name, itemState]);
  const [currentImage, setImage] = useState(itemState.icon);
  return (
    <Tooltip text='test' show={false}>
      <img
        id={item.name}
        { ...props }
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
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          itemState.decrementState();
          setImage(itemState.icon);
        }}
      >
      </img>
    </Tooltip>
  );
}
