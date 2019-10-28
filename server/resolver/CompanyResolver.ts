import { Resolver, FieldResolver, Query, Arg, Root } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Company } from "../entity/Company";
import { Person } from "../entity/Person";

@Resolver(of => Company)
export class CompanyResolver {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
  ) {}

  @Query(returns => Company, { nullable: true })
  company(@Arg("id") id: string): Promise<Company | undefined> {
    return this.companyRepository.findOne(id);
  }

  @Query(returns => [Company])
  companies(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  @FieldResolver(type => [Person])
  people(@Root() company: Company): Promise<Person[]> {
    return this.personRepository.find({
      where: { company_id: company.id },
    });
  }
}
