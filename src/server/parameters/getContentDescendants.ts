export interface GetContentDescendants {
  id: string | number;
  /** A comma separated list of properties to expand on the descendants */
  expand?: string;
}
