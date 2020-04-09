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

  type House {
    uri: String
    members: [Member]
    votes: [Vote]
  }

  type Query {
    house(type: String!, term: String!): House
  }
`;
