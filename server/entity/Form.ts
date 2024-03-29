import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";
import { Field as APIField, ID, ObjectType } from "type-graphql";

import { Field } from "./Field";

@Entity({ name: "forms" })
@ObjectType()
export class Form {
  @APIField(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @APIField()
  @Column()
  name: string;

  @APIField()
  @Column()
  table_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => Field, field => field.form)
  fields: Field[];
}
