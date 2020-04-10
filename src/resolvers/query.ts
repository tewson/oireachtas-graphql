import { IResolverObject, IFieldResolver } from "graphql-tools";

import { IResolverContext } from "./common";

interface IHouseQueryArgs {
  type: string;
  term: string;
}

const resolveHouse: IFieldResolver<
  {},
  IResolverContext,
  IHouseQueryArgs
> = async (_, { type, term }, { dataSources }) => {
  return dataSources.oireachtasAPI.getHouse(type, term);
};

export const Query: IResolverObject = {
  house: resolveHouse
};
