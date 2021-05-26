export interface CreateContentProperty {
  id: string | number;
  /** The key of the new property. */
  key: string;
  value: Record<string, any>;
}
