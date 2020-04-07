import { ApolloServer, gql } from "apollo-server";

import { resolvers } from "./resolvers";
import { OireachtasAPI } from "./oireachtas-api";

const typeDefs = gql`
  type House {
    uri: String
    members: [Member]
    votes: [Vote]
  }

  type Member {
    uri: String
    fullName: String
  }

  type VoteSubject {
    showAs: String
  }

  type VoteTally {
    tally: Int
  }

  type VoteTallies {
    staonVotes: VoteTally
    taVotes: VoteTally
    nilVotes: VoteTally
  }

  type Vote {
    subject: VoteSubject
    tallies: VoteTallies
  }

  type Query {
    house(type: String!, term: String!): House
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ oireachtasAPI: new OireachtasAPI() })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
