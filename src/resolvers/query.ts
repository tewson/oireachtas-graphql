import { IResolverObject, IFieldResolver } from "graphql-tools";

import { IResolverContext } from "./common";

interface IHouseQueryArgs {
  type: string;
  term: string;
}

interface IMemberQueryArgs {
  uri: string;
}

const resolveHouse: IFieldResolver<
  {},
  IResolverContext,
  IHouseQueryArgs
> = async (_, { type, term }, { dataSources }) => {
  return dataSources.oireachtasAPI.getHouse(type, term);
};

const resolveMember: IFieldResolver<
  {},
  IResolverContext,
  IMemberQueryArgs
> = async (_, { uri }, { dataSources }) => {
  return dataSources.oireachtasAPI.getMemberByURI(uri);
};

export const Query: IResolverObject = {
  house: resolveHouse,
  member: resolveMember
};
