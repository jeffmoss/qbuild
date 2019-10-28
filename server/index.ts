import express from 'express';
import morgan from "morgan";
import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server-express";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from "type-graphql";

import { seedDatabase } from "./entity";

import { TableResolver } from "./resolver/TableResolver";
import { ColumnResolver } from "./resolver/ColumnResolver";
import { FormResolver } from "./resolver/FormResolver";
import { CompanyResolver } from "./resolver/CompanyResolver";

export interface Context {
  // user: User;
}

// register 3rd party IOC container
TypeORM.useContainer(Container);

async function bootstrap() {
  try {
    // create TypeORM connection
    await TypeORM.createConnection();

    // seed database with some data
    const objects = await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [ColumnResolver, CompanyResolver, TableResolver, FormResolver],
      container: Container,
    });

    // create mocked context
    // const context: Context = { user: defaultUser };
    const context: Context = { };

    // Create GraphQL server
    const server = new ApolloServer({ schema, context });

    // Start the server
    const app = express();

    app.use(morgan('dev'));

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
