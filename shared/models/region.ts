interface RuleObj {
  [name: string]: string;
}
interface RegionJSON {
  region_name: string;
  locations?: RuleObj;
  dungeon?: string;
  scene?: string;
  hint?: string;
  events?: RuleObj;
  exits?: RuleObj;
  time_passes?: boolean;
}
export interface Region extends Omit<RegionJSON, 'region_name' | 'time_passes'> {
  regionName: string;
  timePasses?: boolean;
}
export class Region {
  constructor(regionObj: RegionJSON) {
    this.regionName = regionObj.region_name;
    this.locations = regionObj.locations;
    this.dungeon = regionObj.dungeon;
    this.scene = regionObj.scene;
    this.hint = regionObj.hint;
    this.events = regionObj.events;
    this.exits = regionObj.exits;
    this.timePasses = regionObj.time_passes;
  }
}
