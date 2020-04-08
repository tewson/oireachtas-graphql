import { IVoteTallyMemberWrapper } from "../models";
import { IBaseEntityByHouseAPIParams } from "./common";

interface IVoteTally {
  showAs: String;
  members: IVoteTallyMemberWrapper[];
  tally: Number;
}

interface IVoteAPIResult {
  division: {
    subject: {
      showAs: String;
    };
    tallies: {
      staonVotes: IVoteTally;
      taVotes: IVoteTally;
      nilVotes: IVoteTally;
    };
    debate: {
      showAs: String;
    };
  };
}

export interface IGetVotesParams extends IBaseEntityByHouseAPIParams {
  limit?: Number;
}

export interface IRawVoteAPIResponse {
  results: IVoteAPIResult[];
}
