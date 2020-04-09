import { IResolverObject, IFieldResolver } from "graphql-tools";

import { IHouse } from "../models";
import { IResolverContext } from "./common";

const resolveMembers: IFieldResolver<IHouse, IResolverContext> = async (
  { uri: houseURI },
  _,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getMembers({ houseURI });
};

const resolveVotes: IFieldResolver<IHouse, IResolverContext> = async (
  { uri: houseURI },
  __,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getVotes({ houseURI });
};

export const House: IResolverObject = {
  members: resolveMembers,
  votes: resolveVotes
};
