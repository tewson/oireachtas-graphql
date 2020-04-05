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

interface IVoteTallyMemberWrapper {
  member: {
    memberCode: String;
  };
}

interface IVoteTally {
  showAs: String;
  members: IVoteTallyMemberWrapper[];
  tally: Number;
}

interface IVoteAPIResult {
  division: {
    subject: {
      showAs: String;
    };
    tallies: {
      staonVotes: IVoteTally;
      taVotes: IVoteTally;
      nilVotes: IVoteTally;
    };
    debate: {
      showAs: String;
    };
  };
}

interface IRawHouseAPIResponse {
  results: IHouseAPIResult[];
}

interface IRawMemberAPIResponse {
  results: IMemberAPIResult[];
}

interface IBaseEntityByHouseAPIParams {
  houseUri: String;
}

interface IGetMembersParams extends IBaseEntityByHouseAPIParams {}

interface IGetVotesParams extends IBaseEntityByHouseAPIParams {
  limit: Number;
}

interface IRawVoteAPIResponse {
  results: IVoteAPIResult[];
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

  async getVotes({ houseUri, limit = 10000 }: IGetVotesParams) {
    const { results = [] } = await this.get<IRawVoteAPIResponse>("divisions", {
      chamber_id: houseUri,
      limit
    });

    return results.map(result => result.division);
  }
}
