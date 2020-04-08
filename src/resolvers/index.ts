import { IResolvers } from "graphql-tools";

import { Query } from "./Query";
import { House } from "./House";
import { Vote } from "./Vote";

export const resolvers: IResolvers = {
  Query,
  House,
  Vote
};
