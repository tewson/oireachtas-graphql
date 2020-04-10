import { Member } from "../models";

interface MemberWrapper {
  member: Member;
}

export interface RawMemberAPIResponse {
  results: MemberWrapper[];
}
