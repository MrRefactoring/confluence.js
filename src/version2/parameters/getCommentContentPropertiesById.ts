export interface GetCommentContentPropertiesById {
  /** The ID of the comment for which content properties should be returned. */
  commentId: number;
  /** The ID of the content property being requested. */
  propertyId: number;
}
