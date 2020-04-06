interface IHouse {
  uri: String;
}

interface IHouseAPIResult {
  house: {
    uri: String;
  };
}

export interface IRawHouseAPIResponse {
  results: IHouseAPIResult[];
}
