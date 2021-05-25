export interface DescendantsOfType {
  /** A comma separated list of properties to expand on the descendants */
  expand?: string;
  /** (optional, default: 0) the index of the first item within the result set that should be returned */
  start?: number;
  /** (optional, default: site limit) how many items should be returned after the start index */
  limit?: number;
}
