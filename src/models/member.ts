import { Entity, EntityWithShowAs, DateRange } from "./common";

interface MembershipHouse extends Entity {}

enum RepresentType {
  Contituency = "constituency",
  Panel = "panel"
}

interface Represent extends EntityWithShowAs {
  representType: RepresentType;
  representCode: string;
}

interface RepresentWrapper {
  represent: Represent;
}

interface PartyWrapper {
  party: any;
}

interface Office {
  officeName: EntityWithShowAs;
  dateRange: DateRange;
}

interface OfficeWrapper {
  office: Office;
}

export interface Membership extends Entity {
  house: MembershipHouse;
  represents: RepresentWrapper[];
  dateRange: DateRange;
  parties: PartyWrapper[];
  offices: OfficeWrapper[];
}

export interface MembershipWrapper {
  membership: Membership;
}

export interface Member extends Entity {
  memberCode: string;
  fullName: string;
  memberships: MembershipWrapper[];
}
