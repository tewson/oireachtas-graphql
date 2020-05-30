import { EntityWithShowAs } from "./common";
import { House } from "./house";

export enum TallyType {
  Staon = "staonVotes",
  Ta = "taVotes",
  Nil = "nilVotes",
}

interface VoteTallyMember extends EntityWithShowAs {
  memberCode: string;
}

export interface VoteTallyMemberWrapper {
  member: VoteTallyMember;
}

interface VoteTally {
  members: VoteTallyMemberWrapper[];
}

export interface Vote {
  house: House;
  tallies: {
    [key in TallyType]: VoteTally;
  };
}
