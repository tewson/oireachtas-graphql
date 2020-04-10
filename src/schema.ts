import { gql } from "apollo-server";

export const typeDefs = gql`
  type DateRange {
    start: String
    end: String
  }

  enum RepresentType {
    constituency
    panel
  }

  type Represent {
    uri: String
    showAs: String
    representType: RepresentType
    representCode: String
  }

  type OfficeName {
    uri: String
    showAs: String
  }

  type Office {
    officeName: OfficeName
    dateRange: DateRange
  }

  type Membership {
    uri: String
    house: House
    represents: [Represent]
    dateRange: DateRange
    offices: [Office]
  }

  type Member {
    uri: String
    memberCode: String
    fullName: String
    memberships: [Membership]
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

  type House {
    uri: String
    type: HouseType
    term: String
    showAs: String
    seats: Int
    dateRange: DateRange
    members: [Member]
    votes: [Vote]
  }

  type Query {
    house(type: HouseType!, term: String!): House
  }
`;
