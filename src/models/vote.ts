import { IHouse } from "./house";

export enum TallyType {
  Staon = "staonVotes",
  Ta = "taVotes",
  Nil = "nilVotes"
}

export interface IVoteTallyMemberWrapper {
  member: {
    memberCode: string;
    uri: string;
    showAs: string;
  };
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
