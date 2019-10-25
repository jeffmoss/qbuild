import { request } from "graphql-request";

import { AppModel } from "./AppModel";
import { AppStore } from "./AppStore";

export class Field extends AppModel {
  name: string;
  column_name: string
  column_default: any;
  input_type: string;

  constructor({name, column_name, form_id}: {name?: string, column_name?: string, form_id?: number}) {
    super()
    Object.assign(this, { name, column_name, form_id });
  }
}

export class FieldStore extends AppStore {
  async load(form_id: number, ...args: any[]) {
    const query = `{
      fields(form_id: "${form_id}") {
        column_name
        name
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    this.records = data.fields.map((field: any) => new Field(field));
  }
}
