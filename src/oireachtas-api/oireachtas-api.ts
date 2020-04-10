import { RESTDataSource } from "apollo-datasource-rest";

import { RawHouseAPIResponse } from "./house";
import { GetMembersParams, RawMemberAPIResponse } from "./member";
import { GetVotesParams, RawVoteAPIResponse } from "./vote";

export class OireachtasAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.oireachtas.ie/v1/";
  }

  async getHouseByChamberId(chamberId: string) {
    const { results = [] } = await this.get<RawHouseAPIResponse>("houses", {
      chamber_id: chamberId
    });

    return results[0]?.house;
  }

  async getHouse(type: string, term: string) {
    return this.getHouseByChamberId(
      `https://data.oireachtas.ie/ie/oireachtas/house/${type}/${term}`
    );
  }

  async getMemberByURI(uri: string) {
    const { results = [] } = await this.get<RawMemberAPIResponse>("members", {
      member_id: uri,
      limit: 1
    });

    return results.map(result => result.member)[0];
  }

  async getMembers({ houseURI }: GetMembersParams) {
    const { results = [] } = await this.get<RawMemberAPIResponse>("members", {
      chamber_id: houseURI,
      limit: 200
    });

    return results.map(result => result.member);
  }

  async getVotes({ houseURI, limit = 10000 }: GetVotesParams) {
    const { results = [] } = await this.get<RawVoteAPIResponse>("divisions", {
      chamber_id: houseURI,
      limit
    });

    return results.map(result => result.division);
  }
}
