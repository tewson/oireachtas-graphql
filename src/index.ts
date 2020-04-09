import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { OireachtasAPI } from "./oireachtas-api";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ oireachtasAPI: new OireachtasAPI() })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
