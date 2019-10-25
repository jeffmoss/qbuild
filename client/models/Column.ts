import { request } from "graphql-request";

import { AppModel } from "./AppModel";
import { AppStore } from "./AppStore";

export class Column extends AppModel {
  constructor({name, data_type, column_default, nullable}: {name?: string, data_type?: string, column_default?: string, nullable?: boolean}) {
    super()
    Object.assign(this, { name, data_type, column_default, nullable });
  }
}

export class ColumnStore extends AppStore {
  async load(...args: any[]) {
    const query = `{
      columns(table_name: "${args[0]}") {
        name
        data_type
        column_default
        nullable
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    this.records = data.columns.map((column: any) => new Column(column));
  }
}
