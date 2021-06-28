import checks from '../public/js/checks.json';
import regions from '../public/js/regions.json';

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
import logicHelpers from '../public/js/data/logic/logic_helpers.json';

import { Check, CheckState } from './models';
import { StorageService } from './storage.service';
import { createSandbox } from './utils';
import { Region } from './models/region';
import tricks from '../public/js/data/logic/tricks';

export type ChecksState = Record<string, unknown>;
export type RuleCache = Record<string, boolean>;

export class ChecksService {
  // Singleton
  private static instance: ChecksService;
  public static get Instance(): ChecksService {
    if (!ChecksService.instance) {
      ChecksService.instance = new ChecksService();
    }
    return ChecksService.instance;
  }

  private _debug: boolean = false;
  public set debug(val: boolean) {
    this.debugLog = val ? console.log.bind(console) : () => {
      //
    };
  }
  private debugLog = (...data: any[]) => {
    //
  };


  private helpers: any = {};
  private regions: Region[];
  private recursiveCount = 0;
  private tmpFlag = false;

  private constructor() {
    this.regions = [
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
    ].flat().map((locationData) => new Region(locationData as any));
  }

  private buildHelpers() {
    this.helpers = {};
    for (const [helper, rule] of Object.entries(logicHelpers)) {
      const matches = helper.match(/([\w_]+)\(([\w_]+)\)/);
      // this.debugLog(helper);
      if (matches) {
        const funcName = matches[1];
        const argName = matches[2];
        this.helpers[funcName] = (cache: any, state: any) => {
          return (arg: any) => {
            // console.log(`${funcName} ${state['_is_magic_item']}`);
            return this.evalLogic(rule, { ...state, [argName]: arg }, cache);
          };
        };
      } else {
        this.helpers[helper] = (cache: any, state: any) => {
          if (helper == 'can_blast_or_smash') {
            // console.log('cnblast orsmsh:', rule, { ...state }['_is_magic_item']);
          }
          const res = this.evalLogic(rule, { ...state }, cache);
          // if (helper == 'can_use_projectile') {
          //   this.debugLog(helper, res, rule, JSON.parse(JSON.stringify(state)), cache['is_child']);
          //   this.debugLog(cache['is_child'] && state['Boomerang']);
          // }
          return res;
        };
      }
    }
  }

  public getChecksForMap(map: string): CheckState[] {
    const $storage = StorageService.Instance;
    const subregion: string | null = map;
    const region = regions.find((r: any) => r.region === subregion);
    let subs: string[] = [];
    if (region != null) {
      subs = Object.keys(region.subregions);
    }
    return checks.filter(
      (c) =>
        c.subregion === subregion ||
        subs.some((s) => c.subregion == s)
    ).map((check: any) => new CheckState(
      new Check(check),
      $storage.saveData.checks[check.spoiler]
    ));
  }

  public getRegionByName(name: string): Region | undefined {
    return this.regions.find((location) => location.regionName === name);
  }

