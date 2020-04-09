import { IResolverObject, IFieldResolver } from "graphql-tools";

import { IMember, IVote, IVoteTallyMemberWrapper, TallyType } from "../models";
import { IResolverContext } from "./common";

const expandTallyMembers = (
  members: IMember[],
  tallyMembers: IVoteTallyMemberWrapper[]
) => {
  return members.filter(member =>
    tallyMembers.some(
      voteMemberWrapper => voteMemberWrapper.member.uri === member.uri
    )
  );
};

const resolveTallies: IFieldResolver<IVote, IResolverContext> = async (
  vote,
  _,
  { dataSources }
) => {
  const members = await dataSources.oireachtasAPI.getMembers({
    houseURI: vote.house.uri
  });

  const tallies = Object.values(TallyType).reduce((tallies, tallyType) => {
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

export const Vote: IResolverObject = {
  tallies: resolveTallies
};
