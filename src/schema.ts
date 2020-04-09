import { gql } from "apollo-server";

export const typeDefs = gql`
  type Member {
    uri: String
    fullName: String
  }

  type VoteSubject {
    showAs: String
  }

  type VoteTally {
    tally: Int
    members: [Member]
  }

  type VoteTallies {
    staonVotes: VoteTally
    taVotes: VoteTally
    nilVotes: VoteTally
  }

  type Vote {
    subject: VoteSubject
    tallies: VoteTallies
    house: House
  }

  enum HouseType {
    dail
    seanad
  }

  type HouseDateRange {
    start: String
    end: String
  }

  type House {
    uri: String
    type: HouseType
    term: String
    dateRange: HouseDateRange
    members: [Member]
    votes: [Vote]
  }

  type Query {
    house(type: HouseType!, term: String!): House
  }
`;
