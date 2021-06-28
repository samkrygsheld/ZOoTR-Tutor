import { ChecksService, ChecksState } from '../shared/checks.service';
import { ITest } from './test';
import overworld from '../public/js/data/logic/overworld.json';

export class EfficiencyTests implements ITest {
  constructor(private $checks: ChecksService) {}
  public run(): boolean {
    for (const region of overworld) {
      this.$checks.canReachRegion(region.region_name, {
        age: 'child',
      });
    }
    return true;
    // console.log(`%c${name} | Region: ${testResult[0]}, Check: ${testResult[1]}`, `color: ${valid ? 'green' : 'red'}`);
  }
}
