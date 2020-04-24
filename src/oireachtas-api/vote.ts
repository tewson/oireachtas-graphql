import { Vote } from "../models";
import { BaseEntityByHouseAPIParams } from "./common";

interface VoteAPIResult {
  division: Vote;
}

export interface GetVotesParams extends BaseEntityByHouseAPIParams {
  uri: string;
  limit?: number;
}

export interface RawVoteAPIResponse {
  results: VoteAPIResult[];
}
