interface IInventory {
  [inventory: string]: number;
}
interface IChecks {
  [check: string]: boolean;
}
export interface ISaveData {
  inventory: IInventory,
  checks: IChecks,
}

export class StorageService {
  public saveData: ISaveData = {
    inventory: {},
    checks: {},
  };
  constructor() {
    this.loadState();
  }

  public loadState() {
    this.saveData = JSON.parse(localStorage.getItem('saveData')!) || this.saveData;
    this.saveData.inventory = this.saveData.inventory || {};
    this.saveData.checks = this.saveData.checks || {};
  }

  public saveState() {
    localStorage.setItem('saveData', JSON.stringify(this.saveData));
  }
}
