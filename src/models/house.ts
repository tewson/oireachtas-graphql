import { EntityWithShowAs, DateRange } from "./common";
import { Member } from "./member";
import { Vote } from "./vote";

export interface House extends EntityWithShowAs {
  houseType: string;
  houseNo: string;
  seats: Number;
  dateRange: DateRange;
  members: Member[];
  votes: Vote;
}
