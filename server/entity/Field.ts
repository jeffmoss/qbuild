import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column as DBColumn } from "typeorm";
import { Field as APIField, ID, ObjectType } from "type-graphql";

import { Form } from "./Form";

@Entity({ name: "fields" })
@ObjectType()
export class Field {
  @APIField(type => ID)
  @PrimaryColumn()
  id: number;

  @APIField()
  @DBColumn()
  form_id: number;

  @APIField()
  @DBColumn()
  type: string;

  @APIField()
  @DBColumn()
  column_name: string;

  @ManyToOne(type => Form, form => form.fields)
  @JoinColumn({ name: "form_id" })
  form: Form;
}
