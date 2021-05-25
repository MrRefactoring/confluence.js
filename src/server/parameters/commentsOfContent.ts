export interface CommentsOfContent {
  /**
   * A comma separated list of properties to expand on the children. We can also specify some extensions such as
   * extensions.inlineProperties (for getting inline comment-specific properties) or extensions.resolution for the
   * resolution status of each comment in the results
   */
  expand?: string;
  /** An int representing the version of the content to retrieve children for */
  parentVersion?: number;
  /** (optional, default: 0) the index of the first item within the result set that should be returned */
  start?: number;
  /** (optional, default: site limit) how many items should be returned after the start index */
  limit?: number;
  /**
   * (optional, default: "" means all) the location of the comments. Possible values are: "inline", "footer",
   * "resolved". You can define multiple location params. The results will be the comments matched by any location.
   */
  location?: string;
  /** (optional, default: "") the depth of the comments. Possible values are: "" (ROOT only), "all" */
  depth?: string;
}
