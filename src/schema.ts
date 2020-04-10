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

  type Party {
    uri: String
    showAs: String
    partyCode: String
    dateRange: DateRange
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
    parties: [Party]
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

  type VoteChamber {
    uri: String
    showAs: String
  }

  enum VoteOutcome {
    _ # Not sure what this outcome means but it has happened. For example: https://www.oireachtas.ie/en/debates/vote/dail/32/2017-06-01/101/.
    Carried
    Lost
  }

  type VoteDebateFormat {
    uri: String
  }

  type VoteDebateFormats {
    pdf: VoteDebateFormat
    xml: VoteDebateFormat
  }

  type VoteDebate {
    uri: String
    showAs: String
    debateSection: String
    formats: VoteDebateFormats
  }

  type Vote {
    subject: VoteSubject
    date: String
    datetime: String
    tellers: String
    tallies: VoteTallies
    house: House
    chamber: VoteChamber
    outcome: VoteOutcome
    isBill: Boolean
    debate: VoteDebate
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
    member(uri: String): Member
  }
`;
