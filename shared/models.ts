import { StorageService } from './storage.service';
import { kebabToCamel, titleize } from './utils';

export class Item {
  public name: string;
  public display: string[] | string;
  public icons: string[] = [];
  constructor(name: string, display?: string[] | string, numberOfStates: number = 1) {
    this.name = name;
    this.display = display || titleize(name);
    for (let i = 0; i < numberOfStates + 1; i++) {
      this.icons.push(`images/icons/${name}${i}.png`);
    }
  }
}

export class Song extends Item {
  public notes: string;
  constructor(name: string, notes: string, display?: string) {
    super(name, display, 2);
    this.notes = notes;
  }
}

export class ItemState {
  public item: Item;
  public state: number = 0;
  public wrap: boolean = false;
  public get icon(): string {
    return this.item.icons[this.state];
  }
  constructor(item: Item, wrap: boolean = false) {
    this.item = item;
    this.wrap = wrap;
  }

  public setState(state: number): void {
    this.state = state;
    this.save();
  }

  public changeState(step: number): void {
    this.state += step;
    if (this.state >= this.item.icons.length) {
      if (this.wrap) {
        this.state = 0;
      } else {
        this.state = this.item.icons.length - 1;
      }
    } else if (this.state < 0) {
      if (this.wrap) {
        this.state = this.item.icons.length - 1;
      } else {
        this.state = 0;
      }
    }
    this.save();
  }

  public incrementState(): void {
    this.changeState(1);
  }

  public decrementState(): void {
    this.changeState(-1);
  }

  private save() {
    const $storage = StorageService.Instance;
    $storage.saveData.inventory[this.item.name] = this.state;
    $storage.saveState();
  }
}

export class Criteria {
  private requiredItemStates: ItemState[];
  private trickSkips;
  constructor(requiredItemStates: ItemState[], trickSkips = []) {
    this.requiredItemStates = requiredItemStates;
    this.trickSkips = trickSkips;
  }
}

type CheckType =
  | 'song'
  | 'skull'
  | 'auto'
  | 'chest'
  | 'interact'
  | 'purchase'
  | 'boss';

export class Check {
  [idx: string]: any;
  public location: string = '';
  public criteria: Criteria[] = [];

  public spoiler: string = '';
  public description: string = '';
  public type: CheckType = 'song';
  public timeSensitive: 'day' | 'night' | null = null;
  public subregion: string | null = null;
  public age: 'child' | 'adult' | 'both' | null = null;
  public price: number | null = null;
  public xCoord: number = 0;
  public yCoord: number = 0;
  public videos: string[] = [];
  public earlyPeek: boolean = false;
  public get completable(): boolean {
    return true;
  }
  public get icons(): string {
    let icons = '';
    switch (this.age) {
      case 'child':
        icons += '🧒';
        break;
      case 'adult':
        icons += '👨';
        break;
      case 'both':
        icons += '🧒👨';
    }
    switch (this.type) {
      case 'song':
        icons += '🎶';
        break;
      case 'skull':
        icons += '☠';
        break;
      case 'auto':
        icons += '🚗';
        break;
      case 'chest':
        icons += '🧰';
        break;
      case 'interact':
        icons += '🎬';
        break;
      case 'purchase':
        icons += '🛒';
        break;
      case 'boss':
        icons += '👹';
        break;
    }
    if (this.price) {
      icons += this.price + '💰';
    }
    return icons;
  }
  constructor(checkData: JSONObject = {}) {
    for (const prop in checkData) {
      const propName = kebabToCamel(prop);
      if (propName in this) {
        this[propName] = checkData[prop];
      } else {
        console.error(propName, 'not in check model properties');
      }
    }
  }
}

export class CheckState {
  public check;
  public checked;
  public get class(): string {
    return (
      'check ' +
      (this.checked
        ? 'check-checked'
        : (this.check.completable
          ? 'check-checkable'
          : 'check-unchecked'))
    );
  }
  constructor(check: Check, checked: boolean = false) {
    this.check = check;
    this.checked = checked;
  }
}
