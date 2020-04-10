import { DataSource } from "apollo-datasource";
import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { OireachtasAPI } from "./oireachtas-api";

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

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
