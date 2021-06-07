import { kebabToCamel } from './utils';

export class Item {
  public name: string;
  public icons: string[] = [];
  constructor(name: string, numberOfStates: number) {
    this.name = name;
    for (let i = 0; i < numberOfStates; i++) {
      this.icons.push(`images/icons/${name}${i}.png`);
    }
  }
}

export class ItemState {
  public item: Item;
  public img: HTMLImageElement;
  public state: number = 0;
  public wrap: boolean = false;
  public get icon() {
    return this.item.icons[this.state];
  }
  constructor(item: Item, img: HTMLImageElement, wrap: boolean = false) {
    this.item = item;
    this.img = img;
    this.wrap = wrap;
    this.img.src = this.icon;
  }

  public setState(state: number) {
    this.state = state;
    this.img.src = this.icon;
  }

  public changeState(step: number) {
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
    this.img.src = this.icon;
  }

  public incrementState() {
    this.changeState(1);
  }

  public decrementState() {
    this.changeState(-1);
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
  public get completable() {
    return true;
  }
  public get icons() {
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
    for (let prop in checkData) {
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
  public get class() {
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
