import { ChecksService, ChecksState } from '../shared/checks.service';
import { ITest } from './test';

export class RegionTests implements ITest {
  constructor(private $checks: ChecksService) {}
  public run(): boolean {
    return [
      ['testBigPoes', this.testBigPoes()],
      ['testSheikAtToT', this.testSheikAtToT()],
      ['testOcarinaOfTime', this.testOcarinaOfTime()],
      ['testSheikInForest', this.testSheikInForest()],
      ['testIceCavernFreestandingPoH', this.testIceCavernFreestandingPoH()],
      ['testBarinade', this.testBarinade()],
      ['testDMTBiggoron', this.testDMTBiggoron()],
      ['testSongFromSaria', this.testSongFromSaria()],
      ['testShootMorningSun', this.testShootMorningSun()],
    ].map(([name, testResult]) => {
      const valid = testResult[0] && testResult[1];
      console.log(`%c${name} | Region: ${testResult[0]}, Check: ${testResult[1]}`, `color: ${valid ? 'green' : 'red'}`);
      return valid;
    }).every(v => v);
  }

  private testBigPoes(): [boolean, boolean] {
    // For Sam: the check for market 10 big poes is just having a bottle with a big poe in it (or whatever Big_Poe is), not bow and epona
    return this.checkRegionAndCheck('Market Guard House', 'Market 10 Big Poes', {
      age: 'adult',
      Bottle_with_Big_Poe: 1,
    });
  }

  private testSheikAtToT(): [boolean, boolean] {
    // For Sam: needed to add checks for opening the door of time because logic states you can't get to Beyond Door of Time unless you can or if the setting open_door_of_time is on
    return this.checkRegionAndCheck('Beyond Door of Time', 'Sheik at Temple', {
      age: 'adult',
      Forest_Medallion: true,
      Ocarina: true,
      Song_of_Time: true,
    });
  }

  private testOcarinaOfTime(): [boolean, boolean] {
    return this.checkRegionAndCheck('Hyrule Field', 'HF Ocarina of Time Item', {
      age: 'child',
      Kokiri_Sword: true,
      Deku_Shield: true,
      Kokiri_Emerald: true,
      Goron_Ruby: true,
      Zora_Sapphire: true,
    });
  }

  private testSheikInForest() {
    return this.checkRegionAndCheck('Sacred Forest Meadow', 'Sheik in Forest', {
      age: 'adult',
      Ocarina: true,
      Minuet_of_Forest: true,
      Sarias_Song: true,
    });
  }

  private testIceCavernFreestandingPoH(): [boolean, boolean] {
    return this.checkRegionAndCheck('Ice Cavern', 'Ice Cavern Freestanding PoH', {
      age: 'adult',
      Deliver_Letter: true,
      Ocarina: true,
      Zeldas_Lullaby: true,
    });
  }

  private testBarinade(): [boolean, boolean] {
    // this.$checks.debug = true;
    return this.checkRegionAndCheck('Jabu Jabus Belly Boss Area', 'Barinade', {
      open_forest: 'open',
      Boomerang: true,
      Ocarina: true,
      Zeldas_Lullaby: true,
      Deliver_Letter: true,
      Bomb_Bag: true,
    });
  }

  private testDMTBiggoron(): [boolean, boolean] {
    return this.checkRegionAndCheck('Death Mountain Summit', 'DMT Biggoron', {
      age: 'adult',
      open_forest: 'open',
      open_kakariko: 'open',
      Claim_Check: true,
    });
  }

  private testSongFromSaria(): [boolean, boolean] {
    return this.checkRegionAndCheck('Sacred Forest Meadow', 'Song from Saria', {
      age: 'child',
      Zeldas_Letter: true,
    });
  }

  private testShootMorningSun(): [boolean, boolean] {
    return this.checkRegionAndCheck('Lake Hylia', 'LH Sun', {
      age: 'adult',
      Ocarina: true,
      Progressive_Hookshot: 2,
      Bow: true,
    });
  }

  private checkRegionAndCheck(regionName: string, check: string, state: ChecksState, cache: any = {}): [boolean, boolean] {
    const canReachRegion = this.$checks.canReachRegion(regionName, state, cache);
    const region = this.$checks.getRegionByName(regionName)!;
    const canDoCheck = this.$checks.evalLogicWithState(region.locations![check], state, cache);
    return [canReachRegion, canDoCheck];
  }
}
