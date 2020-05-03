import { ApolloServer, Config } from "apollo-server-lambda";

import { typeDefs } from "../schema";
import { resolvers } from "../resolvers";
import { OireachtasAPI } from "../oireachtas-api";

const serverConfig: Config = {
  typeDefs,
  resolvers,
  dataSources: () => ({ oireachtasAPI: new OireachtasAPI() })
};

const server = new ApolloServer(serverConfig);

export const handler = server.createHandler();
