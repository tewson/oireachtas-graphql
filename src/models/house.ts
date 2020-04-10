import { IMember } from "./member";
import { IVote } from "./vote";

export interface IHouse {
  uri: string;
  houseType: string;
  houseNo: string;
  showAs: string;
  seats: Number;
  dateRange: {
    start: string;
    end: string;
  };
  members: IMember[];
  votes: IVote;
}
