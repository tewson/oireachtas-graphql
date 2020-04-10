import { IEntityWithShowAs } from "./common";
import { IHouse } from "./house";

export enum TallyType {
  Staon = "staonVotes",
  Ta = "taVotes",
  Nil = "nilVotes"
}

interface IVoteTallyMember extends IEntityWithShowAs {
  memberCode: string;
}

export interface IVoteTallyMemberWrapper {
  member: IVoteTallyMember;
}

interface IVoteTally {
  members: IVoteTallyMemberWrapper[];
}

export interface IVote {
  house: IHouse;
  tallies: {
    [key in TallyType]: IVoteTally;
  };
}
