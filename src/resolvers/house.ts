import { IResolverObject, IFieldResolver } from "graphql-tools";

import { House as HouseModel } from "../models";
import { ResolverContext } from "./common";

const resolveType: IFieldResolver<HouseModel, {}> = ({ houseType }) =>
  houseType;
const resolveTerm: IFieldResolver<HouseModel, {}> = ({ houseNo }) => houseNo;

const resolveMembers: IFieldResolver<HouseModel, ResolverContext> = async (
  { uri: houseURI },
  _,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getMembers({ houseURI });
};

const resolveDateRange: IFieldResolver<HouseModel, {}> = ({ dateRange }) =>
  dateRange;

const resolveVotes: IFieldResolver<HouseModel, ResolverContext> = async (
  { uri: houseURI },
  __,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getVotes({ houseURI });
};

export const House: IResolverObject = {
  type: resolveType,
  term: resolveTerm,
  dateRange: resolveDateRange,
  members: resolveMembers,
  votes: resolveVotes,
};
