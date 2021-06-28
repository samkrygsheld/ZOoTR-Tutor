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
  // Singleton
  private static instance: StorageService;
  public static get Instance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }
  private constructor() {
    this.loadState();
  }

  public saveData: ISaveData = {
    inventory: {},
    checks: {},
  };

  public loadState(): void {
    this.saveData = JSON.parse(window.localStorage.getItem('saveData')!) || this.saveData;
    this.saveData.inventory = this.saveData.inventory || {};
    this.saveData.checks = this.saveData.checks || {};
  }

  public saveState(): void {
    localStorage.setItem('saveData', JSON.stringify(this.saveData));
  }
}
