import { IResolverObject, IFieldResolver } from "graphql-tools";

import {
  Member,
  Vote as VoteModel,
  VoteTallyMemberWrapper,
  TallyType
} from "../models";
import { ResolverContext } from "./common";

const expandTallyMembers = (
  members: Member[],
  tallyMembers: VoteTallyMemberWrapper[]
): Member[] => {
  return members.filter(member =>
    tallyMembers.some(
      voteMemberWrapper => voteMemberWrapper.member.uri === member.uri
    )
  );
};

const resolveTallies: IFieldResolver<VoteModel, ResolverContext> = async (
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

const resolveHouse: IFieldResolver<VoteModel, ResolverContext> = async (
  { house },
  _,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getHouseByChamberId(house.uri);
};

export const Vote: IResolverObject = {
  tallies: resolveTallies,
  house: resolveHouse
};
