'use strict';

import { kebabToCamel } from './utils.js';

export class Item {
    name;
    icons = [];
    constructor(name, numberOfStates) {
        this.name = name;
        for (let i = 0; i < numberOfStates; i++) {
            this.icons.push(`assets/images/icons/${name}${i}.png`);
        }
    }
}

export class ItemState {
    item;
    img;
    state = 0;
    wrap = false;
    get icon() {
        return this.item.icons[this.state];
    }
    constructor(item, img, wrap = false) {
        this.item = item;
        this.img = img;
        this.wrap = wrap;
        this.img.src = this.icon;
    }

    setState(state) {
        this.state = state;
        this.img.src = this.icon;
    }

    changeState(step) {
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

    incrementState() {
        this.changeState(1);
    }

    decrementState() {
        this.changeState(-1);
    }
}

export class Criteria {
    requiredItemStates;
    trickSkips;
    constructor(requiredItemStates, trickSkips = []) {
        this.requiredItemStates = requiredItemStates;
        this.trickSkips = trickSkips;
    }
}

export class Check {
    location;
    criteria = [];

    spoiler = '';
    description = '';
    type = 'song';
    timeSensitive = null;
    subregion = null;
    age = null;
    price = null;
    xCoord = 0;
    yCoord = 0;
    videos = [];
    earlyPeek = false;
    get completable() { return true; }
    get icons() {
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
            case 'dungeon':
                icons += '👹';
                break;
        }
        if (this.price) {
            icons += this.price + '💰';
        }
        return icons;
    }
    constructor(checkData = {}) {
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
    check;
    checked;
    get class() {
        return 'check ' + (this.checked ? 'check-checked' : (this.check.completable ? 'check-checkable' : 'check-unchecked'));
    }
    constructor (check, checked) {
        this.check = check;
        this.checked = checked || false;
    }
}
