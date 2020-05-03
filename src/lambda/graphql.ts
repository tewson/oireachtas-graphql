import { ApolloServer } from "apollo-server-lambda";

import { config } from "../config";

const server = new ApolloServer(config);

export const handler = server.createHandler();
