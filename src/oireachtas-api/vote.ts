import { IVote } from "../models";
import { IBaseEntityByHouseAPIParams } from "./common";

interface IVoteAPIResult {
  division: IVote;
}

export interface IGetVotesParams extends IBaseEntityByHouseAPIParams {
  limit?: Number;
}

export interface IRawVoteAPIResponse {
  results: IVoteAPIResult[];
}
