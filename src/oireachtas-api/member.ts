import { Member } from "../models";
import { BaseEntityByHouseAPIParams } from "./common";

interface MemberWrapper {
  member: Member;
}

export interface RawMemberAPIResponse {
  results: MemberWrapper[];
}

export interface GetMembersParams extends BaseEntityByHouseAPIParams {}
