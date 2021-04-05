/**
 * This object is used when creating or updating content. */
export interface ContentBodyCreate {
  /** The body of the content in the relevant format. */
  value: string;
  /** The content format type. Set the value of this property to
    the name of the format being used, e.g. 'storage'. */
  representation: string;
}
