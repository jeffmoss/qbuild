import { ViewEntity, PrimaryColumn, OneToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { Column } from "./Column";

@ViewEntity({
  name: "tables",
  expression: `
    SELECT table_name as name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `
})
@ObjectType()
export class Table {
  @Field(type => ID)
  @PrimaryColumn()
  readonly name: string;

  @OneToMany(type => Column, column => column.table)
  columns: Column[];
}
