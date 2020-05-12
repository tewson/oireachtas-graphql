import { ApolloServer } from "apollo-server-lambda";

import { config } from "../config";

const examplePlaygroundQuery = `# Query full names of all members of the 33rd Dáil
{
  house(type: dail, term: "33") {
    showAs
    members {
      fullName
    }
  }
}
`;

const configWithPlayground = {
  ...config,
  playground: {
    tabs: [
      {
        endpoint: process.env.URL,
        name: "Example query",
        query: examplePlaygroundQuery
      }
    ]
  }
};

const server = new ApolloServer(configWithPlayground);

export const handler = server.createHandler();
