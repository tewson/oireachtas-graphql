import { IResolverObject, IFieldResolver } from "graphql-tools";

import {
  Member as MemberModel,
  MembershipWrapper,
  Membership,
  House
} from "../models";
import { ResolverContext } from "./common";

interface HousesByURI {
  [uri: string]: House;
}

const resolveMemberships: IFieldResolver<MemberModel, ResolverContext> = async (
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
  const housesByURI = houses.reduce<HousesByURI>(
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
    parties: unwrappedMembership.parties.map(
      partyWrapper => partyWrapper.party
    ),
    offices: unwrappedMembership.offices.map(
      officeWrapper => officeWrapper.office
    )
  }));
};

export const Member: IResolverObject = {
  memberships: resolveMemberships
};
