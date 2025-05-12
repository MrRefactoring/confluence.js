import type { PropertyValue } from './propertyValue';

export interface SpacePropertyCreate {
  /** The key of the new property. */
  key: string;
  value: PropertyValue;
  space?: {
    /** The key of the space */
    key?: string;
  };
}
