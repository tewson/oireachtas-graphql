import { IResolverObject, IFieldResolver } from "graphql-tools";

import { IHouse, IMemberWrapper, IMember } from "../oireachtas-api";
import { IResolverContext } from "./common";

interface IVoteTally {
  members: IMemberWrapper[];
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
  tallyMembers: IMemberWrapper[]
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

export const Vote: IResolverObject = {
  tallies: voteTallies
};
