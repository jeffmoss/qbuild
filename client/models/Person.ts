import { request } from "graphql-request";

import { AppModel } from "./AppModel";
import { AppStore } from "./AppStore";

export class Person extends AppModel {
  id: number;
  first_name: string;
  last_name: string
  company_id: number;

  constructor({id, first_name, last_name, company_id}: {id?: number, first_name?: string, last_name?: string, company_id?: number}) {
    super()
    Object.assign(this, { first_name, last_name, company_id });
  }
}

export class PersonStore extends AppStore {
  async load(company_id: number, ...args: any[]) {
    const query = `{
      people(company_id: "${company_id}") {
        id
        first_name
        last_name
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    this.records = data.people.map((person: any) => new Person(person));
  }
}
