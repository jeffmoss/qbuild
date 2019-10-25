import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Field as APIField, ID, ObjectType } from "type-graphql";

import { Field } from "./Field";

@Entity({ name: "forms" })
@ObjectType()
export class Form {
  @APIField(type => ID)
  @PrimaryColumn()
  id: number;

  @APIField()
  @Column()
  name: string;

  @APIField()
  @Column()
  table_name: string;

  @OneToMany(type => Field, field => field.form)
  fields: Field[];
}
