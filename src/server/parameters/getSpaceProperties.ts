export interface GetSpaceProperties {
  spaceKey: string;
  /** A comma separated list of properties to expand on the space properties. Default value: version. */
  expand?: string;
  start: number;
  limit: number;
}
