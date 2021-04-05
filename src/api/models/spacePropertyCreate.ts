import { PropertyValue } from './propertyValue';

export interface SpacePropertyCreate {
  /** The key of the new property. */
  key: string;
  value: PropertyValue;
}
