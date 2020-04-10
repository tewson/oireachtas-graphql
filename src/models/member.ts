interface IMembershipHouse {
  uri: string;
}

enum RepresentType {
  Contituency = "constituency",
  Panel = "panel"
}

interface IRepresent {
  uri: string;
  showAs: string;
  representType: RepresentType;
  representCode: string;
}

interface IRepresentWrapper {
  represent: IRepresent;
}

interface IOffice {
  officeName: {
    uri: string;
    showAs: string;
  };
  dateRange: {
    start: string;
    end: string;
  };
}

interface IOfficeWrapper {
  office: IOffice;
}

export interface IMembership {
  uri: string;
  house: IMembershipHouse;
  represents: IRepresentWrapper[];
  dateRange: {
    start: string;
    end: string;
  };
  offices: IOfficeWrapper[];
}

export interface IMembershipWrapper {
  membership: IMembership;
}

export interface IMember {
  uri: string;
  memberCode: string;
  fullName: string;
  memberships: IMembershipWrapper[];
}
