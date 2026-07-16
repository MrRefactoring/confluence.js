import type { PropertyValue } from './propertyValue.js';

export interface ContentPropertyCreate {
  /** The key of the new property. */
  key: string;
  value: PropertyValue;
}
