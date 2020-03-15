import { IResolvers } from "graphql-tools";
import { ApolloServer, gql } from "apollo-server";

import { OireachtasAPI } from "./OireachtasAPI";

const typeDefs = gql`
  type House {
    uri: String
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
