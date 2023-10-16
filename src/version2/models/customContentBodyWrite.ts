export interface CustomContentBodyWrite {
  /** Type of content representation used for the value field. */
  representation?: string;
  /** Body of the custom content, in the format found in the representation field. */
  value?: string;
}
