import { IEntityWithShowAs } from "./common";
import { IMember } from "./member";
import { IVote } from "./vote";

export interface IHouse extends IEntityWithShowAs {
  houseType: string;
  houseNo: string;
  seats: Number;
  dateRange: {
    start: string;
    end: string;
  };
  members: IMember[];
  votes: IVote;
}
