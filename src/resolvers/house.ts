import { IResolverObject, IFieldResolver } from "graphql-tools";

import { IHouse } from "../oireachtas-api";
import { IResolverContext } from "./common";

const houseMembers: IFieldResolver<IHouse, IResolverContext> = async (
  { uri: houseURI },
  _,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getMembers({ houseURI });
};

const houseVotes: IFieldResolver<IHouse, IResolverContext> = async (
  { uri: houseURI },
  __,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getVotes({ houseURI });
};

export const House: IResolverObject = {
  members: houseMembers,
  votes: houseVotes
};