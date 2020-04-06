import { IResolvers, IResolverObject, IFieldResolver } from "graphql-tools";
import { ApolloServer, gql } from "apollo-server";

import { IHouse, OireachtasAPI } from "./oireachtas-api";

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

interface IResolverContext {
  dataSources: {
    oireachtasAPI: OireachtasAPI;
  };
}

interface IHouseQueryArgs {
  type: String;
  term: String;
}

const house: IFieldResolver<{}, IResolverContext, IHouseQueryArgs> = async (
  _,
  { type, term },
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getHouse(type, term);
};

const Query: IResolverObject = {
  house
};

const houseMembers: IFieldResolver<IHouse, IResolverContext> = async (
  { uri: houseURI },
  _,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getMembers({ houseURI });
};

const houseVotes: IFieldResolver<IHouse, IResolverContext> = async (
  { uri: houseURI },
  __,
  { dataSources }
) => {
  return dataSources.oireachtasAPI.getVotes({ houseURI });
};

const House: IResolverObject = {
  members: houseMembers,
  votes: houseVotes
};

const resolvers: IResolvers = {
  Query,
  House
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ oireachtasAPI: new OireachtasAPI() })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
