import { IResolverObject, IFieldResolver } from "graphql-tools";

import { IHouse } from "../models";
import { IResolverContext } from "./common";

const resolveType: IFieldResolver<IHouse, {}> = ({ houseType }) => houseType;
const resolveTerm: IFieldResolver<IHouse, {}> = ({ houseNo }) => houseNo;

const resolveMembers: IFieldResolver<IHouse, IResolverContext> = async (
  { uri: houseURI },
  _,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getMembers({ houseURI });
};

const resolveDateRange: IFieldResolver<IHouse, {}> = ({ dateRange }) =>
  dateRange;

const resolveVotes: IFieldResolver<IHouse, IResolverContext> = async (
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
  votes: resolveVotes
};
