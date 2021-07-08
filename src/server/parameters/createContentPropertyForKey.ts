import { PropertyValue } from '../models';

export interface CreateContentPropertyForKey {
  id: string | number;
  key: string;
  value: PropertyValue;
}
