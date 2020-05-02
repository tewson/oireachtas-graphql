import { DataSource } from "apollo-datasource";
import { ApolloServer } from "apollo-server-lambda";

import { typeDefs } from "../schema";
import { resolvers } from "../resolvers";
import { OireachtasAPI } from "../oireachtas-api";

interface DataSources {
  (): {
    [key: string]: DataSource;
  };
}

const dataSources: DataSources = () => ({ oireachtasAPI: new OireachtasAPI() });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

export const handler = server.createHandler();
