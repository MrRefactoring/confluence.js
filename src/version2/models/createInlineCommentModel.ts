export interface CreateInlineCommentModel {
  /**
   * ID of the containing blog post, if intending to create a top level footer comment. Do not provide if creating a
   * reply.
   */
  blogPostId?: string;
  /** ID of the containing page, if intending to create a top level footer comment. Do not provide if creating a reply. */
  pageId?: string;
  /** ID of the parent comment, if intending to create a reply. Do not provide if creating a top level comment. */
  parentCommentId?: string;
  body?: {};
  /**
   * Object describing the text to highlight on the page/blog post. Only applicable for top level inline comments (not
   * replies) and required in that case.
   */
  inlineCommentProperties?: {
    /** The text to highlight */
    textSelection?: string;
    /** The number of matches for the selected text on the page (should be strictly greater than textSelectionMatchIndex) */
    textSelectionMatchCount?: number;
    /**
     * The match index to highlight. This is zero-based. E.g. if you have 3 occurrences of "hello world" on a page and
     * you want to highlight the second occurrence, you should pass 1 for textSelectionMatchIndex and 3 for
     * textSelectionMatchCount.
     */
    textSelectionMatchIndex?: number;
  };
}
