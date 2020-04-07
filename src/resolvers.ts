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

const expandTallyMembers = (members: any, tallyMembers: any) =>
  (members as any[]).filter(member =>
    (tallyMembers as any[]).some(
      voteMemberWrapper => voteMemberWrapper.member.uri === member.uri
    )
  );

const voteTallies: IFieldResolver<any, IResolverContext> = async (
  vote,
  _,
  { dataSources }
) => {
  const members = await dataSources.oireachtasAPI.getMembers({
    houseURI: vote.house.uri
  });

  const tallies = Object.keys(vote.tallies).reduce((tallies, tallyType) => {
    return {
      ...tallies,
      [tallyType]: {
        ...vote.tallies[tallyType],
        members: expandTallyMembers(members, vote.tallies[tallyType].members)
      }
    };
  }, {});

  return tallies;
};

const Vote: IResolverObject = {
  tallies: voteTallies
};

export const resolvers: IResolvers = {
  Query,
  House,
  Vote
};
