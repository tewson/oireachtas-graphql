import { OireachtasAPI } from "../oireachtas-api";

export interface ResolverContext {
  dataSources: {
    oireachtasAPI: OireachtasAPI;
  };
}
