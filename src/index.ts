import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type House {
    uri: String
  }
  type Query {
    house: House
  }
`;

const demoHouse = {
  uri: "https://data.oireachtas.ie/ie/oireachtas/house/dail/33"
};

const resolvers = {
  Query: {
    house: () => demoHouse
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
