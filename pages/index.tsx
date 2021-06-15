import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import MapSvg from '../maps/map.svg';
import MapSvgDesert from '../maps/map-desert.svg';
import { main } from '../shared/zootr';
import { SyntheticEvent, useEffect, useState } from 'react';
import ToolTip from '../components/tooltip';
import { titleize } from '../shared/utils';
import Grid from '../components/layout/grid';
import { css } from '@emotion/react';
import { Item } from '../components/item';
import CheckRow from '../components/check-row';
import { CheckState, Item as ItemModel, Song } from '../shared/models';

import regions from '../public/js/regions.json';

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
  new ItemModel('stick'),
  new ItemModel('nut'),
  new ItemModel('bomb'),
  new ItemModel('bow'),
  new ItemModel('arrowsfire'),
  new ItemModel('din'),
  new ItemModel('slingshot'),
  new ItemModel('ocarina', 3),
  new ItemModel('bombchu'),
  new ItemModel('shot', 3),
  new ItemModel('arrowslight'),
  new ItemModel('farore'),
  new ItemModel('boomerang'),
  new ItemModel('lens'),
  new ItemModel('bean'),
  new ItemModel('megaton'),
  new ItemModel('magic'),
];

const equipment: ItemModel[] = [
  new ItemModel('child', 6),
  new ItemModel('swordkokiri'),
  new ItemModel('swordmaster'),
  new ItemModel('swordbiggoron'),
  new ItemModel('adult', 12),
  new ItemModel('shielddeku'),
  new ItemModel('shieldhylian'),
  new ItemModel('shieldmirror'),
  new ItemModel('strength', 4),
  /* <!-- To do: obtain Master Sword when age becomes adult --> */
  new ItemModel('age'),
  new ItemModel('tunicgoron'),
  new ItemModel('tuniczora'),
  new ItemModel('scale', 3),
  new ItemModel('bootsiron'),
  new ItemModel('bootshover'),
];

const songs: Song[] = [
  new Song('lullaby', 'lurlur'),
  new Song('epona', 'ulrulr'),
  new Song('saria', 'drldrl'),
  new Song('sun', 'rdurdu'),
  new Song('time', 'radrad'),
  new Song('storms', 'aduadu'),
  new Song('minuet', 'aulrlr'),
  new Song('bolero', 'dadardrd'),
  new Song('serenade', 'adrrl'),
  new Song('nocturne', 'lrralrd'),
  new Song('requiem', 'adarda'),
  new Song('prelude', 'ururlu'),
];

type MapNames = 'overworld' | 'desert';
export default function Home(): JSX.Element {
  const [currentMap, setMap] = useState<MapNames>('overworld');
  const [checks, setChecks] = useState<CheckState[]>([]);
  useEffect(() => {
    async function doMain() {
      setChecks(await main(currentMap));
    }
    doMain();
  }, [currentMap]);
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
            <Item key={item.name} item={item} />
          ))}
        </Grid>
        <br />
        <Grid columns={4} rows={4}>
          {equipment.map((item) => (
            <Item key={item.name} item={item} />
          ))}
        </Grid>
        <br />
        <Grid columns={6} rows={2}>
          {songs.map((item) => (
            <Item key={item.name} item={item} data-notes={item.notes} />
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
          <ToolTip text={(e) => {
            const ele = (e.target as HTMLElement);
            return ele.nodeName === 'path' ? titleize(ele.id.replaceAll('_', ' ')) : '';
          }}>
            {currentMap == 'desert' ? (
              <MapSvgDesert
                onClick={switchMap}
                onContextMenu={switchMap}
              />
            ) : (
              <MapSvg
                onClick={switchMap}
                onContextMenu={switchMap}
              />
            )}
          </ToolTip>
        </div>
      </div>
      <button id='toggleMap'>Toggle Map</button>
    </div>
  );
}