  public canReachRegion(region: string, state: ChecksState, ruleCache: RuleCache = {}): boolean {
    const beforeTime = performance.now();
    // this.recursiveCount = 0;
    const locationsChecked: string[] = [ region ];
    const path: string[] = [];
    console.groupCollapsed(`Checking if ${region} is accessible...`);
    // console.time('canReachRegionHelper');
    state = this.buildState(state);
    this.compileHelpers(state);
    console.log(state['can_blast_or_smash'], state['is_child']);
    console.log('running canReachRegionHelper');
    const result = this.canReachRegionHelper(region, state, ruleCache, locationsChecked, path);
    console.log(locationsChecked, path, result);
    // console.timeEnd('canReachRegionHelper');
    const afterTime = performance.now();
    console.log('Time taken:', afterTime - beforeTime);
    console.groupEnd();
    return result;
  }
  private canReachRegionHelper(regionName: string, state: ChecksState, ruleCache: RuleCache, locationsChecked: string[], path: string[]): boolean {
    // Region is overworld so return true
    // if (overworld.map((r) => r.region_name).includes(region)) {
    //   this.debugLog('found route from:', region);
    //   return true;
    // }
    // this.recursiveCount++;
    if (regionName === 'Root Exits') {
      path.push(regionName);
      return true;
    }
    if (regionName === 'LW Bridge') {
      // debugger;
      regionName = 'LW Bridge From Forest';
    }
    // if (this.recursiveCount > 50) {
    //   throw new Error('asdf');
    // }
    // this.debugLog(region, ' state:', state);
    const foundRegion = this.regions.find((region) => region.regionName === regionName);
    // this.debugLog(region, ' foundLocation:', foundLocation);
    if (!foundRegion) {
      this.debugLog(`Region ${regionName} not found`);
      return false;
    }
    const regionsThatLinkToCurrent = this.regions.filter((region) => {
      return region.exits && regionName in region.exits &&
        // Don't go into a region that we've already been to
        !locationsChecked.includes(region.regionName) &&
        // Don't go into a dungeon region if we are not in one currently
        !(!foundRegion.dungeon && region.dungeon) &&
        // Don't go into a region that is a dead end unless it is a warp or spawn
        (region.exits && Object.keys(region.exits).length > 1 || region.regionName.includes('Warp') || region.regionName.includes('Spawn') || region.regionName === 'KF Links House' || region.regionName === 'LW Bridge From Forest') &&
        true
      ;
    });
    const regionsThatLinkToCurrentAndAreValid = regionsThatLinkToCurrent.filter((loc) => {
      const rule = loc.exits![regionName];
      if (!(rule in ruleCache)) {
        this.debugLog(regionName, loc.regionName, rule);
        ruleCache[rule] = this.evalLogic(rule, { ...state }, ruleCache);
      }
      return ruleCache[rule];
    });
    if (regionsThatLinkToCurrentAndAreValid.length === 0) {
      this.debugLog(`No valid regions link to ${regionName}`);
      return false;
    }
    this.debugLog(regionName, regionsThatLinkToCurrentAndAreValid);
    const canReach = regionsThatLinkToCurrentAndAreValid.map((loc) => {
      locationsChecked.push(loc.regionName);
      const res = this.canReachRegionHelper(loc.regionName, state, ruleCache, locationsChecked, path);
      this.debugLog(`Can reach ${loc.regionName}: ${res}`);
      return res;
    }).filter((can) => can).length > 0;
    if (canReach) {
      path.push(regionName);
    }
    return canReach;
  }

  public evalLogicWithState(logic: string, state: ChecksState, cache: RuleCache = {}): boolean {
    state = this.buildState(state);
    this.buildHelpers();
    this.compileHelpers(state);
    this.tmpFlag = true;
    return this.evalLogic(logic, state, cache);
  }
  private evalLogic(logic: string, extraLocals: ChecksState = {}, cache: RuleCache = {}): boolean {
    if (logic === 'True') {
      return true;
    }

    const fixedLogicString = 'return !!(' + logic
      .replaceAll(' or ', ' || ')
      .replaceAll(' and ', ' && ')
      .replaceAll('not ', '!')
      .replaceAll(/\(([\w_]+), ([\d\w_]+)\)/g, '$1 == $2')
      .replaceAll(/'([\w_ ]+)'/g, (match, eventName) => {
        const event = this.findEvent(eventName);
        if (!event) {
          return match;
        }
        // debugger;
        const result = this.evalLogic(event[1], extraLocals);
        return `${result}`;
      })
      + ')'
    ;

    // Probably not a super effective cache lol
    const logicCacheString = logic + JSON.stringify(extraLocals);
    if (!(logicCacheString in cache)) {
      cache[logicCacheString] = createSandbox(fixedLogicString, Object.create(null), extraLocals)();
    }
    return cache[logicCacheString];
    return createSandbox(fixedLogicString, Object.create(null), extraLocals)();
  }

  private compileHelpers(state: ChecksState) {
    console.log('Compiling helpers...');
    this.recursiveCount = 0;
    this.buildHelpers();
    this.compileHelpersHelper(state, this.helpers);
    console.log('Done compiling helpers!!!');
  }
  private compileHelpersHelper(state: ChecksState, helpersToCompile: any) {
    const helpers: ChecksState = {};
    const cache: any = {};
    const redo: any = {};
    for (const [helper, func] of Object.entries<(cache: any, state: any) => boolean>(helpersToCompile)) {
      // if (helper === 'can_use_projectile') {
      // console.log(helper, state);
      try {
        cache[helper] = helpers[helper] = func(cache, state);
        if (typeof cache[helper] === 'function') {
          // for triggering error
          cache[helper](true);
        }
      } catch(e) {
        // console.error(e);
        redo[helper] = func;
      }
      // }
      Object.assign(state, helpers);
    }
    // this.buildHelpers();
    if (Object.entries(redo).length > 0) {
      // console.log(helpers, redo);
      // debugger;
      this.recursiveCount++;
      if (this.recursiveCount > 100) {
        console.log(this.recursiveCount, helpers, redo);
        throw new Error('too many recursion');
      }
      this.compileHelpersHelper(state, redo);
      this.recursiveCount--;
    }
  }

  public findEvent(eventName: string): any {
    return this.regions.map((e) => e.events).filter((v) => v).flatMap((events) => Object.entries(events!)).find((event) => event[0] === eventName);
  }

