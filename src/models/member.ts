import { IEntity, IEntityWithShowAs, IDateRange } from "./common";

interface IMembershipHouse extends IEntity {}

enum RepresentType {
  Contituency = "constituency",
  Panel = "panel"
}

interface IRepresent extends IEntityWithShowAs {
  representType: RepresentType;
  representCode: string;
}

interface IRepresentWrapper {
  represent: IRepresent;
}

interface IPartyWrapper {
  party: any;
}

interface IOffice {
  officeName: IEntityWithShowAs;
  dateRange: IDateRange;
}

interface IOfficeWrapper {
  office: IOffice;
}

export interface IMembership extends IEntity {
  house: IMembershipHouse;
  represents: IRepresentWrapper[];
  dateRange: IDateRange;
  parties: IPartyWrapper[];
  offices: IOfficeWrapper[];
}

export interface IMembershipWrapper {
  membership: IMembership;
}

export interface IMember extends IEntity {
  memberCode: string;
  fullName: string;
  memberships: IMembershipWrapper[];
}
