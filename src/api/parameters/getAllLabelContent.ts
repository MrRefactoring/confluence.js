export interface GetAllLabelContent {
  /** Name of the label to query. */
  name: string;
  /** The type of contents that are to be returned. */
  type?: string;
  /** The starting offset for the results. */
  start?: number;
  /** The number of results to be returned. */
  limit?: number;
}
