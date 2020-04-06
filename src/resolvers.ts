import { IResolvers, IResolverObject, IFieldResolver } from "graphql-tools";

import { IHouse, OireachtasAPI } from "./oireachtas-api";

interface IResolverContext {
  dataSources: {
    oireachtasAPI: OireachtasAPI;
  };
}

interface IHouseQueryArgs {
  type: String;
  term: String;
}

const house: IFieldResolver<{}, IResolverContext, IHouseQueryArgs> = async (
  _,
  { type, term },
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getHouse(type, term);
};

const Query: IResolverObject = {
  house
};

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

const House: IResolverObject = {
  members: houseMembers,
  votes: houseVotes
};

export const resolvers: IResolvers = {
  Query,
  House
};
