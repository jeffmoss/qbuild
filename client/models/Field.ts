import { request } from "graphql-request";

import { AppModel } from "./AppModel";
import { AppStore } from "./AppStore";

import * as Models from './index'

// TODO: This ought to be coming from an "App" model, app-specific stores only.
const storeMap : { [key: string]: any } = {
  "CompanyStore": Models.CompanyStore,
  "PersonStore": Models.PersonStore,
}

export class Field extends AppModel {
  name: string;
  column_name: string
  column_default: string;
  data_source: string;
  type: string;

  public store: AppStore;

  constructor({name, column_name, data_source, type, form_id}: {name?: string, column_name?: string, data_source?: string, type: string, form_id?: number}) {
    super()
    Object.assign(this, { name, column_name, data_source, type, form_id });
    if (data_source)
      this.store = new storeMap[data_source]();
  }
}

export class FieldStore extends AppStore {
  async load(form_id: number, ...args: any[]) {
    const query = `{
      fields(form_id: "${form_id}") {
        column_name
        type
        name
        data_source
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    this.records = data.fields.map((field: any) => new Field(field));
  }
}
