export interface GetContentById {
  /** List of Content statuses to filter results on. Default value: [current] */
  status?: string;
  version?: number;
  /**
   * A comma separated list of properties to expand on the content. Default value: history,space,version We can also
   * specify some extensions such as extensions.inlineProperties (for getting inline comment-specific properties) or
   * extensions.resolution for the resolution status of each comment in the results
   */
  expand?: string;
}
