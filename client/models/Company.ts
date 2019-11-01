import { request } from "graphql-request";

import { AppModel } from "./AppModel";
import { AppStore } from "./AppStore";

import { Person } from "./Person";

export class Company extends AppModel {
  id: number;
  name: string;
  people: Person[];

  constructor({name, id, people}: {name?: string, id?: number, people?: Person[]}) {
    super()
    Object.assign(this, { name, id, people });
  }

  static async find(id: string) {
    const query = `{
      company(id: "${id}") {
        id
  	    name
      	people {
          id
          first_name
          last_name
        }
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    return new Company(data.company);
  }
}

export class CompanyStore extends AppStore {
  async load(...args: any[]) {
    const query = `{
      companies {
        id
        name
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    this.records = data.companies.map((company: any) => new Company(company));
  }

  async create({ name }: { name: string }) {
    const query = `mutation {
      addCompany(company: {
        name: "${name}"
      }) {
        id
        name
      }
    }`;
    const data = await request('http://localhost:4000/graphql', query);
    this.records.push(new Company(data.addCompany));
  }
}
