import type { PropertyValue } from './propertyValue';

export interface ContentPropertyCreate {
  /** The key of the new property. */
  key: string;
  value: PropertyValue;
}
