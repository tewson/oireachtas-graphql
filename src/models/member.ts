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
