import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';
import MapSvg from '../maps/map.svg';
import MapSvgDesert from '../maps/map-desert.svg';
import { main } from '../shared/zootr';
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import ToolTip from '../components/tooltip';
import { titleize } from '../shared/utils';
import Grid from '../components/layout/grid';
import { css } from '@emotion/react';
import { Item } from '../components/item';
import CheckRow from '../components/check-row';
import { CheckState, Item as ItemModel, ItemState, Song } from '../shared/models';

import regions from '../public/js/regions.json';
import { ChecksService, ChecksState } from '../shared/checks.service';
import { runTests } from '../tests/tests';

const noteStyle = css`
  display: inline-block;
`;
const headerStyle = css`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 2em;
  font-weight: bold;
`;

const items: ItemModel[] = [
  new ItemModel('stick', 'Deku Stick'),
  new ItemModel('nut', 'Deku Nut'),
  new ItemModel('bomb'),
  new ItemModel('bow', 'Fairy Bow'),
  new ItemModel('arrowsfire', 'Fire Arrow'),
  new ItemModel('din', "Din's Fire"),
  new ItemModel('slingshot', 'Fairy Slingshot'),
  new ItemModel('ocarina', ['Fairy Ocarina', 'Ocarina of Time'], 2),
  new ItemModel('bombchu'),
  new ItemModel('shot', ['Hookshot', 'Longshot'], 2),
  new ItemModel('arrowslight', 'Light Arrow'),
  new ItemModel('farore', "Farore's Wind"),
  new ItemModel('boomerang'),
  new ItemModel('lens', 'Lens of Truth'),
  new ItemModel('bean', 'Magic Bean'),
  new ItemModel('megaton', 'Megaton Hammer'),
  new ItemModel('magic', 'Magic Meter'),
];

const equipment: ItemModel[] = [
  new ItemModel(
    'child_trading',
    ['Weird Egg', 'Cucco', "Zelda's Letter", 'Keaton Mask', 'Skull Mask'],
    5
  ),
  new ItemModel('swordkokiri', 'Kokiri Sword'),
  new ItemModel('swordmaster', 'Master Sword'),
  new ItemModel('swordbiggoron', "Biggoron's Sword"),
  new ItemModel(
    'adult_trading',
    [
      'Pocket Egg',
      'Pocket Cucco',
      'Cojiro',
      'Odd Mushroom',
      'Odd Potion',
      "Poacher's Saw",
      "Broken Goron's Sword",
      'Prescription',
      'Eyeball Frog',
      "World's Finest Eye Drops",
      'Claim Check',
    ],
    11
  ),
  new ItemModel('shielddeku', 'Deku Shield'),
  new ItemModel('shieldhylian', 'Hylian Shield'),
  new ItemModel('shieldmirror', 'Mirror Shield'),
  new ItemModel(
    'strength',
    ["Goron's Bracelet", 'Silver Gauntlets', 'Golden Gauntlets'],
    3
  ),
  /* <!-- To do: obtain Master Sword when age becomes adult --> */
  new ItemModel('age'),
  new ItemModel('tunicgoron', 'Goron Tunic'),
  new ItemModel('tuniczora', 'Zora Tunic'),
  new ItemModel('scale', ['Silver Scale', 'Golden Scale'], 2),
  new ItemModel('bootsiron', 'Iron Boots'),
  new ItemModel('bootshover', 'Hover Boots'),
];

const songs: Song[] = [
  new Song('lullaby', 'lurlur', "Zelda's Lullaby"),
  new Song('epona', 'ulrulr', "Epona's Song"),
  new Song('saria', 'drldrl', "Saria's Song"),
  new Song('sun', 'rdurdu', "Sun's Song"),
  new Song('time', 'radrad', 'Song of Time'),
  new Song('storms', 'aduadu', 'Song of Storms'),
  new Song('minuet', 'aulrlr', 'Minuet of Forest'),
  new Song('bolero', 'dadardrd', 'Bolero of Fire'),
  new Song('serenade', 'adrrl', 'Serenade of Water'),
  new Song('nocturne', 'lrralrd', 'Nocturne of Shadow'),
  new Song('requiem', 'adarda', 'Requiem of Spirit'),
  new Song('prelude', 'ururlu', 'Prelude of Light'),
];

type MapNames = 'overworld' | 'desert';

const nameMap: {[idx: string]: string} = {
  'Weird Egg': 'Wierd_Egg',
  'Cucco': 'Pocket_Cucco',
  "Zelda's Letter": 'Zeldas_Letter',
  'Fairy Ocarina': 'Ocarina',
  'Ocarina of Time': 'Ocarina',
  'Fairy Bow': 'Bow',
  // 'Keaton Mask': 'Keaton_Mask',
  // 'Skull Mask': 'Skull_Mask',
};

