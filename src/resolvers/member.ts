import { IResolverObject, IFieldResolver } from "graphql-tools";

import { IMember, IMembershipWrapper, IMembership, IHouse } from "../models";
import { IResolverContext } from "./common";

interface IHousesByURI {
  [uri: string]: IHouse;
}

const resolveMemberships: IFieldResolver<IMember, IResolverContext> = async (
  { memberships: membershipWrappers },
  _,
  { dataSources }
) => {
  const unwrappedMemberships = membershipWrappers.map(
    membershipWrapper => membershipWrapper.membership
  );
  const houseURIsToResolve = unwrappedMemberships.map(
    membership => membership.house.uri
  );

  const resolvedHousePromises = houseURIsToResolve.map(houseURI =>
    dataSources.oireachtasAPI.getHouseByChamberId(houseURI)
  );
  const houses = await Promise.all(resolvedHousePromises);
  const housesByURI = houses.reduce<IHousesByURI>(
    (housesByURI, house) => ({
      ...housesByURI,
      [house.uri]: house
    }),
    {}
  );

  return unwrappedMemberships.map(unwrappedMembership => ({
    ...unwrappedMembership,
    house: housesByURI[unwrappedMembership.house.uri],
    represents: unwrappedMembership.represents.map(
      representWrapper => representWrapper.represent
    ),
    offices: unwrappedMembership.offices.map(
      officeWrapper => officeWrapper.office
    )
  }));
};

export const Member: IResolverObject = {
  memberships: resolveMemberships
};
