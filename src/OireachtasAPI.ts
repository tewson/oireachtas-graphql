import { RESTDataSource } from "apollo-datasource-rest";

interface IHouseAPIResult {
  house: {
    uri: String;
  };
}

interface IRawHouseAPIResponse {
  results: IHouseAPIResult[];
}

export class OireachtasAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.oireachtas.ie/v1/";
  }

  async getHouse(type: String, term: String) {
    const { results = [] } = await this.get<IRawHouseAPIResponse>("houses", {
      chamber_id: `https://data.oireachtas.ie/ie/oireachtas/house/${type}/${term}`
    });

    return results[0]?.house;
  }
}
