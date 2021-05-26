export interface GetContentProperty {
  id: string | number;
  key: string;
  /** A comma separated list of properties to expand on the content properties. Default value: version. */
  expand?: string;
}
