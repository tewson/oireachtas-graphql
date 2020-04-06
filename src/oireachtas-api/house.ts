export interface IHouse {
  uri: String;
}

interface IHouseAPIResult {
  house: IHouse;
}

export interface IRawHouseAPIResponse {
  results: IHouseAPIResult[];
}
