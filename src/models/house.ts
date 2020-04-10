import { IMember } from "./member";
import { IVote } from "./vote";

export interface IHouse {
  uri: string;
  houseType: String;
  houseNo: String;
  showAs: String;
  seats: Number;
  dateRange: {
    start: String;
    end: String;
  };
  members: IMember[];
  votes: IVote;
}
