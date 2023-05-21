export interface UpdateInlineComment {
  /** The ID of the comment to be retrieved. */
  commentId: number;
  version?: {
    /** Number of new version. Should be 1 higher than current version of the comment. */
    number?: number;
    /** Optional message store for the new version. */
    message?: string;
  };
  body?: {};
  /**
   * Resolved state of the comment. Set to true to resolve the comment, set to false to reopen it. If matching the
   * existing state (i.e. true -> resolved or false -> open/reopened) , no change will occur. A dangling comment cannot
   * be updated.
   */
  resolved?: boolean;
}
