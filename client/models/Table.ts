import { request } from "graphql-request";

import { AppModel } from "./AppModel";
import { AppStore } from "./AppStore";

export class Table extends AppModel {
  constructor(public name: string) {
    super()
  }
}

export class TableStore extends AppStore {
  async load(...args: any[]) {
    const query = `{
      tables {
        name
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    this.records = data.tables.map((table: any) => new Table(table));
  }
}
