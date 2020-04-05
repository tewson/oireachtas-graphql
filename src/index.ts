import { IResolvers } from "graphql-tools";
import { ApolloServer, gql } from "apollo-server";

import { OireachtasAPI } from "./OireachtasAPI";

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

  type Vote {
    subject: VoteSubject
  }

  type Query {
    house(type: String!, term: String!): House
  }
`;

const resolvers: IResolvers = {
  Query: {
    house: async (_, { type, term }, { dataSources }) => {
      return dataSources.oireachtasAPI.getHouse(type, term);
    }
  },
  House: {
    members: async ({ uri: houseUri }, _, { dataSources }) => {
      return dataSources.oireachtasAPI.getMembers({ houseUri });
    },
    votes: async ({ uri: houseUri }, _, { dataSources }) => {
      return dataSources.oireachtasAPI.getVotes({ houseUri });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ oireachtasAPI: new OireachtasAPI() })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
