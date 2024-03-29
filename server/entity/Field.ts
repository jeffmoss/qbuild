import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, Column as DBColumn } from "typeorm";
import { Field as APIField, ID, ObjectType } from "type-graphql";

import { Form } from "./Form";

@Entity({ name: "fields" })
@ObjectType()
export class Field {
  @APIField(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @APIField()
  @DBColumn({ default: "TextField"})
  type: string;

  @APIField({ nullable: true })
  @DBColumn({ nullable: true })
  data_source: string;

  @APIField()
  @DBColumn()
  column_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(type => Form, form => form.fields)
  @JoinColumn({ name: "form_id" })
  form: Form;
}
