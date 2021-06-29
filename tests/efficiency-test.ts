import { ChecksService } from '../shared/checks.service';
import { ITest } from './test';
import overworld from '../public/js/data/logic/overworld.json';
import bottomOfTheWell from '../public/js/data/logic/bottom_of_the_well.json';
import dekuTree from '../public/js/data/logic/deku_tree.json';
import dodongosCavern from '../public/js/data/logic/dodongos_cavern.json';
import fireTemple from '../public/js/data/logic/fire_temple.json';
import forestTemple from '../public/js/data/logic/forest_temple.json';
import ganonsCastle from '../public/js/data/logic/ganons_castle.json';
import gerudoTrainingGrounds from '../public/js/data/logic/gerudo_training_grounds.json';
import iceCavern from '../public/js/data/logic/ice_cavern.json';
import jabuJabusBelly from '../public/js/data/logic/jabu_jabus_belly.json';
import shadowTemple from '../public/js/data/logic/shadow_temple.json';
import spiritTemple from '../public/js/data/logic/spirit_temple.json';
import waterTemple from '../public/js/data/logic/water_temple.json';

export class EfficiencyTests implements ITest {
  constructor(private $checks: ChecksService) {}
  public run(): boolean {
    const regions = [
      overworld,
      bottomOfTheWell,
      dekuTree,
      dodongosCavern,
      fireTemple,
      forestTemple,
      ganonsCastle,
      gerudoTrainingGrounds,
      iceCavern,
      jabuJabusBelly,
      shadowTemple,
      spiritTemple,
      waterTemple,
    ].flat();//.map((locationData) => new Region(locationData as any));
    const results: any = {};
    const cache: any = {};
    for (const region of regions) {
      results[region.region_name] = this.$checks.canReachRegion(region.region_name, {
        age: 'child',
        open_forest: 'open',
        open_kakariko: 'open',
      }, cache);
    }
    console.log(results);
    return true;
    // console.log(`%c${name} | Region: ${testResult[0]}, Check: ${testResult[1]}`, `color: ${valid ? 'green' : 'red'}`);
  }
}
