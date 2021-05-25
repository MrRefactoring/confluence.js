export interface ChildrenOfType {
  /** A comma separated list of properties to expand on the children */
  expand?: string;
  /** An int representing the version of the content to retrieve children for */
  parentVersion?: number;
  /** (optional, default: 0) the index of the first item within the result set that should be returned */
  start?: number;
  /** (optional, default: site limit) how many items should be returned after the start index */
  limit?: number;
}