  private buildState(newState: ChecksState): ChecksState {
    const combinedState: ChecksState = {
      here: () => (stuff: string) => {
        this.debugLog('need to implement here():', stuff);
        return false;
      },
      Nuts: false,
      Zeldas_Letter: false,
      Kokiri_Sword: false,
      Boomerang: false,
      Slingshot: false,
      Sticks: false,

      // Songs
      Ocarina: false,
      Sarias_Song: false,
      Suns_Song: false,
      Song_of_Storms: false,
      Song_of_Time: false,
      Zeldas_Lullaby: false,
      Serenade_of_Water: false,
      Bolero_of_Fire: false,
      Minuet_of_Forest: false,
      Nocturne_of_Shadow: false,
      Prelude_of_Light: false,
      Requiem_of_Spirit: false,
      Epona: false,
      Eponas_Song: false,
      Scarecrow_Song: false,

      Magic_Meter: false,
      Progressive_Hookshot: 0,
      Progressive_Strength_Upgrade: 0,

      // State
      age: 'child',
      at_day: true,
      at_night: true,
      at_dampe_time: true,
      // these are capabilities used for has_projectile
      child: true,
      adult: true,
      both: true,
      either: true,

      // Logic settings
      lacs_condition: 'vanilla',
      bridge: 'open',
      gerudo_fortress: 'normal',
      hints: 'agony',
      open_forest: 'closed',
      open_kakariko: 'closed',
      zora_fountain: 'open', // open, adult
      logic_rules: 'glitchless',
      skip_child_zelda: false,
      shuffle_weird_egg: false,
      starting_age: 'child',
      shuffle_dungeon_entrances: false,
      shuffle_overworld_entrances: false,
      damage_multiplier: null,
      big_poe_count: 1,
      Bombchu_Drop: false,
      Deku_Stick_Drop: true,
      Deku_Nut_Drop: true,
      Deliver_Letter: false, // Sam: what is this for?
      bombchus_in_logic: false,
      disable_trade_revert: false,
      open_door_of_time: false,

      // Tricks
      ...tricks,
      // logic_lens_shadow: false,
      // logic_lens_shadow_back: false,
      // logic_shadow_freestanding_key: false,
      // logic_visible_collisions: false,
      // logic_crater_upper_to_lower: false,
      // logic_wasteland_crossing: false,
      // logic_mido_backflip: false,
      // logic_jabu_boss_gs_adult: false,
      // logic_grottos_without_agony: false,

      // Buy shops?
      Buy_Deku_Stick_1: false,
      Buy_Deku_Nut_5: false,
      Buy_Deku_Nut_10: false,
      Buy_Bombchu_5: false,
      Buy_Bombchu_10: false,
      Buy_Bombchu_20: false,
      Buy_Deku_Shield: false,
      Buy_Hylian_Shield: false,

      Mask_of_Truth: false,
      Stone_of_Agony: false,
      Magic_Bean: false,
      Magic_Bean_Pack: false,
      Weird_Egg: false,

      Shadow_Medallion: false,
      Light_Medallion: false,
      Spirit_Medallion: false,
      Forest_Medallion: false,
      Fire_Medallion: false,
      Water_Medallion: false,
      Kokiri_Emerald: false,
      Goron_Ruby: false,
      Zora_Sapphire: false,

      Dins_Fire: false,
      Farores_Wind: false,
      Nayrus_Love: false,

      Lens_of_Truth: false,
      Bow: false,
      Fire_Arrows: false,
      Light_Arrows: false,
      Megaton_Hammer: false,
      Bomb_Bag: false,
      Bombchus: false,
      Iron_Boots: false,
      Hover_Boots: false,
      Mirror_Shield: false,
      Progressive_Scale: 0,
      Big_Poe: false,
      Bottle_with_Big_Poe: 0,

      // Convert from adult_trading
      Pocket_Egg: false,
      Pocket_Cucco: false,
      Cojiro: false,
      Odd_Mushroom: false,
      Poachers_Saw: false,
      Broken_Sword: false,
      Eyedrops: false,
      Eyeball_Frog: false,
      Prescription: false,
      Claim_Check: false,
      // Odd_Potion: false,

      // Keys
      Small_Key_Shadow_Temple: 0,
      Small_Key_Gerudo_Fortress: 0,

      ...newState,
    };
    combinedState.Deku_Tree_Clear = ((combinedState.age === 'adult' && combinedState.Hylian_Shield) || (combinedState.age === 'child' && combinedState.Deku_Shield)) && (combinedState.age === 'adult' || combinedState.Kokiri_Sword || combinedState.Sticks);
    return combinedState;
  }
}
