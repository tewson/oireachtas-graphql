import { IHouse } from "../models";

interface IHouseAPIResult {
  house: IHouse;
}

export interface IRawHouseAPIResponse {
  results: IHouseAPIResult[];
}
