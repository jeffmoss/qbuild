import { observable } from "mobx"

export class AppStore {
  @observable records: any[] = [];

  constructor(...args: any[]) {
    this.load(...args);
  }

  load(...args: any[]): void { return; };

  create(values: any): any { return; };
}
