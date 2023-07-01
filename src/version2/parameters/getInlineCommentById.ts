export interface GetInlineCommentById {
  /** The ID of the comment to be retrieved. */
  commentId: number;
  /**
   * The content format type to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat?: {};
  /**
   * Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its
   * details.
   */
  version?: number;
}
