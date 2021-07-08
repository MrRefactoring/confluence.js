export interface CreateSpaceProperty {
  /** The key of the space that the property will be created in. */
  spaceKey: string;
  /** The key of the new property. */
  key: string;
  value: Record<string, any>;
}
