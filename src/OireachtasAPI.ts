import { RESTDataSource } from "apollo-datasource-rest";

interface IHouseAPIResult {
  house: {
    uri: String;
  };
}

interface IMemberAPIResult {
  member: {
    uri: String;
    fullName: String;
  };
}

interface IRawHouseAPIResponse {
  results: IHouseAPIResult[];
}

interface IRawMemberAPIResponse {
  results: IMemberAPIResult[];
}

interface IGetMembersParams {
  houseUri: String;
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

  async getMembers({ houseUri }: IGetMembersParams) {
    const { results = [] } = await this.get<IRawMemberAPIResponse>("members", {
      chamber_id: houseUri,
      limit: 200
    });

    return results.map(result => result.member);
  }
}
