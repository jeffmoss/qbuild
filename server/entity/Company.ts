import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";
import { Field as APIField, ID, ObjectType, InputType } from "type-graphql";

import { Person } from "./Person";

@InputType()
export class CompanyInput implements Partial<Company> {
  @APIField()
  name: string;
}

@Entity({ name: "companies" })
@ObjectType()
export class Company {
  @APIField(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @APIField()
  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => Person, person => person.company)
  people: Person[];
}
