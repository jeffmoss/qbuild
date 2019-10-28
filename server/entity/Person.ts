import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, Column as DBColumn } from "typeorm";
import { Field as APIField, ID, ObjectType } from "type-graphql";

import { Company } from "./Company";

@Entity({ name: "people" })
@ObjectType()
export class Person {
  @APIField(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @APIField()
  @DBColumn()
  first_name: string;

  @APIField()
  @DBColumn()
  last_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(type => Company, company => company.people)
  @JoinColumn({ name: "company_id" })
  company: Company;
}
