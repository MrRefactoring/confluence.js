export interface CreateFooterCommentModel {
  /**
   * ID of the containing blog post, if intending to create a top level footer comment. Do not provide if creating a
   * reply.
   */
  blogPostId?: number;
  /** ID of the containing page, if intending to create a top level footer comment. Do not provide if creating a reply. */
  pageId?: number;
  /** ID of the parent comment, if intending to create a reply. Do not provide if creating a top level comment. */
  parentCommentId?: number;
  body?: {
    /** Body of the comment */
    value?: string;
    /** Format of the body's value. */
    representation?: string;
  };
}
