import { RESTDataSource } from "apollo-datasource-rest";

import { IRawHouseAPIResponse } from "./house";
import { IGetMembersParams, IRawMemberAPIResponse } from "./member";
import { IGetVotesParams, IRawVoteAPIResponse } from "./vote";

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

  async getMembers({ houseURI }: IGetMembersParams) {
    const { results = [] } = await this.get<IRawMemberAPIResponse>("members", {
      chamber_id: houseURI,
      limit: 200
    });

    return results.map(result => result.member);
  }

  async getVotes({ houseURI, limit = 10000 }: IGetVotesParams) {
    const { results = [] } = await this.get<IRawVoteAPIResponse>("divisions", {
      chamber_id: houseURI,
      limit
    });

    return results.map(result => result.division);
  }
}
