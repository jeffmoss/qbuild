import { request } from "graphql-request";

import { AppModel } from "./AppModel";
import { AppStore } from "./AppStore";

import { Field } from "./Field";

export class Form extends AppModel {
  fields: Field[];

  constructor({name, table_name, id, fields}: {name?: string, table_name?: string, id?: number, fields?: Field[]}) {
    super()
    Object.assign(this, { name, table_name, id, fields });
  }

  static async find(id: string) {
    const query = `{
      form(id: "${id}") {
        id
  	    name
      	table_name
      	fields {
          id
          type
          column_name
          data_source
        }
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    return new Form(data.form);
  }
}

export class FormStore extends AppStore {
  async load(...args: any[]) {
    const query = `{
      forms {
        id
        name
        table_name
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    this.records = data.forms.map((table: any) => new Form(table));
  }
}
