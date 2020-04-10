import { IEntityWithShowAs, IDateRange } from "./common";
import { IMember } from "./member";
import { IVote } from "./vote";

export interface IHouse extends IEntityWithShowAs {
  houseType: string;
  houseNo: string;
  seats: Number;
  dateRange: IDateRange;
  members: IMember[];
  votes: IVote;
}
