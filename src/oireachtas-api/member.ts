import { IBaseEntityByHouseAPIParams } from "./common";

export interface IMemberAPIResult {
  member: {
    uri: String;
    fullName: String;
  };
}

export interface IRawMemberAPIResponse {
  results: IMemberAPIResult[];
}

export interface IGetMembersParams extends IBaseEntityByHouseAPIParams {}
