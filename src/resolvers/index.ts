import { IResolvers, IResolverObject, IFieldResolver } from "graphql-tools";

import { IHouse, IMemberAPIResult, OireachtasAPI } from "../oireachtas-api";

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

interface IMember {
  uri: String;
}

interface IVoteTally {
  members: IMemberAPIResult[];
}

enum TallyType {
  Staon = "staonVotes",
  Ta = "taVotes",
  Nil = "nilVotes"
}

interface IVote {
  house: IHouse;
  tallies: {
    [key in TallyType]: IVoteTally;
  };
}

const expandTallyMembers = (
  members: IMember[],
  tallyMembers: IMemberAPIResult[]
) => {
  return members.filter(member =>
    tallyMembers.some(
      voteMemberWrapper => voteMemberWrapper.member.uri === member.uri
    )
  );
};

const voteTallies: IFieldResolver<IVote, IResolverContext> = async (
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
        ...vote.tallies[tallyType as TallyType],
        members: expandTallyMembers(
          members,
          vote.tallies[tallyType as TallyType].members
        )
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
