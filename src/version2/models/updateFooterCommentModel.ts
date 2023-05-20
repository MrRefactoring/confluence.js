export interface UpdateFooterCommentModel {
  version?: {
    /** Number of new version. Should be 1 higher than current version of the comment. */
    number?: number;
    /** Optional message store for the new version. */
    message?: string;
  };
  body?: {};
}
