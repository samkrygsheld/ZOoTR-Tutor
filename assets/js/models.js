'use strict';

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
    get icon() {
        return this.item.icons[this.state];
    }
    constructor(item, img) {
        this.item = item;
        this.img = img;
        this.img.src = this.icon;
    }

    setState(state) {
        this.state = state;
        this.img.src = this.icon;
    }

    incrementState(step = 1) {
        this.state += step;
        if (this.state >= this.item.icons.length) {
            this.state = this.item.icons.length - 1;
        } else if (this.state < 0) {
            this.state = 0;
        }
        this.img.src = this.icon;
    }
}

export class Criteria {
    requiredItems;
    trickSkips;
    constructor(requiredItems = [], trickSkips = []) {
        this.requiredItems = requiredItems;
        this.trickSkips = trickSkips;
    }
}

export class Check {
    location;
    criteria;
    isCompleteable;
    isSkull;
    constructor() {}
}