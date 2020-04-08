import { IBaseEntityByHouseAPIParams } from "./common";

interface IMember {
  uri: String;
  fullName: String;
}

interface IMemberWrapper {
  member: IMember;
}

export interface IRawMemberAPIResponse {
  results: IMemberWrapper[];
}

export interface IGetMembersParams extends IBaseEntityByHouseAPIParams {}
