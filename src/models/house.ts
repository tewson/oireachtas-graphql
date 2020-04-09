import { IMember } from "./member";
import { IVote } from "./vote";

export interface IHouse {
  uri: String;
  houseType: String;
  houseNo: String;
  dateRange: {
    start: String;
    end: String;
  };
  members: IMember[];
  votes: IVote;
}
