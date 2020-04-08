import { IBaseEntityByHouseAPIParams } from "./common";

export interface IMemberWrapper {
  member: {
    uri: String;
    fullName: String;
  };
}

export interface IRawMemberAPIResponse {
  results: IMemberWrapper[];
}

export interface IGetMembersParams extends IBaseEntityByHouseAPIParams {}
