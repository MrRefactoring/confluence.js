export interface CreatePage {
  /**
   * Due to JavaScript's max integer representation of 2^53-1, the type of any IDs returned in the response body for
   * this endpoint will be changed from a numeric type to a string type at the end of the deprecation period. In the
   * meantime, this query param can be passed to this endpoint to opt-in to this change now. See [this
   * changelog](https://developer.atlassian.com/cloud/confluence/changelog/#CHANGE-905) for more detail.
   */
  serializeIdsAsStrings?: boolean;
  /** ID of the space */
  spaceId: string;
  /** The status of the page, published or draft. */
  status?: 'current' | 'draft' | string;
  /** Title of the page, required if page status is not draft. */
  title?: string;
  /** The parent content ID of the page. */
  parentId?: string;
  /** The type of the page. */
  // body?: PageBodyWrite; // todo
}