function getStateForChecks(itemStates: ItemState[]): ChecksState {
  const state: any = {};
  for (const itemState of itemStates) {
    if (itemState.item.name === 'age') {
      state['age'] = itemState.state === 0 ? 'child' : 'adult';
      continue;
    }
    if (typeof itemState.item.display === 'string') {
      let name = itemState.item.display;
      if (name in nameMap) {
        name = nameMap[name];
      } else {
        name = name.replaceAll(' ', '_').replaceAll("'", '');
      }
      state[name] = itemState.state;
    } else {
      for (let i = 0; i < itemState.state; i++) {
        let name: string = itemState.item.display[i];
        if (name in nameMap) {
          name = nameMap[name];
        } else {
          name = name.replaceAll(' ', '_').replaceAll("'", '');
        }
        if (itemState.item.name === 'shot') {
          state['Progressive_Hookshot'] = itemState.state;
          continue;
        }
        state[name] = true;
      }
    }
  }
  console.log(state);
  return state;
}
export default function Home(): JSX.Element {
  const [currentMap, setMap] = useState<MapNames>('overworld');
  const [checks, setChecks] = useState<CheckState[]>([]);
  const [doneInit, setDoneInit] = useState(false);
  const [itemStates] = useState([] as ItemState[]);

  useEffect(() => {
    main();

    const before = performance.now();
    const s = getStateForChecks(itemStates);
    console.log('state', s);
    setChecks(ChecksService.Instance.getChecksForMap(currentMap, s));
    console.log('Took:', performance.now() - before);
    setDoneInit(true);
  }, [currentMap, itemStates]);
  const revalidateChecks = useCallback((map) => {
    // console.log('revalidate checks...');
    const s = getStateForChecks(itemStates);
    // console.log(s, map);
    setChecks(ChecksService.Instance.getChecksForMap(map, s));
  }, [itemStates]);
  const updateItemState = useCallback((itemState: ItemState) => {
    // console.log('updateItemState', itemState.item.name);
    if (!itemStates.includes(itemState)) {
      // console.log(itemState, itemStates);
      itemStates.push(itemState);
    }
    if (doneInit) {
      revalidateChecks(currentMap);
    }
  }, [doneInit, revalidateChecks, itemStates, currentMap]);
  function switchMap(e: SyntheticEvent) {
    e.preventDefault();

    if (e.type === 'contextmenu') {
      if (currentMap === 'overworld') {
        return;
      }
      if (regions.some((region) => region.region === currentMap)) {
        setMap('overworld');
      } else {
        const parentRegion = regions.find((region) =>
          Object.keys(region.subregions).some((k) => k === currentMap)
        );
        if (parentRegion) {
          console.log('found parent:', parentRegion.region);
          setMap(parentRegion.region as any);
        }
      }
      return;
    }

    const target = e.target as HTMLElement;
    // console.log(target, target.nodeName, target.id);
    if (target.nodeName !== 'path') {
      return;
    }
    // console.log(e);
    // console.log('switching name to', target.id);
    setMap(target.id as any);
  }

  return (
    <div id='trackerWrapper'>
      <Head>
        <title>ZOoTR Tutor</title>
        <meta
          name='description'
          content='An OoT Randomizer tracker with the intent to teach.'
        />
        <link rel='icon' href='/images/favicon.ico' />
      </Head>
      <div
        id='inventoryTracker'
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-bottom: 10px;
          width: 270px;
          margin: 0 auto;
        `}
      >
        <h1 css={headerStyle}>ZOoTR Tutor</h1>
        <Grid columns={6} rows={3}>
          {items.map((item) => (
            <Item key={item.name} item={item} onUpdate={updateItemState} />
          ))}
        </Grid>
        <br />
        <Grid columns={4} rows={4}>
          {equipment.map((item) => (
            <Item key={item.name} item={item} onUpdate={updateItemState} />
          ))}
        </Grid>
        <br />
        <Grid columns={6} rows={2}>
          {songs.map((item) => (
            <Item key={item.name} item={item} data-notes={item.notes} onUpdate={updateItemState} />
          ))}
        </Grid>
        <div
          id='songStaff'
          css={css`
            background-image: url('/images/music/staff.png');
            width: 270px;
            height: 40px;
          `}
        >
          <div id='staffWrapper'>
            <img id='note0' src='' css={noteStyle} />
            <img id='note1' src='' css={noteStyle} />
            <img id='note2' src='' css={noteStyle} />
            <img id='note3' src='' css={noteStyle} />
            <img id='note4' src='' css={noteStyle} />
            <img id='note5' src='' css={noteStyle} />
            <img id='note6' src='' css={noteStyle} />
            <img id='note7' src='' css={noteStyle} />
          </div>
        </div>
        <button
          className='bg-gray-500 hover:bg-gray-600 py-2 px-4 border border-gray-700 rounded font-bold text-white text-shadow-black'
          onClick={runTests}
        >Run Logic Tests</button>
        <button
          className='bg-gray-500 hover:bg-gray-600 py-2 px-4 border border-gray-700 rounded font-bold text-white text-shadow-black'
          onClick={revalidateChecks}
        >Revalidate Checks</button>
      </div>
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
          <ToolTip
            dynamicText={(e) => {
              const ele = e.target as HTMLElement;
              return ele.nodeName === 'path'
                ? titleize(ele.id.replaceAll('_', ' '))
                : '';
            }}
          >
            {currentMap == 'desert' ? (
              <MapSvgDesert onClick={switchMap} onContextMenu={switchMap} />
            ) : (
              <MapSvg onClick={switchMap} onContextMenu={switchMap} />
            )}
          </ToolTip>
        </div>
      </div>
      <button id='toggleMap'>Toggle Map</button>
    </div>
  );
}
