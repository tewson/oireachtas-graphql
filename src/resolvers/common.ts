import { OireachtasAPI } from "../oireachtas-api";

export interface IResolverContext {
  dataSources: {
    oireachtasAPI: OireachtasAPI;
  };
}
