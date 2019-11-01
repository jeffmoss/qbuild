import { Arg, FieldResolver, Mutation, Query, Resolver, Root, Ctx } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Company, CompanyInput } from "../entity/Company";
import { Person } from "../entity/Person";

import { Context } from "../index";

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

  // Create
  @Mutation(type => Company)
  async addCompany(@Arg("company") companyData: CompanyInput, @Ctx() ctx: Context): Promise<Company> {
    const company = new Company();
    company.name = companyData.name;
    await this.companyRepository.save(company);
    return company;
  }
}
