import { IBaseEntityByHouseAPIParams } from "./common";

export interface IMember {
  uri: String;
  fullName: String;
}

export interface IMemberWrapper {
  member: IMember;
}

export interface IRawMemberAPIResponse {
  results: IMemberWrapper[];
}

export interface IGetMembersParams extends IBaseEntityByHouseAPIParams {}
