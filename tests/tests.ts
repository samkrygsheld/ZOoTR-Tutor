import { ChecksService } from '../shared/checks.service';
import { EfficiencyTests } from './efficiency-test';
import { RegionTests } from './region-tests';

function time(msg: string, cb: () => void) {
  console.log(`%c${msg}`, 'font-weight: bold');
  const before = performance.now();
  cb();
  console.log(`%cFinished in ${(performance.now() - before).toFixed(2)}ms`, 'font-weight: bold');
}

export function runTests(): void {
  time('Running region tests...', () => {
    console.log('can_leave_forest', ChecksService.Instance.evalLogicWithState('can_leave_forest', {
      age: 'child',
      Kokiri_Sword: true,
      Deku_Shield: true,
    }));
    new RegionTests(ChecksService.Instance).run();
    // const event = ChecksService.Instance.findEvent('GC Woods Warp Open');
    // console.log(event);
    // console.log(ChecksService.Instance.evalLogicWithState(event[1], {}));
    new EfficiencyTests(ChecksService.Instance).run();
  });
  // ChecksService.Instance.canReachRegion('ZR Behind Waterfall', { age: 'adult' });
}
