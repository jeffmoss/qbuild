import { Resolver, FieldResolver, Query, Arg, Root } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Form } from "../entity/Form";
import { Field } from "../entity/Field";

@Resolver(of => Form)
export class FormResolver {
  constructor(
    @InjectRepository(Form) private readonly formRepository: Repository<Form>,
    @InjectRepository(Field) private readonly fieldRepository: Repository<Field>
  ) {}

  @Query(returns => Form, { nullable: true })
  form(@Arg("id") id: string): Promise<Form | undefined> {
    return this.formRepository.findOne(id);
  }

  @Query(returns => [Form])
  forms(): Promise<Form[]> {
    return this.formRepository.find();
  }

  @FieldResolver(type => [Field])
  fields(@Root() form: Form): Promise<Field[]> {
    return this.fieldRepository.find({
      where: { form_id: form.id },
    });
  }
}
