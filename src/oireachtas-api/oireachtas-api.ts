/* eslint @typescript-eslint/camelcase: [
     "error",
     {
       allow: ["_id"]
     }
   ]
 */

import { RESTDataSource } from "apollo-datasource-rest";

import { House, Member, Vote } from "../models";
import { RawHouseAPIResponse } from "./house";
import { MemberAPIParams, RawMemberAPIResponse } from "./member";
import { GetVotesParams, RawVoteAPIResponse } from "./vote";

interface Params {
  [key: string]: string | number | undefined;
}

const removeUndefinedParams = (params: Params): Params => {
  return Object.keys(params).reduce((newParams, key) => {
    if (params[key]) {
      return {
        ...newParams,
        [key]: params[key]
      };
    }

    return newParams;
  }, {});
};

export function getHouseURIFromTypeAndTerm(type: string, term: string): string {
  return `https://data.oireachtas.ie/ie/oireachtas/house/${type}/${term}`;
}

export class OireachtasAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.oireachtas.ie/v1/";
  }

  async getHouseByChamberId(chamberId: string): Promise<House> {
    const { results = [] } = await this.get<RawHouseAPIResponse>("houses", {
      chamber_id: chamberId
    });

    return results[0]?.house;
  }

  async getHouse(type: string, term: string): Promise<House> {
    return this.getHouseByChamberId(getHouseURIFromTypeAndTerm(type, term));
  }

  async getMemberByURI(uri: string): Promise<Member> {
    const retrievedMembers = await this.getMembers({
      uri,
      limit: 1
    });

    return retrievedMembers[0];
  }

  async getMembers({
    uri,
    houseURI,
    limit = 200
  }: MemberAPIParams): Promise<Member[]> {
    const { results = [] } = await this.get<RawMemberAPIResponse>(
      "members",
      removeUndefinedParams({
        member_id: uri,
        chamber_id: houseURI,
        limit
      })
    );

    return results.map(result => result.member);
  }

  async getVotes({
    uri,
    houseURI,
    limit = 10000
  }: Partial<GetVotesParams>): Promise<Vote[]> {
    const { results = [] } = await this.get<RawVoteAPIResponse>(
      "divisions",
      removeUndefinedParams({
        chamber_id: houseURI,
        vote_id: uri,
        limit
      })
    );

    return results.map(result => result.division);
  }

  async getVoteByURI(uri: string): Promise<Vote> {
    const retrievedVotes = await this.getVotes({
      uri,
      limit: 1
    });

    return retrievedVotes[0];
  }
}
