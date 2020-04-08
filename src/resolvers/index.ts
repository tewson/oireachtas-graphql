import { IResolvers } from "graphql-tools";

import { Query } from "./query";
import { House } from "./house";
import { Vote } from "./vote";

export const resolvers: IResolvers = {
  Query,
  House,
  Vote
};
