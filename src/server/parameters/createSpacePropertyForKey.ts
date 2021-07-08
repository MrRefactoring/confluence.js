export interface CreateSpacePropertyForKey {
  /** The key of the space that the property will be created in. */
  spaceKey: string;
  /** The key of the property to be created. */
  key: string;
  value: Record<string, any>;
}
