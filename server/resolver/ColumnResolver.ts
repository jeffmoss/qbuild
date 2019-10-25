import { Resolver, Query, Root, Arg } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Column } from "../entity/Column";

@Resolver(of => Column)
export class ColumnResolver {
  constructor(
    @InjectRepository(Column) private readonly columnRepository: Repository<Column>
  ) {}

  @Query(returns => [Column])
  columns(@Arg("table_name", { nullable: true }) table_name?: string): Promise<Column[]> {
    return this.columnRepository.find({ where: { table_name } });
  }
}
