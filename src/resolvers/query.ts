import { IResolverObject, IFieldResolver } from "graphql-tools";

import { ResolverContext } from "./common";

interface HouseQueryArgs {
  type: string;
  term: string;
}

interface MemberQueryArgs {
  uri: string;
}

const resolveHouse: IFieldResolver<
  {},
  ResolverContext,
  HouseQueryArgs
> = async (_, { type, term }, { dataSources }) => {
  return dataSources.oireachtasAPI.getHouse(type, term);
};

const resolveMember: IFieldResolver<
  {},
  ResolverContext,
  MemberQueryArgs
> = async (_, { uri }, { dataSources }) => {
  return dataSources.oireachtasAPI.getMemberByURI(uri);
};

export const Query: IResolverObject = {
  house: resolveHouse,
  member: resolveMember
};
