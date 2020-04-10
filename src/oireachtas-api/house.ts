import { House } from "../models";

interface HouseAPIResult {
  house: House;
}

export interface RawHouseAPIResponse {
  results: HouseAPIResult[];
}
