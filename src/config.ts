import { Config } from "apollo-server";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { OireachtasAPI } from "./oireachtas-api";

export const config: Config = {
  typeDefs,
  resolvers,
  dataSources: () => ({ oireachtasAPI: new OireachtasAPI() }),
};
