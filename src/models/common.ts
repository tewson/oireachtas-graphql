export interface IEntity {
  uri: string;
}

export interface IEntityWithShowAs extends IEntity {
  showAs: string;
}

export interface IDateRange {
  start: string;
  end: string;
}
