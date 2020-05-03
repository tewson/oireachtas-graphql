import { ApolloServer, Config } from "apollo-server";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { OireachtasAPI } from "./oireachtas-api";

const serverConfig: Config = {
  typeDefs,
  resolvers,
  dataSources: () => ({ oireachtasAPI: new OireachtasAPI() })
};

const server = new ApolloServer(serverConfig);

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
