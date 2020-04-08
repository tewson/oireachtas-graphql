import { IMember } from "../models";
import { IBaseEntityByHouseAPIParams } from "./common";

interface IMemberWrapper {
  member: IMember;
}

export interface IRawMemberAPIResponse {
  results: IMemberWrapper[];
}

export interface IGetMembersParams extends IBaseEntityByHouseAPIParams {}
