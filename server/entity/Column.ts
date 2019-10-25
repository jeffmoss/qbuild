import { ViewEntity, PrimaryColumn, ManyToOne, JoinColumn, Column as DBColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { Table } from "./Table";

@ViewEntity({
  name: "columns",
  expression: `
    SELECT table_name,
         column_name as name,
         data_type,
         column_default,
         CAST(is_nullable AS BOOLEAN) as nullable
    FROM information_schema.columns
    WHERE table_schema = 'public'
  `
})
@ObjectType()
export class Column {
  @Field(type => ID)
  @PrimaryColumn()
  readonly name: string;

  @Field()
  @DBColumn()
  readonly table_name: string;

  @ManyToOne(type => Table, table => table.columns)
  @JoinColumn({ name: "table_name" })
  readonly table: Table;

  @Field()
  @DBColumn()
  readonly data_type: string;

  @Field({ nullable: true })
  @DBColumn()
  readonly column_default: string;

  @Field()
  @DBColumn()
  readonly nullable: boolean;
}
