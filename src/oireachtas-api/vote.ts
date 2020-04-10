import { Vote } from "../models";
import { BaseEntityByHouseAPIParams } from "./common";

interface VoteAPIResult {
  division: Vote;
}

export interface GetVotesParams extends BaseEntityByHouseAPIParams {
  limit?: Number;
}

export interface RawVoteAPIResponse {
  results: VoteAPIResult[];
}
