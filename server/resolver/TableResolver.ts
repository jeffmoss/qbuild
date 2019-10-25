import { Resolver, FieldResolver, Query, Root } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Table } from "../entity/Table";
import { Column } from "../entity/Column";

@Resolver(of => Table)
export class TableResolver {
  constructor(
    @InjectRepository(Table) private readonly tableRepository: Repository<Table>,
    @InjectRepository(Column) private readonly columnRepository: Repository<Column>
  ) {}

  @Query(returns => [Table])
  tables(): Promise<Table[]> {
    return this.tableRepository.find();
  }

  @FieldResolver(type => [Column])
  columns(@Root() table: Table): Promise<Column[]> {
    return this.columnRepository.find({
      where: { table_name: table.name },
    });
  }
}
