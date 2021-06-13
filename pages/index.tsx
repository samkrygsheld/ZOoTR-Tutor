import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import MapSvg from '../maps/map.svg';
import MapSvgDesert from '../maps/map-desert.svg';
import { main } from '../shared/zootr';
import { RefObject, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import ToolTip from '../components/tooltip';
import { titleize } from '../shared/utils';

type MapNames = 'main' | 'desert';
export default function Home(): JSX.Element {
  const [currentMap, setMap] = useState<MapNames>('main');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipText, setTooltipText] = useState<string>('');
  const [tooltipShow, setTooltipShow] = useState<boolean>(false);
  function updateTooltip(e: MouseEvent, tooltipRef: RefObject<HTMLDivElement>) {
    if (!tooltipRef.current) {
      return;
    }
    if ((e.target as HTMLElement).nodeName !== 'path') {
      // tooltipText = '';
      setTooltipText('');
      setTooltipShow(false);
    } else {
      // tooltipLeft = e.pageX;
      // tooltipTop = e.pageY;
      const ele = tooltipRef.current;
      setTooltipText(titleize((e.target as HTMLElement).id.replaceAll('_', ' ')));
      // Timeout so that the element is resized to the text
      setTimeout(() => {
        setTooltipShow(true);
        const rect = ele.getBoundingClientRect();
        const x = e.pageX - rect.width / 2;
        const y = e.pageY - rect.height - 10;
        ele.style.transform = `translate(${x}px, ${y}px)`;
      }, 0);
    }
  }
  useEffect(() => {
    main();
  }, [currentMap]);
  function switchMap(e: SyntheticEvent, name: MapNames) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    console.log(target, target.nodeName, target.id);
    if (target.nodeName !== 'path') {
      return;
    }
    console.log(e);
    console.log('switching name to', target.id);
    setMap(name);
  }
  return (
    <div id='trackerWrapper'>
      <Head>
        <title>ZOoTR Tutor</title>
        <meta name='description' content='An OoT Randomizer tracker with the intent to teach.' />
        <link rel='icon' href='/images/favicon.ico' />
      </Head>
      <div id='inventoryTracker'>
        <h1>ZOoTR Tutor</h1>
        <div id='inventoryMainScreen'>
          {/* <!-- First Row --> */}
          <img id='stick' data-maxiter='1' className='itemButton' />
          <img id='nut' data-maxiter='1' className='itemButton' />
          <img id='bomb' data-maxiter='1' className='itemButton' />
          <img id='bow' data-maxiter='1' className='itemButton' />
          <img id='arrowsfire' data-maxiter='1' className='itemButton' />
          <img id='din' data-maxiter='1' className='itemButton' />
          {/* <!-- Second Row --> */}
          <img id='slingshot' data-maxiter='1' className='itemButton' />
          <img id='ocarina' data-maxiter='2' className='itemButton' />
          <img id='bombchu' data-maxiter='1' className='itemButton' />
          <img id='shot' data-maxiter='2' className='itemButton' />
          <img id='arrowslight' data-maxiter='1' className='itemButton' />
          <img id='farore' data-maxiter='1' className='itemButton' />
          {/* <!-- Third Row --> */}
          <img id='boomerang' data-maxiter='1' className='itemButton' />
          <img id='lens' data-maxiter='1' className='itemButton' />
          <img id='bean' data-maxiter='1' className='itemButton' />
          <img id='megaton' data-maxiter='1' className='itemButton' />
          <img id='magic' data-maxiter='1' className='itemButton' />
        </div>
        <br />
        <div id='inventoryEquipScreen'>
          {/* <!-- First Row --> */}
          <img id='child' data-maxiter='5' className='itemButton' />
          <img id='swordkokiri' data-maxiter='1' className='itemButton itemButtonEquipRow' />
          <img id='swordmaster' data-maxiter='1' className='itemButton itemButtonEquipRow' />
          <img id='swordbiggoron' data-maxiter='1' className='itemButton itemButtonEquipRow' />
          {/* <!-- Second Row --> */}
          <img id='adult' data-maxiter='11' className='itemButton' />
          <img id='shielddeku' data-maxiter='1' className='itemButton itemButtonEquipRow' />
          <img id='shieldhylian' data-maxiter='1' className='itemButton itemButtonEquipRow' />
          <img id='shieldmirror' data-maxiter='1' className='itemButton itemButtonEquipRow' />
          {/* <!-- Third Row --> */}
          <img id='strength' data-maxiter='3' className='itemButton' />
          {/* <!-- To do: obtain Master Sword when age becomes adult --> */}
          <img id='age' data-maxiter='1' />
          <img id='tunicgoron' data-maxiter='1' className='itemButton itemButtonEquipShortRow' />
          <img id='tuniczora' data-maxiter='1' className='itemButton itemButtonEquipShortRow' />
          {/* <!-- Fourth Row --> */}
          <img id='scale' data-maxiter='2' className='itemButton' />
          <img id='bootsiron' data-maxiter='1' className='itemButton itemButtonEquipShortRow' />
          <img id='bootshover' data-maxiter='1' className='itemButton itemButtonEquipShortRow' />
        </div>
        <br />
        <div id='songContainer'>
          <img id='lullaby' data-maxiter='1' data-notes='lurlur' className='songButton' />
          <img id='epona' data-maxiter='1' data-notes='ulrulr' className='songButton' />
          <img id='saria' data-maxiter='1' data-notes='drldrl' className='songButton' />
          <img id='sun' data-maxiter='1' data-notes='rdurdu' className='songButton' />
          <img id='time' data-maxiter='1' data-notes='radrad' className='songButton' />
          <img id='storms' data-maxiter='1' data-notes='aduadu' className='songButton' />
          <img id='minuet' data-maxiter='1' data-notes='aulrlr' className='songButton' />
          <img id='bolero' data-maxiter='1' data-notes='dadardrd' className='songButton' />
          <img id='serenade' data-maxiter='1' data-notes='adrrl' className='songButton' />
          <img id='nocturne' data-maxiter='1' data-notes='lrralrd' className='songButton' />
          <img id='requiem' data-maxiter='1' data-notes='adarda' className='songButton' />
          <img id='prelude' data-maxiter='1' data-notes='ururlu' className='songButton' />
          <div id='songStaff'>
            <div id='staffWrapper'>
              <img id='note0' className='note' src='' />
              <img id='note1' className='note' src='' />
              <img id='note2' className='note' src='' />
              <img id='note3' className='note' src='' />
              <img id='note4' className='note' src='' />
              <img id='note5' className='note' src='' />
              <img id='note6' className='note' src='' />
              <img id='note7' className='note' src='' />
            </div>
          </div>
        </div>
      </div>
      <template id='check-row-tmpl'>
        <li className='check'>
          <span className='check-name'>Song from Composers Grave</span>
          <span className='check-icons'>🎶</span>
        </li>
      </template>
      <ToolTip ref={tooltipRef} text={tooltipText} show={tooltipShow} />
      <div id='checksWrapper'>
        <div id='checks'>
          <h1>checks</h1>
          <ul>
          </ul>
        </div>
        {
          currentMap == 'main' ?
            <MapSvg onClick={(e: any) => switchMap(e, 'desert')} onMouseMove={(e: MouseEvent) => updateTooltip(e, tooltipRef)} /> :
            <MapSvgDesert onContextMenu={(e: any) => switchMap(e, 'main')} onMouseMove={(e: MouseEvent) => updateTooltip(e, tooltipRef)} />
        }
      </div>
      <button id='toggleMap'>Toggle Map</button>
    </div>
  );
}
