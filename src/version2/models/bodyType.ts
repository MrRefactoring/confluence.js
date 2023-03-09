export interface BodyType {
  /** Type of content representation used for the value field. */
  representation?: string;
  /** Body of the content, in the format found in the representation field. */
  value?: string;
}
