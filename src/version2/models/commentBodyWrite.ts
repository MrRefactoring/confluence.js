export interface CommentBodyWrite {
  /** Type of content representation used for the value field. */
  representation?: string;
  /** Body of the comment, in the format found in the representation field. */
  value?: string;
}
