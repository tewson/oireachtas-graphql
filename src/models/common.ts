export interface Entity {
  uri: string;
}

export interface EntityWithShowAs extends Entity {
  showAs: string;
}

export interface DateRange {
  start: string;
  end: string;
}
