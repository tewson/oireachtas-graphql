import { IMember } from "./member";
import { IVote } from "./vote";

export interface IHouse {
  uri: String;
  members: IMember[];
  votes: IVote;
}
